import "dotenv/config";
import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ 環境変数が正しく設定されていません。");
  process.exit(1);
}
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// =====================================
// MountainRecord 型（upload.ts）
// =====================================
interface MountainRecord {
  id: number;
  year: number;
  filename: string | null;
  place: string | null;
  title: string | null;
  date: string;
  activityType: string;
  details: string | null;
}

// MountainRecord 型（upload.ts のデータ形式）
interface MountainRecord {
  id: number;
  year: number;
  filename: string | null;
  place: string | null;
  title: string | null;
  date: string;
  activityType: string;
  details: string | null;
}

const data2007: Omit<MountainRecord, "id">[] = [
  // 1) 2007/11/10～11: 南面白岳・大東岳 (中止)
  {
    year: 2007,
    filename: null,
    title: null,
    place: "南面白岳・大東岳",
    date: "11/10～11",
    activityType: "yama",
    details: "諸事情により中止",
  },
  // 2) 2007/10/27～28: 磐梯山・猫魔ケ岳 (中止)
  {
    year: 2007,
    filename: null,
    title: null,
    place: "磐梯山・猫魔ケ岳",
    date: "10/27～28",
    activityType: "yama",
    details: "雨天により中止",
  },
  // 3) 2007/10/13～14: 鳥海山
  {
    year: 2007,
    filename: "2007/Choukai/2007.10tyoukai",
    place: null,
    title: "鳥海山",
    date: "10/13～14",
    activityType: "yama",
    details: null,
  },
  // 4) 2007/08/21～27: 長期山行（飯豊連峰）
  {
    year: 2007,
    filename: "2007/Iide/2007.08.iide",
    place: null,
    title: "長期山行（飯豊連峰）",
    date: "08/21～27",
    activityType: "yama",
    details: null,
  },
  // 5) 2007/08/------: 船形山 (place のみ記載)
  {
    year: 2007,
    filename: null,
    place: "船形山",
    title: null,
    date: "08/??",
    activityType: "yama",
    details: null,
  },
  // 6) 2007/07/28～29: 訓練山行（笹谷峠～熊野岳）
  {
    year: 2007,
    filename: "2007/Kunren/20070728kunren",
    place: null,
    title: "訓練山行（笹谷峠～熊野岳）",
    date: "07/28～29",
    activityType: "yama",
    details: null,
  },
  // 7) 2007/06/23～24: 安達太良山～「ほんとのそら」をもとめて～
  {
    year: 2007,
    filename: "2007/Adatara/20070623adatara",
    place: null,
    title: "安達太良山～「ほんとのそら」をもとめて～",
    date: "06/23～24",
    activityType: "yama",
    details: null,
  },
  // 8) 2007/06/16～17: 蔵王
  {
    year: 2007,
    filename: "2007/Zao/2007.6.16zao",
    place: null,
    title: "蔵王",
    date: "06/16～17",
    activityType: "yama",
    details: null,
  },
  // 9) 2007/05/------: 泉ヶ岳 (place のみ記載)
  {
    year: 2007,
    filename: null,
    place: "泉ヶ岳",
    title: null,
    date: "05/??",
    activityType: "yama",
    details: null,
  },
  // 10) 2007/05/------: 北面白山（新入生歓迎登山） (place のみ記載)
  {
    year: 2007,
    filename: null,
    place: "北面白山（新入生歓迎登山）",
    title: null,
    date: "05/??",
    activityType: "yama",
    details: null,
  },
  // 11) 2007/04/------: 泉ヶ岳 (中止)
  {
    year: 2007,
    filename: null,
    title: null,
    place: "泉ヶ岳",
    date: "04/??",
    activityType: "yama",
    details: "雨天により中止",
  },
];

const data2008: Omit<MountainRecord, "id">[] = [
  // 1) 2008/10/25～26: 安達太良山
  {
    year: 2008,
    filename: "2008/Adatara/2008adatara",
    place: null,
    title: "安達太良山",
    date: "10/25～26",
    activityType: "yama",
    details: null,
  },
  // 2) 2008/10/11～12: 磐梯山・猫魔ヶ岳
  {
    year: 2008,
    filename: "2008/NekomaBandai/2008nekomabandai",
    place: null,
    title: "磐梯山・猫魔ヶ岳",
    date: "10/11～12",
    activityType: "yama",
    details: null,
  },
  // 3) 2008/08/21～25: 長期山行（朝日連峰）(中止)
  {
    year: 2008,
    filename: null,
    title: null,
    place: "長期山行（朝日連峰）",
    date: "08/21～25",
    activityType: "yama",
    details: "雨天により中止",
  },
  // 4) 2008/08/01～02: 訓練山行（笹谷峠～熊野岳）
  {
    year: 2008,
    filename: "2008/Kunren/2008.kunnrenn",
    place: null,
    title: "訓練山行（笹谷峠～熊野岳）",
    date: "08/01～02",
    activityType: "yama",
    details: null,
  },
  // 5) 2008/07/05～06: 大東岳・南面白山
  {
    year: 2008,
    filename: "2008/SouthOmoshiro/2008.minamiomosiro",
    place: null,
    title: "大東岳・南面白山",
    date: "07/05～06",
    activityType: "yama",
    details: null,
  },
  // 6) 2008/06/28～29: 船形山
  {
    year: 2008,
    filename: "2008/Funagata/2008.hunagata",
    place: null,
    title: "船形山",
    date: "06/28～29",
    activityType: "yama",
    details: null,
  },
  // 7) 2008/06/14～15: 南蔵王
  {
    year: 2008,
    filename: "2008/SouthZao/2008.06.minamizao",
    place: null,
    title: "南蔵王",
    date: "06/14～15",
    activityType: "yama",
    details: null,
  },
  // 8) 2008/05/31～01: 安達太良山(中止)
  {
    year: 2008,
    filename: null,
    place: null,
    title: "安達太良山",
    date: "05/31～01",
    activityType: "yama",
    details: "雨天により中止",
  },
  // 9) 2008/05/17～18: 北面白山（新入生歓迎登山）
  {
    year: 2008,
    filename: "2008/Omoshiroyama/2008.omoshiroyama",
    place: null,
    title: "北面白山（新入生歓迎登山）",
    date: "05/17～18",
    activityType: "yama",
    details: null,
  },
  // 10) 2008/04/27: 泉ヶ岳（お試し登山）
  {
    year: 2008,
    filename: "2008/Izumi/2008.izumi",
    place: null,
    title: "泉ヶ岳（お試し登山）",
    date: "04/27",
    activityType: "yama",
    details: null,
  },
];

const data2009: Omit<MountainRecord, "id">[] = [
  // 1) 2009/10/24～25: 吾妻山
  {
    year: 2009,
    filename: "2009/Azumayama/2009.azumayamaa",
    place: null,
    title: "吾妻山",
    date: "10/24～25",
    activityType: "yama",
    details: null,
  },
  // 2) 2009/10/10: 鳥海山
  {
    year: 2009,
    filename: "2009/Choukaisan/09.10.10choukai",
    place: null,
    title: "鳥海山",
    date: "10/10",
    activityType: "yama",
    details: null,
  },
  // 3) 2009/09/06～09: 中期登山(北アルプス白馬三山)
  {
    year: 2009,
    filename: "2009/Chuki.shirouma/09.9tyuuki.shirouma",
    place: null,
    title: "中期登山(北アルプス白馬三山)",
    date: "09/06～09",
    activityType: "yama",
    details: null,
  },
  // 4) 2009/08/12～17: 長期登山 (プロローグ・その?)
  {
    year: 2009,
    filename: "2009/Chouki/tyoukisono1",
    place: "長期登山",
    title: "プロローグ",
    date: "08/12～17",
    activityType: "yama",
    details: null,
  },
  {
    year: 2009,
    filename: "2009/Chouki/2009.choukitozan",
    place: "長期登山",
    title: "その?",
    date: "08/12～17",
    activityType: "yama",
    details: null,
  },
  // 5) 2009/08/08～09: 訓練登山（後発隊）
  {
    year: 2009,
    filename: "2009/Kunren/2009.10.kunnrenn",
    place: null,
    title: "訓練登山（後発隊）",
    date: "08/08～09",
    activityType: "yama",
    details: null,
  },
  // 6) 2009/07/04～05: 岩手山
  {
    year: 2009,
    filename: "2009/Iwatesan/iwatesan2009",
    place: null,
    title: "岩手山",
    date: "07/04～05",
    activityType: "yama",
    details: null,
  },
  // 7) 2009/06/21: 早池峰山
  {
    year: 2009,
    filename: "2009/Hayachine/20090621.hayatine",
    place: null,
    title: "早池峰山",
    date: "06/21",
    activityType: "yama",
    details: null,
  },
  // 8) 2009/05/23～24: 安達太良山
  {
    year: 2009,
    filename: "2009/Adatara.Masami/200905.adatara",
    place: null,
    title: "安達太良山",
    date: "05/23～24",
    activityType: "yama",
    details: null,
  },
  // 9) 2009/05/09～10: 北面白山（新入生歓迎登山）
  {
    year: 2009,
    filename: "2009/Kitaomoshiro/20090509kitaomoshiro",
    place: null,
    title: "北面白山（新入生歓迎登山）",
    date: "05/09～10",
    activityType: "yama",
    details: null,
  },
  // 10) 2009/04/---: 泉ヶ岳（お試し登山）
  {
    year: 2009,
    filename: "2009/Izumi/2009.izumi",
    place: null,
    title: "泉ヶ岳（お試し登山）",
    date: "04/",
    activityType: "yama",
    details: null,
  },
];

const data2010: Omit<MountainRecord, "id">[] = [
  // 1) 2010/10/16～17: 那須岳 ([Sohei編], [Takuma編])
  {
    year: 2010,
    filename: "2010/Nasuyama.Sohei/2010.nasuyama.sohei",
    place: "那須岳",
    title: "Sohei編",
    date: "10/16～17",
    activityType: "yama",
    details: null,
  },
  // 2) 2010/08/11～17: 長期登山 in 南アルプス ([インドア編], [アウトドア編])
  {
    year: 2010,
    filename: "2010/Chouki/2010.choukitozan",
    place: "長期登山in南アルプス",
    title: "インドア編",
    date: "08/11～17",
    activityType: "yama",
    details: null,
  },
  {
    year: 2010,
    filename: "2010/Chouki/2010.choukitozan2",
    place: "長期登山in南アルプス",
    title: "アウトドア編",
    date: "08/11～17",
    activityType: "yama",
    details: null,
  },
  // 3) 2010/07/10～11: 訓練 in 北蔵王 ([Shinya編], [Yoshiro編])
  {
    year: 2010,
    filename: "2010/Kunren.Shinya/2010kunrenshinya",
    place: "訓練in北蔵王",
    title: "Shinya編",
    date: "07/10～11",
    activityType: "yama",
    details: null,
  },
  {
    year: 2010,
    filename: "2010/Zao.Yoshiro/2010.7kunrenzao-yoshi",
    place: "訓練in北蔵王",
    title: "Yoshiro編",
    date: "07/10～11",
    activityType: "yama",
    details: null,
  },
  // 4) 2010/07/04: 補講山行 in 月山 (Titleなし)
  {
    year: 2010,
    filename: "2010/Gassan/2010.gassan",
    place: "補講山行（月山）",
    title: null,
    date: "07/04",
    activityType: "yama",
    details: null,
  },
  // 5) 2010/06/26～27: 朝日連峰 ([Shinya編], [Masami編])
  {
    year: 2010,
    filename: "2010/Asahi.Shinya/2010asahi.shinya",
    place: "朝日連峰",
    title: "Shinya編",
    date: "06/26～27",
    activityType: "yama",
    details: null,
  },
  {
    year: 2010,
    filename: "2010/Asahi.Masami/ooasahidake2010verunko",
    place: "朝日連峰",
    title: "Masami編",
    date: "06/26～27",
    activityType: "yama",
    details: null,
  },
  // 6) 2010/06/12～13: 早池峰山 ([Masami編], [Shinya編])
  {
    year: 2010,
    filename: "2010/Hayachine/2010hayachine",
    place: "早池峰山",
    title: "Masami編",
    date: "06/12～13",
    activityType: "yama",
    details: null,
  },
  {
    year: 2010,
    filename: "2010/Hayachine.Shinya/2010hayachine.shinya",
    place: "早池峰山",
    title: "Shinya編",
    date: "06/12～13",
    activityType: "yama",
    details: null,
  },
  // 7) 2010/05/29～30: 南面白・大東岳 ([Yoshiro編], [Masami編])
  {
    year: 2010,
    filename: "2010/Daito.Yoshiro/2010daito",
    place: "南面白・大東岳",
    title: "Yoshiro編",
    date: "05/29～30",
    activityType: "yama",
    details: null,
  },
  {
    year: 2010,
    filename: "2010/Daitodake/2010.daitodake",
    place: "南面白・大東岳",
    title: "Masami編",
    date: "05/29～30",
    activityType: "yama",
    details: null,
  },
  // 8) 2010/05/15～16: 北面白山 ([Shinya編], [Masami編])
  {
    year: 2010,
    filename: "2010/Omoshiroyama.Shinya/2010.omosiroyama",
    place: "北面白山",
    title: "Shinya編",
    date: "05/15～16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2010,
    filename: "2010/Omoshiroyama/2010.5omo_masami",
    place: "北面白山",
    title: "Masami編",
    date: "05/15～16",
    activityType: "yama",
    details: null,
  },
];

