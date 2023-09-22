<template>
  <view class="plan-card-out">
    <!-- 配送计划+配送详情-->
    <view class="card-top d-flex-center d-sb">
      <view class="h-bigweight color-33">
        <text>{{ planName }}</text>
        <text class="text-border">|</text>
        <text>{{ planDay }}</text>
        <text class="text-border">|</text>
        <text>{{ "每次配送" + planOnce + detail.unitName }}</text>
      </view>
      <!-- v-if="isBack" -->
      <button class="recover-btn" @tap.stop="onRecover" v-if="isBack">
        去恢复
      </button>
    </view>
    <!-- 商品轮播 -->
    <view class="sw-main">
      <swiper circular vertical autoplay>
        <swiper-item v-for="(el, idx) in detail.ruleItems" :key="idx">
          <view class="sw-item d-flex-center">
            <img
              :src="getAssetImgUrl(el.goodsImgUrl)"
              alt=""
              class="item-img"
            />
            <view class="item-send-info">
              <view class="flex-1">
                配送时间:{{ el.startDate.replaceAll("-", ".") }}-{{
                  el.endDate.replaceAll("-", ".")
                }}
              </view>
              <view class="flex-1">
                <text>应配{{ el.totalQty }}</text>
                <text class="text-border">|</text>
                <text>待配送{{ el.residueQty }}</text>
                <text class="text-border">|</text>
                <text>已配{{ el.deliveryQty }}</text>
                <text class="text-border">|</text>
                <text>暂停{{ el.suspendQty }}</text>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isBack: {
      //是否可恢复
      type: Boolean,
      default: false,
    },
    // 配送计划
    planName: {
      type: String,
      default: "规律名",
    },
    planDay: {
      type: String,
      default: "上午下午送",
    },
    planOnce: {
      type: String,
      default: "一次性送",
    },
    // 配送详情
    detail: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    /* 去恢复 */
    onRecover() {
      const { planCode, suspendTime, milkStationNo, stationAccountNo } =
        this.detail;
      const obj = {
        planCode,
        suspendTime,
        milkStationNo,
        stationAccountNo,
      };
      this.$emit("onRecover", obj);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
button {
  padding: none;
  margin: 0;
}
.plan-card-out {
  background: #ffffff;
  border: 1rpx solid #f1f1f1;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  overflow: hidden;
}
.text-border {
  margin: 0 8rpx;
}
.card-top {
  background: #f7f8f9;
  padding: 16rpx 24rpx;

  .recover-btn {
    font-size: 26rpx;
    color: #ffffff;
    background: #f4b935;
    height: 48rpx;
    line-height: 48rpx;
    padding: 0rpx 24rpx;
    border-radius: 254rpx;
  }
}
.sw-main {
  height: 144rpx;
  background: transparent;
  border-radius: 0 0 16rpx 16rpx;
  .sw-item {
    height: 144rpx;
    background: #fff;
    padding: 24rpx;
    .item-img {
      width: 96rpx;
      height: 96rpx;
      border-radius: 16rpx;
      background: #f7f8f9;
      border: 1rpx solid #f1f1f1;
    }
    .item-send-info {
      height: 100%;
      margin-left: 16rpx;
      color: #666666;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-items: center;
    }
  }
}
</style>