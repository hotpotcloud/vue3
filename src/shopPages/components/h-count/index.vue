<template>
  <view class="count-bar">
    <!-- require('@/assets/jian.png') -->
    <image
      class="minus-btn"
      mode="aspectFit"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/minus.png"
      @click="handleMinus"
      v-if="count > 0 && needShowMinDisabled === false"
    />
    <image
      class="minus-btn"
      mode="aspectFit"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/minus.png"
      @click="handleMinus"
      v-if="count > 1 && needShowMinDisabled === true"
    />
    <image
      class="minus-btn"
      mode="aspectFit"
      @click="handleMinus"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/minus-disabled.png"
      v-if="count === 1 && needShowMinDisabled === true"
    />
    <view class="input-num" v-if="count > 0">{{ count }}</view>
    <image
      class="minus-btn"
      mode="aspectFit"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/add-disabled.png"
      v-if="maxDisabled"
      @click="handleAdd"
    />
    <image
      v-else
      class="minus-btn"
      mode="aspectFit"
      src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/add.png"
      @click="handleAdd"
    />
    <!-- <view class="red-circle" :id="id"></view> -->
  </view>
</template>
<script>
export default {
  props: {
    count: {
      type: Number,
      default: null,
    },
    needShowMinDisabled: {
      type: Boolean,
      default: false,
    },
    maxDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: "container" + Math.random(),
    };
  },

  methods: {
    handleAdd(e) {
      this.$emit("handleAdd", e);
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
  width: 74rpx;
  text-align: center;
  // padding: 0 32rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  line-height: 33rpx;
}
.red-circle {
  border-radius: 28rpx;
  position: absolute;
  height: 28rpx;
  background: #f86c4d;
  z-index: 10;
  width: 28rpx;
  right: 68rpx;
}
</style>
