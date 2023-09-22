<template>
  <view :class="[layout === 'row' && 'd-flex-row', 'detail-slot']">
    <view
      class="detail-slot-title"
      :class="[layout === 'cloum' && 'detail-slot-title-cloum']"
      >{{ title }}</view
    >
    <view class="detail-slot-content flex-1">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "规格",
    },
    layout: {
      type: String,
      default: "row", //row or cloum
    },
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性-缓存 类似于data概念
  computed: {},
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  onLoad(options) {
    console.log(options);
  },
  // 生命周期 - 页面展示（不可以访问DOM元素）
  onShow() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  onReady() {},
  // 方法集合
  methods: {},
  // 生命周期 - 监听页面隐藏
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.detail-slot {
  padding: 24rpx 0;
  border-top: 2rpx solid #f4f4f4;
  .detail-slot-title {
    width: 96rpx;
    margin-right: 32rpx;
    font-size: 24rpx;
    color: #333333;
    font-weight: bold;
  }
  .detail-slot-title-cloum {
    width: 100%;
    margin: 0;
    margin-bottom: 16rpx;
  }
}
</style>