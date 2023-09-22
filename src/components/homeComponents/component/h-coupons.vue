<template>
  <view class="coupon-container" v-if="couponList.length">
    <view class="coupon-panl">
      <view class="coupon-top">
        <view class="coupon-left">
          <image
            class="coupon-icon"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/111.png"
          />
          <image
            class="coupon-text"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/lq%201%402x.png"
            mode="scaleToFill"
          />
        </view>
        <view class="coupon-right" @tap="goCollectCoupon">
          <image
            class="coupon-barcode"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/Group%201051%402x.png"
            mode="scaleToFill"
          />
          <uni-icons type="right" color="#fff" size="16" />
        </view>
      </view>
      <!-- 优惠券列表 -->
      <view class="coupon-box">
        <view v-if="couponsArr.length === 1" class="one-coupon d-flex-center">
          <view class="one-money">
            <view class="money">
              <text
                v-if="couponsArr[0].couponType === couponDiscountType.REDUCE"
              >
                {{ couponsArr[0].reduced | formatAmount }}
              </text>
              <text v-else>
                {{ couponsArr[0].reduced / 100 }}
                <text class="price-icon price-ch">折</text>
              </text>
            </view>
            <view class="full-money">
              <text v-if="couponsArr[0].condtionAmount !== 0"
                >满 {{ couponsArr[0].condtionAmount | formatAmount }}减</text
              >
              <text v-else>无门槛</text>
            </view>
          </view>
          <view class="one-btn">
            <button
              :loading="loading"
              class="get-coupon"
              v-if="
                couponsArr[0].memberDrawAmountLimit ===
                couponCollectLimit.UNLIMIT
              "
              @click="collectCoupon(couponsArr[0].activityCode)"
            >
              <text v-if="!loading">领取</text>
            </button>
          </view>
        </view>
        <view v-else>
          <uni-swiper-dot
            :info="couponList"
            :current="current"
            :mode="mode"
            :dotsStyles="dotStyle"
          >
            <swiper class="swiper-box" @change="change">
              <swiper-item v-for="(x, index) in couponList" :key="index">
                <view class="swiper-items">
                  <view class="swiper-item" v-for="(item, i) in x" :key="i">
                    <view>
                      <view>
                        <view
                          class="swiper-item-top"
                          v-if="item.couponType === couponDiscountType.REDUCE"
                        >
                          <text class="price-icon">￥</text>
                          <text class="price-No">{{ item.reduced / 100 }}</text>
                        </view>
                        <view class="swiper-item-top" v-else>
                          <text class="price-No">{{ item.reduced / 100 }}</text>
                          <text class="price-icon price-ch">折</text>
                        </view>
                      </view>
                      <view
                        class="swiper-item-txt"
                        v-if="item.condtionAmount !== 0"
                        >满{{ item.condtionAmount | formatAmount }}可用</view
                      >
                      <view class="swiper-item-txt" v-else>无门槛</view>
                    </view>
                    <!-- 门店券 -->
                    <view
                      v-if="
                        item.couponCategoryEnum ===
                        COUPON_CATEGORY_ENUM.SHOP_STORE
                      "
                    >
                      <view
                        v-if="
                          item.memberDrawAmountLimit ===
                          couponCollectLimit.UNLIMIT
                        "
                        class="swiper-item-btn"
                        @click="collectCoupon(item.activityCode)"
                      >
                        领取
                      </view>
                      <view
                        v-else
                        class="swiper-item-btn-active"
                        @click="useCoupon(item)"
                      >
                        去使用
                      </view>
                    </view>
                    <view v-else
                      ><view
                        v-if="
                          item.memberDrawAmountLimit ===
                          couponCollectLimit.UNLIMIT
                        "
                        class="swiper-item-btn"
                        @click="collectCoupon(item.activityCode)"
                      >
                        领取</view
                      ><view
                        v-else
                        class="swiper-item-btn-active"
                        @click="useCoupon(item)"
                        >去使用
                      </view></view
                    >
                  </view>
                </view>
              </swiper-item>
            </swiper>
          </uni-swiper-dot>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import {couponDiscountType, couponCollectLimit} from "@/utils/enum";
import {coupons} from "@/utils/url";
import {handleUse} from "@/utils/commonMethod";
import {mapActions, mapState} from "vuex";

