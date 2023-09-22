import api from "@/utils/api";
import urlapi, { strategyFC10 } from "@/utils/url";
import { formatAmount, noformatAmount } from "@/utils/utils";
import { LongStopEnum } from "../types";
export default {
  namespaced: true,

  state: {
    longList: null, //长停列表
    defaultAccount: {}, //默认账户
    accountOrderList: [], //当前账户下挂起订单平台单号
    orderListParams: {
      //当前账户下挂起订单平台单号->请求参数
      stationAccountNo: "",
    },
    topListInfo: {
      // 待配已配停送
      sendQty: {},
      //所有地址
      addressInfo: [],
      //选中的地址
      curInfo: {},
    },
    selectSupply: "", //供应链提前期
    accountByMember: null, //默认履约账号
  },

  getters: {
    //   订单数
    orderNum(state: any) {
      return state.accountOrderList.length;
    },
  },
  mutations: {
    /** 设置默认账户 */
    setDefaultAccount(state: any, data: any) {
      state.defaultAccount = data;
    },
    /* 设置参数 */
    setOrderListParams(state: any, data: any) {
      state.orderListParams = data;
    },
    /* 当前账户下挂起订单平台单号 */
    setAccountOrderList(state: any, data: any) {
      state.accountOrderList = data;
    },
    /** 长停列表 */
    setLongList(state: any, data: any) {
      state.longList = data;
    },
    //设置头部信息
    setTopListInfo(state: any, data: any) {
      state.topListInfo = { ...state.topListInfo, ...data };
    },
    //供应链提前期
    setSelectSupply(state: any, data: any) {
      console.log("data-selectSupply", data);
      state.selectSupply = data;
    },
    //改版
    setAccountByMember(state: any, data: any) {
      state.accountByMember = data;
    },
  },
  actions: {
    /* 获取默认账户编码 */
    async getAccountCode({ commit, state }: any, params: any) {
      const { data }: any = await api.$get(
        strategyFC10.getDefaultParams,
        params
      );
      console.log("data-默认账户", data);
      commit("setDefaultAccount", data);
      if (!state.orderListParams?.stationAccountNo) {
        console.log("没有默认值", 1);
        commit("setOrderListParams", {
          stationAccountNo: data.stationAccountNo,
        });
      }
    },
    /* 查询当前用户挂起账户编码 */
    async getAccountByMember({ commit }) {
      try {
        const { data }: any = await api.$get(
          strategyFC10.selectSuspendAccountByMember
        );
        console.log("data", data);
        commit("setAccountByMember", data);
        commit("setOrderListParams", {
          stationAccountNo: data,
        });
      } catch (error) {
        console.log("error", error);
      }
    },
    /* 获取账户下可恢复订单集 */
    async getAccountOrderList({ commit, state }: any, params: any) {
      const par = {
        stationAccountNo: params
          ? params
          : state.orderListParams?.stationAccountNo,
      };
      const { data }: any = await api.$get(
        strategyFC10.selectOrderSuspendList,
        par
      );
      console.log("data-订单集", data);
      commit("setAccountOrderList", data);
    },
    // 查询待配已配
    async getSendQty({ commit, state }: any) {
      try {
        // 查询待配已配
        const params1 = {
          stationAccountNo: state.orderListParams?.stationAccountNo,
        };
        const { data }: any = await api.$get(urlapi.home.countQty, params1);
        commit("setTopListInfo", { sendQty: data });
      } catch (error) {}
    },
    // 查询地址
    async getNumWithAddress({ commit, state, dispatch }: any) {
      try {
        //  查询地址
        const params2 = {
          addressNo: state.orderListParams?.stationAccountNo,
        };
        const { data }: any = await api.$get(urlapi.home.keepAddress, params2);
        let cur = data;
        if (params2.addressNo) {
          cur = data.filter((x: any) => x.checked);
        } else {
          //设置默认
          commit("setOrderListParams", {
            stationAccountNo: data[0].stationAccountNo,
          });
        }
        console.log("cur", cur);
        commit("setTopListInfo", { addressInfo: data, curInfo: cur[0] });
        //配-停-已
        dispatch("getSendQty");
      } catch (error) {}
    },
    /* 长停列表 */
    async postLongList({ commit, state }: any, params: any) {
      //LongStopEnum
      //{platformOrderNos,type}参数
      try {
        const par = {
          // platformOrderNos: state.accountOrderList || [],
          // platformOrderNos: ["2308301506000027899"],
          stationAccountNo: state.orderListParams?.stationAccountNo || "",
          type: params.type ? params.type : LongStopEnum.DRINKING,
          page: params.page || 1,
          size: 10,
        };
        const { data }: any = await api.$post(
          strategyFC10.selectPage,
          par,
          "加载中...",
          true
        );
        console.log("data", data);
        let obj = data;
        if (par.page > 1) {
          obj = {
            content: [...state.longList.content, ...data.content],
            totalElements: data.totalElements,
          };
        }
        commit("setLongList", obj);
      } catch (error) {
        commit("setLongList", null);
      }
    },
    // 查询供应链提前期
    async getSelectSupply({ commit, state }, payload: any) {
      const { data }: any = await api.$get(
        strategyFC10.selectSupplyInfo,
        payload
      );
      commit("setSelectSupply", data);
      console.log("data-提前期", data);
    },
    // 恢复计划
    async postRecovery({ commit, state }, payload: any) {
      const par = {
        milkStationNo: "", //奶站编码
        planCode: "", //履约计划编码
        recoveryTime: "", //恢复时间
        stationAccountNo: "", //账户编码
      };
      const { data }: any = await api.$post(strategyFC10.recovery, payload);
      console.log("data-恢复", data);
    },
  },
};
