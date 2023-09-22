<template>
  <view class>
    <view class="goods-cell" @click="goDetail(goodsInfo.spuCode)">
      <view class="goods-cell-cover">
        <image :src="goodsInfo.spuImg" />
      </view>
      <view class="goods-cell-desc">
        <view class="goods-cell-title">
          <text class="spike-tag" v-if="goodsInfo.kill">秒杀</text>
          {{ goodsInfo.spuName }}
        </view>
        <view class="goods-cell-tags">
          <text class="goods-coupon-tag" v-if="goodsInfo.coupon">优惠券</text>
          <text class="goods-cell-tag" v-if="goodsInfo.fullMinus">满减</text>
          <text class="goods-cell-tag" v-if="goodsInfo.gift">满赠</text>
        </view>
        <view class="goods-cell-price">{{
          goodsInfo.price | formatAmount
        }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import { couponActivityType } from "@/utils/enum";
export default {
  props: {
    goodsInfo: {
      type: Object,
    },
  },
  data() {
    return {
      couponActivityType,
    };
  },
  methods: {
    goDetail(spuCode) {
      this.$emit("goGoodsDetail", spuCode);
    },
  },
};
</script>
<style scoped lang="scss">
.goods-cell {
  border-radius: 24rpx;
  background: #fff;
  // width: 328rpx;
  // min-height: 400rpx;
  height: max-content;
  // margin-bottom: 32rpx;
}
.goods-cell-cover {
  width: 100%;
  height: 328rpx;
  image {
    width: 100%;
    height: 100%;
    border-radius: 24rpx 24rpx 0 0;
  }
}
.goods-cell-desc {
  padding: 32rpx;
  .goods-cell-title {
    font-weight: bold;
    // font-weight: bold;
    color: #333333;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.goods-cell-tags {
  padding-top: 16rpx;
  padding-bottom: 8rpx;
  .goods-coupon-tag {
    display: inline-block;
    width: 90rpx;
    height: 30rpx;
    line-height: 30rpx;
    color: #f86c4d;
    font-size: 22rpx;
    text-align: center;
    // border: 2rpx solid #f86c4d;
    border-radius: 8rpx;
    margin-right: 16rpx;
    background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/tag.png")
      no-repeat;
    background-position: 100%;
    background-size: cover;
  }
  .goods-cell-tag {
    display: inline-block;
    width: 60rpx;
    height: 28rpx;
    line-height: 26rpx;
    color: #f86c4d;
    font-size: 22rpx;
    text-align: center;
    border: 1rpx solid #f86c4d;
    border-radius: 8rpx;
    margin-right: 16rpx;
  }
}
.goods-cell-price {
  font-size: 34rpx;
  color: #f86c4d;
  font-weight: bold;
}
</style>