export default {
  props: {
    val: {
      type: Array,
      default: [],
    },
    // 是否是用通过外部链接跳转领券
    acquireType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      couponDiscountType,
      couponCollectLimit,
      current: 0,
      mode: "round",
      dotStyle: {
        backgroundColor: "#fff",
        border: "2rpx  solid #fff",
        color: "#fff",
        selectedBackgroundColor: "#fff",
        selectedBorder: "#fff",
        bottom: 0,
      },
      couponList: [],
      loading: false,
    };
  },
  // created() {
  //   this.updateList(this.val);
  // },
  mounted() {
    this.updateList(this.val);
  },
  computed: {
    ...mapState("home", ["couponsArr"]),
  },
  methods: {
    ...mapActions("home", ["X_getCoupons"]),
    //把一维数组转换为二维数组---  入参 num:需要转换成几维数组，arr:需要转化的数组
    // 出参 转换后的数组
    arrChange(arr) {
      const newArr = [];
      while (arr.length > 0) {
        newArr.push(arr.splice(0, 2));
      }
      console.log("newArr----------------二维优惠信息", newArr);
      return newArr;
    },
    // 获取实时优惠券列表
    async updateList(val) {
      await this.X_getCoupons(val);
      this.$nextTick(() => {
        // this.X_getCoupons(val).then((res) => {
        // console.log("res13", res);
        console.log("this.couponsArr->23", this.couponsArr);
        if (this.couponsArr.length <= 1) {
          this.couponList = this.couponsArr;
        } else {
          this.couponList = this.arrChange(this.couponsArr);
        }
        console.log(
          "this.couponList--优惠券1",
          this.couponList,
          "2111---",
          this.couponsArr
        );
        // });
      });
    },
    change(e) {
      this.current = e.detail.current;
    },
    goCollectCoupon() {
      uni.navigateTo({
        url: "/subPages/coupons/collectCoupons",
      });
    },
    async collectCoupon(code) {
      try {
        if (this.loading) return;
        this.loading = true;
        const para = {
          acquireType: this.acquireType,
          code: code,
        };
        const {msg} = await this.POST(coupons.getCoupon, para);
        uni.showToast({
          title: "领券成功",
          icon: "success",
          duration: 1500,
        });
        await this.X_getCoupons(this.val);
        setTimeout(() => {
          this.updateList(this.val);
        }, 500);
        // this.updateList(this.val);
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    useCoupon(coupon) {
      handleUse(coupon);
    },
  },
};
</script>
<style lang="scss" scoped>
.coupon-container {
  padding: 0 32rpx;
  // margin-bottom:24rpx;
  //width: 100%;
  .coupon-panl {
    width: 100%;
    min-height: 248rpx;
    background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E4%BC%98%E6%83%A0%E5%88%B8%E9%A6%96%E9%A1%B5%E8%83%8C%E6%99%AF.png")
      no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 24rpx;
  }
}
.coupon-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 32rpx;
  .coupon-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 16rpx;
    // padding-left: 32rpx;
    .coupon-icon {
      border: none;
      width: 40rpx;
      height: 40rpx;
    }
    .coupon-text {
      border: none;
      width: 162rpx;
      height: 60rpx;
    }
  }
  .coupon-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .coupon-barcode {
    border: none;
    width: 112rpx;
    height: 36rpx;
    margin-right: 32rpx;
  }
}
.coupon-box {
  margin-top: 28rpx;
}
.one-coupon {
  margin: 0 auto;
  width: 524rpx;
  height: 124rpx;
  // background: #fff;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E8%83%8C%E6%99%AF%403x.png");
  background-size: 100% 100%;
  padding-left: 74rpx;
  .one-money {
    padding: 28rpx 22rpx 28rpx 34rpx;
    width: 222rpx;
    text-align: center;
    // background: #f0f;
    .money {
      color: #f86c4d;
      font-weight: bold;
      font-size: 34rpx;
    }
    .full-money {
      color: #333333;
      font-size: 18rpx;
    }
  }
  .one-btn {
    width: 228rpx;
    height: 100%;
    padding: 30rpx 40rpx 30rpx 60rpx;
    // background: #fff;
    .get-coupon {
      width: 128rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      background: #fec85c;
      color: #fff;
      font-weight: bold;
      font-size: 32rpx;
      border-radius: 44rpx;
    }
  }
}
.swiper-box {
  height: 130rpx;
  padding: 0 32rpx;
}
.swiper-items {
  // height: 104rpx;
  display: flex;
  justify-content: flex-start;
  //justify-content: space-around;
  // justify-content: space-between;
}
.swiper-item {
  width: 296rpx;
  height: 104rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/couponRed.png")
    no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24rpx;
  padding-right: 16rpx;
  margin-right: 16rpx;
}
.swiper-item-btn {
  font-size: 22rpx;
  color: #fff;
  text-align: center;
  width: 76rpx;
  height: 34rpx;
  line-height: 34rpx;
  background: #f86c4d;
  border-radius: 24rpx;
}
.swiper-item-btn-active {
  font-size: 22rpx;
  color: #f86c4d;
  border: 1rpx solid #f86c4d;
  text-align: center;
  width: 76rpx;
  height: 34rpx;
  line-height: 34rpx;
  border-radius: 24rpx;
}
.swiper-item-top {
  font-size: 34rpx;
  color: #f86c4d;
  text-align: center;
  font-weight: bold;
}
.swiper-item-txt {
  display: inline-block;
  width: 140rpx;
  font-size: 20rpx;
  color: #333;
  text-align: center;
}
</style>
