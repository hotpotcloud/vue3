<template>
  <view>
    <!-- <custom></custom> -->
    <!-- <agreeModel
      :onNeed="false"
      :hideTabBar="true"
      agreeBtnText="同意并继续"
      disagreeBtnText="不同意"
      @disagree="disagreeApp"
      @agree="agreeApp"
    ></agreeModel> -->
    <!-- 登录 -->
    <view class="relogin main-fff" v-show="!shows">
      <view class="content-icon">
        <image class="icon" mode="aspectFit" :src="imgIcon" />
      </view>
      <view>
        <!-- 快速 -->
        <button
          v-if="BaseApp.phoneQuick"
          class="login-btn mian-size"
          type="primary"
          :loading="loadLogin"
          hover-class="button-hover"
          :open-type="checkFlag ? 'getPhoneNumber' : ''"
          @tap="login"
          @getphonenumber="getPhoneNumber"
          id="btnlogin"
        >
          一键登录/手机号快捷登录
        </button>
        <!-- 实时 -->
        <button
          v-else
          class="login-btn mian-size"
          type="primary"
          :loading="loadLogin"
          hover-class="button-hover"
          :open-type="checkFlag ? 'getRealtimePhoneNumber' : ''"
          @tap="login"
          @getrealtimephonenumber="getPhoneNumberReal"
          id="btnlogin"
        >
          一键登录/手机号快捷登录
        </button>
        <view class="text-tips d-flex">
          <checkbox-group @change="onCheck">
            <label>
              <checkbox
                :value="checkFlag"
                :checked="checkFlag"
                style="transform: scale(0.6)"
                class="round blue"
              />
            </label>
          </checkbox-group>
          <view class="tip-text" @tap.stop="onNavUser">
            请仔细阅读
            <text class="nav-text-user" @tap.stop="onNavUser"
              >《用户服务协议》</text
            >，如您同意协议的全部内容，请勾选左侧，开始我们的服务
          </view>
        </view>
      </view>
    </view>

    <!-- 注册 -->
    <h-LoginTel v-if="shows" :text="data" />
  </view>
</template>

<script>
import agreeModel from "@/components/agree-model/index.vue";
// import { getUser } from "@/utils/url";
// import api from "@/utils/api";
import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { wxLogin } from "@/utils/utils";
import { BaseApp } from "@/const/appIdConf";
import { baseVersion } from "@/utils/enum";
import { compareVersion, getVersionInfo } from "@/utils/commonMethod";

