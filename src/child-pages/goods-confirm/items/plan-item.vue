<template>
  <view class="plan-item-out">
    <view class="item-top-name" :style="{ color: nomalColor }">
      <slot></slot>
    </view>
    <view class="d-flex-center" @tap="onClick">
      <slot name="tips"></slot>
      <u-icon name="arrow-right" color="#c7c7c7" :size="iconSize"
    /></view>
  </view>
</template>

<script>
export default {
  props: {
    nomalColor: {
      type: String,
      default: "#a9a9a9",
    },
    iconSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang='scss'>
.plan-item-out {
  font-size: 20rpx;
  color: #c7c7c7;
  .item-top-name {
    color: #a9a9a9;
    font-size: 28rpx;
    font-weight: bold;
  }
}
</style>