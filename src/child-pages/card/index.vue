<template>
  <!-- 滚动 -->
  <page-meta
    :page-style="'overflow:' + (show || showPanel ? 'hidden' : 'visible')"
  ></page-meta>
  <view
    class="card-detail-out"
    :class="[
      showPanel || showCanvas || showFace ? 'card-detail-out_popup' : '',
    ]"
  >
    <!-- 自定义头部 -->
    <hDefault :activeDom="activeDom" :showTabs="showTabs" :topName="'挑选礼物'">
      <view style="background: #fff">
        <!-- <view v-if="showTabs"> 111</view> -->
        <hRowSelect
          @onSelect="onSelect"
          :show="showTabs"
          :activeIndex="activeIndex"
          :data="cardBaseInfo.milkCardRatioDTOS"
        ></hRowSelect>
      </view>
    </hDefault>

    <!-- 内容 -->
    <view
      class="slot-main"
      :class="[showPop && 'slot-main-hidden']"
      :style="{ top: mainTop }"
    >
      <view class="card-main d-flex-colum">
        <view>
          <view class="card-top-tipname"> 挑选卡面 </view>
          <view class="card-img-content">
            <view class="current-img">
              <image :src="getAssetImgUrl(currentCardTheme.imgUrl)" />
            </view>

            <view class="scroll-img-row">
              <scroll-view
                scroll-x
                class="card-slider"
                :scroll-into-view="isNav && 'id' + currentCardTheme.id"
              >
                <view class="d-flex card-el-arr">
                  <view
                    :id="'id' + el.id"
                    v-for="(el, index) in cardTheme"
                    :key="index"
                    class="card-item"
                    @tap.stop="onCurrentImg(el, index)"
                  >
                    <img
                      :class="[
                        (activeImageIndex === index ||
                          currentCardTheme.id === el.id) &&
                          'active-image',
                      ]"
                      :src="getAssetImgUrl(el.imgUrl)"
                      alt=""
                      class="pro-card-img"
                    />
                    <img
                      v-if="
                        activeImageIndex === index ||
                        currentCardTheme.id === el.id
                      "
                      :src="getAssetImgUrl('gougou.png')"
                      class="pro-icon-img"
                    />
                  </view>
                </view>
              </scroll-view>
              <view class="card-main-tip font-26-6">挑选商品</view>
            </view>
          </view>
        </view>
        <view class="card-body flex-1">
          <view class="body-list padding032">
            <hRowSelect
              @onSelect="onSelect"
              :show="!showTabs"
              :activeIndex="activeIndex"
              :data="cardBaseInfo.milkCardRatioDTOS"
            >
              <!-- 优惠信息 -->
              <view
                v-if="showCouponList"
                slot="tikect"
                class="tikect-slot d-flex-center d-sb"
                @tap.stop="onOpenTikect"
              >
                <view class="d-flex-center flex-1 over-hidden-1">
                  <view class="tikect-item" v-if="cardBaseInfo.couponSymbol"
                    >优惠券</view
                  >
                  <view class="tikect-item" v-if="cardBaseInfo.reduceSymbol"
                    >满减</view
                  >
                  <view class="tikect-item" v-if="cardBaseInfo.giftsSymbol"
                    >满赠</view
                  >
                </view>
                <!-- <view class=""> -->
                <uni-icons type="right" size="16" color="#999999"></uni-icons>
                <!-- </view> -->
              </view>
            </hRowSelect>
            <view class="margintop24">
              <template v-for="(el, inx) in cardGoods.list">
                <view :key="inx" class="row-card-item">
                  <hRowCard :info="el" @onBuyNow="onBuyNow"></hRowCard>
                </view>
              </template>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 弹出层 -->
    <hPop @close="onClose" :show="showPop">
      <view class="pop-main" :style="{ height: popMaxHeight }">
        <!-- 主弹出 -->
        <view class="pop-padding32">
          <!-- 顶部图片 -->
          <view class="goods-card d-flex">
            <img
              :src="getAssetImgUrl(selectCard.imageUrl)"
              alt=""
              class="goods-card-img"
            />
            <view class="h-overflow-88-2 h-size32">
              {{ cardDetail.skuName ? cardDetail.skuName : "暂无" }}
            </view>
          </view>
          <!-- 规格 -->

          <view class="null-price">
            {{ cardPrice }}
          </view>
          <popDetail title="规格">
            <view class="size-item">{{ cardDetail.skuNickName }}</view>
          </popDetail>
          <!-- 份数 -->
          <popDetail title="份数">
            <view class="size-item">
              {{ cardDetail.milkAmount }}份
              <!-- {{ cardDetail.specs }} -->
            </view>
          </popDetail>
          <!-- 购买数量 -->
          <popDetail title="购买数量">
            <view class="d-flex-row-end size-num">
              <h-number-box
                buttonSize="48rpx"
                inputWidth="96rpx"
                inputHeight="56rpx"
                inputRadius="8rpx"
                color="#333333"
                min="1"
                max="1000"
                :asyncChange="true"
                :value="qty"
                v-model="qty"
                @change="changeVal"
                @blur="blurNumber"
              >
                <view slot="minus" />
                <view slot="size" class="size-str"> 张 </view>
                <view slot="plus" />
              </h-number-box>
            </view>
          </popDetail>
          <!-- 配送区域 -->
          <!-- <popDetail title="配送区域">
          <view class="area-item">
            <view
              class="d-flex-center d-sb"
              v-if="cardDetail.adminRegion"
              @tap.stop="onShowSendPop"
            >
              <text class="h-over-1">{{ cardDetail.adminRegion }}</text>
              <uni-icons type="right" size="12" color="#999999" />
            </view>
            <view
              v-if="cardDetail.customRegion && cardDetail.customRegion.length"
              class="area-item-others d-flex-center d-center"
              @tap.stop="toMaphb"
            >
              <text class="others-text">自定义区域</text>
              <uni-icons type="right" size="10" color="#a9a9a9" />
            </view>
          </view>
        </popDetail> -->
          <!-- 使用须知 -->
          <pop-detail title="使用须知">
            <view @tap.stop="onShowUsePop">
              <view class="d-flex-center d-sb">
                <view class="h-over-1 all-title-font">
                  <!-- <text> {{ textNotice ? "查看更多" : "暂无" }}</text> -->
                </view>
                <view>
                  <text class="all-title-font">
                    {{ textNotice ? "查看更多" : "暂无" }}</text
                  >
                  <uni-icons type="right" size="12" color="#999999" />
                </view>
              </view>
            </view>
          </pop-detail>
          <!-- 商品详情 -->
          <pop-detail title="商品详情" layout="cloum"> </pop-detail>
        </view>
        <view class="no-padding" style="width: 100%">
          <rich-text :nodes="textDetail"></rich-text>
        </view>
        <!-- 底部按钮 -->
        <hPopBuy
          @onPopBuy="onPopBuy"
          :data="cardDetail"
          :qty="qty"
          :price="noformatAmount(cardDetail.payAmount)"
          :sale="cardDetail.activitySymbol"
          :loading="disabled"
        >
        </hPopBuy>
        <!-- 底部按钮 -->

        <!-- 使用须知+配送区域弹出 -->
        <hPop @close="onCloseOne" :show="showPopOne">
          <view class="pop-main-2" style="height: 40%">
            <view class="top-popname">{{ popTitle }}</view>
            <view class="pop-main-text">
              <view v-if="showSendPop && showPopOne">{{
                cardDetail.adminRegion
              }}</view>
              <rich-text
                :nodes="textNotice"
                v-if="!showSendPop && showPopOne"
              ></rich-text>
            </view>
          </view>
        </hPop>
      </view>
    </hPop>

    <!-- 优惠券弹窗 -->
    <hPop :show="showTikect" @close="onCloseTikect">
      <view class="popup-tag-title">领券满减</view>
      <scroll-view scroll-y :style="{ height: popheightTikect }">
        <view class="popup-tag">
          <view
            v-if="
              cardBaseInfo.couponInfoDTOS.length && cardBaseInfo.couponSymbol
            "
          >
            <view class="popup-group-title"> 优惠券 </view>
            <view
              v-for="(el, index) in cardBaseInfo.couponInfoDTOS"
              :key="index"
            >
              <h-couponCollect :coupon="el" @handleCollect="handleCollect" />
            </view>
          </view>
        </view>
        <view
          class="popup-tag"
          v-if="cardBaseInfo.reduceDTOS.length && cardBaseInfo.reduceSymbol"
        >
          <view class="popup-group-title">满减</view>
          <view class="popup-coupon-box">
            <text
              class="popup-tag-item"
              v-for="(tag, index) in cardBaseInfo.reduceDTOS"
              :key="index"
            >
              {{ tag }}
            </text>
          </view>
        </view>
        <view
          class="popup-tag"
          v-if="cardBaseInfo.giftsSymbol && cardBaseInfo.giftsDTOS.length"
        >
          <view class="popup-group-title">满赠</view>
          <view class="popup-coupon-box">
            <text
              class="popup-tag-item h-overflow-2"
              v-for="(tag, index) in cardBaseInfo.giftsDTOS"
              :key="index"
            >
              {{ tag }}
            </text>
          </view>
        </view>
      </scroll-view>

      <view>
        <button
          class="btnback"
          :loading="false"
          hover-class="button-hover"
          @click="onCloseTikect"
        >
          返回
        </button>
      </view>
    </hPop>

    <!-- fc11小优分享 -->
    <!-- 分享可得金额 -->
    <xyShareBtn @onClickShare="onClickShare" />
    <!-- 分享弹窗 -->
    <xySharePop
      :showPanel="showPanel"
      @closeShare="closeShare"
      @openCanvasShare="openCanvasShare"
      @openShowShare="openShowShare"
    />
    <!-- 海报弹窗 -->
    <xyShareCanvas
      :showCanvas="showCanvas"
      @onCloseCanvas="onCloseCanvas"
      @onSaveHB="onSaveHB"
    >
      <view slot="canvasHb">
        <canvas canvas-id="canvas" style="width: 228px; height: 292px"></canvas>
      </view>
    </xyShareCanvas>
    <!-- <view class="share-canvas">
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
    <!-- <view class="hb-main">
              <view class="hb-img">
                <canvas
                  canvas-id="canvas"
                  style="width: 228px; height: 292px"
                ></canvas>
              </view>
              <view class="hb-save-btn" @click.stop="onSaveHB"
                >保存海报至相册</view
              >
            </view>
          </view>
        </u-popup>
      </view>  -->
    <!-- 面对面 -->
    <xyShareFace :show="showFace" :info="hbInfo" @onCloseFace="onCloseFace" />
  </view>
