<template>
  <view class="birthday-out" v-if="show">
    <!-- 生日弹窗 -->
    <!-- <uni-popup ref="popup" @change="change">
      <view class="bg-main"> 1 </view>
    </uni-popup> -->
    <u-popup
      :show="show"
      :round="20"
      mode="center"
      bgColor="transparent"
      :safeAreaInsetBottom="false"
    >
      <view class="bg-main">
        <view class="main-text">
          <view class="text-user">亲爱的{{ user.name }}</view>
          <view class="text-tips">
            <view>今天是你生日</view>
            <view>特意送上一份生日礼包</view>
          </view>
        </view>
        <!-- 立即领取 -->
        <view class="get-btn" @tap.stop="onClick"></view>
      </view>
      <view class="icon-close">
        <image
          class="img-close"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/close2X.png"
          mode="aspectFit"
          @tap.stop="onClose"
        />
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      default: false,
      type: Boolean,
    },
    user: {
      default: () => {},
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      name: "奶卡二爷",
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onClose() {
      this.$emit("onClose", this.show);
    },
    onClick() {
      this.$emit("onClick", this.show);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.bg-main {
  position: relative;
  text-align: center;
  display: block;
  width: 100vw;
  height: 880rpx;
  // background: #f0f;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/pop%20%281%29.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.main-text {
  width: calc(100% - 264rpx);
  position: absolute;
  bottom: 242rpx;
  left: 50%;
  transform: translateX(-50%);
  // background: #f0f;
  .text-user {
    color: #333333;
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
  }
  .text-tips {
    color: #666666;
    font-size: 32rpx;
  }
}
.get-btn {
  width: 80%;
  height: 88rpx;
  border-radius: 42rpx;
  // background: #f0f;
  position: absolute;
  bottom: 50rpx;
  left: 50%;
  transform: translateX(-50%);
}
.icon-close {
  margin-top: 48rpx;
  width: 100%;
  text-align: center;
  .img-close {
    width: 96rpx;
    height: 96rpx;
  }
}
</style>