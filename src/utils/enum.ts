/*
 * @name 0-未知，1-男，2-女
 *
 */
/**
 * @name 男-MAN，女-WOMAN，未知-UNKOWN
 */
export enum Sex {
  UNKOWN = "UN_KNOW",
  MAN = "MAN",
  WOMAN = "WOMAN",
}

export enum SexText {
  UNKOWN = "未知",
  MAN = "先生",
  WOMAN = "女士",
}

/*
*地址默认标签
0-家，1-公司，2-学校，3，其他
*/
export enum Tag {
  HOME = "HOME",
  COMPANY = "COMPANY",
  SCHOOL = "SCHOOL",
  OTHER = "OTHER",
}
export enum TagText {
  HOME = "家",
  COMPANY = "公司",
  SCHOOL = "学校",
  OTHER = "其他",
}
/**
 * @name 订单类型
 * RETAIL_PURCHASE 零购
 * PERIODIC_PURCHASE 周期购
 * NOT_SUPPORT 不确定类型
 */
export enum ordersType {
  NOT_SUPPORT = "NOT_SUPPORT",
  PERIODIC_PURCHASE = "PERIODIC_PURCHASE",
  RETAIL_PURCHASE = "RETAIL_PURCHASE",
}
/*
退款状态
WAIT_AUDIT-待审核,#F86C4D
REVOKED-已撤销, #000
REJECTED-已拒绝, #F86C4D
CONSENTED-同意,#1D9BDC
REFUND-已退款，#1D9BDC
CLOSED-已关闭 000
UN_SUBMIT-未提交 
*/
export enum refundStatus {
  REVOKED = "REVOKED",
  WAIT_AUDIT = "WAIT_AUDIT",
  REJECTED = "REJECTED",
  CONSENTED = "CONSENTED",
  REFUND = "REFUND",
  CLOSED = "CLOSED",
  UN_SUBMIT = "UN_SUBMIT",
}
export enum refundStatusText {
  REVOKED = "已撤销",
  UN_SUBMIT = "未提交",
  WAIT_AUDIT = "待审核",
  REJECTED = "已拒绝",
  CONSENTED = "已同意",
  REFUND = "已退款",
  CLOSED = "已关闭",
}
/*
订单状态
WAIT_PAYMENT:待支付
WAIT_DELIVERY:待配送 
DELIVERING:配送中
FINISH:已完成 
REFUNDED:已退款
*/
export enum orderStatusText {
  ALL = "全部",
  WAIT_PAYMENT = "待付款",
  WAIT_DELIVERY = "待配送",
  DELIVERING = "配送中",
  FINISH = "已完成",
  REFUNDED = "已退款",
  CANCELED = "已取消",
  INVALID = "已取消",
  STOP_SUBSCRIPTION = "已停订",
  REFUNDING = "售后中",
  NO_STATUS = "无状态",
  WAIT_PICK = "待自提",
  PICKED = "已自提",
}
export enum orderStatusShopText {
  ALL = "全部",
  WAIT_PAYMENT = "待付款",
  WAIT_DELIVERY = "待自提",
  DELIVERING = "配送中",
  FINISH = "已自提",
  REFUNDED = "已退款",
  CANCELED = "已取消",
  INVALID = "已取消",
  STOP_SUBSCRIPTION = "已停订",
  REFUNDING = "售后中",
  NO_STATUS = "无状态",
}
export enum orderStatus {
  ALL = "",
  WAIT_PAYMENT = "WAIT_PAYMENT",
  WAIT_DELIVERY = "WAIT_DELIVERY",
  DELIVERING = "DELIVERING",
  FINISH = "FINISH",
  REFUNDED = "REFUNDED",
  CANCELED = "CANCELED",
  INVALID = "INVALID",
  STOP_SUBSCRIPTION = "STOP_SUBSCRIPTION",
  REFUNDING = "REFUNDING",
  NO_STATUS = "NO_STATUS",
}
export const pickType = {
  SEND: {
    text: "送货上门",
    value: "SEND",
  },
  PICK: {
    text: "门店自提",
    value: "PICK",
  },
};

/**
 * @name 活动类型
 * @param KILL_ACTIVITY(0, "秒杀活动"),
 * @param FULL_DISCOUNT_MONEY(1, "满减满赠活动（满金额）"),
 * @param FULL_DISCOUNT_ITEM(2, "满减满赠活动（满件数)"),
 * @param COUPON(3, "优惠卷"),
 * @param PROMOTION_CODE(4, "优惠码"),
 * @param GROUP(5, "拼团活动"),
 * @param DISCOUNT(6, "折扣活动");
 */
export enum activityTypeEnum {
  KILL_ACTIVITY = "KILL_ACTIVITY",
  FULL_DISCOUNT_MONEY = "FULL_DISCOUNT_MONEY",
  FULL_DISCOUNT_ITEM = "FULL_DISCOUNT_ITEM",
  COUPON = "COUPON",
  PROMOTION_CODE = "PROMOTION_CODE",
  GROUP = "GROUP",
  DISCOUNT = "DISCOUNT",
}
/**
 * @name 活动状态
 * @param FINISH 3已结束
 * @param PROGRESSING(2, "进行中"),
 * @param WAIT_START(1, "未开始"),
 */
export enum activityStatus {
  WAIT_START = "WAIT_START",
  PROGRESSING = "PROGRESSING",
  FINISH = "FINISH",
}

// 商品上下架
export enum shelf {
  UP = "0",
  DOWN = "1",
}

/**
 * @name 商品上下架状态
 * @type PRODUCT_DRAFT 草稿
 * @type PRODUCT_OFF 下架
 * @type PRODUCT_ON 上架
 * @type PRODUCT_DELETE删除
 */
