<template>
  <view class="detail-out">
    <!-- 公司店铺 -->
    <view class="d-flex-center">
      <img class="icon" :src="urls" alt />
      <view class="company">{{ company }}</view>
    </view>
    <!-- 商品信息 -->
    <view class="goods">
      <view class="goods-item" v-for="(item, index) in msg" :key="index">
        <!-- 组合商品 -->
        <template v-if="item.comb === combGoods.ITEM_PRODUCT">
          <h-GoodsMsg
            :comb="item.comb === 'ITEM_PRODUCT'"
            :img="item.goodsImgUrl"
            :name="item.goodsName"
            :present="item.present"
            :desc="item.goodsConf"
            :num="item.qty"
            :price="item.unitPrice"
            :isShopOrder="isShopOrder"
            :status="item.status"
            @tap="() => goToGoodsDetail(item)"
            :showShopGoodsItemPrice="item.couponCode ? true : false"
            :shopGoodsItemPrice="{
              unitDiscountPrice: item.unitDiscountPrice,
              unitPrice: item.unitPrice,
            }"
          >
            <view class="d-flex-center d-sb combo-tips">
              <view>该组合包含以下商品</view>
              <!-- <view class="refund-text-actions">申请售后</view> -->
            </view>
          </h-GoodsMsg>
        </template>
        <!-- 主商品 -->
        <template v-else>
          <!-- 待配+已配送不要 -->
          <!-- :sending="item.residueQty"
          :sended="item.deliveryQty"-->
          <h-GoodsMsg
            :comb="item.comb === combGoods.ITEM_PRODUCT"
            :img="item.goodsImgUrl"
            :name="item.goodsName"
            :present="item.present"
            :desc="item.goodsConf"
            :num="item.qty"
            :price="item.unitPrice"
            :rule="calcRule(item)"
            :startTime="item.deliveryStartDate"
            :endTime="item.deliveryEndDate"
            :isShopOrder="isShopOrder"
            :status="item.status"
            @tap="() => goToGoodsDetail(item)"
          ></h-GoodsMsg>
        </template>

        <view
          class="comb-goods-info"
          v-if="item.comb === combGoods.ITEM_PRODUCT"
        >
          <template v-for="(el, inx) in item.combGoodsInfos">
            <!-- 待配+已配送不要 -->
            <!--:sended="el.deliveryQty"
            :sending="el.residueQty"-->
            <h-GoodsMsg
              :key="inx"
              :img="el.imageUrl[0]"
              :name="el.name"
              :desc="el.goodsConf"
              :num="el.qty"
              :price="el.unitPrice"
              :startTime="el.deliveryStartDate"
              :endTime="el.deliveryEndDate"
              :rule="calcRule(item, el)"
              :isShopOrder="isShopOrder"
              :status="item.status"
              @tap="() => goToGoodsDetail(item)"
            ></h-GoodsMsg>
          </template>
        </view>
      </view>
      <view></view>
    </view>
  </view>
</template>

