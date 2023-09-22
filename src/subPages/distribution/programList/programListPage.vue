<template>
  <view>
    <view v-if="loading">
      <view class="container-e" v-if="show">
        <!-- :style="{
            height: item.defaulted ? '472rpx' : '400rpx',
          }" -->
        <view
          class="card-view"
          v-for="item in projectList"
          :key="item.deliveryPlanCode"
          @tap.stop="clickCard(item)"
        >
          <img
            v-if="item.defaulted"
            class="imgStyle-tacitly"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/check.svg"
            alt=""
          />
          <view class="card-title">{{ item.planName }}</view>
          <view class="card-content">
            <view class="card-content-title"
              >{{ showDeliveryRule(item) }}&nbsp;|&nbsp;{{
                item.timeSectionName
              }}&nbsp;|&nbsp;每次{{ item.everyNum }}瓶</view
            >
            <view class="card-userinfo">
              <text>{{ item.receiverName }}</text
              ><text :style="{ 'margin-left': '16rpx' }">{{
                item.receiverPhone
              }}</text>
            </view>
            <view class="card-site h-overflow-8-2">
              {{ item.addressDetails }}
            </view>
            <view class="remark" v-if="item.defaulted">
              *该计划是根据您下单习惯自动生成
            </view>
          </view>
          <view class="car-bottom d-flex-center">
            <view class="icon-view d-flex-center" @tap.stop="compile(item)">
              <img
                class="imgStyle"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/compile.png"
                alt=""
              />
              <text :style="{ 'margin-left': '4rpx' }">编辑</text>
              <!-- <text :style="{ 'margin-left': '4rpx' }">编辑</text> -->
            </view>
            <view
              class="icon-view d-flex-center"
              @tap.stop="remove(item.deliveryPlanCode)"
            >
              <img
                class="imgStyle"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/delete.png"
                alt=""
              />
              <!-- <text :style="{ 'margin-left': '4rpx', 'margin-top': '-3rpx' }"
                >删除</text
              >   -->
              <text>删除</text>
            </view>
          </view>
        </view>

        <view class="empyt-view"></view>

        <view class="bottom-view">
          <view class="bottom-button" @click="addProject">新增计划</view>
        </view>

        <uni-popup ref="popup" background-color="#999999" @change="change">
          <view
            class="popup-content-view"
            :class="{ 'popup-height': type === 'left' || type === 'right' }"
          >
            <view class="affirm-text">确认删除该计划？</view>
            <view class="affirm-button-view">
              <view class="cancel-btn" @click="cancel">取消</view>
              <view class="affirm-btn" @click="deleteProgarm">删除</view>
            </view>
          </view>
        </uni-popup>
      </view>
      <view v-else><emptyPlan /></view>
    </view>
  </view>
</template>

