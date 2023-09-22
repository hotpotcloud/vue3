import { ruleTypeEnum } from "@/utils/enum";
import { distributionUrl } from "@/utils/url";
import api from "@/utils/api";

export default {
  namespaced: true,
  state: {
    showPlanTip: true,
    planCode: "", //配送计划编码
    weekList: [], //缓存星期
    address: null, //选择地址
    count: [], //点击确定的位置统计
    prarms: {
      //保存-新建配送计划
      saveFlag: 0, //0-不落库，其他落库
      defaulted: 0, //是否默认：0-否，1-是
      deliveryDetails: "", //配送详情
      everyNum: 0, //单次配送数量
      intervalDate: 0, //间隔天数
      // planName: '测试计划123',//计划名称
      planRuleNo: "", //配送计划规律编码
      receiverNo: "", //收货地址编码
      ruleType: "", //配送规律-枚举
      timeSection: "", //配送时间段-枚举
    },
    //提交保存配送计划
    planInfo: {
      addressDetails: null,
      defaulted: false,
      deliveryDetails: null,
      deliveryEndDate: "",
      deliveryPlanCode: "",
      deliveryStartDate: "",
      everyNum: 0,
      intervalDate: 0,
      planName: "",
      receiverName: null,
      receiverNo: "",
      receiverPhone: null,
      ruleType: "",
      ruleTypeName: "",
      timeSection: "",
      timeSectionName: "",
      addressDTO: {
        addressNo: "",
        adressDetail: "",
        areaName: "",
        cityName: "",
        defaulted: 2, //0-否，1-是
        label: "",
        labelName: "",
        latitude: "",
        longitude: "",
        memberNo: "",
        provinceName: "",
        receiver: "",
        receiverPhone: "",
        communityDoorCode: "", //"小区门牌号拼接",
        provinceCityArea: "", //'省市区拼接'
      },
    },
    // 配送计划校验
    planColor: {},
  },
  getters: {
    // 多久送一次
    howTime(state: any) {
      const { ruleType, ruleTypeName, deliveryDetails, intervalDate } =
        state.planInfo;
      if (ruleType === ruleTypeEnum.TERTIAN_DAYS) {
        //
        return `隔${intervalDate}日送`;
      } else if (ruleType === ruleTypeEnum.WEEK_DAYS) {
        return `星期(${deliveryDetails ? deliveryDetails : ""})`;
      } else {
        //天天送+法定
        return ruleTypeName;
      }
    },
  },
  mutations: {
    //tips开关
    setShowTips(state: any, payload: boolean) {
      state.showPlanTip = payload;
    },
    //设置计划编码
    V_setplanCode(state: any, code: string) {
      state.planCode = code;
    },
    V_setAddress(state: any, payload: any) {
      state.address = payload;
    },
    V_setCount(state: any, payload: string) {
      const arr = state.count;
      console.log("arr-配送计划类型按钮", state.count, payload);
      if (!arr.includes(payload)) {
        state.count = [...arr, payload];
        console.log("arr-配送计划类型按钮22222", state.count, payload);
      }
    },
    //清空count
    V_setNullCount(state: any, payload: any[]) {
      state.count = payload;
    },
    // 参数生成-回显示
    V_setPrarms(state: any, payload: any) {
      if (payload) {
        payload.defaulted = payload.defaulted ? 1 : 0;
        state.prarms = { ...state.prarms, ...payload };
      }
    },
    //地址选中
    V_setPrarmsAddress(state: any, payload: any) {
      state.planInfo.addressDTO = payload;
      state.prarms.receiverNo = payload.addressNo;
      state.planInfo.receiverNo = payload.addressNo;
      state.planInfo.receiverName = payload.receiver;
      state.planInfo.receiverPhone = payload.receiverPhone;
      state.planInfo.addressDetails = payload.adressDetail;
      console.log("payload地址选择修改", state.planInfo.addressDTO);
    },
    // 星期点击缓存
    V_setWeekList(state: any, payload: any) {
      state.weekList = payload;
    },
    // 请求后
    V_setAsyncPlanInfo(state: any, payload: any) {
      console.log("执行更新配送计划-1", payload);
      if (payload.empty) {
        state.planInfo = {};
      } else {
        state.planInfo = { ...state.planInfo, ...payload };
        console.log("执行更新配送计划2", state.planInfo);
      }
    },
    v_setPlanColor(state: any, payload: any) {
      state.planColor = payload;
    },
  },
  actions: {
    /**
     * 新建配送计划
     * @param param0
     * @param payload true编辑 ,false新建(默认)
     */
    async V_putAddPlan({ state, dispatch, commit }, payload: boolean = false) {
      try {
        const editPar = {
          ...state.planInfo,
          addressDTO: null,
          deliveryEndDate: null,
          deliveryStartDate: null,
          receiverNo: state.planInfo.receiverNo
            ? state.planInfo.receiverNo
            : state.prarms.receiverNo,
          defaulted: state.planInfo.defaulted ? 1 : 0,
          planRuleNo: state.planInfo.deliveryPlanCode,
          saveFlag: 0, //0-不落库，其他落库
        };
        console.log("payload--------配送计划true编辑", payload);
        const par = payload ? editPar : state.prarms;
        const { data }: any = await api.$put(distributionUrl.saveOrUpdate, par);
        commit("V_setplanCode", data);
        //重新请求计算价格
        dispatch(
          "order/X_getOrderPlanData",
          { deliveryPlanCode: data },
          { root: true }
        );
      } catch (error) {
        //
      }
    },
  },
};
