<template>
  <web-view :src="webUrl" />
</template>

<script>
export default {
  components: {},
  data() {
    return {
      webUrl: "",
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
    const url = unescape(options?.url);
    console.log(url, "解码二维码网址-webview");
    if (url) {
      this.webUrl = url;
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