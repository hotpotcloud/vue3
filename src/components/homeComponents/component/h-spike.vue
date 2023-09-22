<template>
  <view class="spike-container" v-if="info.planEndTime > info.now">
    <view class="spike-panl">
      <view class="spike-panl-top">
        <view class="spike-panl-left">
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
        <view class="spike-panl-right">
          <u-count-down
            :time="diffTime.time"
            format="DD:HH:mm:ss"
            autoStart
            millisecond
            @change="onChange"
          >
            <view class="spike-time">
              <view class="time-item" v-if="timeData.days > 0">
                <text class="time-number">{{ timeData.days }}</text>
                <text>天</text>
              </view>
              <view class="time-item">
                <text class="time-number">
                  {{
                    timeData.hours > 10 ? timeData.hours : "0" + timeData.hours
                  }}
                </text>
                <text>时</text>
              </view>
              <view class="time-item">
                <text class="time-number">{{ timeData.minutes }}</text>
                <text>分</text>
              </view>
              <view class="time-item">
                <text class="time-number">{{ timeData.seconds }}</text>
                <text>秒</text>
                <text
                  v-if="
                    info.now < info.planEndTime && info.now > info.planStartTime
                  "
                  >结束</text
                >
                <text v-else-if="info.now < info.planStartTime">开始</text>
              </view>
            </view>
          </u-count-down>
        </view>
      </view>
      <view class="goods-container">
        <uni-swiper-dot
          :info="goodsList"
          :current="current"
          :mode="mode"
          :dotsStyles="dotStyle"
        >
          <swiper
            class="swiper-box"
            @change="change"
            :current="current"
            :style="{ height: heightNums + 'rpx', padding: '0 32rpx' }"
          >
            <swiper-item
              class="swiper-item"
              v-for="(goods, index) in goodsList"
              :key="index"
            >
              <view class="goods-bar" v-for="(el, i) in goods" :key="i">
                <!-- 秒杀遮罩 -->
                <view
                  class="goods-mask"
                  v-if="0 >= el.seckillStock - el.alreadySeckillStock"
                  >已抢光</view
                >
                <view class="goods-cover">
                  <image :src="el.spuUrl" mode="aspectFit" class="no-border" />
                </view>
                <view class="goods-info">
                  <view class="goods-title">{{ el.spuName }}</view>
                  <view class="goods-progress-layer">
                    <view class="goods-progress-box">
                      <progress
                        class="goods-progress-bar"
                        :percent="
                          (el.alreadySeckillStock / el.seckillStock) * 100
                        "
                        stroke-width="4"
                        font-size="13"
                        active
                        border-radius="8"
                        activeColor="#1D9BDC"
                        backgroundColor="#E4F4FF"
                      />
                    </view>
                    <text
                      class="goods-progress-text"
                      v-if="info.now < info.planStartTime"
                      >暂未开始</text
                    >
                    <text v-else class="goods-progress-text">
                      还剩{{
                        `${el.seckillStock}` - `${el.alreadySeckillStock}`
                      }}件
                    </text>
                    <!-- <text class="goods-progress-text">暂未开始</text> -->
                  </view>
                  <view class="goods-btns">
                    <view class="goods-price">
                      <view class="goods-pay-unuse">
                        <text>原价</text>
                        <text class="goods-pay-unuse">
                          {{ el.originalPrice | formatAmount }}
                        </text>
                      </view>
                      <view>
                        <text class="goods-pay-text">秒杀价</text>
                        <text class="goods-pay-price">
                          {{ el.seckillPrice | formatAmount }}
                        </text>
                      </view>
                    </view>
                    <!-- <view
                          class="goods-seckill"
                          @tap="goGoodDetail(el.spuCode)"
                        >
                          {{ info.seckillBtnText }}
                    </view>-->
                    <view
                      class="goods-seckill"
                      @tap="goGoodDetail(el.spuNo)"
                      v-if="info.now < info.planStartTime"
                      >查看</view
                    >
                    <view
                      v-else-if="
                        info.now < info.planEndTime &&
                        info.now > info.planStartTime
                      "
                    >
                      <view
                        class="goods-seckill"
                        @tap="goGoodDetail(el.spuNo)"
                        v-if="0 < el.seckillStock - el.alreadySeckillStock"
                        >{{ info.seckillBtnText }}</view
                      >
                      <view
                        class="goods-seckilled"
                        @tap="goGoodDetail(el.spuNo)"
                        v-else-if="
                          0 >= el.seckillStock - el.alreadySeckillStock
                        "
                        >原价买</view
                      >
                    </view>
                  </view>
                </view>
              </view>
              <!-- </view> -->
              <!-- </view> -->
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
    </view>
  </view>
