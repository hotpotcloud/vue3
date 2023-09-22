// 配送计划
<template>
  <view class="plan-out">
    <view class="d-flex-center d-sb top" @tap.stop="onClickPlan">
      <view class="h-font-30">{{
        res.planName ? res.planName : "配送计划"
      }}</view>
      <view class="d-flex-center font-26-33" v-if="res.planName">
        <!-- @tap.stop="onClickPlan" -->
        <u-icon name="arrow-right" color="#999999" />
      </view>
    </view>

    <view>
      <view class="d-flex-center d-sb plan-3">
        <view @tap.stop="onPlan(DeliveryPlanEnum.HowLong)">
          <PlanCardItem :nomalColor="plan ? '#333333' : ''">
            <view>
              <text>{{ plan ? plan : "请选择" }}</text>
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
export default {
  props: {
    unit: {
      //单位
      type: String,
      default: "瓶",
    },
    res: {
      type: Object,
      default: {
        ruleTypeName: "",
        planName: "", //计划名
        howTime: "", //多久送一次
        timeSectionName: "", //什么时段送
        everyNum: "", //每次送多少-数量
        unitName: "", //每次送多少-单位
        addressDTO: {
          //用户地址信息
          addressNo: 11,
          labelName: "家",
          defaulted: 2,
          provinceCityArea: "四川省成都市锦江区",
          communityDoorCode:
            "锦江区中鼎国际1903号新锦江区中鼎国际1903号新希望耐久中心",
          receiver: "张三锦江区中鼎国际1903号新",
          receiverPhone: "13888888888",
        },
      },
    },
  },
  components: {
    PlanCardItem,
    hAddressItem,
  },
  data() {
    return {
      ruleTypeEnum,
      DeliveryPlanEnum,
      howTime: "",
      units: "",
    };
  },
  created() {},
  computed: {
    plan() {
      console.log("this.res--计算", this.res);
      let howTime = "";
      if (this.res) {
        const deliveryPlanResp = this.res;
        const { ruleType, ruleTypeName } = deliveryPlanResp;

        if (ruleType === this.ruleTypeEnum.TERTIAN_DAYS) {
          howTime = `隔${deliveryPlanResp.intervalDate}日送`;
        } else if (ruleType === this.ruleTypeEnum.WEEK_DAYS) {
          howTime = `星期${
            deliveryPlanResp.deliveryDetails
              ? deliveryPlanResp.deliveryDetails
              : ""
          }送`;
        } else {
          howTime = ruleTypeName;
        }
      }

      return howTime;
    },
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
      if (!this.res.planName) return;
      // 配送计划列表页
      uni.navigateTo({
        url:
          "/subPages/distribution/programList/programListPage?type=" +
          "milkcard",
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
