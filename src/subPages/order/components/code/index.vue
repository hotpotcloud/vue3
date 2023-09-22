<template>
  <view class="code"
    ><view class="code-image">
      <view class="bar-code"
        ><image :class="{active: isActive}" :src="takeNumBarCodeBase64"></image
      ></view>
      <view class="qr-code"
        ><image :class="{active: isActive}" :src="imageData"></image
      ></view>
      <image
        v-if="takePicStatus['write-off'] === status"
        class="status-icon"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/write-off.png"
      ></image>

      <image
        v-if="
          takePicStatus.invalid === status || takePicStatus.REFUND === status
        "
        class="status-icon"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/invalid.png"
      ></image></view
    ><view>
      <view class="code-number" :class="{active: isActive}"
        >核销码：{{ takeNumAll }}</view
      ></view
    >
    <view
      :style="{
        height: '12rpx',
      }"
    ></view>
    <view class="tips" v-if="takePicStatus['wait'] === status"
      >到店后向营业人员出示该码进行核销</view
    >
  </view>
</template>
<script>
import {takePicStatus} from "@/utils/enum";
export default {
  props: {
    takeNumAll: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    imageData: {
      type: String,
      default: "",
    },
    takeNumBarCodeBase64: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      takePicStatus,
    };
  },
  computed: {
    isActive() {
      return (
        this.status === takePicStatus["write-off"] ||
        this.status === takePicStatus.invalid ||
        takePicStatus.REFUND === this.status
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.code {
  border-top: 2rpx dashed #f1f1f1;
  text-align: center;
  padding-top: 24rpx;
  margin-top: 24rpx;
  .code-image {
    position: relative;
    .qr-code {
      display: flex;
      justify-content: center;
      > image {
        width: 320rpx;
        height: 320rpx;
      }
    }

    .status-icon {
      position: absolute;
      width: 280rpx;
      height: 280rpx;
      right: 182rpx;
      top: 0rpx;
    }
  }
  .active {
    opacity: 0.2;
    .code-number {
      background: #f1f1f1;
    }
  }
  .code-number {
    padding: 8rpx 16rpx;
    display: inline-block;
    background: #f1f1f1;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    margin-bottom: 24rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
    margin-top: 32rpx;
  }
  .tips {
    height: 64rpx;
    background: rgba(255, 212, 118, 0.1);
    font-size: 24rpx;
    font-weight: 500;
    color: #db9918;
    line-height: 64rpx;
  }
  .bar-code {
    display: flex;
    justify-content: center;
    margin-bottom: 48rpx;
    > image {
      width: 606rpx;
      height: 160rpx;
      display: block;
    }
  }
}
</style>
