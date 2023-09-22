//会员权益枚举
export enum BenefitTypeEnum {
  UPGRADE_GIFT = "UPGRADE_GIFT", //(0, "升级礼包"),
  EXCLUSIVE_SERVICE = "EXCLUSIVE_SERVICE", //(1, "专属客服"),
  NEW_PRODUCT_TASTE = "NEW_PRODUCT_TASTE", //(2, "新品尝鲜"),
  ANY_TIME_STOP = "ANY_TIME_STOP", //(3, "随享停"),
  BIRTHDAY_GIFT = "BIRTHDAY_GIFT", //(4, "生日礼赠")
}
export enum BenefitTextEnum {
  UPGRADE_GIFT = "升级礼包", //(0, "升级礼包"),
  EXCLUSIVE_SERVICE = "专属客服", //(1, "专属客服"),
  NEW_PRODUCT_TASTE = "新品尝鲜", //(2, "新品尝鲜"),
  ANY_TIME_STOP = "随享停", //(3, "随享停"),
  BIRTHDAY_GIFT = "生日礼赠", //(4, "生日礼赠")
}

// 会员配置
export const memberCof = [
  {
    level: 1,
    name: "优享会员",
    swBg: "linear-gradient(180deg, #d2e3f7 0%, #5c87ad 100%)", //轮播背景色
    mainBg: " linear-gradient(180deg, #abc5df 0%, #81a4c4 100%)",
    barColor: "linear-gradient(90deg, #ABC5DF 0%, #81A4C4 100%)", //进度条颜色
    topColor: "#6A97C7", //顶部字体色
    lvPNG: "member/v1.svg", //等级图标
    namePNG: "member/lv1.svg", //等级名称图标
    cssName: "member_lv1",
    // 内圆形
    circleImg: "member/bg_v1.png",
    description: "初级会员",
    growthValue: 0,
    levelName: "爱鲜活V1",
    sort: 1,
    // 利益
    interest: [
      {
        label: "升级礼包",
        value: BenefitTypeEnum.UPGRADE_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv1.1.png",
        //是否有锁
        isOn: false,
        lock: "member/lock1.png",
      },
      {
        label: "专属客服",
        value: BenefitTypeEnum.EXCLUSIVE_SERVICE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv1.2.png",
        //是否有锁
        isOn: true,
        lock: "member/lock1.png",
      },
      {
        label: "生日礼赠",
        value: BenefitTypeEnum.BIRTHDAY_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv1.3.png",
        //是否有锁
        isOn: true,
        lock: "member/lock1.png",
      },
      {
        label: "新品尝鲜",
        value: BenefitTypeEnum.NEW_PRODUCT_TASTE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv1.4.png",
        //是否有锁
        isOn: true,
        lock: "member/lock1.png",
      },
      {
        label: "随享停",
        value: BenefitTypeEnum.ANY_TIME_STOP,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv1.5.png",
        //是否有锁
        isOn: true,
        lock: "member/lock1.png",
      },
    ],
  },
  {
    level: 2,
    name: "白银会员",
    swBg: "linear-gradient(180deg, #E9E1F1 0%, #6370AC 100%)",
    mainBg: "linear-gradient(180deg, #BCBBDA 0%, #8D93C2 100%)",
    barColor: "linear-gradient(90deg, #BCBBDA 0%, #8D93C2 100%)",
    topColor: "#8288C9",
    lvPNG: "member/v2.svg", //
    namePNG: "member/lv2.svg", //
    cssName: "member_lv2",
    circleImg: "member/bg_v2.png",
    description: "二级会员",
    growthValue: 4,
    levelName: "爱鲜活V2",
    sort: 2,
    // 利益
    interest: [
      {
        label: "升级礼包",
        value: BenefitTypeEnum.UPGRADE_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv2.1.png",
        //是否有锁
        isOn: false,
        lock: "member/lock2.png",
      },
      {
        label: "专属客服",
        value: BenefitTypeEnum.EXCLUSIVE_SERVICE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv2.2.png",
        //是否有锁
        isOn: true,
        lock: "member/lock2.png",
      },
      {
        label: "生日礼赠",
        value: BenefitTypeEnum.BIRTHDAY_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv2.3.png",
        //是否有锁
        isOn: true,
        lock: "member/lock2.png",
      },
      {
        label: "新品尝鲜",
        value: BenefitTypeEnum.NEW_PRODUCT_TASTE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv2.4.png",
        //是否有锁
        isOn: true,
        lock: "member/lock2.png",
      },
      {
        label: "随享停",
        value: BenefitTypeEnum.ANY_TIME_STOP,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv2.5.png",
        //是否有锁
        isOn: true,
        lock: "member/lock2.png",
      },
    ],
  },
  {
    level: 3,
    name: "黄金会员",
    swBg: "linear-gradient(180deg, #F9E3BF 0%, #CB9C43 100%)",
    mainBg: " linear-gradient(180deg, #EACB95 0%, #DAB26A 100%)",
    barColor: "linear-gradient(90deg, #EACB95 0%, #DAB26A 100%)",
    topColor: "#D49933",
    lvPNG: "member/v3.svg", //
    namePNG: "member/lv3.svg", //
    cssName: "member_lv3",
    circleImg: "member/bg_v3.png",
    description: "三级会员",
    growthValue: 10,
    levelName: "爱鲜活V3",
    sort: 3,
    // 利益
    interest: [
      {
        label: "升级礼包",
        value: BenefitTypeEnum.UPGRADE_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv3.1.png",
        //是否有锁
        isOn: false,
        lock: "member/lock3.png",
      },
      {
        label: "专属客服",
        value: BenefitTypeEnum.EXCLUSIVE_SERVICE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv3.2.png",
        //是否有锁
        isOn: true,
        lock: "member/lock3.png",
      },
      {
        label: "生日礼赠",
        value: BenefitTypeEnum.BIRTHDAY_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv3.3.png",
        //是否有锁
        isOn: true,
        lock: "member/lock3.png",
      },
      {
        label: "新品尝鲜",
        value: BenefitTypeEnum.NEW_PRODUCT_TASTE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv3.4.png",
        //是否有锁
        isOn: true,
        lock: "member/lock3.png",
      },
      {
        label: "随享停",
        value: BenefitTypeEnum.ANY_TIME_STOP,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv3.5.png",
        //是否有锁
        isOn: true,
        lock: "member/lock3.png",
      },
    ],
  },
  {
    level: 4,
    name: "铂金会员",
    swBg: "linear-gradient(180deg, #FFE4CF 0%, #D27533 100%)",
    mainBg: " linear-gradient(180deg, #F0BF9B 0%, #E19863 100%)",
    barColor: "linear-gradient(90deg, #F0BF9B 0%, #E19863 100%)",
    topColor: "#D29065",
    lvPNG: "member/v4.svg", //
    namePNG: "member/lv4.svg", //
    cssName: "member_lv4",
    circleImg: "member/bg_v4.png",
    description: "四级会员",
    growthValue: 20,
    levelName: "爱鲜活V4",
    sort: 4,
    // 利益
    interest: [
      {
        label: "升级礼包",
        value: BenefitTypeEnum.UPGRADE_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv4.1.png",
        //是否有锁
        isOn: false,
        lock: "member/lock4.png",
      },
      {
        label: "专属客服",
        value: BenefitTypeEnum.EXCLUSIVE_SERVICE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv4.2.png",
        //是否有锁
        lock: "member/lock4.png",
        isOn: true,
      },
      {
        label: "生日礼赠",
        value: BenefitTypeEnum.BIRTHDAY_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv4.3.png",
        //是否有锁
        lock: "member/lock4.png",
        isOn: true,
      },
      {
        label: "新品尝鲜",
        value: BenefitTypeEnum.NEW_PRODUCT_TASTE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv4.4.png",
        //是否有锁
        lock: "member/lock4.png",
        isOn: true,
      },
      {
        label: "随享停",
        value: BenefitTypeEnum.ANY_TIME_STOP,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv4.5.png",
        //是否有锁
        lock: "member/lock4.png",
        isOn: true,
      },
    ],
  },
  {
    level: 5,
    name: "黑金会员",
    swBg: "linear-gradient(180deg, #343434 0%, #1B1917 100%)",
    mainBg: " linear-gradient(180deg, #2B2B2A 0%, #232120 100%)",
    barColor: "linear-gradient(90deg, #2B2B2A 0%, #232120 100%)",
    topColor: "#F6C260",
    lvPNG: "member/v5.png", //
    namePNG: "member/lv5.svg", //
    cssName: "member_lv5",
    circleImg: "member/bg_v5.png",
    description: "五级会员",
    growthValue: 40,
    levelName: "爱鲜活V5",
    sort: 5,
    // 利益
    interest: [
      {
        label: "升级礼包",
        value: BenefitTypeEnum.UPGRADE_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv5.1.png",
        //是否有锁
        isOn: false,
        //锁标
        lock: "member/lock5.png",
      },
      {
        label: "专属客服",
        value: BenefitTypeEnum.EXCLUSIVE_SERVICE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv5.2.png",
        //是否有锁
        isOn: true,
        lock: "member/lock5.png",
      },
      {
        label: "生日礼赠",
        value: BenefitTypeEnum.BIRTHDAY_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv5.3.png",
        //是否有锁
        isOn: true,
        lock: "member/lock5.png",
      },
      {
        label: "新品尝鲜",
        value: BenefitTypeEnum.NEW_PRODUCT_TASTE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv5.4.png",
        //是否有锁
        isOn: true,
        lock: "member/lock5.png",
      },
      {
        label: "随享停",
        value: BenefitTypeEnum.ANY_TIME_STOP,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv5.5.png",
        //是否有锁
        isOn: true,
        lock: "member/lock5.png",
      },
    ],
  },
  {
    level: 6,
    name: "尊享会员",
    swBg: "linear-gradient(180deg, #23263C 0%, #141624 100%)",
    mainBg: "linear-gradient(180deg, #1F2134 0%, #191B2C 100%)",
    barColor: "linear-gradient(90deg, #1F2134 0%, #191B2C 100%)",
    topColor: "#D29065",
    lvPNG: "member/v6.png", //
    namePNG: "member/lv6.svg", //
    cssName: "member_lv6",
    circleImg: "member/bg_v6.png",
    description: "六级会员",
    growthValue: 100,
    levelName: "爱鲜活V6",
    sort: 6,
    // 利益
    interest: [
      {
        label: "升级礼包",
        value: BenefitTypeEnum.UPGRADE_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv6.1.png",
        //是否有锁
        lock: "member/lock6.png",
        isOn: false,
      },
      {
        label: "专属客服",
        value: BenefitTypeEnum.EXCLUSIVE_SERVICE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv6.2.png",
        //是否有锁
        lock: "member/lock6.png",
        isOn: true,
      },
      {
        label: "生日礼赠",
        value: BenefitTypeEnum.BIRTHDAY_GIFT,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv6.3.png",
        //是否有锁
        lock: "member/lock6.png",
        isOn: true,
      },
      {
        label: "新品尝鲜",
        value: BenefitTypeEnum.NEW_PRODUCT_TASTE,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv6.4.png",
        //是否有锁
        lock: "member/lock6.png",
        isOn: true,
      },
      {
        label: "随享停",
        value: BenefitTypeEnum.ANY_TIME_STOP,
        //说明
        desc: "权益说明",
        //权益图标
        img: "Lv6.5.png",
        //是否有锁
        lock: "member/lock6.png",
        isOn: true,
      },
    ],
  },
];

