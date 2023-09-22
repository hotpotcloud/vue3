<template>
  <view class="wallet-out">
    <view class="pay-status">
      <view class="d-flex-center d-sb">
        <view>待还金额</view>
        <view class="right-date" v-if="payAfterRes.lastPayTime"
          >最迟还款日：{{ payAfterRes.lastPayTime }}</view
        >
      </view>

      <view class="d-flex-center d-sb action-row">
        <view class="money" v-if="payAfterRes.waitPayAmount">
          <text class="money-icon">￥</text>
          {{ noformatAmount(payAfterRes.waitPayAmount) }}
          <text class="tips" v-if="payAfterRes.overtime">已逾期</text>
        </view>
        <view v-else class="money-empty">暂无还款</view>
        <view class="d-flex-center btn-arr">
          <view class="bill-btn flex-1" @tap="toBill">账单</view>
          <!-- <view
            class="pay-btn flex-1"
            @tap="toRepayment"
            v-if="payAfterRes.waitPayAmount"
          >
            还款
          </view> -->
        </view>
      </view>
    </view>
    <view class="pay-tabs d-flex-center">
      <view
        v-for="(el, index) in list"
        :key="el.value"
        :class="['flex-1', 'el-tab', active === index && 'current-tab']"
        @click="onTab(el, index)"
        >{{ el.label }}</view
      >
    </view>
    <view v-if="!loading" style="height: 100%">
      <scroll-view
        scroll-y
        class="scroll-goods"
        v-if="payAfterGoods.length"
        @scrolltolower="scrolltolower"
      >
        <view
          v-for="(i, index) in payAfterGoods"
          :key="index"
          class="item-goods"
        >
          <goods-card @toCalendar="toCalendar(i)" :info="i" />
        </view>
      </scroll-view>
      <!-- 暂无数据 -->
      <view v-else class="no-data">
        <EmptyData />
      </view>
    </view>
  </view>
</template>

<script>
import GoodsCard from "./components/Goods-Card.vue";
// import EmptyData from "./components/Empty-Data.vue";
import EmptyData from "./components/Empty-Data.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { orderStatus } from "@/utils/enum.ts";
import { payChannelEnum } from "@/store/types.ts";
export default {
  components: {
    GoodsCard,
    EmptyData,
  },
  data() {
    return {
      list: [
        { label: "全部", value: orderStatus.ALL },
        { label: "待配送", value: orderStatus.WAIT_DELIVERY },
        { label: "配送中", value: orderStatus.DELIVERING },
      ],
      active: 0, //选中tab
      res: {
        money: null,
      },
      payChannelEnum: payChannelEnum,
      loading: false,
      req: {
        page: 1,
        size: 10,
        status: null,
      },
    };
  },
  onLoad(options) {
    console.log("options", options);
    if (options?.source === "app") {
      this.set_Source(payChannelEnum.VALET_PAYMENT);
    }
  },
  onShow() {
    this.initPage();
    // this.get_selectFirstReceipt();
    // console.log('2--先饮后付',2)
  },
  computed: {
    ...mapState("user", ["payAfterRes", "payAfterGoods", "payAfterGoodsPage"]),
  },
  methods: {
    ...mapMutations("user", [
      "set_Source",
      "set_calenderParams",
      "set_payAfterGoods",
    ]),
    ...mapActions("user", [
      "get_selectFirstReceipt",
      "get_selectFirstReceiptGoods",
      "post_payWallet",
      "post_Calendar", //配送日历
    ]),
    initPage() {
      this.loading = true;
      this.get_selectFirstReceipt();
      console.log("this.list[this.active].value", this.list[this.active].value);
      this.get_selectFirstReceiptGoods(this.req);
      this.loading = false;
    },
    /* 查看tab */
    onTab(val, index) {
      this.set_payAfterGoods("clear");
      this.active = index;
      this.loading = true;
      this.req.status = val.value;
      this.req.page = 1;
      console.log("val", val);
      this.get_selectFirstReceiptGoods(this.req);
      this.loading = false;
    },
    /* 滚动到底部 */
    scrolltolower() {
      console.log("滚动到底部");
      if (this.req.page < this.payAfterGoodsPage) {
        this.req.page++;
        this.get_selectFirstReceiptGoods(this.req);
      }
    },
    /* 查看配送日历 */
    toCalendar(val) {
      console.log("e", val);
      const params = {
        delyItemNo: val.delyItemNo, //配送明细单号
        orgStationNo: val.orgStationNo, //履约单编码
        queryHistory: 0, //是否查询历史 0-否 1-是
      };
      // this.post_Calendar(params);
      this.set_calenderParams(params);
      // return
      uni.navigateTo({
        url: "/subPages/user/date/index",
      });
    },
    // 查看账单
    toBill() {
      uni.navigateTo({
        url: "/subPages/user/wallet_list",
      });
    },
    // 还款
    toRepayment() {
      console.log("payAfterRes", this.payAfterRes);
      // const params = {
      //   receiptNo: this.payAfterRes.receiptNo,
      // };
      this.post_payWallet(this.payAfterRes.receiptNo);
    },
  },
};
</script>

