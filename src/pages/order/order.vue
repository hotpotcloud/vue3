<template>
  <view>
    <h-relogin :show="showRelogin" @onClick="toRelogin" />
    <view v-if="!showRelogin">
      <u-sticky offset-top="0">
        <view class="tab-btn" v-if="BaseApp.digitalShop">
          <view class="tab-bar">
            <view
              :class="['tab-5', activeType === el.value && 'active-bar']"
              v-for="(el, index) in pickBars"
              :key="index"
              @tap="changeType(el)"
              >{{ el.text }}</view
            >
          </view>
        </view>
        <view class="tabs-top d-flex-center d-sb">
          <view
            v-for="(el, index) in tabBars"
            :class="[activeTab === el.keyName && 'active', 'tab-cell']"
            :key="index"
            @tap="switchTab(el)"
          >
            <view> {{ el.name }}</view>
            <view
              class="order-nums"
              :class="[el.num > 99 && 'order-nums-99']"
              v-if="el.num"
              >{{ el.num > 99 ? "99+" : el.num }}</view
            >
          </view>
        </view>
      </u-sticky>
      <view class="container">
        <!-- <Card /> -->
        <!-- 订单商品信息 -->
        <view v-if="loading">
          <!-- orderList.length !== 0 -->
          <view class="order-container" v-if="orderList.length > 0">
            <OrderCard
              v-for="(item, index) in orderList"
              :key="index"
              :item="item"
              :activeType="activeType"
              :takeNum="takeNum"
              :pickCode="pickCode"
              @finish="finish"
              @goPay="goPay"
              @tosendinfo="tosendinfo"
              @goDetail="goDetail"
              @applyRefund="applyRefund"
              @toNewCalendar="toNewCalendar"
              @showQRCode="showQRCode"
              :takeNumBarCodeBase64="takeNumBarCodeBase64"
            />
            <view class="no-more">
              <text v-if="orderList.length === total">没有更多啦</text>
              <text v-else>上拉加载</text>
            </view>
          </view>
          <view class="none-data" v-else>
            <view class="no-data">
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png"
                mode=""
              ></image>
            </view>
            <view class="no-text">暂无数据</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { order, pay, refund } from "@/utils/url";