export default Vue.extend({
  components: {
    agreeModel,
  },
  data() {
    return {
      BaseApp,
      checkFlag: false,
      checked: false,
      loadLogin: false,
      shows: false,
      imgIcon:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/login.gif",
      data: {
        appId: BaseApp.appid,
        encryptedData: "",
        phoneIv: "",
        sessionKey: "",
        openId: "",
      },
      // wxloginCode: "",
    };
  },
  onShow() {},
  onLoad() {
    // 获取code
    // this.wxloginCode = await wxLogin();
  },
  onHide() {
    // this.wxloginCode = "";
  },
  onUnload() {
    // 用户点击返回清除
    uni.removeStorageSync("isGotoLogin");
    // this.wxloginCode = "";
  },
  computed: {
    ...mapState("user", ["channel", "userInfo"]),
    // 按钮类型
  },
  methods: {
    // ...mapMutations("user", ["loginAfter"]),
    ...mapActions("user", ["appLogin", "phoneLogin", "realTimeVerify"]),
    disagreeApp() {},
    agreeApp() {},
    onCheckbox() {
      this.checked = !this.checked;
    },
    onCheck() {
      this.checkFlag = !this.checkFlag;
    },
    onNavUser() {
      uni.navigateTo({
        url: `/child-pages/user/set-info?name=协议说明&type=protocol`,
      });
    },
    // 快速验证
    // async quickLogin(e) {
    //   try {
    //     const { detail } = e;
    //     if (detail.errMsg === "getPhoneNumber:ok") {
    //       const params = {};
    //       params.encryptedData = e.detail.encryptedData;
    //       params.phoneIv = e.detail.iv;
    //       if (this.channel) {
    //         params.channel = this.channel;
    //       }
    //       await this.phoneLogin(params);
    //       uni.removeStorageSync("isGotoLogin");
    //       uni.navigateBack({ delta: -1 });
    //     } else {
    //       return uni.showToast({
    //         title: "授权失败",
    //         icon: "none",
    //       });
    //     }
    //   } catch (error) {
    //     uni.showToast({
    //       title: error.msg,
    //       icon: "none",
    //       mask: true,
    //     });
    //   }

    //   // uni.navigateBack({ delta: 1 });
    // },
    // 实时验证2222
    // async realTimeLogin(e) {
    //   const { detail } = e;
    //   if (detail.errMsg === "getPhoneNumber:ok") {
    //     console.log("e", e);
    //     const params = {};
    //     params.code = e.detail.code;
    //     if (this.channel) {
    //       params.channel = this.channel;
    //     }
    //     await this.realTimeVerify(params);
    //     uni.removeStorageSync("isGotoLogin");
    //     uni.navigateBack({ delta: -1 });
    //   } else {
    //     return uni.showToast({
    //       title: "授权失败",
    //       icon: "none",
    //     });
    //   }
    // },
    //实时验证
    async getPhoneNumberReal(e) {
      console.log("333");
      try {
        if (!e.detail?.code) return uni.$u.toast("获取手机号失败");
        if (e.detail.errMsg === "getPhoneNumber:ok") {
          this.loadLogin = true;
          const { detail } = e;
          await this.appLogin();
          const params = {};
          params.code = detail.code;
          if (this.channel) {
            params.channel = this.channel;
          }
          await this.realTimeVerify(params);
          uni.removeStorageSync("isGotoLogin");
          uni.navigateBack({ delta: -1 });
        } else {
          this.loadLogin = false;
          return uni.showToast({
            title: "授权失败",
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: error.msg,
          icon: "none",
          mask: true,
        });
      } finally {
        this.loadLogin = false;
      }
    },

    //一键登录
    async getPhoneNumber(e) {
      console.log(e, "eeee");
      try {
        //登录wx.login
        if (e.detail.errMsg === "getPhoneNumber:ok") {
          this.loadLogin = true;
          await this.appLogin();
          const { detail } = e;
          const params = {};
          params.encryptedData = detail.encryptedData;
          params.phoneIv = detail.iv;
          if (this.channel) {
            params.channel = this.channel;
          }
          await this.phoneLogin(params);
          uni.removeStorageSync("isGotoLogin");
          uni.navigateBack({ delta: -1 });
        } else {
          this.loadLogin = false;
          return uni.showToast({
            title: "授权失败",
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: error.msg,
          icon: "none",
          mask: true,
        });
      } finally {
        this.loadLogin = false;
      }
    },
    async compareVersionWithBase() {
      const version = await getVersionInfo();
      console.log(version, "version");
      console.log(version, compareVersion(version, "2.24.4"));
      if (compareVersion(version, baseVersion) < 0) {
        uni.showToast({
          title: "当前微信版本过低可能会影响登录，请升级版本",
          icon: "none",
          duration: 3000,
        });
      }
    },
    // 注册用户登陆
    async login() {
      try {
        wx.onNeedPrivacyAuthorization();
        if (!this.checkFlag) {
          return uni.showToast({
            title: "请选择同意条款",
            icon: "none",
          });
        }
        if (!BaseApp.quickLogin) {
          await this.compareVersionWithBase();
        }
        // if (!BaseApp.quickLogin) {
        //   const can = wx.canIUse("getPhoneNumber");
        //   console.log("can", can);
        // }
        // this.loadLogin = true;
      } catch (error) {}
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
