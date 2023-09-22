<template>
  <view class="page"> <rich-text :nodes="text"></rich-text></view>
</template>
<script>
import Vue from "vue";
import {Setting} from "@/utils/url";
import Api from "@/utils/api";
import {mapState} from "vuex";
export default Vue.extend({
  data() {
    return {
      text: "",
    };
  },
  onLoad(options) {
    if (options.shop) {
      this.getShopAgreement();
      uni.setNavigationBarTitle({
        title: "自提服务协议",
      });
    } else {
      let type = options.type || 2; //协议类型
      uni.setNavigationBarTitle({
        title: type == 1 ? "小优天天赚用户协议" : "协议说明",
      });
      this.getAgreement(type);
    }
  },
  computed: {},

  methods: {
    //获取协议
    async getAgreement(type) {
      let {data} = await Api.$getX(`${Setting.agreement}/${type}`);
      this.text = data?.agreementText;
    },
    async getShopAgreement() {
      let {data} = await Api.$get(`${Setting.selfPickupProtocol}`);
      this.text = data?.content;
    },
  },
});
</script>
<style scoped lang="scss">
.page {
  background: #fff;
  padding: 30rpx;
}
</style>
