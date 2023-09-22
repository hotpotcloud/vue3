<template>
  <!-- 订单信息 -->
  <view class="order-out">
    <template v-if="showMore">
      <view class="order-infos">
        <view class="border-bottom-info">
          <view class="item-info d-flex-center d-sb">
            <view class="left-name">商品总额</view>
            <view class="right-name flex-1 money-num-black"
              ><text class="money-icon">￥</text
              >{{ noformatAmount(info.totalAmount) }}</view
            >
          </view>

          <view class="item-info d-flex-center d-sb">
            <view class="left-name">优惠券</view>
            <view
              class="right-name flex-1"
              :class="
                info.couponAmount === 0 ? 'money-num-black' : 'money-num-red'
              "
              >-<text
                :class="
                  info.couponAmount === 0
                    ? 'money-icon-black'
                    : 'money-icon-red'
                "
                >￥</text
              >{{ noformatAmount(info.couponAmount) }}</view
            >
          </view>
          <view class="item-info d-flex-center d-sb">
            <view class="left-name">实付金额</view>

            <view class="right-name flex-1 money-num-red">
              <text class="goods-count" v-if="isShopOrder"
                >（共{{ goodsCount }}种商品）</text
              >
              <text class="money-icon-red">￥</text
              >{{ noformatAmount(info.payAmount) }}</view
            > </view
          ><view class="item-info d-flex-center d-sb">
            <view class="left-name">满减活动</view>
            <view
              class="right-name flex-1"
              :class="
                info.marketingAmount === 0 ? 'money-num-black' : 'money-num-red'
              "
              >-<text
                :class="
                  info.marketingAmount === 0
                    ? 'money-icon-black'
                    : 'money-icon-red'
                "
                >￥</text
              >{{ noformatAmount(info.marketingAmount) }}</view
            >
          </view>
          <view class="item-info d-flex-center d-sb">
            <view class="left-name">运费</view>
            <view class="right-name flex-1 money-num-black"
              ><text class="money-icon">￥</text
              >{{ noformatAmount(info.freightAmount) }}</view
            >
          </view>
        </view>

        <view>
          <view class="item-info d-flex-center d-sb">
            <view class="left-name">订单来源</view>
            <view class="right-name flex-1 money-num-black color-666">{{
              info.platformSourceName
            }}</view>
          </view>

          <!-- <view class="item-info d-flex-center d-sb">
            <view class="left-name">订单编号</view>
            <view
              class="right-name flex-1 money-num-black color-666 d-flex-center"
              style="width: 100%; justify-content: flex-end"
              @tap.stop="copyData(info.orderNo)"
              >{{ info.orderNo }}
              <img class="copy-icon" :src="getAssetImgUrl('copy.png')" />
            </view>
          </view> -->

          <view class="item-info d-flex-center d-sb">
            <view class="left-name">平台单号</view>
            <view
              class="right-name flex-1 money-num-black d-flex-center color-666"
              style="width: 100%; justify-content: flex-end"
              @tap.stop="copyData(info.platformOrderNo)"
              >{{ info.platformOrderNo ? info.platformOrderNo : "-" }}
              <img
                class="copy-icon"
                :src="getAssetImgUrl('copy.png')"
                v-if="info.platformOrderNo"
              />
            </view>
          </view>

          <view class="item-info d-flex-center d-sb">
            <view class="left-name">备注</view>
            <view class="right-name flex-1 money-num-black color-666"
              >{{ remark }}
            </view>
          </view>

          <view class="item-info d-flex-center d-sb" v-if="!isShopOrder">
            <view class="left-name">是否需要免费安装奶箱</view>
            <view class="right-name flex-1 money-num-black color-666"
              >{{ info.needMilkBox ? "是" : "否" }}
            </view>
          </view>

          <view class="item-info d-flex-center d-sb">
            <view class="left-name">支付方式</view>
            <view class="right-name flex-1 money-num-black color-666"
              >{{ info.payType === 0 ? "微信支付" : "其他方式" }}
            </view>
          </view>
          <view class="item-info d-flex-center d-sb">
            <view class="left-name">下单时间</view>
            <view class="right-name flex-1 money-num-black color-666"
              >{{ info.orderTime }}
            </view>
          </view>
          <view class="item-info d-flex-center d-sb" v-if="isCanShowPayTime">
            <view class="left-name">支付时间</view>
            <view class="right-name flex-1 money-num-black color-666"
              >{{ info.payTime }}
            </view>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="order-infos">
        <view class="item-info d-flex-center d-sb">
          <view class="left-name">商品总额</view>
          <view class="right-name flex-1 money-num-black"
            ><text class="money-icon">￥</text
            >{{ noformatAmount(info.totalAmount) }}</view
          >
        </view>
        <view class="item-info d-flex-center d-sb">
          <view class="left-name">优惠券</view>
          <view
            class="right-name flex-1"
            :class="
              info.couponAmount === 0 ? 'money-num-black' : 'money-num-red'
            "
            >-<text
              :class="
                info.couponAmount === 0 ? 'money-icon-black' : 'money-icon-red'
              "
              >￥</text
            >{{ noformatAmount(info.couponAmount) }}</view
          >
        </view>
        <view class="item-info d-flex-center d-sb">
          <view class="left-name">实付金额</view>
          <view class="right-name flex-1 money-num-red">
            <text class="goods-count" v-if="isShopOrder"
              >（共{{ goodsCount }}种商品）</text
            ><text class="money-icon-red">￥</text
            >{{ noformatAmount(info.payAmount) }}</view
          >
        </view>

        <view class="item-info d-flex-center d-sb">
          <view class="left-name">订单来源</view>
          <view class="right-name flex-1 money-num-black color-666">{{
            info.platformSourceName
          }}</view>
        </view>

        <!-- <view class="item-info d-flex-center d-sb">
          <view class="left-name">订单编号</view>
          <view
            class="right-name flex-1 money-num-black color-666 d-flex-center"
            style="width: 100%; justify-content: flex-end"
            @tap.stop="copyData(info.orderNo)"
            >{{ info.orderNo }}
            <img class="copy-icon" :src="getAssetImgUrl('copy.png')" />
          </view>
        </view> -->

        <view class="item-info d-flex-center d-sb">
          <view class="left-name flex-1">平台单号</view>
          <view
            class="right-name flex-1 money-num-black d-flex-center color-666"
            style="width: 100%; justify-content: flex-end"
            @tap.stop="copyData(info.platformOrderNo)"
          >
            <view class="h-over-1 flex-1" style="wdith: 100%"
              >{{ info.platformOrderNo }}
            </view>
            <img class="copy-icon" :src="getAssetImgUrl('copy.png')" />
          </view>
        </view>
      </view>
    </template>
    <view class="action-more d-flex-center d-center" @tap.stop="onMore">
      {{ showMore ? "收起" : "查看更多" }}
      <img
        :src="getAssetImgUrl('more.png')"
        alt=""
        :class="[showMore ? 'more-icon-up' : 'more-icon']"
      />
    </view>
  </view>
