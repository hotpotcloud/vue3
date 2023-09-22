<template>
  <view class="detail-out">
    <view class="custom-navbar" :style="{ paddingTop: systemInfo.top + 'px' }">
      <view
        class="nav-title d-flex-center d-center"
        :style="{ height: systemInfo.height + 'px' }"
      >
        <text class="back-icon" @tap="onBackBtn"></text>
        账单详情
      </view>

      <!-- 内容部分 -->
      <view class="main" :style="{ height: mainH }">
        <!-- 头部 -->
        <view class="main-heard" :class="[showMore && 'more-content']">
          <view class="content-money2 d-flex-colum d-sb">
            <view class="heard-content">
              <view class="content-money">
                <text class="money-icon">￥</text>
                {{ noformatAmount(receiptDetails.amount) }}</view
              >
              <view class="content-tip">{{
                receiptDetails.payStatusName
              }}</view>
            </view>

            <view class="heard-detail" :class="[showMore ? 'more-detail' : '']">
              <view>
                <view class="d-flex-center d-sb">
                  <view>账单号：</view>
                  <view class="sub-color">{{ receiptDetails.receiptNo }}</view>
                </view>
                <view class="d-flex-center d-sb margin-top">
                  <view>结算时间：</view>
                  <view class="sub-color"
                    >{{ receiptDetails.deliveryStartDate }}-{{
                      receiptDetails.deliveryEndDate
                    }}</view
                  >
                </view>
                <view class="d-flex-center d-sb margin-top">
                  <view>最迟还款日：</view>
                  <view class="sub-color">{{
                    receiptDetails.lastPayTime
                  }}</view>
                </view>
                <view
                  class="d-flex-center d-sb margin-top"
                  v-if="receiptDetails.payTime"
                >
                  <view>还款时间：</view>
                  <view class="sub-color">{{ receiptDetails.payTime }}</view>
                </view>
              </view>
              <view v-if="showMore">
                <view class="d-flex-center d-sb margin-top">
                  <view>收货人：</view>
                  <view class="sub-color">{{
                    receiptDetails.receiverName
                  }}</view>
                </view>
                <view class="d-flex-center d-sb margin-top">
                  <view>手机号：</view>
                  <view class="sub-color">{{
                    receiptDetails.receiverPhone
                  }}</view>
                </view>
                <view class="d-flex d-sb margin-top">
                  <view>收货地址：</view>
                  <view class="sub-color flex-1 sub-address">{{
                    receiptDetails.addressDetail
                  }}</view>
                </view>
                <view class="d-flex-center d-sb margin-top">
                  <view>支付场景：</view>
                  <view class="sub-color">{{
                    receiptDetails.payChannel
                      ? payEnum[receiptDetails.payChannel]
                      : "-"
                  }}</view>
                </view>
                <view class="d-flex-center d-sb margin-top">
                  <view>支付流水：</view>
                  <view class="sub-color">{{
                    receiptDetails.payNo ? receiptDetails.payNo : "-"
                  }}</view>
                </view>
              </view>
            </view>
            <view
              class="action-more d-flex-center d-center"
              @tap.stop="onMore"
              v-if="!showMore"
            >
              {{ "查看更多" }}
              <img :src="getAssetImgUrl('more.png')" alt="" class="more-icon" />
            </view>
          </view>
        </view>

        <!-- 账单明细 -->
        <view class="main-detail">
          <view class="detail-top-name">账单明细</view>

          <!-- 商品卡片 -->
          <view
            class="detail-card"
            v-for="(i, index) in receiptDetails.detail"
            :key="index"
          >
            <view class="card-date d-flex-center d-sb">
              <view class="d-flex-center">
                <text class="date-time">{{ formatDate(i.receiptDate) }}</text>
              </view>
              <view class="order-price">
                <text class="price-icon">￥</text>
                <text>{{ noformatAmount(i.totalAmount) }}</text>
              </view>
            </view>
            <view class="card-goods d-flex">
              <view class="card-goods-img">
                <image :src="i.imgUrl" mode="aspectFit" />
              </view>
              <view class="flex-1 d-flex-colum d-sb">
                <view class="card-goods-name h-overflow-8-2"
                  >{{ i.goodsName }}
                </view>
                <view class="d-flex-center d-sb">
                  <view class="goods-price">
                    <text class="price-icon">￥</text>
                    <text>{{ noformatAmount(i.unitPrice) }}</text>
                  </view>
                  <view class="goods-num">x {{ i.qty }}</view>
                </view>
              </view>
            </view>
            <view class="order-source">来源订单：{{ i.orgStationNo }}</view>
          </view>

          <view class="mb64">
            <view class="tips-bot"> 如有疑问，请联系送奶员或客服人员 </view>
            <view class="tips-bot" @tap="onSenderPhone">
              送奶员电话：{{
                receiptDetails.milkManPhone ? receiptDetails.milkManPhone : "-"
              }}
            </view>
            <view class="tips-bot" @tap="onServerPhone">
              客服电话：{{
                receiptDetails.customerHotLine
                  ? receiptDetails.customerHotLine
                  : "-"
              }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      //自定义高度信息
      navInfo: {},
      showMore: false,
      payEnum: {
        BILL_PAYMENT: "账单支付",
        VALET_PAYMENT: "代客支付",
      },
    };
  },
  onLoad(options) {
    console.log("options", options);
    if (options.receiptNo) {
      this.get_receiptDetail(options.receiptNo);
    }
  },
  computed: {
    ...mapState("user", ["receiptDetails"]),
    // 系统胶囊位置
    systemInfo() {
      const height = uni.getMenuButtonBoundingClientRect();
      return height;
    },
    // 内容距离顶部高度
    mainH() {
      const main =
        this.systemInfo.top + this.systemInfo.height + uni.upx2px(36);
      return `calc(100vh - ${main}px)`;
    },
  },
  methods: {
    ...mapActions("user", ["get_receiptDetail"]),
    onMore() {
      this.showMore = true;
    },
    // 格式化时间
    formatDate(date) {
      if (!date) return "";
      const [, month, day] = date.split("-");

      return `${month}月${day}日`;
    },
    // 返回上一页
    onBackBtn() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.switchTab({
            url: "/pages/homepage/homepage",
          });
        },
      });
    },
    // 拨打电话
    callPhone(phone) {
      uni.makePhoneCall({
        phoneNumber: phone,
      });
    },
    onSenderPhone() {
      this.callPhone(this.receiptDetails.milkManPhone);
    },
    onServerPhone() {
      this.callPhone(this.receiptDetails.customerHotLine);
    },
  },
};
</script>

