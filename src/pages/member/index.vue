<template>
  <!-- 滚动穿透 -->
  <!-- <page-meta
    :page-style="'overflow:' + (show ? 'hidden' : 'visible')"
  ></page-meta> -->
  <view>
    <h-relogin :show="showRelogin" @onClick="toRelogin" />
    <view v-if="!showRelogin" class="member-out">
      <view class="member-color-top" :style="[swiperBg]">
        <!-- 头部区域 -->
        <view class="member_top">
          <Top
            :isBlack="memberInfoFc09.isBlack"
            :borderColor="swiperBg.color"
            :headImg="memberInfoFc09.wxAvatarUrl"
            :nickName="memberInfoFc09.name"
            :score="memberInfoFc09.usablePoint"
            :astrict="memberInfoFc09.isBlack"
            @toMemberRule="toMemberRule"
            @onPhoto="onPhoto"
            @toMemberScore="toMemberScore"
          />
        </view>
        <!-- 轮播区域 -->
        <view class="swiper-content">
          <swiper
            @change="changeSw"
            :style="[swiperHeight]"
            duration="300"
            previous-margin="38rpx"
            next-margin="38rpx"
            :current="curBg - 1"
            easing-function="easeInCubic"
          >
            <swiper-item
              v-for="child in memberCof"
              :key="child.cssName"
              class="sw_item"
            >
              <swiper-child
                :trigonColor="swiperBg.color"
                :info="child"
                :res="memberInfoFc09"
                @clickGrowth="toGrowthValue"
              />
            </swiper-item>
          </swiper>
        </view>

        <!-- 会员等级区域 -->
        <view class="member-level-main">
          <image
            :src="require(`@/static/${currentCof.circleImg}`)"
            mode="widthFix"
            class="level-img"
            lazy-load="true"
          />
          <view class="shazi">
            <!-- 禁止操作蒙层 -->
            <view class="shazi-empty"></view>
            <colorLv :uindex="curBg - 1" />
          </view>

          <view
            class="level-main"
            :style="{
              background: currentCof.mainBg,
            }"
          >
            <levelMain
              :info="currentCof"
              :isUp="isUp"
              :memberInterest="memberInterest"
              @clickItem="clickItem"
            />
            <!-- 圆形区域 -->
            <view class="empty-circle">
              <!-- 半圆 -->
              <view class="circle-half" @tap="onClickUpOrDown">
                <img
                  :src="getAssetImgUrl('member/vector-down.png')"
                  alt=""
                  :class="['vector-icon', !isUp && 'vector-rote']"
                  mode="widthFix"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 任务区 -->
      <!-- <scroll-view scroll-y :style="{ height: taskHeight }" @scroll="scroll"> -->
      <view class="task-main">
        <memberMain
          :bannnerList="memberBanner"
          :couponList="couponList"
          :memberTask="memberTask"
          @onClickSw="onClickSw"
          @getTicket="getTicket"
          @onClickBuy="onClickBuy"
        />
      </view>
      <!-- </scroll-view> -->

      <!-- 朔源码弹窗 -->
      <indexPop
        :point="memberInfoFc09.currentPoint"
        :show="showPop"
        @onClickHide="onClickHide"
      />

      <!-- 黑名单弹窗 -->
      <uni-popup ref="popup" @change="change">
        <view
          class="popup-content-view"
          :class="{ 'popup-height': type === 'left' || type === 'right' }"
        >
          <view class="affirm-text"
            >当前会员账户异常，不再享受会员相关权益，如有疑问请联系客服</view
          >
          <view class="affirm-button-view">
            <view class="cancel-btn" @click="onCancel">取消</view>
            <button class="affirm-btn" @click="onServe" open-type="contact">
              联系客服
            </button>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import { memberCof, UrlTypeEnum } from "./components/config/const";
