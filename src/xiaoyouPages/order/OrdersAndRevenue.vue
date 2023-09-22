<template>
  <!-- 订单及收益 -->
  <view class="order">
    <view class="top-tab">
      <u-tabs
        :list="list"
        :current="currentIndex"
        lineWidth="20"
        lineHeight="6"
        @click="onTabChange"
        :lineColor="`no-repeat center/80%  url(https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/radian.png) `"
        :activeStyle="{
          color: '#1D9BDC',
          fontWeight: 'bold',
          fontSize: '30rpx',
        }"
        :inactiveStyle="{
          color: '#666666',
          fontSize: '30rpx',
        }"
        itemStyle="height: 80rpx;width:33.33%"
      ></u-tabs
    ></view>
    <user
      v-if="currentIndex === 0"
      style="flex: 1; background-color: #f6f6f6"
      :time="timeUser"
      v-on:change-time="changeTime"
    />
    <distribution-order
      v-if="currentIndex === 1"
      style="flex: 1; background-color: #f6f6f6"
      :time="timeDistributionOrder"
      v-on:change-time="changeTime"
    />
    <my-profit
      v-if="currentIndex === 2"
      style="flex: 1; background-color: #f6f6f6"
      :time="timeMyProfit"
      v-on:change-time="changeTime"
    ></my-profit>
    <CustomerServiceBottom bg="#f6f6f6" />
  </view>
</template>
<script>
import {OrderTab, StatisticsTypeEnum} from "@/utils/enum";
import {getTimeByStatisticsType} from "@/utils/utils";
import Vue from "vue";
import DistributionOrder from "./components/DistributionOrder.vue";
import User from "./components/User.vue";
import MyProfit from "./components/MyProfit.vue";
import CustomerServiceBottom from "./../components/CustomerServiceBottom.vue";

export default Vue.extend({
  data() {
    return {
      list: [
        {
          name: "邀请的鲜推官",
          key: OrderTab.user,
        },
        {
          name: "我的分销订单",
          key: OrderTab.distributionOrder,
        },
        {
          name: "我的收益",
          key: OrderTab.myProfit,
        },
      ],
      currentIndex: 0,
      dateType: StatisticsTypeEnum.TODAY,
      timeDistributionOrder: {
        start: "",
        end: "",
      },
      timeMyProfit: {
        start: "",
        end: "",
      },
      timeUser: {
        start: "",
        end: "",
      },
    };
  },
  // 选中tab
  onShow() {},
  onLoad(option) {
    const tab = option?.tab;
    this.dateType = option?.dateType;
    const index = this.list.findIndex((item) => item.key === tab);
    if (index >= 0) {
      this.currentIndex = index;
    }
    this.timeDistributionOrder = getTimeByStatisticsType(option?.dateType);
    this.timeMyProfit = getTimeByStatisticsType(option?.dateType);
    this.timeUser = getTimeByStatisticsType(option?.dateType);
  },
  components: {
    DistributionOrder,
    User,
    MyProfit,
    CustomerServiceBottom,
  },
  methods: {
    onTabChange(item) {
      const index = this.list.findIndex((name) => name.name === item.name);
      if (index >= 0) {
        this.currentIndex = index;
      }
    },
    changeTime(data, key) {
      this[key] = {...this[key], ...data};
    },
  },
});
</script>
<style scoped lang="scss">
.order {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
}
.top-tab {
  background: #fff;
  padding-bottom: 16rpx;
}
</style>