<style scoped lang="scss">
.detail-out {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  overflow-y: auto;
}
.custom-navbar {
  height: 638rpx;
  width: 100%;
  background-color: linear-gradient(
    180deg,
    #8bd0ff 0%,
    #e4f4ff 3%,
    #ffffff 11%
  );
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/wallet-detail-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}
.nav-title {
  margin-bottom: 36rpx;
  font-size: 34rpx;
  color: #ffffff;
  font-weight: bold;
  position: relative;
  .back-icon {
    width: 24rpx;
    height: 24rpx;
    border-top: 5rpx solid #fff;
    border-left: 5rpx solid #fff;
    border-top-left-radius: 4rpx;
    transform: rotate(-45deg);
    position: absolute;
    left: 24rpx;
  }
}

.main {
  position: absolute;
  // background: #ff0;
  width: 100%;
  overflow: auto;
  // padding-top: 36rpx;
}
.margin-top {
  margin-top: 16rpx;
}
.more-content {
  height: 772rpx !important;
}
.main-heard {
  // margin: 0 12rpx;
  height: 504rpx;
  // background-color: #ff1;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/wallet-top-detail.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // padding: 64rpx 54rpx 56rpx;
  // padding: 64rpx 64rpx 40rpx 64rpx;
  padding: 28rpx 32rpx 24rpx;
  background-position: center;
  justify-content: center;
  .content-money2 {
    // background: #1d9bdc;
    height: 100%;
    padding: 36rpx 32rpx 32rpx;
    position: relative;
    background: #fff;
    border-bottom-left-radius: 40rpx;
    border-bottom-right-radius: 40rpx;
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      width: 100%;
      height: 28rpx;
      background: linear-gradient(
        180deg,
        #8bd0ff 0%,
        rgba(204, 234, 255, 0) 100%
      );
    }
  }

  .heard-content {
    text-align: center;
    margin-bottom: 48rpx;
    .content-money {
      .money-icon {
        font-size: 44rpx;
      }
      font-size: 64rpx;
      font-weight: bold;
      color: #1d9bdc;
    }
    .content-tip {
      font-size: 28rpx;
      color: #1d9bdc;
      font-weight: bold;
    }
  }
  .heard-detail {
    // background: #f0f;
    color: #a9a9a9;
    font-size: 28rpx;
    font-weight: bold;
    position: relative;
  }
  .sub-address {
    text-align: right;
  }
}
.main-detail {
  padding: 0 32rpx;
  padding-bottom: 64rpx;
  .detail-top-name {
    font-size: 30rpx;
    color: #000000;
    font-weight: bold;
  }
  .detail-card {
    background: #ffffff;
    margin-top: 16rpx;
    padding: 16rpx 32rpx 16rpx 32rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    .card-date {
      padding-bottom: 14rpx;
      border-bottom: 2rpx solid #f4f4f4;
      margin-bottom: 12rpx;
      .date-time {
        font-size: 28rpx;
        color: #000000;
        font-weight: bold;
      }

      .order-price {
        .price-icon {
          font-size: 24rpx;
        }
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
      }
    }
    .card-goods {
      // background: #1d9bdc;
      .card-goods-img {
        width: 136rpx;
        height: 136rpx;
        margin-right: 24rpx;
        background: #f3f3f3;
        border: 1rpx solid #f3f3f3;
        overflow: hidden;
        border-radius: 8rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }

      .card-goods-name {
        font-size: 26rpx;
        font-weight: bold;
        color: #000000;
      }
      .goods-price {
        font-size: 28rpx;
        color: #333333;
        font-weight: bold;
        .price-icon {
          font-size: 24rpx;
        }
      }
      .goods-num {
        font-size: 24rpx;
        color: #666666;
      }
    }
    .order-source {
      font-size: 24rpx;
      color: #999999;
      font-weight: bold;
      margin-top: 16rpx;
      // margin-left: 16rpx;
      // padding-left: 16rpx;
      // border-left: 1rpx solid #f1f1f1;
    }
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
.mb64 {
  margin-top: 48rpx;
}
.tips-bot {
  margin-top: 16rpx;
  font-size: 24rpx;
  text-align: center;
  color: #999999;
}
</style>
