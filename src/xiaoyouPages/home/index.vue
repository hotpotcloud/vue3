<template>
  <view class="home-xiaoyou">
    <!-- 导航 -->
    <view
      class="top-nav"
      :style="{
        paddingTop: topH + 'px',
      }"
    >
      <view class="top-title">
        <u-icon
          name="arrow-left"
          color="#fff"
          @click="onBack"
          size="24"
        ></u-icon>
        <view
          class="flex-1"
          :style="{
            lineHeight: navH + 'px',
            textAlign: platform == 'android' ? 'left' : 'center',
            height: navH + 'px',
          }"
          >小优天天赚</view
        >
      </view>
      <!-- 跑马灯：暂用->恢复时home-main:padding190rpx -->
      <!-- <view class="horse">
        <u-notice-bar
          :text="horseText"
          bgColor="#FFEEC9"
          color="#DB9201"
          fontSize="26rpx"
          :customStyle="{
            'font-weight': 'normal',
            height: '64rpx',
          }"
        ></u-notice-bar>
      </view>-->

      <view class="horse d-flex-center" v-if="BaseApp.name === 'sx_milk'">
        <img
          class="horse-icon"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/horse.png"
          alt
        />
        <view class="horse-light" id="horse_text">
          <view class="move-warp">
            <view class="move-light">{{ horseText }}</view>
            <view class="move-light">{{ horseText }}</view>
          </view>
        </view>
      </view>
    </view>

    <view
      class="home-main"
      :class="[
        'home-main',
        BaseApp.name === 'sx_milk' ? 'home-horse-main' : '',
      ]"
    >
      <!-- 用户信息 -->
      <view class="xiao-user">
        <view class="user">
          <view class="user-info d-flex-center d-sb">
            <view class="d-flex-center">
              <img class="user-image" :src="infoMsg.avatarUrl || empty" alt />
              <view>
                <view class="h-size32">{{ infoMsg.nickName }}</view>
                <view class="font-24">{{ infoMsg.phone }}</view>
              </view>
            </view>

            <view class="d-flex-center">
              <img
                :src="getAssetImgUrl('xy-code-icon.png')"
                alt
                class="set-icon"
                @tap.stop="clickCode"
              />
              <img
                @tap.stop="goToSetting"
                class="set-icon"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/set.png"
                alt
              />
            </view>
          </view>
        </view>

        <view class="money">
          <view class="money-main d-flex-colum d-sb">
            <view class="money-top d-flex-center d-sb">
              <view class="f32 color1 d-flex-center">
                我的收益
                <img
                  @click="onClickEyes"
                  style="width: 32rpx; height: 32rpx; margin-left: 12rpx"
                  :src="
                    isOpen
                      ? require('../assets/image/eyes.png')
                      : require('../assets/image/eyes_close.png')
                  "
                />
              </view>
              <view class="f24 color70 d-flex-center" @click="onRule">
                佣金规则
                <img
                  style="
                    width: 32rpx;
                    height: 32rpx;
                    margin-left: 4rpx;
                    border: none;
                  "
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/right.png"
                  alt
                />
              </view>
            </view>
            <view class="money-num d-flex-center d-sb">
              <view>
                <view class="color70">可提现金额</view>
                <view
                  class="f48 color1"
                  :class="[!isOpen && 'd-flex-center']"
                  @click="onAllowMoney"
                >
                  <text>
                    <text class="f32" v-if="isOpen">￥</text>
                    {{
                      isOpen
                        ? infoMsg.withdrawableMoney
                          ? infoMsg.withdrawableMoney
                          : "0.00"
                        : "****"
                    }}
                  </text>
                  <uni-icons type="forward" color="#fff" size="16" />
                </view>
              </view>
              <view>
                <view class="color70">累计提现金额</view>
                <view class="f48 color1">
                  <text class="f32" v-if="isOpen">￥</text>
                  {{
                    isOpen
                      ? infoMsg.withdrawedMoney
                        ? infoMsg.withdrawedMoney
                        : "0.00"
                      : "****"
                  }}
                </view>
              </view>
            </view>
            <view class="money-total d-flex-center d-sb">
              <view
                class="f28 color70 total-today d-flex-center"
                @click="onToday"
              >
                {{ currentText }}
                <img
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/004down.png"
                  alt
                />
              </view>
              <view @click="goToOrder(OrderTab.user)">
                <view class="color70">我的邀请</view>
                <view class="color1 f30">
                  {{ !isOpen ? "*" : statistics.distNum }}
                </view>
              </view>
              <view @click="goToOrder(OrderTab.distributionOrder)">
                <view class="color70">分销订单</view>
                <view class="color1 f30">
                  {{ !isOpen ? "*" : statistics.orderNum }}
                </view>
              </view>
              <view @click="goToOrder(OrderTab.myProfit)">
                <view class="color70">我的收益</view>
                <view class="color1 f30">
                  <text class="f24" v-if="isOpen">￥</text>
                  {{ !isOpen ? "****" : statistics.performance }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 佣金榜单 -->
      <Tops />

      <!-- 推广中心 -->
      <view class="business-center">
        <Center />
      </view>
    </view>
    <Scode :show="showCode" @onClose="onClose" />
    <!-- picker-今日、昨日、本周、本月和累计 -->
    <u-picker
      :show="showToday"
      :columns="array"
      keyName="label"
      confirmColor="#1D9BDC"
      closeOnClickOverlay
      @close="closePicker"
      @cancel="closePicker"
      @confirm="confirmPicker"
    ></u-picker>
    <!-- 实名认证弹框 -->
    <auth-modal :show="showAuth" v-on:close-auth="closeAuth" />
    <hXiaoyou />
  </view>
</template>

<script>
import Pop from "../components/pop.vue";
import AuthModal from "./components/AuthModal.vue";
import Tops from "./components/top.vue";
import Scode from "./components/s-code.vue";
import { OrderTab, StatisticsTypeEnum } from "@/utils/enum";
import Center from "./components/BusinessCenter.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import hXiaoyou from "@/pages/homepage/component/h-xiaoyou.vue";
import { BaseApp } from "@/const/appIdConf";
export default {
  components: {
    Pop,
    Tops,
    Center,
    AuthModal,
    Scode,
    hXiaoyou,
  },
  data() {
    return {
      BaseApp,
      // 跑马灯文字
      horseText:
        // "小优各项返佣金活动已结束，已有的分销订单佣金会正常发放，请知悉！",
        "小优各项返佣金活动于2023年6月30日已截止，已有的分销订单佣金会正常发放，请知悉！",
      // // 跑马场宽度
      // horseWidth: 0,
      empty:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/default-image.png",
      array: [
        [
          { label: "今日", value: StatisticsTypeEnum.TODAY },
          { label: "昨日", value: StatisticsTypeEnum.YESTERDAY },
          { label: "本周", value: StatisticsTypeEnum.THIS_WEEK },
          { label: "本月", value: StatisticsTypeEnum.THIS_MONTH },
          { label: "累计", value: StatisticsTypeEnum.CUMULATIVE },
        ],
      ],
      currentToday: { label: "累计", value: StatisticsTypeEnum.CUMULATIVE },
      showToday: false, //total选择器
      isOpen: true, //眼睛是否点开
      imgurl: require("../assets/image/eyes.png"),
      topH: 0, //导航安全顶部
      navH: 0, //胶囊高度
      platform: "android",
      OrderTab: OrderTab,
      showAuth: false,
      // fc-04
      showCode: false,
      // xyPath:
    };
  },
  // 滚动顶部渐变
  // onPageScroll(e) {
  // console.log("e-滚动中", e);
  // let topHeight = e.scrollTop;
  // let navOp = 0;
  // navOp = topHeight / this.totalHeight;
  // let mobileTop = this.navRemain;
  // this.navOpacity = navOp;
  // this.navInpWid =
  //   navOp > 0 ? mobileTop + this.widRemain * navOp : this.navRemain;
  // this.logo_block_width = this.windowWidth - this.navInpWid - 10;
  // this.imgOpacity = navOp <= 1 ? 1 - navOp : 0;
  // const styles = `
  //   background: rgba(255, 255, 255, ${navOp});
  //   `;
  // this.navStyle = topHeight > 10 ? styles : "";
  // this.modalShow = topHeight > uni.upx2px(388) ? true : false;
  // },
  onShow() {
    this.v_getXYcheck();
    this.init();
  },
  async onReady() {
    // this.getSystem();
    // 跑马灯
    // this.horseWidth = await this.getHorseW();
  },
  onLoad(options) {
    console.log("options--xiaoyou", options);
    if (options.xyPid) {
      this.v_setDistId(options.xyPid);
    }

    this.getSystem();

    // this.v_postStatistics(this.currentToday.value);
    // this.v_postTopInfo();
  },
  onShareAppMessage() {
    // const xy = uni.getStorageSync("xiaoyouInfo");
    // if (xy && xy.id) {
    //   this.xyPath = this.xyPath + "?xyPid=" + xy.id;
    // }
    const shareInfo = {
      title: "鲜推官招募", // 默认为小程序名称
      path: `/child-pages/pages/xiaoyou-register/index?scene=${this.xiaoyouInfo.id}`, // 默认为当前页面路径
      imageUrl: "", // 默认为当前页面的截图
    };
    console.log("shareInfo", shareInfo);
    return shareInfo;
  },
  computed: {
    ...mapState("xiaoyou", ["xiaoyouInfo", "statistics"]),
    // 用户信息
    infoMsg() {
      // 更细信息时候
      if (this.xiaoyouInfo?.id) {
        return this.xiaoyouInfo;
      }
      return uni.getStorageSync("xiaoyouInfo");
    },
    currentText() {
      return this.currentToday.label;
    },
    // horseW() {
    //   this.getHorseW().then((e) => {
    //     console.log("w", e);

    //     return e;
    //   });
    //   // return w;
    // },
  },
  methods: {
    ...mapActions("xiaoyou", [
      "v_postStatistics",
      "v_postTopInfo",
      "v_getBanner",
      "v_getXYcheck",
      "v_getFaceCode",
    ]),
    ...mapMutations("xiaoyou", ["v_setDistId"]),
    // 获取跑马灯区域屏幕宽度
    // getHorseW() {
    //   return new Promise((res) => {
    //     let q = wx.createSelectorQuery();
    //     q.select("#horse_text")
    //       .boundingClientRect((data) => {
    //         console.log("data-->跑马灯节点", data);

    //         res(data.width);
    //       })
    //       .exec();
    //   });
    // },
    // 跑马灯动画
    // runHorseAnimate() {
    //   const screenW = uni.getSystemInfoSync();
    // },
    init() {
      // 用户+收益
      this.v_postStatistics(this.currentToday.value);
      // 排行榜
      this.v_postTopInfo();
      // banner
      this.v_getBanner();
    },
    //点击眼睛
    onClickEyes() {
      this.isOpen = !this.isOpen;
    },
    //佣金规则
    onRule() {
      uni.navigateTo({
        url: "/xiaoyouPages/setting/rule",
      });
    },
    //可提现金额
    onAllowMoney() {
      if (this.infoMsg?.certificationStatus === 0) {
        this.showAuth = true;
        return;
      }
      // 提现
      uni.navigateTo({
        url: "/xiaoyouPages/withdraw/Withdraw",
      });
    },
    // 打开今天选择器
    onToday() {
      this.showToday = true;
      console.log("1", 1);
    },
    // 关闭选择器
    closePicker() {
      this.showToday = false;
    },
    //选择器确定
    confirmPicker(e) {
      const { value } = e;
      this.currentToday = value[0];
      this.v_postStatistics(value[0].value);
      this.showToday = false;
    },
    goToOrder(tab) {
      uni.navigateTo({
        url: `/xiaoyouPages/order/OrdersAndRevenue?tab=${tab}&dateType=${this.currentToday.value}`,
      });
    },
    // 获取高度+系统信息
    getSystem() {
      const info = uni.getMenuButtonBoundingClientRect();
      console.log("info-系统信息获取", info);
      let systemInfo = uni.getSystemInfoSync();
      this.platform = systemInfo.platform;
      this.topH = info.top;
      this.navH = info.height;
      console.log("info,systemInfo", info, systemInfo);
    },
    //返回
    onBack() {
      const arr = getCurrentPages();
      // const
      console.log("arr", arr);
      if (arr.length <= 1) {
        return uni.switchTab({
          url: "/pages/homepage/homepage",
        });
      }
      uni.navigateBack(-1);
    },
    goToSetting() {
      uni.navigateTo({ url: "/xiaoyouPages/setting/setting" });
    },

    closeAuth() {
      this.showAuth = false;
    },
    clickCode() {
      this.v_getFaceCode().then(() => {
        this.showCode = true;
      });
    },
    onClose(e) {
      console.log("e", e);
      this.showCode = !e;
    },
  },
};
</script>

<style scoped lang="scss">
.home-xiaoyou {
  background: #f6f6f6;
  min-height: 100vh;
  width: 100%;
  position: relative;
  .top-nav {
    position: absolute;
    // z-index: 999999;
    // padding: 0 32rpx;
    color: #fff;
    font-size: 34rpx;
    font-weight: bold;
    height: 560rpx;
    width: 100%;
    background: linear-gradient(
      180deg,
      #f86c4d 0%,
      #f86c4d 21%,
      rgba(248, 108, 77, 0) 100%
    );
    background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/bg%402x.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .top-title {
      display: flex;
      align-items: center;
      padding: 0 32rpx;
      ::v-deep.u-icon {
        z-index: 99999;
      }
    }
    // 跑马灯
    // .horse {
    //   font-weight: normal;
    //   margin-top: 24rpx;
    //   height: 64rpx;
    // }
    // 跑马灯
    .horse {
      font-weight: normal;
      margin-top: 24rpx;
      color: #db9201;
      background: #ffeec9;
      font-size: 26rpx;
      padding: 14rpx 24rpx;
      height: 64rpx;
      .horse-icon {
        margin-right: 8rpx;
        width: 32rpx;
        height: 32rpx;
        border: none;
      }
      .horse-light {
        flex: 1;
        // background: #f6f6f6;
        // overflow: hidden;
        // white-space: nowrap;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-positive: 1;
        flex-grow: 1;
        overflow: hidden;
        // width: 100%;
      }
      .move-warp {
        -ms-flex: none;
        flex: none;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        animation: move-data 7s 0.5s linear infinite;
      }
      .move-light {
        padding-right: 80px;

        // -ms-flex: none;
        // flex: none;
        // display: -ms-flexbox;
        // display: flex;
        // -ms-flex-align: center;
        // align-items: center;
        // animation: move-data 7s 0.5s linear infinite;
        // display: inline-block;
        // animation-name: translation;
        // animation-duration: 9s;
        // animation-iteration-count: infinite;
        // animation-timing-function: linear;
      }
      @keyframes translation {
        from {
          left: 100%;
        }
        to {
          transform: translateX(-100%);
          left: 0;
        }
      }
      @keyframes move-data {
        0% {
          transform: translateX(0);
        }
        to {
          transform: translateX(-50%);
        }
      }
    }
  }
  .home-horse-main {
    @extend .home-main;
    // margin-top: 190rpx;
    position: absolute;
    top: 80rpx;
    height: calc(100% - 190rpx);
    width: calc(100% - 48rpx);
    transform: translateX(24rpx);
  }

  .home-main {
    // background: #000;
    padding: 0 24rpx;
    padding-top: 190rpx;
    // margin-top: 190rpx;
    // position: absolute;
    // top: 190rpx;
    // // height: calc(100% - 190rpx);
    // width: calc(100% - 48rpx);
    // transform: translateX(24rpx);
    .xiao-user {
      // background: #587d8d;
      height: 498rpx;
      width: 100%;
      position: relative;
      .user {
        padding: 22rpx 24rpx;
        border-radius: 24rpx;
        height: 248rpx;

        background: linear-gradient(
          180deg,
          #fff5f3 47%,
          rgba(255, 239, 236, 0) 100%
        );
        // .user-info {
        //   // height: 96rpx;
        // }
        .user-image {
          border: 1rpx solid rgba(0, 0, 0, 0.05);
          margin-right: 24rpx;
          width: 74rpx;
          height: 74rpx;
          border-radius: 50%;
        }
        .set-icon {
          margin-left: 12rpx;
          height: 48rpx;
          width: 48rpx;
        }
      }
      .money {
        height: 380rpx;
        // width: 100%;
        width: calc(100% - 16rpx);
        transform: translateX(8rpx);
        background: linear-gradient(180deg, #fe9780 0%, #fa6949 100%);
        position: absolute;
        top: 118rpx;
        border-radius: 24rpx;
      }
      .money-main {
        width: 100%;
        height: 100%;
        background: no-repeat
          url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/%E9%87%91%E5%B8%81%402x.png")
          100%;
        background-position: -10rpx -10rpx;
        background-size: 30% 45%;
        padding: 26rpx 32rpx;
      }
      .money-total {
        // background: #000;
        .total-today {
          image {
            border: none;
            margin-left: 4rpx;
            width: 24rpx;
            height: 24rpx;
          }
        }
      }
    }
    .business-center {
      margin-top: 16rpx;
    }
  }
  // 字体样式
  .color70 {
    color: rgba(255, 255, 255, 0.7);
  }
  .color1 {
    color: #fff;
  }
  .f24 {
    font-size: 24rpx;
  }
  .f28 {
    font-size: 28rpx;
  }
  .f30 {
    font-size: 30rpx;
    font-weight: bold;
  }
  .f32 {
    font-size: 32rpx;
    font-weight: bold;
  }
  .f48 {
    font-weight: bold;
    font-size: 48rpx;
  }

  // 弹窗
  .main-xiaoyou {
    padding: 0 32rpx;
  }
}
</style>
