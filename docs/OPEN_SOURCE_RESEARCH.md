# 开源项目调研与选型

查证日期：2026-11-05（北京时间）。Star、默认分支最后提交和归档状态取自 GitHub REST 仓库及提交接口。日期统一按提交记录 UTC。演示状态是同日 HTTP 检查，设备体验按上游设计说明，实际浏览器验证另记。

| 方向 / 仓库 | Star / 默认分支最后提交 | 许可与维护 | 技术与移动端 | 地图 / 依赖 / Pages / 风险 |
| --- | --- | --- | --- | --- |
| 行程与地图 · [TREK](https://github.com/liketrek/TREK) | 15,365 / [2026-10-31](https://github.com/liketrek/TREK/commit/dc36c21c08f681fd2806764fad8e17b270f6f175) | [AGPL-3.0](https://github.com/liketrek/TREK/blob/main/LICENSE)，未归档，近期活跃 | JS 全栈、离线 PWA、交互式日程，手机布局未实测 | Leaflet / Mapbox GL / MapLibre GL；OpenFreeMap 可免 Key，Google Places 等可选；[Demo](https://demo.liketrek.com/) HTTP 200。服务器、容器与多模块依赖，不能直接全量放到 Pages；改造后通过网络提供交互涉及 AGPL 对应源码义务。 |
| 行程与地图 · [TripKit](https://github.com/piti/tripkit) | 2 / [2026-06-29](https://github.com/piti/tripkit/commit/250b25ee9751a5bf5b2db4944b15a66c877e4779) | [MIT](https://github.com/piti/tripkit/blob/main/LICENSE)，未归档，近期维护未确认 | Node/JSON 或 YAML 生成 Leaflet 行程，移动布局未实测 | Esri 在线图层、Google 导航；默认 Key 未核实；可生成静态产物，含校验、媒体与渲染依赖，实际行走轨迹需另有合法来源。公开 Demo 未核实，常见 Pages 路径 HTTP 404。 |
| 行程与地图 · [Promptrip](https://github.com/sergfv/promptrip) | 2 / [2026-09-12](https://github.com/sergfv/promptrip/commit/20f7ffd7ffa4880b22af90ece48601b71a591da3) | [MIT](https://github.com/sergfv/promptrip/blob/main/LICENSE)，未归档，近两个月有提交 | 原生 JS 手机优先 PWA，地点抽屉和多日地图 | Leaflet、lz-string、远程照片、Service Worker。CARTO 配 Key，OSM 可免 Key；[Pages Demo](https://sergfv.github.io/promptrip/) HTTP 200。功能接近，但维护与使用规模小，移除导入、离线缓存和远程图片的代价高于升级初版。 |
| 地图与地点列表 · [HandsOnDataViz StoryMaps](https://github.com/HandsOnDataViz/leaflet-storymaps-with-google-sheets) | 323 / [2026-10-21](https://github.com/HandsOnDataViz/leaflet-storymaps-with-google-sheets/commit/8780ae6cf4e0c3092352b7c65e147a037adb8d96) | [MIT](https://github.com/HandsOnDataViz/leaflet-storymaps-with-google-sheets/blob/main/LICENSE)，未归档，近期有提交 | HTML/JS、Leaflet、jQuery，滚动叙事联动，手机可折叠地图 | [Pages Demo](https://handsondataviz.github.io/leaflet-storymaps-with-google-sheets/) HTTP 200；Google Sheets 可换成本地数据；默认供应商与 Key 细节未核实。需处理旧版前端脚本、两套路线和双向点击。 |
| 交互地图 · [Leaflet](https://github.com/Leaflet/Leaflet) | 45,831 / [2026-11-04](https://github.com/Leaflet/Leaflet/commit/ee23ede2df59ac0d70007f4eea0e52d896ce817f) | [BSD-2-Clause](https://github.com/Leaflet/Leaflet/blob/v1.9.4/LICENSE)，未归档，近期活跃 | 原生 JS，触摸平移与缩放，浏览器直接运行 | [官方示例与参考](https://leafletjs.com/reference-1.9.4.html)。可加载瓦片，也可用 CRS.Simple 加载本地原创 SVG。后一方式无 Key 和运行时依赖，可部署 Pages。行程数据和时间轴沿用本地初版。 |
| 落地页 · [Start Bootstrap Landing Page](https://github.com/StartBootstrap/startbootstrap-landing-page) | 1,671 / [2023-03-25](https://github.com/StartBootstrap/startbootstrap-landing-page/commit/247a46a2503c91d1157179eab297953438ec498b) | [MIT](https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)，未归档，仓库多年未提交 | 响应式 Bootstrap、Pug、Sass；旅游图文可换入 | [静态 Demo](https://startbootstrap.github.io/startbootstrap-landing-page/) HTTP 200；带 dist，修改源码要走 npm 构建。没有地图及行程交互，图像与字体需逐项检查权利。 |

MIT 要求随副本或实质部分保留版权与许可声明。BSD-2-Clause 的源码再分发需保留版权、条款和免责声明，二进制再分发须随材料附带这些内容。候选整站代码、第三方照片和标识均未引入。

## 选择

1. 首选：沿用用户 ZIP 静态初版的行程数据、Leaflet 地图交互与计划切换。采用 Leaflet 正式版 1.9.4，对应 [d15112c9e8ac339f0f74f563959d0423d291308d](https://github.com/Leaflet/Leaflet/commit/d15112c9e8ac339f0f74f563959d0423d291308d)，本地分发脚本和样式并保留许可证。保留原有打印、外链与分享，集中数据，替换秋日样式与示意底图，补双向联动与本机打卡。选用原项目已有的成熟组件能减少整站迁移、依赖和地理坐标误用。
2. 备选：StoryMaps。若后续目标以滚动讲解为主，模板可复用；本轮要保留两套时间表并降低远程数据依赖。
3. 第三：Promptrip。已有手机优先地图体验，适合将来需要由访问者导入行程的情形；本轮行程由组织者统一发布。

本地通过浏览器跑已选组件及改造后的站点。候选未逐一安装或实测手机。Leaflet 1.9.4 的 npm 包校验 SHA-512 与发布元数据一致，OSV 按该版本查询未返回已知漏洞。高德密钥、SDK 与底图选型证据见 [地图审计](MAP_DATA_AUDIT.md)。
