/* 扫码 朔源 加入会员 */
<template>
  <view class="scan-page-out">
    <view class="scan-btn">
      <img :src="getImgUrl(btn)" alt="" class="scan-btn-img" @tap="toMember" />
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      btn: "member/bg-icon/scan-btn.png",
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    toMember() {
      // uni.navigateTo({
      //   url: "/member-pages/home/index",
      // });
      uni.switchTab({
        url: "/pages/member/index",
      });
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.scan-page-out {
  // background: #333;
  min-height: 1568rpx;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/member/bg-icon/scan-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .scan-btn {
    position: fixed;
    bottom: 106rpx;
    width: 546rpx;
    transform: translateX(102rpx);
    .scan-btn-img {
      height: 138rpx;
      margin: 0 auto;
      border: none;
    }
  }
}
</style>