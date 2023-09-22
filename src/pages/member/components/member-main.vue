<template>
  <view class="member-main-out">
    <banner :bannnerList="bannnerList" @onClick="onClickSw" />
    <view class="base_css" v-if="memberTask && memberTask.name">
      <mainTip name="新手任务" />
      <view class="base_child_css">
        <!-- 线上下单 -->
        <view class="mission_child d-flex-center d-sb">
          <view class="child_left d-flex-center">
            <view class="child_left_icon">
              <img
                :src="getAssetImgUrl('member/member-task.png')"
                alt=""
                class="child_left_icon_img"
              />
            </view>
            <view class="d-flex-colum d-sb">
              <view class="d-flex-center">
                <text class="left_text">{{ memberTask.name }}</text>
                <text class="left_tag">{{ memberTask.gainDesc }}</text>
              </view>
              <view class="left-tips"> {{ memberTask.conditionDesc }} </view>
            </view>
          </view>
          <view class="buy_btn d-flex-center d-center" @tap="onClickBuy"
            >去下单
            <img
              mode="widthFix"
              :src="getAssetImgUrl('member/left_start.png')"
              alt=""
              class="left_start"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="base_css">
      <mainTip name="积分兑券" />
      <view v-if="couponList.length">
        <view
          class="base_child_css"
          v-for="(el, index) in couponList"
          :key="index"
        >
          <mainTicket :couponInfo="el" @getTicket="getTicket" />
        </view>
      </view>
      <view class="no-date-list" v-else>暂无数据</view>
    </view>
  </view>
</template>

<script>
import mainTip from "./main-tip.vue";
import banner from "./banner.vue";
import mainTicket from "./main-ticket.vue";
export default {
  components: {
    mainTip,
    banner,
    mainTicket,
  },
  props: {
    // 轮播列表
    bannnerList: {
      default: () => [],
      type: Array,
    },
    // 优惠券列表
    couponList: {
      default: () => [],
      type: Array,
    },
    // 会员任务
    memberTask: {
      default: () => {},
      type: Object,
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
    onClickSw(val) {
      this.$emit("onClickSw", val);
    },
    onClickBuy() {
      console.log("去下单", 2);
      this.$emit("onClickBuy");
    },
    //兑换
    getTicket(val) {
      console.log("兑换", val);
      this.$emit("getTicket", val);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.member-main-out {
  background: #fff;
  .base_css {
    margin-top: 48rpx;
  }
  .base_child_css {
    margin-top: 24rpx;
  }
  .no-date-list {
    color: #999;
    text-align: center;
    font-size: 28rpx;
    margin-top: 24rpx;
  }

  .mission_child {
    .child_left_icon {
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      margin-right: 24rpx;
      background: linear-gradient(0deg, #ffe7ba, #ffe7ba),
        linear-gradient(0deg, #ffedcf, #ffedcf);
      border: 1px solid #ffe7ba;
      display: flex;
      justify-content: center;
      align-items: center;
      .child_left_icon_img {
        width: 17.5px;
        height: 20px;
      }
    }
    .left_text {
      font-weight: bold;
      font-size: 28rpx;
      color: #333;
      margin-right: 8rpx;
    }
    .left_tag {
      height: 32rpx;
      font-size: 22rpx;
      color: #fff;
      padding: 2rpx 12rpx;
      border-top-left-radius: 4rpx;
      border-bottom-left-radius: 12rpx;
      border-bottom-right-radius: 12rpx;
      border-top-right-radius: 12rpx;
      box-shadow: 0px 0px 4px 0px #ffd299;
      background: linear-gradient(270deg, #f5a240 -8.93%, #ffd056 114.29%);
    }
    .left-tips {
      font-size: 24rpx;
      color: #666;
    }
    .buy_btn {
      background: linear-gradient(90deg, #ffe9c5 5.04%, #ffd691 100%);
      width: 136rpx;
      height: 60rpx;
      color: #533417;
      font-size: 24rpx;
      border-radius: 32rpx;
      .left_start {
        margin-left: 6rpx;
        width: 16rpx;
      }
    }
  }
}
</style>