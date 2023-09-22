<template>
  <view>
    <u-popup
      :show="show"
      :round="20"
      zIndex="10079"
      mode="bottom"
      @close="closeModal"
      overlayOpacity="0.45"
      :safeAreaInsetTop="false"
    >
      <image
        class="close"
        @tap="closeModal"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/close_1.png"
      />
      <view class="container">
        <view class="choose-spec-container">
          <view class="product-info">
            <view class="left">
              <image class="goods-img" :src="imageUrl" mode="aspectFit" />
              <view class="right">
                <view>{{ productDetail.spuName }}</view>
                <!-- <view class="coupon-tag-bar">
                  <view class="coupon-tag" v-for="item of 3" :key="item">慢300减30</view>
                </view>-->
                <view
                  class="coupon-tag-bar"
                  :style="{'max-width': '200px'}"
                  v-if="couponStrategyList.length > 0"
                >
                  <view
                    class="coupon-tag"
                    v-for="(itm, idx) in couponStrategyList"
                    :key="idx"
                  >
                    <text class="coupon-tag-no">{{ itm.reduced / 100 }}</text>
                    <text>{{
                      itm.couponType === couponDiscountType.REDUCE
                        ? "元无门槛"
                        : "折"
                    }}</text>
                  </view>
                </view>
                <view>已选：{{ activeSizeSpec }}</view>
                <view>
                  <text>￥</text>
                  <text class="price-active">{{
                    activeItem.unitPrice | noformatAmount
                  }}</text>
                </view>
              </view>
            </view>
          </view>
          <goods-size
            @onChoose="onChoose"
            :sizeList="productDetail.skuChannelInfoList"
            :activeSize="activeSize"
            :isColumn="true"
          ></goods-size>
          <Count
            @handleMinus="handleMinus"
            @handleAdd="handleAdd"
            :count="count"
            :maxDisabled="
              (count >= activeItem.reserve &&
                activeItem.reserve != unlimitedStock) ||
              count === maxShopAddCount
            "
          ></Count>
        </view>
        <view class="add-shop-car">
          <view @tap="addShopCar">加入购物车</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import Count from "@/shopPages/goodsDetail/component/count.vue";
import GoodsSize from "@/shopPages/goodsDetail/component/goods-size.vue";
import {mapState, mapActions} from "vuex";
import api from "@/utils/api";
import {shopCar, shopCoupons} from "@/utils/url";
import {
  maxShopAddCount,
  unlimitedStock,
  couponDiscountType,
} from "@/utils/enum";
import {checkGoods} from "@/utils/utils";