export enum productStatusEnum {
  PRODUCT_DRAFT = "PRODUCT_DRAFT",
  PRODUCT_OFF = "PRODUCT_OFF",
  PRODUCT_ON = "PRODUCT_ON",
  PRODUCT_DELETE = "PRODUCT_DELETE",
}
export enum productStatusText {
  PRODUCT_DRAFT = "草稿",
  PRODUCT_OFF = "下架",
  PRODUCT_ON = "上架",
  PRODUCT_DELETE = "删除",
}
// 配送规律
/**
 * @name 配送规律
 * @param 配送规律: EVERY_DAYS(0, "天天送"),TERTIAN_DAYS(1, "隔日送"), WORK_DAYS(2, "工作日送"), WEEKEND_DAYS(3, "周末送"), WEEK_DAYS(4, "星期送"),
 */
export enum RuleEnum {
  EVERY_DAYS = "EVERY_DAYS",
  TERTIAN_DAYS = "TERTIAN_DAYS",
  WORK_DAYS = "WORK_DAYS",
  WEEKEND_DAYS = "WEEKEND_DAYS",
  WEEK_DAYS = "WEEK_DAYS",
  LEGAL_WORKING_DAYS = "LEGAL_WORKING_DAYS",
}
export enum RuleTextEnum {
  EVERY_DAYS = "天天送",
  TERTIAN_DAYS = "隔日送",
  WORK_DAYS = "工作日送",
  WEEKEND_DAYS = "周末送",
  WEEK_DAYS = "星期送",
  LEGAL_WORKING_DAYS = "法定工作日送",
}
/**
 * 配送状态
 * NEW-待配送、CONFIRM-已完成、STOPPED-已停订、DELIVERED-已送达、LOCK-已锁定、REFUND-已退款、STOPPED_LOCK-停订日计划的退款锁定
 */
export enum RuleStatusEnum {
  NEW = "待配送",
  CONFIRM = "已完成",
  STOPPED = "已停订",
}
export enum RuletextEnum {
  NEW = "NEW",
  CONFIRM = "CONFIRM",
  STOPPED = "STOPPED",
}

export enum RuleStatusTextEnumFC03 {
  WAIT_DELIVERY = "待配送",
  DISCONTINUED = "已停订",
  FINISHED = "已完成",
  DELIVERING = "配送中",
}
/**
 * @name 配送状态-FC-03版本-先饮后付日历
 * @text WAIT_DELIVERY-待配送，DELIVERING-配送中，DISCONTINUED-已停定，FINISHED-已完成
 */
export enum RuleStatusEnumFC03 {
  WAIT_DELIVERY = "WAIT_DELIVERY",
  DISCONTINUED = "DISCONTINUED",
  FINISHED = "FINISHED",
  DELIVERING = "DELIVERING",
}

/**
 * 配送规则2.0
 * WAIT_DELIVERY-待配送;DELIVERING-配送中;DISCONTINUED-已停定;FINISHED-已完成;WAIT_COMMENT-待评价
 */
export enum TWORuleEnum {
  WAIT_DELIVERY = "WAIT_DELIVERY",
  DELIVERING = "DELIVERING",
  DISCONTINUED = "DISCONTINUED",
  FINISHED = "FINISHED",
  WAIT_COMMENT = "WAIT_COMMENT",
}
/**
 * 配送规则2.0
 * WAIT_DELIVERY-待配送;DELIVERING-配送中;DISCONTINUED-已停定;FINISHED-已完成；WAIT_COMMENT-待评价
 */
export enum TWORuleEnumText {
  WAIT_DELIVERY = "待配送",
  DELIVERING = "配送中",
  DISCONTINUED = "已停送",
  FINISHED = "已完成",
  WAIT_COMMENT = "待评价",
}

/*
退款原因
ONE-多拍、拍错、不想要，TWO-信息填写错误、重新拍，THREE-质量问题，FOUR-其他
*/
export enum refunfReason {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
}
export enum refunfReasonText {
  ONE = "多拍、拍错、不想要",
  TWO = "信息填写错误、重新拍",
  THREE = "质量问题",
  FOUR = "其他",
}
export enum RefundReasonEnum {
  NOT_WANT = "NOT_WANT",
  INFO_IS_ERROR = "INFO_IS_ERROR",
  QUALITY_PROBLEM = "QUALITY_PROBLEM",
  OTHER = "OTHER",
  OUT_OFF_STOCK = "OUT_OFF_STOCK",
  POOR_EXPERIENCE = "POOR_EXPERIENCE",
  PRICE_CHANGES = "PRICE_CHANGES",
  BEYOND_DELIVERY_SCOPE = "BEYOND_DELIVERY_SCOPE",
  NOT_SHIPPED_ON_TIME = "NOT_SHIPPED_ON_TIME",
  NOT_LIKE = "NOT_LIKE",
  NOT_SUPPLY_ON_TIME = "NOT_SUPPLY_ON_TIME",
  NO = "NO",
}
export enum RefundReasonEnumText {
  NOT_WANT = "拍错、不想要、不喜欢",
  INFO_IS_ERROR = "信息填写错误、重新拍",
  QUALITY_PROBLEM = "质量问题",
  OTHER = "其他",
  OUT_OFF_STOCK = "缺货",
  POOR_EXPERIENCE = "体验不好",
  PRICE_CHANGES = "价格变化,重新下单",
  BEYOND_DELIVERY_SCOPE = "地址超出配送范围,无法配送",
  NOT_SHIPPED_ON_TIME = "未按约定时间发货",
  NOT_LIKE = "拍错、不想要、不喜欢",
  NOT_SUPPLY_ON_TIME = "未按约定时间提供货物",
  NO = "暂无",
}