const data2011: Omit<MountainRecord, "id">[] = [
  // 1) 2011/10/08: 栗駒山 ([Haruka編], [Takaki編])
  {
    year: 2011,
    filename: "2011/2011.10kurikoma.haruka/2011.10.kurikoma.haruka",
    place: "栗駒山",
    title: "Haruka編",
    date: "10/08",
    activityType: "yama",
    details: null,
  },
  {
    year: 2011,
    filename: "2011/2011.10kurikoma/2011-10",
    place: "栗駒山",
    title: "Takaki編",
    date: "10/08",
    activityType: "yama",
    details: null,
  },
  // 2) 2011/09/27～30: 中期登山 in 谷川岳 ([Kome編], [OBR編])
  {
    year: 2011,
    filename: "2011/2011.09.tanigawa.kome/2011.09.tanigawa.kome",
    place: "中期登山in谷川岳",
    title: "Kome編",
    date: "09/27～30",
    activityType: "yama",
    details: null,
  },
  {
    year: 2011,
    filename: "http://outdoor.geocities.jp/ddyt0081ox/2011tanigawaobr/2011tanigawa.obr",
    place: "中期登山in谷川岳",
    title: "OBR編",
    date: "09/27～30",
    activityType: "yama",
    details: null,
  },
  // 3) 2011/08/15～21: 長期登山 in 大雪山 ([Kome編])
  {
    year: 2011,
    filename: "2011/2011.08tyoki/Part1/TyoukiPart1",
    place: "長期登山in大雪山",
    title: "Kome編",
    date: "08/15～21",
    activityType: "yama",
    details: null,
  },
  // 4) 2011/07/30～31: 訓練 in 北蔵王 ([Sohe編], [Takuma編], [Shoko編])
  {
    year: 2011,
    filename: "http://outdoor.geocities.jp/ddyt0081ox/2011kunrensohei/2011kunrensohei",
    place: "訓練in北蔵王",
    title: "Sohe編",
    date: "07/30～31",
    activityType: "yama",
    details: null,
  },
  {
    year: 2011,
    filename: "2011/2011.07kunren.t/2011.07.30-31kunren",
    place: "訓練in北蔵王",
    title: "Takuma編",
    date: "07/30～31",
    activityType: "yama",
    details: null,
  },
  {
    year: 2011,
    filename: "2011/2011.07kunren.s/kunren.s",
    place: "訓練in北蔵王",
    title: "Shoko編",
    date: "07/30～31",
    activityType: "yama",
    details: null,
  },
  // 5) 2011/07/24: 補講山行 in 月山 ([Sohei編], [Yasuhiro編], [Takuma編])
  {
    year: 2011,
    filename: "2011/2011.07gassan.sohei/2011.07.gasan.sohei",
    place: "補講山行in月山",
    title: "Sohei編",
    date: "07/24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2011,
    filename: "http://outdoor.geocities.jp/ddyt0081ox/2011gassanyshr/2011.gassan.yshr",
    place: "補講山行in月山",
    title: "Yasuhiro編",
    date: "07/24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2011,
    filename: "http://outdoor.geocities.jp/jishinkaihp2/2011.gassan.takuma",
    place: "補講山行in月山",
    title: "Takuma編",
    date: "07/24",
    activityType: "yama",
    details: null,
  },
  // 6) 2011/07/16～17: 焼石岳 (Titleなし)
  {
    year: 2011,
    filename: null,
    place: "焼石岳",
    title: null,
    date: "07/16～17",
    activityType: "yama",
    details: null,
  },
  // 7) 2011/07/16～17: 鳴海山 ([Sohei編])
  {
    year: 2011,
    filename: "2011/2011.07choukai/choukai2011",
    place: "鳴海山",
    title: "Sohei編",
    date: "07/16～17",
    activityType: "yama",
    details: null,
  },
  // 8) 2011/07/09～10: 岩手山 ([Sohei編], [Shoko編])
  {
    year: 2011,
    filename: "http://outdoor.geocities.jp/ddyt0081ox/2011iwatesansohei/2011.iwatesan.sohei",
    place: "岩手山",
    title: "Sohei編",
    date: "07/09～10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2011,
    filename: null,
    place: "岩手山",
    title: "Shoko編",
    date: "07/09～10",
    activityType: "yama",
    details: null,
  },
  // 9) 2011/06/05: 泉ヶ岳 (Titleなし)
  {
    year: 2011,
    filename: null,
    place: "泉ヶ岳",
    title: null,
    date: "06/05",
    activityType: "yama",
    details: null,
  },
];

const data2012: Omit<MountainRecord, "id">[] = [
  // 1) 2012/10/14: 栗駒山 ([MiKA編])
  {
    year: 2012,
    filename: "2012/2012.10kurikoma.teammika/newfile",
    place: "栗駒山",
    title: "MiKA編",
    date: "10/14",
    activityType: "yama",
    details: null,
  },
  // 2) 2012/09/27～29: 尾瀬 ([TOSHI編])
  {
    year: 2012,
    filename: "2012/2012.09.oze.team.tosshi/newfile",
    place: "尾瀬",
    title: "TOSHI編",
    date: "09/27～29",
    activityType: "yama",
    details: null,
  },
  // 3) 2012/08/15～19: 長期登山 ([KOME編], [yamanaka編])
  {
    year: 2012,
    filename: "2012/2012tyoukiteamkome/newfile",
    place: "長期登山",
    title: "KOME編",
    date: "08/15～19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2012,
    filename: "2012/2012.08.chouki.team.takaki/newfile",
    place: "長期登山",
    title: "yamanaka編",
    date: "08/15～19",
    activityType: "yama",
    details: null,
  },
  // 4) 2012/07/28: 早池峰 ([KOME編])
  {
    year: 2012,
    filename: "2012/2012.07.hayachine/newfile",
    place: "早池峰",
    title: "KOME編",
    date: "07/28",
    activityType: "yama",
    details: null,
  },
  // 5) 2012/07/21: Azuma yamanaka編 (titleなし)
  {
    year: 2012,
    filename: null,
    place: "Azuma yamanaka編",
    title: null,
    date: "07/21",
    activityType: "yama",
    details: null,
  },
  // 6) 2012/07/14～15: 訓練登山 ([yamanaka編])
  {
    year: 2012,
    filename: "2012/201207kunrenkaneta/newfile4",
    place: "訓練登山",
    title: "yamanaka編",
    date: "07/14～15",
    activityType: "yama",
    details: null,
  },
  // 7) 2012/06/30～07/01: 朝日連峰 ([Kome編], [yamanaka編], [Obara編])
  {
    year: 2012,
    filename: "2012/2012.06.asahi.teamkome/newfile",
    place: "朝日連峰",
    title: "Kome編",
    date: "06/30～07/01",
    activityType: "yama",
    details: null,
  },
  {
    year: 2012,
    filename: "2012/2012.06.asahi.teamtakaki/newfile",
    place: "朝日連峰",
    title: "yamanaka編",
    date: "06/30～07/01",
    activityType: "yama",
    details: null,
  },
  {
    year: 2012,
    filename: "2012/2012.6.asahidake.teamobara/newfile",
    place: "朝日連峰",
    title: "Obara編",
    date: "06/30～07/01",
    activityType: "yama",
    details: null,
  },
  // 8) 2012/06/23～24: 神室山 ([OBR編])
  {
    year: 2012,
    filename: "2012/2012.06.kamuro.team.obr/newfile",
    place: "神室山",
    title: "OBR編",
    date: "06/23～24",
    activityType: "yama",
    details: null,
  },
  // 9) 2012/06/16～17: 神室山 ([Kome編])
  {
    year: 2012,
    filename: "2012/20120616kamuro/20120616kamuro",
    place: "神室山",
    title: "Kome編",
    date: "06/16～17",
    activityType: "yama",
    details: null,
  },
  // 10) 2012/06/02～03: 磐梯山・猫魔ヶ岳 ([OBR編])
  {
    year: 2012,
    filename: "2012/2012.06bandai.team.obr/newfile",
    place: "磐梯山・猫魔ヶ岳",
    title: "OBR編",
    date: "06/02～03",
    activityType: "yama",
    details: null,
  },
  // 11) 2012/06/02～03: 安達太良山 ([yamanaka編])
  {
    year: 2012,
    filename: "2012/2012.05adatara/newfile",
    place: "安達太良山",
    title: "yamanaka編",
    date: "06/02～03",
    activityType: "yama",
    details: null,
  },
  // 12) 2012/05/19～20: 北面白山 ([Kome編], [OBR編], [Hiroki編])
  {
    year: 2012,
    filename: "2012/2012.05.kitaomosiro.kome/newfile",
    place: "北面白山",
    title: "Kome編",
    date: "05/19～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2012,
    filename: "2012/2012.05.kitaomosiro.team.shinya/newfile",
    place: "北面白山",
    title: "OBR編",
    date: "05/19～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2012,
    filename: "2012/201205hokumen.hiroki/newfile",
    place: "北面白山",
    title: "Hiroki編",
    date: "05/19～20",
    activityType: "yama",
    details: null,
  },
  // 13) 2012/05/12: 泉ヶ岳 ([Kome編], [Hiroki編], [OBR編])
  {
    year: 2012,
    filename: "2012/2012.05izumi.team.kome/newfile",
    place: "泉ヶ岳",
    title: "Kome編",
    date: "05/12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2012,
    filename: "2012/2012.05izumi.teamhiroki/newfile",
    place: "泉ヶ岳",
    title: "Hiroki編",
    date: "05/12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2012,
    filename: "2012/2012.05.izumi.teamobr/newfile",
    place: "泉ヶ岳",
    title: "OBR編",
    date: "05/12",
    activityType: "yama",
    details: null,
  },
];

const data2013: Omit<MountainRecord, "id">[] = [
  // 1) 2013/10/12: 秋山in月山 雨天中止
  {
    year: 2013,
    filename: null,
    place: "秋山in月山",
    title: null,
    date: "10/12",
    activityType: "yama",
    details: "雨天中止",
  },
  // 2) 2013/09/26～29: 中期登山 ([NOBUYUKI編])
  {
    year: 2013,
    filename: "2013/2013.09.chuki.TeamNobuyuki/ChukiNobuyuki",
    place: "中期登山",
    title: "NOBUYUKI編",
    date: "09/26～29",
    activityType: "yama",
    details: null,
  },
  // 3) 2013/08/12～16: 長期登山in北アルプス ([RYOHEI編], [MIKA編])
  {
    year: 2013,
    filename: "2013/2013.08-tyoki.ryohei/tyouki1",
    place: "長期登山in北アルプス",
    title: "RYOHEI編",
    date: "08/12～16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/2013.choki.team.mika/chouki1",
    place: "長期登山in北アルプス",
    title: "MIKA編",
    date: "08/12～16",
    activityType: "yama",
    details: null,
  },
  // 4) 2013/08/04: 焼石岳 ([TOSHIKI編], [別班])
  {
    year: 2013,
    filename: "2013/2013.08.yakeishi.team.toshiki/yakeishi",
    place: "焼石岳",
    title: "TOSHIKI編",
    date: "08/04",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/2013.08yakeisi/Yakeishi",
    place: "焼石岳",
    title: "別班",
    date: "08/04",
    activityType: "yama",
    details: null,
  },
  // 5) 2013/07/06～07: 訓練登山 ([RYOHEI編], [MIKA編], [TOSHIKI編])
  {
    year: 2013,
    filename: "2013/2013kunrenryohei/KunrenRyohei",
    place: "訓練登山",
    title: "RYOHEI編",
    date: "07/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/2013.07.KunrenMika/201307kunrenmika",
    place: "訓練登山",
    title: "MIKA編",
    date: "07/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/2013.07.kunren.toshiki/kunrenTOSHIKI",
    place: "訓練登山",
    title: "TOSHIKI編",
    date: "07/06～07",
    activityType: "yama",
    details: null,
  },
  // 6) 2013/06/29～30: 朝日岳 ([RYOHEI編])
  {
    year: 2013,
    filename: "2013/asahiRYOHEI/asahiRYOHEI",
    place: "朝日岳",
    title: "RYOHEI編",
    date: "06/29～30",
    activityType: "yama",
    details: null,
  },
  // 7) 2013/06/29～30: 鳥海山 ([MIKA編])
  {
    year: 2013,
    filename: "2013/2013chokai/chokai",
    place: "鳥海山",
    title: "MIKA編",
    date: "06/29～30",
    activityType: "yama",
    details: null,
  },
  // 8) 2013/06/15～16: 岩手山 ([RYOHEI編], [NOBUYUKI編])
  {
    year: 2013,
    filename: "2013/iwatesanRYOHEI/iwatesanRYOHEI",
    place: "岩手山",
    title: "RYOHEI編",
    date: "06/15～16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/iwatesansugi/iwatesan",
    place: "岩手山",
    title: "NOBUYUKI編",
    date: "06/15～16",
    activityType: "yama",
    details: null,
  },
  // 9) 2013/06/15～16: 早池峰山 ([MIKA編], [KOME編])
  {
    year: 2013,
    filename: "2013/HayachineMika/hayachinemika",
    place: "早池峰山",
    title: "MIKA編",
    date: "06/15～16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/2013.hayachine.team.tomoshi/HayachineTomoshi",
    place: "早池峰山",
    title: "KOME編",
    date: "06/15～16",
    activityType: "yama",
    details: null,
  },
  // 10) 2013/05/25～26: 安達太良山 ([TOSHIKI編], [RYOHEI編])
  {
    year: 2013,
    filename: "2013/adataratoshiki/AdataraToshiki",
    place: "安達太良山",
    title: "TOSHIKI編",
    date: "05/25～26",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/2013adataraRyohei/AdataraRyohei",
    place: "安達太良山",
    title: "RYOHEI編",
    date: "05/25～26",
    activityType: "yama",
    details: null,
  },
  // 11) 2013/04/18～19: 北面白山 ([TOSHI編], [NOBUYUKI編])
  {
    year: 2013,
    filename: "2013/kitaomoshirotoshi/kitaomosiro",
    place: "北面白山",
    title: "TOSHI編",
    date: "04/18～19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/kitaomoshirosugi/kitaomoshirosugi",
    place: "北面白山",
    title: "NOBUYUKI編",
    date: "04/18～19",
    activityType: "yama",
    details: null,
  },
  // 12) 2013/04/27: 泉ヶ岳 ([RYOHEI編], [MIKA編])
  {
    year: 2013,
    filename: "2013/izumiteamryohei/IzumiTeamRyohei",
    place: "泉ヶ岳",
    title: "RYOHEI編",
    date: "04/27",
    activityType: "yama",
    details: null,
  },
  {
    year: 2013,
    filename: "2013/izumiMIKA/IzumiMika",
    place: "泉ヶ岳",
    title: "MIKA編",
    date: "04/27",
    activityType: "yama",
    details: null,
  },
];

