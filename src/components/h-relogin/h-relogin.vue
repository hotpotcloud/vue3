// 未登录组件
<template>
  <view class="relogin-out" v-if="show">
    <view class="relogin-main">
      <slot name="img" />
      <image
        class="relogin-img"
        v-if="!this.$slots.img"
        :src="getAssetImgUrl(imgUrl)"
        mode="aspectFit"
      />
      <view class="text-fc09">
        <slot name="text" />
        <view v-if="!this.$slots.text" class="relogin-text"
          >登录后才能看到内容哦～</view
        >
      </view>
      <button class="action-btn" @tap="onClick">去登录</button>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //   默认图片,
      imgUrl: "relogin.png",
    };
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
.relogin-out {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #f5f5f5;
  .relogin-main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .relogin-img {
      width: 360rpx;
      height: 360rpx;
    }
    .text-fc09 {
      margin: 48rpx 0;
      text-align: center;
      .relogin-text {
        color: #a9a9a9;
        font-size: 30rpx;
      }
    }
    .action-btn {
      background: #1d9bdc;
      color: #ffffff;
      font-size: 34rpx;
      font-weight: bold;
      height: 82rpx;
      border-radius: 254rpx;
    }
  }
}
</style>