</template>
<script>
// import api from "@/utils/api";
import { seckillType } from "@/utils/enum";
import { mapActions, mapState } from "vuex";
export default {
  props: {
    val: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      seckillType,
      timeData: {}, //倒计时时分秒对象
      current: 0,
      mode: "round",
      dotStyle: {
        backgroundColor: "#fff",
        border: "1px  solid #fff",
        color: "#fff",
        selectedBackgroundColor: "#fff",
        selectedBorder: "#fff",
        bottom: 0,
      },
      info: {},
      goodsList: [],
      heightNum: 732,
    };
  },
  created() {
    this.updateList(this.val);
  },

  computed: {
    ...mapState("home", ["spikeGoods"]),
    heightNums() {
      //组件高度
      const len = this.goodsList[this.current]?.length;
      return len === 3 ? 744 : len === 2 ? 504 : len === 1 ? 252 : 0;
    },
    // 处理时间
    diffTime() {
      const { planStartTime, planEndTime, foreshowTime, now } = this.info;
      const diff = planStartTime - now;
      // const offTime=planEndTime-planStartTime;
      const offTime = planEndTime - now;
      if (diff > 0) {
        return {
          time: diff,
          show: true, //未开始
        };
      } else {
        return {
          time: offTime,
          show: false, //开始了
        };
      }
    },
  },
  methods: {
    ...mapActions("home", ["X_getSpikes"]),
    // 轮播切换获取当前也index
    change(e) {
      this.current = e.detail.current;
      // const len = this.goodsList[this.current].length;
      // len === 3
      //   ? (this.heightNum = 720)
      //   : len === 2
      //   ? (this.heightNum = 488)
      //   : len === 1
      //   ? (this.heightNum = 252)
      //   : 0;
    },
    //把一维数组转换为二维数组---  入参 num:需要转换成几维数组，arr:需要转化的数组
    // 出参 转换后的数组
    arrChange(num, arr) {
      const newArr = [];
      while (arr.length > 0) {
        newArr.push(arr.splice(0, 3));
      }
      return newArr;
    },
    // 处理优惠券数据
    async updateList(val) {
      try {
        await this.X_getSpikes(val);
        const { spikeGoods } = this.$store.state.home;
        console.log("spikeGoods秒杀时间", spikeGoods);
        // console.log(spikeGoods, "解析仓库");
        this.info = {
          activityCode: spikeGoods.activityCode,
          planStartTime: spikeGoods.planStartTime,
          planEndTime: spikeGoods.planEndTime,
          now: spikeGoods.now,
          seckillBtnText: this.val.seckillBtnText,
          status: this.val.status,
          countTime: spikeGoods.foreshowTime,
        };
        // this.info.countTime = this.countTime(
        //   spikeGoods.planStartTime,
        //   spikeGoods.minute,
        //   spikeGoods.now
        // );
        this.goodsList = this.arrChange(2, spikeGoods.seckillRespList);
        console.log(this.info, "123处理数据");
      } catch (error) {}
    },

    // 跳转商品详情
    goGoodDetail(spuCode) {
      uni.navigateTo({
        url: "/subPages/product/proDetail?id=" + spuCode,
      });
    },
    onChange(e) {
      // setTimeout(()=>{
      //   console.log('e',e)
      // },1000)
      //  this.updateList(this.val);
      if (e.milliseconds === 0 && e.seconds === 0) {
        this.updateList(this.val);
      }
      this.timeData = e;
    },
  },
};
</script>
<style lang="scss" scoped>
// 秒杀顶部样式
.spike-container {
  padding: 0 32rpx;
  // margin-bottom: 24rpx;

  .spike-panl {
    padding: 24rpx 0rpx;
    padding-bottom: 0;
    border-radius: 40rpx;
    background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/Frame%2096%402x.png")
      no-repeat;
    background-position: 100%;
    background-size: cover;
    padding-bottom: 24rpx;
    min-height: 244rpx;
  }
  .spike-icon {
    width: 40rpx;
    height: 40rpx;
    image {
      border: none;
      width: 100%;
      height: 100%;
    }
  }
  .spike-txt {
    width: 158rpx;
    height: 60rpx;
    image {
      border: none;
      width: 100%;
      height: 100%;
    }
  }
  .spike-panl-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
  }
  .spike-panl-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // 倒计时
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
    height: 36rpx;
    border-radius: 8rpx;
    background: #fff;
    color: #f86c4d;
    padding: 0 4rpx;
    text-align: center;
    margin: 0 4rpx;
    font-weight: bold;
  }
}
/*.swiper-box {
  min-height: 732rpx;
}*/
.swiper-item {
  text-align: center;
  text-align: -webkit-center;
}
.goods-bar {
  // width: 638rpx;
  max-width: 100%;
  max-height: 226rpx;
  border-radius: 24rpx;
  padding: 16rpx;
  padding-right: 24rpx;
  display: flex;
  justify-content: space-between;
  background: #fff;
  margin-top: 16rpx;
  .goods-cover {
    width: 176rpx;
    height: 176rpx;
    position: relative;
    margin-right: 12rpx;
    image {
      border-radius: 8rpx;
      border: none;
      width: 100%;
      height: 100%;
    }
  }
  .goods-mask {
    position: absolute;
    z-index: 100;
    width: 176rpx;
    height: 176rpx;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 24rpx;
    text-align: center;
    line-height: 176rpx;
    color: #ffffff;
  }
  .goods-info {
    width: 406rpx;
    .goods-title {
      font-weight: bold;
      color: #333333;
      font-size: 26rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 72rpx;
      text-align: left;
    }
    .goods-progress-layer {
      padding: 8rpx 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-progress-box {
        width: 60%;
        text-align: left;
      }
      .goods-progress-text {
        font-size: 18rpx;
        color: #1d9bdc;
      }
    }
    .goods-btns {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .goods-pay-price {
        font-weight: bold;
        color: #f86c4d;
        font-size: 34rpx;
      }
      .goods-pay-text {
        font-weight: bold;
        color: #333;
      }
      .goods-pay-unuse {
        color: #c7c7c7;
        font-size: 22rpx;
        // padding-left: 8rpx;
        text-decoration: line-through;
        text-align: left;
      }
      .goods-seckill {
        width: 123rpx;
        height: 60rpx;
        background: #f86c4d;
        border-radius: 48rpx;
        text-align: center;
        line-height: 60rpx;
        color: #fff;
      }
    }
  }
}
.goods-seckilled {
  background: #f86c4d;
  // opacity: 0.5;
  width: 123rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 48rpx;
  text-align: center;
  color: #fff;
}
</style>
