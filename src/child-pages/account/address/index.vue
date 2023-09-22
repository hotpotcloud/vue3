<template>
  <view class="address-out">
    <view class="address-list">
      <view class="main">
        <view
          v-for="(el, index) in topListInfo.addressInfo"
          :key="index"
          class="d-flex-center d-sb main-info"
          hover-class="wsui-btn__hover_list"
        >
          <view class="flex-1" @tap="onTap(el)">
            <view class="d-flex-center" style="margin-bottom: 12rpx">
              <text class="h-font-30 marR18">{{ el.receiver }}</text>
              <text class="main-phone marR16">{{ el.receiverPhone }}</text>
              <!--  -->
              <text class="h-add-tag marR8" v-if="el.labelName">{{
                el.labelName
              }}</text>
              <!--  -->
              <text class="h-add-tag marZero" v-if="el.defaulted">默认</text>
            </view>
            <view class="h-overflow-8-2">
              {{ el.adressDetail }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { LongStopEnum } from "@/store/types";
export default {
  data() {
    return {
      type: LongStopEnum.DRINKING,
    };
  },
  computed: {
    ...mapState("orderPlan", ["topListInfo"]),
  },
  onLoad(option) {
    this.type = option?.type;
  },
  methods: {
    ...mapMutations("orderPlan", ["setOrderListParams"]),
    ...mapActions("orderPlan", [
      "getNumWithAddress",
      "getAccountOrderList",
      "postLongList",
    ]),
    async onTap(el) {
      try {
        console.log("option-点击地址", el);
        if (!el.checked) {
          // 设置参数
          this.setOrderListParams({ stationAccountNo: el.stationAccountNo });
          // 重新请求数量
          await this.getNumWithAddress();
          // await this.getAccountOrderList();
          await this.postLongList({ type: this.type });
        }
        uni.navigateBack({ delta: 1, success: () => {} });
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang="scss">
.wsui-btn__hover_list {
  opacity: 0.9;
  background: #f7f7f7;
}
.address-out {
  padding: 24rpx 0;
  height: 100vh;
  background: #f5f5f5;
}
.address-list {
  background: #fff;
  .top {
    padding: 32rpx;
    color: #666666;
    border-bottom: 2rpx solid #f4f4f4;
  }
  .main {
    padding: 0rpx 32rpx 0rpx 40rpx;
    .main-info {
      padding: 32rpx 0;
      border-bottom: 2rpx solid #f4f4f4;
    }
  }
}
.main-phone {
  color: #999999;
}
.marR18 {
  margin-right: 18rpx;
}
.marR16 {
  margin: 0;
  margin-right: 16rpx;
}
.marR8 {
  margin: 0;
  margin-right: 8rpx;
}
.marZero {
  margin: 0;
}
//当选框
.radio {
  margin-left: 48rpx;
  width: 48rpx;
  height: 48rpx;
  // background: #f1f1f1;
  border-radius: 48rpx;
  color: #fff;
  text-align: center;
  line-height: 48rpx;
}
.radio_checked {
  background: #1d9bdc !important;
}
.checked {
  visibility: hidden;
}
</style>
