<template>
  <view class="product">
    <view class="top">
      <view class="title">热销榜单</view>
      <view class="tips">-根据近7日销量、成交总额等数据每日更新-</view></view
    >
    <scroll-view class="tab" scroll-x="true">
      <view
        :class="{active: activeId === item.id, 'tab-item': true}"
        v-for="item in category"
        :key="item.id"
        @click="changeCategory(item)"
        >{{ item.name }}</view
      >
      <!-- <view>低温酸奶</view> -->
    </scroll-view>
    <scroll-view class="scroll-view" scroll-y="true">
      <view v-if="list.length === 0" style="margin-top: 30rpx"
        ><None><text>暂无数据</text></None></view
      >
      <view
        v-else
        class="list-item"
        v-for="(item, index) in list"
        :key="item.spuId"
      >
        <image
          v-if="index < 3"
          class="icon-number"
          :src="`https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/${listIndex[index]}.png`"
        />
        <view class="other" v-else>{{ index + 1 }}</view>
        <view class="left">
          <image
            class="product"
            :src="item.imageUrl"
            @click="gotoDetail(item)"
          />
        </view>
        <view class="right">
          <view class="name"
            ><view class="kill" v-if="item.kill">秒杀</view
            >{{ item.spuName }}</view
          >
          <view class="recent">{{ item.salesNum }}人近期买过</view>
          <view class="bottom">
            <view class="money"
              ><text>¥</text><text>{{ formatAmount(item.price) }}</text>
              <!-- <view class="coupon">券</view> -->
            </view>
            <view class="right-action">
              <view
                ><view class="return"
                  ><view>返{{ returnMoney(item) }}元</view></view
                >
                <image
                  class="share"
                  @click="openShare(item)"
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/shareicon.png"
              /></view>
              <view class="buy" @click="openModal(item)">购买</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <u-popup
      :show="showCanvas"
      @close="onCloseCanvas"
      :safeAreaInsetBottom="false"
      :round="6"
    >
      <view class="hb-content">
        <view class="d-flex-center d-sb">
          <view class="hb-tip flex-1">生成海报</view>
          <img
            @tap.stop="onCloseCanvas"
            class="close-icon"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/close.png"
            alt=""
          />
        </view>
        <view class="hb-text">
          将海报保存到手机相册，分享到朋友圈或者微信聊天
        </view>
        <!-- 海报内容 -->
        <view class="hb-main">
          <view class="hb-img">
            <canvas
              canvas-id="canvas"
              style="width: 464rpx; height: 810rpx"
              catchtouchend="XXX"
              catchtouchmove="XXX"
            ></canvas>
            <!-- <img :src="selectItem.imageUrl" alt="" class="hb" />
            <view>
              <view>
                {{ selectItem.spuName }}
              </view>
              <view>{{ selectItem.price | noformatAmount }}</view>
            </view>
            <image :src="proQRcode" mode="scaleToFill" class="hb-qrcode" /> -->
          </view>
          <view class="hb-save-btn" @click.stop="onSaveHB">保存海报至相册</view>
        </view>
      </view>
    </u-popup>
    <view class="share">
      <u-overlay :show="show" @click="closeShare" :opacity="0.45">
        <view class="bottom" @click.stop="stopPropagation">
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
    <Pop :show="showShare" @onClose="onCloseShare" :selfTop="true" viewH="78%">
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
          <image :src="`data:image/png;base64,${imageData}`"
        /></view>
        <view class="share-product">
          <view>分享商品</view>
          <view class="list-item">
            <view class="left">
              <image class="product" :src="selectItem.imageUrl" />
            </view>
            <view class="right">
              <view class="name"
                ><view class="kill" v-if="selectItem.kill">秒杀</view
                >{{ selectItem.spuName }}</view
              >
              <view class="recent">{{ selectItem.salesNum }}人近期买过</view>
              <view class="bottom">
                <view class="money"
                  ><text>¥</text
                  ><text>{{ formatAmount(selectItem.price) }}</text>
                </view>
                <view class="right-action"> </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </Pop>
    <!-- 海报分享 -->

    <view class="goods-modal">
      <!-- 弹框 -->
      <h-Modal
        :isOpen="isOpen"
        @close="closeMoadal"
        :shelf="productinfo.status"
      ></h-Modal>
    </view>
  </view>
