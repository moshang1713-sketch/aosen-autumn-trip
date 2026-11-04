function createRouteMap(onSelect) {
  const leaflet = window.L;
  if (!leaflet) return null;
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bounds = [[0, 0], [540, 440]];
  const map = leaflet.map('map', {
    crs: leaflet.CRS.Simple, minZoom: -4, maxZoom: 2, zoomSnap: 0.25,
    scrollWheelZoom: false, zoomControl: false, attributionControl: false,
    zoomAnimation: motion, markerZoomAnimation: motion, fadeAnimation: motion,
  });
  const zoom = leaflet.control.zoom({ zoomInTitle: '放大地图', zoomOutTitle: '缩小地图' }).addTo(map);
  const overlay = leaflet.imageOverlay('./assets/route.svg', bounds, { alt: '奥森南园原创示意底图' });
  const status = document.getElementById('map-status');
  overlay.on('load', () => { status.hidden = true; });
  overlay.on('error', () => {
    status.textContent = '示意底图载入失败。编号和行程仍可查看。';
    status.classList.add('map-error');
  });
  overlay.addTo(map);
  const route = leaflet.layerGroup().addTo(map);
  const markers = new Map();

  function reset() {
    map.fitBounds(bounds, { animate: false, padding: [12, 10], maxZoom: 0 });
  }

  reset();
  map.on('resize', reset);

  function render(rows) {
    route.clearLayers();
    markers.clear();
    const points = rows.filter(({ stop }) => stop?.mapPoint);
    leaflet.polyline(points.map(({ stop }) => stop.mapPoint), {
      color: '#9c601f', dashArray: '7 8', weight: 3, interactive: false,
    }).addTo(route);
    for (const { id, number, stop } of points) {
      const icon = leaflet.divIcon({
        className: 'map-pin ' + stop.level, html: String(number),
        iconSize: [44, 44], iconAnchor: [22, 22],
      });
      const marker = leaflet.marker(stop.mapPoint, { icon, title: stop.name }).addTo(route);
      const element = marker.getElement();
      element.setAttribute('aria-label', number + ' ' + stop.name);
      element.setAttribute('aria-pressed', 'false');
      element.addEventListener('keydown', event => {
        if (event.key === ' ') {
          event.preventDefault();
          onSelect(id);
        }
      });
      marker.on('click', () => onSelect(id));
      markers.set(id, marker);
    }
    zoom.getContainer().querySelector('.leaflet-control-zoom-in').setAttribute('aria-label', '放大地图');
    zoom.getContainer().querySelector('.leaflet-control-zoom-out').setAttribute('aria-label', '缩小地图');
    reset();
  }

  function select(id, center) {
    for (const [key, marker] of markers) {
      const element = marker.getElement();
      element.classList.toggle('selected', key === id);
      element.setAttribute('aria-pressed', String(key === id));
      marker.setZIndexOffset(key === id ? 1000 : 0);
    }
    if (center && markers.has(id)) map.panTo(markers.get(id).getLatLng(), { animate: motion });
  }

  return { render, select, reset };
}
