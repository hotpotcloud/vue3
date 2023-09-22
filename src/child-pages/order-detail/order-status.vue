<template>
  <view class="order-status-wrap"
    ><text
      :class="[
        'left',
        data.status === orderStatus.WAIT_PAYMENT ? 'pay' : 'other'
      ]"
      >{{ orderStatusText[data.status] }}</text
    >
    <u-count-down
      v-if="data.status === orderStatus.WAIT_PAYMENT"
      @finish="finish"
      :time="getTime()"
      format="mm:ss"
      @change="onChangeTime"
    >
      <view class="right">
        剩余：
        <text v-if="timeData.hours">
          {{ timeData.hours > 9 ? timeData.hours : "0" + timeData.hours }}
          :
        </text>
        <text>
          {{ timeData.minutes > 9 ? timeData.minutes : "0" + timeData.minutes }}
        </text>
        <text>:</text>
        <text>
          {{ timeData.seconds > 9 ? timeData.seconds : "0" + timeData.seconds }}
        </text>
      </view>
    </u-count-down>
  </view>
</template>
<script>
import { orderStatus, orderStatusText } from "@/utils/enum";
export default {
  props: {
    data: { type: Object, default: {} }
  },
  data() {
    return {
      orderStatus,
      orderStatusText,
      timeData: {}
    };
  },
  methods: {
    getTime() {
      return this.countTime(
        this.data.orderTimestamp,
        this.data.minute,
        this.data.nowDate
      );
    },
    finish() {
      this.$emit("onFinish");
    },
    onChangeTime(e) {
      this.timeData = e;
    }
  }
};
</script>

<style lang="scss" scoped>
.order-status-wrap {
  display: flex;
  width: 686rpx;
  height: 100rpx;
  justify-content: space-between;
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx 24rpx;
  .left {
    font-size: 36rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 42rpx;
  }
  .pay {
    color: #f86c4d;
  }
  .other {
    color: #a9a9a9;
  }
  .right {
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #f86c4d;
    line-height: 33rpx;
  }
}
</style>
