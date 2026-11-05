function createRouteMap(onSelect, obscuredHeight) {
  const leaflet = window.L;
  if (!leaflet) return null;
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const map = leaflet.map('map', {
    minZoom: 12, maxZoom: 19, zoomSnap: 0.25, zoomDelta: 0.5,
    maxBounds: [[39.993, 116.361], [40.028, 116.413]], maxBoundsViscosity: 0.65,
    scrollWheelZoom: true, zoomControl: false, attributionControl: false,
    zoomAnimation: motion, markerZoomAnimation: motion, fadeAnimation: motion,
  });
  map.setView([40.009, 116.385], 15);
  map.createPane('base').style.zIndex = '350';
  const zoom = leaflet.control.zoom({ position: 'topright', zoomInTitle: '放大地图', zoomOutTitle: '缩小地图' }).addTo(map);
  const labels = leaflet.layerGroup().addTo(map);
  const route = leaflet.layerGroup().addTo(map);
  const markers = new Map();
  let routeBounds = null;
  const latLng = ([lng, lat]) => [lat, lng];
  const labelData = [
    ['奥林匹克森林公园南园', 116.3819, 40.0191, 'park'],
    ['仰山', 116.3862, 40.01765, 'park'],
    ['奥海', 116.3874, 40.01322, 'water'],
    ['科荟路', 116.3902, 40.00861, 'road'],
    ['大屯路', 116.3894, 40.00075, 'road'],
    ['中轴景观大道', 116.3857, 40.0045, 'road'],
    ['龙形水系', 116.3925, 40.0056, 'water'],
    ['北五环', 116.3892, 40.0219, 'road'],
  ];
  const styles = {
    green: { stroke: false, fillColor: '#d9e5c7', fillOpacity: 1 },
    water: { color: '#87afb2', weight: 1, fillColor: '#a6ccd0', fillOpacity: 1 },
    building: { color: '#d6caba', weight: .5, fillColor: '#e5dbcb', fillOpacity: .8 },
    stream: { color: '#9cc2c9', weight: 2 },
    major: { color: '#e6c598', weight: 5 },
    street: { color: '#fffaf0', weight: 3 },
    path: { color: '#a4ae8f', fillColor: '#eee9d5', fillOpacity: .55, weight: 1.5 },
    bridge: { color: '#e9b980', weight: 3 },
  };
  const status = document.getElementById('map-status');
  fetch('./assets/maps/aosen-osm.geojson').then(response => {
    if (!response.ok) throw new Error('Missing basemap');
    return response.json();
  }).then(data => {
    leaflet.geoJSON(data, {
      pane: 'base', interactive: false, smoothFactor: 1.25, style: feature => styles[feature.properties.kind],
    }).addTo(map);
    for (const [name, lng, lat, kind] of labelData) {
      leaflet.marker([lat, lng], {
        keyboard: false, interactive: false, zIndexOffset: -500,
        icon: leaflet.divIcon({ className: 'map-label ' + kind, html: name, iconSize: [0, 0] }),
      }).addTo(labels);
    }
    status.hidden = true;
  }).catch(() => {
    status.textContent = '底图载入失败，站点及步行线仍可查看。';
  });

  function reset() {
    if (!routeBounds?.isValid()) return;
    const height = map.getSize().y;
    const bottom = Math.min(obscuredHeight(), height * .6);
    const topPadding = bottom ? (height > 450 ? 149 : 90) : 102;
    map.fitBounds(routeBounds, {
      animate: false, paddingTopLeft: [28, topPadding],
      paddingBottomRight: [28, bottom + (bottom ? 89 : 76)], maxZoom: 17,
    });
  }

  const paths = [];
  function render(rows) {
    route.clearLayers();
    markers.clear();
    paths.length = 0;
    routeBounds = leaflet.latLngBounds([]);
    for (const [index, { id, segment }] of rows.entries()) {
      if (!segment) continue;
      const line = segment.coordinates.map(latLng);
      if (segment.approximate) {
        line.unshift(latLng(rows[index - 1].place.mapLngLat));
        line.push(latLng(rows[index].place.mapLngLat));
      }
      for (const point of line) routeBounds.extend(point);
      const casing = leaflet.polyline(line, { color: '#fffcf0', weight: 8, interactive: false }).addTo(route);
      const layer = leaflet.polyline(line, { interactive: false, className: 'walk-segment' }).addTo(route);
      paths.push({ layer, casing, approximate: segment.approximate, from: rows[index - 1].id, to: id });
    }
    for (const { id, number, stop, place } of rows) {
      if (!place?.mapLngLat) continue;
      const position = latLng(place.mapLngLat);
      const icon = leaflet.divIcon({
        className: 'map-pin ' + (id === 'meeting' ? 'start' : id === 'lake' ? 'featured' : place.locationType),
        html: '<span>' + number + '</span>', iconSize: [44, 44], iconAnchor: [22, 22],
      });
      const marker = leaflet.marker(position, { icon, title: stop.name }).addTo(route);
      marker.bindTooltip(stop.name, { direction: 'top', offset: [0, -13], className: 'pin-tooltip' });
      const element = marker.getElement();
      element.setAttribute('aria-label', number + ' ' + stop.name);
      element.setAttribute('aria-pressed', 'false');
      element.addEventListener('keydown', event => {
        if (event.key === ' ') { event.preventDefault(); onSelect(id); }
      });
      marker.on('click', () => onSelect(id));
      markers.set(id, marker);
      routeBounds.extend(position);
    }
    reset();
  }

  function updateProgress(checked) {
    for (const [id, marker] of markers) {
      marker.getElement().dataset.checked = String(checked.has(id));
    }
    for (const { layer, casing, approximate, from, to } of paths) {
      casing.bringToFront();
      layer.bringToFront();
      const done = checked.has(from) && checked.has(to);
      layer.setStyle({ color: done ? '#23704e' : '#ad493d', weight: done ? 5.5 : 4.5, dashArray: approximate ? '2 6' : done ? null : '7 7' });
      layer.getElement()?.classList.toggle('walk-complete', done);
    }
    // Raise the whole completed stroke, including its casing, above pending strokes.
    for (const { layer, casing, from, to } of paths) {
      if (checked.has(from) && checked.has(to)) {
        casing.bringToFront();
        layer.bringToFront();
      }
    }
  }

  function select(id, center) {
    for (const [key, marker] of markers) {
      const element = marker.getElement();
      element.classList.toggle('selected', key === id);
      element.setAttribute('aria-pressed', String(key === id));
      marker.setZIndexOffset(key === id ? 1000 : 0);
      if (key === id) marker.openTooltip();
      else marker.closeTooltip();
    }
    if (!center || !markers.has(id)) return;
    const zoomLevel = Math.max(map.getZoom(), 16.25);
    const point = map.project(markers.get(id).getLatLng(), zoomLevel);
    const bottom = Math.min(obscuredHeight(), map.getSize().y * .7);
    const verticalOffset = (bottom - 98) / 2;
    map.setView(map.unproject(point.add([0, verticalOffset]), zoomLevel), zoomLevel, { animate: motion });
  }

  zoom.getContainer().querySelector('.leaflet-control-zoom-in').setAttribute('aria-label', '放大地图');
  zoom.getContainer().querySelector('.leaflet-control-zoom-out').setAttribute('aria-label', '缩小地图');
  map.on('resize', reset);
  let accuracyCircle;
  let locationDot;
  function showLocation({ latitude, longitude, accuracy }) {
    const point = [latitude, longitude];
    accuracyCircle?.remove();
    locationDot?.remove();
    accuracyCircle = leaflet.circle(point, { radius: accuracy, color: '#246bcb', fillOpacity: .12, weight: 1 }).addTo(map);
    locationDot = leaflet.circleMarker(point, { radius: 7, color: '#fff', weight: 3, fillColor: '#246bcb', fillOpacity: 1 })
      .bindTooltip('我的位置 · 约 ±' + Math.ceil(accuracy) + ' 米').addTo(map);
    map.setView(point, Math.max(map.getZoom(), 16), { animate: false });
  }
  return { render, select, reset, showLocation, updateProgress };
}
