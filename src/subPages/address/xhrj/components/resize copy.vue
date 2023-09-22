<template>
  <view class="goods-item-out d-flex">
    <img :src="getAssetImgUrl(null)" alt="" class="item-goods-img" />
    <view class="item-right flex-1">
      <view class="h-overflow-88-2 right-name">
        {{ item.spuName }}
      </view>
      <view class="wrapper" v-if="more">
        <view class="text2" :class="[more && 'text']">
          <text v-for="(date, index) in item.date" :key="index"
            >{{ getDate(date) }}日，</text
          ><text class="btn" @tap="onClickMore" v-if="more">展开更多</text>
        </view>
      </view>

      <!-- <view class="text1" v-if="!more">
        <text v-for="(date, index) in item.date" :key="index"
          >{{ getDate(date) }}日，</text
        >
      </view>
      <view class="wrapper" v-else>
        <view class="text2" :class="[more && 'text']">
          <view class="btn" @tap="onClickMore" v-if="more">展开更多</view>
          <text v-for="(date, index) in item.date" :key="index"
            >{{ getDate(date) }}日，</text
          >
        </view>
      </view> -->

      <!-- <view class="wrapper3">
        <view class="text3">
          <view class="btn3">展开更多</view>
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
          dfhdskhfksadfsdalkfjlasdkjflkasdjflas111
        </view>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    text: {
      default: "", //停送or恢复
      type: String,
    },
  },
  data() {
    return {
      showText: false,
      more: false,
      text: "停送：8日，10日，12日，13日，20日，22日，24日，26日，8日，10日，12日，13日，20日，22日，24...停送：8日，10日，12日，13日，20日，22日，24日，26日，8日，10日，12日，13日，20日，22日，24...",
    };
  },
  created() {
    // this.showSpace();
  },
  computed: {
    //计算 wrapper 是否超出三行
    showSpace() {
      wx.createSelectorQuery()
        .in(this)
        .selectAll(".text1")
        .boundingClientRect((rect) => {
          console.log("rect", rect);
          // const fl = rect[0].height < rect[1].height;
          // return (this.more = !fl);
        })
        .exec();
    },
  },
  methods: {
    onClickMore() {
      this.more = !this.more;
    },
    //年月日截取为日
    getDate(date) {
      return date.split("-")[2];
    },
  },
};
</script>

<style scoped lang='scss'>
.goods-item-out {
  padding-bottom: 16rpx;
  background: #fff;
  .item-goods-img {
    width: 148rpx;
    height: 148rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    border: 1rpx solid #f4f4f4;
  }

  .item-right {
    margin-left: 16rpx;
    .right-name {
      font-weight: bold;
      color: #333;
      line-height: 44rpx;
    }
  }

  .wrapper {
    display: flex;
    width: 100%;
    // overflow: hidden;
  }
  .text2 {
    color: #999;
    font-size: 13px;
    line-height: 1.5;
  }
  .text1 {
    @extend .text2;
    text-align: justify;
  }
  .text {
    @extend .text2;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    position: relative;
    max-height: 4.5em;
    transition: 0.3s max-height;
  }
  .text::before {
    content: "";
    height: calc(100% - 39rpx);
    float: right;
  }
  .btn {
    color: #1d9bdc;
    position: relative;
    float: right;
    clear: both;
    margin-left: 20rpx;
    font-size: 13px;
    line-height: 1.5;
    /* margin-top: -30px; */
  }
  .btn::before {
    content: "...";
    position: absolute;
    left: 0rpx;
    color: #999;
    transform: translateX(-100%);
  }

  .wrapper3 {
    // color: transparent;
    @extend .wrapper;
    position: fixed;
    z-index: -1;
  }
  .text3 {
    @extend .text;
    // color: transparent;
  }
  .btn3 {
    @extend .btn;
    // color: transparent;
    &::before {
      color: transparent;
    }
  }
}
</style>
