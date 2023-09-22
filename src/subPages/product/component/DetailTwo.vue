<template>
  <!-- 优惠券模块 -->
  <view
    class="detail-two-out"
    v-if="show && (gift.length || full.length || (coupon.length && couponShow))"
    @tap.stop="clickTicket"
  >
    <!-- 优惠券 -->
    <view class="d-flex-center margin-bot18" v-if="couponShow && coupon.length">
      <view class="ticket-tag">领券</view>
      <view class="flex0-1 d-flex-center d-sb">
        <view class="flex0-1">
          <view class="tag_test_1">
            <view
              v-for="(i, idx) in coupon"
              :key="idx"
              class="flex0-1 tag_1_detail"
              >{{ i }}
            </view>
          </view>
        </view>
        <uni-icons type="right" size="12"></uni-icons>
      </view>
    </view>
    <!-- 满赠 -->
    <view class="d-flex-center margin-bot18" v-if="gift.length">
      <view class="ticket-tag">满赠</view>
      <view class="h-over-1 flex0-1">
        <text v-for="(t, index) in gift" :key="index"
          >{{ t
          }}{{ gift.length > 1 && gift.length > index + 1 ? "，" : "" }}</text
        >
      </view>
    </view>
    <!-- 满减 -->
    <view class="d-flex-center" v-if="full.length">
      <view class="ticket-tag">满减</view>
      <view class="h-over-1 flex0-1">
        <text v-for="(t, index) in full" :key="index"
          >{{ t
          }}{{ full.length > 1 && full.length > index + 1 ? "，" : "" }}</text
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    couponShow: {
      type: Boolean,
      default: false,
    },
    // 优惠券
    coupon: {
      type: Array,
      default: () => [],
    },
    //满减
    full: {
      type: Array,
      default: () => [],
    },
    //满赠
    gift: {
      type: Array,
      default: () => [],
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
    clickTicket() {
      console.log("2", 2);
      this.$emit("clickTicket");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.detail-two-out {
  background: #fff;
  padding: 24rpx 40rpx;
}
.margin-bot18 {
  margin-bottom: 18rpx;
}
.ticket-tag {
  border-radius: 8rpx;
  padding: 0 8rpx;
  background: rgba(248, 108, 77, 0.1);
  color: #f86c4d;
  font-size: 22rpx;
  line-height: 32rpx;
  height: 34rpx;
  margin-right: 24rpx;
}
.tag_1_detail {
  border-radius: 8rpx;
  display: inline-block;
  background: #fff;
  height: 32rpx;
  line-height: 32rpx;
  font-size: 22rpx;
  color: #f86c4d;
  margin-right: 8rpx;
  border: 1rpx solid #f86c4d;
  padding: 0 8rpx;
}
.tag_test_1 {
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: scroll;
}
</style>