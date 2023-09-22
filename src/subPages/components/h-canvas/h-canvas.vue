<template>
  <view>
    <view class="share">
      <u-overlay :show="show" @tap="closeShare" :opacity="0.45">
        <view class="bottom" @tap.stop="stopPropagation">
          <view class="title">分享说明</view>
          <view class="tips"
            >1.好友购买的商品数量越多，您可以获得的佣金也会越高。2.可以通过微信好友将商品分享到微信聊天中，可以生成海报发布到朋友圈或者微信聊天里面。</view
          >
          <view class="list">
            <view class="share-view"
              ><button open-type="share" class="share-btn-view">
                <image
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/weixinicon.png"
                />
                <view>微信好友</view>
              </button></view
            >
            <view class="share-method" @tap="openCanvasShare">
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/bannaicon.png"
              />
              <view>生成海报</view>
            </view>
            <view class="share-method" @tap="openShowShare">
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/facetoface.png"
              />
              <view>面对面</view>
            </view>
          </view>
          <view class="btn-container">
            <button class="btn" @tap="closeShare">取消</button>
          </view>
        </view>
      </u-overlay>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeShare() {
      this.show = false;
    },
    stopPropagation() {
      return false;
    },
    openCanvasShare() {
      this.$emit("openCanvasShare");
    },
    openShowShare() {
      this.$emit("openShowShare");
    },
  },
};
</script>

<style scoped lang="scss">
.share {
  .bottom {
    margin-top: 50vh;
    height: 50vh;
    background-color: #fff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    .title {
      height: 48rpx;
      font-size: 34rpx;
      font-weight: 500;
      color: #000000;
      line-height: 40rpx;
      text-align: center;
      margin: 52rpx 0rpx 48rpx;
    }
    .tips {
      font-size: 24rpx;
      font-weight: 400;
      color: #666666;
      line-height: 28rpx;
      text-align: center;
      padding: 0rpx 64rpx;
      margin-bottom: 48rpx;
    }
    .share-btn {
      text-align: center;
      line-height: 34rpx;
      font-size: 24rpx;
      color: #a9a9a9;
      margin-top: 48rpx;
      > text {
        color: #1d9bdc;
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 48rpx;
      padding: 0rpx 106rpx;
      .share-btn-view {
        text-align: center;
        padding: 0px;
        &::after {
          border: none;
        }
        background-color: #fff;
        > image {
          width: 96rpx;
          height: 96rpx;
        }
        > view {
          font-size: 26rpx;
          font-weight: 400;
          color: #666666;
          line-height: 34rpx;
          margin-top: -5rpx;
        }
      }
      .share-method {
        text-align: center;
        > image {
          width: 96rpx;
          height: 96rpx;
        }
        > view {
          font-size: 26rpx;
          font-weight: 400;
          color: #666666;
          line-height: 34rpx;
          margin-top: 16rpx;
        }
      }
    }
    .btn-container {
      position: absolute;
      right: 5vw;
      bottom: 60rpx;
      text-align: center;
    }
    .btn {
      width: 90vw;
      height: 80rpx;
      background: #f8f6f9;
      border-radius: 45rpx 45rpx 45rpx 45rpx;
      opacity: 1;
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      line-height: 80rpx;
      overflow: hidden;
      &::after {
        border: none;
      }
    }
  }
}
</style>
