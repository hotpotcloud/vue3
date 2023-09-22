<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <image class="goods-img" :src="getAssetImgUrl()" />
      <view class="goods-name">新希望黄金24小时牛奶风味发酵</view>
    </view>
    <view class="goods-count">×️1</view>
  </view>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.goods-item {
  margin-top: 16rpx;
  .goods-item-left,
  .goods-count {
    display: inline-block;
    vertical-align: middle;
  }
  .goods-item-left {
    .goods-img,
    .goods-name {
      display: inline-block;
      vertical-align: top;
    }
    .goods-img {
      width: 136rpx;
      height: 136rpx;
    }
    .goods-name {
      width: 425rpx;
      height: 38rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 38rpx;
      margin-left: 16rpx;
    }
  }
  .goods-count {
    width: 60rpx;
    font-size: 26rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 30rpx;
    text-align: right;
  }
}
</style>
