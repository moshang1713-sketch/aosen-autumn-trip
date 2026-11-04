# 奥森南园 · 秋日光影

手机优先的秋游地图。集合为 **13:00，奥林匹克公园站 G 东北口**。活动日期、建议结束时间和统一返程等待组织者确认。[公开站点](https://moshang1713-sketch.github.io/aosen-autumn-trip/)

## 本地运行

在项目根目录执行 `python -m http.server 8000 --bind 127.0.0.1`，打开 [本地预览](http://127.0.0.1:8000/)。入口是 `index.html`。站点源码即发布产物，无需 npm 安装或构建。运行 `node --test tests/map-data.cjs` 验证地理数据和导航坐标。

- `src/trip.js` 管理行程顺序、建议时间、地点说明及高德链接。
- `src/places.js` 保存地点原始证据、WGS84 地图点和 GCJ-02 导航点。
- `src/walks.js` 保存逐段步行快照。修改站序时若缺少新路段，前端会标明缺口。现场导航可通过高德步行 URI 使用。
- `assets/maps/aosen-osm.geojson` 为区域地理底图。数据署名 © OpenStreetMap contributors，采用 [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)。地图不调用外部瓦片。
- `src/photos.js` 及 `assets/photos/` 管理照片和缩略图，来源与权限见 [照片清单](docs/PHOTO_SOURCES.md)。
- 打卡保存在本机浏览器，方案切换保留。日期和建议安排由组织者确认。

## 开源与部署

初版来自用户提供的「奥森南园秋游网站.zip」，本仓库保持原站点及数据结构。地图复用 [Leaflet v1.9.4](https://github.com/Leaflet/Leaflet/tree/v1.9.4)（[提交 d15112c](https://github.com/Leaflet/Leaflet/commit/d15112c9e8ac339f0f74f563959d0423d291308d)，[BSD-2-Clause 许可](vendor/leaflet/LICENSE)）。本轮将旧示意图升级为地理底图与步行路径、桌面侧栏和手机抽屉，并添加合规实拍。见 [开源选型](docs/OPEN_SOURCE_RESEARCH.md)、[地图技术决策](docs/MAP_TECH_DECISION.md) 与 [地图数据审计](docs/MAP_DATA_AUDIT.md)。

GitHub Pages 使用 `main` 根目录并通过 `.nojekyll` 跳过 Jekyll，资源采用相对路径。先在独立分支验证，通过后快进合并到主分支，待 Pages 部署完成再测试公开 URL。旧示意版可从提交 `620c127` 查看。
