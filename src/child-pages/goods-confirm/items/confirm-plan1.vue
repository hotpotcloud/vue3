// 配送计划
<template>
  <view class="plan-out">
    <view class="d-flex-center d-sb top">
      <view class="h-font-30">{{
        res.planName ? res.planName : "配送计划"
      }}</view>
      <view
        class="d-flex-center font-26-33"
        @tap="onClickPlan"
        v-if="res.planName"
      >
        <u-icon name="arrow-right" color="#999999" />
      </view>
    </view>

    <view>
      <view class="d-flex-center d-sb plan-3">
        <view @tap.stop="onPlan(DeliveryPlanEnum.HowLong)">
          <PlanCardItem :nomalColor="res.howTime ? '#333333' : ''">
            <view>
              <text>{{ res.howTime ? res.howTime : "请选择" }}</text>
            </view>
            <view slot="tips">多久送一次</view>
          </PlanCardItem>
        </view>

        <view @tap.stop="onPlan(DeliveryPlanEnum.HowTime)">
          <PlanCardItem :nomalColor="res.timeSectionName ? '#333333' : ''">
            <view>
              <text>{{
                res.timeSectionName ? res.timeSectionName : "请选择"
              }}</text>
            </view>
            <view slot="tips">怎么送</view>
          </PlanCardItem>
        </view>
        <view @tap.stop="onPlan(DeliveryPlanEnum.EveryNum)">
          <!-- 每次送几 -->
          <PlanCardItem :nomalColor="res.everyNum ? '#333333' : ''">
            <view>
              <text>{{
                res.everyNum ? `${res.everyNum}${res.unit}` : "请选择"
              }}</text>
            </view>
            <view slot="tips">{{ `每次送几${res.unit}` }}</view>
          </PlanCardItem>
        </view>
      </view>

      <!-- 配送地址 -->
      <view @tap.stop="onPlan(DeliveryPlanEnum.Where)">
        <!-- 有地址 -->
        <view v-if="res.addressDTO.receiver">
          <hAddressItem :addressInfo="res.addressDTO" />
        </view>
        <!-- 无地址 -->
        <view class="plan-1 d-flex-center d-center" v-else>
          <PlanCardItem iconSize="13">
            <view slot="tips" class="null-address"> 请添加配送地址 </view>
          </PlanCardItem>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { DeliveryPlanEnum, ruleTypeEnum } from "@/utils/enum";
import PlanCardItem from "./plan-item.vue";
import hAddressItem from "@/child-pages/components/h-address-item/index.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    unit: {
      //单位
      type: "String",
      default: "瓶",
    },
    res: {
      type: Object,
      default: {},
    },
  },
  components: {
    PlanCardItem,
    hAddressItem,
  },
  data() {
    return {
      DeliveryPlanEnum,
      howTime: "",
      units: "瓶",
    };
  },
  created() {},
  computed: {
    // plan() {
    //   console.log("this.res", this.res);
    //   const planList = this.res;
    //   // this.units = goodsInfoList[0].goodsInfoList.unitName;
    //   // let { ruleType, ruleTypeName } = planList;
    //   if (planList.ruleType === this.ruleTypeEnum.TERTIAN_DAYS) {
    //     planList.ruleTypeName = `隔${planList.intervalDate}日送`;
    //   } else if (planList.ruleType === this.ruleTypeEnum.WEEK_DAYS) {
    //     planList.ruleTypeName = `星期${
    //       planList.deliveryDetails ? planList.deliveryDetails : ""
    //     }送`;
    //   }
    //   this.howTime = planList.ruleTypeName;
    //   return planList;
    // },
  },
  methods: {
    /**
     * @name 选择配送
     * @param type(Howlong:多久送一次；Howtime:什么时段送；Everynum:每次送多少)
     */
    onPlan(type) {
      this.$emit("onPlanItem", type);
    },
    //  计划名点击
    onClickPlan() {
      // 配送计划列表页
      uni.navigateTo({
        url: "/subPages/distribution/programList/programListPage?type=" + true,
      });
      console.log("点击计划名");
    },
    // // 点击地址
    // onClickAddress() {
    //   this.$emit("onClickAddress");
    // },
  },
};
</script>

<style scoped lang="scss">
.plan-out {
  background: #fff;
  padding: 24rpx 32rpx;
  border-radius: 24rpx;
  margin-bottom: 16rpx;
  .top {
    padding-bottom: 18rpx;
    margin-bottom: 16rpx;
    border-bottom: 2rpx dashed #f1f1f1;
  }
  .plan-3 {
    @extend .top;
    color: #999999;
  }
  .plan-1 {
    color: #999999;
  }
  .plan-active {
    color: #333333;
    font-size: 24rpx;
  }
  .plan-4 {
    font-weight: bold;
  }
  .null-address {
    color: #a9a9a9;
    font-size: 26rpx;
  }
}
</style>