// 轮播urlType枚举 路径类型 1内部链接 2外部链接 0商品详情 3静态图片
// 0 商品详情 ;1 内部链接 ;2 外部链接;3 微信直播间,4-鲜活日记
//INTERNAL_LINK, EXTERNAL_LINK, PRODUCT_DETAILS, STATIC_PICTURE
export enum UrlTypeEnum {
  INTERNAL_LINK = 1,
  EXTERNAL_LINK = 2,
  PRODUCT_DETAILS = 0,
  STATIC_PICTURE = -1,
}
// 优化券查询页面来源
/* 
 PRODUCT_DETAIL(0, "商品详情"),
    COUPON_CENTER(1, "领券中心"),
    COUPON_LINK(2, "领券链接"),
    XIAO_YOU(3, "小优天天赚"),
    MEMBER_EXCHANGE(4, "会员兑券"),
    BIRTHDAY_GIFT(5, "生日礼赠"),
    UPGRADE_GIFT(6, "升级礼包"),
    COUPON_DIRECTIONAL(7, "定向发券"),
    SHOP_STORE_INDEX(8, "门店首页"),
    SHOPPING_CART(9, "购物车");
*/
export enum CouponSourceEnum {
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
  COUPON_CENTER = "COUPON_CENTER",
  COUPON_LINK = "COUPON_LINK",
  XIAO_YOU = "XIAO_YOU",
  MEMBER_EXCHANGE = "MEMBER_EXCHANGE",
  BIRTHDAY_GIFT = "BIRTHDAY_GIFT",
  UPGRADE_GIFT = "UPGRADE_GIFT",
  COUPON_DIRECTIONAL = "COUPON_DIRECTIONAL",
  SHOP_STORE_INDEX = "SHOP_STORE_INDEX",
  SHOPPING_CART = "SHOPPING_CART",
}
//07 13 14 17 18 30-14
//11 15 18 17 30 31-11+01
//30 31 1 2 9 26 -7
// 1 2 3 4 5 6 7 8 9 10 11 12
