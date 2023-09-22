<template>
  <view class="confirm-out">
    <hDefault
      topName="兑换确认"
      :activeDom="activeDom"
      :bgName="'order-confirm.png'"
      :bgHeight="'368rpx'"
    />
    <!-- 内容 -->
    <view class="confirm-content" :style="{ top: mainTop }">
      <!-- 配送计划 -->
      <confirmPlan @onPlanItem="onPlanItem" :res="cardPlanList" />
      <!-- 起送时间 -->
      <sendTime
        @onClickDate="onClickDate"
        :startDate="cardExchange.deliveryPlanResp.deliveryStartDate"
      />
      <!-- 商品信息 -->
      <view class="goods-infos">
        <goodsInfos
          :company="cardExchange.companyName"
          :goodsList="cardExchange.goodsInfoList"
          :unit="cardExchange.unit"
        />
      </view>

      <!-- 备注 -->
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
    <!-- 配送计划弹窗 -->
    <planModal
      :show="showPlanModal"
      :typeName="currentType"
      :dataInfo="cardPlanList"
      @onSureBtn="onSureBtn"
      @onClosePlan="onClosePlan"
    />
    <!-- 起送时间日历 -->
    <!-- :minDate="planInfo.leadStartTime"
    :defaultDate="planInfo.deliveryStartDate" 
     :disableWeek="disableWeekList" -->
    <hCalendar
      :minDate="cardPlanList.leadStartTime"
      :defaultDate="cardPlanList.deliveryStartDate"
      :disableWeek="disableWeekList"
      :show="showCalendar"
      title="起送时间选择"
      closeOnClickOverlay
      round="16"
      @confirm="onConfrim"
      @close="onclose"
    />
    <confirmBtn
      @onConfirmBtn="onConfirmBtn"
      :loading="loadingBtn"
      :showNotice="getShowNotice"
    />
  </view>
</template>