/*
是否是组合商品
SPU_PRODUCT-否，ITEM_PRODUCT-是
*/
/**
 * @name SPU_PRODUCT-否，ITEM_PRODUCT-是 (是否是组合商品)
 */
export enum combGoods {
  SPU_PRODUCT = "SPU_PRODUCT",
  ITEM_PRODUCT = "ITEM_PRODUCT",
}

/*优惠券类型*/
export enum couponType {
  COLLECT = 0,
  USE = 1,
}

/*
优惠券类型 1-满减金额，2-满折金额',
*/
export enum couponDiscountType {
  REDUCE = 1,
  DISCOUNT = 2,
}

/*
优惠券是否为全部或者部分商品可用
 '1：全部商品   2：选择指定商品',
 */

export enum goodsType {
  ALL = 1,
  PART = 2,
}

/*
NOTUSED(0, "未使用"),
USED(1, "已使用"),
EXPIRED(2, "已过期"),
DEPRECATED(3, "已停用"),

*/
export enum memberCouponStatus {
  NOTUSED = 0,
  USED = 1,
  EXPIRED = 2,
  DEPRECATED = 3,
}

/*
获得方式（1-领券中心，2-领券链接）
*/
export enum acquireType {
  CENTER = 1,
  LINK = 2,
}

// 广告跳转
/**
 * @name 广告跳转类型
 * @type PRODUCT_DETAIL-0-商品详情；INTERNAL_LINK-1-内部链接；EXTERNAL_APPLET-2-外部小程序；STUDIO-3-直播间
 */
export enum webTypeEnum {
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
  INTERNAL_LINK = "INTERNAL_LINK",
  EXTERNAL_APPLET = "EXTERNAL_APPLET",
  STUDIO = "STUDIO",
}
// 展示位置
/**
 * @name 展示位置类型
 * @type MALL_INDEX-首页；PERSONAL_CENTER-个人中心，PAYMENT_SUCCESSFUL-支付成功
 */
export enum webShowType {
  MALL_INDEX = "MALL_INDEX",
  PERSONAL_CENTER = "PERSONAL_CENTER",
  PAYMENT_SUCCESSFUL = "PAYMENT_SUCCESSFUL",
}
// 前端广告跳转
/**
 * @name 前端跳转
 * @type 0 商品详情 ;1 内部链接 ;2 外部链接;3 微信直播间,4-鲜活日记 5-在线客服 6-静态图片
 */
export enum urltypeEnum {
  zero = 0,
  one = 1,
  two = 2,
  three = 3,
  four = 4, //企业微信
  five = 5, //在线客服
  six = 6, //静态图片
}
/**
 * @name 组件类型type
 * @type 轮播-0;明星产品-1;分类-2;个人信息-3;图文导航-4;优惠券-5;秒杀-6
 */
export enum menuTypeEnum {
  hope0 = 0, //轮播
  hope1 = 1, //明星产品
  hope2 = 2, //分类
  hope3 = 3, //个人信息
  hope4 = 4, //图文导航
  hope5 = 5, //优惠券
  hope6 = 6, //秒杀
}
/**
 * 是否在可售范围内：
OUT_OF_RANGE-不在可售围栏内，ADDRESS_INVALID-收货地址不可用，
SUCCESS-正常;NOT_ADDRESS
 */
export enum saleRange {
  OUT_OF_RANGE = "OUT_OF_RANGE",
  ADDRESS_INVALID = "ADDRESS_INVALID",
  SUCCESS = "SUCCESS",
  NOT_ADDRESS = "NOT_ADDRESS",
}
/*
 优惠券是否可用
 AVAILABLE-可用,
 NOT_CUMULATE-该优惠券不支持叠加其他优惠活动,LESS_CONDITION_AMOUNT-商品金额不达标,PRODUCT_NOT_SUPPORT-不支持该商品使用,COUPON_STOP-该优惠卷已停止使用
*/
export enum couponCheckStatus {
  AVAILABLE = "AVAILABLE",
  NOT_CUMULATE = "NOT_CUMULATE",
  LESS_CONDITION_AMOUNT = "LESS_CONDITION_AMOUNT",
  PRODUCT_NOT_SUPPORT = "PRODUCT_NOT_SUPPORT",
  COUPON_STOP = "COUPON_STOP",
  EXCEED_AMOUNT = "EXCEED_AMOUNT",
}
export enum couponCheckStatusText {
  AVAILABLE = "可用",
  NOT_CUMULATE = "该优惠券不支持叠加其他优惠活动",
  LESS_CONDITION_AMOUNT = "商品金额不达标",
  PRODUCT_NOT_SUPPORT = "不支持该商品使用",
  COUPON_STOP = "该优惠卷已停止使用",
  EXCEED_AMOUNT = "订单金额为0",
}

/*
满减启用类型 1-不限制启用类型 2-限制启用类型
*/
export enum conditionType {
  UNLIMIT = 1,
  LIMIT = 2,
}

/*
memberDrawAmountLimit
用户领取上限 0-未达领取上限，1-已达领取上限
*/
export enum couponCollectLimit {
  UNLIMIT = 0,
  LIMITED = 1,
}

/*

活动类型(0-秒杀活动 1-满减满赠活动（满金额）2-满减满赠活动（满件数)  3-优惠券 4-拼团活动 5-折扣活动)
*/
export enum couponActivityType {
  SECKILL = 0,
  GIFTCASH = 1,
  GIFTGOODS = 2,
  COUPON = 3,
  GROUP = 4,
  ACTIVITY = 5,
}

/*
优惠券
有效期类型 1-固定有效期，2-领取后计算有效期
*/
export enum validType {
  FIXED = 1,
  COUNT = 2,
}

