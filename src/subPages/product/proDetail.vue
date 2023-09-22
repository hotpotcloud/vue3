<template>
  <!-- 0下架 1上架 -->
  <view
    class="product-detail-out"
    :class="shows || show_nature || spuModal ? 'popupShow' : ''"
  >
    <!-- 标题 -->
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
    <!-- 商品 -->
    <view v-else>
      <!-- 吸顶 -->
      <!-- <StickyTop
        :show="modalShow"
        :topHeight="totalHeight"
        :productinfo="productinfo"
        :tagArr="xtag"
        :showPrice="!productinfo.numlist.killSymbal || !showKill"
        :xiaoyouShow="!xiaoyouShow"
      /> -->
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
        <!-- 名称信息 -->
        <DetailOne
          :showKill="showKill && productinfo.numlist.killSymbal"
          :times="times"
          :showSkillTag="
            productinfo.numlist.killSymbal && productinfo.skillFlag
          "
          :showCycle="productinfo.deliverType === CycleEnum.MILK_STATION"
          :spuName="productinfo.spuName"
          :minMoney="productinfo.minMoney"
          :xiaoyouShow="xiaoyouShow"
          @onChange="onChange"
          @onXiaoShare="onXiaoShare"
          @onCycle="onCycle"
        />
        <!-- 优惠部分 -->
        <view class="base-top">
          <DetailTwo
            :show="X_mutual.all"
            :couponShow="X_mutual.coupon"
            :coupon="ticketTag"
            :full="saleTag.FULL_REDUCTION"
            :gift="saleTag.FULL_GIFT"
            @clickTicket="clickTicket"
          />
        </view>
        <!-- 规格+参数 -->
        <view class="base-top combo_goods_detail">
          <!-- 规格 -->
          <size-goods
            @onChoose="onChoose"
            @onChooseNum="onChooseNum"
            @checkMoreGoods="checkMoreGoods"
          />
          <!-- 参数 -->
          <DetailRow @clickRow="clickSetting">
            <view slot="rightContent">
              <view class="tag-left h-tags-overflow">
                <text
                  v-for="(name, index) in productinfo.propertyValueList"
                  :key="index"
                  >{{ name.propertyName
                  }}{{
                    productinfo.propertyValueList.length > 1 &&
                    index + 1 < productinfo.propertyValueList.length
                      ? "、"
                      : ""
                  }}</text
                >
              </view>
            </view>
          </DetailRow>
        </view>
        <!-- 详情 -->
        <view class="detail-goods--tip base-top">
          <view
            class="detail-goods"
            :class="[iosFont ? 'font-ios' : 'font-android']"
            >商品详情</view
          >
          <view>
            <view style="width: 100%">
              <rich-text :nodes="textDetail"></rich-text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 参数弹窗-->
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
        <view class="popup-tag-title">优惠</view>
        <scroll-view scroll-y :style="{ height: popheight + 'px' }">
          <view class="popup-tag m48bot" v-if="Object.keys(saleTag).length">
            <view class="tag_tips">促销</view>
            <view v-if="saleTag.FULL_GIFT.length" class="m16bot">
              <text class="ticket-tag">满赠</text>
              <text v-for="(tag, index) in saleTag.FULL_GIFT" :key="index"
                >{{ tag }}{{ saleTag.FULL_GIFT.length > 1 ? "；" : "" }}</text
              >
            </view>
            <view v-if="saleTag.FULL_REDUCTION.length">
              <text class="ticket-tag">满减</text>
              <text v-for="(tag, index) in saleTag.FULL_REDUCTION" :key="index"
                >{{ tag
                }}{{ saleTag.FULL_REDUCTION.length > 1 ? "；" : "" }}</text
              >
            </view>
          </view>
          <view class="popup-tag">
            <view v-if="xticket.length && X_mutual.coupon">
              <view class="tag_tips">可领取优惠券</view>
              <view v-for="(el, index) in xticket" :key="index">
                <h-couponCollect :coupon="el" @handleCollect="handleCollect" />
              </view>
            </view>
          </view>
        </scroll-view>
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import FaceShare from "./component/FaceShare.vue";
import SpuArr from "./component/spuarr.vue";
import SizeGoods from "./component/size-goods.vue";
import DetailOne from "./component/DetailOne.vue";
import DetailTwo from "./component/DetailTwo.vue";
import StickyTop from "./component/StickyTop.vue";
import DetailRow from "./component/Detail-row.vue";
const d = new Date();
const y = d.getFullYear();
let m: number | string = d.getMonth() + 1;
m = m < 10 ? `0${m}` : m;
const day = d.getDate();
let t = null;
export default {
  components: {
    FaceShare,
    SpuArr,
    SizeGoods,
    DetailOne,
    DetailTwo,
    StickyTop, //吸顶
    DetailRow,
  },
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
      "saleTag", //满减满赠
      "ticketTag", //优惠券
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
    this.couponCode = "";
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
    // fc11-优惠券
    clickTicket() {
      console.log("e-开启");
      this.shows = true;
    },

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
    clickSetting() {
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
            defaultCouponCodeFlag: true, //默认选中
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
        uni.showLoading({
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
        filePath: path as string,
        success: (data) => {
          uni.showToast({
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
@import "./index.scss";
.product-detail-out {
  background: #f5f5f5;
  // background: #f00;
}
.base-top {
  margin-top: 16rpx;
}
</style>
