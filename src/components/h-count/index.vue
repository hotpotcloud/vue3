<template>
  <view class="count-bar">
    <!-- require('@/assets/jian.png') -->
    <image
      class="minus-btn"
      mode="aspectFit"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/minus.png"
      @click="handleMinus"
    />
    <view class="input-num">{{ count }}</view>
    <image
      class="minus-btn"
      mode="aspectFit"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/add.png"
      @click="handleAdd"
    />
  </view>
</template>
<script>
export default {
  props: {
    count: {
      type: Number,
      default: null,
    },
  },
  methods: {
    handleAdd() {
      this.$emit("handleAdd");
    },
    handleMinus() {
      this.$emit("handleMinus");
    },
  },
};
</script>
<style scoped lang="scss">
.count-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.minus-btn,
.add-btn {
  width: 48rpx;
  height: 48rpx;
}
.input-num {
  padding: 0 32rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  line-height: 33rpx;
}
</style>
