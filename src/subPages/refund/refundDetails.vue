<!-- 退款详情-审核-拒绝-成功 -->
<template>
  <view class="out-layer">
    <view class="detail-container">
      <view class="common-card">
        <view class="detail-card-top">
          <view class="detail-top-title">
            <text class="refund-status-desc">退款状态</text>
            <!-- <text>操作时间</text> -->
          </view>
          <view class="detail-top-title">
            <text :class="['detail-top-status', info.status]">
              {{ info.statusName }}
            </text>
            <!-- <text class="detail-top-time">{{ info.dealTime || info.applyTime}}</text> -->
          </view>
          <view
            class="detail-card-bottom"
            v-if="info.status === REFUND_ORDER_STATUS.REFUSE"
          >
            <view class="refuse-reason">
              <text class="refuse-reason-text">原因:</text>
              <text class="refuse-reason-text">
                {{ info.refuseReason }}
              </text>
            </view>
          </view>
        </view>
        <view class="detail-card-center">
          <view class="detail-top-title">
            <text class="detail-center-txt">申请金额</text>
            <view class="apply-money">
              <text class="money-icon-dark">￥</text>
              <text class="money-dark">
                {{ info.applyAmount | noformatAmount }}
              </text>
            </view>
          </view>
          <view
            class="detail-top-title"
            v-if="info.status === REFUND_ORDER_STATUS.FINISH"
          >
            <text class="detail-center-txt">退款金额</text>
            <view>
              <text class="money-icon">￥</text>
              <text class="detail-center-money">
                {{ info.handleAmount | noformatAmount }}
              </text>
            </view>
          </view>
          <view class>
            <view class="detail-center-step">退款流程</view>
            <!-- :active-color="info.processList[0].statusName==='退款成功'?'#1D9BDC':'#F86C4D'" -->
            <!-- getColor(info.processList[0].status) -->
            <uni-steps
              :options="info.processList"
              direction="column"
              :active-color="getColor(info.processList)"
              :active="0"
              active-icon="smallcircle-filled"
            ></uni-steps>
          </view>
        </view>
        <!-- <view class="detail-card-bottom" v-if="info.status === REFUND_ORDER_STATUS.REFUSE">
          <text class="detail--bottom-desc">拒绝原因</text>
          <text class="detail--bottom-reason">
            {{
            info.refuseReason ? info.refuseReason : "暂无"
            }}
          </text>
        </view>-->
      </view>
      <view class="common-card">
        <uni-list :border="false">
          <uni-list-item
            clickable
            @click="goChatDetail(info.afterSaleNo)"
            :border="false"
            showArrow
            title="查看协商记录"
          />
        </uni-list>
        <!-- 退款订单 -->
        <view class="details-refund-order" v-if="info.goodsInfos">
          <view class="details-refund-top">
            <view class="details-order-text">
              <img
                class="goods-icon"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/as.png"
                alt
              />
              <text>
                {{ info.goodsInfos[0].companyName }}
              </text>
            </view>
            <!-- <view class="details-order-company">
              {{
              info.goodsInfos[0].companyName
              }}
            </view>-->
          </view>
          <view>
            <view
              class="refund-info"
              v-for="(el, index) in info.goodsInfos"
              :key="index"
            >
              <view
                class="milk-card-tag"
                v-if="
                  info.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                "
                >奶卡</view
              >
              <img
                :src="
                  getAssetImgUrl(
                    info.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                      ? info.milkCardTemplate
                      : el.imgUrl
                  )
                "
                alt="商品图片"
              />
              <view class="refund-info-center">
                <view class="d-flex d-sb">
                  <view>
                    <text class="spike-tag" v-if="el.secKill">秒杀</text>
                    <text class="refund-info-center-top">
                      {{
                        info.tagType ===
                        OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                          ? info.milkCardName
                          : el.spuName
                      }}
                    </text>
                  </view>
                  <view class="price-bar">
                    <text class="money-icon-dark">￥</text>
                    <text class="money-dark">
                      {{ el.unitPrice | noformatAmount }}
                    </text>
                  </view>
                </view>
                <view class="refund-standar">
                  <text>
                    {{ el.spuName }}
                  </text>
                  <text
                    v-if="
                      info.tagType !==
                      OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                    "
                    >× {{ el.qty }}</text
                  >
                </view>
                <view
                  class="refund-standar"
                  v-if="
                    info.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
                  "
                >
                  <text> {{ el.channelNickName }},{{ el.qty }}份 </text>
                  <text>× {{ info.milkCardQty }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 详细数据 -->
        <view class="details-refund-data">
          <view class="detail-item">
            <text>售后订单</text>
            <view class="d-flex-center">
              <text>{{ info.afterSaleNo }}</text>
              <image
                @tap="copyData(info.afterSaleNo)"
                class="copy-icon"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/copy.png"
              />
            </view>
          </view>
          <view class="detail-item">
            <text>退款类型</text>
            <text>{{ info.mainTypeName }}</text>
          </view>
          <view class="detail-item">
            <text>退款原因</text>
            <text>{{ info.reasonName }}</text>
          </view>
          <!-- <view class="detail-item">
            <text>退款金额</text>
            <text>{{ info.handleAmount | formatAmount }}</text>
          </view>-->
          <view class="detail-item">
            <text>申请时间</text>
            <text>{{ info.applyTime }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="btn-bar">
      <view class="btn-box">
        <view
          v-if="
            info.channelType === PLATFORM_TYPE.XHJ_MINI &&
            (info.status === REFUND_ORDER_STATUS.PENDING ||
              info.status === REFUND_ORDER_STATUS.TO_BE_REFUND)
          "
          class="nomal-btn"
          @click="cancleApply(info.afterSaleNo)"
          >撤销申请</view
        >
        <view
          v-if="
            info.status === REFUND_ORDER_STATUS.RESCINDED ||
            info.status === REFUND_ORDER_STATUS.REFUSE ||
            info.status === REFUND_ORDER_STATUS.CLOSE
          "
          class="nomal-btn"
          @click="applyAgain(info.mainOrderNo, info.afterSaleNo, info.type)"
          >再次申请</view
        >
        <button
          class="primary-btn-cs"
          open-type="contact"
          hover-class="button-hover"
        >
          在线客服
        </button>
      </view>
    </view>
    <!-- <view v-if="info.channelType === 'XHGO'" class="btn-bar"> -->
    <!-- <view v-if="info.channelType === PLATFORM_TYPE.XHJ_MINI" class="btn-bar">
      <view class="btn-box" v-if="
          info.status!== REFUND_ORDER_STATUS.FINISH
        ">
        <view
          v-if="info.status === REFUND_ORDER_STATUS.PENDING||info.status === REFUND_ORDER_STATUS.TO_BE_REFUND"
          class="d-flex"
        >
          <view class="nomal-btn" @click="cancleApply(info.afterSaleNo)">撤销申请</view>
          <button class="primary-btn" open-type="contact" hover-class="button-hover">在线客服</button>
        </view>

        <view
          class="d-flex"
          v-else-if="
            info.status === REFUND_ORDER_STATUS.RESCINDED ||
            info.status === REFUND_ORDER_STATUS.REFUSE || info.status === REFUND_ORDER_STATUS.CLOSE
          "
        >
          <view
            class="nomal-btn"
            @click="applyAgain(info.mainOrderNo, info.afterSaleNo, info.type)"
          >再次申请</view>
          <button open-type="contact" hover-class="button-hover" class="primary-btn">在线客服</button>
        </view>

        <view v-else class="d-flex">
          <button class="primary-btn" open-type="contact" hover-class="button-hover">在线客服</button>
        </view>
      </view>
    </view>-->

    <!-- <view v-else class="btn-bar">
      <view
        class="btn-box"
        v-if="
          info.status === REFUND_ORDER_STATUS.RESCINDED ||
            info.status === REFUND_ORDER_STATUS.REFUSE||info.status === REFUND_ORDER_STATUS.CLOSE
        "
      >
        <view
          class="nomal-btn"
          @click="applyAgain(info.mainOrderNo, info.afterSaleNo, info.type)"
        >再次申请</view>
        <button open-type="contact" hover-class="button-hover" class="primary-btn">在线客服</button>
      </view>

      <view v-else>
        <button class="primary-btn" open-type="contact" hover-class="button-hover">在线客服</button>
      </view>
    </view>-->
  </view>
</template>

<script>
import { refund } from "@/utils/url";
import {
  refundStatus,
  refundStatusText,
  REFUND_ORDER_STATUS,
  PLATFORM_TYPE,
  OrderTagTypeEnum,
} from "@/utils/enum";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      info: {},
      refundStatus,
      refundStatusText,
      REFUND_ORDER_STATUS,
      PLATFORM_TYPE,
      OrderTagTypeEnum,
      afterNo: "",
    };
  },
  onLoad(option) {
    this.afterNo = option.afterSaleNo;
  },
  onShow() {
    this.getDetail(this.afterNo);
  },

  methods: {
    ...mapMutations("refund", ["X_setRefundInfo", "clearSelectedMilkCard"]),

    // 获取流程颜色
    getColor(arr) {
      if (arr && arr.length > 0) {
        const val = arr[0].status;
        console.log("val", val);
        switch (val) {
          case REFUND_ORDER_STATUS.FINISH:
            return "#1D9BDC";
          case REFUND_ORDER_STATUS.PENDING:
            return "#f86c4d";
          case REFUND_ORDER_STATUS.TO_BE_REFUND:
            return "#f86c4d";
          case REFUND_ORDER_STATUS.REFUSE:
            return "#f86c4d";
          default:
            return "#333333";
        }
      } else {
        return "#333333";
      }
    },
    // 获取详情
    async getDetail(afterSaleNo) {
      try {
        const { data, msg } = await this.GET(
          refund.refundDetail + `${afterSaleNo}`
        );
        if (!data) {
          return uni.showToast({
            title: msg,
            icon: "none",
            duration: 1500,
          });
        }
        console.log("this.info???????????", data);
        // data.channelType = "XHGO";
        this.info = data;
        this.X_setRefundInfo(data);
        const arr = data.processList;
        for (let i in arr) {
          arr[i].title = arr[i].statusName;
          arr[i].desc = arr[i].createdTime ? arr[i].createdTime : "暂无";
        }
        this.info.processList = arr;
      } catch (error) {}
    },
    // 跳转去协商详情
    goChatDetail(afterSaleNo) {
      uni.navigateTo({
        url: `/subPages/refund/refundConsult?afterSaleNo=${afterSaleNo}`,
      });
    },
    // 再次申请
    async applyAgain(mainOrderNo, afterSaleNo, type) {
      try {
        const res = await this.GET(refund.getRefundInfo + `/${mainOrderNo}`);
        this.X_setRefundInfo(res.data);
        this.clearSelectedMilkCard();
        uni.navigateTo({
          url: `/subPages/refund/refund?orderNo=${mainOrderNo}`,
        });
      } catch (err) {
        uni.showToast({
          title: err.msg,
          icon: "none",
          duration: 1500,
        });
      }
    },
    // 复制
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
    // 撤销申请
    cancleApply(afterSaleNo) {
      this.GET(refund.revokedRefund + `/${afterSaleNo}`).then((res) => {
        uni.showToast({
          icon: "success",
          title: res.msg,
          duration: 1500,
        });
        // uni.navigateBack({ delta: 1 })
        uni.redirectTo({ url: "/subPages/refund/refundManage" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page,
body {
  background: #f5f5f5;
}
.out-layer {
  background: #f5f5f5;
  padding-bottom: 228rpx;
  min-height: calc(100vh - 228rpx);
  // overflow-y: auto;
  .detail-container {
    padding: 32rpx;
  }
}

// 底部按钮
.btn-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 228rpx;
  background: #fff;
  padding: 0 32rpx;
  padding-top: 32rpx;
  text-align: right;
  .btn-box {
    width: 100%;
    font-size: 28rpx;
    display: flex;
    justify-content: flex-end;
  }
  // border-top: 2rpx solid #e5e5e5;
  .primary-btn-cs {
    text-align: center;
    width: 192rpx;
    height: 68rpx;
    border-radius: 254rpx;
    border: 1rpx solid #1d9bdc;
    color: #1d9bdc;
    //margin-left: 16rpx;
    font-size: 28rpx;
    line-height: 68rpx;
    background: #fff;
    margin: 0;
  }
  .nomal-btn {
    text-align: center;
    width: 192rpx;
    height: 68rpx;
    border-radius: 254rpx;
    border: 1rpx solid #c7c7c7;
    line-height: 68rpx;
    margin-right: 16rpx;
  }
}
.detail-card-top {
  border-bottom: 2rpx dashed #f4f4f4;
  padding-bottom: 24rpx;
  margin-bottom: 24rpx;
}
.detail-top-title {
  font-size: 26rpx;
  color: #000000;
  display: flex;
  justify-content: space-between;
  .refund-status-desc {
    font-size: 26rpx;
    color: #a9a9a9;
  }
  // align-items: center;
  .detail-top-status {
    font-size: 34rpx;
    font-weight: bold;
    color: #1d9bdc;
    padding-top: 8rpx;
    //padding-bottom: 32rpx;
  }
}
.detail-top-time {
  color: #666666;
  font-size: 30rpx;
  padding-top: 8rpx;
  //padding-bottom: 32rpx;
}
.detail-card-center {
  //border-bottom: 2rpx dashed #f4f4f4;
  margin-bottom: 32rpx;
}
.detail-center-txt,
.detail-center-step {
  font-size: 30rpx;
  font-weight: bold;
  color: #000000;
  padding-bottom: 32rpx;
}
.detail-center-money {
  font-size: 30rpx;
  font-weight: bold;
  color: #f86c4d;
  padding-bottom: 32rpx;
}
.detail-center-step {
  padding-bottom: 0;
}
.detail-card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .detail--bottom-desc {
    font-size: 30rpx;
    font-weight: bold;
    color: #000000;
  }
  .detail--bottom-reason {
    font-size: 26rpx;
    font-weight: 400;
    color: #666666;
  }
}
// 修改步骤调样式
::v-deep .uni-steps {
  .uni-steps__column-circle {
    width: 18rpx;
    height: 18rpx;
    border-radius: 50%;
    background-color: #999;
    margin: 4rpx 0px 5rpx 0px;
  }
  .uni-steps__column-line {
    width: 4rpx;
    background-color: #999;
  }
  .uni-steps__column-line--before {
    height: 32rpx;
  }
  .uni-steps__column-line--after {
    flex: 1;
    -webkit-transform: translate(0px, 10rpx);
    transform: translate(0px, 10rpx);
  }
  .uni-steps__column-text {
    padding: 32rpx 0px;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #999999;
    align-content: center;
    font-size: 26rpx;
    .uni-steps__column-desc {
      font-size: 26rpx;
    }
  }
}
// 协商记录
// 修改列表样式
::v-deep .uni-list-item {
  .uni-list-item__container {
    padding: 0;
  }
  .uni-icon-wrapper {
    padding: 0;
  }
  .uni-list-item__content-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #000000;
  }
}
.details-refund-order {
  padding-top: 32rpx;
  // border-top: 2rpx solid #f4f4f4;
  margin: 32rpx 0;
  .details-refund-top {
    display: flex;
    justify-content: space-between;
    .details-order-text {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      padding-bottom: 32rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .details-order-company {
      font-size: 26rpx;
      color: #666;
    }
  }
}

// 商品信息
.refund-info {
  display: flex;
  width: 100%;
  // justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32rpx;
  border-bottom: 2rpx dashed #f5f5f5;
  padding-bottom: 32rpx;
  img {
    width: 136rpx;
    height: 136rpx;
    background: #f3f3f3;
    border-radius: 16rpx;
    margin-right: 32rpx;
    position: relative;
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
  .refund-info-center {
    font-size: 26rpx;
    color: #666;
    width: 462rpx;
    .refund-standar {
      display: flex;
      justify-content: space-between;
      padding-top: 16rpx;
      > text:first-child {
        width: 90%;
      }
      > text:nth-child(2) {
        width: 10%;
      }
      .refund-info-conf {
        width: 120rpx;
      }
    }
  }
}
//
.details-refund-data {
  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    color: #999999;
    padding-top: 8rpx;
    .copy-icon {
      width: 38rpx;
      height: 38rpx;
      margin-left: 8rpx;
    }
  }
}
.price-bar {
  margin-left: 8rpx;
}

.money-icon {
  font-size: 22rpx;
  color: #f86c4d;
  font-weight: bold;
}
.money-icon-dark {
  font-weight: bold;
  color: #333333;
  font-size: 22rpx;
}
.money-dark {
  font-weight: bold;
  color: #333333;
  font-size: 32rpx;
}
.goods-icon {
  width: 48rpx;
  height: 48rpx;
}
.refund-info-center-top {
  font-size: 28rpx;
  font-weight: bold;
  color: #000000;
}
.refuse-reason {
  padding-top: 8rpx;
}
.refuse-reason-text {
  font-size: 26rpx;
  color: #333333;
  line-height: 30rpx;
  padding-top: 8rpx;
}
</style>
