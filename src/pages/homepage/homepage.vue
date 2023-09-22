<template>
  <view class="home">
    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私弹窗 -->
    <!-- <agreeModel
      :onNeed="false"
      :hideTabBar="true"
      agreeBtnText="同意并继续"
      disagreeBtnText="不同意"
      @disagree="disagreeApp"
      @agree="agreeApp"
    ></agreeModel> -->
    <!-- <custom></custom> -->
    <!-- #endif -->
    <view class="inner">
      <view class="top-bg"><view></view></view>
      <view
        class="top-bar"
        :style="{
          height: navHeight + 'px',
          lineHeight: menuButtonInfo.height + 'px',
          paddingTop: menuButtonInfo.top + 'px',
        }"
      >
        鲜活go
      </view>
      <!-- 广告 -->
      <hAdv :showAdv="showAdv" @closeAdv="closeAdv" :urldata="advInfoMsg[0]" />
      <!-- 顶部搜索框 -->
      <view class="box">
        <view class="home-search d-flex-center d-flex-nowarp d-sb">
          <view class="home-add" @tap="checkAdd">
            <u-icon
              class="img-icon"
              name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/123dinwei.png"
            ></u-icon>
            <view class="h-over-1 add-main">
              {{ mapText }}
            </view>
            <uni-icons type="right" color="#000000" size="13" />
          </view>
          <view class="search-son d-flex-center d-center" @tap="search">
            <image
              :src="getAssetImgUrl('search.svg')"
              style="width: 48rpx; height: 48rpx"
            ></image>
            <text class="found">搜索</text></view
          >
        </view>
        <!-- 提示开启定位 -->
        <view class="add-tips d-flex-center d-sb" v-if="showAddBtn">
          <view class="tips-left d-flex">
            <uni-icons type="location-filled" color="#C7C7C7" size="13" />
            <view class="off-tip">
              <view class="first-off-tip">定位服务尚未开启</view>
              <view class="sec-off-tip">开启后可看到销售区域实际商品价格</view>
            </view>
          </view>
          <view class="tips-rig d-flex-center">
            <view class="open-btn" @tap="onOpenBtn">去开启</view>
            <uni-icons
              type="closeempty"
              color="#C7C7C7"
              size="13"
              @tap="onCloseBtn"
            />
          </view>
        </view>
      </view>
      <!-- <HShop /> -->
      <view
        class="stick-top"
        v-show="showTopMenu"
        :style="{ 'padding-top': navHeight + 'px' }"
      >
        <hClass :showFlag="false" :val="C_sticeData" />
      </view>
      <!-- <view>
        <button @tap="toMember">会员中心</button>
      </view> -->
      <view v-for="(el, index) in U_homeList" :key="index">
        <!-- 轮播 -->
        <view v-if="el.type === 0">
          <hSwipper :val="el.value" />
        </view>
        <!-- 明星 -->
        <view v-if="el.type === 1">
          <hStart :val="el.value" />
        </view>
        <!-- 分类 -->
        <!-- 没有营销区域也不显示 existArr -->
        <view v-if="el.type === 2 && existArr.length > 0" class="startInfo">
          <hClass :val="classType.info" :showFlag="true" @shareXY="shareXY" />
        </view>
        <!-- 个人信息 -->
        <view v-if="el.type === 3">
          <hTopInfo
            :haveAccount="accountByMember"
            :showAccount="BaseApp.account"
          />
        </view>
        <!-- 图文导航 -->
        <view v-if="el.type === 4">
          <hRowMenu :val="el.value" />
        </view>
        <!-- 优惠券 -->
        <view v-if="el.type === 5">
          <hCoupons :val="el.value" />
        </view>
        <!-- 秒杀 -->
        <view v-if="el.type === 6">
          <hSpike :val="el.value[0]" />
        </view>
        <view v-if="el.type === 7">
          <hGap :val="el.value.height" />
        </view>
        <!-- 优化-8金刚区 -->
        <view v-if="el.type === 8">
          <hInfo :val="el.value" @clickMenu="handle_menu" />
        </view>
        <!-- 优化-9鲜活日记 -->
        <view v-if="el.type === 9">
          <h-date
            ref="xbfs"
            show="true"
            :showMonth="showfuck"
            :checkTime="now"
            @changePage="changeDatePage"
            @onRight="onRight"
            @onLeft="onLeft"
            @clickDay="clickDay"
            @handleGoods="handleGoods"
            @toComment="toComment"
          />
        </view>
        <!-- 附近门店 -->
        <view v-if="el.type === 12">
          <HShop />
        </view>
      </view>
      <view class="font-bottom bottom-more">—— 没有更多了 ——</view>
      <view class="backTop-btn" @click="backTop" v-if="showBackTop"></view>
      <!-- 小优分享 -->
      <movable-view>
        <hXiaoyou />
      </movable-view>
      <!-- 企微弹窗 -->
      <view class="pop" v-if="showChat">
        <view class="pop-wechat">
          <view class="pop-son">
            <img
              class="img-son"
              show-menu-by-longpress="true"
              :src="wechatUrl"
              mode="aspectFit	"
            />

            <view style="text-align: center">长按识别加企微好友</view>
          </view>
          <view class="icon-close">
            <image
              class="img-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/close2X.png"
              mode="aspectFit"
              @tap="closeWechat"
            />
          </view>
        </view>
      </view>
      <view class="share">
        <u-overlay :show="showPanel" @click="closeShare" :opacity="0.45">
          <view class="bottom" @click.stop="stopPropagation">
            <view class="title">分享说明</view>
            <view class="tips"
              >1.好友购买的商品数量越多，您可以获得的佣金也会越高。2.可以通过微信好友将商品分享到微信聊天中，可以生成海报发布到朋友圈或者微信聊天里面。</view
            >
            <view class="list">
              <view class="share-view"
                ><button
                  open-type="share"
                  class="share-btn-view"
                  @tap="onShareBtn"
                >
                  <image
                    src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/weixinicon.png"
                  />
                  <view>微信好友</view>
                </button></view
              >
              <view class="share-method" @click="openCanvasShare">
                <image
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/bannaicon.png"
                />
                <view>生成海报</view>
              </view>
              <view class="share-method" @click="openShowShare">
                <image
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/facetoface.png"
                />
                <view>面对面</view>
              </view>
            </view>
            <view class="btn-container">
              <button class="btn" @click="closeShare">取消</button>
            </view>
          </view>
        </u-overlay>
      </view>
      <!-- 分享canvas -->
      <u-popup
        :show="showCanvas"
        @close="onCloseCanvas"
        :safeAreaInsetBottom="false"
        :round="6"
      >
        <view class="hb-content">
          <view class="d-flex-center d-sb">
            <view class="hb-tip flex-1">生成海报</view>
            <img
              @tap.stop="onCloseCanvas"
              class="close-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
              alt=""
            />
          </view>
          <view class="hb-text">
            将海报保存到手机相册，分享到朋友圈或者微信聊天
          </view>
          <!-- 海报内容 -->
          <view class="hb-main">
            <view class="hb-img">
              <canvas
                canvas-id="canvas"
                style="width: 242px; height: 405px"
              ></canvas>
            </view>
            <view class="hb-save-btn" @click.stop="onSaveHB"
              >保存海报至相册</view
            >
          </view>
        </view>
      </u-popup>
      <!-- 面对面 -->
      <faceShare
        :show="showFaceShare"
        v-on:onCancel="onFaceShareCancel"
        :product="productInfoXiaoyou"
    /></view>
    <!-- 生日弹窗 -->
    <birthday-pop
      :show="isBrithday && BaseApp.isMember"
      :user="userInfo"
      @onClose="onCloseBirth"
      @onClick="onClickBirth"
    />
  </view>
