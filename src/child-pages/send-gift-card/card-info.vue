<template>
  <view class="send-input-out">
    <!-- <view class="who-get">Dear {{ userInfo.name ? userInfo.name : "" }}:</view> -->
    <view class="detail-word"
      ><text decode> &nbsp; &nbsp;{{ data.message }} </text>
    </view>
    <view class="send-info-name">
      <view class="text-center">
        <!-- <view class="f24 color-33">{{ data.memberName }}</view> -->
        <!-- formatTime("YYYY-mm-dd", data.giveTime) -->
        <view class="color-99 text-marg8">{{ data.giveTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {formatTime} from "@/utils/utils";
export default {
  props: {
    userInfo: {
      type: Object,
      default: {},
    },
    data: {
      type: Object,
      default: {},
    },
  },
  methods: {
    formatTime,
  },
};
</script>
<style scope lang="scss">
.send-input-out {
  background: #fff;

  .who-get {
    font-size: 28rpx;
    color: #333333;
  }

  .detail-word {
    margin-top: 16rpx;
    word-break: break-word;
    text-decoration: underline dashed;
    text-decoration-color: #f1f1f1;
    text-underline-offset: 16rpx;
    line-height: 64rpx;
    border-top: 1px dashed #f1f1f1;
    color: #333333;
    font-size: 32rpx;
  }
  .send-info-name {
    font-size: 28rpx;
    margin-top: 16rpx;
    display: flex;
    justify-content: flex-end;
    .text-marg8 {
      margin-top: 8rpx;
    }
  }
}
</style>
