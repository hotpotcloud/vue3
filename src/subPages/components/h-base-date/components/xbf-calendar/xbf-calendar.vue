<template>
  <!-- 日历滚动插件 -->
  <view class="xbf_calendar">
    <!-- 日历顶部插槽 -->
    <slot name="top"></slot>
    <!-- 顶部当前月份切换 -->
    <view class="current-month">
      <uni-icons
        type="left"
        size="14"
        color="#999999"
        @tap="onLeftMonth"
      ></uni-icons>
      <text class="month-text">{{ getFormatMonth(selectedDate) }}</text>
      <uni-icons
        type="right"
        size="14"
        color="#999999"
        @tap="onRightMonth"
      ></uni-icons>
    </view>
    <!-- 头部星期 -->
    <view class="calendar_week">
      <view
        v-for="(item, index) in week"
        :key="index"
        class="calendar_week__item"
        >{{ item }}</view
      >
    </view>

    <!-- 日历轮播 -->
    <view class="calendar_swiper">
      <!--open月视图-->
      <swiper
        v-if="swiperMode === 'open'"
        key="normalSwiper"
        circular
        :style="{ height: swiperHeight('open') }"
        :current="current"
        :duration="duration"
        :skip-hidden-item-layout="true"
        @change="changePage"
      >
        <swiper-item
          v-for="(swiper, swiperIndex) in 3"
          :key="swiperIndex"
          class="swiper-item"
        >
          <DateBox
            :dates="calendarSwiperDates[swiperIndex]"
            :cellHeight="cellHeight"
            :dateActiveColor="dateActiveColor"
            :swiperMode="swiperMode"
            :resize="resize"
            :clickMode="clickMode"
            :readonly="readonly"
            :info="info"
            @chooseDate="chooseDate"
            @monthSelect="monthSelect"
          />
        </swiper-item>
      </swiper>

      <!-- close周视图 -->
      <swiper
        v-else
        key="shrinkSwiper"
        circular
        class="fuckpro"
        :style="{ height: swiperHeight('close') }"
        :current="shrinkCurrent"
        :duration="duration"
        :skip-hidden-item-layout="true"
        @change="changePage"
      >
        <swiper-item
          v-for="(swiper, swiperIndex) in 3"
          :key="swiperIndex"
          class="swiper-item"
        >
          <DateBox
            :dates="calendarSwiperShrinkDates[swiperIndex]"
            :cellHeight="cellHeight"
            :dateActiveColor="dateActiveColor"
            :swiperMode="swiperMode"
            @chooseDate="chooseShrinkDate"
            :clickMode="clickMode"
            :readonly="readonly"
          />
        </swiper-item>
      </swiper>
    </view>

    <!-- 日历切换模式 -->
    <!-- <view v-if="showOff" class="calendar_toggle" @tap="changeMode">
      <view class="icon" :class="{ down: swiperMode === 'close' }"></view>
    </view> -->
  </view>
</template>

