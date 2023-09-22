interface GetMonthType {
  calendarValue?: string;
  startDate?: string;
  addressNo?: string; //履约地址编码
}
interface ParamsType extends GetMonthType {
  satoken: string;
}
interface ResType {
  addressDetail: string;
  addressNo: string;
  calenderList: any;
}
import api from "@/utils/api";
import {
  AppraiseTypeEnum,
  CalendarValueEnum,
  TWORuleEnum,
  timeSectionEnum,
} from "@/utils/enum";
import urlapi, { evaluate, calendarFC09 } from "@/utils/url";
import { formatTime } from "@/utils/utils";
import { CalenderEnum, currentCalendarType, StopType } from "../types";

export default {
  namespaced: true,

  state: {
    //日历请求参数
    curParams: {
      calendarValue: CalendarValueEnum.WEEK, // WEEK||YEAR,日历模式
      startDate: formatTime("YYYY-mm-dd"), //展示日期-当前选中日期
      stationAccountNo: "", //履约账户编码
    },
    //配送日历参数
    sendParams: {
      page: 1,
      size: 10,
      channelSkuCode: "商品code",
      stationAccountNo: "履编码",
      type: CalenderEnum.AFTER, //默认从当前月开始查询
    },
    //配送计划日历数据
    sendInfo: {},
    //日历显示
    off: false,
    //日历数据
    calendarList: {},
    //调整日历数据
    resizeDateList: {},
    //当前收货地址列表
    homeList: [],
    // 日计划履约汇总
    selectDetailGoods: {},

    //停送起送
    stopPar: {
      milkStationNo: "",
      stationAccountNo: "",
      status: "",
      date: "",
    },
    // 日历组件数据
    // 当天数据
    curChooseDate: {},
    showNone: false, //显示
    // 待配
    sendQty: {},
    //查询评价参数
    evaluateParams: {},
    //查询到的评价数据
    evaluateList: [],
    // 评价列表缓存
    evaluateListCache: {
      [timeSectionEnum.FORENOON]: {},
      [timeSectionEnum.AFTERNOON]: {},
    },
    // 配送员评价配置
    messageConfig: [],
    //商品评价配置
    goodsConfig: [],
  },
  getters: {
    // 当前显示商品信息
    C_calcDateList(state: any) {
      const arr = [];
      state.calendarList.calenderList &&
        state.calendarList.calenderList.forEach((el: any) => {
          if (el.date === state.curParams.startDate) {
            const day = +el.date.split("-")[2];
            // console.log('day----}}}}--vuex>', day)
            // WAIT_DELIVERY-待配送;DELIVERING-配送中;DISCONTINUED-已停定;FINISHED-已完成
            if (el.goodsList.length) {
              el.goodsList.forEach((item: any) => {
                const text = {
                  // WAIT_DELIVERY: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品当日等待配送</p>`,
                  // DELIVERING: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品正在配送中</p>`,
                  // DISCONTINUED: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品当日停止配送</p>`,
                  // FINISHED: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品已完成配送</p>`,
                  WAIT_DELIVERY: "件商品当日等待配送",
                  DELIVERING: "件商品正在配送中",
                  DISCONTINUED: "件商品当日停止配送",
                  FINISHED: "件商品已完成配送",
                  WAIT_COMMENT: "件商品已送达",
                  CANCELLED: "件商品已拒收",
                };
                item.text = text[item.deliveryCalendarStatus];
              });
            }
            arr.push(el);
          }
        });
      // console.log('arr-->显示数据---》首页',arr)
      return arr;
    },
    C_calcDateList2(state: any) {
      const arr = [];
      state.calendarList.calenderList &&
        state.calendarList.calenderList.forEach((el: any) => {
          if (el.date === state.curParams.startDate) {
            const day = +el.date.split("-")[2];
            // console.log('day----}}}}--vuex>', day)
            // WAIT_DELIVERY-待配送;DELIVERING-配送中;DISCONTINUED-已停定;FINISHED-已完成，WAIT_COMMENT-待评价
            if (el.goodsList.length) {
              el.goodsList.forEach((item: any) => {
                const text = {
                  WAIT_DELIVERY: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品当日等待配送</p>`,
                  DELIVERING: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品正在配送中</p>`,
                  DISCONTINUED: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品当日停止配送</p>`,
                  FINISHED: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品已完成配送</p>`,
                  WAIT_COMMENT: `<p style='color:#999999;font-size:24rpx'>共<span style='color: #1d9bdc'>${item.qty}</span>件商品已送达</p>`,
                };
                item.text = text[item.deliveryCalendarStatus];
              });
            }
            arr.push(el);
          }
        });
      // console.log('arr-->显示数据---》首页',arr)
      return arr;
    },
  },

  mutations: {
    // 退出登录清空
    setEmptyNull(state: any, payload: boolean) {
      if (payload) {
        console.log("payload-清空", payload);
        // state.curParams = {};
        state.sendInfo = {};
        state.sendQty = {};
        state.curChooseDate = {};
        state.selectDetailGoods = {};
        state.calendarList = {};
        state.sendInfo = {};
        state.resizeDateList = {};
      }
    },
    setSendQty(state: any, payload: any) {
      state.sendQty = payload;
    },
    //修改日历请求参数
    V_setCurParams(state: any, payload: any) {
      state.curParams = { ...state.curParams, ...payload };
    },
    //控制日历开关
    V_setOff(state: any, value: boolean) {
      state.off = value;
    },
    //更新日历数据
    V_setCalendarList(state: any, value: any) {
      state.calendarList = value;
    },
    //更新履约收货地址
    V_setHomeList(state: any, value: any) {
      state.homeList = value;
    },
    //鲜活日记日计划
    V_setselectDetailGoods(state: any, value: any) {
      state.selectDetailGoods = value;
    },
    V_setShowNone(state: any, value: boolean) {
      state.showNone = value;
    },
    //修改查看配送日历参数
    V_setsendParams(state: any, value: any) {
      state.sendParams = {
        ...state.sendParams,
        ...value,
      };
    },
    V_setSendCalender(state: any, payload: any) {
      state.sendInfo = payload;
    },
    //修改停送起送参数
    V_setStopPar(state: any, payload: any) {
      state.stopPar = { ...state.stopPar, ...payload };
    },
    //点击存入当天显示数据
    V_setcurChooseDate(state: any, payload: any) {
      state.curChooseDate = payload;
    },
    //调整日记页面数据
    V_setResizeDate(state: any, payload: any) {
      state.resizeDateList = payload;
    },
    //查询评价参数
    setEvaluateParams(state: any, payload: any) {
      state.evaluateParams = payload;
    },
    // 查询评价
    setEvaluateList(state: any, payload: any) {
      console.log("payload2", payload);
      state.evaluateList = payload;
    },
    // 缓存评价数据
    setEvaluateListCache(state: any, payload: any) {
      console.log("payload1", payload);
      state.evaluateListCache = { ...state.evaluateListCache, ...payload };
    },
    // 清空缓存
    setEmptyListCache(state: any) {
      state.evaluateListCache = {};
    },
    // 查询配送员评价配置
    setMessageConfig(state: any, payload: any) {
      state.messageConfig = payload;
    },
    // 查商品评价配置

    setGoodsConfig(state: any, payload: any) {
      state.goodsConfig = payload;
    },
  },

  actions: {
    //调整日记页面查询
    async X_getResizeDate({ state, commit }, payload?: any) {
      try {
        const par = {
          calendarValue: CalendarValueEnum.MONTH,
          startDate: formatTime("YYYY-mm-dd"),
          stationAccountNo: state.curParams.stationAccountNo,
          ...payload,
        };
        const { data }: any = await api.$post(
          urlapi.home.freshDiaryMonthByNo,
          par,
          " ",
          true
        );
        // console.log("data调整计划", data);
        commit("V_setResizeDate", data);
      } catch (error) {}
    },

    // 鲜活日记周/月数据查询
    async X_getMonthWeek({ rootState, commit, state }, value?: GetMonthType) {
      try {
        // const satoken = rootState.user.malltoken
        const satoken = uni.getStorageSync("malltoken");
        //未登录
        if (!satoken) return commit("V_setOff", false);
        else {
          const par: ParamsType = {
            ...state.curParams,
            ...value,
            // satoken,
          };
          const { data }: any = await api.$post(
            urlapi.home.freshDiaryByNo,
            par
          );
          commit("V_setCalendarList", data);
          commit("V_setCurParams", { stationAccountNo: data.stationAccountNo });
          commit("V_setOff", data?.stationAccountNo ? true : false);
          // console.log('data日历鲜活日记请求', data)
        }
      } catch (error) {}
    },
    //选择履约收货地址
    async X_getSelectListByAddressNo({ state, commit }, value?: string) {
      try {
        const par = {
          addressNo: value || state.calendarList.stationAccountNo,
        };
        const { data }: any = await api.$get(urlapi.home.keepAddress, par);
        commit("V_setHomeList", data);
      } catch (error) {
        //
      }
    },
    //通过日期和履约账户编码查询汇总日计划数据
    async X_getSelectDetailGoods({ state, commit, rootState }, payload?: any) {
      try {
        const params = {
          date: state.curParams.startDate,
          stationAccountNo: state.curParams.stationAccountNo,
          ...payload,
          // satoken: rootState.user.token,
        };
        const { data }: any = await api.$get(
          urlapi.home.selectByDateAndNo,
          params
        );
        commit("V_setselectDetailGoods", data);
        const {
          deliveringList,
          waitDeliveryList,
          discontinuedList,
          finishedList,
          waitCommentList,
          cancelList,
        } = data;
        //优化这段代码
        console.log("data", data);
        if (
          deliveringList?.length > 0 ||
          waitDeliveryList?.length > 0 ||
          discontinuedList?.length > 0 ||
          finishedList?.length > 0 ||
          waitCommentList?.length > 0 ||
          cancelList?.length > 0
        )
          commit("V_setShowNone", true);
        else commit("V_setShowNone", false);
        console.log("state.showNone", state.showNone);
        // if (deliveringList && deliveringList.length) {
        //   commit("V_setShowNone", true);
        // } else if (waitDeliveryList && waitDeliveryList.length) {
        //   commit("V_setShowNone", true);
        // } else if (discontinuedList && discontinuedList.length) {
        //   commit("V_setShowNone", true);
        // } else if (finishedList && finishedList.length) {
        //   commit("V_setShowNone", true);
        // }

        //更新履约账户编码
        commit("V_setCurParams", {
          stationAccountNo: data.stationAccountNo,
        });
        commit("V_setsendParams", {
          stationAccountNo: data.stationAccountNo,
        });
        console.log("data-->日计划汇总", data);
      } catch (error) {}
    },
    // 查询履约账户配送日历--修改计划
    async X_getmonthCalendar({ state, commit, rootState }, payload?: any) {
      try {
        const par = {
          date: state.curParams.startDate,
          stationAccountNo: state.curParams.stationAccountNo,
          satoken: rootState.user.malltoken,
        };
        const { data }: any = await api.$get(urlapi.home.monthCalendar, par);
        console.log("data", data);
      } catch (error) {}
    },
    /**
     *
     * 查询当前商品配送日历
     * @param payload:currentCalendarType
     */
    async X_getCurrentCalendar({ state, commit }) {
      try {
        const { data }: any = await api.$post(
          urlapi.home.currentCalendar,
          state.sendParams
        );
        console.log("data配送日历", data);
        commit("V_setSendCalender", data);
      } catch (error) {}
    },
    async X_postStopOrStart({ state, commit, dispatch }, payload?: StopType) {
      try {
        const par = {
          ...state.stopPar,
          stationAccountNo: state.calendarList.stationAccountNo,
          milkStationNo: state.calendarList.milkStationNo,
          ...payload,
        };
        console.log("par--vuex--参数", par);
        const { data }: any = await api.$post(urlapi.home.stopOrStart, par);
        uni.showToast({
          title: "操作成功",
          icon: "none",
          duration: 1000,
          success: () => {
            //   this.init();
            dispatch("X_getResizeDate", { startDate: par.date });
          },
        });
        console.log("data", data);
      } catch (err) {
        console.log("err停送失败", err);
        dispatch("X_getResizeDate", { startDate: state.stopPar.date });
      }
    },
    // 待配已配停送
    async getSendQty({ commit, state }, payload: any) {
      try {
        const par = {
          stationAccountNo: state.curParams.stationAccountNo,
          ...payload,
        };
        const { data }: any = await api.$get(urlapi.home.countQty, par);
        console.log("data", data);
        commit("setSendQty", data);
      } catch (error) {}
    },
    /* ---fc08-评价--- */
    /* 查询评价 */
    async postMessage({ commit, state }, payload: any) {
      const par = {
        milkStationNo: state.calendarList?.milkStationNo,
        deliveryOrderNos: state.evaluateParams?.deliveryOrderNos,
        ...payload,
      };
      const { data }: any = await api.$post(evaluate.selectEvaluate, par);
      commit("setEvaluateList", data);
      // 缓存
      const obj = {};
      for (let i = 0; i < data.length; i++) {
        obj[data[i].timeSection] = data[i];
      }
      commit("setEvaluateListCache", obj);
    },
    /* 查询评价配置 */
    async postMessageConfig({ commit, state }, payload: any) {
      // GOODS_APPRAISE, DELIVERY_APPRAISE
      const par = {
        appraiseType:
          payload.appraiseType || AppraiseTypeEnum.DELIVERY_APPRAISE,
        deliveryScore: payload.deliveryScore,
      };
      const { data }: any = await api.$post(evaluate.selectEvaluateConfig, par);
      console.log("data", data);
      if (par.appraiseType === AppraiseTypeEnum.DELIVERY_APPRAISE) {
        commit("setMessageConfig", data);
      } else if (par.appraiseType === AppraiseTypeEnum.GOODS_APPRAISE) {
        commit("setGoodsConfig", data);
      }
    },
    /* 新增评价 */
    async postAddMessage({ commit, dispatch, state }, payload: any) {
      // const par = {
      //   ...payload,
      // };
      const { data }: any = await api.$post(
        evaluate.insertEvaluate,
        payload,
        "提交中...",
        true
      );
      console.log("data", data);
      // 更新评价
      // dispatch("postMessage");
    },
    /* ---fc08-end-评价👆 */

    // 连续停fc09
    async postStopLong({ commit, state, dispatch }, payload: any) {
      const par = {
        accountNo: state.calendarList.stationAccountNo,
        milkStationNo: state.calendarList.milkStationNo,
        ...payload,
      };
      const { data }: any = await api.$post(
        calendarFC09.stopLong,
        par,
        "提交中...",
        true
      );
      uni.showToast({
        title: "操作成功",
        icon: "none",
        duration: 1000,
        mask: true,
      });

      console.log("data-连续停", data);
    },
    // 单点停fc09
    async postStopPoint({ commit, state, dispatch }, payload: any) {
      const par = {
        accountNo: state.calendarList.stationAccountNo,
        milkStationNo: state.calendarList.milkStationNo,
        ...payload,
      };
      console.log("par", par);
      const { data }: any = await api.$post(
        calendarFC09.stopPoint,
        par,
        "提交中...",
        true
      );
      uni.showToast({
        title: "操作成功2",
        icon: "none",
        duration: 1000,
        mask: true,
      });
    },
  },
};
