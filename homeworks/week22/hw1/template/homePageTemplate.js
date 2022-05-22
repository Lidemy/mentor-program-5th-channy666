/* eslint-disable import/no-unresolved, quotes, semi, comma-dangle */

import newsImage1 from "../utils/images/latestNews/自比特幣技術書.jpeg";
import newsImage2 from "../utils/images/latestNews/臺師大和清大.jpeg";
import newsImage3 from "../utils/images/latestNews/區塊鏈技術與商機.jpeg";
import newsImage4 from "../utils/images/latestNews/要聞共賞_永續發展.jpeg";
import newsImage5 from "../utils/images/latestNews/201904觀測月報封面.png";
import newsImage6 from "../utils/images/latestNews/博士生論壇_反洗錢.jpeg";
import newsImage7 from "../utils/images/latestNews/博士生論壇_自動化金融管制.jpeg";
import flowchain from "../utils/images/cooperation/Flowchain.jpg";
import mrShell from "../utils/images/cooperation/果殼.png";
import blocktempo from "../utils/images/cooperation/BlockTempo.jpg";
import nthuClub from "../utils/images/cooperation/blockchain_at_tsinghua.jpg";

export const latestNewsTemplate = [
  {
    date: "2021-08-25",
    title:
      "【賀】本中心范建得主任主編之《自比特幣技術的特徵論虛擬貨幣的法律特性及其相關議題》一書，入選博客來年度最大商業書線上書展。",
    image: newsImage1,
    link: "https://www.books.com.tw/products/0010888474?loc=M_0007_019",
  },
  {
    date: "2021-04-07",
    title: "【新書推薦】《自比特幣技術的特徵論虛擬貨幣的法律特性及其相關議題》",
    image: newsImage1,
    link: "https://www.books.com.tw/products/0010888474?loc=M_0007_019",
  },
  {
    date: "2021-03-10",
    title: "【臺師大與清大簽合作備忘錄 用區塊鏈替流行音樂產業加值！",
    image: newsImage2,
    link: "https://pr.ntnu.edu.tw/ntnunews/index.php?mode=data&id=19900",
  },
  {
    date: "2020-08-12",
    title:
      "【清華大學x工研院】 區塊鏈技術與商機在職碩士學分班 第二屆 熱烈超生中!",
    image: newsImage3,
    link: false,
  },
  {
    date: "2020-05-15",
    title: "【要聞共賞】運用區塊鏈技術達成聯合國永續發展目標的潛在分析",
    image: newsImage4,
    link: false,
  },
  {
    date: "2020-05-04",
    title:
      "【名家專欄-范建得】談證券型代幣發行(security token offering, STO)之金融監管規範：兼評金管會108年4月12日之公聽會內容",
    image: newsImage5,
    link:
      "https://blpc.site.nthu.edu.tw/var/file/390/1390/img/3665/research_20190502005.pdf",
  },
  {
    date: "2020-03-09",
    title:
      "【博士生論壇】法遵科技如何應用至反洗錢與反資助恐怖主義法令？—以資訊分享機制為中心",
    image: newsImage6,
    link: false,
  },
  {
    date: "2020-02-08",
    title:
      "【博士生論壇】自動化金融管制—以歐洲中央銀行應用人工智慧於銀行監管為例",
    image: newsImage7,
    link: false,
  },
];

export const cooperationTemplate = [
  {
    name: "FlowChain",
    link: "https://flowchain.co/",
    image: flowchain,
  },
  {
    name: "Mr. Shell 果殼",
    link: "https://www.facebook.com/mrshell4real/",
    image: mrShell,
  },
  {
    name: "BlockTempo 動區動趨",
    link: "https://www.blocktempo.com/",
    image: blocktempo,
  },
  {
    name: "清華區塊鏈研究社",
    link:
      "https://www.facebook.com/%E6%B8%85%E8%8F%AF%E5%8D%80%E5%A1%8A%E9%8F%88%E7%A0%94%E7%A9%B6%E7%A4%BE-277196809587179/",
    image: nthuClub,
  },
];
