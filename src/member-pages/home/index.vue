/* 会员首页 */
<template>
  <view class="member-home-out">
    <button @tap="toMemberFit">会员权益</button>
    <view>2</view>
    <button @tap="toMemberRule">会员规则</button>
    <!-- 弹窗 -->
    <u-popup :show="showTip" mode="center" :round="20">
      <view class="wrapper">
        <view class="wrapper-block">
          <image
            :src="getImgUrl('member/bg-icon/glod-bg-icon.png')"
            mode="widthFix"
            class="top-glod"
          />
          <view class="block">
            <image
              :src="getImgUrl(imgBase + 'miniprogram-go-member-glod-res.png')"
              mode="widthFix"
              class="top-cent-glod"
            />
            <!-- 内容 -->
            <view class="d-flex-cloum-center color-black">
              <view class="slogan-title"> 入会奖励 </view>
              <view class="slogan-integral">
                <text class="add-icons">+</text
                ><text class="add-icons-num">{{ "400" }}</text>
                <view class="integral-num">
                  <text class="add-icon">+</text>{{ "400" }}
                </view>
              </view>
              <view class="slogan-tips"> 恭喜你获得积分，请尽快使用~ </view>
              <view class="slogan-btn" @tap="onClickHide"> 我知道了 </view>
            </view>
          </view>
          <image
            :src="getImgUrl(imgBase + 'miniprogram-go-member-slogan-close.png')"
            mode="widthFix"
            class="slogan-close-icon"
            @tap="onClickHide"
          />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      imgBase: "https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/", //图片基础路径
      showTip: true, //弹窗显示
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: { 
    /* 我知道了 */
    onClickHide() {
      this.showTip = false;
    },
    /* 会员权益 */
    toMemberFit() {
      uni.navigateTo({
        url: "/member-pages/benefit/index",
      });
    },
    /* 会员规则 */
    toMemberRule() {
      uni.navigateTo({
        url: "/member-pages/member-rule/index",
      });
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.member-home-out {
  background: #f00;
}

//弹窗
.wrapper {
  display: flex;
  z-index: 102;
  align-items: center;
  justify-content: center;
  width: 534rpx;
  height: 536rpx;
  //   height: 100%;
}

.wrapper-block {
  width: 534rpx;
  height: 536rpx;
  position: relative;
  z-index: 102;
}

.block {
  width: 534rpx;
  height: 536rpx;
  background-color: #fff;
  border-radius: 40rpx;
  position: absolute;
  z-index: 104;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 90rpx 0 48rpx 0;
}

.top-glod {
  /* z-index: 1; */
  position: absolute;
  top: 0;
  left: 0rpx;
  transform: translate(0, -50%);
}

.top-cent-glod {
  z-index: 104;
  width: 120rpx;
  height: 120rpx;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.color-black {
  color: #1d1f23;
}

.slogan-title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
}

.add-icon {
  font-size: 50 rpx;
  font-weight: bold;
}

.add-icons {
  font-size: 50 rpx;
  font-weight: bold;
  color: transparent;
}

.add-icons-num {
  color: transparent;
}

.integral-num {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 105;
}

.slogan-integral {
  font-size: 76rpx;
  position: relative;
  color: #25242b;
}

.slogan-integral::after {
  position: absolute;
  bottom: 14rpx;
  left: 0;
  z-index: 100;
  content: "";
  width: 100%;
  height: 16rpx;
  background-color: #f4daa4;
}

.slogan-tips {
  margin-top: 32rpx;
  margin-bottom: 64rpx;
  font-size: 28rpx;
  color: #999999;
  font-weight: 500;
}

.slogan-btn {
  width: 406rpx;
  height: 96rpx;
  background: linear-gradient(90deg, #ffe9c5 0%, #ffd690 100%);
  border-radius: 48rpx 48rpx 48rpx 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 36rpx;
  color: #533417;
}

.slogan-close-icon {
  width: 96rpx;
  height: 96rpx;
  position: absolute;
  bottom: -144rpx;
  left: 50%;
  transform: translateX(-50%);
}
.d-flex-cloum-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>