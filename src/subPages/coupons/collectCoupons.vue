<template>
  <view class="container">
    <view>
      <view v-if="couponList.length > 0">
        <view
          class="coupon-container"
          v-for="coupon in couponList"
          :key="coupon.id"
        >
          <h-couponCollect
            :coupon="coupon"
            @handleCollect="handleCollect"
            @handleUse="handleUse"
            :canChoose="false"
            :isCenter="true"
          ></h-couponCollect>
        </view>
      </view>
      <view class="no-data-box" v-else>
        <view class="no-data">
          <image :src="cover" />
        </view>
        <text class="no-text">当前暂时没有优惠券～</text>
      </view>
    </view>
  </view>
</template>
<script>
import {coupons, shopCoupons} from "@/utils/url";
import api from "@/utils/api";
import {
  COUPON_CHANNEL_TYPE,
  ACQUIRE_TYPE_ENUM,
  COUPON_CATEGORY_ENUM,
  goodsType,
} from "@/utils/enum";
import {handleUse} from "@/utils/commonMethod";
import {mapState} from "vuex";
export default {
  data() {
    return {
      cover:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E6%97%A0%E7%A5%A8%E5%88%B8%402x.png",
      COUPON_CHANNEL_TYPE,
      ACQUIRE_TYPE_ENUM,
      COUPON_CATEGORY_ENUM,
      goodsType,
      tabs: [
        {
          name: "可领取",
          value: 0,
        },
        {
          name: "可使用",
          value: 1,
        },
      ],
      page: 1,
      current: 0,
      total: 0,
      couponList: [],
    };
  },
  onShow() {
    this.page = 1;
    this.couponList = [];
    this.getLists(true);
  },
  // 下拉触底
  onReachBottom() {
    console.log("触底了");
    if (this.couponList.length < this.total) {
      this.page = this.page + 1;
      this.getLists();
    }
  },
  computed: {
    ...mapState("user", ["channel"]),
  },

  methods: {
    async getLists(isRefresh) {
      try {
        const user = uni.getStorageSync("userMsg");
        const {appId, memberNo} = user;

        const para = {
          appId,
          memberNo,
          page: this.page,
          size: 10,
        };
        const {data} = await this.POST(
          coupons.collectCouponsList,
          para,
          "加载中"
        );
        if (isRefresh) {
          this.couponList = data?.content || [];
        } else {
          this.couponList = data
            ? [...this.couponList, ...data.content]
            : [...this.couponList];
        }
        this.total = data.totalElements;
      } catch (err) {
        console.log(err);
      }
    },

    // 领券
    async handleCollect(code) {
      try {
        const para = {
          acquireType: ACQUIRE_TYPE_ENUM.COUPON_CENTER,
          channel: COUPON_CHANNEL_TYPE.XHG,
          code,
        };
        await this.POST(coupons.getCoupon, para);
        this.page = 1;
        // this.couponList = [];
        this.getLists(true);
        uni.showToast({
          title: "领券成功",
          icon: "success",
          duration: 1500,
        });

        // setTimeout(() => {
        //   this.couponList = [];
        //   this.getLists();
        // }, 1500);
      } catch (err) {
        console.log(err);
      }
    },
    handleUse,
  },
};
</script>
<style scoped lang="scss">
.no-data-box {
  text-align: center;
  padding-top: 290rpx;
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
.tab-box {
  padding: 0 144rpx;
  height: 104rpx;
  background-color: #fff;
  margin-bottom: 32rpx;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .tab-item {
    width: 90rpx;
    height: 104rpx;
    line-height: 104rpx;
    font-size: 30rpx;
    color: #999999;
  }
  .active {
    position: relative;
  }
  .active::after {
    content: "";
    width: 100%;
    height: 6rpx;
    border-radius: 6rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #1d9bdc;
  }
}
.tabs {
  padding: 0 32rpx;
  height: 104rpx;
  background-color: #fff;
  margin-bottom: 32rpx;
}
.container {
  //padding-bottom: constant(safe-area-inset-bottom);
  //padding-bottom: env(safe-area-inset-bottom);
  min-height: 100vh;
  background: #f5f5f5;
  padding-top: 24rpx;
}
.coupon-container {
  padding: 0 32rpx;
}
.scroll-view-x {
  white-space: nowrap;
  width: 100%;
}
.coupon-cards {
  padding: 32rpx;
}
.coupon-card {
  width: 100%;
  height: 120rpx;
  background-image: radial-gradient(circle at 0, #f00 28rpx, #fff 20rpx);
}
</style>
