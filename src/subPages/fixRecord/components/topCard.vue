<template>
  <view class="top-out d-flex-center">
    <view :class="[index === 0 && 'top-left-after']"></view>
    <view class="top-left"></view>
    <view class="top-main d-flex-center d-sb flex-1">
      <view class="top-title">{{ HistroyTypeText[title] }}</view>
      <view class="top-time">{{ formatime }}</view>
    </view>
  </view>
</template>

<script>
import { HistroyTypeEnum, HistroyTypeText } from "@/utils/enum";
import { formatTime } from "@/utils/utils";

export default {
  props: {
    title: {
      type: String,
      default: "更换商品",
    },
    time: {
      type: String,
      default: "2021-01-01 12:00:00",
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      HistroyTypeEnum,
      HistroyTypeText,
    };
  },
  computed: {
    formatime() {
      const times = new Date(this.time).getTime();
      return formatTime("YYYY-mm-dd HH:MM:SS", times);
    },
  },
};
</script>

<style scoped lang="scss">
.top-out {
  background: #f5f5f5;
  // background: #f00;
  width: 100%;
  padding-right: 14rpx;
  margin-left: 14rpx;
  padding-left: 30rpx;
  border-left: 2rpx solid #d0ecff;
  position: relative;
  .top-left {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 18rpx;
    height: 18rpx;
    border-radius: 50%;
    background: #1d9bdc;
    border: 6rpx solid #ffffff;
    margin-right: 16rpx;
    box-sizing: content-box;
  }
  .top-left-after {
    width: 4rpx;
    height: 36rpx;
    background-color: #f5f5f5;
    z-index: 100;
    position: absolute;
    top: 0;
    left: -2rpx;
  }
  .top-main {
    background: #f1f9ff;
    box-shadow: 0rpx 2rpx 0rpx 0rpx #e4f4ff;
    height: 80rpx;
    padding: 24rpx;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
  }
  .top-title {
    font-size: 32rpx;
    color: #1d9bdc;
    font-weight: bold;
  }
  .top-time {
    color: #a9a9a9;
    font-size: 26rpx;
  }
}
</style>