<template>
  <view class="info-item">
    <view class="label">{{ label }}</view>
    <view class="right">
      <view class="bold" v-if="type === 'bold'">{{ value }}</view>
      <view class="active" v-if="type === 'active'">{{ value }}</view>
      <view
        :class="[value > 0 ? 'reduce-symbol' : 'reduce']"
        v-if="type === 'reduce'"
        >{{ value }}</view
      >
      <view class="default-wrap" v-if="type === 'default'">
        <view class="default-text">{{ value }}</view>
        <image
          class="copy-img"
          @tap="onCopy"
          :src="getAssetImgUrl('copy.png')"
          v-if="isCopy"
        />
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "标题"
    },
    value: {
      type: String,
      default: "0.00"
    },
    isCopy: {
      type: Boolean,
      default: false // 显示复制按钮
    },
    type: {
      type: String,
      default: "default" // 不同颜色 bold default active reduce,只有default才有复制按钮
    }
  },
  methods: {
    onCopy() {
      this.$emit("onCopy", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
}
.label {
  font-size: 24rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 28rpx;
}
.bold {
  text-align: right;
  font-size: 24rpx;
  font-family: DIN-Bold, DIN;
  font-weight: bold;
  color: #333333;
  line-height: 26rpx;
  &::before {
    content: "¥";
    font-size: 22rpx;
  }
}
.active,
.reduce,
.reduce-symbol {
  text-align: right;
  font-size: 24rpx;
  font-family: DIN-Bold, DIN;
  font-weight: bold;
  line-height: 26rpx;
}
.reduce {
  color: #333;
  &::before {
    content: "¥";
  }
}
.reduce-symbol {
  color: #f86c4d;
  &::before {
    content: "-¥";
  }
}

.default-wrap {
  font-size: 0;
  .default-text,
  .copy-img {
    display: inline-block;
    vertical-align: middle;
  }
  .copy-img {
    width: 40rpx;
    height: 40rpx;
  }
  .default-text {
    text-align: right;
    font-size: 24rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 28rpx;
    margin-right: 4rpx;
  }
}
</style>
