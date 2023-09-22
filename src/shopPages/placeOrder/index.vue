<template>
  <view class="place-order">
    <scroll-view scroll-y="true" class="order-content">
      <view class="top-box">
        <image
          class="method"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/method.png"
        />
        <view class="view-detail">
          <text @tap="goToDetail">查看</text>
          <view class="back-icon" @tap="goToDetail"></view>
        </view>
        <view class="top-info box">
          <view class="address d-flex d-sb">
            <view class="label">提货地址：</view>
            <view class="change" @tap="changeSuitShop">
              <text>切换</text>
              <text class="arrow"></text>
            </view>
          </view>
          <view>
            <ShopItem
              showPhone="true"
              :showTips="showLocationTips"
              v-on:onCancel="closeLocationTips"
              :item="shopDetail"
            />
          </view>
        </view>
      </view>
      <view class="receipt box">
        <view class="line d-flex d-sb d-flex-center phone">
          <view class="label">提货人：</view>
          <view class="d-flex-center">
            <input
              maxlength="11"
              placeholder="请输入提货人手机号"
              v-model="phone"
              placeholder-style="color:#A9A9A9;font-size:26rpx;text-align:right"
            />
            <text class="arrow" :style="{ color: '#A9A9A9' }"></text>
          </view>
        </view>
        <view class="line d-flex d-sb d-flex-center time">
          <view class="label">提货时间：</view>
          <view class="d-flex-center">
            <text @tap="changeDate">{{ getSelectText }}</text>
            <text class="arrow" :style="{ color: '#A9A9A9' }"></text>
          </view>
        </view>
        <view class="protocol d-flex-center">
          <view @tap="changeSelectProtocol">
            <image
              v-if="selectProtocol"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/checked.png"
            />
            <image
              v-else
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/not-check.png"
            />
            <text>同意并接受</text>
          </view>
          <text @tap="goToAgreement">《鲜活go平台自提服务协议》</text>
        </view>
      </view>
      <view class="box product">
        <view
          class="product-item"
          v-for="product in productInfo"
          :key="product.skuCode"
        >
          <h-GoodsMsg
            :comb="false"
            :img="product.goodsImgUrl"
            :name="product.goodsName"
            :present="product.present"
            :desc="product.goodsConf"
            :num="product.totalQty"
            :price="product.unitPrice"
            :remainStock="remainStock"
            :goodsCode="product.goodsCode"
            :isShopOrder="true"
          />
        </view>
        <!-- <ProductItem /> -->
        <!-- <view class="product-total d-flex d-sb">
          <view>商品总额</view>
          <view>
            <text class="yuan">¥</text
            >
            {{ orderPlanData.totalAmount | formatAmount }}
          </view>
        </view>-->
      </view>
      <!-- <view class="note-tip box"> -->
      <!-- <h-GoodsMsg
          :key="idx"
          :img="el.imageUrl"
          :name="el.name"
          :price="el.unitPrice"
          :desc="el.goodsConf"
          :startTime="el.deliveryStartDate"
          :endTime="el.deliveryEndDate"
          :num="el.qty"
      />-->
      <!-- </view> -->
      <view class="d-flex-center d-sb remarks box">
        <view class="font-26-w">备注</view>
        <view class="d-flex-center flex-1 xbff">
          <view class="remark-tip">
            <input
              type="text"
              maxlength="30"
              v-model="remark"
              placeholder="选填，请先和客服协商一致"
              placeholder-style="color:#A9A9A9;font-size:26rpx;text-align:right"
              style="text-align: right"
            />
          </view>
          <uni-icons type="right" color="#999999" size="15" />
        </view>
      </view>
      <view class="note-tip box">
        <view class="product-total d-flex d-sb">
          <view>商品总额</view>
          <view>
            <text class="yuan">¥</text>
            {{ orderPlanData.totalAmount | noformatAmount }}
          </view>
        </view>
        <view class="d-flex-center d-sb coupon" @tap="goChooseCoupon()">
          <view class="font-26-w">优惠券</view>
          <view class="d-flex-center flex-1 xbff">
            <text class="price-icon-color yuan">-￥</text>
            <text class="price-no-color">
              {{ orderPlanData.couponAmount | noformatAmount }}
            </text>
            <uni-icons type="right" color="#A9A9A9" size="15" />
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="bottom-nav">
      <view class="bottom-nav-bar">
        <!-- 
        "-->
        <view>
          <view
            class="reduce-amount"
            v-if="
              Number(`${orderPlanData.couponAmount}`) +
                Number(`${orderPlanData.marketingAmount}`) >
              0
            "
          >
            已减&nbsp;
            <text style="color: #f86c4d; padding-left: 4rpx">
              {{
                (Number(`${orderPlanData.couponAmount}`) +
                  Number(`${orderPlanData.marketingAmount}`))
                  | formatAmount
              }}
            </text>
          </view>
          <view class="pay-money-text">
            实付:
            <view class="pay-money-amount money-amount">
              <text class="money-icon">¥</text>
              {{ noformatAmount(orderPlanData.payAmount) }}
            </view>
          </view>
        </view>
        <!-- 灰色按钮和蓝色按钮 -->
        <button
          @click="placeOrder"
          class="pay-way-primary"
          :loading="loading"
          :disabled="notCanPlaceOrder"
          :class="{ disabled: notCanPlaceOrder }"
        >
          微信支付
        </button>
        <!-- <view v-else class="pay-way-default pay-way-info">微信支付</view> -->
      </view>
    </view>
    <SelectTime
      :getLeftTabList="getLeftTabList"
      :show="showDatePick"
      v-on:onCancel="closeModal"
      v-on:onChange="getChangeDate"
      :currenTimeIndex="currenTimeIndex"
      :confirmTab="confirmTab"
    />
  </view>
