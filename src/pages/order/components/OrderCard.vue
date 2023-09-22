<template>
  <view>
    <view class="card">
      <view class="card-title" @click="goDetail(item)">
        <!-- 平台+公司名 -->
        <text class="card-title-text flex-1">
          <text class="source-name">{{ item.platformSourceName }}</text>
          {{ item.companyName }}
        </text>

        <text
          :class="
            item.status === orderStatus.WAIT_PAYMENT
              ? 'card-title-status-err'
              : item.status === orderStatus.DELIVERING ||
                item.status === orderStatus.WAIT_DELIVERY
              ? 'card-title-status-suc'
              : 'card-title-status'
          "
        >
          {{ getText(item.status) }}
          <!-- {{ orderStatusText[item.status] }} -->
          <!-- {{ item.statusName }} -->
        </text>
      </view>

      <!-- 商品信息 -->
      <view
        v-for="goods in item.items"
        :key="goods.goodsCode"
        @click="goDetail(item)"
      >
        <!-- 单商品 -->
        <!-- <div class="card-body-list-item" v-if="!goods.combo"> -->
        <div class="card-body-list-item">
          <h-GoodsMsg
            :present="goods.present"
            :img="goods.goodsImgUrl"
            :name="goods.goodsName"
            :price="goods.unitPrice"
            :desc="goods.goodsConf"
            :num="goods.qty"
            :picked="item.status"
            :pickTime="item.takeTimeFormatter"
            :pickedTime="item.takeRealTime"
            :milkName="goods.milkCardName"
            :milkGoodsNum="goods.num"
            :milkSpecs="goods.specs"
            :tagType="item.tagType"
          />
        </div>
        <!-- 组合商品 -->
        <template
          v-if="
            goods.combGoodsInfos.length && goods.comb === combGoods.ITEM_PRODUCT
          "
        >
          <view class="card-item-combo">
            <view
              class="item-comb d-flex-center d-sb"
              v-for="(el, index) in goods.combGoodsInfos"
              :key="index"
            >
              <text class="color-33 h-over-1 flex-1">{{ el.name }}</text>
              <text class="color-99 margin-28">x {{ el.qty }}</text>
            </view>
          </view>
        </template>
      </view>
      <!-- 自提时间 -->
      <view
        v-if="item.takeTimeFormatter"
        :class="[
          'pick-time',
          item.status === orderStatus.FINISH ? 'picked-color' : 'pick-color',
        ]"
      >
        自提时间:{{
          item.status === orderStatus.FINISH
            ? item.takeRealTime
            : item.takeTimeFormatter
        }}
      </view>
      <!-- 支付时间 -->
      <view class="pay-time d-flex-center d-sb">
        <view v-if="activeType !== pickType.PICK.value"
          >下单时间：{{ item.orderTime.replaceAll("-", "/") }}</view
        >
        <view v-else></view>
        <view class="font-26-33">
          <text class="font-26-6">
            {{ item.status === orderStatus.WAIT_PAYMENT ? "应付：" : "实付：" }}
          </text>
          <text class="fc05-money">{{ item.payAmount | formatAmount }}</text>
        </view>
      </view>

      <view class="card-footer d-flex-row-end">
        <view
          class="footer-btn d-flex-center"
          @click="goPay(item.orderNo)"
          v-if="
            item.status === orderStatus.WAIT_PAYMENT &&
            item.type === orderTypeEnum.TWO
          "
        >
          去支付
          <view
            class="count-down"
            v-if="
              item.status === orderStatus.WAIT_PAYMENT &&
              item.countTime > 0 &&
              item.type === orderTypeEnum.TWO
            "
          >
            <u-count-down
              @finish="finish"
              :time="item.countTime"
              format="mm:ss"
              @change="onChange"
            >
              <view>
                <text v-if="timeData.hours">
                  {{
                    timeData.hours > 10 ? timeData.hours : "0" + timeData.hours
                  }}
                  :
                </text>
                <text>
                  {{
                    timeData.minutes > 10
                      ? timeData.minutes
                      : "0" + timeData.minutes
                  }}
                </text>
                <text>:</text>
                <text>
                  {{
                    timeData.seconds > 10
                      ? timeData.seconds
                      : "0" + timeData.seconds
                  }}
                </text>
              </view>
            </u-count-down>
          </view>
        </view>
        <view
          class="send-btn-again"
          v-if="isAgainOrder(item)"
          style="margin-right: 16rpx"
          @click="shopAgin(item.items)"
          >再次购买</view
        >
        <view
          v-if="item.status === orderStatus.DELIVERING && item.type === 2"
          class="send-btn"
          @tap="toNewCalendar"
          >配送日历</view
        >
        <!-- 申请售后or售后详情 -->
        <!-- <view
          v-show="item.refundTextName && activeType === pickType.PICK.value"
          class="footer-btn"
          @tap="applyRefund(item)"
          >{{ handleRefundTextName(item) }}</view
        >-->
        <!-- <view
            class="footer-btn"
            @click="tosendinfo(item)"
            v-if="
              item.deliverType &&
              (item.deliverType === deliverTypeEnum.EXPRESS_DELIVERY ||
                item.deliverType === deliverTypeEnum.MILK_AND_EXPRESS_DELIVERY)
            "
          >
            查看物流</view
        >-->
        <view
          class="btn-color btn-blue"
          @tap="showQRCode"
          v-if="
            activeType === pickType.PICK.value &&
            item.status === orderStatus.WAIT_DELIVERY
          "
          >提货码</view
        >
      </view>
    </view>
    <!-- && && activeType===pickType.PICK.value && item.status === orderStatus.WAIT_DELIVERY -->
    <view class="mask" v-if="showMask">
      <view class="box">
        <view class="bar-code"
          ><image :src="takeNumBarCodeBase64"></image
        ></view>
        <view class="qr-code"><image :src="pickCode"></image></view>
        <view class="code-number">核销码：{{ takeNum }}</view>
      </view>
      <!-- <view class="mask-tittle"></view>
      <view class="code-bg">
        <view class="pick-code-bg">
          <image class="pick-code" :src="pickCode" mode="scaleToFill" />
        </view>
      </view>
      <view class="mask-pick-no">{{ takeNum }}</view> -->
      <image
        @tap="closeMask"
        class="mask-close-icon"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/close.png"
        mode="scaleToFill"
      />
    </view>
    <!-- 再次购买弹窗 -->
    <hGoodsModal
      :open="open"
      :goodsList="item.items"
      @closeGoodsModal="onClose()"
      @goGoodsDetail="goGoodsDetail()"
    />
  </view>
