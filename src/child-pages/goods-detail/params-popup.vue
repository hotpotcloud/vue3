<template>
  <view>
    <u-popup
      :show="show"
      :round="20"
      closeable
      mode="bottom"
      background-color="#fff"
      @close="() => onClose"
      @open="() => onOpen"
      :safeAreaInsetBottom="true"
    >
      <view>
        <view class="popup-tag-title">参数</view>
        <view
          class="d-flex-row property-css"
          v-for="(val, index) in data"
          :key="index"
        >
          <view style="width: 130rpx">{{ val.propertyName }}：</view>
          <view class="property-val">{{ val.propertyValue }}</view>
        </view>
      </view>
      <view>
        <button
          class="btn-back"
          :loading="false"
          hover-class="button-hover"
          @tap="onClose"
        >
          返回
        </button>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onOpen() {
      this.$emit("onOpen");
    }
  }
};
</script>
<style scoped lang="scss">
.popup-tag-title {
  text-align: center;
  margin-top: 24rpx;
  font-size: 34rpx;
  font-weight: 500;
  color: #000;
  padding-bottom: 26rpx;
}
.property-css:last-child {
  margin-bottom: 96rpx;
}
.property-css {
  padding: 0 40rpx;
  margin-bottom: 16rpx;
  .property-val {
    margin-left: 22rpx;
    flex: 1;
  }
}

.btn-back {
  border-radius: 254rpx;
  width: 670rpx;
  height: 104rpx;
  line-height: 104rpx;
  color: #ffffff;
  font-size: 34rpx;
  font-weight: bold;
  background: #1d9bdc;
  margin-top: 32rpx;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: 48rpx;
}
</style>
