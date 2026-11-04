// mapPoint is [y, x] on the original route illustration, never latitude/longitude.
const trip = {
  date: '日期待定',
  meetingTime: '13:00',
  stops: {
    meeting: { name: '奥林匹克公园站 G 东北口', mapPoint: [62, 298], level: 'region', badge: '出口位置示意', keyword: '奥林匹克公园地铁站G东北口', detail: '13:00 在 15 号线 G 东北口集合。高德搜索后请认准 G 口。' },
    arch: { name: '和合牌坊', mapPoint: [126, 215], level: 'verified', badge: '已核实 POI', poi: 'B0HK1D9GOF', detail: '用牌坊两侧立柱做边框，队友站在同一排，尽量把中轴留在画面中央。' },
    avenue: { name: '中轴银杏大道', mapPoint: [190, 288], level: 'region', badge: '区域示意', keyword: '北京奥林匹克公园中心区', detail: '找树阵形成的纵深，低一点取景。可用树叶做前景，留一张有人走入画面的照片。' },
    gate: { name: '奥森南园南门', mapPoint: [257, 226], level: 'verified', badge: '已核实 POI', poi: 'B0FFHC94AP', detail: '从中轴向北入园，过路及入园以现场标识为准。' },
    square: { name: '宣言广场 / 十境雕塑', level: 'unknown', badge: '待核实 · 无标记', keyword: '奥林匹克森林公园 宣言广场', detail: '仅在现场指引明确且时间充足时顺路停留。' },
    lake: { name: '奥海西侧银杏', mapPoint: [368, 118], level: 'region', badge: '区域示意', keyword: '奥林匹克森林公园 奥海', detail: '找银杏和水面同框的角度。先拍广角湖景，再靠边拍逆光叶缘；沿开放步道取景。' },
    hill: { name: '仰山西坡', mapPoint: [481, 195], level: 'region', badge: '区域示意', keyword: '奥林匹克森林公园 仰山', detail: '找林间侧光，拍红橙彩叶与深绿树冠的层次。按开放步道活动，西坡与山顶分开看。' },
    return: { name: '森林公园南门站', mapPoint: [231, 371], level: 'verified', badge: '已核实站点 POI', poi: 'BS10019714', detail: '建议在 8 号线森林公园南门站返程，进站口按现场标识选择。' },
  },
  photos: [
    { id: 'arch', tag: '集体合照', art: 'arch', duration: '建议 15–20 分钟' },
    { id: 'avenue', tag: '街景与人像', art: 'avenue', duration: '建议沿途边走边拍' },
    { id: 'lake', tag: '优先留时间', art: 'lake', duration: '舒适版建议 35–45 分钟' },
    { id: 'hill', tag: '西坡彩叶', art: 'hill', duration: '舒适版建议约 40 分钟' },
  ],
  plans: {
    comfy: {
      label: '舒适拍照版', end: '17:00', note: '多留时间给湖边与西坡。16:00 左右折返，17:00 为建议结束时间。',
      rows: [
        [null, 'meeting', '清点人员，在 G 东北口集合。'],
        ['13:15', 'arch', '在牌坊附近拍一张集体合照。'],
        ['13:35', 'avenue', '沿中轴找银杏与树阵，边走边拍。'],
        ['13:55', 'gate', '从南门进园，留意现场指引。'],
        ['14:00', 'square', '可选。若找不到或想多拍银杏，直接略过。'],
        ['14:25', 'lake', '核心拍照点，建议留 35–45 分钟。'],
        ['15:10', 'hill', '建议约 40 分钟，视体力和天色调整。'],
        ['16:00', null, '开始折返，按现场指引走向返程站。'],
        ['17:00', 'return', '建议结束时间，以现场情况为准。'],
      ],
    },
    fast: {
      label: '精简版', end: '16:00', note: '优先保留牌坊、中轴和奥海。仰山看步速决定，返程时间以现场为准。',
      rows: [
        [null, 'meeting', '清点人员，在 G 东北口集合。'],
        ['13:15', 'arch', '在牌坊快速合照。'],
        ['13:25', 'avenue', '沿中轴拍银杏，遇拥挤就继续往北。'],
        ['13:45', 'gate', '入园后先去奥海西侧。'],
        ['14:05', 'lake', '优先拍湖边银杏，建议约 40 分钟。'],
        ['15:00', null, '仰山西坡只在时间和体力都允许时顺路，适时折返。'],
        ['16:00', 'return', '建议结束时间，以现场情况为准。'],
      ],
    },
  },
};

function amapLink(stop) {
  if (stop.poi) return 'https://www.amap.com/place/' + stop.poi;
  const query = new URLSearchParams({
    keyword: stop.keyword, city: '北京', src: 'aosen-autumn-trip', callnative: '1',
  });
  return 'https://uri.amap.com/search?' + query;
}
