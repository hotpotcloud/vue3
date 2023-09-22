<template>
  <view class="plan-out">
    <view class="d-flex-center d-sb top">
      <view class="h-font-30">{{
        planInfo.planName ? planInfo.planName : "配送计划"
      }}</view>
      <view
        class="d-flex-center font-26-33"
        @tap="onClickPlan"
        v-if="planInfo.planName"
      >
        <u-icon name="arrow-right" color="#999999" />
      </view>
    </view>
    <view>
      <view class="d-flex-center d-sb plan-3">
        <!-- 多久送一次 -->
        <!-- <view class="d-flex-center" @tap.stop="onPlan('long')">
          <text
            :class="['h-margin-rig8', planInfo.ruleType && 'plan-active']"
            >{{ planInfo.ruleType ? howTime : "多久送一次" }}</text
          >
          <u-icon name="arrow-right" color="#999999" />
        </view> -->

        <view @tap.stop="onPlan('long')">
          <PlanCardItem :nomalColor="howTime ? '#333333' : ''">
            <view>
              <text v-if="planInfo.ruleType">{{ howTime }}</text>
              <text :style="{ color: planColor.long }" v-else>请选择</text>
              <!-- {{ planInfo.ruleType ? howTime : "请选择" }} -->
            </view>
            <view slot="tips">多久送一次</view>
          </PlanCardItem>
        </view>

        <view @tap.stop="onPlan('time')">
          <PlanCardItem :nomalColor="planInfo.timeSectionName ? '#333333' : ''">
            <view>
              <text v-if="planInfo.timeSectionName">{{
                planInfo.timeSectionName
              }}</text>
              <text v-else :style="{ color: planColor.time }">请选择</text>
              <!-- {{
                planInfo.timeSectionName ? planInfo.timeSectionName : "请选择"
              }} -->
            </view>
            <view slot="tips">怎么送</view>
          </PlanCardItem>
          <!-- 怎么送 -->
          <!-- <text
            :class="[
              'h-margin-rig8',
              planInfo.timeSectionName && 'plan-active',
            ]"
            >{{
              planInfo.timeSectionName ? planInfo.timeSectionName : "什么时段送"
            }}</text
          >
          <u-icon name="arrow-right" color="#999999"></u-icon> -->
        </view>
        <view @tap.stop="onPlan('num')">
          <!-- 每次送几 -->
          <PlanCardItem :nomalColor="planInfo.everyNum ? '#333333' : ''">
            <view>
              <text v-if="planInfo.everyNum">{{
                `${planInfo.everyNum}${productinfo.unitName}`
              }}</text>
              <text v-else :style="{ color: planColor.num }">请选择</text>
              <!-- {{
              planInfo.everyNum 
                ?`${planInfo.everyNum}${productinfo.unitName}`
                : "请选择"
            }} -->
            </view>
            <view slot="tips">{{ `每次送几${productinfo.unitName}` }}</view>
          </PlanCardItem>
          <!-- <text
            :class="['h-margin-rig8', planInfo.everyNum && 'plan-active']"
            >{{
              planInfo.everyNum
                ? `每次送${planInfo.everyNum}${productinfo.unitName}`
                : `每次送几${productinfo.unitName}`
            }}</text
          >
          <u-icon name="arrow-right" color="#999999"></u-icon> -->
        </view>
      </view>
    </view>
    <view class="plan-1 d-flex-center d-center" @tap="onPlanAddress">
      <!-- 有地址 -->
      <view
        v-if="planInfo.addressDTO.addressNo"
        class="flex-1 d-flex-center d-sb"
      >
        <view>
          <!-- 地址 -->
          <view class="d-flex-center">
            <view
              v-if="planInfo.addressDTO.labelName"
              :class="[
                planInfo.addressDTO.defaulted === 1
                  ? 'h-address-tag'
                  : 'h-address-tag-other',
              ]"
              >{{
                planInfo.addressDTO.defaulted === 1
                  ? "默认"
                  : planInfo.addressDTO.labelName
              }}
            </view>
            <view class="flex-1 h-over-1 font-26-6">
              {{ planInfo.addressDTO.provinceCityArea }}</view
            >
          </view>
          <!-- 地址 -->
          <view class="h-over-1 h-size32 h-margin-10rpx">
            {{ planInfo.addressDTO.communityDoorCode }}
          </view>
          <!-- 收货人 -->
          <view class="d-flex-center font-26-6">
            <view class="user-name h-margin-rig48">{{
              planInfo.addressDTO.receiver
            }}</view>
            <view class="flex-1 h-over-1">{{
              planInfo.addressDTO.receiverPhone
            }}</view>
          </view>
        </view>
        <u-icon name="arrow-right" color="#999999" size="16" />
      </view>
      <!-- 无地址 -->
      <view class="d-flex-center" v-else>
        <text class="h-margin-rig8 plan-4" :style="{ color: planColor.address }"
          >请添加配送地址</text
        >
        <u-icon name="arrow-right" color="#999999" size="13" />
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import PlanCardItem from "./plan-card-item.vue";
export default {
  props: {
    res: {
      type: Object,
      default: null,
    },
  },
  components: {
    PlanCardItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("plan", ["address", "planInfo", "planColor"]),
    ...mapGetters("plan", ["howTime"]),
    ...mapState("product", ["productinfo"]),
  },
  methods: {
    /**
     * @name 选择配送
     * @param type(long:多久送一次；time:什么时段送；num:每次送多少)
     */
    onPlan(type) {
      this.$emit("onPlan", type);
    },
    //  计划名点击
    onClickPlan() {
      // 配送计划列表页
      uni.navigateTo({
        url:
          "/subPages/distribution/programList/programListPage?type=" + "plan",
      });
      console.log("点击计划名");
    },
    // 点击地址
    onPlanAddress() {
      this.$emit("onPlanAddress");
    },
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
}
</style>
