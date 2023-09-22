/* 申请中 */
<template>
  <view class="xiaoyou-success">
    <image
      :src="`https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/${imageUrl}`"
      mode="widthFix"
      class="xiaoyou-img"
    />
    <view class="btns-wrap" v-if="use && isSuccess">
      <view class="btn-text">点击关注，获取最新活动信息和奖品领取</view>
      <view class="follow-btn" @click="toFollow">点击关注</view>
      <view class="back-btn" @click="toXiaoyouHome">已关注，点击返回</view>
    </view>
  </view>
</template>

<script>
import { mapActions } from "vuex";
// import {URLDistributor} from "@/utils/url";
// import Api from "@/utils/api";
import { useOfficialAccount } from "@/const/useOfficialAccount";
import { Global_Cog } from "@/utils/config";

export default {
  data() {
    return {
      imageUrl: "applying.png",
      timer: null,
      use: useOfficialAccount.includes(Global_Cog?.APPID),
      isSuccess: false,
      time1: null,
    };
  },
  onShow() {
    // this.getImage();
  },
  onLoad() {
    this.time1 = setTimeout(() => {
      this.imageUrl = "miniprogram-go-xiaoyou-register_success.png";
      this.isSuccess = true;
    }, 2000);
    this.time2 = setTimeout(() => {
      this.toXiaoyouHome();
      this.clear();
    }, 5000);
  },
  methods: {
    ...mapActions("xiaoyou", ["v_getXYcheck"]),
    async toXiaoyouHome() {
      try {
        this.v_getXYcheck();
        uni.redirectTo({
          url: "/xiaoyouPages/home/index",
        });
      } catch (error) {
        //
      }
    },
    toFollow() {
      uni.redirectTo({
        url: "/xiaoyouPages/toPublick/index",
      });
    },
    clear() {
      clearTimeout(this.time1);
      clearTimeout(this.time2);
      this.time1 = null;
      this.time2 = null;
    },
    // async getImage() {
    //   const {data} = await Api.$getX(
    //     `${URLDistributor.config}wechat_customer_service_QRcode`
    //   );
    //   this.imageUrl = data;
    // },
  },
  onUnload() {
    this.clear();
  },
};
</script>

<style scoped lang="scss">
.xiaoyou-success {
  width: 100%;
  height: 100vh;
  padding: 10rpx 0;
  background-color: white;
  overflow: hidden;
}

.xiaoyou-img {
  width: 100%;
  height: auto;
}
.btns-wrap {
  position: absolute;
  bottom: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-text {
  white-space: nowrap;
  color: #cccccc;
  font-size: 30rpx;
}
.follow-btn {
  width: 300rpx;
  height: 80rpx;
  border-radius: 8rpx;
  text-align: center;
  line-height: 80rpx;
  font-size: 30rpx;
  color: white;
  background: linear-gradient(90.93deg, #86e1ab 0%, #5ac69b 101.15%);
  margin-top: 100rpx;
}
.back-btn {
  width: 300rpx;
  height: 80rpx;
  border-radius: 8rpx;
  text-align: center;
  line-height: 80rpx;
  font-size: 30rpx;
  color: white;
  background: #cccccc;
  margin-top: 24rpx;
}
</style>
