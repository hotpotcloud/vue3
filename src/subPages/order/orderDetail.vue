<template>
  <view>
    <view class="container">
      <view class="order-container">
        <ShopDetail
          v-if="info.platformSourceCode === OrderShopType"
          :info="info"
          v-on:refreshDetail="refreshDetail"
          :orderNo="this.orderNo"
        />
        <view class="common-card status-info" v-else>
          <view class="order-status">
            <view class="order-timer">
              <text
                v-if="!pause"
                :class="
                  info.status === orderStatus.WAIT_PAYMENT ||
                  info.status === orderStatus.REFUNDED
                    ? 'order-statu-err'
                    : info.status === orderStatus.DELIVERING ||
                      info.status === orderStatus.WAIT_DELIVERY
                    ? 'order-statu-suc'
                    : 'order-statu'
                "
              >
                {{ orderStatusText[info.status] }}
                <!-- {{ info.statusName ? info.statusName : "" }} -->
              </text>
              <text v-else class="wait-pause">待恢复</text>
              <view
                class="count-down-time-fc05"
                v-if="
                  info.status === orderStatus.WAIT_PAYMENT &&
                  info.countTime &&
                  info.type === orderTypeEnum.TWO
                "
              >
                <u-count-down
                  @finish="finish"
                  :time="info.countTime"
                  format="mm:ss"
                  @change="onChangeTime"
                >
                  <view>
                    剩余：
                    <text v-if="timeData.hours">
                      {{
                        timeData.hours > 9
                          ? timeData.hours
                          : "0" + timeData.hours
                      }}
                      :
                    </text>
                    <text>
                      {{
                        timeData.minutes > 9
                          ? timeData.minutes
                          : "0" + timeData.minutes
                      }}
                    </text>
                    <text>:</text>
                    <text>
                      {{
                        timeData.seconds > 9
                          ? timeData.seconds
                          : "0" + timeData.seconds
                      }}
                    </text>
                  </view>
                </u-count-down>
              </view>
            </view>
          </view>
          <!-- 收货地址信息 -->
          <view style="margin-top: 40rpx" v-if="!!info.addressDTO">
            <h-receiver
              :defaulted="info.addressDTO.defaulted === 1"
              :name="info.addressDTO.receiver"
              :label="info.addressDTO.labelName"
              :detail="info.addressDTO.adressDetail"
              :phone="info.addressDTO.receiverPhone"
            />
          </view>
        </view>
        <!-- 物流信息 -->
        <Send :proName="goodsInfo[0].goodsName" :show="showexpress == 'true'" />

        <!-- 协商记录 -->
        <view
          v-if="info.histroyText"
          class="history-detail d-flex-center d-sb"
          @tap.stop="onLookHistory"
        >
          <view class="history-left-tip">查看修改记录</view>
          <view class="d-flex-center history-rig">
            <view class="rig-main">
              <view>{{ info.histroyText }}</view>
              <view>
                {{
                  formatTime(
                    "YYYY-mm-dd HH:MM:SS",
                    new Date(info.lastChangeRecord.createdTime).getTime()
                  )
                }}
              </view>
            </view>
            <!-- <view v-else class="rig-main"> 暂无修改记录 </view> -->
            <uni-icons type="right" size="12"></uni-icons>
          </view>
        </view>
        <!-- 商品信息 -->
        <Detail
          :msg="goodsInfo"
          :company="info.companyName"
          :total="info.totalAmount"
          :pay="info.payAmount"
          :status="info.status"
          @checkCanlendar="openCanlendar"
          :isShopOrder="isShopOrder"
          v-on:goToGoodsDetail="goToGoodsDetail"
        />
        <!-- fc05 -->
        <OrderInfos
          :info="info"
          :isShopOrder="isShopOrder"
          :goodsCount="info.goodsNumber"
        />
        <!-- 营销备注信息 -->
      </view>
    </view>
    <view>
      <ActionBtns
        :info="info"
        :loading="disabled"
        @shopAgin="buyAgin(goodsInfo)"
        @refundBtn="goRefund"
        @onDate="onActionBtns"
      />
    </view>
    <!-- 再次购买弹窗 -->
    <hGoodsModal
      :open="open"
      :goodsList="item.items"
      @closeGoodsModal="onClose()"
      @goGoodsDetail="goGoodsDetail()"
    />
  </view>
</template>

