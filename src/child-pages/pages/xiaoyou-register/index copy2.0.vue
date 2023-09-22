/**未注册小优 */
<template>
  <view>
    <Failed @onApplyXiaoyou="onApplyXiaoyou" />
  </view>
</template>

<script>
import Failed from "./components/failed.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    Failed,
  },
  data() {
    return {
      pid: "", //上级分销码
    };
  },
  async onShow() {
    // this.v_getXYcheck();
    await this.$onLaunched;
    this.init();
  },
  onLoad(option) {
    // this.init();
    console.log("option--分销员id", option);
    if (option.scene) {
      this.pid = option.scene;
      uni.setStorageSync("pid", option.scene);
      this.v_setDistId(option.scene);
    }
  },
  computed: {
    ...mapState("user", ["loginStatus"]),
    ...mapState("xiaoyou", ["xiaoyouInfo"]),
  },
  methods: {
    ...mapActions("xiaoyou", ["v_postApply", "v_getJionNum", "v_getXYcheck"]),
    ...mapActions("home", ["get_xiaoyouMoney"]),
    ...mapMutations("xiaoyou", ["v_setDistId"]),
    init() {
      // 获取排行榜和用户数
      this.v_getJionNum();
      //检查是否注册
      this.v_getXYcheck().then(() => {
        if (this.xiaoyouInfo.id) {
          uni.redirectTo({
            url: "/xiaoyouPages/home/index",
          });
        }
      });
    },
    onApplyXiaoyou() {
      console.log("2-申请成为鲜推官", this.loginStatus, this.pid);
      if (!this.loginStatus) {
        uni.navigateTo({
          url: "/pages/user/relogin",
        });
      } else {
        const pid = uni.getStorageSync("pid");
        const pids = {
          pid: this.pid ? this.pid : pid ? pid : null,
        };
        this.v_postApply(pids.pid ? pids : null);
        this.get_xiaoyouMoney(true);
        uni.redirectTo({
          url: "/xiaoyouPages/home/applying",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
