<template>
  <!-- 鲜活日历 -->
  <view class="app-date">
    <hHeader
      @onLeftMonth="onLeftMonth"
      @onRightMonth="onRightMonth"
      :currentMonth="currentMonth"
    >
      <view slot="header" v-if="$slots.header">
        <slot name="header"></slot>
      </view>
    </hHeader>
    <!-- 日历轮播 -->
    <view class="calendar_swiper">
      <swiper
        circular
        key="normalSwiper"
        :style="{ height: swiperHeight('open') }"
        :current="current"
        :duration="duration"
        :skip-hidden-item-layout="true"
        @change="changePage"
      >
        <swiper-item v-for="(item, index) in calendarSwiperDates" :key="index">
          <hMonth
            @clickDay="clickDay"
            :month="item"
            :cellHeight="cellHeight"
            :activeColor="activeColor"
            :multipleText="multipleText"
            :rangePrompt="rangePrompt"
            :startText="startText"
            :endText="endText"
            :selected="defaultDate"
            :mode="mode"
            :res="res"
            :week="week"
          />
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import hMonth from "./components/month.vue";
import hHeader from "./components/header.vue";
import props from "./props";
import { daySame, getFormatMonth } from "./utils/utils";
import dayjs from "../libs/util/dayjs.js";
import Calendar from "../libs/util/calendar.js";
export default {
  mixins: [props],
  components: {
    hHeader,
    hMonth,
  },
  data() {
    return {
      week: ["日", "一", "二", "三", "四", "五", "六"],
      current: 1, //轮播默认索引
      calendarSwiperDates: [], // 日历轮播日期信息
      dateCache: {}, //选中日期缓存
      selectedDate: null, //选中日期
      swCurDate: dayjs().format("YYYY-MM"), //日历展示月份日期
      selectCache: [], //选中日期缓存
      selectedInfo: {},
    };
  },
  computed: {
    // 处理日期标题
    currentMonth() {
      return getFormatMonth(this.calendarSwiperDates[this.current][18].date);
    },
    //处理可选时间
    innerMaxDate() {
      return uni.$u.test.number(this.maxDate)
        ? Number(this.maxDate)
        : this.maxDate;
    },
    innerMinDate() {
      return uni.$u.test.number(this.minDate)
        ? Number(this.minDate)
        : this.minDate;
    },
    // 多个条件的变化，会引起选中日期的变化
    selectedChange() {
      return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
    },
    // 轮播图高度处理
    swiperHeight() {
      return (swiperMode) => {
        const shrinkHeight = this.cellHeight + 5 + "rpx";
        const normalHeight =
          ((this.calendarSwiperDates[this.current] || []).length / 7) *
            (this.cellHeight + 5) +
          76 +
          "rpx";
        return swiperMode === "open" ? normalHeight : shrinkHeight;
      };
    },
  },
  watch: {
    mode(newV, oldV) {
      if (newV !== oldV) {
        this.selectCache = [];
      }
    },
    current(newV, oldV) {
      if (newV === 0 && oldV === 2) {
        //右滑
        this.swiperChange(1);
        return;
      }
      if (newV === 2 && oldV === 0) {
        this.swiperChange(-1);
      }
      if (newV > oldV) {
        this.swiperChange(1);
      } else {
        this.swiperChange(-1);
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 判断选中日期
    // judgeSelectedDate() {
    //   const { type, deliveryStatus, date } = item;
    //   if (type === "cur") {
    //     // 有状态
    //     if (
    //       deliveryStatus === TWORuleEnum.WAIT_DELIVERY ||
    //       deliveryStatus === TWORuleEnum.DISCONTINUED
    //     ) {
    //       // 今天之前不能点击
    //       if (dayjs(date).isBefore(dayjs(), "day")) {
    //         return uni.$u.toast("过去日期不可选");
    //       }
    //       const arr = [date];
    //       const brr = [item];
    //       this.cacheSelectDate = this.cacheSelectDate.concat(arr);
    //       this.cacheGoodsInfo = this.cacheGoodsInfo.concat(brr);
    //       return uni.$u.toast("该日期可选");
    //     } else {
    //       return uni.$u.toast("该日期不可选2");
    //     }
    //   }
    // },
    // 日期点击
    clickDay(item, index) {
      if (item.type === "prev") {
        this.current = this.current > 0 ? this.current - 1 : 2;
      } else if (item.type === "next") {
        this.current = this.current === 2 ? 0 : this.current + 1;
      }

      this.$emit("onClickDay", item);

      // if (item.type === "prev") {
      //   this.current = this.current > 0 ? this.current - 1 : 2;
      // } else if (item.type === "next") {
      //   this.current = this.current === 2 ? 0 : this.current + 1;
      // }
      // console.log("this.clickAble", this.clickAble);
      // const info = uni.$u.deepClone(item);
      // info.selectedDate = true;
      // //点击日期
      // const date = dayjs(item.date).format("YYYY-MM-DD");
      // // let selected = uni.$u.deepClone(this.selectCache);
      // let selected = uni.$u.deepClone(this.defaultDate);
      // if (
      //   !this.clickAble &&
      //   (!item.deliveryStatus ||
      //     item.deliveryStatus === "FINISHED" ||
      //     item.deliveryStatus === "DELIVERING")
      // ) {
      //   return this.$emit("onClickDay", info);
      // }
      // const { mode } = this;

      // if (mode === "single") {
      //   //单选
      //   selected = [date];
      // } else if (mode === "multiple") {
      //   //多选
      //   if (selected.some((item) => daySame(item, date))) {
      //     selected = selected.filter((item) => !daySame(item, date));
      //   } else {
      //     selected.push(date);
      //   }
      // } else {
      //   //范围选择 range
      //   if (selected.length === 0 || selected.length >= 2) {
      //     selected = [date];
      //   } else if (selected.length === 1) {
      //     //选择了开始日期
      //     const existsDate = selected[0];
      //     //如果当前选择的日期小于上一次选择的日期，当前为开始日期
      //     if (dayjs(date).isBefore(existsDate)) {
      //       selected = [date];
      //     } else if (dayjs(date).isAfter(existsDate)) {
      //       // if(dayjs(dayjs(date).subscribe))
      //       //下月最后一天
      //       const lastDay = dayjs(date)
      //         .add(1, "month")
      //         .endOf("month")
      //         .format("YYYY-MM-DD");
      //       // 如果当前选择的日期大于下月最后一天，则提示不可选
      //       if (dayjs(date).isAfter(lastDay)) {
      //         uni.showToast({
      //           title: this.rangePrompt,
      //           icon: "none",
      //         });
      //         return;
      //       }
      //       selected.push(date);
      //       const startDate = selected[0];
      //       const endDate = selected[1];
      //       const arr = [];
      //       let i = 0;
      //       do {
      //         arr.push(dayjs(startDate).add(i, "day").format("YYYY-MM-DD"));
      //         i++;
      //       } while (dayjs(startDate).add(i, "day").isBefore(dayjs(endDate)));
      //       arr.push(endDate);
      //       selected = arr;
      //     } else {
      //       //选择区间，不允许选起止同一天。不允许选择自己
      //       if (selected[0] === date && !this.allowSameDay) return;
      //       selected.push(date);
      //     }
      //   }
      // }
      // this.selectedInfo = { ...info };
      // this.selectCache = selected;
      // this.$emit("onClickDay", this.selectedInfo, this.selectCache);
    },
    //----初始化👇----
    //1.日历周数
    initWeek() {
      console.log("dayjs(0)", dayjs(this.swCurDate).year());
      //  正常情况
      const normalWeek = ["日", "一", "二", "三", "四", "五", "六"];
      const sIndex =
        this.sundayIndex < 0
          ? 0
          : this.sundayIndex >= normalWeek.length
          ? normalWeek.length - 1
          : this.sundayIndex;
      normalWeek.unshift(...normalWeek.slice(-sIndex));
      normalWeek.length = 7;
      this.week = normalWeek;
    },
    //2.日历数据
    initMonth(callback) {
      const date = dayjs(this.swCurDate);
      // 获取当前年月
      const currentYear = date.year();
      const currentMonth = date.month() + 1;
      //获取上一月年月
      const lastMonthYear = date.subtract(1, "month").year();
      const lastMonthMonth = date.subtract(1, "month").month() + 1;
      //获取下一月年月
      const nextMonthYear = date.add(1, "month").year();
      const nextMonthMonth = date.add(1, "month").month() + 1;
      const prev = this.getMonthData(lastMonthYear, lastMonthMonth);
      const cur = this.getMonthData(currentYear, currentMonth);
      const next = this.getMonthData(nextMonthYear, nextMonthMonth);
      if (this.current === 0) {
        this.calendarSwiperDates = [cur, next, prev];
      } else if (this.current === 1) {
        this.calendarSwiperDates = [prev, cur, next];
      } else if (this.current === 2) {
        this.calendarSwiperDates = [next, prev, cur];
      }

      console.log(this.calendarSwiperDates);
      callback && callback();
    },
    //月份数据生成
    getMonthData(year, month) {
      let calendarDate = [];
      const time = `${year}-${month}`;
      //最小可选日期
      const minDate = this.innerMinDate || dayjs().valueOf();
      //最大可选日期
      // const maxDate = this.innerMaxDate || dayjs().add(1, "month").valueOf();
      const monthData = Calendar.solarDays(year, month); //生成天数
      // 获取当前月份1号星期,0表示星期天
      let firstWeek = dayjs(`${year}-${month}-1`).format("d");
      if (this.sundayIndex === 6) {
        //周天在最后
        firstWeek = firstWeek === 0 ? 7 : firstWeek - 1;
      }
      // 获取上个月天数
      const lastMonthDays = dayjs(time).subtract(1, "month").daysInMonth();
      calendarDate = new Array(dayjs(time).daysInMonth())
        .fill(1)
        .map((_, index) => {
          let day = index + 1; //天数
          const week = dayjs(time).add(0, "month").date(day).day();
          const date = dayjs(time)
            .add(0, "month")
            .date(day)
            .format("YYYY-MM-DD");
          //是否今天
          const isToday = dayjs().isSame(date, "day");
          // 是否当前月
          const type = "cur";
          let config = {
            day,
            week,
            yymm: time,
            date,
            isToday,
            disabled: dayjs(date).isBefore(dayjs(minDate).format("YYYY-MM-DD")), //过去日期不可选
            type,
            selectedDate: false,
          };
          return config;
        });
      // 插入上月日期
      for (let i = 0; i < firstWeek; i++) {
        const date = dayjs(time)
          .subtract(1, "month")
          .date(lastMonthDays - i)
          .format("YYYY-MM-DD");
        calendarDate.unshift({
          day: lastMonthDays - i,
          week: dayjs(time)
            .subtract(1, "month")
            .date(lastMonthDays - i)
            .day(),
          date,
          isToday: false,
          disabled: dayjs(date).isBefore(dayjs(minDate).format("YYYY-MM-DD")),
          type: "prev",
          selectedDate: false,
          // dayjs(date).isSame(this.dateCache?.start?.date, "day") ||
          // dayjs(date).isSame(this.dateCache?.end?.date, "day"),
        });
      }
      // 插入下个月
      const len = calendarDate.length;
      for (let e = 1; e <= 42 - len; e++) {
        const date = dayjs(time).add(1, "month").date(e).format("YYYY-MM-DD");
        calendarDate.push({
          day: e,
          week: dayjs(time).add(1, "month").date(e).day(),
          date,
          isToday: false,
          disabled: dayjs(date).isBefore(dayjs(minDate).format("YYYY-MM-DD")),
          type: "next",
          selectedDate: false,
          // dayjs(date).isSame(this.dateCache?.start?.date, "day") ||
          // dayjs(date).isSame(this.dateCache?.end?.date, "day"),
        });
      }
      return calendarDate;
    },
    //3.init日历
    init() {
      if (
        this.innerMaxDate &&
        new Date(this.innerMaxDate).getTime() <= Date.now()
      ) {
        return uni.$u.error("最大日期不能小于当前日期");
      }
      this.initWeek();
      this.initMonth();
    },
    //----初始化👆----

    swiperChange(n) {
      // this.getPrevOrNextDate(n);
      setTimeout(() => {
        this.initMonth();
      }, this.duration);
    },
    // 获取上下月份日期
    // getPrevOrNextDate(n) {
    //   // const date = dayjs(this.swCurDate).add(n, "month").format("YYYY-MM");
    //   console.log(
    //     "date1111",
    //     n,
    //     this.swCurDate,
    //     "--->",
    //     dayjs(this.swCurDate).add(1, "month").format("YYYY-MM"),
    //     "1----2",
    //     dayjs(this.swCurDate).subtract(1, "month").format("YYYY-MM")
    //   );
    //   // this.swCurDate = date;
    // },
    // 轮播翻页
    changePage(e) {
      const inx = e.detail.current;
      this.changeSwipperItem(inx);
      // 当前月1号
      const arr = this.calendarSwiperDates[inx];
      const currentMonthOne = arr.find(
        (item) => item.day === 1 && item.type === "cur"
      );
      console.log("currentMonthOne", currentMonthOne);
      this.$emit("onChangePage", currentMonthOne);
    },
    // 轮播翻页方法
    changeSwipperItem(num) {
      this.current = num;
      const showMonth = dayjs(this.calendarSwiperDates[this.current][21].yymm);
      this.swCurDate = showMonth;
    },
    //点击过去icon
    onLeftMonth(num) {
      console.log("this.current", this.current);
      const e = this.current > 0 ? this.current + num : 2;
      this.changeSwipperItem(e);
    },
    //点击未来icon
    onRightMonth(num) {
      const e = this.current <= 1 ? this.current + num : 0;
      this.changeSwipperItem(e);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
.app-date {
  background: #fff;
  border-radius: 40rpx;
  padding: 24rpx;
}
</style>