import { getImgUrl, getNowMonth } from "@/utils/utils";
import api from "@/utils/api";
import { OrderCard } from "@/pages/order/components/OrderCard.vue";
import { BaseApp } from "@/const/appIdConf";
import {
  orderTypeEnum,
  orderStatus,
  orderStatusText,
  refundStatus,
  refundStatusText,
  deliverTypeEnum,
  ordersType,
  pickType,
  OrderTagTypeEnum,
} from "@/utils/enum";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    // mediaItem
    OrderCard,
  },
  data() {
    return {
      showRelogin: false,
      BaseApp,
      countTimeEnd: false, //倒计时结束
      loading: false, //加载
      showEmpty: false, //暂无数据
      ordersType,
      orderTypeEnum,
      orderStatus,
      orderStatusText,
      refundStatus,
      refundStatusText,
      deliverTypeEnum, //配送类型
      total: 0,
      page: 1,
      activeType: pickType.SEND.value,
      tabBars: [],
      tabArr: [
        {
          keyName: 0,
          name: orderStatusText.ALL,
          value: orderStatus.ALL,
          num: 0,
        },
        {
          keyName: 1,
          name: orderStatusText.WAIT_PAYMENT,
          value: orderStatus.WAIT_PAYMENT,
          num: 0,
        },
        {
          keyName: 2,
          name: orderStatusText.WAIT_DELIVERY,
          value: orderStatus.WAIT_DELIVERY,
          num: 0,
        },
        {
          keyName: 3,
          name: orderStatusText.DELIVERING,
          value: orderStatus.DELIVERING,
          num: 0,
        },
        // {
        //   keyName: 5,
        //   name: orderStatusText.REFUNDED,
        //   value: orderStatus.REFUNDED,
        //   num: 0,
        // },
        {
          keyName: 4,
          name: orderStatusText.FINISH,
          value: orderStatus.FINISH,
          num: 0,
        },
      ],
      pickBars: [
        {
          text: pickType.SEND.text,
          value: pickType.SEND.value,
        },
        {
          text: pickType.PICK.text,
          value: pickType.PICK.value,
        },
      ],
      tabsList: [
        {
          keyName: 0,
          name: orderStatusText.ALL,
          value: orderStatus.ALL,
          num: 0,
        },
        {
          keyName: 1,
          name: orderStatusText.WAIT_PAYMENT,
          value: orderStatus.WAIT_PAYMENT,
          num: 0,
        },
        {
          keyName: 2,
          name: orderStatusText.WAIT_PICK,
          value: orderStatus.WAIT_DELIVERY,
          num: 0,
        },
        {
          keyName: 3,
          name: orderStatusText.PICKED,
          value: orderStatus.FINISH,
          num: 0,
        },
      ],
      isActive: false,
      activeTab: 0,
      orderList: [],
      disabled: false,
      // 赠品标签
      giftTag:
        "width: 60rpx;height: 30rpx;background: #FFCD5F;border-radius: 16rpx 0px 16rpx 0px;border:none;text-align: center;:center;color:#000;line-height:30rpx",
      // 组合标签
      combineTag:
        "width: 60rpx;height: 30rpx;background: #1D9BDC;border-radius: 16rpx 0px 16rpx 0px;color:#fff;border:none;text-align: center;line-height:30rpx",
      takeNum: "",
      pickCode: "",
      takeNumBarCodeBase64: "",
    };
  },
  // 下拉触底加载更多
  onReachBottom() {
    console.log("触底了");
    // return;
    if (this.orderList.length < this.total) {
      this.page = this.page + 1;
      this.getList(this.activeTab, true);
    }
  },
  async onLoad(option) {
    this.activeType = option.tabType || pickType.SEND.value;
    // console.log(option.tabType, typeof option.tabType, "88888>>>");
    // 没登录
    await this.$onLaunched;
    const token = uni.getStorageSync("malltoken");
    if (!token) {
      this.loading = true;
      this.showRelogin = true;
      return;
    }
  },

  async onShow() {
    this.tabBars =
      this.activeType === pickType.SEND.value ? this.tabArr : this.tabsList;
    uni.showTabBar();
    await this.$onLaunched;
    this.orderList = [];
    console.log("this.loginStatus", this.loginStatus);

    this.loading = !this.loginStatus;
    this.showRelogin = !this.loginStatus;
    // this.showRelogin = !token;
    if (!this.loginStatus) return;
    // return (this.loading = true), (this.showRelogin = true);
    this.page = 1;
    this.loading = false;
    this.getList(this.activeTab);
    this.getOrderNum(); //获取订单数量
  },
  computed: {
    ...mapState("user", ["loginStatus"]),
    ...mapState("milkcard", ["cardOrderDetail"]),
  },
  methods: {
    ...mapMutations("user", ["initUser"]),
    ...mapActions("order", [
      "X_getGoodsMsg",
      "getOrderDate",
      "getOrderAccount",
      "getOrderCalendar",
    ]),
    ...mapMutations("order", [
      "V_setGoodsMsg",
      "v_setOrderDate",
      "setDateParams",
    ]),
    ...mapMutations("refund", ["X_setRefundInfo"]),
    ...mapActions("milkcard", ["get_CardOrderDetail"]),
    // 去登录
    toRelogin() {
      uni.navigateTo({
        url: "/pages/user/relogin",
      });
    },
    /**倒计时结束 */
    finish() {
      console.log("e-倒计时");
      this.countTimeEnd = true;
      this.getList(this.activeTab);
    },
    /**倒计时变化 */
    changeTime(e) {
      console.log("e-倒计时变化", e);
    },
    //查看物流
    async tosendinfo(item) {
      const { orderNo, type, refundTextName } = item;
      this.getDetail(orderNo, type);
      this.X_getGoodsMsg(orderNo).then(() => {
        uni.navigateTo({
          url: `/subPages/order/sendinfo?type=${type}&orderNo=${orderNo}&refundTextName=${refundTextName}`,
        });
      });
    },
    // 获取订单详情
    async getDetail(orderNo, type) {
      try {
        const { data } = await this.GET(
          order.orderDetail + `/${orderNo}?type=${type}`
        );
        if (data.type === 1) {
          data.goodsInfos.forEach((el) => {
            el.goodsImgUrl = getImgUrl(el.goodsImgUrl);
          });
        }
        this.V_setGoodsMsg({ info: data.goodsInfos, status: data });
        // return data.goodsInfos;
      } catch (err) {
        console.log(err);
      }
    },
    // 切换自提方式
    changeType(el) {
      console.log(el.value, "==>");
      this.activeType = el.value;
      this.tabBars =
        el.value === pickType.PICK.value ? this.tabsList : this.tabArr;
      // console.log(this.tabBars, "===");
      this.page = 1;
      this.loading = false;
      this.orderList = [];
      this.getList(this.activeTab);
      this.getOrderNum();
    },
    // 切换订单类型
    switchTab(el) {
      this.page = 1;
      this.loading = false;
      this.activeTab = el.keyName;
      this.orderList = [];
      this.getList(el.value);
    },
    // 确认订单
    goOrderConfirm() {
      uni.navigateTo({
        url: "/subPages/order/orderConfirm",
      });
    },
    // 获取门店自提扩展信息
    async getShopExtendOrderData(list) {
      try {
        // console.log(list.length, "00000000000000");
        const orderNums = list.map((el) => {
          return el.orderNo;
        });
        if (orderNums.length <= 0) {
          return;
        }
        const para = orderNums;
        const res = await api.$post(order.shopOrderList, para, "加载中...");
        const { data } = res;
        const tempExtObj = {};
        data.forEach((item) => {
          tempExtObj[item.orderNo] = item;
        });
        list.forEach((item) => {
          item.takeTimeFormatter = tempExtObj[item.orderNo].takeTimeFormatter;
          item.takeRealTime = tempExtObj[item.orderNo].takeRealTime;
        });
        // console.log(list, "====>", data);
        return list;
      } catch (error) {
        console.log(error);
      }
    },
    //获取订单列表
    async getList(val, bottom = false) {
      try {
        this.tabBars.forEach((el, i) => {
          if (val === i) {
            val = el.value;
          }
        });
        const para = {
          orderStatus: !val ? null : val,
          page: this.page,
          size: 10,
          platformEnum:
            this.activeType === pickType.PICK.value ? "XHJMD" : null,
        };
        // 没登录
        if (!this.loginStatus) {
          this.orderList = [];
          this.loading = true;
          return;
        }
        //优化这部分代码
        this.loading = bottom;
        const { data } = await api.$post(order.orderPage, para, "加载中");
        const { totalElements, content } = data;
        const shopOrderList =
          this.activeType === pickType.PICK.value &&
          (await this.getShopExtendOrderData(content));
        // console.log(shopOrderList, "==>>>");
        this.total = totalElements;
        let list = [];
        if (this.page === 1) {
          list =
            this.activeType === pickType.PICK.value ? shopOrderList : content;
        } else {
          list =
            this.activeType === pickType.PICK.value
              ? [...this.orderList, ...shopOrderList]
              : [...this.orderList, ...content];
        }
        list.forEach((el) => {
          el.countTime = this.countTime(
            el.orderTimestamp,
            el.minute,
            el.nowDate
          );
          if (el.type === 1) {
            el.items.forEach((item) => {
              item.goodsImgUrl = getImgUrl(item.goodsImgUrl);
            });
          }
        });
        // console.log(list, "处理后的数据");
        this.orderList = list;
        this.loading = true;
        // console.log("data", data);
      } catch (error) {
        //
      } finally {
        this.loading = true;
      }
    },
    // fc05
    // 配送日历
    // toNewCalendar(item) {
    //   console.log("item---日历", item);
    //   const { items } = item;
    //   const val = items.find((el) => el.orderNo === item.orderNo);
    //   const { orderNo } = val;
    //   const payload = {
    //     // date: deliveryStartDate
    //     //   .split("/")
    //     //   .join()
    //     //   .replace(",", "-")
    //     //   .split(",")[0],
    //     orderNo,
    //     date: getNowMonth(),
    //     // currentDate: deliveryStartDate.replaceAll("/", "-"),
    //   };
    //   this.v_setOrderDate(payload);
    //   uni.navigateTo({
    //     url: `/subPages/order/date/index`,
    //     success: () => {
    //       this.getOrderDate();
    //     },
    //   });
    // },
    // fc07配送日历
    async toNewCalendar(item) {
      try {
        console.log("item---日历", item);
        const { items } = item;
        const val = items.find((el) => el.orderNo === item.orderNo);
        const { orderNo } = val;
        const payload = {
          orderNo,
          date: getNowMonth(),
        };
        this.setDateParams(payload); //保存参数
        await this.getOrderAccount(); //履约账户列表
        // this.v_setOrderDate(payload);
        uni.navigateTo({
          url: "/subPages/order/date/index",
          success: () => {
            this.getOrderCalendar(); //配送日历
          },
        });
      } catch (error) {
        //
      }
    },
    //详情
    async goDetail(val) {
      console.log(val, "val");
      const { orderNo, type, deliverType, refundTextName, platformSourceCode } =
        val;
      if (
        deliverType === deliverTypeEnum.MILK_AND_EXPRESS_DELIVERY ||
        deliverType === deliverTypeEnum.EXPRESS_DELIVERY
      ) {
        //物流
        this.X_getGoodsMsg(orderNo).then(
          uni.navigateTo({
            url: `/subPages/order/orderDetail?orderNo=${orderNo}&type=${type}&showexpress=true&refundTextName=${refundTextName}&platformSourceCode=${platformSourceCode}`,
          })
        );
      } else {
        let url =
          val.tagType !== OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
            ? `/subPages/order/orderDetail?orderNo=${orderNo}&type=${type}&showexpress=false&refundTextName=${refundTextName}&platformSourceCode=${platformSourceCode}`
            : "";
        if (val.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER) {
          console.log("orderNo", orderNo);
          await this.get_CardOrderDetail(orderNo);
          if (this.cardOrderDetail?.orderNo) {
            url = `/child-pages/order-detail/index?orderNo=${orderNo}&platformSourceCode=${platformSourceCode}`;
          }
        }
        uni.navigateTo({
          url,
        });
      }
    },
    //申请退款
    async applyRefund(item) {
      const { afterSaleNo, orderNo } = item;
      if (!afterSaleNo) {
        //申请售后
        try {
          const { data } = await this.GET(refund.checkApplyNum + `/${orderNo}`);
          this.X_setRefundInfo(data);
          setTimeout(() => {
            uni.navigateTo({
              url: `/subPages/refund/refund`,
            });
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
    // 微信支付
    toWxPay(data) {
      wx.requestPayment({
        nonceStr: data.nonceStr,
        package: data.packageValue,
        paySign: data.paySign,
        timeStamp: data.timeStamp,
        signType: data.signType,
        success: (res) => {
          console.log("success:" + res);
          this.orderList = [];
          this.page = 1;
          this.getList(this.activeTab);
        },
        fail: () => {
          console.log("fail:" + this.disabled);
          uni.showToast({
            title: "支付失败",
            icon: "none",
          });
        },
        complete: () => {
          this.disabled = false;
        },
      });
    },
    // 付款
    async goPay(orderNo) {
      try {
        if (this.disabled) return;
        this.disabled = true;
        let userInfo = uni.getStorageSync("userMsg");
        const para = {
          openId: userInfo.openId,
          appId: userInfo.appId,
          orderNo: orderNo,
          payMethodType: 0,
        };
        const { data } = await this.POST(pay.wechatPay, para, "加载中");
        if (data) {
          this.toWxPay(data);
        } else {
          uni.showToast({
            title: "此商品已下架，请重新选购",
            duration: 2000,
            icon: "none",
          });
          this.getList(this.activeTab);
          // setTimeout(() => {
          //   uni.switchTab({
          //     url: `/pages/product/product`,
          //   });
          // }, 2000);
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        this.disabled = false;
      }
    },
    //FC-05
    // 订单角标
    async getOrderNum() {
      try {
        if (!this.loginStatus) return;
        console.log("0000000000");
        const { data } =
          this.activeType === pickType.SEND.value
            ? await this.GET(order.findQty)
            : await this.GET(order.shopOrderQty);
        console.log("data", data);
        const arr = Object.keys(data);
        console.log("arr", arr);
        this.tabBars.forEach((el) => {
          if (el.value === orderStatus.ALL) {
            // el.num = data.all;
          } else if (el.value === orderStatus.WAIT_PAYMENT) {
            el.num = data.waitPayment;
          } else if (el.value === orderStatus.WAIT_DELIVERY) {
            el.num = data.waitDelivery;
          } else if (el.value === orderStatus.DELIVERING) {
            el.num = data.delivering;
          } else if (el.value === orderStatus.FINISH) {
            // el.num = data.finish;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    // 查看提货码
    async showQRCode(item) {
      try {
        console.log(item, "=============");
        // this.orderStatus=item.status;
        const { data } = await this.GET(
          order.selectOrderItemStoresByOrderNo + "?orderNo=" + item.orderNo
        );
        this.takeNum = data.takeNumAll;
        this.pickCode = data.takeNumQrCodeBase64;
        this.takeNumBarCodeBase64 = data.takeNumBarCodeBase64;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #f5f5f5;
  height: 100%;
  overflow-y: auto;
  min-height: calc(100vh - 104rpx);
}
.tabs {
  // padding: 0 32rpx;
  height: 104rpx;
  background-color: #fff;
}
// 卡片样式
::v-deep .order-container {
  padding: 24rpx 32rpx;
  //   .card-body-list {
  //     // background: #1d9bdc;
  //     .margin24 {
  //       margin-top: 24rpx;
  //       padding-bottom: 36rpx !important;
  //     }
  //     .card-body {
  //       display: flex;
  //       justify-content: left;
  //       padding-bottom: 24rpx;
  //       border-bottom: 2rpx dashed #f4f4f4;
  //       .uni-list-item {
  //         padding-bottom: 0;
  //       }
  //       .goods-cover {
  //         // margin-top: 24rpx;
  //         width: 136rpx;
  //         height: 136rpx;
  //         background: #f3f3f3;
  //         border-radius: 16rpx;
  //         margin-right: 24rpx;
  //         position: relative;
  //         // background: #f86c4d;
  //         image,
  //         .cardimg {
  //           // display: block;
  //           // box-sizing: content-box !important;
  //           width: 100%;
  //           height: 100%;
  //           border-radius: 16rpx;
  //         }
  //       }

  //       .goods-gift {
  //         // margin-top: 24rpx;
  //         width: 112rpx;
  //         height: 112rpx;
  //         background: #f3f3f3;
  //         border-radius: 16rpx;
  //         margin-right: 24rpx;
  //         margin-left: 24rpx;
  //         position: relative;

  //         image {
  //           display: block;
  //           width: 100%;
  //           height: 100%;
  //           border-radius: 16rpx;
  //         }
  //       }

  //       .uni-tag {
  //         position: absolute;
  //         top: 0;
  //         left: 0;
  //         z-index: 100;
  //         padding: 0;
  //       }
  //       .uni-lists {
  //         color: #666666;
  //         font-size: 26rpx;
  //         // padding-bottom: 12rpx;
  //         height: 136rpx;
  //         flex: 1;
  //         // background: #666666;
  //         .max-info {
  //           // max-width: 312rpx;
  //           margin-bottom: 16rpx;
  //           color: #333333;
  //           font-weight: bold;
  //           font-size: 28rpx;
  //           line-height: 33rpx;
  //         }
  //       }
  //     }
  //   }
  // }
  // button {
  //   padding: 0;
  //   font-size: 26rpx;
  //   margin-right: 0;
  //   border: none;
  // }
  // .pay-time {
  //   color: #999999;
  //   font-size: 24rpx;
  //   padding-top: 16rpx;
  //   // background-color: #f00;
  // }
  // .card-footer {
  //   // margin-top: 24rpx;
  //   // background: #999;
  //   .btns-footer {
  //     .footer-btn {
  //       width: 196rpx;
  //       height: 60rpx;
  //       background: #fff;
  //       line-height: 60rpx;
  //       text-align: center;
  //       border: 1rpx solid #1d9bdc;
  //       border-radius: 76rpx;
  //       font-size: 26rpx;
  //       color: #1d9bdc;
  //       // margin-right: 16rpx;
  //     }
  //     .footer-btn:last-child {
  //       margin: 0;
  //     }
  //     .suc {
  //       @extend .footer-btn;
  //       min-width: 160rpx;
  //       // min-width: 120rpx;
  //       background: #1d9bdc;
  //       color: #fff;
  //       display: flex;
  //       flex: 1;
  //       align-items: center;
  //       justify-content: center;
  //       // padding: 0 16rpx;
  //       .u-count-down__text {
  //         color: #fff;
  //         font-size: 22rpx;
  //       }
  //     }
  //   }

  //   .timer {
  //     .u-count-down__text {
  //       // color: #f86c4d;
  //       color: #666666;
  //       font-size: 22rpx;
  //     }
  //   }
  // }
}

// ::v-deep .timer {
//   .u-count-down__text {
//     font-size: 26rpx !important;
//     font-weight: bold;
//   }
// }

.none-data {
  padding-top: 350rpx;
  // background: #fff;
  height: calc(100vh - 104rpx);
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
// tabs
.tabs-top {
  padding: 0 48rpx;
  height: 88rpx;
  font-size: 30rpx;
  color: #999;
  background: #fff;
  .tab-cell {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    color: #1d9bdc;
    font-weight: bold;
    border-bottom: 4rpx solid #1d9bdc;
    // &::after {
    //   content: "";
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 4rpx;
    //   background: #1d9bdc;
    //   border-radius: 4rpx;
    // }
  }
  & .order-nums-99 {
    // @extend .order-nums;
    right: -34rpx !important;
  }
  .order-nums {
    min-width: 28rpx;
    height: 28rpx;
    padding: 2rpx 8rpx;
    // padding-bottom: 2rpx;
    border-radius: 14rpx;
    position: absolute;
    display: inline-block;
    top: 12rpx;
    right: -16rpx;
    font-size: 18rpx;
    font-weight: bold;
    color: #fff;
    background-color: #ec4747;
  }
}

.no-more {
  text-align: center;
  color: #999;
}
//顶部提货方式
.tab-btn {
  width: 100%;
  padding: 6rpx 48rpx;
  background: #fff;
  //background: #E4F4FF;
  //border-radius: 25%;
}
.tab-bar {
  width: 100%;
  height: 76rpx;
  background: #e4f4ff;
  border-radius: 38rpx;
  padding: 6rpx 0;
}
.tab-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  color: #1d9bdc;
  padding: 0 6rpx;
  .tab-5 {
    width: 50%;
    text-align: center;
  }
  .active-bar {
    width: 322rpx;
    height: 64rpx;
    background: linear-gradient(
      288deg,
      rgba(22, 147, 237, 0.72) 0%,
      #65d7fb 100%
    );
    border-radius: 32rpx;
    color: #fff;
    font-weight: bold;
    line-height: 64rpx;
  }
}
.pick-time {
  color: "#DB9918";
}
.pick-time {
  color: "#DB9918";
}
</style>
