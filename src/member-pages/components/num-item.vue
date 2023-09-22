<template>
  <view class="item-num-out">
    <view class="d-flex-center d-sb">
      <view class="left-text flex-1 h-overflow-8-2">{{ leftText }}</view>
      <view class="right-num-black">
        <text :style="[numColor]">{{ rightNum }}</text>
        <slot name="text"></slot>
      </view>
    </view>
    <view class="item-time"> {{ time }}</view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    leftText: {
      type: String,
      default: "左边",
    },
    rightNum: {
      type: String,
      default: "右边积分",
    },
    rightColor: {
      type: String,
      default: "black",
    },
    time: {
      type: String,
      default: "2023.10.22 15:33",
    },
  },
  data() {
    return {};
  },
  computed: {
    // num颜色 + #F1A55D;- #000000
    numColor() {
      return +this.rightNum <= 0 ? { color: "#000000" } : { color: "#F1A55D" };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {},
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.item-num-out {
  //   border: 1rpx solid #f01;
  background: #fff;
}
.left-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: bold;
}
.right-num-black {
  font-size: 36rpx;
  font-weight: bold;
  color: #000000;
  margin-right: 16rpx;
}
.right-num-red {
  @extend .right-num-black;
  color: #ff3f51;
}
.item-time {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #999999;
}
</style>