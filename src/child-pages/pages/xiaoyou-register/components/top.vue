<template>
  <view class="xiaoyou-top" v-if="BaseApp.isLeaderboards">
    <view class="xiao-top">
      <view class="d-flex-center d-sb">
        <view class="f32">佣金榜单</view>
        <view class="f24 color-99 d-flex-center" @click="onMoreTop"
          >更多
          <img
            style="width: 32rpx; height: 32rpx; margin-left: 4rpx; border: none"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/left2.png"
            alt=""
        /></view>
      </view>
      <!-- 排行榜 -->
      <view class="top-three d-flex d-sb">
        <view class="two" @click="onMoreTop">
          <view
            class="two-img"
            :style="{
              ' border-color': getColor['1'],
            }"
          >
            <img
              :src="
                rankArr[1].photo ||
                'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/default-image.png'
              "
              alt=""
            />
          </view>
          <view
            class="two-money"
            :style="{
              background: `linear-gradient(90deg, ${getColor['1']} 0%, #ffffff 100%)`,
            }"
            >赚
            <text class="sub-two"
              >{{
                rankArr[1].estimatedCommission
                  ? rankArr[1].estimatedCommission
                  : "0.00"
              }}元</text
            >
          </view>
          <view class="two-success d-flex-center">
            <img
              style="width: 32rpx; height: 32rpx"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/good.png"
              alt=""
            />
            成功
            <text class="color-red">{{
              rankArr[1].successOrderNum ? rankArr[1].successOrderNum : "0"
            }}</text>
            笔</view
          >
        </view>
        <view class="one" @click="onMoreTop">
          <view
            class="one-img"
            :style="{
              ' border-color': getColor['0'],
            }"
          >
            <img
              :src="
                rankArr[0].photo ||
                'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/default-image.png'
              "
              alt=""
            />
          </view>
          <view
            class="two-money"
            :style="{
              background: `linear-gradient(90deg, ${getColor['0']} 0%, #ffffff 100%)`,
            }"
            >赚
            <text class="sub-two"
              >{{
                rankArr[0].estimatedCommission
                  ? rankArr[0].estimatedCommission
                  : "0.00"
              }}元</text
            >
          </view>
          <view class="two-success">
            <img
              style="width: 32rpx; height: 32rpx"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/good.png"
              alt=""
            />成功
            <text class="color-red">{{
              rankArr[0].successOrderNum ? rankArr[0].successOrderNum : "0"
            }}</text>
            笔</view
          >
        </view>
        <view class="three" @click="onMoreTop">
          <view
            class="two-img"
            :style="{
              ' border-color': getColor['2'],
            }"
          >
            <img
              :src="
                rankArr[2].photo ||
                'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/default-image.png'
              "
              alt=""
            />
          </view>
          <view
            class="two-money"
            :style="{
              background: `linear-gradient(90deg, ${getColor['2']} 0%, #ffffff 100%)`,
            }"
            >赚
            <text class="sub-two"
              >{{
                rankArr[2].estimatedCommission
                  ? rankArr[2].estimatedCommission
                  : "0.00"
              }}元</text
            >
          </view>
          <view class="two-success">
            <img
              style="width: 32rpx; height: 32rpx"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/good.png"
              alt=""
            />
            成功
            <text class="color-red">{{
              rankArr[2].successOrderNum ? rankArr[2].successOrderNum : "0"
            }}</text>
            笔</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { BaseApp } from "@/const/appIdConf";
export default {
  props: ["notXiaoyou"],
  data() {
    return {
      BaseApp,
      getColor: {
        0: "#feebac",
        1: "#abcbe8",
        2: "#fdcdbe",
        default: "#f1f1f1",
      },
    };
  },
  methods: {
    ...mapActions("xiaoyou", ["v_getDetailPages"]),
    // 查看更多
    onMoreTop() {
      if (this.notXiaoyou) {
        uni.navigateTo({
          url: "/xiaoyouPages/home/rank?notLogin=true",
          success: () => {
            this.v_getDetailPages();
          },
        });
        return;
      }
      uni.navigateTo({
        url: "/xiaoyouPages/home/rank",
        success: () => {
          this.v_getDetailPages();
        },
      });
    },
  },
  computed: {
    ...mapState("xiaoyou", ["topInfo"]),
    rankArr() {
      return this.topInfo?.topListVOS || [];
    },
  },
};
</script>

<style scoped lang="scss">
.xiao-top {
  position: relative;
  width: 100%;
  height: 338rpx;
  margin-top: 16rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  padding-bottom: 0;
  .top-three {
    position: absolute;
    bottom: 0;
    width: calc(100% - 48rpx);
    align-items: flex-end;
    .one,
    .two,
    .three {
      width: 204rpx;
      min-height: 242rpx;
      //   border: 1rpx solid #ccc;
      //   text-align: center;
      //   background: #f86c4d;
      display: flex;
      flex-direction: column;
      align-items: center;
      //   justify-content: space-between;
    }
    .two {
      background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/2-bg%402x%20%281%29.png")
        no-repeat;
      background-size: 100%;
    }
    .one {
      height: 290rpx;
      background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/1top.png")
        no-repeat;
      background-size: 100%;
    }
    .three {
      background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/3-bg%402x%20%283%29.png")
        no-repeat;
      background-size: 100%;
    }
    .color-red {
      color: #f86c4d;
    }
    .one-img {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 72rpx;
      width: 106rpx;
      height: 106rpx;
      border-radius: 50%;
      overflow: hidden;
      border: 4prx solid;
      image {
        border-radius: 50%;
        // border: 4rpx solid #fff;
        width: 94rpx;
        height: 94rpx;
      }
    }
    .two-img {
      margin-top: 56rpx;
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      background: #fff;
      overflow: hidden;
      border: 4prx solid;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        // border: 4rpx solid #fff;
      }
    }
    .two-money {
      padding: 10rpx 0;
      width: 100%;
      text-align: center;
      margin-top: 10rpx;
      // background: linear-gradient(90deg, #d6e6f6 0%, #ffffff 100%);
      color: #666666;
      .sub-two {
        color: #f86c4d;
        font-weight: bold;
      }
    }
    .two-success {
      display: flex;
      align-items: center;
      margin-top: 6rpx;
      color: #999;
      font-size: 20rpx;
    }
  }
}
</style>
