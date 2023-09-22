<template>
  <view
    class="xiaoyou-btn"
    v-if="info.commission && info.commission.maxCommission"
    @tap.stop="shareXY"
  >
    <view class="xiaoyou" @tap.stop="shareXY">
      <image
        class="sb-pm"
        :src="getAssetImgUrl('share-class-xy.png')"
        mode="scaleToFill"
      />
      <text>高达{{ info.commission.maxCommission }}元</text>
    </view>
    <!-- <h-canvas
      :show="showCanvas"
      @closeShare="closeShare"
      :info="info"
    ></h-canvas> -->
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showCanvas: false,
    };
  },
  methods: {
    closeShare() {
      this.showCanvas = false;
      uni.showTabBar();
    },
    shareXY() {
      console.log("this.info", this.info);
      // uni.$u.debounce(this.shareBtn, 1000);
      // uni.$u.throttle(this.shareBtn, 1000);
      this.$emit("shareXiaoYou", this.info);
    },
    shareBtn() {
      console.log("小优", 2);
      uni.hideTabBar();
      this.showCanvas = true;
    },
  },
};
</script>

<style scoped lang="scss">
.xiaoyou-btn {
  margin-top: 10rpx;
  width: 100%;
  height: 40rpx;
  background: transparent;
  position: relative;
}
.xiaoyou {
  border-radius: 8rpx;
  position: absolute;
  z-index: 13;
  height: 100%;
  background: rgba(248, 108, 77, 0.15);
  display: flex;
  align-items: center;
  padding: 4rpx 6rpx;
  padding-right: 8rpx;
  font-size: 24rpx;

  color: #f86c4d;
  .sb-pm {
    width: 32rpx;
    height: 32rpx;
  }
}
</style>
