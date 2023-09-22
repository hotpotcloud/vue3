<template>
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

    <!-- 日历主体 -->
    <view class="calendar_swiper">
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
    </view>
  </view>
</template>

<script>
import { parseTime, dateSame, deepClone, getFormatMonth } from "./js/utils.js";
import DateBox from "./dateBox.vue";
import dayjs from "../../../libs/util/dayjs.js";
// import { dateSame } from "./js/utils";
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
    //外部样式
    cssStyle: {
      type: Object,
      default: {},
    },
    sundayIndex: {
      // 星期天所在索引，0表示第一个、6表示最后一个
      type: Number,
      default: 0,
    },
    duration: {
      // 轮播图动画时长
      type: Number,
      default: 300,
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
    //是否是调整日历页面
    resize: {
      type: Boolean,
      default: false,
    },
    mode: {
      // 日历模式
      type: String,
      default: "open",
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
  components: { DateBox },
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {},
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
</style>