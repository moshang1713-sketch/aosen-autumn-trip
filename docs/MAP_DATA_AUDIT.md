# 地图数据审计

核查于 2026-11-05（北京时间）。站内标记使用 WGS84，高德导航使用 GCJ-02。表内坐标顺序为经度、纬度。临时开放、拥堵与路况以现场为准。

| 地点 | 原始数据及可信度 | 地图与高德导航 |
| --- | --- | --- |
| 奥林匹克公园站 G 东北口 | [北京地铁 15 号线](https://www.bjsubway.com/station/xltcx/line15/2014-12-24/446.html?sk=1)核对站名和 G 口。[OSM 东侧 G 口](https://www.openstreetmap.org/node/6813793816) `116.387406,40.0012419`，与[出口照片及拍摄点](https://commons.wikimedia.org/wiki/File:Exit_G_of_Olympic_Park_Station_(20210403161421).jpg)相符。OSM 另有一个偏西的 G 点，未用于集合。 | 出口级 WGS84；高德打开优先搜索完整出口名，步行 URI 使用东侧出口对应的 GCJ-02 点。仅一个集合站。 |
| 和合牌坊 | [高德 B0HK1D9GOF](https://www.amap.com/place/B0HK1D9GOF)，GCJ-02 `116.393618,40.004706`。 | 同一 POI。离线转为 WGS84 `116.387367,40.003303`上图，导航用原始高德坐标。 |
| 中轴银杏大道 | [北京文旅中轴树阵](https://www.visitbeijing.com.cn/article/49GZVCiGq2A?device=amp)及[OSM 景观步行区](https://www.openstreetmap.org/way/60064574)。 | WGS84 `116.3865675,40.0057281`。区域步行参考点，非银杏阵列起止点。 |
| 奥森南园南门 | [OSM 实体门线](https://www.openstreetmap.org/way/270377155)中点 WGS84 `116.3862938,40.0098628`；[高德 B0FFHC94AP](https://www.amap.com/place/B0FFHC94AP) GCJ-02 `116.392633,40.010160`，统一坐标系后仍相差约 120 米，高德 POI 更靠南。 | 入园标记、站内步行路线和高德标点统一以实体门线为目标，照片标明是俯瞰。 |
| 奥林匹克宣言广场 | [OSM 广场点](https://www.openstreetmap.org/node/10205804954) WGS84 `116.3831252,40.0108703`。 | 舒适版可选站，精简版不显示。十境雕塑与广场分开，待核实。 |
| 奥海西侧银杏 | [北京市政府赏秋资料](https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202611/t20261104_4931928.html)、[OSM 奥海水体](https://www.openstreetmap.org/relation/1659652)、[OSM 岸边步道](https://www.openstreetmap.org/way/120407429)和[Commons 银杏林地理标注](https://commons.wikimedia.org/wiki/File:Ginkgo_forest_in_Beijing_Olympic_Forest_Park_1.jpg)。 | WGS84 `116.380662,40.0117095`，照片地理标注附近、奥海西南侧步道。区域参考点，银杏边界及具体取景现场决定。 |
| 仰山西坡 | [北京市政府秋景资料](https://www.beijing.gov.cn/renwen/zt/qrshzjc/yhjq/202510/t20251031_4248495.html)、[西坡步道](https://www.openstreetmap.org/way/120407426)与[山顶点](https://www.openstreetmap.org/node/4367214507)。 | WGS84 `116.3839456,40.0169127`，西坡步道参考点，山顶在东侧。精简版按现场决定是否加去。 |
| 森林公园南门站 | [OSM B 口](https://www.openstreetmap.org/node/1346457391) WGS84 `116.3868119,40.009042`；[高德 BS10019714](https://www.amap.com/place/BS10019714)为站级。 | 图钉与高德标点都指向公园侧建议 B 口。站级 POI 仅作为站名核对。 |
| 叠水花台 / 夕拾台 / 十境雕塑 / 生态廊道 | OSM 有夕拾台和生态廊道桥记录，实际入口、步道与方案终点尚待确认。 | 本轮为候选支线，未发布图钉或声称可走。 |

## 路线与坐标

`src/places.js` 保留源坐标及来源坐标系。采用 [gcoord 1.0.7](https://github.com/hujiulong/gcoord)（MIT）一次性生成对应的高德/OSM 坐标，只提交坐标结果，浏览器无需转换库。已有高德坐标原样传给高德，已有 WGS84 原样传给 Leaflet；前端在创建 Leaflet 标记时仅交换数组顺序。对和合牌坊的反向转换验证可回到原高德坐标，避免二次转换。没有请求 GPS。

`assets/maps/aosen-osm.geojson` 使用 [OSM 区域公开接口](https://api.openstreetmap.org/api/0.6/map.json?bbox=116.361,39.993,116.413,40.028) 2026-11-05 快照，裁取公园、步道、道路、桥、水体和核心区建筑，坐标舍入至 6 位；文件保留 OSM 要素 ID。衍生数据及 OSM 路径数据按 [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/) 提供。© OpenStreetMap contributors。

`src/walks.js` 保存 9 条 FOSSGIS OSRM foot 路网响应，含采集日期、响应距离、时间、匹配偏移、几何及精确请求地址。端点最大匹配偏移约 20 米，步行线不延伸到路网匹配点之外。采样核对所有 9 段均未进入 OSM 奥海湖面。当前舒适版 7 段约 4.3 公里、57 分钟，精简版 5 段约 2.5 公里、34 分钟。仅作地图步行估算；计划时间包括拍照、清点、等候和弹性。缺少某一相邻分段时，只显示已取得的曲线，缺口不补直线。

## 13:00–16:00 新路线

最新路线使用 OSM 夕拾台节点 13305744788、仰山山顶节点 4367214507（天境区域参考）、生态廊道桥 way 173491953（桥段参考）、林萃桥 C1 节点 7603978079。十境雕塑、叠水花台精确点位待核，未打点。截图时间用于计划参考，本站步行几何仅显示 OSRM 成功且端点匹配通过的路段。此前两套路线的总里程与时间为历史记录。

生态廊道至林萃桥的算路候选北绕，未确认符合截图“不进北园”的约束。该段保留时间与终点，站内暂不绘线。

## 英语协会秋游版

叠水花台与十境雕塑按用户提供的两张高德截图，以林萃桥及森林公园南门站配准成 WGS84 近似点位。坐标精度有限，外链仍按名称搜索，未据此补画未经核实步道。
