<template>
  <!-- 月份数据展示 -->
  <view>
    <!-- 周 -->
    <view class="calendar_week">
      <view
        v-for="(item, index) in week"
        :key="index"
        class="calendar_week__item"
        >{{ item }}</view
      >
    </view>
    <!-- 日 -->
    <view class="calendar_month">
      <view
        v-for="(item, index) in mixDate"
        :key="index"
        class="calendar_month__item"
        :style="[daySelectedStyle(index, item), { height: cellHeight + 'rpx' }]"
        :class="[(item.type === 'prev' || item.type === 'next') && 'prev_day']"
        @tap="clickDay(item, index)"
      >
        <view
          class="select_day_tip"
          :class="[
            (index + 1) % 7 === 0 && 'select_day_tip_right',
            index % 7 === 0 && 'select_day_tip_left',
          ]"
          v-if="
            selected.length === 1 &&
            item.date === selected[0] &&
            mode === 'range'
          "
          >请选择{{ endText }}日期</view
        >
        <view class="item_day">
          <view>
            <view :style="[todayStyle(item), textStyle(item, false)]">
              {{ item.isToday ? "今" : item.day }}
            </view>
            <view
              class="status_text"
              :style="[textStyle(item, true)]"
              :class="[item.deliveryStatus]"
            >
              <!-- {{ item.selectedDate ? multipleText : "待配送" }} -->
              {{ calcText(item) }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { daySame } from "../utils/utils";
import dayjs from "../../libs/util/dayjs";
export default {
  props: {
    week: {
      type: Array,
      default: ["日", "一", "二", "三", "四", "五", "六"],
    },

    //月份数据
    month: {
      type: Array,
      default: [],
    },
    //行高
    cellHeight: {
      type: Number,
      default: 100,
    },
    //日期底部提示文字
    multipleText: {
      type: String,
      default: "停送", //停送-恢复
    },
    //选中日期背景颜色
    activeColor: {
      type: String,
      default: "#FFCD5F", //停送颜色：#FFCD5F，恢复颜色：#1D9BDC，字体白色
    },
    // mode=range时，底层背景色
    rangeBgColor: {
      type: String,
      default: "#E4F4FF", //停送颜色：#FFCD5F；恢复颜色：#E4F4FF，
    },
    //超出可选日期区间提示文字
    rangePrompt: {
      type: String,
      default: "超出可选范围",
    },
    //开始日期底部提示文字
    startText: {
      type: String,
      default: "停送开始", //恢复开始
    },
    //结束日期底部提示文字
    endText: {
      type: String,
      default: "停送结束", //恢复结束
    },
    //日期选择类型：single-单选，multiple-多选，range-范围选择
    mode: {
      type: String,
      default: "single",
    },
    //mode=range时，起止日期是否可以为同一天
    allowSameDay: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => [],
    },
    res: {
      //停送日历数据
      type: Array,
      default: [],
    },
    useType: {
      type: String,
      default: "resize", //默认停送日历
    },
  },

  data() {
    return {
      //当前选中日期缓存
      selectedInfo: null,
      // selected: [],
    };
  },
  computed: {
    // 混合数据
    mixDate() {
      const infoArr = uni.$u.deepClone(this.res);
      const dateArr = uni.$u.deepClone(this.month);
      const mixArr = [];

      dateArr.forEach((item) => {
        infoArr.forEach((date) => {
          if (item.date === date.date) {
            item = { ...item, ...date };
          }
        });
        mixArr.push(item);
      });
      return mixArr;
    },

    // 日期文字
    calcText() {
      return (item) => {
        if (this.mode === "range") {
          if (
            (this.selected.length === 1 || this.selected.length >= 2) &&
            item.date === this.selected[0]
          ) {
            return this.startText
              ? this.startText
              : item.deliveryStatusName
              ? item.deliveryStatusName
              : "";
          } else if (
            this.selected.length >= 2 &&
            item.date === this.selected[this.selected.length - 1]
          ) {
            return this.endText
              ? this.endText
              : item.deliveryStatusName
              ? item.deliveryStatusName
              : "";
          } else {
            return item.deliveryStatusName ? item.deliveryStatusName : "";
          }
        } else if (this.mode === "multiple") {
          if (
            this.selected.some((el) => daySame(el, item.date)) &&
            this.multipleText &&
            item.deliveryStatus
          ) {
            return this.multipleText;
          }
          return item.deliveryStatusName ? item.deliveryStatusName : "";
        } else {
          return item.deliveryStatusName ? item.deliveryStatusName : "";
        }
      };
    },
    //开始结束日期样式
    startandEndStyle() {
      return (item) => {
        const date = dayjs(item.date).format("YYYY-MM-DD");
        let style = {};
        // if (this.mode === "range" && this.selected.length >= 2) {
        //   const len = this.selected.length - 1;
        //   if (
        //     daySame(date, this.selected[0]) ||
        //     daySame(date, this.selected[len])
        //   ) {
        //     style.background = this.activeColor;
        //     style.borderTopLeftRadius = "6px";
        //     style.borderBottomLeftRadius = "6px";
        //     style.borderTopRightRadius = "6px";
        //     style.borderBottomRightRadius = "6px";
        //   }
        // }
        return style;
      };
    },
    // 计算颜色
    daySelectedStyle() {
      return (index, item) => {
        let date = dayjs(item.date).format("YYYY-MM-DD"),
          style = {};
        if (
          this.mode === "multiple" &&
          (item.type === "prev" || item.type === "next")
        ) {
          return style;
        }
        if (this.selected.some((item) => daySame(item, date))) {
          style.background = this.activeColor;
        }
        if (this.mode === "single") {
          if (date === this.selected[0]) {
            style.borderTopLeftRadius = "6px";
            style.borderBottomLeftRadius = "6px";
            style.borderTopRightRadius = "6px";
            style.borderBottomRightRadius = "6px";
          }
        } else if (this.mode === "range") {
          if (this.selected.length >= 2) {
            const len = this.selected.length - 1;
            // 范围日期之间背景浅色
            if (
              dayjs(date).isAfter(dayjs(this.selected[0])) &&
              dayjs(date).isBefore(dayjs(this.selected[len]))
            ) {
              style.backgroundColor = this.rangeBgColor;
              if (item.type === "next" || item.type === "prev") {
                uni.$u.colorGradient(this.rangeBgColor, "#ffffff", 10)[90];
                style.opacity = 0.5;
              }
              // uni.$u.colorGradient(
              //   this.activeColor,
              //   "#ffffff",
              //   10
              // )[90];
              // // 范围日期之外背景浅色
              // style.opacity = 0.8;
            }
            if (daySame(date, this.selected[0])) {
              style.borderTopLeftRadius = "6px";
              style.borderBottomLeftRadius = "6px";
              // style.borderTopRightRadius = "6px";
              // style.borderBottomRightRadius = "6px";
            }
            if (daySame(date, this.selected[len])) {
              style.borderTopRightRadius = "6px";
              style.borderBottomRightRadius = "6px";
            }
          } else if (this.selected.length === 1) {
            style.borderTopLeftRadius = "6px";
            style.borderBottomLeftRadius = "6px";
            style.borderTopRightRadius = "6px";
            style.borderBottomRightRadius = "6px";
          }
        } else {
          if (this.selected.some((item) => daySame(item, date))) {
            style.borderTopLeftRadius = "6px";
            style.borderBottomLeftRadius = "6px";
            style.borderTopRightRadius = "6px";
            style.borderBottomRightRadius = "6px";
          }
        }
        return style;
      };
    },
    // 今天颜色
    todayStyle() {
      return (item) => {
        const date = dayjs(item.date).format("YYYY-MM-DD"),
          style = {};
        if (
          daySame(date, dayjs().format("YYYY-MM-DD")) &&
          item.type === "cur"
        ) {
          style.color = "#1D9BDC";
          style.fontWeight = "blod";
        }
        return style;
      };
    },
    // 计算文字颜色
    textStyle() {
      return (item, flag = fasle) => {
        const date = dayjs(item.date).format("YYYY-MM-DD"),
          style = {};
        if (
          this.mode === "multiple" &&
          (item.type === "prev" || item.type === "next")
        ) {
          return style;
        }
        if (this.selected.some((item) => daySame(item, date))) {
          style.color = "#ffffff";
          // console.log("item-字体颜色", item);
        }
        if (this.mode === "range") {
          const len = this.selected.length - 1;
          if (this.selected.some((item) => daySame(item, date))) {
            style.color = "#ffffff";
            if (
              dayjs(date).isAfter(dayjs(this.selected[0])) &&
              dayjs(date).isBefore(dayjs(this.selected[len]))
            ) {
              style.color = flag ? "" : "#666666";
            }
          }
        }
        return style;
      };
    },
  },
  methods: {
    clickDay(item, index) {
      // console.log("item", item);
      this.$emit("clickDay", item, index);
      return;
      const { mode } = this;
      //点击日期
      const date = dayjs(item.date).format("YYYY-MM-DD");
      const info = uni.$u.deepClone(item);
      let selected = uni.$u.deepClone(this.selected);
      if (mode === "single") {
        //单选
        selected = [date];
      } else if (mode === "multiple") {
        //多选
        if (selected.some((item) => daySame(item, date))) {
          selected = selected.filter((item) => !daySame(item, date));
        } else {
          selected.push(date);
        }
      } else {
        //范围选择 range
        if (selected.length === 0 || selected.length >= 2) {
          selected = [date];
        } else if (selected.length === 1) {
          //选择了开始日期
          const existsDate = selected[0];
          //如果当前选择的日期小于上一次选择的日期，当前为开始日期
          if (dayjs(date).isBefore(existsDate)) {
            selected = [date];
          } else if (dayjs(date).isAfter(existsDate)) {
            // if(dayjs(dayjs(date).subscribe))
            //下月最后一天
            const lastDay = dayjs(date)
              .add(1, "month")
              .endOf("month")
              .format("YYYY-MM-DD");
            // 如果当前选择的日期大于下月最后一天，则提示不可选
            if (dayjs(date).isAfter(lastDay)) {
              uni.showToast({
                title: this.rangePrompt,
                icon: "none",
              });
              return;
            }
            selected.push(date);
            const startDate = selected[0];
            const endDate = selected[1];
            const arr = [];
            let i = 0;
            do {
              arr.push(dayjs(startDate).add(i, "day").format("YYYY-MM-DD"));
              i++;
            } while (dayjs(startDate).add(i, "day").isBefore(dayjs(endDate)));
            arr.push(endDate);
            selected = arr;
          } else {
            //选择区间，不允许选起止同一天。不允许选择自己
            if (selected[0] === date && !this.allowSameDay) return;
            selected.push(date);
          }
        }
      }

      // if (!info.selectedDate) {
      //   info.selectedDate = true;
      // } else {
      //   info.selectedDate = false;
      // }
      this.selectedInfo = { ...info };
      this.selected = selected;

      console.log("this.selected", this.selected, mode);
      this.$emit("clickDay", this.selected, info, index);
    },
  },
};
</script>

