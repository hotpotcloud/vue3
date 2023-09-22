<template>
  <view class="goods-out d-flex">
    <view class="goods-img">
      <view :class="[info.status, 'goods-tag-status']">{{
        info.statusName
      }}</view>
      <image :src="getAssetImgUrl(info.imgUrl)" mode="widthFix" />
    </view>
    <view class="goods-info">
      <view class="h-overflow-88-2 goods-name">{{ info.goodsName }}</view>
      <view class="margin16 goods-num">数量： x {{ info.qty }}</view>
      <view class="d-flex-center d-sb margin8">
        <view class="price">￥{{ noformatAmount(info.amount) }}</view>
        <view class="btn d-flex-center" @click="toCalendar">
          <img
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/user/rili.png"
            alt=""
            class="rili-img"
          />
          配送日历
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      // default: null,
      type: Object,
    },
    name: {
      type: String,
      default:
        "新希望（华西）屋顶盒铂金24小时鲜牛乳200ml新希望（华西）屋顶盒铂金24小时鲜牛乳200ml",
    },
  },
  methods: {
    // 查看日历
    toCalendar() {
      this.$emit("toCalendar");
    },
  },
};
</script>

<style scoped lang="scss">
.goods-out {
  min-height: 212rpx;
  width: 100%;
  padding: 24rpx 32rpx;
  background: #fff;

  border-radius: 24rpx 24rpx 24rpx 24rpx;
}
.goods-img {
  width: 136rpx;
  height: 136rpx;
  background: #f3f3f3;
  overflow: hidden;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  margin-right: 24rpx;
  border: 1rpx solid #f3f3f3;
  position: relative;
}
.goods-tag-status {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 80rpx;
  height: 28rpx;
  vertical-align: middle;
  background: #95e778;
  color: #fff;
  font-size: 18rpx;
  text-align: center;
  border-top-left-radius: 16rpx;
  border-bottom-right-radius: 16rpx;
}
.goods-info {
  flex: 1;
  background: #fff;
  .goods-name {
    line-height: 44rpx;
    font-weight: bold;
    color: #333333;
  }
  .goods-num {
    color: #666666;
  }
  .price {
    color: #f86c4d;
    font-weight: bold;
    font-size: 30rpx;
  }
  .btn {
    height: 60rpx;
    width: 172rpx;
    justify-content: center;
    border-radius: 76rpx 76rpx 76rpx 76rpx;
    border: 2rpx solid #1d9bdc;
    color: #1d9bdc;
    .rili-img {
      width: 32rpx;
      height: 32rpx;
      border: none;
      margin-right: 4rpx;
    }
  }
}
.margin16 {
  margin-top: 16rpx;
}
.margin8 {
  margin-top: 8rpx;
}

.DELIVERING {
  background: #95e778;
}
.WAIT_DELIVERY {
  background: #8bd0ff;
}
.FINISH,
.CANCELED {
  background: #c7c7c7;
}
</style>
