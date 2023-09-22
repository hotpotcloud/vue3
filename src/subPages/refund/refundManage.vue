<!-- 退款管理 -->
<template>
  <view class="container">
    <view class="none-data" v-if="orderList.length === 0">
      <view class="no-data">
        <image
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png"
          mode=""
        ></image>
      </view>
      <view class="no-text">暂无数据</view>
    </view>
    <view v-else>
      <view
        v-show="orderList.length > 0"
        class="order-container"
        v-for="(item, index) in orderList"
        :key="index"
      >
        <!-- 单号 -->
        <view class="order-number">
          <!-- <view class="order-No">
            <text class="order-number-left"></text>
            售后订单
            <text class="order-number-right">{{ item.afterSaleNo }}</text>
          </view> -->
          <view class="platform-box">
            <img
              class="platform-avatar"
              :src="
                item.originatorType === PLATFORM_TYPE.XHJ_MINI
                  ? userMsg.avatarUrl
                  : getAssetImgUrl('user_avarta.png')
              "
              alt="平台头像"
            />
            <view>{{ item.originator }}</view>
            <!-- <view>{{item.afterSaleNo}}</view> -->
          </view>
          <view :class="['h-font-30', item.status]">{{ item.statusName }}</view>
        </view>
        <!-- 商品信息 -->
        <view class="refund-info">
          <!-- 奶卡标签 -->
          <view
            class="milk-card-tag"
            v-if="item.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER"
            >奶卡</view
          >
          <img
            class="goods-cover"
            :src="
              item.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                ? getAssetImgUrl(item.milkCardTemplate)
                : getAssetImgUrl(item.itemList[0].imageUrl)
            "
            alt="商品图片"
          />
          <view class="refund-info-center">
            <view class="d-flex d-sb">
              <view class="refund-info-center-title">
                <text class="spike-tag" v-if="item.itemList[0].secKill"
                  >秒杀</text
                >
                <text class="refund-info-center-top">
                  {{
                    item.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                      ? item.milkCardName
                      : item.itemList[0].spuName
                  }}
                  <!-- {{item.itemList[0].skuName}} -->
                </text>
              </view>
              <view
                class="refund-info-center-price"
                v-if="
                  item.tagType !== OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                "
              >
                <text class="money-icon">￥</text>
                {{ item.itemList[0].unitPrice | noformatAmount }}
              </view>
            </view>
            <view class="d-flex d-sb refund-standar-line">
              <view class="refund-standar refund-info-center-bottom">
                {{ item.itemList[0].channelSkuName }}
              </view>
              <text
                class="refund-info-center-bottom"
                v-if="
                  item.tagType !== OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                "
              >
                × {{ item.itemList[0].qty }}
              </text>
            </view>
            <view
              class="d-flex d-sb refund-standar-line"
              v-if="item.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER"
            >
              <view class="refund-standar refund-info-center-bottom">
                {{ item.itemList[0].spuName }}
              </view>
              <text class="refund-info-center-bottom">
                × {{ item.itemList[0].qty }}
              </text>
            </view>
            <!-- <view
              class="refund-standar"
              v-if="item.itemList[0].channelNickName"
            >
              <text class="refund-info-center-bottom refund-info-conf">
                规格
              </text>
              <text class="refund-info-center-bottom">
                {{ item.itemList[0].channelNickName }}
              </text>
            </view> -->
          </view>
        </view>
        <view class="d-flex d-sb money-time">
          <view>更新时间：{{ item.updatedTime }}</view>
          <view>金额:{{ item.actualRefundPayAmount | formatAmount }}</view>
        </view>
        <view class="refund-action">
          <!-- <view class="refund-action-price">
            <text class="refund-action-desc">退款金额</text>
            <text class="refund-amount">{{
              item.applyAmount | formatAmount
            }}</text>
          </view> -->
          <view class="refund-btns">
            <view
              class="refund-del"
              @click="cancelAction(item.afterSaleNo)"
              v-show="item.status === refundStatus.WAIT_AUDIT"
            >
              撤销
            </view>
            <view class="refund-deltail" @click="goDetail(item.afterSaleNo)">
              查看详情
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { refund } from "@/utils/url";
import { refundStatus, PLATFORM_TYPE, OrderTagTypeEnum } from "@/utils/enum";
export default {
  data() {
    return {
      // 订单数据
      OrderTagTypeEnum,
      orderList: [],
      page: 1,
      total: 0,
      refundStatus,
      orderNo: null,
      PLATFORM_TYPE,
      userMsg: {},
    };
  },
  // 下拉触底
  onReachBottom() {
    if (this.orderList.length < this.total) {
      this.page = this.page + 1;
      this.getRefundList();
    }
  },
  // 上拉刷新
  // onPullDownRefresh() {
  //   this.getRefundList()
  // },
  onLoad(option) {
    option.orderNo ? (this.orderNo = option.orderNo) : null;
    // this.getRefundList()
    this.userMsg = uni.getStorageSync("userMsg");
  },
  onShow() {
    this.page = 1;
    this.orderList = [];
    this.getRefundList();
  },
  methods: {
    // 获取退款订单列表
    async getRefundList() {
      try {
        const para = {
          page: this.page,
          size: 10,
          orderNo: this.orderNo,
        };
        const { data } = await this.POST(refund.refundList, para, "加载中");
        console.log(data);
        this.orderList = [...this.orderList, ...data.content];
        this.total = data.totalElements;
      } catch (error) {}
    },
    //删除或者撤销
    async cancelAction(afterSaleNo) {
      try {
        const { msg } = await this.POST(
          refund.revokedRefund + `/${afterSaleNo}`
        );
        uni.showToast({
          icon: "success",
          title: msg,
          duration: 1500,
        });
        this.getRefundList();
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.msg,
          duration: 1500,
        });
      }
    },

    // 查看详情
    goDetail(afterSaleNo) {
      uni.navigateTo({
        url: `/subPages/refund/refundDetails?afterSaleNo=${afterSaleNo}`, //跳转传参
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.none-data {
  padding-top: 350rpx;

  .no-data {
    margin: 0 auto;
    width: 294rpx;
    height: 360rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .no-text {
    width: 100%;
    font-weight: 400;
    color: #a9a9a9;
    font-size: 26rpx;
    text-align: center;
    margin-top: 48rpx;
  }
}
.container {
  font-family: PingFang SC-Medium, PingFang SC;
  padding: 32rpx;
  background: #f5f5f5;
  min-height: 100vh;
  .order-container {
    display: flex;
    flex-direction: column;
    //min-height: 428rpx;
    background: #fff;
    box-shadow: 0px 0px 22px 2px rgba(0, 0, 0, 0.08);
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    // 售后订单
    .order-number {
      padding-bottom: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .order-No {
        .order-number-left {
          font-size: 26rpx;
          font-weight: 400;
          color: #666;
        }
        .order-number-right {
          font-size: 26rpx;
          font-weight: 400;
          color: #666;
          padding-left: 16rpx;
        }
      }
      .order-status {
        font-size: 30rpx;
        font-weight: bold;
        color: #000;
      }
      .order-status-suc {
        font-size: 30rpx;
        color: #1d9bdc;
        font-weight: bold;
      }
      .order-status-err {
        font-size: 30rpx;
        color: #f86c4d;
        font-weight: bold;
      }
      // .order-status-info{
      //   color: #000;
      // }
    }
    // 商品信息
    .refund-info {
      display: flex;
      width: 100%;
      align-items: flex-start;
      margin-bottom: 16rpx;
      border-bottom: 2rpx dashed #f9f9f9;
      padding-bottom: 16rpx;
      .goods-cover {
        width: 136rpx;
        height: 136rpx;
        // background: #f3f3f3;
        border-radius: 16rpx;
        margin-right: 32rpx;
        position: relative;
      }
      .refund-info-center {
        font-size: 26rpx;
        color: #666;
        width: 462rpx;
        .refund-standar-line {
          padding-top: 16rpx;
        }
      }
    }
  }
}
.refund-action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .refund-action-price {
    width: 50%;
    font-size: 30rpx;
    color: #000000;
    font-weight: bold;
    .refund-action-desc {
      color: #666666;
      padding-right: 16rpx;
    }
    .refund-amount {
      color: #f86c4d;
    }
  }
  .refund-btns {
    width: 50%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    .refund-del,
    .refund-deltail {
      min-width: 136rpx;
      padding: 12rpx;
      border-radius: 76rpx;
      font-size: 26rpx;
      text-align: center;
      border: 1rpx solid #666666;
      color: #666;
    }
    /*.refund-del {
      border: 2rpx solid #666666;
      color: #666;
    }
    .refund-deltail {
      border: 2rpx solid #1d9bdc;
      color: #666;
    }*/
  }
}
.platform-avatar {
  width: 40rpx;
  height: 40rpx;
  margin-right: 8rpx;
  border-radius: 50%;
}
.platform-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 26rpx;
  color: #333333;
}
.money-time {
  margin-bottom: 24rpx;
}
.refund-info-center-title,
.refund-standar {
  width: 396rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.refund-info-center-top {
  font-size: 28rpx;
  color: #000;
  line-height: 33rpx;
}
.refund-info-center-price {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  .money-icon {
    font-size: 22rpx;
  }
}
.refund-info-center-bottom {
  color: #999;
  font-size: 26rpx;
  line-height: 30rpx;
}
.milk-card-tag {
  position: absolute;
  width: 60rpx;
  height: 30rpx;
  background: #f86c4d;
  border-radius: 16rpx 0rpx 16rpx 0rpx;
  color: #ffffff;
  font-size: 22rpx;
  text-align: center;
  z-index: 4;
}
</style>
