<template>
  <view class="tabs-top d-flex-center d-sb">
    <view
      v-for="(el, index) in data"
      :class="[value === el.value && 'active', 'tab-cell']"
      :key="index"
      @tap="onChange(el)"
    >
      <view> {{ el.label }}</view>
      <view
        v-if="el.count"
        class="order-nums"
        :class="[el.count > 99 && 'order-nums-99']"
        >{{ el.count > 99 ? "99+" : el.count }}</view
      >
    </view>
  </view>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    data: {
      type: Array,
      default: [
        {
          value: 1,
          label: "标题",
          count: 7
        }
      ]
    }
  },
  methods: {
    onChange(el) {
      this.$emit("onChange", el);
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs-top {
  padding: 0 48rpx;
  height: 88rpx;
  font-size: 30rpx;
  color: #999;
  background: #fff;
  .tab-cell {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    color: #1d9bdc;
    font-weight: bold;
  }
  & .order-nums-99 {
    right: -34rpx;
  }
  .order-nums {
    min-width: 28rpx;
    height: 28rpx;
    padding: 2rpx 8rpx;
    border-radius: 14rpx;
    position: absolute;
    display: inline-block;
    top: 12rpx;
    right: -16rpx;
    font-size: 18rpx;
    font-weight: bold;
    color: #fff;
    background-color: #ec4747;
    text-align: center;
    line-height: 24rpx;
  }
}
</style>
