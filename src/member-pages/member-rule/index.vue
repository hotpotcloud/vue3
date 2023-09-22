/* 会员规则 */
<template>
  <view class="member-rule-out">
    <!-- 用户等级柱状图 -->
    <ruleTop
      :pic="memberRule.wxAvatarUrl"
      :level="memberRule.level"
      :numList="memberRule.configInfos"
    />
    <!-- 规则详情 -->
    <view class="rule-main">
      <view class="main-item">
        <view
          class="base-view"
          v-for="(val, i) in memberRule.levelDescItem"
          :key="i"
        >
          <view class="state-top">{{ sb[val.levelDescType] }}</view>
          <view>
            <rich-text :nodes="val.levelDesc"></rich-text>
          </view>
        </view>

        <!-- <view class="base-view">
          <view class="state-top">等级有效期</view>
          <view> </view>
        </view>

        <view class="base-view">
          <view class="state-top">积分规则</view>
          <view></view>
        </view> -->
      </view>
    </view>
    <view
      class="btn-fix"
      hover-class="hover-style"
      hover-stay-time="500"
      @tap="toBuy"
    >
      加速升级，去下单
    </view>
  </view>
</template>

<script>
import ruleTop from "@/member-pages/components/rule-top.vue";
import { mapState } from "vuex";
export default {
  components: {
    ruleTop,
  },
  data() {
    return {
      sb: {
        LEVEL_RULES: "成长值规则说明",
        LEVEL_EXPIRATION_DATE: "等级有效期",
        GROWTH_AND_SCORE: "积分规则",
      },
    };
  },
  computed: {
    ...mapState("member", ["memberRule", "memberInfoFc09"]),
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    /* 去下单 */
    toBuy() {
      uni.switchTab({
        url: "/pages/product/product",
      });
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.member-rule-out {
  height: 100vh;
  overflow: auto;
}
.rule-main {
  height: calc(100vh - 484rpx);
  background: linear-gradient(180deg, #1b1917 0%, #2d2d2d 100%);
  .main-item {
    height: 100%;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    background: #fff;
    overflow: auto;
    padding: 32rpx;
    padding-bottom: 180rpx;
  }
  .base-view {
    margin-bottom: 48rpx;
  }
  .state-top {
    padding-left: 24rpx;
    font-size: 30rpx;
    color: #000000;
    margin-bottom: 24rpx;
    position: relative;
    &::before {
      content: "";
      width: 8rpx;
      height: 28rpx;
      background: #e7b25b;
      position: absolute;
      top: 8rpx;
      left: 8rpx;
      border-top-right-radius: 14rpx;
      border-bottom-right-radius: 14rpx;
    }
  }
}
.btn-fix {
  position: fixed;
  bottom: 88rpx;
  width: 630rpx;
  height: 68rpx;

  line-height: 68rpx;
  text-align: center;
  transform: translateX(60rpx);
  border-radius: 34rpx 34rpx 34rpx 34rpx;
  color: #533417;
  font-size: 28rpx;
  font-weight: bold;
  background: linear-gradient(90deg, #ffe9c5 0%, #ffd690 100%);
}
.hover-style {
  background: linear-gradient(180deg, #ffe9c5 0%, #ffd690 100%);
  color: #666;
  // opacity: 0.5;
}
</style>