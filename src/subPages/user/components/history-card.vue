<template>
  <view class="history-card">
    <view class="d-flex-center d-sb">
      <view>
        <view class="his-month">{{ info.monthValue }}月账单</view>
        <view class="his-num">
          <text class="num-icon">￥</text>
          <text>{{ noformatAmount(info.amount) }}</text>
        </view>
      </view>

      <view>
        <view class="pay-status">{{ info.payStatusName }}</view>
        <view class="check-btn" @click="toDetail"
          >查看账单
          <image
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/blue-arrow.png"
            mode="scaleToFill"
            class="blue-arrow"
        /></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      default: null,
      type: Object,
    },
  },
  methods: {
    // 跳转到账单详情
    toDetail() {
      this.$emit("toDetail");
    },
  },
};
</script>

<style scoped lang="scss">
.history-card {
  width: 100%;
  height: 184rpx;
  background: #ffffff;
  padding: 32rpx;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
}
.his-month {
  font-size: 32rpx;
  color: #000000;
  font-weight: bold;
  margin-bottom: 30rpx;
}
.his-num {
  font-size: 36rpx;
  color: #1d9bdc;
  font-weight: bold;
  .num-icon {
    font-size: 28rpx;
    margin-right: 4rpx;
  }
}
.pay-status {
  color: #a9a9a9;
  margin-bottom: 34rpx;
  width: 110rpx;
  height: 48rpx;
  // line-height: 48rpx;
  // 垂直
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rpx;

  text-align: center;
  border-radius: 76rpx;
  border: 1px solid #a9a9a9;
}
.check-btn {
  color: #1d9bdc;
  // padding-right: 18rpx;
  display: flex;
  align-items: center;
  .blue-arrow {
    width: 48rpx;
    height: 48rpx;
  }
  /*  &::after {
    content: "";
    display: inline-block;
    width: 12rpx;
    height: 12rpx;
    border-top: 2px solid #1d9bdc;
    border-right: 2px solid #1d9bdc;
    transform: rotate(45deg);
    margin-left: 8rpx;
  } */
}
</style>
