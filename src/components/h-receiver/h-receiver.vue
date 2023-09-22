/** 地址信息 */
<template>
  <view class="receiver">
    <!-- 地址 -->
    <view class="d-flex">
      <view class="flex-1 h-overflow-8-2 address-info">
        <text :class="[defaulted ? 'tag' : 'tag-nomal']" v-if="label">{{
          defaulted ? "默认" : label
        }}</text>
        <text class="info" :style="{ marginLeft: label ? '60rpx' : 0 }">{{
          detail
        }}</text>
      </view>
    </view>
    <!-- 收货人信息 -->
    <view class="d-flex-center receiver-info">
      <view class="user-name">{{ name }}</view>
      <view>{{ phone }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    defaulted: { type: Boolean, default: false }, //是否默认
    label: { type: String, default: "" }, //标签
    detail: { type: String, default: "" }, //地址信息
    name: { type: String, default: "" }, //收货人
    phone: { type: String, default: "" }, //电话
  },
};
</script>

<style scoped lang="scss">
.receiver {
  width: 100%;
  .tag {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e0515f;
    border: 1rpx solid #e0515f;
    width: 52rpx;
    // height: 25rpx;
    border-radius: 4rpx;
    font-size: 18rpx;
    text-align: center;
    padding: 0rpx 0 3rpx;
    line-height: 21rpx;
    position: absolute;
    top: 8rpx;
    color: #e0515f;
    font-family: PingFang SC-Regular, PingFang SC;
  }
  .tag-nomal {
    // margin-right: 60rpx;
    @extend .tag;
    border-color: #1d9bdc;
    color: #1d9bdc;
  }
  .address-info {
    line-height: 40rpx;
    position: relative;

    .info {
      color: #333;
      font-size: 30rpx;
      font-weight: bold;
      // margin-left: 60rpx;
    }
  }
  .receiver-info {
    margin-top: 16rpx;
    color: #666;
    font-size: 30rpx;
    .user-name {
      margin-right: 30rpx;
    }
  }
}
</style>
