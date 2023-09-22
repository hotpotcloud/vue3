<template>
  <view class="user-icons-out">
    <view class="icon-out">
      <view class="icons">
        <view class="icons-child d-flex-row d-flex-center">
          <view
            class="d-flex-colum-center"
            @tap="clickIcon(3)"
            v-if="BaseApp.isMilkCard"
          >
            <u-icon
              size="60rpx"
              :name="getAssetImgUrl('mymilkcard-icon.png')"
            ></u-icon>
            <text>我的卡包</text>
          </view>

          <view class="d-flex-colum-center" @tap="clickIcon(1)">
            <u-icon
              size="60rpx"
              name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E4%BC%98%E6%83%A0%E5%88%B8%E5%8C%85.png"
            ></u-icon>
            <text>我的券包</text>
          </view>

          <view class="d-flex-colum-center" @tap="clickIcon(2)">
            <u-icon
              size="60rpx"
              name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E9%A2%86%E5%8D%B7%E4%B8%AD%E5%BF%83.png"
            ></u-icon>
            <text>领券中心</text>
          </view>
          <view class="d-flex-colum-center" @tap="clickIcon(4)">
            <u-icon
              size="60rpx"
              name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E5%94%AE%E5%90%8E%20%282%29%402x.png"
            ></u-icon>
            <text>退款/售后</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { BaseApp } from "@/const/appIdConf";

export default {
  components: {},
  data() {
    return {
      BaseApp,
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    clickIcon(num) {
      this.$emit("clickIcon", num);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
// icons
.icon-out {
  .icons {
    // padding: 0 32rpx;

    // position: absolute;
    // top: 330rpx;
    border-radius: 40rpx;
    height: 180rpx;
    width: 100%;
    // background: transparent !important;
    background: #fff;
    box-shadow: 0px 0px 24px 2px rgba(0, 0, 0, 0.08);
    font-size: 26rpx;
    color: #000;
    .icons-child {
      height: 100%;
      justify-content: space-evenly;
      text {
        margin-top: 14rpx;
      }
    }
  }
}
</style>