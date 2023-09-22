<template>
  <view class="staic-out">
    <!-- 长按识别 -->
    <image
      class="static-img"
      :src="currentBanner.staticPic"
      mode="widthFix"
      show-menu-by-longpress="true"
    />
  </view>
</template>

<script>
// 静态页
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("xiaoyou", ["currentBanner"]),
  },
};
</script>

<style lang="scss" scoped>
.static-out {
  width: 100%;
  min-height: 100vh;
  overflow: auto;
}
.static-img {
  width: 100%;
  height: 100%;
}
</style>