<script>
import { parseTime, deepClone, getFormatMonth } from "./js/utils.js";
import DateBox from "./dateBox.vue";
import dayjs from "../../../libs/util/dayjs.js";
import { dateSame } from "./js/utils";
export default {
  name: "XbfCalendar",
  components: {
    DateBox,
  },
  props: {
    info: {
      type: Array,
      default: [],
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
    // 是否为只读状态，只读状态下禁止选择日期
    readonly: {
      type: Boolean,
      default: false,
    },
    //日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
    clickMode: {
      type: String,
      default: "single",
    },
    //外部样式
    cssStyle: {
      type: Object,
      default: {},
    },

    duration: {
      // 轮播图动画时长
      type: Number,
      default: 300,
    },
    cellHeight: {
      // 一列的高度
      type: Number,
      default: 100,
    },
    sundayIndex: {
      // 星期天所在索引，0表示第一个、6表示最后一个
      type: Number,
      default: 0,
    },
    mode: {
      // 日历模式
      type: String,
      default: "open",
    },
    //是否是调整日历页面
    resize: {
      type: Boolean,
      default: false,
    },
    changeSetDefault: {
      // 月份切换时是否显示一号还是当前月份选中高亮
      type: Boolean,
      default: false,
    },
    defaultSelectedDate: {
      // 默认选中日期
      type: String | null,
      default: null,
    },
    isDefaultSelect: {
      //是否开启默认选中
      type: Boolean,
      default: false,
    },
    clearSelect: {
      //点击选中效果
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      today: parseTime(new Date(), "{y}-{m}-{d}"), // 今天日期
      selectedDate: null, // 选中日期
      week: [], // 日历周数
      current: 1, // 当前日历轮播默认显示索引
      shrinkCurrent: 1, // 缩放日历轮播默认显示索引
      calendarSwiperDates: [], // 日历轮播日期信息
      calendarSwiperShrinkDates: [], // 日历轮播收缩时的日期信息
      dateActive: -1, // 日期选中索引
      swiperByClick: false, // 是否通过点击上月份或下月份的日期进行轮播切换
      shrinkSwiperByClick: false, // 是否通过点击上月份或下月份的日期进行收缩日历的轮播切换
      swiperMode: this.mode, // 日历轮播显示模式 open：展开 close：收缩
      dateCache: {}, // 日期缓存
      emitTimer: null, // 日期改变向父级传递当前选中日期计时器
      dateClick: false, // 是否进行了日期的点击选择
      watchBtn: this.mode,
    };
  },
  computed: {
    // 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
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
    //周月切换
    check() {
      return (this.swiperMode = this.mode);
    },
    // /* 获取指定日期信息
    // 	isCurDate: 是否获取当天的信息还是选中日期的信息
    // 	index: 0 表示年份 1 表示月份 2 表示日期 */
    getAssignDateInfo() {
      return (isCurDate, index) => {
        return (
          (isCurDate ? this.today : this.selectedDate).split("-")[index] * 1
        );
      };
    },
    // // 是否显示回到今天按钮
    showBackToTodayBtn() {
      return (
        this.getAssignDateInfo(false, 0) !== this.getAssignDateInfo(true, 0) ||
        this.getAssignDateInfo(false, 1) !== this.getAssignDateInfo(true, 1)
      );
    },
    // 返回轮播图高度
    swiperHeight() {
      return (swiperMode) => {
        const shrinkHeight = this.cellHeight + 5 + "rpx";
        const normalHeight =
          ((this.calendarSwiperDates[this.current] || []).length / 7) *
            (this.cellHeight + 5) +
          "rpx";
        return swiperMode === "open" ? normalHeight : shrinkHeight;
      };
    },
  },
  watch: {
    // 展开日历轮播切换
    current(newV, oldV) {
      if (newV === 0 && oldV === 2) {
        // 右滑
        this.swiperChange(1);
        return;
      }
      if (newV === 2 && oldV === 0) {
        // 左滑
        this.swiperChange(-1);
        return;
      }
      if (newV > oldV) {
        // 右滑
        this.swiperChange(1);
      } else {
        // 左滑
        this.swiperChange(-1);
      }
    },
    // 收缩日历轮播切换
    shrinkCurrent(newV, oldV) {
      if (newV === 0 && oldV === 2) {
        // 右滑
        this.shrinkSwiperChange(1);
        return;
      }
      if (newV === 2 && oldV === 0) {
        // 左滑
        this.shrinkSwiperChange(-1);
        return;
      }
      if (newV > oldV) {
        // 右滑
        this.shrinkSwiperChange(1);
      } else {
        // 左滑
        this.shrinkSwiperChange(-1);
      }
    },
    // 日历显示方式切换
    swiperMode(newV) {
      // 当收缩时初始化收缩轮播图的日期数据
      if (newV === "close") {
        this.initCalendarShrinkSwiperDates();
      }
    },
    selectedDate: {
      deep: true,
      handler(newV, oldV) {
        if (newV && (oldV === null || this.dateClick)) {
          // 初始化/日历点击选择时直接返回
          this.emitDate();
          this.dateClick = false;
        } else {
          // 其它情况做防抖处理
          if (this.emitTimer !== null) {
            clearTimeout(this.emitTimer);
          }
          this.emitTimer = setTimeout(() => {
            this.emitDate();
          }, this.duration + 200);
        }
      },
    },
  },
  created() {
    this.init(); // 初始化数据
  },
  methods: {
    // 初始化数据
    init() {
      if (this.selectedDate === null && this.isDefaultSelect) {
        // 默认选中日期为当天
        this.selectedDate = this.defaultSelectedDate || this.today;
      } else {
        this.selectedDate = this.today;
      }
      this.initWeek(); // 初始化要显示的周数
      this.initCalendarSwiperDates(); // 初始化日历轮播日期信息
      // 解决swiperMode初始化为收缩时没有初始化日历收缩轮播日期信息
      if (this.swiperMode === "close") {
        this.initCalendarShrinkSwiperDates();
      }
    },
    // 翻页数据计算
    onLeftMonth() {
      this.clickCalcPage(-1);
    },
    onRightMonth() {
      this.clickCalcPage(1);
    },
    // 翻页计算
    clickCalcPage(type) {
      let num;
      if (this.swiperMode === "open") {
        num = this.current;
      } else if (this.swiperMode === "close") {
        num = this.shrinkCurrent;
      }
      switch (num) {
        case 0:
          num = type > 0 ? num + type : 2;
          break;
        case 1:
          num += type;
          break;
        case 2:
          num = type > 0 ? 0 : 1;
          break;
        default:
          return;
      }
      this.calcCurrentDate(num);
    },
    //当前数据计算
    calcCurrentDate(index) {
      if (this.swiperMode === "open") {
        this.current = index;
      } else if (this.swiperMode === "close") {
        this.shrinkCurrent = index;
      }
      const { year, month, date } =
        this.calendarSwiperDates[this.current][this.dateActive];
      return {
        selectedDate: this.selectedDate,
        year,
        month,
        date,
      };
    },
    //翻页e
    changePage(e) {
      this.calcCurrentDate(e.detail.current);
    },
    //月翻页
    changeMonth(e) {},
    /*-------------------------------↓初始化↓-------------------------------*/
    // 初始化周数
    initWeek() {
      const normalWeek = ["日", "一", "二", "三", "四", "五", "六"]; // 正常周数
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
    // 初始化展开时的日历轮播日期信息
    initCalendarSwiperDates(cb) {
      const year = this.getAssignDateInfo(false, 0); //选中
      const month = this.getAssignDateInfo(false, 1);
      const cur = this.generateCalendar(year, month);
      const prev = this.generateCalendar(
        month === 1 ? year - 1 : year,
        month === 1 ? 12 : month - 1
      );
      const next = this.generateCalendar(
        month === 12 ? year + 1 : year,
        month === 12 ? 1 : month + 1
      );
      // 根据current来判断相邻的轮播存放哪些日历数据
      if (this.current === 0) {
        this.calendarSwiperDates = [cur, next, prev];
      } else if (this.current === 1) {
        this.calendarSwiperDates = [prev, cur, next];
      } else if (this.current === 2) {
        this.calendarSwiperDates = [next, prev, cur];
      }
      this.swiperByClick = false;
      // 初始化日期信息完毕执行回调函数
      cb && cb();
    },
    // 生成展开的日历数据
    generateCalendar(year, month) {
      let calendarDate = [];
      // 先获取缓存里面有没有该月的日期数据
      if (this.dateCache[`${year}-${month}`]) {
        calendarDate = deepClone(this.dateCache[`${year}-${month}`]);
      } else {
        // 进行月份日期的计算
        const monthDates = new Date(year, month, 0).getDate(); // 获取此月份总天数
        const normalWeek = ["一", "二", "三", "四", "五", "六", "日"]; // 正常周数
        const monthFirstDay = normalWeek[new Date(year, month - 1, 0).getDay()]; // 获取本月一号为星期几
        const monthFirstDayIndex = this.week.indexOf(monthFirstDay); // 计算本月一号在日历周数中的索引，索引之前的填充上个月的后几天
        // 本月一号在日历中不是第一个位置，需要进行填充
        if (monthFirstDayIndex !== 0) {
          const prevMonthDates = new Date(year, month - 1, 0).getDate(); // 获取上一个月份的总天数
          // 填充本月一号之前的数据
          for (let i = 0; i < monthFirstDayIndex; i++) {
            const item = {
              year: month === 1 ? year - 1 : year,
              month: month === 1 ? 12 : month - 1,
              date: prevMonthDates - i,
              type: "prev",
              timer: null,
            };
            // 判断填充的日期是否包含今天日期
            this.theDateIsToday(item);
            this.isBeforeToday(item);
            this.assembleDateTimer(item);

            calendarDate.unshift(item);
          }
        }
        // 循环生成当月所有日期
        for (let i = 1; i <= monthDates; i++) {
          const item = {
            year,
            month,
            date: i,
            isSelected: false,
            isToday: false,
            timer: null,
            type: "cur",
          };
          // 今天的日期在不在里面
          this.theDateIsToday(item);
          this.isBeforeToday(item);
          this.assembleDateTimer(item);

          calendarDate.push(item);
        }
        const residue = calendarDate.length % 7;
        // 判断是否需要填充下个月的前几天
        if (residue !== 0) {
          for (let i = 1; i <= 7 - residue; i++) {
            const item = {
              year: month === 12 ? year + 1 : year,
              month: month === 12 ? 1 : month + 1,
              date: i,
              type: "next",
              timer: null,
            };
            // 下个月的前几天包含今天
            this.theDateIsToday(item);
            this.isBeforeToday(item);
            this.assembleDateTimer(item);
            calendarDate.push(item);
          }
        }
        this.dateCache[`${year}-${month}`] = deepClone(calendarDate);
      }
      // 进行日期的默认选中
      if (
        year === this.getAssignDateInfo(false, 0) &&
        month === this.getAssignDateInfo(false, 1)
      ) {
        for (let i = 0, len = calendarDate.length; i < len; i++) {
          if (
            calendarDate[i].type === "cur" &&
            calendarDate[i].date === this.getAssignDateInfo(false, 2)
          ) {
            // calendarDate[i].isSelected = true;
            // calendarDate[i].isSelected = this.clearSelect;
            this.dateActive = i;
            break;
          }
        }
      }
      // console.log("calendarDate--->初始化日期计算", calendarDate);
      return calendarDate;
    },
    /*-------------------------------↑初始化↑-------------------------------*/
    // 组装日期tiemr
    assembleDateTimer(item) {
      const date = item.year + "-" + item.month + "-" + item.date;
      const formatTime = dayjs(date).format("YYYY-MM-DD");
      item.timer = formatTime;
    },
    // 判断日期是否为今天
    theDateIsToday(item) {
      if (
        item.year + "-" + item.month + "-" + item.date ===
        this.getAssignDateInfo(true, 0) +
          "-" +
          this.getAssignDateInfo(true, 1) +
          "-" +
          this.getAssignDateInfo(true, 2)
      ) {
        item.isToday = true;
      }
    },
    //判断是否可选日期
    isBeforeToday(item) {
      const timer = item.year + "-" + item.month + "-" + item.date;
      const minDate = this.innerMinDate || dayjs().valueOf();
      // 如果没有指定最大日期，则往后推3个月
      const maxDate =
        this.innerMaxDate ||
        dayjs(minDate)
          .add(this.monthNum - 1, "month")
          .valueOf();
      item.disabled =
        dayjs(timer).isBefore(dayjs(minDate).format("YYYY-MM-DD")) ||
        dayjs(timer).isAfter(dayjs(maxDate).format("YYYY-MM-DD"));
    },
    // 初始化收缩时的日历轮播日期信息
    initCalendarShrinkSwiperDates(swiperChangeType) {
      let line = null;
      /**
       * 日历收缩事件/当前滑动不涉及到到上个/下个月的日期数据
       * 日历滑动到上一周并且本周不属于第一行并且上一周选中的日期必须是本月份里面的日期
       * 日历滑动到下一周且本周不属于最后一行
       */
      const curDateLine = Math.floor(this.dateActive / 7);
      if (
        !swiperChangeType ||
        (swiperChangeType === -1 &&
          curDateLine !== 0 &&
          this.calendarSwiperDates[this.current][(curDateLine - 1) * 7].type ===
            "cur") ||
        (swiperChangeType === 1 &&
          curDateLine + 1 !== this.calendarSwiperDates[this.current].length / 7)
      ) {
        // 计算当前周选中日期处于日历中的哪一行位置
        const curCalendarSwiperDates = this.calendarSwiperDates[this.current];
        line = Math.floor(
          curCalendarSwiperDates
            .map((item) => (item.type === "cur" ? item.date : -1))
            .indexOf(this.getAssignDateInfo(false, 2)) / 7
        );
        // 收缩日历滑动事件需要进行日期的选中处理
        if (swiperChangeType) {
          // 将当前选中日期清除选中状态
          this.calendarSwiperDates[this.current][
            this.dateActive
          ].isSelected = false;
          // 重新计算日期选中高亮并把下一个日期进行选中
          this.dateActive = line * 7;
          this.calendarSwiperDates[this.current][
            this.dateActive
          ].isSelected = true;
        }
      } else {
        // 收缩日历滑动事件
        // 将当前选中日期清除选中状态
        this.calendarSwiperDates[this.current][
          this.dateActive
        ].isSelected = false;
        // 涉及了上个月/下个月的日期数据，需要重新计算展开日历轮播的日期数据
        let currentNum = this.current + swiperChangeType;
        currentNum = currentNum > 2 ? 0 : currentNum < 0 ? 2 : currentNum;
        this.current = currentNum;
        // 计算上一周/下一周选中日期处于日历中的哪一行位置
        const curCalendarSwiperDates = this.calendarSwiperDates[this.current];
        line = Math.floor(
          curCalendarSwiperDates
            .map((item) => (item.type === "cur" ? item.date : -1))
            .indexOf(this.getAssignDateInfo(false, 2)) / 7
        );
        // 重新计算日期选中高亮并把下一个日期进行选中
        this.dateActive = line * 7;
        this.calendarSwiperDates[this.current][
          this.dateActive
        ].isSelected = true;
      }
      const cur = this.generateShrinkCalendar(0, line);
      const prev = this.generateShrinkCalendar(-1, line);
      const next = this.generateShrinkCalendar(1, line);
      // 根据shrinkCurrent来判断相邻的轮播存放哪些日历数据
      if (this.shrinkCurrent === 0) {
        this.calendarSwiperShrinkDates = [cur, next, prev];
      } else if (this.shrinkCurrent === 1) {
        this.calendarSwiperShrinkDates = [prev, cur, next];
      } else if (this.shrinkCurrent === 2) {
        this.calendarSwiperShrinkDates = [next, prev, cur];
      }
    },
    // 收缩日历开关
    changeMode() {
      this.swiperMode = this.swiperMode === "open" ? "close" : "open";
      this.$emit("changes", this.swiperMode);
    },
    // 生成收缩的日历数据
    generateShrinkCalendar(type, line) {
      // 返回当前这一周的日期数据
      if (type === 0) {
        return this.calendarSwiperDates[this.current].slice(
          line * 7,
          (line + 1) * 7
        );
      }
      // 返回上一周的日期数据
      if (type === -1) {
        // 当前选中的日期是否位于第一行
        if (line === 0) {
          /**
           * 当前日历的第一行是否包含有上个月的日期
           * 如果有包含，则返回上个月的倒数第二行日期
           * 如果没有包含，则返回上个月的倒数第一行日期
           */
          // 计算上个月的索引值
          const prevIndex = this.current === 0 ? 2 : this.current - 1;
          // 获取上个月的日期数据
          const prevCalendarSwiperDates = this.calendarSwiperDates[prevIndex];
          // 获取上个月的日历行数
          const prevCalendarSwiperDatesLine =
            prevCalendarSwiperDates.length / 7;
          if (this.calendarSwiperDates[this.current][0].type === "prev") {
            // 倒数第二行
            return prevCalendarSwiperDates.slice(
              (prevCalendarSwiperDatesLine - 2) * 7,
              (prevCalendarSwiperDatesLine - 1) * 7
            );
          } else {
            // 倒数第一行
            return prevCalendarSwiperDates.slice(
              (prevCalendarSwiperDatesLine - 1) * 7
            );
          }
        } else {
          return this.calendarSwiperDates[this.current].slice(
            (line - 1) * 7,
            line * 7
          );
        }
      }
      // 返回下一周的日期数据
      if (type === 1) {
        // 计算当前日历月份总共有多少行
        const curMonthMaxLine =
          this.calendarSwiperDates[this.current].length / 7;
        // 当前选中的日期是否位于最后一行
        if (line === curMonthMaxLine - 1) {
          /**
           * 当前日历的最后一行是否包含有下个月的日期
           * 如果有包含，则返回下个月的第二行日期
           * 如果没有包含，则返回上个月的第一行日期
           */
          // 计算下个月的索引值
          const nextIndex = this.current === 2 ? 0 : this.current + 1;
          // 获取下个月的日期数据
          const nextCalendarSwiperDates = this.calendarSwiperDates[nextIndex];
          // 获取下个月的日历行数
          const nextCalendarSwiperDatesLine =
            nextCalendarSwiperDates.length / 7;
          if (
            this.calendarSwiperDates[this.current][
              this.calendarSwiperDates[this.current].length - 1
            ].type === "next"
          ) {
            // 第二行
            return nextCalendarSwiperDates.slice(7, 14);
          } else {
            // 第一行
            return nextCalendarSwiperDates.slice(0, 7);
          }
        } else {
          return this.calendarSwiperDates[this.current].slice(
            (line + 1) * 7,
            (line + 2) * 7
          );
        }
      }
    },
    // 展开日历轮播切换
    swiperChange(type) {
      // 通过点击上个月/下个月日期进行切换，不需要默认选中下个月的一号，直接选中点击的那个日期
      if (!this.swiperByClick && this.swiperMode === "open") {
        this.getPrevOrNextDate(type);
      }
      setTimeout(
        () => {
          // 设置定时器是为了防止轮播切换时生成数据造成页面卡顿
          this.initCalendarSwiperDates(() => {
            this.swiperMode === "close" && this.initCalendarShrinkSwiperDates();
          }); // 初始化日历轮播日期信息
        },
        this.swiperMode === "open" ? this.duration : 0
      );
    },
    // 收缩日历轮播切换
    shrinkSwiperChange(type) {
      // 默认选中下个星期的开始日期
      this.getPrevOrNextStartDate(type);
      setTimeout(() => {
        // 设置定时器是为了防止轮播切换时生成数据造成页面卡顿
        this.initCalendarShrinkSwiperDates(type); // 初始化日历轮播日期信息
      }, this.duration);
    },
    // 获取上一个月/下一个月的一号日期
    getPrevOrNextDate(type) {
      const year = this.getAssignDateInfo(false, 0);
      let month = this.getAssignDateInfo(false, 1);
      month = month + type;
      // 判断切换月份时选中当前日期高亮还是一号，若选中当前日期高亮需进行大小判断
      const curActiveDate = this.getAssignDateInfo(false, 2);
      const maxDate = new Date(year, month, 0).getDate();
      const date = this.changeSetDefault
        ? 1
        : curActiveDate > maxDate
        ? maxDate
        : curActiveDate;
      this.selectedDate = parseTime(
        new Date(year, month - 1, date),
        "{y}-{m}-{d}"
      );
      // console.log("this.selectedDate-->组件内部", this.selectedDate);
      //月视图翻页
      this.$emit("changePage", this.selectedDate);
    },
    // 获取上个星期/下一星期的开始日期
    getPrevOrNextStartDate(type) {
      const date = this.calendarSwiperShrinkDates[this.shrinkCurrent][0];
      this.selectedDate = parseTime(
        new Date(date.year, date.month - 1, date.date),
        "{y}-{m}-{d}"
      );
      // 周视图暴露翻页日期
      this.$emit("changePage", this.selectedDate);
    },
    // 前往某一天 格式 YYYY-MM | YYYY-MM-DD-->回到今天
    goToDate(date = this.today) {
      // console.log("我是回到今天->>>>>>>>>>>");

      try {
        if (date.split("-").length < 2 || date.split("-").length > 3)
          throw "参数有误";
        if (date.split("-").length === 2) {
          date += "-01";
        }
      } catch (err) {
        throw Error("请检查参数是否符合规范");
      }
      this.selectedDate = date;
      this.initCalendarSwiperDates(() => {
        this.initCalendarShrinkSwiperDates();
      });
    },
    // 日历轮播展开的情况下选择日期
    chooseDate(dateInfo, dateIndex) {
      // 重复点击后续不做处理
      // if (dateInfo.isSelected) return false;
      if (this.readonly) return false; //只读情况
      if (dateInfo.type !== "cur") {
        // 是否点击了上个月份的后几天或者点击了下个月份的前几天
        if (dateInfo.type === "prev") {
          // 点击了上个月份的后几天，滑到上个月
          this.current = this.current === 0 ? 2 : this.current - 1;
        } else {
          // 点击了下个月份的前几天，滑到下个月
          this.current = this.current === 2 ? 0 : this.current + 1;
        }
        // 将选中日期赋值为当前点击的那个日期chooseShrinkDate
        this.selectedDate = parseTime(
          new Date(dateInfo.year, dateInfo.month - 1, dateInfo.date),
          "{y}-{m}-{d}"
        );
        this.swiperByClick = true;
        return false;
      }
      // 单选
      if (this.clickMode === "single") {
        // 将当前选中的日期清空并选中最新的日期
        this.calendarSwiperDates[this.current][
          this.dateActive
        ].isSelected = false;
        this.dateActive = dateIndex;
        const date = this.calendarSwiperDates[this.current][this.dateActive];
        date.isSelected = this.clearSelect && true;
        this.selectedDate = parseTime(
          new Date(date.year, date.month - 1, date.date),
          "{y}-{m}-{d}"
        );
        this.dateClick = true;
      }
      //连续选
      if (this.clickMode === "range") {
      }
      //多选模式
      if (this.clickMode === "multiple") {
      }
      this.$emit("clickDay", dateInfo);
    },
    //选择月份下日期
    monthSelect(e) {
      const date = this.calendarSwiperDates[this.current];
      //连续选
      if (this.clickMode === "range") {
      }
      //多选模式
      if (this.clickMode === "multiple") {
        // e.forEach((item) => dateSame(el.timer, item));
        e.forEach((item) => {
          date.some((el) => {
            if (dateSame(item, el.timer)) {
              el.isSelected = true;
            }
            return dateSame(item, el.timer);
          });
          // if (
          //   date.some((el) => {
          //     console.log("el", el);
          //     return dateSame(item, el.timer);
          //   })
          // ) {
          //   date.for;
          // }
          // if (date.some((el) =>{} dateSame(el.timer, item))) {
          //   // el.isSelected = true;
          // }
        });
      }
    },
    // 日历轮播收缩的情况下选择日期-周视图
    chooseShrinkDate(dateInfo, dateIndex) {
      // 重复点击后续不做处理
      if (dateInfo.isSelected) return false;
      this.dateClick = true;
      // 是否点击了上个月份的后几天或者点击了下个月份的前几天
      if (dateInfo.type !== "cur") {
        if (dateInfo.type === "prev") {
          // 点击了上个月份的后几天，切换到上个月
          this.current = this.current === 0 ? 2 : this.current - 1;
        } else {
          // 点击了下个月份的前几天，切换到下个月
          this.current = this.current === 2 ? 0 : this.current + 1;
        }
        this.dateActive = dateIndex;
        // 将选中日期赋值为当前点击的那个日期
        this.selectedDate = parseTime(
          new Date(dateInfo.year, dateInfo.month - 1, dateInfo.date),
          "{y}-{m}-{d}"
        );
        return false;
      }
      // 计算当前选中日期之前有多少个日期
      const dateActiveLine = Math.floor(this.dateActive / 7) * 7;
      // 将当前选中的日期清空并选中最新的日期
      this.calendarSwiperDates[this.current][
        this.dateActive
      ].isSelected = false;
      this.dateActive = dateIndex + dateActiveLine;
      const date = this.calendarSwiperDates[this.current][this.dateActive];
      date.isSelected = true;
      this.selectedDate = parseTime(
        new Date(date.year, date.month - 1, date.date),
        "{y}-{m}-{d}"
      );
    },
    // 向父组件传递当前选中数据
    emitDate() {
      const { year, month, date } =
        this.calendarSwiperDates[this.current][this.dateActive];
      const e = {
        selectedDate: this.selectedDate,
        year,
        month,
        date,
      };

      this.$emit("change", e);
    },
    getFormatMonth, //中文格式化
  },
};
</script>

<style lang="scss" scoped>
@import "./css/styles.scss";
.xbf_calendar {
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #fff;
}
.current-month {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.month-text {
  color: #333333;
  font-weight: bold;
  font-size: 34rpx;
}
/* 日历周数 */
.calendar_week {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24rpx 0rpx 16rpx;
  padding-top: 24rpx;
  border-top: 2rpx solid #f1f1f1;
}
.calendar_week .calendar_week__item {
  width: calc(100% / 7);
  text-align: center;
  color: #333333;
  font-size: 26rpx;
  font-weight: bold;
}
/* 日历周数 */

/* 日历切换模式 */
.calendar_toggle {
  position: relative;
  padding: 10rpx 0;
  margin: 10rpx 20rpx 0;
  display: flex;
  justify-content: center;
}
.calendar_toggle .icon {
  width: 30rpx;
  height: 30rpx;
  background-image: url("./static/arrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto;
  transition: all 0.3s;
}
.icon.down {
  transform: rotate(180deg);
}
.calendar_toggle::before,
.calendar_toggle::after {
  width: calc(50% - 30rpx);
  border-top: solid 2rpx #eaeaea;
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.calendar_toggle::before {
  left: 0;
}
.calendar_toggle::after {
  right: 0;
}
.check-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 4rpx;
}
/* 日历切换模式 */
</style>
