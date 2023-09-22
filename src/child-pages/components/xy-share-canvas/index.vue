<template>
  <view class="share-canvas">
    <u-popup
      :show="showCanvas"
      @close="onCloseCanvas"
      :safeAreaInsetBottom="false"
      :round="6"
    >
      <view class="hb-content">
        <view class="d-flex-center d-sb">
          <view class="hb-tip flex-1">生成海报</view>
          <img
            @tap.stop="onCloseCanvas"
            class="close-icon"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
            alt=""
          />
        </view>
        <view class="hb-text">
          将海报保存到手机相册，分享到朋友圈或者微信聊天
        </view>
        <!-- 海报内容 -->
        <view class="hb-main">
          <view class="hb-img">
            <!-- <canvas
              canvas-id="canvas"
              style="width: 242px; height: 405px"
            ></canvas> -->
            <slot name="canvasHb"></slot>
          </view>
          <view class="hb-save-btn" @click.stop="onSaveHB">保存海报至相册</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    showCanvas: {
      type: Boolean,
      default: false,
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
    onCloseCanvas() {
      this.$emit("onCloseCanvas");
    },
    onSaveHB() {
      this.$emit("onSaveHB");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
// canvas海报
.hb-content {
  padding: 48rpx 24rpx 68rpx;
  background: #ffffff;
  .hb-tip {
    text-align: center;
    font-weight: bold;
    font-size: 34rpx;
  }
  .close-icon {
    border: none;
    width: 32rpx;
    height: 32rpx;
  }
  .hb-text {
    color: #999999;
    margin-top: 24rpx;
    margin-bottom: 32rpx;
    font-size: 24rpx;
    text-align: center;
  }
}
.hb-main {
  .hb-img {
    position: relative;
    width: 464rpx;
    // height: 810rpx;
    margin: 0 auto;
    // background: #1d9bdc;
    // border: 1rpx solid #1d9bdc;
  }
  .hb {
    width: 100%;
    height: 100%;
  }
  // .hb-qrcode {
  //   position: absolute;
  //   bottom: 18rpx;
  //   right: 18rpx;
  //   width: 72rpx;
  //   height: 72rpx;
  // }
  .hb-save-btn {
    margin-top: 70rpx;
    border-radius: 60rpx;
    color: #ffffff;
    font-weight: bold;
    padding: 18rpx 0 22rpx;
    text-align: center;
    font-size: 32rpx;
    background: #1d9bdc;
  }
}
</style>