</template>

<script>
import Vue from "vue";
import { webShowType, CalendarValueEnum, urltypeEnum } from "@/utils/enum";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import hSwipper from "@/components/homeComponents/component/h-swipper.vue";
import hInfo from "@/components/homeComponents/component/h-info.vue";
import hRowMenu from "@/components/homeComponents/component/h-rowMenu.vue";
import hSpike from "@/components/homeComponents/component/h-spike.vue";
import hStart from "@/components/homeComponents/component/h-start.vue";
import hClass from "@/components/homeComponents/component/h-class.vue";
import hAdv from "@/components/homeComponents/component/h-adv.vue";
import hCoupons from "@/components/homeComponents/component/h-coupons.vue";
import hGap from "@/components/homeComponents/component/h-gap.vue";
import hTopInfo from "@/components/homeComponents/component/h-topInfo.vue";
import hXiaoyou from "./component/h-xiaoyou.vue";
import HShop from "@/components/homeComponents/component/h-shop.vue";
import birthdayPop from "./component/birthday-pop.vue";
import api from "@/utils/api";
import apiurl, { memberUrl } from "@/utils/url";
import { formatTime, clickNav, noformatAmount } from "@/utils/utils";
import { BaseApp } from "@/const/appIdConf";
import FaceShare from "@/pages/homepage/component/FaceShare.vue";
export default Vue.extend({
  components: {
    hSwipper,
    hInfo,
    hRowMenu,
    hSpike,
    hStart,
    hClass,
    hAdv,
    hCoupons,
    hGap,
    hTopInfo,
    hXiaoyou,
    FaceShare,
    HShop,
    birthdayPop,
  },
  data() {
    return {
      showBirth: false,
      BaseApp,
      now: formatTime("YYYY-mm-dd"),
      urltypeEnum,
      //显示日历
      appId: uni.getAccountInfoSync().miniProgram.appId,
      // 自定义顶部信息
      statusBarHeight: 0, // 状态栏高度
      heightBar: 0, //胶囊高度-搜索高度
      navHeight: 0, // 总体高度 = 状态栏高度 + 导航栏高度
      windowHeight: 0, // 可使用窗口高度
      widthBar: 0, //搜宽度
      appid: uni.getAccountInfoSync().miniProgram.appId,
      showAdv: false, // 广告显示
      wechatUrl: "", // 企微图片
      showChat: false, //企微显示
      advParams: {
        // 开屏参数
        appId: uni.getAccountInfoSync().miniProgram.appId,
        soleLogo: uni.getSystemInfoSync().deviceId, //标识
      },
      advInfoMsg: [], // 广告内容
      couponList: [], //优惠券
      offsetTop: 0, //顶部距离
      showTopMenu: false, //吸顶显示,
      showBackTop: false, //是否显示返回顶部
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      localname: "定位中...", //定位信息
      // 小y
      showPanel: false, //  显示分享面板
      showCanvas: false, // 显示canvas
      canvasInfo: {}, //canvas信息
      ctx: null,
      goodsImg: "", //商品图
      assetPath: "", //海报背景图
      tagPath: "", //大力推荐图
      showFaceShare: false, //面对面
      productInfoXiaoyou: {}, //小y商品信息
      // 自定义分享
      shareInfo: {
        title: "",
        path: "",
        imageUrl: "",
      },
      xyPath: "/pages/homepage/homepage",
      menuButtonInfo: {},
      navHeight: 0,
    };
  },

  onReady() {
    console.log("query------二维码1", BaseApp);

    //获取自定义高度信息
    // const userMsg = uni.getStorageSync("userMsg");
    uni.getSystemInfo({
      success: (e) => {
        this.windowHeight = e.windowHeight;
      },
    });
  },

  onPageScroll(res) {
    //回到顶部显示
    this.showBackTop = res.scrollTop > this.windowHeight;
    this.offsetTop = res.scrollTop;
    // 吸顶显示
    let dombox = uni.createSelectorQuery().select(".startInfo");
    dombox
      .boundingClientRect((data) => {
        this.showTopMenu = data?.top < 0;
      })
      .exec();
  },
  async onShow() {
    await this.$onLaunched;
    try {
      // await this.getMembers();
      //定位监听
      this.watchLocation();
      // 获取弹窗广告
      this.postAdv();
      // 读取用户信息
      this.initUser();
      //fc09
      await this.checkMemberTicket();
      BaseApp.isMember && (await this.getBirthday());
      // fc10
      await this.getAccountNo();
      //   // 营销区域
      if (this.U_homeList && this.existFlag) {
        this.U_homeList.forEach((el) => {
          if (el.type === 5) {
            this.X_getCoupons(el.value);
          } else if (el.type === 6) {
            this.X_getSpikes(el.value[0]);
          } else if (el.type === 1) {
            this.X_startGoods(el.value);
          } else if (el.type === 2) {
            // console.log("this.classType.val", this.classType.val);
            this.X_getClass(this.classType.val);
          } else if (el.type === 9) {
            this.initCalendar();
          } else if (el.type === 12) {
            // console.log("this.classType.val", this.classType.val);
            this.get_recentShopList();
          }
        });
      }
    } catch (error) {}
  },
  async onLoad(query) {
    // const q = query; // 获取到二维码原始链接内容
    await this.$onLaunched;
    const xy = uni.getStorageSync("xiaoyouInfo");
    // console.log("query------二维码---load", query, xy);
    if (query.scene) {
      const phone = query.scene.slice(-11); // 获取到二维码手机号
      this.vuexSetReferrerPhone(phone);
    }
    // 小优
    if (query.xyPid) {
      this.v_setDistId(query.xyPid);
    }
    if (xy && xy.id) {
      this.xyPath = `/pages/homepage/homepage?xyPid=${xy.id}`;
    }
    this.shareInfo = {
      title: BaseApp.shareTxT, // 默认为小程序名称
      path: this.xyPath, // 默认为当前页面路径
      imageUrl: "", // 默认为当前页面的截图
    };
    try {
      await this.X_getHome();
      // 营销区域
      if (this.U_homeList && this.existFlag) {
        this.U_homeList.forEach((el) => {
          if (el.type === 5) {
            this.X_getCoupons(el.value);
          } else if (el.type === 6) {
            this.X_getSpikes(el.value[0]);
          } else if (el.type === 1) {
            this.X_startGoods(el.value);
          } else if (el.type === 2) {
            this.X_getClass(this.classType.val);
          } else if (el.type === 9) {
            this.initCalendar();
          }
        });
      }
    } catch (error) {
      //
    }
    this.getNavHeight();
    // const timeout = setTimeout(() => {
    //   const queryDom = uni.createSelectorQuery().in(this);
    //   queryDom
    //     .selectAll(".home")
    //     .boundingClientRect((data) => {
    //       console.log(data, "data");
    //       this.homeHeight = data[0]?.height;
    //     })
    //     .exec();
    //   clearTimeout(timeout);
    // }, 1500);
  },
  onShareAppMessage() {
    console.log("this.shareInfo-->分享", this.shareInfo);
    return this.shareInfo;
  },
  watch: {
    existFlag(newV) {
      if (newV) {
        if (this.U_homeList) {
          // const mapobj = {};
          this.U_homeList.forEach((el) => {
            if (el.type === 5) {
              this.X_getCoupons(el.value);
            } else if (el.type === 6) {
              this.X_getSpikes(el.value[0]);
            } else if (el.type === 1) {
              this.X_startGoods(el.value);
            } else if (el.type === 2) {
              this.X_getClass(this.classType.val);
            } else if (el.type === 9) {
              this.initCalendar();
            }
          });
        }
      }
    },
    addInfoMsg(newV, oldVal) {
      console.log(
        "定位更新啦",
        this.U_homeList,
        newV,
        this.U_homeList.filter((item) => item.type === 12).length > 0
      );
      // 是否需要查询门店信息
      if (
        newV.latitude !== oldVal.latitude &&
        newV.longitude !== oldVal.longitude
      ) {
        this.get_recentShopList();
      }
    },
  },
  computed: {
    ...mapState("home", [
      "advInfo",
      "U_homeList",
      "classType",
      "stickData",
      "startGoods",
      "showAddBtn",
      "addInfoMsg",
      "existFlag",
      "existArr",
      "xyInfo",
    ]),
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("css", ["iosFont"]),
    ...mapState("newhope", ["off"]),
    ...mapGetters("home", ["C_sticeData"]),
    ...mapState("newhope", ["curCode", "curParams", "showNone"]),
    ...mapState("xiaoyou", ["proQRcode", "distId"]),
    ...mapState("member", ["isBrithday"]),
    ...mapState("orderPlan", ["accountByMember"]),
    mapText() {
      const text = this.addInfoMsg.community
        ? this.addInfoMsg.community
        : this.addInfoMsg.address
        ? this.addInfoMsg.address
        : "开启定位";
      if (text.length > 15) {
        return text.slice(0, 14) + "...";
      } else return text;
    },
  },

  methods: {
    // 读取用户信息
    ...mapMutations("user", ["initUser"]),
    ...mapMutations("home", [
      "V_setShowAddBtn",
      "V_setAddInfoMsg",
      "vuexSetReferrerPhone",
    ]),
    ...mapActions("home", [
      "X_getHome", //配置
      "X_getHot", //热词
      "X_postAdv", //广告
      "X_putAdvOpen", //埋点开
      "X_putAdvExposure", //埋点进
      "X_startGoods", //明星商品
      "X_getClass", //分类商品
      "X_getCoupons",
      "X_getSpikes",
      "get_xiaoyouMoney", //FC-04-小优
      "get_recentShopList",
    ]),
    ...mapActions("newhope", [
      "X_getMonthWeek",
      "X_getSelectListByAddressNo",
      "X_getSelectDetailGoods",
      "X_getCurrentCalendar",
      "getSendQty",
      "postMessage",
    ]),
    ...mapMutations("newhope", [
      "V_setCurParams",
      "V_setCurrentDay",
      "V_setsendParams",
      "setEvaluateParams",
    ]),
    ...mapActions("xiaoyou", ["v_getQRcode"]),
    ...mapMutations("xiaoyou", ["v_setDistId"]),
    ...mapActions("member", ["getBirthday"]),
    ...mapMutations("member", ["setBirthday"]),
    ...mapActions("orderPlan", ["getAccountByMember"]),
    // fc10 长停账户
    async getAccountNo() {
      try {
        if (!BaseApp.account) return;
        const hsb = uni.getStorageSync("malltoken");
        if (!hsb) return;
        await this.getAccountByMember();
      } catch (error) {
        console.log("error", error);
      }
    },
    // fc09-检查客户是否存在未发放的计划
    async checkMemberTicket() {
      try {
        if (!this.loginStatus || !BaseApp.isMember) return;
        await api.$post(memberUrl.checkMemberGrantCoupon, {});
      } catch (error) {}
    },
    //关闭生日弹窗fc09
    onCloseBirth(e) {
      // this.showBirth = !e;
      this.setBirthday(!e);
    },
    //去查看生日券
    onClickBirth(e) {
      uni.navigateTo({
        url: "/subPages/coupons/couponList",
        success: () => {
          // this.showBirth = !e;
          this.setBirthday(!e);
        },
      });
    },

    /* 会员 */
    // toMember() {
    //   console.log("2", 2);
    //   uni.navigateTo({
    //     url: "/member-pages/comment/index",
    //   });
    // },
    //鲜活日记初始化
    async initCalendar() {
      try {
        const par = {
          calendarValue: CalendarValueEnum.WEEK,
          startDate: formatTime("YYYY-mm-dd"),
        };
        this.V_setCurParams({ startDate: formatTime("YYYY-mm-dd") });
        await this.X_getMonthWeek(par);
        this.goToday();
      } catch (error) {}
    },
    //分享
    onShareBtn() {
      const { spuName, spuId, id, imageUrl } = this.canvasInfo;
      this.shareInfo = {
        title: spuName,
        path: `/subPages/product/proDetail?id=${spuId}&disId=${id}`,
        imageUrl: imageUrl,
      };
    },
    // 回到今天
    goToday() {
      // this.$refs.xhrj.click();
      this.$refs.xbfs[0].click();
    },
    //日历点击当前周的某一天
    clickDay(e) {
      this.V_setCurParams({
        startDate: e.selectedDate,
      });
    },
    //首页点击商品查看鲜活日记
    async handleGoods(el) {
      // console.log("e-跳鲜活日记", el);
      try {
        await this.X_getSelectDetailGoods();
        uni.navigateTo({
          url: "/subPages/address/xhrj/WeekDate",
          // success: () => {
          //   console.log("this.showNone-home", this.showNone);
          // },
        });
      } catch (error) {}
    },
    //日历翻页
    changeDatePage(e) {
      this.V_setCurParams({
        startDate: e,
      });
      const par = {
        calendarValue: CalendarValueEnum.WEEK,
      };
      e && this.X_getMonthWeek(par);
    },
    //鲜活日记左侧点击
    onLeft() {
      // console.log("this.$refs.xbf2", this.$refs.xbfs[0].click());
      // return;
      uni.navigateTo({
        url: "/subPages/address/xhrj/WeekDate",
        success: () => {
          this.X_getSelectDetailGoods();
          this.getSendQty();
        },
      });
    },
    //鲜活日记右侧点击
    onRight() {
      uni.navigateTo({
        url: "/subPages/address/xhrj/AddChoose?type=home",
        success: () => {
          // console.log("请求收货地址");
          this.X_getSelectListByAddressNo();
        },
      });
    },
    //fc08-去评价sss
    async toComment(info) {
      try {
        const deliveryOrderNos = info.map((item) => item.deliveryOrderNo);
        console.log("info", info, deliveryOrderNos);
        this.setEvaluateParams({ deliveryOrderNos });
        await this.postMessage({ deliveryOrderNos });
        uni.navigateTo({
          url: "/member-pages/comment/index",
        });
      } catch (error) {}
    },

    // 返回顶部
    backTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 500,
        success: () => {
          this.showBackTop = false;
        },
      });
    },
    //去定位
    checkAdd() {
      uni.navigateTo({
        url: "/subPages/homeSub/chooseAdd/chooseAdd",
      });
    },
    onCloseBtn() {
      this.V_setShowAddBtn(false);
    },
    // 定位提示监听
    watchLocation() {
      uni.getSystemInfo({
        success: (res) => {
          uni.getSetting({
            success: (el) => {
              if (
                !res.locationEnabled &&
                !el.authSetting["scope.userFuzzyLocation"]
              ) {
                this.V_setShowAddBtn(true);
              } else if (
                el.authSetting["scope.userFuzzyLocation"] &&
                res.locationEnabled
              ) {
                this.V_setShowAddBtn(false);
              }
            },
          });
        },
      });
    },
    onOpenBtn() {
      uni.navigateTo({
        url: "/subPages/nolocation/index",
      });
    },
    // 去搜索
    search() {
      uni.navigateTo({
        url: "/subPages/search/search",
      });
    },
    //点击菜单板块
    async handle_menu(val) {
      //跳商品详情
      if (val.urlType === 0) {
        // 先查询商品是否有
        const par = {
          spuCodes: [val.spuCode],
          areaCodes: this.existArr,
        };
        const { data } = await api.$post(apiurl.home.batch, par);
        // console.log("data--跳转前查询商品是否", data);
        if (!data.length) {
          uni.showToast({
            title: "该商品不在可售区域",
            icon: "none",
          });
        } else {
          uni.navigateTo({
            url: `/subPages/product/proDetail?id=${val.spuCode}`,
          });
        }
      } else {
        console.log("val-bug", val);
        clickNav(val, this.getWechat);
      }
    },
    // 关闭企微
    closeWechat() {
      this.showChat = false;
    },
    // 请求企业微信二维码
    async getWechat() {
      try {
        const appid = BaseApp.appid;
        const { data } = await api.$get(this.urlapi.home.wechat + appid);
        this.wechatUrl = data;
        this.showChat = true;
      } catch (error) {}
    },
    // 关闭广告
    closeAdv(flag = false) {
      this.showAdv = flag;
    },
    // 请求广告
    async postAdv() {
      try {
        const { data } = await api.$post(this.urlapi.home.adv, this.advParams);

        if (data.length && data[0]?.appWebTypeList) {
          const val = data[0].appWebTypeList;
          //是否首页显示
          val.forEach((el) => {
            if (el === webShowType.MALL_INDEX) {
              this.showAdv = true;
              this.advInfoMsg = data;
              this.X_putAdvExposure(data[0].id);
            }
          });
        } else {
          this.showAdv = false;
          this.advInfoMsg = [];
        }
      } catch (error) {
        //
      }
    },
    stopPropagation(ev) {
      return ev.stopPropagation();
    },

    /* ----小优--- */
    //海报
    shareXY(e) {
      this.showPanel = true;
      // console.log("e-SHABIPE", e);
      const { id } = uni.getStorageSync("xiaoyouInfo");
      // console.log("xy---->pe-小优", id);
      this.canvasInfo = {
        ...e,
        id,
      };
      // this.canvasInfo = e;
    },
    // 生成海报
    async openCanvasShare() {
      try {
        // this.showPanel = false;
        await this.drawCanvas();
        this.showCanvas = true;
      } catch (error) {}
    },
    /* 海报相关 */
    /**
     * 获取图片信息
     * @param src 图片路径
     * @returns
     */
    getImageInfo(src) {
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src,
          success: (res) => resolve(res.path),
          fail: (err) => reject(err),
        });
      });
    },
    /* 获取图片信息 */
    async getImgInfo(path) {
      const assetPath =
        "https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-sharebg-icon.png";
      const tagPath =
        "https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-share-tag-icon.png";
      // 商品图地址
      this.goodsImg = await this.getImageInfo(path);
      // 背景图
      this.assetPath = await this.getImageInfo(assetPath);
      //icon图
      this.tagPath = await this.getImageInfo(tagPath);
    },
    /**
     * 生成base64二维码临时路径
     */
    transBase64(path) {
      const times = new Date().getTime();
      return new Promise((resolve, rej) => {
        wx.getFileSystemManager().writeFile({
          filePath: wx.env.USER_DATA_PATH + "/" + times + ".png",
          data: path,
          encoding: "base64",
          success: () => {
            resolve(wx.env.USER_DATA_PATH + "/" + times + ".png");
          },
          fail: (err) => {
            rej(err);
          },
        });
      });
    },
    drawContent(ctx) {
      const x = 8;
      const y = 76;
      const w = 226;
      const h = 316;
      const r = 5;
      this.fillRoundRect(ctx, x, y, w, h, r, "#FFF");
    },
    fillRoundRect(ctx, x, y, width, height, radius, /*optional*/ fillColor) {
      //圆的直径必然要小于矩形的宽高
      if (2 * radius > width || 2 * radius > height) {
        return false;
      }
      ctx.save();
      ctx.translate(x, y);
      //绘制圆角矩形的各个边
      this.drawRoundRectPath(ctx, width, height, radius);
      ctx.setFillStyle(fillColor); //若是给定了值就用给定的值否则给予默认值
      ctx.fill();

      ctx.restore();
    },
    drawRoundRectPath(ctx, width, height, radius) {
      ctx.beginPath();
      //从右下角顺时针绘制，弧度从0到1/2PI
      ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
      //矩形下边线
      ctx.lineTo(radius, height);

      //左下角圆弧，弧度从1/2PI到PI
      ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

      //矩形左边线
      ctx.lineTo(0, radius);

      //左上角圆弧，弧度从PI到3/2PI
      ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

      //上边线
      ctx.lineTo(width - radius, 0);

      //右上角圆弧
      ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

      //右边线
      ctx.lineTo(width, height - radius);
      ctx.closePath();
    },
    drawRoundImg(ctx, width, height, radius) {
      ctx.beginPath();
      //从右下角顺时针绘制，弧度从0到1/2PI
      ctx.arc(width, height, radius, 0, 0);
      //矩形下边线
      ctx.lineTo(0, height);
      //左下角圆弧，弧度从1/2PI到PI
      ctx.arc(radius, height, radius, 0, 0);

      //矩形左边线
      ctx.lineTo(0, height);

      //左上角圆弧，弧度从PI到3/2PI
      ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

      //上边线
      ctx.lineTo(width - radius, 0);

      //右上角圆弧
      ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

      //右边线
      ctx.lineTo(width, height - radius);
      ctx.closePath();
    },
    drawImg(ctx) {
      this.getImageInfos(ctx);
    },
    //nihao
    getImageInfos(ctx) {
      let qr_x = 8;
      let qr_y = 76;
      ctx.save();
      console.log("this.goodsimg--1", this.goodsImg);
      ctx.translate(qr_x, qr_y);
      const basePx = 226;
      // this.drawRoundImg(ctx, basePx, basePx, 5);
      ctx.clip();
      ctx.drawImage(this.goodsImg, 0, 0, basePx, basePx);
      ctx.restore();
      ctx.draw(true);
    },
    genImage(src, ctx, canvas) {
      return new Promise((resolve, reject) => {
        const img = canvas.createImage();
        img.src = src;
        img.onload = () => {
          resolve(ctx.drawImage(img, 0, 0, canvas.width, canvas.height));
        };
      });
    },
    /* 生成海报 */
    async drawCanvas() {
      try {
        uni.showLoading({
          title: "正在生成图片...",
          mask: true,
        });
        let goods = this.canvasInfo;
        // console.log("goods", goods);
        await this.getImgInfo(goods.imageUrl);
        await this.v_getQRcode(goods.spuId);
        const ctx = wx.createCanvasContext("canvas");
        // console.log("ctx-----canvas", ctx);
        // ctx.setFillStyle("gray");
        const dpr = wx.getSystemInfoSync().pixelRatio;
        console.log("dpr", dpr);
        const w = 242;
        const h = 405;
        ctx.width = w;
        ctx.height = h;
        // console.log("ctx", this.assetPath);
        ctx.drawImage(this.assetPath, 0, 0, w, h);
        // return;
        this.drawContent(ctx);
        this.drawImg(ctx);
        // ctx.draw(true)
        // 绘制标题
        let y = 307;
        // let y1 = y;
        let x = 24;
        let len = 13;
        let priceY = 350;
        let y3 = 296;
        let goodsName = goods.spuName;
        while (goodsName.length > 0 && y < 337) {
          let line = goodsName.substr(0, len);
          goodsName = goodsName.substr(len);
          if (y > 330) {
            goodsName.length > 4 && (line = goodsName.substr(0, 3) + "...");
          }
          ctx.setFontSize(9);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign("left");
          ctx.fillText(line, x, y + 20, w * 0.5);
          y += 12;
        }

        // 绘制二维码
        let x1 = w * 0.6 + 10;
        let qWidth = w * 0.25;

        //二维码路径
        const data = await this.transBase64(this.proQRcode);
        ctx.drawImage(data, x1, y3 + 20, qWidth, qWidth);
        ctx.setFontSize(7.5);
        ctx.setFillStyle("#999");

        ctx.fillText("扫码下单", x1 + 17, y3 + qWidth + 30);
        // 绘制价格
        y += 12;
        let price =
          goods.rangeMaxPrice === goods.rangeMinPrice
            ? noformatAmount(goods.rangeMaxPrice)
            : noformatAmount(goods.rangeMinPrice) +
              "~" +
              noformatAmount(goods.rangeMaxPrice);
        ctx.setFillStyle("#f9555c");
        ctx.setTextAlign("left");
        ctx.setFontSize(10);
        ctx.fillText("￥", x, priceY + 20);
        ctx.setFontSize(15);
        ctx.fillText(price, x + 12, priceY + 20);
        y += 20;
        ctx.setFontSize(8);
        ctx.setFillStyle("#999");
        ctx.drawImage(this.tagPath, 130, 24, 93, 76);
        ctx.draw(true);
        this.ctx = ctx;
      } catch (error) {
        console.log("error-错误", error);
      } finally {
        uni.hideLoading();
      }
    },
    /* 存海报 */
    async saveFile() {
      uni.showLoading({
        title: "保存中...",
      });
      const path = await new Promise((resolve, rej) => {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.ctx.width,
          height: this.ctx.height,
          destWidth: this.ctx.width * 4,
          destHeight: this.ctx.height * 4,
          canvasId: "canvas",
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (res) => {
            console.log(res);
            rej(res);
          },
        });
      });
      uni.saveImageToPhotosAlbum({
        filePath: path,
        success: (data) => {
          uni.showToast({
            icon: "success",
            title: "保存成功",
            success: () => {
              this.showCanvas = false;
              // this.showPanel=false;
              uni.showTabBar({
                success: () => {
                  this.showPanel = false;
                },
              });
            },
          });
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
    /* 海报保存 */
    onSaveHB() {
      // let self = this;
      uni.getSetting({
        success: (res) => {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                this.saveFile();
              },
            });
          } else {
            this.saveFile();
          }
        },
      });
    },
    // 面对面分享
    openShowShare() {
      this.showFaceShare = true;
      this.v_getQRcode(this.canvasInfo.spuId);
      this.setProductInfoXiaoyou();
    },
    onFaceShareCancel() {
      this.showFaceShare = false;
    },
    setProductInfoXiaoyou() {
      this.productInfoXiaoyou = {
        spuId: this.canvasInfo?.spuId,
        imageUrl: this.canvasInfo?.imageUrl,
        kill: this.canvasInfo.killSymbal && this.canvasInfo?.skillFlag,
        spuName: this.canvasInfo.spuName,
        salesNum: this.canvasInfo.salesNum,
        price: noformatAmount(this.canvasInfo.rangeMinPrice),
      };
    },
    // 海报关闭
    onCloseCanvas() {
      this.showCanvas = false;
    },
    // 面板关
    closeShare() {
      this.shareInfo = {
        title: BaseApp.shareTxT, // 默认为小程序名称
        path: this.xyPath, // 默认为当前页面路径
        imageUrl: "", // 默认为当前页面的截图
      };
      uni.showTabBar({
        success: () => {
          this.showPanel = false;
        },
      });
    },
    getNavHeight() {
      uni.getSystemInfo({
        success: (res) => {
          this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
          let menuButtonInfo = {};
          if (res.platform === "ios") {
            // ios设备的胶囊按钮都是固定的
            menuButtonInfo = {
              width: 87,
              height: 32,
              left: res.screenWidth - 7 - 87,
              right: res.screenWidth - 7,
              top: res.statusBarHeight + 4,
              bottom: res.statusBarHeight + 4 + 32,
            };
          } else {
            // 安卓通过api获取
            menuButtonInfo = uni.getMenuButtonBoundingClientRect();
          }
          // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上未知-状态栏高度）* 2 + 胶囊高度 + 状态栏高度
          this.navHeight =
            (menuButtonInfo.top - res.statusBarHeight) * 2 +
            menuButtonInfo.height +
            res.statusBarHeight;
          // const queryDom = uni.createSelectorQuery().in(this);
          // queryDom
          //   .selectAll(".home")
          //   .boundingClientRect((data) => {
          //     console.log(data, "data");
          //     this.homeHeight = data[0]?.height;
          //   })
          //   .exec();
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "home.scss";
.home {
  min-height: 100vh;
  background: #f5f5f5;
  // background: linear-gradient(292deg, #b6e0ff 0%, #d8f2ff 100%);
}
.inner {
  position: relative;
  z-index: 1;
  background-color: transparent;
}
.stick-top {
  //吸顶
  background-color: #fff;
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
}
.pop {
  position: fixed;
  z-index: 99998;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.4);
  .pop-wechat {
    position: absolute;
    width: 416rpx;
    height: 654rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .pop-son {
      height: 500rpx;
      background: #ffffff;
      border-radius: 40rpx;
      padding: 32rpx 32rpx 0 32rpx;

      .img-son {
        border: none;
        margin: 0 auto 32rpx;
        width: 100%;
        height: 320rpx;
      }
    }
    .icon-close {
      margin-top: 54rpx;
      width: 100%;
      text-align: center;
      .img-icon {
        border: none;
        width: 96rpx;
        height: 96rpx;
      }
    }
  }
}
.top-search {
  position: fixed;
  // border-radius: ;
  top: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  z-index: 9999;
  .search {
    background: #f1f1f1;
    margin-left: 40rpx;
    color: $uni-text-color-grey;
    display: flex;
    align-items: center;

    .icons {
      margin-left: 24rpx;
    }
  }
}
.commcss {
  height: 110rpx;
  width: 100%;
  background: transparent;
  margin-bottom: 32rpx;
}

.swipper {
  height: 300rpx;
  width: 100%;
  background: #fff;
  // padding-bottom: 120rpx;
  border-bottom: 1rpx solid #fff;
}
::v-deep.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
  background-color: transparent;
  position: relative;
  max-width: 80%;
  max-height: 80%;
  overflow-y: visible;
  .popup {
    width: 100%;
    .icon-close {
      display: block;
      text-align: right;
      margin-right: -60rpx;
    }
    .QRcode {
      width: 450rpx;
      display: block;
    }
    .btn-savecode {
      margin: 20rpx 100rpx;
      border-radius: 50rpx;
      font-size: 30rpx;
    }
  }
}
.bottom-more {
  // margin: 24rpx 0;
  padding: 24rpx 0;
  color: #999;
}
.backTop-btn {
  position: fixed;
  bottom: 128rpx;
  //bottom: calc(40rpx+ constant(safe-area-inset-bottom));
  //bottom: calc(40rpx +env(safe-area-inset-bottom));
  right: 32rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/backTop.png")
    no-repeat;
  background-position: center;
  background-size: 150%;
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
}
.home-search {
  height: 74rpx;
  // line-height: 74rpx;
  // background: #fff;
  overflow: hidden;
  padding: 0 32rpx;
  position: relative;
  // z-index: 33333;
  .home-add {
    color: #333333;
    font-size: 26rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    line-height: 74rpx;
    .add-main {
      max-width: 384rpx;
      margin-left: 8rpx;
      margin-right: 16rpx;
    }
    .img-icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 8rpx;
    }
  }
  .search-son {
    margin-left: 56rpx;
    height: 64rpx;
    width: 156rpx;
    line-height: 64rpx;
    color: #999999;
    border-radius: 116rpx;
    background: #f4f4f4;
    // padding-left: 16rpx;
    .found {
      margin-left: 8rpx;
    }
  }
}
.box {
  position: relative;
  height: 74rpx;
  margin-bottom: 12rpx;
  .add-tips {
    position: absolute;
    top: 84rpx;
    left: 40rpx;
    z-index: 8 !important;
    width: 670rpx;
    height: 106rpx;
    border-radius: 16rpx;
    background: rgba(0, 0, 0, 0.75);
    padding: 20rpx 16rpx 16rpx 16rpx;
    &::before {
      content: "";
      width: 0rpx;
      height: 0rpx;
      position: absolute;
      left: 62rpx;
      top: -10rpx;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-bottom: 10rpx solid rgba(0, 0, 0, 0.75);
    }
    .tips-left {
      .off-tip {
        margin-left: 10rpx;
        color: #f1f1f1;
        .first-off-tip {
          font-size: 26rpx;
          font-weight: bold;
        }
        .sec-off-tip {
          color: #c7c7c7;
          font-size: 22rpx;
          margin-top: 8rpx;
        }
      }
    }
    .tips-rig {
      color: #fff;
      margin-left: 58rpx;
      .open-btn {
        width: 118rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #1d9bdc;
        border-radius: 104rpx;
        text-align: center;
        font-weight: bold;
        font-size: 26rpx;
        margin-right: 16rpx;
      }
    }
  }
}
// .all-bg {
//   position: absolute;
//   z-index: -1;
//   width: 100vw;
//   height: 100vh;
//   background-color: #f5f5f5;
//   overflow: hidden;
// }
.top-bg {
  position: absolute;
  // position: absolute;
  // z-index: -1;
  width: 100vw;
  overflow: hidden;
  height: 380rpx;
  background: linear-gradient(292deg, #b6e0ff 0%, #d8f2ff 100%);
  > view:nth-child(1) {
    width: 110%;
    height: 74rpx;
    left: -5%;
    filter: blur(20px);
    position: absolute;
    bottom: -22rpx;
    z-index: 0;
    background: #fff;
  }
}
.top-bar {
  font-size: 34rpx;
  font-weight: 500;
  color: #000000;
  text-align: center;
  text-align: center;
  background: transparent;
  position: relative;
  z-index: 1;
}
</style>
