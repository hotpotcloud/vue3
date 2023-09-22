<template>
  <!-- 分销订单 -->
  <view class="distribution-order">
    <view class="filter-top">
      <view class="left"
        >合计：<text>{{ money }}</text
        >元</view
      >
      <view class="right"
        ><text @click="openPopup" :class="{active: isChecked}">筛选</text
        ><image
          v-if="isChecked"
          class="filter-checked"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/arrow-checked.png" />
        <image
          v-else
          class="filter"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/tangle.png"
      /></view>
    </view>
    <view class="list">
      <view style="padding-top: 60rpx" v-if="list.length === 0"
        ><None v-on:btn-click="invite" btnText="立即邀请">
          <view> 您暂时还没有收益<br />赶紧去邀请朋友喝奶吧！ </view>
        </None></view
      >
      <scroll-view
        v-else
        class="scroll-view_H"
        @scrolltolower="scrollEnd"
        scroll-y="true"
      >
        <view v-for="item in list" :key="item.orderNo">
          <view
            class="list-item"
            v-if="item.strategyType !== StrategyTypeEnum.LOWER"
          >
            <view class="top">
              <view class="left">
                <view class="icon">单</view>
                <view>{{ item.orderNo }}</view>
                <image
                  class="copy"
                  @click="copyText"
                  :data-text="item.orderNo"
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/copy.png"
                ></image
              ></view>
            </view>
            <view class="content">
              <view class="left">
                <view><image class="product" :src="item.skuImg"></image></view>
              </view>
              <view class="right">
                <view>
                  <view>收益金额：</view>
                  <text class="money">¥{{ item.commission }}</text>
                </view>
                <!-- <view>
                  <view>来源订单：</view>
                  <text>{{ item.orderNo }}</text>
                  <image
                    class="copy"
                    @click="copyText"
                    :data-text="item.orderNo"
                    src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/copy.png"
                  ></image>
                </view> -->
                <view v-if="item.strategyType !== StrategyTypeEnum.GENERAL">
                  <view>收益类型：</view>
                  <text>{{ item.strategyTypeDesc }}</text>
                </view>
                <view v-else>
                  <view>配送瓶数：</view>
                  <text>{{ item.deliveryCount || 0 }}{{ item.skuUnit }}</text>
                </view>
                <view v-if="item.strategyType === StrategyTypeEnum.GENERAL">
                  <view>配送日期：</view>
                  <text>{{ item.deliveryTime }}</text>
                </view>
                <view
                  v-else-if="
                    item.strategyType === StrategyTypeEnum.COMMISSION_REISSUE
                  "
                >
                  <view>补发日期：</view>
                  <text>{{ item.orderTime }}</text>
                </view>
                <view v-else>
                  <view>订单日期：</view>
                  <text>{{ item.orderTime }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="list-item" v-else>
            <view class="top"
              ><text class="top-title">{{ item.strategyTypeDesc }}</text></view
            >
            <view class="content">
              <view class="left">
                <view
                  ><image
                    class="product"
                    src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/redPacket.png"
                  ></image
                ></view>
              </view>
              <view class="right">
                <view>
                  <view>收益金额：</view>
                  <text class="money">¥{{ item.commission }}</text>
                </view>
                <!-- <view>
                  <view>收益类型：</view>
                  <text>{{ item.strategyTypeDesc }}</text>
                </view> -->
                <view>
                  <view>下级姓名：</view>
                  <text>{{ item.distName }}</text></view
                >
                <view>
                  <view>注册时间：</view>
                  <text>{{ item.orderTime }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <u-overlay :show="show" @click="closePopup" :opacity="0.45">
      <view class="screen-wrap" @click.stop="stopPropagation($event)">
        <view class="screen-items-wrap">
          订单号：<input
            class="screen-input"
            :value="orderNo"
            @input="changeOrderNo"
          />
        </view>
        <view class="screen-items-wrap">
          配送日期：
          <picker mode="date" :value="initStartTime" @change="changeStartDate">
            <view class="picker">
              {{ initStartTime }}
            </view>
          </picker>
          <view class="date-icon"></view>
          <picker mode="date" :value="initEndTime" @change="changeEndDate">
            <view class="picker">
              {{ initEndTime }}
            </view>
          </picker>
        </view>
        <view class="btn-wrap">
          <view class="btn-cancel btn-base" @click="resetPopup">重置</view>
          <view class="btn-sure btn-base" @click="sureQuery">确定</view>
        </view>
      </view>
    </u-overlay>
  </view>
</template>
<script>
import Vue from "vue";
import {copyText} from "@/utils/utils";
import {OrdersAndRevenue} from "@/utils/url";
import dayjs from "@/components/libs/util/dayjs";
import None from "../../components/None.vue";
import {mapState} from "vuex";
import Api from "@/utils/api";

import {StrategyTypeEnum} from "@/utils/enum";

export default Vue.extend({
  props: ["time"],
  data() {
    return {
      list: [],
      page: 1,
      size: 10,
      totalElements: 0,
      loading: false,
      initStartTime: "",
      initEndTime: "",
      orderNo: "",
      show: false,
      StrategyTypeEnum: StrategyTypeEnum,
      money: 0,
      params: {},
    };
  },
  components: {None},
  mounted() {
    this.initStartTime = this.time?.start;
    this.initEndTime = this.time?.end;
    this.params = {
      timeEnd: this.initEndTime,
      timeStart: this.initStartTime,
    };
    this.getList();
    this.getMoney();
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("xiaoyou", ["xiaoyouInfo"]),
    isChecked() {
      return (
        this.params?.timeEnd ||
        this.params?.timeStart ||
        this.params?.mainOrderNo ||
        false
      );
    },
  },
  onShow() {},
  methods: {
    copyText: function (e) {
      copyText(e);
    },
    async getMoney() {
      const param = {
        distId: this.xiaoyouInfo?.id,
        status: this.status,
        appId: this.userInfo.appId,
        page: this.page,
        size: this.size,
        ...this.params,
      };
      const {data} = await Api.$postX(OrdersAndRevenue.financeCensus, param);

      this.money = data;
    },
    async getList(isReset = false) {
      const param = {
        distId: this.xiaoyouInfo?.id,
        status: this.status,
        appId: this.userInfo.appId,
        page: this.page,
        size: this.size,
        ...this.params,
      };
      this.loading = true;
      const {data} = await Api.$postX(
        OrdersAndRevenue.financePage,
        param,
        "加载中",
        true
      );
      this.totalElements = data?.totalElements;
      if (isReset) {
        this.list = data?.content || [];
      } else {
        this.list = this.list.concat(data?.content || []);
      }
      this.loading = false;
    },
    changeStartDate(e) {
      console.log(e);
      if (dayjs(e.detail.value).isAfter(this.initEndTime)) {
        return uni.showToast({
          title: "不能选择截止日期之后的日期哦～",
          icon: "none",
        });
      }
      this.initStartTime = e.detail.value;
    },
    changeEndDate(e) {
      if (dayjs(e.detail.value).isBefore(this.initStartTime)) {
        return uni.showToast({
          title: "不能选择开始日期之前的日期哦～",
          icon: "none",
        });
      }
      this.initEndTime = e.detail.value;
    },
    changeOrderNo(e) {
      this.orderNo = e.detail.value;
    },
    closePopup() {
      this.show = false;
    },
    resetPopup() {
      this.show = false;
      this.initStartTime = "";
      this.initEndTime = "";
      this.orderNo = "";
      this.params = {};
      this.page = 1;
      this.getList(true);
      this.getMoney();
      this.$emit(
        "change-time",
        {
          end: "",
          start: "",
        },
        "timeMyProfit"
      );
    },
    openPopup() {
      this.show = true;
      this.initStartTime = this.params.timeStart;
      this.initEndTime = this.params.timeEnd;
    },
    stopPropagation(ev) {
      ev.stopPropagation();
    },
    sureQuery() {
      this.params = {
        mainOrderNo: this.orderNo,
        timeEnd: this.initEndTime,
        timeStart: this.initStartTime,
      };
      this.$emit(
        "change-time",
        {
          end: this.initEndTime,
          start: this.initStartTime,
        },
        "timeMyProfit"
      );
      this.show = false;
      this.getList(true);
      this.getMoney();
    },
    scrollEnd() {
      if (
        this.page < Math.ceil(this.totalElements / this.size) &&
        this.loading === false
      ) {
        this.page = this.page + 1;
        this.getList();
      }
    },
    invite() {
      uni.navigateTo({
        url: "/xiaoyouPages/product/ProductList",
      });
    },
  },
});
</script>
<style scoped lang="scss">
.distribution-order {
  padding: 16rpx 32rpx 0rpx;
  flex: 1;
  height: 100%;
  .filter-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
    .left {
      > view {
        font-size: 26rpx;
        color: #666666;
      }
      > text {
        color: #ff3a30;
        margin-right: 5rpx;
      }
    }
    .right {
      font-size: 24rpx;
      color: #999999;
      display: flex;
      align-items: center;
      .filter {
        width: 15rpx;
        height: 12rpx;
        margin-left: 12rpx;
      }
      .filter-checked {
        width: 32rpx;
        height: 32rpx;
      }
      .active {
        color: #1d9bdc;
      }
    }
  }
  .list {
    flex: 1;
    .scroll-view_H {
      height: calc(100vh - 320rpx);
    }
    .list-item {
      padding: 0px 24rpx;
      background: #ffffff;
      margin-bottom: 16rpx;
      border-radius: 24rpx;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2rpx solid #f6f6f6;
        height: 84rpx;
        .left {
          display: flex;
          align-items: center;
          .icon {
            width: 40rpx;
            height: 36rpx;
            background: rgba(29, 155, 220, 0.1);
            border-radius: 8rpx;
            font-size: 24rpx;
            color: #1d9bdc;
            text-align: center;
          }
          > view:nth-child(2) {
            font-size: 28rpx;
            color: #333333;
            margin-left: 8rpx;
          }
        }
        .right {
          color: #1d9bdc;
          font-size: 24rpx;
        }
        .refound {
          color: #999999;
        }
        .copy {
          width: 40rpx;
          height: 40rpx;
          border: none;
        }
      }
      .top-title {
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
      }
      .content {
        display: flex;
        flex-direction: row;
        padding: 24rpx 0rpx 16rpx;
        .left {
          > view {
            width: 112rpx;
            height: 112rpx;
            background: #f3f3f3;
            border-radius: 16rpx;
            overflow: hidden;
            .product {
              width: 100%;
              height: 100%;
            }
          }
        }
        .right {
          margin-left: 18rpx;
          > view {
            display: flex;
            margin-bottom: 8rpx;

            > view {
              width: 120rpx;
              height: 34rpx;
              font-size: 24rpx;
              color: #7f7f7f;
              line-height: 34rpx;
            }
            > text {
              font-size: 24rpx;
              color: #7f7f7f;
              line-height: 34rpx;
            }
            .money {
              font-size: 28rpx;
              color: #ff3a30;
              font-weight: 500;
            }
          }
          .copy {
            width: 40rpx;
            height: 40rpx;
            border: none;
          }
        }
      }
    }
  }
}
.screen-wrap {
  width: 100vw;
  background: white;
  .screen-items-wrap {
    width: 100%;
    height: 127rpx;
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    border-bottom: 1rpx solid #eeeeee;
    font-size: 28rpx;
    color: #333333;
  }

  .screen-input {
    width: 300rpx;
    height: 68rpx;
    border-radius: 8rpx;
    background: #f5f5f5;
    font-weight: 500;
    font-size: 24rpx;
    color: #777777;
    margin-left: 28rpx;
    padding-left: 10rpx;
  }

  .picker {
    width: 240rpx;
    height: 68rpx;
    border-radius: 8rpx;
    background: #f5f5f5;
    font-weight: 500;
    font-size: 24rpx;
    color: #777777;
    line-height: 68rpx;
    position: relative;
    padding-left: 38rpx;
  }

  .picker::after {
    content: "";
    width: 16rpx;
    height: 10rpx;
    display: inline-block;
    background: url("https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-downpull-icon.png")
      no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    right: 38rpx;
    transform: translateY(-50%);
  }

  .date-icon {
    width: 32rpx;
    height: 2rpx;
    background: #999999;
    border-radius: 1rpx;
    margin: 0 17rpx;
  }

  .btn-wrap {
    width: 100%;
    height: 128rpx;
    display: flex;
  }

  .btn-base {
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 128rpx;
    font-size: 34rpx;
    text-align: center;
    letter-spacing: 2rpx;
    color: #999999;
  }

  .btn-cancel {
    border-right: 1rpx solid #eeeeee;
  }

  .btn-sure {
    color: #5ac69b;
  }
}
</style>
