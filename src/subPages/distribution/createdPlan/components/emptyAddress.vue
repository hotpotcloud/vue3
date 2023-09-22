<template>
  <view class="day-root-container">
    <view class="prent-container">
      <view class="img-view">
        <img
          class="imgStyle"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/emptyAddress.png"
          alt=""
        />
      </view>
      <view class="text">暂无地址信息，快去添加收货地址~</view>
    </view>
    <view class="button-view">
      <view class="button-style" @click="nextStep">添加地址</view>
    </view>
  </view>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      check: "",
    };
  },
  methods: {
    nextStep() {
      uni.navigateTo({
        url: "/subPages/address/addressAdd",
      });
    },
  },
});
</script>

<style scoped>
.day-root-container {
  width: 100%;
  /* height: 100vh; */
  /* background: #f5f5f5; */
}
.prent-container {
  border-bottom: #f5f5f5 1px solid;
  width: 100%;
}

.title {
  width: 100%;
  padding-top: 32rpx;
  padding-left: 32rpx;
  font-size: 32rpx;
  color: #88c7e8;
}
.num-font {
  font-size: 48rpx;
  color: #1d9bdc;
}
.title-text {
  font-size: 36rpx;
  color: #1d9bdc;
  padding-left: 32rpx;
  padding-top: 32rpx;
  margin-bottom: 64rpx;
}

.img-view {
  width: 100%;
  margin-top: 120rpx;
  text-align: center;
}
.imgStyle {
  width: 518rpx;
  height: 356rpx;
}
.text {
  width: 100%;
  height: 44rpx;
  color: #b2b2b2;
  text-align: center;
}
.button-view {
  width: 100%;
  margin-top: 72rpx;
  display: flex;
  justify-content: center;
}
.button-style {
  display: flex;
  border-radius: 100rpx;
  background-color: #1d9bdc;
  height: 80rpx;
  width: 480rpx;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
}
</style>
