<template>
  <view>
    <u-modal
      :show="show"
      width="80vw"
      :showConfirmButton="false"
      :showCancelButton="false"
    >
      <view class="auth-box-wrap">
        <view class="auth-box">
          <view class="title">
            <view class="auth-title">实名认证与代扣协议签署</view
            ><img
              @tap.stop="onClose"
              class="close-pop"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
              alt=""
          /></view>

          <view class="auth-notice"
            >根据相关法律法规，佣金需要缴纳个税，请仔细阅读并同意下方服务协议(个税代扣服务协议)，并前往完成实名认证，否则无法提现。</view
          >
          <view class="auth-agree"
            ><image
              @click="handleAuthAgree"
              class="auth-check-icon"
              :src="
                !isAgree
                  ? 'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/miniprogram-go-xiaoyou-check_1.png'
                  : 'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/miniprogram-go-xiaoyou-check_2.png'
              "
            />
            <view class="agree-text" @click="handleAuthAgree"
              >勾选将视为同意</view
            >
            <view class="agree" @click="handleAgreement"
              >《自由职业者服务协议》</view
            >
          </view>
          <view
            :class="{
              'auth-btn': true,
              'auth-btn-active': isAgree,
              'auth-btn-default': !isAgree,
            }"
            @click="handleToAuth"
            >同意协议并前往实名认证
          </view>
        </view>
      </view></u-modal
    ></view
  >
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      isAgree: true,
    };
  },
  methods: {
    // 实名认证弹框同意协议
    handleAuthAgree() {
      this.isAgree = !this.isAgree;
    },
    handleToAuth() {
      if (!this.isAgree)
        return uni.showToast({
          title: "请勾选自由职业者服务协议",
          icon: "none",
        });
      uni.navigateTo({
        url: "/xiaoyouPages/withdraw/Auth",
      });
      this.onClose();
    },
    //自由职业者服务协议
    handleAgreement() {
      uni.navigateTo({
        url: "/xiaoyouPages/setting/agreement",
      });
    },
    onClose() {
      this.$emit("close-auth");
    },
  },
};
</script>

<style scoped lang="scss">
/* 实名认证弹框 */

.auth-box {
  width: 600rpx;
  border-radius: 24rpx;
  background: #fff;
  padding: 0rpx 43rpx 0rpx 43rpx;
  text-align: center;
}

.auth-box-close {
  position: absolute;
  height: 30rpx;
  width: 30rpx;
  right: 24rpx;
  top: 24rpx;
}

.auth-title {
  display: block;
  width: 100%;
  text-align: center;
  font-family: PingFang SC;
  font-size: 34rpx;
  font-style: normal;
  font-weight: 500;
  line-height: 48rpx;
  color: #333;
}

.auth-notice {
  font-family: PingFang SC;
  font-size: 30rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 42rpx;
  text-align: center;
  color: rgb(119, 119, 119);
  padding-top: 24rpx;
  white-space: break-spaces;
}

.auth-check-icon {
  width: 30rpx;
  height: 30rpx;
}

.auth-check-icon {
  display: inline-block;
  vertical-align: middle;
}

.auth-btn-default {
  background: #86e1ab;
  opacity: 0.3;
}

.auth-btn-active {
  background: #5ac69b;
}

.agree-text {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 26rpx;
  line-height: 36rpx;
  text-align: center;
  color: #999999;
  padding-left: 16rpx;
}

.agree {
  width: auto;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 26rpx;
  line-height: 36rpx;
  text-align: center;
  color: rgba(90, 198, 155, 1);
}

.auth-agree {
  margin: 48rpx 0 32rpx 0;
  text-align: center;
  display: flex;
  align-items: center;
}

.auth-btn {
  text-align: center;
  line-height: 76rpx;
  width: 514rpx;
  height: 76rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: white;
}
.close-pop {
  border: none;
  width: 32rpx;
  height: 32rpx;
  position: absolute;
  right: 0rpx;
  top: 8rpx;
}
.title {
  position: relative;
  text-align: center;
}
</style>