<script>
import Vue from "vue";
import emptyPlan from "../emptyPlan.vue";
import { distributionUrl } from "@/utils/url";
import { AlterORCrtate, ruleTypeEnum } from "@/utils/enum";
import { mapMutations, mapActions, mapState } from "vuex";
export default Vue.extend({
  components: {
    emptyPlan,
  },
  data() {
    return {
      loading: false,
      params: "",
      planCode: "",
      types: false,
      show: true,
      initPar: {
        page: 1,
        size: 10,
        addressNo: "",
      },
      type: "",
    };
  },
  computed: {
    ...mapState("distribution", ["projectList", "total"]),
    ...mapState("order", ["orderUrl"]),
  },

  onShow() {
    this.initPar.page = 1;
    this.M_setProjectList([]);
    this.loading = false;
    this.getList();
  },
  onLoad(option) {
    console.log("option", option);
    if (option.type) {
      this.type = option.type; //判断上一页来源
      this.V_setOrderUrl(true);
    }
  },
  onReachBottom() {
    console.log("1到底了");

    if (this.total > this.projectList.length) {
      this.initPar.page++;
      this.getList();
    } else {
      console.log("到底了");
    }
  },
  // beforeDestroy() {
  //   console.log("离开页面>>>");
  //   wx.enableAlertBeforeUnload({
  //     // message: "Are you sure you want to leave?",
  //     success(res) {
  //       uni.showModal({
  //         title: "是否离开",
  //         cancelText: "取消",
  //         confirmText: "保存",
  //       });
  //       console.log("success:", res);
  //     },
  //     fail(res) {
  //       console.log("fail:", res);
  //     },
  //     complete(res) {
  //       console.log("complete:", res);
  //     },
  //   });
  // },
  // onUnload() {},
  methods: {
    ...mapActions("distribution", ["A_getProjectList"]),
    ...mapMutations("distribution", ["M_setEditData", "M_setProjectList"]),
    ...mapActions("order", ["X_getOrderPlanData"]),
    ...mapMutations("order", ["V_setorderPar", "V_setOrderUrl"]),
    ...mapActions("milkcard", ["post_CardExchange"]),
    change(e) {
      console.log(e);
    },
    async getList() {
      // const param = {
      //   addressNo: "",
      //   page: 1,
      //   size: "",
      // };
      await this.A_getProjectList(this.initPar);
      this.loading = true;
      if (this.projectList.length === 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    },

    compile(val) {
      val.planRuleNo = val.deliveryPlanCode;
      console.log("val-->1", val);
      this.M_setEditData(val);
      uni.navigateTo({
        url: `/subPages/distribution/programList/compileProgram`,
      });
    },
    remove(val) {
      console.log(val);
      this.params = val;
      this.$refs.popup.open("center");
    },
    cancel() {
      this.$refs.popup.close();
    },
    deleteProgarm() {
      this.DELETE(distributionUrl.deletePlan + this.params).then((res) => {
        this.initPar.page = 1;
        this.getList();
        this.$forceUpdate(); //强制刷新
        this.$refs.popup.close();
      });
    },
    addProject() {
      const param = AlterORCrtate.CREATE;
      // if(this.orderUrl){
      //   uni.
      // }
      uni.navigateTo({
        url: `/subPages/distribution/createdPlan/components/everyDayComp?param=${param}`,
      });
    },

    insertStr(source, start, newStr) {
      return source.slice(0, start) + newStr + source.slice(start);
    },
    showDeliveryRule(item) {
      switch (item.ruleType) {
        case ruleTypeEnum.EVERY_DAYS:
          return item.ruleTypeName;
        case ruleTypeEnum.WEEK_DAYS:
          return `${item.ruleTypeName}(${item.deliveryDetails})`;
        case ruleTypeEnum.TERTIAN_DAYS:
          return this.insertStr(item.ruleTypeName, 1, item.intervalDate);
        default:
          return item.ruleTypeName;
      }
    },
    clickCard(val) {
      console.log("val", val, this.type);
      // return;
      this.planCode = val.deliveryPlanCode;
      if (this.orderUrl && this.type === "plan") {
        const par = {
          deliveryPlanCode: val.deliveryPlanCode,
        };
        this.V_setorderPar(par);
        // const page = getCurrentPages();
        // console.log("page", page);
        // let i = 1;
        // page.forEach((el, index) => {
        //   if (el.route === "subPages/order/orderConfirm") {
        //     console.log("index", index);
        //     i = index;
        //   }
        // });
        uni.navigateBack({
          delta: 1,
          success: () => {
            console.log("跳转成功2", "");
            this.V_setOrderUrl(false);
            this.X_getOrderPlanData(par); //修改配送计划
          },
          fail: (re) => {
            console.log("re跳转", re);
          },
        });
      }
      const routeType = "orderCofirm";

      if (this.types === routeType) {
        console.log("val", val);
        const par = {
          deliveryPlanCode: val.deliveryPlanCode,
        };
        this.V_setorderPar(par);
        // this.X_getOrderPlanData(par);
        uni.navigateBack({
          delta: -1,
          success: this.X_getOrderPlanData(),
        });
      }

      // fc06奶卡
      if (this.type === "milkcard") {
        const par = {
          deliveryPlanCode: val.deliveryPlanCode,
        };

        uni.navigateBack({
          delta: -1,
          success: this.post_CardExchange(par),
        });
      }
    },
  },
});
</script>

<style scoped>
.container-e {
  width: 750rpx;
  min-height: 100vh;
  background: #f5f5f5;

  overflow-y: scroll;
}
.card-view {
  margin-top: 24rpx;
  margin-left: 28rpx;
  width: 694rpx;
  background-color: white;
  border-radius: 24rpx;
  /* padding-left: 32rpx;
  padding-right: 32rpx; */
  position: relative;
  /* background: #333; */
  padding: 26rpx 32rpx 86rpx;
}
.imgStyle-tacitly {
  border: none;
  position: absolute;
  right: -36rpx;
  top: -32rpx;
  width: 200rpx;
  height: 156rpx;
}
.card-title {
  font-weight: 500;
  font-size: 30rpx;
  font-weight: bold;
  width: 100%;
  padding-bottom: 20rpx;
  /* height: 88rpx; */
  border-bottom: 1px solid #f1f1f1;
  /* display: flex;
  align-items: center; */
}
.card-content {
  min-height: 146rpx;
  max-height: 290rpx;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
}
.card-content-title {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
  font-size: 30rpx;
  color: #666666;
  font-weight: bold;
}
.card-userinfo {
  height: 40rpx;
  display: flex;
  align-items: center;
  margin-top: 24rpx;
  font-size: 28rpx;
  color: #666666;
}
.card-site {
  margin-top: 24rpx;
  margin-bottom: 16rpx;
  font-size: 28rpx;
  color: #666666;
}
.remark {
  margin-bottom: 16rpx;
  color: #999999;
}
.popup-content-view {
  padding: 48rpx;
  width: 606rpx;
  height: 316rpx;
  border-radius: 40rpx !important;
  background: white;
}
.affirm-text {
  font-size: 32rpx;
  color: #000000;
  width: 100%;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.affirm-button-view {
  width: 100%;
  height: 120rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240rpx;
  height: 80rpx;
  border: 1px solid #1d9bdc;
  color: #1d9bdc;
  font-size: 34rpx;
  border-radius: 40rpx;
}
.affirm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240rpx;
  height: 80rpx;
  background-color: #1d9bdc;
  color: white;
  font-size: 34rpx;
  border-radius: 40rpx;
}
.car-bottom {
  /* background: #1d9bdc; */
  position: absolute;
  left: 32rpx;
  right: 32rpx;
  bottom: 0;
  z-index: 11;
  /* background: #1d9bdc; */
  display: flex;
  justify-content: space-between;
  height: 86rpx;
  /* padding-top: 24rpx; */
  align-items: center;
}
.icon-view {
  display: flex;
  /* background-color: #1d9bdc; */
  /* align-content: flex-start; */
  /* align-items: center; */
  font-size: 28rpx;
  color: #666666;
}
.imgStyle {
  margin-right: 4rpx;
  border: none;
  width: 32rpx;
  height: 32rpx;
}
.bottom-view {
  border-top: 1rpx solid #e5e5e5;
  height: 228rpx;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  /* position: absolute; */
  position: fixed;
  bottom: 0;
  z-index: 12;
}
.empyt-view {
  height: 260rpx;
  width: 100%;
  background-color: #f5f5f5;
}
.bottom-button {
  background-color: #1d9bdc;
  width: 670rpx;
  height: 104rpx;
  border-radius: 254rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 34rpx;
  margin-top: 32rpx;
}
</style>
