<!--
 * @Author: ''
 * @Date: 2022-07-25 16:42:02
 * @LastEditors: ''
 * @LastEditTime: 2022-07-27 22:41:45
 * ''\pages\home\component\h-gap.vue
-->
<template>
  <view class="gap" :style="{ height: `${val*2}rpx` }"></view>
</template>
<script>
export default {
  props: {
    val: {
      type: Number,
      default: 0
    }
  },
  created() {},
  data() {
    return {
      min: 5,
      max: 30
    };
  }
};
</script>
<style scoped lang="scss">
.gap {
  width: 100%;
  //   background: #f00;
}
</style>
