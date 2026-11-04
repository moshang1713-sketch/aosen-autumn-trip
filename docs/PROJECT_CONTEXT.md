# 项目背景

「奥森南园 · 秋日光影」是面向手机浏览器的公开秋游指南，服务于秋景拍照、集合与返程。范围为北京市奥林匹克森林公园南园和南侧中轴。固定集合安排为 13:00、奥林匹克公园站 G 东北口。

Windows 本地工作区项目为 `aosen-autumn-trip`，原始 ZIP 保留在上一级工作区。站点用 HTML、CSS、原生 JavaScript 和本地 Leaflet，发布到 [GitHub Pages](https://moshang1713-sketch.github.io/aosen-autumn-trip/)。地图底图采用随站发布的 OpenStreetMap 区域数据，步行路线使用 FOSSGIS 快照，高德负责外部地图及步行导航。行程、地理坐标、路线和照片分别维护于 `src/trip.js`、`src/places.js`、`src/walks.js` 和 `src/photos.js`。活动日期、最终结束时间、统一返程或聚餐由组织者确认。
