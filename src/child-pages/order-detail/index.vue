<template>
  <view class="page">
    <view class="order-wrap">
      <OrderStatus :data="cardOrderDetail" @onFinish="onFinish" />
      <view class="order-info">
        <view class="shop-name-wrap">
          <image
            class="shop-icon"
            :src="getAssetImgUrl('%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/store.png')"
          />
          <view class="shop-name">{{ cardOrderDetail.companyName }}</view>
        </view>
        <!-- 商品信息 -->
        <view class="goods-card-info">
          <GoodsCard :data="cardOrderDetail" />
        </view>
        <!-- <view class="joint-goods-desc"> 该组合包含以下商品 </view>
        <GoodsItem />
        <GoodsItem /> -->
        <view style="margin-bottom: 18rpx">
          <InfoItem
            v-if="showMore"
            label="商品总额"
            :value="noformatAmount(cardOrderDetail.totalAmount)"
            type="bold"
          />
          <InfoItem
            v-if="showMore"
            label="运费"
            :value="noformatAmount(cardOrderDetail.freightAmount)"
            type="bold"
          />
          <InfoItem
            v-if="showMore"
            label="优惠券"
            :value="noformatAmount(cardOrderDetail.couponAmount)"
            type="reduce"
          />
          <InfoItem
            v-if="showMore"
            label="满减活动"
            :value="noformatAmount(cardOrderDetail.discountAmount)"
            type="reduce"
          />
          <InfoItem
            v-if="showMore || !showMore"
            :label="
              cardOrderDetail.status === 'WAIT_PAYMENT'
                ? '应付金额'
                : '实付金额'
            "
            :value="`¥${noformatAmount(cardOrderDetail.payAmount)}`"
            type="active"
          />
          <view v-show="showMore" class="line" />
          <InfoItem
            v-if="showMore || !showMore"
            label="订单来源"
            :value="cardOrderDetail.platformSourceName"
            type="default"
          />
          <!-- <InfoItem
            v-if="showMore || !showMore"
            label="订单编号"
            :value="cardOrderDetail.orderNo"
            type="default"
            isCopy
            @onCopy="onCopy"
          /> -->
          <InfoItem
            label="平台单号"
            v-if="showMore || !showMore"
            :value="cardOrderDetail.platformOrderNo"
            type="default"
            isCopy
            @onCopy="onCopy"
          />
          <InfoItem
            label="下单时间"
            v-if="showMore"
            :value="cardOrderDetail.orderTime"
            type="default"
          />
          <InfoItem
            v-if="showMore"
            label="支付方式"
            :value="getPayType(cardOrderDetail.payType)"
            type="default"
          />
        </view>
        <view class="action-more d-flex-center d-center" @tap.stop="onMore">
          {{ showMore ? "收起" : "查看更多" }}
          <img
            :src="getAssetImgUrl('more.png')"
            alt=""
            :class="[showMore ? 'more-icon-up' : 'more-icon']"
          />
        </view>
      </view>
    </view>
    <BottomMenu
      @onPay="onPay"
      :isPay="cardOrderDetail.status === orderStatus.WAIT_PAYMENT"
      :status="cardOrderDetail.status"
      :saleStatus="cardOrderDetail.saleStatus"
      @goRefund="goRefund"
    />
  </view>
</template>
<script>
import OrderStatus from "./order-status.vue";
import GoodsCard from "./goods-card.vue";
// import GoodsItem from "./goods-item.vue";
import InfoItem from "./info-item.vue";
import BottomMenu from "./bottom-menu.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { orderStatus, orderStatusText, refundStatus } from "@/utils/enum";
import { pay } from "@/utils/url";

