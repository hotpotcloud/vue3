<template>
  <view class="show"> </view>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      baseUrl: "",
    };
  },

  async onLoad(options) {
    await this.$onLaunched;
    console.log("options->页面参数", options);
    // const opCodeUrl = unescape(options.url); //h5分享跳转地址
    const qrCodeUrl = decodeURIComponent(options.q); // 获取二维码url
    console.log("qrCodeUrl->", qrCodeUrl);
    this.baseUrl = qrCodeUrl;
  },
  async onShow() {
    await this.$onLaunched;
    this.onLogin();
  },
  computed: {},
  methods: {
    // 登录判断
    onLogin() {
      const token = uni.getStorageSync("malltoken");
      const phone = uni.getStorageSync("userMsg");
      //有机号
      if (token && phone?.phone) {
        const urlQR = this.baseUrl + "?phone=" + phone?.phone;
        let url = escape(urlQR);
        console.log("url--->h5", url);
        uni.redirectTo({
          url: "/child-pages/pages/auth-page/web-view?url=" + urlQR,
        });
      } else {
        uni.navigateTo({
          url: "/pages/user/relogin",
        });
      }
    },
  },
});
</script>

<style scoped lang="scss">
.relogin {
  background: #fff;
  min-height: 100vh;
  padding-top: 180rpx;
  .content-icon {
    text-align: center;
    width: 680;
    height: 600rpx;
    margin: 0 auto;

    margin-bottom: 200rpx;
    .icon {
      border: none;
      width: 100%;
      height: 100%;
    }
  }

  .login-btn {
    margin: 0 auto;
    text-align: center;
    height: 104rpx;
    line-height: 104rpx;
    width: 566rpx;
    border-radius: 254rpx;
    outline: none;
    background-color: $uni-color-primary;
    color: #fff;
  }

  .text-tips {
    // display: inline-block;
    width: 100%;
    // justify-content: center;
    // text-align: center;
    padding: 0 40rpx;
    margin-top: 32rpx;
    font-size: 26rpx;
    color: $uni-text-color-grey;
    .tip-text {
      flex: 1;
      .nav-text-user {
        color: #1d9bdc;
      }
    }
    .checkbox-css {
      // flex: 1;
      width: 32rpx;
      height: 32rpx;
      border-radius: 50%;
      border: 1rpx solid #f3f3f3;
      margin-right: 12rpx;
      background: #ccc;
    }
    .checkbox-active {
      border: 4rpx solid #f3f3f3;
      background-color: #1d9bdc;
    }
  }
}
</style>
