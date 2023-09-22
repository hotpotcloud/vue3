<template>
  <view class="card-item">
    <view>
      <text class="card-no">卡号：{{ data.milkCardNo }}</text>
      <image class="copy-img" @tap="onCopy" :src="getAssetImgUrl('copy.png')" />
    </view>

    <!-- 卡面信息 -->
    <view class="card-info d-flex">
      <view class="card-image-wrap">
        <view class="card-image">
          <image :src="getAssetImgUrl(data.url)" mode="widthFix" />
        </view>
        <view
          v-if="statusType.INITIALIZED.value !== data.status"
          :class="['card-status', statusType[data.status].color]"
          >{{ statusType[data.status].text }}</view
        >
      </view>
      <view
        class="goods-detail"
        v-for="(item, index) in data.goods"
        :key="index"
      >
        <view class="goods-name h-over-1">{{ item.productName }}</view>
        <view class="goods-specs d-flex-center d-sb">
          <view class="h-over-1">{{ item.skuChannelName }}</view>
          <view class="goods-qty">x{{ item.qty }}份</view>
        </view>
      </view>
    </view>
    <view class="line"></view>
    <view
      class="receive-info"
      v-if="statusType.PRESENTED.value === data.status"
    >
      <text>领取人：{{ data.receiveMemberName }}</text>
      <text>领取时间：{{ data.receiveTime }}</text>
    </view>

    <view
      class="redemption-time"
      v-if="statusType.EXCHANGED.value === data.status"
      >兑换时间：{{ data.exchangeTime }}</view
    >
    <view class="redemption-time" v-if="statusType.REJECT.value === data.status"
      >拒收时间：{{ data.rejectTime }}</view
    >
    <view class="redemption-time" v-if="statusType.REFUND.value === data.status"
      >退款时间：{{ data.refundTime }}</view
    >
    <view class="share-text" v-if="statusType.SHARED.value === data.status"
      >注：好友拒绝领取或超过24h未领取后才可重新赠送。</view
    >
    <view class="btn-group">
      <view
        v-if="isShowButton"
        :class="{
          'active-btn': true,
          'btn-disabled': statusType.SHARED.value === data.status,
        }"
        @tap="onGift"
        >立即赠送</view
      >
      <view
        v-if="isShowButton"
        :class="{
          'active-btn': true,
          'btn-disabled': statusType.SHARED.value === data.status,
        }"
        @tap="onRedeem"
        >自己兑换</view
      >
      <view
        v-if="statusType.EXCHANGED.value === data.status"
        class="detail-btn"
        @tap="onDetail"
        >兑换详情</view
      >
    </view>
  </view>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      statusType: {
        INITIALIZED: {
          color: "",
          text: "初始化",
          value: "INITIALIZED",
        },
        SHARED: {
          color: "status-shared",
          text: "已分享",
          value: "SHARED",
        },
        RECEIVED: {
          color: "status-friend-gift",
          text: "好友赠送",
          value: "RECEIVED",
        },
        PRESENTED: {
          color: "status-gifted",
          text: "已赠送",
          value: "PRESENTED",
        },
        EXCHANGED: {
          color: "status-redeemed",
          text: "已兑换",
          value: "EXCHANGED",
        },
        REFUND: {
          color: "status-refunded",
          text: "已退款",
          value: "REFUND",
        },
        REJECT: {
          color: "status-refunded",
          text: "被拒收",
          value: "REJECT",
        },
        NOT_CLAIMED: {
          color: "status-shared",
          text: "24h未领取",
          value: "NOT_CLAIMED",
        },
      },
    };
  },
  computed: {
    isShowButton() {
      if (
        [
          this.statusType.EXCHANGED.value,
          this.statusType.REFUND.value,
          this.statusType.PRESENTED.value,
        ].includes(this.data.status)
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapMutations("milkcard", ["set_curMilkNo"]),
    onCopy() {
      this.$emit("onCopy", this.data.milkCardNo);
    },
    onGift() {
      // 已分享不能点击
      if (this.statusType.SHARED.value !== this.data.status) {
        this.$emit(
          "onGift",
          this.data
          // this.data.id,
          // this.data.orderNo,
          // this.data.milkCardNo
        );
      }
    },
    onRedeem() {
      // 已分享不能点击
      if (this.statusType.SHARED.value !== this.data.status) {
        this.set_curMilkNo(this.data.milkCardNo); //设置当前奶卡号
        this.$emit(
          "onRedeem",
          this.data
          //  {
          //   milkCardNo: this.data.milkCardNo,
          //   skuChannelCode: this.data.goods[0].skuChannelCode,
          //   status: this.data.status,
          //   orderNo: this.data.orderNo,
          // }
        );
      }
    },
    onDetail() {
      this.$emit("onDetail", this.data.milkCardNo);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-item {
  // width: 686rpx;
  /* height: 306rpx; */
  height: auto;
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
  .card-no {
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #a9a9a9;
    line-height: 28rpx;
  }
  .card-no,
  .copy-img {
    display: inline-block;
    vertical-align: middle;
  }
  .copy-img {
    width: 30rpx;
    height: 30rpx;
    margin-left: 8rpx;
  }
  .card-info {
    margin-top: 24rpx;
    // .goods-detail,
    // .card-image-wrap {
    //   display: inline-block;
    //   vertical-align: top;
    // }
    .card-image-wrap {
      position: relative;
      .card-image {
        width: 180rpx;
        height: 100rpx;
        border-radius: 16rpx;
        overflow: hidden;
      }
      .card-status {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 16rpx 0 16rpx 0;
        font-size: 22rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 26rpx;
        padding: 6rpx 8rpx 4rpx 10rpx;
      }
    }
    .goods-detail {
      flex: 1;
      // width: 100%;
      margin-left: 16rpx;
      .goods-name {
        // width: 442rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #000;
        line-height: 40rpx;
      }
      .goods-specs {
        overflow: hidden;
        // width: 442rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 26rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999;
        line-height: 30rpx;
        margin-top: 16rpx;
        // max-width: calc(100% - 120rpx);
        .goods-qty {
          width: 88rpx;
          text-align: right;
        }
      }
    }
  }
  .receive-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 28rpx;
    // margin-top: 40rpx;
  }
  .redemption-time {
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 28rpx;
    text-align: right;
    // margin-top: 40rpx;
  }
  .detail-btn,
  .active-btn {
    width: 152rpx;
    height: 60rpx;
    border-radius: 76rpx;
    font-size: 26rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    text-align: center;
    line-height: 60rpx;
  }
  .active-btn {
    border: 1rpx solid #1d9bdc;
    color: #1d9bdc;
    margin-top: 24rpx;
  }
  .detail-btn {
    border: 1rpx solid #c7c7c7;
    color: #666;
    margin-top: 24rpx;
  }
  .btn-group {
    display: flex;
    gap: 16rpx;
    justify-content: flex-end;
  }
}
.status-shared {
  color: #333;
  background: #ffcd5f;
}
.status-friend-gift {
  color: #fff;
  background: #57bcf3;
}
.status-redeemed {
  color: #fff;
  background: #a9a9a9;
}
.status-gifted {
  color: #fff;
  background: #ffcd5f;
}
.status-refunded {
  color: #fff;
  background: #f86c4d;
}
.share-text {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
}
.line {
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 2rpx dashed #f4f4f4;
}
.btn-disabled {
  opacity: 0.5;
}
</style>
