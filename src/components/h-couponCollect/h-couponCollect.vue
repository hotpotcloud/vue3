<template>
  <view class="coupon-layer">
    <view class="coupon-bar d-flex" @tap="selectCoupon">
      <view class="bar-left">
        <view
          class="shop-tag"
          v-if="coupon.couponCategoryEnum === COUPON_CATEGORY_ENUM.SHOP_STORE"
          >门店券</view
        >
        <view
          class="bar-left-content"
          v-if="coupon.couponType === couponDiscountType.REDUCE"
        >
          <text class="bar-icon">￥</text>
          <text class="bar-no">{{ coupon.reduced | noformatAmount }}</text>
        </view>
        <view class="bar-left-content" v-else>
          <text class="bar-no">{{ coupon.reduced / 100 }}</text>
          <text class="bar-icon">折</text>
        </view>
        <view>
          <text v-if="coupon.condtionAmount > 0">
            满<text class="bar-desc">{{ coupon.condtionAmount / 100 }}</text
            >元可用
          </text>
          <text v-else>无门槛</text>
        </view>
      </view>
      <view class="bar-middle">
        <view class="bar-title">{{
          coupon.activityName || coupon.couponName
        }}</view>
        <view class="bar-condition">
          {{
            coupon.isPartProduct === goodsType.ALL
              ? "全部商品可用"
              : "部分商品可用"
          }}
        </view>
        <!-- <view
          class="bar-time"
          v-if="coupon.couponCategoryEnum !== COUPON_CATEGORY_ENUM.SHOP_STORE"
        >
          <view
            class="bar-time"
            v-if="coupon.received === RECEIVED_COUPON_STATUS.RECEIVED"
            >{{
              `${coupon.effectiveTime || ""}-${coupon.deadTime || ""}`
            }}</view
          >
          <text v-if="coupon.valid === validType.FIXED">{{
            `${coupon.effectiveTime || ""}-${coupon.deadTime || ""}`
          }}</text>
          <text v-else>
            领取后
            <text class="bar-days">{{ coupon.validDays || "" }}</text
            >天内有效
          </text>
        </view> -->
        <view>
          <view
            class="bar-time"
            v-if="coupon.received === RECEIVED_COUPON_STATUS.RECEIVED"
            >{{
              `${coupon.effectiveTime || ""}-${coupon.deadTime || ""}`
            }}</view
          >
          <view class="bar-time" v-else>
            <text v-if="coupon.valid === validType.FIXED">{{
              `${coupon.effectiveTime || ""}-${coupon.deadTime || ""}`
            }}</text>
            <text v-else>
              领取后
              <text class="bar-days">{{ coupon.validDays || "" }}</text
              >天内有效
            </text>
          </view>
        </view>
      </view>
      <view class="bar-right" v-if="canChoose">
        <uni-icons
          type="checkbox-filled"
          color="#1D9BDC"
          size="48rpx"
          v-if="coupon.checked"
        ></uni-icons>
        <view class="circle" v-else></view>
        <!-- <uni-icons
          type="circle"
          color="#A9A9A9"
          size="48rpx"
          @tap="selectCoupon"
        ></uni-icons> -->
      </view>
      <view class="bar-right" v-else>
        <!-- 判断是否领取  -->
        <image
          v-if="
            coupon.received === RECEIVED_COUPON_STATUS.RECEIVED &&
            isMyCoupon !== true
          "
          class="collected"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/coupon_Received.png"
          mode="scaleToFill"
        />
        <view
          v-if="
            coupon.couponCategoryEnum === COUPON_CATEGORY_ENUM.SHOP_STORE ||
            isCenter === false
          "
        >
          <view
            v-if="coupon.received === RECEIVED_COUPON_STATUS.RECEIVED"
            class="bar-btn bar-btn-use"
            @click="useCoupon()"
            >去使用</view
          ><view
            v-else
            class="bar-btn bar-btn-get"
            @click="collectCoupon(coupon.activityCode)"
            >领取</view
          >
        </view>
        <view v-else>
          <!-- // 是否到达上线 -->
          <view
            v-if="
              coupon.memberDrawAmountLimit === couponCollectLimit.LIMITED ||
              coupon.totalAmountLimit === couponCollectLimit.LIMITED
            "
            class="bar-btn bar-btn-use"
            @click="useCoupon()"
            >去使用</view
          ><view
            v-else
            class="bar-btn bar-btn-get"
            @click="collectCoupon(coupon.activityCode)"
            >领取</view
          >
        </view>
        <!-- <view
          v-if="coupon.couponCategoryEnum !== COUPON_CATEGORY_ENUM.SHOP_STORE"
          class="bar-btn bar-btn-get"
          @click="collectCoupon(coupon.activityCode)"
          >领取</view
        > -->
      </view>
    </view>
  </view>
