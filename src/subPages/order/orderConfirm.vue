<template>
  <view class="confirm-out">
    <!-- 导航 -->
    <view
      class="top-nav"
      :style="{
        paddingTop: topH + 'px',
      }"
    >
      <view class="top-title">
        <u-icon
          name="arrow-left"
          color="#fff"
          @click="onBack"
          size="16"
        ></u-icon>
        <view
          class="flex-1"
          :style="{
            lineHeight: navH + 'px',
            textAlign: platform == 'android' ? 'left' : 'center',
            height: navH + 'px',
          }"
          >订单确认</view
        >
      </view>
    </view>
    <!-- 内容部分 -->
    <view class="confirm-main" :style="{ paddingTop: mainTop + 'px' }">
      <view class="order-tips" v-if="showOrderTips"
        ><view></view
        ><image
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/tipsicon.png" />
        <view class="tips-text"
          >温馨提示：因配送服务商不同，距离不同，可能会带来少量价格变化，敬请谅解!</view
        ><image
          @tap="closeOrderTips"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/tipsclose.png"
      /></view>

      <!-- 用户信息 -->
      <view class="confirm-content">
        <!-- 配送计划 -->
        <ConfirmPlan
          @onPlan="onPlan"
          @onPlanAddress="onPlanAddress"
          @onCloseBtn="onCloseTips"
          :showTips="showPlanTip"
          :res="planInfo"
          :unit="productinfo.unitName"
        />
        <!-- 配送计划日期选择 -->
        <ConfirmPlanDate @onClickDate="onClickDate" />

        <!-- 配送计划选择弹窗 -->
        <ConfirmModel
          :show="showPlanModel"
          :typeName="typeName"
          :res="planInfo"
          :goodsInfo="orderPlanData.goodsInfoList"
          @onClosePlan="onClosePlan"
          @onSureBtn="onSureBtn"
        />

        <!-- 商品信息 -->
        <view class="card-panle common-card">
          <view class="card-title-bar">
            <view class="card-title">商品</view>
            <view class="card-company">{{ orderPlanData.companyName }}</view>
          </view>
          <view class="card-content">
            <h-goodsCard :goodsInfo="orderPlanData.goodsInfoList"></h-goodsCard>
          </view>
        </view>

        <view class="check-card">
          <view class="d-flex-center d-sb switch-off">
            <view class="font-26-w">是否需要免费安装奶箱</view>
            <u-switch
              v-model="needMilkBox"
              @change="setMilkBox"
              space="2"
              activeColor="#1D9BDC"
            ></u-switch>
          </view>
          <view class="d-flex-center d-sb note-tip">
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
              <uni-icons type="right" color="#A9A9A9" size="15"
            /></view>
          </view>
        </view>
        <view class="common-check-card card-discount">
          <uni-list :border="false">
            <uni-list-item
              title="商品总金额"
              :rightText="orderPlanData.totalAmount"
              :border="false"
            >
              <template v-slot:footer>
                <text class="slot-footer">
                  {{ orderPlanData.totalAmount | formatAmount }}
                </text>
              </template>
            </uni-list-item>
            <uni-list-item
              :border="false"
              class="discount-amount"
              title="优惠券"
              showArrow
              :clickable="true"
              @click="goChooseCoupon"
            >
              <template v-slot:footer>
                <text
                  class="slot-footer-gray"
                  v-if="orderPlanData.couponAmount === 0"
                >
                  暂无可用
                </text>
                <text class="slot-footer" v-else
                  >- {{ orderPlanData.couponAmount | formatAmount }}</text
                >
              </template>
            </uni-list-item>
            <uni-list-item title="满减优惠" :border="false">
              <template v-slot:footer>
                <text
                  class="slot-footer-black"
                  v-if="orderPlanData.marketingAmount === 0"
                >
                  {{ orderPlanData.marketingAmount | formatAmount }}
                </text>
                <text class="slot-footer" v-else
                  >- {{ orderPlanData.marketingAmount | formatAmount }}</text
                >
              </template>
            </uni-list-item>
            <uni-list-item class="delivery-amount" title="运费" :border="false">
              <template v-slot:footer>
                <text class="slot-footer-black">
                  {{ orderPlanData.freightAmount | formatAmount }}
                </text>
              </template>
            </uni-list-item>
          </uni-list>
        </view>

        <view class="bottom-bar">
          <view
            class="change-tip d-flex-center d-sb"
            v-if="addTip && showChange"
          >
            <view>您更换了收货地址，商品价格发生了变化</view>
            <uni-icons
              type="closeempty"
              color="#C7C7C7"
              size="13"
              @tap="onCloseBtn"
            />
          </view>
          <view class="notice-bar" v-if="showType">
            <view>
              <view class="notice-bar-left">
                <view class="notice-bar-content">
                  <uni-icons size="16" color="#fff" type="info"></uni-icons>
                  <view class="notice-bar-text">
                    {{
                      showType === "typeAdd"
                        ? "请添加配送地址，以便进行配送"
                        : "该收货地址暂时不可售卖，如有疑问请联系"
                    }}
                    <label for="serveBtn">
                      <text
                        class="server-online"
                        @tap="onLineHelp"
                        v-show="showType === 'typeSever'"
                        >在线客服</text
                      ></label
                    >
                    <button
                      id="serveBtn"
                      style="display: hidden"
                      open-type="contact"
                      hover-class="button-hover"
                    ></button>
                  </view>
                </view>
              </view>
            </view>
            <uni-icons
              v-show="showTips === 'typeAdd'"
              size="16"
              color="#fff"
              type="closeempty"
              @tap="closeNotice"
            ></uni-icons>
          </view>
          <view class="bottom-nav">
            <view class="bottom-nav-bar">
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
                @click="goPay"
                class="pay-way-primary"
                :loading="loading"
                :disabled="isDdisable"
              >
                微信支付
              </button>
              <!-- <button
                @click="goPay"
                class="pay-way-primary"
                v-if="orderPlanData.saleRange === saleRange.SUCCESS"
                :loading="loading"
                :disabled="isDdisable"
              >
                微信支付
              </button>
              <view v-else class="pay-way-default pay-way-info">微信支付</view> -->
            </view>
          </view>
        </view>

        <view v-if="showCalendar" class="modal-week">
          <!-- showLunar="true" 农历显示 -->
          <!-- :maxDate="planInfo.deliveryEndDate" 最大日期 法定bug -->

          <hCalendar
            :show="showCalendar"
            title="起送时间选择"
            closeOnClickOverlay
            round="16"
            :minDate="planInfo.leadStartTime"
            :defaultDate="planInfo.deliveryStartDate"
            :disableWeek="disableWeekList"
            @confirm="confirm"
            @close="onclose"
          ></hCalendar>
        </view>

        <!-- 弹窗 -->
        <view class="modal-week" v-if="showSure">
          <view class="sure-empty" @tap="sureBtn"></view>
          <view class="sure-main">
            <view class="sure-top d-flex-center d-sb">
              <text class="flex-1">确认配送信息</text>
              <uni-icons
                type="closeempty"
                color="#999999"
                size="16"
                class="close-icon"
                @tap="sureBtn"
              />
            </view>
            <view class="content-xiao">
              <view class="sure-textone">
                <view class="mB16rpx">收货信息：</view>
                <view class="sure-info">
                  <view class="h40 h-fs-30"
                    ><text class="color3 mR18">{{
                      orderPlanData.deliveryPlanResp.addressDTO.receiver
                    }}</text>
                    <text class="color6">{{
                      orderPlanData.deliveryPlanResp.addressDTO.receiverPhone
                    }}</text></view
                  >
                  <view class="h-fs-30 color6">{{
                    orderPlanData.deliveryPlanResp.addressDTO.adressDetail
                  }}</view>
                </view>
              </view>
              <view class="sure-textone">
                <view class="mB16rpx">配送计划：</view>
                <view class="sure-info color6">
                  <view class="mB16rpx">
                    <text class="mR10rpx"
                      >{{ orderPlanData.deliveryPlanResp.ruleTypeName
                      }}<text v-if="forDay">({{ forDay }})</text></text
                    >|<text class="mR10rpx mL10rpx">{{
                      TimeSectionName[
                        orderPlanData.deliveryPlanResp.timeSection
                      ]
                    }}</text
                    >|<text class="mL10rpx"
                      >每次{{ orderPlanData.deliveryPlanResp.everyNum
                      }}{{ productinfo.unitName }}</text
                    ></view
                  >
                  <view class="mB16rpx"
                    >起送日期：{{
                      orderPlanData.deliveryPlanResp.deliveryStartDate
                    }}</view
                  >
                  <view
                    >配送周期：{{
                      orderPlanData.deliveryPlanResp.deliveryStartDate
                    }}-{{
                      orderPlanData.deliveryPlanResp.deliveryEndDate
                    }}</view
                  >
                </view>
              </view>
            </view>

            <button :loading="loading" class="sure-btn" @tap="sureOk">
              确认无误
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { pay } from "@/utils/url";
import {
  saleRange,
  timeSectionEnum,
  TimeSectionName,
  ruleTypeEnum,
  ruleTypeName,
  typeNameEnum,
  ruleTypeNameEnum,
  planListEnum,
} from "@/utils/enum";
import { BaseApp } from "@/const/appIdConf";
import { mapActions, mapMutations, mapState } from "vuex";
import ConfirmPlan from "./components/confirmPlan.vue";
import ConfirmPlanDate from "./components/confirmPlanDate.vue";
import ConfirmModel from "./components/confirmModel.vue";
import hCalendar from "@/subPages/components/u-calendar/u-calendar.vue";
import { debounce } from "@/utils/utils";
export default {
  components: {
    ConfirmPlan,
    ConfirmPlanDate,
    ConfirmModel,
    hCalendar,
  },
  data() {
    return {
      typeList: [], //配送计划弹窗内容
      typeName: typeNameEnum.ruleType, //配送计划弹窗名字
      showPlanModel: false, //配送计划弹窗
      ruleTypeEnum,
      ruleTypeName,
      TimeSectionName,
      timeSectionEnum,
      showSure: false, //确认弹窗
      sureok: false, //确认无误
      saleRange,
      info: {},
      goodsInfo: [],
      addressDTO: {},
      remark: "",
      needMilkBox: true,
      item: true,
      option: [
        {
          value: 0,
        },
      ],
      showNotice: false,
      loading: false,
      isDdisable: false,
      killSymbal: false,
      showType: "", //typeAdd,typeSever
      addTip: false, //地址改变提示
      showCalendar: false, //日历显示
      topH: 0, //导航安全顶部
      navH: 0, //胶囊高度
      platform: "android",
      mainTop: 0, //主体距离顶部高度
      showOrderTips: true,
    };
  },
  onLoad() {
    this.getSystem();
    this.getAreaInfo();
  },
  onUnload() {
    console.log(
      "离开页面--------------------------------------------------------订单确认"
    );
    this.$store.commit("address/clearAddress");
    this.$store.commit("coupon/clearCoupon");
    this.V_setAsyncPlanInfo({ empty: true });
    this.V_setNullCount([]);
    this.v_setPlanColor({});
    this.V_setorderPar({});
  },
  onReady() {
    // this.getAreaInfo();
    console.log("this.referrerPhone---二维码手机号", this.referrerPhone);
  },
  onShow() {},
  computed: {
    //小优
    ...mapState("xiaoyou", ["distId"]),
    ...mapState("home", ["referrerPhone"]), //推荐人手机号
    ...mapState("product", ["weekList"]),
    ...mapState("order", ["orderPlanData", "resData", "showChange"]),
    ...mapState("product", ["productinfo"]),
    // 配送计划优化
    ...mapState("plan", ["count", "planInfo", "showPlanTip"]),
    //星期送情况
    disableWeekList() {
      console.log("this.planInfo", this.planInfo);
      // deliveryDetails
      // 星期送
      if (
        this.planInfo.ruleType === ruleTypeEnum.WEEK_DAYS &&
        this.planInfo.deliveryDetails.length
      ) {
        const arr = this.planInfo?.deliveryDetails?.split(",").sort();
        console.log("arr-->星期送", arr);
        const list = arr.map((el) => {
          if (el == 7) {
            el = 0;
          }
          return Number(el);
        });
        console.log(list, "arr", arr);

        return list;
      } else {
        return [];
      }
    },
    //配送显示
    forDay() {
      const daystr = {
        EVERY_DAYS: () => {
          return "";
        },
        LEGAL_WORKING_DAYS: () => {
          return "";
        },
        TERTIAN_DAYS: () => {
          return this.orderPlanData.deliveryPlanResp.intervalDate;
        },
        WEEK_DAYS: () => {
          const arr = this.orderPlanData.deliveryPlanResp.deliveryDetails
            .split(",")
            .sort();
          console.log("arr-->星期送", arr);
          return arr;
        },
      };

      return this.orderPlanData.deliveryPlanResp
        ? daystr[this.orderPlanData.deliveryPlanResp.ruleType]()
        : "";
    },
    showTips: {
      get: function () {
        if (
          !this.orderPlanData?.deliveryPlanResp?.addressDTO ||
          !this.orderPlanData?.deliveryPlanResp?.deliveryPlanCode
        ) {
          return (this.showType = "typeAdd");
        } else {
          if (this.orderPlanData.saleRange !== saleRange.SUCCESS) {
            return (this.showType = "typeSever");
          } else {
            return (this.showType = false);
          }
        }
      },
      set: function (res) {
        this.showType = res;
      },
    },
    showPrice() {
      // 地址/价格-非赠品
      // const info = this.info;
      const info = this.orderPlanData;
      // this.info = this.orderPlanData;
      const { numlist } = this.$store.state.product.productinfo;
      if (info.saleRange !== saleRange.SUCCESS) {
        return (this.addTip = false);
      }
      info.goodsInfoList.forEach((el) => {
        if (!el.present) {
          if (el.unitPrice !== numlist.unitPrice) {
            return (this.addTip = true);
          } else return (this.addTip = false);
        }
      });
    },
    // 当前小程序上午下午配送选项
    currentAppAPM() {
      const apmList = planListEnum.ruleAmPm;
      return apmList[BaseApp.plan];
    },
  },
  methods: {
    ...mapActions("order", ["X_getOrderPlanData", "X_getOrderCreate"]),
    ...mapMutations("order", [
      "V_setorderPar",
      "V_setOrderUrl",
      "V_setShowChange",
    ]),
    // 配送计划优化
    ...mapMutations("plan", [
      "V_setCount",
      "V_setPrarms",
      "V_setAsyncPlanInfo",
      "V_setNullCount",
      "v_setPlanColor",
      "setShowTips",
    ]),
    ...mapActions("plan", ["V_putAddPlan"]),
    closeOrderTips() {
      this.showOrderTips = false;
    },
    // fc05
    // 获取高度+系统信息
    getSystem() {
      const info = uni.getMenuButtonBoundingClientRect();
      console.log("info-系统信息获取", info);
      let systemInfo = uni.getSystemInfoSync();
      this.platform = systemInfo.platform;
      this.topH = info.top;
      this.navH = info.height;
      this.mainTop = info.top + info.height + uni.upx2px(36);
      console.log("info,systemInfo", info, systemInfo);
    },
    onBack() {
      const arr = getCurrentPages();
      // const
      console.log("arr", arr);
      if (arr.length <= 1) {
        return uni.switchTab({
          url: "/pages/homepage/homepage",
        });
      }
      uni.navigateBack(-1);
    },

    /**选择地址 */
    onPlanAddress() {
      console.log("this.planInfo", this.planInfo);
      let url = "/subPages/address/addressList?type=plan";
      if (!this.planInfo.receiverNo) {
        url = "/subPages/address/addressAdd?type=plan";
      }
      uni.navigateTo({
        url,
      });
    },
    /**
     * @name 选择配送
     * @param type(ruleType:多久送一次；ruleAmPm:什么时段送；ruleNum每次送多少)
     */
    onPlan(type) {
      console.log("type", type);
      this.typeName = type;
      this.showPlanModel = true;
    },
    //关闭tips
    onCloseTips() {
      console.log("1", 1);
      this.setShowTips(false);
    },

    /**弹窗确定 */
    onSureBtn(res) {
      console.log("e确定", res);
      this.V_setCount(res.typeName); //设置确定类型
      this.V_setPrarms(res.checkedObj);
      this.V_setAsyncPlanInfo({ ...res.checkedObj });
      if (this.planInfo.deliveryPlanCode || this.count.length === 4) {
        console.log("this.count", this.count);
        this.V_putAddPlan(this.planInfo.deliveryPlanCode ? true : false);
      }
      this.showPlanModel = false;
    },
    /**关闭model */
    onClosePlan(e) {
      console.log("e--关闭model", e);
      this.showPlanModel = !e;
    },
    // 新计划日历
    onClickDate() {
      if (!this.orderPlanData.deliveryPlanCode) {
        return uni.showToast({
          title: "请先选择配送计划",
          icon: "none",
        });
      }
      this.showCalendar = true;
    },
    //日历操作
    confirm(e) {
      console.log("e日历", e);
      this.V_setorderPar({ deliveryStartDate: e[0] });
      this.V_setPrarms({ deliveryStartDate: e[0] });
      this.X_getOrderPlanData();
      this.showCalendar = false;
    },
    onclose() {
      this.showCalendar = false;
    },
    //关闭地址改变提示
    onCloseBtn() {
      this.addTip = false;
      this.V_setShowChange(false);
      // this.showPrice=false
    },
    // 优惠券选择
    goChooseCoupon() {
      const { spuCode, amount, marketingCode, couponCode, activitySecKillId } =
        this.orderPlanData;
      if (marketingCode) {
        uni.navigateTo({
          url:
            "/subPages/coupons/chooseCoupons" +
            `?goodsCode=${spuCode}&amount=${amount}&activitySecKillId=${activitySecKillId}&marketingCode=${marketingCode}&couponCode=${couponCode}`,
          success: () => {
            this.V_setShowChange(this.addTip);
          },
        });
      } else {
        uni.navigateTo({
          url:
            "/subPages/coupons/chooseCoupons" +
            `?goodsCode=${spuCode}&amount=${amount}&couponCode=${couponCode}&activitySecKillId=${activitySecKillId}&marketingCode=`,
          success: () => {
            this.V_setShowChange(this.addTip);
          },
        });
      }
    },
    // 收获地址计算总金额和优惠信息
    async getAreaInfo() {
      try {
        const { currentAppAPM } = this;
        this.V_setorderPar({ timeSection: currentAppAPM[0].value }); //设置默认时间段
        await this.X_getOrderPlanData(); //
        this.info = this.orderPlanData;
        this.info.needMilkBox = this.needMilkBox;
        console.log(this.planInfo, "配送计划--008");
        // 无配送-配置默认配送计划选中fc07
        if (!this.orderPlanData.deliveryPlanResp) {
          const obj = {
            ruleType: ruleTypeEnum.EVERY_DAYS,
            ruleTypeName: ruleTypeName.EVERY_DAYS,
            everyNum: 1,
            timeSectionName: this.currentAppAPM[0].label,
            timeSection: this.currentAppAPM[0].value,
          };

          this.V_setAsyncPlanInfo(obj);
          this.V_setPrarms(obj);
          this.V_setCount(typeNameEnum.ruleType);
          this.V_setCount(typeNameEnum.ruleAmPm);
          this.V_setCount(typeNameEnum.ruleNum);
        }
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.msg,
          duration: 1500,
        });
      }
    },
    // 关闭通知栏
    closeNotice() {
      // this.showNotice = false;
      this.showType = false;
      console.log(this.showTips, this.showType);
    },
    // 是否安装牛奶盒
    setMilkBox(val) {
      console.log("val--奶香", val);
      this.info.defaulted = val;
    },
    // 根据收获地址计算总金额和优惠信息
    // 确认
    sureBtn() {
      this.showSure = false;
    },
    sureOk() {
      // this.showSure = false;
      if (this.loading) return;
      this.sureok = true;
      // this.paymoney();

      debounce(this.paymoney, 1000);
    },
    async paymoney() {
      try {
        if (this.sureok) {
          this.loading = true;
          let userInfo = uni.getStorageSync("userMsg");
          this.info.freightAmount = 0;
          this.info.payType = 0;
          this.info.discountAmount =
            this.info.marketingAmount + this.info.couponAmount;
          this.info.remark = this.remark;
          // const { flag } = this.$store.state.product.params;
          let order = {
            activitySecKillId: this.orderPlanData.activitySecKillId,
            activitySecKillName: this.orderPlanData.activitySecKillName,
            deliveryDetails:
              this.orderPlanData.deliveryPlanResp?.deliveryDetails,
            deliveryPlanCode: this.orderPlanData.deliveryPlanCode,
            discountAmount:
              this.orderPlanData.marketingAmount +
              this.orderPlanData.couponAmount, //折扣金额
            freightAmount: 0, //运费
            goodsInfoList: this.orderPlanData.goodsInfoList,
            needMilkBox: this.needMilkBox,
            payAmount: this.orderPlanData.payAmount,
            payType: 0,
            receiverId:
              this.orderPlanData.deliveryPlanResp.addressDTO.addressNo,
            remark: this.remark,
            totalAmount: this.orderPlanData.totalAmount,
            //小优
            // orderExpand: {},
          };
          // 扫码推荐下单
          if (this.referrerPhone) {
            order.referrerPhone = this.referrerPhone;
            order.appId = userInfo.appId;
          }
          // 小优
          if (this.distId) {
            order.orderExpand = { expandId: this.distId, type: "DISTRIBUTION" };
          }
          this.X_getOrderCreate(order).then(async (res) => {
            if (res) return;
            const userInfo = uni.getStorageSync("userMsg");
            const para = {
              openId: userInfo.openId,
              appId: userInfo.appId,
              orderNo: this.resData?.orderNo,
              payMethodType: 0,
            };
            const { data } = await this.POST(pay.wechatPay, para, "加载中");
            let provider = "";
            uni.getProvider({
              service: "payment",
              success: (res) => {
                provider = res.provider[0];
              },
            });
            this.loading = false;
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
                  url: "/pages/order/payResult",
                });
                this.$store.commit("address/clearAddress");
                this.$store.commit("coupon/clearCoupon");
              },
              fail: (err) => {
                uni.reLaunch({
                  url: "/pages/order/order",
                });
              },
              complete: (res) => {
                console.log("complete:" + res);
                this.showSure = false;
              },
            });
          });
        }
        this.sureok = false;
      } catch (error) {
        console.log("支付3", error);

        this.loading = false;
        this.isDdisable = false;
        uni.showToast({
          icon: "none",
          title: error.msg,
          duration: 1500,
        });
        // console.log(err, "支付错误");
      }
    },
    //付款
    async goPay() {
      try {
        if (
          !this.orderPlanData.deliveryPlanResp ||
          !this.orderPlanData.deliveryPlanCode
        ) {
          let obj = {};
          const colorArr = [
            typeNameEnum.ruleType,
            typeNameEnum.ruleAmPm,
            typeNameEnum.ruleNum,
            typeNameEnum.ruleAddress,
          ];
          // count中不存在于colorArr中则#EC4747
          colorArr.forEach((item) => {
            console.log("-----颜色", item, this.count);
            if (!this.count.includes(item)) {
              obj[item] = "#EC4747";
            }
          });
          this.v_setPlanColor(obj);
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 300,
          });

          return uni.showModal({
            content: ruleTypeNameEnum.ruleAddress,
            confirmText: "去添加",
            confirmColor: "#1d9bdc",
            success: (res) => {
              console.log("res--去添加", res);
              if (res.confirm) {
                uni.navigateTo({
                  url: "/subPages/address/addressAdd?type=plan",
                });
              }
            },
          });
        }
        // saleRange: "SUCCESS"
        if (this.showType === "typeSever") {
          return uni.showToast({
            title: "请更换配送地址",
            icon: "none",
          });
        }
        this.showSure = true;
      } catch (err) {}
    },
  },
};
</script>

