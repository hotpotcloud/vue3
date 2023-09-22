/* 配送员信息 */
<template>
  <view class="sender-out d-flex" @tap="clickSender">
    <view class="sender-photo">
      <img :src="getAssetImgUrl('sender-photo.png')" alt="" />
    </view>
    <view class="d-flex-colum d-sb">
      <view class="send-name">{{
        info.milkManNoName ? info.milkManNoName : "送奶师傅"
      }}</view>
      <view class="send-time">{{ info.deliveryEndTime }}</view>
    </view>
    <text class="send_time_txt">{{ sendTimeText }}</text>
  </view>
</template>
<script>
import { TimeSectionName, timeSectionEnum } from "@/utils/enum";
export default {
  components: {},
  props: {
    // 上午下午送
    current: {
      type: Number,
      default: 0,
    },
    info: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    // 上午下午送
    sendTimeText() {
      return TimeSectionName[this.info.timeSection];
    },
    //是否选中
    isShow() {
      return this.info.yesOrNoEnum === "NO" && this.isActive;
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    clickSender() {
      this.$emit("clickSender", this.info, this.current);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.sender-out {
  // border: 2rpx solid transparent;
  border-radius: 24rpx;
  background: #fff;
  padding: 24rpx;
  position: relative;
  .send_time_txt {
    position: absolute;
    right: 0rpx;
    top: 0rpx;
    color: #ffffff;
    font-size: 24rpx;
    text-align: center;
    line-height: 36rpx;
    border-bottom-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    padding: 2rpx 10rpx;

    background: linear-gradient(
      288deg,
      #65d7fb 0%,
      rgba(22, 147, 237, 0.72) 100%
    );
  }

  .sender-photo {
    width: 84rpx;
    height: 84rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .send-name {
    color: #000000;
  }
  .send-time {
    color: #999999;
  }
}
.active {
  border-color: #1d9bdc;
}
</style>