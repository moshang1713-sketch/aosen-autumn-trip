# 地图数据审计

核查于 2026-11-05（北京时间）。表中高德坐标为公开 POI 页原文，顺序为纬度、经度，属于高德坐标语境，未导入站内示意图。编号是路线中的序号，示意图位置不按比例绘制。

| 地点 | 坐标 / 证据 | 站内标记与导航 |
| --- | --- | --- |
| 奥林匹克公园站 G 东北口 | [北京地铁 15 号线](https://www.bjsubway.com/station/xltcx/line15/2014-12-24/446.html?sk=1)列出 G 口；[高德和合牌坊](https://www.amap.com/place/B0HK1D9GOF)的地址确认称谓。出口精确坐标未核实。 | 出口位置示意，使用「奥林匹克公园地铁站G东北口」搜索。集合 13:00。 |
| 和合牌坊 | [高德 POI](https://www.amap.com/place/B0HK1D9GOF) 40.004706, 116.393618。 | 已核实 POI，链接至对应详情。 |
| 奥林匹克公园中轴银杏大道 | 初版路线与[北京市政府公园介绍](https://www.beijing.gov.cn/renwen/rwzyd/qxdw/shaozhcqychy/alpkslgy/202309/t20230921_3263699.html)支持中轴区域背景，具体银杏树阵的起止及点位待核。 | 区域示意，搜索奥林匹克公园中心区。 |
| 奥森南园南门 | [高德 POI](https://www.amap.com/place/B0FFHC94AP) 40.010160, 116.392633。 | 已核实 POI，链接至对应详情。 |
| 宣言广场 / 十境雕塑 | 初版列为顺路候选，精确点位和可通行性未核实。 | 时间轴可选项，无地图标记。 |
| 奥海西侧银杏 | [北京市政府赏秋资料](https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202610/t20261028_4921713.html)及[园林绿化局奥海介绍](https://yllhj.beijing.gov.cn/sdlh/bhsdbhdqzs/sdzx/yqdssd/202012/t20201208_2159729.shtml)支持区域与相对方位。树群边界及入口待核。 | 区域示意，搜索奥海，抵达后现场择点。 |
| 仰山西坡 | [北京市政府秋景资料](https://www.beijing.gov.cn/renwen/zt/qrshzjc/yhjq/202510/t20251031_4248495.html)确认西坡景观，西坡具体步道入口待核。 | 区域示意，搜索仰山，再按西坡与现场标识定位。 |
| 叠水花台 / 夕拾台 | 具体点位和开放情况未核实。 | 候选支线，无地图标记，不进入建议时间表。 |
| 生态廊道 | 实际可通行性及所需时间未核实。 | 候选支线，无地图标记，不进入建议时间表。 |
| 森林公园南门站 | [高德 POI](https://www.amap.com/place/BS10019714) 40.010122, 116.392600（站级）。 | 已核实站点 POI，链接至对应详情。8 号线建议返程站。 |

路线虚线仅表达游览顺序。未采集园内步道轨迹、距离、交通 ETA 或出行当天花期与天气。通行、免费入园与预约信息以当日公告为准。[园林绿化局公园名录](https://yllhj.beijing.gov.cn/ggfw/bjsggml/zhgy/cyq/202206/t20220614_2740317.shtml)

## 高德 SDK 与无密钥方案

高德 JS API 2.0 需 Web 端 Key，新 Key 需配套安全密钥。生产环境官方建议将安全密钥保存在服务端代理，并在控制台配置匹配实际域名的白名单。高德按认证档位和接口分别计量。查证时计费表中个人认证档的「JS地图图面初始化」为 150 万次/月、10 QPS；超额处理及其他接口以账号、控制台和官方计费页为准。GitHub Pages 可托管静态前端，安全代理需单独部署。本轮使用本地示意图与免 Key 的 HTTPS URI 搜索。URI 支持移动端尝试唤起高德 App，保留高德 H5 入口。已核实的常规 POI 提供高德详情页。

- [JS API 2.0 准备](https://lbs.amap.com/api/javascript-api-v2/prerequisites)
- [安全密钥与代理](https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode)
- [图面初始化验证与域名白名单](https://lbs.amap.com/news/initialization_amap)
- [官方计费说明](https://lbs.amap.com/pages/base_service_price)
- [URI 搜索参数与 App 唤起](https://lbs.amap.com/api/uri-api/guide/search/search)
