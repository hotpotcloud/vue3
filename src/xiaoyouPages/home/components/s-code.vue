<template>
  <view>
    <u-popup
      :show="show"
      mode="bottom"
      @close="onClose"
      :round="5"
      @touchmove.stop.prevent="moveHandle"
    >
      <view class="pop-main padding-l-r" @touchmove.stop.prevent="moveHandle">
        <view class="d-flex-center common-relative">
          <view class="topname flex-1">{{ topInfo.topName }}</view>

          <view class="close-pop" @tap="onClose">
            <img
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
              alt=""
            />
          </view>
        </view>
        <view class="toptip">{{ topInfo.topTip }}</view>
        <!-- 内容 -->
        <view>
          <view class="main-content">
            <!-- 头像 -->
            <view class="main-phto">
              <view class="phto-user">
                <image :src="topInfo.photo" mode="aspectFit" />
              </view>
            </view>
            <!-- 用户名 -->
            <view class="user-msg">
              <view class="msg-name">{{ topInfo.userName }}</view>
              <view class="msg-phone">{{ topInfo.phone }}</view>
            </view>
            <!-- 专属小程序二维码 -->
            <view class="face-code">
              <img :src="faceCode" class="face-img" />
            </view>
          </view>
          <!-- 操作流程 -->
          <view class="action-flow">
            <img
              class=""
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/005liucen.png"
              alt=""
            />
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  //   name: "Scode",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  computed: {
    ...mapState("xiaoyou", ["faceCode"]),
    topInfo() {
      const xyInfo = uni.getStorageSync("xiaoyouInfo");
      return {
        topName: "面对面邀请",
        topTip: "可以让好友打开微信扫描您的二维码，注册为鲜推官。",
        userName: xyInfo.nickName,
        photo: xyInfo.avatarUrl,
        phone: xyInfo.phone,
      };
    },
  },

  methods: {
    onClose() {
      console.log("this.show", this.show);
      this.$emit("onClose", this.show);
    },
    moveHandle() {},
  },
};
</script>

<style lang="scss" scoped>
.pop-main {
  padding: 48rpx 0 68rpx;
  overflow: auto;
  .topname {
    text-align: center;
    font-weight: bold;
    font-size: 34rpx;
    color: #000;
  }
  .toptip {
    color: #999999;
    margin-top: 24rpx;
    text-align: center;
  }
  .common-relative {
    position: relative;
  }
  .close-pop {
    border: none;
    width: 32rpx;
    height: 32rpx;
    position: relative;
    pointer-events: none;
    image {
      width: 100%;
      height: 100%;
    }
    &:after {
      position: absolute;
      left: 0;
      top: -30rpx;
      content: "";
      width: 60rpx;
      height: 60rpx;
      background: transparent;
      pointer-events: auto;
    }
  }
  .main-content {
    position: relative;
    margin-top: 64rpx;
    height: 618rpx;
    width: 686rpx;
    border-radius: 12rpx;
    background: #f2fbff;
    border: 1rpx solid #def2ff;
    z-index: 999;
  }
  .main-phto {
    position: absolute;
    top: -54rpx;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    background: #f2fbff;
    z-index: 9991;
    width: 108rpx;
    height: 54rpx;
    border-radius: 108rpx 108rpx 0 0;
    border: 1rpx solid #def2ff;
    border-bottom: none;
    .phto-user {
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      // background: #49b7f0;
      margin: 12rpx auto;
      overflow: hidden;
      border: 1rpx solid #def2ff;
      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .user-msg {
    margin-top: 56rpx;
    text-align: center;
    .msg-name {
      font-size: 28rpx;
      font-weight: bold;
    }
    .msg-phone {
      font-size: 24rpx;
      color: #999999;
    }
  }


  .face-code {
    text-align: center;
    margin: 16rpx 0;
    .face-img {
      width: 440rpx;
      height: 440rpx;
    }
  }
  .action-flow {
    // margin-bottom: 72rpx;
    margin-top: 32rpx;
    background: #f8fdff;
    height: 196rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 海报
  .main-canvas {
    .hides {
      position: fixed !important;
      left: -9000px;
    }
    margin-top: 32rpx;
    // 轮播
    .gundong {
      height: 570rpx;
    }
    .gundongItem {
      width: 300rpx;
      height: 570rpx;
      display: flex;
      justify-content: center;
    }
    .Item {
      width: 300rpx;
      height: 570rpx;
      background: #ffffff;
      position: relative;
    }
    .smItem {
      height: 390rpx;
      margin-top: 88rpx;
    }
    .shareImg {
      height: 100%;
      width: 100%;
      border: 4rpx solid rgba(0, 0, 0, 0.05);
      border-radius: 16rpx;
    }
    .code-img {
      position: absolute;
      bottom: 14rpx;
      right: 16rpx;
      width: 72rpx;
      height: 72rpx;
      overflow: hidden;
      border-radius: 50%;
      .qrcode {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .other-img {
      position: absolute;
      bottom: 10rpx;
      right: 12rpx;
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
      overflow: hidden;
      .qrcode {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .canvas-swiper {
      height: 570rpx;
      // background: #999999;
      margin-bottom: 32rpx;
      .content-img {
        height: 100%;
        width: 100%;
      }
    }
    // 推荐文案
    .canvas-text {
      padding: 0 67rpx;
      // padding-top: 568rpx;
      .text-content {
        margin: 16rpx 0 36rpx;
        padding-top: 16rpx;
        border-top: 2rpx dashed #f4f4f4;
      }
      .text-tip {
        color: #999999;
        font-size: 24rpx;
      }
      //三行
      .text-main {
        color: #666666;
        font-size: 24rpx;
        rich-text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 116rpx !important;
        }
      }
      .copy-btn {
        margin-left: 16rpx;
        width: 80rpx;
        height: 40rpx;
        border-radius: 32rpx 32rpx 32rpx 32rpx;
        border: 1rpx solid #4cade0;
        text-align: center;
        color: #4cade0;
        font-size: 24rpx;
        // padding: 4rpx 0 2rpx;
      }
    }
    .save-btn {
      background: #1d9bdc;
      padding: 18rpx 0 20rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      border-radius: 60rpx;
      height: 80rpx;
    }
  }
}
.padding-l-r {
  padding-left: 32rpx !important;
  padding-right: 32rpx !important;
}
</style>
