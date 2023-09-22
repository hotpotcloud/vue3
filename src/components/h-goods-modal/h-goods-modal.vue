<template>
  <view class="container">
    <u-popup
      :show="open"
      :round="20"
      zindex="900"
      mode="bottom"
      overlayOpacity="0.45"
      :safeAreaInsetTop="false"
    >
      <view class="goods-container">
        <view class="d-flex-center d-sb">
          <view class="flex-1 top-title">选择要购买的商品</view>
          <u-icon
            @click="closeModal()"
            name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/close%E5%85%B3%E9%97%AD.png"
          ></u-icon>
        </view>
        <view class="goods-box">
          <view class="d-flex goods-item" v-for="(item,index) in goodsList" :key="index">
            <image class="goods-pic" :src="item.goodsImgUrl" mode="scaleToFill" />
            <view class="goods-info">
              <view>{{item.goodsName}}</view>
              <view class="goods-box-info">
                <view>200ml</view>
                <image
                  @click="goShop(item.spuCode)"
                  class="go-icon"
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/buy.png"
                  mode="scaleToFill"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
export default {
  props: {
    goodsList: {
      type: Array,
      default: []
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: this.open
    };
  },
  methods: {
    goShop(spuCode) {
      this.$emit("goGoodsDetail", spuCode);
      // uni.navigateTo({
      //   url: `/subPages/product/proDetail?id=${spuCode}`
      // });
    },
    // 关闭
    closeModal() {
      this.$emit("closeGoodsModal");
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-container {
  width: 100%;
  height: 680rpx;
  padding: 48rpx 48rpx 0 48rpx;
  .top-title {
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    color: #000000;
  }
  .goods-box {
    max-height: 536rpx;
    overflow: scroll;
    margin-top: 48rpx;
    .goods-item {
      width: 100%;
      border-bottom: 1rpx solid #f1f1f1;
      padding-bottom: 18rpx;
      .goods-info {
        width: 492rpx;
        padding-left: 16rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .goods-pic {
        width: 148rpx;
        height: 148rpx;
        background: #f1f1f1;
        border-radius: 24rpx;
      }
      .goods-box-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .go-icon {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    .goods-item:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
}

.goods {
  width: 100%;
  height: 96rpx;
}
</style>