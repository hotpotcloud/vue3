<template>
  <view class="adv-out" v-if="showAdv">
    <view class="pop-wechat">
      <view class="pop-son" @tap.stop="clickAdv">
        <img
          class="img-son"
          show-menu-by-longpress="true"
          :src="urldata.imageUrl"
        />
      </view>
      <view class="icon-close">
        <image
          class="img-close"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/close2X.png"
          mode="aspectFit"
          @tap.stop="closeAdv"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { webTypeEnum } from "@/utils/enum";
import { mapActions } from "vuex";
export default {
  props: {
    urldata: {
      type: Object,
      default: () => {},
    },
    showAdv: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions("home", ["X_putAdvOpen"]),
    closeAdv() {
      console.log("关闭");
      this.$emit("closeAdv", false);
    },

    clickAdv() {
      const webUrl = this.urldata.webUrl.split(";");
      switch (this.urldata.webType) {
        case webTypeEnum.PRODUCT_DETAIL: //跳详情
          uni.navigateTo({
            url: `/subPages/product/proDetail?id=${webUrl[0]}`,
            success: () => {
              this.X_putAdvOpen(this.urldata.id); //埋点记录
              this.$parent.closeAdv(false); //关闭广告
            },
          });
          break;
        case webTypeEnum.INTERNAL_LINK: //跳外部
          if (webUrl[0].includes("http" || "www")) {
            uni.navigateTo({
              url: "/pages/homepage/component/h-webview?url=" + webUrl[0],
              complete: () => {
                this.X_putAdvOpen(this.urldata.id); //埋点记录
                this.$parent.closeAdv(false); //关闭广告
              },
            });
            console.log(" 我是网址");
          } else {
            console.log(" 我是内部跳转");
            uni.navigateTo({
              url: `/${webUrl[0]}`,
              success: () => {
                this.X_putAdvOpen(this.urldata.id); //埋点记录
                this.$parent.closeAdv(false); //关闭广告
              },
              fail: () => {
                uni.switchTab({
                  url: `/${webUrl[0]}`,
                  success: () => {
                    this.X_putAdvOpen(this.urldata.id); //埋点记录
                    this.$parent.closeAdv(false); //关闭广告
                  },
                });
              },
              // complete: () => {
              //   this.X_putAdvOpen(this.urldata.id); //埋点记录
              //   this.$parent.closeAdv(false); //关闭广告
              // },
            });
          }

          break;
        case webTypeEnum.EXTERNAL_APPLET: //外部小程序
          // uni.showLoading({
          // success: () => {
          uni.navigateToMiniProgram({
            appId: webUrl[0], // 跳转目标小程序的id
            path: webUrl[1], // 目标小程序的页面路径
            // extraData: {
            //   // 需要携带的参数
            //   data1: "test",
            // },
            success(res) {
              this.X_putAdvOpen(this.urldata.id); //埋点记录
              console.log("res", res);
              this.$parent.closeAdv(false); //关闭广告
            },
          });
          // },
          // });
          break;
        case webTypeEnum.STUDIO:
          uni.navigateTo({
            url: webUrl[0],
            success: () => {
              this.X_putAdvOpen(this.urldata.id);
              this.$parent.closeAdv(false); //关闭广告
            },
          });
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.adv-out {
  height: 100%;
  width: 100%;
  padding: 50rpx;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 999999;
  .pop-wechat {
    position: absolute;
    // padding: 0 32rpx;
    width: 100%;
    // height: 654rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .pop-son {
      width: 654rpx;
      height: 960rpx;
      margin: 0 auto;

      .img-son {
        width: 100%;
        height: 100%;
      }
    }
    .icon-close {
      margin-top: 48rpx;
      width: 100%;
      text-align: center;
      .img-close {
        width: 64rpx;
        height: 64rpx;
      }
    }
  }
}
</style>
