<template>
  <!-- 日期显示 -->
  <view class="date_box">
    <view
      v-for="(dateInfo, dateIndex) in list"
      :key="dateIndex"
      class="calendar_date__box"
    >
      <!-- 日期-单点 -->
      <view
        :class="{
          'day-by-week': true,
          today: dateInfo.isToday,
        }"
        :style="[
          {
            height: cellHeight + 'rpx',
            color:
              dateInfo.type == 'prev' || dateInfo.type === 'next'
                ? prevMonthColor
                : '',
          },
          dateInfo.isSelected && activeDateStyle,
        ]"
        @tap="chooseDate(dateInfo, dateIndex)"
      >
        <view class="day-item">
          {{ dateInfo.isToday ? "今" : dateInfo.date }}
        </view>
        <view v-if="dateInfo.type === 'cur'">
          <!-- 右上角角标 -->
          <view
            :class="[
              calcNum(dateInfo).num >= 0 && 'status-num-tag',
              calcNum(dateInfo).status,
            ]"
          >
            <!-- <text>{{ dateInfo.qty > 100 ? "99+" : dateInfo.qty }}</text> -->
            <text>{{
              calcNum(dateInfo).num > 100 ? "99+" : calcNum(dateInfo).num
            }}</text>
          </view>
          <!-- <view>{{ calcNum(dateInfo) }}</view> -->
          <!-- 状态 -->
          <view :class="['status-tag', calcNum(dateInfo).status]">
            <text>{{ calcNum(dateInfo).statusName }}</text>
            <!-- <text>{{ dateInfo.deliveryStatusName }}</text> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import { mapState } from "vuex";