</template>
<script>
import {
  couponDiscountType,
  goodsType,
  conditionType,
  couponCollectLimit,
  validType,
  COUPON_CATEGORY_ENUM,
  RECEIVED_COUPON_STATUS,
} from "@/utils/enum";
import { isLogin } from "@/utils/commonMethod";
export default {
  props: {
    coupon: {
      type: Object,
      default: null,
    },
    acquireType: {
      type: Number,
      default: 1,
    },
    getListCollect: {
      type: Function,
      defaultL: null,
    },
    canChoose: {
      type: Boolean,
      default: null,
    },
    isShop: {
      type: Boolean,
      default: false,
    },
    // 是否 领券中心
    isCenter: {
      type: Boolean,
      default: false,
    },
    // 是不是我的券包
    isMyCoupon: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      couponDiscountType,
      goodsType,
      conditionType,
      couponCollectLimit,
      validType,
      COUPON_CATEGORY_ENUM,
      RECEIVED_COUPON_STATUS,
    };
  },
  onLoad() {
    // console.log(this.coupon, '))00')
  },
  methods: {
    // 去使用
    useCoupon(coupon) {
      this.$emit("handleUse", this.coupon);
    },
    // 领取
    collectCoupon(code) {
      if (isLogin()) {
        this.$emit("handleCollect", code);
      }
    },
    selectCoupon(e) {
      if (this.canChoose) {
        this.$emit("selectCoupon", this.coupon);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.coupon-layer {
  margin-bottom: 24rpx;
}
.coupon-bar {
  width: 100%;
  height: 160rpx;
  border: 2rpx solid rgba(248, 108, 77, 0.2);
  border-radius: 16rpx;
  //background: #fff9f8;
  background: #fff;
  position: relative;
  padding-right: 32rpx;
  .shop-tag {
    width: fit-content;
    height: 32rpx;
    line-height: 32rpx;
    background: #f86c4d;
    border-radius: 16rpx 0 16rpx 0;
    padding: 0rpx 8rpx;
    font-size: 18rpx;
    font-weight: bold;
    color: #ffffff;
    position: absolute;
    top: -2rpx;
    left: -2rpx;
  }
  .bar-left {
    width: 176rpx;
    height: 160rpx;
    background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/coupon_bg.png")
      no-repeat;
    background-position: 100%;
    background-size: cover;
    border-radius: 16rpx 0 0 16rpx;
    color: #f86c4d;
    font-size: 24rpx;
    padding: 36rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bar-desc {
      font-weight: bold;
    }
    .bar-left-content {
      font-weight: bold;
      .bar-icon {
        font-size: 26rpx;
      }
      .bar-no {
        font-size: 40rpx;
      }
    }
  }
  .bar-middle {
    width: 322rpx;
    margin: 0rpx 24rpx;
    padding: 24rpx 0;

    .bar-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
      line-height: 28rpx;
    }
    .bar-condition {
      padding: 12rpx 0;
      line-height: 23rpx;
    }
    .bar-condition,
    .bar-time {
      font-size: 24rpx;
      color: #a9a9a9;
      line-height: 28rpx;
      .bar-days {
        font-weight: bold;
        color: #f86c4d;
      }
    }
  }
  .bar-right {
    width: calc(100% - 530rpx);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .bar-btn {
      border-radius: 22rpx;
      font-size: 24rpx;
      font-weight: bold;
      text-align: center;
      z-index: 10;
    }
    .bar-btn-get {
      width: 112rpx;
      height: 44rpx;
      background: #f86c4d;
      color: #ffffff;
      line-height: 44rpx;
    }
    .bar-btn-use {
      width: 110rpx;
      height: 42rpx;
      background: #ffffff;
      color: #f86c4d;
      border: 2rpx solid #f86c4d;
      line-height: 40rpx;
      position: relative;
      z-index: 1;
      .arrow-icon {
        width: 8rpx;
        height: 16rpx;
        //background: url(https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/arrow.png)
        //no-repeat 100% cover;
      }
    }
  }
}
.collected {
  width: 78rpx;
  height: 70rpx;
  position: absolute;
  top: 0rpx;
  right: 0rpx;
  z-index: 1;
}
.circle {
  width: 36rpx;
  height: 36rpx;
  border: 1rpx solid #a9a9a9;
  border-radius: 36rpx;
}
</style>
