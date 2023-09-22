import api from "@/utils/api";
import { memberUrl } from "@/utils/url";
import {
  memberCof,
  BenefitTypeEnum,
} from "@/pages/member/components/config/const";
export default {
  namespaced: true,
  state: {
    // 会员信息
    memberInfoFc09: {},
    //成长值
    growthValue: {},
    //积分明细
    integralDetail: {},
    //会员权益
    memberInterest: [],
    //会员中心banner
    memberBanner: [],
    //权益详情
    benefit: [],
    //积分兑券
    couponList: [],
    //等级规则
    memberRule: {},
    //是否兑换成功
    isUsePoint: false,
    // 会员任务
    memberTask: {},
    isBrithday: false, //是否是生日
    selectSwIndex: 0, //会员权益轮播下标
  },
  getter: {},
  mutations: {
    //会员权益轮播下标
    setSelectSwIndex(state: any, payload: any) {
      state.selectSwIndex = payload;
    },
    setMemberCode: (state, payload) => {
      state.memberInfoFc09 = payload;
    },
    setGrowthValue: (state, payload) => {
      state.growthValue = payload;
    },
    // 打开关闭
    setGrowthOff: (state, payload) => {
      const { index, type } = payload;
      const arr = state.growthValue.content;
      arr[index].isOpen = type;
      state.growthValue.content = [...arr];
    },
    setIntegralDetail: (state, payload) => {
      state.integralDetail = payload;
    },
    setMemberInterest: (state, payload) => {
      state.memberInterest = payload;
    },
    setMemberBanner: (state, payload) => {
      state.memberBanner = payload;
    },
    setBenefit: (state, payload) => {
      state.benefit = payload;
    },
    setCouponByAcquire: (state, payload) => {
      state.couponList = payload;
    },
    setUsePoint: (state, payload) => {
      state.isUsePoint = payload;
    },
    setMemberRule: (state, payload) => {
      state.memberRule = payload;
    },
    setMemberTask: (state, payload) => {
      state.memberTask = payload;
    },
    setBirthday: (state, payload) => {
      state.isBrithday = payload;
    },
  },
  actions: {
    //溯源码查询-会员信息查询
    async getMemberCode({ commit, state }, payload: any) {
      console.log("payload-会员参数请求", payload);
      const { data }: any = await api.$get(
        memberUrl.memberInfo,
        payload,
        "加载中",
        true
      );
      console.log("data", data);
      // 分配配置
      commit("setMemberCode", data);
    },
    //成长值查询
    async getGrowthValue({ commit, state }, payload: any) {
      const page = payload.page;
      const { data }: any = await api.$get(memberUrl.growth, payload, "", true);
      console.log("data-成长值", data);
      data?.content?.map((el: any, index: number) => {
        if (index === 0) {
          el.isOpen = true;
        } else {
          el.isOpen = false;
        }
        return el;
      });
      if (page > 1) {
        const oldData = state.growthValue.content;
        let newData = data.content;
        let i = 0;
        while (newData.length > 0) {
          const el = newData[i];
          const index = oldData.findIndex(
            (item: any) => item.yearMonth === el.yearMonth
          );
          if (index > -1) {
            oldData[index].monthDetail = oldData[index].monthDetail.concat(
              el.monthDetail
            );
          } else {
            el.isOpen = false;
            oldData.push(el);
          }
          i++;
        }
        console.log("oldData", oldData);
        commit("setGrowthValue", oldData);
      } else {
        commit("setGrowthValue", data);
      }
    },
    //积分明细查询
    async getIntegralDetail({ commit, state }, payload: any) {
      const page = payload.page;
      const { data }: any = await api.$get(
        memberUrl.integral,
        payload,
        "",
        true
      );
      console.log("data-积分明细", data);
      if (page > 1) {
        const oldData = state.integralDetail.content;
        data.content = oldData.concat(data.content);
        // data.content = oldData;
      }
      commit("setIntegralDetail", data);
    },
    //会员首页所有权益查询
    async getMemberInterest({ commit, state }, payload: any) {
      const { data }: any = await api.$get(
        memberUrl.levelRightAllList,
        payload
      );
      commit("setMemberInterest", data);
    },
    //会员中心banner
    async getMemberBanner({ commit, state }, payload: any) {
      const { data }: any = await api.$get(memberUrl.banner, payload);
      console.log("data-会员中心banner", data);
      commit("setMemberBanner", data);
    },
    // 会员权益页面权益详情
    async getMemberBenefit({ commit, state }, payload: any) {
      const { data }: any = await api.$get(memberUrl.benefit, payload);
      console.log("data-会员权益页面权益详情", data);
      commit("setBenefit", data);
    },
    //积分兑券
    async getCouponByAcquire({ commit, state }, payload: any) {
      const par = {
        acquireTypeEnum: "MEMBER_EXCHANGE",
        ...payload,
      };
      const { data }: any = await api.$get(memberUrl.couponByAcquire, par);
      console.log("data-积分兑券", data);
      commit("setCouponByAcquire", data);
    },
    //积分兑换
    async postCouponByAcquire({ commit, dispatch }, payload: any) {
      const par = {
        acquireType: 1,
        ...payload,
      };
      const { data }: any = await api.$post(memberUrl.usePoint, par, "", true);
      console.log("data-积分兑换", data);
      commit("setUsePoint", data);
      if (data) {
        dispatch("getCouponByAcquire");
        dispatch("getMemberCode");
        uni.showToast({
          title: "领取成功,请前往我的券包查看",
          icon: "none",
          duration: 2000,
        });
      }
    },
    //会员规则等级说明
    async getMemberRule({ commit, state }, payload: any) {
      const { data }: any = await api.$get(memberUrl.levelDesc, payload);
      console.log("data-会员规则等级说明", data);
      commit("setMemberRule", data);
    },
    //会员任务
    async getMemberTask({ commit, state }, payload: any) {
      const { data }: any = await api.$get(memberUrl.transactionTask, payload);
      console.log("data-会员任务", data);
      commit("setMemberTask", data);
    },
    // 生日弹窗
    async getBirthday({ commit, state }, payload: any) {
      // 判断登录
      if (!uni.getStorageSync("malltoken")) return;
      const { data }: any = await api.$get(memberUrl.isBrithday, payload);
      console.log("data-生日弹窗", data);
      commit("setBirthday", data);
    },
  },
};
