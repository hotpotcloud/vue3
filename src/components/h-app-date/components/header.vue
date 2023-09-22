<template>
  <view class="header-month">
    <template v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <!-- 顶部年份-月份 -->
    <template v-else>
      <view class="current-month">
        <uni-icons
          type="left"
          size="16"
          color="#999999"
          @tap="onLeftMonth"
        ></uni-icons>
        <text class="month-text">{{ currentMonth }}</text>
        <uni-icons
          type="right"
          size="16"
          color="#999999"
          @tap="onRightMonth"
        ></uni-icons>
      </view>
    </template>
  </view>
</template>

<script>
export default {
  name: "hHeader",
  props: {
    //当前年月yyyy-mm
    currentMonth: {
      type: String,
      default: "2023年1月",
    },
  },
  methods: {
    //过去
    onLeftMonth() {
      this.$emit("onLeftMonth", -1);
    },
    //未来
    onRightMonth() {
      this.$emit("onRightMonth", 1);
    },
  },
};
</script>

<style scoped lang='scss'>
.header-month {
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #f1f1f1;
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
</style>