<template>
  <!-- 商品规格 -->
  <view class="size-out">
    <view class="size d-flex d-sb">
      <view class="size-title">数量</view>
      <!-- 右侧内容 -->
      <view class="size-list flex-1">
        <!-- 数量 -->
        <hCount
          @handleAdd="handleAdd"
          @handleMinus="handleMinus"
          :count="count"
          :maxDisabled="maxDisabled"
          :needShowMinDisabled="true"
        />
      </view>
    </view>
  </view>
</template>

<script>
import hCount from "@/shopPages/components/h-count/index.vue";
export default {
  components: {hCount},
  props: {
    count: {
      type: Number,
      default: "",
    },
    maxDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleAdd(e) {
      this.$emit("handleAdd", e);
    },
    handleMinus() {
      this.$emit("handleMinus");
    },
  },
};
</script>

<style lang="scss" scoped>
.size-out {
  // margin-top: 30rpx;
  padding: 0 32rpx;
  background: #fff;
  padding-bottom: 8rpx;

  .size-title {
    width: 114rpx;
    color: #333333;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
    font-weight: bold;
  }
  .size-list {
    width: 564rpx;
  }
  .size-right-item {
    color: #666;
    width: 180rpx;
    height: 58rpx;
    line-height: 58rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    border: 1rpx solid transparent;
    background: #f1f1f1;
    margin-left: 12rpx;
    margin-bottom: 16rpx;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    &.active {
      border-color: #1d9bdc;
      color: #1d9bdc;
      background: #e4f4ff;
      border: 1rpx solid #1d9bdc;
    }
    &.align {
      text-align: center;
    }
  }
}
</style>
