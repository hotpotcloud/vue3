/** * 自定义导航栏组件 */
<template>
  <view class="self-out">
    <view
      class="top-nav"
      :style="{
        height: bgHeight,
        paddingTop: menuButtonInfo.top + 'px',
        backgroundImage: topBg,
      }"
    >
      <!-- 自定义导航标题 -->
      <view class="top-title" :style="{height: menuButtonInfo.height + 'px'}">
        <view class="back-bg" v-if="showBgBackBtn">
          <text class="back-bg-icon" @tap="onBackBtn"></text>
        </view>
        <text class="back-icon" v-else @tap="onBackBtn"></text>
        <text>{{ topName }}</text>
      </view>

      <!-- 内容部分 -->
      <!-- paddingTop:'36rpx' -->
      <view
        :class="{'d-flex-colum': true, 'height-container': !fulfill}"
        class="main defind-main d-flex-colum"
        :style="{
          top: mainHeight + 'px',
          height: heig,
        }"
      >
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
import {getTXimgUrl} from "@/utils/utils";

export default {
  props: {
    // 导航标题
    topName: {
      type: String,
      default: "我的账单",
    },
    bgHeight: {
      type: String,
      default: "334rpx",
    },
    bgName: {
      type: String,
      default: "wallet-bg.png",
    },
    showBgBackBtn: {
      type: Boolean,
      default: false,
    },
    fulfill: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuButtonInfo: {}, //自定义高度信息
    };
  },
  onLoad(options) {},
  computed: {
    // 自定义顶部背景图
    topBg() {
      return `url(${this.getAssetImgUrl(this.bgName)})`;
    },
    // 内容区域定位偏移高度
    mainHeight() {
      this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      return (
        this.menuButtonInfo.height + this.menuButtonInfo.top + uni.upx2px(36)
      );
    },
    // 内容区域高度
    heig() {
      return `calc(100vh - ${this.mainHeight}px)`;
    },
  },
  methods: {
    // 返回上一页
    onBackBtn() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.switchTab({
            url: "/pages/homepage/homepage",
          });
        },
      });
    },
    //系统高度获取
    getSystemHeight() {
      //胶囊信息获取
      this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    },
    // 获取图片地址
    getTXimgUrl,
  },
};
</script>

<style lang="scss" scoped>
.self-out {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.top-nav {
  background-size: 100% 100%;
  position: relative;
}
.top-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .back-icon {
    width: 24rpx;
    height: 24rpx;
    border-top: 5rpx solid #fff;
    border-left: 5rpx solid #fff;
    border-top-left-radius: 4rpx;
    transform: rotate(-45deg);
    position: absolute;
    left: 24rpx;
  }
}
.defind-main {
  position: absolute;
  overflow: auto;
}
.height-container {
  width: calc(100% - 64rpx);
  transform: translateX(32rpx);
}
.back-bg {
  width: 72rpx;
  height: 56rpx;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0rpx 28rpx 28rpx 0rpx;
  .back-bg-icon {
    width: 24rpx;
    height: 24rpx;
    border-top: 5rpx solid #fff;
    border-left: 5rpx solid #fff;
    border-top-left-radius: 4rpx;
    transform: rotate(-45deg);
  }
  overflow: auto;
  // background: #f00;
}
</style>