<script>
import hDefault from "../components/h-default/index.vue";
import confirmPlan from "./items/confirm-plan.vue";
import goodsInfos from "./items/goods-infos.vue";
import sendTime from "./items/send-time.vue";
import planModal from "./items/plan-modal.vue";
import confirmBtn from "./items/confirm-btn.vue";
import hCalendar from "@/components/u-calendar/u-calendar.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { ruleTypeEnum, saleRange, DeliveryPlanEnum } from "@/utils/enum";
import { milkCard } from "@/utils/url";
import api from "@/utils/api";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    hDefault,
    confirmPlan,
    goodsInfos,
    hCalendar,
    sendTime,
    planModal,
    confirmBtn
  },
  data() {
    // 这里存放数据
    return {
      saleRange,
      ruleTypeEnum,
      DeliveryPlanEnum,
      activeDom: false, //顶部变色
      showCalendar: false, //日历显示
      showPlanModal: false, //配送计划弹窗
      currentType: "", //当前选择的配送计划类型
      remark: "", //备注
      // 单位
      unit: "瓶",
      loadingBtn: false,
      params: null //校验参数
    };
  },
  // 计算属性-缓存 类似于data概念
  computed: {
    ...mapState("milkcard", ["cardExchange", "cardPlanList", "milkPlanCount"]),
    // 单位
    getShowNotice() {
      // 提示展示控制
      if (!Object.keys(this.cardExchange).length) return "";
      return !this.cardExchange.deliveryPlanCode
        ? "typeAdd"
        : this.cardExchange.saleRange !== this.saleRange.SUCCESS
        ? "typeSever"
        : "";
    },
    mainTop() {
      let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      const { height, top } = menuButtonInfo;
      return height + top + 6 + "px";
      // return top + height + uni.upx2px(36);
    },
    //星期送情况
    disableWeekList() {
      // console.log("this.cardPlanList", this.cardPlanList);
      // 星期送
      if (this.cardPlanList.ruleType === ruleTypeEnum.WEEK_DAYS) {
        const arr = this.cardPlanList.deliveryDetails.split(",").sort();
        console.log("arr-->星期送", arr);
        const list = arr.map((el) => {
          if (el == 7) {
            el = 0;
          }
          return Number(el);
        });
        // console.log(list, "arr", arr);
        return list;
      } else {
        return [];
      }
    }
  },
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  onLoad(options) {
    if (options.params) {
      this.params = JSON.parse(options.params);
    }
  },
  // 生命周期 - 页面展示（不可以访问DOM元素）
  onShow() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  onReady() {},
  onPageScroll(e) {
    this.activeDom = e.scrollTop > 0;
  },
  // 方法集合
  methods: {
    ...mapActions("milkcard", [
      "post_ExchangeMilkCardOrder",
      "post_CardExchange",
      "put_AddMilkPlan"
    ]),
    ...mapMutations("milkcard", [
      "set_CardPlanList",
      "set_MilkPlanCount",
      "set_Prarms",
      "set_nullCardPlan",
      "set_CardExchange",
      "set_isExchangeGift"
    ]),
    // 配送计划点击item
    onPlanItem(type) {
      console.log("type--index", type);
      this.currentType = type;
      if (type !== DeliveryPlanEnum.Where) {
        this.showPlanModal = true;
      } else {
        uni.navigateTo({
          url: "/subPages/address/addressList?type=milkplan"
        });
      }
    },
    onClosePlan(e) {
      console.log("e", e);
      this.showPlanModal = !e;
    },
    onSureBtn(e) {
      console.log("e", e);
      this.showPlanModal = false;
      this.set_MilkPlanCount(e[0]);
      this.set_Prarms(e[1]);
      if (
        this.cardPlanList.deliveryPlanCode ||
        this.milkPlanCount.length === 4
      ) {
        //修改或新建  配送计划
        this.put_AddMilkPlan(this.cardExchange.deliveryPlanCode ? true : false);
      }
      console.log("this.cardPlanList", this.cardPlanList);
    },
    // 起送时间点击-打开日历
    onClickDate() {
      this.showCalendar = true;
      console.log("2-起送时间", this.showCalendar);
    },
    // 日历确定
    onConfrim(e) {
      console.log("e", e);
      // if()
      this.post_CardExchange({ deliveryStartDate: e[0] });
      this.showCalendar = false;
    },
    //关闭日历
    onclose() {
      this.showCalendar = false;
    },
    //校验
    async checkStatus() {
      try {
        const { msg, success } = await api.$post(
          milkCard.checkMilkCardStatus,
          this.params
        );
        !success &&
          uni.showToast({
            title: msg,
            icon: "none"
          });
        return success;
      } catch (error) {
        console.log("error", error);
        //
        return false;
      }
    },
    // 确认兑换
    async onConfirmBtn() {
      try {
        console.log("确认兑换");
        // 校验
        const checked = await this.checkStatus();
        if (!checked) return;
        this.post_ExchangeMilkCardOrder({
          deliveryPlanCode: this.cardExchange.deliveryPlanCode,
          remark: this.remark
        });
        this.set_isExchangeGift(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  },
  // 生命周期 - 监听页面隐藏
  onHide() {
    // console.error("onHide-隐藏");
  },
  // 生命周期 - 监听页面卸载
  onUnload() {
    // 清空参数
    console.error("onUnload-卸载");
    this.set_MilkPlanCount([]);
    this.set_Prarms({});
    this.set_nullCardPlan({});
    this.set_CardExchange({});
  }
};
</script>
<style scope lang="scss">
.confirm-out {
  height: 100vh;
  background: #f5f5f5;
}
.confirm-content {
  position: absolute;
  z-index: 101;
  padding: 26rpx 32rpx 256rpx;
  width: 100%;
}

.note-tip {
  background: #fff;
  padding: 24rpx 32rpx;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  .input-box {
    text-align: right;
    color: #999;
    font-size: 26rpx;
    width: 312rpx;
  }
  .xbff {
    margin-left: 32rpx;
    justify-content: flex-end;
  }
  .remark-tip {
    flex: 1;
    justify-content: flex-end;
    display: inline-block;
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
    }
  }
}
</style>
