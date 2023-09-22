<template>
  <view class="page">
    <view class="top">
      <view class="left">
        <picker
          mode="date"
          :value="currentTime"
          fields="month"
          @change="selectDate"
        >
          <view class="pick-date"
            ><text>{{ selectDateString }}</text>
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/arrow.png"
              class="arrow-image"
            />
          </view>
        </picker>
      </view>
      <!-- <view class="right"
        ><text>筛选</text
        ><image
          class="filter"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/tangle.png"
        ></image
      ></view> -->
    </view>
    <view class="list">
      <view v-if="list.length <= 0" style="padding-top: 50rpx"
        ><None><text>暂无数据</text></None></view
      >
      <scroll-view
        v-else
        class="scroll-view"
        @scrolltolower="scrollEnd"
        scroll-y="true"
      >
        <view class="list-item" v-for="item in list" :key="item.createdTime">
          <view class="left">
            <view
              ><image
                class="icon"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/weixin.png"
              ></image
            ></view>
            <view
              ><view>微信自动提现</view
              ><view>{{ item.createdTime }}</view></view
            >
          </view>
          <view class="right">
            <view class="money">+{{ item.withdraw }}</view>
            <view
              :class="{
                status: true,
                red: item.withdrawStatus === WithdrawStatus.transferError,
                green: item.withdrawStatus === WithdrawStatus.transfering,
                end:
                  item.withdrawStatus === WithdrawStatus.arrived ||
                  item.withdrawStatus === WithdrawStatus.other,
              }"
              >{{ item.withdrawStatusDesc }}</view
            >
          </view>
        </view>
      </scroll-view>
    </view>
    <CustomerServiceBottom bg="#fff" />
  </view>
</template>
<script>
import Vue from "vue";
import Api from "@/utils/api";

import CustomerServiceBottom from "./../components/CustomerServiceBottom.vue";
import {request} from "@/utils/http";
import {Withdraw} from "@/utils/url";
import {WithdrawStatus} from "@/utils/enum";
import {mapState} from "vuex";
import dayjs from "@/components/libs/util/dayjs";
import {formatAmountFixed} from "@/utils/utils";
import None from "../components/None.vue";

const handleDate = (date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const yearString = year + "年";
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const monthString = month + "月";
  return {
    dateString: [yearString, monthString].join(""),
    date: [year, month, day].join("-"),
  };
};
const currentTime = handleDate(new Date());
export default Vue.extend({
  data() {
    return {
      list: [],
      page: 1,
      size: 10,
      currentDate: currentTime.date,
      selectDateString: currentTime.dateString,
      totalElements: 0,
      WithdrawStatus: WithdrawStatus,
      loading: false,
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("xiaoyou", ["xiaoyouInfo"]),
  },
  onLoad() {
    this.getList();
  },
  components: {
    CustomerServiceBottom,
    None,
  },
  methods: {
    async getList(isReset = false) {
      this.loading = true;
      const {data} = await Api.$postX(
        Withdraw.withdrawPage,
        {
          page: this.page,
          size: this.size,
          appId: this.userInfo.appId,
          distId: this.xiaoyouInfo?.id,
          applyStartTime: dayjs(this.currentDate)
            .startOf("month")
            .format("YYYY-MM-DD"),
          applyEndTime: dayjs(this.currentDate)
            .endOf("month")
            .format("YYYY-MM-DD"),
        },
        "加载中",
        true
      );
      const newList = (data?.content || []).map((item) => {
        return {
          ...item,
          withdraw: formatAmountFixed(item.withdraw, false),
        };
      });
      this.totalElements = data?.totalElements;
      if (isReset) {
        this.list = newList;
      } else {
        this.list = this.list.concat(newList);
      }
      this.loading = false;
    },
    scrollEnd() {
      console.log("end");
      if (
        this.page < Math.ceil(this.totalElements / this.size) &&
        this.loading === false
      ) {
        this.page = this.page + 1;
        this.getList();
      }
    },
    selectDate(e) {
      const date = e.detail.value;
      const data = handleDate(date);
      this.selectDateString = data.dateString;
      this.currentDate = data.date;
      this.page = 1;
      this.getList(true);
    },
  },
});
</script>
<style scoped lang="scss">
.page {
  background-color: #f6f6f6;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .top {
    padding: 0px 32rpx;
    display: flex;
    justify-content: space-between;
    height: 86rpx;
    line-height: 86rpx;
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .pick-date {
      font-size: 30rpx;
      color: #333333;
      line-height: 35rpx;
      align-items: center;
      display: flex;
    }
    .arrow-image {
      width: 48rpx;
      height: 48rpx;
      align-items: center;
    }
    .right {
      font-size: 24rpx;
      color: #999999;
      .filter {
        width: 15rpx;
        height: 12rpx;
        margin-left: 12rpx;
      }
    }
  }
  .scroll-view {
    height: calc(100vh - 240rpx);
  }
  .list {
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    padding: 0rpx 32rpx;
    background-color: #fff;
    flex: 1;
    .list-item {
      border-bottom: 2rpx solid #f2f2f2;
      padding: 24rpx 0rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        > view:nth-child(1) {
          margin-left: 24rpx;
          width: 72rpx;
          height: 72rpx;
          > image {
            width: 72rpx;
            height: 72rpx;
            border: none;
          }
        }
        > view:nth-child(2) {
          margin-left: 16rpx;
          > view:nth-child(1) {
            font-size: 32rpx;
            color: #333333;
            line-height: 38rpx;
            margin-bottom: 8rpx;
          }
          > view:nth-child(2) {
            font-size: 24rpx;
            color: #7f7f7f;
            line-height: 28rpx;
          }
        }
      }
      .right {
        .money {
          font-size: 32rpx;
          font-weight: 500;
          color: #f59a23;
          line-height: 38rpx;
          margin-bottom: 8rpx;
        }
        .status {
          font-size: 24rpx;
          color: #42b28a;
          line-height: 28rpx;
        }
        .red {
          color: #ec4747;
        }
        .green {
          color: #42b28a;
        }
        .end {
          color: #999999;
        }
      }
    }
  }
}
</style>
