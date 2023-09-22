<template>
  <view class="coupon-container">
    <view v-if="couponList.length > 0">
      <h-couponCollect
        v-for="coupon in couponList"
        :key="coupon.id"
        :coupon="coupon"
        :canChoose="false"
        @handleUse="handleUse"
        :isMyCoupon="true"
      ></h-couponCollect>
    </view>
    <view v-else>
      <view class="no-img">
        <img :src="cover" alt />
      </view>
      <view class="text-tip">当前暂时没有优惠券~</view>
    </view>
  </view>
</template>
<script>
import {coupons, shopCoupons} from "@/utils/url";
import {handleUse} from "@/utils/commonMethod";
import {goodsType, COUPON_CATEGORY_ENUM} from "../../utils/enum";
import api from "@/utils/api";
export default {
  data() {
    return {
      COUPON_CATEGORY_ENUM,
      goodsType,
      page: 1,
      current: 0,
      total: 0,
      couponList: [],
      cover:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E6%97%A0%E7%A5%A8%E5%88%B8%402x.png",
      note: "当前暂时没有优惠券～",
      forwardBtn: "去领券中心",
      forwardUrl: "/subPages/coupons/collectCoupons",
    };
  },
  onLoad() {
    this.getList();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.couponList = [];
    this.page = 1;
    this.getList();
    uni.stopPullDownRefresh();
  },
  // 下拉触底
  onReachBottom() {
    console.log("触底了");
    if (this.couponList.length < this.total) {
      this.page = this.page + 1;
      this.getList();
    }
  },
  onUnload() {
    this.couponList = [];
  },
  methods: {
    // 获取列表
    async getList() {
      try {
        const addinfo = uni.getStorageSync("addinfo");
        const user = uni.getStorageSync("userMsg");
        const {appId, memberNo} = user;
        const para = {
          appId,
          memberNo,
          page: this.page,
          size: 10,
          latitude: addinfo.latitude,
          longitude: addinfo.longitude,
        };
        const {data} = await this.POST(
          coupons.myCouponList,
          para,
          "加载中",
          true
        );
        this.couponList = [...this.couponList, ...data.content];
        this.total = data.totalElements;
        console.log(data, "999");
      } catch (err) {
        console.log(err);
      }
    },
    handleUse,
  },
};
</script>
<style scoped lang="scss">
.coupon-container {
  padding: 32rpx 32rpx 0 32rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.no-img {
  // margin-top: 264rpx;
  width: 312rpx;
  height: 368rpx;
  margin: 264rpx auto 0;
  image {
    width: 100%;
    height: 100%;
  }
}
.text-tip {
  text-align: center;
  margin-top: 48rpx;
  color: #a9a9a9;
}
</style>
