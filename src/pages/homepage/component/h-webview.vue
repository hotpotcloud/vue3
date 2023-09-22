<template>
  <view>
    <!-- @message="getMessage" -->
    <web-view :src="urls"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      urls: "",
    };
  },
  onLoad(options) {
    console.log("options---百度牛奶", options);
    if (options && options.url) {
      this.urls = decodeURIComponent(options.url);
    }
  },
  // methods: {
  // 	getMessage(event) {
  // 		uni.showModal({
  // 			content: JSON.stringify(event.detail),
  // 			showCancel: false
  // 		});
  // 	}
  // }
};
</script>

<style>
</style>
