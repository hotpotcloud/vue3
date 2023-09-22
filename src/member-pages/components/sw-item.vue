/* 会员权益轮播组件 */
<template>
  <view class="sw-page-out">
    <view :class="['left-top-tip-nomal', info.own && 'left-top-tip']">{{
      info.own ? "已解锁" : "未解锁"
    }}</view>
    <view class="top-name-benfit"
      >{{ BenefitTextEnum[info.benefitType] }}权益</view
    >
    <!-- 权益对象 -->
    <view class="benfit-base">
      <view class="name-tip">权益对象</view>
      <view>{{ info.target ? info.target : "暂无" }}</view>
    </view>
    <!-- 权益说明 -->
    <view class="benfit-base">
      <view class="name-tip">权益说明</view>
      <view>
        <rich-text :nodes="info.benefitDesc"></rich-text>
      </view>
    </view>
    <view class="server-code">
      <image :src="info.benefitQrCode" mode="widthFix" />
    </view>
    <button @tap="onClick" class="item-btn">去下单</button>
  </view>
</template>

<script>
import { BenefitTextEnum } from "@/pages/member/components/config/const";
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      BenefitTextEnum,
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    /* 点击事件 */
    onClick() {
      this.$emit("onClick");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.sw-page-out {
  overflow: auto;
  height: 1184rpx;
  background: #fff;
  margin: 0 12rpx;
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  border-radius: 24rpx;
  position: relative;
  padding: 45rpx 22rpx 158rpx;
  border: 2rpx solid #fff;
  .left-top-tip {
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(87.64deg, #edd0b0 3.95%, #a68d77 78.5%);
    color: #fff;
    border-top-left-radius: 24rpx;
    border-bottom-right-radius: 24rpx;
    padding: 4rpx 16rpx;
  }
  .left-top-tip-nomal {
    @extend .left-top-tip;
    background: #999999;
  }
}
.top-name-benfit {
  font-size: 36rpx;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 48rpx;
}
.benfit-base {
  margin-bottom: 24rpx;
  .name-tip {
    font-size: 32rpx;
    color: #000000;
    font-weight: bold;
    margin-bottom: 16rpx;
    position: relative;
    padding-left: 20rpx;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8rpx;
      height: 60%;
      border-top-right-radius: 4rpx;
      border-bottom-right-radius: 4rpx;
      background: #e7b25b;
    }
  }
}

.server-code {
  width: 542rpx;
  height: 160rpx;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.item-btn {
  position: absolute;
  //   width: 100%;
  width: 558rpx;
  bottom: 40rpx;
  left: 0;
  right: 0;
  font-size: 28rpx;
  color: #533417;
  font-weight: bold;
  background: linear-gradient(90deg, #ffe9c5 0%, #ffd690 100%);
  box-shadow: 0rpx 0rpx 40rpx 0rpx #fff6e5;
  border-radius: 34rpx 34rpx 34rpx 34rpx;
  &::after {
    border: none;
  }
}
</style>