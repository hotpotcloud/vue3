<template>
  <view class="top-comment" v-if="show">
    - 填写评价或建议，鼓励骑手和平台做的更好 -
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
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
  methods: {},
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.top-comment {
  color: #a9a9a9;
  padding: 8rpx 0;
  margin-bottom: 8rpx;
  text-align: center;
}
</style>