</template>

<script>
// import bigjs from "big.js";
import hRowSelect from "../components/h-row-select/index.vue";
import hRowCard from "../components/h-row-card/index.vue";
import hDefault from "../components/h-default/index.vue";
import hPop from "../components/pop/index.vue";
import popDetail from "./popDetail.vue";
import hPopBuy from "../components/h-pop-buy/index.vue";
import { mapMutations, mapState, mapActions } from "vuex";
import { pay, coupons, milkCard } from "@/utils/url";
import { funCalc, noformatAmount, throttle } from "@/utils/utils";
import api from "@/utils/api";
import { BaseApp } from "@/const/appIdConf";
import { acquireType } from "@/utils/enum";
import xyShareBtn from "../components/xy-share-btn/index.vue";
import xySharePop from "../components/xy-share-pop/index.vue";
import xyShareCanvas from "../components/xy-share-canvas/index.vue";
import xyShareFace from "../components/xy-share-face/index.vue";
export default {
  components: {
    hRowSelect,
    hRowCard,
    hDefault,
    hPop,
    popDetail,
    hPopBuy,
    xyShareBtn,
    xySharePop,
    xyShareCanvas,
    xyShareFace,
  },
  data() {
    return {
      popheightTikect: "0px",
      isNav: true,
      topName: "挑选礼物",
      bgName: "card-bg.png",
      bgHeight: "452rpx",
      activeDom: false,
      showTabs: false,
      showPop: false, //弹窗
      showPopOne: false, //子弹窗
      activeIndex: 0, // 选中的tab
      activeImageIndex: -1, // 选中的图片主题
      selectCard: {}, //选中的商品
      popMaxHeight: "0px",
      goodsSearchReq: {
        all: false,
        maxmum: 0,
        minimum: 0,
        page: 1,
        size: 10,
      },
      currentSelectedRange: {},
      qty: 1,
      disabled: false,
      showSendPop: false, //配送区域弹窗
      popTitle: "使用须知",
      // cardPrice: "", //待付金额
      showTikect: false, //是否显示优惠券
      showPanel: false,
      showCanvas: false,
      hbInfo: null,
      ctx: null,
      proQRcode: "",
      goodsImg: "",
      assetPath: "",
      tagPath: "",
      showFace: false,
      shareObj: {
        title: "",
        path: "/child-pages/card/index",
        imageUrl: "",
      },
      showXyBtn: false,
    };
  },
  async onLoad(options) {
    try {
      console.log("options-card-index", options);
      const xyInfo = uni.getStorageSync("xiaoyouInfo");
      if (xyInfo?.id) {
        this.showXyBtn = true;
      }
      let id, disId;
      if (options?.scene) {
        id = decodeURIComponent(options?.scene)?.split("&")?.[0]; //图片id
        disId = decodeURIComponent(options?.scene)?.split("&")?.[1]; //分销员id
      }

      if (!!id || options?.id) {
        //二维码+分享
        console.log("id,disId-0", id, disId);

        await this.codeInit(id || options.id); //设置默认选中卡面
      }
      if (!!disId || +options?.disId > 0) {
        console.log("id,disId-2", id, disId);
        this.v_setDistId(disId || options?.disId); //保存分销员ID
      }

      // await this.codeInit(59); //测试用

      await this.get_CardBaseInfo();
      if (
        this.cardBaseInfo.milkCardRatioDTOS &&
        this.cardBaseInfo.milkCardRatioDTOS.length > 0
      ) {
        this.currentSelectedRange = this.cardBaseInfo.milkCardRatioDTOS[0];
        this.activeIndex = this.currentSelectedRange.id;
        this.goodsSearchReq = {
          all: this.currentSelectedRange.all
            ? this.currentSelectedRange.all
            : false,
          maxmum: this.currentSelectedRange.maxmum * 100,
          minimum: this.currentSelectedRange.minimum * 100,
          page: 1,
          size: 10,
        };
        this.get_CardGoodsList(this.goodsSearchReq);
      } else {
        this.goodsSearchReq = {
          all: true,
          // maxmum: this.currentSelectedRange.maxmum * 100,
          // minimum: this.currentSelectedRange.minimum * 100,
          page: 1,
          size: 10,
        };
        this.get_CardGoodsList(this.goodsSearchReq);
      }
    } catch {
      //
    }
  },
  onUnload() {
    //清空
    this.set_CardGoodsList({
      list: [],
      total: 0,
    });
  },
  computed: {
    ...mapState("user", ["loginStatus"]),
    ...mapState("milkcard", [
      "cardTheme",
      "currentCardTheme",
      "cardBaseInfo",
      "cardGoods",
      "cardDetail",
      "orderDetail",
    ]),
    ...mapState("xiaoyou", ["distId"]),
    wxShareInfo() {
      if (this?.currentCardTheme) {
        const { shareImgUrl, cardTitle, id } = this.currentCardTheme;
        const xiaoyou = uni.getStorageSync("xiaoyouInfo");
        const xyId = xiaoyou?.id ? xiaoyou?.id : null;
        this.shareObj = {
          path: `/child-pages/card/index?disId=${xyId}&id=${id}`,
          imageUrl: shareImgUrl,
          title: cardTitle,
        };
      }
      return this.shareObj;
    },
    // 屏幕信息
    screenInfo() {
      console.log("uni.getWindowInfo()", uni.getWindowInfo());
      const { windowHeight } = uni.getSystemInfoSync();
      this.popMaxHeight = windowHeight * 0.8 + "px";
      this.popheightTikect = windowHeight * 0.6 + "px";
      return uni.getWindowInfo();
    },
    // 获取导航背景图
    topBg() {
      return {
        backgroundImage: `url(${this.getAssetImgUrl(this.bgName)})`,
        height: this.bgHeight,
      };
    },
    // 胶囊位置
    menuButtonInfo() {
      let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      return menuButtonInfo;
    },
    mainTop() {
      return this.menuButtonInfo.height + this.menuButtonInfo.top + 6 + "px";
    },
    //奶卡付款金额
    cardPrice() {
      const price = this.cardDetail.milkPrice ? this.cardDetail.milkPrice : 0;
      const num = funCalc([price, this.qty], 2);
      console.log("num-奶卡价格", num);
      return noformatAmount(num);
    },
    // 商品详情富文本
    textDetail() {
      return this.richText(this.cardDetail.detailContent);
    },
    // 使用须知富文本
    textNotice() {
      return this.richText(this.cardDetail.description);
    },
    showCouponList() {
      return (
        this.cardBaseInfo.giftsSymbol ||
        this.cardBaseInfo.couponSymbol ||
        this.cardBaseInfo.reduceSymbol
      );
    },
  },
  onPageScroll(e) {
    // console.log("页面e", e);
    const query = uni.createSelectorQuery().in(this);
    const domHeight = this.menuButtonInfo.height + this.menuButtonInfo.top + 6;
    query
      .select(".slot-main")
      .boundingClientRect((res) => {
        const currentHeight = res.top;
        this.activeDom = currentHeight < domHeight;
      })
      .exec();
    query
      .select(".card-body")
      .boundingClientRect((res) => {
        const currentHeight = res.top;
        this.showTabs = currentHeight < domHeight;
      })
      .exec();
  },
  onShareAppMessage() {
    return this.wxShareInfo;
  },
  methods: {
    ...mapMutations("milkcard", ["set_CurrentCardTheme", "set_CardGoodsList"]),
    ...mapActions("milkcard", [
      "get_CardBaseInfo",
      "get_CardGoodsList",
      "get_CardDetail",
      "post_CardCreateOrder",
      "post_CardTheme",
    ]),
    ...mapMutations("xiaoyou", ["v_setDistId"]),
    /* fc11↓ */
    // 处理分享
    handleParams(params) {
      const { shareImgUrl, cardTitle, id } = this.currentCardTheme;
      const xiaoyou = uni.getStorageSync("xiaoyouInfo");
      const xyId = params ? params : xiaoyou?.id || "";
      this.shareObj = {
        path: `/child-pages/card/index?disId=${xyId}&id=${id}`,
        imageUrl: shareImgUrl,
        title: cardTitle,
      };
    },
    async codeInit(id) {
      try {
        console.log("id->new", id);
        await this.post_CardTheme({ page: 1, id });
      } catch (error) {}
    },
    // fc11-奶卡分享
    onClickShare() {
      console.log("1", 1);
      this.showPanel = true;
    },
    /* fc11关闭分享 */
    closeShare() {
      this.showPanel = false;
    },
    // 组合海报基础信息
    async baseHBInfo() {
      try {
        const info = {
          shareImgUrl: this.currentCardTheme.shareImgUrl,
          cardTitle: this.currentCardTheme.cardTitle,
          milkSkuName: this.cardBaseInfo.milkSkuName,
          proQRcode: "",
        };
        this.hbInfo = info;
        await this.getQRCode();
        return info;
      } catch (error) {
        console.log("error", error);
      }
    },
    /* 海报弹窗 */
    openCanvasShare() {
      this.drawCanvas();
    },
    async openShowShare() {
      try {
        uni.showLoading({ title: "正在生成图片..." });
        await this.baseHBInfo();
        this.showFace = true;
      } catch (error) {
        console.log("error", error);
      } finally {
        uni.hideLoading();
      }
    },
    // 关闭面对面
    onCloseFace(e) {
      this.showFace = !e;
    },

    onCloseCanvas() {
      this.showCanvas = false;
    },
    // 获取海报二维码
    async getQRCode() {
      try {
        const { data } = await api.$getX(
          milkCard.wool + `${BaseApp.appid}/${this.currentCardTheme.id}`
        );
        this.proQRcode = data;
        this.hbInfo.proQRcode = data;
        console.log("this.hbInfo", this.hbInfo);
      } catch (error) {
        //
      }
    },
    //1. 生成海报
    /* 生成海报 */
    async drawCanvas() {
      try {
        uni.showLoading({
          title: "正在生成图片...",
          mask: true,
        });
        const info = await this.baseHBInfo();
        console.log("info", info);
        await this.getImgInfo(info.shareImgUrl);
        const ctx = wx.createCanvasContext("canvas");
        console.log("ctx", ctx);
        // return;
        // const dpr = wx.getSystemInfoSync().pixelRatio;
        const w = 228;
        const h = 292;
        ctx.width = w;
        ctx.height = h;
        ctx.drawImage(this.assetPath, 0, 0, w, h);
        this.drawContent(ctx);
        this.drawImg(ctx);
        ctx.draw(true);
        // 绘制标题
        let y = 192;
        let x = 16;
        let len = 16;
        let priceY = 350;
        let y3 = 232;
        let goodsName = info.milkSkuName;
        console.log("goodsName", goodsName);
        while (goodsName.length > 0 && y < 230) {
          let line = goodsName.substring(0, len);
          goodsName = goodsName.substring(len);
          if (y > 208) {
            goodsName.length > len &&
              (line = goodsName.substring(0, 10) + "...");
          }
          ctx.setFontSize(12);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign("left");
          // ctx.font = "normal bold 12px";
          ctx.fillText(line, x + 0.5, y + 17, w - 32);
          y += 17;
        }

        // 绘制二维码;
        let x1 = 168;
        let y1 = 232;
        let qWidth = w * 0.25;
        let codeW = 44;
        //二维码路径
        const data = await this.transBase64(info.proQRcode);
        ctx.drawImage(data, x1, y + 10, codeW, codeW);
        ctx.setFontSize(11);
        ctx.setFillStyle("#B1B1B1");
        ctx.fillText("长按二维码识别", x, y + 45);
        // // 绘制副标题
        y += 8;
        let titleName = info.cardTitle;
        while (titleName.length > 0 && y < 250) {
          let line = titleName.substr(0, len);
          titleName = titleName.substr(len);
          if (y > 249) {
            titleName.length > 4 && (line = titleName.substr(0, 3) + "...");
          }
          ctx.setFontSize(11);
          ctx.setFillStyle("#666666");
          ctx.setTextAlign("left");
          ctx.fillText(line, x, y + 17, w * 0.5);
          y += 12;
        }
        // let price =
        //   goods.rangeMaxPrice === goods.rangeMinPrice
        //     ? noformatAmount(goods.rangeMaxPrice)
        //     : noformatAmount(goods.rangeMinPrice) +
        //       "~" +
        //       noformatAmount(goods.rangeMaxPrice);
        // ctx.setFillStyle("#f9555c");
        // ctx.setTextAlign("left");
        // ctx.setFontSize(10);
        // ctx.fillText("￥", x, priceY + 20);
        // ctx.setFontSize(15);
        // ctx.fillText(price, x + 12, priceY + 20);
        // y += 20;
        // ctx.setFontSize(8);
        // ctx.setFillStyle("#999");
        // ctx.drawImage(this.tagPath, 130, 24, 93, 76);
        ctx.draw(true);
        this.ctx = ctx;
        this.showCanvas = true;
      } catch (error) {
        console.log("error-错误", error);
      } finally {
        uni.hideLoading();
      }
    },
    /* 1.1-获取图片信息 */
    /**
     * 获取图片信息
     * @param src 图片路径
     * @returns
     */
    getImageInfo(src) {
      console.log("src", src);
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src,
          success: (res) => resolve(res.path),
          fail: (err) => reject(err),
        });
      });
    },
    async getImgInfo(path) {
      // "https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-sharebg-icon.png";
      const assetPath =
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/hb-bg.png";
      const tagPath =
        "https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-share-tag-icon.png";
      // 商品图地址
      this.goodsImg = await this.getImageInfo(path);
      // 背景图
      this.assetPath = await this.getImageInfo(assetPath);
      //icon图
      this.tagPath = await this.getImageInfo(tagPath);
    },
    drawContent(ctx) {
      const x = 4;
      const y = 4;
      const w = 220;
      const h = 284;
      const r = 12;
      this.fillRoundRect(ctx, x, y, w, h, r, "#FFF");
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
    drawImg(ctx) {
      this.getImageInfos(ctx);
    },
    getImageInfos(ctx) {
      let qr_x = 4;
      let qr_y = 4;
      ctx.save();
      ctx.translate(qr_x, qr_y);
      const basePx = 220;
      ctx.clip();
      ctx.drawImage(this.goodsImg, 0, 0, basePx, 176);
      ctx.restore();
      ctx.draw(true);
    },
    // genImage(src, ctx, canvas) {
    //   return new Promise((resolve, reject) => {
    //     const img = canvas.createImage();
    //     img.src = src;
    //     img.onload = () => {
    //       resolve(ctx.drawImage(img, 0, 0, canvas.width, canvas.height));
    //     };
    //   });
    // },
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
            success: () => {
              this.showCanvas = false;
              // this.showPanel=false;
              uni.showTabBar({
                success: () => {
                  this.showPanel = false;
                },
              });
            },
          });
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
    /* 海报保存 */
    onSaveHB() {
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

    /* fc11↑ */

    changeVal(e) {
      uni.$u.debounce(this.changeNum(e), 2500);
      // uni.$u.throttle(this.changeNum(e), 2500);
    },
    blurNumber(e) {
      console.log("blur", e);
    },
    async changeNum(e) {
      try {
        await this.get_CardDetail({
          skuChannelCode: this.selectCard.channelSkuCode,
          qty: e.value,
          id: this.selectCard.id,
        });
        this.qty = e.value;
      } catch (error) {
        //
      }
    },
    // 优惠券领取
    // 领券
    async handleCollect(code) {
      try {
        const para = {
          acquireType: acquireType.CENTER,
          code,
        };
        const { msg } = await this.POST(coupons.getCoupon, para);
        uni.showToast({
          title: "领券成功",
          icon: "success",
          duration: 1500,
          success: async () => {
            await this.get_CardBaseInfo(); //刷新优惠券
          },
        });
      } catch (err) {
        //
      }
    },
    getCradInfoList(amount, params) {
      const obj = {
        id: params.id,
        goodsName: params.goodsName,
        goodsCode: params.goodsCode,
        skuName: params.skuName ? params.skuName : undefined,
        // discountAmount: 0,
        // freightAmount: 0,
        // totalAmount: amount * 100,
        qty: params.num ? params.num : this.qty,
        // unitPrice: this.cardDetail.milkPrice,
        present: false,
        // marketingCode: "",
        // marketingName: "",
        // marketingAmount: 0,
        // couponName: "",
        // couponCode: "",
        // couponAmount: 0,
        secKill: false,
      };
      return [obj];
    },
    // 支付
    onPopBuy() {
      uni.$u.throttle(this.onPopBuy2, 1500);
    },
    // 支付
    async onPopBuy2() {
      try {
        if (!this.loginStatus) {
          return uni.navigateTo({
            url: "/pages/user/relogin",
          });
        }
        this.disabled = true;
        const params = {
          remark: "",
          milkCardTemplateId: this.currentCardTheme.id,
          goodsInfoList: this.getCradInfoList(this.cardPrice, {
            goodsName: this.cardBaseInfo.milkSkuName,
            goodsCode: this.cardBaseInfo.milkSkuCode,
          }),
          deliveryGoodsInfoList: this.getCradInfoList(this.cardPrice, {
            id: this.cardDetail.id,
            goodsName: this.cardDetail.skuNickName,
            goodsCode: this.cardDetail.channelSkuCode,
            num: this.cardDetail.milkAmount,
            skuName: this.cardDetail.skuName,
          }),
        };
        // 小优
        console.log(
          "this.this.distId",
          this.distId,
          typeof this.distId == "number",
          this.distId != undefined && this.distId != "null"
        );
        if (typeof this.distId === "number") {
          params.orderExpand = { expandId: this.distId, type: "DISTRIBUTION" };
        }
        if (this.distId != "undefined" && this.distId != "null") {
          params.orderExpand = { expandId: this.distId, type: "DISTRIBUTION" };
        }
        await this.post_CardCreateOrder(params);
        // if()
        this.wechatPay();
      } catch (err) {
        console.log(err, "请求err");
        //
      } finally {
        this.disabled = false;
      }
    },
    // 微信支付
    async wechatPay() {
      try {
        if (!this.orderDetail.orderNo) return;
        const userInfo = uni.getStorageSync("userMsg");
        const para = {
          openId: userInfo.openId,
          appId: userInfo.appId,
          orderNo: this.orderDetail.orderNo,
          payMethodType: 0,
        };
        const { data } = await this.POST(pay.wechatPay, para, "加载中");
        let provider = "";
        uni.getProvider({
          service: "payment",
          success: (res) => {
            console.log(res, "00000000");
            provider = res.provider[0];
          },
        });
        uni.requestPayment({
          provider: provider,
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.packageValue,
          signType: data.signType,
          paySign: data.paySign,
          success: () => {
            uni.redirectTo({
              url: "/child-pages/card/payment?type=success",
            });
          },
          fail: (err) => {
            uni.switchTab({
              url: "/pages/order/order",
            });
          },
        });
      } catch (error) {
        //
      }
    },

    //地图
    toMaphb() {
      uni.navigateTo({
        url: "/child-pages/card-map/index",
      });
    },
    //配送区域弹窗
    onShowSendPop() {
      this.popTitle = "配送区域";
      this.showSendPop = true;
      this.showPopOne = true; //弹窗
    },

    //购买
    async onBuyNow(item) {
      if (!this.loginStatus) {
        return uni.navigateTo({
          url: "/pages/user/relogin",
        });
      }
      this.selectCard = item;
      this.qty = 1;
      await this.get_CardDetail({
        skuChannelCode: item.channelSkuCode,
        qty: 1,
        id: item.id,
      });
      // this.cardPrice = this.noformatAmount(
      //   funCalc([this.cardDetail.milkPrice, 1], 2)
      // ); //总价格显示计算出来的价格
      this.showPop = true;
    },
    //使用须知弹窗
    onShowUsePop() {
      if (!this.cardDetail.description) return;
      if (this.showSendPop) return;
      this.showPopOne = true; //弹窗
      this.popTitle = "使用须知";
    },
    // 关闭使用须知弹窗
    onCloseOne() {
      this.showPopOne = false;
      this.showSendPop = false;
    },
    // 关闭购买弹窗
    onClose() {
      // this.cardPrice = 0;
      this.showPop = false;
    },
    // 选中图片
    onCurrentImg(el, index) {
      // console.log(el, index, this.activeImageIndex);
      this.isNav = false;
      this.set_CurrentCardTheme(el);
      this.activeImageIndex = index;
    },
    // 优惠弹窗弹窗
    onOpenTikect() {
      console.log("2", this.showTikect);
      this.showTikect = true;
    },
    onCloseTikect() {
      this.showTikect = !this.showTikect;
    },
    // tab选择
    onSelect(i) {
      //清空
      this.set_CardGoodsList({
        list: [],
        total: 0,
      });
      const { id, maxmum, minimum } = i;
      this.currentSelectedRange = i;
      this.goodsSearchReq.page = 1;
      this.activeIndex = id;
      this.goodsSearchReq = {
        all: this.currentSelectedRange.all
          ? this.currentSelectedRange.all
          : false,
        maxmum: maxmum * 100,
        minimum: minimum * 100,
        page: 1,
        size: 10,
      };
      this.get_CardGoodsList(this.goodsSearchReq);
    },
    // 商品详情富文本
    richText(richTextData) {
      if (richTextData) {
        var richtext = richTextData;
        const regex = new RegExp("<img", "gi");
        const regex2 = new RegExp('src="/api', "gi");
        const regex3 = new RegExp("style=", "gi");
        richtext = richtext.replace(regex3, "");
        richtext = richtext.replace(regex2, `src="${this.$ServerBaseUrl}/api`);
        richtext = richtext.replace(
          regex,
          `<img style="width:100vw;display:block;height:auto;"`
        );
        return richtext;
      } else {
        return "";
      }
      // if (richTextData) {
      //   var richtext = richTextData;
      //   const regex = new RegExp("<img", "gi");
      //   const regex2 = new RegExp('src="/api', "gi");
      //   const regex3 = new RegExp('style=""', "gi");
      //   richtext = richtext.replace(regex2, `src="${this.$ServerBaseUrl}/api`);
      //   richtext = richtext.replace(regex3, "");
      //   richtext = richtext.replace(
      //     regex,
      //     `<img style="width:100%;display:block;height:auto;"`
      //   );
      //   return richtext;
      // } else {
      //   return "";
      // }
    },
  },
  onReachBottom() {
    console.log("---》触底");
    if (this.cardGoods.list.length >= this.cardGoods.total)
      return uni.showToast({
        title: "暂无更多",
        icon: "none",
      });
    this.goodsSearchReq.page = this.goodsSearchReq.page += 1;
    this.get_CardGoodsList(this.goodsSearchReq);
  },
};
</script>

