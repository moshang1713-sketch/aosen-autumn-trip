const byId = id => document.getElementById(id);
const drawer = byId('drawer');
const mobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const inAppBrowser = /MicroMessenger|QQ\//i.test(navigator.userAgent);
const compact = matchMedia('(max-width: 899px)');
const routeSegments = typeof walking === 'undefined' ? {} : walking.segments;
const placePhotos = typeof photos === 'undefined' ? {} : photos;
const checkinKey = 'aosen-autumn-trip.checkins.v1';
let checked = new Set();
try {
  const saved = JSON.parse(localStorage.getItem(checkinKey));
  if (Array.isArray(saved)) checked = new Set(saved.filter(id => Object.hasOwn(trip.stops, id)));
} catch { /* Check-ins remain available during this visit. */ }
let planId = 'comfy';
let rows = [];
let selected = 'meeting';
let map;
try {
  map = createRouteMap(id => selectStop(id), () => compact.matches ? drawer.offsetHeight : 0);
} catch { /* A failed map must leave the itinerary and navigation available. */ }
if (!map) {
  byId('map-status').textContent = '地图暂不可用。仍可查看完整行程和高德导航。';
  byId('overview').disabled = true;
  byId('locate').disabled = true;
  if (compact.matches) drawer.dataset.state = 'list';
}

function external(href, label, className = 'plain') {
  return '<a class="' + className + '" href="' + href.replaceAll('&', '&amp;') +
    '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
}

function photoMarkup(photo, thumb = false) {
  const file = thumb ? photo.file.replace('.webp', '-thumb.webp') : photo.file;
  return '<div class="photo-frame"><img loading="lazy" decoding="async" src="./assets/photos/' + file +
    '" alt="' + photo.title + '"><span class="image-fallback" hidden>照片暂不可用</span></div>';
}

function photoCredit(photo) {
  return '<figcaption>' + photo.title + ' · ' + (photo.date ? '拍摄 ' + photo.date + ' · ' : '拍摄日期未核实 · ') + photo.author + ' · ' +
    (photo.sourceUrl ? external(photo.licenseUrl, photo.license, 'source') + ' · ' + external(photo.sourceUrl, '原图', 'source') : '攻略参考') + '</figcaption>';
}

document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.parentElement?.classList.contains('photo-frame')) return;
  image.hidden = true;
  image.nextElementSibling.hidden = false;
}, true);

function setDrawer(state) {
  drawer.dataset.state = state;
  drawer.parentElement.dataset.sheet = state;
  for (const button of drawer.querySelectorAll('[data-drawer]')) {
    button.setAttribute('aria-pressed', String(button.dataset.drawer === state));
  }
  drawer.querySelector('.drawer-body').scrollTop = 0;
}

function formatMeters(meters) {
  return meters >= 1000 ? (meters / 1000).toFixed(1) + ' 公里' : Math.round(meters) + ' 米';
}

function renderPlan() {
  const plan = trip.plans[planId];
  rows = plan.rows.map(([time, id], index) => ({
    id, time: time ?? trip.meetingTime, number: index + 1, stop: trip.stops[id], place: placeFor(id),
    segment: index ? routeSegments[plan.rows[index - 1][1] + ':' + id] : null,
  }));
  const segments = rows.flatMap(({ segment }) => segment ? [segment] : []);
  const complete = segments.length === rows.length - 1;
  const distance = segments.reduce((total, s) => total + s.meters, 0);
  const seconds = segments.reduce((total, s) => total + s.seconds, 0);
  byId('plan-note').textContent = plan.note;
  byId('route-count').textContent = complete
    ? '步行估算 ' + formatMeters(distance) + ' · ' + Math.round(seconds / 60) + ' 分钟'
    : '部分路段待核实';
  for (const button of byId('plans').querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.plan === planId));
  }
  byId('timeline').innerHTML = rows.map(({ id, number, time, stop, segment }) => {
    const photo = placePhotos[id]?.[0];
    const walk = number > 1 ? (segment ? '<span>步行约 ' + Math.max(1, Math.round(segment.seconds / 60)) + ' 分钟</span>' : '<span>路线待核实</span>') : '';
    return '<li><button type="button" class="stop-row" data-stop="' + id + '">' +
      (photo ? photoMarkup(photo, true) : '<span class="row-ordinal" aria-hidden="true">' + number + '</span>') +
      '<span class="row-text"><span class="row-time">' + number + ' / ' + time + '</span><strong>' + stop.name +
      '</strong><span class="stop-check"></span><span class="row-walk">' + stop.duration + (walk ? ' · ' + walk : '') + '</span></span><span aria-hidden="true">›</span></button>' +
      '<span class="print-link">' + external(amapLink(id), '高德查看') + '</span></li>';
  }).join('');
  if (!rows.some(row => row.id === selected)) selected = 'meeting';
  if (compact.matches) setDrawer(map ? 'peek' : 'list');
  map?.render(rows);
  updateFootprints();
  selectStop(selected, false);
}

