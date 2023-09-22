<template>
  <!-- 会员头部信息 -->
  <view class="member-top">
    <view class="d-flex-center">
      <view class="member-top-userimg" @tap="onPhoto">
        <image
          v-if="isBlack"
          class="member-black-icon"
          :src="getAssetImgUrl('member/limit-black.png')"
          mode="aspectFill"
        />
        <image
          class="member-top-img"
          :src="getAssetImgUrl(headImg)"
          mode="aspectFill"
        ></image>
      </view>
      <view class="member-top-title flex-1 d-flex-center d-sb">
        <view class="d-flex-center" @tap="toMemberScore">
          <text>{{ nickName }}</text>
          <text class="border-row">|</text>
          <view class="member_score d-flex-center">
            <text>{{ score }}积分</text>
            <text class="arrow" :style="{ borderColor: borderColor }"></text>
          </view>
        </view>
        <view @tap="toMemberRule" class="member_rule">会员规则</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    // 黑名单
    isBlack: {
      type: Boolean,
      default: false,
    },
    //箭头颜色
    borderColor: {
      type: String,
      default: "#6A97C7",
    },
    //头像
    headImg: {
      type: String,
      default:
        "%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
    },
    //昵称
    nickName: {
      type: String,
      default: "",
    },
    //会员积分
    score: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      //默认头像
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onPhoto() {
      this.$emit("onPhoto");
    },
    //会员规则
    toMemberRule() {
      this.$emit("toMemberRule");
    },
    //积分明细
    toMemberScore() {
      this.$emit("toMemberScore");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.member-top {
  font-weight: bold;
  font-size: 28rpx;
}
.member-top-userimg {
  // width: 68rpx;
  // height: 68rpx;
  // border-radius: 50%;
  margin-right: 16rpx;
  // border: 2rpx solid #fff;
  position: relative;
  .member-black-icon {
    width: 28rpx;
    height: 28rpx;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(50%);
    z-index: 99;
  }
  .member-top-img {
    // overflow: hidden;
    border: 2rpx solid #fff;
    width: 68rpx;
    height: 68rpx;
    border-radius: 50%;
  }
}

.border-row {
  color: rgba(255, 255, 255, 0.5);
  width: 2rpx;
  margin: 0 16rpx;
}
.member_score .arrow {
  display: inline-block;
  margin-left: 8rpx;
  width: 14rpx;
  height: 14rpx;
  border-top: 2rpx solid #000;
  border-right: 2rpx solid #000;
  transform: rotate(45deg);
}
.member_rule {
  color: #ffffff;
  font-size: 24rpx;
  font-weight: normal;
  &::after {
    content: "";
    display: inline-block;
    margin-left: 8rpx;
    width: 12rpx;
    height: 12rpx;
    border-top: 2rpx solid #ffffff;
    border-right: 2rpx solid #ffffff;
    transform: rotate(45deg);
  }
}
</style>