const data2014: Omit<MountainRecord, "id">[] = [
  // 1) 2014/10/11: 秋山 月山リベンジ ([Onigiri編], [GAWARA編], [Gassan編])
  {
    year: 2014,
    filename: "2014/2014.aiyama/teamomigiri",
    place: "秋山 月山リベンジ",
    title: "Onigiri編",
    date: "10/11",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.10.akiyama.teamgawara/teamgawara",
    place: "秋山 月山リベンジ",
    title: "GAWARA編",
    date: "10/11",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.10.akiyama.teamgussan/akiyama-gussan",
    place: "秋山 月山リベンジ",
    title: "Gassan編",
    date: "10/11",
    activityType: "yama",
    details: null,
  },

  // 2) 2014/09/24～27: 中期登山 ([AKARISO編])
  {
    year: 2014,
    filename: "2014/2014.09.oze/team_akari",
    place: "中期登山",
    title: "AKARISO編",
    date: "09/24～27",
    activityType: "yama",
    details: null,
  },

  // 3) 2014/08/12～15: 長期登山in大雪山 ([NOBUYUKI編], [YUKIE編], [NAOTO編])
  {
    year: 2014,
    filename: "2014/2014.08.Chouki.NOBU",
    place: "長期登山in大雪山",
    title: "NOBUYUKI編",
    date: "08/12～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/chokiyukie/mokuji",
    place: "長期登山in大雪山",
    title: "YUKIE編",
    date: "08/12～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/chokinaoto/naoto",
    place: "長期登山in大雪山",
    title: "NAOTO編",
    date: "08/12～15",
    activityType: "yama",
    details: null,
  },

  // 4) 2014/07/19～20: 訓練登山in北蔵王 ([NAOTO編], [NOBUYUKI編], [YUKIE編])
  {
    year: 2014,
    filename: "2014/2014.07.kunren.naoto/zao_report",
    place: "訓練登山in北蔵王",
    title: "NAOTO編",
    date: "07/19～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.07.kunnrenn.nobuyuki/kiroku",
    place: "訓練登山in北蔵王",
    title: "NOBUYUKI編",
    date: "07/19～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.07.kunrenyukie/kunrenyukie",
    place: "訓練登山in北蔵王",
    title: "YUKIE編",
    date: "07/19～20",
    activityType: "yama",
    details: null,
  },

  // 5) 2014/07/05～06: 早池峰山 ([YUKIE編], [NOBUYUKI編])
  {
    year: 2014,
    filename: "2014/2014.07.hayachinesan.team_yukie/2014.07.hayachinesan.team_yukie",
    place: "早池峰山",
    title: "YUKIE編",
    date: "07/05～06",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.07.hayachinesan.teamnobuyuki/2014.07.hayachinesan.teamnobuyuki",
    place: "早池峰山",
    title: "NOBUYUKI編",
    date: "07/05～06",
    activityType: "yama",
    details: null,
  },

  // 6) 2014/06/28～29: 神室山 ([NAOTO編])
  {
    year: 2014,
    filename: "2014/2014.06.kamuro.teamnaoto/2014_kamuro",
    place: "神室山",
    title: "NAOTO編",
    date: "06/28～29",
    activityType: "yama",
    details: null,
  },

  // 7) 2014/06/21～22: 岩手山 ([NOBUYUKI編], [YUKIE編])
  {
    year: 2014,
    filename: "2014/2014.iwatesan.teamnobuyuki/iwatesan.teamnobuyuki",
    place: "岩手山",
    title: "NOBUYUKI編",
    date: "06/21～22",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.06.iwate",
    place: "岩手山",
    title: "YUKIE編",
    date: "06/21～22",
    activityType: "yama",
    details: null,
  },

  // 8) 2014/06/14～15: 安達太良山 ([NOBUYUKI編], [NAOTO編], [TAKAHIRO編], [YUKIE編])
  {
    year: 2014,
    filename: "2014/2014.06.adatara/adatara.team-NOBUYUKI",
    place: "安達太良山",
    title: "NOBUYUKI編",
    date: "06/14～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.06.adatara.teamkaneta/tean.kaneta.sankoukiroku",
    place: "安達太良山",
    title: "NAOTO編",
    date: "06/14～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.06.adatara.teamtakahiro/adatara.teamtakahiro",
    place: "安達太良山",
    title: "TAKAHIRO編",
    date: "06/14～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.06.adatara.teamyukie/adatara.team-yukie",
    place: "安達太良山",
    title: "YUKIE編",
    date: "06/14～15",
    activityType: "yama",
    details: null,
  },

  // 9) 2014/05/24～25: 猫魔ヶ岳＆磐梯山 ([NAOTO編], [ASAKO編], [TAKAHIRO編])
  {
    year: 2014,
    filename: "2014/2014.05.nekomaandbandai.teamnaoto/NekomaandBandai",
    place: "猫魔ヶ岳＆磐梯山",
    title: "NAOTO編",
    date: "05/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014nekomabandai/teamasako",
    place: "猫魔ヶ岳＆磐梯山",
    title: "ASAKO編",
    date: "05/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.05.nekomabandai.takahiro/2014.05.nekomabandai.takahiro",
    place: "猫魔ヶ岳＆磐梯山",
    title: "TAKAHIRO編",
    date: "05/24～25",
    activityType: "yama",
    details: null,
  },

  // 10) 2014/05/17～18: 北面白山 ([YUKIE編], [NAOTO編], [NOBUYUKI編])
  {
    year: 2014,
    filename: "2014/2014.05.kitaomoshiro.team_yukie/2014.05.kitaomoshiro.team_yukie",
    place: "北面白山",
    title: "YUKIE編",
    date: "05/17～18",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.5.kitaomoshiro.team.naoto/2014.kitaomoshiro.team.naoto",
    place: "北面白山",
    title: "NAOTO編",
    date: "05/17～18",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.05.kitaomoshiro.nobuyuki/2014.05.kitaomoshiro.nobuyuki",
    place: "北面白山",
    title: "NOBUYUKI編",
    date: "05/17～18",
    activityType: "yama",
    details: null,
  },

  // 11) 2014/05/03: 新歓登山@太白山 ([NAOTO編], [TAKAHIRO編])
  {
    year: 2014,
    filename: "2014/2014.05.Taihaku/Taihakusan",
    place: "新歓登山@太白山",
    title: "NAOTO編",
    date: "05/03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2014,
    filename: "2014/2014.05.taihakusan/2014.05.taihakusan",
    place: "新歓登山@太白山",
    title: "TAKAHIRO編",
    date: "05/03",
    activityType: "yama",
    details: null,
  },
];

