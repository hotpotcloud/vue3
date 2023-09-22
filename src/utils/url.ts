// user个人中心
export const getUser = {
  login: "/mall/member/login/wx-auth", //微信小程序授权接口
  register: "/mall/member/login/wx-register", //微信小程序注册接口
  refresh: "/mall/member/login/token/refresh", //token刷新
  realtime: "/mall/member/login/wx-register-realtime", //微信小程序实时登录注册接口
};
// 商品列表 详情
export const product = {
  // /product/productPage
  productPage: "/mall/product/productPage", //分页列表
  productInfos: "/mall/product/info", //spu商品详情
  pro: "/mall/product/productList",
};

// 订单列表
export const order = {
  // orderPage: '/mall/order/OrderList',//订单列表
  orderPage: "/mall/order/v2/orderList", //订单列表
  // orderDetail: '/mall/order/orderDetailCend',//订单详情
  orderDetail: "/mall/order/v2/orderDetail", //订单详情
  createOrder: "/mall/order/createOrder", //订单创建
  cancelOrder: "/mall/order/cancel-order/{orderNo}", //取消订单

  // calculate: '/mall/order/calculateAmountByAddress', //根据收获地址计算总金额和优惠信息
  // calculate: '/mall/order/v2/calculateAmountByAddress', //根据收获地址计算总金额和优惠信息
  calculate: "/mall/order/v5/calculateAmountByAddress", //根据收获地址计算总金额和优惠信息
  secKillCalc: "/mall/secKill/v5/calculateAmountByAddress", //秒杀算价钱
  delOrder: "/mall/order/delete", //删除订单
  // secKillCalc: '/mall/secKill/calculateAmountByAddress',//秒杀算价钱
  seckillCreate: "/mall/secKill/createSecKillOrder", //秒杀创建订单
  sendorder: "/mall/order/selectDeliverDetailByOrderNo/", //根据订单号查物流详情{orderNo} get
  findQty: "/mall/order/v2/orderList/qty", //查询订单数量统计
  platHistory: "/mall/order/selectRecordListByPlatformOrderNo/", //C端根据平台订单号查修改记录
  //fc05配送日历
  selectCalender: "/mall/order/selectCalender", //根据订单号查询订奶计划 2
  selectCalenderInfo: "/mall/order/selectCalenderGroup/", //日历头部配送信息
  // 门店订单详情
  selectOrderItemStoresByOrderNo: "/mall/order/selectOrderItemStoresByOrderNo",
  shopOrderList: "/mall/order/selectOrderItemStoresByOrderNoList", //获取门店订单扩展信息
  shopOrderQty: "/mall/order/v2/storeOrderList/qty", //自提订单数量
  // 门店订单详细
  shopStoreOrderDetail: "/mall/order/shopStoreOrderDetail",
  // fc07配送日历
  stationAccountNo: "/mall/order/selectDeliveryAddressListByOrderNo", //根据原始订单 查询出所有履约单对应的地址-配送日历履约账户列表1
  selectDeliveryItemList: "/mall/order/selectDeliveryItemList", //  根据订单号和履约账户编号查询订奶计划3
  checkProductStatus: "/mall/product/checkProductStatus", //通过spuId查询商品是否下架
  //fc10
  milkSenderInfo: "/mall/order/selectMilkManNoByAddressNo", //根据配送地址编号 查询送奶员信息
};

