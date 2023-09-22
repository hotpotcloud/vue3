<!--
 * @Date: 2022-09-07 15:48:49
 * @LastEditors: ''
 * @LastEditTime: 2022-09-19 17:45:25
 * @FilePath: \xianhuo-miniprogram\src\subPages\order\sendinfo.vue
-->
<template>
  <view class="send-out">
    <!-- 物流 -->
    <view class="send">
      <Send :proName="goodsMsg.info[0].goodsName" />
    </view>
    <!-- 商品 -->
    <view class="goods">
      <!-- <Goods /> -->
      <view class="common-card card-panle">
        <view class="card-title">商品</view>
        <view class="card-content">
          <h-goodsCard :goodsInfo="goodsMsg.info"></h-goodsCard>
        </view>
      </view>
    </view>

    <!-- //操作 -->
    <!-- item.saleStatus !== refundStatus.UN_SUBMIT && -->
    <!-- item.type === orderTypeEnum.TWO -->
    <view class="d-flex action-btn">
      <view
        class="refund-btn margin-48"
        @click="onBtn"
        v-if="par.refundTextName"
      >
        {{ par.refundTextName }}
      </view>
      <!-- <view
        class="refund-btn"
        @click="onBtn('')"
        v-if="
          goodsMsg.statusarr.saleStatus !== refundStatus.UN_SUBMIT &&
          goodsMsg.statusarr.type === orderTypeEnum.TWO
        "
        >售后详情</view
      >
      <view class="refund-btn" @click="onBtn('back')" v-else>申请售后</view> -->
      <!-- <view class="help-btn" @click="onBtn">在线客服</view> -->
      <button open-type="contact" class="help-btn flex-1">在线客服</button>
    </view>
  </view>
</template>

<script lang="ts">
import { mapActions, mapState } from "vuex";
import Send from "./components/send.vue";
import { refund } from "@/utils/url";
import { refundStatus, orderTypeEnum } from "@/utils/enum";
export default {
  components: {
    Send,
  },
  data() {
    return {
      orderTypeEnum,
      refundStatus, //退款状态
      par: {},
    };
  },
  onShow() {
    console.log("物流信息 ", this.goodsMsg);
  },
  onLoad(options) {
    this.par = options;
    console.log("options", options);
  },
  computed: {
    ...mapState("order", ["goodsMsg"]),
  },
  methods: {
    ...mapActions("order", ["X_getGoodsMsg"]),
    ...mapActions("refund", ["X_setRefundInfo"]),
    async onBtn() {
      const afterSaleNo = this.goodsMsg.statusarr.afterSaleNo;
      if (!afterSaleNo) {
        //申请售后
        try {
          const { data } = await this.GET(
            refund.checkApplyNum + `/${this.par.orderNo}`
          );
          this.X_setRefundInfo(data);
          uni.navigateTo({
            url: `/subPages/refund/refund`,
          });
        } catch (err) {
          uni.showToast({
            title: err.msg,
            icon: "none",
            duration: 1500,
          });
        }
      } else {
        //售后详情
        uni.navigateTo({
          url: `/subPages/refund/refundDetails?afterSaleNo=${afterSaleNo}`, //跳转传参
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.send-out {
  height: 100vh;
  overflow: auto;
  background: #f5f5f5;
  padding-top: 32rpx;
  padding-bottom: 220rpx;
}
.send {
  //   margin-top: 32rpx;
  padding: 0 32rpx;
}
.goods {
  //   height: 200px;
  padding: 0 32rpx;
  margin-top: 32rpx;
}
.action-btn {
  width: 100%;
  position: fixed;
  z-index: 999999;
  bottom: 0;
  height: 220rpx;
  background: #fff;
  justify-content: space-between;
  padding: 32rpx;
  .refund-btn,
  .help-btn {
    width: 320rpx;
    height: 104rpx;
    line-height: 104rpx;
    text-align: center;
    border-radius: 254px 254px 254px 254px;
    border: 1px solid #1d9bdc;
    color: #1d9bdc;
    font-size: 34rpx;
    font-weight: bold;
  }
  .help-btn {
    background: #1d9bdc;
    color: #fff;
  }
}
::v-deep .common-card {
  .uni-list-item__content-title {
    font-size: 30rpx;
    color: #000;
    font-weight: bold;
  }
}
::v-deep .card-panle {
  margin-bottom: 32rpx;
  .card-title {
    font-size: 30rpx;
    font-weight: bold;
    padding-bottom: 32rpx;
  }
}
::v-deep .card-content {
  .uni-list-item {
    .uni-list-item__container {
      padding: 16rpx 0 0 0 !important;
      .uni-list-item__content-note,
      .uni-list-item__extra-text {
        margin-top: 0;
        color: #666;
        font-size: 26rpx;
        //font-weight: bold
      }
    }
  }
}
.margin-48 {
  margin-right: 48rpx;
}
</style>
