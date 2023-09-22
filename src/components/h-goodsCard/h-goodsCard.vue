<template>
  <view>
    <view v-for="(item, index) in goodsInfo" :key="index">
      <!-- 普通商品 -->
      <view
        class="goods-card-cover"
        v-if="item.comb === combGoods.SPU_PRODUCT && !item.present"
      >
        <h-GoodsMsg
          :img="item.goodsImgUrl"
          :present="item.present"
          :name="item.goodsName"
          :price="item.unitPrice"
          :desc="item.goodsConf"
          :startTime="item.deliveryStartDate"
          :endTime="item.deliveryEndDate"
          :num="item.qty"
        />
      </view>
      <!-- 组合商品 -->
      <view
        class="goods-card-cover"
        v-else-if="!item.present && item.comb === combGoods.ITEM_PRODUCT"
      >
        <h-GoodsMsg
          :img="item.goodsImgUrl"
          :present="item.present"
          :name="item.goodsName"
          :num="item.qty"
          :price="item.unitPrice"
          :desc="item.goodsConf"
        >
          <view class="combo-tips">该组合包含以下商品</view>
        </h-GoodsMsg>
        <template v-for="(el, idx) in item.combGoodsInfos">
          <h-GoodsMsg
            :key="idx"
            :img="el.imageUrl"
            :name="el.name"
            :price="el.unitPrice"
            :desc="el.goodsConf"
            :startTime="el.deliveryStartDate"
            :endTime="el.deliveryEndDate"
            :num="el.qty"
          />
        </template>
      </view>
      <!-- 赠品 -->
      <view class="gift-cover-box" v-else-if="item.present">
        <h-GoodsMsg
          :img="item.goodsImgUrl"
          :present="item.present"
          :name="item.goodsName"
          :price="item.unitPrice"
          :desc="item.goodsConf"
          :startTime="item.deliveryStartDate"
          :endTime="item.deliveryEndDate"
          :num="item.qty"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { combGoods, orderStatus } from "@/utils/enum";
export default {
  props: {
    goodsInfo: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      combGoods,
      orderStatus,
    };
  },
  methods: {
    goCanlendar(item, combItem) {
      let obj = {};
      obj.channelSkuCode = item.goodsCode;
      obj.itemNo = item.itemNo;
      obj.orderNo = item.orderNo;
      // console.log(item.comb === combGoods.ITEM_PRODUCT, "====>");
      item.comb === combGoods.ITEM_PRODUCT
        ? (obj.skuCode = combItem.skuCode)
        : (obj.skuCode = item.skuCode);
      // console.log(obj, "组件传递参数");
      this.$emit("checkCanlendar", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
// .goods-card-border {
//   //border-bottom: 2rpx dashed #f4f4f4;
// }
.combo-tips {
  margin: 16rpx 0;
  border-bottom: 2rpx dashed #f1f1f1;
  font-size: 24rpx;
  color: #db9918;
  padding-bottom: 16rpx;
}
::v-deep.goods-card {
  // display: flex;
  // justify-content: flex-start;
  // padding-bottom: 24rpx;
  // margin-bottom: 24rpx;
  // border-bottom: 2rpx dashed #f1f1f1;
  //margin-bottom: 32rpx;
  //padding-bottom: 32rpx;
  // border-bottom: 2rpx dashed #f4f4f4;
  .goods-card-desc {
    width: 462rpx;
    margin-left: 24rpx;
    // margin-bottom: 24rpx;
    .goods-card-price {
      font-size: 30rpx;
      font-weight: bold;
      padding-top: 16rpx;
      display: flex;
      justify-content: space-between;
    }
  }
}
.uni-list-item__container {
  padding: 0;
}
.goods-card-amount {
  color: #f86c4d;
}
.slot-header-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #000;
}
.slot-footer {
  font-size: 26rpx;
  color: #666666;
  // color: #ff0;
}
.slot-conf {
  display: inline-block;
  width: 350rpx;
  text-align: left;
}

.goods-card-title,
.comb-info-title {
  font-weight: bold;
  color: #000;
  line-height: 30rpx;
}
.goods-card-cover {
  // width: 136rpx;
  // height: 136rpx;
  // background: #f3f3f3;
  // border-radius: 16rpx;
  position: relative;
}

.gift-cover-box {
  // width: 112rpx;
  // height: 112rpx;
  // background: #f3f3f3;
  // border-radius: 16rpx;
  // margin-left: 32rpx;
  position: relative;
}
.goods-card-img {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  border: 1rpx solid #f3f3f3;
}
.goods-comb-tag {
  width: 60rpx;
  height: 30rpx;
  background-color: #1d9bdc;
  border-color: #1d9bdc;
  color: #fff;
  font-size: 22rpx;
  line-height: 30rpx;
  border-radius: 16rpx 0rpx 16rpx 0rpx;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.goods-gift-tag {
  width: 60rpx;
  height: 30rpx;
  background-color: #ffcd5f;
  border-color: #ffcd5f;
  color: #333;
  font-size: 22rpx;
  line-height: 30rpx;
  border-radius: 16rpx 0rpx 16rpx 0rpx;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.pay-btn-detail {
  width: 136rpx;
  height: 60rpx;
  text-align: center;
  line-height: 58rpx;
  background: #fff;
  border-radius: 76rpx;
  border: 2rpx solid #1d9bdc;
  color: #1d9bdc;
  font-size: 26rpx;
}
//右靠
.right {
  text-align: right;
}
</style>
