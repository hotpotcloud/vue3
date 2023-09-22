<!--
 * @Date: 2022-08-10 17:44:16
 * @LastEditors: ''
 * @LastEditTime: 2022-09-08 22:47:12
 * @FilePath: \xianhuo-miniprogram\src\subPages\address\addressAdd.vue
-->
<template>
  <view>
    <hAddress :addressForm="addressForm" ref="address" />
    <view class="btn-box">
      <button class="btn-submite" @click="saveAddress" :loading="loading">
        保存
      </button>
    </view>
  </view>
</template>

<script>
import hAddress from "../components/h-address/h-address.vue";
import { address } from "@/utils/url";
import { Sex, typeNameEnum } from "@/utils/enum";
import { mapActions, mapState, mapMutations } from "vuex";
// import { typeNameEnum } from "@/utils/enum";
export default {
  components: {
    hAddress,
  },
  data() {
    return {
      loading: false,
      type: "", //新加类型，判断页面来源
      addressForm: {
        receiver: "",
        receiverPhone: "",
        address: "",
        addressNo: "",
        label: "HOME",
        defaulted: true,
        sex: Sex.MAN,
      },
    };
  },
  onLoad(query) {
    console.log("query", query);
    this.type = query.type;
  },
  onHide() {},
  computed: {
    ...mapState("plan", ["planInfo", "count"]), //判断是否更新
  },
  methods: {
    ...mapActions("home", ["X_getAddressList"]),
    ...mapActions("plan", ["V_putAddPlan"]),
    // 配送计划优化
    ...mapMutations("plan", [
      "V_setPrarmsAddress",
      "V_setAsyncPlanInfo",
      "V_setCount",
    ]),
    // saveAddress
    toast(title, icon = "none", duration = 2000) {
      return new Promise(() => {
        uni.showToast({
          title,
          icon,
          duration,
        });
      });
    },
    async saveAddress() {
      try {
        this.loading = true;
        const info = await this.$refs.address.getAddressInfo();
        const para = { ...info };
        para.defaulted = info.defaulted ? 1 : 0;
        console.log(para, "请求参数");

        const { data, msg } = await this.POST(address.addressAdd, para);
        // uni.showToast({
        //   icon: "none",
        //   title: "保存成功",
        //   duration: 3000,
        // });
        this.toast("保存成功");
        // fc07-配送计划
        if (this.type === "plan" && data) {
          this.V_setCount(typeNameEnum.ruleAddress);
          this.V_setPrarmsAddress(data);
          this.V_setAsyncPlanInfo({
            addressDTO: data,
          });
          console.log("this.count", this.count);

          if (this.planInfo.deliveryPlanCode || this.count.length === 4) {
            this.V_putAddPlan(this.planInfo.deliveryPlanCode ? true : false);
          }
        }
        setTimeout(() => {
          uni.navigateBack({
            delta: -1,
            success: () => {
              //更新地址列表
              this.X_getAddressList();
              // fc07-配送计划
              // if (this.type === "plan" && data) {
              //   // this.V_setCount(typeNameEnum.ruleAddress);
              //   // this.V_setPrarmsAddress(data);
              //   // this.V_setAsyncPlanInfo({
              //   //   addressDTO: data,
              //   // });
              //   console.log("this.count", this.count);
              //   // 更新
              //   if (this.planInfo.deliveryPlanCode || this.count.length === 4) {
              //     this.V_putAddPlan(
              //       this.planInfo.deliveryPlanCode ? true : false
              //     );
              //   }
              // }
            },
          });
        }, 1500);
      } catch (err) {
        console.log("err", err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
// ::v-deep .u-transition {
//   width: 132rpx;
//   height: 65rpx;
//   text-align: center;
// }

.btn-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 228rpx;
  background: #fff;
  font-size: 34rpx;
}
.btn-submite {
  background: #1d9bdc;
  border-color: #1d9bdc;
  width: 670rpx;
  height: 104rpx;
  line-height: 104rpx;
  margin-top: 32rpx;
  text-align: center;
  color: #fff;
  border-radius: 254rpx;
  margin: 0 auto;
}
</style>
