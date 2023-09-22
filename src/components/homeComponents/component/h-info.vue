<template>
  <view class="content-container">
    <view class="info-out">
      <view class="info d-flex-center" :class="[off && 'info-off']">
        <button
          id="servebtn"
          class="servbtn"
          style="display: hidden"
          open-type="contact"
          hover-class="button-hover"
        ></button>
        <view
          class="info-son d-flex-colum-center"
          v-for="(el, index) in val"
          :key="index"
          @tap="handleMenu(el)"
        >
          <label for="servebtn" v-if="el.urlType === urltypeEnum.five">
            <view class="item-bg">
              <image :src="el.pictureUrl" mode="aspectFit	" />
            </view>
            <view class="infomenu-name">
              <view
                class="name-top font-26"
                :class="[iosFont ? 'font-ios' : 'font-android']"
                >{{ el.name }}</view
              >
              <view class="name-sub font-17">{{ el.subTitle }}</view>
            </view>
          </label>
          <view v-else>
            <view class="item-bg">
              <image :src="el.pictureUrl" mode="aspectFit	" />
            </view>
            <view class="infomenu-name">
              <view
                class="name-top font-26"
                :class="[iosFont ? 'font-ios' : 'font-android']"
                >{{ el.name }}</view
              >
              <view class="name-sub font-17">{{ el.subTitle }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import api from "@/utils/api";
import { mapState } from "vuex";
import { BASE_APPID_KEY } from "@/utils/config";
import { urltypeEnum } from "@/utils/enum";
export default {
  props: {
    val: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      wechatUrl: "",
      showChat: false,
      urltypeEnum,
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("css", ["iosFont"]),
    ...mapState("newhope", ["off"]),
  },
  methods: {
    handleMenu(el) {
      console.log("菜单点击-->", el);
      this.$emit("clickMenu", el);
    },
    // 去登陆
    toLogin() {
      uni.navigateTo({ url: "/pages/user/relogin" });
    },
    handleInfo() {
      // console.log(" 去我大爷的");
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
.swiper-user {
  //padding: 0 32rpx;
  width: 100%;
  height: 104rpx;
  display: flex;
  justify-content: center;
  .sw-user-info {
    flex: 1;
    height: 100%;
    padding-left: 32rpx;
    padding-right: 32rpx;
    background: #fff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    background: linear-gradient(90deg, #1d9bdc 0%, #8bd0ff 100%);
    .sw-avatar {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16rpx;
      .sw-avatar--user {
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
// 菜单
.info-out {
  width: 100%;
  //padding: 0 32rpx;
  height: 228rpx;
  // margin-bottom: 24rpx;
  .info-off {
    border-radius: 40rpx;
  }
  .info {
    //width: 100%;
    //height: 100%;
    // border-bottom-left-radius: 40rpx;
    // border-bottom-right-radius: 40rpx;
    border-radius: 40rpx;

    background: #fff;
    align-items: center;
    padding-top: 34rpx;
    padding-bottom: 36rpx;
    padding-left: 44rpx;
    padding-right: 44rpx;
    overflow-x: auto;
    .info-son {
      // width: 25%;
      margin-right: 54rpx;
      min-width: 108rpx;
      max-width: 134rpx;
      height: 158rpx;
      &.info-son:last-child {
        margin-right: 0;
      }
      image {
        width: 108rpx;
        height: 96rpx;
      }
      .infomenu-name {
        width: 138rpx;
        text-align: center;
        .name-top {
          color: #000000;
        }
      }
    }
  }
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
.servbtn {
  position: absolute;
}
.item-bg {
  text-align: center;
}
</style>
