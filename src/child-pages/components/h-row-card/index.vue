<template>
  <view class="card-out d-flex d-sb">
    <view class="goods-card-img" @tap.stop="onBuyNow">
      <img :src="getAssetImgUrl(info.imageUrl)" alt="img" />
    </view>

    <view class="d-flex-colum d-sb flex-1 card-right-item" @tap.stop="onBuyNow">
      <view class="d-flex d-sb">
        <view class="h-overflow-8-2 f28 goods-name">
          <view class="xy-distribution" v-if="info.distributionFlag">
            <img
              :src="getAssetImgUrl('xy-distribution-flag.svg')"
              class="xy-distribution-icon"
            />
          </view>
          <!-- <text v-if="info.distributionFlag" class="xy-distribution">分</text> -->
          {{ info.skuName }}
        </view>
        <view class="color-99 margin-left16 flex-1 goods-amount"
          >x{{ info.milkAmount ? info.milkAmount : 0 }}</view
        >
      </view>
      <view class="d-flex-center d-sb">
        <view class="f32">￥{{ noformatAmount(info.milkAmountPrice) }}</view>
        <view class="shop-btn" @tap.stop="onBuyNow">购买</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onBuyNow() {
      this.$emit("onBuyNow", this.info);
    },
  },
};
</script>

<style scoped lang="scss">
.goods-card-img {
  border: 2rpx solid #f3f3f3;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  height: 128rpx;
  width: 128rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.card-right-item {
  margin-left: 16rpx;
  color: #333;
}
.margin-left16 {
  margin-left: 16rpx;
}
.shop-btn {
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  background: #1d9bdc;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: bold;
  height: 48rpx;
  width: 96rpx;
  line-height: 48rpx;
  text-align: center;
}
.goods-name {
  width: 400rpx;
  height: auto;
  .xy-distribution-icon {
    width: 28rpx;
    height: 38rpx;
    position: absolute;
    bottom: -6rpx;
    left: 0;
  }
  .xy-distribution {
    display: inline-block;
    width: 28rpx;
    height: 40rpx;
    position: relative;
  }
}
.goods-amount {
  text-align: right;
}
</style>