<style scoped lang="scss">
@import "./orderconfirm.scss";
::v-deep.common-check-card {
  background: #ffffff;
  border-radius: 24rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  margin-bottom: 24rpx;
  padding: 0rpx 32rpx;
  uni-list-item {
    border-bottom: 2rpx dashed #f1f1f1;
    .uni-list-item__content-title {
      font-size: 26rpx;
      color: #000;
      font-weight: bold;
    }
  }
  uni-list-item:last-child {
    border-bottom: 2rpx dashed #fff;
  }
}

::v-deep .card-panle {
  margin-bottom: 16rpx;
  .card-content {
    .uni-list-item {
      .uni-list-item__container {
        padding: 16rpx 0 0 0 !important;
        .uni-list-item__content-note,
        .uni-list-item__extra-text {
          margin-top: 0;
          color: #666666;
          font-size: 26rpx;
        }
      }
    }
  }
}
.card-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 24rpx;
  .card-title {
    width: 122rpx;
    font-size: 30rpx;
    font-weight: bold;
  }
  .card-company {
    color: #666666;
    width: 462rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }
}

::v-deep .common-card {
  padding: 24rpx 32rpx;
  // background: #f00;
  .uni-list-item__content-title {
    font-size: 30rpx;
    color: #000;
    font-weight: bold;
  }
}

