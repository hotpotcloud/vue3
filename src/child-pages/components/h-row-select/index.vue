<template>
  <view class="sale-out" v-if="show">
    <!-- 优惠信息集合插槽 -->
    <slot name="tikect"></slot>
    <scroll-view
      scroll-x="true"
      class="scroll-sale"
      :scroll-into-view="'id' + activeIndex"
    >
      <view
        class="sale-item"
        v-for="i in data"
        :key="i.id"
        @tap="onSelect(i)"
        :id="'id' + i.id"
      >
        <view
          class="item-header"
          :class="[activeIndex === i.id && 'active-item']"
        >
          <text v-if="i.maxmum !== 0"> {{ i.minimum }}~{{ i.maxmum }}元</text>
          <text v-else>全部</text>
        </view>
        <text class="item-percent">
          <text :class="[(i.all || !i.ratio) && 'all-tag']">
            {{ i.ratio }}%用户选择
          </text>
        </text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    saleList: {
      type: Array,
      default: [],
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      // activeIndex: 0,
    };
  },
  methods: {
    onSelect(i) {
      this.$emit("onSelect", i);
    },
  },
};
</script>

<style scoped lang="scss">
.scroll-sale {
  white-space: nowrap;
  width: 100%;
}
.sbsbsbs {
  overflow-x: auto;
}
.sale-item {
  display: inline-block;
  margin-right: 10rpx;
  text-align: center;

  color: #a9a9a9;
  font-size: 20rpx;
}
.item-header {
  min-width: 164rpx;
  height: 56rpx;
  color: #666666;
  font-size: 26rpx;
  background: #fff;
  border: 2rpx solid #f1f1f1;
  border-radius: 12rpx;
  line-height: 56rpx;
  margin-bottom: 4rpx;
  padding: 0 8rpx;
  font-weight: bold;
  box-sizing: border-box;
  // border: 2rpx solid transparent;
}
.active-item {
  color: #1d9bdc;
  // font-size: 26rpx;
  // font-weight: bold;
  background: #e4f4ff;
  border-color: #1d9bdc;
}
.all-tag {
  color: transparent;
}
</style>