</template>

<script>
import { pay, address } from "@/utils/url";
import ShopItem from "@/components/shop-item";
import SelectTime from "./../components/selectTime";
// import ProductItem from "./../components/product";
import api from "@/utils/api";
import { shop, urlapi } from "./../../utils/url";
import { Global_Cog } from "@/utils/config";
import { mapState, mapActions, mapMutations } from "vuex";
import dayjs from "@/components/libs/util/dayjs";
import {
  // saleRange,
  // timeSectionEnum,
  // TimeSectionName,
  // ruleTypeEnum,
  pickType,
} from "@/utils/enum";

export default {
  data() {
    return {
      // saleRange,
      // timeSectionEnum,
      // TimeSectionName,
      // ruleTypeEnum,
      pickType,
      showDatePick: false,
      showLocationTips: false,
      shopId: "",
      shopDetail: {},
      phone: "",
      couponAmount: {},
      // 时间
      currenTimeIndex: 0,
      //时间tab
      confirmTab: 0,
      selectProtocol: true,
      sureOk: false,
      info: {},
      remark: "",
      loading: false,
      productInfo: [],
      timeoutRef: "",
      // 时间区间
      getLeftTabList: [],
      isShopCar: false,
      // 库存数据
      remainStock: [],
      notCanPlaceOrder: false,
      //商详
      spuCode: "",
      shopConfigId: "",
    };
  },
  components: { ShopItem, SelectTime },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("home", ["existArr", "addInfoMsg"]),
    ...mapState("order", [
      "orderPlanData",
      "resData",
      "showChange",
      "shopOrderGoodsInfo",
    ]),
    ...mapState("shop", ["suitShopList"]),
    ...mapState("shopCar", ["shopCarListParams"]),
    ...mapState("coupon", ["couponCode"]),

    // 选中文本
    getSelectText() {
      const date = this.getLeftTabList[this.confirmTab];
      if (date) {
        const time = date?.sectionList[this.currenTimeIndex];
        return `${date.name}（${date.week}）${time.text}`;
      }
      return "";
    },
  },
  onLoad(options) {
    console.log("onloadoptions", options);
    uni.removeStorageSync("placeOrderOptions");
    this.initData(options);
  },
  onShow: function () {
    console.log("onShow");
    // 针对安卓机
    const options = uni.getStorageSync("placeOrderOptions");
    if (options) {
      this.initData(JSON.parse(options));
      uni.removeStorageSync("placeOrderOptions");
    }
  },
  onHide() {
    // 清空数据
    clearTimeout(this.timeoutRef);
  },

  methods: {
    ...mapActions("order", ["X_getOrderPlanStoreData", "X_getOrderShopCreate"]),
    ...mapActions("shop", ["getSuitShopList"]),
    ...mapMutations("shop", ["V_setCurrentShopItem"]),
    ...mapMutations("order", ["setShopOrderGoodsInfo", "v_setPlaceOrderInfo"]),
    // 跳转选择优惠券页面
    goChooseCoupon() {
      const spuCodes = this.productInfo.map((item) => {
        return item.spuCode;
      });
      uni.navigateTo({
        url:
          "/subPages/coupons/chooseCoupons" +
          `?shopConfigId=${this.shopConfigId}&spuCodes=${spuCodes.join(
            ","
          )}&couponCode=${this.orderPlanData.couponCode}&type=shop`,
      });
    },
    initData(options) {
      // 是否切换了门店
      if (options?.isChange) {
        this.showLocationTips = true;
        this.timeoutRef = setTimeout(() => {
          this.showLocationTips = false;
          clearTimeout(this.timeoutRef);
        }, 3000);
      }
      this.shopConfigId = options?.shopConfigId;
      if (this.shopConfigId) {
        // 门店详情
        this.getDetail();
      }
      //适用门店
      if (options.isSuit) {
        this.showLocationTips = true;
      }
      // 是否来自于购物车
      if (options.from === "shopCar" || this.isShopCar) {
        this.isShopCar = true;
      } else {
        this.isShopCar = false;
      }
      // 商详过来
      if (options.spuCode) {
        this.spuCode = options.spuCode;
      }
      console.log(
        {
          // channelSkuCode: this.shopOrderGoodsInfo?.goodsCode,
          spuCode: options.spuCode,
          shopConfigId: "",
          shopCar: this.isShopCar,
        },
        "dddddddddddd"
      );
      // 查适用门店
      this.getSuitShopList({
        // channelSkuCode: this.shopOrderGoodsInfo?.goodsCode,
        spuCode: options.spuCode,
        shopConfigId: "",
        shopCar: this.isShopCar,
      });
      // 查商品
      this.getShopOrderProduct();
      // 查地址
      this.getAddress();
    },
    // 获取地址
    async getAddress() {
      const { data } = await api.$get(address.addressList);
      this.phone =
        data?.filter((item) => item.defaulted)?.[0]?.receiverPhone ||
        this.userInfo?.phone;
    },
    // 商品信息
    async getShopOrderProduct(data) {
      await this.X_getOrderPlanStoreData(data);
      this.info = this.orderPlanData;
      this.productInfo = this.orderPlanData?.goodsInfoList;
    },
    // 门店详情
    async getDetail() {
      const { data } = await api.$get(shop.getShopStoreById, {
        appId: Global_Cog.APPID,
        latitude: this.addInfoMsg.latitude,
        longitude: this.addInfoMsg.longitude,
        shopConfigId: this.shopConfigId,
      });
      this.shopDetail = { ...data } || {};
      this.V_setCurrentShopItem(data);
      this.handleLeftTimeTab();
    },
    changeDate() {
      this.showDatePick = true;
    },
    closeModal() {
      this.showDatePick = false;
    },
    goToDetail() {
      uni.navigateTo({
        url: `/shopPages/agreements/Agreement`,
      });
    },
    closeLocationTips() {
      this.showLocationTips = false;
      clearTimeout(this.timeoutRef);
    },
    // 修改时间
    getChangeDate(index, tabIndex) {
      this.currenTimeIndex = index;
      this.confirmTab = tabIndex;
    },
    changeSelectProtocol() {
      this.selectProtocol = !this.selectProtocol;
    },
    // 下单
    placeOrder() {
      if (!this.loginStatus) {
        return uni.navigateTo({
          url: "/pages/user/relogin",
        });
      }
      this.payMoney();
    },
    async payMoney() {
      try {
        const { takeEndTime, takeStartTime } =
          this.getLeftTabList[this.confirmTab].sectionList[
            this.currenTimeIndex
          ];
        if (dayjs().isAfter(takeEndTime)) {
          this.handleLeftTimeTab();
          return uni.showToast({
            icon: "none",
            title: "抱歉，时间已失效，请重新选择",
          });
        }

        if (!this.phone) {
          return uni.showToast({
            icon: "none",
            title: "请输入手机号",
          });
        }
        if (!this.selectProtocol) {
          return uni.showToast({
            icon: "none",
            title: "请先同意到店自提服务协议",
          });
        }
        let order = {
          activitySecKillId: this.orderPlanData.activitySecKillId,
          activitySecKillName: this.orderPlanData.activitySecKillName,
          deliveryDetails: this.orderPlanData.deliveryPlanResp?.deliveryDetails,
          deliveryPlanCode: this.orderPlanData.deliveryPlanCode,
          discountAmount: this.info.marketingAmount + this.info.couponAmount, //折扣金额
          freightAmount: 0, //运费
          goodsInfoList: this.orderPlanData.goodsInfoList,
          needMilkBox: this.info.defaulted ? this.info.defaulted : true,
          payAmount: this.orderPlanData.payAmount,
          payType: 0,
          remark: this.remark,
          totalAmount: this.orderPlanData.totalAmount,
          shopConfigId: this.shopConfigId,
          shopStoreNo: this.shopDetail?.storeNo,
          takePhone: this.phone,
          takeEndTime,
          takeStartTime,
          posStoreNo: this.shopDetail?.posStoreNo || 1,
          showToast: false,
        };
        // 防重
        if (this.loading) {
          return;
        }
        this.loading = true;
        // 订单
        const res = await this.X_getOrderShopCreate(order).then(async (res) => {
          if (res) return;
          const para = {
            openId: this.userInfo.openId,
            appId: this.userInfo.appId,
            orderNo: this.resData?.orderNo,
            payMethodType: 0,
            showToast: false,
          };
          const { data } = await this.POST(pay.wechatPay, para, "加载中");
          let provider = "";
          uni.getProvider({
            service: "payment",
            success: (res) => {
              console.log(res, "00000000");
              provider = res.provider[0];
            },
            fail: (err) => {
              console.log(err, "err");
            },
          });

          // 支付
          uni.requestPayment({
            provider: provider,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.packageValue,
            signType: data.signType,
            paySign: data.paySign,
            success: (res) => {
              console.log("success:" + res);
              uni.redirectTo({
                url: `/pages/order/payResult?tabType=${pickType.PICK.value}`,
              });
              this.$store.commit("address/clearAddress");
              this.$store.commit("coupon/clearCoupon");
            },
            fail: (err) => {
              uni.reLaunch({
                url: `/pages/order/order?tabType=${pickType.PICK.value}`,
              });
            },
          });
        });
      } catch (errData) {
        this.loading = false;
        const errDataInfo = errData.data;
        // 获取库存不足的商品
        const remainStock =
          errDataInfo?.remainStock?.filter((item) => {
            const findStock = this.shopOrderGoodsInfo.find(
              (goods) =>
                goods.goodsCode === item.channelSkuCode &&
                goods.goodsQty > item.remainStock
            );
            if (findStock) {
              return true;
            }
            return false;
          }) || [];
        if (this.isShopCar) {
          // 部分有的情况
          if (errData.code === "80111" && remainStock.length > 0) {
            uni.showModal({
              title: "提示",
              content: `抱歉，部分商品库存不足，是否继续购买`,
              confirmText: "继续购买",
              success: (res) => {
                this.remainStock = remainStock;
                // 库存为0的情况
                this.notCanPlaceOrder =
                  remainStock.filter((item) => item.remainStock === 0).length >
                  0;
                if (res.confirm) {
                  console.log(
                    remainStock,
                    this.shopOrderGoodsInfo,
                    this.notCanPlaceOrder,
                    "shopOrderGoodsInfo"
                  );
                  const newShopOrderGoodsInfo = this.shopOrderGoodsInfo?.map(
                    (item) => {
                      const findStock = remainStock.find(
                        (stock) => item.goodsCode === stock.channelSkuCode
                      );
                      if (findStock) {
                        item.goodsQty = findStock.remainStock;
                      }
                      return item;
                    }
                  );
                  console.log(newShopOrderGoodsInfo, "newShopOrderGoodsInfo");
                  this.setShopOrderGoodsInfo([...newShopOrderGoodsInfo]);
                  this.getShopOrderProduct([]);
                }
              },
            });
            return;
          }
          // 无库存
          if (errData.code === "50002" || errData.code === "80110") {
            this.notCanPlaceOrder = true;
            uni.showModal({
              title: "提示",
              content: "抱歉，商品库存不足，请返回重新下单",
              confirmText: "继续购买",
              confirmText: "返回",
              success: (res) => {
                if (res.confirm) {
                  uni.navigateBack({
                    success: (res) => {
                      // 确认返回
                      if (res.confirm) {
                        let page = getCurrentPages().pop(); //跳转页面成功之后
                        console.log(page, this.shopOrderGoodsInfo, "page");
                        if (!page) {
                          return;
                        } else {
                          // 门店首页
                          if (page.route === "shopPages/shop/index") {
                            page.onLoad({
                              shopConfigId: this.shopCarListParams.shopConfigId,
                            }); // page自带options对象.
                          } else {
                            page.onLoad({
                              shopConfigId: this.shopCarListParams.shopConfigId,
                              spuCode: this.spuCode,
                            });
                          }
                        }
                      } else {
                        this.remainStock = remainStock;
                      }
                    },
                  });
                } else {
                  this.remainStock = remainStock;
                }
              },
            });
            return;
          }
        } else {
          // 不是购物车进入的情况
          // 库存不足
          if (errData.code === "80111" && remainStock?.[0]) {
            const singleRemainStock = remainStock?.[0]?.remainStock;
            uni.showModal({
              title: "提示",
              content: `抱歉，部分商品仅剩${singleRemainStock}件库存，是否继续购买？`,
              confirmText: "继续购买",
              success: (res) => {
                if (res.confirm) {
                  // 刷新库存与商品
                  this.setShopOrderGoodsInfo([
                    {
                      ...this.shopOrderGoodsInfo[0],
                      goodsQty: singleRemainStock,
                    },
                  ]);
                  this.getShopOrderProduct([
                    {
                      ...this.shopOrderGoodsInfo[0],
                      goodsQty: singleRemainStock,
                    },
                  ]);
                } else {
                  this.v_setPlaceOrderInfo({
                    remainStock: singleRemainStock,
                    goodsCode: this.shopOrderGoodsInfo[0]?.goodsCode,
                  });
                }
              },
            });
            return;
          } else if (errData.code === "50002" || errData.code === "80110") {
            uni.showModal({
              title: "提示",
              content: "抱歉，商品库存不足，请返回重新下单",
              confirmText: "继续购买",
              confirmText: "返回",
              success: (res) => {
                if (res.confirm) {
                  uni.navigateBack({
                    success: () => {
                      let page = getCurrentPages().pop(); //跳转页面成功之后
                      if (!page) {
                        return;
                      } else {
                        page.onLoad({
                          spuCode: this.info.spuCode,
                          shopConfigId: this.shopConfigId,
                        }); // page自带options对象.
                      }
                    },
                  });
                }
              },
            });
            return;
          }
        }
        uni.showToast({
          title: "下单失败",
          icon: "none",
        });
      }
    },

    changeSuitShop() {
      uni.navigateTo({
        url: `/shopPages/suitShop/index?shopConfigId=${this.shopConfigId}&skuCode=${this.skuCode}&from=placeOrder`,
      });
    },
    goToAgreement() {
      uni.navigateTo({
        url: `/xiaoyouPages/setting/agreement?shop=true`,
      });
    },
    // 出来时间
    handleLeftTimeTab() {
      this.confirmTab = 0;
      if (
        this.shopDetail.businessHoursEnd &&
        this.shopDetail.businessHoursBegin
      ) {
        const current = dayjs();
        const list = [];
        var week = ["日", "一", "二", "三", "四", "五", "六"];
        const section = {
          0: "今天",
          1: "明天",
          2: "后天",
        };
        let count = 3;
        const endHour = this.shopDetail.businessHoursEnd?.split(":")?.[0];
        const endMinute = this.shopDetail.businessHoursEnd?.split(":")?.[1];
        const startHour = this.shopDetail.businessHoursBegin?.split(":")?.[0];
        const startMinute = this.shopDetail.businessHoursBegin?.split(":")?.[1];

        const gap = "12:00";
        let i = 0;
        if (dayjs().isAfter(dayjs().hour(endHour).minute(endMinute))) {
          i = 1;
        }
        for (i; i < count; i++) {
          const day = current.add(i, "day");
          const sectionList = [];
          const time12 = day.clone().hour(12).minute(0).second(0);
          if (dayjs().isBefore(time12)) {
            const start = day
              .clone()
              .hour(startHour)
              .minute(startMinute)
              .second(0)
              .format("YYYY-MM-DD HH:mm:ss");
            sectionList.push({
              text: `上午(${this.shopDetail.businessHoursBegin}~${gap})`,
              select: false,
              takeStartTime: start,
              takeEndTime: time12.format("YYYY-MM-DD HH:mm:ss"),
              date: start,
            });
          }
          const timeEnd = day
            .clone()
            .hour(endHour)
            .minute(endMinute)
            .second(0)
            .format("YYYY-MM-DD HH:mm:ss");
          if (
            dayjs().isBefore(timeEnd) &&
            this.shopDetail.businessHoursEnd !== gap
          ) {
            sectionList.push({
              text: `下午(${gap}~${this.shopDetail.businessHoursEnd})`,
              select: false,
              takeStartTime: time12.format("YYYY-MM-DD HH:mm:ss"),
              takeEndTime: timeEnd,
              date: timeEnd,
            });
          }

          sectionList.length > 0 &&
            list.push({
              date: day.format("YYYY/MM/DD"),
              name: section[i],
              week: "星期" + week[day.day()],
              sectionList: sectionList,
            });
        }
        this.getLeftTabList = list;
        return;
      }
      this.getLeftTabList = [];
      return;
    },
  },
};
</script>
<style lang="scss" scoped>
.place-order {
  background: #f5f5f5;
  padding: 28rpx 24rpx 0rpx;
  position: relative;
  height: 100vh;
  .order-content {
    padding-bottom: 194rpx;
    height: 100vh;
  }
  .top-box {
    position: relative;
    padding-top: 62rpx;
    .method {
      position: absolute;
      top: 0rpx;
      left: 0rpx;
      width: 100%;
      position: absolute;
      height: 100rpx;
    }
  }
  .view-detail {
    position: absolute;
    right: 34rpx;
    top: 16rpx;
    font-size: 22rpx;
    font-weight: 400;
    color: #db9918;
    line-height: 30rpx;
    display: flex;
    align-items: center;
    .back-icon {
      width: 16rpx;
      height: 16rpx;
      margin-left: 10rpx;
      border-top: 2rpx solid #db9918;
      border-right: 2rpx solid #db9918;
      transform: rotate(45deg);
    }
  }
  .top-info {
    margin-bottom: 16rpx;
    position: relative;
    padding-top: 62rpx;
  }
  .address {
    margin-bottom: 16rpx;
    .change {
      height: 34rpx;
      font-size: 26rpx;
      font-weight: 400;
      color: #666666;
    }
  }
  .receipt {
    margin-bottom: 16rpx;
    .phone {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
      line-height: 40rpx;
      padding-bottom: 20rpx;
      > .label {
        white-space: nowrap;
        min-width: 150rpx;
      }
      input {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
        text-align: right;
      }
    }
    .time {
      height: 88rpx;
      line-height: 88rpx;
      > view:nth-child(2) {
        color: #1d9bdc;
        font-weight: bold;
      }
    }
    .protocol {
      padding-top: 22rpx;
      font-size: 28rpx;
      font-weight: 400;
      > view {
        display: flex;
        > image {
          width: 36rpx;
          height: 36rpx;
          margin-right: 8rpx;
        }
        > text:nth-child(2) {
          color: #999999;
        }
      }
      > text:nth-child(2) {
        color: #333333;
      }
    }
  }
  .product {
    margin-bottom: 16rpx;
  }
  .product-total {
    // border-top: 2rpx solid #f4f4f4;
    // padding-top: 24rpx;
    // margin-top: 24rpx;
    > view:nth-child(1) {
      font-size: 26rpx;
      font-weight: bold;
      color: #000000;
      line-height: 40rpx;
    }
    > view:nth-child(2) {
      font-weight: bold;
      color: #333;
      line-height: 40rpx;
      font-size: 32rpx;
      .yuan {
        font-size: 22rpx;
      }
    }
  }
  .coupon {
    // padding-top: 24rpx;
    // margin-top: 24rpx;
    > view:nth-child(1) {
      font-size: 26rpx;
      font-weight: bold;
      color: #000000;
      line-height: 40rpx;
    }
    > view:nth-child(2) {
      > text:nth-child(2) {
        font-weight: bold;
        line-height: 40rpx;
        font-size: 32rpx;
        margin-right: 15rpx;
      }
      .yuan {
        font-size: 22rpx;
      }
    }
  }
  .reduce-amount {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
  }
  .note-tip {
    padding-top: 24rpx;
    margin-bottom: 16rpx;
    > view:first-child {
      border-bottom: 2rpx dashed #f1f1f1;
      padding-bottom: 24rpx;
      margin-bottom: 24rpx;
    }
    .input-box {
      text-align: right;
      color: #999;
      font-size: 26rpx;
      width: 312rpx;
      // flex: 1;
    }
    .xbff {
      justify-content: flex-end;
    }
  }
  .remarks {
    margin-bottom: 16rpx;
    // > view:first-child {
    //   border-bottom: 2rpx dashed #f1f1f1;
    // }
    .remark-tip {
      flex: 1;
      justify-content: flex-end;
      display: inline-block;
      // width: 360rpx;
      // background: #ff0;
      position: relative;
      .placeholder-text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .input-box {
        text-align: right;
        color: #999;
        font-size: 26rpx;
        width: 312rpx;
        // flex: 1;
      }
    }
  }
  .arrow {
    display: inline-block;
    width: 12rpx;
    height: 12rpx;
    margin-left: 8rpx;
    border-top: 2rpx solid #666666;
    border-right: 2rpx solid #666666;
    transform: rotate(45deg);
  }
  .line {
    border-bottom: 2rpx solid #f4f4f4;
  }
  .box {
    background: #ffffff;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    padding: 32rpx;
  }
  .label {
    height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;
    line-height: 40rpx;
  }
}
.bottom-nav {
  bottom: 0rpx;
  width: 100vw;
  border-top: 2rpx solid #f1f1f1;
  padding: 0 32rpx;
  padding-top: 12rpx;
  height: 176rpx;
  background: #fff;
  font-size: 34rpx;
  z-index: 999;
  left: 0rpx;
  position: fixed;
  .change-tip {
    position: absolute;
    top: -10rpx;
  }

  .bottom-nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .pay-money-text {
      font-size: 24rpx;
      color: #333;
      font-weight: bold;
      .pay-money-amount {
        font-size: 34rpx;
        padding-left: 16rpx;
        display: inline-block;
      }
      .money-icon {
        font-size: 26rpx;
      }
    }
    .pay-way-default {
      padding: 28rpx 80rpx;
      background: #c7c7c7;
      border-radius: 254rpx 254rpx 254rpx 254rpx;
      color: #fff;
    }
    .pay-way-primary {
      // padding: 0rpx 80rpx;
      width: 296rpx;
      height: 104rpx;
      line-height: 104rpx;
      background: #1d9bdc;
      border-radius: 254rpx 254rpx 254rpx 254rpx;
      color: #fff;
      margin: 0;
    }
    .pay-way-primary.disabled {
      background: #c7c7c7;
    }
    .pay-way-info {
      padding: 28rpx 80rpx;
      background: #c7c7c7;
      border-radius: 254rpx 254rpx 254rpx 254rpx;
      color: #fff;
    }
  }
}
button::after {
  border: none;
}
.price-icon-default {
  font-size: 20rpx;
  font-weight: bold;
  color: #000;
}
.price-no-default {
  font-size: 22rpx;
  font-weight: bold;
  color: #000;
}
.price-icon-color {
  font-size: 20rpx;
  font-weight: bold;
  color: #f86c4d;
}
.price-no-color {
  font-size: 22rpx;
  font-weight: bold;
  color: #f86c4d;
}
.product-item {
  padding-bottom: 16rpx;
}
</style>
