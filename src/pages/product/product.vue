<template>
  <view class="product-out">
    <!-- 骨架 -->
    <h-Prolist v-if="loading" />
    <view v-else>
      <view class="top-search">
        <!-- 顶部搜索框 -->
        <view :style="{ paddingTop: setting.top + 'px' }">
          <view
            @tap="search"
            class="search"
            :style="{
              height: setting.height + 'px',
              width: setting.left - 100 + 'px',
              borderRadius: setting.height + 'px',
            }"
          >
            <uni-icons type="search" color="#999999" size="18" class="icons" />
            请输入关键字
          </view>
        </view>
        <!-- 定位选择 -->
        <!-- <h-Mapcheck /> -->
      </view>
      <!-- 下单弹窗 START -->
      <view class="goods-modal">
        <!-- 弹框 -->
        <h-Modal
          :isOpen="isOpen"
          @close="closeMoadal"
          @buyCar="buyCar"
          :shelf="productinfo.status"
        ></h-Modal>
      </view>
      <!-- 商品列表 -->
      <view
        class="goods-check d-flex"
        :style="'height:' + clentHeight + 'px;'"
        v-if="existArr.length && treeLeft.length"
      >
        <scroll-view
          class="left-tab"
          scroll-y="true"
          :style="'height:' + clentHeight + 'px;'"
        >
          <view
            v-for="(i, index) in treeLeft"
            @click="changebar(index, i)"
            :key="index"
            :class="[
              activeTab === index ? 'left-tab--active' : '',
              activeTab === index + 1 ? 'left-tab--active-before' : '',
              activeTab === index - 1 ? 'left-tab--active-after' : '',
            ]"
            class="left-tab"
          >
            <view
              v-show="activeTab == 0"
              :class="activeTab === index ? 'activeTop' : ''"
            >
            </view>
            <!-- <text v-if="i.name.length <= 4">{{ i.name }}</text>
            <text v-else class="h-over-1 spu-class"
              >{{ i.name.slice(0, 4) }}...</text
            > -->
            <text class="h-overflow-2 spu-class-fc11">{{ i.name }}</text>
          </view>
          <view class="right-goods-bottom">
            <!--鲜活加大卖--占位 -->
          </view>
        </scroll-view>
        <view>
          <view class="topname">
            <!-- 一级 -->
            <!-- <view
              :class="[iosFont ? 'font-ios' : 'font-android', 'big-name']"
              >{{ topRightList.name }}</view
            > -->
            <!-- 二级 -->
            <scroll-view
              scroll-x="true"
              class="scroll-son-x"
              :scroll-into-view="scrollinto"
            >
              <view
                class="d-flex-center"
                v-if="topRightList.children.length != 0"
              >
                <view
                  v-for="(item, index) in topRightList.children"
                  :id="'son' + index"
                  :key="item.id"
                  class="top-tag"
                  :class="[
                    activeTag == index ? 'h-tag-success' : '',
                    iosFont ? 'font-ios' : 'font-android',
                  ]"
                  @tap="bindClickTag(item, index)"
                  >{{ item.name }}</view
                >
                <!-- <view  class="top-tag" style="width:100rpx;background:#f00"></view> -->
              </view>
            </scroll-view>
          </view>
          <!-- 右侧列表 -->
          <scroll-view
            class="right-tab"
            scroll-y="true"
            @scrolltolower="scrollBot"
            :style="'height:' + clentHeight + 'px;'"
          >
            <view>
              <view v-if="goodList.length" style="width: 510rpx">
                <view
                  v-for="son in goodList"
                  :key="son.id"
                  class="d-flex right-goods"
                >
                  <image
                    class="goods-img"
                    :src="son.imageUrl"
                    mode="aspectFit"
                    @tap.stop="() => buyGoods(son, '1')"
                  ></image>
                  <view class="d-flex-colum d-sb" style="width: 310rpx">
                    <view>
                      <view
                        :class="[
                          iosFont ? 'font-ios' : 'font-android',
                          'h-overflow-2',
                          'color-33',
                        ]"
                        @tap.stop="() => buyGoods(son, '1')"
                      >
                        <text v-show="son.kill" class="seckill-tag">秒杀</text>
                        {{ son.spuName }}
                      </view>
                      <view class="d-flex-center" style="margin-top: 16rpx">
                        <view v-if="son.coupon" class="h-ticket">优惠券</view>
                        <view v-if="son.fullMinus" class="h-sale-tag"
                          >满减</view
                        >
                        <view v-if="son.gift" class="h-sale-tag">满赠</view>
                      </view>
                    </view>
                    <view>
                      <CardXy :info="son" @shareXiaoYou="shareXiaoYou" />
                    </view>
                    <view
                      class="d-flex-row d-sb pro-addcar"
                      :style="{ marginTop: '12rpx' }"
                    >
                      <view
                        @click.stop="() => buyGoods(son, '1')"
                        style="color: #f86c4d; font-size: 34rpx"
                        :class="[iosFont ? 'font-ios' : 'font-android']"
                      >
                        {{ son.price | formatAmount }}
                      </view>
                      <view class="buy-btn" @tap="() => openModal(son)"
                        >购买</view
                      >
                      <!-- <u-icon
                        name="plus-circle-fill"
                        color="#1f96e1"
                        size="24"
                        @click="() => openModal(son)"
                      ></u-icon> -->
                    </view>
                  </view>
                </view>

                <view class="right-goods-bottom">
                  <!-- ---到底了--- -->
                </view>
              </view>
              <view
                v-else-if="!goodList.length && !rightLoading"
                class="font-22 color-99 text-center"
                style="width: 510rpx"
                >暂无数据</view
              >
            </view>
          </scroll-view>
        </view>
      </view>

      <!-- 暂无商品 -->
      <view v-else class="nomore-product">
        <view>
          <image
            class="nomore-img"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png"
            mode="scaleToFill"
          />
          <view class="nomore-tex">当前区域没有可售卖的商品</view>
          <view class="act-btn" @tap="chooseAdd">重新选择地址</view>
        </view>
      </view>
    </view>

    <!-- bs小优 -->
    <view>
      <view class="share">
        <u-overlay :show="showPanel" @click="closeShare" :opacity="0.45">
          <view class="bottom" @click.stop="stopPropagation">
            <view class="title">分享说明</view>
            <view class="tips"
              >1.好友购买的商品数量越多，您可以获得的佣金也会越高。2.可以通过微信好友将商品分享到微信聊天中，可以生成海报发布到朋友圈或者微信聊天里面。</view
            >
            <view class="list">
              <view class="share-view"
                ><button
                  open-type="share"
                  class="share-btn-view"
                  @tap="onShareBtn"
                >
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
      <!-- 分享canvas -->
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
                style="width: 242px; height: 405px"
              ></canvas>
            </view>
            <view class="hb-save-btn" @click.stop="onSaveHB"
              >保存海报至相册</view
            >
          </view>
        </view>
      </u-popup>
      <!-- 面对面 -->
      <faceShare
        :show="showFaceShare"
        v-on:onCancel="onFaceShareCancel"
        :product="productInfoXiaoyou"
      />
    </view>
    <hXiaoyou />
  </view>
