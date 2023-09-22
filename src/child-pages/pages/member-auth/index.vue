/* 扫码 朔源 加入会员 */
<template>
  <view class="scan-page-out">
    <view class="scan-btn">
      <img :src="getImgUrl(btn)" alt="" class="scan-btn-img" @tap="toMember" />
    </view>
  </view>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      btn: "member/bg-icon/scan-btn.png",
      uuid: "",
    };
  },
  computed: {},
  async onLoad(options) {
    if (options?.uuid) {
      this.uuid = options?.uuid;
    }
    await this.$onLaunched;
    console.log("uuid", options);
    await this.init(this.uuid);
  },
  onShow() {},
  onReady() {},
  methods: {
    ...mapActions("member", ["getMemberCode"]),
    async init(uuid) {
      try {
        //已登录用户
        const mallToken = uni.getStorageSync("malltoken");
        if (mallToken) {
          // 用户登录
          console.log("2--->已经登录", uuid);
          await this.getMemberCode();
          uni.reLaunch({
            url: "/pages/member/index?uuid=" + this.uuid,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    toMember() {
      console.log("this.uuid", this.uuid);
      const mallToken = uni.getStorageSync("malltoken");
      if (!mallToken) {
        return uni.navigateTo({
          url: "/pages/user/relogin",
        });
      }
      uni.reLaunch({
        url: "/pages/member/index?uuid=" + this.uuid,
        // success: () => {
        //   this.getMemberCode({ uuid: this.uuid });
        // },
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