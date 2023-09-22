<template>
  <view>
    <u-popup
      :show="couponPop"
      :round="20"
      zIndex="10079"
      mode="bottom"
      @close="closePop()"
      overlayOpacity="0.45"
      :safeAreaInsetTop="false"
    >
      <view class="coupon-container">
        <view class="d-flex d-sb d-flex-center">
          <view></view>
          <view class="pop-tittle">优惠信息</view>
          <uni-icons
            type="closeempty"
            size="20"
            color="#999999"
            @click="closePop()"
          ></uni-icons>
        </view>

        <!-- v-if="current === couponType.COLLECT" -->
        <view class="coupon-box">
          <view class="coupon-box-item" v-for="coupon in list" :key="coupon.id">
            <h-couponCollect
              :coupon="coupon"
              @handleCollect="handleCollect()"
              @handleUse="handleUse()"
              :canChoose="false"
            ></h-couponCollect>
          </view>
        </view>
        <!-- <h-couponUse v-else :coupon="coupon"></h-couponUse> -->
      </view>
    </u-popup>
    <view class="btn-bar" v-if="couponPop">
      <view class="back-btn" @click="closePop()">返回</view>
    </view>
  </view>
</template>
<script>
import {
  ACQUIRE_TYPE_ENUM,
  COUPON_CHANNEL_TYPE,
  COUPON_CATEGORY_ENUM,
  goodsType,
} from "../../utils/enum";
import {coupons} from "./../../utils/url";
import api from "@/utils/api";
import {isLogin} from "@/utils/commonMethod";
export default {
  props: {
    couponPop: {
      type: Boolean,
      default: null,
    },
    list: {
      type: Array,
      default: [],
    },
    from: {
      type: Number,
      default: "",
    },
    shopConfigId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      COUPON_CHANNEL_TYPE,
      COUPON_CATEGORY_ENUM,
      goodsType,
    };
  },

  methods: {
    closePop() {
      this.$emit("closeCouponPop");
    },
    async handleCollect(code) {
      if (isLogin()) {
        try {
          const para = {
            acquireType: this.from,
            channel: COUPON_CHANNEL_TYPE.XHG,
            code,
          };
          await api.$post(coupons.getCoupon, para);
          uni.showToast({
            title: "领券成功",
            icon: "success",
            duration: 1500,
          });
          this.$emit("refreshList");
        } catch (error) {}
      }
    },
    handleUse(coupon) {
      if (coupon.couponCategoryEnum === COUPON_CATEGORY_ENUM.SHOP_STORE) {
        this.closePop();
      } else {
        if (coupon.isPartProduct === goodsType.ALL) {
          uni.switchTab({
            url: "/pages/product/product",
          });
        } else {
          uni.navigateTo({
            url: "/subPages/coupons/couponGoods?code=" + coupon.activityCode,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.coupon-container {
  height: 1120rpx;
  padding: 48rpx 32rpx;
  position: relative;
  .pop-tittle {
    font-size: 34rpx;
    font-weight: bold;
    color: #000000;
  }
}
.btn-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20000;
  width: 100%;
  height: 176rpx;
  background: #ffffff;
  border-top: 2rpx solid #f1f1f1;
  padding-top: 12rpx;
}
.back-btn {
  width: 672rpx;
  height: 84rpx;
  background: #ffffff;
  border-radius: 254rpx;
  border: 1rpx solid #c7c7c7;
  font-size: 32rpx;
  font-weight: bold;
  color: #666666;
  text-align: center;
  line-height: 84rpx;
  margin: 0 auto;
}
.coupon-box {
  height: 872rpx;
  overflow-y: scroll;
  margin-top: 48rpx;
  margin-bottom: 96rpx;
}
.coupon-box-item:last-child {
  padding-bottom: 24rpx;
}
</style>
