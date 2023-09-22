import api from "@/utils/api";
import urlapi, {order, product, shopCar as shopCarUrl} from "@/utils/url";
import {formatTime, getNowMonth} from "@/utils/utils";
import {isCheckAllCheckType} from "@/utils/enum";

import {OrderParams} from "../types";
import {Global_Cog} from "@/utils/config";

export default {
  namespaced: true,
  state: {
    shopCarList: [],
    totalElements: 0,
    shopCount: 0,
    shopCarListParams: {page: 1, size: 10},
    // shopConfigId: "",
    totalMoney: 0,
    productDetail: {},
    checkNumber: 0,
    isCheckAll: isCheckAllCheckType.not,
    checkInitialAmount: 0, //优惠前总金额
    totalDiscountAmount: 0, //优惠总金额
    couponStrategyList: [], //优惠券策略信息
  },
  getters: {},
  mutations: {
    V_setProductDetail(state: any, payload: boolean) {
      state.productDetail = payload;
    },
    V_setShopCountAndMoney(
      state: any,
      payload: {
        number: number;
        checkAmount: number;
        checkNumber: number;
        isCheckAll: number;
        checkInitialAmount: number; //优惠前总金额
        totalDiscountAmount: number; //优惠总金额
        couponStrategyList: any; //优惠券策略信息
      }
    ) {
      state.shopCount = payload.number;
      state.totalMoney = payload.checkAmount;
      state.checkNumber = payload.checkNumber;
      state.isCheckAll = payload.isCheckAll;
      state.checkInitialAmount = payload.checkInitialAmount; //优惠前总金额
      state.totalDiscountAmount = payload.totalDiscountAmount; //优惠总金额
      state.couponStrategyList = payload.couponStrategyList; //优惠券策略信息
    },
    V_setShopCarList(
      state: any,
      payload: {totalElements: number; content: any[]}
    ) {
      state.shopCarList = payload.content;
      state.totalElements = payload.totalElements;
    },
    V_setShopCarListParams(state: any, payload: boolean) {
      state.shopCarListParams = payload;
    },
    // V_setShopConfigId(state: any, payload: boolean) {
    //   state.shopConfigId = payload;
    // },
  },
  actions: {
    // 获取商品详情
    async getProductDetail(
      {commit, rootState},
      payload: {
        appId: string;
        shopConfigId: string;
        spuCode: string;
      }
    ) {
      try {
        const res: any = await api.$post(
          product.productInfos,
          payload,
          "加载中"
        );
        console.log(res.data, "res.data");
        commit("V_setProductDetail", res.data);
      } catch (error) {
        console.log(error, "++++++++++");
      }
    },
    async addToCar({commit, rootState}, payload: {}) {
      try {
        const res: any = await api.$post(
          shopCarUrl.shoppingCart,
          payload,
          "加载中"
        );
        // commit("V_setProductDetail", res.data);
        return res.data;
      } catch (error) {
        console.log(error, "++++++++++");
      }
    },
    async getShopCountAndMoney({commit, rootState}, payload: {}) {
      try {
        const {shopCar} = rootState;
        const res: any = await api.$get(
          `${shopCarUrl.selectShoppingCartNumber}/${shopCar.shopCarListParams.shopConfigId}`,
          payload
        );
        console.log(res.data, "@@@@@@@@@@");
        if (res.data) {
          commit("V_setShopCountAndMoney", res.data);
        } else {
          // 无数据返回时重置
          commit("V_setShopCountAndMoney", {
            number: 0,
            checkAmount: 0,
            checkNumber: 0,
            isCheckAll: 0,
            checkInitialAmount: 0,
            totalDiscountAmount: 0,
            couponStrategyList: [],
          });
        }
      } catch (error) {
        console.log(error, "++++++++++");
      }
    },
    async getShopCarList(
      {commit, rootState},
      payload: {type: string} = {type: "init"}
    ) {
      try {
        const {shopCar} = rootState;
        let params = {...shopCar.shopCarListParams};
        if (payload.type !== "loadMore") {
          params.page = 1;
          commit("V_setShopCarListParams", params);
        }
        const res: any = await api.$post(shopCarUrl.shoppingCartPage, params);
        let data = {totalElements: res.data.totalElements, content: []};
        if (payload.type === "loadMore") {
          data.content = shopCar.shopCarList.concat(res.data.content);
        } else {
          data = res.data;
        }
        commit("V_setShopCarList", data);
        return res.data;
      } catch (error) {
        console.log(error, "++++++++++");
      }
    },
  },
};