</template>
<script>
import {XiaoyouProduct} from "@/utils/url";
import Pop from "../components/pop.vue";
import None from "../components/None.vue";
import {formatAmount, noformatAmount} from "@/utils/utils";
import hModal from "@/components/h-Modal/h-Modal.vue";
import Api from "@/utils/api";
import {mapState, mapActions} from "vuex";
export default {
  data() {
    return {
      show: false,
      category: [],
      activeId: "",
      list: [],
      listIndex: {
        0: "one",
        1: "two",
        2: "three",
      },
      selectItem: {},
      showShare: false,
      isOpen: false,
      imageData: "",
      showCanvas: false, //海报弹窗
      hbUrl: "", //当前海报
      goodsImg: "", //商品图
      assetPath: "", //海报背景图
      tagPath: "", //大力推荐图
      ctx: null,
    };
  },
  components: {Pop, hModal, None},
  onLoad() {
    // 设置默认的转发参数
    // uni.$u.mpShare = {
    //   title: "鲜推官招募", // 默认为小程序名称
    //   path: `/subPages/product/proDetail?id=${this.selectItem?.spuCode}&disId=${this.xiaoyouInfo?.id}`, // 默认为当前页面路径
    //   imageUrl: "", // 默认为当前页面的截图
    // };
  },
  onShareAppMessage() {
    return {
      title: "鲜推官招募", // 默认为小程序名称
      path: `/subPages/product/proDetail?id=${this.selectItem?.spuCode}&disId=${this.xiaoyouInfo?.id}&salesNum=${this.selectItem?.salesNum}`, // 默认为当前页面路径
      imageUrl: "", // 默认为当前页面的截图
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("xiaoyou", ["xiaoyouInfo", "proQRcode"]),
    ...mapState("product", ["xtags", "productinfo", "time"]),
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    ...mapActions("xiaoyou", ["v_getQRcode"]),
    ...mapActions("product", [
      "X_modaldetail",
      "X_ticket",
      "X_postStartSendTime",
      "X_skillTime",
    ]),
    gotoDetail(item) {
      uni.navigateTo({
        url: `/subPages/product/proDetail?id=${item?.spuCode}&disId=${this.xiaoyouInfo?.id}&salesNum=${item?.salesNum}`,
      });
    },
    async getCategory() {
      const {data} = await this.GET(
        `${XiaoyouProduct.tree}${this.userInfo.appId}`
      );
      this.category = data;
      this.activeId = data?.[0].id;
      this.getProductList();
    },
    changeCategory(item) {
      this.activeId = item.id;
      this.getProductList();
    },
    async getProductList() {
      const subList = this.category.find(
        (item) => item.id === this.activeId
      )?.children;
      const {data} = await this.POST(XiaoyouProduct.spuOfCategory, {
        appId: this.userInfo.appId,
        categoryId: this.activeId,
        categorySearchId: [this.activeId],
        distId: this.xiaoyouInfo?.id,
      });
      this.list = data;
    },
    scrollEnd() {},
    openShare(item) {
      console.log("item--分享", item);
      this.selectItem = item;
      const {imageUrl} = item;
      this.getImgInfo(imageUrl);
      this.show = true;
    },
    closeShare() {
      this.show = false;
    },
    returnMoney(item) {
      return `${
        item?.commission?.minCommission ? item?.commission?.minCommission : ""
      }~${
        item?.commission?.maxCommission ? item?.commission?.maxCommission : ""
      }`;
    },
    stopPropagation(ev) {
      ev.stopPropagation();
    },
    async openShowShare() {
      this.show = false;
      this.showShare = true;
      const {data} = await Api.$getX(
        `${XiaoyouProduct.getImage}${this.selectItem?.spuId}/${this.userInfo.appId}`
      );
      this.imageData = data;
    },
    onCloseShare() {
      this.showShare = false;
    },
    /* 海报分享开 */
    async openCanvasShare() {
      const {spuId} = this.selectItem;
      // this.v_getQRcode(spuId).then(() => {
      //   this.drawCanvas().then(() => {
      //     this.showCanvas = true;
      //   });
      // });
      await this.v_getQRcode(spuId);
      await this.drawCanvas();
      this.showCanvas = true;
      this.show = false;
    },

    /**
     * 获取图片信息
     * @param src 图片路径
     * @returns
     */
    getImageInfo(src) {
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src,
          success: (res) => resolve(res.path),
          fail: (err) => reject(err),
        });
      });
    },
    /* 海报分享关 */
    onCloseCanvas() {
      this.showCanvas = false;
    },
    /* 获取图片信息 */
    async getImgInfo(path) {
      const assetPath =
        "https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-sharebg-icon.png";
      const tagPath =
        "https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-share-tag-icon.png";
      // 商品图地址
      this.goodsImg = await this.getImageInfo(path);
      // 背景图
      this.assetPath = await this.getImageInfo(assetPath);
      //icon图
      this.tagPath = await this.getImageInfo(tagPath);
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
    drawContent(ctx) {
      this.fillRoundRect(ctx, 16, 76, 208, 308, 5, "#FFF");
    },
    fillRoundRect(ctx, x, y, width, height, radius, /*optional*/ fillColor) {
      //圆的直径必然要小于矩形的宽高
      if (2 * radius > width || 2 * radius > height) {
        return false;
      }
      ctx.save();
      ctx.translate(x, y);
      //绘制圆角矩形的各个边
      this.drawRoundRectPath(ctx, width, height, radius);
      ctx.setFillStyle(fillColor); //若是给定了值就用给定的值否则给予默认值
      ctx.fill();

      ctx.restore();
    },
    drawRoundRectPath(ctx, width, height, radius) {
      ctx.beginPath();
      //从右下角顺时针绘制，弧度从0到1/2PI
      ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
      //矩形下边线
      ctx.lineTo(radius, height);

      //左下角圆弧，弧度从1/2PI到PI
      ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

      //矩形左边线
      ctx.lineTo(0, radius);

      //左上角圆弧，弧度从PI到3/2PI
      ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

      //上边线
      ctx.lineTo(width - radius, 0);

      //右上角圆弧
      ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

      //右边线
      ctx.lineTo(width, height - radius);
      ctx.closePath();
    },
    drawRoundImg(ctx, width, height, radius) {
      ctx.beginPath();
      //从右下角顺时针绘制，弧度从0到1/2PI
      ctx.arc(width, height, radius, 0, 0);
      //矩形下边线
      ctx.lineTo(0, height);
      //左下角圆弧，弧度从1/2PI到PI
      ctx.arc(radius, height, radius, 0, 0);

      //矩形左边线
      ctx.lineTo(0, height);

      //左上角圆弧，弧度从PI到3/2PI
      ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

      //上边线
      ctx.lineTo(width - radius, 0);

      //右上角圆弧
      ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

      //右边线
      ctx.lineTo(width, height - radius);
      ctx.closePath();
    },
    drawImg(ctx) {
      // const path = getImageUrl(
      //   this.data.goodsDetail.spuAttachmentList[0].attachmentPath
      // );
      this.getImageInfos(ctx);
    },
    //nihao
    getImageInfos(ctx) {
      let qr_x = 16;
      let qr_y = 76;
      ctx.save();
      console.log("this.goodsimg--1", this.goodsImg);
      ctx.translate(qr_x, qr_y);
      this.drawRoundImg(ctx, 208, 208, 5);
      ctx.clip();
      ctx.drawImage(this.goodsImg, 0, 0, 208, 208);
      ctx.restore();
      ctx.draw(true);
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
    /* 生成海报 */
    async drawCanvas() {
      uni.showLoading({
        title: "正在生成图片...",
        mask: true,
      });

      let goods = this.selectItem;
      // wx.createSelectorQuery()
      //   .select("#canvas")
      //   .fields({
      //     node: true,
      //     size: true,
      //   })
      //   .exec(async (res) => {
      //     const canvas = res[0].node;
      //     const ctx = canvas.getContext("2d");
      //     const dpr = wx.getSystemInfoSync().pixelRatio;
      //     console.log("dpr", dpr, "--ctx--", ctx);
      //     canvas.width = res[0].width * dpr;
      //     canvas.height = res[0].height * dpr;
      //     await this.genImage(this.assetPath, ctx, canvas);
      //     const qrcode = canvas.createImage();
      //     // console.log("this.proQRcode", this.proQRcode);
      //     const qrurl = await this.transBase64(this.proQRcode);
      //     console.log("qrurl", qrurl);
      //     qrcode.src = qrurl;
      //     qrcode.onload = () => {
      //       const qrWitdh = 48 * dpr;
      //       const qrTop = canvas.height - qrWitdh - 18;
      //       const qrLeft = canvas.width - qrWitdh - 18;
      //       ctx.save();
      //       ctx.beginPath();
      //       // 画圆
      //       ctx.arc(
      //         qrWitdh / 2 + qrLeft,
      //         qrWitdh / 2 + qrTop,
      //         qrWitdh / 2,
      //         0,
      //         Math.PI * 2,
      //         false
      //       );
      //       ctx.clip();
      //       ctx.drawImage(qrcode, qrLeft, qrTop, qrWitdh, qrWitdh);
      //       ctx.restore();
      //     };
      //     let y = 307;
      //     let y1 = y;
      //     let x = 24;
      //     let len = 13;
      //     let priceY = 349.5;
      //     let y3 = 296;
      //     let goodsName = goods.spuName;
      //     while (goodsName.length > 0 && y < 337) {
      //       let line = goodsName.substr(0, len);
      //       goodsName = goodsName.substr(len);
      //       console.log(y);
      //       if (y > 330) {
      //         console.log(goodsName);
      //         goodsName.length > 4 && (line = goodsName.substr(0, 3) + "...");
      //       }
      //       ctx.setFontSize(9);
      //       ctx.fillStyle("#333333");
      //       ctx.setTextAlign("left");
      //       ctx.fillText(line, x, y, ctx.width * 0.5);
      //       y += 12;
      //       console.log(y);
      //     }
      //   });
      // return;
      const ctx = wx.createCanvasContext("canvas");

      // ctx.setFillStyle("gray");
      ctx.width = uni.upx2px(464);
      ctx.height = uni.upx2px(810);
      console.log("ctx", ctx);
      ctx.drawImage(this.assetPath, 0, 0, ctx.width, ctx.height);
      // return;
      this.drawContent(ctx);
      this.drawImg(ctx);
      // ctx.draw(true)
      // 绘制标题
      let y = 307;
      let y1 = y;
      let x = 24;
      let len = 13;
      let priceY = 349.5;
      let y3 = 296;
      let goodsName = goods.spuName;
      while (goodsName.length > 0 && y < 337) {
        let line = goodsName.substr(0, len);
        goodsName = goodsName.substr(len);
        console.log(y);
        if (y > 330) {
          console.log(goodsName);
          goodsName.length > 4 && (line = goodsName.substr(0, 3) + "...");
        }
        ctx.setFontSize(9);
        ctx.setFillStyle("#333333");
        ctx.setTextAlign("left");
        ctx.fillText(line, x, y, ctx.width * 0.5);
        y += 12;
        console.log(y);
      }

      // 绘制二维码
      let x1 = ctx.width * 0.6 + 10;
      let qWidth = ctx.width * 0.25;
      // if (this.data.codeUrl) {
      // const res = await this.getQrcode();
      // const times = new Date().getTime();
      // const data = await new Promise((resolve, rej) => {
      //   wx.getFileSystemManager().writeFile({
      //     filePath: wx.env.USER_DATA_PATH + "/" + times + ".png",
      //     data: res.data,
      //     encoding: "base64",
      //     success: () => {
      //       resolve(wx.env.USER_DATA_PATH + "/" + times + ".png");
      //     },
      //   });
      // });
      //二维码路径
      const data = await this.transBase64(this.proQRcode);
      console.log(data);
      ctx.drawImage(data, x1, y3, qWidth, qWidth);
      ctx.setFontSize(7.5);
      ctx.setFillStyle("#999");

      ctx.fillText("扫码下单", x1 + 17, y3 + qWidth + 16);
      // 绘制价格
      y += 12;
      let price =
        goods.rangeMinPrice === goods.rangeMaxPrice
          ? noformatAmount(goods.rangeMinPrice)
          : noformatAmount(goods.rangeMinPrice) +
            "~" +
            noformatAmount(goods.rangeMaxPrice);
      ctx.setFillStyle("#f9555c");
      ctx.setTextAlign("left");
      ctx.setFontSize(10);
      ctx.fillText("￥", x, priceY);
      ctx.setFontSize(15);
      ctx.fillText(price, x + 12, priceY);
      y += 20;
      ctx.setFontSize(7.5);
      ctx.setFillStyle("#999");
      // let username =
      //   wx.getStorageSync("xiaoyouInfo") &&
      //   wx.getStorageSync("xiaoyouInfo").realName
      //     ? wx.getStorageSync("xiaoyouInfo").realName
      //     : wx.getStorageSync("userInfo").username;
      // let nameY = priceY + 22;
      // ctx.fillText(`您的好友：${username}`, x, nameY);
      ctx.drawImage(this.tagPath, 130, 24, 93, 76);
      ctx.draw(true);
      this.ctx = ctx;
      uni.hideLoading();
    },
    /* 海报保存 */
    onSaveHB() {
      console.log("保存海报", 1);
      // let self = this;
      uni.getSetting({
        success: (res) => {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                this.saveFile();
              },
            });
          } else {
            this.saveFile();
          }
        },
      });
    },
    /* 存海报 */
    async saveFile() {
      uni.showLoading({
        title: "保存中...",
      });
      const path = await new Promise((resolve, rej) => {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.ctx.width,
          height: this.ctx.height,
          destWidth: this.ctx.width * 4,
          destHeight: this.ctx.height * 4,
          canvasId: "canvas",
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (res) => {
            console.log(res);
            rej(res);
          },
        });
      });
      uni.saveImageToPhotosAlbum({
        filePath: path,
        success: (data) => {
          uni.showToast({
            icon: "success",
            title: "保存成功",
          });
          // this.setData({
          //   showPoster: false,
          //   showShare: false,
          // });
        },
        fail: (err) => {
          console.log(err);
          // this.setData({
          //   showPoster: false,
          //   showShare: false,
          // });
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
    // $on关闭
    closeMoadal(val) {
      this.isOpen = val;
    },
    openModal(item) {
      this.isOpen = true;
      //加号
      const spuId = item.spuCode;
      this.X_modaldetail(spuId).then(() => {
        this.X_ticket();
      });
    },
    formatAmount(val) {
      return formatAmount(val, false);
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  .top {
    position: relative;
    width: 100vw;
    height: 200rpx;
    text-align: center;
    background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/product-bg.png");
    background-size: 100% 100%;
    .title {
      font-size: 40rpx;
      font-weight: 500;
      color: #f6f6f6;
      line-height: 56rpx;
      padding-top: 66rpx;
      padding-bottom: 16rpx;
    }
    .tips {
      font-size: 22rpx;
      color: #ffddd6;
      line-height: 26rpx;
    }
    .top-bg {
      width: 100vw;
      height: auto;
    }
  }
  .tab {
    padding: 16rpx 50rpx 8rpx;
    text-align: center;
    height: 92rpx;
    white-space: nowrap;
    .tab-item {
      font-size: 30rpx;
      font-weight: 500;
      color: #333333;
      margin: 0rpx 20rpx;
      min-width: 168rpx;
      width: 168rpx;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 58rpx;
      height: 66rpx;
      display: inline-block;
    }
    .active {
      background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/tab-bg.png");
      background-size: 100% 100%;
      color: #fff;
    }
  }
  .scroll-view {
    height: calc(100vh - 300rpx);
    padding: 0rpx 24rpx;
  }

  .coupon {
    display: inline-block;
    width: 36rpx;
    height: 36rpx;
    text-align: center;
    line-height: 32rpx;
    background: #fff;
    font-size: 22rpx;
    color: #f86c4d;
    border: 2rpx solid #f86c4d;
    border-radius: 4rpx;
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
      line-height: 36rpx;
      height: 72rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -moz-box;
      -moz-line-clamp: 2;
      -moz-box-orient: vertical;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
      overflow: hidden;
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
        white-space: nowrap;
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
.hb-content {
  padding: 48rpx 24rpx 68rpx;
  background: #ffffff;
  .hb-tip {
    text-align: center;
    font-weight: bold;
    font-size: 34rpx;
  }
  .close-icon {
    border: none;
    width: 32rpx;
    height: 32rpx;
  }
  .hb-text {
    color: #999999;
    margin-top: 24rpx;
    margin-bottom: 32rpx;
    font-size: 24rpx;
    text-align: center;
  }
}
.hb-main {
  .hb-img {
    position: relative;
    width: 464rpx;
    height: 810rpx;
    margin: 0 auto;
    // background: #1d9bdc;
    // border: 1rpx solid #1d9bdc;
  }
  .hb {
    width: 100%;
    height: 100%;
  }
  .hb-qrcode {
    position: absolute;
    bottom: 18rpx;
    right: 18rpx;
    width: 72rpx;
    height: 72rpx;
  }
  .hb-save-btn {
    margin-top: 70rpx;
    border-radius: 60rpx;
    color: #ffffff;
    font-weight: bold;
    padding: 18rpx 0 22rpx;
    text-align: center;
    font-size: 32rpx;
    background: #1d9bdc;
  }
}
// 弹出
.goods-modal {
  height: 80%;
}
</style>