// 地址管理
export const address = {
  addressList: "/mall/member/address/list", //订单列表
  addressDetail: "/mall/member/address", //地址详情
  addressEdit: "/mall/member/address", //编辑地址
  addressDel: "/mall/member/address", //删除地址
  addressAdd: "/mall/member/address", //删除地址
  defaultAddress: "/mall/member/address/setDefaultAddress/", //设置默认地址
};
const urlapi = {
  order: {
    calculate: "/mall/order/v5/calculateAmountByAddress", //根据收获地址计算总金额和优惠信息
    // 下单商品信息
    calculateAmountByShopCar: "/mall/order/v5/calculateAmountByShopCar",
    secKillCalc: "/mall/secKill/v5/calculateAmountByAddress", //秒杀算价钱
    createOrder: "/mall/order/createOrder", //订单创建
    seckillCreate: "/mall/secKill/createSecKillOrder", //秒杀创建订单
  },
  user: {
    member: "/mall/member/info/", //获取会员信息 GET
    update: "/mall/member/update", //更新会员信息 post
    login: "/mall/member/login/wx-auth", //登陆
    receiptCurrent: "/mall/receipt/current", //我的账单-查看当前需要支付的月份账单
    receiptDetail: "/mall/receipt/detail", //我的账单-账单详情
    receiptHistory: "/mall/receipt/history", //我的账单-历史账单
    receiptPay: "/mall/receipt/pay", //我的账单-账单支付
    calendar: "/mall/receipt/calendar", //根据订单号查询配送日历
  },
  about: {
    aboutUs: "/mall/shop/sys/aboutUs", //关于我们
    protocol: "/mall/shop/sys/protocol", //协议说明
    customerHotline: "/mall/shop/sys/customerHotline", //客服热线
  },
  product: {
    productPage: "/mall/product/productPage", //分页列表
    productInfos: "/mall/product/info/", //spu商品详情  spuid
    pro: "/mall/product/productList",
    tree: "/mall/product/category/foreign/periodTree", // 树形数据 一二级分类 GET
    shopStoreTree: "/mall/product/category/foreign/shopStoreTree", // 树形数据 一二级分类 GET

    spuOfCategory: "/mall/product/list/spuOfCategory", // 鲜活+分类下商品列表 POST
    // info: '/mall/product/info/',                        //获取商品信息post
    info: "/mall/product/info", //获取商品信息post
    // time: '/mall/order/selectDeliveryTime',             //商品获取起送时间
    time: "/mall/order/selectDeliveryTime", //商品获取起送时间

    tags: "/mall/product/promotion", //获取优惠标签 查询优惠信息
    // calendar: '/mall/order/selectDeliveryCalendar',     //配送日历  post
    calendar: "/mall/order/selectDeliveryCalendarV2", //配送日历  post
    ticket: "/mall/promotion/", //优惠券 spucode get
    killReserve: "/mall/product/kill/", //秒杀商品详情
  },
  home: {
    wechat: "/mall/bussinessWechatQrCode/info/", //获取企业微信二维码
    hotword: "/mall/support/search/hot", //selectSearchHot 搜索热词
    search: "/mall/product/search", //商品搜索 post
    homepage: "/mall/support/index/select/index", //首页配置
    adv: "/mall/advertiseapi/list", //广告弹窗 post
    point: "/mall/advertiseapi/buried/open", //弹窗广告打开埋点更新 put
    expoint: "/mall/advertiseapi/buried/exposure", //弹窗广告曝光埋点更新 put
    couponList: "/mall/promotion/batchSelect", //优惠券列表
    batch: "/mall/product/select/product/batch/info", //获取最新商品
    spikeList: "/mall/firstPageConfig/batchSelect", //秒杀商品列表
    // localGoods: '/mall/product/marketingRegion/exist/product',   //判断所属区域是否有商品
    appIdXcx: "/mall/xcx/appId", //根据APPID获取小程序配置信息 get
    existproduct: "/mall/product/marketingRegion/exist/product", //判断所属区域是否有商品post
    freshDiaryByNo: "/mall/delivery/freshDiaryByNo", //鲜活日记周/月数据查询
    keepAddress: "/mall/member/address/selectListByAddressNo", //根据收货地址编码查询会员所有履约账户下的收货地址
    selectByDateAndNo: "/mall/delivery/selectByDateAndNo", //通过日期和履约账户编码查询汇总日计划数据
    monthCalendar: "/mall/delivery/selectDeliveryMonthCalendar", //查询履约账户配送日历--调整日记
    currentCalendar: "/mall/delivery/selectGoodsDeliveryCalendar", //查询当前单个商品配送日历
    stopOrStart: "/mall/delivery/stopOrStartOperate", //配送日历停定/恢复
    freshDiaryMonthByNo: "/mall/delivery/freshDiaryMonthByNo", //调整日记 调整日记页面接口
    milkList: "/mall/support/index/milkList", //根据经纬度查询最近的10个奶站
    shopList: "/mall/support/shop_store/getShopListPageByCoord", //分页查询附近门店
    shopHistoryList: "/mall/support/shop_store/getHistoryShopStore", //分页查询历史门店
    recentShopList: "/mall/support/index/getShopListByCoord", //根据定位查询最近的3个门店
    // fc-07
    countQty: "/mall/delivery/countQtyByStationAccountNo", //统计该履约账户待配 已配 已停
  },
  calendar: {
    //日历post
    current: "/mall/delivery/selectDeliveryCalendar", //根据订单号查询配送日历
    before: "/mall/delivery/selectDeliveryCalendarToBefore", //根据订单号查询配送日历(当前月之前的数据)
  },
};