function updateFootprints() {
  map?.updateProgress(checked);
  const planCount = rows.filter(row => checked.has(row.id)).length;
  byId('checkin-count').textContent = planCount + ' / ' + rows.length + ' 已打卡';
  for (const button of byId('timeline').querySelectorAll('[data-stop]')) {
    const done = checked.has(button.dataset.stop);
    button.dataset.checked = String(done);
    button.querySelector('.stop-check').textContent = done ? '✓ 已打卡' : '○ 未打卡';
  }
  byId('footprint-list').replaceChildren(...Array.from(checked, id => {
    const item = document.createElement('li');
    item.textContent = trip.stops[id].name;
    return item;
  }));
  byId('footprint-empty').hidden = checked.size > 0;
}

function selectStop(id, center = true) {
  const index = rows.findIndex(row => row.id === id);
  if (index < 0) return;
  selected = id;
  const { stop, place, number, time } = rows[index];
  const next = rows[index + 1];
  const gallery = placePhotos[id] ?? [];
  if (center && compact.matches) setDrawer('detail');
  byId('selected-kicker').textContent = '第 ' + number + ' 站 · ' + time + ' · ' + stop.tag;
  byId('selected-name').textContent = stop.name;
  byId('selected-nav').href = amapWalk(id, mobileDevice ? undefined : rows[index - 1]?.id, mobileDevice);
  byId('selected-nav').textContent = mobileDevice ? '高德 App 导航 ↗' : '高德网页版 ↗';
  byId('map-amap').href = amapLink(id);
  byId('next').disabled = !next;
  byId('detail').innerHTML = (gallery.length
    ? '<figure><button class="photo-button" type="button" data-gallery aria-label="查看照片">' + photoMarkup(gallery[0]) +
      '<span>查看照片 · ' + gallery.length + ' 张</span></button>' + photoCredit(gallery[0]) + '</figure>'
    : '<div class="photo-missing"><span>实景影像</span><strong>暂无已授权实拍</strong></div>') +
    '<p class="stop-meta"><strong>' + stop.duration + '</strong><span>' + (place?.confidence ?? '点位待核实') + '</span></p>' +
    '<p class="stop-detail">' + stop.detail + '</p><div class="actions detail-actions">' +
    external(amapWalk(id, rows[index - 1]?.id, false), '高德网页版 ↗') +
    '<button class="plain" type="button" data-copy-place>复制地点和坐标</button>' +
    '<button class="plain" type="button" data-checkin aria-pressed="' + checked.has(id) + '">' +
    (checked.has(id) ? '已打卡 ✓' : '标记打卡') + '</button></div>' +
    '<p id="detail-status" class="detail-status" role="status">打卡保存在当前浏览器</p>' +
    (next ? '<div class="next-leg"><p>下一站 <strong>' + next.stop.name + '</strong></p>' +
      external(amapWalk(next.id, mobileDevice ? undefined : id, mobileDevice), mobileDevice ? '从当前位置去下一站 ↗' : '步行到下一站 ↗') +
      (place?.navigationLngLat && next.place?.navigationLngLat ? '<button type="button" class="plain" data-amap-preview>站内看高德路线</button>' : '') + '</div>' : '');
  if (inAppBrowser) byId('detail').insertAdjacentHTML('afterbegin', '<p class="app-hint">若高德 App 未打开，请点右上角 ⋯ → 在浏览器打开，或使用网页版。</p>');
  for (const button of byId('timeline').querySelectorAll('[data-stop]')) {
    if (button.dataset.stop === id) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  }
  map?.select(id, center);
  if (center && !compact.matches) drawer.querySelector('.drawer-body').scrollTop = 0;
}