export default {
  components: {Count, GoodsSize},
  data() {
    return {
      count: 1,
      activeSize: 0,
      channelSkuCode: "",
      skuCode: "",
      maxShopAddCount,
      unlimitedStock,
      couponDiscountType,
      couponStrategyList: [],
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    shopConfigId: {
      type: String,
      default: "",
    },
    currentSpuCode: {
      type: String,
      default: "",
    },
  },
  watch: {
    show(nVal) {
      if (nVal) {
        this.count = 1;
        this.activeSize = 0;
        if (
          this.productDetail?.skuChannelInfoList &&
          this.productDetail?.skuChannelInfoList[this.activeSize]
        ) {
          this.channelSkuCode =
            this.productDetail?.skuChannelInfoList[
              this.activeSize
            ]?.channelSkuCode;
          this.skuCode =
            this.productDetail?.skuChannelInfoList[this.activeSize]?.skuCode;
        }
        this.getList();
      }
    },
  },
  computed: {
    ...mapState("shopCar", ["productDetail"]),
    activeSizeSpec() {
      if (
        this.productDetail.skuChannelInfoList &&
        this.productDetail.skuChannelInfoList[this.activeSize]
      ) {
        return this.productDetail.skuChannelInfoList[this.activeSize]
          .skuNickName;
      }
      return "";
    },
    // 当前选中规格
    activeItem() {
      if (
        this.productDetail.skuChannelInfoList &&
        this.productDetail.skuChannelInfoList[this.activeSize]
      ) {
        return this.productDetail.skuChannelInfoList[this.activeSize] || {};
      }
      return {};
    },
    imageUrl() {
      if (this.activeItem.imageUrl && this.activeItem.imageUrl[0]) {
        return this.activeItem.imageUrl[0];
      }
      return "";
    },
  },
  mounted() {},
  methods: {
    ...mapActions("shopCar", ["getShopCountAndMoney"]),
    closeModal() {
      this.$emit("on-cancel");
    },
    onChoose(index, el) {
      this.activeSize = index;
      this.count = 1;
      // this.channelSkuCode = el.channelSkuCode;
      // this.skuCode = el.skuCode;
    },
    // 数量加减
    handleAdd() {
      const value = checkGoods(
        this.count,
        maxShopAddCount,
        this.activeItem.reserve
      );
      if (value !== false) {
        this.count = value;
      }
    },
    handleMinus() {
      this.count > 1 && this.count--;
    },
    // 加购
    async addShopCar() {
      try {
        const userInfo = uni.getStorageSync("userMsg");
        if (!userInfo)
          return uni.navigateTo({
            url: "/pages/user/relogin",
          });
        const param = {
          shopConfigId: this.shopConfigId,
          number: this.count,
          skuCode:
            this.productDetail?.skuChannelInfoList[this.activeSize]?.skuCode,
          channelSkuCode:
            this.productDetail?.skuChannelInfoList[this.activeSize]
              ?.channelSkuCode,
          spuCode: this.productDetail.spuCode,
          isAccumulation: true,
        };
        await api.$post(shopCar.shoppingCartInsert, param, "加载中");
        this.$emit("on-cancel");
        this.getShopCountAndMoney();
        this.$emit("refresh");
        this.count = 1;
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.msg,
        });
      }
    },
    async getList() {
      try {
        const res = await api.$get(
          shopCoupons.getCouponStrategyBySpuCodeForShopIndex +
            `/${this.currentSpuCode}`
        );
        this.couponStrategyList = res.data;
      } catch (error) {
        console.log(error, "ee");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.close {
  position: absolute;
  right: 40rpx;
  top: 50rpx;
  min-width: 32rpx;
  min-height: 32rpx;
  max-width: 32rpx;
  max-height: 32rpx;
  z-index: 99;
}
.choose-spec-container {
  max-height: 80vh;
  overflow-y: auto;
  margin-top: 50rpx;
  position: relative;
  min-height: 40vh;

  .product-info {
    padding: 0rpx 40rpx 0rpx;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
    }
  }
  .goods-img {
    width: 214rpx;
    height: 214rpx;
    background: #f3f3f3;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    border: 1rpx solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin-right: 24rpx;
    border-radius: 24rpx;
  }
  .right {
    > view:nth-child(1) {
      width: 366rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      line-height: 35rpx;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 8rpx;
    }
    > view:nth-child(3) {
      font-size: 26rpx;
      color: #a9a9a9;
      line-height: 36rpx;
      margin: 10rpx 0 8rpx 0;
    }
    > view:nth-child(4) {
      font-size: 24rpx;
      font-weight: bold;
      color: #f86c4d;
      line-height: 50rpx;
      height: 50rpx;
      > text:nth-child(1) {
        font-size: 24rpx;
      }
    }
  }
}

.add-shop-car {
  padding: 14rpx 40rpx;
  background: #ffffff;
  border-top: 2rpx solid #f1f1f1;
  > view {
    font-size: 32rpx;
    font-weight: bold;
    color: #ffffff;
    line-height: 80rpx;
    height: 80rpx;
    text-align: center;
    background: #1d9bdc;
    border-radius: 254rpx 254rpx 254rpx 254rpx;
  }
}
.price-active {
  font-size: 36rpx;
}
</style>
