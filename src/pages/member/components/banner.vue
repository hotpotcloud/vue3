<template>
  <view class="banner-out" v-if="bannnerList.length">
    <!-- 轮播图配置 -->
    <swiper
      @change="changeSw"
      style="height: 138rpx"
      duration="500"
      easing-function="easeInCubic"
      indicator-dots
      indicator-active-color="#1D9BDC"
    >
      <swiper-item
        v-for="(child, index) in bannnerList"
        :key="index"
        class="sw_item"
        @tap="onClick(child)"
      >
        <image
          :src="getAssetImgUrl(child.picUrl)"
          mode="aspectFit"
          class="banner-img"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    bannnerList: {
      type: Array,
      default: () => [],
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
    changeSw(e) {
      this.$emit("onChange", e);
    },
    onClick(val) {
      console.log("val", val);
      this.$emit("onClick", val);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.banner-out {
  .banner-sw {
    height: 136rpx;
  }
  .banner-img {
    width: 100%;
    height: 136rpx;
    border-radius: 68rpx;
    // border: 1rpx solid #f00;
  }
}
</style>