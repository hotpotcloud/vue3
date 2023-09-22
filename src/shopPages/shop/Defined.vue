/** * 自定义导航栏组件 */
<template>
  <view class="self-out">
    <view
      class="top-nav"
      :style="{
        paddingTop: menuButtonInfo.top + 'px',
        backgroundImage: topBg,
        backgroundSize: '100% ' + bgHeight,
      }"
      :class="{'fixed-container': fixedTitle}"
    >
      <!-- 自定义导航标题 -->
      <view
        :style="{height: menuButtonInfo.height + 6 + 'px'}"
        :class="{'top-title': true}"
      >
        <!-- <view class="back-bg-container" > -->
        <view class="back-bg" @tap="onBackBtn">
          <text class="back-bg-icon"></text
        ></view>
        <!-- </view> -->
        <text>{{ topName }}</text>
      </view>

      <!-- 内容部分 -->
      <!-- paddingTop:'36rpx' -->
      <view class="main d-flex-colum height-container">
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
    fixedTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuButtonInfo: {}, //自定义高度信息
    };
  },
  onLoad(options) {
    this.get_receiptList();
  },
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
  // background-size: 100% 100%;
  position: relative;
  background-repeat: no-repeat;
}
.top-title {
  font-size: 34rpx;
  padding-bottom: 12rpx;
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

.back-bg {
  position: absolute;
  left: 0rpx;
  width: 72rpx;
  height: 56rpx;
  background: rgba(0, 0, 0, 0.3);
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
}

.fixed-container {
  background-image: none !important;
  background-color: #fff;
  .top-title {
    border-bottom: 1rpx solid #f1f1f1;
    background-color: #fff;
    color: #333333;
  }
}
</style>
