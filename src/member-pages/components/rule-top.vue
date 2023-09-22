/* 会员规则-规则介绍-顶部 */
<template>
  <view class="rule-components-item d-flex">
    <image :src="getImgUrl(svgtext)" mode="heightFix" class="svg-text" />

    <view v-for="(el, index) in numList" :key="index" class="rule-item">
      <!-- <image :src="getImgUrl(svgtext)" mode="heightFix" class="user-photo" /> -->
      <view class="user-photo" v-if="el.sort === level">
        <u-avatar :src="pic" shape="circle" size="24"></u-avatar>
      </view>
      <view
        :class="[
          'rule-components-item__score',
          el.sort > level && 'rule-components-item__label_no',
        ]"
        >{{ el.growthValue }}</view
      >
      <view class="pillar" :style="[calcHeight(el.sort, level)]"> </view>
      <view
        :class="[
          'rule-components-item__label',
          el.sort > level && 'rule-components-item__label_no',
        ]"
        >Lv{{ el.sort }}</view
      >
    </view>
  </view>
</template>

<script>
import { BaseApp } from "@/const/appIdConf";
export default {
  props: {
    pic: {
      type: String,
      default: BaseApp.nullUser, //默认用户头像
    },
    level: {
      type: Number,
      default: 1,
    },
    numList: {
      type: Array,
      default: () => [], //
    },
  },
  components: {},
  data() {
    return {
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      text: "无头像",
      svg: "member/bg-icon/tip-text.svg",
      svgtext: "member/bg-icon/text-member.png",
    };
  },
  computed: {
    // 计算不同等级展示高度
    calcHeight() {
      /* level:用户等级 */
      return (id, level = 1) => {
        const base = [24, 60, 96, 162, 234, 312, 382, 421]; // Height of pillars in rpx.
        return {
          height: base[id - 1] + "rpx", // Height of pillars in pixels.
          opacity: Number(level) >= Number(id) ? 1 : 0.3,
        };
      };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {},
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.rule-components-item {
  height: 494rpx;
  background: linear-gradient(180deg, #2d2d2d 0%, #1b1917 100%);
  color: #e8c5a4;
  // display: grid;
  // grid-template-columns: repeat(6, 1fr);
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  position: relative;
  padding-bottom: 38rpx;
}
.svg-text {
  position: absolute;
  top: 90rpx;
  left: 52rpx;
  height: 56rpx;
}
.rule-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-photo {
    border-radius: 50%;
    overflow: hidden;
    border: 4rpx solid #fff;
    width: 48rpx;
    height: 48rpx;
    margin-bottom: 16rpx;
  }
  .pillar {
    width: 24rpx;
    height: 96rpx;
    background: #e8c5a4;
    // background: #fff;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    margin: 8rpx 0;
  }
  .rule-components-item__score {
    border-radius: 18rpx 18rpx 18rpx 18rpx;
    background: #393531;
    height: 36rpx;
    text-align: center;
    line-height: 36rpx;
    color: #e8c5a4;
    padding: 0 14rpx;
  }
  .rule-components-item__label_no {
    opacity: 0.3;
  }
  .rule-components-item__label {
    color: #fff;
    font-weight: bold;
  }
}
</style>