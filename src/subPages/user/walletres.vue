<template>
  <view class="result-page">
    <!-- <h-none
      :cover="cover"
      :title="title"
      :note="note"
      :backBtn="backBtn"
      :forwardBtn="forwardBtn"
      :backUrl="backUrl"
      :forwardUrl="forwardUrl"
    ></h-none> -->
    <empty-data
      :text="note"
      type="success"
      btnText="返回"
      statusText="支付成功"
      @onBack="onBack"
    />
  </view>
</template>
<script>
import hNone from "@/components/h-none/h-none.vue";
import EmptyData from "./components/Empty-Data.vue";
export default {
  components: { hNone, EmptyData },
  data() {
    return {
      cover:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/20220729-111926.gif",
      title: "支付成功",
      note: "账单支付成功，一起畅快的喝奶吧～",
      backBtn: "none",
      forwardBtn: "查看账单",
      backUrl: "/pages/homepage/homepage",
      forwardUrl: "/subPages/user/wallet",
    };
  },
  methods: {
    onBack() {
      uni.navigateBack({delta:1});
    },
  },
};
</script>
<style scoped lang="scss">
.result-page {
  height: 100vh;
}
</style>
