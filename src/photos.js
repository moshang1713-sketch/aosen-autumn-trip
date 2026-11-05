const commons = 'https://commons.wikimedia.org/wiki/File:';
const creativeCommons = 'https://creativecommons.org/licenses/';
const photos = {
  meeting: [
    { file: 'meeting-g.webp', title: 'G 口地面入口', author: 'N509FZ', license: 'CC BY-SA 4.0', licenseUrl: creativeCommons + 'by-sa/4.0/', sourceUrl: commons + 'Exit_G_of_Olympic_Park_Station_(20210403161421).jpg' },
  ],
  gate: [
    { file: 'gate-overview.webp', title: '从奥林匹克塔俯瞰南园南门', author: 'Hat600', license: 'CC BY-SA 4.0', licenseUrl: creativeCommons + 'by-sa/4.0/', sourceUrl: commons + encodeURIComponent('北京奥林匹克森林公园南大门俯瞰.JPG') },
    { file: 'gate-garden.webp', title: '南门内绿地俯瞰', author: 'Hat600', license: 'CC BY-SA 4.0', licenseUrl: creativeCommons + 'by-sa/4.0/', sourceUrl: commons + encodeURIComponent('北京奥林匹克森林公园入口处绿地俯瞰.JPG') },
  ],
  lake: [
    { file: 'lake-ginkgo-1.webp', title: '南园奥海西南侧银杏林', author: '星外之神', license: 'CC BY-SA 4.0', licenseUrl: creativeCommons + 'by-sa/4.0/', sourceUrl: commons + 'Ginkgo_forest_in_Beijing_Olympic_Forest_Park_1.jpg' },
    { file: 'lake-ginkgo-2.webp', title: '同一片银杏林的另一视角', author: '星外之神', license: 'CC BY-SA 4.0', licenseUrl: creativeCommons + 'by-sa/4.0/', sourceUrl: commons + 'Ginkgo_forest_in_Beijing_Olympic_Forest_Park_2.jpg' },
    {"file": "lake-ginkgo-3.webp", "title": "奥海南侧与西侧一带银杏林 · 3", "date": "2023-10-01", "author": "星外之神", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ginkgo_forest_in_Beijing_Olympic_Forest_Park_3.jpg"},
    {"file": "lake-ginkgo-4.webp", "title": "奥海南侧与西侧一带银杏林 · 4", "date": "2023-10-01", "author": "星外之神", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ginkgo_forest_in_Beijing_Olympic_Forest_Park_4.jpg"},
    {"file": "lake-ginkgo-5.webp", "title": "奥海南侧与西侧一带银杏林 · 5", "date": "2023-10-01", "author": "星外之神", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ginkgo_forest_in_Beijing_Olympic_Forest_Park_5.jpg"},
    {"file": "lake-ginkgo-6.webp", "title": "奥海南侧与西侧一带银杏林 · 6", "date": "2023-10-01", "author": "星外之神", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ginkgo_forest_in_Beijing_Olympic_Forest_Park_6.jpg"},
  ],
  return: [
    { file: 'return-station.webp', title: '森林公园南门站外景', author: 'Weixi Zeng', license: 'CC BY-SA 3.0', licenseUrl: creativeCommons + 'by-sa/3.0/', sourceUrl: commons + encodeURIComponent('森林公园地铁站 Olympic Forest Metro Sta. - panoramio.jpg') },
  ],
};

const guidePhotos = {
  "cascade": [
    {
      "file": "guide-cascade-1.webp",
      "title": "叠水花台水景",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ],
  "arch": [
    {
      "file": "guide-arch-2.webp",
      "title": "牌坊外观",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ],
  "lincui": [
    {
      "file": "guide-lincui-3.webp",
      "title": "林萃桥站外景参考",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ],
  "corridor": [
    {
      "file": "guide-corridor-4.webp",
      "title": "生态廊道周边参考",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ],
  "sculpture": [
    {
      "file": "guide-sculpture-5.webp",
      "title": "十境雕塑一站的秋色参考拼图",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ],
  "xishi": [
    {
      "file": "guide-xishi-6.webp",
      "title": "夕拾台一站的秋景参考拼图",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ],
  "square": [
    {
      "file": "guide-square-7.webp",
      "title": "宣言广场一站的奥林匹克塔与银杏参考",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ],
  "summit": [
    {
      "file": "guide-summit-8.webp",
      "title": "仰山一站的奥林匹克塔远景参考",
      "author": "活动攻略供图 · 原署名以图内为准"
    },
    {
      "file": "guide-summit-9.webp",
      "title": "仰山一站的秋色参考拼图",
      "author": "活动攻略供图 · 原署名以图内为准"
    }
  ]
};
for (const [id, images] of Object.entries(guidePhotos)) {
  photos[id] = [...(photos[id] ?? []), ...images];
}