::v-deep.card-discount {
  .uni-list-item__container {
    padding: 24rpx 0 !important;
  }

  .uni-list-item__extra {
    .uni-list-item__extra-text {
      font-size: 26rpx;
    }
  }
  .discount-amount {
    //padding: 32rpx 0;
    color: #f86c4d;
  }
}
::v-deep.discount-amount .uni-icon-wrapper {
  padding: 0;
}
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  background: #fff;
  .change-tip {
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    margin: 0 40rpx;
    padding: 22rpx 24rpx;
    border-radius: 16rpx;
    position: relative;
    top: -10rpx;
    &::after {
      content: "";
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-top: 10rpx solid rgba(0, 0, 0, 0.75);
      position: absolute;
      bottom: -10rpx;
      left: 38rpx;
    }
  }
  .notice-bar {
    padding: 14rpx 32rpx;
    background-color: #57bcf3;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .notice-bar-content {
      display: flex;
      justify-content: left;
      align-items: center;

      .notice-bar-text {
        font-size: 26rpx;
        padding-left: 16rpx;
        .server-online {
          background: #1d9bdc;
          height: 40rpx;
          border-radius: 40rpx;
          padding: 2rpx 12rpx;
          line-height: 40rpx;
          margin-left: 8rpx;
        }
      }
    }
  }
}

