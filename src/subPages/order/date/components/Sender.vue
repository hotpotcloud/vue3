/* 送奶员 */
<template>
  <view class="sender-out" v-if="list.length">
    <view
      v-for="(el, index) in list"
      :key="index"
      :class="['el-card', index > 0 && 'el-card-last']"
    >
      <view class="d-flex-center">
        <text :class="['send-tag', el.deliveryTime]">{{
          deliveryEnum[el.deliveryTime]
        }}</text>
        <text class="station-name flex-1 h-over-1">{{
          el.milkStationName
        }}</text>
      </view>
      <view class="d-flex-center d-sb h-margin-top16">
        <view class="font-26-6"
          >{{ el.milkManName
          }}<text class="color-99">（{{ el.mobile }}）</text></view
        >
        <view class="d-flex-center" @tap="onCall(el.mobile)"
          ><image
            :src="getAssetImgUrl('member/mobile-icon.png')"
            mode="scaleToFill"
            class="mobile-icon"
          />
          联系Ta</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [
        // {
        //   deliveryTime: "AM_DELIVERY",
        //   milkManName: "张三",
        //   milkStationName:
        //     "奶站a奶站a奶站a奶站a奶站a奶站a奶站a奶奶站a奶站a奶站a奶站a奶站a奶站a奶站a奶奶站a奶站a奶站a奶站a奶站a奶站a奶站a奶奶站a奶站a奶站a奶站a奶站a奶站a奶站a奶站a",
        //   mobile: "MIT9802",
        // },
        // {
        //   deliveryTime: "PM_DELIVERY",
        //   milkManName: "王二麻子",
        //   milkStationName: "奶站c",
        //   mobile: "MIT9802",
        // },
      ],
    },
  },
  components: {},
  data() {
    return {
      deliveryEnum: {
        AM_DELIVERY: "上午送",
        PM_DELIVERY: "下午送",
      },
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onCall(e) {
      this.$emit("onCall", e);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.sender-out {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
}
.el-card {
  .station-name {
    margin-left: 8rpx;
    font-size: 30rpx;
    color: #333333;
    font-weight: bold;
  }

  .send-tag {
    // min-width: 88rpx;
    border: 1rpx solid transparent;
    padding: 4rpx 8rpx;
    font-size: 24rpx;
    font-weight: bold;
    border-radius: 8rpx;
    gap: 12px;
  }
  //上午
  .AM_DELIVERY {
    border-color: #8bd0ff;
    color: #8bd0ff;
  }
  //下午
  .PM_DELIVERY {
    border-color: #ffc38b;
    color: #ffc38b;
  }
  .mobile-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 8rpx;
  }
}
.el-card-last {
  border-top: 1rpx dashed #f1f1f1;
  padding-top: 16rpx;
  margin-top: 16rpx;
}
</style>