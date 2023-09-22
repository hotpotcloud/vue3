/* 商品头部公司信息+订单状态 */
<template>
  <view class="tip-bar-out d-flex-center d-sb">
    <view class="d-flex-center">
      <view>{{ platformName }}</view>
      <view>{{ companyName }}</view>
    </view>
    <view class="order-status-text">
      {{ orderStatus }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 平台名称
    platformName: {
      type: String,
      default: "鲜活+",
    },
    // 公司名称
    companyName: {
      type: String,
      default: "四川新华西乳业有限公司",
    },
    // 订单状态
    orderStatus: {
      type: String,
      default: "待付款",
    },
    // 状态字体颜色
    statusColor: {
      type: String,
      default: "#F86C4D", //待恢复#F86C4D
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {},
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
</style>