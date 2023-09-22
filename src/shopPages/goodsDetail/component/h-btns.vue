<template>
  <view class="car">
    <view class="car-warper">
      <view class="d-flex-center">
        <button
          id="serveBtn"
          style="display: hidden"
          open-type="contact"
          hover-class="button-hover"
          class="customer-service"
          @contact="toService"
          :style="{padding: isShowShopCar ? '0 0rpx' : '0 0rpx'}"
        ></button>
        <!--  :style="{padding: isShowShopCar ? '0 14rpx' : '0 14px'}" -->
        <view>
          <label for="serveBtn" class="d-flex-colum-center">
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E5%AE%A2%E6%9C%8D2x.png"
              mode="scaleToFill"
            />
            <text class="icon-line-h">客服</text>
          </label>
        </view>
        <view>
          <view
            class="d-flex-colum-center"
            @tap="toHome"
            :style="{margin: isShowShopCar ? '0 28rpx' : '0 64rpx'}"
          >
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E4%B8%BB%E9%A1%B52x.png"
              mode="scaleToFill"
            />
            <text class="icon-line-h">首页</text>
          </view>
        </view>
        <view v-if="isShowShopCar" class="shop-car-container">
          <view class="d-flex-colum-center shop-car" @tap="openShopCar">
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/shopcar.png"
              mode="scaleToFill"
            />
            <text class="icon-line-h">购物车</text>
          </view>
          <view class="count" v-if="shopCount > 0">
            {{ shopCount | formatGoodsCount }}
          </view>
        </view>
      </view>
      <view>
        <view v-if="isOut">
          <view class="out-stock good-btns d-flex">已售罄</view>
        </view>
        <view v-else>
          <view class="good-btns d-flex now" @click="buys">
            <view v-if="isShowShopCar" class="add-to-car" @tap.stop="addShopCar"
              >加入购物车</view
            >
            <view class="price" v-else>
              <text class="money">{{ price | formatAmount }}</text>
            </view>
            <view class="money go-to-buy" @tap="gotoBuy">立即购买</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import {productStatusEnum} from "@/utils/enum";
export default {
  props: {
    isOut: {
      type: Boolean,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    isShowShopCar: {
      default: false,
      type: Boolean,
    },
    shopCount: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      productStatusEnum,
    };
  },
  methods: {
    buys(e) {
      this.$emit("buygoods", e);
    },
    toHome() {
      this.$emit("toHome");
      // uni.switchTab({
      //   url: "/pages/homepage/homepage",
      //   success:()=>{
      //     uni.showTabBar()
      //   }
      // });
      // console.log("跳转首页");
    },
    gotoBuy() {
      this.$emit("toBuy");
    },
    addShopCar() {
      this.$emit("addShopCar");
    },
    openShopCar() {
      console.log("openShopCar", "openShopCar");
      this.$emit("openShopCar");
    },
  },
};
</script>
<style scoped lang="scss">
.car {
  // border-top: 2rpx solid $uni-border-subcolor;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding-bottom: 30rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.car-warper {
  border-top: 1rpx solid #e5e5e5;
  //padding-top: 32rpx;
  padding-bottom: 14rpx;
  padding: 32rpx 40rpx 14rpx 32rpx;
  // padding-top: 26rpx;
  display: flex;
  justify-content: space-between;
  image {
    width: 43rpx;
    height: 43rpx;
    margin-bottom: 12rpx;
  }
}
.icon-line-h {
  line-height: 24rpx;
  font-size: 20rpx;
}

.money {
  font-size: 26rpx;
  line-height: 30rpx;
  padding-right: 10rpx;
}
.go-to-buy {
  width: 246rpx;
  text-align: center;
  // padding-right: 48rpx;
}
.good-btns {
  width: 446rpx;
  height: 80rpx;
  border-radius: 254rpx 254rpx 254rpx 254rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0 48rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #ffffff;
  line-height: 33rpx;
  .price {
    font-size: 32rpx;
    padding-left: 48rpx;
  }
}
.now {
  background: #1d9bdc;
  justify-content: space-between;
}
.out-stock {
  background: #c7c7c7;
}

.shop-car {
  margin-right: 28rpx;
  > image {
    width: 45rpx;
    height: 45rpx;
  }
}
.shop-car-container {
  position: relative;
  .count {
    padding: 4rpx 8rpx;
    height: 28rpx;
    background: #f86c4d;
    border: 1rpx solid #f86c4d;
    font-size: 18rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 18rpx;
    text-align: center;
    border-radius: 28rpx;
    position: absolute;
    right: 30rpx;
    top: -3rpx;
    transform: translateX(50%);
  }
}
.add-to-car {
  width: 223rpx;
  height: 80rpx;
  background: #8bd0ff;
  font-size: 28rpx;
  font-weight: 500;
  color: #ffffff;
  line-height: 80rpx;
  text-align: center;
  border-top-left-radius: 254rpx;
  border-bottom-left-radius: 254rpx;
}
</style>
