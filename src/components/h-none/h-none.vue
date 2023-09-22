<template>
  <view class="result-container">
    <view class="container-img">
      <img :src="cover" class="cover-img" />
    </view>
    <view class="submit-success">{{ title }}</view>
    <view class="await-examine">{{ note }}</view>
    <view class="select-container">
      <view
        class="custom-style-left"
        @click="goBack"
        v-if="backBtn !== 'none'"
        >{{ backBtn }}</view
      >
      <view class="custom-style-right" @click="goForward">
        {{ forwardBtn }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    cover: {
      type: String,
      default:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/gif/%E6%97%A0%E6%95%B0%E6%8D%AE%E6%97%A0%E5%95%86%E5%93%812.gif",
    },
    title: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "商品不见了，看看其他商品吧～",
    },
    backBtn: {
      type: String,
      default: "返回首页",
    },
    backUrl: {
      type: String,
      default: "/pages/homepage/homepage",
    },
    forwardBtn: {
      type: String,
      default: "查看商品",
    },
    forwardUrl: {
      type: String,
      default: "",
    },
    home: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 返回订单详情
    goBack() {
      // uni.reLaunch({
      //   url: this.backUrl,
      // });
      if (this.home) {
        uni.switchTab({
          url: this.backUrl,
        });
      } else {
        uni.reLaunch({
          url: this.backUrl,
        });
      }
    },
    // goHome() {
    //   uni.switchTab({
    //     url: 'pages/homepage/homepage'
    //   })
    // },
    // 查看退款详情
    goForward() {
      // uni.reLaunch({
      //   url: this.forwardUrl,
      // });
      // console.log(this.forwardUrl)
      if (!this.order) {
        uni.reLaunch({
          url: this.forwardUrl
        })
      } else {
        uni.switchTab({
          url: this.forwardUrl
        })
        console.log(this.forwardUrl, '000000')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//container容器
.result-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  padding: 0 40rpx;

  .container-img {
    width: 310rpx;
    height: 299rpx;
    margin: 0 auto;
    margin-top: 126rpx;
    .cover-img {
      width: 100%;
      height: 100%;
    }
  }

  .submit-success {
    width: 100%;
    font-size: 18px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #1d9bdc;
    margin: 32rpx 0;
    text-align: center;
  }
  .await-examine {
    width: 100%;
    text-align: center;
    height: 33rpx;
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #a9a9a9;
    line-height: 28px;
    margin-bottom: 76rpx;
  }

  //   下方选择按钮
  .select-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;

    .custom-style-left,
    .custom-style-right {
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: bold;
      font-size: 16px;
      border-radius: 254rpx;
    }

    .custom-style-left {
      color: #1d9bdc;
      border: 2rpx solid #1d9bdc;
      padding: 26rpx 56rpx;
    }

    .custom-style-right {
      color: #fff;
      padding: 28rpx 58rpx;
      background-color: #1d9bdc;
    }
  }
}
</style>
