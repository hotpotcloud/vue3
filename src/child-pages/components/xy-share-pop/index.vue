<template>
  <view class="share">
    <u-overlay :show="showPanel" @click="closeShare" :opacity="0.45">
      <view class="bottom" @click.stop="stopPropagation">
        <view class="title">分享说明</view>
        <view class="tips">
          <view>1.可以通过微信好友将商品分享到微信聊天中；</view>
          <view>2.可以生成产品海报发布到朋友圈或微信聊天中；</view>
          <view> 3.可以让好友打开微信，面对面扫描您的二维码下单。 </view>
        </view>
        <view class="list">
          <view class="share-view"
            ><button open-type="share" class="share-btn-view" @tap="onShareBtn">
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/weixinicon.png"
              />
              <view>微信好友</view>
            </button></view
          >
          <view class="share-method" @click="openCanvasShare">
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/bannaicon.png"
            />
            <view>生成海报</view>
          </view>
          <view class="share-method" @click="openShowShare">
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/facetoface.png"
            />
            <view>面对面</view>
          </view>
        </view>
        <view class="btn-container">
          <button class="btn" @click="closeShare">取消</button>
        </view>
      </view>
    </u-overlay>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    showPanel: {
      type: Boolean,
      default: false,
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
    onShareBtn() {
      this.$emit("onShareBtn");
    },
    closeShare() {
      this.$emit("closeShare");
    },
    stopPropagation() {
      this.$emit("stopPropagation");
    },
    openCanvasShare() {
      this.$emit("openCanvasShare");
    },
    openShowShare() {
      this.$emit("openShowShare");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.share {
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    // margin-top: 50vh;
    max-height: 50vh;
    background-color: #fff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
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
      margin-bottom: 64rpx;
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
      margin-bottom: 96rpx;
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
      //   position: absolute;
      //   right: 5vw;
      //   bottom: 60rpx;
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