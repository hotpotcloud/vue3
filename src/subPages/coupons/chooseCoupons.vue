<template>
  <view>
    <view class="no-data-box" v-if="couponList.length === 0">
      <view class="no-data">
        <image :src="cover" />
      </view>
      <text class="no-text">当前暂时没有优惠券～</text>
    </view>
    <view v-else>
      <!-- <view class="coupon-container">
        <view
          class="coupon-layer"
          v-for="(coupon, index) in couponList"
          :key="index"
        >
          <view
            class="coupon-classfy"
            v-if="coupon.couponType === couponDiscountType.DISCOUNT"
          >
            <text class="coupon-No">{{ coupon.reduced / 100 }}</text>
            <text class="coupon-words">折</text>
          </view>
          <view class="coupon-classfy" v-else>
            <text class="coupon-No">{{ coupon.reduced | formatAmount }}</text>
          </view>
          <view class="coupon-right">
            <view class="coupon-detail">
              <view class="coupon-detail-title">{{ coupon.couponName }}</view>
              <view class="coupon-detail-date"
                >有效期：{{ coupon.effectiveTime }} -
                {{ coupon.deadTime }}</view
              >
              <view>
                <view
                  class="coupon-detail-text"
                  v-if="coupon.couponType === 2 && coupon.conditionAmount > 0"
                >
                  满 {{ coupon.conditionAmount / 100 }} 打
                  {{ coupon.reduced / 100 }} 折
                </view>
                <view
                  class="coupon-detail-text"
                  v-else-if="
                    coupon.couponType === 1 && coupon.conditionAmount > 0
                  "
                >
                  满{{ coupon.conditionAmount / 100 }}减{{
                    coupon.reduced / 100
                  }}
                </view>
                <view v-else class="coupon-detail-text">无门槛</view>
              </view>
              <view class="coupon-detail-text">
                {{
                  coupon.allProducts === goodsType.ALL
                    ? "全部商品可用"
                    : "部分商品可用"
                }}
              </view>
              <view
                class="coupon-detail-unaviable"
                v-show="coupon.couponCheck !== couponCheckStatus.AVAILABLE"
                >不可用原因：{{ coupon.couponCheckName }}</view
              >
            </view>
          </view>
          <view
            class="coupon-btn-collected"
            @click="chooseIt(coupon)"
            v-if="coupon.couponCheck === couponCheckStatus.AVAILABLE"
          >
            <view class="coupon-chosed" v-if="coupon.checked">
              <u-icon
                name="checkmark-circle-fill"
                color="#1D9BDC"
                size="32"
              ></u-icon>
            </view>
            <view v-else class="coupon-will-choose"></view>
          </view>
          <view class="coupon-btn-collected" v-else>不可用</view>
        </view>
      </view>-->
      <view class="coupon-list">
        <h-couponCollect
          v-for="coupon in couponList"
          :key="coupon.id"
          :coupon="coupon"
          :canChoose="canChoose"
          @selectCoupon="chooseIt"
        ></h-couponCollect
      ></view>
      <view class="coupon-notice">系统已为您选为最佳优惠方案</view>
      <view class="btn-bar">
        <button @click="confirm">确定</button>
      </view>
    </view>
  </view>
