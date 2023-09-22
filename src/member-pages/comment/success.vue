<template>
  <view class="success-out">
    <view class="payment-out">
      <hRes
        :btnTextRight="info.btnTextRight"
        :rightUrl="info.rightUrl"
        :btnTextLeft="info.btnTextLeft"
        :leftUrl="info.leftUrl"
        :slotText="info.slotText"
        :topTip="info.topTip"
        :textTip="info.textTip"
        @btnLeft="btnLeft"
        @btnRight="btnRight"
      >
        <image
          slot="picture"
          class="null-img"
          :src="getAssetImgUrl(info.img)"
          mode="widthFix"
        />
      </hRes>
    </view>
  </view>
</template>

<script>
import hRes from "./components/h-res.vue";
import { mapActions } from "vuex";
export default {
  components: {
    hRes,
  },
  data() {
    return {
      info: {
        topTip: "评价成功",
        textTip: "感谢您的评价，我们将不断改进~",
        btnTextLeft: "查看评价",
        leftUrl: "/pages/order/order",
        btnTextRight: "完成",
        rightUrl: "/pages/homepage/homepage",
        img: "card-pay-success.png",
      },
    };
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    ...mapActions("newhope", ["X_getMonthWeek", "X_getSelectDetailGoods"]),
    btnLeft() {
      uni.navigateBack({
        delta: 1,
      });
    },
    async btnRight() {
      await this.X_getMonthWeek();
      await this.X_getSelectDetailGoods();
      uni.navigateBack({
        delta: 2,
      });
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang="scss">
.payment-out {
  // padding: 124rpx 0 0;
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
