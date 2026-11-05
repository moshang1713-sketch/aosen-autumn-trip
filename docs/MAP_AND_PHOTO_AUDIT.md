# 地图与照片审核

2026-11-05。现有站内 Leaflet 采用 OSM WGS84 底图及 FOSSGIS 已存步行曲线。精确 POI 与区域参考点分开，参见 [地图审计](MAP_DATA_AUDIT.md)。本轮不改两套站序和路径。生态廊道与夕拾台仍为未纳入行程的候选。

高德 JS API 2.0 需要 Web Key 和安全代理，静态 Pages 不能保存安全密钥。保留站内主地图，使用官方免 Key 的高德 iframe 按需预览相邻一段。独立 iframe 无实时路况、无法与站内自定义图钉联动。移动端步行 URI 尝试唤起 App，网页版使用 callnative=0。用户点击定位才请求一次浏览器位置，仅在内存绘制精度圈与蓝点。站内不传递浏览器定位，高德侧独立获取起点。

- [安全代理](https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode)
- [高德步行 URI](https://lbs.amap.com/api/uri-api/guide/travel/route)
- [免 Key 嵌入路线](https://lbs.amap.com/api/uri-api/guide/embedded-map/embedded-route)

照片包 11 条记录均检查了路径、文件、WebP 格式、字节重复和许可字段。接入 Commons 同系列第 3–6 张，逐张核对拍摄日期、坐标、作者和 CC BY-SA 4.0。牌坊照片的来源只称门楼，宣言广场三张是附近水域的鸿雁，返程素材拍的是 C 口而路线建议 B 口，另外两张历史候选的地点与主题证据弱于同系列素材。本轮未发布这 7 张。原 6 张授权照片继续保留，合计 10 张。