</template>
<script>
import hNone from "@/components/h-none/h-none.vue";
import { COUPON_SOURCE } from "@/utils/enum";
import api from "@/utils/api";
// import Checkmap from "./comms/Checkmap.vue";

import { formatAmount, noformatAmount } from "@/utils/utils";
import { mapActions, mapMutations, mapState } from "vuex";
import { Global_Cog } from "@/utils/config";
// const rrpx = uni.upx2px(88); //顶部高度
import CardXy from "./components/card-xy.vue";
import FaceShare from "@/pages/homepage/component/FaceShare.vue";
import hXiaoyou from "@/pages/homepage/component/h-xiaoyou.vue";
import { BaseApp } from "@/const/appIdConf";
export default {
  components: { hNone, CardXy, FaceShare, hXiaoyou },

  data() {
    return {
      rightLoading: true,
      BaseApp,
      loading: false, //骨架屏
      // rrpx: rrpx,
      isOpen: false,
      shelfStatus: "0",
      activeTag: 0, //激活的二级tag
      activeTab: 0, //激活左边index
      treeLeft: [],
      topRightName: "", //右侧大标题
      categorySearchId: [], //商品分类id
      goodList: [], //商品列表
      topRightList: [], //右侧分类
      // 状态栏高度信息
      setting: {
        top: uni.getMenuButtonBoundingClientRect().top,
        height: uni.getMenuButtonBoundingClientRect().height,
        left: uni.getMenuButtonBoundingClientRect().left,
      },
      activeKey: 0,
      scrollinto: "son" + 0,
      data: {
        size: 10,
        page: 1,
      },
      clentHeight: 0, //高度
      appId: Global_Cog.APPID,
      defaultTime: "",
      price: "",

      //小y
      showPanel: false, //  显示分享面板
      showCanvas: false, // 显示canvas
      canvasInfo: {}, //canvas信息
      ctx: null,
      goodsImg: "", //商品图
      assetPath: "", //海报背景图
      tagPath: "", //大力推荐图
      showFaceShare: false, //面对面
      productInfoXiaoyou: {}, //小y商品信息
      shareDTO: {
        title: BaseApp.shareTxT, // 默认为小程序名称
        path: "/pages/product/product", // 默认为当前页面路径
        imageUrl: "", // 默认为当前页面的截图
      },
      xyPath: "/pages/product/product", //小y分享路径
      COUPON_SOURCE,
    };
  },
  onShow() {
    if (!this.showPanel && !this.isOpen) {
      uni.showTabBar();
    }
    // const exarr = uni.getStorageSync("exArr"); //营销区域
    this.getTree();
  },
  onReady() {},
  async onLoad(options) {
    await this.$onLaunched;
    this.activeTab = 0;
    this.loading = true;
    this.getSys();
    const xy = uni.getStorageSync("xiaoyouInfo");
    if (xy && xy.id) {
      this.xyPath = this.xyPath + "?xyPid=" + xy.id;
    }
    if (options.xyPid) {
      this.v_setDistId(options.xyPid);
    }

    this.shareDTO = {
      title: BaseApp.shareTxT, // 默认为小程序名称
      path: this.xyPath, // 默认为当前页面路径
      imageUrl: "", // 默认为当前页面的截图
    };
  },
  onShareAppMessage() {
    console.log("this.shareDTO", this.shareDTO);
    return this.shareDTO;
  },
  onHide() {
    this.isOpen = false;
    // if (!this.isOpen) {
    // }
  },
  computed: {
    ...mapState("xiaoyou", ["proQRcode"]),
    ...mapState("product", ["xtags", "productinfo", "time"]),
    ...mapState("css", ["iosFont"]),
    ...mapState("home", ["existArr", "addInfoMsg"]),
  },
  watch: {
    // 监听营销区域变化-根据营销区域判断
    existArr(newVal, oldVal) {
      const newLength = newVal.length;
      const oldLength = oldVal.length;
      // 营销区域有变化
      if (newLength !== oldLength) {
        this.getGoodsList();
      } else {
        // 营销区域有变化
        const newArr = JSON.parse(JSON.stringify(newVal));
        const oldArr = JSON.parse(JSON.stringify(oldVal));
        if (newArr.sort().toString !== oldArr.sort().toString) {
          this.getGoodsList();
        }
      }
    },
    // isOpen(newVal, oldVal) {
    //   console.log("newVal,oldVal", newVal, oldVal);
    //   if (!newVal)
    //     // this.hideTabBar();
    //     uni.showTabBar();

    //   // } else {
    //   //   this.showTabBar();
    //   // }
    // },
  },
  methods: {
    ...mapActions("xiaoyou", ["v_getQRcode"]),
    ...mapMutations("xiaoyou", ["v_setDistId"]),
    ...mapActions("product", [
      "X_modaldetail",
      "X_ticket",
      "X_postStartSendTime",
      "X_skillTime",
    ]),
    ...mapMutations("order", ["V_setorderPar"]),

    ...mapMutations("product", ["check", "setTime", "setTimeArr"]),
    // 初始化布局高度信息
    getSys() {
      // 获取屏幕高度
      const system = uni.getSystemInfoSync();
      //获取胶囊布局v2.1.0版本库
      const top = uni.getMenuButtonBoundingClientRect();
      console.log("system--高度", system, "top-->", top);
      const { windowHeight } = system;
      const scrollHeight = windowHeight - top.bottom;
      console.log("scrollHeight", scrollHeight);
      this.clentHeight = scrollHeight;
    },
    //重新选择地址
    chooseAdd() {
      uni.navigateTo({
        url: "/subPages/homeSub/chooseAdd/chooseAdd",
      });
    },
    // 点开modal
    openModal(item) {
      //加号
      const spuId = item.spuCode;
      this.V_setorderPar({
        couponCode: null, //优惠券编码
        defaultCouponCodeFlag: null,
      });
      this.X_modaldetail(spuId).then(() => {
        this.X_ticket();
      });
      uni.hideTabBar({
        success: () => {
          this.isOpen = true;
        },
      });
    },
    // 配送时间范围
    async postSendTime() {
      try {
        const params = {
          channelSkuCode: this.productinfo.goodscode,
          deliveryCount: this.productinfo.defaultNum, //每次配送
          rule: this.productinfo.ruleEnum,
          startTime: this.productinfo.time ? this.productinfo.time : this.time,
          totalCount: this.productinfo.max,
        };
        const { data } = await api.$post(this.urlapi.product.calendar, params);
        this.setTimeArr(data.timeList);
        console.log("modal配送时间", data);
      } catch (err) {}
    },

    // $on关闭
    closeMoadal(val) {
      this.isOpen = val;
      uni.showTabBar({
        animation: true,
      });
    },
    buyCar(open) {
      console.log("open", open);
      this.isOpen = !open;
    },
    // 滚动条触底
    scrollBot() {
      console.log("触底了");
    },

    // 右上角tag  二级分类
    bindClickTag(val, index) {
      this.activeTag = index;
      this.categorySearchId = [val.id];
      this.getGoodsList();
    },
    // 获取左边
    async getTree() {
      try {
        this.loading = true;
        const exarr = uni.getStorageSync("exArr"); //营销区域
        // 一级树形分类
        const { data } = await api.$post(
          this.urlapi.product.tree,
          { appId: this.appId, areaCodes: exarr || [] },
          " ",
          true
        );
        this.treeLeft = data;
        this.topRightList =
          this.activeTag === 0 && this.activeTab === 0
            ? data[0]
            : data[this.activeTab]; //默认赋值
        if (data[this.activeTab]?.children[this.activeTag].id) {
          this.categorySearchId = [
            data[this.activeTab]?.children[this.activeTag].id,
          ];
          this.getGoodsList();
        }
        // console.log(data[0].id);
        this.loading = false;
        // console.log("this.loading", this.loading);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // 请求商品信息
    async getGoodsList() {
      try {
        this.rightLoading = true;
        this.goodList = [];
        const exarr = uni.getStorageSync("exArr"); //营销区域
        // console.log("exarr", exarr);
        const { data } = await api.$post(
          this.urlapi.product.spuOfCategory,
          {
            categorySearchId: this.categorySearchId,
            categoryId: this.categorySearchId[0],
            appId: Global_Cog.APPID,
            areaCodes: exarr ? exarr : [],
          },
          "加载中",
          true
        );
        this.goodList = data.map((item) => {
          item.momentPrice = formatAmount(item.price);
          return item;
        });
      } catch (error) {
        //
      } finally {
        this.rightLoading = false;
      }
    },

    // 获取商品详情信息弹窗
    // async getGoodsInfo(spuId) {
    //   //  this.modaldetail(spuId);
    //   try {
    //     const { data } = await api.$get(
    //       this.urlapi.product.info + spuId,
    //       "加载中"
    //     );
    //     this.check(data); //vuex
    //   } catch (err) {
    //     uni.showToast({
    //       icon: "none",
    //       title: err.message,
    //     });
    //   }
    // },
    // 点击左边
    changebar(index, val) {
      this.activeTab = index;
      this.activeTag = 0;
      this.categorySearchId = val.children[0] ? [val.children[0].id] : [val.id];
      this.topRightList = val;
      this.getGoodsList(); //获取
    },
    // 查看详情
    buyGoods(val, type) {
      console.log("val", val);
      const spuId = val.spuCode;
      if (type == "1") {
        uni.navigateTo({
          url: `/subPages/product/proDetail?id=${spuId}`,
          // url: `/shopPages/goodsDetail/index/?id=${spuId}`,
        });
      } else return;
    },
    //获取可视区域高度
    getClientHeight() {
      const res = uni.getSystemInfoSync();
      const system = res.platform;
      if (system === "ios") {
        return 44 + res.statusBarHeight;
      } else if (system === "android") {
        return 48 + res.statusBarHeight;
      } else {
        return 0;
      }
    },

    //搜索点击跳转
    search() {
      uni.navigateTo({
        url: "/subPages/search/search",
      });
    },

    /* 小Y */
    stopPropagation(ev) {
      return ev.stopPropagation();
    },
    // 商品自定义分享
    onShareBtn() {
      const { id } = uni.getStorageSync("xiaoyouInfo");
      console.log("this.canvasInfo", this.canvasInfo, id);
      const { spuName, spuCode, imageUrl } = this.canvasInfo;
      this.shareDTO = {
        title: spuName,
        path: `/subPages/product/proDetail?id=${spuCode}&disId=${id}&linkType=${COUPON_SOURCE.XIAO_YOU.value}`,
        imageUrl: imageUrl,
      };
    },
    //海报
    shareXiaoYou(e) {
      uni.hideTabBar({
        success: () => {
          this.canvasInfo = e;
          this.showPanel = true;
        },
      });

      console.log("e-SHABIPE-", e);
    },
    // 生成海报
    async openCanvasShare() {
      try {
        // this.showPanel = false;
        await this.drawCanvas();
        this.showCanvas = true;
      } catch (error) {}
    },
    /* 海报相关 */
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
      const x = 8;
      const y = 76;
      const w = 226;
      const h = 316;
      const r = 5;
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
      this.getImageInfos(ctx);
    },
    //nihao
    getImageInfos(ctx) {
      let qr_x = 8;
      let qr_y = 76;
      ctx.save();
      console.log("this.goodsimg--1", this.goodsImg);
      ctx.translate(qr_x, qr_y);
      const basePx = 226;
      // this.drawRoundImg(ctx, basePx, basePx, 5);
      ctx.clip();
      ctx.drawImage(this.goodsImg, 0, 0, basePx, basePx);
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
      try {
        uni.showLoading({
          title: "正在生成图片...",
          mask: true,
        });
        let goods = this.canvasInfo;
        console.log("goods", goods);
        await this.getImgInfo(goods.imageUrl);
        await this.v_getQRcode(goods.spuCode);
        const ctx = uni.createCanvasContext("canvas");
        // ctx.setFillStyle("gray");
        const dpr = wx.getSystemInfoSync().pixelRatio;
        console.log("dpr", dpr);
        const w = 242;
        const h = 405;
        ctx.width = w;
        ctx.height = h;
        console.log("ctx", this.assetPath);
        ctx.drawImage(this.assetPath, 0, 0, w, h);
        // return;
        this.drawContent(ctx);
        this.drawImg(ctx);
        // ctx.draw(true)
        // 绘制标题
        let y = 307;
        // let y1 = y;
        let x = 24;
        let len = 13;
        let priceY = 350;
        let y3 = 296;
        let goodsName = goods.spuName;
        while (goodsName.length > 0 && y < 337) {
          let line = goodsName.substr(0, len);
          goodsName = goodsName.substr(len);
          console.log("yyyyyy", y);
          if (y > 330) {
            console.log(goodsName);
            goodsName.length > 4 && (line = goodsName.substr(0, 3) + "...");
          }
          ctx.setFontSize(9);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign("left");
          ctx.fillText(line, x, y + 20, w * 0.5);
          y += 12;
          console.log(y);
        }

        // 绘制二维码
        // 绘制二维码
        let x1 = w * 0.6 + 10;
        let qWidth = w * 0.25;

        //二维码路径
        const data = await this.transBase64(this.proQRcode);
        ctx.drawImage(data, x1, y3 + 20, qWidth, qWidth);
        ctx.setFontSize(7.5);
        ctx.setFillStyle("#999");

        ctx.fillText("扫码下单", x1 + 17, y3 + qWidth + 30);
        // 绘制价格
        y += 12;
        let price =
          goods.rangeMaxPrice === goods.rangeMinPrice
            ? noformatAmount(goods.rangeMaxPrice)
            : noformatAmount(goods.rangeMinPrice) +
              "~" +
              noformatAmount(goods.rangeMaxPrice);
        ctx.setFillStyle("#f9555c");
        ctx.setTextAlign("left");
        ctx.setFontSize(10);
        ctx.fillText("￥", x, priceY + 20);
        ctx.setFontSize(15);
        ctx.fillText(price, x + 12, priceY + 20);
        y += 20;
        ctx.setFontSize(8);
        ctx.setFillStyle("#999");
        ctx.drawImage(this.tagPath, 130, 24, 93, 76);
        ctx.draw(true);
        this.ctx = ctx;
      } catch (error) {
        console.log("error-错误", error);
      } finally {
        uni.hideLoading();
      }
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
    // 面对面分享
    openShowShare() {
      console.log("1", this.canvasInfo);
      this.showFaceShare = true;
      this.v_getQRcode(this.canvasInfo.spuCode);
      this.setProductInfoXiaoyou();
    },
    onFaceShareCancel() {
      this.showFaceShare = false;
    },
    setProductInfoXiaoyou() {
      this.productInfoXiaoyou = {
        spuId: this.canvasInfo?.spuId,
        imageUrl: this.canvasInfo?.imageUrl,
        kill: this.canvasInfo.killSymbal && this.canvasInfo?.skillFlag,
        spuName: this.canvasInfo.spuName,
        salesNum: this.canvasInfo.salesNum,
        price: this.noformatAmount(this.canvasInfo.rangeMinPrice),
      };
    },
    // 海报关闭
    onCloseCanvas() {
      this.showCanvas = false;
    },
    // 面板关
    closeShare() {
      uni.showTabBar({
        success: () => {
          this.showPanel = false;
          this.shareDTO = {
            title: BaseApp.shareTxT, // 默认为小程序名称
            path: this.xyPath, // 默认为当前页面路径
            imageUrl: "", // 默认为当前页面的截图
          };
        },
      });
    },
  },
};
</script>

<style scope lang="scss">
@import "../homepage/home.scss";
$uni-bg-primary: #e4f4ff !default; //选中
$tag-default-pd: 12rpx 16rpx;
page,
.product-out {
  background: #ffffff !important;
  overflow: hidden;
  height: 100vh;
}
.top-search {
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
}
.search {
  width: 200rpx;
  /* height: 32px; */
  /* border-radius: 16px; */
  background: #f4f4f4;
  margin-left: 40rpx;
  color: $uni-text-color-grey;
  display: flex;
  align-items: center;
  .icons {
    margin-left: 24rpx;
  }
}
.left-tab {
  height: 140rpx;
  width: 168rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $uni-color-f5;
  text {
    font-size: 26rpx;
    // color: $uni-text-33;
    color: #999999;
    font-weight: 500;
    z-index: 10;
  }
}
.left-tab--active-before {
  border-bottom-right-radius: 24rpx;
  position: relative;
}
.left-tab--active-before::before {
  content: "";
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  z-index: 0;
}
.left-tab--active-before::after {
  content: "";
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 24rpx;
  background: $uni-color-f5;
  position: absolute;
  z-index: 2;
  // border-top-right-radius: 24rpx;
}

.left-tab--active-after {
  border-top-right-radius: 24rpx;
  // background: #ff0;
  position: relative;
  background: $uni-color-f5;
  z-index: 2;
}
.left-tab--active-after::before {
  content: "";
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  z-index: 0;
  // border-top-right-radius: 24rpx;
}
.left-tab--active-after::after {
  content: "";
  width: 100%;
  height: 100%;
  border-top-right-radius: 24rpx;

  background: $uni-color-f5;
  position: absolute;
  z-index: 2;
  // border-top-right-radius: 24rpx;
}

.left-tab--active {
  width: 168rpx;
  height: 140rpx;
  overflow: ellipsis;
  background: #fff;
  color: #333333;
  position: relative;
}
.left-tab--active::before {
  content: "";
  position: absolute;
  left: 0;
  width: 8rpx;
  height: 140rpx;
  background: #1d9bdc;
  border-radius: 0rpx 8rpx 8rpx 0rpx;
}

.place-css {
  height: 200rpx;
  background-color: #1d9bdc;
  width: 10rpx;
}

// 商品列表
.right-goods-bottom {
  height: 190px;
  width: 100%;
  // background: #1d9bdc;
  color: #999999;
  text-align: center;
}
.right-goods {
  min-height: 182rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
  .goods-img {
    // border: 1rpx solid #f50e0e;
    width: 176rpx !important;
    height: 176rpx !important;
    // flex: 1;
    overflow: hidden;
    margin-right: 24rpx;
    // border: 2rpx solid #999999;
    border-radius: 24rpx;
  }
  .goods-content {
    width: 100%;
    justify-content: space-between;
  }
}
.topname {
  .big-name {
    padding-left: 32rpx;
    padding-top: 32rpx;
    font-size: 34rpx;
    color: #333333;
  }
}

.scroll-son-x {
  width: 582rpx;
  height: 84rpx;
  padding-right: 20rpx;
  // margin-bottom: 32rpx;
  // border-bottom: 2rpx solid #f1f1f1;
  padding-left: 48rpx;
  // padding-top: 24rpx;
  .h-tag-success {
    color: #1d9bdc !important;
    padding-bottom: 16rpx;
    // border-bottom: 4rpx solid #1d9bdc !important;
    // width: 100%;
    // margin-bottom: 4rpx;
    position: relative;
  }
  .h-tag-success::after {
    content: "";
    width: 48rpx;
    height: 8rpx;
    border-radius: 52rpx;
    background-color: #1d9bdc;
    border-radius: 52rpx;
    position: absolute;
    bottom: -4rpx;
    left: 50%;
    z-index: 4;
    transform: translateX(-50%);
  }
  .top-tag {
    font-weight: 500;
    color: #999999;
    margin-right: 56rpx;
    padding-bottom: 16rpx;
    border-bottom: 4rpx solid transparent;
    // box-sizing: border-box;
    // text-align: center;
    white-space: nowrap;
    // margin-bottom: 4rpx;
  }
}

// 弹出
.goods-modal {
  height: 80%;
}

.goods-check {
  padding-top: 20rpx;
  // background: #f01;
  // position: fixed;
  // width: 100%;
  // left: 0;
  .right-tab {
    flex: 1;
    padding-left: 32rpx;
    padding-top: 32rpx;

    .topRname {
      font-size: 34rpx;
      color: #333333;
      font-weight: 500;
      margin-bottom: 16rpx;
    }
  }

  .h-tag-nomal {
    line-height: 36rpx;
    font-size: 26rpx;
    font-weight: 500;
    font-family: PingFang SC-Medium, PingFang SC;
    padding: $tag-default-pd;
    color: #999999;
    border-radius: 52rpx;
    background-color: #fff;
    margin-right: 40rpx;
    max-width: 136rpx;
    min-width: 104rpx;
    // height: 60rpx;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.pro-addcar {
  width: 310rpx;
  // background: #1d9bdc;
}
.buy-btn {
  background: #1d9bdc;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 6rpx 24rpx 8rpx;
  border-radius: 24rpx;
}
.nomore-product {
  width: 100%;
  margin-top: 152rpx;
  // background: #1D9BDC;
  text-align: center;
  .nomore-img {
    border: none;
    width: 294rpx;
    height: 360rpx;
  }
  .nomore-tex {
    margin-top: 60rpx;
    color: #a9a9a9;
  }
  .act-btn {
    margin: 0 auto;
    margin-top: 92rpx;
    width: 320rpx;
    border-radius: 254rpx;
    background: #1d9bdc;
    height: 104rpx;
    line-height: 104rpx;
    font-weight: bold;
    color: #ffffff;
    font-size: 34rpx;
  }
}
// 周末
::v-deep.u-checkbox-group {
  width: 484rpx;
  flex-wrap: wrap;
  justify-content: space-between;
  .u-checkbox-label--left {
    margin-top: 12rpx;
  }
}
.spu-class-fc11 {
  padding-left: 18rpx;
}
</style>
