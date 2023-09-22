<template>
  <view class="pop-out" v-if="show">
    <u-overlay :show="show" @click="onClose">
      <!-- <u-transition :show="show" mode="fade-up"> -->
      <view class="pop-main" :style="{ height: viewH }">
        <view class="face">
          <view>
            <view class="title">面对面分享</view>
            <img
              @tap.stop="onCloseShare"
              class="close-pop"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
              alt=""
            />
          </view>
          <view class="tips"
            >可以让好友打开微信扫描您的二维码，然后在小程序下单</view
          >
          <view class="image">
            <image :src="`data:image/png;base64,${proQRcode}`"
          /></view>
          <view class="share-product">
            <view>分享商品</view>
            <view class="list-item">
              <view class="left">
                <image class="product" :src="product.imageUrl" />
              </view>
              <view class="right">
                <view class="name"
                  ><view class="kill" v-if="product.kill">秒杀</view
                  >{{ product.spuName }}</view
                >
                <view class="recent">{{ product.salesNum }}人近期买过</view>
                <view class="bottom">
                  <view class="money"
                    ><text>¥</text><text>{{ product.price }}</text>
                  </view>
                  <view class="right-action"> </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- </u-transition> -->
    </u-overlay>
  </view>
  <!-- <Pop :show="show" @onClose="onCloseShare" :selfTop="true" viewH="72%">
    
  </Pop> -->
</template>
<script>
import Api from "@/utils/api";
import { XiaoyouProduct } from "@/utils/url";
import { mapState } from "vuex";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    product: {
      default: {},
      type: Object,
    },
    selfTop: {
      //自定义弹窗顶部内容
      type: Boolean,
      default: false,
    },
    selfBody: {
      //自定义弹窗主体内容
      type: Boolean,
      default: false,
    },
    selfFoot: {
      // 自定义弹窗底部内容
      typeof: Boolean,
      default: false,
    },
    viewH: {
      //弹窗高度
      default: "72%",
      type: String,
    },
    show: {
      //弹窗显示
      default: false,
      type: Boolean,
    },
    topName: {
      default: "面对面邀请",
      type: String,
    },
    topTip: {
      default: "可以让好友打开微信扫描您的二维码，注册为鲜推官。",
      type: String,
    },
  },
  data() {
    return {
      showShare: false,
      shareImageData: "",
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("xiaoyou", ["proQRcode"]),
  },
  // watch: {
  //   show(newVal, oldVal) {
  //     if (newVal) {
  //       this.openShowShare();
  //     }
  //   },
  // },
  mounted() {},
  methods: {
    onClose() {
      console.log("关闭弹窗");
      this.$emit("onClose", this.show);
    },
    // //获取分享的二维码
    // async openShowShare() {
    //   this.show = false;
    //   console.log(this.product, "product");
    //   if (this.userInfo) {
    //     const { data } = await Api.$getX(
    //       `${XiaoyouProduct.getImage}${this.product?.spuId}/${this.userInfo?.appId}`
    //     );
    //     this.shareImageData = data;
    //   }
    // },
    onCloseShare() {
      this.$emit("on-cancel");
    },
  },
};
</script>
<style lang="scss" scoped>
.pop-out {
  height: 100vh;
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // background: rgba(0, 0, 0, 0.55);
  // z-index: 9999;
  .pop-main {
    // height: 78%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10079;
    border-radius: 8rpx 8rpx 0 0;
  }
  .main-top {
    .toptip,
    .topname {
      text-align: center;
    }
    .toptip {
      margin-top: 24rpx;
      color: #999999;
      font-size: 24rpx;
    }
    .topname {
      font-weight: bold;
      font-size: 34rpx;
      color: #000;
    }
    .close-pop {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
.face {
  padding: 48rpx 40rpx 0rpx;
  > view:nth-child(1) {
    position: relative;
  }
  .close-pop {
    border: none;
    width: 32rpx;
    height: 32rpx;
    position: absolute;
    right: 0rpx;
    top: 10rpx;
  }
  .title {
    height: 48rpx;
    font-size: 34rpx;
    color: #000000;
    text-align: center;
    margin-bottom: 24rpx;
  }
  .tips {
    font-size: 24rpx;
    color: #999999;
    line-height: 28rpx;
    margin-bottom: 54rpx;
    text-align: center;
  }
  .image {
    text-align: center;
    > image {
      width: 440rpx;
      height: 440rpx;
    }
  }
  .share-product {
    > view:nth-child(1) {
      font-size: 24rpx;
      color: #666666;
      height: 58rpx;
      line-height: 58rpx;
      border-bottom: 2rpx dashed #e7e7e7;
    }
    margin-top: 18rpx;
  }
}
.list-item {
  display: flex;
  flex-direction: row;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  position: relative;
  margin-bottom: 8rpx;
  .left {
    .product {
      width: 176rpx;
      height: 176rpx;
      border: none;
      border-radius: 24rpx 24rpx 24rpx 24rpx;
    }
  }
  .right {
    margin-left: 24rpx;
    flex: 1;
    .name {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
      line-height: 30rpx;
      .kill {
        width: 62rpx;
        height: 30rpx;
        background: #f86c4d;
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        height: 30rpx;
        background: #f86c4d;
        font-size: 22rpx;
        color: #ffffff;
        text-align: center;
        display: inline-block;
        margin-right: 5rpx;
      }
    }
    .recent {
      font-size: 22rpx;
      color: #f86c4d;
      line-height: 26rpx;
      margin: 16rpx 0rpx 10rpx;
    }
    .money {
      color: #f86c4d;
      font-weight: 500;
      line-height: 40rpx;
      > text:nth-child(1) {
        font-size: 26rpx;
      }
      > text:nth-child(2) {
        font-size: 34rpx;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
    }
    .share {
      width: 48rpx;
      height: 48rpx;
      border: none;
    }
    .buy {
      width: 96rpx;
      height: 48rpx;
      line-height: 48rpx;
      background: #1d9bdc;
      border-radius: 24rpx 24rpx 24rpx 24rpx;
      font-size: 24rpx;
      color: #ffffff;
      text-align: center;
      margin-left: 16rpx;
    }
    .right-action {
      display: flex;
      > view:nth-child(1) {
        position: relative;
      }
    }
    .return {
      position: absolute;
      bottom: 140%;
      left: -50%;
      transform: translateY(50%);
      background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/littletangle.png");
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: 10rpx 6rpx;
      height: 34rpx;
      > view {
        height: 28rpx;
        padding: 0rpx 8rpx;
        line-height: 28rpx;
        background: #f86c4d;
        font-size: 18rpx;
        color: #ffffff;
        min-width: 100rpx;
        text-align: center;
        border-radius: 24rpx 24rpx 24rpx 24rpx;
      }
    }
  }
  .icon-number {
    width: 65rpx;
    height: 70rpx;
    border: none;
    position: absolute;
    top: 16rpx;
    left: 16rpx;
    z-index: 99;
  }
  .other {
    top: 23rpx;
    left: 24rpx;
    width: 48rpx;
    height: 56rpx;
    text-align: center;
    line-height: 56rpx;
    font-size: 30rpx;
    font-weight: bold;
    position: absolute;
    color: #ffffff;
    z-index: 99;
    background-size: 100% 100%;
    background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/flag-bg.png");
  }
}
</style>
