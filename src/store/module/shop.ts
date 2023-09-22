/*
 * @Date: 2022-09-07 17:06:25
 * @LastEditors: ''
 * @LastEditTime: 2022-09-14 14:02:46
 * @FilePath: \xianhuo-miniprogram\src\store\module\order.ts
 */
// 门店
import api from "@/utils/api";
import urlapi, {order, shop} from "@/utils/url";
import {formatTime, getNowMonth} from "@/utils/utils";
import {OrderParams} from "../types";
import {Global_Cog} from "@/utils/config";

export default {
  namespaced: true,
  state: {
    suitShopList: [],
    currentShopItem: {},
    shopIndexShopConfigId: "",
  },
  getters: {},

  mutations: {
    //是否显示变化
    V_setSuitShopList(state: any, payload: boolean) {
      state.suitShopList = payload;
    },
    V_setCurrentShopItem(state: any, payload: boolean) {
      state.currentShopItem = payload;
    },
    V_setShopIndexShopConfigId(state: any, payload: boolean) {
      state.shopIndexShopConfigId = payload;
    },
  },
  actions: {
    //获取适用门店数据
    async getSuitShopList(
      {commit, rootState},
      payload: {
        shopConfigId: string;
        // channelSkuCode: string;
        spuCode: string;
        shopCar: boolean;
      }
    ) {
      console.log(payload, rootState, "payload");
      try {
        const {home, order} = rootState;
        console.log(order.shopOrderGoodsInfo, "order.shopOrderGoodsInfo");
        const list = order.shopOrderGoodsInfo?.map((item) => item.spuCode);
        if (!payload.shopCar) {
          const para = {
            appId: Global_Cog.APPID,
            latitude: home.addInfoMsg.latitude || 31.240688,
            longitude: home.addInfoMsg.longitude || 120.422653,
            spuCode: payload.spuCode,
            shopConfigId: "",
          };
          const res: any = await api.$get(shop.getApplyShopListBySpuCode, para);
          commit("V_setSuitShopList", res.data);
        } else {
          const para = {
            appId: Global_Cog.APPID,
            latitude: home.addInfoMsg.latitude || 31.240688,
            longitude: home.addInfoMsg.longitude || 120.422653,
            spuCode: list,
            shopConfigId: "",
          };
          const res: any = await api.$post(shop.getCutShopList, para);
          commit("V_setSuitShopList", res.data);
          // if (res.data.length > 0) {
          //   commit("V_setCurrentShopItem", res.data[0]);
          // }
        }
      } catch (error) {
        console.log(error, "err");
        //
      }
    },
  },
};
