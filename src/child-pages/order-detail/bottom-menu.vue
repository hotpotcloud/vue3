<template>
  <view class="bottom-menu-wrap">
    <button
      id="serveBtn"
      style="display: none"
      open-type="contact"
      hover-class="button-hover"
    ></button>
    <label for="serveBtn">
      <view class="customer-btn">联系客服</view>
    </label>
    <view class="confirm-btn" @tap.stop="onPay" v-if="isPay">立即支付</view>

    <view class="customer-btn" v-else @tap.stop="goRefund">{{
      (status !== orderStatus.WAIT_PAYMENT ||
        status !== orderStatus.CANCELED) &&
      saleStatus === refundStatus.UN_SUBMIT
        ? "申请售后"
        : "售后明细"
    }}</view>
  </view>
</template>
<script>
import { orderStatus, refundStatus } from "@/utils/enum";
export default {
  props: {
    isPay: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "",
    },
    saleStatus: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      orderStatus,
      refundStatus,
    };
  },
  methods: {
    onPay() {
      this.$emit("onPay");
    },
    goRefund() {
      this.$emit("goRefund");
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-menu-wrap {
  position: fixed;
  width: 100%;
  height: 108rpx;
  z-index: 999;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  display: flex;
  gap: 16rpx;
  padding: 20rpx 32rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  justify-content: flex-end;

  .customer-btn {
    width: 200rpx;
    height: 68rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    color: #666;
    line-height: 68rpx;
    text-align: center;
    border-radius: 254rpx;
    font-weight: 400;
    border: 1rpx solid #c7c7c7;
  }
  .confirm-btn {
    width: 200rpx;
    height: 68rpx;
    background: #1d9bdc;
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 68rpx;
    text-align: center;
    border-radius: 254rpx;
  }
}
</style>
