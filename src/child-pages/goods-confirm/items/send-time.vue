<template>
  <view class="plandate-out">
    <view class="d-flex-center d-sb plan">
      <text class="plan-1">起送日期</text>
      <view
        class="d-flex-center plan-text"
        :class="[startDate && 'active']"
        @tap="onClickDate"
        >{{ startDate ? startDate : "请选择" }}
        <u-icon name="arrow-right" color="#a9a9a9"
      /></view>
    </view>
  </view>
</template>

<script>
export default {
  computed: {
  
  },
  props: {
    startDate: {
      //deliveryStartDate-起送日期
      type: String,
      default: "",
    },
  },
  methods: {
    //日历选择
    onClickDate() {
      this.$emit("onClickDate");
    },
  },
};
</script>

<style scoped lang="scss">
.plandate-out {
  background: #fff;
  border-radius: 24rpx;
  margin-bottom: 16rpx;
  padding: 24rpx 32rpx;
  .plan-1 {
    font-weight: bold;
    font-size: 26rpx;
  }
  .plan-text {
    color: #a9a9a9;
  }
  .active {
    color: #333333;
  }
}
</style>
