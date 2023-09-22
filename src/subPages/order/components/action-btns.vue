<template>
  <view class="action-btns-out">
    <!-- <view class="d-flex btn-bars" :class="getRes()?'d-sb':'flex-fend'"> -->
    <view v-if="getRes()" class="d-flex btn-bars d-sb">
      <view class="more-text" @click="showMore()">更多</view>
      <view class="more-pop" v-if="showPop">
        <view>
          <button open-type="contact" id="contact" style="display: none"></button>
          <label for="contact">
            <view class>联系客服</view>
          </label>
        </view>
      </view>
      <view class="action-arr flex-fend" ref="btns">
        <view class="serve-btn" v-if="info.refundText" @tap.stop="refundBtn">
          {{
          info.refundText
          }}
        </view>
        <view class="serve-btn" v-if="getRes()" @tap.stop="shopAgin">再次购买</view>
        <view
          class="action-btn-user"
          @tap.stop="onDate"
          v-if="info.type === 2 && textVal"
        >{{ textVal }}</view>
      </view>
    </view>
    <view class="d-flex action-arr flex-fend" v-else>
      <view>
        <button open-type="contact" id="contact" style="display: none"></button>
        <label for="contact">
          <view class="serve-btn">联系客服</view>
        </label>
      </view>
      <view class="serve-btn" v-if="info.refundText" @tap.stop="refundBtn">
        {{
        info.refundText
        }}
      </view>
      <view class="serve-btn" v-if="getRes()" @tap.stop="shopAgin">再次购买</view>
      <view
        class="action-btn-user"
        @tap.stop="onDate"
        v-if="info.type === 2 && textVal"
      >{{ textVal }}</view>
    </view>
    <!-- </view> -->
  </view>
</template>

<script>
import { combGoods, orderStatus, ORDER_TYPE_ENUM } from "@/utils/enum";
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orderStatus,
      combGoods,
      showPop: false,
      ORDER_TYPE_ENUM
    };
  },
  computed: {
    // 配送日历or立即支付
    textVal() {
      const { status } = this.info;
      console.log(status, "status", this.info, "=======>>>");
      let text = "";
      if (status === orderStatus.DELIVERING) {
        text = "配送日历";
      }
      if (status === orderStatus.WAIT_PAYMENT) {
        text = "立即支付";
      }
      return text;
    }
  },

  methods: {
    showMore() {
      this.showPop = !this.showPop;
    },
    tapPopup() {
      console.log(222);
    },
    getRes() {
      if (
        (this.info.status === orderStatus.DELIVERING ||
          this.info.status === orderStatus.FINISH) &&
        this.info.type === 2 &&
        this.info.platformSourceCode === ORDER_TYPE_ENUM.XHJ.value
        // this.info.status === orderStatus.DELIVERING ||
        // (this.info.status === orderStatus.FINISH &&
        //   this.info.type === 2 &&
        //   info.platformSourceCode === "XHJ")
      ) {
        return true;
      } else return false;
    },
    refundBtn() {
      console.log("退款");
      this.$emit("refundBtn", this.info);
    },
    shopAgin() {
      this.$emit("shopAgin");
    },
    onDate() {
      console.log("配送日历", this.loading);
      // if (this.loading) return;
      this.$emit("onDate", this.info);
    }
  }
};
</script>

<style scoped lang="scss">
.action-btns-out {
  width: 100%;
  height: 176rpx;
  background-color: #fff;
  border-top: 2rpx solid #f1f1f1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  .flex-evenly {
    justify-content: space-evenly !important;
  }
  .flex-fend {
    justify-content: flex-end !important;
  }
  .action-arr {
    display: flex;
    // justify-content: flex-end;
    justify-content: space-evenly;
    align-items: center;
    padding: 20rpx 32rpx;
  }
  .sale-btn {
    height: 60rpx;
    line-height: 60rpx;
    width: 152rpx;
    border-radius: 254rpx;
    color: #1d9bdc;

    font-size: 26rpx;
    text-align: center;
    border: 1rpx solid #1d9bdc;
    padding: 0;
    // flex: 1;
  }
  .serve-btn {
    @extend .sale-btn;

    border-color: #c7c7c7;
    padding: 0 !important;
    background: #ffffff !important;
    color: #666666 !important;
    margin: 0;
    margin-right: 16rpx;
  }
  .action-btn-user {
    @extend .sale-btn;
    color: #ffffff;
    border: 1rpx solid #1d9bdc;
    background: #1d9bdc;
    border: 1rpx solid #1d9bdc;
  }
}
.btn-bars {
  align-items: center;
  padding-left: 32rpx;
}
.more-text {
  font-size: 26rpx;
  color: #999999;
  position: relative;
}
.more-pop {
  position: absolute;
  top: -44rpx;
  left: 32rpx;
  width: 164rpx;
  height: 66rpx;
  background: #fff;
  box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.08);
  text-align: center;
  padding: 16rpx 32rpx;
  font-size: 24rpx;
  color: #666666;
  line-height: 28rpx;
}
.more-text::before {
  content: "";
  width: 11rpx;
  height: 10rpx;
  background: #ffffff;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
  transform: rotateX(180deg);
  position: absolute;
  top: -10rpx;
  left: -10rpx;
}
</style>
