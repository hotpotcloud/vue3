/*
 * @Author: xbf-Eason
 * @Date: 2022-07-14 09:47:29
 * @Last Modified by: Xiao_Bi_Feng
 * @Last Modified time: 2022-07-Th 09:59:29
 */

import apiurl from "@/utils/url";
import api from "@/utils/api";
import {
  activityTypeEnum,
  KeyEnum,
  productStatusEnum,
  urltypeEnum,
} from "@/utils/enum";
import {noformatAmount} from "@/utils/utils";
import {searchType, StationListType, xiaoyouEnum} from "../types";
import {address} from "@/utils/url";
import {Global_Cog} from "@/utils/config";
import {URLDistributor} from "@/utils/url";
import {gpsToAddress} from "@/utils/mapLocation";

export interface DefaultAddressData {
  id: number;
  appId: string;
  lat: number;
  lng: number;
  address: string;
  community: string;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
}

export default {
  namespaced: true,
  state: {
    key: "VTGBZ-4L5CP-ANXDG-VNJLQ-7QBMF-S5F2N",
    U_homeList: [], //首页配置
    stickData: [], //吸顶数据
    advInfo: [], //广告列表
    advopen: "",
    // 搜索部分
    goodsInfo: {}, //商品信息
    tagArr: [], //满减优惠标签
    hotWord: [], //搜索热词
    searchList: {
      //搜索结果
      total: 0,
      list: [],
    }, //搜索结果
    // total: 0,//搜索总条数
    params: {
      page: 1,
      size: 10,
    },
    // --模块信息
    classData: [], //分类商品信息
    classType: {
      //分类商品选中状态
      val: {},
      index: 0,
    },
    classInfo: [], //分类商品信息
    startGoods: [], //明星商品信息
    couponsArr: [], //优惠券列表
    spikeGoods: {}, //信息-秒杀
    showAddBtn: false, //是否显示提示开启授权

    addInfoMsg: {}, //上次定位数据地图数据
    existArr: [], //营销区域集合
    addressList: [], //收货地址
    existFlag: false, //营销区域请求发生
    stationList: [], //附近门店列表
    stationTotal: 0,
    historyStationList: [], //历史门店列表
    historyStationTotal: 0,
    stationType: 1, // 1 附近门店    0 历史门店
    //nf13-二维码推荐
    referrerPhone: "", //推荐人手机号
    // fc-04小优优化
    xiaoyouMoney: {
      isDist: false, //是否注册小优
      maxCommission: 0, //分享最高可得
    },
    xyInfo: null, //小优信息
    // 附件门店
    recentShopList: [],
  },
  getters: {
    // 处理分类商品
    C_classData(state: any) {
      if (!state.classData.length) return null;
      const arr = {left: [], right: []};
      const len = state.classData.length;
      if (len >= 2) {
        arr.left.push(state.classData[0]);
        for (let i = 1; i < len; i++) {
          if (2 * i < len) {
            arr.left.push(state.classData[2 * i]);
          }
          if (2 * i - 1 < len) {
            arr.right.push(state.classData[2 * i - 1]);
          }
        }
      } else {
        arr.left.push(state.classData[0]);
      }
      return arr;
    },
    C_sticeData(state: any) {
      let arr = [];
      state.U_homeList.forEach((el) => {
        if (el.type === 2) {
          arr = el.value;
          // return arr;
        }
      });
      return arr;
    },
  },
  mutations: {
    //推荐人手机号
    vuexSetReferrerPhone(state: any, payload: string | number) {
      state.referrerPhone = payload;
    },
    /**附近门店 */
    V_setStationList(state: any, payload: any[]) {
      state.stationType = 1;
      state.stationList = payload;
    },
    /**附近门店页码 */
    V_setStationTotal(state: any, payload: number) {
      state.stationTotal = payload;
    },
    /**历史门店 */
    V_setHistoryStationList(state: any, payload: any[]) {
      state.historyStationList = payload;
    },
    /**历史门店页码 */
    V_setHistoryStationTotal(state: any, payload: number) {
      state.historyStationTotal = payload;
      state.historyTotalPage = Math.ceil(payload / 10);
    },
    /**门店类型 */
    V_setStationType(state: any, payload: number) {
      state.stationType = payload;
    },
    //改变营销区域请求发生
    V_setExistFlag(state: any, value: boolean) {
      state.existFlag = value;
    },
    //收货地址LIST
    V_setAddressList(state: any, payload: any) {
      // let newPayload = payload.map((item, index) => {
      //   return { ...item, choose: index === 0 };
      // });
      // return (state.addressList = newPayload);
      return (state.addressList = payload);
    },
    // 收货地址选中后修改choose
    V_setAddressChoose(state: any, payload: any) {
      return (state.addressList = payload);
    },
    // 营销区域
    V_setExistArr(state: any, payload: any) {
      uni.setStorageSync("exArr", payload);
      state.existArr = payload;
    },
    V_setShowAddBtn(state: any, payload: boolean) {
      return (state.showAddBtn = payload);
    },
    //定位数据
    V_setAddInfoMsg(state: any, payload: any) {
      const data = {
        ...payload,
        latitude: payload.latitude || payload.lat,
        longitude: payload.longitude || payload.lng,
      };
      console.log(data, "data");
      uni.setStorageSync("addinfo", data);
      return (state.addInfoMsg = data);
    },
    // 首页配置
    V_getHome(state: any, payload: any) {
      return (state.U_homeList = payload);
    },
    //更新参数
    V_changeParams(state: any, payload: {page: number}) {
      return (state.params.page = payload.page);
    },
    //广告
    V_postAdv(state: any, payload: any) {
      return (state.advInfo = payload);
    },
    //埋点打开
    V_putAdvOpen(state: any, payload: any) {
      return (state.advopen = payload);
    },
    // 商品信息更新
    V_getDetail(state: any, payload: any) {
      return (state.goodsInfo = payload);
    },
    // 满减优惠
    V_getTags(state: any, payload: any) {
      return (state.tagArr = payload);
    },
    //搜索热词
    V_getHot(state: any, payload: any) {
      return (state.hotWord = payload);
    },
    //搜索结果
    V_postSearch(state: any, payload: any) {
      if (payload.totalElements > 10) {
        return (
          (state.searchList.list = [
            ...state.searchList.list,
            ...payload.content,
          ]),
          (state.searchList.total = payload.totalElements)
        );
      } else {
        return (
          (state.searchList.list = payload.content),
          (state.searchList.total = payload.totalElements)
        );
      }
    },
    //明星商品
    V_startGoods(state: any, payload: any) {
      return (state.startGoods = payload);
    },
    //分类商品信息
    V_getClass(state: any, payload: any) {
      return (state.classData = payload);
    },
    // 分类选中状态
    V_selcetClass(state: any, payload: any) {
      return (state.classType = payload);
    },
    //分类商品信息
    V_getClassInfo(state: any, payload: any) {
      return (state.classInfo = payload);
    },
    // 优惠券列表
    V_getCoupons(state: any, payload: any) {
      return (state.couponsArr = payload);
    },
    // 秒杀商品列表
    V_getSpikes(state: any, payload: any) {
      return (state.spikeGoods = payload);
    },
    // 小优分享金额
    set_xiaoyouMoney(state: any, payload: any) {
      return (state.xiaoyouMoney = payload);
    },
    // 小优用户信息
    set_XYinfo(state: any, payload: any) {
      uni.setStorageSync("xiaoyouInfo", payload);
      return (state.xyInfo = payload);
    },
    set_recentShopList(state: any, payload: any) {
      return (state.recentShopList = payload);
    },
  },
  actions: {
    //营销区域 查询经纬度
    async X_getExistArr(
      {commit, dispatch},
      parmas?:
        | {
            latitude?: string;
            longitude?: string;
            fn?: () => void;
            back?: boolean;
            digitalShop: boolean;
          }
        | any
    ) {
      try {
        let par = {
          appId: Global_Cog.APPID,
          areaName: "", //区
          cityName: "", //市
          provinceName: "", //省
          lat: parmas.latitude,
          lng: parmas.longitude,
          address: parmas.address,
        };
        const address = await gpsToAddress(par.lat, par.lng);
        console.log(address, "data2");
        const {provinceName, cityName, areaName, formatted_address} = address;
        par.areaName = areaName;
        par.cityName = cityName;
        par.provinceName = provinceName;
        par.address = formatted_address;
        const res: any = await api.$post(apiurl.home.existproduct, par);
        commit("V_setExistArr", res.data);
        //更新发生营销区域请求
        commit("V_setExistFlag", true);
        if (res.code === "00000" && parmas.back) {
          uni.navigateBack({delta: 1});
        }
      } catch (error) {
        console.log(error, "error");
        uni.showToast({
          title: "地址解析失败",
          icon: "none",
          duration: 3000,
        });
      } finally {
        parmas.digitalShop && (await dispatch("X_getStationList"));
      }
    },
    //营销区域 查询经纬度
    async X_getLanuchExistArr(
      {commit, dispatch},
      parmas?:
        | {
            longitude?: string;
            latitude?: string;
            fn?: () => void;
            back?: boolean;
          }
        | any
    ) {
      try {
        let par = {
          appId: Global_Cog.APPID,
          areaName: "", //区
          cityName: "", //市
          provinceName: "", //省
          lat: parmas.latitude,
          lng: parmas.longitude,
          address: "",
        };
        let defaultData = {};
        if (!parmas.latitude) {
          // 无定位是获取公司定位
          const res = await dispatch("getDefaultAppAddress");
          defaultData = res;
          par.lat = res.lat;
          par.lng = res.lng;
        }
        let parmasData = {...par};
        try {
          // 解析
          const address = await gpsToAddress(parmasData.lat, parmasData.lng);
          if (address) {
            const {provinceName, cityName, areaName, formatted_address} =
              address;
            par.areaName = areaName;
            par.cityName = cityName;
            par.provinceName = provinceName;
            par.address = formatted_address;
            parmasData = {...par};
            if (!parmas.latitude) {
              commit("V_setAddInfoMsg", {...defaultData});
            } else {
              // 取公司地址
              commit("V_setAddInfoMsg", parmasData);
            }
          } else {
            parmasData = {...par, ...defaultData};
            //保存位置信息
            commit("V_setAddInfoMsg", parmasData);
          }
        } catch (e) {
          // 解析失败
          parmasData = {...par, ...defaultData};
          //保存位置信息
          commit("V_setAddInfoMsg", parmasData);
        }
        console.log(parmasData, "parmasData");
        const res: any = await api.$post(apiurl.home.existproduct, parmasData);
        commit("V_setExistArr", res.data);
        //更新发生营销区域请求
        commit("V_setExistFlag", true);
        if (res.code === "00000" && parmas.back) {
          uni.navigateBack({delta: 1});
        }
      } catch (error) {
        //
      }
    },
    async getDefaultAppAddress() {
      try {
        const {data} = (await api.$get(
          apiurl.home.appIdXcx + `?appId=${Global_Cog.APPID}`
        )) as any;
        return data as DefaultAddressData;
      } catch (e) {
        //
      }
    },
    // 收货地址查询
    async X_getAddressList({commit}) {
      try {
        const {data}: any = await api.$get(address.addressList);
        if (data.length) {
          commit("V_setAddressList", data);
        }
      } catch (error) {}
    },
    // 优惠查询
    async X_getTags(content: any) {
      try {
        const {data}: any = await api.$post(
          apiurl.product.tags,
          content.state.goodsInfo.arrtag
        ); //优惠
        const tagArr = [];
        data.map((el: any) => {
          if (el.activityType === activityTypeEnum.FULL_DISCOUNT_MONEY) {
            const bigmoney = noformatAmount(el.conditionAmount); //满多少
            const smallmoney = noformatAmount(el.reduced); //减多少
            tagArr.push(`满${bigmoney}减${smallmoney}`);
          } else if (el.activityType === activityTypeEnum.FULL_DISCOUNT_ITEM) {
            // 满赠
            el.giftGoodsDTOList.forEach((item: any) => {
              tagArr.push(
                `满${el.conditionItems}${data.unit}赠${item.giftGoodsItems}${
                  item.unit ? item.unit : ""
                }`
              );
            });
          }
        });
        content.commit("V_getTags", tagArr); //优惠
      } catch (error) {}
    },

    //查询热词
    async X_getHot({commit}) {
      try {
        const {data}: any = await api.$get(apiurl.home.hotword);
        commit("V_getHot", data);
      } catch (error) {}
    },
    // 搜索
    async X_postSearch({commit}, params: searchType) {
      try {
        const {data}: any = await api.$post(apiurl.home.search, params);
        commit("V_postSearch", data);
      } catch (error) {}
    },
    // 开屏广告请求
    async X_postAdv({commit}, params: {appId: string; soleLogo: string}) {
      try {
        const {data}: any = await api.$post(apiurl.home.adv, params);
        commit("V_postAdv", data);
      } catch (error) {}
    },
    // 开屏打开埋点--点击后
    async X_putAdvOpen({commit}, advid: string | number) {
      try {
        const {data}: any = await api.$put(
          apiurl.home.point + `?id=${advid}`,
          {}
        );
      } catch (error) {}
    },
    //开屏曝光--展示后
    async X_putAdvExposure({commit}, advid: string | number) {
      try {
        const {data}: any = await api.$put(
          apiurl.home.expoint + `?id=${advid}`,
          {}
        );
      } catch (error) {}
    },
    // 首页配置信息获取

    async X_getHome({commit, state}) {
      try {
        const appid = Global_Cog.APPID;
        const {data}: any = await api.$get(apiurl.home.homepage, appid);
        let res = JSON.parse(data.configJson);
        // return;
        let cur = null;
        const resLen = res.length;
        for (let i = 0; i < resLen; i++) {
          if (res[i].type === 2) {
            const inx = state.classType.index;
            const len = res[i].value.length;
            for (let j = 0; j < len; j++) {
              const listLeng = res[i].value[j].goodsList.length;
              for (let k = 0; k < listLeng; k++) {
                res[i].value[j].goodsList[k] = {
                  spuCode: res[i].value[j].goodsList[k].spuCode,
                };
              }
            }
            commit("V_selcetClass", {val: res[i].value[inx], index: inx});
            cur = i;
          }
        }
        if (cur) {
          const arrs = JSON.parse(JSON.stringify(res));
          const newarr = arrs.splice(cur, 1, {type: 2, value: []});
          let timer = setTimeout(() => {
            const newChildArr = newarr[0]?.value.map((el, index) => {
              const elArr = el.goodsList?.map((item: any) => {
                item = {
                  spuCode: item.spuCode,
                };
                return item;
              });
              return {
                ...el,
                goodsList: elArr,
              };
            });
            commit("V_getClassInfo", newChildArr);
            clearTimeout(timer);
            timer = null;
          }, 300);
        }
        // const newarr = res.splice(cur, 1, { type: 2, value: [] });
        commit("V_getHome", res);
      } catch (error) {
        //
      }
    },
    // 分类商品信息
    async X_getClass({state, commit}, val: any) {
      try {
        const spuCodeArr = [];
        val &&
          val.goodsList.forEach((el: any) => {
            spuCodeArr.push(el.spuCode);
          });
        const par = {
          areaCodes: state.existArr,
          spuCodes: spuCodeArr,
        };
        const {data}: any = await api.$post(apiurl.home.batch, par, " ", true);
        commit("V_getClass", data);
      } catch (error) {}
    },
    // 明星商品
    async X_startGoods({state, commit}, info: any) {
      try {
        let infos = [];
        info.forEach(async (element: any) => {
          //跳详情查询是否在营销区域
          if (element.urlType === urltypeEnum.zero) {
            const pars = {
              spuCodes: [element.spuCode],
              areaCodes: state.existArr,
            };
            const {data}: any = await api.$post(apiurl.home.batch, pars);
            const info = {
              ...element,
              ...data[0],
            };
            if (data.length) {
              infos.unshift(info);
            }
          }
        });
        commit("V_startGoods", infos);
      } catch (error) {}
    },
    //优惠券更新
    async X_getCoupons({commit}, val: any[]) {
      try {
        const codeArr = [];
        val &&
          val.forEach((el) => {
            codeArr.push(el.code);
          });
        const {data}: any = await api.$post(apiurl.home.couponList, codeArr);
        commit("V_getCoupons", data);
      } catch (error) {
        //
      }
    },
    // 秒杀商品
    async X_getSpikes({commit}, val: any) {
      try {
        const codeArr = [];
        val.activitySeckillProductSpuNewDTOS &&
          val.activitySeckillProductSpuNewDTOS.forEach((el: {spuCode: any}) => {
            codeArr.push(el.spuCode);
          });
        const para = {
          appId: Global_Cog.APPID,
          spuCodes: codeArr.slice(0, val.showNum),
          activityCode: val.activityCode,
        };
        const {data}: any = await api.$post(apiurl.home.spikeList, para);
        data.minute = data.planEndTime - data.planStartTime;
        commit("V_getSpikes", data);
      } catch (error) {}
    },

    /**
     * 获取附近门店
     */
    async X_getStationList({commit, state}, payload: any) {
      try {
        const local = uni.getStorageSync("addinfo");
        const obj = {
          latitude: local.lat ? local.lat : local.latitude,
          longitude: local.lng ? local.lng : local.longitude,
        };
        const param = {
          latitude:
            payload?.latitude ||
            (state.addInfoMsg.latitude
              ? state.addInfoMsg.latitude
              : obj.latitude),
          appId: Global_Cog.APPID,
          longitude:
            payload?.longitude ||
            (state.addInfoMsg.longitude
              ? state.addInfoMsg.longitude
              : obj.longitude),
        };
        // 附近门店
        const {data}: any = await api.$post(apiurl.home.shopList, {
          ...param,
          ...payload,
        });
        commit("V_setStationList", data);
        commit("V_setStationTotal", data.length);
      } catch (error) {
        console.log("接口失败了", error);
      }
    },
    /**
     * 获取历史门店
     */
    async X_getHistoryStationList({commit, state}, payload: any) {
      try {
        const local = uni.getStorageSync("addinfo");
        const obj = {
          latitude: local.lat ? local.lat : local.latitude,
          longitude: local.lng ? local.lng : local.longitude,
        };
        const param = {
          latitude:
            payload?.latitude ||
            (state.addInfoMsg.latitude
              ? state.addInfoMsg.latitude
              : obj.latitude),
          appId: Global_Cog.APPID,
          longitude:
            payload?.longitude ||
            (state.addInfoMsg.longitude
              ? state.addInfoMsg.longitude
              : obj.longitude),
        };
        // 历史门店
        const {data}: any = await api.$post(apiurl.home.shopHistoryList, {
          ...param,
        });
        commit("V_setHistoryStationList", data);
        commit("V_setHistoryStationTotal", data.length);
      } catch (error) {
        //
      }
    },

    //小优用户信息
    async get_XYinfo({commit}) {
      try {
        const {data}: any = await api.$postX(
          `${URLDistributor.check}?appid=${Global_Cog.APPID}`
        );
        if (data && typeof data !== "string") {
          commit("set_XYinfo", data);
        }
      } catch (error) {
        //
      }
    },
    /*是否显示小优分享金额 */
    async get_xiaoyouMoney({commit, dispatch}, payload?: boolean) {
      try {
        const check = payload ? payload : false;
        const {data}: any = await api.$getX(URLDistributor.commission);
        commit("set_xiaoyouMoney", data);
        if (data && data.isDist && !check) {
          // 获取小优用户信息
          dispatch("get_XYinfo");
        }
      } catch (error) {}
    },
    async get_recentShopList({commit, dispatch, state}) {
      try {
        const {data}: any = await api.$get(apiurl.home.recentShopList, {
          appId: Global_Cog.APPID,
          latitude: state.addInfoMsg.latitude || state.addInfoMsg.lat,
          longitude: state.addInfoMsg.longitude || state.addInfoMsg.lng,
        });

        commit("set_recentShopList", data);
      } catch (error) {
        console.log(error, "err");
      }
    },
  },
};
