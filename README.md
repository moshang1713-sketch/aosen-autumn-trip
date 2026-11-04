# 奥森南园 · 秋日光影

队友共享的手机秋游指南。集合为 **13:00，奥林匹克公园站 G 东北口**。活动日期、建议结束时间和统一返程等待组织者确认。

## 本地运行

在项目根目录执行 `python -m http.server 8000 --bind 127.0.0.1`，浏览 [本地预览](http://127.0.0.1:8000/)。入口为 `index.html`。原生 HTML/CSS/JS，无需安装或构建，源码即 Pages 发布产物。语法检查可运行 `node --check src/trip.js`、`node --check src/map.js`、`node --check src/app.js`。

- 行程、时间、地点、拍摄提示在 `src/trip.js`。修改地图编号顺序时，只需调整对应方案的行程数组。
- `mapPoint` 是 `assets/route.svg` 的本地示意坐标（从下向上计算的 y，以及从左向右的 x），与经纬度无关。没有点位时省略该字段。
- 主题色及版式在 `src/styles.css`。插画、图标和示意底图为本项目原创 SVG。站内地图无需密钥或瓦片网络。实时查找由高德外部网页或 App 负责。
- 打卡只保存在当前浏览器的本地存储。方案切换保留打卡，清除浏览器数据会重置。出行日期和天气均由组织者及现场确认。

## 复用及许可证

原始基础为工作区内的「奥森南园秋游网站.zip」，保留双方案、Leaflet 路线、地点导航、分享和打印。二次开发拆分数据、地图适配、样式和界面，增加秋日插画、地图与时间轴双向联动、拍照卡片、本机打卡和地图失败降级。

地图引擎复用 [Leaflet/Leaflet v1.9.4](https://github.com/Leaflet/Leaflet/tree/v1.9.4)，[起始提交 d15112c9e8ac339f0f74f563959d0423d291308d](https://github.com/Leaflet/Leaflet/commit/d15112c9e8ac339f0f74f563959d0423d291308d)。`vendor/leaflet` 中为 npm 正式包分发文件，BSD-2-Clause 版权及许可原文见 [LICENSE](vendor/leaflet/LICENSE)。本次仅在站点适配层改造。详见 [开源选型](docs/OPEN_SOURCE_RESEARCH.md) 与 [地图审计](docs/MAP_DATA_AUDIT.md)。

## GitHub Pages

推送项目到专用 GitHub 仓库的 `main` 分支。仓库 Settings → Pages → Deploy from a branch → `main` → `/ (root)`。根目录的 `.nojekyll` 跳过 Jekyll。站内资源均用相对路径，可从仓库子路径访问。启用后以 Pages 设置页提供的实际 HTTPS 链接为准。[GitHub Pages 发布文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
