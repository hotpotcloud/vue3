<!--
 * @Date: 2022-07-29 14:01:02
 * @LastEditors: ''
 * @LastEditTime: 2022-08-01 00:54:47
 * ''\subPages\search\item.vue
-->
<template>
  <view class="item-out">
    <view class="d-flex">
      <view
        class="item-left"
        @tap="activeType===pickType.SEND.value?openDetail(val.spuCode):goToProduct(val)"
      >
        <image class="item-img" :src="val.imageUrl[0]" mode="scaleToFill" />
      </view>
      <view class="item-right d-flex-colum d-sb flex-1">
        <view @tap="activeType===pickType.SEND.value?openDetail(val.spuCode):goToProduct(val)">
          <view class="h-overflow-2">
            <text v-show="val.kill" class="seckill-tag">秒杀</text>
            <text :class="[iosFont ? 'font-ios' : 'font-android', 'font-26-33']">{{ val.spuName }}</text>
          </view>
          <view class="d-flex goods-tag">
            <view v-if="val.coupon" class="h-ticket">优惠券</view>
            <view v-if="val.fullMinus" class="h-tag">满减</view>
            <view v-if="val.gift" class="h-tag">满赠</view>
          </view>
        </view>
        <view class="d-flex-center d-sb">
          <view
            @tap="activeType===pickType.SEND.value?openDetail(val.spuCode):goToProduct(val)"
            :class="[iosFont ? 'font-ios' : 'font-android', 'h-main-color']"
          >
            <text>{{ priceMin }}</text>
            <text v-show="val.minPrice !== val.maxPrice">~{{ money(val.maxPrice) }}</text>
          </view>
          <!--  v-if="activeType===pickType.SEND.value" -->
          <view
            v-if="activeType===pickType.SEND.value"
            class="buy-btn"
            @click="() => openModal(val.spuCode)"
          >购买</view>
          <image
            v-else
            @click="goToProduct(val)"
            class="right-in"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/in.png"
            mode="scaleToFill"
          />
          <!-- <u-icon
            name="plus-circle-fill"
            color="#1D9BDC"
            size="24"
            @click="() => openModal(val.spuCode)"
          ></u-icon>-->
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { pickType } from "@/utils/enum";
import { mapActions, mapState } from "vuex";
import { formatAmount } from "@/utils/utils";
export default {
  props: {
    val: {
      type: Object,
      default: null
    },
    activeType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      pickType
    };
  },
  computed: {
    ...mapState("css", ["iosFont"]),
    priceMin() {
      return formatAmount(this.val.minPrice);
    }
    // priceMax()
  },
  methods: {
    ...mapActions("product", [
      "X_modaldetail",
      "X_postStartSendTime",
      "X_sendTimeArr"
    ]),
    money(num: number) {
      return formatAmount(num);
    },
    // 打开详情
    openDetail(val) {
      console.log("父组件search", val);
      uni.navigateTo({
        url: `/subPages/product/proDetail?id=${val}`
      });
    },
    // 打开弹窗
    openModal(spucode: string) {
      // this.X_modaldetail(spucode).then(() => {
      //   this.X_postStartSendTime().then(() => {
      //     this.X_sendTimeArr();
      //   });
      // });
      this.$emit("openModal", spucode);
      console.log(spucode, "弹窗");
    },
    // 零购商品跳转
    goToProduct(val) {
      uni.navigateTo({
        url: `/shopPages/goodsDetail/index?spuCode=${val.spuCode}&shopConfigId=${val.shopConfigId}`
        // url: `/shopPages/goodsDetail/index?spuCode=${val.spuCode}`
      });
    }
  }
};
</script>

<style scoped lang="scss">
.item-out {
  width: 100%;
  padding: 0 32rpx;
  margin-bottom: 32rpx;
  .item-left {
    width: 176rpx;
    height: 176rpx;
    // background: #f00;
    margin-right: 24rpx;
    border-radius: 24rpx;
    overflow: hidden;
    .item-img {
      width: 100%;
      height: 100%;
    }
  }
  .goods-tag {
    margin-top: 16rpx;
  }
}
.buy-btn {
  background: #1d9bdc;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 6rpx 24rpx 8rpx;
  border-radius: 24rpx;
}
.right-in {
  width: 48rpx;
  height: 48rpx;
}
</style>