</template>

<script>
import hGoodsModal from "@/components/h-goods-modal/h-goods-modal.vue";
import { order } from "@/utils/url";
import api from "@/utils/api";
import {
  combGoods,
  orderStatus,
  orderStatusText,
  refundStatus,
  ordersType,
  orderTypeEnum,
  pickType,
  ORDER_TYPE_ENUM,
  ORDER_AGIN_TYPE_ENUM,
  OrderTagTypeEnum,
} from "@/utils/enum";

export default {
  components: {
    hGoodsModal,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    activeType: {
      type: String,
      default: "",
    },

    pickCode: {
      type: String,
      default: "",
    },
    takeNum: {
      type: String,
      default: "",
    },
    takeNumBarCodeBase64: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      ORDER_TYPE_ENUM,
      ORDER_AGIN_TYPE_ENUM,
      combGoods,
      orderStatus,
      orderStatusText,
      refundStatus,
      ordersType,
      orderTypeEnum,
      pickType,
      timeData: null,
      showMask: false,
      open: false,
      OrderTagTypeEnum,
    };
  },
  computed: {
    /* 已完成-配送中订单显示再来一单（普通订单） */
    isAgainOrder() {
      return (item) => {
        // 奶卡订单不显示再次购买
        if (
          [
            OrderTagTypeEnum.VIRTUALLY_MILK_CARD_EXCHANGE_ORDER,
            OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER,
          ].includes(item.tagType)
        ) {
          return false;
        }
        return (
          (item.status === orderStatus.DELIVERING ||
            item.status === orderStatus.FINISH) &&
          item.type === 2 &&
          item.platformSourceCode === ORDER_TYPE_ENUM.XHJ.value &&
          item.tagType !== OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
          // item.platformSourceCode !== ORDER_TYPE_ENUM.XHJMD.value &&
          // item.platformSourceCode ===
          //   ORDER_AGIN_TYPE_ENUM[item.platformSourceCode].value &&
          // item.tagType === null
        );
      };
    },
  },

  methods: {
    onClose() {
      this.open = false;
    },
    goGoodsDetail(spuCode) {
      const isShelf = this.checkGoodsStatus(spuCode);
      isShelf &&
        uni.navigateTo({
          url: `/subPages/product/proDetail?id=${spuCode}`,
        });
    },

    async checkGoodsStatus(spuCode) {
      try {
        const { data } = await api.$get(
          order.checkProductStatus + `/${spuCode}`
        );
        if (data) {
          return data;
        } else {
          return uni.showToast({
            title: "商品已下架",
            icon: "none",
          });
        }
      } catch (error) {}
    },
    async shopAgin(goods) {
      try {
        const arr = goods.find((el) => {
          return !el.present;
        });
        // this.open = true;
        if (arr) {
          this.open = true;
        } else {
          const isShelf = await this.checkGoodsStatus(goods[0].spuCode);
          console.log(isShelf, "商品是否下架");
          isShelf &&
            uni.navigateTo({
              url: `/subPages/product/proDetail?id=${goods[0].spuCode}`,
            });
        }
      } catch (error) {}
    },
    finish() {
      this.$emit("finish");
    },
    goPay(orderNo) {
      this.$emit("goPay", orderNo);
    },
    tosendinfo(item) {
      this.$emit("tosendinfo", item);
    },
    goDetail(item) {
      console.log("item", item);
      this.$emit("goDetail", item);
    },
    applyRefund(item) {
      this.$emit("applyRefund", item);
    },
    onChange(e) {
      // console.log("e", e);
      this.timeData = e;
    },
    // 是否提交售后申请
    retuSaleText(saleStatus) {
      if (saleStatus == refundStatus.UN_SUBMIT) {
        //未提交申请
        return "申请售后";
      } else {
        //提交过申请
        return "售后详情";
      }
    },
    // 处理售后文字
    handleRefundTextName(item) {
      const { orderType, status, saleStatus, type } = item;
      if (type === orderTypeEnum.ONE) return "";
      const objFn = {
        //待支付
        WAIT_PAYMENT: () => {
          return "";
        },
        //待配送
        WAIT_DELIVERY: () => {
          return this.retuSaleText(saleStatus);
        },
        //配送中
        DELIVERING: () => {
          return this.retuSaleText(saleStatus);
        },
        // 已完成
        FINISH: () => {
          // 已完成且零购
          if (orderType === ordersType.RETAIL_PURCHASE) {
            return this.retuSaleText(saleStatus);
          } else return "";
        },
        //已关闭
        CANCELED: () => {
          return "";
        },
      };
      return objFn[status]();
    },
    // fc05
    // 配送日历
    toNewCalendar() {
      this.$emit("toNewCalendar", this.item);
    },
    // 查看提货码
    showQRCode() {
      this.showMask = true;
      this.$emit("showQRCode", this.item);
    },
    // 关闭提货码弹窗
    closeMask() {
      this.showMask = false;
    },
    getText(status) {
      switch (status) {
        case orderStatus.WAIT_DELIVERY:
          return this.activeType === pickType.PICK.value
            ? orderStatusText.WAIT_PICK
            : orderStatusText[status];
        case orderStatus.FINISH:
          return this.activeType === pickType.PICK.value
            ? orderStatusText.PICKED
            : orderStatusText[status];
        default:
          return orderStatusText[status];
      }
      //  activeType===activeType===pickType.PICK.value && item.status===orderStatus.WAIT_DELIVERY?'待自提':orderStatusText[item.status]
    },
  },
};
</script>

