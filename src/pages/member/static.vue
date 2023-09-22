<template>
  <!-- 静态图片 -->
  <view class="static-out">
    <image :src="urls" mode="widthFix" style="width: 100vw" lazy-load="true" />
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      urls: "",
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
    if (options.url) {
      this.urls = decodeURIComponent(options.url);
    }
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
</style>