import dayjs from "../../../libs/util/dayjs.js";
import { GoodsStatusText, GoodsStatusEnum } from "@/utils/enum";
const clickModeType = {
  single: "single",
  range: "range",
  multiple: "multiple",
};
export default {
  props: {
    // 是否标记选中
    isSelectedType: {
      type: Boolean,
      default: true,
    },
    // 最大的可选日期
    maxDate: {
      type: [String, Number],
      default: 0,
    },
    // 最小的可选日期
    minDate: {
      type: [String, Number],
      default: 0,
    },
    // mode=range时，第一个日期底部的提示文字
    startText: {
      type: String,
      default: "开始",
    },
    // mode=range时，最后一个日期底部的提示文字
    endText: {
      type: String,
      default: "结束",
    },
    //日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
    clickMode: {
      type: String,
      default: "single",
    },
    //日历数据
    dates: {
      type: Array,
      default: [],
    },
    info: {
      //外部日历数据
      type: Array,
      default: [],
    },
    // 配送数据
    sendDate: {
      type: Array,
      default: [],
    },
    // 非当前月日期颜色
    prevMonthColor: {
      type: String,
      default: "#c7c7c7",
    },
    // 一列的高度
    cellHeight: {
      type: Number,
      default: 100,
    },
    // 日历显示模式-默认月视图(open)-周视图(close)
    swiperMode: {
      type: String,
      default: "open",
    },
    // 是否为只读状态，只读状态下禁止选择日期
    readonly: {
      type: Boolean,
      default: false,
    },
    //选中日期的样式
    activeDateStyle: {
      type: Object,
      default: () => ({
        background: "#1D9BDC",
        color: "#fff",
      }),
    },
    // mode=multiple时，最多可选多少个日期
    maxCount: {
      type: [String, Number],
      default: Infinity,
    },
    // 日期区间最多可选天数，默认无限制，mode = range时有效
    maxRange: {
      type: [Number, String],
      default: Infinity,
    },
    // 范围选择超过最多可选天数时的提示文案，mode = range时有效
    rangePrompt: {
      type: String,
      default: "",
    },
    // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
    showRangePrompt: {
      type: Boolean,
      default: true,
    },
    // 是否允许日期范围的起止时间为同一天，mode = range时有效
    allowSameDay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      num: 10,
      select: [], //选择的日期列表
      item: {}, //当前选中日期
    };
  },
  computed: {
    // 计算当前日历商品信息
    list() {
      const curList = uni.$u.deepClone(this.info);
      if (curList && curList.length) {
        const newArr = JSON.parse(JSON.stringify(this.dates));
        const dates = newArr.map((el) => {
          for (let i = 0; i < curList.length; i++) {
            if (curList[i].date === el.timer) {
              el.list = curList[i].detailInfo;
            }
          }
          return el;
        });
        return dates;
      } else {
        return this.dates;
      }
    },
  },
  methods: {
    // 计算数量
    calcNum(val) {
      const res = {
        num: 0,
        status: "",
        statusName: "",
      };
      // return res;
      const { list } = val;
      if (list && list.length) {
        // 配送中>待配送>停送>已完成
        const obj = {
          sendList: [], //配送中
          waitList: [], //待配送
          cancelList: [], //拒收
          refundList: [], //停送
          finishedList: [], //已完成
        };
        let waitNum = 0,
          sendNum = 0,
          finishedNum = 0,
          refundNum = 0,
          cancelNum = 0;
        list.forEach((e) => {
          if (
            e.status === GoodsStatusEnum.GENERATE ||
            e.status === GoodsStatusEnum.IN_STOCK ||
            e.status === GoodsStatusEnum.FOR_SHIPPING
          ) {
            obj.waitList.push(e);
            waitNum += e.qty;
          }
          if (
            e.status === GoodsStatusEnum.DISCONTINUED ||
            e.status === GoodsStatusEnum.REFUNDED
          ) {
            obj.refundList.push(e);
            refundNum += e.qty;
          }
          if (e.status === GoodsStatusEnum.IN_DISTRIBUTION) {
            obj.sendList.push(e);
            sendNum += e.qty;
          }
          if (e.status === GoodsStatusEnum.CONFIRM) {
            obj.finishedList.push(e);
            finishedNum += e.qty;
          }
          if (e.status === GoodsStatusEnum.CANCELLED) {
            obj.cancelList.push(e);
            cancelNum += e.qty;
          }
        });
        if (obj.sendList.length > 0) {
          return {
            num: sendNum,
            status: GoodsStatusEnum.IN_DISTRIBUTION,
            statusName: GoodsStatusText[GoodsStatusEnum.IN_DISTRIBUTION],
          };
        } else if (obj.waitList.length > 0) {
          return {
            num: waitNum,
            status: GoodsStatusEnum.GENERATE,
            statusName: GoodsStatusText[GoodsStatusEnum.GENERATE],
          };
        } else if (obj.cancelList.length > 0) {
          return {
            num: cancelNum,
            status: GoodsStatusEnum.CANCELLED,
            statusName: GoodsStatusText[GoodsStatusEnum.CANCELLED],
          };
        } else if (obj.finishedList.length > 0) {
          return {
            num: finishedNum,
            status: GoodsStatusEnum.CONFIRM,
            statusName: GoodsStatusText[GoodsStatusEnum.CONFIRM],
          };
        } else if (obj.refundList.length > 0) {
          return {
            num: refundNum,
            status: GoodsStatusEnum.DISCONTINUED,
            statusName: GoodsStatusText[GoodsStatusEnum.DISCONTINUED],
          };
        }
      } else {
        return res;
      }
    },
    // 判断两个日期是否相等
    dateSame(date1, date2) {
      const ff = dayjs(date1).isSame(dayjs(date2));
      // console.log("dayjs(date1).isSame(dayjs(date2)", ff);
      return dayjs(date1).isSame(dayjs(date2));
    },
    // 点击日期
    chooseDate(item, index) {
      if (this.readonly) return;
      this.$emit("chooseDate", item, index);
      // this.item = item;
      // const timer = item.year + "-" + item.month + "-" + item.date;
      // const date = dayjs(timer).format("YYYY-MM-DD");
      // let select = uni.$u.deepClone(this.select);
      // const selectLen = select.length;
      // // 月视图下点击
      // if (this.swiperMode === "open") {
      //   if (this.clickMode === "single") {
      //     // 单选下点击
      //     select = [date];
      //   } else if (this.clickMode === "multiple") {
      //     //多选
      //     if (select.some((el) => this.dateSame(el, date))) {
      //       // 如果点击的日期已在数组中，则进行移除操作，也就是达到反选的效果
      //       const itemIndex = select.findIndex((item) => item === date);
      //       select.splice(itemIndex, 1);
      //     } else {
      //       // 如果点击的日期不在数组中，且已有的长度小于总可选长度时，则添加到数组中去
      //       // if (select.length < this.maxCount)
      //       select.push(date);
      //     }
      //   } else {
      //     //range
      //     //连续选---起选日期不可选还可以看item的disable属性
      //     if (selectLen === 0 || selectLen >= 2) {
      //       // 如果原来就为0或者大于2的长度，则当前点击的日期，就是开始日期
      //       select = [date];
      //     } else if (selectLen === 1) {
      //       //选结束日期
      //       const existsDate = select[0];
      //       // 如果当前选择的日期小于上一次选择的日期，则当前的日期定为开始日期
      //       if (dayjs(date).isBefore(existsDate)) {
      //         select = [date];
      //         // 当前日期减去最大可选的日期天数，如果大于起始时间，则进行提示
      //         const flag = dayjs(
      //           dayjs(date).subtract(this.maxRange, "day")
      //         ).isAfter(dayjs(existsDate));
      //         if (flag && this.showRangePrompt) {
      //           return uni.$u.toast(
      //             this.rangePrompt || `选择天数不能超过${this.maxRange}天`
      //           );
      //         }

      //         // 如果当前日期大于已有日期，将当前的添加到数组尾部
      //         select.push(date);
      //         const startDate = select[0];
      //         const endDate = select[1];
      //         const arr = [];
      //         let i = 0;
      //         do {
      //           arr.push(dayjs(startDate).add(i, "day").format("YYY-MM-DD"));
      //           i++;
      //         } while (dayjs(startDate).add(i, "day").isBefore(dayjs(endDate)));
      //         arr.push(endDate);
      //         select = arr;
      //       } else {
      //         // 选择区间时，只有一个日期的情况下，且不允许选择起止为同一天的话，不允许选择自己
      //         if (select[0] === date && !this.allowSameDay) return;
      //         select.push(date);
      //       }
      //     }
      //   }
      //   this.setSelected(select);
      //   // console.log("select1", this.select);
      // }
    },
    setSelected(selected, event = true) {
      this.select = selected;
      // console.log("this.select", this.select);
      event && this.$emit("monthSelect", this.select);
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
  margin-top: 4rpx;
  .day-by-week {
    padding: 20rpx 0 6rpx;
    text-align: center;
    color: #666666;
    width: 98%;
    background: #fff;
    border-radius: 12rpx;
    position: relative;
  }
  .day-item {
    font-size: 30rpx;
  }
  .today {
    color: #1d9bdc;
    font-weight: bold;
  }
}
//右上角角标
.status-num-tag {
  position: absolute;
  top: -5rpx;
  right: 0rpx;
  // min-width: 26rpx;
  // min-height: 26rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  padding: 2rpx;
  // background: #f4b935;
  font-size: 16rpx;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &.IN_DISTRIBUTION,
  &.GENERATE,
  &.IN_STOCK,
  &.FOR_SHIPPING {
    background: #71c5ff;
  }
  // 停送
  &.DISCONTINUED,
  &.REFUNDED {
    background: #f4b935;
  }
  //已完成
  &.CONFIRM {
    background: #c7c7c7;
  }
  &.CANCELLED {
    background: #ffa217;
  }
}

/* 状态标签 */
.status-tag {
  font-size: 18rpx;
  margin-top: 8rpx;
  padding: 0rpx 5rpx;
  &.active {
    color: #fff !important;
    background-color: #71c5ff !important;
    font-weight: bold !important;
  }
  // GENERATE = "待配送",
  // IN_STOCK = "待配送",
  // FOR_SHIPPING = "待配送",
  // IN_DISTRIBUTION = "配送中",
  // CONFIRM = "已完成",
  // DISCONTINUED = "停送",
  // CANCELLED = "拒收",
  // REFUNDED = "停送",

  //待配送&配送中
  &.IN_DISTRIBUTION,
  &.GENERATE,
  &.IN_STOCK,
  &.FOR_SHIPPING {
    color: #71c5ff;
  }
  // 停送
  &.DISCONTINUED,
  &.REFUNDED {
    color: #f4b935;
  }
  //已完成
  &.CONFIRM {
    color: #c7c7c7;
  }
  &.CANCELLED {
    color: #ffa217;
  }
}
</style>