<style scoped lang="scss">
// 卡片样式
.card {
  padding: 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  margin-bottom: 16rpx;
  .card-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24rpx;

    .card-title-text {
      font-size: 26rpx;
      font-weight: 400;
      color: #666666;
      .source-name {
        padding-right: 16rpx;
        margin-right: 16rpx;
        position: relative;
        &:after {
          content: "";
          display: inline-block;
          width: 4rpx;
          height: 24rpx;
          position: absolute;
          right: 0;
          top: 6rpx;
          background: #c7c7c7;
        }
      }
    }
    .card-title-status {
      font-size: 24rpx;
      color: #999999;
    }
    .card-title-status-err {
      @extend .card-title-status;
      color: #f86c4d;
    }
    .card-title-status-suc {
      @extend .card-title-status;
      color: #1d9bdc;
    }
  }
  // 商品信息
  .card-body-list-item {
    padding-bottom: 16rpx;
    margin-bottom: 16rpx;
    border-bottom: 2rpx dashed #f4f4f4;
  }
  // 组合商品
  .card-item-combo {
    margin-bottom: 16rpx;
    border-bottom: 2rpx dashed #f4f4f4;
  }
  .item-comb {
    padding-left: 152rpx; //136+16rpx
    margin-bottom: 16rpx;
    .margin-28 {
      margin-left: 28rpx;
    }
  }
  .pay-time {
    font-size: 24rpx;
    color: #999999;
  }
  .fc05-money {
    color: #333333;
    font-weight: bold;
  }
  .card-footer {
    margin-top: 24rpx;

    .footer-btn {
      justify-content: center;
      border-radius: 76rpx 76rpx 76rpx 76rpx;
      border: 1rpx solid #1d9bdc;
      background: #1d9bdc;
      height: 60rpx;
      width: 196rpx;
      color: #ffffff !important;
    }
  }
  ::v-deep .count-down {
    color: #ffffff !important;
    .u-count-down {
      &.u-count-down__text {
        color: #ffffff;
        font-size: 26rpx;
      }
    }
  }

  .send-btn {
    width: 152rpx;
    height: 60rpx;
    border-radius: 76rpx 76rpx 76rpx 76rpx;
    border: 1rpx solid #1d9bdc;
    font-size: 26rpx;
    color: #1d9bdc;
    text-align: center;
    line-height: 60rpx;
  }
  .send-btn-again {
    @extend .send-btn;
    margin-right: 16rpx;
    background: #1d9bdc;
    color: #fff;
  }
  .count-down {
    .u-count-down__text {
      color: #ffffff !important;
    }
  }
}
.btn-color {
  width: 152rpx;
  height: 60rpx;
  border-radius: 76rpx 76rpx 76rpx 76rpx;
  font-size: 26rpx;
  margin-left: 16rpx;
}
.btn-blue {
  border: 1rpx solid #1d9bdc;
  color: #1d9bdc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-line {
  border: 1rpx solid #c7c7c7;
  color: #666666;
}
//提货码
.mask {
  width: 750rpx;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  text-align: center;
  .box {
    margin-top: 10vh;
    width: 654rpx;
    margin-left: 48rpx;
    padding: 64rpx 48rpx;
    background: #ffffff;
    border-radius: 40rpx 40rpx 40rpx 40rpx;
    .bar-code {
      display: flex;
      justify-content: center;
      margin-bottom: 48rpx;
      padding-bottom: 32rpx;
      border: 2rpx dashed #f4f4f4;
      > image {
        width: 558rpx;
        height: 160rpx;
        display: block;
      }
    }
    .code-number {
      padding: 8rpx 16rpx;
      display: inline-block;
      background: #f1f1f1;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      margin-top: 32rpx;
      opacity: 1;
    }
    .qr-code {
      display: flex;
      justify-content: center;
      margin-top: 32rpx;
      > image {
        width: 320rpx;
        height: 320rpx;
      }
    }
  }
}
// .mask-tittle {
//   width: 100%;
//   height: 72rpx;
//   font-size: 52rpx;
// //   font-weight: bold;
// //   color: #ffffff;
// //   text-align: center;
// //   line-height: 72rpx;
// //   margin-top: 186rpx;
// //   margin-bottom: 48rpx;
// // }
// .code-bg {
//   width: 580rpx;
//   height: 580rpx;
//   background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/code_bg.png")
//     no-repeat;
//   background-size: 100% 100%;
//   background-position: center;
//   margin: 0 auto;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   .pick-code-bg {
//     width: 520rpx;
//     height: 520rpx;
//     background: #ffffff;
//     border-radius: 40rpx 40rpx 40rpx 40rpx;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .pick-code {
//       width: 338rpx;
//       height: 338rpx;
//     }
//   }
// }

// .mask-pick-no {
//   padding: 0 54rpx;
//   width: 460rpx;
//   height: 88rpx;
//   background: rgba(255, 255, 255, 0.3);
//   border-radius: 24rpx 24rpx 24rpx 24rpx;
//   margin: 0 auto;
//   margin-top: 48rpx;
//   margin-bottom: 108rpx;
//   font-size: 46rpx;
//   font-weight: bold;
//   color: #ffffff;
//   line-height: 88rpx;
//   text-align: center;
// }
.mask-close-icon {
  width: 96rpx;
  height: 96rpx;
  margin-top: 48rpx;
}
.pick-time {
  font-size: 24rpx;
  line-height: 28rpx;
  text-align: right;
  margin-bottom: 16rpx;
}
.pick-color {
  color: #db9918;
}
.picked-color {
  color: #a9a9a9;
}
</style>