<script>
import { order, pay, refund } from "@/utils/url";
import {
  orderStatus,
  orderStatusText,
  refundStatus,
  orderTypeEnum,
  ordersType,
  deliverTypeEnum,
  HistroyTypeEnum,
  HistroyTypeText,
  OrderShopType,
  ORDER_TYPE_ENUM,
} from "@/utils/enum";
import { getImgUrl } from "@/utils/utils";
import { mapActions, mapMutations, mapState } from "vuex";
import Send from "./components/card.vue";
import Detail from "./components/orderdetail.vue";
import OrderInfos from "./components/order-Infos.vue";
import ActionBtns from "./components/action-btns.vue";
import { formatTime, getNowMonth } from "@/utils/utils";
import ShopDetail from "./components/ShopDetail.vue";
// import HGoodsModal from "@/components/h-goods-modal/h-goods-modal.vue";
import hGoodsModal from "@/components/h-goods-modal/h-goods-modal.vue";

export default {
  components: {
    Send,
    Detail,
    OrderInfos,
    ActionBtns,
    ShopDetail,
    hGoodsModal,
  },
  data() {
    return {
      ORDER_TYPE_ENUM,
      HistroyTypeText,
      HistroyTypeEnum,
      deliverTypeEnum,
      ordersType,
      orderTypeEnum,
      orderStatus,
      orderStatusText,
      refundStatus,
      info: {},
      goodsInfo: [],
      disabled: false,
      loading: false,
      showTab: 0, //当前包裹下标
      showMore: false, //查看更多物流
      showexpress: false, //是否显示物流信息
      refundTextName: "", //申请售后or售后详情
      // refundName:"",
      timeData: null,
      // 参数
      orderNo: "",
      type: "",
      OrderShopType,
      platformSourceCode: "",
      open: false,
      pause: false, //是否恢复订单
    };
  },
  onLoad(option) {
    console.log(option, "页面初始化");
    const { showexpress, refundTextName } = option;
    // this.showexpress = showexpress ? showexpress : this.showexpress;
    this.showexpress = showexpress;
    // this.refundTextName = refundTextName ? refundTextName : this.refundTextName;
    this.refundTextName = refundTextName;
    this.orderNo = option.orderNo;
    this.type = option.type;
    console.log(this.orderNo, option, " this.orderNo");
    this.platformSourceCode = option.platformSourceCode;
    // this.orderNo = "2305260843000000682";
    // this.type = 2;
    this.pause = option?.pause;
    this.getDetail(this.orderNo, this.type);
    this.getShopOrderDetail({ orderNo: this.orderNo });
  },
  onShow() {},
  computed: {
    sendshow() {},
    isShopOrder() {
      return this.info.platformSourceCode === OrderShopType;
    },
    ...mapState("order", ["shopOrderDetail", "shopDetail"]),
  },
  methods: {
    ...mapActions("order", [
      "X_getGoodsMsg",
      "getOrderDate",
      "getShopOrderDetail",
      "getOrderHistroy", //协商历史
      "getOrderAccount",
      "getOrderCalendar",
    ]),
    ...mapMutations("refund", ["X_setRefundInfo"]),
    ...mapMutations("order", ["v_setOrderDate", "setDateParams"]),
    formatTime,
    refreshDetail() {
      this.getDetail(this.orderNo, this.type);
    },
    // 再次购买
    onClose() {
      this.open = false;
    },
    async buyAgin(goods) {
      console.log(goods, "<==>");
      const arr = goods.find((el) => {
        return !el.present;
      });
      if (arr.length > 1) {
        this.open = true;
      } else {
        const isShelf = await this.checkGoodsStatus(goods[0].spuCode);
        isShelf &&
          uni.navigateTo({
            url: `/subPages/product/proDetail?id=${goods[0].spuCode}`,
          });
      }
    },
    async checkGoodsStatus(spuCode) {
      try {
        const { data } = await this.GET(
          order.checkProductStatus + `/${spuCode}`
        );
        if (data) {
          return data;
        } else {
          return uni.showToast({
            title: "商品已下架",
            icon: "none",
          });
        }
      } catch (error) {}
    },
    goGoodsDetail(spuCode) {
      const isShelf = this.checkGoodsStatus(spuCode);
      isShelf &&
        uni.navigateTo({
          url: `/subPages/product/proDetail?id=${spuCode}`,
        });
    },
    // 倒计时结束
    finish(e) {
      this.getDetail(this.orderNo, this.type);
    },
    // 倒计时变化
    onChangeTime(e) {
      this.timeData = e;
    },
    //点击多包裹
    handTab(i) {
      this.showTab = i;
    },
    checkMore() {
      this.showMore = !this.showMore;
      console.log("this.showMore", this.showMore);
    },
    // 跳转配送日历
    openCanlendar(item) {
      item.type = this.info.type;
      this.$store.commit("canlendar/setParams", item);
      uni.navigateTo({
        url: "/subPages/date/index",
      });
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

    // 获取订单详情
    async getDetail(orderNo, type) {
      try {
        this.disabled = true;
        const { data } = await this.GET(
          this.platformSourceCode === OrderShopType
            ? order.shopStoreOrderDetail + `/${orderNo}?type=${type}`
            : order.orderDetail + `/${orderNo}?type=${type}`
        );
        // 1.0图片
        if (data.type === 1) {
          data.goodsInfos.forEach((el) => {
            el.goodsImgUrl = getImgUrl(el.goodsImgUrl);
          });
        }
        this.info = data;
        this.info.refundText = "";
        // this.goodsInfo = this.info.goodsInfos;
        this.goodsInfo = data.goodsInfos;
        this.info.countTime = this.countTime(
          this.info.orderTimestamp,
          this.info.minute,
          this.info.nowDate
        );
        if (
          //物流显示
          (data.deliverType === deliverTypeEnum.MILK_AND_EXPRESS_DELIVERY ||
            data.deliverType === deliverTypeEnum.EXPRESS_DELIVERY) &&
          // this.showexpress != true
          !this.showexpress
        ) {
          this.X_getGoodsMsg(orderNo).then(() => (this.showexpress = "true"));
          console.log(" 显示物流信息详情??！！！！！");
        } else {
          this.showexpress = "false";
          console.log(" 不显示物流详情！！！3222");
        }
        this.info.refundText = this.textToDo(data);
        console.log(
          this.info.refundText,
          "this.info.refundText---------------------"
        );
        this.info.histroyText = this.calcHistroyText(data.lastChangeRecord);
        console.log("this.info", this.info);
      } catch (err) {
        console.log(err);
      } finally {
        this.disabled = false;
      }
    },
    // 退款字段
    /**
     * @param {string,string,string} 订单状态，售后状态,订单类型
     * status saleStatus orderType
     */
    returnText(status, saleStatus, orderType) {
      console.log("saleStatus", saleStatus);
      if (
        status === orderStatus.WAIT_PAYMENT ||
        status === orderStatus.CANCELED ||
        (status === orderStatus.FINISH && saleStatus === refundStatus.UN_SUBMIT)
      ) {
        return;
      }
      // if (
      //   status === orderStatus.FINISH &&
      //   saleStatus === refundStatus.UN_SUBMIT
      // ) {
      //   return;
      // }
      if (
        status !== orderStatus.FINISH &&
        saleStatus === refundStatus.UN_SUBMIT
      ) {
        return "申请售后";
      } else {
        return "售后明细";
      }

      // const retuSaleText = () => {
      //   if (
      //     saleStatus === refundStatus.UN_SUBMIT
      //     // saleStatus === refundStatus.REVOKED
      //   ) {
      //     //未提交申请
      //     return "申请售后";
      //   } else {
      //     //提交过申请
      //     // return "售后详情";
      //     return "售后明细";
      //   }
      // };
      // const obj = {
      //   //待支付
      //   WAIT_PAYMENT: () => {
      //     return "";
      //   },
      //   //待配送
      //   WAIT_DELIVERY: () => {
      //     return retuSaleText();
      //   },
      //   //配送中
      //   DELIVERING: () => {
      //     return retuSaleText();
      //     // 且零购
      //     // if (orderType === ordersType.RETAIL_PURCHASE) {
      //     //   return retuSaleText();
      //     // } else return "";
      //   },
      //   // 已完成
      //   FINISH: () => {
      //     // 已完成且零购
      //     if (orderType === ordersType.RETAIL_PURCHASE) {
      //       return retuSaleText();
      //     } else return "";
      //   },
      //   //已关闭
      //   CANCELED: () => {
      //     return "";
      //   }
      // };
      // return Object.keys(obj).includes(status) ? obj[status]() : "";
    },
    // 文字处理
    textToDo(el) {
      let refundTextName = ""; //退款文字
      console.log(el.type, "el.type");
      switch (el.type) {
        case orderTypeEnum.TWO: //2.0订单
          refundTextName = this.returnText(
            el.status,
            el.saleStatus,
            el.orderType
          );
          return refundTextName;
        // case orderTypeEnum.ONE: //1.0订单
        //   refundTextName = "";
        //   break;
        default:
          return (refundTextName = "");
      }
    },
    // 跳转添加地址
    goAddressList() {
      console.log(77);
      uni.navigateTo({
        url: "/subPages/address/addressList",
      });
    },
    // 支付
    async goPay(orderNo) {
      this.disabled = true;
      try {
        let userInfo = uni.getStorageSync("userMsg");
        const para = {
          openId: userInfo.openId,
          appId: userInfo.appId,
          orderNo: orderNo,
          payMethodType: 0,
        };
        console.log(para, "订单");
        const { data } = await this.POST(pay.wechatPay, para, "加载中");
        if (data) {
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
              console.log(res, "支付结果");
              this.getDetail(orderNo, this.type);
              this.getShopOrderDetail({ orderNo: orderNo });
            },
            fail: (err) => {
              this.disabled = false;
              console.log(this.disabled, "失败支付结果");
            },
          });
        } else {
          uni.showToast({
            title: "此商品已下架，请重新选购",
            duration: 2000,
            icon: "none",
          });
          setTimeout(() => {
            uni.redirectTo({
              url: `/pages/product/product`,
            });
          }, 2000);
        }
      } catch (err) {
        console.log(err, "抓错");
      }
    },

    //退款详情
    goRefundDetail(afterSaleNo) {
      uni.navigateTo({
        url: `/subPages/refund/refundDetails?afterSaleNo=${afterSaleNo}`,
      });
    },
    // FC05
    // 跳转配送日历
    // newCalendar(el) {
    //   const { goodsInfos } = el;
    //   console.log("3--配送日历", el);
    //   const { deliveryStartDate, orderNo } = goodsInfos[0];
    //   const par = {
    //     orderNo: orderNo,
    //   };
    //   this.v_setOrderDate(par);
    //   uni.navigateTo({
    //     url: `/subPages/order/date/index`,
    //     success: () => {
    //       this.getOrderDate();
    //     },
    //   });
    // },
    // fc07配送日历
    async newCalendar(el) {
      const { goodsInfos } = el;
      console.log("3--配送日历", el);
      const { deliveryStartDate, orderNo } = goodsInfos[0];
      const par = {
        orderNo: orderNo,
        date: getNowMonth(),
      };
      this.setDateParams(par); //保存参数
      await this.getOrderAccount(); //履约账户列表
      this.v_setOrderDate(par);
      uni.navigateTo({
        url: `/subPages/order/date/index`,
        success: () => {
          // this.getOrderDate();
          this.getOrderCalendar(); //配送日历
        },
      });
    },
    // 支付或查日历
    onActionBtns(info) {
      if (this.disabled) return;
      if (info.status === orderStatus.DELIVERING) {
        this.newCalendar(info);
      }
      if (info.status === orderStatus.WAIT_PAYMENT) {
        this.goPay(info.orderNo);
      }
    },
    // 查看物流
    // 处理协商详情字段
    calcHistroyText(val) {
      if (!val) return;
      const { type, createdTime } = val;
      const text = HistroyTypeText[type];
      return text;
      //  const time=
    },
    //查看协商
    onLookHistory() {
      const { platformOrderNo, lastChangeRecord } = this.info;
      if (!platformOrderNo || !lastChangeRecord)
        return uni.showToast({
          title: "暂无修改记录",
          icon: "none",
          duration: 1500,
        });
      uni.navigateTo({
        url: "/subPages/fixRecord/index",
        success: () => {
          this.getOrderHistroy(platformOrderNo);
        },
      });
    },
    // 申请售后
    async goRefund(info) {
      console.log("info", info);
      const { orderNo, afterSaleNo, saleStatus, platformSourceCode } = info;
      console.log(saleStatus !== refundStatus.UN_SUBMIT, "=======");
      if (
        // saleStatus !== refundStatus.UN_SUBMIT &&
        // saleStatus !== refundStatus.REVOKED
        saleStatus !== refundStatus.UN_SUBMIT
      ) {
        uni.navigateTo({
          // url: `/subPages/refund/refundDetails?afterSaleNo=${afterSaleNo}`、
          url: "/subPages/refund/refundManage?orderNo=" + orderNo,
        });
      } else {
        try {
          if (
            platformSourceCode === ORDER_TYPE_ENUM.XYZDXD.value ||
            platformSourceCode === ORDER_TYPE_ENUM.XQS_DKXD.value
          ) {
            uni.showToast({
              title: "该订单为代付订单,退款后会支付到原账户,请悉知",
              icon: "none",
              duration: 3000,
            });
            setTimeout(async () => {
              const res = await this.GET(refund.getRefundInfo + `/${orderNo}`);
              this.X_setRefundInfo(res.data);
              uni.navigateTo({
                url: `/subPages/refund/refund?orderNo=${orderNo}`,
              });
            }, 3000);
          }
          // else if (platformSourceCode === ORDER_TYPE_ENUM.XHJMD.value) {
          //   return uni.showToast({
          //     title: "提示：抱歉，暂无法申请售后，请联系客服处理",
          //     icon: "none",
          //     duration: 3000
          //   });
          // }
          else {
            const res = await this.GET(refund.getRefundInfo + `/${orderNo}`);
            this.X_setRefundInfo(res.data);
            uni.navigateTo({
              url: `/subPages/refund/refund?orderNo=${orderNo}`,
            });
          }
        } catch (err) {
          uni.showToast({
            title: err.msg,
            icon: "none",
            duration: 1500,
          });
        }
      }
    },
    goToGoodsDetail(item) {
      console.log(item, "item", this.shopDetail);
      uni.navigateTo({
        url: `/shopPages/goodsDetail/index?spuCode=${item.spuCode}&shopConfigId=${this.shopDetail.shopConfigId}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  background: #f5f5f5;
  height: calc(100vh - 176rpx);
  overflow-y: auto;
  // height: auto !important;
  padding-bottom: 32rpx;
}
.order-container {
  padding: 24rpx 32rpx;
  background: #f5f5f5;
  .add-address {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    margin: 16rpx 0 48rpx 0;

    .add-text {
      font-size: 34rpx;
      font-weight: bold;
    }
  }
}
::v-deep .status-info {
  margin-bottom: 16rpx;
  .order-desc {
    font-size: 26rpx;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
  }
  .order-timer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8rpx;
    .order-statu {
      font-size: 34rpx;
      font-weight: bold;
      color: #999999;
    }
    .order-statu-suc {
      font-size: 34rpx;
      font-weight: bold;
      color: #1d9bdc;
    }
    .wait-pause {
      font-size: 34rpx;
      font-weight: bold;
      color: #f86c4d;
    }
    .order-statu-err {
      font-size: 34rpx;
      font-weight: bold;
      color: #f86c4d;
    }
    .count-down-time-fc05 {
      color: #f86c4d;
      font-size: 28rpx !important;
      font-size: bold !important;
    }
  }
}
.address-detail {
  font-weight: bold;
  color: #000000;
  font-size: 30rpx;
  margin-top: 8rpx;
}

::v-deep.user-info-box {
  font-size: 30rpx;
  display: flex;
  justify-content: left;
  align-items: center;
  .user-name {
    font-size: 30rpx;
  }
  .user-phone {
    padding: 0 32rpx;
    font-size: 30rpx;
  }
  .tag-view {
    .uni-tag {
      margin-right: 16rpx;
      padding: 4rpx 12rpx;
      background-color: #999999;
    }
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
::v-deep .common-card {
  .uni-list-item__content-title {
    font-size: 30rpx;
    color: #000;
    font-weight: bold;
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

::v-deep.card-checkbox {
  margin-bottom: 32rpx;

  .uni-list-item__container {
    padding: 0;
  }
}

::v-deep .card-other {
  padding: 0rpx 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  font-family: PingFang SC-Regular, PingFang SC;
  margin-bottom: 32rpx;
  color: #666666;
  uni-list-item {
    border-bottom: 2rpx dashed #f1f1f1;
    //border-bottom: 2rpx dashed #f00;
    .uni-list-item__container {
      padding: 32rpx 0px;
    }

    .uni-icon-wrapper {
      padding: 0px;
      padding-left: 16rpx;
    }

    .uni-list-item__content-title {
      font-size: 30rpx;
    }

    .uni-list-item__extra {
      .uni-list-item__extra-text {
        font-size: 26rpx;
      }
    }
  }
  uni-list-item:last-child {
    border: none;
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f00;
}

::v-deep.uni-icons {
  .uniui-info {
    font-size: 32rpx;
    color: #fff;
  }
}

.bottom-nav {
  border-top: 2rpx solid #e5e5e5;
  // box-shadow: 0rpx 4rpx 2rpx 6rpx  #E5E5E5;
  padding: 0 32rpx;
  padding-top: 32rpx;
  height: 228rpx;
  background: #fff;
  font-size: 34rpx;

  .bottom-nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pay-money-text {
      font-size: 34rpx;
      font-weight: bold;
      color: #000;
      .pay-money-amount {
        padding-left: 8rpx;
        color: #f86c4d;
        font-weight: bold;
        font-size: 34rpx;
      }
    }
    button {
      width: 320rpx;
      height: 104rpx;
      border-radius: 254rpx;
      color: #fff;
      border-color: #1d9bdc;
      line-height: 104rpx;
      padding: 0;
      margin: 0;
    }
  }
}
.pay-way-primary {
  width: 320rpx;
  height: 104rpx;
  background: #1d9bdc;
  color: #fff;
  border-radius: 254rpx;
  // color: #1d9bdc;
  // border-color: #1d9bdc;
  line-height: 104rpx;
  text-align: center;
}
::v-deep.uni-noticebar {
  position: fixed;
  bottom: 228rpx;
}
.slot-header {
  color: #666666;
  width: 200rpx;
  font-size: 24rpx;
  // font-weight: bold;
}
.slot-footer {
  font-size: 26rpx;
  color: #f86c4d;
}
.slot-footer-gray {
  font-size: 26rpx;
  color: "#666666";
}
.slot-footer-copy {
  display: flex;
  // justify-content: space-between;
  align-items: center;
}
.copy-icon {
  border: none;
  width: 32rpx;
  height: 32rpx;
  margin-right: 4rpx;
}
.slot-header-box {
  display: flex;
  justify-content: space-between;
  .slot-no {
    width: 70%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.reduce-amount {
  font-size: 26rpx;
  color: #666;
}

.online-severice {
  height: 104rpx;
  line-height: 104rpx;
  background: #1d9bdc;
  border-radius: 254rpx;
  color: #fff;
  border: 2rpx solid #1d9bdc;
}
.timer-count {
  font-weight: bold;
}
.tag-default {
  display: inline-block;
  width: 80rpx;
  height: 44rpx;
  background: #999999;
  border-radius: 8rpx;
  text-align: center;
  line-height: 44rpx;
  font-size: 26rpx;
  color: #fff;
  margin-right: 8rpx;
}
.send-info {
  background: #f00;
  border-radius: 24rpx;
  margin-bottom: 16rpx;
  padding: 32rpx;
  .copy-icon {
    border: none;
    width: 38rpx;
    height: 38rpx;
    margin-left: 8rpx;
  }
  .send-page-info {
    margin: 16rpx 0 32rpx;
    overflow-x: auto;
    .tab-current {
      margin-right: 48rpx;
      padding: 16rpx 0;
      min-width: 68rpx;
      &.maxw {
        min-width: 84rpx;
      }
      &:last-child {
        margin: 0;
      }
      &.active-tab {
        border-bottom: 4rpx solid #1d9bdc;
        color: #1d9bdc;
        font-weight: bold;
      }
    }
  }
  .detail-sendinfo {
    background: goldenrod;
    .check-more-btn {
      margin: 16rpx auto 0;
      text-align: center;
      background: #e5e5e5;
      width: 164rpx;
      height: 54rpx;
      line-height: 54rpx;
      border-radius: 76rpx;
      color: #1d9bdc;
      font-size: 22rpx;
    }
    .detail-info {
      background: #ff0;
    }
  }
}
//按钮css
.btn-group {
  padding: 32rpx;
  // background: #f00;
  .mar48 {
    margin-right: 48rpx;
  }
  .font34 {
    font-size: 34rpx;
    font-weight: bold;
    color: #000000;
  }
  .sale-btn {
    // min-width: 320rpx;
    height: 104rpx;
    line-height: 104rpx;
    border-radius: 254rpx;
    color: #1d9bdc;
    font-size: 34rpx;
    font-weight: bold;
    text-align: center;
    border: 1rpx solid #1d9bdc;
    padding: 0;
    // flex: 1;
  }
  .serve-btn {
    @extend .sale-btn;
    background: #1d9bdc;
    color: #fff;
  }
}
//fc05
.history-detail {
  background: #fff;
  padding: 24rpx;
  border-radius: 24rpx;
  margin-bottom: 16rpx;
  .history-left-tip {
    font-size: 30rpx;
    color: #000000;
    font-weight: bold;
  }
  .history-rig {
    justify-content: flex-end;
    .rig-main {
      text-align: right;
      margin-right: 22rpx;
    }
  }
}
</style>
