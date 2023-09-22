<template>
  <view class="container">
    <view class="content-view">
      <view class="img-view">
        <img
          class="imgStyle"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE.png"
          alt=""
        />
      </view>
      <view>
        <view class="text">暂无配送计划哦，</view>
        <view class="text">根据您的喝奶习惯赶快去创建一个吧~</view>
      </view>

      <view class="button-style" @click="createdPlan">创建计划</view>
    </view>
  </view>
</template>
<script>
import Vue from "vue";
import { AlterORCrtate } from "@/utils/enum";
export default Vue.extend({
  components: {},
  data() {
    return {};
  },
  onReady() {},

  onShow() {
    console.log("进入页面");
  },
  onLoad() {},

  methods: {
    createdPlan() {
      const param = AlterORCrtate.CREATE;

      uni.navigateTo({
        url: `/subPages/distribution/createdPlan/components/everyDayComp?param=${param}`,
      });
    },
  },
});
</script>
<style>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
}
.img-view {
  width: 100%;
  margin-top: 224rpx;
  text-align: center;
}
.imgStyle {
  width: 294rpx;
  height: 360rpx;
}
.content-view {
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.text {
  width: 100%;
  height: 22px;
  color: #b2b2b2;
  text-align: center;
}
.button-style {
  display: flex;
  border-radius: 50px;
  background-color: #1d9bdc;
  height: 40px;
  width: 240px;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
}
</style>
