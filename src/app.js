const byId = id => document.getElementById(id);
const motion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const checkinKey = 'aosen-autumn-trip.checkins.v1';
let checked = new Set();
try {
  const saved = JSON.parse(localStorage.getItem(checkinKey));
  if (Array.isArray(saved)) checked = new Set(saved.filter(id => Object.hasOwn(trip.stops, id)));
} catch { /* A blocked or invalid store leaves check-ins available for this visit. */ }
let planId = 'comfy';
let rows = [];
let selected = null;
let map = null;
try {
  map = createRouteMap(id => selectStop(id));
} catch {
  byId('map').replaceChildren();
}
if (!map) {
  const fallback = document.createElement('p');
  fallback.className = 'map-fallback';
  fallback.textContent = '地图暂不可用。请在行程中查看站点顺序及高德入口。';
  byId('map').replaceChildren(fallback);
}
byId('reset-map').hidden = !map;
byId('reset-map').addEventListener('click', () => map.reset());
byId('meeting-time').textContent = trip.meetingTime;
byId('trip-date').textContent = trip.date;
byId('meeting-title').textContent = trip.stops.meeting.name;
byId('meeting-link').href = amapLink(trip.stops.meeting);

function locationLink(stop) {
  return '<a class="action" target="_blank" rel="noopener noreferrer" href="' + amapLink(stop).replaceAll('&', '&amp;') + '">高德查看 ↗</a>';
}

function focusButton(id, label) {
  return '<button class="action" type="button" data-focus="' + id + '">' + label + '</button>';
}

function renderPlan() {
  const plan = trip.plans[planId];
  let number = 0;
  rows = plan.rows.map(([time, id, note]) => ({
    time: time ?? trip.meetingTime, id, note, stop: trip.stops[id],
    number: id ? ++number : null,
  }));
  byId('plan-note').textContent = plan.note;
  for (const button of byId('plans').querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.plan === planId));
  }
  byId('timeline').innerHTML = rows.map(({ time, id, stop, note, number }) =>
    '<li class="stop" data-stop="' + (id ?? '') + '">' +
    '<div class="stop-meta"><time>' + time + '</time>' +
    (number ? '<span class="stop-number ' + stop.level + '">' + number + '</span>' : '') + '</div>' +
    '<div><h4>' + (stop?.name ?? '行程提醒') + '</h4>' +
    (stop ? '<span class="badge ' + stop.level + '">' + stop.badge + '</span>' : '') +
    '<p>' + note + '</p>' + (stop ? '<div class="actions">' +
    (map && stop.mapPoint ? focusButton(id, '地图定位') : '') + locationLink(stop) + '</div>' : '') +
    '</div></li>'
  ).join('');
  map?.render(rows);
  for (const button of byId('photo-list').querySelectorAll('[data-focus]')) {
    button.hidden = !rows.some(row => row.id === button.dataset.focus);
  }
  if (!rows.some(row => row.id === selected)) selected = null;
  selectStop(selected);
}

function selectStop(id, center = false) {
  selected = id;
  map?.select(id, center);
  for (const card of document.querySelectorAll('[data-stop]')) {
    card.classList.toggle('selected', Boolean(id && card.dataset.stop === id));
  }
  const row = rows.find(item => item.id === id && item.stop);
  byId('map-selection').innerHTML = row
    ? '<strong>' + row.number + ' · ' + row.stop.name + '</strong><p>' + row.stop.detail + '</p>' +
      '<div class="actions"><a class="action" href="#schedule" data-row="' + id + '">查看此站行程</a>' + locationLink(row.stop) + '</div>'
    : '点击地图编号查看地点详情。';
  if (center) byId('map-panel').scrollIntoView({ behavior: motion ? 'smooth' : 'instant', block: 'start' });
}

byId('plans').innerHTML = Object.entries(trip.plans).map(([key, plan]) =>
  '<button type="button" data-plan="' + key + '"><strong>' + plan.label +
  '</strong><span>' + trip.meetingTime + '–' + plan.end + '</span></button>'
).join('');

byId('plans').addEventListener('click', event => {
  const button = event.target.closest('[data-plan]');
  if (!button || button.dataset.plan === planId) return;
  planId = button.dataset.plan;
  renderPlan();
});

function renderPhotos() {
  byId('photo-list').innerHTML = trip.photos.map(({ id, tag, art, duration }) => {
    const stop = trip.stops[id];
    return '<article class="photo" data-stop="' + id + '"><div class="photo-art ' + art + '"><span>' + tag +
      '</span></div><div class="photo-copy"><h3>' + stop.name + '</h3><p class="duration">' + duration +
      '</p><p>' + stop.detail + '</p><div class="actions">' +
      (map && stop.mapPoint ? focusButton(id, '地图定位') : '') +
      locationLink(stop) + '<button class="action checkin" type="button" data-checkin="' + id +
      '" aria-label="' + stop.name + '打卡" aria-pressed="' + checked.has(id) + '">' +
      (checked.has(id) ? '✓ 已打卡' : '标记打卡') + '</button></div></div></article>';
  }).join('');
}

document.addEventListener('click', event => {
  const focus = event.target.closest('[data-focus]');
  if (focus) selectStop(focus.dataset.focus, true);
  const rowLink = event.target.closest('[data-row]');
  if (rowLink) {
    const card = byId('timeline').querySelector('[data-stop="' + rowLink.dataset.row + '"]');
    if (card) {
      event.preventDefault();
      card.scrollIntoView({ behavior: motion ? 'smooth' : 'instant', block: 'center' });
      card.querySelector('button, a').focus({ preventScroll: true });
    }
  }
  const button = event.target.closest('[data-checkin]');
  if (!button) return;
  const id = button.dataset.checkin;
  if (checked.has(id)) checked.delete(id);
  else checked.add(id);
  button.setAttribute('aria-pressed', String(checked.has(id)));
  button.textContent = checked.has(id) ? '✓ 已打卡' : '标记打卡';
  try {
    localStorage.setItem(checkinKey, JSON.stringify([...checked]));
  } catch {
    document.querySelector('#photos .section-heading > p').textContent = '当前浏览器无法保存，打卡仅在此页保留。';
  }
});

const dialog = byId('share-dialog');
const urlInput = byId('share-url');
byId('native-share').hidden = !navigator.share;
byId('share').addEventListener('click', () => {
  urlInput.value = new URL(location.pathname, location.href).href;
  byId('share-status').textContent = ['localhost', '127.0.0.1'].includes(location.hostname)
    ? '当前是本地预览地址，仅此设备可用。' : '';
  dialog.showModal();
});
byId('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(urlInput.value);
    byId('share-status').textContent = '已复制链接。';
  } catch {
    urlInput.focus();
    urlInput.select();
    byId('share-status').textContent = '请选择并手动复制上方链接。';
  }
});
byId('native-share').addEventListener('click', async () => {
  try {
    await navigator.share({ title: document.title, url: urlInput.value });
    dialog.close();
  } catch (error) {
    if (error.name !== 'AbortError') byId('share-status').textContent = '可通过复制链接分享。';
  }
});
byId('print').addEventListener('click', () => window.print());
renderPhotos();
renderPlan();