<style scoped lang="scss">
.card-detail-out {
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
}
.card-detail-out_popup {
  overflow: hidden !important;
}

.slot-main {
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: 1000;
}
.slot-main-hidden {
  overflow: hidden;
}
.card-main {
  height: 100%;
  padding: 16rpx 0rpx 0rpx;
  .card-top-tipname {
    text-align: center;
    color: #e4f4ff;
  }
  .card-img-content {
    position: relative;
    // background: #ff0;
  }
  .current-img {
    width: 640rpx;
    height: 360rpx;
    margin: 16rpx auto 0rpx;
    border-radius: 24rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .scorll-theme {
    // background: #1d9bdc;
    height: 124rpx;
    display: flex;
    align-items: flex-end;
  }
  .scroll-img-row {
    padding: 0 32rpx;
  }
  .card-slider {
    // height: 100%;
    height: 124rpx;
  }
  .card-el-arr {
    // background: #ff0;
    height: 100%;
    align-items: flex-end;
  }
  .card-main-tip {
    // margin-top: 148rpx;
    // background: #f00;
    // padding-top: 24rpx;
    margin-top: 16rpx;
  }
  .pro-card-img {
    height: 100rpx;
    width: 180rpx;
    border: 4rpx solid transparent;
  }
  .card-item {
    display: flex;
    align-items: flex-end;
    width: 180rpx;
    // height: 100rpx;
    height: 100%;
    border-radius: 12rpx;
    margin-right: 16rpx;
    position: relative;

    .pro-icon-img {
      border-radius: 0;
      position: absolute;
      top: 5rpx;
      right: -14rpx;
      width: 48rpx;
      height: 48rpx;
      z-index: 10002;
    }
  }
  .active-image {
    border-color: #1d9bdc;
  }
  .padding032 {
    padding: 0 32rpx;
  }
  .card-body {
    // padding: 0 32rpx;
    margin-top: 16rpx;
    background: #fff;
    padding-top: 24rpx;
    padding-bottom: 68rpx;
  }
  .body-list {
    .margintop24 {
      margin-top: 24rpx;
    }
    .row-card-item {
      margin-bottom: 24rpx;
      padding-bottom: 24rpx;
      border-bottom: 2rpx solid #f4f4f4;
    }
    .row-card-item:last-child {
      border-bottom: none;
    }
    //优惠券插槽
    .tikect-slot {
      margin-bottom: 22rpx;
    }
    .over-hidden-1 {
      overflow: hidden;
      margin-right: 18rpx;
    }
    .tikect-item {
      margin-right: 8rpx;
      font-size: 22rpx;
      color: #f86c4d;
      border: 2rpx solid #f86c4d;
      border-radius: 8rpx;
      padding: 0 8rpx;
      text-align: center;
      height: 36rpx;
      // line-height: 36rpx;
      vertical-align: middle;
    }
  }
}
.pop-main-2 {
  @extend .pop-main;
  overflow: hidden !important;
  padding-bottom: 48rpx !important;
  .pop-main-text {
    overflow: auto;
    height: 100%;
    padding: 0 32rpx;
  }
}
//弹出框
.pop-main {
  .pop-padding32 {
    padding: 0 32rpx;
  }
  // padding: 48rpx 32rpx;
  padding: 48rpx 0rpx 174rpx;
  overflow: auto;
  // overflow-y: auto;
  .top-popname {
    text-align: center;
    color: #000000;
    font-size: 34rpx;
    font-weight: bold;
    margin-bottom: 32rpx;
  }
  // 图片
  .goods-card {
    padding: 0 64rpx 24rpx 16rpx;
    .goods-card-img {
      height: 96rpx;
      width: 96rpx;
      background: #f3f3f3;
      border-radius: 11rpx 11rpx 11rpx 11rpx;
      border: 1rpx solid #f4f4f4;
      margin-right: 16rpx;
    }
  }
  //规格-份数
  .size-item {
    text-align: center;
    padding: 10rpx 24rpx;
    color: #1d9bdc;
    font-size: 24rpx;
    background: #e4f4ff;
    border-radius: 16rpx;
    border: 1rpx solid #1d9bdc;
    display: inline-block;
    min-width: 102rpx;
  }
  //购买数量
  .size-num {
    width: 100%;
    .size-str {
      color: transparent;
      color: #333;
      font-weight: bold;
      font-size: 24rpx;
      margin-right: 4rpx;
      margin-left: 12rpx;
    }
  }
  //配送区域
  .area-item {
    font-size: 24rpx;
    color: #666666;
    .area-item-others {
      .others-text {
        margin-right: 8rpx;
      }
      padding: 0 8rpx;
      display: inline-block;
      color: #a9a9a9;
      margin-top: 8rpx;
      background: #f1f1f1;
      min-width: 128rpx;
      height: 40rpx;
      line-height: 40rpx;

      border-radius: 12rpx 12rpx 12rpx 12rpx;
    }
  }
  // 使用须知
  .all-title-font {
    font-size: 24rpx;
    color: #666666;
  }
  //商品详情
  .detail-img {
    width: 100%;
  }
}
.price-text {
  font-size: 34rpx;
  color: #333333;
  font-weight: bold;
}

// .pop-buy-out {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   width: 100%;
//   background-color: #f00;
//   .sale-tips {
//     padding: 14rpx 32rpx;
//     color: #db9918;
//     font-size: 26rpx;
//     background: #fff1d2;
//   }
//   .buy-main {
//     padding: 12rpx 32rpx;
//     border-top: 1rpx solid #f1f1f1;
//     background: #ffffff;
//     .buy-money-num {
//       align-items: flex-end;
//       padding-bottom: 8rpx;
//       font-size: 24rpx;
//       color: #333333;
//       font-weight: bold;
//       .money-26 {
//         font-size: 26rpx;
//         margin-left: 8rpx;
//       }
//       .money-34 {
//         font-size: 34rpx;
//       }
//     }
//     .buy-btn {
//       height: 84rpx;
//       line-height: 84rpx;
//       color: #ffffff;
//       background: #1d9bdc;
//       margin: 0;
//       border-radius: 254rpx;
//       font-size: 32rpx;
//       font-weight: bold;
//       padding: 0rpx 68rpx;
//     }
//   }
// }
.null-price {
  color: transparent;
  font-size: 2rpx;
}
// 优惠券
.popup-tag-title {
  padding-top: 48rpx;
  text-align: center;
  // margin-top: 24rpx;
  font-size: 34rpx;
  font-weight: 500;
  color: #000;
  padding-bottom: 26rpx;
}
.popup-group-title {
  font-weight: bold;
  color: #000;
  font-size: 30rpx;
  padding-left: 8rpx;
  padding-bottom: 26rpx;
}
.popup-coupon-box {
  padding-bottom: 56rpx;
}
.popup-tag {
  padding: 0 32rpx;
}
// .modal-popup {
//   height: 60%;
//   overflow-y: auto;
// }
.popup-tag-item {
  height: 30rpx;
  display: inline-block;
  padding: 0 8rpx;
  line-height: 32rpx;
  border: 2rpx solid #f86c4d;
  color: #f86c4d;
  font-size: 22rpx;
  border-radius: 8rpx;
  margin-right: 32rpx;
  margin-bottom: 24rpx;
}
.btnback {
  border-radius: 254rpx;
  width: 670rpx;
  height: 104rpx;
  line-height: 104rpx;
  color: #ffffff;
  font-size: 34rpx;
  font-weight: bold;
  background: #1d9bdc;
  margin-top: 32rpx;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: 48rpx;
}
// canvas海报
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
    // position: relative;
    width: 464rpx;
    // height: 810rpx;
    margin: 0 auto;
    // background: #1d9bdc;
    // border: 1rpx solid #1d9bdc;
  }
  .hb {
    width: 100%;
    height: 100%;
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
</style>