byId('meeting-time').textContent = trip.meetingTime;
byId('trip-date').textContent = trip.date;
byId('plans').innerHTML = Object.entries(trip.plans).map(([id, plan]) =>
  '<button type="button" data-plan="' + id + '"><strong>' + plan.label + '</strong><span>' +
  trip.meetingTime + '–' + plan.end + '</span></button>').join('');

const photoDialog = byId('photo-dialog');
let photoIndex = 0;
function showPhoto(index) {
  const items = placePhotos[selected] ?? [];
  if (!items.length) return;
  photoIndex = (index + items.length) % items.length;
  const photo = items[photoIndex];
  byId('gallery-title').textContent = trip.stops[selected].name + ' · ' + (photoIndex + 1) + '/' + items.length;
  byId('gallery').innerHTML = '<figure>' + photoMarkup(photo) + photoCredit(photo) + '</figure>';
  byId('gallery-thumbs').innerHTML = items.length > 1 ? items.map((item, i) =>
    '<button type="button" data-photo-index="' + i + '" aria-label="第 ' + (i + 1) + ' 张" aria-pressed="' + (i === photoIndex) + '">' +
    photoMarkup(item, true) + '</button>').join('') : '';
  byId('gallery-controls').hidden = items.length < 2;
}
byId('photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
byId('photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
let swipeX = 0;
byId('gallery').addEventListener('touchstart', event => { swipeX = event.changedTouches[0].clientX; }, { passive: true });
byId('gallery').addEventListener('touchend', event => {
  const delta = event.changedTouches[0].clientX - swipeX;
  if (Math.abs(delta) > 44) showPhoto(photoIndex + (delta < 0 ? 1 : -1));
}, { passive: true });

const handle = byId('drawer-handle');
const states = ['peek', 'detail', 'list'];
function moveDrawer(delta) {
  const index = states.indexOf(drawer.dataset.state);
  setDrawer(states[Math.max(0, Math.min(states.length - 1, index + delta))]);
  if (drawer.dataset.state === 'peek') map?.reset();
  else if (drawer.dataset.state === 'detail') map?.select(selected, true);
}
let dragStart = null;
let dragHandled = false;
handle.addEventListener('pointerdown', event => {
  dragStart = event.clientY;
  dragHandled = false;
  handle.setPointerCapture(event.pointerId);
});
handle.addEventListener('pointerup', event => {
  if (dragStart !== null && Math.abs(event.clientY - dragStart) > 28) {
    dragHandled = true;
    moveDrawer(event.clientY < dragStart ? 1 : -1);
  }
  dragStart = null;
});
handle.addEventListener('pointercancel', () => { dragStart = null; dragHandled = false; });
handle.addEventListener('click', () => {
  if (dragHandled) { dragHandled = false; return; }
  moveDrawer(drawer.dataset.state === 'list' ? -2 : 1);
});

document.addEventListener('click', async event => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.plan && target.dataset.plan !== planId) {
    planId = target.dataset.plan;
    renderPlan();
  }
  if (target.dataset.stop) {
    selectStop(target.dataset.stop);
    if (compact.matches) handle.focus({ preventScroll: true });
  }
  if (target.hasAttribute('data-meeting')) selectStop('meeting');
  if (target.dataset.drawer) {
    setDrawer(drawer.dataset.state === target.dataset.drawer ? 'peek' : target.dataset.drawer);
    if (drawer.dataset.state === 'detail') map?.select(selected, true);
    if (drawer.dataset.state === 'peek') map?.reset();
  }
  if (target.id === 'overview') {
    if (compact.matches) setDrawer('peek');
    map?.reset();
  }
  if (target.id === 'next') {
    const next = rows[rows.findIndex(row => row.id === selected) + 1];
    if (next) selectStop(next.id);
  }
  if (target.dataset.photoIndex !== undefined) {
    showPhoto(Number(target.dataset.photoIndex));
    byId('gallery-thumbs').querySelector('[aria-pressed="true"]')?.focus();
  }
  if (target.hasAttribute('data-amap-preview')) {
    const next = rows[rows.findIndex(row => row.id === selected) + 1];
    if (next) {
      const endpoint = id => placeFor(id).navigationLngLat.join(',') + ',' + trip.stops[id].name;
      byId('amap-frame').src = 'https://www.amap.com/ssr/embed/dir?' + new URLSearchParams({
        from: endpoint(selected), to: endpoint(next.id), type: 'walk', platform: 'pc',
      });
      byId('amap-preview-web').href = amapWalk(next.id, selected, false);
      byId('amap-preview').showModal();
    }
  }
  if (target.hasAttribute('data-gallery')) {
    showPhoto(0);
    photoDialog.showModal();
  }
  if (target.hasAttribute('data-checkin')) {
    if (checked.has(selected)) checked.delete(selected);
    else checked.add(selected);
    target.setAttribute('aria-pressed', String(checked.has(selected)));
    target.textContent = checked.has(selected) ? '已打卡 ✓' : '标记打卡';
    updateFootprints();
    try { localStorage.setItem(checkinKey, JSON.stringify([...checked])); }
    catch { byId('detail-status').textContent = '打卡仅在此页保留'; }
  }
  if (target.hasAttribute('data-copy-place')) {
    const coordinates = placeFor(selected)?.navigationLngLat;
    const name = trip.stops[selected].name + (coordinates ? ' · GCJ-02 ' + coordinates.join(',') : '');
    try {
      await navigator.clipboard.writeText(name);
      if (byId('detail-status')) byId('detail-status').textContent = '已复制 ' + name;
    } catch {
      if (byId('detail-status')) byId('detail-status').textContent = '请在高德搜索：' + name;
    }
  }
});

