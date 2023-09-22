<template>
  <!-- 日期显示 -->
  <view class="date_box">
    <view
      v-for="(dateInfo, dateIndex) in list"
      :key="dateIndex"
      class="calendar_date__box"
    >
      <!-- 周视图 -->
      <!-- <view
        class="day-by-week"
        v-if="swiperMode === 'close'"
        :class="{ avtiveday: dateInfo.isSelected }"
        @tap="chooseDate(dateInfo, dateIndex)"
        :style="{ maxHeight: cellHeight, minHeight: '98rpx' }"
      >
        <view :class="['weekday', dateInfo.isSelected && 'activeweek']">
          {{ dateInfo.isToday ? "今" : dateInfo.date }}
        </view>
        <view
          :class="[
            'status-tag',
            dateInfo.isSelected && 'active',
            dateInfo.deliveryStatus,
          ]"
          >{{ dateInfo.deliveryStatusName }}</view
        >
        <view style="margin-top: 6rpx">
          <view
            v-for="(el, index) in dateInfo.goodsList"
            :key="index"
            class="el-box d-flex-center d-sb"
          >
            <view>
              <image class="el-img" :src="el.goodsImgUrl" mode="aspectFit" />
            </view>
            <view :class="['elqty', dateInfo.isSelected && 'el-qty-select']"
              >x{{ el.qty }}</view
            >
          </view>
        </view>
      </view> -->
      <!-- 月视图 -->
      <view
        @tap="chooseDate(dateInfo, dateIndex)"
        v-if="swiperMode === 'open'"
        :class="[
          'day-by-month',
          dateInfo.isSelected && 'active-month',
          dateInfo.type !== 'cur' && 'sleep-month',
        ]"
      >
        <!-- 日期 -->
        <view :class="['monthday', dateInfo.isSelected && 'active-month']">
          {{ dateInfo.isToday ? "今" : dateInfo.date }}
        </view>
        <!-- 状态 -->
        <view
          v-show="dateInfo.deliveryStatusName"
          :class="[
            'status-tag',
            dateInfo.isSelected && 'active',
            dateInfo.deliveryStatus,
          ]"
        >
          {{ dateInfo.deliveryStatusName }}
        </view>
        <!-- 商品 -->
        <view style="margin-top: 6rpx">
          <view
            v-for="(el, index) in dateInfo.goodsList"
            :key="index"
            class="el-box d-flex-center d-sb"
          >
            <view>
              <img class="el-img" :src="getAssetImgUrl(el.imageUrl)" />
            </view>
            <view :class="['elqty', dateInfo.isSelected && 'el-qty-select']"
              >x{{ el.advanceQty }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { GoodsStatusText, GoodsStatusEnum } from "@/utils/enum";
export default {
  props: {
    dates: {
      type: Array,
      default: [],
    },
    cellHeight: {
      // 一列的高度
      type: Number,
      default: 98,
    },
    dateActiveColor: {
      // 日期选中颜色
      type: String,
      default: "#ff0",
    },
    swiperMode: {
      // 日历显示模式
      type: String,
      default: "close",
    },
  },
  data() {
    return {
      GoodsStatusText,
      GoodsStatusEnum,
    };
  },
  computed: {
    ...mapState("order", ["dateList"]),

    // 计算当前日历商品信息
    list() {
      const curList = this.dateList;
      const len = curList.length;
      // console.log("curList", curList);
      // console.log("this.dates", this.dates);
      if (curList && curList.length) {
        const newArr = JSON.parse(JSON.stringify(this.dates));
        const dates = newArr.map((el) => {
          const ymd = `${el.year}-${el.month > 9 ? el.month : "0" + el.month}-${
            el.date > 9 ? el.date : "0" + el.date
          }`;
          // 配送中》待配送》已停送》已完成
          for (let i = 0; i < len; i++) {
            if (curList[i].date === ymd) {
              // this.findSB(curList[i].detailInfo);
              el.goodsList = this.findSB(curList[i].detailInfo);
              el.deliveryStatusName =
                this.GoodsStatusText[
                  this.findSB(curList[i].detailInfo)[0].status
                ];
              el.deliveryStatus = this.findSB(curList[i].detailInfo)[0].status;
            }
          }
          return el;
        });
        // console.log("dates-->周数据----里面数据", dates);
        return dates;
      } else {
        return this.dates;
      }
    },
  },
  methods: {
    ...mapMutations("newhope", ["V_setcurChooseDate"]),
    findSB(sb) {
      // console.log("sb", sb);
      let arrsb = [];
      sb?.forEach((el) => {
        switch (el.status) {
          case GoodsStatusEnum.IN_DISTRIBUTION:
            el.index = 1;
            arrsb.push(el);
            break;
          case GoodsStatusEnum.GENERATE:
          case GoodsStatusEnum.IN_STOCK:
          case GoodsStatusEnum.FOR_SHIPPING:
            el.index = 2;
            arrsb.push(el);
            break;
          case GoodsStatusEnum.DISCONTINUED:
          case GoodsStatusEnum.CANCELLED:
          case GoodsStatusEnum.REFUNDED:
            el.index = 3;
            arrsb.push(el);
            break;
          case GoodsStatusEnum.CONFIRM:
            el.index = 4;
            arrsb.push(el);
            break;
          default:
            el.index = -1;
            return;
        }
      });
      // console.log(
      //   "arrsb->>>>>>>>>>>>>>>>>>>>",
      //   arrsb.sort((a, b) => a.index - b.index)
      // );
      return arrsb.sort((a, b) => a.index - b.index);
    },
    lowcase(val) {
      return val?.toLowerCase();
    },
    chooseDate(dateInfo, dateIndex) {
      this.V_setcurChooseDate(dateInfo);
      // console.log("dateIndex", dateInfo);
      this.$emit("chooseDate", dateInfo, dateIndex);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./css/datebox.scss";
/* 日历轮播 */
.date_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.date_box .calendar_date__box {
  width: calc(100% / 7);
  margin-top: 16rpx;
  // background: #71c5ff;
  // border-bottom: 1rpx solid #f1f1f1;  //每天下边框
  .day-by-week {
    border: 2rpx solid transparent;
    text-align: center;
    color: #666666;
    // width: 82rpx;
    max-height: 194rpx;
    background: #fff;
    padding: 16rpx 4rpx 4rpx;
    border-radius: 16rpx;
    overflow: hidden;
  }
  .avtiveday {
    background: #e4f4ff;
    border-color: #8bd0ff;
    color: #1d9bdc;
  }
}
/* 日历轮播 */

/* 新加
 */
.el-box {
  // background: #f4b935;
  margin-bottom: 8rpx;
  padding: 0 12rpx 0 8rpx;
}
.el-img {
  width: 30rpx;
  height: 32rpx;
}
.el-qty {
  color: #999999;
  font-size: 22rpx;
}
.el-qty-select {
  color: #1d9bdc !important;
}
// 日期
.weekday,
.monthday {
  line-height: 42rpx;
  font-size: 30rpx;
}
.activeweek {
  font-weight: bold;
}
/* 状态标签 */
.status-tag {
  font-size: 18rpx;
  border-radius: 12rpx;
  margin-top: 8rpx;
  padding: 0rpx 10rpx;
  &.active {
    color: #fff !important;
    background-color: #71c5ff !important;
    font-weight: bold !important;
  }
  //待配送&配送中
  &.WAIT_DELIVERY,
  &.DELIVERING,
  &.IN_DISTRIBUTION,
  &.GENERATE .IN_STOCK,
  &.FOR_SHIPPING {
    color: #71c5ff;
  }
  // 停送
  &.DISCONTINUED,
  &.DISCONTINUED,
  &.CANCELLED,
  &.REFUNDED {
    color: #f4b935;
  }
  //已完成
  &.FINISHED,
  &.CONFIRM {
    color: #71c5ff;
  }
}
</style>
