<!--
 * @Date: 2022-07-12 14:23:26
 * @LastEditors: ''
 * @LastEditTime: 2022-07-29 17:06:28
 * ''\pages\order\payResult.vue
-->
<template>
  <view>
    <hAdv :showAdv="showAdv" @closeAdv="closeAdv" :urldata="advInfoMsg[0]" />
    <view class="pay-end">
      <view>
        <img :src="cover" alt class="animation-img" />
      </view>
      <view>
        <view class="suc-text">支付成功</view>
        <view class="tip-text">订单支付成功，一起畅快的喝奶吧～</view>
      </view>
      <view class="d-flex-center d-sb action-btns">
        <view class="back-btn" @click="backHome" id="back">返回首页</view>
        <view class="check-btn" @click="goToOrder" id="check">查看订单</view>
      </view>
    </view>
  </view>
</template>
<script>
// import hNone from "@/components/h-none/h-none.vue";
import { webShowType } from "@/utils/enum";
import { mapActions } from "vuex";
import hAdv from "@/pages/homepage/component/h-adv.vue";
import api from "@/utils/api";
import { pickType } from "@/utils/enum";

export default {
  components: { hAdv },
  data() {
    return {
      //开屏广告
      showAdv: false,
      // 开屏参数
      advParams: {
        appId: uni.getAccountInfoSync().miniProgram.appId,
        // appId: 'wxd118889d6c8cb3b9',
        soleLogo: uni.getSystemInfoSync().deviceId, //唯一标识
      },
      // 广告内容
      advInfoMsg: [],
      cover:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/20220729-111926.gif",
      title: "支付成功",
      note: "订单支付成功，一起畅快的喝奶吧～",
      backBtn: "返回首页",
      forwardBtn: "查看订单",
      backUrl: "/pages/homepage/homepage",
      forwardUrl: "/pages/order/order",
      tabType: "",
    };
  },
  created() {
    this.postAdv();
  },
  onLoad(option) {
    this.tabType = option.tabType || pickType.SEND.value;
    console.log(this.tabType, "======>>>>");
  },
  methods: {
    ...mapActions("home", ["X_putAdvExposure"]),
    backHome() {
      uni.switchTab({
        url: "/pages/homepage/homepage",
        success: () => {
          uni.showTabBar();
        },
      });
    },
    goToOrder() {
      uni.reLaunch({
        url: `/pages/order/order?tabType=${this.tabType}`,
        success: () => {
          uni.showTabBar();
        },
      });
    },
    // onClick(e) {
    //   const type = e.target.id;
    //   uni.showTabBar();
    //   if (type === "back") {
    //     console.log("1", 1);
    //   } else if (type === "check") {
    //     console.log("2", 2);
    //     // uni.switchTab({
    //     //   url: `/pages/order/order?tabType=${this.tabType}`,
    //     //   success: () => {
    //     //     uni.showTabBar();
    //     //   }
    //     // });

    //   }
    // },
    // 关闭广告ee
    closeAdv(flag = false) {
      this.showAdv = flag;
    },
    // 请求广告
    async postAdv() {
      const { data } = await api.$post(this.urlapi.home.adv, this.advParams);
      console.log("data-->111", data);
      if (data.length && data[0].appWebTypeList) {
        const val = data[0].appWebTypeList;
        //是否首页显示
        val.forEach((el) => {
          console.log("el", el);
          if (el === webShowType.PAYMENT_SUCCESSFUL) {
            this.showAdv = true;
            this.advInfoMsg = data;
            this.X_putAdvExposure(data[0].id);
          }
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.pay-end {
  margin-top: 126rpx;
  // background: #ff0;
  text-align: center;
  .animation-img {
    width: 412rpx;
    height: 428rpx;
    // margin-bottom: 32rpx;
  }
  .suc-text {
    font-size: 40rpx;
    color: #1d9bdc;
    font-weight: bold;
  }
  .tip-text {
    color: #a9a9a9;
    margin-top: 32rpx;
  }
  .action-btns {
    margin-top: 76rpx;
    padding: 0 40rpx;
    view {
      background: #1d9bdc;
      // height: 104rpx;
      line-height: 104rpx;
      flex: 1;
      border-radius: 254rpx;
      border: 1rpx solid #1d9bdc;
      font-size: 34rpx;
      font-weight: bold;
    }
    .back-btn {
      background: #ffffff;
      margin-right: 30rpx;
      color: #1d9bdc;
    }
    .check-btn {
      color: #fff;
      background: #1d9bdc;
    }
  }
}
</style>