<style scoped lang="scss">
.wallet-out {
  padding: 24rpx 32rpx;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
}
.pay-status {
  color: #fff;
  height: 216rpx;
  width: 100%;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  background: linear-gradient(-288deg, #1693ed 0%, #65d7fb 100%);
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/milk/001bg.png")
      no-repeat,
    linear-gradient(-288deg, #1693ed 0%, #65d7fb 100%);
  background-size: auto 100%;
  background-position-x: 100%;
  padding: 48rpx 32rpx;

  .right-date {
    color: rgba($color: #fff, $alpha: 0.9);
  }
  .action-row {
    margin-top: 20rpx;
    .money {
      font-size: 56rpx;
      font-weight: bold;
      position: relative;
      .money-icon {
        font-size: 40rpx;
      }
      .tips {
        display: inline-block;
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
        border-bottom-right-radius: 20rpx;
        padding: 2rpx 14rpx 6rpx 12rpx;
        background: #ffcd5f;
        font-size: 18rpx;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        color: #ffffff;
        position: absolute;
        right: -6rpx;
        transform: translate(100%, 50%);
        // top: -4rpx;
      }
    }
    .money-empty {
      font-weight: bold;
      color: #ffffff;
      font-size: 56rpx;
    }

    .btn-arr {
      .pay-btn,
      .bill-btn {
        font-size: 30rpx;
        font-weight: bold;
        height: 64rpx;
        width: 132rpx;
        border-radius: 254rpx 254rpx 254rpx 254rpx;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;
        line-height: 64rpx;
      }
      .pay-btn {
        margin-left: 8rpx;
        background: #fff;
        color: #1d9bdc;
      }
    }
  }
}

.pay-tabs {
  padding: 4rpx;
  height: 72rpx;
  width: 100%;
  color: #000;
  background-color: #fff;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  margin-top: 24rpx;
  .el-tab {
    text-align: center;
    color: #333333;
    font-weight: bold;
    font-size: 28rpx;
  }
  .current-tab {
    background: linear-gradient(
      -288deg,
      rgba(22, 147, 237, 0.72) 0%,
      #65d7fb 100%
    );
    color: #fff;
    height: 64rpx;
    line-height: 64rpx;
    border-radius: 20rpx;
    position: relative;
    &::after {
      content: "";
      border-left: 20rpx solid transparent;
      border-right: 20rpx solid transparent;
      border-top: 8rpx solid #fff;
      position: absolute;
      bottom: -12rpx;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.scroll-goods {
  height: calc(100vh - 360rpx);
  padding: 16rpx 0;
  .item-goods {
    margin-bottom: 16rpx;
  }
}
.no-data {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  height: 100%;
  // margin-top: 100rpx;
}
</style>
