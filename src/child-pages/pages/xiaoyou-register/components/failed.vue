<template>
  <view
    class="failed-out"
    :style="{ backgroundImage: `url(${BaseApp.xiaoyouBg})` }"
  >
    <view class="fail-main">
      <Tops :notXiaoyou="true" />
      <view class="fail-action">
        <view class="f666"
          >已有
          <text class="f-red"> {{ jionNum }} </text>
          位鲜推官加入</view
        >
        <view class="apply-btn f28" @click="onApplyXiaoyou"
          >申请成为鲜推官</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import Tops from "./top.vue";
import { BaseApp } from "@/const/appIdConf";
export default {
  components: {
    Tops,
  },
  data() {
    return {
      BaseApp,
    };
  },
  computed: {
    ...mapState("xiaoyou", ["jionNum"]),
  },
  methods: {
    //注册按钮
    onApplyXiaoyou() {
      this.$emit("onApplyXiaoyou");
    },
  },
};
</script>

<style lang="scss" scoped>
.failed-out {
  min-height: 100vh;
  // background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/filaed.png")
  //   no-repeat;
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: auto;
  padding: 0 32rpx;
  .fail-main {
    margin-top: 1424rpx;
    .fail-action {
      text-align: center;
      margin-top: 22rpx;
      padding: 16rpx 0 68rpx;
      .f666 {
        color: #666;
        font-size: 30rpx;
      }
      .f-red {
        color: #ec4747;
        font-size: 40rpx;
        font-weight: bold;
      }
      .apply-btn {
        margin-top: 16rpx;
        width: 100%;
        height: 88rpx;
        background-color: #1d9bdc;
        color: #fff;
        border-radius: 60rpx;
        line-height: 88rpx;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
  }
}
</style>