/*
秒杀活动状态
  WAIT_START(1, "未开始"),
  PROGRESSING(2, "进行中"),
  FINISH(3, "已结束"),
*/
export enum seckillType {
  WAIT_START = 1,
  PROGRESSING = 2,
  FINISH = 3,
}

/**
 * @name 状态
 * @pamars WAIT_START-没开始/原价购买, PROGRESSING-进行中/立即秒杀, FINISH-结束/立即购买
 */
export enum skillEnum {
  WAIT_START = "WAIT_START",
  PROGRESSING = "PROGRESSING",
  FINISH = "FINISH",
}
/**
 * @name 预告类型
 * @parmas NO ; AFTER_CREATE_ACTIVITY ; BEFORE_START_ACTIVITY
 * @parmas 0-不进行活动预告，1-创建成功后进行预告，2-活动开始前N小时进行活动预告
 */
export enum skillTipsEnum {
  NO = "NO",
  AFTER_CREATE_ACTIVITY = "AFTER_CREATE_ACTIVITY",
  BEFORE_START_ACTIVITY = "BEFORE_START_ACTIVITY",
}

/**
 * @优惠互斥类型
 * @params 
 * NO(0, "不叠加"),
COUPON(1, "叠加优惠券"),
DISCOUNT(2, "叠加满减满赠"),
COUPONANDDISCOUNT(3, "叠加优惠券和满减满赠");
 */
export enum cumulateType {
  NO = "NO",
  COUPON = "COUPON",
  DISCOUNT = "DISCOUNT",
  COUPONANDDISCOUNT = "COUPONANDDISCOUNT",
}
/**
 * @name 订单类型
 * 1--1.0订单 2--2.0订单
 */
export enum orderTypeEnum {
  ONE = 1,
  TWO = 2,
}

// EXPRESS_DELIVERY, MILK_STATION, UNASSIGNED, MILK_AND_EXPRESS_DELIVERY

/**
 * 配送类型
 * EXPRESS_DELIVERY, 快递配送
 * MILK_STATION, 奶站配送
 * UNASSIGNED, 未分配
 * MILK_AND_EXPRESS_DELIVERY 奶站配送/快递配送
 */
export enum deliverTypeEnum {
  EXPRESS_DELIVERY = "EXPRESS_DELIVERY",
  MILK_STATION = "MILK_STATION",
  UNASSIGNED = "UNASSIGNED",
  MILK_AND_EXPRESS_DELIVERY = "MILK_AND_EXPRESS_DELIVERY",
}

/**
 * @name KeyEnum(小程序腾讯地图key)
 * @param SX,XL...各公司缩写
 */
export enum KeyEnum {
  // SX = "ZYHBZ-O7A6U-EKEV4-G5RZV-2AHTV-JZFOJ",
  BD = "Y6SBZ-NPB6B-T3CUQ-JZ34P-S43G7-JUBCG",
  XL = "Y6SBZ-NPB6B-T3CUQ-JZ34P-S43G7-JUBCG",
  QP = "Y6SBZ-NPB6B-T3CUQ-JZ34P-S43G7-JUBCG",
  NS = "Y6SBZ-NPB6B-T3CUQ-JZ34P-S43G7-JUBCG",
  SX = "Y6SBZ-NPB6B-T3CUQ-JZ34P-S43G7-JUBCG",
  // XL = "PSYBZ-JNH6Q-J4S5F-4YMC5-FTBBO-XEBVE",
  CR = "Y6SBZ-NPB6B-T3CUQ-JZ34P-S43G7-JUBCG",
  // BD = "UKZBZ-76G6I-HR6GL-UP7IB-EVXXO-GOBP2",
  // QP = "RNABZ-FLNLG-EQOQI-QYO34-A2WK7-4BBGC",
  SF = "3OZBZ-B37RP-UQXD4-VO4JC-YIJJZ-P4FCG",
  AN = "TVXBZ-PLCLU-YNTVM-BHG2L-MRFU2-V6BGS",
  XJ = "HUMBZ-QT3HD-DZ64R-HLKBY-ZQGXO-TUFB6",
  XLZD = "N6FBZ-GL3WP-ZPWDL-V7YNI-KVUEV-C3BR5",
  SXZD = "JAHBZ-HUB64-3SXUN-XPIN4-EKNLV-MNFAT",
  CRZD = "QNBBZ-5XECU-WCKV3-4AQXH-ECGOE-XUBAA",
  BDZD = "OG2BZ-DFBC3-PYV3U-3Q4E3-U2OX7-JLFDK",
  QPZD = "6WZBZ-TE7KV-UHVPJ-UWII4-5TRO2-RFFEF",
  SFZD = "R2XBZ-DDMLV-A7FPA-UP5ZE-KD6O3-QQBKD",
  ANZD = "TZ3BZ-C6F33-UKU33-YAI4V-Q26IV-CXFYS",
  XJZD = "CNLBZ-XGW3W-KJ3RC-RRU5H-5BSFO-ZZF6I",
  // NS = "IDKBZ-U2UKZ-ILSX6-TTQYK-5AZJ5-EFBWF", //南山
  XDBFH = "CNLBZ-XGW3W-KJ3RC-RRU5H-5BSFO-ZZF6I",
}
/**
 * @name AppId_Enum(AppId明细)
 * @param 公司首字母缩写
 */
