<template>
  <!-- 登录头像固定模块 -->
  <view class="content-container">
    <!-- 用户信息 -->
    <view class="swiper-user">
      <!-- 用户信息 -->
      <view class="sw-user-info d-flex-center d-sb">
        <!-- 左 -->
        <view class="d-flex-center" @tap.stop="handleInfo">
          <!-- 头像 -->
          <view class="sw-avatar">
            <image
              class="sw-avatar--user"
              v-if="loginStatus"
              :src="userInfo.avatarUrl ? userInfo.avatarUrl : xjimg"
              mode="scaleToFill"
            />
            <image
              v-else
              class="sw-avatar--user"
              :src="conf[BASE_APPID_KEY].nullUser"
              mode="scaleToFill"
            />
          </view>

          <view class="user-right">
            <view class="user-top d-flex-center">
              <text
                v-if="loginStatus"
                :class="[
                  iosFont ? 'font-ios' : 'font-android',
                  'h-over-1',
                  'user-top-name',
                  'font-26',
                ]"
                style="margin-right: 16rpx"
                >{{ userInfo.name ? userInfo.name : "" }}</text
              >
              <text
                v-else
                class="font-26 h-over-1 user-top-name"
                :class="[iosFont ? 'font-ios' : 'font-android']"
                style="margin-right: 16rpx"
                >Hi~新鲜的一代</text
              >
            </view>
            <view v-if="loginStatus" style="font-size: 22rpx; color: #ffffff"
              >已坚持饮奶N天</view
            >
            <view v-else style="font-size: 22rpx; color: #ffffff"
              >登录享受更多服务</view
            >
          </view>
        </view>

        <!-- 右 -->
        <view class="[!loginStatus?'padding-r32':'']">
          <view
            v-if="loginStatus && showAccount"
            class="right-account"
            @tap="onAccount"
          >
            <text>{{ haveAccount ? "您有订单待恢复" : "订奶账户" }}</text>
            <uni-icons type="right" color="#ffffff" size="16" />
          </view>
          <view
            @tap.stop="toLogin"
            v-else-if="!loginStatus"
            class="login-btn"
            :class="[iosFont ? 'font-ios' : 'font-android']"
            >注册/登录</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { BASE_APPID_KEY } from "@/utils/config";
import { conf } from "@/const/appIdConf";
export default {
  props: {
    haveAccount: {
      type: String,
      default: "",
    },
    showAccount: {
      //订奶账户显示
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      conf,
      BASE_APPID_KEY,
      flag: false,
      xjimg:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/info/user1.png",
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("css", ["iosFont"]),
    ...mapState("newhope", ["calendarList", "currentDay", "curParams"]),
    ...mapGetters("newhope", ["C_calcDateList"]),
  },
  methods: {
    ...mapMutations("newhope", ["V_setCurrentDay", "V_setCurParams"]),
    // 去登陆
    toLogin() {
      uni.navigateTo({ url: "/pages/user/relogin" });
    },
    onAccount() {
      if (!this.loginStatus) return this.toLogin();
      uni.navigateTo({ url: "/child-pages/account/index" });
    },
    handleInfo() {
      if (!this.loginStatus) return this.toLogin();
      uni.switchTab({
        url: "/pages/user/user",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.content-container {
  //width: 100%;
  padding: 0 32rpx;
}
.margin32 {
  margin-bottom: 32rpx;
}
// 用户信息
.swiper-user {
  position: relative;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/home-top-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  //padding: 0 32rpx;
  width: 100%;
  height: 104rpx;
  display: flex;
  justify-content: center;
  .sw-user-info {
    flex: 1;
    height: 100%;
    padding-left: 32rpx;
    // padding-right: 32rpx;
    // background: #fff;
    border-radius: 24rpx;
    // background: linear-gradient(90deg, #1d9bdc 0%, #8bd0ff 100%);
    .sw-avatar {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16rpx;
      .sw-avatar--user {
        border: none;
        width: 100%;
        height: 100%;
      }
    }
    .user-top-name {
      max-width: 266rpx;
      padding-left: 0;
      line-height: 30rpx;
      color: #fff;
    }
  }
}
.padding-r32 {
  padding-right: 32rpx;
}
.right-account {
  padding: 6rpx 16rpx;
  padding-right: 0;
  color: #1d9bdc;
  border-radius: 12px 0px 0px 12px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0.49) 100%
    );
  border: 1px solid;
  border-image-source: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
.login-btn {
  background: #1d9bdc;
  width: 166rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  color: #fff;
  font-size: 26rpx;
  border-radius: 42rpx;
}
.xbfcalendar-out {
  padding: 26rpx 14rpx 0;
}
.xbf-out {
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
}
// //鲜活日记
// .goods-sw {
//   // background: #1d9bdc;
//   background: #fff;
//   border-bottom-left-radius: 40rpx;
//   border-bottom-right-radius: 40rpx;
//   padding: 30rpx 20rpx 24rpx;
//   .sw-father {
//     height: 108rpx;
//     border-radius: 14rpx;
//     background: #f5f5f5;
//     padding: 14rpx 20rpx 10rpx;
//     .sw-item-goods {
//       .sw-img {
//         background: #f5f5f5;
//         width: 74rpx;
//         height: 84rpx;
//         margin-right: 30rpx;
//       }
//     }
//   }
//   //暂无商品配送
//   .none-father {
//     text-align: center;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 24rpx;
//     color: #999999;
//     .none-icon {
//       width: 48rpx;
//       height: 48rpx;
//       margin-right: 16rpx;
//     }
//   }
// }
// .xhrj-icon {
//   height: 52rpx;
//   width: 196rpx;
// }
// .check-icon {
//   width: 32rpx;
//   height: 32rpx;
// }
.tips {
  font-size: 24rpx;
  font-weight: 400;
  color: #ffffff;
  line-height: 30rpx;
}
</style>
