const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const { places, trip, walking, amapLink, amapWalk } = vm.runInNewContext(
  ['src/places.js', 'src/walks.js', 'src/trip.js'].map(read).join('\n') +
  '\n({ places, trip, walking, amapLink, amapWalk })', { URLSearchParams }
);
const base = JSON.parse(read('assets/maps/aosen-osm.geojson'));
const lake = base.features.find(feature => feature.properties.osm === 'relation/1659652');
const distance = (a, b) => Math.hypot((b[0] - a[0]) * 85330, (b[1] - a[1]) * 111132);

function inside([x, y], ring) {
  let result = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[j];
    if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) result = !result;
  }
  return result;
}

test('coordinate axes and provider boundary', () => {
  assert.deepEqual(Array.from(places.meeting.mapLngLat), [116.387406, 40.0012419]);
  assert.deepEqual(Array.from(places.arch.navigationLngLat), [116.393618, 40.004706]);
  assert.deepEqual(Array.from(places.arch.mapLngLat), [116.387367, 40.003303]);
  for (const [id, place] of Object.entries(places)) {
    const [lng, lat] = place.mapLngLat;
    assert.ok(lng > 116.36 && lng < 116.40 && lat > 39.99 && lat < 40.03, id);
    const original = place.coordinateSystem === 'WGS84' ? place.mapLngLat : place.navigationLngLat;
    assert.ok(distance(original, place.lngLat) < .01, id);
    if (!place.navigationLngLat) continue;
    const offset = distance(place.navigationLngLat, place.mapLngLat);
    assert.ok(offset > 500 && offset < 650, id + ' local GCJ-02 offset');
  }
  assert.ok(distance(places.meeting.mapLngLat, places.return.mapLngLat) > 800);
});

test('each plan has one G exit, a distinct return and a route for each adjacent pair', () => {
  assert.equal(trip.meetingTime, '13:00');
  assert.equal(trip.plans.comfy.rows.at(-1)[0], '15:22–15:53');
  assert.equal(places.sculpture.locationType, 'area');
  assert.equal(places.cascade.locationType, 'area');
  for (const [id, plan] of Object.entries(trip.plans)) {
    const stops = plan.rows.map(row => row[1]);
    assert.equal(stops[0], 'meeting');
    assert.equal(stops.at(-1), id === 'fast' ? 'return' : 'lincui');
    assert.equal(new Set(stops).size, stops.length);
    assert.equal(stops.includes('corridor'), id === 'comfy');
    assert.ok(stops.includes('summit'));
    for (let i = 1; i < stops.length; i++) {
      const pair = stops[i - 1] + ':' + stops[i];
      const segment = walking.segments[pair];
      if (!segment) continue;
      assert.ok(segment.meters > 0 && segment.seconds > 0, pair);
      assert.equal(new URL(segment.sourceUrl).hostname, 'routing.openstreetmap.de');
      assert.ok(distance(segment.coordinates[0], places[stops[i - 1]].mapLngLat) <= 32, pair);
      assert.ok(distance(segment.coordinates.at(-1), places[stops[i]].mapLngLat) <= 32, pair);
    }
  }
});

test('walking curves avoid the mapped Aohai lake surface', () => {
  const [outer, ...holes] = lake.geometry.coordinates;
  for (const [pair, segment] of Object.entries(walking.segments)) {
    for (let i = 1; i < segment.coordinates.length; i++) {
      const [a, b] = [segment.coordinates[i - 1], segment.coordinates[i]];
      const count = Math.ceil(distance(a, b) / 2);
      for (let j = 0; j < count; j++) {
        const t = (j + .5) / count;
        const point = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
        assert.ok(!inside(point, outer) || holes.some(ring => inside(point, ring)), pair);
      }
    }
  }
});

test('navigation uses selected and next-stop endpoints', () => {
  assert.match(new URL(amapLink('meeting')).searchParams.get('keyword'), /G东北口/);
  assert.equal(new URL(amapLink('arch')).pathname, '/place/B0HK1D9GOF');
  const marker = new URL(amapLink('gate'));
  assert.equal(marker.searchParams.get('coordinate'), 'gaode');
  assert.equal(marker.searchParams.get('position'), places.gate.navigationLngLat.join(','));
  const next = new URL(amapWalk('lake', 'gate'));
  assert.equal(next.searchParams.get('mode'), 'walk');
  assert.equal(next.searchParams.get('from'), places.gate.navigationLngLat.join(',') + ',奥森南园南门');
  assert.equal(next.searchParams.get('to'), places.lake.navigationLngLat.join(',') + ',奥海西侧银杏');
});
