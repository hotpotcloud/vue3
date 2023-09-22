<template>
  <view class="card-pop">
    <u-popup :show="show" @close="close" @open="open" round="20">
      <view class="pop-modal-main">
        <view class="close-right" v-if="closeShow" @tap.stop="close">
          <img :src="getAssetImgUrl('pop-close.png')" class="close-icon" />
        </view>
        <slot></slot>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      //是否显示弹窗
      type: Boolean,
      default: false,
    },
    closeShow: {
      //关闭icon是否显示
      type: Boolean,
      default: true,
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
  methods: {
    open() {
      // console.log('open');
      this.$emit("open", this.show);
    },
    close() {
      // console.log('close');
      this.$emit("close", this.show);
    },
  },
  // 生命周期 - 监听页面隐藏
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.pop-modal-main {
  // padding: 48rpx 32rpx;
  position: relative;
  .close-right {
    padding: 16rpx;
    position: absolute;
    right: 16rpx;
    top: 32rpx;
    z-index: 10097;
  }
  .close-icon {
    width: 32rpx;
    height: 32rpx;
  }
}
</style>