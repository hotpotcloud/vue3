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
        <!-- 多久送一次 -->
        <view @tap.stop="onPlan(typeNameEnum.ruleType)" class="plan-3-item">
          <PlanCardItem :nomalColor="howTime ? '#333333' : ''">
            <view class="plan-item">
              <text v-if="res.ruleType"
                >{{ howTime }}
                <!-- <uni-icons type="right" size="13" color="#999"></uni-icons> -->
              </text>
              <uni-icons type="right" size="13" color="#999"></uni-icons>

              <!-- <text :style="{ color: planColor.ruleType }" v-else>请选择</text> -->
            </view>
            <!-- <view slot="tips">多久送一次</view> -->
          </PlanCardItem>
        </view>
        <!-- 确认提示 -->
        <view class="plan-tips" @tap="onCloseBtn" v-if="showTips">
          <text class="tips-text"> 确认配送规律，可自行调整哦~</text>
          <uni-icons type="closeempty" color="#fff" size="13"
        /></view>
        <view @tap.stop="onPlan(typeNameEnum.ruleAmPm)" class="plan-3-item">
          <PlanCardItem :nomalColor="res.timeSectionName ? '#333333' : ''">
            <view class="plan-item">
              <text v-if="res.timeSectionName">{{ res.timeSectionName }}</text>
              <uni-icons type="right" size="13" color="#999"></uni-icons>

              <!-- <text v-else :style="{ color: planColor.ruleAmPm }">请选择</text> -->
            </view>
            <!-- <view slot="tips">怎么送</view> -->
          </PlanCardItem>
          <!-- 怎么送 -->
        </view>
        <view @tap.stop="onPlan(typeNameEnum.ruleNum)" class="plan-3-item">
          <!-- 每次送几 -->
          <PlanCardItem :nomalColor="res.everyNum ? '#333333' : ''">
            <view class="plan-item">
              <text v-if="res.everyNum"
                >{{ `${res.everyNum}${unit}` }}
                <!-- <uni-icons type="right" size="13" color="#333"></uni-icons> -->
              </text>
              <uni-icons type="right" size="13" color="#999"></uni-icons>
              <!-- <text v-else :style="{ color: planColor.ruleNum }">请选择</text> -->
            </view>
            <!-- <view slot="tips">{{ `每次送几${unit}` }}</view> -->
          </PlanCardItem>
        </view>
      </view>
    </view>
    <view class="plan-1 d-flex-center d-center" @tap="onPlanAddress">
      <!-- 有地址 -->
      <view v-if="res.addressDTO.addressNo" class="flex-1 d-flex-center d-sb">
        <view>
          <!-- 地址 -->
          <view class="d-flex-center">
            <view
              v-if="res.addressDTO.labelName"
              :class="[
                res.addressDTO.defaulted === 1
                  ? 'h-address-tag'
                  : 'h-address-tag-other',
              ]"
              >{{
                res.addressDTO.defaulted === 1
                  ? "默认"
                  : res.addressDTO.labelName
              }}
            </view>
            <view class="flex-1 h-over-1 font-26-6">
              {{ res.addressDTO.provinceCityArea }}</view
            >
          </view>
          <!-- 地址 -->
          <view class="h-over-1 h-size32 h-margin-10rpx">
            {{ res.addressDTO.communityDoorCode }}
          </view>
          <!-- 收货人 -->
          <view class="d-flex-center font-26-6">
            <view class="user-name h-margin-rig48">{{
              res.addressDTO.receiver
            }}</view>
            <view class="flex-1 h-over-1">{{
              res.addressDTO.receiverPhone
            }}</view>
          </view>
        </view>
        <u-icon name="arrow-right" color="#999999" size="16" />
      </view>
      <!-- 无地址 -->
      <view class="d-flex-center" v-else>
        <text
          class="h-margin-rig8 plan-4"
          :style="{ color: planColor.ruleAddress }"
          >请添加配送地址</text
        >
        <u-icon name="arrow-right" color="#999999" size="13" />
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { typeNameEnum } from "@/utils/enum";
import PlanCardItem from "./plan-card-item.vue";
// import { ruleTypeEnum } from "@/utils/enum";
export default {
  props: {
    res: {
      type: Object,
      default: null,
    },
    unit: {
      //单位
      type: String,
      default: "瓶",
    },
    showTips: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    PlanCardItem,
  },
  data() {
    return {
      typeNameEnum,
    };
  },
  computed: {
    ...mapState("plan", ["planColor"]),
    ...mapGetters("plan", ["howTime"]),
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
    onCloseBtn() {
      this.$emit("onCloseBtn");
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
    position: relative;
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

  .plan-3-item {
    min-width: 26%;
    // position: relative;
  }

  .plan-tips {
    position: absolute;
    z-index: 9;
    left: 30%;
    transform: translateX(-10%);
    bottom: -44rpx;
    font-size: 26rpx;
    color: #fff;
    padding: 10rpx 16rpx;
    background: #333333;
    opacity: 0.8;
    border-radius: 12rpx;
    &::before {
      content: "";
      width: 0rpx;
      height: 0rpx;
      position: absolute;
      left: 50%;
      top: -10rpx;
      transform: translateX(-50%);
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-bottom: 10rpx solid rgba(0, 0, 0, 0.75);
    }
    .tips-text {
      margin-right: 12rpx;
    }
  }

  .plan-item {
    text-align: center;
    font-size: 26rpx;
    background: #f1f1f1;
    border-radius: 12rpx;
    padding: 8rpx 16rpx;
    // min-width: 33%;
  }
}
</style>
