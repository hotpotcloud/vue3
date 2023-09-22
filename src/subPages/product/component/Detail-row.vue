<template>
  <view class="detail-row-out d-flex-center" @tap.stop="clickRow">
    <view class="left-name"> {{ leftName }} </view>
    <view class="right-content flex-1 d-flex-center d-sb">
      <slot name="rightContent"></slot>
      <view v-if="!$slots.rightContent" class="h-over-1"
        >内容超过遗憾限制史书上的飞机啊扣税的飞机喀什内容超过遗憾限制史书上的飞机啊扣税的飞机喀什</view
      >
      <u-icon name="arrow-right" color="#999999" size="16"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    leftName: {
      type: String,
      default: "参数",
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    clickRow() {
      this.$emit("clickRow");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.detail-row-out {
  background: #fff;
  border-top: 1rpx solid #f4f4f4;
  padding: 28rpx 0;
  margin-top: 8rpx;
  .left-name {
    font-weight: bold;
    font-size: 26rpx;
    color: #333333;
    margin-right: 22rpx;
  }
  .right-content {
    background: #fff;
    font-size: 24rpx;
    color: #999999;
  }
}
</style>