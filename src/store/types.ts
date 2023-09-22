// 搜索参数
export interface searchType {
  page: number | string;
  size: number | string;
  name: string;
  appId: string;
}
export enum PayTypeEnum {
  ORDER = "ORDER",
  RECEIPT = "RECEIPT",
}
// 支付渠道
export enum payChannelEnum {
  BILL_PAYMENT = "BILL_PAYMENT", //自主支付
  VALET_PAYMENT = "VALET_PAYMENT", //app分享支付
}
export interface CalenderType {
  channelSkuCode: string;
  delyItemNo: string;
  page: number;
  receiptItemNo: string;
  receiptNo: string;
  size: number;
  type: number;
}
export interface calenderTypes {
  delyItemNo: string; //配送明细单号
  orgStationNo: string; //履约单编码
  queryHistory: number; //是否查询历史数据：0-否，1-是
  size?: number;
  page?: number;
  // channelSkuCode: string;
  // delyItemNo: string;
  // page: number;
  // receiptItemNo: string;
  // receiptNo: string;
  // size: number;
  // type: number
}
/**
 * 日历查询类型(BEFROE--1-之前，AFTER--2-之后)
 */
export enum CalenderEnum {
  BEFORE = 1,
  AFTER = 2,
}
/**
 * stationAccountNo-履约账户编码
 * channelSkuCode-商品渠道编码
 * page-size-页码
 */
export interface currentCalendarType {
  page: number;
  size: number;
  type: number;
  channelSkuCode: string;
  stationAccountNo: string;
}

// 起送停送
export interface StopType {
  date?: string;
  milkStationNo?: string;
  stationAccountNo?: string;
  status?: string;
}

/**
 * 下单请求参数
 *
 */
export interface OrderParams {
  goodsCode: string; //商品编码*
  goodsQty: number | string; //商品购买数量*
  unitPrice: number | string; //商品单价*
  secKillCode?: string; //秒杀编码
  addressNo?: string | number; //地址编码
  couponCode?: string; //优惠券编码
  deliveryPlanCode?: string; //配送计划编码
  deliveryStartDate?: string; //开始配送时间
  timeSection?: string; //默认配送时间段
}
export interface StationListType {
  latitude?: string;
  longitude?: string;
  appId?: string;
}

// /* 鲜推官注册 */
export interface ApplyParams {
  // appid: string;
  identityBackPic?: string;
  identityFrontPic?: string;
  identityNumber?: string;
  phone?: string;
  pid?: number;
  realName?: string;
}

/**
 * @name  小优账户状态
 * 4111---ACCOUNT_EXIST"用户已存在"
 * 4201---NOT_REGIST "用户未注册"
 * 4202---ACCOUNT_STOP"用户账号已被停用"
 */
export enum xiaoyouEnum {
  ACCOUNT_EXIST = "4111",
  NOT_REGIST = "4201",
  ACCOUNT_STOP = "4202",
}

/**长停列表标识
 * @type
 * RESTORABILITY-可恢复
 * DRINKING-在喝
 */
export enum LongStopEnum {
  RESTORABILITY = "RESTORABILITY",
  DRINKING = "DRINKING",
}
