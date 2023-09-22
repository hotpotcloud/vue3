<template>
  <view class="shop" v-if="recentShopList.length > 0">
    <view class="top">
      <view class="more-shop" @tap="openMoreShop()">
        <view>更多门店</view>
        <uni-icons type="right" size="16" color="#ffffff"></uni-icons>
        <!-- <image
          class="arrow"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/arrow.png"
        />-->
      </view>
    </view>
    <!-- <view class="shop-list-container"> -->
    <scroll-view
      v-bind:class="{
        'shop-list': true,
        one: recentShopList.length === 1,
        two: recentShopList.length > 1,
      }"
      scroll-x="true"
      @scroll="scroll"
    >
      <view
        class="shop-item-container"
        v-for="item in recentShopList"
        :key="item"
        @tap="() => goToDetail(item)"
      >
        <view>
          <ShopItem :item="item" />
        </view>
      </view>
      <!-- <view class="shop-item-container"><ShopItem /></view> -->
    </scroll-view>
    <!-- </view> -->
    <view class="scroll-bar-container" v-if="recentShopList.length > 1">
      <view class="scroll-bar" :style="{width: 28 * recentShopList.length + 'rpx'}">
        <view :class="{active: true}" :style="{'margin-left': 28 * activeIndex + 'rpx'}"></view>
      </view>
    </view>
  </view>
</template>
<script>
import ShopItem from "@/components/shop-item";
import { mapState, mapActions } from "vuex";
export default {
  components: { ShopItem },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("home", ["existArr", "addInfoMsg", "recentShopList"])
  },

  mounted() {
    this.get_recentShopList();
  },
  methods: {
    ...mapActions("home", ["get_recentShopList"]),
    scroll(e) {
      this.activeIndex = parseInt(e.detail.scrollLeft / 200);
    },
    openMoreShop() {
      uni.navigateTo({
        url: `/shopPages/shopList/index`
      });
    },
    goToDetail(item) {
      uni.navigateTo({
        url: `/shopPages/shop/index?shopConfigId=${item.shopConfigId}`
      });
    }
  }
};
</script>
<style scoped lang="scss">
.shop {
  width: 700rpx;
  margin: 0rpx 24rpx;
  height: 258rpx;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/home-shop-bg.png");
  background-size: 100% 100%;
  .top {
    padding: 20rpx 0px 28rpx;
    display: flex;
    justify-content: flex-end;
  }
  .more-shop {
    width: 168rpx;
    height: 48rpx;
    background: #9ccffc;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
    line-height: 48rpx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24rpx 28rpx 0rpx 24rpx;
    > image {
      width: 48rpx;
      height: 48rpx;
      margin-left: -8rpx;
    }
  }
  .shop-list {
    white-space: nowrap;
    width: 100%;
    height: 136rpx;
  }
  .scroll-bar-container {
    margin-top: 16rpx;
    margin-bottom: 16rpx;
  }
  .scroll-bar {
    margin: auto;
    // width: 56rpx;
    height: 8rpx;
    border-radius: 4rpx;
    background: rgba(29, 155, 220, 0.5);
    .active {
      width: 32rpx;
      height: 8rpx;
      border-radius: 4rpx;
      background: #1d9bdc;
      // margin-left: 0rpx;
    }
    // .right {
    //   margin-left: 24rpx;
    // }
  }
  .shop-item-container {
    display: inline-block;
  }
  .two .shop-item-container:nth-child(1) {
    padding: 0rpx 16rpx 0rpx 22rpx;
  }
  .two .shop-item-container {
    padding-right: 16rpx;
  }
  .two .shop-item-container:last-child {
    padding: 0rpx 22rpx 0rpx 0rpx;
  }

  .one .shop-item {
    min-width: 656rpx;
  }
  .one .shop-item-container {
    padding: 0rpx 22rpx;
    width: 100%;
  }
  // .shop-list > view {
  //   padding: 0prx 22rpx;
  // }
  // .shop-list .shop-item:nth-child(2) {
  //   margin-left: 16rpx;
  // }
}
</style>
