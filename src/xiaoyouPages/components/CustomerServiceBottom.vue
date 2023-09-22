<template>
  <!-- 底部客服信息与客服的弹窗 -->
  <view :style="{ 'background-color': bg }"
    ><view class="bttom">
      <view class="bottom-link"
        >有任何疑问都可以联系：<text class="customer" @click="openPopup"
          >小优专属客服</text
        ></view
      >
      <view class="bottom-date">
        <text v-if="BASE_APPID_KEY === 'SX'">（工作时间：8:30-17:30）</text>
        <text v-else>（工作时间：9:00-21:00）</text>
      </view>
    </view>
    <CustomerService :show="show" v-on:close="close"
  /></view>
</template>
<script>
import CustomerService from "./CustomerService.vue";
import { BASE_APPID_KEY } from "@/utils/config";
export default {
  props: ["bg"],
  data() {
    return {
      show: false,
      BASE_APPID_KEY,
      // appidName: BASE_APPID_KEY,
    };
  },
  components: { CustomerService },
  methods: {
    // call servers
    callServer() {
      return new Promise(() => {});
    },
    openPopup() {
      //白帝暂无企微客服，跳转客服电话
      if (BASE_APPID_KEY === "BD") {
        this.show = false;
        wx.makePhoneCall({
          phoneNumber: "05551-65330000",
        });
        return;
      }
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.bttom {
  padding-bottom: 58rpx;
  padding-top: 20rpx;
  font-size: 22rpx;
  color: #a9a9a9;
  line-height: 26rpx;
  //   background-color: #f6f6f6;
  text-align: center;
  .customer {
    color: #6cc3ff;
  }
  .bottom-link {
    font-size: 24rpx;
    line-height: 28rpx;
    margin-bottom: 8rpx;
  }
  .bottom-date {
    font-size: 22rpx;
    color: #a9a9a9;
    line-height: 26rpx;
  }
}
</style>