::v-deep.uni-icons {
  .uniui-info {
    font-size: 32rpx;
    color: #fff;
  }
}

.bottom-nav {
  position: relative;
  border-top: 2rpx solid #e5e5e5;
  // box-shadow: 0rpx 4rpx 2rpx 6rpx  #E5E5E5;
  padding: 0 32rpx;
  padding-top: 12rpx;
  height: 176rpx;
  background: #fff;
  // background: #f00;
  font-size: 34rpx;
  z-index: 999;
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
        padding-left: 16rpx;
        display: inline-block;
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

.slot-footer-gray {
  font-size: 26rpx;
  color: #666666;
}
.slot-footer {
  display: flex;
  justify-content: space-between;
  color: #f86c4d;
  .input-box {
    width: 468rpx;
    text-align: right;
    color: #999;
    font-size: 26rpx;
  }
}
.slot-footer-black {
  @extend .slot-footer;
  color: #333333;
}
.reduce-amount {
  font-size: 24rpx;
  color: #999999;
}
.money-amount {
  font-size: 34rpx;
  color: #333333;
}
.money-icon {
  font-size: 24rpx;
}
.check-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx 32rpx;
  margin-bottom: 16rpx;
  .switch-off {
    padding-bottom: 16rpx;
  }
  .note-tip {
    // background: #1d9bdc;
    padding-top: 24rpx;
    border-top: 2rpx dashed #f1f1f1;
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
}
.modal-week {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 100%;
  z-index: 90999;
}
.sure-empty {
  height: 40%;
}
.sure-main {
  position: absolute;
  bottom: 0;
  min-height: 60%;
  width: 100%;
  background: #fff;
  border-radius: 40rpx 40rpx 0 0;
  padding: 48rpx 48rpx 68rpx;
  z-index: 88888;
  .sure-top {
    text-align: center;
    position: relative;
    font-size: 34rpx;
    font-weight: bold;
    margin-bottom: 48rpx;
    // background: #f0f;
    // image {
    //   width: 32rpx;
    //   height: 32rpx;
    //   border: none;
    // }
    // ::v-deep.u-icon {
    //   position: absolute;
    //   right: 0;
    //   top: 0;
    //   transform: translateY(50%);
    // }
  }
  .content-xiao {
    padding-bottom: 80rpx;
    overflow-y: auto;
  }
  .sure-textone {
    font-size: 28rpx;
    font-weight: bold;
    margin-bottom: 24rpx;
    // background: #57bcf3;
  }
  .sure-info {
    font-size: 30rpx;
    font-weight: normal;
    padding: 24rpx;

    background: #f7f8f9;
  }
  .color6 {
    color: #666666;
  }
  .color3 {
    color: #333333;
  }
  .mR18 {
    margin-right: 18rpx;
  }
  .h40 {
    height: 40rpx;
    margin-bottom: 16rpx;
  }
  .mB16rpx {
    margin-bottom: 16rpx;
  }
  .sure-btn {
    position: absolute;
    bottom: 68rpx;
    width: calc(100% - 96rpx);
    height: 80rpx;
    background: #1d9bdc;
    color: #fff;
    line-height: 80rpx;
    font-weight: bold;
    font-size: 32rpx;
    text-align: center;
    border-radius: 254rpx;
  }
  .mR10rpx {
    margin-right: 10rpx;
  }
  .mL10rpx {
    margin-left: 10rpx;
  }
}
.order-address {
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
}
.order-tips {
  background: #edfaff;
  padding: 16rpx 32rpx;
  font-size: 26rpx;
  font-weight: 400;
  color: #1d9bdc;
  line-height: 30rpx;
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 16rpx;
  .tips-text {
    margin-left: 8rpx;
    margin-right: 32rpx;
  }
  > image {
    width: 32rpx;
    height: 32rpx;
    min-width: 32rpx;
    min-height: 32rpx;
  }
}
</style>
