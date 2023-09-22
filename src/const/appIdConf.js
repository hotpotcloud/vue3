// import { BASE_APPID_KEY } from "@/utils/config";
import { BASE_APPID_KEY } from "../utils/config";
import { KeyEnum, AppId_Enum, Company_Name } from "../utils/enum";
//TODO 后期更新
// 华西CR 双峰SF 雪兰XL 手机号实时验证，其余公司快速验证
export const conf = {
  XDBFH: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    //下单不发货-测试号
    company: Company_Name.XDBFH,
    //腾讯地图-key
    qmapKey: KeyEnum.XDBFH,
    // appid
    appid: AppId_Enum.XDBFH,
    //分享规则图
    ruleUrl: "xiaoyou/baidi-xiaoyou-rule-bg.png",
    //小优分享背景图
    shareUrl: "xiaoyou/008sharebg.png",
    //小优未注册背景图
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/xiaoyou-no-bg.png",
    //自定义分享标题
    shareTxT: "新希望不发货奶",
    //配送计划-上午am+下午pm-all全天
    plan: "am",
    //展示小优入口
    xiaoyou: true,
    //后付款--先饮后付
    payLater: true,
    //未登录用户头像
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    //登录无头像
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png", //奶卡分享图
    isMilkCard: true, //是否显示奶卡入口
    isLeaderboards: true, //是否显示小优排行榜
    digitalShop: true, //是否显示数字商城
    account: false, //订奶账户入口
    // 默认地址
    defaultAddress: {
      name: "新希望不发货奶",
      provide: "四川省",
      city: "成都市",
      area: "锦江区",
      detail: "锦江区中鼎国际2号8楼",
      latitude: 30.543,
      longitude: 104.068,
    },
    phoneQuick: true, //是否快速验证手机号
    isMember: true, //是否展示会员
  },
  BD: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    company: Company_Name.BD,
    qmapKey: KeyEnum.BD,
    appid: AppId_Enum.BD,
    ruleUrl: "xiaoyou/baidi-xiaoyou-rule-bg.png",
    shareUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/baidi-xiaoyou/baidi-xiaoyou-share.png",
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/filaed.png",
    useLive: true,
    shareTxT: "白帝鲜活go订奶商城",
    customUrl: "https://work.weixin.qq.com/kfid/kfce1c5a5e33c09558c",
    plan: "am",
    xiaoyou: true,
    payLater: false,
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png",
    isMilkCard: false,
    isLeaderboards: true,
    digitalShop: false,
    account: false, //订奶账户入口
    phoneQuick: true, //是否快速验证手机号
    isMember: false, //是否展示会员
  },
  XJ: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    company: Company_Name.XJ,
    qmapKey: KeyEnum.XJ,
    appid: AppId_Enum.XJ,
    ruleUrl: "xiaoyou/baidi-xiaoyou-rule-bg.png",
    shareUrl: "miniprogram-go-baidi-share-bg.png",
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/xiaoyou-no-bg.png",
    useLive: true,
    shareTxT: "新希望鲜鉴羊奶",
    customUrl: "https://work.weixin.qq.com/kfid/kfce1c5a5e33c09558c",
    plan: "pm",
    xiaoyou: false,
    payLater: false,
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/xj-null-user.png",
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/info/user1.png",
    milkCardShareImg: "card-share-bg.png",
    isMilkCard: true,
    isLeaderboards: true,
    digitalShop: true,
    account: false, //订奶账户入口
    phoneQuick: true, //是否快速验证手机号
    isMember: false, //是否展示会员
  },
  XL: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    company: "雪兰牛奶",
    qmapKey: KeyEnum.XL,
    appid: AppId_Enum.XL,
    ruleUrl: "xiaoyou/xuelang-xiaoyou-rule-bg.png",
    shareUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xl-xiaoyou/xuelang-xiaoyou-share.png",
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/xl-xiaoyou-first.png",
    useLive: true,
    shareTxT: "雪兰鲜活go订奶商城",
    customUrl: "https://work.weixin.qq.com/kfid/kfce1c5a5e33c09558c",
    plan: "pm",
    xiaoyou: true,
    payLater: false, //测试打开，生chang关闭
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png",
    isMilkCard: false,
    isLeaderboards: true,
    digitalShop: false,
    account: false, //订奶账户入口
    phoneQuick: false, //是否快速验证手机号
    isMember: false, //是否展示会员
  },
  NS: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    company: "南山牛奶",
    qmapKey: KeyEnum.NS,
    appid: AppId_Enum.NS,
    ruleUrl: "xiaoyou/xuelang-xiaoyou-rule-bg.png",
    shareUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xl-xiaoyou/xuelang-xiaoyou-share.png",
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/xl-xiaoyou-first.png",
    useLive: true,
    shareTxT: "南山鲜活go订奶商城",
    customUrl: "https://work.weixin.qq.com/kfid/kfce1c5a5e33c09558c",
    plan: "all",
    xiaoyou: false,
    payLater: false,
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png",
    isMilkCard: false,
    isLeaderboards: false,
    digitalShop: false,
    account: false, //订奶账户入口
    phoneQuick: true, //是否快速验证手机号
    isMember: false, //是否展示会员
  },
  SX: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    name: "sx_milk",
    company: "双喜牛奶",
    qmapKey: KeyEnum.SX,
    appid: AppId_Enum.SX,
    ruleUrl: "xiaoyou/sx-xiaoyou-ruleshare.png",
    shareUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/sx-xiaoyou/sx-xiaoyou-share.png",
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/sx-xiaoyou/sx-xiaoyou-first.png",
    useLive: true,
    shareTxT: "双喜鲜活go订奶商城",
    customUrl: "https://work.weixin.qq.com/kfid/kfce1c5a5e33c09558c",
    plan: "am",
    xiaoyou: true,
    payLater: false,
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png",
    isMilkCard: false,
    isLeaderboards: true,
    digitalShop: true,
    account: false, //订奶账户入口
    phoneQuick: true, //是否快速验证手机号
    isMember: false, //是否展示会员
  },
  QP: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    name: "qp_milk",
    company: "琴牌牛奶",
    //腾讯地图-key
    qmapKey: KeyEnum.QP,
    // appid
    appid: AppId_Enum.QP,
    //分享规则图
    ruleUrl: "qp-xiaoyou/qp-xiaoyou-rule-bg.png",
    //小优分享背景图
    shareUrl: "qp-xiaoyou/qp-share.png",
    //小优未注册背景图
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/qp-xiaoyou/qp-xiaoyou-no-bg.png",
    //自定义分享标题
    shareTxT: "琴牌鲜活go订奶商城",
    //配送计划-上午am+下午pm-all全天
    plan: "all",
    //展示小优入口
    xiaoyou: false,
    //后付款--先饮后付
    payLater: false,
    //未登录用户头像
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png", //奶卡分享图
    isMilkCard: false, //是否显示奶卡入口
    isLeaderboards: false, //是否显示小优排行榜
    digitalShop: false, //是否显示数字商城
    phoneQuick: true, //是否快速验证手机号
    isMember: false, //是否展示会员
  },
  CR: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    name: "cr_milk",
    company: "华西牛奶",
    //腾讯地图-key
    qmapKey: KeyEnum.CR,
    // appid
    appid: AppId_Enum.CR,
    //分享规则图
    ruleUrl: "cr-xiaoyou/cr-xiaoyou-rule-bg.png",
    //小优分享背景图
    shareUrl: "cr-xiaoyou/cr-share.png",
    //小优未注册背景图
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/cr-xiaoyou/cr-xiaoyou-no-bg.png",
    //自定义分享标题
    shareTxT: "华西鲜活go订奶商城",
    //配送计划-上午am+下午pm-all全天
    plan: "pm",
    //展示小优入口
    xiaoyou: true,
    //后付款--先饮后付
    payLater: false,
    //未登录用户头像
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png", //奶卡分享图
    isMilkCard: true, //是否显示奶卡入口
    isLeaderboards: true, //是否显示小优排行榜
    digitalShop: false, //是否显示数字商城
    account: false, //订奶账户入口
    phoneQuick: false, //是否快速验证手机号
    isMember: true, //是否展示会员
  },
  SF: {
    // 高德地图key
    mapKey: "77068078277bbbceb48ac1af1bdfa697",
    company: Company_Name.SF,
    //腾讯地图-key
    qmapKey: KeyEnum.CR,
    // appid
    appid: AppId_Enum.SF,
    //分享规则图
    ruleUrl: "xiaoyou/baidi-xiaoyou-rule-bg.png",
    //小优分享背景图
    shareUrl: "xiaoyou/008sharebg.png",
    //小优未注册背景图
    xiaoyouBg:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/xiaoyou-no-bg.png",
    //自定义分享标题
    shareTxT: "双峰牛奶商城",
    //配送计划-上午am+下午pm-all全天
    plan: "all",
    //展示小优入口
    xiaoyou: false,
    //后付款--先饮后付
    payLater: false,
    //未登录用户头像
    nullUser:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/null-user.png",
    //登录无头像
    avatarUrl:
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    milkCardShareImg: "card-share-bg.png", //奶卡分享图
    isMilkCard: false, //是否显示奶卡入口
    isLeaderboards: false, //是否显示小优排行榜
    digitalShop: false, //是否显示数字商城
    account: false, //订奶账户入口

    phoneQuick: false, //是否快速验证手机号
    isMember: false, //是否展示会员
  },
};
export const BaseApp = conf[BASE_APPID_KEY];
