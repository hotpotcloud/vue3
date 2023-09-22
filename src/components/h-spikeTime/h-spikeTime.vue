<template>
  <view class="spike-bar" v-if="show">
    <view class="spike-level">
      <view class="spike-desc">
        <view class="spike-icon">
          <image
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/info/%E9%A3%9E%E4%B9%A620220720-142443.gif"
          />
        </view>
        <view class="spike-txt">
          <image
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E9%99%90%E6%97%B6%E7%A7%92%E6%9D%80%201%402x.png"
          />
        </view>
      </view>

      <text class="spike-time-desc"
        >距秒杀
        <text
          v-if="productinfo.numlist.killDTO.status === skillEnum.PROGRESSING"
          >结束</text
        >
        <text v-if="productinfo.numlist.killDTO.status === skillEnum.WAIT_START"
          >开始</text
        >
        仅剩</text
      >
    </view>
    <view class="spike-level">
      <view class="spike-price-bar">
        <text class="spike-price">{{
          productinfo.priceNow | formatAmount
        }}</text>
        <text class="spike-price-unuse">{{ productinfo.minMoney }}</text>
      </view>
      <u-count-down
        ref="autoKill"
        :time="times"
        format="DD:HH:mm:ss"
        :autoStart="true"
        millisecond
        @change="onChange"
      >
        <view class="spike-time">
          <view class="time-item" v-if="timeData.days != 0">
            <text class="time-number">{{ timeData.days }}</text>
            <text>天</text>
          </view>
          <view class="time-item">
            <text class="time-number">
              {{ timeData.hours >= 10 ? timeData.hours : "0" + timeData.hours }}
            </text>
            <text>时</text>
          </view>
          <view class="time-item">
            <text class="time-number">{{
              timeData.minutes >= 10 ? timeData.minutes : "0" + timeData.minutes
            }}</text>
            <text>分</text>
          </view>
          <view class="time-item">
            <text class="time-number">{{
              timeData.seconds >= 10 ? timeData.seconds : "0" + timeData.seconds
            }}</text>
            <text>秒</text>
          </view>
        </view>
      </u-count-down>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { skillEnum } from "@/utils/enum";
export default {
  props: {
    show: {
      //展示
      type: Boolean,
      default: false,
    },
    times: {
      //倒计时
      type: [String, Number],
      default: 0,
    },
    
  },
  data() {
    return {
      timeData: {},
      end: this.tip,
      skillEnum,
    };
  },
  computed: {
    ...mapState("product", ["productinfo"]),
  },
  methods: {
    start() {
      this.$refs.autoKill.start();
    },
    // 倒计时
    onChange(e) {
      this.timeData = e;
      this.$emit("onChange", e);
    },
  },
};
</script>
<style lang="scss" scoped>
// 秒杀
.spike-bar {
  //width: 100%;
  height: 120rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/Frame%2098%402x.png")
    no-repeat;
  background-position: 100%;
  background-size: cover;
  padding: 0 32rpx;
}
.spike-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spike-desc {
  display: flex;
  justify-content: left;
  align-items: center;
  .spike-icon {
    width: 40rpx;
    height: 40rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .spike-txt {
    width: 158rpx;
    height: 72rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.spike-time-desc {
  font-size: 22rpx;
  color: #fff;
}
.spike-price-bar {
  color: #fff;
  .spike-price {
    font-size: 34rpx;
    font-weight: bold;
    padding-right: 16rpx;
  }
  .spike-price-unuse {
    text-decoration: line-through;
    font-size: 22rpx;
  }
}

.spike-time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
}
.time-item {
  display: flex;
}
.time-number {
  min-width: 32rpx;
  display: block;
  // height: 36rpx;
  line-height: 36rpx;
  border-radius: 8rpx;
  background: #fff;
  color: #f86c4d;
  padding: 0 4rpx;
  text-align: center;
  margin: 0 4rpx;
  font-size: 30rpx;
  font-weight: bold;
}
image {
  border: none !important;
}
</style>
