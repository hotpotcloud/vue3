<template>
  <view class="page">
    <image :src="ruleImg" mode="widthFix" style="width: 100vw"></image
  ></view>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
// import { conf } from "@/const/appIdConf";
// import { BASE_APPID_KEY } from "@/utils/config";
import { BaseApp } from "@/const/appIdConf";
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ruleImg: function () {
      return `https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/${BaseApp.ruleUrl}`;
    },
  },
});
</script>
<style scoped lang="scss">
.page {
  height: 100vh;
  background: #fffbed;
  // padding: 30rpx;
}
</style>
