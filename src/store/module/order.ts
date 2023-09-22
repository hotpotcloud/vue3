/*
 * @Date: 2022-09-07 17:06:25
 * @LastEditors: ''
 * @LastEditTime: 2022-09-14 14:02:46
 * @FilePath: \xianhuo-miniprogram\src\store\module\order.ts
 */
// 物流
import api from "@/utils/api";
import urlapi, { order, shop } from "@/utils/url";
import { formatTime, getNowMonth } from "@/utils/utils";
import { OrderParams } from "../types";
import { ruleTypeEnum, ruleTypeName } from "@/utils/enum";
import { Global_Cog } from "@/utils/config";
export default {
  namespaced: true,
  state: {
    goodsMsg: {
      arr: [], //物流信息
      info: {},
      status: "",
      statusarr: {}, //所有信息
    },
    // 下单前数据
    orderPlanData: {},
    //请求下单前数据参数
    orderPar: {
      goodsCode: "", //商品编码*
      goodsQty: "", //商品购买数量*
      unitPrice: "", //商品单价*
      secKillCode: "", //秒杀编码
      addressNo: "", //地址编码
      couponCode: "", //优惠券编码
      deliveryPlanCode: "", //配送计划编码
      deliveryStartDate: "", //开始配送时间
      timeSection: "", //配送时间段
      defaultCouponCodeFlag: true, //是否默认优惠券fc10
    },
    resData: {},
    orderUrl: false, //是否走下单页跳转进去
    showChange: true, //显示变化
    //fc05
    orderDateParams: {
      //查询日历参数
      date: "", //查询日期yyyy-mm
      orderNo: "", //订单编号
      currentDate: "", //当前日期yyyy/mm/dd
    },
    dateList: [], //日历数据
    orderDateInfo: {}, //配送日历头部
    histroyList: [], //履约单信息更改记录
    /////////////////////////////////商品详情
    shopGoodsInfo: {}, //商品信息
    shopOrderGoodsInfo: [], //下单信息
    // 门店订单信息
    shopOrderDetail: {},
    shopDetail: {},
    /// 库存不足时候
    placeOrderInfo: {
      remainStock: 0,
      goodsCode: "",
    },
    //------- fc07------
    dateParams: {}, //日历参数
    accountList: [], // 履约账户list
    orderCalendarList: [], //配送日历
    orderGoodsList: [], //履约商品信息
    shopCouponList: [],
    senderList: [], //送奶员信息
  },
  getters: {},

  mutations: {
    //是否显示变化
    V_setShowChange(state: any, payload: boolean) {
      state.showChange = payload;
    },
    //控制是否走下单页进入配送计划
    V_setOrderUrl(state: any, payload: boolean) {
      state.orderUrl = payload;
    },
    //商品信息
    V_setGoodsMsg(state: any, payload: any) {
      console.log("payload", payload);
      state.goodsMsg.statusarr = payload.status;
      state.goodsMsg.info = payload.info;
    },
    //物流信息
    V_setInfo(state: any, payload: any) {
      state.goodsMsg.arr = payload;
    },
    //下单数据
    V_setOrderPlanData(state: any, payload: any) {
      state.orderPlanData = { ...state.orderPlanData, ...payload };
    },
    //修改下单请求参数
    V_setorderPar(state: any, payload: any) {
      state.orderPar = { ...state.orderPar, ...payload };
    },
    V_setRes(state: any, payload: any) {
      state.resData = payload;
    },
    // fc05
    // 配送日历参数
    v_setOrderDate(state: any, payload: any) {
      state.orderDateParams = { ...state.orderDateParams, ...payload };
    },
    // 配送日历数据
    v_setOrderDateList(state: any, payload: any) {
      state.dateList = payload;
    },
    v_setOrderDateInfo(state: any, payload: any) {
      state.orderDateInfo = payload;
    },
    // 履约单信息更改记录
    v_setHistroyList(state: any, payload: any) {
      state.histroyList = payload;
    },
    // -----fc07
    setDateParams(state: any, payload: any) {
      state.dateParams = { ...state.dateParams, ...payload };
    },
    setAccountList(state: any, payload: any) {
      state.accountList = payload;
      // state.accountList = [...payload, ...payload];
    },
    setOrderCalendar(state: any, payload: any) {
      state.orderCalendarList = payload;
    },
    setOrderGoodsList(state: any, payload: any) {
      state.orderGoodsList = payload;
    },
    //门店 /////////////////////////////////////////////////////
    setShopGoodsInfo(state: any, payload: any) {
      return (state.shopGoodsInfo = payload);
    },
    setShopOrderGoodsInfo(state: any, payload: any) {
      console.log(state, "000", payload);
      return (state.shopOrderGoodsInfo = [...payload]);
    },
    clearShopOrderInfo(state) {
      state.orderInfo = {};
    },
    v_setShopOrderDetail(state: any, payload: any) {
      return (state.shopOrderDetail = payload);
    },
    v_setShopDetail(state: any, payload: any) {
      return (state.shopDetail = payload);
    },
    v_setPlaceOrderInfo(state: any, payload: any) {
      console.log("更新素具");
      return (state.placeOrderInfo = payload);
    },
    v_setShopCoupon(state: any, payload: any) {
      return (state.shopCouponList = payload);
    },
    setSenderList(state: any, payload: any) {
      state.senderList = payload;
    },
  },
  actions: {
    async X_getGoodsMsg({ commit }, orderNo: string) {
      try {
        // commit('V_setInfo', [])
        let arrs: any[] = [];
        const { data }: any = await api.$get(order.sendorder + orderNo);
        if (data.length) {
          // console.log(' 禁区前-》》--11111', data)
          commit("V_setInfo", data);

          arrs = data.map((item) => {
            if (item.deliverDetails.length) {
              item.deliverDetails = item.deliverDetails.map((el: any) => {
                el.times = formatTime("YYYY-mm-dd HH:MM:SS", el.acceptTime);
                return el;
              });
            }
            return item;
          });
        } else {
          arrs = [];
        }
        console.log("arr321", arrs);
        commit("V_setInfo", arrs);
      } catch (error) {}
    },
    //下单前请求数据
    async X_getOrderPlanData(
      { commit, state, rootState, dispatch },
      payload?: OrderParams
    ) {
      try {
        //详情数据
        const proInfo = rootState.product.productinfo;
        console.log("proInfo-->下单数据planCode", rootState.plan.planCode);
        const params: OrderParams = {
          defaultCouponCodeFlag: false, // 是否默认优惠券
          ...state.orderPar,
          ...payload,
        };
        const { data }: any = await api.$post(
          proInfo.flag ? urlapi.order.secKillCalc : urlapi.order.calculate,
          params
        );
        console.log("data计算价格请求", data);
        // if (data.deliveryChange) {
        //     uni.showToast({
        //         title: "商品配送时间发生变化",
        //         icon: "none",
        //         duration: 2000,
        //     });
        // }
        // //更新计划
        // commit(
        //   "plan/V_setAsyncPlanInfo",
        //   data.deliveryPlanResp ? data.deliveryPlanResp : {},
        //   { root: true }
        // );
        //有配送计划
        if (data.deliveryPlanResp && data.deliveryPlanCode) {
          const { deliveryPlanResp, deliveryPlanCode } = data;
          commit("V_setorderPar", { deliveryPlanCode }); //记录配送计划编号
          //更新计划
          commit("plan/V_setAsyncPlanInfo", data.deliveryPlanResp, {
            root: true,
          });
          //自动修改配送数量
          if (+params.goodsQty < data.deliveryPlanResp.everyNum) {
            deliveryPlanResp.everyNum = +params.goodsQty;
            commit("plan/V_setAsyncPlanInfo", deliveryPlanResp, {
              root: true,
            });
            dispatch("plan/V_putAddPlan", true, { root: true });
          }

          // 更新修改参数
          commit(
            "plan/V_setPrarms",
            {
              defaulted: deliveryPlanResp.defaulted, //是否默认：0-否，1-是
              deliveryDetails: deliveryPlanResp.deliveryDetails, //配送详情
              everyNum: deliveryPlanResp.everyNum, //单次配送数量
              intervalDate: deliveryPlanResp.intervalDate, //间隔天数
              // planName: '测试计划123',//计划名称
              planRuleNo: deliveryPlanResp.planRuleNo, //配送计划规律编码
              receiverNo: deliveryPlanResp.receiverNo, //收货地址编码
              ruleType: deliveryPlanResp.ruleType, //配送规律-枚举
              timeSection: deliveryPlanResp.timeSection, //配送时间段-枚举
            },
            { root: true }
          );
        } else {
          //没有配送计划-默认选中部分
          const obj = {
            ruleType: ruleTypeEnum.EVERY_DAYS,
            ruleTypeName: ruleTypeName.EVERY_DAYS,
            everyNum: 1,
          };
          commit("plan/V_setAsyncPlanInfo", obj, {
            root: true,
          });
        }
        commit("V_setOrderPlanData", data);
        // if (data.deliveryPlanResp) {
        // }
        //设置配送计划编码
        // if (data.deliveryPlanCode) {
        //   commit("V_setorderPar", { deliveryPlanCode: data.deliveryPlanCode });
        // }
      } catch (error) {
        console.log("error--2023921", error);
      }
    }, //下单前请求数据 门店
    async X_getOrderPlanStoreData(
      { commit, state, rootState, dispatch },
      payload?: OrderParams[]
    ) {
      try {
        //详情数据
        const proInfo = rootState.product.productinfo;
        console.log("proInfo-->下单数据planCode", rootState.plan.planCode);
        console.log(state, "state");
        let params: OrderParams[] = [
          ...state.shopOrderGoodsInfo,
          // ...{
          //   goodsCode: "XHK630362", //商品编码*
          //   goodsQty: 1, //商品购买数量*
          //   unitPrice: 1280, //商品单价*
          // },
          ...(payload || []),
        ];
        // params = params.map((item) => {
        //   item.goodsQty = 100;
        //   return item;
        // });
        const url =
          state.shopCouponList.length === 0
            ? ""
            : `?coupons=${state.shopCouponList.join(",")}`;
        const { data }: any = await api.$post(
          proInfo.flag
            ? urlapi.order.secKillCalc
            : `${urlapi.order.calculateAmountByShopCar}${url}`,
          params
        );
        console.log("data计算价格请求", data);
        commit("V_setOrderPlanData", data);
        //设置配送计划编码
        if (data.deliveryPlanCode) {
          commit("V_setorderPar", { deliveryPlanCode: data.deliveryPlanCode });
        }
      } catch (error) {
        console.log(error, "err");
        //
      }
    },
    // 支付
    async X_getOrderCreate({ commit, rootState, state }, payload?: any) {
      try {
        // 创建订单
        console.log("创建订单->state.orderPlanData", payload);
        const proInfo = rootState.product.productinfo;
        const { data }: any = await api.$post(
          proInfo.flag ? urlapi.order.seckillCreate : urlapi.order.createOrder,
          payload
        );
        console.log("data-支付", data);
        commit("V_setRes", data);
      } catch (error) {
        console.log("error--支付错误信息", error);
        return error;
        // reject (error)
        // uni.showToast({
        //     title: error.msg
        // })
      }
    },
    // 门店
    async X_getOrderShopCreate({ commit, rootState, state }, payload?: any) {
      try {
        // 创建订单
        console.log("创建订单->state.orderPlanData", payload);
        const proInfo = rootState.product.productinfo;
        const { data }: any = await api.$post(
          proInfo.flag ? urlapi.order.seckillCreate : shop.createStoreOrder,
          payload
        );
        console.log("data-支付", data);
        commit("V_setRes", data);
      } catch (error) {
        throw error;
      }
    },
    //订单配送日历FC05
    async getOrderDate({ commit, state, dispatch }, payload: any) {
      try {
        // 当前时间
        const now = getNowMonth();
        // const { endDate, orderNo, startDate } = payload;
        if (!state.orderDateParams.date) {
          commit("v_setOrderDate", { date: now });
        }
        const par = {
          date: state.orderDateParams.date,
          orderNo: state.orderDateParams.orderNo,
        };
        dispatch("getOrderDateInfo", par.orderNo);
        const { data }: any = await api.$post(order.selectCalender, par);
        console.log("data", data);
        commit("v_setOrderDateList", data);
      } catch (error) {
        //
      }
    },
    //日历头部配送信息
    async getOrderDateInfo({ commit }, payload: string) {
      try {
        const { data }: any = await api.$post(
          order.selectCalenderInfo + payload,
          {}
        );
        console.log("data--日历头部配送信息", data);
        commit("v_setOrderDateInfo", data);
      } catch (error) {
        //
      }
    },
    // 协商记录
    async getOrderHistroy({ commit }, payload: string) {
      try {
        const { data }: any = await api.$get(order.platHistory + payload);
        console.log("data--履约单记录", data);
        commit("v_setHistroyList", data);
        // commit("v_setHistroyList", arr);
      } catch (error) {
        //
      }
    },
    // 门店order信息
    async getShopOrderDetail(
      { commit, dispatch },
      payload: { orderNo: string }
    ) {
      try {
        const { data }: any = await api.$get(
          order.selectOrderItemStoresByOrderNo + `?orderNo=${payload.orderNo}`
        );
        commit("v_setShopOrderDetail", data);
        dispatch("getShopDetail", { shopConfigId: data.shopConfigId });
      } catch (error) {
        //
      }
    },
    async getShopDetail(
      { commit, rootState },
      payload: { shopConfigId: string }
    ) {
      try {
        console.log(rootState, "rootState");
        const { user, home } = rootState;
        const { data }: any = await api.$get(shop.getShopStoreById, {
          appId: Global_Cog.APPID,
          latitude: home.addInfoMsg.latitude,
          longitude: home.addInfoMsg.longitude,
          shopConfigId: payload.shopConfigId,
        });
        commit("v_setShopDetail", data);
      } catch (error) {
        //
        console.log(error);
      }
    },

    // fc07配送日历
    // 1.查询履约账户
    async getOrderAccount({ commit, state }, payload: string) {
      // try {
      const par = {
        orderNo: payload ? payload : state.dateParams.orderNo,
      };
      console.log("payload", payload);
      const { data }: any = await api.$get(order.stationAccountNo, par);
      console.log("data--履约账户", data);
      commit("setAccountList", data);
      commit("setDateParams", {
        ...state.dateParams,
        stationAccountNo: data[0].stationAccountNo,
      });
      // } catch (error) {}
    },
    // 2.查询履约日历
    async getOrderCalendar({ commit, state }, payload: any) {
      // try {
      const par = {
        stationAccountNo: state.dateParams.stationAccountNo,
        date: state.dateParams.date,
        orderNo: state.dateParams.orderNo,
        ...payload,
      };
      const { data }: any = await api.$post(
        order.selectCalender,
        par,
        "加载中..."
      );
      // console.log("data", data);

      commit("setOrderCalendar", data);
      // } catch (error) {
      //   //
      // }
    },
    //3.履约商品列表
    async getOrderGoodsList({ commit, state }, payload: any) {
      // try {
      const par = {
        date: state.dateParams.date,
        orderNo: state.dateParams.orderNo,
        stationAccountNo: state.dateParams.stationAccountNo,
        ...payload,
      };
      const { data }: any = await api.$post(order.selectDeliveryItemList, par);
      console.log("data", data);
      commit("setOrderGoodsList", data);
      // } catch (error) {
      //   //
      // }
    },
    // 查询送奶员fc10
    async getSenderDelivery({ commit, state }, payload: any) {
      // addressNo 地址编码payload
      const par = {
        // addressNo: payload.addressNo,
        orderNo: state.dateParams.orderNo,
        stationAccountNo: state.dateParams.stationAccountNo,
        ...payload,
      };
      const { data }: any = await api.$post(order.milkSenderInfo, par);
      console.log("data", data);
      commit("setSenderList", data);
    },
  },
};
