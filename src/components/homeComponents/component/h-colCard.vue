<template>
  <view class="colcard-out" @tap.stop="clickClass(list)" v-if="show">
    <view class="card-heard">
      <image class="card-cover" :src="list.imageUrl[0]" mode="aspectFit	" />
    </view>
    <view class="card-body">
      <view
        class="h-overflow-2"
        :class="[
          iosFont ? 'font-ios' : 'font-android',
          'color-33',
          'card--name',
        ]"
      >
        <text v-show="list.kill" class="seckill-tag">秒杀</text>
        {{ list.spuName }}</view
      >
      <view class="d-flex card-tag">
        <view class="d-flex-center">
          <view class="h-ticket" v-if="list.coupon" style="color: #f86c4d">
            优惠券
          </view>
          <view class="h-home-tag" v-if="list.fullMinus"> 满减 </view>
          <view class="h-home-tag" v-if="list.gift">满赠</view>
        </view>
      </view>
      <view
        class="h-home-price"
        :class="[iosFont ? 'font-ios' : 'font-android']"
      >
        <text>{{ list.minPrice | formatAmount }}</text>
        <text v-show="list.maxPrice != list.minPrice"
          >~{{ list.maxPrice | formatAmount }}</text
        >
      </view>

      <view
        class="xiaoyou-btn"
        v-if="list.commission && list.commission.maxCommission"
      >
        <view class="xiaoyou" @tap.stop="shareXY">
          <image
            class="sb-pm"
            :src="getAssetImgUrl('share-class-xy.png')"
            mode="scaleToFill"
          />
          <text>高达{{ list.commission.maxCommission }}元</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { getAssetImgUrl } from "@/utils/utils";
export default {
  props: {
    list: {
      type: Object,
      default: {},
    },
  },
  // components: {
  //   hCanvas,
  // },
  data() {
    return {
      showCanvas: false,
    };
  },
  computed: {
    ...mapState("css", ["iosFont"]),
    show() {
      return Object.prototype.toString.call(this.list) === "[object Object]";
      // if(Object.prototype.toString.call(this.list) === '[object Object]'){
      //   return false
      // }else return true;
    },
    canvasInfo() {
      const { spuName, imageUrl, spuCode, maxPrice, minPrice } = this.list;
      return {
        spuName,
        imageUrl: imageUrl[0],
        spuId: spuCode,
        rangeMaxPrice: maxPrice,
        rangeMinPrice: minPrice,
        salesNum: this.list.salesNum ? this.list.salesNum : 1,
      };
    },
  },
  methods: {
    getAssetImgUrl,
    //小优分享
    shareXY() {
      console.log("小优", 2);
      this.showCanvas = true;
      uni.hideTabBar();
      this.$emit("shareXY", this.canvasInfo);
    },
    // 图片跳转
    clickClass(val) {
      uni.navigateTo({
        url: `/subPages/product/proDetail?id=${val.spuCode}`,
      });
    },
    getRect() {
      // return new Promise((resolve) => {
      //   uni
      //     .createSelectorQuery()
      //     .in(this)
      //     .select(`.colcard-out`)
      //     .boundingClientRect(resolve)
      //     .exec();
      // });
      uni
        .createSelectorQuery()
        .in(this)
        .select(`.colcard-out`)
        .boundingClientRect((data) => {
          console.log(" data", data);
        })
        .exec();
    },
  },
};
</script>

<style scoped lang="scss">
.colcard-out {
  width: 328rpx;
  margin-bottom: 24rpx;
  border-radius: 24rpx;
  background: #fff;
  overflow: hidden;

  .card-heard {
    width: 100%;
    height: 328rpx;
    overflow: hidden;
    .card-cover {
      width: 100%;
      height: 100%;
    }
  }
  .card-body {
    //width: 100%;
    padding: 16rpx 32rpx 24rpx;
    .card--name {
      margin-bottom: 12rpx;
    }
    .card-tag {
      // margin-top: 12rpx;
      margin-bottom: 8rpx;
    }
  }

  .xiaoyou-btn {
    margin-top: 10rpx;
    width: 100%;
    height: 40rpx;
    background: transparent;
    position: relative;
  }
  .xiaoyou {
    border-radius: 8rpx;
    position: absolute;
    z-index: 13;
    height: 100%;
    background: rgba(248, 108, 77, 0.15);
    display: flex;
    align-items: center;
    padding: 4rpx 6rpx;

    font-size: 24rpx;

    color: #f86c4d;
    .sb-pm {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
</style>
