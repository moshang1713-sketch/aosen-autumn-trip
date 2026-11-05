const trip = {
  date: '日期待定',
  meetingTime: '13:00',
  stops: {
    meeting: { name: '奥林匹克公园站 G 东北口', keyword: '奥林匹克公园地铁站G东北口', tag: '集合点', duration: '清点与等候约 10 分钟', detail: '15 号线 G 东北口。出站请核对 G 口标识。返程另走 8 号线森林公园南门站。' },
    arch: { name: '和合牌坊', poi: 'B0HK1D9GOF', tag: '集体合照', duration: '建议 15–20 分钟', detail: '用牌坊两侧立柱做边框，队友站在同一排，把中轴留在画面中央。' },
    avenue: { name: '中轴银杏大道', keyword: '北京奥林匹克公园中心区', tag: '街景人像', duration: '沿途约 15 分钟', detail: '图钉标注树阵一带的步行参考点。找树阵形成的纵深，压低视角，用树叶做前景。' },
    gate: { name: '奥森南园南门', poi: 'B0FFHC94AP', tag: '入园点', duration: '短暂停留', detail: '图钉与导航标注实际门线附近，高德原 POI 位于南侧。入园时看现场指引。' },
    square: { name: '奥林匹克宣言广场', keyword: '奥林匹克森林公园 奥林匹克宣言广场', tag: '可选', duration: '顺路约 10 分钟', detail: '时间紧可跳过，把时间留给奥海西侧银杏。十境雕塑位置另待核实。' },
    lake: { name: '奥海西侧银杏', keyword: '奥林匹克森林公园 奥海', tag: '优先拍摄', duration: '建议 35–45 分钟', detail: '优先拍银杏与水面同框，再沿开放步道找逆光叶缘。图钉为区域附近步道，具体取景随光线调整。' },
    hill: { name: '仰山西坡', keyword: '奥林匹克森林公园 仰山', tag: '西坡彩叶', duration: '建议约 40 分钟', detail: '从西侧步道找林间侧光，拍红橙彩叶与深绿树冠。西坡参考点与山顶分开。' },
    return: { name: '森林公园南门站', poi: 'BS10019714', keyword: '森林公园南门地铁站B口', tag: '建议返程', duration: '按当天安排', detail: '建议从公园侧 B 口进 8 号线。开闭情况以现场指示为准。' },
  },
  plans: {
    comfy: {
      label: '舒适拍照版', end: '17:00', note: '多留时间给奥海与西坡。可按现场情况删减宣言广场，17:00 为建议结束时间。',
      rows: [[null, 'meeting'], ['13:15', 'arch'], ['13:40', 'avenue'], ['14:05', 'gate'], ['14:15', 'square'], ['14:40', 'lake'], ['15:35', 'hill'], ['16:45–17:00', 'return']],
    },
    fast: {
      label: '3 小时精简版', end: '16:00', note: '保留牌坊、中轴和奥海，仰山视步速决定。16:00 为建议结束时间。',
      rows: [[null, 'meeting'], ['13:15', 'arch'], ['13:35', 'avenue'], ['14:00', 'gate'], ['14:25', 'lake'], ['15:40–16:00', 'return']],
    },
  },
};

function amapSearch(keyword) {
  return 'https://uri.amap.com/search?' + new URLSearchParams({ keyword, city: '北京', src: 'aosen-autumn-trip', callnative: '1' });
}

function placeFor(id) {
  return typeof places === 'undefined' ? undefined : places[id];
}

function amapLink(id) {
  const stop = trip.stops[id];
  if (id === 'arch') return 'https://www.amap.com/place/' + stop.poi;
  if (id === 'meeting') return amapSearch(stop.keyword);
  const place = placeFor(id);
  if (!place?.navigationLngLat) return stop.poi ? 'https://www.amap.com/place/' + stop.poi : amapSearch(stop.keyword);
  return 'https://uri.amap.com/marker?' + new URLSearchParams({
    position: place.navigationLngLat.join(','), name: stop.name + (place.locationType === 'area' ? '附近步道' : ''),
    coordinate: 'gaode', src: 'aosen-autumn-trip', callnative: '1',
  });
}

function amapWalk(to, from, native = true) {
  const endpoint = id => placeFor(id).navigationLngLat.join(',') + ',' + trip.stops[id].name;
  if (!placeFor(to)?.navigationLngLat) return amapLink(to);
  const params = new URLSearchParams({ to: endpoint(to), mode: 'walk', src: 'aosen-autumn-trip', callnative: native ? '1' : '0' });
  if (from && placeFor(from)?.navigationLngLat) params.set('from', endpoint(from));
  return 'https://uri.amap.com/navigation?' + params;
}
