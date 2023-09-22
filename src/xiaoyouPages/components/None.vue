<template>
  <view class="none">
    <image
      class="nomore-img"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png"
      mode="scaleToFill"
    />
    <view class="nomore-tex"><slot></slot></view>
    <view class="act-btn" @tap="btnClick" v-if="btnText">
      {{ btnText }}</view
    ></view
  >
</template>
<script>
export default {
  props: ["btnText"],
  methods: {
    btnClick() {
      this.$emit("btn-click");
    },
  },
};
</script>
<style lang="scss" scoped>
.none {
  text-align: center;
  .nomore-img {
    width: 294rpx;
    height: 360rpx;
  }
  .nomore-tex {
    margin-top: 40rpx;
    color: #a9a9a9;
  }
  .act-btn {
    margin: 0 auto;
    margin-top: 40rpx;
    width: 320rpx;
    border-radius: 254rpx;
    background: #1d9bdc;
    height: 104rpx;
    line-height: 104rpx;
    font-weight: bold;
    color: #ffffff;
    font-size: 34rpx;
  }
}
</style>
