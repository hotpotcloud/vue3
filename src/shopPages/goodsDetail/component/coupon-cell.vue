<template>
  <view class="d-flex-center bar-out">
    <view class="pro-text-left bar-title">优惠券</view>
    <view class="d-flex-center d-sb" @click="showMore()">
      <view class="tag-box d-flex">
        <view
          class="tag-item d-flex d-flex-center"
          :class="
            item.received === RECEIVED_COUPON_STATUS.UNRECEIVED
              ? ''
              : 'tag-item-color'
          "
          v-for="(item, index) in list"
          :key="index"
        >
          <view
            v-if="item.couponType === couponDiscountType.REDUCE"
            class="tag-left"
            :class="
              item.received === RECEIVED_COUPON_STATUS.UNRECEIVED
                ? 'tag-left-default'
                : 'tag-left-color'
            "
          >
            <text class="tag-icon">￥</text>
            <text>{{ item.reduced | noformatAmount }}</text>
          </view>
          <view
            v-else
            class="tag-left"
            :class="
              item.received === RECEIVED_COUPON_STATUS.UNRECEIVED
                ? 'tag-left-default'
                : 'tag-left-color'
            "
          >
            <text>{{ item.reduced | noformatAmount }}</text>
            <text class="tag-icon">折</text>
          </view>
          <view
            class="tag-right"
            :class="
              item.received === RECEIVED_COUPON_STATUS.UNRECEIVED
                ? 'tag-right-default'
                : 'tag-right-color'
            "
            >无门槛</view
          >
        </view>
      </view>
      <view class="d-flex-nowarp">
        <image
          class="right-icon"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/ck_right.png"
          mode="scaleToFill"
        />
        <!-- <u-icon name="arrow-right" color="#999999" size="16"></u-icon> -->
      </view>
    </view>
  </view>
</template>
<script>
import {RECEIVED_COUPON_STATUS, couponDiscountType} from "../../../utils/enum";
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      RECEIVED_COUPON_STATUS,
      couponDiscountType,
    };
  },
  methods: {
    showMore() {
      this.$emit("handleOpen");
    },
  },
};
</script>
<style lang="scss" scoped>
.bar-out {
  margin-top: 24rpx;
  padding: 0 32rpx;
  background: #fff;
  padding-bottom: 8rpx;
  .bar-title {
    min-width: 114rpx;
    color: #333333;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
    font-weight: bold;
  }
}
.right-icon {
  width: 18rpx;
  height: 30rpx;
  margin-left: 16rpx;
}
.tag-box {
  width: 548rpx;
  overflow: hidden;
  .tag-item {
    //width: 176rpx;
    width: fit-content;
    height: 52rpx;
    line-height: 52rpx;
    color: #fff;
    font-weight: bold;
    margin-right: 8rpx;
  }
}
.tag-item-color {
  border: 2rpx solid rgba(248, 108, 77, 0.4);
  border-radius: 8rpx;
}
.tag-left {
  height: 52rpx;
  border-radius: 8rpx 0 0 8rpx;
  font-size: 28rpx;
  padding: 0 8rpx;
}
.tag-right {
  height: 52rpx;
  min-width: 100rpx;
  border-radius: 0 8rpx 8rpx 0;
  font-size: 24rpx;
  padding: 0 8rpx;
  color: #fff;
}
.tag-icon {
  font-size: 18rpx;
}
.tag-left-default {
  background: #f65632;
  color: #fff;
}
.tag-left-color {
  background: rgba(248, 108, 77, 0.15);
  color: #f86c4d;
}
.tag-right-default {
  background: #f86c4d;
  color: #fff;
}
.tag-right-color {
  color: #f86c4d;
}
</style>