import Top from "./components/top.vue";
import swiperChild from "./components/swiperChild.vue";
import levelMain from "./components/level-main.vue";
import colorLv from "./components/color-lv.vue";
import mainTip from "./components/main-tip.vue";
import indexPop from "./components/index-pop.vue";
import memberMain from "./components/member-main.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { clickNav } from "@/utils/utils";
export default {
  components: {
    Top,
    swiperChild,
    levelMain,
    colorLv,
    mainTip,
    memberMain,
    indexPop,
  },
  data() {
    return {
      curBg: 1,
      memberCof,
      isAnimating: false,
      isUp: true,
      req: {
        page: 1,
        size: 10,
      },
      showPop: false, //积分弹窗
      uuid: "",
      lastTime: 0,
      showRelogin: true,
      show: false,
      taskHeight: 0,
    };
  },
  computed: {
    ...mapState("member", [
      "memberInfoFc09",
      "memberInterest",
      "memberBanner",
      "couponList",
      "memberTask",
    ]),
    ...mapState("user", ["loginStatus"]),
    // 轮播区域背景色
    swiperBg() {
      return {
        background: memberCof[this.curBg - 1].swBg,
        color: memberCof[this.curBg - 1].topColor,
      };
    },
    // // 是否登录
    // isLogin() {
    //   const flag = uni.getStorageSync("malltoken");
    //   console.log("flag1112malltoken", !!flag);
    //   return !!flag;
    // },

    swiperHeight() {
      return {
        height: "340rpx",
      };
    },
    // 当前会员等级配置
    currentCof() {
      return memberCof[this.curBg - 1];
    },
  },
  onLoad(options) {
    console.log("options", options);
    if (options?.uuid) {
      this.uuid = options.uuid;
    }
    // const flag = uni.getStorageSync("malltoken");
    // this.showRelogin = !flag;
    // if (!flag) return;
    // this.getHeight();
  },
  onShow() {
    this.initMember();
  },
  onReady() {},
  methods: {
    ...mapMutations("member", ["setSelectSwIndex"]),
    ...mapActions("member", [
      "getMemberCode", //会员信息
      "getGrowthValue", //成长值
      "getIntegralDetail", //积分明细
      "getMemberInterest", //会员权益
      "getMemberBanner", //会员banner
      "getMemberBenefit", //权益详情
      "getCouponByAcquire", //积分兑券
      "getMemberRule", //等级规则
      "postCouponByAcquire", //优惠券领取
      "getMemberTask", //会员任务
    ]),
    // 获取task-main高度
    // getHeight() {
    //   const query = uni.createSelectorQuery().in(this);
    //   query.select(".task-main").boundingClientRect((res) => {
    //     console.log("res", res);
    //     this.taskHeight = res.height;
    //   });
    //   query.exec();
    // },
    scroll(e) {
      console.log("e-滚动", e);
    },
    // 获取会员信息
    async initMember() {
      try {
        const token = uni.getStorageSync("malltoken");
        if (!token) {
          this.showRelogin = true;
          return;
        }

        this.showRelogin = false;
        await this.getMemberCode({ uuid: this.uuid });
        await this.getMemberInterest();
        await this.getMemberBanner();
        await this.getCouponByAcquire();
        await this.getMemberTask();
        this.curBg = this.memberInfoFc09.level;
        this.showPop = !!this.memberInfoFc09.currentPoint; //没积分不弹窗
      } catch (error) {
        //
      }
    },
    //轮播滚动
    changeSw(e) {
      console.log("e", e);
      this.curBg = e.detail.current + 1;
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 1000);
    },

    // 会员规则
    async toMemberRule() {
      try {
        await this.getMemberRule();
        uni.navigateTo({
          url: "/member-pages/member-rule/index",
        });
      } catch (error) {}
    },
    // 点击头像
    onPhoto() {
      if (this.memberInfoFc09.isBlack) {
        this.$refs.popup.open();
      }
    },

    change(e) {
      console.log(e);
      this.show = e.show;
    },
    onCancel() {
      this.$refs.popup.close();
    },
    onServe() {
      this.$refs.popup.close();
    },
    //积分明细
    async toMemberScore() {
      try {
        await this.getIntegralDetail(this.req);
        uni.navigateTo({
          url: "/member-pages/total-detail/index",
        });
        // this.toGrowthValue();
      } catch (error) {}
    },
    //查看成长值
    async toGrowthValue() {
      try {
        await this.getGrowthValue({ page: 1, size: 100 });
        uni.navigateTo({
          url: "/member-pages/growth-value/index",
        });
      } catch (error) {}
    },
    async clickItem(e, index) {
      console.log("e", e, index);
      try {
        await this.getMemberBenefit();
        this.setSelectSwIndex(index);
        uni.navigateTo({
          url: `/member-pages/benefit/index?index=${index}&currentLv=${this.memberInfoFc09.level}`,
        });
      } catch (error) {}
    },
    // 展开收起
    onClickUpOrDown() {
      this.isUp = !this.isUp;
    },
    // 会员轮播
    onClickSw(e) {
      console.log("e", e);
      const obj = {
        urlType: UrlTypeEnum[e.urlType],
        url: e.redirectUrl,
        spuCode: e.spuId,
      };
      console.log("obj", obj);
      if (e.urlType === "STATIC_PICTURE") {
        //静态图片
        uni.navigateTo({
          url: `/pages/member/static?url=${e.staticPic}`,
        });
      } else {
        clickNav(obj);
      }
    },
    // 积分兑券-获取列表
    async getMoreCoupon() {
      try {
        await this.getCouponByAcquire();
      } catch (error) {}
    },
    // 去下单
    onClickBuy() {
      uni.switchTab({
        url: "/pages/product/product",
      });
    },
    //积分兑换-兑换按钮
    getTicket(e) {
      console.log("e,num", e);
      const now = Date.now();
      if (now - this.lastTime < 1000) {
        return;
      }
      this.lastTime = now;
      this.usePoint(e);
    },
    async usePoint(e) {
      try {
        uni.showModal({
          title: "",
          content: `确认消耗${e.num}积分兑换优惠券？`,
          success: async (res) => {
            if (res.confirm) {
              await this.postCouponByAcquire({ code: e.code });
            }
          },
        });
        // await this.postCouponByAcquire({ code: e });
      } catch (error) {}
    },

    //弹窗关闭
    onClickHide(e) {
      this.showPop = !e;
    },
    // 去登录
    toRelogin() {
      uni.navigateTo({
        url: "/pages/user/relogin",
      });
    },
  },
  //触底
  onReachBottom(e) {
    console.log("触底", 1);
    console.log("e", e);
  },
  onHide() {
    console.log("1-onHide", 1);
    this.uuid = "";
  },
  // 生命周期 - 监听页面卸载
  onUnload() {
    console.log("2-onUnload", 2);
    this.uuid = "";
  },
};
</script>
<style scope lang='scss'>
@import "./index.scss";
.member-out {
  // padding: 32rpx 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  //   background: linear-gradient(180deg, #d2e3f7 0%, #5c87ad 100%);
  .member-color-top {
    padding-top: 32rpx;
  }
}
</style>