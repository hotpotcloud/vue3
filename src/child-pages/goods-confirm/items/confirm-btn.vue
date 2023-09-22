<template>
  <view class="milk-btn-cofirm">
    <view class="notice-bar" v-if="showNotice.length">
      <view class="notice-bar-left">
        <view class="notice-bar-content">
          <uni-icons size="16" color="#fff" type="info"></uni-icons>
          <view class="notice-bar-text">
            <text v-if="showNotice === 'typeAdd'">
              请添加配送计划，以便进行配送</text
            >
            <text v-if="showNotice === 'typeSever'">
              该收货地址暂时不可售卖，如有疑问请联系</text
            >
            <label for="serveBtn">
              <text class="server-online" v-show="showNotice === 'typeSever'"
                >在线客服</text
              ></label
            >
            <button
              id="serveBtn"
              style="display: hidden"
              open-type="contact"
              hover-class="button-hover"
            ></button>
          </view>
        </view>
      </view>
    </view>
    <view class="confirm-btn-out">
      <view class="d-flex d-flex-row-end border-btn">
        <button
          class="sure-btn"
          @tap="onConfirmBtn"
          :loading="loading"
          :class="[disabled && 'no-sure-btn']"
        >
          确认兑换
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    showNotice: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    disabled() {
      return this.showNotice === "typeAdd" || this.showNotice === "typeSever";
    },
  },
  methods: {
    onConfirmBtn() {
      if (this.showNotice)
        return uni.showToast({
          title:
            this.showNotice === "typeAdd" ? "请添加配送计划" : "请更换配送地址",
          icon: "none",
        });
      this.$emit("onConfirmBtn");
    },
  },
};
</script>
<style scope lang="scss">
.milk-btn-cofirm {
  background: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 102;
}
.confirm-btn-out {
  height: 176rpx;
  justify-content: flex-end;
  .sure-btn {
    outline: none;
    // border-color: #1d9bdc;
    background: #1d9bdc;
    border-radius: 254rpx 254rpx 254rpx 254rpx;
    height: 84rpx;
    line-height: 84rpx;
    font-size: 32rpx;
    color: #ffffff;
    font-weight: bold;
    padding: 0 68rpx;
    margin: 16rpx 0 0 0;
  }
  .no-sure-btn {
    background: #c7c7c7;
    border: 2rpx solid #c7c7c7;
    color: #ffffff;
  }
  button::after {
    border: none;
  }
}

.notice-bar {
  padding: 14rpx 32rpx;
  background-color: #57bcf3;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .notice-bar-content {
    display: flex;
    justify-content: left;
    align-items: center;
    .notice-bar-text {
      font-size: 26rpx;
      padding-left: 16rpx;
      .server-online {
        background: #1d9bdc;
        height: 40rpx;
        border-radius: 40rpx;
        padding: 2rpx 12rpx;
        line-height: 40rpx;
        margin-left: 8rpx;
      }
    }
  }
}
.border-btn {
  border-top: 1rpx solid #f3f3f3;
  padding-right: 32rpx;
}
</style>

