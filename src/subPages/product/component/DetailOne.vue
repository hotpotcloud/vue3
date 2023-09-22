<template>
  <view class="detail-one-out">
    <!-- 秒杀倒计时 -->
    <h-spikeTime
      :show="showKill"
      :times="times"
      @onChange="onChange"
    ></h-spikeTime>
    <!-- 周期购 -->
    <view class="cycle-box" v-if="showCycle" @tap="onCycle">
      <image
        class="cycle-icon"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/cycle.png"
        mode="widthFix"
      />
    </view>
    <!-- 商品名+价格 -->
    <view class="product-name_price">
      <view class="main-size-30 top-name">
        <text class="seckill-tag" v-show="showSkillTag">秒杀</text>
        {{ spuName }}
      </view>
      <view class="d-flex-center d-sb">
        <view class="main-size-30 h-main-color" v-if="!showKill">
          {{ minMoney }}
          <text v-show="maxMoney">~{{ maxMoney }}</text>
        </view>
        <view @click="onXiaoShare">
          <image
            v-if="xiaoyouShow"
            class="xiaoyou-share"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/004share.png"
            mode="scaleToFill"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    //秒杀显示
    showKill: {
      type: Boolean,
      default: false,
    },
    //秒杀倒计时时间
    times: {
      type: Number | String,
      default: 0,
    },
    // 周期购显示
    showCycle: {
      type: Boolean,
      default: false,
    },
    spuName: {
      type: String,
      default: "",
    },
    minMoney: {
      type: String,
      default: "",
    },
    maxMoney: {
      type: String,
      default: "",
    },
    xiaoyouShow: {
      type: Boolean,
      default: false,
    },
  },
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
    //秒杀倒计时变化
    onChange(e) {
      this.$emit("onChange", e);
    },
    //周期够介绍点击
    onCycle() {
      this.$emit("onCycle");
    },
    // 小优分享
    onXiaoShare() {
      this.$emit("onXiaoShare");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.detail-one-out {
  padding: 16rpx 40rpx;
  background: #fff;
}
.xiaoyou-share {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
}
.cycle-box {
  .cycle-icon {
    border: none;
    // height: 64rpx !important;
    width: 100%;
  }
}
.product-name_price {
  margin-top: 16rpx;
  .top-name {
    font-weight: bold;
    font-size: 32rpx;
    margin-bottom: 16rpx;
    line-height: 44rpx;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    max-height: 96rpx;
  }
  .main-size-30 {
    font-size: 30rpx;
    font-weight: bold;
    color: #000000;
  }
}
</style>