import api from "@/utils/api";
import { distributionUrl, milkCard } from "@/utils/url";

//奶卡
export default {
  namespaced: true,
  state: {
    cardTheme: [], //卡面主题
    total: 0, //总条数
    currentCardTheme: {}, //当前选择卡面主题
    cardBaseInfo: {}, // 奶卡基础信息
    cardGoods: {
      list: [],
      total: 0,
    }, //奶卡商品
    cardDetail: {}, // 奶卡详情
    orderDetail: {}, // 创建订单后详情
    walletData: {
      list: [],
      total: 0,
    }, // 我的卡包页面数据
    walletStatistics: {
      availableCount: 0,
      givenAwayCount: 0,
    }, // 我的卡包页面数据统计
    exchangeDetail: {}, // 兑换详情
    cardInfo: {}, // 奶卡详细信息
    cardGift: [], //赠品信息
    exchangeParams: {}, //兑换参数
    cardExchange: {}, //兑换确认页
    curMilkNo: "", //当前奶卡号
    cardPlanList: {}, //兑换配送计划
    milkPlanCount: [],
    prarms: {
      //保存-新建配送计划
      saveFlag: 0, //0-不落库，其他落库
      defaulted: 0, //是否默认：0-否，1-是
      deliveryDetails: "", //配送详情
      everyNum: 0, //单次配送数量
      intervalDate: 0, //间隔天数
      planRuleNo: "", //配送计划规律编码
      receiverNo: "", //收货地址编码
      ruleType: "", //配送规律-枚举
      timeSection: "", //配送时间段-枚举
    },
    cardOrderDetail: {}, // 奶卡订单详情
    gift: false, //是否兑换赠品
  },
  getters: {},
  mutations: {
    // 是否兑换赠品
    set_isExchangeGift(state: any, payload: boolean) {
      state.gift = payload;
    },
    //当前奶卡号
    set_curMilkNo(state: any, payload: any) {
      state.curMilkNo = payload;
    },
    // 卡面主题
    set_CardTheme(state: any, data: any) {
      state.cardTheme = data.arr;
      state.total = data.total;
    },
    // 当前选择卡面主题
    set_CurrentCardTheme(state: any, data: any) {
      state.currentCardTheme = data;
    },
    set_CardBaseInfo(state, payload) {
      // 奶卡基础信息
      state.cardBaseInfo = payload.data;
    },
    set_CardGoodsList(state, payload) {
      // 奶卡商品列表
      const { list, total } = payload;
      state.cardGoods = {
        list,
        total,
      };
    },
    set_CardDetail(state, payload) {
      state.cardDetail = payload;
    },
    set_CardCreateOrder(state, payload) {
      state.orderDetail = payload;
    },
    set_CardWalletList(state, payload) {
      state.walletData = payload;
    },
    set_CardWalletStatistics(state, payload) {
      state.walletStatistics = payload;
    },
    set_ExchangeDetail(state, payload) {
      state.exchangeDetail = payload;
    },
    set_CardInfo(state, payload) {
      state.cardInfo = payload;
    },
    set_CardGift(state, payload) {
      state.cardGift = payload;
    },
    set_ExchangeParams(state, payload) {
      state.exchangeParams = payload;
    },
    set_CardExchange(state, payload) {
      state.cardExchange = payload;
    },
    set_CardPlanList(state, payload) {
      state.cardPlanList = { ...state.cardPlanList, ...payload };
      if (payload?.addressDTO?.addressNo) {
        state.prarms.receiverNo = payload?.addressDTO?.addressNo;
      }
    },
    set_nullCardPlan(state, payload) {
      state.cardPlanList = payload;
    },
    set_MilkPlanCount(state, payload) {
      const arr = state.milkPlanCount;
      if (!arr.includes(payload)) {
        state.milkPlanCount = [...arr, payload];
      }
    },
    set_Prarms(state: any, payload: any) {
      if (payload) {
        payload.defaulted = payload.defaulted ? 1 : 0;
        state.prarms = { ...state.prarms, ...payload };
      }
    },
    set_CardOrderDetail(state, payload) {
      state.cardOrderDetail = payload;
    },
  },
  actions: {
    // 卡面主题选择
    async post_CardTheme({ commit, state }: any, payload: any) {
      try {
        const { page, id } = payload;
        const par = {
          size: 10,
          page,
        };
        const { data }: any = await api.$post(milkCard.milkCardTemplate, par);
        let arr = data.content;
        if (page > 1) {
          arr = [...state?.cardTheme, ...data.content];
        }
        console.log("arr", arr);
        commit("set_CardTheme", {
          arr,
          total: data.totalElements,
        });
        // fc11
        console.log("payload", payload);
        if (!!id) {
          const defaultObj = arr.find((item: any) => {
            return item.id == id;
          });
          console.log("defaultObj", defaultObj);
          commit("set_CurrentCardTheme", defaultObj);
        }
      } catch (error) {
        //
      }
    },
    async get_CardBaseInfo({ commit }) {
      // 奶卡基础信息
      try {
        const { data }: any = await api.$get(milkCard.milkCardBaseInfo);
        // console.log("奶卡基础信息--》", data);
        const allLast = {
          id: 127,
          maxmum: 0,
          milkCardBasicId: 1,
          minimum: 0,
          ratio: 0,
          sort: -1,
          all: true,
        };
        if (data.milkCardRatioDTOS) {
          const len = data.milkCardRatioDTOS.length;
          allLast.id = data.milkCardRatioDTOS[len - 1].id + 1;

          data.milkCardRatioDTOS.push(allLast);
          // for (let i = 0; i < len; i++) {
          //   allLast.id = data.milkCardRatioDTOS[i].id + 1;
          // }
        }
        // for()
        // console.log("data--->不行", data);
        commit("set_CardBaseInfo", { data });
      } catch (err) {
        //
      }
    },
    async get_CardGoodsList({ commit, state }, payload) {
      try {
        console.log("---->商品参数", payload);
        const { data }: any = await api.$post(
          milkCard.milkCardProductPage,
          payload
        );
        console.log("商品列表--》", data);
        commit("set_CardGoodsList", {
          list: [...state.cardGoods.list, ...data.content],
          total: data.totalElements,
        });
      } catch (err) {
        //
      }
    },
    async get_CardDetail({ commit, dispatch }, payload) {
      try {
        console.log("---->奶卡详情参数", payload);
        const par = payload.milkCardNo
          ? {
              milkCardNo: payload.milkCardNo,
              skuChannelCode: payload.skuChannelCode,
              id: payload.id,
            }
          : {
              id: payload.id,
              skuChannelCode: payload.skuChannelCode,
              qty: payload.qty,
            };
        const { data }: any = await api.$post(
          milkCard.milkCardProduct,
          par,
          " ",
          true
        );
        console.log("奶卡详情--》vuex", data);
        commit("set_CardDetail", data);
        // if (data.orderNo) {
        //   dispatch("get_CardGift", data.orderNo);
        // }
      } catch (err) {
        console.log("err", err);
        //
      }
    },
    async post_CardCreateOrder({ commit }, payload) {
      try {
        const { data }: any = await api.$post(
          milkCard.milkCardCreateOrder,
          payload
        );
        commit("set_CardCreateOrder", data);
        console.log("创建订单成功--》", data);
      } catch (err) {
        //
      }
    },
    async get_CardWalletStatistics({ commit }) {
      try {
        const { data }: any = await api.$get(milkCard.walletStatistics);
        commit("set_CardWalletStatistics", {
          availableCount: data.availableCount,
          givenAwayCount: data.givenAwayCount,
        });
      } catch (err) {
        //
      }
    },
    async get_CardWalletList({ commit, state }, payload) {
      try {
        console.log("state-->", state.walletData);
        const { data }: any = await api.$post(
          milkCard.walletList,
          payload,
          "",
          true
        );
        console.log("卡包列表数据--》", data);
        // const flag = state.walletData.list.length > state.walletData.total;
        const flag = payload.page > 1;
        commit("set_CardWalletList", {
          list: flag
            ? [...state.walletData.list, ...data.content]
            : data.content,
          total: data.totalElements,
        });
      } catch (err) {
        //
      }
    },
    async get_CardExchangeDetail({ commit }, payload) {
      try {
        console.log(payload);
        const { data }: any = await api.$get(
          `${milkCard.exchangeDetail}?milkCardNo=${payload}`,
          {},
          "",
          true
        );
        console.log("兑换详情--》vuexxx2", data);
        commit("set_ExchangeDetail", data);
      } catch (err) {
        //
      }
    },
    async get_CardInfo({ commit, dispatch }, payload) {
      // 奶卡详情信息
      try {
        console.log(payload);
        const { data }: any = await api.$get(
          `${milkCard.cardDetail}${payload}`
        );
        console.log("奶卡详情--》", data);
        commit("set_CardInfo", data);
        dispatch("get_CardGift", data.orderNo);
      } catch (err) {
        //
      }
    },
    //赠品查询
    async get_CardGift({ commit }, payload) {
      try {
        const { data }: any = await api.$get(milkCard.getGiftsByOrderNo, {
          orderNo: payload,
        });
        commit("set_CardGift", data);
        console.log("data-增品", data);
      } catch (error) {}
    },
    //商品兑换exchangeParams-请求配送计划-商品信息
    async post_CardExchange({ commit, state }, payload?: any) {
      try {
        const { exchangeParams, cardDetail, curMilkNo } = state;
        console.log("商品兑换参数--》", exchangeParams);
        const par = {
          // goodsCode: cardDetail.channelSkuCode, //商品编码*
          // goodsQty: cardDetail.milkAmount, //商品兑换数量
          // unitPrice: cardDetail.milkPrice, //商品单价
          ...exchangeParams,
          milkCardNo: curMilkNo,
          gift: state.gift,
          ...payload,
        };
        const { data }: any = await api.$post(
          milkCard.milkProductCalc,
          par,
          "加载中..."
        );
        // const unit = data.goodsInfoList[0].unitName; //单位
        const unit = "份"; //单位
        data.unit = unit;
        data.qty = par.goodsQty;
        if (data.deliveryPlanCode) {
          const obj = {
            ...data.deliveryPlanResp,
            everyNum:
              data.deliveryPlanResp.everyNum > par.goodsQty
                ? par.goodsQty
                : data.deliveryPlanResp.everyNum,
            unit,
          };
          commit("set_CardPlanList", obj);
        }
        commit("set_CardExchange", data);
      } catch (err) {
        //
      }
    },
    //兑换确认
    async post_ExchangeMilkCardOrder({ commit, state }, payload) {
      try {
        // deliveryPlanCode;
        // remark;
        const par = {
          milkCardNo: state.curMilkNo,
          deliveryEndDate: state.cardPlanList.deliveryEndDate.replaceAll(
            "/",
            "-"
          ),
          deliveryStartDate: state.cardPlanList.deliveryStartDate.replaceAll(
            "/",
            "-"
          ),
          gift: state.gift,
          ...payload,
        };
        const { data, msg, success }: any = await api.$post(
          milkCard.exchangeMilkCardOrder,
          par,
          "加载中...",
          true
        );
        if (!success) {
          return uni.showToast({
            title: msg,
            icon: "none",
          });
        }
        uni.reLaunch({
          url: "/child-pages/goods-confirm/sucess?milkCardNo=" + par.milkCardNo,
        });
        console.log("兑换确认--》", msg);
      } catch (error) {
        // console.log("error", error);
        //
      }
    },
    async get_CardOrderDetail({ commit }, payload) {
      try {
        const { data }: any = await api.$get(
          `${milkCard.orderDetail}${payload}`
        );
        commit("set_CardOrderDetail", data);
      } catch (err) {
        console.log("err", err);
        //
      }
    },
    /**
     * 缓存配送计划-新建+修改
     * @param param0
     * @param payload true编辑 ,false新建(默认)
     */
    async put_AddMilkPlan(
      { state, dispatch, commit },
      payload: boolean = false
    ) {
      try {
        const editPar = {
          ...state.cardPlanList,
          addressDTO: null,
          deliveryEndDate: null,
          deliveryStartDate: null,
          receiverNo: state.cardPlanList.addressDTO.addressNo,
          defaulted: state.cardPlanList.defaulted ? 1 : 0,
          planRuleNo: state.cardPlanList.deliveryPlanCode,
          saveFlag: 0, //0-不落库，其他落库
        };
        const par = payload ? editPar : state.prarms;
        const { data }: any = await api.$put(distributionUrl.saveOrUpdate, par);
        commit("set_ExchangeParams", {
          ...state.exchangeParams,
          deliveryPlanCode: data,
        });
        //重新请求计算价格
        dispatch("post_CardExchange", { deliveryPlanCode: data });
      } catch (error) {
        //
      }
    },
  },
};
