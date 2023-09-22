<template>
  <view class="null-out">
    <view class="null-out-main">
      <image
        v-if="!slotImg"
        class="null-img"
        :src="getTXimgUrl(img)"
        mode="widthFix"
      />
      <slot v-else></slot>
      <text class="null-text" v-if="!slotText">{{ textTip }}</text>
      <slot name="text"></slot>
      <view class="d-flex-row-center" style="width: 100%">
        <view @tap.stop="btnLeft" class="left-btn flex-1">{{ butLeft }}</view>
        <view @tap.stop="btnRight" class="right-btn flex-1">{{
          butRight
        }}</view>
        <slot name="button" />
      </view>
    </view>
  </view>
</template>

<script>
import { getTXimgUrl } from "@/utils/utils";
export default {
  props: {
    //按钮左侧文字
    butLeft: {
      type: String,
      default: "返回首页",
    },
    leftUrl: {
      type: String,
      default: "/pages/homepage/homepage",
    },
    //按钮右侧文字
    butRight: {
      type: String,
      default: "查看商品",
    },
    rightUrl: {
      type: String,
      default: "/pages/product/product",
    },
    //是否使用提示文字插槽 默认不使用
    slotText: {
      type: Boolean,
      default: false,
    },
    //提示文字内容
    textTip: {
      type: String,
      default: "商品不见了，看看其他商品吧~",
    },
    //是否使用提示图片插槽 默认不使用
    slotImg: {
      type: Boolean,
      default: false,
    },
    //提示图片内容
    img: {
      type: String,
      default:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png",
    },
  },
  methods: {
    getTXimgUrl,
    //按钮左侧点击事件
    btnLeft() {
      uni.redirectTo({
        url: this.leftUrl,
        fail: () => {
          uni.switchTab({
            url: this.leftUrl,
          });
        },
      });
    },
    //按钮右侧点击事件
    btnRight() {
      uni.redirectTo({
        url: this.rightUrl,
        fail: () => {
          uni.switchTab({
            url: this.rightUrl,
          });
        },
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.null-out-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .null-img {
    width: 294rpx;
    height: 360rpx;
    margin-bottom: 96rpx;
  }
  .null-text {
    font-size: 26rpx;
    color: #a9a9a9;
    margin-bottom: 76rpx;
  }
  .left-btn,
  .right-btn {
    // padding: ;
    height: 104rpx;
    border: 1rpx solid #1d9bdc;
    border-radius: 254rpx 254rpx 254rpx 254rpx;
    font-size: 34rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1d9bdc;
  }
  .left-btn {
    margin-right: 40rpx;
    color: #1d9bdc;
  }
  .right-btn {
    color: #fff;
    background: #1d9bdc;
  }
}
</style>