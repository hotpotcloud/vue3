<template>
  <view class="top-info-out">
    <h-spikeTime
      :show="showKill"
      :times="timeSeconds"
      @onChange="onChangeKill"
    ></h-spikeTime>
  </view>
</template>

<script>
import hSpikeTime from "../../components/h-spikeTime/h-spikeTime.vue";
export default {
  props: {
    //秒杀显示
    showKill: {
      type: Boolean,
      default: false,
    },
    //秒杀时间
    timeSeconds: {
      type: Number | String,
      default: 0,
    },
  },
  components: {
    hSpikeTime,
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
    onChangeKill(e) {
      this.$emit("onChangeKill", e);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
</style>