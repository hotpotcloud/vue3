export default {
  props: {
    // 日历顶部标题
    title: {
      type: String,
      default: "",
    },
    //是否显示标题
    showTitle: {
      type: Boolean,
      default: true,
    },
    //日期选择类型：single-单选，multiple-多选，range-范围选择
    mode: {
      type: String,
      default: "single",
    },
    //------mode=range时👇------
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
    //日期区间，默认无限制
    maxRange: {
      type: [Number, String],
      default: null,
    },
    //超出可选日期区间提示文字
    rangePrompt: {
      type: String,
      default: "超出可选范围",
    },
    // 范围选择超过最多可选天数时，是否展示提示文案
    showRangePrompt: {
      type: Boolean,
      default: true,
    },
    // 是否允许日期范围的起止时间为同一天
    allowSameDay: {
      type: Boolean,
      default: false,
    },
    // mode=range时，底层背景色
    rangeBgColor: {
      type: String,
      default: "#E4F4FF", //停送颜色：#FFCD5F；恢复颜色：#E4F4FF，
    },
    //------mode=range时👆------
    //------mode=multiple时👇------
    //日期底部提示文字
    multipleText: {
      type: String,
      default: "停送", //停送-恢复
    },
    //默认选中日期，mode为multiple或range是必须为数组格式
    defaultDate: {
      type: [Array, String, Date, null],
      default: null,
    },
    //最多可选日期数量，默认1个月
    maxCount: {
      type: [String, Number],
      default: 30,
    },
    //------mode=multiple时👆------
    // 最小的可选日期
    minDate: {
      type: [String, Number],
      default: 0,
    },
    // 最大可选日期
    maxDate: {
      type: [String, Number],
      default: 0,
    },
    //行高rpx
    cellHeight: {
      type: Number,
      default: 100,
    },
    //选中日期背景颜色
    activeColor: {
      type: String,
      default: "#FFCD5F", //停送颜色：#FFCD5F，恢复颜色：#1D9BDC，字体白色
    },
    // 星期天所在索引，0表示第一个、6表示最后一个
    sundayIndex: {
      type: Number,
      default: 0,
    },
    swiperMode: {
      type: String,
      default: "open",
    },
    duration: {
      // 轮播图动画时长
      type: Number,
      default: 300,
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
    //是否允许点击日期
    clickAble: {
      type: Boolean,
      default: true,
    },
  },
};
