<template>
  <view class="user-top-out">
    <view class="user-info-top">
      <view class="info">
        <view class="info-top d-flex-row d-flex-center" @tap="clickEdit">
          <!-- left -->
          <view class="info-left d-flex-row d-flex-center">
            <view class="info-imgs">
              <img
                class="logined-img"
                v-if="isLogin"
                :src="
                  getAssetImgUrl(
                    userinfo.wxAvatarUrl
                      ? userinfo.wxAvatarUrl
                      : BaseApp.avatarUrl
                  )
                "
              />
              <img v-else :src="BaseApp.nullUser" />
            </view>
            <view class="info-msg">
              <view v-if="isLogin">
                <view class="info-name">
                  Hi~ {{ userinfo.name ? userinfo.name : nickName }}
                </view>
                <view class="sub-color h-subfont long-time-drink">
                  已坚持饮奶{{ days ? days : "N" }}天
                </view>
              </view>
              <view v-else>
                <view class="info-name">Hi~新鲜的一代！</view>
                <view class="sub-color h-subfont mmpu">登录享受更多服务</view>
              </view>
            </view>
          </view>

          <!-- right -->
          <view class="info-right">
            <view v-if="!isLogin">
              <button
                :loading="false"
                hover-class="button-hover"
                @tap="toLogin"
                class="info-btn"
              >
                注册/登录
              </button>
            </view>
            <!-- <u-icon
              @tap="clickEdit"
              v-else
              size="32"
              name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E7%BC%96%E8%BE%91%402x.png"
            /> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { BaseApp } from "@/const/appIdConf";
export default {
  props: {
    //用户信息
    userinfo: {
      default: () => {},
      type: Object,
    },
    isLogin: {
      default: false,
      type: Boolean,
    },
  },
  components: {},
  data() {
    return {
      BaseApp,
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    //  @tap="clickEdit"
    clickEdit() {
      if (this.isLogin) {
        this.$emit("clickEdit");
      }
    },
    toLogin() {
      this.$emit("toLogin");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
// .user-top-out {
//   background: #f00;
// }
.user-info-top {
  width: 100%;
  height: 128rpx;
  // padding: 0 48rpx;
  // position: absolute;
  // top: 172rpx;
}
.info {
  .info-top {
    width: 100%;
    .info-left {
      flex: 1;
      .info-imgs {
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .logined-img {
          border: 2rpx solid #fff;
        }
      }
      .info-msg {
        margin-left: 24rpx;
        .info-name {
          // margin-bottom: 22rpx;
          font-size: 36rpx;
          font-weight: bold;
        }
        .long-time-drink {
          margin-top: 8rpx;
          background: #fff;
          padding: 6rpx 12rpx;
          border-radius: 24rpx;
          color: #8ebbd2;
        }
        .mmpu {
          margin-top: 14rpx;
        }
      }
    }
    .info-btn {
      width: 194rpx;
      height: 72rpx;
      background: $uni-color-primary;
      font-size: 30rpx;
      color: #ffffff;
      border-radius: 254rpx;
      line-height: 72rpx;
    }
  }
}
</style>