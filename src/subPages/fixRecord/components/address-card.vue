<template>
  <view class="address-out" :style="{ color: colorFont }">
    <view class="d-flex-center">
      <view class="h-over-1 margin-rig-18">{{ address.receiver }}</view>
      <view class="flex-1 h-over-1">{{ address.receiverPhone }}</view>
    </view>
    <view class="h-overflow-8-2 h-margin-top16">{{ address.address }}</view>
  </view>
</template>

<script>
export default {
  props: {
    address: {
      //地址信息
      type: Object,
      default: {},
    },
    colorFont: {
      type: String,
      default: "#000000",
    },
  },
};
</script>

<style scoped lang="scss">
.address-out {
  padding: 24rpx;
  background: #f7f8f9;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  font-size: 28rpx;
  .margin-rig-18 {
    margin-right: 18rpx;
  }
}
</style>