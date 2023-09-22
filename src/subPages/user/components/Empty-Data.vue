<template>
  <view class="no-data d-flex-colum-center d-center">
    <view
      class="main d-flex-colum-center"
      :class="[type === 'success' && 'main-success']"
    >
      <image
        :src="img"
        mode="widthFix"
        :class="['no-data-img', type === 'success' && 'no-data-img-success']"
      />
      <view class="status-text" v-if="statusText">{{ statusText }}</view>
      <view class="tip-text">{{ text }}</view>
      <view
        class="btn-text d-flex-colum-center d-center"
        @tap="onBack"
        v-if="btnText"
        >{{ btnText }}</view
      >
    </view>
  </view>
</template>

<script>
export default {
  name: "EmptyData",
  props: {
    //图片类型
    type: {
      type: String,
      default: "empty",
    },
    //状态文字
    statusText: {
      type: String,
      default: "",
    },
    //提示文字
    text: {
      type: String,
      default: "暂无商品",
    },
    //按钮文字
    btnText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      list: {
        empty:
          "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png",
        success:
          "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/20220729-111926.gif",
        // success:
        // "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/pay-success.png",
      },
    };
  },
  computed: {
    img() {
      return this.list[this.type];
    },
  },
  methods: {
    //返回
    onBack() {
      console.log("返回", 1);
      this.$emit("onBack");
      // uni.navigateBack(-1);
    },
  },
};
</script>

<style scoped lang="scss">
.no-data {
  height: 100%;
  position: relative;
}
.main {
  transform: translateY(-50%);
  text-align: center;
  color: #999;
  font-size: 26rpx;
}
.main-success {
  transform: translateY(-20%);
}
.no-data-img {
  height: 240rpx;
  width: 196rpx;
}
.no-data-img-success {
  width: 412rpx;
  height: 428rpx;
}
.status-text {
  margin-top: 32rpx;
  color: #1d9bdc;
  font-weight: bold;
  font-size: 48rpx;
}
.tip-text {
  margin-top: 32rpx;
  color: #a9a9a9;
  font-size: 30rpx;
}
.btn-text {
  margin-top: 48rpx;
  width: 320rpx;
  height: 104rpx;
  color: #1d9bdc;
  background-color: #fff;
  border-radius: 254rpx 254rpx 254rpx 254rpx;
  outline: none;
  border: 1rpx solid #1d9bdc;
  font-size: 34rpx;
  font-weight: bold;
  //   letter-spacing:6rpx;
}
</style>
