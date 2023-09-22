/* 切换tab */
<template>
  <view class="row-tab-out d-flex-center">
    <view
      @tap="onChange(tab)"
      v-for="(tab, index) in list"
      :key="index"
      :class="['tab-item']"
      :style="[sliderStyle(index)]"
    >
      <text :style="[textStyle(index)]"> {{ tab.label }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      //tab列表
      type: Array,
      default() {
        return [
          {
            label: "在喝",
            val: 0,
          },
          {
            label: "可恢复",
            val: 1,
          },
        ];
      },
    },
    customStyle: {
      //滑块选中自定义样式
      type: Object,
      default() {
        return {};
      },
    },
    current: {
      //当前选中的tab
      type: Number | String,
      default: 0,
    },
    activeColor: {
      //选中的背景颜色
      type: String,
      default: "#f00",
    },
    inactiveColor: {
      //未选中的背景颜色
      type: String,
      default: "#fff",
    },
    colorFont: {
      //默认字体颜色
      type: String,
      default: "#666666",
    },
    activeFontColor: {
      //激活字体颜色
      type: String,
      default: "#ffffff",
    },
    bold: {
      //激活字体是否加粗
      type: Boolean,
      default: true,
    },
    fontSize: {
      //字体大小 单位px
      type: Number | String,
      default: 15,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    // 滑块样式
    sliderStyle() {
      return (index) => {
        const style = {};
        style.backgroundColor =
          this.current === index ? this.activeColor : this.inactiveColor;
        style.height = "100%";
        style.width = 100 / this.list.length + "%";
        style.borderRadius = uni.$u.addUnit(18);
        style.transition = "all 0.5s";
        const normal = uni.$u.deepClone(style);
        return this.current === index
          ? Object.assign(style, this.customStyle)
          : normal;
      };
    },
    // 滑块文字样式
    textStyle() {
      return (index) => {
        const style = {};
        style.fontWeight =
          this.bold && this.current === index ? "bold" : "normal";
        style.fontSize = uni.$u.addUnit(this.fontSize);
        style.color =
          this.current === index ? this.activeFontColor : this.colorFont;
        return style;
      };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onChange(e) {
      this.$emit("onChange", e);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.row-tab-out {
  width: 100%;
  border-radius: 80rpx 80rpx 80rpx 80rpx;
  height: 76rpx;
  background: #fff;
  justify-content: space-evenly;
  padding: 6rpx;
}
.tab-item {
  color: #666;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>