</template>
<script>
import {
  couponDiscountType,
  goodsType,
  couponCheckStatusText,
  couponCheckStatus,
  conditionType,
  RECEIVED_COUPON_STATUS,
  COUPON_CATEGORY_ENUM,
} from "@/utils/enum";
import { coupons } from "@/utils/url";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      canChoose: true,
      optionsData: {},
      couponDiscountType,
      goodsType,
      couponCheckStatusText,
      couponCheckStatus,
      conditionType,
      couponList: [],
      couponCode: null,
      isCoupon: true,
      flag: false,
      isShop: false,
      cover:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E6%97%A0%E7%A5%A8%E5%88%B8%402x.png",
    };
  },
  onLoad(option) {
    console.log(option, "optionoptionoptionoption------->");
    if (option.type === "shop") {
      this.optionsData = option;
      this.isShop = true;
      this.couponCode = option.couponCode;
      this.getShopCouponList();
    } else {
      this.getList(
        option.goodsCode,
        option.amount,
        option.marketingCode,
        option.couponCode,
        option.activitySecKillId
      );
    }
  },
  computed: {
    ...mapState("order", ["orderPar"]),
  },
  methods: {
    ...mapMutations("order", [
      "V_setShowChange",
      "V_setorderPar",
      "v_setShopCoupon",
    ]),
    // ...mapMutations("order", ["v_setShopCoupon"]),
    ...mapActions("order", ["X_getOrderPlanData"]),
    async getList(code, amount, marketingCode, couponCode, activitySecKillId) {
      try {
        //刷新当前页的问题
        if (!code) {
          return;
        }
        const para = {
          defaultCouponCodeFlag: this.orderPar.defaultCouponCodeFlag,
          goodsCode: code,
          marketingCode: marketingCode ? marketingCode : null,
          payAmount: amount,
          couponCode: couponCode === "null" ? null : couponCode,
          activitySecKillId:
            activitySecKillId === "null" ? null : activitySecKillId,
        };
        console.log(para, "canshu");
        const { data } = await this.POST(coupons.selectCouponList, para);
        const newData = data.map((item) => {
          item.condtionAmount = item.conditionAmount;
          item.received = RECEIVED_COUPON_STATUS.RECEIVED;
          item.isPartProduct = item.allProducts;
          return item;
        });
        this.couponList = newData;
      } catch (err) {
        console.log(err);
      }
    },
    chooseIt(item) {
      // item.checked = !item.checked;
      if (this.isShop) {
        item.checked = !item.checked;
        // 可取消勾选
        this.couponCode = "";
        for (let i in this.couponList) {
          if (this.couponList[i].couponCode === item.couponCode) {
            this.couponList[i].checked = item.checked;
          } else {
            this.couponList[i].checked = false;
          }
          if (this.couponList[i].checked) {
            this.couponCode = item.couponCode;
          }
        }
        console.log(this.couponCode, "选中的券");
      } else {
        console.log("item-123", item);
        this.isCoupon = !item.checked;

        for (let i in this.couponList) {
          if (this.couponList[i].couponCode === item.couponCode) {
            this.couponList[i].checked = !item.checked;
            // this.couponCode = item.couponCode;
          } else {
            this.couponList[i].checked = false;
            // this.couponCode = "NOT_COUPON";
          }
        }
        this.couponCode = item.couponCode;
        //取消优惠选择
        this.V_setorderPar({
          defaultCouponCodeFlag: !item.checked,
          couponCode: item.couponCode,
        });
        // if (item.checked) {
        //   console.log("item", item);
        //   this.couponCode = item.couponCode;
        //   for (let i in this.couponList) {
        //     if (this.couponList[i].couponCode === item.couponCode) {
        //       this.couponList[i].checked = !item.checked;
        //     } else {
        //       this.couponList[i].checked = false;
        //     }
        //   }
        //   console.log(this.couponCode, "选中的券");
        // } else {
        //   this.couponCode = "NOT_COUPON";
        // }
        // if (item.checked) {
        //   this.couponCode = item.couponCode;
        // } else {
        //   this.couponCode = "NOT_COUPON";
        // }

        console.log(this.couponCode, "选中的券");
      }
    },
    async getShopCouponList() {
      try {
        const para = {
          shopConfigId: this.optionsData.shopConfigId,
          spuCodes: this.optionsData.spuCodes.split(","),
        };
        const { data } = await this.POST(coupons.shopListCanUseCoupons, para);
        this.couponList = data.map((item) => {
          item.received = RECEIVED_COUPON_STATUS.RECEIVED;
          item.couponCategoryEnum = COUPON_CATEGORY_ENUM.SHOP_STORE;
          item.condtionAmount = item.conditionAmount;
          item.activityName = item.couponName;
          if (item.couponCode === this.optionsData.couponCode) {
            item.checked = true;
          } else {
            item.checked = false;
          }
          return item;
        });
        // console.log(this.couponList, "this.couponList");
      } catch (err) {
        console.log(err);
      }
    },
    async confirm() {
      this.$store.commit("coupon/setCoupon", this.couponCode);
      this.v_setShopCoupon([this.couponCode]);
      if (this.isShop) {
        let pageList = getCurrentPages(); //跳转页面成功之后
        const lastPage = pageList[pageList.length - 2];
        const param = {
          shopConfigId: this.optionsData.shopConfigId,
          isShopCar: lastPage.data.isShopCar,
          isChange: false,
          spuCode: lastPage.data.spuCode,
        };
        uni.navigateBack({
          shopConfigId: this.optionsData.shopConfigId,
          success: () => {
            let page = getCurrentPages().pop(); //跳转页面成功之后
            if (!page) {
              return;
            } else {
              uni.setStorageSync("placeOrderOptions", JSON.stringify(param));
              page.onLoad(param);
            }
          },
        });
      } else {
        try {
          //取消优惠选择
          const obj = this.couponList.find((item) => {
            return item.checked === true;
          });
          console.log("obj", this.couponList, obj);
          this.V_setorderPar({
            couponCode: obj?.couponCode,
          });
          await this.X_getOrderPlanData();
          uni.navigateBack({
            delta: 1,
          });
        } catch (error) {}
      }
    },
  },
};
</script>
<style scoped lang="scss">
.no-data-box {
  text-align: center;
  margin-top: 290rpx;
  .no-data {
    width: 312rpx;
    height: 368rpx;
    margin: 0 auto;
    margin-bottom: 44rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .no-text {
    font-weight: 400;
    color: #a9a9a9;
    // font-size:26rpx;
  }
}
.coupon-container {
  padding: 32rpx;
  overflow-y: auto;
  padding-bottom: 292rpx;
}
.coupon-layer {
  width: 100%;
  height: 204rpx;
  margin-bottom: 32rpx;
  padding: 0 32rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/coupon.png")
    no-repeat;
  background-position: 100%;
  background-size: contain;
  position: relative;
}

.coupon-classfy {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  .coupon-No {
    font-weight: bold;
    color: #f86c4d;
    font-size: 40rpx;
  }
  .coupon-words {
    font-weight: bold;
    color: #f86c4d;
    font-size: 40rpx;
  }
}
.coupon-right {
  padding-left: 32rpx;
  position: absolute;
  left: 196rpx;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 16rpx;
  .coupon-detail {
    .coupon-detail-text {
      font-size: 18rpx;
      color: #666;
    }
    .coupon-detail-date {
      font-size: 18rpx;
      color: #999;
    }
    .coupon-detail-unaviable {
      color: #f86c4d;
      font-size: 18rpx;
      padding-top: 16rpx;
    }
    .coupon-detail-title {
      font-weight: bold;
      color: #000;
    }
  }
}
.coupon-btn-collected {
  color: #f86c4d;
  position: absolute;
  top: 50%;
  right: 32rpx;
  transform: translateY(-50%);
}

.coupon-chosed {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  image {
    width: 100%;
    height: 100%;
  }
}
.coupon-will-choose {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #e9e9e9;
}
.btn-bar {
  background: #ffffff;
  height: 228rpx;
  position: fixed;
  bottom: 0;
  padding: 0 40rpx;
  padding-top: 32rpx;
  width: 100%;

  button {
    width: 100%;
    height: 104rpx;
    background: #1d9bdc;
    line-height: 104rpx;
    color: #ffffff;
    border-radius: 254rpx;
    font-size: 34rpx;
    font-weight: bold;
  }
  button::after {
    border: none;
  }
}
.coupon-notice {
  width: 100%;
  height: 64rpx;
  background: #6cc3ff;
  color: #ffffff;
  line-height: 64rpx;
  text-align: center;
  position: fixed;
  bottom: 228rpx;
  // bottom: calc(228rpx + constant(safe-area-inset-bottom));
  // bottom: calc(228rpx + env(safe-area-inset-bottom));
}
.coupon-list {
  padding: 24rpx 32rpx 300rpx;
}
</style>
