<template>
  <view class="pop-buy-out">
    <!-- 优惠信息tip -->
    <view class="tip-main">
      <view class="col-modal" v-if="colTop" :style="{ height: heightCol + 'px' }">
        <view class="modal-pop">
          <view class="empty-bg" @tap.stop="closeDetail"></view>
          <view class="pop-main">
            <view class="pop-main-topname">
              优惠明细
              <view class="close-icon" @tap.stop="closeDetail">
                <uni-icons type="closeempty" size="17" color="#999999"></uni-icons>
              </view>
            </view>
            <view>
              <view class="d-flex-center d-sb margin24bot">
                <text>商品总额</text>
                <text class="money-pop">
                  <text style="font-size: 22rpx">￥</text>
                  {{ noformatAmount(data.totalAmount) }}
                </text>
              </view>
              <view class="d-flex-center d-sb margin24bot">
                <text>优惠券</text>
                <text class="money-pop red-money">
                  -
                  <text style="font-size: 22rpx">￥</text>
                  {{ noformatAmount(data.couponAmount) }}
                </text>
              </view>
              <view class="d-flex-center d-sb margin24bot">
                <text>满减活动</text>
                <text class="money-pop red-money">
                  -
                  <text style="font-size: 22rpx">￥</text>
                  {{ noformatAmount(data.activityReduceAmount) }}
                </text>
              </view>
              <view class="d-flex-center d-sb">
                <text>运费</text>
                <text class="money-pop">
                  <text style="font-size: 22rpx">￥</text>
                  {{ noformatAmount(data.freightAmount) }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="sale-tips d-flex-center d-sb" v-if="sale" @tap.stop="openCol">
        <!-- `已减${noformatAmount(
              data.reduceAmount,
              true
            )}元
            ,再买${noformatAmount(
              data.continueAmount,
              true
        )}元可立减${noformatAmount(data.continueReduceAmount, true)}元`-->
        <view class="h-over-1 flex-1">{{ `已减${noformatAmount(data.reduceAmount, true)}元` }}</view>
        <view class="d-flex-center d-sb">
          更多
          <uni-icons :type="colTop ? 'top' : 'bottom'" size="13" color="#DB9918" />
        </view>
      </view>
    </view>

    <!-- 购买 -->
    <view class="buy-main d-flex d-sb">
      <view class="d-flex buy-money-num">
        <view>实付:</view>
        <view>
          <text class="money-26">￥</text>
          <!-- <slot name="price"></slot> -->
          <text class="money-34">{{ price }}</text>
        </view>
      </view>
      <button class="buy-btn" type="primary" :loading="loading" @tap.stop="onPopBuy">立即购买</button>
    </view>
  </view>
</template>

<script>
// import bigjs from "big.js";
import { funCalc } from "@/utils/utils";
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    qty: {
      type: Number,
      default: 1
    },
    data: {
      type: Object,
      default: {
        milkPrice: 0
      }
    },
    sale: {
      //是否显示优惠信息
      type: Boolean,
      default: false
    },
    price: {
      type: String,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 这里存放数据
    return {
      loadingBtn: false, //按钮loading
      colTop: false, //展开提示
      heightCol: 0
    };
  },
  methods: {
    // funCalc,
    calc() {
      return new bigjs(this.data.milkPrice ? this.data.milkPrice : 0)
        .div(100)
        .times(this.qty ? this.qty : 0)
        .toFixed(2);
    },
    onPopBuy() {
      this.$emit("onPopBuy");
    },
    openCol() {
      this.colTop = !this.colTop;
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".sale-tips")
        .boundingClientRect(data => {
          console.log(data, "sale-data");
          const { top } = data;
          this.heightCol = top;
        })
        .exec();
      this.$emit("openCol", this.colTop);
    },
    closeDetail() {
      this.colTop = false;
    }
  }
};
</script>
<style scope lang="scss">
.pop-buy-out {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  .sale-tips {
    padding: 14rpx 32rpx;
    color: #db9918;
    font-size: 26rpx;
    background: #fff1d2;
  }
  .buy-main {
    padding: 12rpx 32rpx;
    border-top: 1rpx solid #f1f1f1;
    background: #ffffff;
    .buy-money-num {
      align-items: flex-end;
      padding-bottom: 8rpx;
      font-size: 24rpx;
      color: #333333;
      font-weight: bold;
      .money-26 {
        font-size: 26rpx;
        margin-left: 8rpx;
      }
      .money-34 {
        font-size: 34rpx;
      }
    }
    .buy-btn {
      height: 84rpx;
      line-height: 84rpx;
      color: #ffffff;
      background: #1d9bdc;
      margin: 0;
      border-radius: 254rpx;
      font-size: 32rpx;
      font-weight: bold;
      padding: 0rpx 68rpx;
    }
  }
}
// .tip-main {
//   // position: relative;
// }
.col-modal {
  // height: 723px;
  background: transparent;
  position: relative;
  .modal-pop {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 9999999;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    color: #1d9bdc;
  }
  .empty-bg {
    // background: #1d9bdc;
    flex: 1;
  }
  .pop-main {
    background: #fff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    padding: 48rpx 52rpx;
    color: #333333;
    font-size: 24rpx;
    .pop-main-topname {
      color: #000000;
      font-size: 34rpx;
      font-weight: bold;
      text-align: center;
      margin-bottom: 48rpx;
      position: relative;
    }
    .close-icon {
      width: 48rpx;
      height: 48rpx;
      position: absolute;
      right: -8rpx;
      top: 50%;
      transform: translateY(-50%);
    }
    .money-pop {
      font-size: 28rpx;
      font-weight: bold;
    }
    .red-money {
      color: #f86c4d;
    }
    .margin24bot {
      margin-bottom: 24rpx;
    }
  }
}
</style>

