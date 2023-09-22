<template>
  <view class="share-btn" v-if="show" @tap.stop="onClickShare">
    <view v-if="money > 0">{{ money }}</view>
    <view class="d-flex-center">
      <view class="share-icon">
        <image :src="getAssetImgUrl('share-icon-mk.png')" mode="widthFix" />
      </view>
      分享</view
    >
  </view>
</template>

<script>
export default {
  props: {
    money: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onClickShare() {
      this.$emit("onClickShare");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.share-btn {
  background: #f86c4d;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  position: fixed;
  z-index: 9999;
  right: 0;
  top: 45%;
  padding: 14rpx 24rpx;
  border-top-left-radius: 34rpx;
  border-bottom-left-radius: 34rpx;
  box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(248, 108, 77, 0.5);
  .share-icon {
    width: 34rpx;
    height: 34rpx;
    margin-right: 8rpx;
    border-radius: 50%;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>