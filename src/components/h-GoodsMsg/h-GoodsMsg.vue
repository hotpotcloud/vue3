<template>
  <!-- 商品信息 -->
  <view :style="{ color: colorFont }">
    <view class="goods-out d-flex d-sb">
      <view class="goods-left">
        <text :class="[colorFont && 'marskcolor']"></text>
        <view v-if="tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER">
          <text v-if="present" class="goods-icon-1">赠品</text>
          <text v-else class="goods-icon-3">奶卡</text>
        </view>
        <view v-else>
          <text v-if="present" class="goods-icon-1">赠品</text>
          <text
            v-else-if="comb === combGoods.ITEM_PRODUCT && !present"
            class="goods-icon-2"
            >组合</text
          >
        </view>
        <img :src="getAssetImgUrl(img)" alt class="goods-img-item" />
        <view class="tips" v-if="isShopOrder && getShowStock() > 0"
          >仅剩{{ isShowStock }}件</view
        >
        <image
          v-if="status === 'REFUNDED'"
          class="refund-status"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/refund.png"
          mode="scaleToFill"
        />
        <view
          class="tips"
          v-if="isShopOrder && getShowStock() === 0 && remainStock.length > 0"
          >库存不足</view
        >
      </view>
      <!-- 右侧商品 -->
      <view class="goods-right flex-1">
        <!-- 商品名+价格 -->
        <view class="d-flex d-sb">
          <view
            class="goods-name h-overflow-8-2 flex-1"
            :style="{ color: colorFont }"
          >
            <text v-if="milkName" class="main-font-b">{{ milkName }}</text>
            <text v-else>{{ name }}</text>
          </view>
          <view class="price" v-if="isShowPrice">
            <text v-if="price" :style="{ color: colorFont }">
              <text class="price-icon">￥</text>
              {{ noformatAmount(price) }}
            </text>
          </view>
          <!-- <view class="price" v-if="showShopGoodsItemPrice">
            <text v-if="price" :style="{color: colorFont}">
              <text class="price-icon">￥</text>
              {{ noformatAmount(shopGoodsItemPrice.unitDiscountPrice) }}
            </text>
            <view class="coupon-price">
              <text class="price-icon">￥</text>
              {{ noformatAmount(shopGoodsItemPrice.unitPrice) }}
            </view>
          </view> -->
        </view>
        <view v-if="milkName" class="milk-card-goods-name">{{ name }}</view>

        <!-- 规格+数量 -->
        <view class="d-flex-center d-sb color-99 goods-speci">
          <view class="flex-1 d-flex-center">
            <text class="h-over-1" :style="{ color: colorFont }">{{
              desc ? desc : ""
            }}</text>
            <text class="goods-num-milk" v-if="milkGoodsNum">
              ,{{ milkGoodsNum }}
              <text
                v-if="
                  tagType &&
                  tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                "
                >份</text
              >
              <text v-else-if="milkSpecs">{{ milkSpecs }}</text>
            </text>
          </view>
          <text
            class="h-over-1 marginleft8"
            v-if="num"
            :style="{ color: colorFont }"
            >x{{ num }}</text
          >
        </view>

        <!-- 配送规律 -->
        <!-- <view
          class="goods-rule d-flex d-sb marign-bot-16"
          v-if="rule.name && !isShopOrder"
        >
          <view class="color-99">配送规律：</view>
          <view class="rule-right flex-1">
            <text>{{ rule.name }}</text>
            <text class="rule-center">{{ rule.deliveryTime }}</text>
            <text>每次送{{ rule.everyNum }}</text>
          </view>
        </view>-->

        <!-- 配送周期 -->
        <view v-if="slotTime">
          <slot name="sendTime"></slot>
        </view>
        <view v-else>
          <view class="marign-bot-16 d-flex d-sb" v-if="startTime && endTime">
            <view class="color-99">配送时间：</view>
            <view class="sub-color">
              {{ startTime.replaceAll("/", ".") }}-{{
                endTime.replaceAll("/", ".")
              }}
            </view>
          </view>
          <view class="goods-rule marign-bot-16" v-if="rule.name">
            <view class="rule-right">
              <text>{{ rule.name }}</text>
              <text class="rule-center">|</text>
              <text>{{ rule.deliveryTime }}</text>
              <text class="rule-center">|</text>
              <text>每次送{{ rule.everyNum }}</text>
            </view>
          </view>
        </view>

        <!-- 待配送-已配送 -->
        <view
          class="marign-bot-16 d-flex-center d-sb goods-send"
          v-if="(sending || sended) && !isShopOrder"
        >
          <view>待配送：{{ sending ? sending : "0" }}</view>
          <view>已配送：{{ sended ? sended : "0" }}</view>
        </view>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
