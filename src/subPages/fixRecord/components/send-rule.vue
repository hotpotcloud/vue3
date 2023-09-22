// 配送规律
<template>
  <view class="send-out" :style="{ color: colorFont }">
    <view class="d-flex-center d-sb">
      <view class="color-99">配送规律:</view>
      <view>{{ RuleTextEnum[val.ruleType] }}</view>
    </view>
    <view class="d-flex-center d-sb h-margin-top16">
      <view class="color-99">每次配送:</view>
      <view>{{ val.everyNum }}</view>
    </view>
    <view class="d-flex-center d-sb h-margin-top16">
      <view class="color-99">配送周期:</view>
      <view v-if="val.startDate && val.endDate">{{
        `${val.startDate.replaceAll("-", ".")}-${val.endDate.replaceAll(
          "-",
          "."
        )}`
      }}</view>
    </view>
  </view>
</template>

<script>
import { RuleTextEnum } from "@/utils/enum.ts";
export default {
  props: {
    val: {
      type: Object,
      default: () => ({}),
    },
    colorFont: {
      type: String,
      default: "#000000",
    },
  },
  data() {
    return {
      RuleTextEnum,
    };
  },
};
</script>

<style scoped lang='scss'>
.send-out {
  padding: 24rpx;
  background: #f7f8f9;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  color: #000;
}
</style>