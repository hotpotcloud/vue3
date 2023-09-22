<template>
  <!-- 用户地址 -->
  <view class="top-address-out" @tap="onClick">
    <view class="flex-1">
      <view class="d-flex-center">
        <view class="add-name h-over-1">{{ name }}</view>
        <view class="add-tel flex-1">{{ tel }}</view>
      </view>
      <view class="add-detail h-overflow-8-2">{{ address }}</view>
    </view>
    <view>
      <slot name="icon-right"></slot>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    name: {
      //用户名
      type: String | undefined,
      default: "",
    },
    tel: {
      //用户电话
      type: String | undefined,
      default: "",
    },
    address: {
      //用户地址
      type: String | undefined,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.top-address-out {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  font-size: 30rpx;
  color: #666666;
  .add-name {
    margin-right: 24rpx;
  }
  .add-detail {
    margin-top: 8rpx;
    font-weight: bold;
    color: #333333;
  }
}
</style>