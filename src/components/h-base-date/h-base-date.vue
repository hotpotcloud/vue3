<template>
  <!-- 日历组件-->
  <view class="xbf-out" v-if="show">
    <XbfCalendar
      ref="xbf"
      :sundayIndex="0"
      :defaultSelectedDate="checkTime"
      :showRight="false"
      :mode="mode"
      :clickMode="clickMode"
      :readonly="readonly"
      :info="info"
      :clearSelect="clearSelect"
      @change="change"
      @changePage="changePage"
      @goToDate="goToDate"
      @clickDay="clickDay"
    >
      <!-- 头部插槽 -->
      <view slot="top">
        <slot name="top" />
      </view>
    </XbfCalendar>
  </view>
</template>

<script>
import XbfCalendar from "./components/xbf-calendar/xbf-calendar";
import { parseTime } from "./utils/utils";
export default {
  name: "Calendar",
  components: {
    XbfCalendar,
  },
  props: {
    
    info: {
      type: Array,
      default: [],
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
    clickMode: {
      //日期类型选择，默认single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
      type: String,
      default: "single",
    },
    show: {
      type: Boolean,
      default: true,
    },
    mode: {
      //日历展开方式-默认月视图
      type: String,
      default: "open",
    },
    checkTime: {
      type: String,
      default: parseTime(new Date().getTime(), "{y}-{m}-{d}"),
    },
    clearSelect: {
      //点击选中效果
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      now: parseTime(new Date().getTime(), "{y}-{m}-{d}"),
      flag: false,
    };
  },
  computed: {},
  created() {
    this.now = parseTime(new Date().getTime(), "{y}-{m}-{d}");
  },
  watch: {},
  methods: {
    clickDay(e) {
      console.log("e-clickDay", e);
      this.$emit("clickDay", e);
    },
    click() {
      // 回到今天
      this.$refs.xbf.goToDate();
    },
    changePage(e) {
      this.$emit("changePage", e);
    },
    // 日历选中日期改变事件回调
    change(e) {
      console.log("e", e);
      this.$emit("change", e);
    },
    handleGoods(e) {
      this.$emit("handleGoods", e);
    },
  },
};
</script>

<style scoped lang="scss">
.xbf-out {
  background: #fff;
  padding: 32rpx;
  border-radius: 40rpx;
}
</style>
