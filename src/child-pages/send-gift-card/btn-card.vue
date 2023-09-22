<template>
  <view class="btn-card-out">
    <button class="btn-action" @tap="onClickSend" :open-type="shareType">
      {{ btnText }}
    </button>
  </view>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    btnText: {
      type: String,
      default: "立即送出"
    },
    typeText: {
      type: String,
      default: "scan"
    }
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性-缓存 类似于data概念
  computed: {
    shareType() {
      console.log("this.typeText ", this.typeText);
      return this.typeText === "local" ? "share" : "";
    }
  },
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
  methods: {
    onClickSend() {
      this.$emit("onClickSend");
    }
  },
  // 生命周期 - 监听页面隐藏
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {}
};
</script>
<style scope lang="scss">
.btn-action {
  background: #1d9bdc;
  border-radius: 254rpx 254rpx 254rpx 254rpx;
  height: 84rpx;
  font-size: 34rpx;
  color: #ffffff;
  font-weight: bold;
}
</style>
