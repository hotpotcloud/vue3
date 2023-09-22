<template >
  <!-- 0下架 1上架 -->
  <view :class="shows || show_nature || spuModal ? 'popupShow' : ''">
    <view class="navbar" :style="navStyle">
      <view :style="'height:' + totalHeight + 'px;'" class="back-icon">
        <u-icon
          :top="bottom"
          name="arrow-left"
          size="40rpx"
          color="#000000"
          @tap="toBack"
        ></u-icon>
      </view>
    </view>

    <!-- 暂无商品 -->
    <view
      v-if="productinfo.status == 'PRODUCT_DELETE' || null"
      class="no-product"
    >
      <h-Null></h-Null>
    </view>
    <view v-else>
      <scroll-view scroll-y>
        <!-- 轮播 -->
        <view class="swiper-view">
          <u-swiper
            :list="productinfo.imageUrl"
            @change="changeNum"
            :autoplay="false"
            indicatorStyle="left: 20px"
            height="375px"
            circular="false"
          >
            <view slot="indicator" class="indicator-num">
              <text class="indicator-num__text">
                {{ Number(currentNum) + 1 }}/{{ productinfo.imageUrl.length }}
              </text>
            </view>
          </u-swiper>
          <!-- 分享icon -->
          <view>
            <button
              id="btnId"
              open-type="share"
              hover-class="button-hover"
              style="display: hidden"
              @tap="shares"
            ></button>
            <label for="btnId">
              <image
                v-if="!xiaoyouShow"
                class="share-icon"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%88%86%E4%BA%AB%402x.png"
                mode="aspectFit"
              />
            </label>
          </view>
        </view>
        <!-- 秒杀 倒计时 -->
        <h-spikeTime
          :show="showKill && productinfo.numlist.killSymbal"
          :times="times"
          @onChange="onChange"
        ></h-spikeTime>
        <!-- 周期购 -->
        <view
          class="cycle-box"
          v-if="productinfo.deliverType === CycleEnum.MILK_STATION"
          @tap="onCycle"
        >
          <image
            class="cycle-icon"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/cycle.png"
            mode="aspectFit"
          />
        </view>
        <!-- 详情 -->
        <view class="product-text">
          <view class="main-padding">
            <view class="prodcut-text-top h-bott-border">
              <view
                class="main-size-30 top-name"
                :class="[iosFont ? 'font-ios' : 'font-android']"
              >
                <text
                  class="seckill-tag"
                  v-show="
                    productinfo.numlist.killSymbal && productinfo.skillFlag
                  "
                  >秒杀</text
                >
                {{ productinfo.spuName }}
              </view>
              <view class="d-flex-center d-sb">
                <view
                  class="main-size-30 h-main-color"
                  :class="[iosFont ? 'font-ios' : 'font-android']"
                  v-if="!productinfo.numlist.killSymbal || !showKill"
                >
                  {{ productinfo.minMoney }}
                  <text v-show="productinfo.maxMoney"
                    >~{{ productinfo.maxMoney }}</text
                  >
                </view>
                <view @click="onXiaoShare">
                  <image
                    v-if="xiaoyouShow"
                    class="xiaoyou-share"
                    src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/004share.png"
                    mode="scaleToFill"
                  />
                </view>
              </view>
            </view>

            <!-- 吸顶 -->
            <view
              class="top-show"
              v-if="modalShow"
              :style="{ top: totalHeight + 'px' }"
            >
              <view class="d-flex modal-info">
                <view class="modal-left-info">
                  <image class="img" :src="productinfo.imageUrl[0]" />
                </view>

                <view class="modal-right-info d-flex-colum">
                  <view class="tip-name">
                    <text
                      class="seckill-tag"
                      v-show="productinfo.numlist.killSymbal"
                      >秒杀</text
                    >
                    {{ productinfo.spuName }}
                  </view>
                  <view class="d-flex-center tags-info" v-if="X_mutual.all">
                    <view
                      v-if="xticket.length && X_mutual.coupon"
                      class="h-ticket"
                      >优惠券</view
                    >
                    <view
                      v-for="(el, index) in xtag"
                      :key="index"
                      class="tag-css"
                    >
                      <view v-if="X_mutual.tag">{{ el }}</view>
                    </view>
                  </view>

                  <view class="d-flex d-sb">
                    <view
                      class="modal-price-info"
                      v-if="!productinfo.numlist.killSymbal || !showKill"
                    >
                      {{ productinfo.minMoney }}
                      <text v-show="productinfo.maxMoney"
                        >~{{ productinfo.maxMoney }}</text
                      >
                    </view>
                    <view class="modal-price-info" v-else>
                      <text class="spike-price" style="margin-right: 8rpx">{{
                        productinfo.killMoney
                      }}</text>
                      <text class="spike-price-unuse">{{
                        productinfo.minMoney
                      }}</text>
                    </view>

                    <!-- 分享icon -->
                    <view>
                      <button
                        id="btnId"
                        open-type="share"
                        hover-class="button-hover"
                        style="display: hidden; outline: none; border: none"
                        @tap="shares"
                      ></button>
                      <label for="btnId">
                        <image
                          v-if="!xiaoyouShow"
                          class="share-png"
                          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%88%86%E4%BA%AB%402x.png"
                          mode="aspectFit"
                        />
                      </label>
                    </view>
                  </view>
                </view>
              </view>
            </view>

            <view>
              <!-- 优惠标签 -->
              <view
                @click="shows = true"
                class="h-padding-updown d-flex-row h-solid-bottom"
                v-if="showticket && X_mutual.all"
              >
                <view
                  class="pro-text-left"
                  :class="[iosFont ? 'font-ios' : 'font-android']"
                  >优惠</view
                >
                <view class="d-flex-center flex-1 h-left-m-32">
                  <view
                    v-if="xticket.length && X_mutual.coupon"
                    class="h-ticket"
                    >优惠券</view
                  >
                  <view v-if="X_mutual.tag">
                    <view
                      v-for="(el, index) in xtag"
                      :key="index"
                      class="h-tag"
                    >
                      <view>{{ el }}</view>
                    </view>
                  </view>
                </view>
                <view class="d-flex-nowarp">
                  <u-icon name="arrow-right" color="#999999" size="16"></u-icon>
                </view>
              </view>
            </view>
          </view>

          <view class="h-other-margin">
            <size-goods
              @onChoose="onChoose"
              @onChooseNum="onChooseNum"
              @checkMoreGoods="checkMoreGoods"
            />
          </view>
          <!-- 参数 -->
          <!-- class="h-even-border d-flex-row h-padding-updown h-solid-top h-type-short" -->

          <view
            class="h-even-border d-flex-center fc05-border"
            @tap.stop="showseting"
            v-if="productinfo.propertyValueList.length"
          >
            <view
              class="pro-text-left"
              :class="[iosFont ? 'font-ios' : 'font-android']"
              >参数</view
            >
            <view
              class="d-flex-nowarp d-sb d-flex-center flex-1"
              style="color: #a9a9a9; font-size: 24rpx"
            >
              <view class="tag-left h-tags-overflow">
                <view v-if="productinfo.propertyValueList.length < 3">
                  <text>
                    {{ productinfo.propertyValueList[0].propertyName }}
                    <text v-show="productinfo.propertyValueList.length != 1"
                      >、</text
                    >
                  </text>
                  <text>
                    {{
                      productinfo.propertyValueList[1].propertyName
                        ? productinfo.propertyValueList[1].propertyName
                        : ""
                    }}
                  </text>
                </view>
                <view v-else>
                  <text
                    >{{ productinfo.propertyValueList[0].propertyName }}、</text
                  >
                  <text>
                    {{ productinfo.propertyValueList[1].propertyName }}
                  </text>
                  <text>...</text>
                </view>
              </view>
              <view class="d-flex-nowarp">
                <u-icon name="arrow-right" color="#999999" size="16"></u-icon>
              </view>
            </view>
          </view>
        </view>
        <view class="detail-goods--tip">
          <view
            class="detail-goods"
            :class="[iosFont ? 'font-ios' : 'font-android']"
            >商品详情</view
          >
          <view>
            <!-- <view class="main-padding">
            </view>-->
            <view style="width: 100%">
              <rich-text :nodes="textDetail"></rich-text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 参数 -->
    <view>
      <u-popup
        :show="show_nature"
        :round="20"
        closeable
        mode="bottom"
        background-color="#fff"
        @close="() => (show_nature = false)"
        @open="() => (show_nature = true)"
        :safeAreaInsetBottom="true"
      >
        <view>
          <view class="popup-tag-title">参数</view>
          <view
            class="d-flex-row property-css"
            v-for="(val, index) in productinfo.propertyValueList"
            :key="index"
          >
            <view style="width: 130rpx">{{ val.propertyName }}：</view>
            <view class="property-val">{{ val.propertyValue }}</view>
          </view>
        </view>
        <view>
          <button
            class="btnback"
            :loading="false"
            hover-class="button-hover"
            @click="() => (show_nature = false)"
          >
            返回
          </button>
        </view>
      </u-popup>
    </view>
    <!-- 优惠 -->
    <view>
      <u-popup
        :show="shows"
        :round="20"
        closeable
        mode="bottom"
        background-color="#fff"
        @close="() => (shows = false)"
        @open="() => (shows = true)"
        :safeAreaInsetBottom="true"
      >
        <view class="popup-tag-title">领券满减</view>
        <scroll-view scroll-y :style="{ height: popheight + 'px' }">
          <view class="popup-tag">
            <view v-if="xticket.length && X_mutual.coupon">
              <view class="popup-group-title">优惠券</view>
              <view v-for="(el, index) in xticket" :key="index">
                <h-couponCollect :coupon="el" @handleCollect="handleCollect" />
              </view>
            </view>
          </view>
          <view class="popup-tag" v-if="xtag_minus.length && X_mutual.tag">
            <view class="popup-group-title">满减</view>
            <view class="popup-coupon-box">
              <text
                class="popup-tag-item"
                v-for="(tag, index) in xtag_minus"
                :key="index"
                >{{ tag }}</text
              >
            </view>
          </view>
          <view class="popup-tag" v-if="xtag_add.length != 0">
            <view class="popup-group-title">满赠</view>
            <view class="popup-coupon-box">
              <text
                class="popup-tag-item h-overflow-2"
                v-for="(tag, index) in xtag_add"
                :key="index"
                >{{ tag }}</text
              >
            </view>
          </view>
        </scroll-view>

        <view>
          <button
            class="btnback"
            :loading="false"
            hover-class="button-hover"
            @click="() => (shows = false)"
          >
            返回
          </button>
        </view>
      </u-popup>
    </view>
    <!-- 底部购物车 -->
    <h-CommonCar
      :shelf="productinfo.status"
      :price="vuexPriceToal"
      :maxprice="productinfo.maxMoney"
      :text="vuexTips"
      :reserve="productinfo.reserve"
      :showKill="showKill"
      :killShelf="
        productinfo.numlist.killSymbal
          ? productinfo.numlist.killDTO.status
          : 'FINISH'
      "
      :killStock="
        productinfo.numlist.killSymbal ? productinfo.numlist.killReserve : 0
      "
      :killLimit="productinfo.numlist.killLimt"
      :detail="xiaoyouShow"
      :isModal="false"
      @buygoods="buyCar"
      @closeBtn="closeBtnCar"
      @toHome="toHome"
      @onClickShare="onClickShare"
    />
    <!-- 小优分享 -->
    <view class="share">
      <u-overlay
        :show="showXiaoyouShare"
        @click="closeXiaoyouShare"
        :opacity="0.45"
      >
        <view class="bottom" @click.stop="stopPropagation">
          <view class="title">分享说明</view>
          <view class="tips"
            >1.好友购买的商品数量越多，您可以获得的佣金也会越高。2.可以通过微信好友将商品分享到微信聊天中，可以生成海报发布到朋友圈或者微信聊天里面。</view
          >
          <view class="list">
            <view class="share-view">
              <button open-type="share" class="share-btn-view">
                <image
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/weixinicon.png"
                />
                <view>微信好友</view>
              </button>
            </view>
            <view class="share-method" @click="openShowCanvas">
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/bannaicon.png"
              />
              <view>生成海报</view>
            </view>
            <view class="share-method" @click="openShowFaceShare">
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/facetoface.png"
              />
              <view>面对面</view>
            </view>
          </view>
          <view class="btn-container">
            <button class="btn" @click="closeXiaoyouShare">取消</button>
          </view>
        </view>
      </u-overlay>
    </view>
    <faceShare
      :show="showFaceShare"
      @onCancel="onFaceShareCancel"
      :product="productInfoXiaoyou"
    />
    <u-popup
      :show="showCanvas"
      type="bottom"
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
            alt
          />
        </view>
        <view class="hb-text"
          >将海报保存到手机相册，分享到朋友圈或者微信聊天</view
        >
        <!-- 海报内容 -->
        <view class="hb-main">
          <view class="hb-img">
            <canvas
              canvas-id="canvas"
              style="width: 242px; height: 405px"
            ></canvas>
          </view>
          <view class="hb-save-btn" @click.stop="onSaveHB">保存海报至相册</view>
        </view>
      </view>
    </u-popup>
    <!-- <hXiaoyou
      :money="productinfo.commission.maxCommission"
      :show="xiaoyouShow"
    />-->
    <!-- fc05组合商品 -->
    <SpuArr :spuModal="spuModal" @closeSpu="closeSpu" />
    <!-- 领取弹窗 -->
    <view class="mask" v-if="showMask">
      <view :class="couponList.length !== 1 ? 'coupon-bg' : 'coupon-bg-single'">
        <scroll-view
          class="coupons"
          scroll-y="false"
          v-if="couponList.length > 1"
        >
          <view
            class="coupon-item-box"
            v-for="(item, index) in couponList"
            :key="index"
          >
            <view class="coupon-item">
              <view class="coupon-left">
                <view class="coupon-price">
                  <text class="coupon-price-icon">￥</text>
                  <text
                    v-if="
                      (item.couponStrategyVo &&
                        item.couponStrategyVo.couponType === 1) ||
                      (item.couponStrategyVo &&
                        item.couponStrategyVo.couponType === 0)
                    "
                    >{{
                      item.couponStrategyVo &&
                      item.couponStrategyVo.reduced | noformatAmount
                    }}</text
                  >
                  <text v-else>
                    {{
                      item.couponStrategyVo &&
                      item.couponStrategyVo.reduced / 100
                    }}
                    <text class="coupon-price-icon">折</text>
                  </text>
                </view>
                <view
                  v-if="item.couponStrategyVo.condtionAmount > 0"
                  class="coupon-condition"
                  >满足{{
                    item.couponStrategyVo &&
                    item.couponStrategyVo.condtionAmount | noformatAmount
                  }}元可用</view
                >
                <view v-else class="coupon-condition">无门槛</view>
              </view>
              <view class="coupon-right">
                <view class="coupon-title">{{ item.name }}</view>
                <view class="coupon-condition">{{
                  item.allProducts === 1 ? "全部商品可用" : "部分商品可用"
                }}</view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="coupons-single" v-else>
          <view
            class="coupon-item-box"
            v-for="(item, index) in couponList"
            :key="index"
          >
            <view class="coupon-item">
              <view class="coupon-left">
                <view class="coupon-price">
                  <text class="coupon-price-icon">￥</text>
                  <text
                    v-if="
                      (item.couponStrategyVo &&
                        item.couponStrategyVo.couponType === 1) ||
                      (item.couponStrategyVo &&
                        item.couponStrategyVo.couponType === 0)
                    "
                    >{{
                      item.couponStrategyVo &&
                      item.couponStrategyVo.reduced | noformatAmount
                    }}</text
                  >
                  <text v-else>
                    {{
                      item.couponStrategyVo &&
                      item.couponStrategyVo.reduced / 100
                    }}
                    <text class="coupon-price-icon">折</text>
                  </text>
                </view>
                <view
                  v-if="item.couponStrategyVo.condtionAmount > 0"
                  class="coupon-condition"
                  >满足{{
                    item.couponStrategyVo &&
                    item.couponStrategyVo.condtionAmount | noformatAmount
                  }}元可用</view
                >
                <view v-else class="coupon-condition">无门槛</view>
              </view>
              <view class="coupon-right">
                <view class="coupon-title">{{ item.name }}</view>
                <view class="coupon-condition">{{
                  item.allProducts === 1 ? "全部商品可用" : "部分商品可用"
                }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="coupon-button" @click="collectCoupons()"></view>
        <view class="mask-notice">领取后，可进入“我的-我的券包”查看</view>
      </view>
      <image
        @tap="closeMask"
        class="mask-close-icon"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/close.png"
        mode="scaleToFill"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { coupons } from "@/utils/url";
// import { formatAmount } from "@/utils/utils";
import { formatAmount, noformatAmount } from "@/utils/utils";

import {
  CycleEnum,
  productStatusEnum,
  acquireType,
  skillEnum,
  skillTipsEnum,
  cumulateType,
  COUPON_SOURCE,
} from "@/utils/enum";
// import noProduct from "./component/noProduct.vue";
import HNone from "@/components/h-none/h-none.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import FaceShare from "./component/FaceShare.vue";
import SpuArr from "./component/spuarr.vue";
import SizeGoods from "./component/size-goods.vue";
// import hXiaoyou from "@/pages/homepage/component/h-xiaoyou.vue";
const d = new Date();
const y = d.getFullYear();
let m: number | string = d.getMonth() + 1;
m = m < 10 ? `0${m}` : m;
const day = d.getDate();
let t = null;
export default {
  components: { HNone, FaceShare, SpuArr, SizeGoods },
  // 底部购物车
  data() {
    return {
      COUPON_SOURCE,
      CycleEnum,
      cumulateType, //枚举
      totalHeight: "", //总高度
      statusBarHeight: "", // 状态栏高度
      navBarHeight: 45, // 导航栏高度
      windowWidth: 375, //可使用窗口高度
      navStyle: "",
      navOpacity: 0,
      navInpWid: "",
      navRemain: "",
      widRemain: "",
      scrollTop: 0,
      imgOpacity: 1,
      logo_block_width: 0,
      modalShow: false, //吸顶显示
      defaultTime: "", //最早起送时间
      top: 0, //顶部高度
      height: 0, //大小高度
      bottom: 0, //底部高度
      shows: false,
      defaultMultiple: [`${y}-${m}-${day + 1}`],
      resList: {}, //原始数据
      show: false,
      show_nature: false, //参数显示
      currentNum: 0, //轮播页码
      title: "属性参数",
      spuCode: null,
      // numlist: [], //对应数量
      popheight: 0, //弹窗高度
      text: ``, // 规格
      // 优惠券
      ticketTag: [],
      numSend: 1, //每次配送
      timeData: {},

      // 秒杀板块
      times: 0, //倒计时
      showKill: false, //展示秒杀组件
      showWeek: false, //星期怂
      listweek: [],
      xiaoyouShow: false, //小优佣金显示
      showXiaoyouShare: false,
      showFaceShare: false,
      productInfoXiaoyou: {},
      salesNum: 0,
      showCanvas: false, //canvas海报弹窗
      goodsImg: "", //商品图
      assetPath: "", //海报背景图
      tagPath: "", //大力推荐图
      ctx: null,
      spuModal: false, //fc05 组合商品弹出框
      couponCode: "", //优惠券code
      showMask: false,
      couponList: [],
      linkType: "",
    };
  },
  computed: {
    ...mapState("xiaoyou", ["distId", "proQRcode"]),
    ...mapState("product", [
      "xtags",
      "productinfo",
      "time",
      "arrtime",
      "xticket",
    ]),
    ...mapState("css", ["iosFont"]),
    ...mapGetters("product", [
      "xtag",
      "xtag_minus",
      "xtag_add",
      "vuexPriceToal",
      "vuexTips",
      "vuexCombo",
      "X_mutual",
      "X_buys",
    ]),
    // 富文本
    textDetail() {
      return this.richText(this.productinfo.spuDetailDTO?.detailContent);
      // return text;
    },
    // tag-ticket显示
    showticket() {
      return this.xtag.length ? true : this.xticket.length ? true : false;
    },
    shareText() {
      const xiaoyou = uni.getStorageSync("xiaoyouInfo");
      console.log("xiaoyou---小优", xiaoyou);
      const url =
        xiaoyou && xiaoyou.id && this.xiaoyouShow
          ? `/subPages/product/proDetail?id=${this.spuCode}&disId=${xiaoyou.id}&linkType=${COUPON_SOURCE.XIAO_YOU.value}`
          : "/subPages/product/proDetail?id=" + this.spuCode;
      return {
        title: this.productinfo.spuName,
        path: url,
        imageUrl: this.productinfo.imageUrl && this.productinfo.imageUrl[0],
      };
    },
  },

  // 滚动顶部渐变
  onPageScroll(e) {
    // console.log("e--滚动", e);
    let topHeight = e.scrollTop;
    let navOp = 0;
    navOp = topHeight / this.totalHeight;
    let mobileTop = this.navRemain;
    this.navOpacity = navOp;
    this.navInpWid =
      navOp > 0 ? mobileTop + this.widRemain * navOp : this.navRemain;
    this.logo_block_width = this.windowWidth - this.navInpWid - 10;
    this.imgOpacity = navOp <= 1 ? 1 - navOp : 0;
    const styles = `
      background: rgba(255, 255, 255, ${navOp});
      `;
    this.navStyle = topHeight > 10 ? styles : "";
    this.modalShow = topHeight > uni.upx2px(388) ? true : false;
  },
  onReady() {
    this.nav();
  },
  onLoad(id) {
    console.log("id---小优", id, decodeURIComponent(id?.scene)?.split("&"));
    // 扫码进入
    const spuCode = decodeURIComponent(id?.scene)?.split("&")?.[1];
    const disId = decodeURIComponent(id?.scene)?.split("&")?.[2];

    if (disId) {
      this.v_setDistId(disId); //保存分销员ID
      this.linkType = COUPON_SOURCE.XIAO_YOU.value;

      this.getCoupons();
    }
    if (spuCode) {
      this.spuCode = spuCode; //请求id
    }
    // 跳转进入
    if (id?.id) {
      this.spuCode = id?.id; //请求id
      // this.spuCode = 1544; //请求id
    }
    //小优链接进入
    if (id?.disId) {
      this.v_setDistId(id?.disId); //保存分销员ID
      if (id?.showPrice && JSON.parse(id?.showPrice)) {
        this.xiaoyouShow = true;
      }
      this.linkType = COUPON_SOURCE.XIAO_YOU.value;
      // this.showMask = true;
      this.getCoupons();
    }
    if (id?.linkType) {
      this.linkType = id?.linkType;
      if (id.linkType === COUPON_SOURCE.XIAO_YOU.value) {
        // this.showMask = true;
        this.getCoupons();
      }
    }
    if (id?.couponCode) {
      // 领券中心进入
      this.couponCode = id?.couponCode;
    }
    this.salesNum = id?.salesNum;
  },
  onShareAppMessage() {
    console.log("this.shareText", this.shareText);
    return this.shareText;
  },
  onShow() {
    this.$getDetail(this.spuCode);
    // 设置默认的转发参数
    // this.mpShare = {
    //   title: this.productinfo.spuName,
    //   path: "/subPages/product/proDetail?id=" + this.spuCode,
    //   imageUrl: this.productinfo.imageUrl[0],
    // };
    let timeout = setTimeout(() => {
      this.refersh(); //秒杀-定时启动
      clearTimeout(timeout);
    }, 5000);
  },
  watch: {},
  onHide() {
    // clearInterval(t);
    this.clearTimer();
  },
  onUnload() {
    // clearInterval(t);
    this.clearTimer();
  },

  methods: {
    ...mapMutations("xiaoyou", ["v_setDistId"]),
    ...mapActions("xiaoyou", ["v_getQRcode"]),
    ...mapActions("product", [
      "X_modaldetail",
      "X_postStartSendTime",
      "X_sendTimeArr",
      "X_ticket",
      "X_skill", //秒杀
    ]),
    ...mapMutations("product", [
      "check",
      "setTime",
      "setTimeArr",
      "topay",
      "setWeekList",
    ]),
    ...mapMutations("order", ["V_setorderPar", "V_setShowChange"]),
    //小优分享面板开关
    onClickShare() {
      this.showXiaoyouShare = true;
      this.setProductInfoXiaoyou();
    },
    // 关闭优惠券弹窗
    closeMask() {
      this.showMask = false;
    },
    // 获取优惠券数据
    async getCoupons() {
      try {
        console.log(
          coupons.getCouponList +
            `?acquireTypeEnum=${COUPON_SOURCE.XIAO_YOU.value}`,
          "===========================>>>"
        );
        // const { data } = await this.GET(
        //   coupons.getCouponList +
        //     `?acquireTypeEnum=${COUPON_SOURCE.XIAO_YOU.value}`
        // );
        const { data } = await this.GET(
          coupons.getCouponList + `?acquireTypeEnum=${this.linkType}`
        );
        console.log(data, "===>");
        if (data.length) {
          this.showMask = true;
        }
        this.couponList = data;
      } catch (error) {}
    },
    // 弹窗领取优惠券
    async collectCoupons() {
      try {
        const codes = this.couponList.map((el) => {
          return el.code;
        });
        const para = {
          acquireType: COUPON_SOURCE.XIAO_YOU.value,
          codes,
        };
        const { data } = await this.POST(coupons.collectCoupons, para);
        this.showMask = false;
        uni.showToast({
          title: data,
          duration: 3000,
          icon: "none",
        });
      } catch (error) {}
    },
    // 回到首页
    toHome() {
      uni.switchTab({
        url: "/pages/homepage/homepage",
        success: () => {
          // this.closeModal();
          uni.showTabBar();
        },
      });
    },

    //点击周期购
    onCycle() {
      console.log("周期购");
      uni.navigateTo({
        url: "/subPages/address/xhrj/Cycle",
      });
    },

    /**
     * @name 一键获取详情--vuex
     * @parmas id：当前商品spucode
     */
    async $getDetail(id: string | number) {
      try {
        await this.X_modaldetail(id);
        if (
          this.productinfo.commission &&
          this.productinfo.commission.maxCommission
        ) {
          this.xiaoyouShow = true;
        }
        // .then(() => {
        await this.X_ticket();
        //详情
        // this.X_sendTimeArr().then(() => {
        if (this.productinfo.numlist?.killSymbal) {
          this.skillTime(
            this.productinfo.numlist.killDTO.planStartTime,
            this.productinfo.numlist.killDTO.planEndTime,
            this.productinfo.numlist.killDTO.currentTime
          );
        }
        // });
        // });
      } catch (error) {}
    },
    /**
     * @name 秒杀时间计算
     * @parmas start:计划开始时间；end:计划结束时间; now：当前系统时间
     */
    skillTime(start: number, end: number, now?: number) {
      // if(!this.productinfo.numlist.killSymbal) return;
      const diffTime = Math.abs(start - now);
      this.showkill = false;

      if (this.productinfo.numlist.killDTO.status === skillEnum.WAIT_START) {
        if (
          // 开始前预告--倒计时内/外
          this.productinfo.numlist.killDTO.foreshowType ===
          skillTipsEnum.BEFORE_START_ACTIVITY
        ) {
          if (diffTime <= this.productinfo.numlist.killDTO.foreshowTime) {
            this.times = diffTime;
            this.showKill = true;
            return;
          } else {
            const diff =
              diffTime - this.productinfo.numlist.killDTO.foreshowTime;
            let timer = setTimeout(() => {
              this.X_skill();
              this.times = this.productinfo.numlist.killDTO.foreshowTime;
              this.showKill = true;
              clearTimeout(timer);
              return;
            }, diff);
            // clearTimeout(t);
          }
        } else if (
          // 进入就预告倒计时-还没开始
          this.productinfo.numlist.killDTO.foreshowType ===
          skillTipsEnum.AFTER_CREATE_ACTIVITY
        ) {
          this.times = this.productinfo.numlist.killDTO.foreshowTime;
          this.showKill = true;
          return;
        } else if (
          //不预告
          this.productinfo.numlist.killDTO.foreshowType === skillTipsEnum.NO
        ) {
          let time2 = setTimeout(() => {
            this.X_skill();
            this.times = end - now;
            this.showKill = true;
            clearTimeout(time2);
            return;
          }, diffTime);
        }
      }
      // 开始了
      else if (
        this.productinfo.numlist.killDTO.status === skillEnum.PROGRESSING
      ) {
        this.times = end - now;
        this.showKill = true;
        return;
      }
    },
    /**
     * @name 刷新库存、状态更新
     */
    refersh() {
      // return;
      if (!this.productinfo?.numlist?.killSymbal) {
        return clearInterval(t);
      } else {
        if (this.productinfo.numlist.killDTO.status === skillEnum.PROGRESSING) {
          t = setInterval(() => {
            this.X_skill();
          }, 8000);
        }
      }
    },
    /**
     * @name 倒计时
     */
    onChange(e: any) {
      if (!this.showKill) return;
      if (e.milliseconds === 0 && e.seconds === 0) {
        if (this.productinfo.numlist.killDTO.status === skillEnum.WAIT_START) {
          // 重新请求秒杀状态
          this.X_skill().then(() => {
            this.skillTime(
              //计算时间
              this.productinfo.numlist.killDTO.planStartTime,
              this.productinfo.numlist.killDTO.planEndTime,
              this.productinfo.numlist.killDTO.currentTime
            );
          });
        } else if (
          this.productinfo.numlist.killDTO.status === skillEnum.PROGRESSING ||
          this.productinfo.numlist.killDTO.status === skillEnum.FINISH
        ) {
          //秒杀结束
          this.showKill = false;
          clearInterval(t);
          t = null;
          this.$getDetail(this.spuCode); //更新
          this.check({
            ...this.productinfo,
            skillFlag: false,
          });
        }
      }
    },
    // 领券
    async handleCollect(code) {
      try {
        const para = {
          acquireType: acquireType.CENTER,
          code: code,
        };
        const { msg } = await this.POST(coupons.getCoupon, para);
        uni.showToast({
          title: "领券成功",
          icon: "success",
          duration: 1500,
        });
        this.X_ticket();
      } catch (err) {}
    },
    shares() {
      console.log("分享");
    },
    // 参数显示
    showseting() {
      this.show_nature = true;
    },
    // 解析富文本
    richText(richTextData: any) {
      console.log("richTextData", richTextData);
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
    },
    // 下架提示
    downGoods() {
      uni.showToast({
        title: "该商品已下架",
        icon: "error",
        duration: 2500,
      });
    },
    //选择规格fc05
    onChoose(a: number, b: any) {
      this.chooseVal(a, b, "size");
    },
    // 选择数量fc05
    onChooseNum(index: number, val: any) {
      this.chooseVal(index, val, "num");
    },

    /**
     * @name 切换规格内容
     * @params index:下标；type点击类型；item当前内容
     */
    chooseVal(index: number, item: any, type: string) {
      if (this.productinfo.status === productStatusEnum.PRODUCT_OFF) {
        return false;
      }
      if (type === "size") {
        // return;
        // this.showKill = false;
        this.showKill = true;
        this.check({
          ...this.productinfo,
          activeSize: index,
          numlist: item,
          goodscode: item.channelSkuCode,
          priceNow:
            item.killSymbal && item.killDTO.status != skillEnum.FINISH
              ? item.killPrice
              : item.minPrice,
          max: item.saleNums[0],
          activeNum: 0,
          reserve: item.reserve,
          defaultNum: 1,
          maxMoney:
            item.maxPrice && item.maxPrice != item.minPrice
              ? formatAmount(item.maxPrice)
              : "",
          minMoney: formatAmount(item.minPrice),
        });
        if (this.productinfo.numlist.killSymbal) {
          this.X_skill().then(() => {
            this.skillTime(
              this.productinfo.numlist.killDTO.planStartTime,
              this.productinfo.numlist.killDTO.planEndTime,
              this.productinfonav.numlist.killDTO.currentTime
            );
          });
          this.refersh();
        } else return;
      }
      if (type === "num") {
        this.check({
          ...this.productinfo,
          max: item,
          defaultNum: 1,
          activeNum: index,
        });
        if (this.productinfo.numlist.killSymbal) {
          this.X_skill().then(() => {
            this.skillTime(
              //计算时间
              this.productinfo.numlist.killDTO.planStartTime,
              this.productinfo.numlist.killDTO.planEndTime,
              this.productinfo.numlist.killDTO.currentTime
            );
          });
        } else return;
      }
    },

    // 顶部返回
    toBack() {
      const pageArr = getCurrentPages();
      if (pageArr.length <= 1) {
        return uni.switchTab({
          url: "/pages/homepage/homepage",
        });
      }
      uni.navigateBack({ delta: 1 });
    },

    /**
     * @name 导航高度获取-顶部渐变
     */
    nav() {
      let info = uni.getSystemInfoSync();
      this.popheight = Math.ceil(info.windowHeight * 0.6);
      let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.statusBarHeight = info.statusBarHeight;
      this.bottom = menuButtonInfo.top;
      this.windowWidth = info.windowWidth;
      this.navBarHeight =
        menuButtonInfo.bottom -
        info.statusBarHeight +
        (menuButtonInfo.top - info.statusBarHeight) +
        4;
      this.windowWidth = menuButtonInfo.left;
      this.widRemain = (info.windowWidth / 375) * 70;
      this.navInpWid = menuButtonInfo.left - 70;
      this.navRemain = this.windowWidth - this.widRemain;
      this.totalHeight = this.statusBarHeight + this.navBarHeight;
    },

    /**
     * @name 日历操作
     */
    confirm(e: string) {
      this.check({
        ...this.productinfo,
        time: e[0],
      });
      this.X_sendTimeArr();

      this.show = false;
    },
    onclose() {
      this.show = false;
    },
    showcalendar() {
      if (this.productinfo.status === productStatusEnum.PRODUCT_OFF) {
        return false;
      }
      this.show = !this.show;
    },
    // 关闭横幅
    closeBtnCar(e: boolean) {},
    /**
     * @name 下单->立即购买
     */
    buyCar() {
      // 登录验证
      try {
        const userInfo = uni.getStorageSync("malltoken");
        if (!userInfo)
          return uni.navigateTo({
            url: "/pages/user/relogin",
          });

        //
        this.V_setorderPar({
          deliveryPlanCode: "",
          goodsCode: "", //商品编码*
          goodsQty: "", //商品购买数量*
          unitPrice: "", //商品单价*
          secKillCode: "",
        });
        this.X_skill().then(() => {
          const params = {
            flag: this.X_buys === skillEnum.PROGRESSING,
          };

          const orderPar = {
            goodsCode: this.productinfo.goodscode, //商品编码*
            goodsQty: this.productinfo.max, //商品购买数量*
            unitPrice: this.productinfo.priceNow, //商品单价*
            secKillCode: params.flag
              ? this.productinfo.numlist.activityCode
              : "", //秒杀编码
            couponCode: this.couponCode, //优惠券编码
          };
          this.check({ ...this.productinfo, ...params });
          console.log("orderPar->参数", orderPar);
          this.V_setorderPar(orderPar);
          // return;
          uni.navigateTo({
            url: "/subPages/order/orderConfirm",
            success: () => {
              this.V_setShowChange(true);
              // clearInterval(t);
              this.clearTimer();
            },
          });
        });
      } catch (error) {}
      //刷新库存+秒杀状态
      // const flag = this.X_buys;
      // this."X_buys"返回
      // skillEnum.PROGRESSING 秒杀价
      // skillEnum.WAIT_START 原价
    },
    // 定时器清除
    clearTimer() {
      if (t) {
        console.log("清理定时器成功");
        clearInterval(t);
        t = null;
      }
    },
    // 轮播图
    changeNum(e: any) {
      return (this.currentNum = e.current);
    },
    // 小优分享
    onXiaoShare() {
      this.showXiaoyouShare = true;
      this.setProductInfoXiaoyou();
    },
    closeXiaoyouShare() {
      this.showXiaoyouShare = false;
    },
    stopPropagation(ev) {
      ev.stopPropagation();
    },
    openShowFaceShare() {
      this.showFaceShare = true;
      this.showXiaoyouShare = false;
      this.v_getQRcode(this.productinfo.spuCode);
    },

    onFaceShareCancel() {
      this.showFaceShare = false;
    },
    /* 商品海报弹窗 */
    async openShowCanvas() {
      await this.drawCanvas();
      this.showCanvas = true;
      this.showXiaoyouShare = false;
    },
    /* 关闭商品海报弹窗 */
    onCloseCanvas() {
      this.showCanvas = false;
    },
    setProductInfoXiaoyou() {
      this.productInfoXiaoyou = {
        spuId: this.productinfo?.id,
        imageUrl: this.productinfo?.imageUrl?.[0],
        kill:
          this.productinfo.numlist?.killSymbal && this.productinfo?.skillFlag,
        spuName: this.productinfo.spuName,
        salesNum: this.salesNum ? this.salesNum : this.productinfo.salesNum,
        price: this.productinfo.minMoney,
      };
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
        wx.showLoading({
          title: "正在生成图片...",
          mask: true,
        });
        let goods = this.productinfo;
        console.log("goods", goods);
        await this.getImgInfo(goods.imageUrl[0]);
        await this.v_getQRcode(goods.spuCode);

        const ctx: any = wx.createCanvasContext("canvas");
        // ctx.setFillStyle("gray");
        const dpr = wx.getSystemInfoSync().pixelRatio;
        console.log("dpr", dpr);
        const w = 242;
        const h = 405;
        ctx.width = w;
        ctx.height = h;
        console.log("ctx", this.assetPath);
        //背景图
        ctx.drawImage(this.assetPath, 0, 0, w, h);
        this.drawContent(ctx);
        this.drawImg(ctx);
        // return;
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
          if (y > 330) {
            goodsName.length > 4 && (line = goodsName.substr(0, 3) + "...");
          }
          ctx.setFontSize(9);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign("left");
          ctx.fillText(line, x, y + 20, w * 0.5);
          y += 12;
        }

        // 绘制二维码
        let x1 = w * 0.6 + 10;
        let qWidth = w * 0.25;

        //二维码路径
        const data = await this.transBase64(this.proQRcode);
        ctx.drawImage(data, x1, y3 + 20, qWidth, qWidth);
        ctx.setFontSize(7.5);
        ctx.setFillStyle("#999");

        ctx.fillText("扫码下单", x1 + 17, y3 + qWidth + 26);
        // 绘制价格
        y += 12;
        let price =
          goods.maxPrice === goods.minPrice
            ? noformatAmount(goods.maxPrice)
            : noformatAmount(goods.minPrice) +
              "~" +
              noformatAmount(goods.maxPrice);
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
        wx.hideLoading();
      }
    },
    /* 存海报 */
    async saveFile() {
      wx.showLoading({
        title: "保存中...",
      });
      const path = await new Promise((resolve, rej) => {
        wx.canvasToTempFilePath({
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
      wx.saveImageToPhotosAlbum({
        filePath: path as string,
        success: (data) => {
          wx.showToast({
            icon: "success",
            title: "保存成功",
          });
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {
          this.showCanvas = false;
          this.showXiaoyouShare = false;
          wx.hideLoading();
        },
      });
    },
    /* 海报保存 */
    onSaveHB() {
      console.log("保存海报", 1);
      // let self = this;
      wx.getSetting({
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
    //fc05
    // 规格查看更多商品
    checkMoreGoods() {
      console.log("this.vuexCombo", this.vuexCombo);
      this.spuModal = true;
    },
    // 关闭组合商品
    closeSpu(e: boolean) {
      console.log("e", e);
      this.spuModal = false;
    },
    // 查看更多-弹出
    // checkMoreGoods() {
    //   this.spuModal = true;
    // },
  },
};
</script>

<style scoped lang="scss">
.h-other-margin {
  margin-top: 26rpx;
}
.main-size-30 {
  font-size: 30rpx;
  color: #000000;
  line-height: 40rpx;
}
.no-product {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 40rpx;
}
.swiper-view {
  position: relative;
  .share-icon {
    position: absolute;
    bottom: 24rpx;
    right: 40rpx;
    width: 64rpx !important;
    height: 64rpx !important;
  }
}
.share-png {
  width: 48rpx;
  height: 48rpx;
}
.navbar {
  position: fixed;
  z-index: 99;
  width: 100%;
  top: 0;
  left: 0;
}

.top-show {
  background: #fff;
  position: fixed;
  left: 0;
  padding: 32rpx 40rpx;
  width: 100%;
  z-index: 90;
  .modal-info {
    display: flex;
    justify-content: space-between;
    .modal-left-info {
      width: 132rpx;
      height: 132rpx;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-self: center;
      margin-right: 26rpx;
      border-radius: 16rpx;
      .img {
        width: 132rpx;
        max-height: 132rpx;
        overflow: hidden;
      }
    }
    .modal-right-info {
      flex: 1;
      .tip-name {
        font-size: 30rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
        max-height: 80rpx;
        color: #000000;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .tags-info {
        max-height: 82rpx;
        overflow: hidden;
        .tag-css {
          // margin-bottom: 16rpx;
          color: #f86c4d;
          font-size: 22rpx;
          line-height: 26rpx;
          height: 30rpx;
          padding: 0 8rpx;
          border: 0.5rpx solid #f86c4d;
          border-radius: 8rpx;
          max-width: 220rpx;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 16rpx;
        }
      }
      .modal-price-info {
        font-size: 30rpx;
        font-weight: 600;
        color: #f86c4d;
        .spike-price-unuse {
          color: #999;
          text-decoration: line-through;
          font-size: 22rpx;
        }
      }
    }
  }
}

.deepcell {
  margin-left: -15px !important;
}
.indicator-num {
  padding: 2px 0;
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;
  &__text {
    color: #666666;
    font-size: 12px;
  }
}
//
.product-text {
  padding: 32rpx 40rpx;
  // padding-top: 32rpx;
  //width: 100%;
  // box-shadow: 0px 0px 24rpx 2rpx rgba(0, 0, 0, 0.08);
  background: #fff;
  // border-top-left-radius: 40rpx;
  // border-top-right-radius: 40rpx;
  .prodcut-text-top {
    color: $uni-text-color;
    font-family: PingFang SC-Medium, PingFang SC;
    // font-weight: 500;
    // margin-bottom: 32rpx;
    // padding: 0 32rpx;
    .top-name {
      margin-bottom: 16rpx;
      line-height: 44rpx;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      max-height: 96rpx;
    }
  }
}
.popup-tag-title {
  text-align: center;
  margin-top: 24rpx;
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
  // max-height: 750rpx;

  // margin-top: 48rpx;
  padding: 0 32rpx;
  // display: flex;
  // flex-wrap: wrap;
  // text {
  //   margin-right: 16rpx;
  //   margin-bottom: 32rpx;
  // }
}
.modal-popup {
  height: 60%;
  overflow-y: auto;
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
.pro-text-left {
  margin-right: 30rpx;
  font-size: 26rpx;
}
// fc05
// 规格
.fc05-border {
  border-top: 1rpx solid #f1f1f1;
  padding-top: 24rpx;
  margin-top: 8rpx;
}
.fc05-size-left {
  font-size: 30rpx;
  margin-right: 14rpx;
}

.fc05-size {
  .size-right-item {
    width: calc((100% - 48rpx) / 3);
    height: 64rpx;
    line-height: 64rpx;
    padding: 0 20rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #f1f1f1;
    margin-left: 16rpx;
    margin-bottom: 16rpx;
    // white-space: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .fc05-combo {
    padding-left: 16rpx;
    color: #999999;
    font-size: 22rpx;
    margin-bottom: 16rpx;
    .combo-img {
      width: 96rpx;
      height: 96rpx;
      border-radius: 16rpx;
      position: relative;
      border: 1rpx solid #f3f3f3;
      margin-top: 8rpx;
      margin-right: 8rpx;
      image {
        width: 100%;
        height: 100%;
      }
      .combo-nums {
        background: rgba(0, 0, 0, 0.45);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 26rpx;
        line-height: 26rpx;
        color: #fff;
        border-bottom-left-radius: 16rpx;
        border-bottom-right-radius: 16rpx;
        font-size: 22rpx;
        text-align: center;
      }
    }
    .fc05-more {
      margin-right: 16rpx;
    }
  }
}
.fc-num-mrgt {
  margin-top: 8rpx;
}

//fc-05 end
.tag-left {
  padding-right: 16rpx;
  min-width: 154rpx;

  white-space: nowrap;
  // overflow-x: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.pro-text-right {
  font-size: 26rpx;
  color: #333333;
}
.size-text {
  justify-content: flex-start;
  flex: 1;
  color: #999999;
}
.active {
  // background: #e9e9e9 !important;
  background: #1d9bdc !important;
  color: #ffffff;
}
//步进器
.input {
  background: $h-border-subbg;
  font-size: 26rpx;
  font-weight: 500;
  text-align: center;
  width: 64rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  // padding: 0 16rpx;
  margin: 0 15rpx;
  border-radius: 14rpx;
}
.input-unit {
  color: #999999;
  font-size: 26rpx;
  margin-right: 15rpx;
}
// .btnadd{
//   width: 48rpx;
//   height: 48rpx;
//   overflow: hidden;
// }
.plus,
.minus {
  width: 48rpx;
  height: 48rpx;
  background-color: $uni-bg-btn-suc;
  border-radius: 50%;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: center;
  align-items: center;
  overflow: hidden;
  image {
    width: 48rpx;
    height: 48rpx;
  }
}
.minus {
  background-color: #ffffff;
}
.gift-img {
  position: relative;
  .send-gift {
    width: 112rpx;
    height: 112rpx;
    margin-right: 24rpx;
    border-radius: 16rpx;
    overflow: hidden;
  }
  .send-gift-icon {
    // display: inline-block;
    background: #ffcd5f;
    width: 60rpx;
    height: 30rpx;
    font-size: 22rpx;
    color: #333333;
    padding: 0 8rpx;
    border-top-left-radius: 10rpx;
    border-bottom-right-radius: 10rpx;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
  }
}
.send-time--off {
  //下架
  background: #f1f1f1 !important;
  color: #999999 !important;
}
.send-time {
  width: 270rpx;
  height: 68rpx;
  line-height: 80rpx;
  display: flex;
  align-items: center;
  background: #1d9bdc;
  color: #ffffff;
  border-radius: 16rpx;
  justify-content: center;
  text-align: center;
  .icon-date {
    margin-left: 22rpx;
    width: 32rpx;
    height: 32rpx;
  }
}

.detail-img {
  margin-bottom: 300rpx;
  width: 100%;
  min-height: 1000rpx;
}
.property-css {
  padding: 0 40rpx;
  margin-bottom: 16rpx;
  .property-val {
    margin-left: 22rpx;
    flex: 1;
  }
}
.property-css:last-child {
  margin-bottom: 96rpx;
}
::v-deep.u-number-box__input {
  z-index: 0 !important;
}

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
.back-icon {
  margin-left: 30rpx;
}
.popupShow {
  overflow-y: hidden;
  position: fixed;
  // z-index: 999999;
  height: 100vh;
  width: 100%;
  // background: #000;
}
.main-padding {
  padding: 0;
}
.h-even-border {
  padding-bottom: 36rpx;
}
// 秒杀
.spike-bar {
  width: 100%;
  height: 120rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/Frame%2098%402x.png")
    no-repeat;
  background-position: 100%;
  background-size: cover;
  padding: 0 32rpx;
}
.spike-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spike-desc {
  display: flex;
  justify-content: left;
  align-items: center;
  .spike-icon {
    width: 40rpx;
    height: 40rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .spike-txt {
    width: 158rpx;
    height: 72rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.spike-time-desc {
  color: #fff;
}
.spike-price-bar {
  color: #fff;
  .spike-price {
    font-size: 34rpx;
    font-weight: 500;
    padding-right: 16rpx;
  }
  .spike-price-unuse {
    text-decoration: line-through;
    font-size: 22rpx;
  }
}

.spike-time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
}
.time-item {
  display: flex;
}
.time-number {
  min-width: 32rpx;
  display: block;
  height: 36rpx;
  border-radius: 8rpx;
  background: #177eb4;
  color: #fff;
  padding: 0 4rpx;
  text-align: center;
  margin: 0 4rpx;
}
.h-padding-top {
  // margin-top: 32rpx;
  padding-top: 36rpx;
}
.detail-goods--tip {
  margin-bottom: 360rpx;
}
.detail-goods {
  padding: 0 40rpx;
  font-size: 26rpx;
  margin-bottom: 16rpx;
}
.week-out {
  position: absolute;
  width: 556rpx;
  height: 500rpx;
  background: #fff;
  z-index: 999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40rpx;
  padding: 48rpx 36rpx;
  ::v-deep.u-checkbox-group {
    width: 484rpx;
    flex-wrap: wrap;
    justify-content: space-between;
    .u-checkbox-label--left {
      margin-top: 12rpx;
    }
  }
  .week-day {
    line-height: 48rpx;
    margin: 10rpx;
    background: #999;
    color: #fff;
    padding: 0 8rpx;
  }
  .btn-week {
    width: 450rpx;
    height: 104rpx;
    background: #1d9bdc;
    border-radius: 254rpx;
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    color: #fff;
    line-height: 104rpx;
    margin: 0 auto;
  }
  .top-name-week {
    text-align: center;
    position: relative;
    // background: #ff0;
    font-size: 34rpx;
    font-weight: bold;
    margin-bottom: 48rpx;
    .icon-week-close {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.modal-week {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 100%;
  z-index: 90999;
}
.cycle-box {
  width: 670rpx;
  height: 80rpx;
  margin: 24rpx auto -8rpx;
  text-align: center;
  overflow: hidden;
  .cycle-icon {
    border: none;
    height: 100%;
    width: 100%;
  }
}
.xiaoyou-share {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
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
//领取弹窗
.mask {
  width: 750rpx;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  text-align: center;
  overflow: scroll;
}
.mask-close-icon {
  width: 96rpx;
  height: 96rpx;
  margin-top: 36rpx;
}
.coupon-bg {
  padding-top: 286rpx;
  margin-top: 256rpx;
  width: 750rpx;
  height: 884rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/pls_bg.png")
    no-repeat;
  background-position: center;
  background-size: 100% 100%;
  padding-bottom: 32rpx;
  position: relative;
}
.coupon-bg-single {
  padding-top: 286rpx;
  margin-top: 256rpx;
  width: 750rpx;
  height: 800rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/single_bg.png")
    no-repeat;
  background-position: center;
  background-size: 100% 100%;
  padding-bottom: 32rpx;
  position: relative;
}
.mask-notice {
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  color: #fff6e8;
  line-height: 33rpx;
  position: absolute;
  bottom: 32rpx;
}
.coupon-button {
  //width: 638rpx;
  width: 678rpx;
  height: 228rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/get.png")
    no-repeat;
  background-position: 100%;
  background-size: 100% 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 52rpx;
  left: 40rpx;
}
.coupons {
  height: 378rpx;
  width: 550rpx;
  margin: 0 auto;
  overflow-y: scroll;
}
.coupons-single {
  height: 378rpx;
  width: 550rpx;
  margin: 0 auto;
  margin-top: 90rpx;
}

.coupon-item {
  margin: 0 auto;
  margin-top: 16rpx;
  width: 100%;
  height: 132rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/cu_bg.png");
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 16rpx;
}
.coupon-item-box:last-child {
  padding-bottom: 48rpx;
}
.coupon-left {
  width: 198rpx;
}
.coupon-right {
  width: 320rpx;
}
.coupon-condition {
  width: 100%;
  font-size: 22rpx;
  color: #999999;
  line-height: 26rpx;
  text-align: left;
  padding-left: 32rpx;
  padding-right: 32rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.coupon-title {
  width: 100%;
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  padding-bottom: 30rpx;
  text-align: left;
  padding-left: 32rpx;
  padding-right: 32rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 16rpx;
}
.coupon-price {
  font-size: 56rpx;
  font-weight: bold;
  color: #f61a3b;
  line-height: 66rpx;
  .coupon-price-icon {
    font-size: 28rpx;
  }
}
</style>
