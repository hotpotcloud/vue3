<template>
  <view>
    <!-- <view
      class="goods-card"
      v-for="(item, index) in data.goodsInfos"
      :key="index"
    >
      <view class="goods-img">
        <image :src="getAssetImgUrl(data.milkCardTemplate)" />
        <text class="tag">奶卡</text>
      </view>
      <view class="goods-info">
        <view class="goods-count"
          ><text class="card-name">{{ data.milkCardName }}</text>
          <text class="goods-price">{{ noformatAmount(item.unitPrice) }}</text>
        </view>
        <view class="goods-name">{{ item.goodsName }}</view>
        <view class="goods-desc">
          <text>{{ item.goodsConf }}，{{ item.num }}份</text>
          <text>x{{ item.qty }}</text>
        </view>
      </view>
    </view> -->
    <!-- <view v-for="(item, index) in data.goodsInfos" :key="index">
      <h-GoodsMsg
        :isShowPrice="false"
        :milkName="data.milkCardName"
        :name="item.goodsName"
        :img="data.milkCardTemplate"
        :tagType="item.tagType"
        :desc="item.goodsConf"
        :milkGoodsNum="item.num"
        :num="item.qty"
        :milkSpecs="'份'"
      ></h-GoodsMsg>
      <template
        v-if="
          item.combGoodsInfos.length && item.comb === combGoods.ITEM_PRODUCT
        "
      >
        <view class="milk-comb-tips"> 每份包含以下商品 </view>
        <view
          class="item-comb"
          v-for="(el, inx) in item.combGoodsInfos"
          :key="inx"
        >
          <h-GoodsMsg
            :isShowPrice="false"
            :img="el.imageUrl[0]"
            :name="el.name"
            :num="el.qty"
          ></h-GoodsMsg>
        </view>
      </template>
    </view> -->
    <view v-for="(item, index) in data.goodsInfos" :key="index">
      <h-GoodsMsg
        :isShowPrice="false"
        :milkName="!item.present ? data.milkCardName : ''"
        :name="item.goodsName"
        :img="!item.present ? data.milkCardTemplate : item.goodsImgUrl"
        :tagType="data.tagType"
        :desc="item.goodsConf"
        :milkGoodsNum="!item.present ? item.num : 0"
        :present="item.present"
        :num="item.qty"
        :milkSpecs="'份'"
      ></h-GoodsMsg>
      <template
        v-if="
          item.combGoodsInfos.length && item.comb === combGoods.ITEM_PRODUCT
        "
      >
        <view class="milk-comb-tips"> 每份包含以下商品 </view>
        <view
          class="item-comb"
          v-for="(el, inx) in item.combGoodsInfos"
          :key="inx"
        >
          <h-GoodsMsg
            :isShowPrice="false"
            :img="el.imageUrl[0]"
            :name="el.name"
            :num="el.qty"
          ></h-GoodsMsg>
        </view>
      </template>
    </view>
  </view>
</template>
<script>
import { combGoods } from "@/utils/enum";
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      combGoods, //组合枚举
    };
  },
};
</script>

<style lang="scss" scoped>
.goods-card {
  display: flex;
  align-items: top;
  width: 100%;
  height: auto;
  background: #fff;
}
.goods-img {
  border: 1rpx solid #f3f3f3;
  position: relative;
  width: 136rpx;
  height: 136rpx;
  border-radius: 24rpx;
  overflow: hidden;
  > image {
    width: 100%;
    height: 100%;
  }
  .tag {
    position: absolute;
    width: 60rpx;
    height: 30rpx;
    background: #f86c4d;
    border-radius: 16rpx 0rpx 16rpx 0rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-size: 24rpx;
    padding: 0 0 6rpx 16rpx;
    color: #fff;
    left: 0;
    top: 0;
  }
}
.goods-info {
  margin-left: 16rpx;
  .goods-count {
    display: flex;
    justify-content: space-between;
    .card-name {
      font-size: 28rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 33rpx;
    }
    .goods-price {
      font-size: 28rpx;
      font-family: DIN-Bold, DIN;
      font-weight: bold;
      color: #333;
      line-height: 26rpx;
      &::before {
        content: "¥";
        font-size: 22rpx;
      }
    }
  }
  .goods-name {
    width: 486rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #000;
    line-height: 33rpx;
    margin-top: 16rpx;
  }
  .goods-desc {
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 30rpx;
    margin-top: 16rpx;
  }
}
.milk-comb-tips {
  color: #db9918;
  font-size: 24rpx;
  padding: 14rpx 0 16rpx;
  border-bottom: 2rpx dashed #f1f1f1;
  margin-bottom: 16rpx;
}
.item-comb {
  margin-bottom: 16rpx;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
