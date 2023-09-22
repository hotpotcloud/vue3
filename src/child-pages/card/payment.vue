<template>
  <!-- 支付成功 -->
  <view class="payment-out">
    <h-Null
      :butRight="info.butRight"
      :rightUrl="info.rightUrl"
      :slotImg="info.slotImg"
      :slotText="info.slotText"
    >
      <template>
        <image
          class="null-img"
          :src="getAssetImgUrl(info.img)"
          mode="widthFix"
        />
        <view slot="text">
          <view class="pay-success-text">支付成功</view>
          <view class="pay-tip-text">{{ info.textTip }}</view>
        </view>
      </template>
    </h-Null>
  </view>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性-缓存 类似于data概念
  computed: {
    info() {
      return {
        slotImg: true,
        slotText: true,
        textTip: "订单支付成功，一起畅快的喝奶吧～",
        butRight: "查看卡包",
        // rightUrl: "/child-pages/my-card/index",
        rightUrl: "/child-pages/card-wallet/index",
        img: "card-pay-success.png",
      };
    },
  },
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  onLoad(options) {
    console.log(options);
  },
  // 生命周期 - 页面展示（不可以访问DOM元素）
  onShow() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  onReady() {},
  // 方法集合
  methods: {},
  // 生命周期 - 监听页面隐藏
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.payment-out {
  padding: 124rpx 40rpx 0;
  .null-img {
    width: 412rpx;
    height: 428rpx;
  }
  .pay-success-text {
    color: #1d9bdc;
    font-size: 48rpx;
    font-weight: bold;
    margin: 32rpx auto;
    text-align: center;
  }
  .pay-tip-text {
    font-size: 26rpx;
    color: #a9a9a9;
    text-align: center;
    margin-bottom: 48rpx;
  }
}
</style>