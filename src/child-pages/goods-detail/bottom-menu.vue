<template>
  <view class="bottom-menu-wrap">
    <view class="left-icon-btn">
      <button
        id="serveBtn"
        style="display: none"
        open-type="contact"
        hover-class="button-hover"
      ></button>
      <view class="customer-icon">
        <label for="serveBtn">
          <image
            class="customer-img"
            :src="
              getAssetImgUrl(
                '%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E5%AE%A2%E6%9C%8D2x.png'
              )
            "
          />
          <view class="text">客服</view>
        </label>
      </view>
      <view class="home-icon" @tap.stop="onHome">
        <image
          class="home-img"
          :src="
            getAssetImgUrl(
              '%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E4%B8%BB%E9%A1%B52x.png'
            )
          "
        />
        <view class="text">首页</view>
      </view>
    </view>
    <view class="confirm-btn" @tap.stop="onConfirm">立即兑换</view>
  </view>
</template>

<script>
export default {
  methods: {
    onHome() {
      this.$emit("onHome");
    },
    onConfirm() {
      this.$emit("onConfirm");
    },
  },
};
</script>
<style scoped lang="scss">
.bottom-menu-wrap {
  border-top: 1rpx solid #f3f3f3;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  height: 176rpx;
  background-color: #ffffff;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 16rpx 40rpx;
  // padding-bottom: env(safe-area-inset-bottom);
  // padding-bottom: constant(safe-area-inset-bottom);
  .left-icon-btn {
    display: flex;
    justify-content: space-between;
    flex: 1;
    margin-right: 64rpx;
  }
  .customer-icon {
    .customer-img {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .home-icon {
    .home-img {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .confirm-btn {
    width: 446rpx;
    height: 80rpx;
    background: #1d9bdc;
    border-radius: 254rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
  }
}
.text {
  font-size: 20rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #000;
  line-height: 23rpx;
  text-align: center;
}
</style>
