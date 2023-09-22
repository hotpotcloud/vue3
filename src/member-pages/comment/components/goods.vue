/* 商品信息 */
<template>
  <view class="goods-card-out">
    <view class="card_top_tips">您对商品满意吗？</view>
    <view class="card_detail">
      <Card
        v-for="(item, index) in info.evaluateItemDTOAddList"
        :key="index"
        :child="item"
        :itemEvaluate="isEvaluate"
        :rateConfig="rateConfig"
        @onSelect="onSelect"
        @onChangeRate="childChangeRate"
      />
    </view>
  </view>
</template>

<script>
import Card from "./card.vue";
export default {
  components: { Card },
  props: {
    // 是否评价
    isEvaluate: {
      type: Boolean,
      default: false,
    },
    //当前配送员配送商品信息
    info: {
      type: Object,
      default: () => {},
    },
    //评分配置
    rateConfig: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    childChangeRate(num, val) {
      console.log("num,val", num, val);
      const obj = {
        ...val,
        goodsScore: num,
      };
      this.$emit("childChangeRate", num, obj);
    },
    onSelect(item) {
      console.log("e-商品", item);
      this.$emit("onChildSelect", item);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.goods-card-out {
  border-radius: 24rpx;
  background: #ffffff;
  .card_top_tips {
    padding: 24rpx;
    border-bottom: 1rpx solid #f1f1f1;
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;
  }
  .card_detail {
    padding: 24rpx 32rpx;
  }
}
</style>