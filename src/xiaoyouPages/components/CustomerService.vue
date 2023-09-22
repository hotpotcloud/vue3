<template>
  <view>
    <u-overlay :show="show" @click="closePopup" :opacity="0.45"
      ><view class="bottom">
        <view class="title"
          ><text>添加小优企业微信 领取专属红包</text>
          <image
            class="close"
            @click="closePopup"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
          ></image
        ></view>
        <view class="tips"
          >①长按二维码 ②打开企业微信名片 ③添加到通讯录 ④领取</view
        >
        <view class="code">
          <image
            class="qrcode"
            show-menu-by-longpress="true"
            :src="imageUrl"
          ></image
        ></view>
        <view class="tips-bottom"
          >最新活动、佣金政策、提现疑问等都可以咨询小优哦~</view
        >
      </view></u-overlay
    >
  </view>
</template>
<script>
import Vue from "vue";
import {copyText} from "@/utils/utils";
import {URLDistributor} from "@/utils/url";
import Api from "@/utils/api";
export default Vue.extend({
  props: ["show"],
  data() {
    return {
      imageUrl: "",
    };
  },
  mounted() {
    this.getImage();
  },
  onShow() {},
  methods: {
    closePopup() {
      this.$emit("close", false);
    },
    async getImage() {
      const {data} = await Api.$getX(
        `${URLDistributor.config}wechat_customer_service_QRcode`
      );
      this.imageUrl = data;
    },
  },
});
</script>
<style scoped lang="scss">
.bottom {
  margin-top: 34vh;
  height: 66vh;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  .title {
    font-size: 34rpx;
    font-weight: 500;
    color: #000000;
    line-height: 40rpx;
    text-align: center;
    padding: 48rpx;
    position: relative;
  }
  .tips {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
    text-align: center;
  }
  .close {
    width: 32rpx;
    height: 32rpx;
    border: none;
    position: absolute;
    right: 32rpx;
    top: 56rpx;
  }
  .code {
    text-align: center;
    padding: 48rpx;
    .qrcode {
      width: 320rpx;
      height: 320rpx;
      border: none;
    }
  }
  .tips-bottom {
    text-align: center;
    height: 30rpx;
    font-size: 22rpx;
    color: #999999;
    line-height: 30rpx;
    margin-top: 48rpx;
  }
}
</style>