export enum AppId_Enum {
  SX = "wx07b7563d541e4bbf",
  XL = "wx93870fb57230d134",
  CR = "wx6d006d38546d1c61",
  BD = "wxd118889d6c8cb3b9",
  QP = "wx24368dc6aaab44b2",
  SF = "wxc0538b51ac75b9f6",
  AN = "wx7d714d2cfe2e9caa",
  XJ = "wxaba5493823db3778",
  XLZD = "wxd55426bcbfdb857a",
  SXZD = "wx75ed7bb852731935",
  CRZD = "wx06277ed0d65c7347",
  BDZD = "wxef3f75336372daf8",
  QPZD = "wx03c76c5bf09dfa2e",
  SFZD = "wx35eb4057da47fca8",
  ANZD = "wx83c1c521a35ee998",
  XJZD = "wxed6fbfb1ceb83d74",
  NS = "wx852ce0f4c03fe402",
  XDBFH = "wx0d5a3b46faa248bd",
}
/**
 * @name Company_Name(公司名称)
 * @param 公司名称
 */
export enum Company_Name {
  SX = "双喜",
  XL = "雪兰",
  CR = "川乳",
  BD = "白帝",
  QP = "琴牌",
  SF = "双峰",
  AN = "澳牛",
  XJ = "鲜鉴",
  XLZD = "雪兰征订",
  SXZD = "双喜征订",
  CRZD = "川乳征订",
  BDZD = "白帝征订",
  QPZD = "琴牌征订",
  SFZD = "双峰征订",
  ANZD = "澳牛征订",
  XJZD = "鲜鉴征订",
  NS = "南山",
  XDBFH = "下单不发货",
}
/**
 * @type {string}
 * SX = "双喜",
 *  XL = "雪兰",
 *  CR = "川乳",
 *  BD = "白帝",
 *  QP = "琴牌",
 *  SF = "双峰",
 * AN = "澳牛",
 *  XJ = "鲜鉴",
 * XLZD = "雪兰征订",
 * SXZD = "双喜征订",
 * CRZD = "川乳征订",
 * BDZD = "白帝征订",
 * QPZD = "琴牌征订",
 * SFZD = "双峰征订",
 *ANZD = "澳牛征订",
 *XJZD = "鲜鉴征订",
 *NS = "南山",
 *XDBFH = "下单不发货",
 */
export type APPID_key =
  | "XDBFH"
  | "SX"
  | "XL"
  | "CR"
  | "BD"
  | "QP"
  | "SF"
  | "AN"
  | "XJ"
  | "XLZD"
  | "SXZD"
  | "CRZD"
  | "BDZD"
  | "QPZD"
  | "SFZD"
  | "ANZD"
  | "XJZD"
  | "NS"
  | "XDBFH";
/**
 * @name 退款类型
 * NOT_DELIVERY_REFUND = '未发货退款',NOT_RECEIPT_REFUND = '未收货退款',RETURN_WITHOUT_REFUND = '退款不退货',
 */
export enum saleType {
  NOT_DELIVERY_REFUND = "NOT_DELIVERY_REFUND",
  NOT_RECEIPT_REFUND = "NOT_RECEIPT_REFUND",
  RETURN_WITHOUT_REFUND = "RETURN_WITHOUT_REFUND",
  REFUND_NOT_WITHDRAWN = "REFUND_NOT_WITHDRAWN",
  SELF_COLLECTED_REFUND = "SELF_COLLECTED_REFUND",
  MILK_STATION = "MILK_STATION",
  REFUND_WITHOUT_REDEEMING_MILK_CARD = "REFUND_WITHOUT_REDEEMING_MILK_CARD",
}
/**
 * 退款类型
 * NOT_DELIVERY_REFUND = '未发货退款',
  NOT_RECEIPT_REFUND = '未收货退款',
  RETURN_WITHOUT_REFUND = '退款不退货',
  REFUND_NOT_WITHDRAWN(4,"未自提退款"),
SELF_COLLECTED_REFUND(5,"已自提退款")

 */
export enum saleTypeText {
  NOT_DELIVERY_REFUND = "仅退款",
  // NOT_DELIVERY_REFUND = "未发货退款",
  NOT_RECEIPT_REFUND = "未收货退款",
  RETURN_WITHOUT_REFUND = "退款不退货",
  REFUND_NOT_WITHDRAWN = "未自提退款",
  SELF_COLLECTED_REFUND = "已自提退款",
  MILK_STATION = "奶站售后",
  REFUND_WITHOUT_REDEEMING_MILK_CARD = "未兑换奶卡退款",
}
export enum saleEnumText {
  NOT_DELIVERY_REFUND = "商品还未发货，申请后我们将不会发货",
  NOT_RECEIPT_REFUND = "没有收到货，申请后我们会做快递拦截不配送",
  RETURN_WITHOUT_REFUND = "已经收到货，申请后无需退回已收到的货物",
  REFUND_NOT_WITHDRAWN = "商品还未提货，申请后将不能提货",
  REFUND_WITHOUT_REDEEMING_MILK_CARD = "购买奶卡的订单仅针对暂未兑换的奶卡才可退款",
}

/**
 * 账单支付状态
 * PAY_SUCCESS-已付清，WAIT_PAY-待支付
 */
export enum payStatusEnum {
  WAIT_PAY = "WAIT_PAY",
  PAY_SUCCESS = "PAY_SUCCESS",
}

// 日历查询周/月
export enum CalendarValueEnum {
  YEAR = "YEAR",
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
}

/**
 * 停送状态
 *	GENERATE-待配送 DISCONTINUED-停送
 */
export enum StopStatusEnum {
  GENERATE = "GENERATE",
  DISCONTINUED = "DISCONTINUED",
}

//周期购详情页
export enum CycleEnum {
  MILK_STATION = "MILK_STATION",
}

/**
 * 配送规律
 */
export enum ruleTypeEnum {
  EVERY_DAYS = "EVERY_DAYS",
  TERTIAN_DAYS = "TERTIAN_DAYS",
  WEEK_DAYS = "WEEK_DAYS",
  LEGAL_WORKING_DAYS = "LEGAL_WORKING_DAYS",
}
export enum ruleTypeName {
  EVERY_DAYS = "天天送",
  TERTIAN_DAYS = "隔日送",
  WEEK_DAYS = "星期送",
  LEGAL_WORKING_DAYS = "法定工作日送",
}
/**
 * 配送时间段
 */
