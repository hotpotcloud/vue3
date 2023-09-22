<template>
  <!-- 优惠券 -->
  <view class="shop-coupon">
    <!-- 更多 -->
    <image
      v-if="list.length > 5"
      class="shop-more"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/shop_more.png"
      mode="scaleToFill"
      @click="showMore()"
    />
    <view
      class="discount"
      :class="list.length > 5 ? 'discount-more' : 'discount-5'"
    >
      <view v-for="item in list" :key="item.activityCode">
        <!-- 未领取 -->
        <view
          class="discount-item discount-item-money"
          v-if="item.received === RECEIVED_COUPON_STATUS.UNRECEIVED"
        >
          <!-- 满减 -->
          <view
            class="left"
            v-if="item.couponType === couponDiscountType.REDUCE"
            @click="showMore()"
          >
            <view class="discount-icon">¥</view>
            <view class="discount-no">{{ item.reduced / 100 }}</view>
          </view>
          <!-- 满折 -->
          <view class="left" @click="showMore()" v-else>
            <view class="discount-no">{{ item.reduced }}</view>
            <view class="discount-icon">折</view>
          </view>
          <view class="right">
            <view class="desc-text" @click="showMore()">{{
              item.condtionAmount > 0 ? item.condtionAmount / 100 : "无门槛"
            }}</view>
            <image
              class="pic-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/coupon_checked.png"
              mode="scaleToFill"
            />
            <view class="action-text" @click="collectCoupon(item.activityCode)"
              >领</view
            >
          </view>
        </view>
        <!-- 已领取 -->
        <view class="discount-item discount-item-money-active" v-else>
          <view
            class="left"
            v-if="item.couponType === couponDiscountType.REDUCE"
            @click="showMore()"
          >
            <view class="discount-icon">¥</view>
            <view class="discount-no">{{ item.reduced / 100 }}</view>
          </view>
          <view class="left" v-else @click="showMore()">
            <view class="discount-no">{{ item.reduced }}</view>
            <view class="discount-icon">折</view>
          </view>
          <view class="right">
            <view class="desc-text" @click="showMore()">{{
              item.condtionAmount > 0 ? item.condtionAmount / 100 : "无门槛"
            }}</view>
            <image
              class="pic-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/coupon_Unchecked.png"
              mode="scaleToFill"
            />
            <view class="action-text" @click="goUse(item)">去使用</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import {couponDiscountType, RECEIVED_COUPON_STATUS} from "@/utils/enum";
import {isLogin} from "@/utils/commonMethod";

export default {
  props: {
    list: {
      type: Array,
      default: [1, 2, 3, 4, 5],
    },
  },
  data() {
    return {
      couponDiscountType, //优惠券满减满折类型
      RECEIVED_COUPON_STATUS,
    };
  },
  methods: {
    showMore() {
      this.$emit("showMoreModal");
    },
    collectCoupon(code) {
      if (isLogin()) {
        this.$emit("handleCollect", code);
      }
    },
    goUse(code) {
      this.$emit("handleUse", code);
    },
  },
};
</script>
<style lang="scss" scoped>
.shop-coupon {
  position: relative;
  .shop-more {
    width: 92rpx;
    height: 52rpx;
    position: absolute;
    top: 16rpx;
    right: 0;
    z-index: 100;
    border-radius: 0;
  }
}
.discount-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 52rpx;
  width: fit-content;
  height: 52rpx;
  margin-bottom: 10rpx;
  margin-right: 8rpx;
  font-weight: bold;
  color: #ffffff;
}
.discount-no {
  font-size: 28rpx;
  padding-right: 2rpx;
}
.discount-icon {
  font-size: 18rpx;
}
.pic-icon {
  border-radius: 0;
  width: 26rpx;
  height: 52rpx;
}
.discount {
  display: flex;
  overflow-x: scroll;
  width: 100%;
  padding-left: 32rpx;
  padding-top: 16rpx;
  padding-right: 92rpx;
  //position: relative;
}
.discount-5 {
  padding-right: 32rpx;
  //position: relative;
}
.discount-more {
  padding-right: 92rpx;
  //position: relative;
}
.discount-item-money {
  font-weight: bold;
  color: #ffffff;
  .left {
    padding: 0rpx 8rpx;
    background: #f65632;
    border-radius: 8rpx 0rpx 0rpx 8rpx;
    height: 52rpx;
    display: flex;
    align-items: baseline;
  }
  .right {
    font-size: 24rpx;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    border-radius: 0rpx 8rpx 8rpx 0rpx;
    height: 52rpx;
    .desc-text {
      width: fit-content;
      white-space: nowrap;
      padding-left: 8rpx;
      background: #f86c4d;
      height: 52rpx;
    }
    .action-text {
      background: #f86c4d;
      width: fit-content;
      padding: 0 16rpx 0 8rpx;
      height: 52rpx;
      border-radius: 0rpx 8rpx 8rpx 0rpx;
    }
  }
}
.discount-item-money-active {
  .left {
    border: 2rpx solid rgba(248, 108, 77, 0.4);
    border-right: none;
    display: flex;
    align-items: baseline;
    line-height: 50rpx;
    height: 52rpx;
    background: rgba(248, 108, 77, 0.15);
    border-radius: 8rpx 0 0 8rpx;
    padding: 0 8rpx;
    font-weight: bold;
    color: #f86c4d;
  }
  .right {
    font-size: 24rpx;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 0rpx 8rpx 8rpx 0rpx;
    background: #f5f5f5;
    color: #f86c4d;
    .desc-text {
      width: fit-content;
      white-space: nowrap;
      padding-left: 8rpx;
      border: 2rpx solid rgba(248, 108, 77, 0.4);
      border-right: none;
      border-left: none;
      line-height: 48rpx;
      height: 52rpx;
    }
    .action-text {
      width: 90rpx;
      padding-right: 16rpx;
      border-radius: 0rpx 8rpx 8rpx 0rpx;
      border: 2rpx solid rgba(248, 108, 77, 0.4);
      border-left: none;
      line-height: 48rpx;
      height: 52rpx;
    }
    .pic-icon {
      border-radius: 0;
      width: 26rpx;
      height: 52rpx;
    }
  }
}
</style>