import { combGoods, OrderTagTypeEnum, orderStatus } from "@/utils/enum";
export default {
  props: {
    slotTime: {
      //是否使用插槽时间
      default: false,
      type: Boolean,
    },
    present: {
      //是否赠品
      type: Boolean,
      default: false,
    },
    comb: {
      //是否是组合商品：SPU_PRODUCT-否，ITEM_PRODUCT-是
      type: Boolean,
      default: false,
    },
    img: {
      //商品图
      type: String | null,
      default: "no-goods.png",
    },
    name: {
      //商品名
      type: String,
      default: "",
    },
    price: {
      //商品价
      type: String | Number,
      default: 0,
    },
    desc: {
      //规格
      type: String | undefined,
      default: "",
    },
    num: {
      //数量
      type: String | Number,
      default: 0,
    },
    startTime: {
      //起送时间
      type: String | undefined,
      default: "",
    },
    endTime: {
      //配送结束
      type: String | undefined,
      default: "",
    },
    rule: {
      //配送规律
      type: Object,
      default: () => {},
    },
    sending: {
      //待配送
      type: String | Number,
      default: 0,
    },
    sended: {
      //已配送
      type: String | Number,
      default: 0,
    },
    colorFont: {
      //颜色
      type: String | undefined,
      default: "",
    },
    picked: {
      // 是否提货
      type: String,
      default: "",
    },
    pickTime: {
      // 可提货提货时间
      type: String,
      default: "",
    },
    pickedTime: {
      // 提货时间
      type: String,
      default: "",
    },
    // fc0006奶卡-订单列表参数
    milkSpecs: {
      //单位
      type: String,
      default: "份",
    },
    milkGoodsNum: {
      //奶卡商品数量
      type: String | Number,
      default: 0,
    },
    milkName: {
      //奶卡商品名
      type: String,
      default: "",
    },
    tagType: {
      //奶卡枚举
      type: String,
      default: "",
    },
    isShowPrice: {
      //是否显示价格
      type: Boolean,
      default: true,
    },
    //是否是门店订单
    isShopOrder: {
      type: Boolean,
      default: false,
    },
    // 校验库存
    remainStock: {
      type: Array,
      default: () => [],
    },
    // 商品code
    goodsCode: {
      type: String,
      default: "",
    },
    // //是否显示门店优惠折扣价
    // showShopGoodsItemPrice: {
    //   type: Boolean,
    //   default: false,
    // },
    // shopGoodsItemPrice: {
    //   unitDiscountPrice: {
    //     type: String | Number,
    //     default: 0,
    //   },
    //   unitPrice: {
    //     type: String | Number,
    //     default: 0,
    //   },
    // },
    status: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      orderStatus,
      combGoods,
      OrderTagTypeEnum,
      isShowStock: 0,
    };
  },
  methods: {
    getShowStock() {
      const item = this.remainStock.find(
        (stock) => stock.channelSkuCode === this.goodsCode
      );
      if (item) {
        // 拿接口返回的库存
        this.isShowStock = item.remainStock;
      } else {
        // 库存充足的情况
        this.isShowStock = -1;
      }
      return this.isShowStock;
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-out {
  width: 100%;
  background: #fff;
  .goods-img-item {
    width: 136rpx;
    height: 136rpx;
    border-radius: 16rpx;
    border: 1rpx solid #f3f3f3;
    overflow: hidden;
  }
  .goods-left {
    position: relative;
    .goods-icon-1,
    .goods-icon-2,
    .goods-icon-3 {
      position: absolute;
      top: 0;
      left: 0;
      vertical-align: middle;
      padding: 0 8rpx;
      border-radius: 16rpx 0rpx 16rpx 0rpx;
      font-size: 22rpx;
      z-index: 100;
      line-height: 30rpx;
    }
    .goods-icon-3 {
      background: #f86c4d;
      color: #ffffff;
    }
    .goods-icon-1 {
      color: #000000;
      background: #ffcd5f;
    }
    .goods-icon-2 {
      color: #1d9bdc;
      background: #e4f4ff;
    }
  }
  .marskcolor {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #999;
    opacity: 0.3;
    z-index: 99;
    border-radius: 16rpx;
  }
  .goods-right {
    // background: #0f0;
    margin-left: 16rpx;
  }
  .milk-card-goods-name {
    @extend .goods-name;
    margin: 16rpx 0;
  }
  .goods-name {
    font-size: 28rpx;
    color: #000000;
    // background: #f00;
    // margin-right: 16rpx;
  }

  .price {
    margin-left: 16rpx;
    text-align: right;
    min-width: 110rpx;
    // background: #0b65c5;
    color: #333333;
    font-size: 32rpx;
    font-weight: bold;
    .price-icon {
      font-size: 22rpx;
    }
  }
  .goods-speci {
    margin: 16rpx 0;
  }
  .goods-rule {
    color: #666666;
    .rule-right {
      margin-left: 32rpx;
      text-align: right;
    }
    // .rule-center {
    //   padding: 0 8rpx;
    //   margin: 0 8rpx;
    //   // border-left: 2rpx solid #666666;
    //   // border-right: 2rpx solid #666666;
    // }
  }
  .rule-right {
    color: #666666;
    margin-left: 32rpx;
    text-align: right;
  }
  .rule-center {
    // padding: 0 8rpx;
    margin: 0 8rpx;
  }
  .goods-send {
    font-size: 24rpx;
    width: 100%;
    color: #666666;
    background: #f5f5f5;
    padding: 16rpx;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
  }
  .marign-bot-16 {
    margin-bottom: 16rpx;
  }
}

.marginleft8 {
  margin-left: 8rpx;
}
.goods-num-milk {
  min-width: 88rpx;
  flex: 1;
  white-space: nowrap;
}
.tips {
  position: absolute;
  bottom: 0rpx;
  left: 0rpx;
  width: 136rpx;
  height: 34rpx;
  background: #ffe7b4;
  text-align: center;
  font-size: 22rpx;
  font-weight: 500;
  color: #db9918;
  line-height: 34rpx;
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
}
.coupon-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #999999;
  text-decoration: line-through;
}
.refund-status {
  width: 136rpx;
  height: 136rpx;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