const data2015: Omit<MountainRecord, "id">[] = [
  // 1) 2015/10/10: 秋山 ([TAKAAKI編], [YUKI編])
  {
    year: 2015,
    filename: "2015/2015.10.nasu.takaaki/nasu.takaaki",
    place: "秋山",
    title: "TAKAAKI編",
    date: "10/10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.10.nasu.yuki/nasu.yuki",
    place: "秋山",
    title: "YUKI編",
    date: "10/10",
    activityType: "yama",
    details: null,
  },

  // 2) 2015/09/22～25: 中期登山 ([YUICHIRO編])
  {
    year: 2015,
    filename: "2015/2015.09.chuki.yuichiro/2015.09.chuki.yuichiro",
    place: "中期登山",
    title: "YUICHIRO編",
    date: "09/22～25",
    activityType: "yama",
    details: null,
  },

  // 3) 2015/08/17～21: 長期登山in南アルプス ([DAIKI編], [AKITO編], [HARUKA編], [AKARI編])
  {
    year: 2015,
    filename: "2015/2015.08.choki.daiki/mokuji",
    place: "長期登山in南アルプス",
    title: "DAIKI編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.08.choki.akito",
    place: "長期登山in南アルプス",
    title: "AKITO編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/15.08.chouki.haruka",
    place: "長期登山in南アルプス",
    title: "HARUKA編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/15.08.choki.akari/honpen",
    place: "長期登山in南アルプス",
    title: "AKARI編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },

  // 4) 2015/07/25～26: 朝日連峰 ([AKARI編], [DAIKI編])
  {
    year: 2015,
    filename: "2015/2015.08.asahidake.akari/2015.08.asahi.akari",
    place: "朝日連峰",
    title: "AKARI編",
    date: "07/25～26",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.08.asahidake.daiki/2015.08.asahidake.daiki",
    place: "朝日連峰",
    title: "DAIKI編",
    date: "07/25～26",
    activityType: "yama",
    details: null,
  },

  // 5) 2015/07/25～26: 訓練登山in面白山 ([DAIKI編], [AKITO編], [AKARI編])
  {
    year: 2015,
    filename: "2015/2015.07.kunren.daiki/kunren.daiki",
    place: "訓練登山in面白山",
    title: "DAIKI編",
    date: "07/25～26",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.07.kunren.akito/kunren.akito",
    place: "訓練登山in面白山",
    title: "AKITO編",
    date: "07/25～26",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.07.kunren.akari/kunren.akari",
    place: "訓練登山in面白山",
    title: "AKARI編",
    date: "07/25～26",
    activityType: "yama",
    details: null,
  },

  // 6) 2015/07/04～05: 訓練登山(下見)in面白山
  {
    year: 2015,
    filename: null,
    place: "訓練登山(下見)in面白山",
    title: null,
    date: "07/04～05",
    activityType: "yama",
    details: null,
  },

  // 7) 2015/07/04～05: 船形山 ([DAIKI編])
  {
    year: 2015,
    filename: "2015/2015.07.hunagata/hunagata",
    place: "船形山",
    title: "DAIKI編",
    date: "07/04～05",
    activityType: "yama",
    details: null,
  },

  // 8) 2015/07/04～05: 鳥海山 ([AKITO編], [HARUKA編])
  {
    year: 2015,
    filename: "2015/2015.07.chokai.akito/2015.07.chokai.akito",
    place: "鳥海山",
    title: "AKITO編",
    date: "07/04～05",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.07.tyokai.haruka/2015.07.tyokai.haruka",
    place: "鳥海山",
    title: "HARUKA編",
    date: "07/04～05",
    activityType: "yama",
    details: null,
  },

  // 9) 2015/06/20～21: 早池峰山 ([HARUKA編], [AKITO編])
  {
    year: 2015,
    filename: "2015/6.20.hayachi.haruka/Hayachine.haruka",
    place: "早池峰山",
    title: "HARUKA編",
    date: "06/20～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/15.06.hayachine.akito/hayachine",
    place: "早池峰山",
    title: "AKITO編",
    date: "06/20～21",
    activityType: "yama",
    details: null,
  },

  // 10) 2015/06/20～21: 岩手山 ([AKARI編], [DAIKI編])
  {
    year: 2015,
    filename: "2015/2015.06.iwate.akari/2015.06.iwate.akari",
    place: "岩手山",
    title: "AKARI編",
    date: "06/20～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.06.iwate.daiki/2015.06.iwate.daiki",
    place: "岩手山",
    title: "DAIKI編",
    date: "06/20～21",
    activityType: "yama",
    details: null,
  },

  // 11) 2015/06/06～07: 磐梯山 ([AKARI編], [DAIKI編], [HARUKA編], [AKITO編])
  {
    year: 2015,
    filename: "2015/2015.06.bandaisan.akari/2015.06.bandaisan.akari/2015.06.bandaisan.akari",
    place: "磐梯山",
    title: "AKARI編",
    date: "06/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.06.bandai.daiki/teamdaiki",
    place: "磐梯山",
    title: "DAIKI編",
    date: "06/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.06.bandai.haruka/Team-Haruka",
    place: "磐梯山",
    title: "HARUKA編",
    date: "06/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.06.bandaisan.akito/Team-Akito",
    place: "磐梯山",
    title: "AKITO編",
    date: "06/06～07",
    activityType: "yama",
    details: null,
  },

  // 12) 2015/05/24～25: 北面白山 ([AKITO編], [AKARI編], [HARUKA編], [DAIKI編])
  {
    year: 2015,
    filename: "2015/2015.05.kitaomoshiro.akito/2015.05.kitaomoshiro.akito",
    place: "北面白山",
    title: "AKITO編",
    date: "05/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.05.kitaomoshiro.akari/2015.05.kitaomoshiro.akari",
    place: "北面白山",
    title: "AKARI編",
    date: "05/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.05.kitaomoshiro.haruka/haruka",
    place: "北面白山",
    title: "HARUKA編",
    date: "05/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/15.05.kitaomoshiro.daiki/kitaomosiro.daiki",
    place: "北面白山",
    title: "DAIKI編",
    date: "05/24～25",
    activityType: "yama",
    details: null,
  },

  // 13) 2015/04/25: 新歓登山@泉ヶ岳 ([DAIKI編], [Akito編], [Akari編], [Ryo編])
  {
    year: 2015,
    filename: "2015/2015.04.izumi.daiki/daiki",
    place: "新歓登山@泉ヶ岳",
    title: "DAIKI編",
    date: "04/25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.04.izumi.akito/akito",
    place: "新歓登山@泉ヶ岳",
    title: "Akito編",
    date: "04/25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.04.izumi.akari/akari",
    place: "新歓登山@泉ヶ岳",
    title: "Akari編",
    date: "04/25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2015,
    filename: "2015/2015.04.izumi.ryo/ryo",
    place: "新歓登山@泉ヶ岳",
    title: "Ryo編",
    date: "04/25",
    activityType: "yama",
    details: null,
  },
];

const data2016: Omit<MountainRecord, "id">[] = [
  // 1) 2016/09/01～04: [個人山行in尾瀬]
  {
    year: 2016,
    filename: "2016/2016.09.oze/oze",
    place: null,
    title: "個人山行in尾瀬",
    date: "09/01～04",
    activityType: "yama",
    details: null,
  },

  // 2) 2016/10/15: 秋山in月山 (参加者: TATSUKI編, KOHEI編)
  {
    year: 2016,
    filename: "2016/2016.10.gassan.tatsuki/2016.10.gassan",
    place: "秋山in月山",
    title: "TATSUKI編",
    date: "10/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.10.gassan.kohei/2016.10.gassan",
    place: "秋山in月山",
    title: "KOHEI編",
    date: "10/15",
    activityType: "yama",
    details: null,
  },

  // 3) 2016/09/01～04: [個人山行in尾瀬]（再出現）
  {
    year: 2016,
    filename: "2016/2016.09.oze/oze",
    place: null,
    title: "個人山行in尾瀬",
    date: "09/01～04",
    activityType: "yama",
    details: null,
  },

  // 4) 2016/08/21～23: [個人山行in剱岳]
  {
    year: 2016,
    filename: "2016/2016.08.tsurugi/tsurugi",
    place: null,
    title: "個人山行in剱岳",
    date: "08/21～23",
    activityType: "yama",
    details: null,
  },

  // 5) 2016/08/15～17: 長期登山in北アルプス (参加者: YUICHIRO編, TAKAAKI編, MASAKIYO編)
  {
    year: 2016,
    filename: "2016/2016.08.choki.Y-uichiro/00",
    place: "長期登山in北アルプス",
    title: "YUICHIRO編",
    date: "08/15～17",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.08.choki.takaaki",
    place: "長期登山in北アルプス",
    title: "TAKAAKI編",
    date: "08/15～17",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.08.choki.masakiyo",
    place: "長期登山in北アルプス",
    title: "MASAKIYO編",
    date: "08/15～17",
    activityType: "yama",
    details: null,
  },

  // 6) 2016/07/23～24: 朝日連峰 (参加者: A-side, B-side)
  {
    year: 2016,
    filename: "2016/2016.07.asahi.kobu/2016.07.asahi.kobu",
    place: "朝日連峰",
    title: "A-side",
    date: "07/23～24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.07.asahi.yasu/asahiyasu",
    place: "朝日連峰",
    title: "B-side",
    date: "07/23～24",
    activityType: "yama",
    details: null,
  },

  // 7) 2016/07/09～10: 訓練登山in北蔵王 (参加者: YUICHIRO編, DAICHI編, YASU編)
  {
    year: 2016,
    filename: "2016/2016.07.kunren.yuichiro/2016.07.kunren.yuichiro",
    place: "訓練登山in北蔵王",
    title: "YUICHIRO編",
    date: "07/09～10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.07.kunren.daichi/2016.07.kunren.daichi",
    place: "訓練登山in北蔵王",
    title: "DAICHI編",
    date: "07/09～10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.07.kunren.yasu/2016.07.kunren.yasu_copy_1",
    place: "訓練登山in北蔵王",
    title: "YASU編",
    date: "07/09～10",
    activityType: "yama",
    details: null,
  },

  // 8) 2016/06/25～26: 鳥海山 (参加者: YUKI編, DAiCHiii編, YUICHIRO編)
  {
    year: 2016,
    filename: "2016/2016.06.choukai.yuki/2016.06.chokai.yuki",
    place: "鳥海山",
    title: "YUKI編",
    date: "06/25～26",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.06.choukai.daichiii/chokaidaichi",
    place: "鳥海山",
    title: "DAiCHiii編",
    date: "06/25～26",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.06.choukai.yuichiro/team_yuichiro",
    place: "鳥海山",
    title: "YUICHIRO編",
    date: "06/25～26",
    activityType: "yama",
    details: null,
  },

  // 9) 2016/06/25～26: 早池峰山 (参加者: YASU編, MASAKIYO編)
  {
    year: 2016,
    filename: "2016/2016.06.hayachine.yasu/hayachine.yasu",
    place: "早池峰山",
    title: "YASU編",
    date: "06/25～26",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.06.hayachine.masakiyo/hayachine.masakiyo",
    place: "早池峰山",
    title: "MASAKIYO編",
    date: "06/25～26",
    activityType: "yama",
    details: null,
  },

  // 10) 2016/06/11～12: 船形山 (参加者: MASAKIYO編)
  {
    year: 2016,
    filename: "2016/2016.06.funagata.masakiyo/funagata2016",
    place: "船形山",
    title: "MASAKIYO編",
    date: "06/11～12",
    activityType: "yama",
    details: null,
  },

  // 11) 2016/06/11～12: 岩手山 (参加者: DAICHI編, TAKAAKI編, YUKI編, YUICHIRO編)
  {
    year: 2016,
    filename: "2016/2016.06.iwate.daichi/iwate.daichi",
    place: "岩手山",
    title: "DAICHI編",
    date: "06/11～12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.06.iwate.takaaki/iwate.takaaki",
    place: "岩手山",
    title: "TAKAAKI編",
    date: "06/11～12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.06.iwate.yuki/2016.06.iwate.yuki",
    place: "岩手山",
    title: "YUKI編",
    date: "06/11～12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.06.iwate.yuichiro/2016.06.iwate.yuichiro",
    place: "岩手山",
    title: "YUICHIRO編",
    date: "06/11～12",
    activityType: "yama",
    details: null,
  },

  // 12) 2016/05/28～29: 安達太良山 (参加者: MASAKIYO編, TAKAAKI編, KOUTA編, YUICHIRO編)
  {
    year: 2016,
    filename: "2016/2016.05.adatara.masakiyo/masakiyo",
    place: "安達太良山",
    title: "MASAKIYO編",
    date: "05/28～29",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.05.adatara.takaaki/2016.adatara.takaaki",
    place: "安達太良山",
    title: "TAKAAKI編",
    date: "05/28～29",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.05.adatara.kouta/adatara.2016.05.kota",
    place: "安達太良山",
    title: "KOUTA編",
    date: "05/28～29",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.05.adatara.yuichiro/yuichiro",
    place: "安達太良山",
    title: "YUICHIRO編",
    date: "05/28～29",
    activityType: "yama",
    details: null,
  },

  // 13) 2016/05/14～15: 北面白山 (参加者: DAICHI編, TAKAAKI編, YASU編, YUICHIRO編)
  {
    year: 2016,
    filename: "2016/2016.05.kitaomoshiro.daichi/2016.05.kitaomoshiro.daichi",
    place: "北面白山",
    title: "DAICHI編",
    date: "05/14～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.05.kitaomoshiro.takaaki/2016.05.kitaomoshiro.takaaki",
    place: "北面白山",
    title: "TAKAAKI編",
    date: "05/14～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.05.kitaomoshiro.yasu/2016.05.kitaomoshiro.yasu",
    place: "北面白山",
    title: "YASU編",
    date: "05/14～15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.05.kitaomoshiro.yuichiro/2016.05.kitaomoshiro.yuichiro",
    place: "北面白山",
    title: "YUICHIRO編",
    date: "05/14～15",
    activityType: "yama",
    details: null,
  },

  // 14) 2016/04/23: 新歓登山@泉ヶ岳 (参加者: DAICHI編, MASAKIYO編, YASU編, YUICHIRO編)
  {
    year: 2016,
    filename: "2016/2016.04.izumi.daichi/2016.04.izumi.daichi",
    place: "新歓登山@泉ヶ岳",
    title: "DAICHI編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.04.izumi.masakiyo/2016.04.izumi.masakiyo",
    place: "新歓登山@泉ヶ岳",
    title: "MASAKIYO編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.04.izumi.yasu/2016.04.izumi.yasu",
    place: "新歓登山@泉ヶ岳",
    title: "YASU編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2016,
    filename: "2016/2016.04.izumi.yuichiro/yuichiro",
    place: "新歓登山@泉ヶ岳",
    title: "YUICHIRO編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
];

const data2017: Omit<MountainRecord, "id">[] = [
  // 1) 2017/08/16～20: 長期山行 (参加者: MASANORI編, KENKI編)
  {
    year: 2017,
    filename: "2017/2017.08.choki.masanori/mokuji",
    place: "長期山行",
    title: "MASANORI編",
    date: "08/16～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.08.tyouki.kenki/mokuji",
    place: "長期山行",
    title: "KENKI編",
    date: "08/16～20",
    activityType: "yama",
    details: null,
  },

  // 2) 2017/07/22～23: 大朝日岳 (参加者: KOHEI編)
  {
    year: 2017,
    filename: "2017/2017.07.asahi.kobu/2017.07.asahi.kobu",
    place: "大朝日岳",
    title: "KOHEI編",
    date: "07/22～23",
    activityType: "yama",
    details: null,
  },

  // 3) 2017/07/08～09: 訓練登山in北蔵王 (参加者: TOMOMI編, MASANORI編)
  {
    year: 2017,
    filename: "2017/2017.07.kunren.tomomi/2017.07.kunren.tomomi",
    place: "訓練登山in北蔵王",
    title: "TOMOMI編",
    date: "07/08～09",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.07.kunren.masanori/2017.07.kunren.masanori",
    place: "訓練登山in北蔵王",
    title: "MASANORI編",
    date: "07/08～09",
    activityType: "yama",
    details: null,
  },

  // 4) 2017/06/24～25: 鳥海山 (参加者: KENKI編, KOHEI編, TATSUKI編, MINAMI編)
  {
    year: 2017,
    filename: "2017/2017.06.choukai.KENKI/2017.06.choukai.KENKI",
    place: "鳥海山",
    title: "KENKI編",
    date: "06/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.06.choukai.kohei/2017.06.chokai.kohei",
    place: "鳥海山",
    title: "KOHEI編",
    date: "06/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.06.tyoukai.tatuki/2017.06.tyokai.tatsuki",
    place: "鳥海山",
    title: "TATSUKI編",
    date: "06/24～25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.06.choukai.minami/2017.06.choukai.minami",
    place: "鳥海山",
    title: "MINAMI編",
    date: "06/24～25",
    activityType: "yama",
    details: null,
  },

  // 5) 2017/06/17～18: 岩手山 (参加者: KENKI編, TOMOMI編, MASANORI編)
  {
    year: 2017,
    filename: "2017/2017.06.iwate.kenki/2017.06.iwate.kenki",
    place: "岩手山",
    title: "KENKI編",
    date: "06/17～18",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.06.iwate.tomomi/2017.06.iwate.tomomi",
    place: "岩手山",
    title: "TOMOMI編",
    date: "06/17～18",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.06.iwate.masanori/2017.06.iwate.masanori",
    place: "岩手山",
    title: "MASANORI編",
    date: "06/17～18",
    activityType: "yama",
    details: null,
  },

  // 6) 2017/05/27～28: 磐梯山 (参加者: KENKI編, KOHEI編, MASANORI編)
  {
    year: 2017,
    filename: "2017/2017.05.bandai.kenki/2017.05.bandai.kenki",
    place: "磐梯山",
    title: "KENKI編",
    date: "05/27～28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.05.bandai.kohei/2017.05.bandai.kohei",
    place: "磐梯山",
    title: "KOHEI編",
    date: "05/27～28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.05.bandai.masanori/bandai_masanori",
    place: "磐梯山",
    title: "MASANORI編",
    date: "05/27～28",
    activityType: "yama",
    details: null,
  },

  // 7) 2017/05/20～21: 北面白山 (参加者: TOMOMI編, KENKI編, KOHEI編)
  {
    year: 2017,
    filename: "2017/2017.05.omoshiro.tomomi/2017.05.omoshiro.tomomi",
    place: "北面白山",
    title: "TOMOMI編",
    date: "05/20～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.05.omoshiro.kenki/2017.05.omoshiro.kenki",
    place: "北面白山",
    title: "KENKI編",
    date: "05/20～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.05.omochiro.kohei/2017.05.omoshiro.kohei",
    place: "北面白山",
    title: "KOHEI編",
    date: "05/20～21",
    activityType: "yama",
    details: null,
  },

  // 8) 2017/04/23: 新歓登山@青麻山 (参加者: KENKI編, KOHEI編, MASANORI編, MINAMI編)
  {
    year: 2017,
    filename: "2017/2017.04.aoso.kenki/2017.04.aoso.kenki",
    place: "新歓登山@青麻山",
    title: "KENKI編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.04.aoso.kohei/2017.04.aoso.kohei",
    place: "新歓登山@青麻山",
    title: "KOHEI編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.04.aoso.masanori/2017.04.aoso.masanori",
    place: "新歓登山@青麻山",
    title: "MASANORI編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2017,
    filename: "2017/2017.04.aoso.minami/2017.04.aoso.minami",
    place: "新歓登山@青麻山",
    title: "MINAMI編",
    date: "04/23",
    activityType: "yama",
    details: null,
  },
];

const data2018: Omit<MountainRecord, "id">[] = [
  // 1) 2018/10/13: 秋山in月山 ([KASUMI編])
  {
    year: 2018,
    filename: "2018/2018.10.gassan.kasumi/gassan.teamkasumi",
    place: "秋山in月山",
    title: "KASUMI編",
    date: "10/13",
    activityType: "yama",
    details: null,
  },

  // 2) 2018/8/17～20: 長期山行
  {
    year: 2018,
    filename: "2018/2018.tyoki.shizuka/mokuji",
    place: "長期山行",
    title: "SHIZUKA編",
    date: "8/17～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.tyoki.moeka/mokuji",
    place: "長期山行",
    title: "MOEKA編",
    date: "8/17～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.tyouki.yusuke/tyouki.yusuke.",
    place: "長期山行",
    title: "YUSUKE編",
    date: "8/17～20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.tyouki.yusuke/tyouki.yusuke.",
    place: "長期山行",
    title: "YUSUKE編",
    date: "8/17～20",
    activityType: "yama",
    details: null,
  },

  // 3) 2018/8/7～8: 大朝日岳
  {
    year: 2018,
    filename: "2018/2018.08.asahi.tatumi/2018.08.asahi.tatumi",
    place: "大朝日岳",
    title: "YUSUKE編",
    date: "8/7～8",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.08.asahi.kazuho/OASAHIDAKE-TEAMKAZUHO",
    place: "大朝日岳",
    title: "KAZUHO編",
    date: "8/7～8",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.08.asahi.tatsumi/asahi-tatsumi",
    place: "大朝日岳",
    title: "TATSUMI編",
    date: "8/7～8",
    activityType: "yama",
    details: null,
  },

  // 4) 2018/07/15~16: 飯豊連峰 (個人山行)
  {
    year: 2018,
    filename: null,
    place: "飯豊連峰(個人山行)",
    title: null,
    date: "7/15~16",
    activityType: "yama",
    details: null,
  },

  // 5) 2018/07/7～8: 訓練登山in北蔵王
  {
    year: 2018,
    filename: "2018/2018.07.kunren.shizuka/kunren.shizuka",
    place: "訓練登山in北蔵王",
    title: "SHIZUKA編",
    date: "7/7～8",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.07.kunren.yusuke/2018.kunren.yusuke",
    place: "訓練登山in北蔵王",
    title: "YUSUKE編",
    date: "7/7～8",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.07.kunren.moeka/2018.07.kunren.moeka",
    place: "訓練登山in北蔵王",
    title: "MOEKA編",
    date: "7/7～8",
    activityType: "yama",
    details: null,
  },

  // 6) 2018/06/23～24: 鳥海山
  {
    year: 2018,
    filename: "2018/2018.06.tyokai.shizuka/2018.06.tyokai.shizuka",
    place: "鳥海山",
    title: "SHIZUKA編",
    date: "6/23～24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.06.tyokai.moeka/tyokai-moeka",
    place: "鳥海山",
    title: "MOEKA編",
    date: "6/23～24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.06.tyokai.tatumi/tyokai.tatumi",
    place: "鳥海山",
    title: "TATSUMI編",
    date: "6/23～24",
    activityType: "yama",
    details: null,
  },

  // 7) 2018/06/9～10: 岩手山
  {
    year: 2018,
    filename: "2018/2018.06.iwate.kazuho/iwate-kazuho",
    place: "岩手山",
    title: "KAZUHO編",
    date: "6/9～10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.06.iwate.tatsumi/iwate-tatsumi",
    place: "岩手山",
    title: "TATSUMI編",
    date: "6/9～10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.06.iwate.shizuka/iwate-shizuka",
    place: "岩手山",
    title: "SHIZUKA編",
    date: "6/9～10",
    activityType: "yama",
    details: null,
  },

  // 8) 2018/05/26～27: 早池峰山
  {
    year: 2018,
    filename: "2018/2018.05.hayachine.arisa/2018.05.hayachine.arisa",
    place: "早池峰山",
    title: "ARISA編",
    date: "5/26～27",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.05.hayachine.shizuka/teamshizukahayachine",
    place: "早池峰山",
    title: "SHIZUKA編",
    date: "5/26～27",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.05.hayachine.yusuke/2018.hayachine.yusuke",
    place: "早池峰山",
    title: "YUSUKE編",
    date: "5/26～27",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.05.hayachine.moeka/2018.05.hayachine.moeka",
    place: "早池峰山",
    title: "MOEKA編",
    date: "5/26～27",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.05.hayachine.kazuho/2018.05.hayachine.kazuho",
    place: "早池峰山",
    title: "KAZUHO編",
    date: "5/26～27",
    activityType: "yama",
    details: null,
  },

  // 9) 2018/05/12～13: 安達太良山
  {
    year: 2018,
    filename: "2018/2018.05.adatara.shizuka/2018.05.adatara.shizuka",
    place: "安達太良山",
    title: "SHIZUKA編",
    date: "5/12～13",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.05.adatara.yusuke/2018.05.adatara.yusuke",
    place: "安達太良山",
    title: "YUSUKE編",
    date: "5/12～13",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.05.adatara.tatsumi/2018.05.adatara.tatsumi",
    place: "安達太良山",
    title: "TATSUMI編",
    date: "5/12～13",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.05.adatara.moeka/2018.05.adatara.moeka",
    place: "安達太良山",
    title: "MOEKA編",
    date: "5/12～13",
    activityType: "yama",
    details: null,
  },

  // 10) 2018/04/22: 新歓登山@泉ヶ岳
  {
    year: 2018,
    filename: "2018/2018.04.izumi.moeka/2018.04.izumi.moeka",
    place: "新歓登山@泉ヶ岳",
    title: "MOEKA編",
    date: "04/22",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.04.izumi.shizuka/2018.04.izumi.shizuka",
    place: "新歓登山@泉ヶ岳",
    title: "SHIZUKA編",
    date: "04/22",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.04.izumi.tatsumi/2018.04.izumi.tatsumi",
    place: "新歓登山@泉ヶ岳",
    title: "TATSUMI編",
    date: "04/22",
    activityType: "yama",
    details: null,
  },
  {
    year: 2018,
    filename: "2018/2018.04.izumi.yusuke/2018.04.izumi.yusuke",
    place: "新歓登山@泉ヶ岳",
    title: "YUSUKE編",
    date: "04/22",
    activityType: "yama",
    details: null,
  },
];

const data2019: Omit<MountainRecord, "id">[] = [
  // 1) 2019/08/17～21: 長期山行in立山
  {
    year: 2019,
    filename: "2019/2019.08.chouki.hideto/chouki.mokuji.hideto2",
    place: "長期山行in立山",
    title: "HIDETO編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.08.tyouki.maruko/tyouki.team.maruko.shikata",
    place: "長期山行in立山",
    title: "MARUKO編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.08.tyouki.inoba/tyouki.inoba.mokuji",
    place: "長期山行in立山",
    title: "RYOMA編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.08.tyouki.onogata/day12",
    place: "長期山行in立山",
    title: "ONOGATA編",
    date: "08/17～21",
    activityType: "yama",
    details: null,
  },

  // 2) 2019/08/03～04: 朝日連峰
  {
    year: 2019,
    filename: "2019/2019.08.asahi.maruko/2019.08.asahi.maruko",
    place: "朝日連峰",
    title: "MARUKO編",
    date: "08/03～04",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.08.asahi.ryoma/2019.08.asahi.ryoma",
    place: "朝日連峰",
    title: "RYOMA編",
    date: "08/03～04",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.08.asahi.onozato/asahi.2018.08.onozato",
    place: "朝日連峰",
    title: "ONOZATO編",
    date: "08/03～04",
    activityType: "yama",
    details: null,
  },

  // 3) 2019/07/13～14: 訓練登山in北蔵王
  {
    year: 2019,
    filename: "2019/2019.07.zao.hideto/hideto",
    place: "訓練登山in北蔵王",
    title: "HIDETO編",
    date: "07/13～14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.07.zao.maruko/2019zaomaruko",
    place: "訓練登山in北蔵王",
    title: "MARUKO編",
    date: "07/13～14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.07.zao.ryoma/ryoma",
    place: "訓練登山in北蔵王",
    title: "RYOMA編",
    date: "07/13～14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.07.zao.onogata/2019.zao.onogata",
    place: "訓練登山in北蔵王",
    title: "ONOGATA編",
    date: "07/13～14",
    activityType: "yama",
    details: null,
  },

  // 4) 2019/07/06～07: 鳥海山
  {
    year: 2019,
    filename: "2019/2019.07.chokai.yoshihumi/2019chokaiyoshihumi",
    place: "鳥海山",
    title: "MARUKO編",
    date: "07/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.07.chokai.ryoma/ryoma",
    place: "鳥海山",
    title: "RYOMA編",
    date: "07/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.07.chokai.hideto/hideto",
    place: "鳥海山",
    title: "HIDETO編",
    date: "07/06～07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.07.chokai.naoki/naoki",
    place: "鳥海山",
    title: "NAOKI編",
    date: "07/06～07",
    activityType: "yama",
    details: null,
  },

  // 5) 2019/06/22～23: 猫魔ヶ岳＆磐梯山
  {
    year: 2019,
    filename: "2019/2019.06.nekoban.ryota/ryota",
    place: "猫魔ヶ岳＆磐梯山",
    title: "ONOZAO編",
    date: "06/22～23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.nekoban.naoki/naoki",
    place: "猫魔ヶ岳＆磐梯山",
    title: "NAOKI編",
    date: "06/22～23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.nekoban.kasumi/kasumi",
    place: "猫魔ヶ岳＆磐梯山",
    title: "KASUMI編",
    date: "06/22～23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.nekomaban.ryoma/ryoma",
    place: "猫魔ヶ岳＆磐梯山",
    title: "RYOMA編",
    date: "06/22～23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.nekoban.hideto/2019.06.nekoban.hideto",
    place: "猫魔ヶ岳＆磐梯山",
    title: "HIDETO編",
    date: "06/22～23",
    activityType: "yama",
    details: null,
  },

  // 6) 2019/06/01～02: 安達太良山
  {
    year: 2019,
    filename: "2019/2019.06.adatara.ryoma/ryoma",
    place: "安達太良山",
    title: "RYOMA編",
    date: "06/01～02",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.adatara.ogata/ogata",
    place: "安達太良山",
    title: "NAOKI編",
    date: "06/01～02",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.adatara.onozato/onozato",
    place: "安達太良山",
    title: "RYOTA編",
    date: "06/01～02",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.adatara.kasumi/adatara.team.kasumi",
    place: "安達太良山",
    title: "KASUMI編",
    date: "06/01～02",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.06.adatara.maruko/adatara_maruko",
    place: "安達太良山",
    title: "MARUKO編",
    date: "06/01～02",
    activityType: "yama",
    details: null,
  },

  // 7) 2019/05/18～19: 北面白山
  {
    year: 2019,
    filename: "2019/2019.05.omoshiro.hayata/omoshiro",
    place: "北面白山",
    title: "HAYATA編",
    date: "05/18～19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.05.omoshiro.nashimoto/2019.omoshiro.HIDETO",
    place: "北面白山",
    title: "HIDETO編",
    date: "05/18～19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.05.omoshiro.ryoma/2019.05.omoshiro.ryoma",
    place: "北面白山",
    title: "RYOMA編",
    date: "05/18～19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.05.omoshiro.ryota/2019.05.omoshiro.ryota",
    place: "北面白山",
    title: "RYOTA編",
    date: "05/18～19",
    activityType: "yama",
    details: null,
  },

  // 8) 2019/04/21: 新歓登山＠泉ヶ岳
  {
    year: 2019,
    filename: "2019/2019.04.izumi.kasumi/shinkan",
    place: "新歓登山＠泉ヶ岳",
    title: "KASUMI編",
    date: "04/21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.04.izumi.naoki/naoki",
    place: "新歓登山＠泉ヶ岳",
    title: "NAOKI編",
    date: "04/21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.04.izumi.onozato/2019.04.izumi.onozato",
    place: "新歓登山＠泉ヶ岳",
    title: "RYOTA編",
    date: "04/21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.04.izumi.ryoma/2019.04.izumi.ryoma",
    place: "新歓登山＠泉ヶ岳",
    title: "RYOMA編",
    date: "04/21",
    activityType: "yama",
    details: null,
  },
  {
    year: 2019,
    filename: "2019/2019.04.izumi.hideto/2019_04_izumi_hideto",
    place: "新歓登山＠泉ヶ岳",
    title: "HIDETO編",
    date: "04/21",
    activityType: "yama",
    details: null,
  },
];

const data2020: Omit<MountainRecord, "id">[] = [
  // 1) 2020/11/07: 面白山
  {
    year: 2020,
    filename: "2020/2020.11.omosiroyama.viva/2020.11.omosiroyama.viva",
    place: "面白山",
    title: "VIVA編",
    date: "11/07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2020,
    filename: "2020/2020.11.omosiroyama.hiroto/2020.11.omosiroyama.hiroto",
    place: "面白山",
    title: "HIROTO編",
    date: "11/07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2020,
    filename: "2020/2020.11.omosiroyama.ryotaro/2020.11.7.omosiroyama.ryotaro",
    place: "面白山",
    title: "RYOTARO編",
    date: "11/07",
    activityType: "yama",
    details: null,
  },

  // 2) 2020/10/24: 泉ヶ岳
  {
    year: 2020,
    filename: "2020/2020.10.izumigatake.viva/2020.10.izumigatake.viva",
    place: "泉ヶ岳",
    title: "VIVA編",
    date: "10/24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2020,
    filename: "2020/2020.10.izumigatake.hiroto/2020.10.izumigatake.hiroto",
    place: "泉ヶ岳",
    title: "HIROTO編",
    date: "10/24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2020,
    filename: "2020/2020.10.izumigatake.hayata/2020.10.izumigatake.hayata",
    place: "泉ヶ岳",
    title: "HAYATA編",
    date: "10/24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2020,
    filename: "2020/2020.10.izumigatake/2020.10.izumigatake.tomoki",
    place: "泉ヶ岳",
    title: "TOMOKI編",
    date: "10/24",
    activityType: "yama",
    details: null,
  },

  // 3) 2020/10/17: 蔵王（登山は断念し、ドライブ）
  {
    year: 2020,
    filename: "2020/2020.10.zaodrive.viva/2020.10.zaodrive.viva",
    place: "蔵王",
    title: "VIVA編",
    date: "10/17",
    activityType: "yama",
    details: "登山は断念し、ドライブ",
  },
  {
    year: 2020,
    filename: "2020/2020.09.zaodrive.hiroto/2020.10.zaodrive.hiroto",
    place: "蔵王",
    title: "HIROTO編",
    date: "10/17",
    activityType: "yama",
    details: "登山は断念し、ドライブ",
  },
  {
    year: 2020,
    filename: "2020/2020.10.zaodrive.hayato/2020.10.zaodrive.hayato",
    place: "蔵王",
    title: "HAYATA編",
    date: "10/17",
    activityType: "yama",
    details: "登山は断念し、ドライブ",
  },
  {
    year: 2020,
    filename: "2020/2020.10.zaodrive.kazuki/2020.10.zaodrive.kazuki",
    place: "蔵王",
    title: "KAZUKI編",
    date: "10/17",
    activityType: "yama",
    details: "登山は断念し、ドライブ",
  },
  {
    year: 2020,
    filename: "2020/2020.10.zaodrive.tomoki/2020.10.zaodrive.tomoki",
    place: "蔵王",
    title: "TOMOKI編",
    date: "10/17",
    activityType: "yama",
    details: "登山は断念し、ドライブ",
  },

  // 4) 2020/10/03: 栗駒山
  {
    year: 2020,
    filename: "2020/2020.09.kurikoma.hiroto/2020.09.kurikoma.hiroto",
    place: "栗駒山",
    title: "HIROTO編",
    date: "10/03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2020,
    filename: "2020/2020.09.kurikoma.viva/2020.09.kurikoma.viva",
    place: "栗駒山",
    title: "VIVA編",
    date: "10/03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2020,
    filename: "2020/2020.09.kurikoma.tomoki/2020.09.kurikoma.tomoki",
    place: "栗駒山",
    title: "TOMOKI編",
    date: "10/03",
    activityType: "yama",
    details: null,
  },
];

const data2021: Omit<MountainRecord, "id">[] = [
  // 1) 2021/10/09: 栗駒山 ([GOUKI編], [YOTARO編], [SHOTA編], [AKARU編])
  {
    year: 2021,
    filename: "2021/2021.10.kurikomayama.gouki/2021.10.kurikomayama.gouki",
    place: "栗駒山",
    title: "GOUKI編",
    date: "10/09",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.10.kurikomayama.yotaro/2021.10.kurikoma.yotaro",
    place: "栗駒山",
    title: "YOTARO編",
    date: "10/09",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.10.kurikomayama.shota/2021.10.kurikomayama.shota",
    place: "栗駒山",
    title: "SHOTA編",
    date: "10/09",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.10.kurikomayama.akaru/2021.10.kurikomayama.akaru",
    place: "栗駒山",
    title: "AKARU編",
    date: "10/09",
    activityType: "yama",
    details: null,
  },

  // 2) 2021/08/16: [個人山行in鳥海山]
  {
    year: 2021,
    filename: "2021/2021.08.tyoukai/2021.08.tyoukai.c0",
    place: "個人山行in鳥海山",
    title: null,
    date: "08/16",
    activityType: "yama",
    details: null,
  },

  // 3) 2021/08/07: [訓練登山2in泉ヶ岳]
  {
    year: 2021,
    filename: "2021/2021.08.izumigatake.ayaka/2021.08.izumigatake.ayaka",
    place: "訓練登山2in泉ヶ岳",
    title: null,
    date: "08/07",
    activityType: "yama",
    details: null,
  },

  // 4) 2021/07/31: 訓練登山in泉ヶ岳（[AKITO編], [KAZUKI編], [KEISUKE編], [SHUNSUKE編]）
  {
    year: 2021,
    filename: "2021/2021.07.kunren.akito/2021.07.kunren.akito",
    place: "訓練登山in泉ヶ岳",
    title: "AKITO編",
    date: "07/31",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.07.kunren.asakura/2021.07.kunren.asakura",
    place: "訓練登山in泉ヶ岳",
    title: "KAZUKI編",
    date: "07/31",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.08.izumigatake.keisuke/2021.08.izumigatake.keisuke",
    place: "訓練登山in泉ヶ岳",
    title: "KEISUKE編",
    date: "07/31",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.08.izumigatake.shunsuke/2021.8.izumigatake.shunsuke",
    place: "訓練登山in泉ヶ岳",
    title: "SHUNSUKE編",
    date: "07/31",
    activityType: "yama",
    details: null,
  },

  // 5) 2021/07/17: 大東岳 ([AKITO編], [AYAKA編], [KEISUKE編])
  {
    year: 2021,
    filename: "2021/2021.07.daitoudake.akito/2021.07.daitoudake.akito",
    place: "大東岳",
    title: "AKITO編",
    date: "07/17",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.07.daitoudake.ayaka/2021.daitoudake.ayaka",
    place: "大東岳",
    title: "AYAKA編",
    date: "07/17",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.07.daitoudake.keisuke/2021.07.daitoudake.keisuke",
    place: "大東岳",
    title: "KEISUKE編",
    date: "07/17",
    activityType: "yama",
    details: null,
  },

  // 6) 2021/07/03: 屏風岳 ([AKI編], [AYAKA編], [KEISUKE編], [SHUNSUKE編], [MASAKI編])
  {
    year: 2021,
    filename: "2021/2021.07.byobudake.aki/2021.07.byobudake.aki",
    place: "屏風岳",
    title: "AKI編",
    date: "07/03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.07.byobudake.ayaka/2021.07.byobudake.ayaka",
    place: "屏風岳",
    title: "AYAKA編",
    date: "07/03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.07.byobudake.keisuke/2021.07.byobudake.keisuke",
    place: "屏風岳",
    title: "KEISUKE編",
    date: "07/03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.07.byobudake.shunsuke/2021.07.byobudake.shunsuke",
    place: "屏風岳",
    title: "SHUNSUKE編",
    date: "07/03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.07.byobudake.masaki/2021.07.byobudake.masaki",
    place: "屏風岳",
    title: "MASAKI編",
    date: "07/03",
    activityType: "yama",
    details: null,
  },

  // 7) 2021/06/19: 栗駒山 ([AKI編], [AKITO編], [AYAKA編], [KEISUKE編], [SHUNSUKE編])
  {
    year: 2021,
    filename: "2021/2021.06.kurikomayama.aki/2021.06.kurikomayama.aki",
    place: "栗駒山",
    title: "AKI編",
    date: "06/19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.kurikomayama.akito/2021.06.kurikoma.akito",
    place: "栗駒山",
    title: "AKITO編",
    date: "06/19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.kurikomayama.ayaka/2021.06.ayaka",
    place: "栗駒山",
    title: "AYAKA編",
    date: "06/19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "20210619.kurikomayama.keisuke",
    place: "栗駒山",
    title: "KEISUKE編",
    date: "06/19",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.kurikomayama.shunsuke/2021.06.kurikomayama.shunsuke",
    place: "栗駒山",
    title: "SHUNSUKE編",
    date: "06/19",
    activityType: "yama",
    details: null,
  },

  // 8) 2021/06/05: 面白山 ([AKI編], [AKITO編], [AYAKA編], [KAZUKI編], [KEISUKE編], [MASAKI編], [SHUNSUKE編])
  {
    year: 2021,
    filename: "2021/2021.06.omoshiroyama.aki/2021.06.omoshiroyama.aki",
    place: "面白山",
    title: "AKI編",
    date: "06/05",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.omoshiroyama.akito/2021.06.omoshiroyama.akito",
    place: "面白山",
    title: "AKITO編",
    date: "06/05",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.omoshiroyama.ayaka/2021.06.omoshiroyama.ayaka",
    place: "面白山",
    title: "AYAKA編",
    date: "06/05",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.omoshiroyama.kazuki/2021.06.omoshiroyama.kazuki",
    place: "面白山",
    title: "KAZUKI編",
    date: "06/05",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.omoshiro.keisuke/2021.0605.omoshiro.keisuke",
    place: "面白山",
    title: "KEISUKE編",
    date: "06/05",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.omoshiro.masaki/2021.06.omoshiro.masaki",
    place: "面白山",
    title: "MASAKI編",
    date: "06/05",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.06.omoshiroyama.shunsuke/2021.06.omoshiroyama.shunsuke",
    place: "面白山",
    title: "SHUNSUKE編",
    date: "06/05",
    activityType: "yama",
    details: null,
  },

  // 9) 2021/05/23: 泉ヶ岳 ([AKITO編], [AYAKA編], [KEISUKE編], [MASAKI編], [SHUNSUKE編])
  {
    year: 2021,
    filename: "2021/2021.05.izumigatake.akito/2021.05.izumigatake.akito",
    place: "泉ヶ岳",
    title: "AKITO編",
    date: "05/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.05.izumigatake.ayaka/2021.05.izumigatake.ayaka",
    place: "泉ヶ岳",
    title: "AYAKA編",
    date: "05/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.05.Izumigatake.Keisuke/2021.05.Izumigatake.keisuke",
    place: "泉ヶ岳",
    title: "KEISUKE編",
    date: "05/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "202105.izumigatake.masaki",
    place: "泉ヶ岳",
    title: "MASAKI編",
    date: "05/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2021,
    filename: "2021/2021.05.izumigatake.syunsuke/2021.05.izumigatake.syunsuke",
    place: "泉ヶ岳",
    title: "SHUNSUKE編",
    date: "05/23",
    activityType: "yama",
    details: null,
  },
];

const data2022: Omit<MountainRecord, "id">[] = [
  // 1) 2022/10/8: 安達太良山
  {
    year: 2022,
    filename: "2022/2022.10.adatarayama.Tamaki/2022.10.adatarayama.Tamaki",
    place: "安達太良山",
    title: "TAMAKI編",
    date: "10/8",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.10.adatarayama.Yusuke/2022.10.adatarayama.Yusuke",
    place: "安達太良山",
    title: "YUSUKE編",
    date: "10/8",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.10.adatarayama.Kousei/2022.10.adatarayama.Kousei",
    place: "安達太良山",
    title: "KOUSEI編",
    date: "10/8",
    activityType: "yama",
    details: null,
  },

  // 2) 2022/09/25: 個人山行in秋田駒ヶ岳
  {
    year: 2022,
    filename: "2022/2022.09.akitakomagatake/2022.09.25.akitakomagatake",
    place: "個人山行in秋田駒ヶ岳",
    title: null,
    date: "09/25",
    activityType: "yama",
    details: null,
  },

  // 3) 2022/08/19-20: 長期山行＠北岳
  {
    year: 2022,
    filename: "2022/2022.08.kitadake.Yotaro/2022.08.kitadake.Yotaro",
    place: "長期山行＠北岳",
    title: "YOTARO編",
    date: "08/19-20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.08.kitadake.yuya/2022.08.kitadake.yuya",
    place: "長期山行＠北岳",
    title: "YUYA編",
    date: "08/19-20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.08.kitadake.Gouki/2022.08.Gouki",
    place: "長期山行＠北岳",
    title: "GOUKI編",
    date: "08/19-20",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.08.kitadake.Shota/2022.08.kitadake.Shota",
    place: "長期山行＠北岳",
    title: "SHOTA編",
    date: "08/19-20",
    activityType: "yama",
    details: null,
  },

  // 4) 2022/08/06-07: 朝日連峰
  {
    year: 2022,
    filename: "2022/2022.08.asahidake.Shintaro/2022.08.asahidake.Shintaro",
    place: "朝日連峰",
    title: "SHINTARO編",
    date: "08/06-07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.08.asahidake.Teiho/2022.08.asahidake.Teiho",
    place: "朝日連峰",
    title: "TEIHO編",
    date: "08/06-07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.08.asahidake.Yotaro/2022.08.06.asahidake.YOTARO",
    place: "朝日連峰",
    title: "YOTARO編",
    date: "08/06-07",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.08.asahidake.Yuya/2022.08.asahidake.Yuya",
    place: "朝日連峰",
    title: "YUYA編",
    date: "08/06-07",
    activityType: "yama",
    details: null,
  },

  // 5) 2022/07/24: 訓練登山＠泉・北泉ヶ岳
  {
    year: 2022,
    filename: "2022/2022.07.izumigatake.teamgouki/2022.07.izumigatake.teamgouki",
    place: "訓練登山＠泉・北泉ヶ岳",
    title: "GOUKI編",
    date: "07/24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.07.izumigatake.yuya/2022.07.izumigatake.yuya",
    place: "訓練登山＠泉・北泉ヶ岳",
    title: "YUYA編",
    date: "07/24",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.07.izumigatake.Shota/2022.07.izumigatake.Shota",
    place: "訓練登山＠泉・北泉ヶ岳",
    title: "SHOTA編",
    date: "07/24",
    activityType: "yama",
    details: null,
  },

  // 6) 2022/07/16: 補講@磐梯山
  {
    year: 2022,
    filename: "2022/2022.07.bandaisan/2022.07.bandaisan.teamshintaro",
    place: "補講@磐梯山",
    title: null,
    date: "07/16",
    activityType: "yama",
    details: null,
  },

  // 7) 2022/07/09-10: 鳥海山
  {
    year: 2022,
    filename: "2022/2022.07.tyoukaisan.Ayaka/2022.07.tyoukaisan.Ayaka",
    place: "鳥海山",
    title: "AYAKA編",
    date: "07/09-10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.07.tyoukaisan.Gouki/2022.7.10.tyoukaisan.GOUKI",
    place: "鳥海山",
    title: "GOUKI編",
    date: "07/09-10",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.07.tyoukaisan.Shota/2022.07.tyoukaisan.shota",
    place: "鳥海山",
    title: "SHOTA編",
    date: "07/09-10",
    activityType: "yama",
    details: null,
  },

  // 8) 2022/07/02-03: 岩手山
  {
    year: 2022,
    filename: "2022/2022.07.iwatesan.teamshota/2022.07.iwatesan.teamshota",
    place: "岩手山",
    title: "SHOTA編",
    date: "07/02-03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.07.iwatesan.yotaro/2022.07.iwatesan.teamyotaro",
    place: "岩手山",
    title: "YOTARO編",
    date: "07/02-03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.07.iwatesan.teamyuya/2022.07.iwatesan.teamyuya",
    place: "岩手山",
    title: "YUYA編",
    date: "07/02-03",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.07.iwatesan.teamgouki/2022.07.iwatesan.teamgouki",
    place: "岩手山",
    title: "GOUKI編",
    date: "07/02-03",
    activityType: "yama",
    details: null,
  },

  // 9) 2022/06/11-12: 早池峰山
  {
    year: 2022,
    filename: "2022/2022.06.hayachinesann.teamyotaro/2022.hayachinesann.teamyotaro",
    place: "早池峰山",
    title: "YOTARO編",
    date: "06/11-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.06.hayachinesan.shintaro/2022.06.hayachinesan.shintaro",
    place: "早池峰山",
    title: "SHINTARO編",
    date: "06/11-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.06.hayachinesan.teamshota/2022.06.hayachinesan.teamshota",
    place: "早池峰山",
    title: "SHOTA編",
    date: "06/11-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.06.hayachinesann.teamyuya/2022.06.hayachinesann.teamyuya",
    place: "早池峰山",
    title: "YUYA編",
    date: "06/11-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.06.hayachinesann.teamgouki./2022.06.hayachinesann.teamgouki",
    place: "早池峰山",
    title: "GOUKI編",
    date: "06/11-12",
    activityType: "yama",
    details: null,
  },

  // 10) 2022/05/28: 安達太良山
  {
    year: 2022,
    filename: "2022/2022.05.adatarayama.Akaru/2022.05.adatarayama.Akaru",
    place: "安達太良山",
    title: "AKARU編",
    date: "05/28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.adatarayama.teamYOTARO/2022.05.adatarayama.teamYOTARO",
    place: "安達太良山",
    title: "YOTARO編",
    date: "05/28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.adatarayama.teiho/2022.05.adatarayama.teiho",
    place: "安達太良山",
    title: "TEIHO編",
    date: "05/28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.adatarayama.shintaro/2022.05.adatarayama.Shintaro",
    place: "安達太良山",
    title: "SHINTARO編",
    date: "05/28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.adatarayama.teamshota/2022.05.adatarayama.teamshota",
    place: "安達太良山",
    title: "SHOTA編",
    date: "05/28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.adatarayama.Gouki/2022.05.adatarayama.Gouki",
    place: "安達太良山",
    title: "GOUKI編",
    date: "05/28",
    activityType: "yama",
    details: null,
  },

  // 11) 2022/05/15: 新歓登山@泉ヶ岳
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.akaru/2022.05.izumigatake.akaru",
    place: "新歓登山@泉ヶ岳",
    title: "AKARU編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.teiho/2022.05.izumigatake.teiho",
    place: "新歓登山@泉ヶ岳",
    title: "TEIHO編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.shunsuke/2022.05.izumigatake.shunsuke",
    place: "新歓登山@泉ヶ岳",
    title: "SHUSUKE編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.team.gouki/2022.05.izumigatake.gouki",
    place: "新歓登山@泉ヶ岳",
    title: "GOUKI編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.takahide/2022.05.izumigatake.takahide",
    place: "新歓登山@泉ヶ岳",
    title: "TAKAHIDE編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.Shota/2022.05.izumigatake.Shota",
    place: "新歓登山@泉ヶ岳",
    title: "SHOTA編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.Shintaro/2022.05.Izumigatake.Shintaro",
    place: "新歓登山@泉ヶ岳",
    title: "SHINTARO編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
  {
    year: 2022,
    filename: "2022/2022.05.izumigatake.teamYUYA/2022.05.izumigatake.teamYUYA",
    place: "新歓登山@泉ヶ岳",
    title: "YUYA編",
    date: "05/15",
    activityType: "yama",
    details: null,
  },
];

const data2023: Omit<MountainRecord, "id">[] = [
  // 1) 2023/10/14: 秋山山行@月山 (5件)
  {
    year: 2023,
    filename: "2023/2023.10.gassan/2023_gassan_SHOTA",
    place: "秋山山行@月山",
    title: "SHOTA編",
    date: "10/14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.10.gassan/2023_gassan_WATARU",
    place: "秋山山行@月山",
    title: "WATARU編",
    date: "10/14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.10.gassan/2023_gassan_SHUSUKE",
    place: "秋山山行@月山",
    title: "SHUSUKE編",
    date: "10/14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.10.gassan/2023_gassan_HONOKA",
    place: "秋山山行@月山",
    title: "HONOKA編",
    date: "10/14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.10.gassan/2023_gassan_IROHA",
    place: "秋山山行@月山",
    title: "IROHA編",
    date: "10/14",
    activityType: "yama",
    details: null,
  },

  // 2) 2023/8/10-12: 長期山行＠槍ヶ岳 (5件)
  {
    year: 2023,
    filename: "2023/2023.08.yarigatake.Yusuke/2023.08.yarigatake.Yusuke",
    place: "長期山行＠槍ヶ岳",
    title: "YUSUKE編",
    date: "8/10-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.08.yarigatake.KOSEI/2023.08.yarigatake.KOSEI",
    place: "長期山行＠槍ヶ岳",
    title: "KOSEI編",
    date: "8/10-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.08.yarigatake.Haruki",
    place: "長期山行＠槍ヶ岳",
    title: "HARUKI編",
    date: "8/10-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.08.yarigatake.Sousuke/2023.08.yarigatake.Sousuke",
    place: "長期山行＠槍ヶ岳",
    title: "SOUSKE編",
    date: "8/10-12",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.08.yarigatake.Tatuya/2023.08.yarigatake.TAYSUYA",
    place: "長期山行＠槍ヶ岳",
    title: "TATSUYA編",
    date: "8/10-12",
    activityType: "yama",
    details: null,
  },

  // 3) 2023/7/22-23: 朝日連峰 (4件)
  {
    year: 2023,
    filename: "2023/2023.07.asahidake.YUSUKE/2023.07.asahidake.YUSUKE",
    place: "朝日連峰",
    title: "YUSUKE編",
    date: "7/22-23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.07.asahidake.KOSEI/2023.asahidake.KOSEI",
    place: "朝日連峰",
    title: "KOSEI編",
    date: "7/22-23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.07.asahidake.Tatsuya/2023.07.asahidake.Tatsuya",
    place: "朝日連峰",
    title: "TATSUYA編",
    date: "7/22-23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.07.asahidake.HARUKI/2023.07.asahidake.HARUKI",
    place: "朝日連峰",
    title: "HARUKI編",
    date: "7/22-23",
    activityType: "yama",
    details: null,
  },

  // 4) 2023/7/16: 訓練登山＠蔵王 (5件)
  {
    year: 2023,
    filename: "2023/2023.07.kunrentozan.KOSEI/2023.07.kunrentozan.KOSEI",
    place: "訓練登山＠蔵王",
    title: "KOSEI編",
    date: "7/16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.07.kunrentozan.SOSUKE/2023.07.kunrentozan.SOSUKE",
    place: "訓練登山＠蔵王",
    title: "SOSUKE編",
    date: "7/16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.07.kunrentozan.Haruki/2023.07.Haruki",
    place: "訓練登山＠蔵王",
    title: "HARUKI編",
    date: "7/16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.07.kunrentozan.Tatsuya/2023.07.kunrentozan.Tatsuya",
    place: "訓練登山＠蔵王",
    title: "TATSUYA編",
    date: "7/16",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.07.kunrentozan.yusuke/2023.07.kunrentozan.yusuke",
    place: "訓練登山＠蔵王",
    title: "YUSUKE編",
    date: "7/16",
    activityType: "yama",
    details: null,
  },

  // 5) 2023/6/24-25: 鳥海山 (6件)
  {
    year: 2023,
    filename: "2023/2023.06.chokaisan.HARUKI/2023.06.chokaisan.HARUKI",
    place: "鳥海山",
    title: "HARUKI編",
    date: "6/24-25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.chokaisan.SOSUKE/2023.06.chokaisan.SOSUKE",
    place: "鳥海山",
    title: "SOSUKE編",
    date: "6/24-25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.chokaisan.Yusuke/06.chokaisan.Yusuke",
    place: "鳥海山",
    title: "YUSUKE編",
    date: "6/24-25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.chokaisan.Kosei/2023.06.chokaisan.Kosei",
    place: "鳥海山",
    title: "KOSEI編",
    date: "6/24-25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.chokaisan.Tatsuya/06.chokaisan.Tatsuya",
    place: "鳥海山",
    title: "TATSUYA編",
    date: "6/24-25",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.chokaisan.Tamaki/06.chokaisan.Tamaki",
    place: "鳥海山",
    title: "TAMAKI編",
    date: "6/24-25",
    activityType: "yama",
    details: null,
  },

  // 6) 2023/6/10-11: 岩手山 (5件)
  {
    year: 2023,
    filename: "2023/2023.06.iwatesan.KOSEI/2023.06.KOSEI",
    place: "岩手山",
    title: "KOSEI編",
    date: "6/10-11",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.iwatesan.TAMAKI/2023.06.iwatesan.Tamaki",
    place: "岩手山",
    title: "TAMAKI編",
    date: "6/10-11",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.iwatesan.HARUKI/2023.06.iwatesan.HARUKI",
    place: "岩手山",
    title: "HARUKI編",
    date: "6/10-11",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.iwatesan.MIYAKO/2023.06.iwatesan.MIYAKO",
    place: "岩手山",
    title: "MIYAKO編",
    date: "6/10-11",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.06.iwatesan.TEAMRINKA/2023.06.iwatesan.TEAMRINKA",
    place: "岩手山",
    title: "RINKA編",
    date: "6/10-11",
    activityType: "yama",
    details: null,
  },

  // 7) 2023/5/27-28: 那須岳 (4件)
  {
    year: 2023,
    filename: "2023/2023.05.nasudake.KOSEI/2023.05.nasudake.KOSEI",
    place: "那須岳",
    title: "KOSEI編",
    date: "5/27-28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.nasudake.YUSUKE/2023.05.nasudake.YUSUKE",
    place: "那須岳",
    title: "YUSUKE編",
    date: "5/27-28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.nasudake.TATSUYA/2023.05.nasudake.TATSUYA",
    place: "那須岳",
    title: "TATSUYA編",
    date: "5/27-28",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.nasudake.Sosuke/2023.05.Sosuke",
    place: "那須岳",
    title: "SOSUKE編",
    date: "5/27-28",
    activityType: "yama",
    details: null,
  },

  // 8) 2023/5/13-14: 摩耶山 (6件)
  {
    year: 2023,
    filename: "2023/2023.05.mayasan.Yusuke/2023.05.mayasan.Yusuke",
    place: "摩耶山",
    title: "YUSUKE編",
    date: "5/13-14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.mayasan.TATSUYA/2023.05.mayasan.TATSUYA",
    place: "摩耶山",
    title: "TATSUYA編",
    date: "5/13-14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.mayasan.KOSEI/2023.05.mayasan.KOSEI",
    place: "摩耶山",
    title: "KOSEI編",
    date: "5/13-14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.mayasan.Haruki/2023.05.mayasan.Haruki",
    place: "摩耶山",
    title: "HARUKI編",
    date: "5/13-14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.mayasan.MIYAKO/2023.05.mayasan.MIYAKO2",
    place: "摩耶山",
    title: "MIYAKO編",
    date: "5/13-14",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.05.mayasan.Sosuke/2023.05.mayasan.Sosuke1",
    place: "摩耶山",
    title: "SOSUKE編",
    date: "5/13-14",
    activityType: "yama",
    details: null,
  },

  // 9) 2023/4/23: 新歓登山＠泉ヶ岳 (8件)
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.Tamaki/2023.04.izumigatake.Tamaki",
    place: "新歓登山＠泉ヶ岳",
    title: "TAMAKI編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.sousuke/2023.04.izumigatake.sousuke",
    place: "新歓登山＠泉ヶ岳",
    title: "SOSUKE編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.KEISUKE/2023.04.izumigatake.keisuke",
    place: "新歓登山＠泉ヶ岳",
    title: "KEISUKE編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.Yusuke/2023.04.izumigatake.Yusuke",
    place: "新歓登山＠泉ヶ岳",
    title: "YUSUKE編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.RINKA/2023.04.izumigatake.RINKA",
    place: "新歓登山＠泉ヶ岳",
    title: "RINKA編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.KOUSEI/2023.04.izumigatake.Kousei",
    place: "新歓登山＠泉ヶ岳",
    title: "KOSEI編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.Haruki/2023.04.izumigatake.Haruki",
    place: "新歓登山＠泉ヶ岳",
    title: "HARUKI編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
  {
    year: 2023,
    filename: "2023/2023.04.izumigatake.Tatsuya/2023.04.izumigatake.Tatsuya",
    place: "新歓登山＠泉ヶ岳",
    title: "TATSUYA編",
    date: "4/23",
    activityType: "yama",
    details: null,
  },
];

// 他の年度も同様に data20xx を定義してください。
// 例：const data2024: Omit<MountainRecord, "id">[] = [ ... ];

//
// すべての年度のデータを結合
//


//
// すべての年度のデータを結合
//
const allData: Omit<MountainRecord, "id">[] = [
  ...data2007,
  ...data2008,
  ...data2009,
  ...data2010,
  ...data2011,
  ...data2012,
  ...data2013,
  ...data2014,
  ...data2015,
  ...data2016,
  ...data2017,
  ...data2018,
  ...data2019,
  ...data2020,
  ...data2021,
  ...data2022,
  ...data2023,
];

// =====================================
// place が null の場合は title を代わりに使用
// =====================================
function getGroupKey(record: Omit<MountainRecord, "id">): string {
  return record.place ? record.place : (record.title || "");
}

// =====================================
// 画像ファイルを Supabase にアップロードしてパブリック URL を取得する
// =====================================
async function uploadImageToSupabase(localFilePath: string, year: number, folderName: string) {
  const fileName = path.basename(localFilePath);
  const storagePath = `images/${year}/${folderName}/${fileName}`;

  // ファイル読み込み
  const fileBuffer = fs.readFileSync(localFilePath);

  // アップロード
  const { data, error } = await supabase.storage
    .from("images")
    .upload(storagePath, fileBuffer, {
      contentType: "image/jpeg", // 必要に応じて拡張子で切り替え
      upsert: true,
    });
  if (error) {
    console.error(`❌ 画像アップロード失敗: ${localFilePath}`, error);
    return null;
  }

  // パブリック URL を返す
  return `${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
}

// =====================================
// ローカル Markdown / MDX ファイルを読み込み、
// - frontmatter 削除
// - import 行を解析し、画像をアップロード
// - <Image src={変数} /> をパブリック URL に置換
// - "import { Image } from 'astro:assets'" も削除
// - 最終的な content と images 配列を返す
// =====================================
async function loadLocalContent(baseFilename: string, activityType: string) {
  const BASE_DIR = path.join(process.cwd(), "src", "content", activityType);

  // 例: "2022/2022.10.adatarayama.Gouki/2022.10.adatarayama.Gouki"
  const parts = baseFilename.split("/");
  const lastPart = parts[parts.length - 1];
  const folderPath = path.join(BASE_DIR, ...parts.slice(0, parts.length - 1));

  // .md or .mdx を探す
  const mdFile = path.join(folderPath, `${lastPart}.md`);
  const mdxFile = path.join(folderPath, `${lastPart}.mdx`);

  let targetFile = "";
  if (fs.existsSync(mdFile)) {
    targetFile = mdFile;
  } else if (fs.existsSync(mdxFile)) {
    targetFile = mdxFile;
  } else {
    console.warn(`⚠️ ファイルが見つかりません: ${mdFile} / ${mdxFile}`);
    return { content: "", images: [] };
  }

  let raw = fs.readFileSync(targetFile, "utf-8");

  // frontmatter を削除
  raw = raw.replace(/^---[\s\S]*?---\s*/, "");

  // ================================
  // import 行を解析して、変数名 -> ローカル画像ファイルパス のマップを作る
  // ================================
  // 例: import IMGP1150 from './clip_image021.jpg'
  const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  const varToLocalPath: Record<string, string> = {};

  while ((match = importRegex.exec(raw)) !== null) {
    const varName = match[1];         // 例: IMGP1150
    const relativeImgPath = match[2]; // 例: './clip_image021.jpg'

    // ローカル画像ファイルの絶対パスを組み立て
    const localImgPath = path.join(folderPath, relativeImgPath.replace(/^\.\//, ""));
    varToLocalPath[varName] = localImgPath;
  }

  // 行ごとにフィルタリングして、`import ...` や `import { Image } from 'astro:assets'` を削除
  const lines = raw.split("\n").filter(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith("import ")) {
      return false; // すべての import 行を削除
    }
    // あるいは、特定の行だけ削除したい場合は、
    // if (trimmed.includes("import { Image } from 'astro:assets'")) return false;
    return true;
  });
  raw = lines.join("\n").trim();

  // ================================
  // Supabase に画像をアップロードして、変数名 -> パブリックURL に変換
  // ================================
  const varToPublicUrl: Record<string, string> = {};
  for (const [varName, localImgPath] of Object.entries(varToLocalPath)) {
    if (!fs.existsSync(localImgPath)) {
      console.warn(`⚠️ 画像ファイルが見つかりません: ${localImgPath}`);
      continue;
    }
    // フォルダ名には最後のディレクトリを使うなど、適宜
    const folderName = path.basename(path.dirname(localImgPath));
    const year = parseInt(parts[0], 10) || 2000; // parts[0] は "2022" のような年度

    const publicUrl = await uploadImageToSupabase(localImgPath, year, folderName);
    if (publicUrl) {
      varToPublicUrl[varName] = publicUrl;
    }
  }

  // ================================
  // <Image src={変数} alt="" /> を探し、パブリック URL に置換
  // ================================
  // 例: <Image src={IMGP1150} alt="" />
  const imageTagRegex = /<Image\s+([^>]*?)src=\{(\w+)\}([^>]*)>/g;
  const replacedContent = raw.replace(imageTagRegex, (full, before, varName, after) => {
    const url = varToPublicUrl[varName] || "";
    return `<Image ${before}src="${url}"${after}>`;
  });

  // ================================
  // 画像一覧を images[] に入れる (パブリック URL のみ)
  // ================================
  const images = Object.values(varToPublicUrl);

  return { content: replacedContent, images };
}

// =====================================
// メイン処理
// =====================================
async function main() {
  console.log("🚀 明示的データ + Astro 画像置換のインポート開始");

  // (year, activityType, place/title) ごとにグループ化
  const groups = new Map<string, Omit<MountainRecord, "id">[]>();
  for (const record of allData) {
    const key = `${record.year}-${record.activityType}-${getGroupKey(record)}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(record);
  }

  let createdRecords = 0;
  let createdContents = 0;
  let totalContentItems = 0;
  const totalGroups = groups.size;

  for (const [, records] of groups.entries()) {
    const base = records[0];
    const groupPlace = getGroupKey(base);

    // Record 重複チェック
    const existingRecord = await prisma.record.findFirst({
      where: {
        year: base.year,
        activityType: base.activityType,
        place: groupPlace,
      },
    });

    let recordId: number;
    if (existingRecord) {
      recordId = existingRecord.id;
    } else {
      const newRecord = await prisma.record.create({
        data: {
          year: base.year,
          date: base.date,
          place: groupPlace,
          activityType: base.activityType,
          details: base.details,
        },
      });
      recordId = newRecord.id;
      createdRecords++;
    }

    // filename があるものを Content に登録
    for (const item of records) {
      if (!item.filename) continue;
      totalContentItems++;

      // Content 重複チェック
      const existingContent = await prisma.content.findFirst({
        where: {
          recordId,
          filename: item.filename,
        },
      });
      if (existingContent) {
        console.log(`🔎 重複コンテンツをスキップ: ${item.filename}`);
        continue;
      }

      // ファイル読み込み + 画像アップロード + Astro置換
      const { content, images } = await loadLocalContent(item.filename, base.activityType);

      await prisma.content.create({
        data: {
          recordId,
          title: item.title,
          filename: item.filename,
          content,
          images,
        },
      });
      createdContents++;
      console.log(`✅ Content 登録: ${item.filename}`);
    }
  }

  console.log("===========================================");
  console.log(`✅ 総グループ数（Record）: ${totalGroups} 件`);
  console.log(`✅ 新規作成された Record: ${createdRecords} 件`);
  console.log(`✅ 総 Content 件数: ${totalContentItems} 件`);
  console.log(`✅ 新規作成された Content: ${createdContents} 件`);
  console.log("🚀 インポート処理が完了しました！");

  await prisma.$disconnect();
}

main().catch(console.error);