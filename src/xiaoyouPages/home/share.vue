<template>
  <!-- class="share-out" -->

  <!-- :class="[BASE_APPID_KEY === 'BD' ? 'share-bd-out' : 'share-out']" -->

  <view
    class="share-out"
    :class="[show && 'share-out-show']"
    :style="{backgroundImage: `url(${backgroundImg})`}"
  >
    <!-- :style="show ? 'height:100vh' : ''" -->
    <!-- <view class="share-image"></view> -->
    <view class="danmu-wrap">
      <barrage class="barrage" :list="danmuList" ref="barrage"></barrage>
    </view>
    <button
      class="btn-friends"
      @click.stop="onClick(tapType.Friends)"
      open-type="share"
    ></button>
    <view class="btn-canvas" @click.stop="onClick(tapType.Canvas)"></view>
    <view class="btn-face" @click.stop="onClick(tapType.Face)"></view>
    <!-- <Pop :show="show" @onClose="onClose" :selfTop="true" viewH="82%">
      
    </Pop> -->
    <u-popup
      :show="show"
      mode="bottom"
      @close="onClose"
      :round="5"
      @touchmove.stop.prevent="moveHandle"
    >
      <view
        class="pop-main"
        :class="flagType === 'Face' && 'padding-l-r'"
        @touchmove.stop.prevent="moveHandle"
      >
        <view
          class="d-flex-center common-relative"
          :class="flagType === 'Canvas' && 'margin-lr'"
        >
          <view class="topname flex-1">{{ topInfo.topName }}</view>

          <view class="close-pop" @tap="onClose">
            <img
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
              alt=""
            />
          </view>
        </view>
        <view class="toptip">{{ topInfo.topTip }}</view>
        <!-- 内容 -->
        <view v-if="flagType === 'Face'">
          <view class="main-content">
            <!-- 头像 -->
            <view class="main-phto">
              <view class="phto-user">
                <image :src="topInfo.photo" mode="aspectFit" />
              </view>
            </view>
            <!-- 用户名 -->
            <view class="user-msg">
              <view class="msg-name">{{ topInfo.userName }}</view>
              <view class="msg-phone">{{ topInfo.phone }}</view>
            </view>
            <!-- 专属小程序二维码 -->
            <view class="face-code">
              <img :src="baseUrl" class="face-img" />
            </view>
          </view>
          <!-- 操作流程 -->
          <view class="action-flow">
            <img
              class=""
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/005liucen.png"
              alt=""
            />
          </view>
        </view>
        <!-- 海报分享 -->
        <view v-else-if="flagType === 'Canvas'">
          <view class="main-canvas">
            <canvas
              class="hides"
              id="share"
              type="2d"
              style="width: 300rpx; height: 568rpx"
              canvas-id="share"
            ></canvas>

            <!-- 轮播 -->
            <view class="canvas-swiper">
              <swiper
                class="gundong"
                @change="changeHB"
                previous-margin="180rpx"
                next-margin="180rpx"
                current="0"
              >
                <swiper-item
                  class="gundongItem"
                  v-for="(el, index) in hbSourceList"
                  :key="index"
                >
                  <view
                    :class="[
                      'Item',
                      currentIndex === index ? 'Item' : 'smItem',
                    ]"
                  >
                    <!-- 海报分享 -->
                    <view class="shareImg">
                      <image class="content-img" :src="el.picUrl[0]" />
                      <!-- <image class="content-img" :src="el.img" /> -->
                    </view>
                    <!-- 二维码 -->
                    <view
                      :class="[
                        currentIndex === index ? 'code-img' : 'other-img',
                      ]"
                    >
                      <image class="qrcode" :src="baseUrl" />
                    </view>
                  </view>
                </swiper-item>
              </swiper>
            </view>
            <!-- 推荐文案 -->
            <view class="canvas-text margin-lr">
              <text class="text-tip">推荐文案：</text>
              <view class="d-flex-center d-sb text-content">
                <view class="flex-1 text-main">
                  <!-- <view class="flex-1"> -->
                  <rich-text :nodes="curSourceText"></rich-text>
                  <!-- <rich-text
                    :nodes="hbSourceList[currentIndex].content"
                  ></rich-text> -->
                </view>
                <view class="copy-btn" @click="onCopy">复制</view>
              </view>
            </view>
            <view class="save-btn margin-lr" @click="onSaveHB"
              >保存海报至相册</view
            >
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import Pop from "../components/pop.vue";
// import CanvasImg from "../components/CanvasImg.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import {URLDistributor} from "@/utils/url";
import Api from "@/utils/api";
import barrage from "../components/barrage/index.vue";
import {BASE_APPID_KEY} from "@/utils/config";
import {BaseApp} from "@/const/appIdConf";
import {getTXimgUrl} from "@/utils/utils";
export default {
  components: {
    Pop,
    // CanvasImg,
    barrage,
  },
  data() {
    return {
      BaseApp,
      BASE_APPID_KEY,
      show: false,
      tapType: {
        Friends: "Friends",
        Canvas: "Canvas",
        Face: "Face",
      },
      danmuList: [],
      flagType: "Canvas",
      currentIndex: 0,
      curImgUrl: "", //图片网络地址
      codePath: "", //二维码临时地址
      bgPath: "", //海报临时地址
      widths: "",
      heights: "",
    };
  },
  mounted() {
    // this.getDanmuList();
  },
  onLoad() {
    // this.curImgUrl = this.list3[this.currentIndex];
  },
  onShareAppMessage() {
    // 设置默认的转发参数
    return {
      title: "鲜推官招募", // 默认为小程序名称
      path: `/child-pages/pages/xiaoyou-register/index?scene=${this.xiaoyouInfo.id}`, // 默认为当前页面路径
      imageUrl: "", // 默认为当前页面的截图
    };
  },
  onReady(e) {},
  computed: {
    ...mapGetters("xiaoyou", ["calcText"]),
    ...mapState("xiaoyou", [
      "faceCode",
      "xiaoyouInfo",
      "baseQR",
      "hbSourceList",
    ]),
    // 当前推荐文案
    curSourceText() {
      // if (!this.hbSourceList[this.currentIndex].content) return;
      const text = this.hbSourceList[this.currentIndex]?.content;
      const htmlVal = `<div style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;word-break: break-all;">
      ${text}
      </div>`;
      // console.log("htmlVal", htmlVal);
      return htmlVal;
    },
    baseUrl() {
      return this.faceCode;
    },
    topInfo() {
      if (this.flagType === this.tapType.Face) {
        const xyInfo = uni.getStorageSync("xiaoyouInfo");
        return {
          topName: "面对面邀请",
          topTip: "可以让好友打开微信扫描您的二维码，注册为鲜推官。",
          userName: xyInfo.nickName,
          photo: xyInfo.avatarUrl,
          phone: xyInfo.phone,
        };
      } else if (this.flagType === this.tapType.Canvas) {
        return {
          topName: "生成海报",
          topTip: "将海报保存到手机相册，分享到朋友圈或者微信聊天",
        };
      }
    },
    //分享图
    backgroundImg() {
      return getTXimgUrl(BaseApp.shareUrl);
    },
  },
  methods: {
    ...mapActions("xiaoyou", ["v_getFaceCode", "v_postSource", "v_getXYcheck"]),
    getTXimgUrl,
    moveHandle() {},
    /* 切换海报的选择 */
    changeHB(e) {
      console.log("e-切换海报的选择", e);
      const index = e.detail.current ? e.detail.current : 0;
      this.currentIndex = index;
      this.curImgUrl = this.hbSourceList[index].picUrl[0];
    },
    /*海报生成 */
    /* 海报保存 */
    async onSaveHB() {
      await this.showPosterModal();
      this.saveImg();
    },

    // 点击保存-生成画布-绘制海报+二维码-保存系统-系统设置读取-成功失败处理
    /* 1 */
    async showPosterModal() {
      try {
        //  获取二维码临时路径
        const qrPath = await this.transBase64(this.baseQR);
        //海报路径
        const bgPath = await this.getImageInfo(this.curImgUrl);
        //二维码路径
        // const codePath = await this.transBase64(this.baseQR);
        wx.createSelectorQuery()
          .select("#share")
          .fields({
            node: true,
            size: true,
          })
          .exec(async (res) => {
            console.log("1-海报生成", res);
            const canvas = res[0].node;
            const ctx = canvas.getContext("2d");
            const dpr = wx.getSystemInfoSync().pixelRatio;
            canvas.width = res[0].width * dpr;
            canvas.height = res[0].height * dpr;
            // 生成背景图
            await this.genImage(bgPath, ctx, canvas);
            // ctx.scale(dpr, dpr); //--？
            // 二维码生成
            const qrcode = canvas.createImage();
            qrcode.src = qrPath;
            qrcode.onload = () => {
              const qrWitdh = 48 * dpr;
              const qrTop = canvas.height - qrWitdh - 18;
              const qrLeft = canvas.width - qrWitdh - 18;
              ctx.save();
              ctx.beginPath();
              // 画圆
              ctx.arc(
                qrWitdh / 2 + qrLeft,
                qrWitdh / 2 + qrTop,
                qrWitdh / 2,
                0,
                Math.PI * 2,
                false
              );
              ctx.clip();
              ctx.drawImage(qrcode, qrLeft, qrTop, qrWitdh, qrWitdh);
              ctx.restore();
            };

            qrcode.onerror = (e) => {
              console.log(e);
              console.log(32423);
            };
          });
      } catch (error) {
      } finally {
      }
    },

    /* 2-保存海报 */
    async saveFile() {
      uni.showLoading({
        title: "保存中...",
      });
      const query = wx.createSelectorQuery();
      query
        .select("#share")
        .fields({
          node: true,
          size: true,
        })
        .exec(async (res) => {
          await new Promise((resolve, rej) => {
            uni.canvasToTempFilePath({
              canvas: res[0].node,
              success: (res) => {
                resolve(res.tempFilePath);
                uni.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: (data) => {
                    console.log("data-保存1", data);
                    uni.showToast({
                      icon: "success",
                      title: "保存成功",
                      success: () => {
                        this.show = false;
                      },
                    });
                  },
                  fail: (err) => {
                    uni.showToast({
                      title: "保存失败",
                      icon: "error",
                    });
                  },
                  complete: () => {
                    uni.hideLoading();
                  },
                });
              },
              fail: (res) => {
                console.log(res);
                rej(res);
              },
              complete: () => {
                uni.hideLoading();
              },
            });
          });
        });
    },
    /* 3-海报保存 */
    saveImg() {
      uni.getSetting({
        success: (res) => {
          uni.hideLoading();
          // 无权限
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                this.saveFile();
              },
              fail: () => {
                uni.showModal({
                  title: "提示",
                  content: "请设置允许访问相册，否则将无法使用该功能",
                  showCancel: false,
                  success: (res) => {
                    if (res.confirm) {
                      console.log("用户点击确定");
                      wx.openSetting({
                        success: (res) => {
                          this.saveFile();
                        },
                        fail(err) {
                          console.log(err);
                        },
                      });
                    } else if (res.cancel) {
                      console.log("用户点击取消");
                    }
                  },
                });
              },
            });
          } else {
            this.saveFile();
          }
        },
        fail() {},
      });
      // uni.getSetting({
      //   withSubscriptions: true,
      //   success: (res) => {
      //     console.log(res);
      //     if (res["authSetting"]["scope.writePhotosAlbum"]) {
      //       this.saveFile();
      //     } else {
      //       wx.openSetting({
      //         withSubscriptions: true,
      //         success: () => {
      //           wx.authorize({
      //             scope: "scope.writePhotosAlbum",
      //             success: async () => {
      //               this.saveFile();
      //             },
      //           });
      //         },
      //       });
      //     }
      //   },
      // });
    },

    /* 海报 */
    /* 1获取海报-临时地址 */
    async getImg() {
      try {
        uni.showLoading({
          title: "海报生成中",
        });
        //海报路径
        this.bgPath = await this.getImageInfo(this.curImgUrl);
        //二维码路径
        this.codePath = await this.transBase64(this.baseQR);
        console.log("this.codePath", this.codePath);
      } catch (error) {
        //
      } finally {
        uni.hideLoading();
      }
    },

    // 保存到系统相册
    saveShareImg() {
      // const that = this;
      uni.getSetting({
        success: (res) => {
          uni.hideLoading();
          // 无权限
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                this.saveFile();
              },
              fail: () => {
                uni.showModal({
                  title: "提示",
                  content: "请设置允许访问相册，否则将无法使用该功能",
                  showCancel: false,
                  success: (res) => {
                    if (res.confirm) {
                      console.log("用户点击确定");
                      wx.openSetting({
                        success: (res) => {
                          this.saveFile();
                        },
                        fail(err) {
                          console.log(err);
                        },
                      });
                    } else if (res.cancel) {
                      console.log("用户点击取消");
                    }
                  },
                });
              },
            });
          } else {
            this.saveFile();
          }
        },
        fail() {},
      });
    },
    /**
     * 生成base64二维码临时路径
     */
    transBase64(path) {
      const times = new Date().getTime();
      return new Promise((resolve, rej) => {
        wx.getFileSystemManager().writeFile({
          filePath: wx.env.USER_DATA_PATH + "/" + times + ".png",
          data: path,
          encoding: "base64",
          success: () => {
            resolve(wx.env.USER_DATA_PATH + "/" + times + ".png");
          },
          fail: (err) => {
            rej(err);
          },
        });
      });
    },
    /**
     * 获取图片信息
     * @param srcs 图片路径
     * @returns
     */
    getImageInfo(srcs) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: srcs,
          success: (res) => resolve(res.path),
          fail: (err) => reject(err),
        });
      });
    },
    genImage(src, ctx, canvas) {
      return new Promise((resolve, reject) => {
        const img = canvas.createImage();
        img.src = src;
        img.onload = () => {
          resolve(ctx.drawImage(img, 0, 0, canvas.width, canvas.height));
        };
      });
    },
    /* 关闭弹窗 */
    onClose() {
      this.show = false;
    },

    //分享点击
    async onClick(type) {
      console.log("type", type);
      this.flagType = type;
      //二维码获取
      switch (type) {
        case this.tapType.Canvas:
          await this.v_getFaceCode();
          this.v_postSource().then(() => {
            console.log("this.currentIndex", this.hbSourceList);
            this.curImgUrl = this.hbSourceList[this.currentIndex].picUrl[0];
            // this.getImg();
            this.show = true;
            // this.getCanvas();
          });

          //海报操作
          return;
        case this.tapType.Face:
          this.v_getXYcheck();
          this.v_getFaceCode();
          this.show = true;
          return;
      }
    },
    /* 复制文案 */
    onCopy() {
      uni.setClipboardData({
        data: this.hbSourceList[this.currentIndex].text,
        success: () => {
          uni.showToast({
            title: "文案复制成功",
            icon: "none",
          });
        },
      });
    },
    async getDanmuList() {
      const {data} = await Api.$getX(URLDistributor.chat);
      this.danmuList = data;
    },
  },
  onUnload() {
    clearInterval(this.$refs.barrage.interval);
    this.$refs.barrage.interval = null;
  },
};
</script>