<script>
import {combGoods, orderStatus} from "@/utils/enum";
export default {
  props: {
    // refundText: {
    //   type: String,
    //   default: "",
    // },
    company: {
      type: String,
      default: "",
    },
    status: {
      //订单状态
      type: String,
      default: "",
    },
    // total: {
    //   //商品总额
    //   type: Number,
    //   default: 0,
    // },
    // coupon: {
    //   //优惠券
    //   type: Number,
    //   default: 0,
    // },
    // freight: {
    //   //运费
    //   type: Number,
    //   default: 0,
    // },
    // marketing: {
    //   //满减优惠
    //   type: Number,
    //   default: 0,
    // },
    // pay: {
    //   //实付金额
    //   type: Number,
    //   default: 0,
    // },
    msg: {
      //商品信息
      type: Array,
      default: [],
    },
    isShopOrder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      urls: "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/store.png",
      combGoods,
      orderStatus,
    };
  },
  computed: {
    // 主商品item
    mainGoods() {
      let obj = {};
      console.log(this.msg, "this.msg");
      for (let i = 0; i < this.msg.length; i++) {
        if (!this.msg[i].present) {
          obj = this.msg[i];
        }
      }
      return obj;
    },
    // htotal() {
    //   //总金额
    //   return this.noformatAmount(this.total).split(".");
    // },
    // hcoupon() {
    //   //优惠券
    //   return this.noformatAmount(this.coupon).split(".");
    // },
    // hfreight() {
    //   //运费
    //   return this.noformatAmount(this.freight).split(".");
    // },
    // hmarketing() {
    //   //满减
    //   return this.noformatAmount(this.marketing).split(".");
    // },
    // hpay() {
    //   //实付
    //   return this.noformatAmount(this.pay).split(".");
    // },
  },
  methods: {
    // 起送时间
    calcTime(start, end) {
      return `${start.replaceAll("/", ".")}-${end.replaceAll("/", ".")}`;
    },
    // 配送规律
    calcRule(item, el) {
      // if(item.comb === combGoods.ITEM_PRODUCT){
      //   return el.deliveryRule}
      const {ruleName, deliveryTimeSectionName} = item;
      let obj = {
        name: ruleName,
        deliveryTime: deliveryTimeSectionName,
      };
      if (el) {
        obj.everyNum = `${el.everyNum}${el.unitName}`;
      } else {
        obj.everyNum = `${item.everyNum}${item.unitName}`;
      }
      return obj;
    },
    goCanlendar(item, combItem) {
      console.log("item", item);
      let obj = {};
      obj.channelSkuCode = item.goodsCode;
      obj.itemNo = item.itemNo;
      obj.orderNo = item.orderNo;
      console.log(item.comb === combGoods.ITEM_PRODUCT, "====>");
      item.comb === combGoods.ITEM_PRODUCT
        ? (obj.skuCode = combItem.skuCode)
        : (obj.skuCode = item.skuCode);
      console.log(obj, "组件传递参数");
      this.$emit("checkCanlendar", obj);
    },
    goToGoodsDetail(item) {
      if (this.isShopOrder) {
        this.$emit("goToGoodsDetail", item);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.detail-out {
  background: #ffffff;
  padding: 24rpx;
  padding-bottom: 8rpx;
  border-radius: 24rpx;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  // margin-bottom: 16rpx;
  // fc05
  .combo-tips {
    // margin-top: 16rpx;
    margin: 16rpx 0;
    font-size: 24rpx;
    color: #db9918;
    .refund-text-actions {
      border-radius: 76rpx 76rpx 76rpx 76rpx;
      height: 60rpx;
      width: 152rpx;
      border: 1rpx solid #1d9bdc;
      font-size: 26rpx;
      color: #1d9bdc;
      line-height: 60rpx;
      text-align: center;
      align-items: flex-end;
    }
  }
  // fc05
  .comb-goods-info {
    padding-top: 16rpx;
    border-top: 2rpx dashed #f1f1f1;
  }
  .icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 4rpx;
    border: none;
  }
  .company {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
  }
  //商品信息
  .goods {
    margin-top: 24rpx;
    .goods-main {
      border-bottom: 2rpx dashed #f4f4f4;
      padding-bottom: 24rpx;
    }
    .goods-img {
      width: 136rpx;
      height: 136rpx;
      background: #f3f3f3;
      border-radius: 16rpx;
      margin-right: 24rpx;
    }
    .goods-name {
      font-weight: bold;
      font-size: 28rpx;
    }
    .goods-size {
      font-size: 24rpx;
      color: #999999;
    }
    //赠品
    .goods-gift {
      padding: 24rpx 0 0 40rpx;
      .gift {
        position: relative;
        .gift-img {
          @extend .goods-img;
          width: 96rpx;
          height: 96rpx;
        }
        .fake {
          position: absolute;
          top: 0;
          background: #ffcd5f;
          color: #333333;
          font-size: 22rpx;
          padding: 0 8rpx;
          border-top-left-radius: 16rpx;
          border-bottom-right-radius: 16rpx;
        }
      }

      .gift-name {
        @extend .goods-name;
        font-size: 26rpx;
      }
    }
    //组合商品
    .combo {
      margin: 24rpx 0;
      .combo-goods {
        color: #666666;
        font-size: 24rpx;
        margin-bottom: 16rpx;
        &:last-child {
          margin: 0;
        }
      }
    }
    //配送日历
    .rili {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
    .pay-btn-detail {
      // text-align: right;
      // display: flex;
      // justify-content: flex-end;
      // flex: 1;
      // width: 100%;
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
    // 配送计划
    .plan {
      background: #f5f5f5;
      padding: 16rpx;
      margin-bottom: 24rpx;
      color: #666666;
      font-size: 24rpx;
      border-radius: 8rpx;
      view {
        margin-bottom: 16rpx;
        &:last-child {
          margin: 0;
        }
      }
    }
    //商品详情
    // .goods-money {
    //   font-size: 24rpx;
    //   color: #666666;
    //   view {
    //     margin-bottom: 16rpx;
    //     &:last-child {
    //       margin: 0;
    //     }
    //   }
    //   .money-1,
    //   .money-2 {
    //     font-weight: bold;
    //     font-size: 28rpx;
    //     color: #333333;
    //     .money-icon {
    //       font-size: 26rpx;
    //     }
    //     .money-first {
    //       font-size: 32rpx;
    //     }
    //     .money-next {
    //       font-size: 26rpx;
    //     }
    //   }
    //   .money-2 {
    //     color: #f86c4d;
    //   }
    // }
  }
}
.goods-item{
padding-bottom:16rpx
}
</style>
