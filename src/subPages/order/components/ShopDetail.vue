<template>
  <view class="order-detail">
    <u-count-down
      v-if="info.status === orderStatus.WAIT_PAYMENT"
      @finish="finish"
      format="mm:ss"
      @change="onChangeTime"
      :time="info.countTime"
    >
      <view>
        <view class="status d-flex-center">
          <image
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/wait-pay.png"
          /><view>待付款</view></view
        >
        <view class="time-tips d-flex-center"
          ><text>剩余</text>
          <!-- <view class="time-box">
            {{
              timeData.hours > 9 ? timeData.hours : "0" + timeData.hours
            }}</view
          ><text class="colon">:</text> -->
          <view class="time-box">
            {{
              timeData.minutes > 9 ? timeData.minutes : "0" + timeData.minutes
            }}</view
          ><text class="colon">:</text>
          <view class="time-box">{{
            timeData.seconds > 9 ? timeData.seconds : "0" + timeData.seconds
          }}</view
          ><text>自动关闭，请及时付款</text></view
        >
      </view></u-count-down
    >
    <view
      class="d-flex-center close-status"
      :class="getIconAndText().class"
      v-else
    >
      <image :src="getIconAndText().icon" /><view>{{
        orderStatusShopText[info.status]
      }}</view></view
    >
    <view :class="{'code-container': isShowCode, 'box-container': true}">
      <view
        :class="{'shop-info': true, box: false, 'shop-info-container': true}"
        ><view class="line d-flex d-sb d-flex-center phone">
          <view class="label">提货人：</view>
          <text>{{ handlePhone(shopOrderDetail.takePhone) }}</text> </view
        ><view
          class="line d-flex d-sb d-flex-center time"
          :class="{active: isYellow}"
          @tap="goToShopDetail"
        >
          <view class="label">提货时间：</view>
          <text>{{ shopOrderDetail.takeTimeFormatter }}</text> </view
        ><view
          class="line d-flex d-sb d-flex-center time"
          v-if="shopOrderDetail.takeRealTime"
        >
          <view class="label">实际自提时间：</view>
          <text>{{ shopOrderDetail.takeRealTime }}</text>
        </view>
        <view class="shop-box" @tap="goToShopDetail">
          <ShopItem showPhone="true" itemType="order" :item="shopDetail"
        /></view>
      </view>
      <Code
        v-if="isShowCode"
        :takeNumAll="shopOrderDetail.takeNumAll"
        :status="shopOrderDetail.takePicStatus"
        :imageData="shopOrderDetail.takeNumQrCodeBase64"
        :takeNumBarCodeBase64="shopOrderDetail.takeNumBarCodeBase64"
      />
    </view>
  </view>
</template>
<script>
import ShopItem from "@/components/shop-item";
import {order, shop} from "@/utils/url";
import {mapState} from "vuex";
import Code from "./code";
import {orderStatus, orderStatusShopText} from "@/utils/enum";
export default {
  components: {ShopItem, Code},
  props: {
    info: {
      type: Object,
      default: {},
    },
    orderNo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      disabled: true,
      type: "",
      goodsInfo: {},
      orderStatus,
      orderStatusShopText,
      timeData: {},
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("home", ["addInfoMsg"]),
    ...mapState("order", ["shopOrderDetail", "shopDetail"]),
    isShowCode() {
      return (
        this.info.status === orderStatus.WAIT_DELIVERY ||
        this.info.status === orderStatus.FINISH ||
        this.info.status === orderStatus.REFUNDED
      );
    },
    isYellow() {
      this.info.status === orderStatus.WAIT_PAYMENT ||
        this.info.status === orderStatus.WAIT_DELIVERY;
    },
  },
  mounted() {
    // this.getShopOrderDetail();
  },
  methods: {
    handlePhone(phone) {
      return phone?.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    // 倒计时结束
    finish(e) {
      this.$emit("refreshDetail");
    },
    // 倒计时变化
    onChangeTime(e) {
      this.timeData = e;
    },
    //退款详情
    goRefundDetail(afterSaleNo) {
      uni.navigateTo({
        url: `/subPages/refund/refundDetails?afterSaleNo=${afterSaleNo}`,
      });
    }, // 支付或查日历

    getIconAndText(status) {
      const url =
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/";
      const data = {
        [orderStatus.CANCELED]: {
          icon: `${url}close-icon.png`,
          class: "close-status",
        },
        [orderStatus.REFUNDED]: {
          icon: `${url}refound-icon.png`,
          class: "refound",
        },
        [orderStatus.FINISH]: {
          icon: `${url}get-icon.png`,
          class: "get-product",
        },
        [orderStatus.WAIT_DELIVERY]: {
          icon: `${url}wait-get.png`,
          class: "wait-get",
        },
      };
      return data[this.info.status];
    },
    goToShopDetail() {
      uni.navigateTo({
        url: `/shopPages/shop/index?shopConfigId=${this.shopDetail.shopConfigId}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.order-detail {
  //   padding: 24rpx;
  background: #f5f5f5;
  //   padding-bottom: 200rpx;
  .code-container {
    margin-bottom: 16rpx;
    background-size: 100% 100%;
    padding-top: 24rpx;
    background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/code-bg.png");
  }
  .box-container {
    margin-bottom: 16rpx;
    padding: 24rpx 0rpx 0rpx;
    border-radius: 24rpx;
    background-color: #fff;
    overflow: hidden;
  }
  .close-status,
  .refound,
  .get-product,
  .wait-get {
    font-size: 36rpx;
    font-weight: 500;
    color: #333333;
    line-height: 50rpx;
    margin-bottom: 24rpx;
    > image {
      width: 48rpx;
      height: 48rpx;
      margin-right: 8rpx;
    }
  }
  .refound {
    color: #f86c4d;
  }
  .get-data {
    color: #333333;
  }
  .wait-get {
    color: #1d9bdc;
  }
  .status {
    > image {
      width: 48rpx;
      height: 48rpx;
      margin-right: 8rpx;
    }
    font-size: 36rpx;
    font-weight: 500;
    color: #f86c4d;
    line-height: 50rpx;
    margin-left: 8rpx;
  }
  .time-tips {
    margin-top: 8rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    line-height: 36rpx;
    margin-bottom: 28rpx;
    .time-box {
      width: 36rpx;
      height: 36rpx;
      background: #f86c4d;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      text-align: center;
      display: inline-block;
      line-height: 36rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #ffffff;
    }
    .colon {
      color: #333333;
      margin: 0rpx 4rpx;
    }
  }
  .shop-info-container {
    padding: 0rpx 24rpx;
  }
  .shop-info {
    margin-bottom: 24rpx;
    background-color: #fff;
    .phone {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      line-height: 40rpx;
      padding-bottom: 26rpx;
      font-weight: 500;
    }
    .time {
      height: 88rpx;
      line-height: 88rpx;
      font-weight: 500;
    }
    .time.active {
      color: #db9918;
    }
    .shop-box {
      margin-top: 24rpx;
    }
  }

  .line {
    border-bottom: 2rpx solid #f4f4f4;
  }
  .box {
    background: #ffffff;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    padding: 32rpx;
  }
  .label {
    font-size: 26rpx;
    font-weight: 400;
    color: #999999;
    line-height: 36rpx;
  }
}
</style>