<style scoped lang="scss">
.share-out {
  margin: 0;
  padding: 0;
  width: 750rpx;
  // min-height: 100vh;
  height: 1464rpx;
  position: relative;
  background-size: 100% 100%;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/008sharebg.png");
  overflow: auto;
}
.share-out-show {
  height: 100vh;
  // @extend .share-out;
  // background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/baidi-xiaoyou/baidi-xiaoyou-share.png");
}
// .share-image {
//   background-size: 100% 100%;
//   background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/008sharebg.png");
//   width: 100%;
//   height: 1464rpx;
// }
.btn-friends {
  position: absolute;
  top: 1064rpx;
  left: 94rpx;
  height: 88rpx;
  width: 542rpx;
  background: transparent;
  &::after {
    border: none;
  }
}
.btn-canvas {
  position: absolute;
  //   top: 1064rpx;
  bottom: 56rpx;
  left: 154rpx;
  height: 154rpx;
  width: 154rpx;
  background: transparent;
}
.btn-face {
  position: absolute;
  //   top: 1064rpx;
  bottom: 56rpx;
  //   left: 196rpx;
  right: 174rpx;
  height: 154rpx;
  width: 154rpx;
  background: transparent;
}
.padding-l-r {
  padding-left: 32rpx !important;
  padding-right: 32rpx !important;
}
.margin-lr {
  margin-left: 32rpx !important;
  margin-right: 32rpx !important;
}
.pop-main {
  // height: 200rpx;
  // padding: 50rpx 32rpx 72rpx 32rpx;
  padding: 48rpx 0 68rpx;
  overflow: auto;
  .topname {
    text-align: center;
    font-weight: bold;
    font-size: 34rpx;
    color: #000;
  }
  .toptip {
    color: #999999;
    margin-top: 24rpx;
    text-align: center;
  }
  .common-relative {
    position: relative;
  }
  .close-pop {
    border: none;
    width: 32rpx;
    height: 32rpx;
    position: relative;
    pointer-events: none;
    image {
      width: 100%;
      height: 100%;
    }
    &:after {
      position: absolute;
      left: 0;
      top: -30rpx;
      content: "";
      width: 60rpx;
      height: 60rpx;
      background: transparent;
      pointer-events: auto;
    }
  }
  .main-content {
    position: relative;
    margin-top: 64rpx;
    height: 618rpx;
    width: 686rpx;
    border-radius: 12rpx;
    background: #fff;
    border: 1rpx solid #def2ff;
    z-index: 999;
  }
  .main-phto {
    position: absolute;
    top: -54rpx;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    background: #f2fbff;
    z-index: 9991;
    width: 108rpx;
    height: 54rpx;
    border-radius: 108rpx 108rpx 0 0;
    border: 1rpx solid #def2ff;
    border-bottom: none;
    .phto-user {
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      // background: #49b7f0;
      margin: 12rpx auto;
      overflow: hidden;
      border: 1rpx solid #def2ff;
      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .user-msg {
    margin-top: 56rpx;
    text-align: center;
    .msg-name {
      font-size: 28rpx;
      font-weight: bold;
    }
    .msg-phone {
      font-size: 24rpx;
      color: #999999;
    }
  }
  .face-code {
    text-align: center;
    margin: 16rpx 0;
    .face-img {
      width: 440rpx;
      height: 440rpx;
      // border-radius: 50%;
    }
  }
  .action-flow {
    // margin-bottom: 72rpx;
    margin-top: 32rpx;
    background: #f8fdff;
    // background: #a6d328;
    // border: 2rpx solid #def2ff;
    // border-radius: 12rpx;
    height: 196rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 海报
  .main-canvas {
    .hides {
      position: fixed !important;
      left: -9000px;
    }
    margin-top: 32rpx;
    // 轮播
    .gundong {
      height: 570rpx;
    }
    .gundongItem {
      width: 300rpx;
      height: 570rpx;
      display: flex;
      justify-content: center;
    }
    .Item {
      width: 300rpx;
      height: 570rpx;
      background: #ffffff;
      // box-shadow: 0px 0px 30rpx 0px rgba(250, 60, 50, 0.3);
      position: relative;
    }
    .smItem {
      height: 390rpx;
      margin-top: 88rpx;
    }
    .shareImg {
      height: 100%;
      width: 100%;
      border: 4rpx solid rgba(0, 0, 0, 0.05);
      border-radius: 16rpx;
    }
    .code-img {
      position: absolute;
      bottom: 14rpx;
      right: 16rpx;
      width: 72rpx;
      height: 72rpx;
      overflow: hidden;
      border-radius: 50%;
      .qrcode {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .other-img {
      position: absolute;
      bottom: 10rpx;
      right: 12rpx;
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
      overflow: hidden;
      .qrcode {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .canvas-swiper {
      height: 570rpx;
      // background: #999999;
      margin-bottom: 32rpx;
      .content-img {
        height: 100%;
        width: 100%;
      }
    }
    // 推荐文案
    .canvas-text {
      padding: 0 67rpx;
      // padding-top: 568rpx;
      .text-content {
        margin: 16rpx 0 36rpx;
        padding-top: 16rpx;
        border-top: 2rpx dashed #f4f4f4;
      }
      .text-tip {
        color: #999999;
        font-size: 24rpx;
      }
      //三行
      .text-main {
        color: #666666;
        font-size: 24rpx;
        rich-text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;

          // line-height: 48rpx;
          max-height: 116rpx !important;
        }
        // rich-text {
        // color: #666666;
        // font-size: 24rpx;
        // overflow: hidden;
        // -webkit-line-clamp: 3;
        // -webkit-box-orient: vertical;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // max-height: 116rpx !important;
        // }
      }
      .copy-btn {
        margin-left: 16rpx;
        width: 80rpx;
        height: 40rpx;
        border-radius: 32rpx 32rpx 32rpx 32rpx;
        border: 1rpx solid #4cade0;
        text-align: center;
        color: #4cade0;
        font-size: 24rpx;
        // padding: 4rpx 0 2rpx;
      }
    }
    .save-btn {
      background: #1d9bdc;
      padding: 18rpx 0 20rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      border-radius: 60rpx;
      height: 80rpx;
    }
  }
}
.danmu-wrap {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 450rpx;
  left: 0;
}
</style>
