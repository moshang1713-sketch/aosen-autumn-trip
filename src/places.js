// Source and provider coordinates in [longitude, latitude] order.
const places = {
  "meeting": {
    "lngLat": [
      116.387406,
      40.0012419
    ],
    "coordinateSystem": "WGS84",
    "locationType": "exact",
    "confidence": "出口级 · OSM 与实拍交叉核对",
    "sourceUrl": "https://www.openstreetmap.org/node/6813793816",
    "mapLngLat": [
      116.387406,
      40.0012419
    ],
    "navigationLngLat": [
      116.3936567,
      40.0026448
    ],
    "verifiedAt": "2026-11-05"
  },
  "arch": {
    "lngLat": [
      116.393618,
      40.004706
    ],
    "coordinateSystem": "GCJ02",
    "locationType": "exact",
    "confidence": "高德 POI · 转换后上图",
    "sourceUrl": "https://www.amap.com/place/B0HK1D9GOF",
    "mapLngLat": [
      116.387367,
      40.003303
    ],
    "navigationLngLat": [
      116.393618,
      40.004706
    ],
    "verifiedAt": "2026-11-05"
  },
  "avenue": {
    "lngLat": [
      116.3865675,
      40.0057281
    ],
    "coordinateSystem": "WGS84",
    "locationType": "area",
    "confidence": "中轴树阵 · 步行参考点",
    "sourceUrl": "https://www.visitbeijing.com.cn/article/49GZVCiGq2A?device=amp",
    "mapLngLat": [
      116.3865675,
      40.0057281
    ],
    "navigationLngLat": [
      116.3928182,
      40.0071307
    ],
    "verifiedAt": "2026-11-05"
  },
  "gate": {
    "lngLat": [
      116.38629375,
      40.0098628
    ],
    "coordinateSystem": "WGS84",
    "locationType": "exact",
    "confidence": "OSM 实体南门 · 高德标注在南侧",
    "sourceUrl": "https://www.openstreetmap.org/way/270377155",
    "mapLngLat": [
      116.3862937,
      40.0098628
    ],
    "navigationLngLat": [
      116.3925447,
      40.0112654
    ],
    "verifiedAt": "2026-11-05"
  },
  "square": {
    "lngLat": [
      116.3831252,
      40.0108703
    ],
    "coordinateSystem": "WGS84",
    "locationType": "exact",
    "confidence": "OSM 广场点 · 可选",
    "sourceUrl": "https://www.openstreetmap.org/node/10205804954",
    "mapLngLat": [
      116.3831252,
      40.0108703
    ],
    "navigationLngLat": [
      116.3893736,
      40.0122706
    ],
    "verifiedAt": "2026-11-05"
  },
  "lake": {
    "lngLat": [
      116.380662,
      40.0117095
    ],
    "coordinateSystem": "WGS84",
    "locationType": "area",
    "confidence": "银杏区西南侧 · 步行参考点",
    "sourceUrl": "https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202611/t20261104_4931928.html",
    "mapLngLat": [
      116.380662,
      40.0117095
    ],
    "navigationLngLat": [
      116.3869081,
      40.0131077
    ],
    "verifiedAt": "2026-11-05"
  },
  "hill": {
    "lngLat": [
      116.3839456,
      40.0169127
    ],
    "coordinateSystem": "WGS84",
    "locationType": "area",
    "confidence": "仰山西坡 · 步道参考点",
    "sourceUrl": "https://www.openstreetmap.org/way/120407426",
    "mapLngLat": [
      116.3839456,
      40.0169127
    ],
    "navigationLngLat": [
      116.3901955,
      40.0183139
    ],
    "verifiedAt": "2026-11-05"
  },
  "return": {
    "lngLat": [
      116.3868119,
      40.009042
    ],
    "coordinateSystem": "WGS84",
    "locationType": "exact",
    "confidence": "8 号线 · 建议 B 口",
    "sourceUrl": "https://www.openstreetmap.org/node/1346457391",
    "mapLngLat": [
      116.3868119,
      40.009042
    ],
    "navigationLngLat": [
      116.3930632,
      40.0104449
    ],
    "verifiedAt": "2026-11-05"
  },
  "xishi": {
    "lngLat": [
      116.38347,
      40.0168001
    ],
    "coordinateSystem": "WGS84",
    "locationType": "exact",
    "confidence": "OSM 夕拾台景观点",
    "sourceUrl": "https://www.openstreetmap.org/node/13305744788",
    "mapLngLat": [
      116.38347,
      40.0168001
    ],
    "navigationLngLat": [
      116.3897195,
      40.0182009
    ],
    "verifiedAt": "2026-11-05"
  },
  "summit": {
    "lngLat": [
      116.3861579,
      40.0175973
    ],
    "coordinateSystem": "WGS84",
    "locationType": "area",
    "confidence": "OSM 仰山山顶参考点",
    "sourceUrl": "https://www.openstreetmap.org/node/4367214507",
    "mapLngLat": [
      116.3861579,
      40.0175973
    ],
    "navigationLngLat": [
      116.3924098,
      40.0190001
    ],
    "verifiedAt": "2026-11-05"
  },
  "corridor": {
    "lngLat": [
      116.3856753,
      40.0213474
    ],
    "coordinateSystem": "WGS84",
    "locationType": "area",
    "confidence": "生态廊道桥段参考点 · 以现场指引为准",
    "sourceUrl": "https://www.openstreetmap.org/way/173491953",
    "mapLngLat": [
      116.3856753,
      40.0213474
    ],
    "navigationLngLat": [
      116.3919273,
      40.0227501
    ],
    "verifiedAt": "2026-11-05"
  },
  "lincui": {
    "lngLat": [
      116.3677876,
      40.0204201
    ],
    "coordinateSystem": "WGS84",
    "locationType": "exact",
    "confidence": "OSM 林萃桥站 C1 出入口",
    "sourceUrl": "https://www.openstreetmap.org/node/7603978079",
    "mapLngLat": [
      116.3677876,
      40.0204201
    ],
    "navigationLngLat": [
      116.3740178,
      40.0218044
    ],
    "verifiedAt": "2026-11-05"
  }
};
