<template>
  <view class="pop-out" v-if="show">
    <u-overlay :show="show" @click="onClose">
      <!-- <u-transition :show="show" mode="fade-up"> -->
      <view class="pop-main" :style="{ height: viewH }">
        <slot></slot>
      </view>
      <!-- </u-transition> -->
    </u-overlay>
  </view>
</template>

<script>
export default {
  props: {
    selfTop: {
      //自定义弹窗顶部内容
      type: Boolean,
      default: false,
    },
    selfBody: {
      //自定义弹窗主体内容
      type: Boolean,
      default: false,
    },
    selfFoot: {
      // 自定义弹窗底部内容
      typeof: Boolean,
      default: false,
    },
    viewH: {
      //弹窗高度
      default: "78%",
      type: String,
    },
    show: {
      //弹窗显示
      default: false,
      type: Boolean,
    },
    topName: {
      default: "面对面邀请",
      type: String,
    },
    topTip: {
      default: "可以让好友打开微信扫描您的二维码，注册为鲜推官。",
      type: String,
    },
  },
  methods: {
    onClose() {
      console.log("关闭弹窗");
      this.$emit("onClose", this.show);
    },
  },
};
</script>

<style scoped lang="scss">
.pop-out {
  height: 100vh;
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // background: rgba(0, 0, 0, 0.55);
  // z-index: 9999;
  .pop-main {
    // height: 78%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10079;
    border-radius: 8rpx 8rpx 0 0;
  }
  .main-top {
    .toptip,
    .topname {
      text-align: center;
    }
    .toptip {
      margin-top: 24rpx;
      color: #999999;
      font-size: 24rpx;
    }
    .topname {
      font-weight: bold;
      font-size: 34rpx;
      color: #000;
    }
    .close-pop {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
</style>
