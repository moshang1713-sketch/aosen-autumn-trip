const trip = {
  date: '11月8日',
  meetingTime: '13:00',
  stops: {
    meeting: { name: '奥林匹克公园站 G 东北口', keyword: '奥林匹克公园地铁站G东北口', tag: '集合点', duration: '13:05 出发', detail: '15 号线 G 东北口。出站请核对 G 口标识。主线从林萃桥站 C1 东南口返程。' },
    arch: { name: '和合牌坊', poi: 'B0HK1D9GOF', tag: '集体合照', duration: '顺路合照', detail: '用牌坊两侧立柱做边框，队友站在同一排，把中轴留在画面中央。' },
    avenue: { name: '中轴银杏大道', keyword: '北京奥林匹克公园中心区', tag: '街景人像', duration: '沿途约 15 分钟', detail: '图钉标注树阵一带的步行参考点。找树阵形成的纵深，压低视角，用树叶做前景。' },
    gate: { name: '奥森南园南门', poi: 'B0FFHC94AP', tag: '入园点', duration: '短暂停留', detail: '图钉与导航标注实际门线附近，高德原 POI 位于南侧。入园时看现场指引。' },
    square: { name: '奥林匹克宣言广场', keyword: '奥林匹克森林公园 奥林匹克宣言广场', tag: '途经', duration: '顺路打卡', detail: '经过宣言广场后前往奥海西侧银杏林。十境雕塑为之后的独立一站。' },
    lake: { name: '奥海西侧银杏', keyword: '奥林匹克森林公园 奥海', tag: '优先拍摄', duration: '拍照 10 分钟', detail: '优先拍银杏与水面同框，再沿开放步道找逆光叶缘。图钉为区域附近步道，具体取景随光线调整。' },
    hill: { name: '仰山西坡', keyword: '奥林匹克森林公园 仰山', tag: '西坡彩叶', duration: '建议约 40 分钟', detail: '从西侧步道找林间侧光，拍红橙彩叶与深绿树冠。西坡参考点与山顶分开。' },
    sculpture: { name: '十境雕塑', keyword: '奥林匹克森林公园 十境雕塑', tag: '位置参考', duration: '停留约 8 分钟', detail: '图钉按攻略截图估算。搜索时使用完整名称“十境雕塑”。' },
    cascade: { name: '叠水花台', keyword: '奥林匹克森林公园 叠水花台', tag: '湿地景观', duration: '停留约 8 分钟', detail: '图钉按攻略截图估算，准确落脚点请在高德搜索或查看现场指引。' },
    xishi: { name: '夕拾台', keyword: '奥林匹克森林公园 夕拾台', tag: '西侧半山腰', duration: '停留约 6 分钟', detail: '在仰山西侧半山腰打卡，之后前往山顶。' },
    summit: { name: '仰山天境', keyword: '奥林匹克森林公园 仰山 天境', tag: '15:00 决策点', duration: '登顶后停留约 10 分钟', detail: '15:00 前登顶走主线。15:00 仍未登顶，取消生态廊道，登顶拍完后往南返程。' },
    corridor: { name: '生态廊道', keyword: '北京奥林匹克公园 生态廊道', tag: '跨北五环', duration: '停留约 10 分钟', detail: '游览跨北五环的生态廊道。按截图安排，不继续游览北园，向林萃桥站撤离。符合此约束的撤离步道待现场核实。' },
    lincui: { name: '林萃桥站 C1 东南口', keyword: '林萃桥地铁站 C1 东南口', tag: '推荐终点', duration: '计划 15:53 到站', detail: '从 C1 东南口乘 8 号线向朱辛庄方向。' },
    return: { name: '森林公园南门站', poi: 'BS10019714', keyword: '森林公园南门地铁站B口', tag: '建议返程', duration: '按当天安排', detail: '建议从公园侧 B 口进 8 号线。开闭情况以现场指示为准。' },
  },
  plans: {
    comfy: {
      label: '主线 · 林萃桥', end: '16:00',
      note: '13:05 出发，经和合牌坊、南园南门、宣言广场，13:55 到奥海西侧。15:00 前登顶可继续走生态廊道，预计 15:53 到林萃桥 C1。截图参考：廊道至林萃桥约 31 分钟，若从廊道折回森林公园南门约 30 分钟。时间随现场调整。',
      rows: [[null, 'meeting'], ['13:05–13:55 途经', 'arch'], ['13:05–13:55 途经', 'gate'], ['13:05–13:55 途经', 'square'], ['13:55–14:05', 'lake'], ['14:05–14:22', 'sculpture'], ['14:22–14:32', 'cascade'], ['14:32–14:51', 'xishi'], ['14:51–15:04', 'summit'], ['15:04–15:22', 'corridor'], ['15:22–15:53', 'lincui']],
    },
    fast: {
      label: '延误备选 · 南门', end: '约 16:00',
      note: '15:00 仍未登顶：跳过生态廊道，天境拍完后直接向南走。按截图估算，从天境到森林公园南门站约 24 分钟，若 15:15 出发则约 15:39 到。实际到站时间随登顶时间调整。',
      rows: [[null, 'meeting'], ['13:05–13:55 途经', 'arch'], ['13:05–13:55 途经', 'gate'], ['13:05–13:55 途经', 'square'], ['13:55–14:05', 'lake'], ['14:05–14:22', 'sculpture'], ['14:22–14:32', 'cascade'], ['14:32–14:51', 'xishi'], ['15:00 后按进度', 'summit'], ['离开天境后约 24 分钟', 'return']],
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