export enum timeSectionEnum {
  FORENOON = "FORENOON",
  AFTERNOON = "AFTERNOON",
}
export enum TimeSectionName {
  FORENOON = "上午送",
  AFTERNOON = "下午送",
}
/**
 * 配送列表创建修改
 */
export enum AlterORCrtate {
  CREATE = "CREATE",
  ALTER = "ALTER",
}

/**退款申请人
 * 	PLATFORM-平台
 *  MEMBER-会员
 */
export enum RefundPersonEnum {
  MEMBER = "MEMBER",
  PLATFORM = "PLATFORM",
}

// 分销订单类型

export enum ShareOrderEnum {
  // 新客
  new = 0,
  //老客
  old = 1,
}

export const DistOrderStatusEnum = {
  //待配送
  WAIT_DELIVERY: "WAIT_DELIVERY",
  //配送中
  DELIVERING: "DELIVERING",
  //已完成"
  FINISH: "FINISH",
  //已退款"
  REFUNDED: "REFUNDED",
  //已停订"
  STOP: "STOP",
  //售后中"
  REFUNDING: "REFUNDING",
  //已取消"
  CANCELED: "CANCELED",
};
export const StrategyTypeEnum = {
  //普通策略
  GENERAL: 0,
  //会员策略
  MEMBER: 1,
  //长订单策略
  LONG_ORDER: 2,
  //时间策略
  TIME: 3,
  //本级订单策略
  ORDER: 4,
  //新增下级策略
  LOWER: 5,
  //下级订单策略
  LOWER_ORDER: 6,
  //分销TOP榜单
  TOP: 7,
  //无效单策略
  INVALID_ORDER: 8,
  //征订策略
  SOLICIT_SUB: 9,
  // 佣金补发
  COMMISSION_REISSUE: 10,
};

// 订单tab类型
export const OrderTab = {
  // 鲜推官
  user: "User",
  // 分销订单
  distributionOrder: "DistributionOrder",
  // 我的收益
  myProfit: "myProfit",
};

