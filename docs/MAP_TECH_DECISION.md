# 地图技术决策

## 旧站与高德为何不同

升级前的公开版本为 `620c127`。旧 `src/map.js` 使用 `L.CRS.Simple` 和本地 `assets/route.svg`，`src/trip.js` 的 `mapPoint` 是 SVG 里的像素坐标。例如 G 口为 `[62, 298]`。折线由站点顺序直接连成，未接入地理底图或路径服务。原来高德 POI 和地铁站外链仅用于跳转，所以主要差异来自示意投影和示意路径，并非站内 GCJ-02 坐标偏移。

两张用户截图只作参考。桌面参考的前两站是重复的 G 口。高德参考是 G 口出发、经 8 地并结束于生态廊道的另一条线。其 4.1 公里、72 分钟属于该站序，当前两套计划暂以森林公园南门站 B 口返程。

## 首选高德方案与限制

高德 JS API 2.0 需 Web 端 Key，2021-12-02 后申请的 Key 需安全密钥。正式发布时在受控服务器上注入安全密钥，并将 `window._AMapSecurityConfig.serviceHost` 指向代理；在高德控制台配置实际 Pages 主机名白名单。Pages 可继续托管前端，静态资源无法保管安全密钥。Web 服务步行 API 是另一类 Key，应在代理内调用。逐对请求相邻的地点，保存步行几何、耗时、距离、失败状态，地图初始化后只显示当前方案的有效结果。

账号实名档位、API 和并发分别计量。查询时，高德计费表中个人认证的 JS 地图图面初始化为 150 万次/月、10 QPS；这个配额不等于 Web 服务步行权限或免费额度。费用按账号实际资质和接口确认。若组织者决定接入，需提供已获授权的 HTTPS 代理地址，在各自控制台完成域名、密钥、限制接口和调用配额设置，安全密钥只存放在代理环境。无需在聊天或 Git 提供密钥。本轮未申请账号、开通服务或部署代理。

- [JS API 2.0 快速上手](https://lbs.amap.com/api/javascript-api-v2/getting-started)
- [安全密钥及代理](https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode)
- [域名白名单及初始化验证](https://lbs.amap.com/news/initialization_amap)
- [JS 步行规划](https://lbs.amap.com/api/maps-javascript-api/reference/route/walking)
- [Web 服务步行路线 2.0](https://lbs.amap.com/api/webservice/guide/api/newroute)
- [基础服务计费](https://lbs.amap.com/pages/base_service_price)

## 本轮上线方案

沿用本地 Leaflet 1.9.4，启用 EPSG:3857 投影，使用 WGS84 地理数据。从 OpenStreetMap 公开数据接口一次性导出区域图形并随站发布，由 Leaflet 渲染公园、路网、水体和建筑。网站不访问开放瓦片服务。落地时对已定位的相邻站点逐段调用 FOSSGIS OSRM 步行服务，按每秒最多一个请求的规则生成静态快照。浏览器运行时没有第三方算路依赖。出发前仍需核对现场步道和开放情况。

高德 URI 标点、关键词查询和步行跳转作为实际出游入口。为明确当前站和下一站，传入各自的同一落脚点 GCJ-02 数据。高德嵌入路线可显示其服务的两点路线，iframe 无法支持这轮的原生标记、卡片和抽屉联动，因此页面使用自有 Leaflet 地理底图。高德外链 H5 和 App 由高德侧处理定位或权限。

- [Leaflet 1.9.4](https://leafletjs.com/reference-1.9.4.html)
- [OpenStreetMap 许可与署名](https://www.openstreetmap.org/copyright)
- [FOSSGIS 算路说明及服务规则](https://routing.openstreetmap.de/about.html)
- [高德标点 URI](https://lbs.amap.com/api/uri-api/guide/mobile-web/point)
- [高德步行 URI](https://lbs.amap.com/api/uri-api/guide/travel/route)
