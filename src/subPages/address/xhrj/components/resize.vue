<template>
  <view class="goods-item-out d-flex">
    <view class="item-goods-img">
      <img :src="getAssetImgUrl(item.goodsImgUrl)" alt="" />
      <view class="img-qty">x{{ item.qty }}</view>
    </view>
    <view class="item-right flex-1">
      <view class="h-overflow-88-2 right-name">
        {{ item.spuName }}
      </view>
      <view class="wrapper">
        <view :class="[more ? 'text-nomal' : 'text-nomal-hidden']">
          <text>{{ text + "：" }}</text>
          <text v-for="(date, index) in item.date" :key="index">
            {{ getDate(date) + "日" }}
            <text>{{ item.date.length - 1 === index ? "" : "，" }}</text> </text
          ><text class="btn" @tap="onClickMore" v-if="!more && showBtn"
            >展开更多</text
          >
        </view>
      </view>
      <!-- 全部显示 -->
      <view class="text-hidden">
        <text>{{ text + "：" }}</text>
        <text v-for="(date, index) in item.date" :key="index">
          {{ getDate(date) + "日" }}
          <text>{{ item.date.length - 1 === index ? "" : "，" }}</text>
        </text>
      </view>
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
      showBtn: false,
    };
  },

  computed: {
    //计算 wrapper 是否超出三行
    showSpace() {
      if (this.item.date.length) {
        wx.createSelectorQuery()
          .in(this)
          .select(".text-hidden")
          .boundingClientRect((rect) => {
            const lineHeight = uni.upx2px(44);
            const height = rect.height;
            const numLines = Math.round(height / lineHeight);
            this.showBtn = numLines > 3;
          })
          .exec();
      }

      return this.showBtn;
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
    border: 1rpx solid #f1f1f1;
    box-shadow: 0rpx -2rpx 0rpx 0rpx rgba(255, 255, 255, 0.08);
    background: #f1f1f1;
    overflow: hidden;
    position: relative;
    image {
      width: 100%;
      height: 100%;
    }
    .img-qty {
      position: absolute;
      bottom: 8rpx;
      right: 8rpx;
      padding: 0 10rpx 4rpx;
      font-size: 24rpx;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12rpx 12rpx 12rpx 12rpx;
    }
  }

  .item-right {
    margin-left: 16rpx;
    position: relative;
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
  .text-nomal {
    color: #999;
    font-size: 26rpx;
    line-height: 44rpx;
    position: relative;
  }
  .text-hidden {
    color: #999;
    font-size: 26rpx;
    line-height: 44rpx;
    color: transparent;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .text-nomal-hidden {
    @extend .text-nomal;
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    max-height: 132rpx !important;
  }
  .btn {
    background: #fff;
    color: #1d9bdc;
    position: absolute;
    right: 0;
    bottom: 0;
    padding-left: 30rpx;
    font-size: 26rpx;
    line-height: 44rpx;
    z-index: 1;
  }
  .btn::before {
    content: "...";
    position: absolute;
    left: 0rpx;
    color: #999;
    // transform: translateX(-100%);
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
