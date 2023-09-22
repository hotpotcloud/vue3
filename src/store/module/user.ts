/*
 * @Date: 2022-08-10 16:51:27
 * @LastEditors: ''
 * @LastEditTime: 2022-08-11 09:57:50
 * @FilePath: \xianhuo-miniprogram\src\store\module\user.ts
 */
import api from "@/utils/api";
import { getUser } from "@/utils/url";
import { Global_Cog } from "@/utils/config";
import urlapi, { pay, payAfter } from "@/utils/url";
import { formatAmount } from "@/utils/utils";
import {
  CalenderType,
  calenderTypes,
  payChannelEnum,
  PayTypeEnum,
} from "../types";
import { wxLogin } from "@/utils/utils";
export default {
  namespaced: true,
  state: {
    // 朔源
    channel: "",
    //登录状态
    loginStatus: false,
    //malltoken
    malltoken: null,
    //用户头像昵称
    userInfo: {},
    // 更新
    newUser: {},
    // 日历modal显示一次
    showDateModal: true,
    currentWallet: [], //当前账单信息
    walletDetail: {}, //账单详情
    walletHistory: {}, //历史账单
    walletRes: {}, //账单支付结果
    //udesk
    udesk_info_str: {
      cellphones: [],
    }, //udesk参数
    //------先饮后付------
    payAfterRes: {}, //账单内容
    payAfterGoods: [], //商品列表
    payAfterGoodsPage: 1, //商品列表页码
    receiptList: [], //账单列表
    receiptAll: {}, //账单总额
    historyReceiptList: [], //历史账单列表
    receiptDetails: {}, //账单详情
    source: payChannelEnum.BILL_PAYMENT, //账单来源
    calenderParams: {
      page: 1,
      size: 10,
      queryHistory: 0, //是否查询历史 0-否 1-是
    }, //查询日历参数
    calenderList: {}, //日历列表信息
  },
  getters: {
    //先饮后付-账单状态
    calc_PayStatus(state: any) {
      if (!state.loginStatus) return "";
      const { waitPayAmount, overtime } = state.payAfterRes;
      if (!waitPayAmount && !overtime) {
        return "";
      }
      if (waitPayAmount && !overtime) {
        return "您有账单待付款";
      }
      if (waitPayAmount && overtime) {
        return "账单已逾期，请尽快付款";
      }
    },
  },
  mutations: {
    // 溯源
    set_channel(state: any, payload: any) {
      state.channel = payload;
    },
    //进入读取
    initUser(state: { userInfo: any; loginStatus: boolean; malltoken: any }) {
      const userInfo = uni.getStorageSync("userMsg");
      if (userInfo.token) {
        // userInfo = JSON.parse(userInfo);
        state.userInfo = userInfo;
        state.loginStatus = true;
        state.malltoken = userInfo.token;
      }
    },
    //登录后 保存用户
    loginAfter(
      state: {
        userInfo: any;
        loginStatus: boolean;
        malltoken: any;
        udesk_info_str: any;
      },
      userInfo: any
    ) {
      state.userInfo = userInfo;
      if (userInfo?.token) {
        state.loginStatus = true;
        state.malltoken = userInfo?.token;
        const phone = ["", userInfo.phone];
        state.udesk_info_str["cellphones"] = JSON.stringify(phone);
      }

      // uni.setStorageSync('userInfo', JSON.stringify(userInfo));
    },
    updatedInfo(state: { newUser: any; userInfo: any }, payload: any) {
      //更新用户信息
      state.newUser = payload;
      state.userInfo.avatarUrl = payload.wxAvatarUrl;
      state.userInfo.name = payload.name;
    },
    // 更新userinfo
    set_updateUserInfo(state: { userInfo: any }, payload: any) {
      state.userInfo = payload;
    },
    //只显示一次
    X_changeShowDateModal(state: { showDateModal: boolean }, payload: any) {
      state.showDateModal = payload;
    },
    //当前账单月
    X_initWallet(state: any, payload: any) {
      state.currentWallet = payload;
    },
    //账单详情
    X_walletDetail(state: any, payload: any) {
      state.walletDetail = payload;
    },
    //历史账单
    X_walletHistory(state: any, payload: any) {
      state.walletHistory = payload;
    },
    //账单支付结果
    X_payWallet(state: any, payload: any) {
      state.walletRes = payload;
    },

    /* --------------先饮后付------------------- */
    set_payAfterRes(state: any, payload: any) {
      state.payAfterRes = payload;
    },
    set_payAfterGoods(state: any, payload: any) {
      if (payload === "clear") {
        state.payAfterGoods = [];
        return;
      }
      // state.payAfterGoods = [...state.payAfterGoods, ...payload];
      state.payAfterGoods = payload;
    },
    set_payAfterGoodsPage(state: any, payload: any) {
      state.payAfterGoodsPage = payload;
    },
    set_receiptList(state: any, payload: any) {
      console.log("payload", payload);
      state.receiptList = payload;
    },
    set_receiptALL(state: any, payload: any) {
      state.receiptAll = payload;
    },
    set_HistoryReceiptList(state: any, payload: any) {
      state.historyReceiptList = payload;
    },
    set_receiptDetail(state: any, payload: any) {
      state.receiptDetails = payload;
    },
    //设置进入来源
    set_Source(state: any, payload: any) {
      state.source = payload;
    },
    //设置日历参数
    set_calenderParams(state: any, payload: any) {
      state.calenderParams = {
        ...state.calenderParams,
        ...payload,
      };
    },
    //日历信息
    set_calenderList(state: any, payload: any) {
      state.calenderList = payload;
    },
    // 退出登录fc09
    set_loginStatus(state: any, payload: boolean) {
      if (!payload) {
        state.userInfo = null;
      }
      state.loginStatus = payload;
    },
  },
  actions: {
    //fc08版本登录
    async appLogin({ commit }, payload: any) {
      const code = await wxLogin();
      const par = {
        code,
        appId: Global_Cog.APPID,
      };
      const { data }: any = await api.$get(getUser.login, par);
      console.log("data-登录成功wxlogin", data);
      if (data.token) {
        uni.setStorageSync("malltoken", data.token);
        uni.setStorageSync("openId", data.openId);
        uni.setStorageSync("userMsg", data);
      }
      commit("loginAfter", data);
    },
    //手机号授权fc09
    async phoneLogin({ commit, state }, payload: any) {
      const { phoneIv, encryptedData } = payload;
      const { userInfo } = state;
      console.log("userInfo", userInfo);
      const par = {
        phoneIv,
        encryptedData,
        appId: Global_Cog.APPID,
        openId: userInfo?.openId,
        sessionKey: userInfo?.sessionKey,
        channel: payload?.channel,
      };
      // if (state.channel) {
      //   par["channel"] = state.channel;
      // }
      const { data }: any = await api.$post(
        getUser.register,
        par,
        "登录中...",
        true
      );
      uni.setStorageSync("userMsg", data);
      uni.setStorageSync("malltoken", data.token);
      uni.setStorageSync("companyId", data.companyId);
      commit("loginAfter", data);
      uni.showToast({
        title: "登录成功",
        icon: "success",
      });
    },
    // 实时验证
    async realTimeVerify({ commit, state }, payload: any) {
      console.log("payload", payload);
      const par = {
        phoneCode: payload.code,
        appId: Global_Cog.APPID,
        openId: state?.userInfo?.openId,
        channel: payload?.channel,
      };
      const { data }: any = await api.$post(
        getUser.realtime,
        par,
        "登录中...",
        true
      );
      console.log("data", data);
      console.log("par", par);
      uni.setStorageSync("userMsg", data);
      uni.setStorageSync("malltoken", data.token);
      uni.setStorageSync("companyId", data.companyId);
      commit("loginAfter", data);
      uni.showToast({
        title: "登录成功",
        icon: "success",
      });
    },

    // 刷新token
    async refreshToken({ state, commit }, payload: any) {
      try {
        const par = {
          token: uni.getStorageSync("malltoken"),
        };
        const { data }: any = await api.$get(getUser.refresh, payload);
        uni.removeStorageSync("malltoken");
        uni.setStorageSync("malltoken", data);
      } catch (err) {
        //
      }
    },
    // /*
    //     用户登录
    //      */
    // async getMembers({ commit, dispatch }) {
    //   try {
    //     const oldToken = uni.getStorageSync("malltoken");
    //     if (oldToken) {
    //       await dispatch("refreshToken", { token: oldToken });
    //     } else {
    //       const code = await wxLogin();
    //       const par = {
    //         code,
    //         appId: Global_Cog.APPID,
    //       };
    //       const { data }: any = await api.$get(getUser.login, par);
    //       console.log("data-登录成功", data);
    //       if (data.memberNo && !data.name) {
    //         dispatch("updateUserInfo", data.memberNo);
    //       }
    //       if (data.token) {
    //         uni.removeStorageSync("malltoken");
    //         uni.setStorageSync("malltoken", data.token);
    //         uni.setStorageSync("openId", data.openId);
    //         uni.setStorageSync("userMsg", data);
    //         commit("loginAfter", data);
    //       }
    //     }

    //     // console.log("88-----------------------------------------login", 88);
    //   } catch (error) {
    //     //
    //   }
    // },
    /* 
        用户登录
         */
    async getMembers({ commit, dispatch }) {
      try {
        const oldToken = uni.getStorageSync("malltoken");
        if (oldToken) {
          await dispatch("refreshToken", { token: oldToken });
        } else {
          const code = await wxLogin();
          const par = {
            code,
            appId: Global_Cog.APPID,
          };
          const { data }: any = await api.$get(getUser.login, par);
          console.log("data-登录成功", data);

          if (data.token) {
            uni.removeStorageSync("malltoken");
            uni.setStorageSync("malltoken", data.token);
            uni.setStorageSync("openId", data.openId);
            uni.setStorageSync("userMsg", data);
            commit("loginAfter", data);
          }
          if (data.memberNo && !data.name && data.token) {
            dispatch("updateUserInfo", data.memberNo);
          }
        }
      } catch (error) {
        //
      }
    },
    //更新用户信息
    async updateUserInfo({ commit }, payload: any) {
      try {
        const { data }: any = await api.$get(urlapi.user.member + payload);
        let upuserMsg = uni.getStorageSync("userMsg");
        upuserMsg.avatarUrl = data.wxAvatarUrl;
        upuserMsg.name = data.name;
        uni.setStorageSync("userMsg", { ...upuserMsg });
        commit("set_updateUserInfo", data);
      } catch (error) {}
      // getMemberInfo(memberId) {
      //   api
      //     .$get(this.urlapi.user.member + memberId, "加载中")
      //     .then((res) => {
      //       this.userinfo = res.data;
      //       this.updatedInfo(res.data);
      //       let upuserMsg = uni.getStorageSync("userMsg");
      //       upuserMsg.avatarUrl = res.data.wxAvatarUrl;
      //       upuserMsg.name = res.data.name;
      //       uni.setStorageSync("userMsg", upuserMsg);
      //       this.user = true;
      //     })
      //     .catch((err) => {
      //       uni.showToast({
      //         title: err.message,
      //         icon: "none",
      //         mask: true,
      //       });
      //     });
      // }
    },
    /**
     * @name 当前账单月
     * @param param0
     */
    async V_initWallet({ state, commit }) {
      try {
        commit("initUser");
        console.log("Global_Cog.APPID", state, Global_Cog.APPID);
        const par = {
          appId: Global_Cog.APPID,
          satoken: state.malltoken,
        };
        const { data }: any = await api.$get(urlapi.user.receiptCurrent, par);
        // data.money = formatAmount(data.amount)

        commit("X_initWallet", data);
        console.log("res1", state.currentWallet);
      } catch (error) {
        console.log("error", error);
      }
    },
    /**
     * @name 账单详情
     */
    async V_walletDetail({ state, commit }, receiptNo: string) {
      try {
        const par = {
          receiptNo: receiptNo,
          satoken: state.malltoken,
        };
        const { data }: any = await api.$get(urlapi.user.receiptDetail, par);
        data.money = formatAmount(data.amount);
        commit("X_walletDetail", data);
        // state.walletDetail = data
        console.log("data", data);
      } catch (error) {}
    },
    /**
     * @name 历史账单
     */
    async V_walletHistory({ state, commit }, year?: string) {
      try {
        const y = new Date().getFullYear();
        const now = year || y;
        console.log("now", now);
        const par = {
          appId: Global_Cog.APPID,
          satoken: state.malltoken,
          time: now,
        };
        const { data }: any = await api.$get(urlapi.user.receiptHistory, par);
        // if (now == 2020) return commit('X_walletHistory', {})
        commit("X_walletHistory", data);
        console.log("data-history", data);
      } catch (error) {}
    },
    /**
     * 支付账单
     */
    async V_payWallet({ state, commit }, receiptNo: string) {
      try {
        const par = {
          openId: state.userInfo.openId,
          appId: state.userInfo.appId,
          orderNo: receiptNo,
          payMethodType: 0, //固定jsapi
          type: PayTypeEnum.RECEIPT,
        };
        let provider: "alipay" | "wxpay" | "baidu" | "appleiap" = "wxpay";
        uni.getProvider({
          service: "payment",
          success: (res) => {
            console.log(res, "00000000");
            provider = res.provider[0];
          },
        });
        const { data }: any = await api.$post(pay.wechatPay, par);
        uni.requestPayment({
          provider: provider,
          orderInfo: "",
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          signType: data.signType,
          package: data.packageValue,
          paySign: data.paySign,
          success: (res) => {
            console.log("res-支付成功", res);
            uni.redirectTo({
              url: "/subPages/user/walletres",
            });
          },
          fail: () => {
            console.log("支付失败");
          },
        });
        console.log("res", data);
      } catch (error) {}
    },
    async V_getCalendar({ state, commit }, payload: CalenderType) {
      console.log(" 查看日历");
      const par = {
        ...payload,
        satoken: state.malltoken,
      };
      const { data }: any = await api.$post(urlapi.user.calendar, par);
      console.log("data", data);
    },

    /****------先饮后付FC-04------****/
    /* 配送日历-支持查历史 */
    async post_Calendar({ state, commit }, payload: calenderTypes) {
      try {
        const par = {
          ...payload,
          page: payload.page ? payload.page : 1,
          size: payload.size ? payload.size : 10,
        };
        const { data }: any = await api.$post(payAfter.calendar, par, "加载中");
        console.log("data-配送日历", data);
        commit("set_calenderList", data);
      } catch (error) {
        console.log("error", error);
      }
    },
    /**
     * @name 先饮后付
     */
    async get_selectFirstReceipt({ commit }) {
      try {
        // if (process.env.NODE_ENV === "uat") {
        //     return
        // }
        const { data }: any = await api.$get(payAfter.selectFirstReceipt);
        commit("set_payAfterRes", data);
        console.log("data-先饮后付", data);
      } catch (error) {}
    },
    /**
     * @name 先饮后付-商品信息
     */
    async get_selectFirstReceiptGoods({ commit, state }, payload?: any) {
      try {
        // const url = payload ? payAfter.selectFirstReceiptGoods + `?status=${payload}` : payAfter.selectFirstReceiptGoods
        const url = payAfter.selectFirstReceiptGoods;
        const par = {
          status: payload.status ? payload.status : null,
          page: payload.page ? payload.page : 1,
          size: payload.size ? payload.size : 10,
        };
        const { data }: any = await api.$post(url, par, "加载中", true);
        commit(
          "set_payAfterGoods",
          par.page > 1
            ? [...state.payAfterGoods, ...data.content]
            : [...data.content]
        );
        // 总页数
        const allPage = Math.ceil(data.totalElements / par.size);
        commit("set_payAfterGoodsPage", allPage);
        console.log("data-先饮后付-商品信息", allPage);
      } catch (error) {}
    },
    /**获取账单列表 */
    async get_receiptList({ commit }, payload: string) {
      try {
        const { data }: any = await api.$get(
          payAfter.current,
          "",
          "加载中",
          true
        );
        console.log("data-账单列表", data.slice(1));
        commit("set_receiptALL", data[0]);
        commit("set_receiptList", data.length > 1 ? data.slice(1) : data);
      } catch (error) {}
    },
    /* 获取历史账单列表 */
    async get_HistoryReceiptList({ commit }, payload: string) {
      try {
        const { data }: any = await api.$get(
          payAfter.history,
          "",
          "加载中",
          true
        );
        console.log("data-历史账单列表", data);
        commit("set_HistoryReceiptList", data);
      } catch (error) {}
    },
    /* 获取账单详情 */
    async get_receiptDetail({ commit }, payload: string) {
      try {
        const { data }: any = await api.$get(
          payAfter.detail + `?receiptNo=${payload}`,
          "",
          "加载中",
          true
        );
        console.log("data-账单详情", data);
        commit("set_receiptDetail", data);
      } catch (error) {}
    },
    /* 账单支付 */
    async post_payWallet({ state, dispatch }, receiptNo: string) {
      try {
        const par = {
          openId: state.userInfo.openId,
          appId: state.userInfo.appId,
          orderNo: receiptNo,
          payMethodType: 0, //固定js-api
          type: PayTypeEnum.RECEIPT,
          payChannel: state.source,
        };
        let provider: "alipay" | "wxpay" | "baidu" | "appleiap" = "wxpay";
        uni.getProvider({
          service: "payment",
          success: (res) => {
            console.log(res, "00000000");
            provider = res.provider[0];
          },
        });
        const { data }: any = await api.$post(pay.wechatPay, par);
        uni.requestPayment({
          provider: provider,
          orderInfo: "",
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          signType: data.signType,
          package: data.packageValue,
          paySign: data.paySign,
          success: (res) => {
            console.log("res-支付成功", res);
            dispatch("get_receiptList");
            uni.redirectTo({
              url: "/subPages/user/walletres",
            });
          },
          fail: () => {
            console.log("支付失败");
          },
        });
        console.log("res", data);
      } catch (error) {}
    },
  },
};
