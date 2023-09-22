<template>
  <view class="relogin main-fff">
    <view class="content">
      <view class="content-icon">
        <u-image class="icon" mode="aspectFit" :src="imgIcon" />
      </view>
      <view class="icon-top-text text-center">
        <view class="mian-size">线上轻松订购，GAP一级牧场</view>
        <view class="font-22 color-99" style="margin-top: 16rpx">
          <view>免费送奶上门+免费安装奶箱</view>
          <view>新鲜优质乳每日送达</view>
        </view>
      </view>

      <view>
        <view class="text-center allow-btn">
          <!-- <checkbox-group @change="onCheck">
            <label>
              <checkbox
                :value="checkFlag"
                :checked="checkFlag"
                style="transform: scale(0.6)"
                class="round blue"
              />
            </label>
          </checkbox-group>-->
          点击登录即同意
          <text @tap.stop="onNavUser">《用户服务协议》</text>
        </view>
        <button
          class="login-btn"
          type="primary"
          :disabled="false"
          :loading="false"
          open-type="getRealtimePhoneNumber"
          hover-class="button-hover"
          @getrealtimephonenumber="getPhoneNumber"
        >
          微信手机号快捷登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { getUser } from "@/utils/url";
import api from "@/utils/api";
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  props: {
    text: {
      type: Object, //注册参数
    },
  },
  data() {
    return {
      checkFlag: false,
      imgIcon:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E6%8E%88%E6%9D%83%E6%89%8B%E6%9C%BA%E5%8F%B72x.png",
    };
  },
  onShow() {
    console.log(444);
  },
  onLoad() {
    // const info = uni.getAccountInfoSync();
    // this.data.appId = info.miniProgram.appId;
    // uni.setStorageSync("appId", info.miniProgram.appId);
  },
  computed: {
    ...mapState("user", ["channel"]),
    //???
  },
  methods: {
    onCheck() {
      // console.log("e-checkbox", e);
      this.checkFlag = !this.checkFlag;
    },
    onNavUser() {
      uni.navigateTo({
        url: `/pages/user/component/setinfo?name=协议说明&type=protocol`,
      });
    },
    // 授权手机号注册
    // 手机注册获取token
    getPhoneNumber(e) {
      // if()
      console.log(e, "212", this.text);
      let params = { ...this.text }; //参数
      params.phoneIv = e.detail.iv;
      params.encryptedData = e.detail.encryptedData;
      if (this.channel) {
        params.channel = this.channel;
      }
      api
        .$post(getUser.register, params, "注册中")
        .then((res) => {
          console.log("注册成功", res);
          const data = res.data;
          uni.setStorageSync("userMsg", data);
          uni.setStorageSync("malltoken", data.token);
          uni.setStorageSync("companyId", data.companyId);
          uni.showToast({
            title: "注册成功",
            icon: "success",
          });
          uni.navigateBack({ delta: 1 });
        })
        .catch((err) => {
          console.log(err);
          uni.showToast({
            title: err.msg,
            icon: "error",
          });
        });
    },
  },
});
</script>

<style scoped lang="scss">
.relogin {
  width: 100vw;
  height: 100%;
  .content-icon {
    margin-top: 62rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    .icon {
      width: 620rpx;
      height: 554rpx;
    }
  }

  .login-btn {
    font-size: 34rpx;
    font-weight: 500;
    height: 104rpx;
    line-height: 104rpx;
    width: 566rpx;
    border-radius: 254rpx;
    background-color: $uni-color-primary;
    &::before {
      border: none;
      outline: none;
    }
  }
  .button-hover {
    border: none;
  }
  .allow-btn {
    margin-top: 152rpx;
    margin-bottom: 32rpx;
    text {
      color: $uni-color-primary;
    }
  }

  .text-tips {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 32rpx;
    font-size: 26rpx;
    color: $uni-text-color-grey;
  }
}
</style>
