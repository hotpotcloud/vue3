<template>
  <view class="agree-out">
    <!-- <custom></custom> -->
    <agreeModel
      :onNeed="false"
      :hideTabBar="true"
      agreeBtnText="同意并继续"
      disagreeBtnText="不同意"
      @disagree="disagreeApp"
      @agree="agreeApp"
    ></agreeModel>
  </view>
</template>

<script>
import agreeModel from "@/components/agree-model/index.vue";
export default {
  components: {
    agreeModel,
  },
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    // console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    disagreeApp() {
      uni.exitMiniProgram();
    },
    agreeApp() {
      uni.navigateBack();
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.agree-out {
  background: #fff;
  width: 100%;
  height: 100vh;
}
</style>