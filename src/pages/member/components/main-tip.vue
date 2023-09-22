<template>
  <view class="main-tip-out d-flex-center d-center">
    <img
      :src="getAssetImgUrl(leftIcon)"
      alt=""
      class="icon-img"
      mode="widthFix"
    />
    <view class="tip-name"> {{ name }}</view>
    <img
      :src="getAssetImgUrl(rightIcon)"
      alt=""
      class="icon-img"
      mode="widthFix"
    />
  </view>
</template>

<script>
export default {
  props: {
    name: {
      default: "新手任务",
      type: String,
    },
  },
  components: {},
  data() {
    return {
      // 左边icon
      leftIcon: "member/union-left.png",
      // 右边icon
      rightIcon: "member/union-right.png",
    };
  },
  computed: {},
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
.main-tip-out {
  .icon-img {
    width: 110rpx;
  }
  .tip-name {
    font-size: 30rpx;
    font-weight: bold;
    background-image: linear-gradient(90deg, #7f5b29 0%, #533417 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 26rpx;
  }
}
</style>