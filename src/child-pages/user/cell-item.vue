<template>
  <view class="cell-item-out d-flex-center d-sb" @tap.stop="clickItem">
    <view class="no-warp-text item-title">{{ title }}</view>
    <view class="d-flex-center no-warp-text">
      <slot name="value"></slot>
      <view v-if="!$slots.value" class="value-right">{{ value }}</view>
      <uni-icons
        type="forward"
        size="15"
        v-if="isForward"
        color="#999999"
      ></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    isForward: {
      type: Boolean,
      default: true,
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
    clickItem() {
      if (!this.isLink) return;
      console.log("组件点击");
      this.$emit("onClick");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.cell-item-out {
  font-size: 15px;
  color: #333;
  height: 112rpx;
  line-height: 112rpx;
  border-bottom: 2rpx solid #f4f4f4;
}
.item-title {
  min-width: 100rpx;
}
.no-warp-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.value-right {
  padding-right: 16rpx;
}
</style>