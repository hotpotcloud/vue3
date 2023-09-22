<template>
  <view class="person-info">
    <!-- <view class="status delivery">{{ orderStatusText[data.status] }}</view> -->
    <h-receiver
      :defaulted="data.isDefaultAddress"
      :name="data.receiver"
      :detail="data.address"
      :phone="data.receiverPhone"
    />
  </view>
</template>
<script>
import { orderStatusText } from "@/utils/enum";
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      orderStatusText,
    };
  },
  computed: {
    // 地址
    address() {
      return `${this.data.provinceName}${this.data.cityName}${this.data.address}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.person-info {
  width: 100%;
  height: auto;
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  .status {
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 42rpx;
    margin-bottom: 46rpx;
  }
  .delivery {
    color: #1d9bdc;
  }
}
</style>
