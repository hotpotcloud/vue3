<template>
  <view class="page">
    <view class="detail-content">
      <PersonInfo :data="exchangeDetail" />
      <view class="goods-info">
        <view class="shop-name-wrap">
          <image
            class="shop-icon"
            :src="getAssetImgUrl('%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/store.png')"
          />
          <view class="shop-name">{{
            exchangeDetail.detailList[0].companyName
          }}</view>
        </view>

        <!-- 商品详情 -->
        <GoodsCard :item="exchangeDetail.detailList" />
        <!-- <GoodsCard
          v-for="(item, index) in exchangeDetail.detailList"
          :key="index"
          :item="item"
          :data="exchangeDetail"
        /> -->
      </view>
    </view>
    <view class="bottom-menu-wrap">
      <button
        id="serveBtn"
        style="display: none"
        open-type="contact"
        hover-class="button-hover"
      ></button>
      <label for="serveBtn">
        <view class="customer-btn">联系客服</view>
      </label>
      <!-- <view class="confirm-btn" @tap.stop="onDeliveryCalendar">配送日历</view> -->
    </view>
  </view>
</template>

<script>
import PersonInfo from "./person-info.vue";
import GoodsCard from "./goods-card.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: { PersonInfo, GoodsCard },
  computed: {
    ...mapState("milkcard", ["exchangeDetail"]),
  },
  onLoad(options) {
    const { milkCardNode, milkCardNo } = options;
    if (milkCardNode) {
      this.get_CardExchangeDetail(milkCardNode);
    }
    // milkCardNode
  },
  onUnload() {
    this.set_ExchangeDetail(null);
  },
  methods: {
    ...mapActions("milkcard", ["get_CardExchangeDetail"]),
    ...mapMutations("milkcard", ["set_ExchangeDetail"]),
    onContact() {
      this.$emit("onContact");
    },
    onDeliveryCalendar() {
      this.$emit("onDeliveryCalendar");
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  overflow-y: auto;
  .detail-content {
    padding-bottom: 176rpx;
    margin: 16rpx 32rpx;
  }
}
.bottom-menu-wrap {
  position: fixed;
  width: 100%;
  height: 176rpx;
  z-index: 999;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  display: flex;
  gap: 16rpx;
  padding: 20rpx 32rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1rpx solid #f3f3f3;
  padding-bottom: 68rpx;
  justify-content: flex-end;

  .customer-btn {
    width: 192rpx;
    height: 68rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    color: #666;
    line-height: 68rpx;
    text-align: center;
    border-radius: 254rpx;
    font-weight: 400;
    border: 1rpx solid #c7c7c7;
  }
  .confirm-btn {
    width: 192rpx;
    height: 68rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 400;
    color: #1d9bdc;
    line-height: 68rpx;
    text-align: center;
    border-radius: 254rpx;
    border: 1rpx solid #1d9bdc;
  }
}

.goods-info {
  padding: 24rpx;
  background: #fff;
  border-radius: 24rpx;
  margin-top: 16rpx;
  .shop-name-wrap {
    margin-bottom: 24rpx;
    // padding-bottom: 176rpx;
    .shop-name,
    .shop-icon {
      display: inline-block;
      vertical-align: middle;
    }
    .shop-icon {
      width: 48rpx;
      height: 48rpx;
    }
    .shop-name {
      font-size: 28rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333;
      line-height: 33rpx;
      margin-left: 14rpx;
    }
  }
}
</style>
