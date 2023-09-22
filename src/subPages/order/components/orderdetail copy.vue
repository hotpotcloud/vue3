<template>
  <view class="detail-out">
    <!-- 公司店铺 -->
    <view class="d-flex-center">
      <img class="icon" :src="urls" alt="" />
      <view class="company">{{ company }}</view>
    </view>
    <!-- 商品信息 -->
    <view class="goods">
      <view v-for="(item, index) in msg" :key="index">
        <!-- 主商品 -->
        <view class="d-flex goods-main" v-if="!item.present">
          <img class="goods-img" :src="item.goodsImgUrl" alt="" />
          <view class="d-flex-colum d-sb flex-1">
            <view class="goods-name h-overflow-8-2"
              ><text class="spike-tag" v-if="item.secKill"> 秒杀 </text>
              {{ item.goodsName }}</view
            >
            <view class="goods-size d-flex-center d-sb">
              <view
                ><text v-if="item.goodsConf">规格：{{ item.goodsConf }}</text>
              </view>
              <text>x{{ item.qty }}</text>
            </view>
          </view>
        </view>
        <!-- 赠品 -->
        <view class="goods-gift d-flex" v-else>
          <view class="gift">
            <img class="gift-img" :src="item.goodsImgUrl" alt="" />
            <view class="fake">赠品</view>
          </view>
          <view class="d-flex-colum d-sb flex-1">
            <view class="gift-name h-overflow-8-2">{{ item.goodsName }}</view>
            <view class="goods-size d-flex-center"
              ><text>数量：</text>
              <text>x{{ item.totalQty }}</text></view
            >
          </view>
        </view>
        <!-- 组合商品 -->
        <view
          class="combo"
          v-if="!item.present && item.comb === combGoods.ITEM_PRODUCT"
        >
          <view
            v-for="(el, idx) in item.combGoodsInfos"
            :key="idx"
            class="combo-goods"
          >
            <view class="d-flex-center d-sb">
              <view class="h-over-1" style="margin-right: 16rpx">{{
                el.name
              }}</view>
              <text>x{{ el.qty }}</text>
            </view>
            <view
              class="rili"
              v-if="status === orderStatus.DELIVERING"
              @click="goCanlendar(item, el)"
            >
              <view class="pay-btn-detail" style="margin-top: 12rpx"
                >配送日历</view
              >
            </view>
          </view>
        </view>
        <!-- 配送计划  判断是否有规则  三方订单rule-->
        <view class="plan" v-if="item.rule && index === msg.length - 1">
          <view>
            <text>{{ item.ruleName }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ "" }}</text>
            <text
              >{{ item.deliveryTimeSectionName }}&nbsp;&nbsp;|&nbsp;&nbsp;{{
                ""
              }}</text
            >
            <text>每次{{ item.everyNum }}{{ item.unitName }}</text>
          </view>
          <view
            >起送日期：<text>{{ item.deliveryStartDate }}</text></view
          >
          <view
            >配送周期：<text
              >{{ item.deliveryStartDate }}-{{ item.deliveryEndDate }}</text
            ></view
          >
        </view>
      </view>
      <!-- 商品详情 -->
      <view class="goods-money">
        <view>
          <view class="d-flex-center d-sb">
            <text
              >{{
                status === orderStatus.WAIT_PAYMENT ||
                status === orderStatus.CANCELED
                  ? "应付"
                  : "实付"
              }}金额</text
            >
            <text class="money-2">
              <text class="money-icon">￥</text>
              <text class="money-first">{{ hpay[0] }}</text>
              <text class="money-next">.{{ hpay[1] }}</text>
            </text>
          </view>
          <view class="rili">
            <view
              class="pay-btn-detail"
              v-if="
                mainGoods.comb === combGoods.SPU_PRODUCT &&
                status === orderStatus.DELIVERING
              "
              @click="goCanlendar(mainGoods)"
              >配送日历</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { combGoods, orderStatus } from "@/utils/enum";

export default {
  props: {
    company: {
      type: String,
      default: "",
    },
    status: {
      //订单状态
      type: String,
      default: "",
    },
    total: {
      //商品总额
      type: Number,
      default: 0,
    },
    coupon: {
      //优惠券
      type: Number,
      default: 0,
    },
    freight: {
      //运费
      type: Number,
      default: 0,
    },
    marketing: {
      //满减优惠
      type: Number,
      default: 0,
    },
    pay: {
      //实付金额
      type: Number,
      default: 0,
    },
    msg: {
      //商品信息
      type: Array,
      default: [],
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
      for (let i = 0; i < this.msg.length; i++) {
        if (!this.msg[i].present) {
          obj = this.msg[i];
        }
      }
      return obj;
    },
    htotal() {
      //总金额
      return this.noformatAmount(this.total).split(".");
    },
    hcoupon() {
      //优惠券
      return this.noformatAmount(this.coupon).split(".");
    },
    hfreight() {
      //运费
      return this.noformatAmount(this.freight).split(".");
    },
    hmarketing() {
      //满减
      return this.noformatAmount(this.marketing).split(".");
    },
    hpay() {
      //实付
      return this.noformatAmount(this.pay).split(".");
    },
  },
  methods: {
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
  },
};
</script>

<style scoped lang="scss">
.detail-out {
  background: #ffffff;
  padding: 24rpx 32rpx;
  border-radius: 24rpx;
  margin-bottom: 24rpx;
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
    .goods-money {
      font-size: 24rpx;
      color: #666666;
      view {
        margin-bottom: 16rpx;
        &:last-child {
          margin: 0;
        }
      }
      .money-1,
      .money-2 {
        font-weight: bold;
        font-size: 28rpx;
        color: #333333;
        .money-icon {
          font-size: 26rpx;
        }
        .money-first {
          font-size: 32rpx;
        }
        .money-next {
          font-size: 26rpx;
        }
      }
      .money-2 {
        color: #f86c4d;
      }
    }
  }
}
</style>
