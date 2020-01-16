/** Bible.js **/

var Bible = {
  uri: 'http://giacngumo.com/bibles/',
  android_db: 'file:///data/data/com.bibooki.mobile.bible.reader.android.google/databases/',
  ios_db: 'cdvfile://localhost/persistent/',
  android_db_location : 0,
  iOS_db_location : 0,
  list: {
    // English
    en:[{
        code: "NIV_2011",
        filename: "NIV2011.zip",
        dbFileName: "NIV2011.SQLite3",
        label: "New International Version",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/5ggzn896uvgq9ad/NIV2011.SQLite3?dl=1"
      },
      {
        code: "NIVUK_2011",
        filename: "NIVUK2011_biblica.zip",
        dbFileName: "NIVUK2011_biblica.SQLite3",
        label: "New International Version UK",
        description: "Biblica",
        url: "https://www.dropbox.com/s/2c0m9q5qodkbyju/NIVUK2011_biblica.SQLite3?dl=1"
      },
      {
        code: "NIVUS_1984",
        filename: "NIVUS.zip",
        dbFileName: "NIVUS.SQLite3",
        label: "New International Version US",
        description: "Biblica",
        url: "https://www.dropbox.com/s/rsohckl2ksz17ur/NIVUS.SQLite3?dl=1"
      },
      {
        code: "ESV_2011",
        filename: "ESV.zip",
        dbFileName: "ESV.SQLite3",
        label: "English Standard Version",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/6xajhwyigv5znat/ESV.SQLite3?dl=1"
      },
      {
        code: "KJV_1769",
        filename: "KJV_.zip",
        dbFileName: "KJV_.SQLite3",
        label: "King James Version",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/tsa5azph8huh24n/KJV_.SQLite3?dl=1"
      },
      {
        code: "NKJV_1982",
        filename: "NKJV.zip",
        dbFileName: "NKJV.SQLite3",
        label: "New King James Version",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/t1enzx5tkndcu6r/NKJV.SQLite3?dl=1"
      },
      {
        code: "AKJV_1999",
        filename: "AKJV_.zip",
        dbFileName: "AKJV_.SQLite3",
        label: "American King James Version",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/frkkw9p0cr7j6nd/AKJV_.SQLite3?dl=1"
      },
      {
        code: "UKJV_2000",
        filename: "UKJV.zip",
        dbFileName: "UKJV.SQLite3",
        label: "Updated King James Version",
        description: "",
        url: "https://www.dropbox.com/s/zr08t9sote4fprs/UKJV.SQLite3?dl=1"
      },
      {
        code: "MKJV_2008",
        filename: "MKJV.zip",
        dbFileName: "MKJV.SQLite3",
        label: "Modern King James Version",
        description: "Jay P. Green",
        url: "https://www.dropbox.com/s/q72te3jwg4d46ai/MKJV.SQLite3?dl=1"
      },
      {
        code: "NEV_2011",
        filename: "NEV.zip",
        dbFileName: "NEV.SQLite3",
        label: "New European Version of the Bible",
        description: "Carelinks Ministries",
        url: "https://www.dropbox.com/s/bff0d8tfkv2cz6s/NEV.SQLite3?dl=1"
      },
      {
        code: "ICB_2015",
        filename: "ICB.zip",
        dbFileName: "ICB.SQLite3",
        label: "International Children’s Bible",
        description: "Thomas Nelson",
        url: "https://www.dropbox.com/s/9k1tnbuv09hcyon/ICB.SQLite3?dl=1"
      },
      {
        code: "ISV_2011",
        filename: "ISV.zip",
        dbFileName: "ISV.SQLite3",
        label: "International Standard Version",
        description: "ISV Foundation",
        url: "https://www.dropbox.com/s/842oextr2qx79n7/ISV.SQLite3?dl=1"
      }
    ],
    // Vietnamese
    vi:[
      {
        code: "BD2011",
        filename: "BD2011.zip",
        dbFileName: "BD2011.SQLite3",
        label: "Bản Dịch 2011",
        description: "©2011 by Mục sư Đặng Ngọc Báu",
        url: "https://www.dropbox.com/s/xadaduck1ufho5d/BD2011.SQLite3?dl=1"
      },
      {
        code: "BPT",
        filename: "BPT.zip",
        dbFileName: "BPT.SQLite3",
        label: "Bản Phổ Thông",
        description: "©2010 World Bible Translation Center",
        url: "https://www.dropbox.com/s/4uw5wrbem5jsooc/BPT.SQLite3?dl=1"
      },
      {
        code: "RVV11_2010",
        filename: "RVV11_2010.zip",
        dbFileName: "RVV11_2010.SQLite3",
        label: "Revised Vietnamese Version Bible",
        description: "United Bible Societies",
        url: "https://www.dropbox.com/s/e0m2mgqi8j7yau3/RVV11_2010.SQLite3?dl=1"
      },
      {
        code: "VIET_1934",
        filename: "VIET.zip",
        dbFileName: "VIET.SQLite3",
        label: "Kinh Thánh Tin Lành",
        description: "Public domain",
        url: "https://www.dropbox.com/s/oikhw44uivrqr0h/VIET.SQLite3?dl=1"
      },
      {
        code: "LCCMN_2012",
        filename: "LCCMN.zip",
        dbFileName: "LCCMN.SQLite3",
        label: "Lời Chúa Cho Mọi Người",
        description: "",
        url: "https://www.dropbox.com/s/5j3dqb40jgfs88f/LCCMN.SQLite3?dl=1"
      },
      {
        code: "NVB_2002",
        filename: "NVB.zip",
        dbFileName: "NVB.SQLite3",
        label: "Kinh Thánh Bản Dịch Mới",
        description: "",
        url: "https://www.dropbox.com/s/lrhe31x20icqqy6/NVB2002.SQLite3?dl=1"
      }
    ],
    // Korean
    kr: [
      {
        code: "RNKSV_2001",
        filename: "RNKSV.zip",
        dbFileName: "RNKSV.SQLite3",
        label: "Revised New Korean Standard Version",
        description: "Korean Bible Society",
        url: "https://www.dropbox.com/s/zcvmelybktxr74o/RNKSV.SQLite3?dl=1"
      },
      {
        code: "KMB2",
        filename: "KMB2.zip",
        dbFileName: "KMB2.SQLite3",
        label: "Korean Modern Bible 2",
        description: "",
        url: "https://www.dropbox.com/s/c3iwa0gshctjj2w/KMB2.SQLite3?dl=1"
      },
      {
        code: "Hangul",
        filename: "Hangul.zip",
        dbFileName: "Hangul.SQLite3",
        label: "American Standard Hangul",
        description: "",
        url: "https://www.dropbox.com/s/6dvrbwa55wtd6kp/Hangul.SQLite3?dl=1"
      },
      {
        code: "KMB",
        filename: "KMB.zip",
        dbFileName: "KMB.SQLite3",
        label: "Korean Modern Bible",
        description: "",
        url: "https://www.dropbox.com/s/f8zmr2hjtjzz2jm/KMB.SQLite3?dl=1"
      },
      {
        code: "KEB",
        filename: "KEB.zip",
        dbFileName: "KEB.SQLite3",
        label: "Korean Easy Bible",
        description: "",
        url: "https://www.dropbox.com/s/i1ohrkovguwcgnx/KEB.SQLite3?dl=1"
      },
      {
        code: "KrASB4",
        filename: "KrASB4.zip",
        dbFileName: "KrASB4.SQLite3",
        label: "Korean American Standard Revised 4th Edition",
        description: "",
        url: "https://www.dropbox.com/s/v42hq24qgctcwc6/KrASB4.SQLite3?dl=1"
      },
      {
        code: "KrASB",
        filename: "KrASB.zip",
        dbFileName: "KrASB.SQLite3",
        label: "Korean American Standard Revised",
        description: "",
        url: "https://www.dropbox.com/s/z6zbmx9fpw1xti4/KrASB.SQLite3?dl=1"
      },
      {
        code: "Woor",
        filename: "Woor.zip",
        dbFileName: "Woor.SQLite3",
        label: "우리말사랑누리집",
        description: "",
        url: "https://www.dropbox.com/s/3ydprtqguhzup1e/Woor.SQLite3?dl=1"
      },
      {
        code: "NKSB_2001",
        filename: "NKSB.zip",
        dbFileName: "NKSB.SQLite3",
        label: "표준새번역",
        description: "Korean Bible Society",
        url: "https://www.dropbox.com/s/l1ytb5c0wok0kmx/NKSB.SQLite3?dl=1"
      },
      {
        code: "KCB_2005",
        filename: "KCB.zip",
        dbFileName: "KCB.SQLite3",
        label: "성경",
        description: "The Catholic Bishops' Conference of Korea",
        url: "https://www.dropbox.com/s/mr23zv7rt9bcy88/KCB.SQLite3?dl=1"
      },
      {
        code: "KPB",
        filename: "KPB.zip",
        dbFileName: "KPB.SQLite3",
        label: "평양말 성경",
        description: "",
        url: "https://www.dropbox.com/s/t8is5vs765kqrm8/KPB.SQLite3?dl=1"
      },
      {
        code: "KRB",
        filename: "KRB.zip",
        dbFileName: "KRB.SQLite3",
        label: "Korean Rentier Bible",
        description: "",
        url: "https://www.dropbox.com/s/iezd4os6z89myv8/KRB.SQLite3?dl=1"
      },
      {
        code: "KHB",
        filename: "KHB.zip",
        dbFileName: "KHB.SQLite3",
        label: "Korean Hyeondaeeo Bible",
        description: "",
        url: "https://www.dropbox.com/s/9kl1kcslsv7dy8b/KHB.SQLite3?dl=1"
      },
      {
        code: "CoTr",
        filename: "CoTr.zip",
        dbFileName: "CoTr.SQLite3",
        label: "Korean CoTrans Bible",
        description: "",
        url: "https://www.dropbox.com/s/w846ypxr7a47jj9/CoTr.SQLite3?dl=1"
      },
      {
        code: "KKJV_1994",
        filename: "KKJV.zip",
        dbFileName: "KKJV.SQLite3",
        label: "한글판 킹제임스",
        description: "Word Of God Preservation Society",
        url: "https://www.dropbox.com/s/ih9ucbcwuvx6h2t/KKJV.SQLite3?dl=1"
      },
      {
        code: "TKV_1991",
        filename: "TKV.zip",
        dbFileName: "TKV.SQLite3",
        label: "현대어성경",
        description: "성서원",
        url: "https://www.dropbox.com/s/3p7i17q7s7yt42w/TKV.SQLite3?dl=1"
      }
    ],
    // Chinese
    zh:[
      {
        code: "CNETS_2011",
        filename: "CNETS.zip",
        dbFileName: "CNETS.SQLite3",
        label: "新英语译本",
        description: "Biblical Studies Press, L.L.C.",
        url: "https://www.dropbox.com/s/yu0uuz03w1a0x5z/CNETS.SQLite3?dl=1"
      },
      {
        code: "CNET_2011",
        filename: "CNET.zip",
        dbFileName: "CNET.SQLite3",
        label: "新英语译本",
        description: "Biblical Studies Press, L.L.C.",
        url: "https://www.dropbox.com/s/ljrh6bk2ifyif6u/CNET.SQLite3?dl=1"
      },
      {
        code: "RCUVS_2010",
        filename: "RCUVS.zip",
        dbFileName: "RCUVS.SQLite3",
        label: "和合本修订版",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/xhvr4qs9qcpf35j/RCUVS.SQLite3?dl=1"
      },
      {
        code: "RCUV_2010",
        filename: "RCUV.zip",
        dbFileName: "RCUV.SQLite3",
        label: "和合本修訂版",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/wx0kcvlqp2eqaw7/RCUV.SQLite3?dl=1"
      },
      {
        code: "LCTS_2007",
        filename: "LCTS_.zip",
        dbFileName: "LCTS_.SQLite3",
        label: "圣经原文编号逐字中译",
        description: "",
        url: "https://www.dropbox.com/s/7b48jn50ukdtyte/LCTS_.SQLite3?dl=1"
      },
      {
        code: "LCT_2007",
        filename: "LCT_.zip",
        dbFileName: "LCT_.SQLite3",
        label: "聖經原文編號逐字中譯",
        description: "",
        url: "https://www.dropbox.com/s/h2xpfhrscmf8bbr/LCT_.SQLite3?dl=1"
      },
      {
        code: "CNVS_1992",
        filename: "CNVS.zip",
        dbFileName: "CNVS.SQLite3",
        label: "新译本 (简体中国)",
        description: "",
        url: "https://www.dropbox.com/s/dka15454lgwfxwu/CNVS.SQLite3?dl=1"
      },
      {
        code: "CSB_2011",
        filename: "CSB.zip",
        dbFileName: "CSB.SQLite3",
        label: "中文標準譯本",
        description: "Red letter edition",
        url: "https://www.dropbox.com/s/7kfthjamun4yisb/CSB.SQLite3?dl=1"
      },
      {
        code: "CNV_1992",
        filename: "CNV.zip",
        dbFileName: "CNV.SQLite3",
        label: "新譯本 (中國傳統)",
        description: "",
        url: "https://www.dropbox.com/s/7c1xgebvd2l1q8s/CNV.SQLite3?dl=1"
      },
      {
        code: "CKJV",
        filename: "CKJV.zip",
        dbFileName: "CKJV.SQLite3",
        label: "中文钦定本 (中國傳統)",
        description: "",
        url: "https://www.dropbox.com/s/63ssgla055bg8dj/CKJV.SQLite3?dl=1"
      },
    ],
    // Hindi
    hi:[
      {
        code: "ERV_HI_2010",
        filename: "ERV-HI.zip",
        dbFileName: "ERV-HI.SQLite3",
        label: "पवित्र बाइबिल",
        description: "WBTC - World Bible Translation Center",
        url: "https://www.dropbox.com/s/opjrmtewp9nap2c/ERV-HI.SQLite3?dl=1"
      },
      {
        code: "HBSI_2002",
        filename: "HBSI.zip",
        dbFileName: "HBSI.SQLite3",
        label: "पवित्र बाइबिल",
        description: "The Bible Society of India",
        url: "https://www.dropbox.com/s/f9p1en4fsk55sqk/HBSI.SQLite3?dl=1"
      },
    ],
    // Spanish
    es:[
      {
        code: "BTX",
        filename: "BTX.zip",
        dbFileName: "BTX.SQLite3",
        label: "La Biblia Textual",
        description: "Latin American Bible Society",
        url: "https://www.dropbox.com/s/eega3prz5ddhn04/BTX.SQLite3?dl=1"
      }
    ],
    // French
    fr:[
      {
        code: "LBM_2012",
        filename: "LBM.zip",
        dbFileName: "LBM.SQLite3",
        label: "La Bible de Zadoc Khan",
        description: "Zadoc Kahn",
        url: "https://www.dropbox.com/s/eyndj4u362m8mh3/LBM.SQLite3?dl=1"
      },
      {
        code: "SG21_2007",
        filename: "SG21.zip",
        dbFileName: "SG21.SQLite3",
        label: "Segond 21",
        description: "Société Biblique de Genève",
        url: "https://www.dropbox.com/s/agoxonfz9jhkiv6/SG21.SQLite3?dl=1"
      },
      {
        code: "BDS",
        filename: "BDS.zip",
        dbFileName: "BDS.SQLite3",
        label: "La Bible du Semeur",
        description: "",
        url: "https://www.dropbox.com/s/l3gkxqg3zyfosy5/BDS.SQLite3?dl=1"
      },
      {
        code: "DBY06_2006",
        filename: "DBY06.zip",
        dbFileName: "DBY06.SQLite3",
        label: "Bible Perret-Gentil et Rilliet",
        description: "",
        url: "https://www.dropbox.com/s/k4fdup83haqow4a/DBY06.SQLite3?dl=1"
      },
      {
        code: "OSTr_1996",
        filename: "OSTr.zip",
        dbFileName: "OSTr.SQLite3",
        label: "La Bible Ostervald",
        description: "",
        url: "https://www.dropbox.com/s/crr3mwj4ij2h379/OSTr.SQLite3?dl=1"
      },
      {
        code: "BDP_1998",
        filename: "BDP.zip",
        dbFileName: "BDP.SQLite3",
        label: "Bible des Peuples",
        description: "Bernard et Louis Hureau",
        url: "https://www.dropbox.com/s/90vfg6a9av023mt/BDP.SQLite3?dl=1"
      },
      {
        code: "PGR_1861",
        filename: "PGR.zip",
        dbFileName: "PGR.SQLite3",
        label: "King James Française",
        description: "",
        url: "https://www.dropbox.com/s/ei8nqh6uyb84kyf/PGR.SQLite3?dl=1"
      },
      {
        code: "JB_1966",
        filename: "JB.zip",
        dbFileName: "JB.SQLite3",
        label: "La Bible de Jérusalem",
        description: "Darton, Longman & Todd",
        url: "https://www.dropbox.com/s/c3o6xeudo84o6cn/JB.SQLite3?dl=1"
      }
    ],
    // German
    de: [
      {
        code: "NGU_2011",
        filename: "NGU_2011.zip",
        dbFileName: "NGU_2011.SQLite3",
        label: "Neue Genfer Übersetzung – Neues Testament und Psalmen",
        description: "Geneva Bible Society",
        url: "https://www.dropbox.com/s/yhrks4w7x09za3p/NGU_2011.SQLite3?dl=1"
      },
      {
        code: "MENG_2010",
        filename: "MENG.zip",
        dbFileName: "MENG.SQLite3",
        label: "Menge-Bibel",
        description: "Geneva Bible Society",
        url: "https://www.dropbox.com/s/pspqsgt460fxx7x/MENG.SQLite3?dl=1"
      },
      {
        code: "NeU_2010",
        filename: "NeU_2010.zip",
        dbFileName: "NeU_2010.SQLite3",
        label: "Neue evangelistische Übersetzung",
        description: "Karl-Heinz Vanheiden",
        url: "https://www.dropbox.com/s/xm4vaeps80qnsu6/NeU_2010.SQLite3?dl=1"
      },
      {
        code: "EU_2005",
        filename: "EU_2005.zip",
        dbFileName: "EU_2005.SQLite3",
        label: "Einheitsübersetzung",
        description: "Catholic Bible Society",
        url: "https://www.dropbox.com/s/nhi2pls0xyx6gqb/EU_2005.SQLite3?dl=1"
      },
      {
        code: "FB4_2004",
        filename: "FB4.zip",
        dbFileName: "FB4.SQLite3",
        label: "FreeBible",
        description: "Michael Mustun",
        url: "https://www.dropbox.com/s/a06id81igz4btqd/FB4.SQLite3?dl=1"
      },
      {
        code: "HFA_2002",
        filename: "HFA.zip",
        dbFileName: "HFA.SQLite3",
        label: "Hoffnung für Alle",
        description: "IBS - International Bible Society (Biblica)",
        url: "https://www.dropbox.com/s/w1zyz0stdhm30ai/HFA.SQLite3?dl=1"
      },
      {
        code: "S00_2000",
        filename: "S00.zip",
        dbFileName: "S00.SQLite3",
        label: "Schlachter-Bibel",
        description: "Geneva Bible Society",
        url: "https://www.dropbox.com/s/5x49zpk6dyl6esu/S00.SQLite3?dl=1"
      },
      {
        code: "VOB_2012",
        filename: "VOB.zip",
        dbFileName: "VOB.SQLite3",
        label: "Die Volxbibel Тугуы Testament",
        description: "народная Библия, перевод делался всем миром по принципу Wiki с использованием сленга (не путать с ругательствами), псалмы рифмованы под рэп.",
        url: "https://www.dropbox.com/s/gs9jabwj064sn3c/VOB.SQLite3?dl=1"
      }
    ],
    // Italian
    it: [
      {
        code: "CEI08_2008",
        filename: "CEI08.zip",
        dbFileName: "CEI08.SQLite3",
        label: "Bibbia CEI",
        description: "",
        url: "https://www.dropbox.com/s/hjslrly8kijtigx/CEI08.SQLite3?dl=1"
      },
      {
        code: "NR06_2006",
        filename: "NR06.zip",
        dbFileName: "NR06.SQLite3",
        label: "La Nuova Riveduta",
        description: "",
        url: "https://www.dropbox.com/s/69eglbnbmlmwl0v/NR06.SQLite3?dl=1"
      },
      {
        code: "LND_1991",
        filename: "LND.zip",
        dbFileName: "LND.SQLite3",
        label: "La Nuova Diodati",
        description: "La Buona Novella Inc.",
        url: "https://www.dropbox.com/s/ci9uw46pxgdyzgg/LND.SQLite3?dl=1"
      },
      {
        code: "RIV_1990",
        filename: "RIV.zip",
        dbFileName: "RIV.SQLite3",
        label: "La Riveduta",
        description: "Waldesan Giovanni Luzzi",
        url: "https://www.dropbox.com/s/l8umzy3bq16n4xu/RIV.SQLite3?dl=1"
      }
    ],
    // Czech
    cs: [
      {
        code: "CSP_2009",
        filename: "CSP.zip",
        dbFileName: "CSP.SQLite3",
        label: "Český studijní překlad",
        description: "Nadační fond překladu Bible",
        url: "https://www.dropbox.com/s/1a1v5842f3u6pv6/CSP.SQLite3?dl=1"
      },
      {
        code: "B21_2009",
        filename: "B21.zip",
        dbFileName: "B21.SQLite3",
        label: "Bible 21 - překlad 21. století",
        description: "",
        url: "https://www.dropbox.com/s/plgfc2w7sgasdxo/B21.SQLite3?dl=1"
      },
      {
        code: "PMP_CZ",
        filename: "PMP_CZ.zip",
        dbFileName: "PMP_CZ.SQLite3",
        label: "Český studijní překlad Miloše Pavlíka",
        description: "",
        url: "https://www.dropbox.com/s/3w9stfk5heuoxo6/PMP_CZ.SQLite3?dl=1"
      },
      {
        code: "KMS_2000",
        filename: "KMS.zip",
        dbFileName: "KMS.SQLite3",
        label: "Nová smlouva",
        description: "",
        url: "https://www.dropbox.com/s/rsvi8nvnercsxk1/KMS.SQLite3?dl=1"
      },
      {
        code: "CEP_1979",
        filename: "CEP.zip",
        dbFileName: "CEP.SQLite3",
        label: "Český ekumenický překlad",
        description: "Czech Bible Society",
        url: "https://www.dropbox.com/s/w2wqkfb4gi385oe/CEP.SQLite3?dl=1"
      }
    ],
    // Indonesian
    id:[
      {
        code: "VMD_2006",
        filename: "VMD.zip",
        dbFileName: "VMD.SQLite3",
        label: "Kitab Perjanjian Baru",
        description: "",
        url: "https://www.dropbox.com/s/1rg6f2y2hzpt5yp/VMD.SQLite3?dl=1"
      },
      {
        code: "BNPB_2009",
        filename: "BNPB.zip",
        dbFileName: "BNPB.SQLite3",
        label: "Terjemahan Lama",
        description: "",
        url: "https://www.dropbox.com/s/evct5agajf7sc79/BNPB.SQLite3?dl=1"
      },
      {
        code: "Uma_1996",
        filename: "Uma.zip",
        dbFileName: "Uma.SQLite3",
        label: "Terjemahan Baru",
        description: "",
        url: "https://www.dropbox.com/s/nyd6huguorehvmi/Uma.SQLite3?dl=1"
      },
      {
        code: "BPJ",
        filename: "BPJ.zip",
        dbFileName: "BPJ.SQLite3",
        label: "Versi Mudah Dibaca",
        description: "WBTC - World Bible Translation Center",
        url: "https://www.dropbox.com/s/c6rojins70nf7pf/BPJ.SQLite3?dl=1"
      },
      {
        code: "BIMK_1985",
        filename: "BIMK.zip",
        dbFileName: "BIMK.SQLite3",
        label: "Alkitab dalam Bahasa Indonesia Masa Kini",
        description: "Indonesian Bible Society",
        url: "https://www.dropbox.com/s/1vg72thm8un6z1y/BIMK.SQLite3?dl=1"
      },
      {
        code: "BISH_1985",
        filename: "BISH.zip",
        dbFileName: "BISH.SQLite3",
        label: "Uma New Testament",
        description: "Anonymous, Wycliffe Bible Translators, Indonesian Bible Society",
        url: "https://www.dropbox.com/s/nv5vy6rnabf3n2n/BISH.SQLite3?dl=1"
      },
      {
        code: "TJB_1974",
        filename: "TJB.zip",
        dbFileName: "TJB.SQLite3",
        label: "Bahasa Indonesia Sehari-hari",
        description: "",
        url: "https://www.dropbox.com/s/goupjtdoi5pfdn2/TJB.SQLite3?dl=1"
      },
      {
        code: "TB_1974",
        filename: "TB.zip",
        dbFileName: "TB.SQLite3",
        label: "Terjemahan Baru",
        description: "Indonesian Bible Society",
        url: "https://www.dropbox.com/s/57mdhioo9z8mbyi/TB.SQLite3?dl=1"
      },
      {
        code: "TJL_1954",
        filename: "TJL.zip",
        dbFileName: "TJL.SQLite3",
        label: "Bahasa Nias-Perjanjian Baru",
        description: "",
        url: "https://www.dropbox.com/s/0uy6tukng5xirc8/TJL.SQLite3?dl=1"
      }
    ],
    // Arabic
    ar:[
      {
        code: "ERV_AR_2009",
        filename: "ERV-AR.zip",
        dbFileName: "ERV-AR.SQLite3",
        label: "Arabic Bible: Easy-to-Read Version",
        description: "WBTC - World Bible Translation Center",
        url: "https://www.dropbox.com/s/hm6xxft4mb926zq/ERV-AR.SQLite3?dl=1"
      },
      {
        code: "LA",
        filename: "LA.zip",
        dbFileName: "LA.SQLite3",
        label: "live Arabic(targamet El hayah)",
        description: "",
        url: "https://www.dropbox.com/s/r5z401h5qgniv6p/LA.SQLite3?dl=1"
      },
      {
        code: "NAV_1997",
        filename: "NAV.zip",
        dbFileName: "NAV.SQLite3",
        label: "كتاب الحياة",
        description: "",
        url: "https://www.dropbox.com/s/xx77t61ruwotkgu/NAV.SQLite3?dl=1"
      },
      {
        code: "SVDA_1865",
        filename: "SVDA.zip",
        dbFileName: "SVDA.SQLite3",
        label: "فانديك",
        description: "",
        url: "https://www.dropbox.com/s/9g96doy6fo2uqtw/SVDA.SQLite3?dl=1"
      }
    ],
    // Amharic
    am:[
      {
        code: "ANT_20010",
        filename: "ANT.zip",
        dbFileName: "ANT.SQLite3",
        label: "አዳስ ሴዳን",
        description: "",
        url: "https://www.dropbox.com/s/3ppvqln3gect6uc/ANT.SQLite3?dl=1"
      },
      {
        code: "Ararat_1910",
        filename: "Ararat.zip",
        dbFileName: "Ararat.SQLite3",
        label: "Արարատյան Թարգմանություն մասնիկներով",
        description: "Հայաստանի Աստվածաշնչային ընկերություն",
        url: "https://www.dropbox.com/s/bmdrlyd2urfr8mw/Ararat.SQLite3?dl=1"
      }
    ],
    // Thai
    th:[
      {
        code: "ThKJV_2003",
        filename: "ThKJV.zip",
        dbFileName: "ThKJV.SQLite3",
        label: "ไทยฉบับ KJV",
        description: "перевод с английской KJV, Philip R. J. Pope",
        url: "https://www.dropbox.com/s/p512zkcmeyp980o/ThKJV.SQLite3?dl=1"
      }
    ],
    // Burmese
    my:[
      {
        code: "BJB_1840",
        filename: "BJB.zip",
        dbFileName: "BJB.SQLite3",
        label: "Burmese Bible",
        description: "Adoniram Judson, Bible Society of Myanmar",
        url: "https://www.dropbox.com/s/3k42vlrzfl80sg5/BJB.SQLite3?dl=1"
      },
      {
        code: "BurB_1825",
        filename: "BurB.zip",
        dbFileName: "BurB.SQLite3",
        label: "Burmese (Myanmar) Bible",
        description: "Adoniram Judson",
        url: "https://www.dropbox.com/s/0y4nmqw620f6dw5/BurB.SQLite3?dl=1"
      }
    ],
    // Khmer
    km:[
      {
        code: "KhNT",
        filename: "KhNT.zip",
        dbFileName: "KhNT.SQLite3",
        label: "Khmer Christian Bible - New Testament",
        description: "Words of Life Ministries",
        url: "https://www.dropbox.com/s/w01yh2iqwoyucoh/KhNT.SQLite3?dl=1"
      }
    ],
    // Hausa
    ha:[
      {
        code: "HAU_2010",
        filename: "HAU.zip",
        dbFileName: "HAU.SQLite3",
        label: "Littafi Mai Tsarki",
        description: "Bible Society of Nigeria",
        url: "https://www.dropbox.com/s/drq7uo01pt2c6p1/HAU.SQLite3?dl=1"
      }
    ]
  }
};
function getBible(code) {
  for(var key in Bible.list){
    for (var i = 0; i < Bible.list[key].length; i++){
      var bibleObj = Bible.list[key][i];
      if (bibleObj.code == code){
        bibleObj.language = key;
        return bibleObj;
      }
    }
  }
  return false;
}