export const PayMethodEnum = {
  //支付宝
  zhifubao: 0,
  //微信
  weixin: 1,
  //银行卡
  card: 2,
};
export const WithdrawStatus = {
  //已到账
  arrived: 0,
  //转账中
  transfering: 1,
  //转账异常
  transferError: 2,
  //其它
  other: 3,
};
export const StatisticsTypeEnum = {
  //今日
  TODAY: "TODAY",
  //昨天
  YESTERDAY: "YESTERDAY",
  //本周
  THIS_WEEK: "THIS_WEEK",
  //本月
  THIS_MONTH: "THIS_MONTH",
  //累计
  CUMULATIVE: "CUMULATIVE",
};
/* 路径类型 0-内部链接 1-外部 2-商品详情 3-促销活动 4-静态图片 5-微页面 */
export enum XiaoyouUrlType {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

//  协商记录
// EXCHANGE_GOODS-换品 CHANGE_ADDREDD-更改地址 CHANGE_RULE-更改配送规律

export enum HistroyTypeEnum {
  EXCHANGE_GOODS = "EXCHANGE_GOODS",
  CHANGE_ADDREDD = "CHANGE_ADDREDD",
  CHANGE_RULE = "CHANGE_RULE",
}
export enum HistroyTypeText {
  EXCHANGE_GOODS = "更换商品",
  CHANGE_ADDREDD = "更改收货信息",
  CHANGE_RULE = "更改配送规律",
}

// 状态枚举
// GENERATE, IN_STOCK, FOR_SHIPPING, IN_DISTRIBUTION, CONFIRM, DISCONTINUED, CANCELLED, REFUNDED
export enum GoodsStatusEnum {
  GENERATE = "GENERATE",
  IN_STOCK = "IN_STOCK",
  FOR_SHIPPING = "FOR_SHIPPING",
  IN_DISTRIBUTION = "IN_DISTRIBUTION",
  // CONFIRM = "CONFIRM",
  DISCONTINUED = "DISCONTINUED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  CONFIRM = "CONFIRM",
}
export enum GoodsStatusText {
  // GENERATE = "生成",
  // IN_STOCK = "备货中",
  // FOR_SHIPPING = "待配送",
  // IN_DISTRIBUTION = "配送中",
  // CONFIRM = "确认",
  // DISCONTINUED = "已停订",
  // CANCELLED = "已取消",
  // REFUNDED = "已退款",
  IN_DISTRIBUTION = "配送中",
  GENERATE = "待配送",
  IN_STOCK = "待配送",
  FOR_SHIPPING = "待配送",
  DISCONTINUED = "停送",
  // CANCELLED = "停送",
  CANCELLED = "拒收", //fc09
  REFUNDED = "停送",
  CONFIRM = "已完成",
}
// 门店订单
export const OrderShopType = "XHJMD";
// 核销码状态
export const takePicStatus = {
  // 0待核销/1已核销/2已作废
  wait: "WAIT_CHECK",
  "write-off": "CHECKED",
  invalid: "OBSOLETED",
  REFUND: "REFUND",
};
// 门店类型
export const workingType = {
  //LEAGUE(0, "加盟"),
  LEAGUE: "LEAGUE",
  //直营
  CHAIN_STORE: "CHAIN_STORE",
};

// 配送计划
export enum DeliveryPlanEnum {
  HowLong = "HowLong", //多久送一次
  HowTime = "HowTime", //什么时段送
  EveryNum = "EveryNum", //每次送多少
  Where = "Where", //送到哪里
}

// VIRTUALLY_MILK_CARD_ORDER(0, "虚拟奶卡订单"),
// VIRTUALLY_MILK_CARD_EXCHANGE_ORDER(1, "虚拟奶卡兑换订单"),
// INTERCEPT(2, "拦截");
export enum OrderTagTypeEnum {
  VIRTUALLY_MILK_CARD_ORDER = "VIRTUALLY_MILK_CARD_ORDER",
  VIRTUALLY_MILK_CARD_EXCHANGE_ORDER = "VIRTUALLY_MILK_CARD_EXCHANGE_ORDER",
  INTERCEPT = "INTERCEPT",
}

// 星期
const weekList = [
  {
    label: "星期一",
    value: "1",
    id: "week1",
    type: "long",
  },
  {
    label: "星期二",
    value: "2",
    id: "week2",
    type: "long",
  },
  {
    label: "星期三",
    value: "3",
    id: "week3",
    type: "long",
  },
  {
    label: "星期四",
    value: "4",
    id: "week4",
    type: "long",
  },
  {
    label: "星期五",
    value: "5",
    id: "week5",
    type: "long",
  },
  {
    label: "星期六",
    value: "6",
    id: "week6",
    type: "long",
  },
  {
    label: "星期日",
    value: "7",
    id: "week7",
    type: "long",
  },
];

export const planListEnum = {
  // 配送规律
  ruleType: [
    {
      //天天送
      label: ruleTypeName.EVERY_DAYS,
      value: ruleTypeEnum.EVERY_DAYS,
      id: 1,
      type: "long",
    },
    {
      //隔日送
      label: ruleTypeName.TERTIAN_DAYS,
      value: ruleTypeEnum.TERTIAN_DAYS,
      id: 2,
      type: "long",
    },
    {
      //星期送
      label: ruleTypeName.WEEK_DAYS,
      value: ruleTypeEnum.WEEK_DAYS,
      id: 3,
      type: "long",
      children: weekList,
    },
    {
      //法定工作日送
      label: ruleTypeName.LEGAL_WORKING_DAYS,
      value: ruleTypeEnum.LEGAL_WORKING_DAYS,
      id: 4,
      type: "long",
    },
  ],
  //配送时间-上午下午送
  ruleAmPm: {
    am: [
      //上午送
      {
        label: TimeSectionName.FORENOON,
        value: timeSectionEnum.FORENOON,
        id: 5,
        type: "time",
      },
    ],
    pm: [
      //下午送
      {
        label: TimeSectionName.AFTERNOON,
        value: timeSectionEnum.AFTERNOON,
        id: 6,
        type: "time",
      },
    ],
    all: [
      //上午送，下午送
      {
        label: TimeSectionName.FORENOON,
        value: timeSectionEnum.FORENOON,
        id: 7,
        type: "time",
      },
      {
        label: TimeSectionName.AFTERNOON,
        value: timeSectionEnum.AFTERNOON,
        id: 8,
        type: "time",
      },
    ],
  },
  //每次配送数量
  ruleNum: [],
};
/**
 * ruleType-配送规律
 * ruleAmPm-配送时间-上午下午送
 * ruleNum-每次配送数量
 */
export enum typeNameEnum {
  // 配送规律
  ruleType = "ruleType",
  ruleAmPm = "ruleAmPm",
  ruleNum = "ruleNum",
  ruleAddress = "ruleAddress",
}
export enum ruleTypeNameEnum {
  ruleType = "请选择多久送一次",
  ruleAmPm = "请选择什么时段送",
  ruleNum = "请选择每次送多少",
  ruleAddress = "请添加配送地址",
}

// 奶卡状态
export enum MilkCardStatusEnum {
  INITIALIZED = "INITIALIZED", //初始化
  SHARED = "SHARED", //已分享
  RECEIVED = "RECEIVED", //好友赠送
  PRESENTED = "PRESENTED", //已赠送
  EXCHANGED = "EXCHANGED", //已兑换
  REFUND = "REFUND", //已退款
}

export enum PICK_WAY {
  STORE_PICKUP = "STORE_PICKUP",
}

/* 售后单状态;
PENDING(0, "待处理"),
  TO_BE_REFUND(1, "待退款"),
  FINISH(2, "售后成功"),
  CLOSE(3, "售后关闭"),
  REFUSE(4, "拒绝"),
  RESCINDED(5, "已撤销");
*/
export enum REFUND_ORDER_STATUS {
  PENDING = "PENDING",
  TO_BE_REFUND = "TO_BE_REFUND",
  FINISH = "FINISH",
  CLOSE = "CLOSE",
  REFUSE = "REFUSE",
  RESCINDED = "RESCINDED",
}
// 商品类型
export const goodsTypeShop = {
  // 单规格
  single: 0,
  // 多规格
  muilte: 1,
};

// 勾选类型
export const shopGoodsCheckType = {
  //勾选状态（0勾选，1未勾选）默认勾选
  checked: 0,
  notCheck: 1,
};
//  全选勾选类型
export const isCheckAllCheckType = {
  //勾选状态（0勾选，1未勾选）默认勾选
  all: 0,
  not: 1,
};

// 无线库存
export const unlimitedStock = -1;

/* XZG(0, "鲜掌柜"),
  XHJ(1, "鲜活+后台"),
  XHJ_MINI(2, "鲜活+小程序"),
  XYZ(3, "鲜驿站");*/
export enum PLATFORM_TYPE {
  XZG = "XZG",
  XHJ = "XHJ",
  XHJ_MINI = "XHJ_MINI",
  XYZ = "XYZ",
}
// 购物车最大添加数量
export const maxShopAddCount = 100;

/*下单类型*/
export const ORDER_TYPE_ENUM = {
  XYZDXD: {value: "XYZDXD", label: "鲜驿站（代下单）"},
  XQS_DKXD: {value: "XQS_DKXD", label: "鲜骑士代下"},
  XHJMD: {value: "XHJMD", label: "鲜活+门店"},
  XHJ: {value: "XHJ", label: "鲜活+"},
  XYZHFK: {value: "XYZHFK", label: "鲜驿站（后付款）"},
};
/*下单类型*/
export const ORDER_AGIN_TYPE_ENUM = {
  XYZDXD: {value: "XYZDXD", label: "鲜驿站（代下单）"},
  XQS_DKXD: {value: "XQS_DKXD", label: "鲜骑士代下"},
  XHJ: {value: "XHJ", label: "鲜活+"},
  XYZHFK: {value: "XYZHFK", label: "鲜驿站（后付款）"},
};

//下单类型
export enum CalculateTypeEnum {
  ORDER = "ORDER", //(0,"普通下单")
  MILK_CARD_EXCHANGE = "MILK_CARD_EXCHANGE", //(1,"奶卡兑换"),
}

export enum SOURCE_TYPE {
  XHJMD = 10015,
}

// 领券渠道
// COUPON_CENTER(1, '领券中心'),
//   COUPON_LINK(2, '领券链接'),
//   XIAO_YOU(3, '小优天天赚');
export const COUPON_SOURCE = {
  COUPON_CENTER: {
    value: "COUPON_CENTER",
    label: "领券中心",
  },
  COUPON_LINK: {
    value: "COUPON_LINK",
    label: "领券链接",
  },
  XIAO_YOU: {
    value: "XIAO_YOU",
    label: "小优天天赚",
  },
};

/* 评价与否:YES-已评价；NO-待评价 */
export enum EvaluateEnum {
  YES = "YES",
  NO = "NO",
}
/* 评价类型 GOODS_APPRAISE-商品评价，DELIVERY_APPRAISE -配送评价 */
export enum AppraiseTypeEnum {
  DELIVERY_APPRAISE = "DELIVERY_APPRAISE",
  GOODS_APPRAISE = "GOODS_APPRAISE",
}

// 停订恢复SUSPEND, RECOVERY
export enum subTypeEnum {
  SUSPEND = "SUSPEND", //停
  RECOVERY = "RECOVERY", //恢复
}
/*
优惠券类型
couponCategoryEnum
NORMAL(0, "普通优惠券"),
MILK_CARD(1, "奶卡优惠券"),
SHOP_STORE(2, "门店优惠券");
*/
export enum COUPON_CATEGORY_ENUM {
  NORMAL = "NORMAL",
  MILK_CARD = "MILK_CARD",
  SHOP_STORE = "SHOP_STORE",
}

/*
店铺优惠券是否已领取(0-未领取，1-已领取)
*/
// export enum RECEIVED_COUPON_STATUS {
//   RECEIVED = 1,
//   UNRECEIVED = 0,
// }
export enum RECEIVED_COUPON_STATUS {
  RECEIVED = "RECEIVE_ENUM",
  UNRECEIVED = "NOT_CLAIMED_ENUM",
}

/*
优惠券领取渠道枚举
    PRODUCT_DETAIL(0, "商品详情"),
    COUPON_CENTER(1, "领券中心"),
    COUPON_LINK(2, "领券链接"),
    XIAO_YOU(3, "小优天天赚"),
    MEMBER_EXCHANGE(4, "会员兑券"),
    BIRTHDAY_GIFT(5, "生日礼赠"),
    UPGRADE_GIFT(6, "升级礼包"),
    COUPON_DIRECTIONAL(7, "定向发券"),
    SHOP_STORE_INDEX(8, "门店首页"),
    SHOPPING_CART(9, "购物车"),
*/
export enum ACQUIRE_TYPE_ENUM {
  PRODUCT_DETAIL = 0,
  COUPON_CENTER = 1,
  COUPON_LINK = 2,
  XIAO_YOU = 3,
  MEMBER_EXCHANGE = 4,
  BIRTHDAY_GIFT = 5,
  UPGRADE_GIFT = 6,
  COUPON_DIRECTIONAL = 7,
  SHOP_STORE_INDEX = 8,
  SHOPPING_CART = 9,
}

export enum COUPON_CHANNEL_TYPE {
  FSL = "FSL",
  XHG = "XHG",
}
//满减满赠
export enum SALE_TYPE {
  FULL_REDUCTION = "FULL_REDUCTION",
  FULL_GIFT = "FULL_GIFT",
}

/*
 奶卡领取状态
INITIALIZED(0, "初始化"),
SHARED(1, "已分享"),
RECEIVED(2, "好友赠送"),
PRESENTED(3, "已赠送"),
EXCHANGED(4, "已兑换"),
REFUND(5, "已退款"),
REJECT(6, "已拒收"),
NOT_CLAIMED(7, "24小时未领取");
 */
export const MILK_CARD_STATUS = {
  INITIALIZED: {
    label: "初始化",
    value: "INITIALIZED",
  },
  SHARED: {
    label: "已分享",
    value: "SHARED",
  },
  RECEIVED: {
    label: "好友赠送",
    value: "RECEIVED",
  },
  PRESENTED: {
    label: "已赠送",
    value: "PRESENTED",
  },
  EXCHANGED: {
    label: "已兑换",
    value: "EXCHANGED",
  },
  REFUND: {
    label: "已退款",
    value: "REFUND",
  },
  REJECT: {
    label: "已拒收",
    value: "REJECT",
  },
  NOT_CLAIMED: {
    label: "24小时未领取",
    value: "NOT_CLAIMED",
  },
};
// 快速验证基础库
export const baseVersion = "2.24.4";