</template>

<script>
import { orderStatus } from "@/utils/enum";
import { order } from "@/utils/url";
export default {
  props: {
    info: {
      type: Object,
      default: {},
    },
    isShopOrder: {
      type: Boolean,
      default: false,
    },
    goodsCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showMore: false, //查看更多展开
    };
  },
  computed: {
    // 订单备注
    remark() {
      if (!this.info.remark) return "无";
      const len = this.info.remark.length;
      if (len > 15) {
        return this.info.remark.substring(0, 15) + "...";
      }
      return this.info.remark;
    },
    isCanShowPayTime() {
      // if (this.isShopOrder) {
      if (
        [
          orderStatus.CANCELED,
          orderStatus.WAIT_PAYMENT,
          orderStatus.INVALID,
        ].includes(this.info.status)
      ) {
        return false;
      }
      return true;
      // } else {

      // }
    },
  },
  methods: {
    // 更多
    onMore() {
      console.log("2", 2);
      this.showMore = !this.showMore;
      this.$emit("onMore");
    },
    // 复制订单号
    copyData(orderNo) {
      uni.setClipboardData({
        data: orderNo,
        showToast: false,
        success: (res) => {
          uni.showToast({
            icon: "none",
            title: "单号复制成功",
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.order-out {
  background: #ffffff;
  padding: 24rpx;
  padding-top: 0;
  margin-bottom: 24rpx;
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
  .order-infos {
    font-size: 24rpx;
    color: #333333;
  }
  .distance-24 {
    padding-bottom: 24rpx;
  }
  .distance-margin-24 {
    margin: 24rpx 0;
  }
  .copy-icon {
    border: none;
    width: 32rpx;
    height: 32rpx;
    margin-left: 4rpx;
  }
  .border-bottom-info {
    margin-bottom: 24rpx;
    border-bottom: 2rpx dashed #f1f1f1;
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
  .left-name {
    margin-right: 32rpx;
  }
  .item-info {
    @extend .distance-24;
    .money-icon-red {
      font-size: 22rpx;
      font-weight: bold;
      margin: 0;
      color: #f86c4d;
    }
    .money-icon-black {
      @extend .money-icon-red;
      color: #333333;
    }
    .money-icon {
      font-size: 22rpx;
      font-weight: bold;
      color: #333333;
      margin: 0;
    }
    .money-num-black {
      color: #333333;
      font-size: 28rpx;
      font-weight: bold;
    }
    .money-num-red {
      color: #f86c4d;
      font-size: 28rpx;
      font-weight: bold;
    }
    .goods-count {
      font-size: 24rpx;
      font-weight: 400;
      color: #a9a9a9;
    }
    .right-name {
      text-align: right;
    }
    .color-666 {
      color: #666666;
      font-weight: normal;
      font-size: 24rpx;
    }
  }
}
</style>