export const refund = {
  // refundList: '/mall/order/afterSale/page', //退款管理-退款订单列表
  // refundList: "/mall/order/afterSale/v2/page", //退款管理-退款订单列表
  refundList: "/mall/order/postSale/selectDetailByOrderNo", //退款管理-退款订单列表
  // refundDetail: '/mall/order/afterSale/negotiationRecord/afterSaleNo', //退款申请的详情
  // refundDetail: "/mall/order/afterSale/details/", //退款申请的详情
  refundDetail: "/mall/order/postSale/details/", //退款申请的详情
  // negotiationHistories: '/mall/order/afterSale/negotiationHistories/afterSaleNo',//协商历史
  negotiationHistories: "/mall/order/afterSale/applyRecord/", //协商历史
  // applyAfterSale: '/mall/order/afterSale/apply', //申请售后
  // applyAfterSale: "/mall/order/afterSale/applyAfterSale", //申请售后
  applyAfterSale: "/mall/order/postSale/v2/applyAfterSale", //申请售后
  // revokedRefund: "/mall/order/afterSale/revoke", //撤销退款申请
  revokedRefund: "/mall/order/postSale/revoke/v2/", //撤销退款申请
  delRefund: "/mall/order/afterSale/delete", //删除退款申请
  checkApplyNum: "/mall/order/afterSale/checkApplyNum", //查看次数
  getRefundInfo: "/mall/order/postSale/calculateAbleRefundAmount", //计算可退金额
  applyRefundMilkCard: "/mall/order/postSale/v2/milkCardAfterSale",
};

export const pay = {
  wechatPay: "/mall/order/pay/js-api", //微信支付
};

export const coupons = {
  collectCouponsList: "/mall/promotion/selectMallDiscountCenterPage", //领券中心可领取列表
  useCouponsList: "/mall/promotion/selectMallMyAvailableDiscountPage", //领券中心可使用列表
  couponDetail: "/mall/promotion/batchSelect", //优惠卷编码查询查询优惠卷详情
  myCouponList: "/mall/promotion/selectMallMyDiscountPage", //我的券包优惠券列表
  getCoupon: "/mall/promotion/memberGetCoupon", //领取优惠券
  selectCouponList: "/mall/coupon/selectCouponList", //根据supcode获取优惠券列表
  shopListCanUseCoupons: "/mall/order/shopStore/listCanUseCoupons", //门店查询当前商品可使用的优惠券
  couponsGoods: "/mall/promotion/selectProductPageByCode", //优惠券可用商品
  couponInfo: "/mall/promotion/batchSelect", //优惠券基本信息
  claimCoupon: "/mall/promotion/memberGetCouponReturnInfo", //领取优惠券
  newCouponInfo: "/mall/promotion/selectByCode", //新优惠券基本信息
  getCouponList: "/mall/promotion/couponByAcquireType", //领取优惠价弹窗
  collectCoupons: "/mall/promotion/batchGetCoupon", //批量领取优惠券
};

