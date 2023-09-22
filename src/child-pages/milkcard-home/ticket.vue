<template>
  <view class="ticket-out d-flex-center d-sb">
    <img
      :src="getAssetImgUrl('mk-ticket-icon.svg')"
      alt=""
      class="ticket-icon"
    />
    <view class="ticket-left">
      <view class="ticket-money">
        <view>
          <text v-if="info.couponType === 1">
            <text class="money-icon">￥</text
            >{{ noformatAmount(info.couponAmount, true) }}
          </text>
          <text v-else-if="info.couponType === 2"
            >{{ info.reduced / 100 }}折</text
          >
        </view>
      </view>
      <view class="full-text">
        <text v-if="info.conditionType === 1">无门槛</text>
        <text v-else-if="info.conditionType === 2">
          满{{ noformatAmount(info.conditionAmount, true) }}元可用
        </text>
      </view>
    </view>

    <view class="ticket-right">
      <view class="right-name h-over-1">{{ info.couponName }}</view>
      <view class="right-time full-text">
        <text v-if="info.valid === 1">
          {{ info.effectiveTime }}-{{ info.deadTime }}
        </text>
        <text v-if="info.valid === 2">领取后{{ info.validDays }}天内有效</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null,
    },
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性-缓存 类似于data概念
  computed: {},
  // 方法集合
  methods: {},
};
</script>
<style scope lang='scss'>
.ticket-out {
  width: 100%;
  height: 128rpx;
  //   background-color: #fff;

  background: #fff;
  margin-bottom: 12rpx;
  //   background-image: url(https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/mk-ticket-item-bg.png);
  border-radius: 24rpx;
  position: relative;
  .ticket-icon {
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    width: 88rpx;
    height: 72rpx;
  }
  &::after {
    content: "";
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background: #f0faff;
    display: block;
    top: 0;
    left: 160rpx;
    transform: translateY(-50%);
  }
  &::before {
    content: "";
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background: #f0faff;
    display: block;
    bottom: 0;
    left: 160rpx;
    transform: translateY(50%);
  }

  .ticket-money {
    color: #1d9bdc;
    font-size: 48rpx;
    font-weight: bold;
    .money-icon {
      font-size: 26rpx;
    }
  }
  .full-text {
    color: #a9a9a9;
    font-size: 20rpx;
  }
  .ticket-left {
    width: 164rpx;
    text-align: center;
  }

  .ticket-right {
    width: calc(100% - 164rpx);
    height: 100%;
    position: relative;
    padding: 12rpx;
    text-align: center;
    // background: #1d9bdc;
    &::before {
      position: absolute;
      content: "";
      width: 2rpx;
      height: 80rpx;
      background: transparent;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-left: 2rpx dashed #f1f1f1;
    }
  }
  .right-name {
    margin-top: 16rpx;
    color: #333333;
    font-weight: bold;
    font-size: 28rpx;
    margin-bottom: 16rpx;
  }
}
</style>