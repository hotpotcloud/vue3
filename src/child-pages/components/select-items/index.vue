<template>
  <view class="select-items">
    <view class="text">{{ title }}</view>
    <view class="items">
      <view
        :class="['item', 'h-over-1', value === el.value ? 'active' : 'default']"
        v-for="(el, index) in data"
        :key="index"
        @tap="handleClick(el)"
      >
        {{ el.text }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    value: {
      type: Number,
      default: null,
    },
    data: {
      type: Array,
      default: [
        {
          value: 1,
          text: "示列",
        },
      ],
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("onChange", item);
    },
  },
};
</script>
<style scoped lang="scss">
.select-items {
  display: flex;
  align-items: center;
}
.items {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  width: 528rpx;
  margin-left: 72rpx;
}
.item {
  min-width: 188rpx;
  height: 64rpx;
  border-radius: 18rpx 18rpx 18rpx 18rpx;
  text-align: center;
  font-size: 24rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 64rpx;
  padding: 0 12rpx;
}

.text {
  font-size: 24rpx;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: #333;
  line-height: 28rpx;
}
.default {
  color: #666;
  background: #f1f1f1;
  border: 1rpx solid #f1f1f1;
}
.active {
  color: #1d9bdc;
  background: #e4f4ff;
  border: 1rpx solid #1d9bdc;
}
</style>