// 小优
export const distributionUrl = {
  selectPlanList: "/mall/delivery/plan/selectPage", //配送列表
  saveOrUpdate: "/mall/delivery/plan/saveOrUpdate", //新增
  deletePlan: "/mall/delivery/plan/delete/", //删除
};
export const OrdersAndRevenue = {
  shareOrder: "/mall/api/v1/shareOrder", //分销订单列表
  financePage: "/mall/api/v1/mall/finance/page", //我的收益
  financeCensus: "/mall/api/v1/mall/finance/census", //金额
  subDistributorPage: "/mall/api/v1/mall/distributor/sub-distributor/page", //分销员
  distributorNum: "/mall/api/v1/mall/distributor/sub-Num", //统计人数
};
export const Withdraw = {
  distributorMoney: "/mall/api/v1/mall/distributor/money", //可提现余额
  withdrawMoney: "/mall/api/v1/mall/withdraw", //提现
  distributorAuth: "/mall/api/v1/mall/distributor/auth", //是否实名认证
  withdrawPayAway: "/mall/api/v1/mall/withdraw/payAway", //公司支持的提现方式
  withdrawPage: "/mall/api/v1/mall/withdraw/page", //提现记录
  updateInfo: "/mall/api/v1/mall/distributor/update-info", //实名认证
  getInfo: "/mall/api/v1/mall/distributor/get-info", //获取实名认证信息
};
export const XiaoyouProduct = {
  spuOfCategory: "/mall/product/list/spuOfCategory/v1", //商品类别
  tree: "/mall/product/category/foreign/tree/", // 树形数据 一二级分类 GET
  getImage: "/mall/api/v1/qrCode/base64/", //根据spuId生成分享二维码base64格式
};
// 小优分销员接口
export const URLDistributor = {
  money: "/mall/api/v1/mall/distributor/money", //金额统计
  check: "/mall/api/v1/mall/distributor", //是否注册小优-检查是否已成为分销或分销员状态-post
  distNum: "/mall/api/v1/mall/distributor/distNum", //得到公司的所有鲜推官人数
  topHome: "/mall/api/v1/mall/topList/homePage", //首页获取分销榜单信息
  apply: "/mall/api/v1/mall/distributor/regist", //注册鲜推官
  statistics: "/mall/api/v1/mall/distributor/statistics", //分销首页鲜推官、收益、订单数据统计
  detailPage: "/mall/api/v1/mall/topList/detailPage", //获取分销榜单信息
  wool: "/mall/api/v1/qrCode/base64/wool/", //生成一起薅羊毛的二维码base64格式-面对面邀请
  banner: "/mall/api/v1/mall/banner/", //根据类型查询列表
  source: "/mall/api/v1/source", //查询素材资源post
  chat: "/mall/api/v1/mall/chat", //弹幕
  config: "/mall/api/v1/global/config/",
  qrcode: "/mall/api/v1/qrCode/base64/", //根据spuId生成分享二维码base64格式小程序码

  // 小优优化FC-04
  commission: "/mall/api/v1/mall/commission", //  根据公司id得到上线的商品中,佣金最大值
};
// 设置
export const Setting = {
  agreement: "/mall/api/v1/mall/agreement", //根据协议类型获取协议
  selfPickupProtocol: "/mall/shop/sys/selfPickup/protocol", //门店协议
};
//先饮后付
export const payAfter = {
  selectFirstReceipt: "/mall/receipt/selectFirstReceipt", //先饮后付接口
  selectFirstReceiptGoods: "/mall/receipt/selectFirstReceiptGoods", //先饮后付-商品列表
  history: "/mall/receipt/history", //我的账单 - 历史账单
  detail: "/mall/receipt/detail", //我的账单 - 账单详情
  current: "/mall/receipt/current", //我的账单 - 账单列表
  calendar: "/mall/receipt/calendar", //根据订单号查询配送日历
};
//门店
export const shop = {
  getShopStoreById: "/mall/support/shop_store/getShopStoreByShopConfigId",
  // getApplyShopListByChannelSku:
  //   "/mall/support/shop_store/getApplyShopListByChannelSku",
  getApplyShopListBySpuCode:
    "/mall/support/shop_store/getApplyShopListBySpuCode",
  createStoreOrder: "/mall/order/createStoreOrder",
  //结算适用门店
  getCutShopList: "/mall/support/shop_store/getCutShopList",
};
// 奶卡fc06
export const milkCard = {
  milkCardTemplate: "/mall/milkCardTemplate/page", //奶卡模板列表-分页
  milkCardBaseInfo: "/mall/milkCardBaseInfo", //根据店铺id查询奶卡基础信息
  milkCardProductPage: "/mall/product/select/product/milkCardProductPage", //分页查询该店铺内的奶卡商品'
  milkCardProduct: "/mall/product/select/product/milkCardProduct", //查询奶卡商品详情{skuChannelCode}
  milkCardCreateOrder: "/mall/order/createMilkCardOrder", // 奶卡创建订单
  walletList: "/mall/milkCard/getMyCardBag", // 我的卡包列表
  walletStatistics: "/mall/milkCard/getMyCardBagCount", // 我的卡包-数量统计
  exchangeDetail: "/mall/milkCard/getExchangeDetail", // 我的卡包-兑换详情
  cardDetail: "/mall/milkCard/getMilkCardInfo/", // 奶卡详情
  giveMilkCard: "/mall/milkCard/giveMilkCard", // 赠送 奶卡
  getMilkCard: "/mall/milkCard/getMilkCard/", //领取 奶卡
  milkProductCalc: "/mall/order/v5/calculateAmountByAddress", //奶卡商品兑换确认
  exchangeMilkCardOrder: "/mall/order/exchangeMilkCardOrder", //兑换确认
  orderDetail: "/mall/order/milkOrderDetail/", // 奶卡订单详情
  // fc07
  milkCoupon: "/mall/coupon/milkCoupon", //查询奶卡优惠券
  grantMilkCoupon: "/mall/coupon/grantMilkCoupon", //一键领取奶卡优惠券
  getGiftsByOrderNo: "/mall/milkCard/getGiftsByOrderNo", //根据订单查询该奶卡是否有赠品
  selectMilkCardsList: "/mall/order/postSale/milkCardRecord", //申请退款-选择奶卡
  // 拒收
  milkCardReject: "/mall/milkCard/reject/", //拒收奶卡
  // 赠送失败
  milkCardGiveFail: "/mall/milkCard/giveFail/", //拒收奶卡
  checkMilkCardStatus: "/mall/order/postSale/milkCard", //赠送或兑换奶卡前校验奶卡售后状态
  // 奶卡海报fc11
  wool: "/mall/api/v1/qrCode/base64/milkCard/wool/", //获取奶卡海报
};
// 购物车
export const shopCar = {
  // 新增编辑
  shoppingCart: "/mall/shoppingCart",

  shoppingCartInsert: "/mall/shoppingCart/insert",
  // 清空
  deleteByMemberNo: "/mall/shoppingCart/deleteByMemberNo",
  // 分页
  shoppingCartPage: "/mall/shoppingCart/page",
  //根据会员编号统计购物车数量
  selectShoppingCartNumber: "/mall/shoppingCart/selectShoppingCartAmount",
  // 去结算查商品
  selectList: "/mall/shoppingCart/selectList",
  // 是否全选
  isCheckAll: "/mall/shoppingCart/isCheckAll",
  // 删除商品
  deleteById: "/mall/shoppingCart/deleteById",
};
/* 评价 */
export const evaluate = {
  //查询评价
  selectEvaluate: "/mall/evaluate/selectEvaluate", //查询评价
  //评价配置查询
  selectEvaluateConfig: "/mall/evaluate/selectEvaluateConfig", //评价配置查询
  //新增评价
  insertEvaluate: "/mall/evaluate/insertEvaluate", //新增评价
};
//会员fc09
export const memberUrl = {
  memberInfo: "/mall/member/infoV2", //获取会员信息，包含成长值、积分和等级
  growth: "/mall/member/growth/detail", //查询成长值明细列表
  integral: "/mall/member/integral/detail", //查询积分明细列表
  levelRightList: "/mall/member/levelRightList", //查询会员等级权益列表
  levelRightAllList: "/mall/member/levelRightAllList", //返回所有等级和等级权益
  banner: "/mall/member/banner", //会员中心banner
  levelDesc: "/mall/member/levelDesc", //会员规则
  benefit: "/mall/member/benefit", //权益详情
  couponByAcquire: "/mall/promotion/couponByAcquireType", //根据优惠券获得方式查询优惠券
  usePoint: "/mall/promotion/usePointGetCoupon", //积分兑券
  transactionTask: "/mall/member/transactionTask", //C端会员详情--交易任务
  checkMemberGrantCoupon: "/mall/promotion/checkMemberGrantCoupon", //检查客户是否存在未发放的计划
  isBrithday: "/mall/member/isGainBirthdayCoupon", //生日礼赠--查询会员今年有没有领过生日礼赠的优惠券
};
// 鲜活日历-连续停
export const calendarFC09 = {
  stopLong: "/mall/delivery/continuity/stop", // 配送日历连续停定/恢复
  stopPoint: "/mall/delivery/interval/stop", //配送日历单点停定/恢复
};
// 店铺优惠券
export const shopCoupons = {
  // 获取店铺首页优惠券列表
  getShopCouponList: "/mall/promotion/getCouponListByShopConfigId",
  // 商品详情获取优惠券列表
  getShopCouponListDetail: "/mall/promotion/getCouponStrategyBySpuCode",
  // 我的券包-去使用查门店
  getApplyShopBySpuCode: "/mall/support/shop_store/getApplyShopBySpuCode",
  // 门店首页查券
  getCouponStrategyBySpuCodeForShopIndex:
    "/mall/promotion/getCouponStrategyBySpuCodeForShopIndex",
};
// fc10-长停恢复-订奶计划
export const strategyFC10 = {
  getDefaultParams: "/mall/long/stop/getDefaultParams", //获取默认履约账户编码和收货地址编码
  selectPage: "/mall/long/stop/selectPage", //分页查询长停恢复策略
  selectOrderSuspendListByPlan: "/mall/long/stop/selectOrderSuspendListByPlan", //根据计划查询受影响的订单
  selectOrderSuspendList: "/mall/long/stop/selectOrderSuspendList", //当前账户下挂起订单平台单号
  orderDetail: "/mall/long/stop/orderDetail", //订单详情
  recovery: "/mall/delivery/plan/recovery", // 履约计划恢复
  selectSupplyInfo: "/mall/delivery/plan/selectSupplyInfo", //获取供应链提前期
  selectSuspendAccountByMember: "/mall/long/stop/selectSuspendAccountByMember", //查询当前用户挂起账户编码
};
export default urlapi;
