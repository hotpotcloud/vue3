<template>
  <view class="default-out">
    <!-- 头部 -->
    <view
      class="default-top"
      :style="{
        height: bgHeight,
        backgroundImage: topBg.backgroundImage,
      }"
    >
      <view
        :style="{
          paddingTop: menuButtonInfo.top + 'px',
          height: navHeight,
          paddingBottom: '6px',
        }"
        class="top-name top-name-fixed d-flex-center"
        :class="[activeDom ? 'top-name-active' : '']"
      >
        <view class="back-btn-c">
          <u-icon
            name="arrow-left"
            size="22px"
            :color="activeDom ? '#000' : '#fff'"
            @tap="toBack"
          ></u-icon>
        </view>
        <view class="name-tip">{{ topName }}</view>
      </view>
      <view :style="{ top: navHeight }" :class="[showTabs && 'tabs-top']">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    topName: {
      type: String,
      default: "选择主题",
    },
    // 导航背景图
    bgName: {
      type: String,
      default: "card-bg.png",
    },
    bgHeight: {
      // 导航背景图高度
      type: String,
      default: "452rpx",
    },
    activeDom: {
      type: Boolean,
      default: false,
    },
    showTabs: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navHeight: "0px",
      afterNavHeight: "0px",
    };
  },
  onLoad() {},
  computed: {
    // 获取导航背景图
    topBg() {
      return {
        backgroundImage: `url(${this.getAssetImgUrl(this.bgName)})`,
        height: this.bgHeight,
      };
    },
    // 胶囊位置
    menuButtonInfo() {
      let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      console.log("menuButtonInfo", menuButtonInfo);
      this.navHeight = menuButtonInfo.height + menuButtonInfo.top + 6 + "px";
      //rpx转px
      const pxs = uni.upx2px(88);
      this.afterNavHeight =
        menuButtonInfo.height + menuButtonInfo.top + 6 + pxs + "px";
      return menuButtonInfo;
    },
  },
  methods: {
    toBack() {
      // console.log("2", 2);
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.switchTab({
            url: "/pages/homepage/homepage",
          });
        },
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.default-out {
  width: 100%;
  background-color: #f5f5f5;
  .default-top {
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  .tabs-top {
    width: 100%;
    position: fixed;
    background: #ffffff;
    left: 0;
    right: 0;
    z-index: 10002;
    padding: 24rpx 32rpx 4rpx;
    border-top: 2rpx solid #f1f1f1;
  }
  .top-name {
    background: transparent;
    text-align: center;
    font-weight: bold;
    font-size: 34rpx;
    color: #ffffff;
  }
  .top-name-active {
    color: #333;
    background: #ffffff;
  }
  .back-btn-c {
    padding-left: 16rpx;
    position: absolute;
    z-index: 22;
  }

  .name-tip {
    position: absolute;
    z-index: 1;
    width: 100%;
  }
  .top-name-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1999;
  }
}
</style>