const shareDialog = byId('share-dialog');
const urlInput = byId('share-url');
byId('native-share').hidden = !navigator.share;
byId('share').addEventListener('click', () => {
  urlInput.value = new URL(location.pathname, location.href).href;
  byId('share-status').textContent = '';
  shareDialog.showModal();
});
byId('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(urlInput.value);
    byId('share-status').textContent = '已复制链接。';
  } catch {
    urlInput.focus();
    urlInput.select();
    byId('share-status').textContent = '请手动复制上方链接。';
  }
});
byId('native-share').addEventListener('click', async () => {
  try {
    await navigator.share({ title: document.title, url: urlInput.value });
    shareDialog.close();
  } catch (error) {
    if (error.name !== 'AbortError') byId('share-status').textContent = '可通过复制链接分享。';
  }
});
byId('info').addEventListener('click', () => byId('info-dialog').showModal());
byId('print').addEventListener('click', () => {
  byId('info-dialog').close();
  window.print();
});
byId('amap-preview').addEventListener('close', () => byId('amap-frame').removeAttribute('src'));
byId('locate').addEventListener('click', () => {
  const status = byId('map-status');
  status.hidden = false;
  if (!navigator.geolocation) {
    status.textContent = '当前浏览器无法获取位置。';
    return;
  }
  status.textContent = '正在定位…';
  byId('locate').disabled = true;
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    byId('locate').disabled = false;
    const { latitude, longitude, accuracy } = coords;
    if (latitude < 39.993 || latitude > 40.028 || longitude < 116.361 || longitude > 116.413) {
      status.textContent = '当前位置在本站地图范围外，可在高德中查看。';
      return;
    }
    if (compact.matches) setDrawer('peek');
    map?.showLocation(coords);
    status.textContent = '定位精度约 ±' + Math.ceil(accuracy) + ' 米';
  }, error => {
    byId('locate').disabled = false;
    status.textContent = error.code === 1 ? '未授权定位，地图和行程仍可使用。' : '暂时无法定位，请稍后再试。';
  }, { timeout: 12000, maximumAge: 0 });
});
compact.addEventListener('change', () => {
  if (compact.matches) setDrawer(map ? 'peek' : 'list');
  map?.reset();
});
renderPlan();
