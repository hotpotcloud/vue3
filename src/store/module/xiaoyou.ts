// 小优
import api from "@/utils/api";
import { URLDistributor } from "@/utils/url";
import { Global_Cog } from "@/utils/config";
import { ApplyParams } from "../types";
const { BaseApp }: any = require("@/const/appIdConf.js");
export default {
  namespaced: true,
  state: {
    // 下单分销id
    distId: "",
    //xiaoyou用户信息
    xiaoyouInfo: {},
    // 排行榜
    topInfo: {},
    //已加入人数
    jionNum: 10086,
    //收益邀请分销订单统计
    statistics: {
      distNum: 0, //邀请的鲜推官数量
      orderNum: 0, //我的分销订单
      performance: 0, //我的收益
    },
    allTop: { topListVOS: [] }, //全部排行榜
    faceCode: "", //base64面对面二维码
    baseQR: "", //base64二维码
    bannerList: [], //首页banner
    currentBanner: {}, //当前点击banner
    hbSourceList: [], //海报资源
    proQRcode: "", //商品二维码
    homeShowCanvas: false, //首页分享海报
    homeShareInfo: {}, //首页海报分享信息
  },
  getters: {
    //转换文案
    calcText(state: any) {
      const textList = state.hbSourceList;
      textList.forEach((el: any) => {
        let contents = el.content.replace(/<.+?>/g, "");
        contents = contents.replace(/ /gi, ""); /* 去除  */
        contents = contents.replace(/\s/gi, ""); /* 去除空格 */
        el.text = contents;
        // console.log('el.content-2', contents)
      });
      // console.log('textList', textList)
      return textList;
    },
  },
  mutations: {
    //保存小优已注册信息
    v_setXiaoyouInfo(state: any, value: any) {
      uni.setStorageSync("xiaoyouInfo", value);
      state.xiaoyouInfo = value;
    },
    v_setJionNum(state: any, payload: any) {
      state.jionNum = payload;
    },
    v_setTopInfo(state: any, payload: any) {
      state.topInfo = payload;
    },
    //时间统计
    v_setStatistics(state: any, payload: any) {
      state.statistics = payload;
    },
    /* 全部排行榜 */
    v_setAllTop(state: any, payload: any) {
      state.allTop = payload;
    },
    v_setFaceCode(state: any, payload: any) {
      state.faceCode = payload;
    },
    v_setBaseQR(state: any, payload: any) {
      state.baseQR = payload;
    },
    v_setDistId(state: any, payload: any) {
      uni.setStorageSync("pid", payload);
      state.distId = payload;
    },
    /* banner */
    v_setBannerList(state: any, payload: any) {
      state.bannerList = payload;
    },
    /* banner当前点击数据 */
    v_setCurrentBanner(state: any, payload: any) {
      state.currentBanner = payload;
    },
    v_setHBSourceList(state: any, payload: any) {
      state.hbSourceList = payload;
    },
    //商品二维码
    v_setProQRcode(state: any, payload: any) {
      state.proQRcode = payload;
    },

    // sb
    v_setHomeShowCanvas(state: any, payload: boolean) {
      state.homeShowCanvas = payload;
    },
    v_setHomeShareInfo(state: any, payload: any) {
      state.homeShareInfo = payload;
    },
  },
  actions: {
    //检查注册-保存注册信息
    async v_getXYcheck({ commit }) {
      try {
        const { data }: any = await api.$postX(
          `${URLDistributor.check}?appid=${Global_Cog.APPID}`
        );
        console.log("data--小优被执行", data);
        const enumtype = {
          ACCOUNT_EXIST: "4111",
          NOT_REGIST: "4201",
          ACCOUNT_STOP: "4202",
        };
        if (data === enumtype.ACCOUNT_STOP) {
          return uni.showToast({
            title: "您的小优天天赚功能已停用，如有疑问请联系客服处理",
            icon: "none",
            duration: 2500,
          });
        }
        if (!data || data === enumtype.NOT_REGIST) {
          return uni.removeStorageSync("xiaoyouInfo");
          //注册页
        }
        commit("v_setXiaoyouInfo", data);
      } catch (error) {
        //
      }
    },
    /**加入小优人数统计 */
    async v_getJionNum({ commit, dispatch }) {
      try {
        console.log("进入执行nums", 1);
        const { data }: any = await api.$getX(URLDistributor.distNum, {
          appId: Global_Cog.APPID,
        });
        dispatch("v_postTopInfo");
        commit("v_setJionNum", data);
      } catch (error) {
        //
      }
    },
    /**佣金排行榜top3 */
    async v_postTopInfo({ commit }) {
      try {
        if (!BaseApp.isLeaderboards) return;
        console.log("BaseApp", BaseApp);
        const { data }: any = await api.$getX(URLDistributor.topHome, {
          // appId: Global_Cog.APPID,
          appId: BaseApp.appid,
        });

        commit("v_setTopInfo", data);
        console.log("res-榜单top", data);
      } catch (error) {
        //
      }
    },
    /* 完整排行榜 翻页 */
    async v_getDetailPagesMore(
      { commit, state },
      payload?: { page?: number; size?: number }
    ) {
      try {
        const { allTop } = state;
        const { page, size } = payload;
        const par = {
          appId: Global_Cog.APPID,
          page: page,
          size: size,
          ...payload,
        };
        const { data }: any = await api.$getX(URLDistributor.detailPage, par);
        const topListVOS = allTop?.topListVOS.concat(data.topListVOS);
        data.topListVOS = topListVOS;
        commit("v_setAllTop", data);
      } catch (error) {
        //
      }
    },
    /* 鲜推官注册 */
    async v_postApply({ commit }, payload: ApplyParams) {
      try {
        await api.$postX(URLDistributor.apply, {
          appid: Global_Cog.APPID,
          ...payload,
        });
      } catch (error) {}
    },
    /* 首页收益 */
    async v_postStatistics({ commit, dispatch }, payload: string) {
      try {
        const par = {
          appId: Global_Cog.APPID,
          type: payload,
        };
        const { data }: any = await api.$getX(URLDistributor.statistics, par);
        // dispatch('v_getBanner')
        console.log("res--收益", data);
        commit("v_setStatistics", data);
      } catch (error) {}
    },
    /* 首页banner配置 */
    async v_getBanner({ commit }) {
      try {
        const { data }: any = await api.$getX(URLDistributor.banner + 4);
        console.log("data--banner", data);
        commit("v_setBannerList", data);
      } catch (error) {
        //
      }
    },

    /* 完整排行榜 */
    async v_getDetailPages(
      { commit },
      payload?: { page?: number; size?: number }
    ) {
      try {
        const par = {
          appId: Global_Cog.APPID,
          page: 1,
          size: 10,
          ...payload,
        };
        const { data }: any = await api.$getX(URLDistributor.detailPage, par);
        console.log("data-完整排行榜", data);
        commit("v_setAllTop", data || {});
      } catch (error) {
        //
      }
    },
    /* 面对面邀请二维码-生成小程序二维码 */
    async v_getFaceCode({ commit }) {
      try {
        uni.showLoading({ title: "加载中..." });
        const { data }: any = await api.$getX(
          URLDistributor.wool + `${Global_Cog.APPID}`
        );
        if (data) {
          const url = data.replace(/[\r\n]/g, "");
          // console.log('url--base64', url)
          commit("v_setBaseQR", url);
          commit("v_setFaceCode", "data:image/png;base64," + url);
        }
      } catch (error) {
      } finally {
        uni.hideLoading();
      }
    },
    /* 获取海报 */
    async v_postSource({ commit, dispatch }) {
      try {
        const par = {
          status: 1, //状态 0-未发布 1-已发布
          type: 2, //类型 1-教程 2-海报
        };

        const { data }: any = await api.$postX(URLDistributor.source, par);
        console.log("data--海报", data);
        // data[0].img = 'https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-xiaoyou-poster.png'
        // let arr = []
        // for (let i = 0; i < 3; i++) {
        //     arr.push(data[0])
        // }
        // console.log('arr', arr)
        // commit('v_setHBSourceList', arr)
        commit("v_setHBSourceList", data);
      } catch (error) {
        //
      }
    },
    /* 获取商品小程序二维码 */
    async v_getQRcode({ commit }, spuId: string | number) {
      try {
        // const { data }: any = await api.$getX(
        //   URLDistributor.qrcode + `${spuId}/${Global_Cog.APPID}`
        // );
        const { data }: any = await api.$getX(
          URLDistributor.qrcode + `${spuId}/${Global_Cog.APPID}`
        );
        console.log("data-商品二维码获取");
        // commit('v_setProQRcode', 'data:image/png;base64,' + data)
        commit("v_setProQRcode", data);
      } catch (error) {}
    },
  },
};
