<template>
  <view class="card-out">
    <view class="d-flex-center d-sb">
      <view @tap="toDetail">
        <view class="card-month d-flex-center">
          <text>{{ formatMonth(info.receiptDate) }}月账单</text>
          <text class="month-tip" v-if="info.overtime">已逾期</text>
        </view>
        <view class="card-num d-flex-center" v-if="info.waitPayAmount">
          <view>
            <text class="num-icon">￥</text
            ><text>{{ noformatAmount(info.waitPayAmount) }}</text></view
          >
          <image
            class="num-icon-right"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/Frame%2050%402x.png"
            mode="scaleToFill"
          />
        </view>
        <view class="card-day">最迟还款日：{{ info.lastPayTime }}</view>
      </view>
      <view class="card-btn" @tap="onPayNow">立即还款</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 账单信息
    info: {
      default: null,
      type: Object,
    },
  },

  methods: {
    //格式化月份
    formatMonth(data) {
      let month = data.split("-")[1];
      return month;
    },
    // 跳转到详情页
    toDetail() {
      this.$emit("toDetail");
    },
    // 立即还款
    onPayNow() {
      this.$emit("onPayNow");
    },
  },
};
</script>

<style scoped lang="scss">
.card-out {
  height: 242rpx;
  width: 100%;
  background: #fff;
  padding: 32rpx;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  font-size: 26rpx;
}
.card-month {
  font-size: 32rpx;
  color: #000000;
  font-weight: bold;
  position: relative;
  margin-bottom: 24rpx;
  .month-tip {
    height: 32rpx;
    width: 80rpx;
    margin-left: 8rpx;
    font-size: 18rpx;
    padding-bottom: 4rpx;
    background: #ffcd5f;
    color: #ffffff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
  }
}
.card-num {
  color: #f86c4d;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
  .num-icon {
    font-size: 28rpx;
  }
  .num-icon-right {
    width: 48rpx;
    height: 48rpx;
  }
  // &::after {
  //   content: "";
  //   display: inline-block;
  //   width: 14rpx;
  //   height: 14rpx;
  //   border-top: 4rpx solid #999;
  //   border-right: 4rpx solid #999;
  //   transform: rotate(45deg);
  //   margin-left: 18rpx;
  // }
}
.card-day {
  color: #999999;
}
.card-btn {
  width: 160rpx;
  height: 60rpx;
  border: 2rpx solid #1d9bdc;
  color: #1d9bdc;
  border-radius: 76rpx 76rpx 76rpx 76rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
