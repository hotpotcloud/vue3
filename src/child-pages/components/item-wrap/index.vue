<template>
  <view class="item-wrap" @tap.stop="handleTap">
    <text class="item-left">{{ title }}</text>
    <view class="item-content">
      <view class="item-center"> <slot name="content"></slot> </view>
      <view class="item-right" v-if="showArrow" @tap.stop="handleTap">
        <u-icon name="arrow-right" color="#999999" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleTap() {
      this.$emit("tap");
    }
  }
};
</script>
<style scoped lang="scss">
.item-wrap {
  display: flex;
  padding: 24rpx 0 24rpx 0;
  border-bottom: 2rpx solid #f4f4f4;
  align-items: top;
  .item-left {
    font-size: 24rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    padding-top: 3rpx;
  }
  .item-content {
    display: flex;
    align-items: center;
    .item-center {
      width: 482rpx;
      margin-left: 72rpx;
    }
    .item-right {
      text-align: center;
    }
  }
}
</style>