<style scoped lang='scss'>
@import "../index.scss";
.calendar_month {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .calendar_month__item {
    position: relative;
    width: calc(100% / 7);
    text-align: center;
    margin-top: 4rpx;
    font-size: 30rpx;
    color: #333;
  }
  .select_day_tip {
    position: absolute;
    font-size: 22rpx;
    color: #ffffff;
    padding: 8rpx 16rpx 4rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #595959;
    width: 230rpx;
    height: 45rpx;
    top: -55rpx;
    left: 50%;
    transform: translateX(-50%);
    &::after {
      content: "";
      width: 0;
      height: 0;
      border-top: 8rpx solid #595959;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
      position: absolute;
      top: 45rpx;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .select_day_tip_right {
    @extend .select_day_tip;
    left: -26%;
    &::after {
      left: 80%;
    }
  }
  .select_day_tip_left {
    @extend .select_day_tip;
    left: 126%;
    &::after {
      left: 20%;
    }
  }
  .item_day {
    padding: 20rpx 6rpx 4rpx 6rpx;
  }
  .prev_day {
    color: #c7c7c7;
  }
  .select {
    background: #f6b64e;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    color: #fff;
  }
  .status_text {
    margin-top: 8rpx;
    font-size: 18rpx;
    font-weight: bold;
  }
  //待配送&配送中
  .WAIT_DELIVERY,
  .DELIVERING {
    color: #71c5ff;
  }
  // 停送
  .DISCONTINUED {
    color: #f4b935;
  }
  //已完成
  .FINISHED {
    color: #c7c7c7;
  }
  .CANCELLED {
    color: #ffa217;
  }
}
</style>