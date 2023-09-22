<template>
  <!-- 商品规格 -->
  <view class="size-out">
    <view class="size" :class="{'d-flex': !isColumn, 'd-sb': !isColumn}">
      <view class="size-title">规格</view>
      <!-- 右侧内容 -->
      <view class="size-list flex-1" :class="{'is-column': isColumn}">
        <!-- 规格 -->
        <view class="size-list-item">
          <!--  -->
          <template v-for="(el, index) in sizeList">
            <view
              :key="index"
              :class="[
                'size-right-item align',
                activeSize === index && 'active',
              ]"
              @click="onChoose(index, el)"
              >{{ el.skuNickName }}</view
            >
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    sizeList: {
      type: Array,
      default: [
        {skuNickName: "200ml", skuCode: "K541640"},
        {skuNickName: "300ml", skuCode: "K541641"},
        {skuNickName: "400ml", skuCode: "K541642"},
        {skuNickName: "500ml", skuCode: "K541643"},
      ],
    },
    activeSize: {
      type: Number,
      default: null,
    },
    isColumn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChoose(index, item) {
      this.$emit("onChoose", index, item);
    },
  },
};
</script>

<style lang="scss" scoped>
.size-out {
  margin-top: 24rpx;
  padding: 0 32rpx;
  background: #fff;
  padding-bottom: 8rpx;

  .size-title {
    min-width: 114rpx;
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
    height: 68rpx;
    line-height: 64rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    border: 1rpx solid transparent;
    background: #f1f1f1;
    margin-left: 8rpx;
    margin-bottom: 16rpx;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    padding: 0 8rpx;
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
  .is-column {
    width: 100%;
    .size-right-item {
      width: 216rpx;
    }
  }
}
.size-list-item {
  display: flex;
  flex-wrap: wrap;
  // margin-left: 14rpx;
}
.size-right-item:nth-child(3n + 1) {
  margin-left: 0;
  margin-bottom: 0;
}
</style>
