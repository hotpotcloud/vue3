import api from "@/utils/api";
import {
  activityTypeEnum,
  combGoods,
  productStatusEnum,
  skillEnum,
  cumulateType,
  skillTipsEnum,
  SALE_TYPE,
} from "@/utils/enum";
import apiurl from "@/utils/url";
import { formatAmount, noformatAmount } from "@/utils/utils";
import { Global_Cog } from "@/utils/config";
const appid = Global_Cog.APPID;
export default {
  namespaced: true,

  state: {
    productinfo: {}, //详情数据
    dealNums: {}, //初始数量
    params: {}, //下单参数
    xtags: [], //优惠
    xticket: [], //优惠券
    time: "", //起送时间
    arrtime: [], //时间范围
    tip: "", //所选商品提示
    activeType: {
      //选中状态
    },
    skillType: {
      showKillTime: false, //计时开始
      skillTimes: 0, //秒杀时间
    },
    // 星期送
    weekList: [],
    // 满减满赠
    fullList: [],
    // fc11 漫江满赠
    saleTag: {},
    ticketTag: [], //优惠券
  },

  getters: {
    vuexCombo(state: any) {
      //组合商品的明细
      if (
        state.productinfo.numlist?.skuType === combGoods.ITEM_PRODUCT &&
        state.productinfo.status === productStatusEnum.PRODUCT_ON
      ) {
        //未下架的组合
        console.log("组合商品信息！！！！！！", state.productinfo.numlist);
        return state.productinfo.numlist.skuInfoList;
      } else return [];
    },

    vuexPriceToal(state: any) {
      //算价
      // 是否原价
      if (state.productinfo.numlist?.killSymbal) {
        if (
          state.productinfo.numlist.killDTO.status === skillEnum.PROGRESSING
        ) {
          const price = !state.productinfo.numlist.killLimt
            ? state.productinfo.numlist.minPrice
            : state.productinfo.numlist.killReserve == 0
            ? state.productinfo.numlist.minPrice
            : state.productinfo.numlist.killPrice;
          return formatAmount(state.productinfo?.max * price);
        } else
          return formatAmount(
            state.productinfo?.max * state.productinfo.numlist.minPrice
          );
      } else {
        return formatAmount(
          state.productinfo?.max * state.productinfo.priceNow
        );
      }
    },
    vuexTips(state: any) {
      const text = `已选:${state.productinfo.numlist?.skuNickName},共配送${state.productinfo.max}${state.productinfo.unitName}`;
      return text;
    },
    // 处理满减满赠显示
    xtag(state: any) {
      let arr = [];
      const arrtag = state.xtags;
      if (arrtag) {
        arr = arrtag.map((el: any) => {
          if (el.includes("减")) {
            el = "满减";
          }
          if (el.includes("赠")) {
            el = "满赠";
          }
          return el;
        });
      } else {
        return [];
      }
      arr = [...new Set(arr)];
      return arr;
    },
    //满减
    xtag_minus(state: any) {
      let minus = [];
      const arr = state.xtags;
      if (arr) {
        arr.map((tag: string) => {
          if (tag.includes("减")) {
            minus.push(tag);
          }
        });
      } else {
        return [];
      }
      return minus;
    },
    xtag_add(state: any) {
      let add = [];
      const arr = state.xtags;
      if (arr) {
        arr.map((tag: string) => {
          if (tag.includes("赠")) {
            add.push(tag);
          }
        });
      } else {
        return [];
      }
      return add;
    },
    // 下单状态判断s
    X_buys(state: any) {
      // await dispatch('X_skill') //刷新库存-状态
      if (!state.productinfo.numlist?.killSymbal) return skillEnum.WAIT_START; //原价买
      console.log(" 刷新库存中。。。。");
      if (state.productinfo.numlist.killDTO.status === skillEnum.PROGRESSING) {
        //库存or限购
        if (state.productinfo.numlist.killReserve != 0) {
          return state.productinfo.numlist.killLimt
            ? skillEnum.PROGRESSING
            : skillEnum.WAIT_START;
        } else {
          return skillEnum.WAIT_START;
        }
      }
    },
    // 秒杀时优惠互斥
    X_mutual(state: any) {
      let discount = {
        tag: true,
        coupon: true,
        all: true,
      };
      if (!state.productinfo.numlist?.killSymbal) return discount;
      switch (state.productinfo.numlist.cumulateType) {
        case cumulateType.NO: //都不显示
          return (discount = {
            tag: false,
            coupon: false,
            all: false,
          });
        case cumulateType.COUPON: //优惠券
          return (discount = {
            tag: false,
            coupon: true,
            all: true,
          });
        case cumulateType.COUPONANDDISCOUNT: //都显示
          return (discount = {
            tag: true,
            coupon: true,
            all: true,
          });
        case cumulateType.DISCOUNT: //只显示满减满赠
          return (discount = {
            tag: true,
            coupon: false,
            all: true,
          });
      }
    },
    X_channelSkuCode(state: any) {
      state.productinfo;
    },
  },

  mutations: {
    // fc11满减满赠
    set_saleTag(state: any, payload: any) {
      state.saleTag = payload;
    },
    set_ticketTag(state: any, payload: any) {
      state.ticketTag = payload;
    },
    //满减满赠
    setFullList(state: any, payload: any) {
      //payload去重
      const newArr = Array.from(new Set(payload));
      console.log("newArr", newArr);
      state.fullList = newArr;
    },
    //星期送
    setWeekList(state: any, payload: any) {
      console.log("payload--星期", payload);
      state.weekList = payload;
    },
    topay(state: any, payload: any) {
      return (state.params = payload);
    },
    //优惠标签--满减
    xtags(state: any, payload: any) {
      return (state.xtags = payload);
    },
    //优惠标签--满赠
    xgiftTag(state: any, payload: any) {
      return state;
    },
    // 优惠券
    V_ticket(state: any, payload: any) {
      return (state.xticket = payload);
    },

    check(state: any, payload: any) {
      //详情
      // payload.maxPrice = formatAmount(payload.maxPrice)//处理价格
      // payload.minPrice = formatAmount(payload.minPrice)//处理价格
      console.log("vuexxxxx", payload);
      return (state.productinfo = { ...payload });
    },
    setTime(state: any, payload: string) {
      //起送时间
      return (
        (state.time = payload),
        (state.productinfo = { ...state.productinfo, time: payload })
      );
    },
    setTimeArr(state: any, payload: any) {
      //时间范围
      return (state.arrtime = payload);
    },
    dealNum(state: any, payload: any) {
      return (state.dealNums = payload);
    },
    // 改变秒杀
    changeSkill(state: any, payload: any) {
      return (state.skillType = { ...payload });
    },
  },
  actions: {
    // 获取商品分类信息
    async getProductClass(state: any, payload: any) {},
    //获取商品详情
    async X_modaldetail(
      { rootState, dispatch, commit, state },
      spuid: string | number
    ) {
      try {
        // 初始化下单优惠选择
        commit(
          "order/V_setorderPar",
          {
            couponCode: null, //优惠券编码
            defaultCouponCodeFlag: null,
          },
          { root: true }
        );
        let par = {
          appId: appid,
          spuCode: spuid,
          areaCodes: rootState.home.existArr,
          distId: "",
        };
        const status = rootState.user.loginStatus;
        //是否分享进入
        if (rootState.xiaoyou.distId && status) {
          //验证是否小优用户
          dispatch("xiaoyou/v_getXYcheck", {}, { root: true });
          const res = rootState.xiaoyou.xiaoyouInfo;
          if (res.id) {
            //是小优用户显示赚钱金额
            par.distId = rootState.xiaoyou.distId;
          }
        }
        const res: any = await api.$post(
          apiurl.product.info,
          par,
          "加载中...",
          true
        );
        //处理详情
        if (res.code == "00000") {
          const data = res.data;
          const leng = data.skuChannelInfoList?.length;
          const arr = [];
          let obj = null;
          if (data.status != productStatusEnum.PRODUCT_DELETE) {
            data.companyName
              ? (data.propertyValueList = [
                  { propertyName: "供应商", propertyValue: data.companyName },
                  ...data.propertyValueList,
                ])
              : (data.propertyValueList = [...data.propertyValueList]);
            for (let j = 0; j < leng; j++) {
              console.log(
                "data.skuChannelInfoList[i].channelSkuCode----sit",
                j
              );
              arr.push(data.skuChannelInfoList[j].channelSkuCode);
            }

            for (let i = 0; i < leng; i++) {
              if (data.skuChannelInfoList[i].killSymbal) {
                if (
                  data.skuChannelInfoList[i].killPrice == data.minPrice ||
                  data.maxPrice
                ) {
                  obj = {
                    skillFlag:
                      data.skuChannelInfoList[i].killDTO.status !=
                      skillEnum.FINISH,
                    arrtag: arr, //查优惠code
                    priceNow:
                      data.skuChannelInfoList[i].killDTO.status !=
                      skillEnum.FINISH
                        ? data.skuChannelInfoList[i].killPrice
                        : data.skuChannelInfoList[i].minPrice, //当前秒杀价
                    activeSize:
                      data.status === productStatusEnum.PRODUCT_OFF ? -1 : i,
                    activeNum:
                      data.status === productStatusEnum.PRODUCT_OFF ? -1 : 0, //数量
                    activeDay:
                      data.status === productStatusEnum.PRODUCT_OFF ? -1 : 0, //配送方式
                    numlist: data.skuChannelInfoList[i], //默认数量数组-规格
                    goodscode: data.skuChannelInfoList[i].channelSkuCode, //默认规格code
                    max: data.skuChannelInfoList[i].saleNums[0], //默认数量和每次配送默认max
                    defaultNum: 1, //默认每次配送
                    reserve: data.skuChannelInfoList[i].reserve != 0, //默认库存判断
                    maxtime: "2045-10-22",
                    time: "",
                    maxMoney:
                      data.skuChannelInfoList[i].minPrice !=
                      data.skuChannelInfoList[i].maxPrice
                        ? formatAmount(data.skuChannelInfoList[i].maxPrice)
                        : "",
                    minMoney: formatAmount(data.skuChannelInfoList[i].minPrice),
                    killMoney: data.skuChannelInfoList[i].killSymbal
                      ? formatAmount(data.skuChannelInfoList[i].killPrice)
                      : 0,
                  };
                }
                break;
              } else {
                console.log("5", 5);
                if (
                  data.skuChannelInfoList[i].unitPrice == data.price &&
                  data.skuChannelInfoList[i].minPrice == data.minPrice &&
                  !data.killSymbal
                ) {
                  obj = {
                    skillFlag: false, //非秒杀
                    arrtag: arr, //查优惠code
                    priceNow: data.skuChannelInfoList[i].minPrice, //当前最低单价
                    activeSize:
                      data.status === productStatusEnum.PRODUCT_OFF ? -1 : i,
                    activeNum:
                      data.status === productStatusEnum.PRODUCT_OFF ? -1 : 0, //数量
                    activeDay:
                      data.status === productStatusEnum.PRODUCT_OFF ? -1 : 0, //配送方式
                    numlist: data.skuChannelInfoList[i], //默认数量数组
                    goodscode: data.skuChannelInfoList[i].channelSkuCode, //默认规格code
                    max: data.skuChannelInfoList[i].saleNums[0], //默认数量和每次配送默认max
                    defaultNum: 1, //默认每次配送
                    reserve: data.skuChannelInfoList[i].reserve != 0, //默认库存判断
                    maxtime: "2035-10-22",
                    time: "",
                    maxMoney:
                      data.skuChannelInfoList[i].minPrice !=
                      data.skuChannelInfoList[i].maxPrice
                        ? formatAmount(data.skuChannelInfoList[i].maxPrice)
                        : "",
                    minMoney: formatAmount(data.skuChannelInfoList[i].minPrice),
                  };
                  break;
                }
              }
            }
            commit("check", { ...data, ...obj }); //添加数据
          } else {
            commit("check", { ...data }); //添加数据
          }
          await dispatch("X_postTags");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    // 秒杀时间计算
    async X_skillTime({ commit, state, dispatch }) {
      commit("changeSkill", {
        showKillTime: false,
        skillTimes: 0,
      });
      if (!state.productinfo.numlist.killSymbal) return;
      let { numlist } = state.productinfo;
      const diffTime = Math.abs(
        numlist.killDTO.planStartTime - numlist.killDTO.planEndTime
      );
      console.log(diffTime, "7.29开始秒杀---》");
      //预告开始前
      if (
        numlist.killDTO.status === skillEnum.WAIT_START &&
        numlist.killDTO.foreshowType === skillTipsEnum.BEFORE_START_ACTIVITY
      ) {
        if (diffTime <= numlist.killDTO.foreshowTime) {
          commit("changeSkill", {
            showKillTime: true, //计时开始
            skillTimes: diffTime, //秒杀时间
          });
        } else {
          const diff = diffTime - numlist.killDTO.foreshowTime;
          setTimeout(async () => {
            await dispatch("X_skill");
            commit("changeSkill", {
              showKillTime: true,
              skillTimes: numlist.killDTO.foreshowTime,
            });
          }, diff);
        }
      } else if (numlist.killDTO.status === skillEnum.PROGRESSING) {
        // 游戏开始--预热
        const time =
          numlist.killDTO.planEndTime - numlist.killDTO.planStartTime;
        commit("changeSkill", {
          showKillTime: true,
          skillTimes: time,
        });
      } else if (
        numlist.killDTO.status === skillEnum.WAIT_START &&
        numlist.killDTO.foreshowType === skillTipsEnum.AFTER_CREATE_ACTIVITY
      ) {
        commit("changeSkill", {
          showKillTime: true,
          skillTimes: numlist.killDTO.foershowTime,
        });
      }
    },
    // 秒杀刷新 库存
    async X_skill({ commit, state }) {
      try {
        if (!state.productinfo.numlist.killSymbal) return;
        const { data }: any = await api.$get(
          apiurl.product.killReserve +
            `${state.productinfo.numlist.channelSkuCode}` +
            `/${appid}`,
          {}
        );
        commit("check", {
          ...state.productinfo,
          killFlag: data.killSymbal
            ? data.killDTO.status != skillEnum.FINISH
            : false,
          numlist: {
            ...state.productinfo.numlist,
            killLimt: data.killLimt,
            // killLimt: false,
            killPrice: data.killPrice,
            killReserve: data.killReserve, //库存
            // killReserve: 0,//库存
            killSymbal: data.killSymbal,
            killDTO: {
              ...data.killDTO,
              // status: skillEnum.PROGRESSING
            },
          },
          priceNow:
            data.killSymbal && data.killDTO.status != skillEnum.FINISH
              ? data.killPrice
              : state.productinfo.numlist.minPrice,
          killMoney: formatAmount(data.killPrice),
        });
      } catch (error) {}
    },
    //满减满赠
    async X_postTags({ commit, state }) {
      try {
        if (state.productinfo.status === productStatusEnum.PRODUCT_DELETE)
          return;
        const arr = state.productinfo.arrtag;
        const { data }: any = await api.$post(apiurl.product.tags, arr); //优惠
        const tagArr = []; //满减，满赠
        const tagGift = []; //满赠
        const list = {}; //满减满赠标签
        data?.forEach((el: any) => {
          //满好多钱减
          if (el.activityType === activityTypeEnum.FULL_DISCOUNT_MONEY) {
            const bigMoney = noformatAmount(el.conditionAmount, true); //满多少
            if (el.reduced) {
              //减钱
              const smallMoney = noformatAmount(el.reduced, true); //减多钱
              tagArr.push(`满${bigMoney}元减${smallMoney}元`);
              list[SALE_TYPE.FULL_REDUCTION] = tagArr;
            }
            if (el.giftGoodsDTOList && el.giftGoodsDTOList.length) {
              el.giftGoodsDTOList.forEach((item: any) => {
                const gift = `满${bigMoney}元赠${item.name}${item.giftGoodsItems}${item.unit}`;
                tagGift.push(gift);
              });
              list[SALE_TYPE.FULL_GIFT] = tagGift;
            }
            //满好多件减
          } else if (el.activityType === activityTypeEnum.FULL_DISCOUNT_ITEM) {
            const fullNum = el.conditionItems; //满多少件
            if (el.reduced) {
              //减钱
              const smallMoney = noformatAmount(el.reduced, true); //减多钱
              tagArr.push(
                `满${fullNum}${state.productinfo.unitName}减${smallMoney}元`
              );
              list[SALE_TYPE.FULL_REDUCTION] = tagArr;
            }
            if (el.giftGoodsDTOList && el.giftGoodsDTOList.length) {
              el.giftGoodsDTOList.forEach((item: any) => {
                const gift = `满${fullNum}${state.productinfo.unitName}赠${item.name}${item.giftGoodsItems}${item.unit}`;
                tagGift.push(gift);
              });
              list[SALE_TYPE.FULL_GIFT] = tagGift;
            }
          }
        });
        const arrList = [...tagArr, ...tagGift];
        console.log("list---优惠-0919", list);
        commit("xtags", arrList); //满减满赠
        commit("set_saleTag", list); //满减满赠fc11
      } catch (error) {
        console.log("error", error);
      }
    },
    // 优惠券
    async X_ticket({ commit, state }) {
      try {
        console.log("state.productinfo.spuCode-2", state.productinfo.spuCode);
        if (state.productinfo.status === productStatusEnum.PRODUCT_DELETE)
          return;
        const { data }: any = await api.$get(
          apiurl.product.ticket + `${state.productinfo.spuCode}`
        );
        // 处理显示
        let tag = [];
        if (data?.length) {
          data.forEach((item: any) => {
            // 满金额优惠 优惠券类型 1-满减金额，2-满折金额
            if (item.couponType === 1) {
              if (item.condtionType === 1) {
                const str = `减${noformatAmount(item.reduced, true)}元`;
                tag.push(str);
              } else if (item.condtionType === 2) {
                const str = `满${noformatAmount(
                  item.condtionAmount,
                  true
                )}元减${noformatAmount(item.reduced, true)}元`;
                tag.push(str);
              }
            } else if (item.couponType === 2) {
              if (item.condtionType === 1) {
                const str2 = `${item.reduced / 100}折`;
                tag.push(str2);
              } else if (item.condtionType === 2) {
                const str2 = `满${noformatAmount(item.condtionAmount, true)}元${
                  item.reduced / 100
                }折`;
                tag.push(str2);
              }
            }
          });
          console.log("tag", tag);
          // commit("set_ticketTag", tag);
        }
        console.log("tag", tag);
        commit("set_ticketTag", tag);
        commit("V_ticket", data);
      } catch (error) {}
    },

    // 处理起送时间+范围
    async X_postStartSendTime({ state, commit }) {
      console.log("state.weekList", state.weekList);
      const par = {
        appId: appid,
        channelSkuCode: state.productinfo.goodscode,
        deliveryDetails: state.weekList.join(","),
        // deliveryRuleEnums: state.productinfo.ruleEnum,
      };
      const { data }: any = await api.$post(apiurl.product.time, par);

      commit("setTime", data);
    },
    // 配送范围
    async X_sendTimeArr({ commit, state }) {
      if (state.productinfo.status === productStatusEnum.PRODUCT_DELETE) return;
      const params = {
        appId: appid,
        channelSkuCode: state.productinfo.goodscode,
        deliveryCount: state.productinfo.defaultNum, //每次配送
        // rule: state.productinfo.ruleEnum,
        startTime: state.productinfo.time ? state.productinfo.time : state.time,
        totalCount: state.productinfo.max,
        deliveryDetails: state.weekList.join(","),
      };
      const res: any = await api.$post(apiurl.product.calendar, params);
      const { timeList }: any = res.data;
      if (res.code === "00000") {
        commit("setTimeArr", timeList);
      }
    },
  },
};
