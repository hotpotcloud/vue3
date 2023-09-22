<template>
  <view class="modal-out" v-if="show">
    <view class="modal-main">
      <slot name="main"></slot>
    </view>
  </view>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
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
.modal-out {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 10098;
}
.modal-main {
  // background: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>