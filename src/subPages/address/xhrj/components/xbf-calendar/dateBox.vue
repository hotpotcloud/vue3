<template>
  <!-- 日期显示 -->
  <view class="date_box">
    <view
      v-for="(dateInfo, dateIndex) in list"
      :key="dateIndex"
      class="calendar_date__box"
    >
      <!-- 调整日历 -->
      <view
        v-if="resize"
        class="day-by-week"
        @tap="chooseDate(dateInfo, dateIndex)"
      >
        <view
          :class="[
            'weekday',
            dateInfo.isSelected && 'activeweek',
            dateInfo.type == 'prev' || dateInfo.type === 'next'
              ? 'prevday'
              : '',
          ]"
        >
          {{ dateInfo.isToday ? "今" : dateInfo.date }}
        </view>
        <!-- 状态 -->
        <view :class="['status-tag', dateInfo.deliveryStatus]">{{
          dateInfo.deliveryStatusName
        }}</view>
      </view>
      <!-- 正常首页日历 -->
      <view
        v-else
        class="day-by-week"
        :class="{
          avtiveday: dateInfo.isSelected,
        }"
        @tap="chooseDate(dateInfo, dateIndex)"
      >
        <view :class="['weekday', dateInfo.isSelected && 'activeweek']">
          {{ dateInfo.isToday ? "今" : dateInfo.date }}
        </view>
        <!-- 状态 -->
        <view
          :class="[
            'status-tag',
            dateInfo.isSelected && 'active',
            dateInfo.deliveryStatus,
          ]"
          >{{ dateInfo.deliveryStatusName ? dateInfo.deliveryStatusName : "" }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
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
    resize: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("newhope", ["calendarList", "resizeDateList"]),

    // 计算当前日历商品信息
    list() {
      console.log("this.resize", this.resize, this.resizeDateList);
      const curList = this.resize
        ? this.resizeDateList.calenderList
        : this.calendarList.calenderList;
      // if (curList) {
      //   const dates = this.dates.map((el) => {
      //     const week = `${el.year}-${
      //       el.month > 9 ? el.month : "0" + el.month
      //     }-${el.date > 9 ? el.date : "0" + el.date}`;
      //     for (let i = 0; i < curList.length; i++) {
      //       if (curList[i].date === week) {
      //         el.goodsList = curList[i].goodsList;
      //         el.deliveryStatusName = curList[i].deliveryStatusName;
      //         el.deliveryStatus = curList[i].deliveryStatus;
      //       }
      //     }
      //     return el;
      //   });
      //   console.log("dates-->周数据", dates);
      //   return dates;
      // } else return this.dates;
      if (curList && curList.length) {
        console.log("1", 1);
        const newArr = JSON.parse(JSON.stringify(this.dates));
        const dates = newArr.map((el) => {
          const week = `${el.year}-${
            el.month > 9 ? el.month : "0" + el.month
          }-${el.date > 9 ? el.date : "0" + el.date}`;
          for (let i = 0; i < curList.length; i++) {
            if (curList[i].date === week) {
              el.goodsList = curList[i].goodsList;
              el.deliveryStatusName = curList[i].deliveryStatusName;
              el.deliveryStatus = curList[i].deliveryStatus;
            }
          }
          return el;
        });
        // console.log("dates-->周数据", dates);
        return dates;
      } else {
        console.log("2", this.dates);
        return this.dates;
      }
    },
  },
  methods: {
    lowcase(val) {
      return val?.toLowerCase();
    },
    chooseDate(dateInfo, dateIndex) {
      this.$emit("chooseDate", dateInfo, dateIndex);
    },
  },
};
</script>

<style scoped lang="scss">
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
  .day-by-week {
    border: 2rpx solid transparent;
    text-align: center;
    color: #666666;
    width: 82rpx;
    height: 98rpx;
    background: #fff;
    padding: 16rpx 4rpx 4rpx;
    border-radius: 16rpx;
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
.box-goods {
  margin-bottom: 8rpx;
}
.el-img {
  width: 32rpx;
  height: 32rpx;
}
// 日期
.weekday {
  line-height: 42rpx;
  font-size: 30rpx;
  // color: #f4b935;
}
.prevday,
.nextday {
  color: #c7c7c7 !important;
}

.activeweek {
  font-weight: bold;
}
/* 状态标签 */
.status-tag {
  font-size: 18rpx;
  border-radius: 12rpx;
  margin-top: 8rpx;
  padding: 0rpx 5rpx;
  &.active {
    color: #fff !important;
    background-color: #71c5ff !important;
    font-weight: bold !important;
  }
  //待配送&配送中
  &.WAIT_DELIVERY,
  .DELIVERING {
    color: #71c5ff;
  }
  // 停送
  &.DISCONTINUED {
    color: #f4b935;
  }
  //已完成
  &.FINISHED {
    color: #c7c7c7;
  }
}
</style>