export default {
  computed: {
    ...mapState("milkcard", ["cardOrderDetail"]),
  },
  components: {
    OrderStatus,
    GoodsCard,
    // GoodsItem,
    InfoItem,
    BottomMenu,
  },
  data() {
    return {
      orderStatus,
      orderStatusText,
      refundStatus,
      showMore: false,
      options: {},
      disabled: false,
    };
  },
  onLoad(options) {
    this.options = options;
    console.log(this.options, "???");
    if (options.orderNo) {
      this.get_CardOrderDetail(this.options.orderNo);
    }
  },
  methods: {
    ...mapActions("milkcard", ["get_CardOrderDetail"]),
    ...mapMutations("milkcard", ["set_CardOrderDetail"]),
    ...mapMutations("refund", ["clearSelectedMilkCard"]),
    // 申请售后
    goRefund() {
      console.log("this.options", this.options);
      console.log(
        (this.cardOrderDetail.status !== orderStatus.WAIT_PAYMENT ||
          this.cardOrderDetail.status !== orderStatus.CANCELED) &&
          this.cardOrderDetail.saleStatus === refundStatus.UN_SUBMIT,
        "判断"
      );
      this.clearSelectedMilkCard();
      if (
        (this.cardOrderDetail.status !== orderStatus.WAIT_PAYMENT ||
          this.cardOrderDetail.status !== orderStatus.CANCELED) &&
        this.cardOrderDetail.saleStatus === refundStatus.UN_SUBMIT
      ) {
        uni.navigateTo({
          url: "/subPages/refund/refund?orderNo=" + this.options.orderNo,
        });
      } else {
        uni.navigateTo({
          url: "/subPages/refund/refundManage?orderNo=" + this.options.orderNo,
        });
      }
    },
    onFinish() {
      this.get_CardOrderDetail(this.options.orderNos);
    },
    getPayType(type) {
      const types = {
        0: "微信",
        1: "支付宝",
        2: "通联",
        3: "现金",
      };
      return type !== "" || type !== null || type !== undefined
        ? types[type]
        : "其他支付";
    },
    onMore() {
      this.showMore = !this.showMore;
    },
    onCopy(data) {
      console.log(data);
      uni.setClipboardData({
        data,
        showToast: false,
        success: () => {
          uni.showToast({
            icon: "none",
            title: "复制成功",
          });
        },
      });
    },
    async onPay() {
      // 支付
      try {
        if (this.disabled) return;
        this.disabled = true;
        const userInfo = uni.getStorageSync("userMsg");
        const params = {
          openId: userInfo.openId,
          appId: userInfo.appId,
          orderNo: this.cardOrderDetail.orderNo,
          payMethodType: 0,
        };
        console.log("12-->", params);
        const { data } = await this.POST(pay.wechatPay, params, "加载中");
        let provider = "";
        uni.getProvider({
          service: "payment",
          success: (res) => {
            provider = res.provider[0];
          },
        });
        uni.requestPayment({
          provider: provider,
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.packageValue,
          signType: data.signType,
          paySign: data.paySign,
          success: (res) => {
            console.log("success:" + res);
            uni.redirectTo({
              url: "/child-pages/card/payment",
            });
          },
          fail: (err) => {},
        });
      } catch (err) {
        //
      } finally {
        this.disabled = false;
      }
    },
  },
  onUnload() {
    this.set_CardOrderDetail({});
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  overflow-y: auto;
  .order-wrap {
    display: inline-block;
    margin: 16rpx 32rpx;
    padding-bottom: 120rpx;
    .order-info {
      width: 686rpx;
      height: auto;
      background: #fff;
      border-radius: 24rpx;
      padding: 24rpx;
      margin-top: 16rpx;
      .shop-name-wrap {
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
      .goods-card-info {
        margin: 24rpx 0;
      }
    }
  }
  .joint-goods-desc {
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #db9918;
    line-height: 28rpx;
    padding-bottom: 16rpx;
    border-bottom: 2rpx dashed #f1f1f1;
  }
}

.action-more {
  text-align: center;

  color: #999999;
  .more-icon-up {
    transform: rotate(180deg);
    width: 48rpx;
    height: 48rpx;
  }
  .more-icon {
    width: 48rpx;
    height: 48rpx;
  }
}
.line {
  border-bottom: 2rpx dashed #f1f1f1;
  margin: 6rpx 0 12rpx 0;
}
</style>
