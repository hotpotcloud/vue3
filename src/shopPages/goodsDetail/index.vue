<template>
  <view class="goods-page">
    <!-- 轮播 -->
    <view class="back-bg" @tap="onBackBtn">
      <text class="back-bg-icon"></text>
    </view>
    <scroll-view scroll-y>
      <view class="out-lay">
        <view class="mask" v-if="outOfStock">
          <view class="mask-text">已售罄</view>.
        </view>
        <view class="swiper-view">
          <u-swiper
            :list="goodsInfo.imageUrl"
            @change="changeNum"
            :autoplay="fasle"
            indicatorStyle="left: 20px"
            height="375px"
            circular="fasle"
          >
            <view slot="indicator" class="indicator-num">
              <text class="indicator-num__text">
                {{ Number(currentNum) + 1 }}/{{ goodsInfo.imageUrl.length }}
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
                class="share-icon"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%88%86%E4%BA%AB%402x.png"
                mode="aspectFit"
              />
            </label>
          </view>
        </view>
      </view>

      <!-- 零购 -->
      <view class="retail" @tap="goRetail">
        <image
          class="retail-png"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E9%9B%B6%E8%B4%AD%402x.png"
        />
      </view>
      <!-- 商品名称-->
      <view class="goods-info">
        <view class="goods-title">{{ goodsInfo.spuName }}</view>
        <view class="goods-price">
          {{ activeItem.unitPrice | formatAmount }}
        </view>
      </view>
      <!-- 优惠券 -->
      <view v-if="goodsInfo.couponStrategyList.length > 0">
        <CouponCell
          @handleOpen="handleOpen"
          :list="goodsInfo.couponStrategyList"
        />
      </view>
      <!-- 规格 -->
      <view>
        <goods-size
          @onChoose="onChoose"
          :sizeList="goodsInfo.skuChannelInfoList"
          :activeSize="activeSize"
        ></goods-size>
      </view>

      <!-- 数量 -->
      <view>
        <Count
          @handleMinus="handleMinus"
          @handleAdd="handleAdd"
          :count="count"
          :maxDisabled="
            (count >= activeItem.reserve &&
              activeItem.reserve != unlimitedStock) ||
            count === maxShopAddCount
          "
        ></Count>
      </view>
      <!-- 参数-->
      <view class="d-flex-center fc05-border" @tap.stop="showSetting">
        <view class="pro-text-left">参数</view>
        <view
          class="d-flex-nowarp d-sb d-flex-center flex-1"
          style="color: #a9a9a9; font-size: 24rpx"
        >
          <view class="tag-left h-tags-overflow">
            <view v-if="goodsInfo.propertyValueList.length < 3">
              <text v-if="goodsInfo.propertyValueList[0].propertyName">
                {{ goodsInfo.propertyValueList[0].propertyName }}
                <text v-show="goodsInfo.propertyValueList.length != 1">、</text>
              </text>
              <text>
                {{
                  goodsInfo.propertyValueList[1].propertyName
                    ? goodsInfo.propertyValueList[1].propertyName
                    : ""
                }}
              </text>
            </view>
            <view v-else>
              <text>{{ goodsInfo.propertyValueList[0].propertyName }}、</text>
              <text>{{ goodsInfo.propertyValueList[1].propertyName }}</text>
              <text>...</text>
            </view>
          </view>
          <view class="d-flex-nowarp">
            <image
              class="right-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/ck_right.png"
              mode="scaleToFill"
            />
            <!-- <u-icon name="arrow-right" color="#999999" size="16"></u-icon> -->
          </view>
        </view>
      </view>
      <!-- 适用门店 -->
      <view class="suit-shop">
        <view class="suit-title">
          <view class="suit-title-text">适用门店</view>
          <view
            class="suit-title-right"
            v-if="suitShopList.length > 1"
            @tap="goSuitShop"
          >
            <!-- <view>查看({{ shopCount }})</view> -->
            <view>查看({{ suitShopList.length }})</view>
            <image
              class="right-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/ck_right.png"
              mode="scaleToFill"
            />
            <!-- <u-icon  name="arrow-right" color="#999999" size="16"></u-icon> -->
          </view>
        </view>
        <view v-if="currentShopItem.id">
          <view class="suit-item">
            <ShopItem :showPhone="true" :item="currentShopItem" />
          </view>
        </view>
        <view
          v-else
          class="suit-item"
          v-for="(el, index) in handleData()"
          :key="index"
        >
          <ShopItem :showPhone="true" :item="el" />
        </view>
      </view>
      <!-- 参数弹窗-->
      <view></view>

      <!-- 吸顶 -->
      <!-- <view class="top-show" v-if="modalShow" :style="{ top: totalHeight + 'px' }">测试吸顶</view> -->
      <!-- 商品详情 -->
      <view class="detail-goods--tip">
        <view
          class="detail-goods-title"
          :class="[iosFont ? 'font-ios' : 'font-android']"
          >商品详情</view
        >
        <view class="detail-goods-content">
          <!-- <view class="main-padding">
          </view>-->
          <view style="width: 100%">
            <rich-text :nodes="textDetail"></rich-text>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 底部按钮组 -->
    <hBtns
      :isOut="outOfStock"
      @toHome="goHome"
      @buygoods="buyNow"
      :price="goodsInfo.price"
      v-on:addShopCar="addShopCar"
      :isShowShopCar="true"
      :shopCount="shopCount"
      v-on:openShopCar="openShopCarAction"
    />
    <ShopCar
      :showShopCar="showShopCar"
      from="shopDetail"
      v-on:closeShopCar="closeShopCarAction"
      v-on:refresh="refreshData"
    />
    <u-popup
      :show="show_nature"
      :round="20"
      closeable
      mode="bottom"
      background-color="#fff"
      @close="() => (show_nature = false)"
      @open="() => (show_nature = true)"
      :safeAreaInsetBottom="true"
      zIndex="10079"
    >
      <view>
        <view class="popup-tag-title">参数</view>
        <view
          class="d-flex-row property-css"
          v-for="(el, index) in goodsInfo.propertyValueList"
          :key="index"
        >
          <view style="width: 130rpx">{{ el.propertyName }}</view>
          <view class="property-val">{{ el.propertyValue }}</view>
        </view>
      </view>
      <view>
        <button
          class="btnback"
          :loading="fasle"
          hover-class="button-hover"
          @click="() => (show_nature = false)"
        >
          返回
        </button>
      </view>
    </u-popup>
    <!-- 店铺优惠券弹窗 -->
    <CouponItem
      :couponPop="couponPop"
      @closeCouponPop="closeCouponPop()"
      :list="couponList"
      :from="ACQUIRE_TYPE_ENUM.PRODUCT_DETAIL"
      @refreshList="getList()"
    />
  </view>
</template>
<script lang="ts">
import {
  productStatusEnum,
  unlimitedStock,
  maxShopAddCount,
  ACQUIRE_TYPE_ENUM,
} from "@/utils/enum";
import api from "@/utils/api";
import {
  product,
  //  shop,
  shopCar,
  shopCoupons,
} from "@/utils/url";
import GoodsSize from "@/shopPages/goodsDetail/component/goods-size.vue";
import Count from "@/shopPages/goodsDetail/component/count.vue";
import ShopItem from "./component/shop-item.vue";
import hBtns from "./component/h-btns.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import ShopCar from "@/shopPages/components/shopCar/index.vue";
import { checkGoods } from "@/utils/utils";
import CouponCell from "./component/coupon-cell.vue";
import CouponItem from "../shop/CouponItem.vue";
import { isLogin } from "@/utils/commonMethod";
import { Global_Cog } from "@/utils/config";

export default {
  components: {
    GoodsSize,
    Count,
    hBtns,
    ShopItem,
    ShopCar,
    CouponCell,
    CouponItem,
  },
  data() {
    return {
      productStatusEnum,
      show_nature: false, //参数显示
      currentNum: 0, //轮播页码
      title: "属性参数",
      // spuCode: null,
      // numlist: [], //对应数量
      popheight: 0, //弹窗高度
      text: ``, // 规格
      ////////////////////////////////////////
      spuCode: "",
      shopConfigId: "",
      goodsInfo: {},
      count: 1, //购买数量
      activeSize: 0,
      goodsCode: "", //选中规格channelSkuCode
      // suitShopList: [], //适用店铺列表
      // shopCount: 0
      outOfStock: false,
      // 是否显示购物车
      showShopCar: false,
      unlimitedStock,
      maxShopAddCount,
      couponPop: false, //优惠券列表弹窗
      couponList: [],
      ACQUIRE_TYPE_ENUM,
    };
  },
  onLoad(options) {
    const { spuCode, shopConfigId } = options;
    this.shopConfigId = shopConfigId;
    this.spuCode = spuCode;
    // this.getDetail(this.spuCode, this.shopConfigId);
    this.V_setShopCarListParams({
      ...this.shopCarListParams,
      shopConfigId: this.shopConfigId,
    });
  },
  onShow() {
    this.getDetail(this.spuCode, this.shopConfigId);
    this.getList();

    // 库存不住返回时候
    if (this.placeOrderInfo.goodsCode) {
      this.count = this.placeOrderInfo.remainStock;
    }
    this.V_setCurrentShopItem({ shopConfigId: Number(this.shopConfigId) });
  },
  onHide() {
    console.log("qingkog");
    //清空
    this.v_setPlaceOrderInfo({});
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("home", ["existArr", "addInfoMsg"]),
    ...mapState("order", [
      "shopGoodsInfo",
      "shopOrderGoodsInfo",
      "placeOrderInfo",
    ]),
    ...mapState("shop", ["currentShopItem", "suitShopList"]),
    ...mapState("shopCar", ["shopCarListParams", "shopCount"]),

    // 富文本
    textDetail() {
      return this.richText(this.goodsInfo.spuDetailDTO?.detailContent);
    },
    // 分享
    shareText() {
      const url = `/shopPages/goodsDetail/index?spuCode=${this.spuCode}&shopConfigId=${this.shopConfigId}`;
      return {
        title: this.goodsInfo.spuName,
        path: url,
        imageUrl: this.goodsInfo.imageUrl && this.goodsInfo.imageUrl[0],
      };
    },
    activeItem() {
      if (
        this.goodsInfo.skuChannelInfoList &&
        this.goodsInfo.skuChannelInfoList[this.activeSize]
      ) {
        return this.goodsInfo.skuChannelInfoList[this.activeSize] || {};
      }
      return {};
    },
  },

  methods: {
    ...mapMutations("order", [
      "setShopGoodsInfo",
      "setShopOrderGoodsInfo",
      "v_setPlaceOrderInfo",
    ]),
    ...mapMutations("shopCar", ["V_setShopCarListParams"]),
    ...mapActions("shop", ["getSuitShopList"]),
    ...mapActions("shopCar", ["getShopCountAndMoney", "getShopCarList"]),
    ...mapMutations("shop", ["V_setCurrentShopItem"]),
    ...mapMutations("order", ["v_setShopCoupon"]),

    // 打开更多优惠券弹窗
    handleOpen() {
      this.getList();
      this.couponPop = true;
    },
    closeCouponPop() {
      this.couponPop = false;
    },
    async getList() {
      try {
        const res: any = await api.$get(
          shopCoupons.getShopCouponListDetail + `/${this.spuCode}`
        );
        console.log(res.data, "===>");
        this.couponList = res.data;
        this.goodsInfo.couponStrategyList = res.data;
      } catch (error) {}
    },
    //选择规格
    onChoose(index: number, el: any) {
      this.activeSize = index;
      this.goodsCode = el.channelSkuCode;
      this.skuCode = el.skuCode;
      this.outOfStock = el.reserve === 0 ? true : false;
      // this.getStoreList(el.skuCode);
      this.getSuitShopList({
        shopConfigId: this.shopConfigId,
        spuCode: this.spuCode,
        // channelSkuCode: el.skuCode,
      });
      console.log(index, el, "选规格");
      this.count = 1;
    },
    // 数量加减
    handleAdd() {
      const value = checkGoods(
        this.count,
        maxShopAddCount,
        this.activeItem.reserve
      );
      if (value !== false) {
        this.count = value;
      }
      // // 下单库存不足返回时
      // if (
      //   this.placeOrderInfo.goodsCode &&
      //   this.placeOrderInfo.goodsCode === this.goodsCode &&
      //   this.count >= this.placeOrderInfo.remainStock
      // ) {
      //   return;
      // }
      // this.count >= 0 && this.count++;
    },
    handleMinus() {
      this.count > 1 && this.count--;
    },
    // 参数显示
    showSetting() {
      this.show_nature = true;
    },
    // 回到首页
    goHome() {
      uni.switchTab({
        url: "/pages/homepage/homepage",
        success: () => {
          // this.closeModal();
          uni.showTabBar();
        },
      });
    },
    // 返回按钮
    onBackBtn() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.switchTab({
            url: "/pages/homepage/homepage",
          });
        },
      });
    },
    // 获取商品详情
    async getDetail(id: string | number, shopConfigId: number | string) {
      try {
        const para = {
          appId: Global_Cog.APPID,
          shopConfigId: this.shopConfigId,
          spuCode: this.spuCode,
        };
        const res: any = await api.$post(product.productInfos, para, "加载中");
        const data = res.data;
        data.companyName
          ? (data.propertyValueList = [
              { propertyName: "供应商", propertyValue: data.companyName },
              ...data.propertyValueList,
            ])
          : (data.propertyValueList = [...data.propertyValueList]);
        this.goodsInfo = data;
        this.goodsInfo.couponStrategyList = this.couponList;
        let resData = data;
        this.goodsCode = resData.skuChannelInfoList[0].channelSkuCode;
        this.skuCode = resData.skuChannelInfoList[0].skuCode;
        this.outOfStock =
          resData.skuChannelInfoList[0].reserve === 0 ? true : false;
        this.setShopGoodsInfo(resData, "shopGoodsInfo"); //保存商品信息到vuex里面
        // this.getStoreList(this.skuCode);
        this.getSuitShopList({
          shopConfigId: this.shopConfigId,
          spuCode: this.spuCode,
          // channelSkuCode: this.skuCode
        });
      } catch (error) {
        console.log(error, "++++++++++");
      }
    },
    handleData() {
      if (this.shopConfigId) {
        return this.suitShopList.filter((item) => {
          return item.shopConfigId === Number(this.shopConfigId);
        });
      }
      const list =
        this.suitShopList.length > 1
          ? this.suitShopList.slice(0, 1)
          : this.suitShopList;
      return list;
    },
    // 适用门店列表
    // async getStoreList(skuCode: string) {
    //   try {
    //     console.log(this.addInfoMsg, "地址信息");
    //     const para = {
    //       appId: this.userInfo.appId,
    //       latitude: this.addInfoMsg.latitude || 31.240688,
    //       longitude: this.addInfoMsg.longitude || 120.422653,
    //       shopStoreId: this.shopStoreId,
    //       shopConfigId: this.shopConfigId,
    //       channelSku: skuCode
    //     };
    //     const res: any = await api.$get(
    //       shop.getApplyShopListByChannelSku,
    //       para
    //     );
    //     this.shopCount = res.data.length;
    //     if (res.data.length > 3) {
    //       this.suitShopList = res.data.slice(0, 3);
    //     } else {
    //       this.suitShopList = res.data;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // 解析富文本
    richText(richTextData: any) {
      if (richTextData) {
        var richtext = richTextData;
        const regex = new RegExp("<img", "gi");
        const regex2 = new RegExp('src="/api', "gi");
        const regex3 = new RegExp('style=""', "gi");
        richtext = richtext.replace(regex2, `src="${this.$ServerBaseUrl}/api`);
        richtext = richtext.replace(
          regex,
          `<img style="width:100%;display:block;height:auto;"`
        );
        richtext = richtext.replace(regex3, "");
        return richtext;
      } else {
        return "";
      }
    },
    // 立即购买
    buyNow() {
      try {
        if (isLogin()) {
          if (
            this.activeItem.reserve < this.count &&
            this.activeItem.reserve != unlimitedStock
          ) {
            uni.showToast({
              icon: "none",
              title: `抱歉，商品库存不足，仅剩${this.activeItem.reserve}`,
            });
            this.count = this.activeItem.reserve;
            return;
          }
          // 清空仓苦中的数据
          this.setShopOrderGoodsInfo([], "shopOrderGoodsInfo");
          const shopOrderGoodsData = [
            {
              goodsCode: this.goodsCode, //商品编码*
              goodsQty: this.count, //商品购买数量*
              unitPrice: this.goodsInfo.price, //商品单价*
              skuCode: this.skuCode,
            },
          ];
          this.setShopOrderGoodsInfo(shopOrderGoodsData, "shopOrderGoodsInfo"); //保存下单商品信息到vuex里面
          console.log(this.shopOrderGoodsInfo, "仓库中保存的数据");
          const shopConfigId = this.shopConfigId
            ? this.shopConfigId
            : this.suitShopList[0].shopConfigId;
          this.v_setShopCoupon([]);
          uni.navigateTo({
            url: `/shopPages/placeOrder/index?shopConfigId=${shopConfigId}&spuCode=${this.spuCode}`,
          });
        }
      } catch (error) {}
    },
    // 零购跳转
    goRetail() {
      // uni.navigateTo({
      //   url: "/shopPages/agreements/retail"
      // });
      uni.navigateTo({
        url: `/shopPages/agreements/Retail`,
      });
    },
    // 跳转适用门店
    goSuitShop() {
      uni.navigateTo({
        url: "/shopPages/suitShop/index",
      });
    },
    async addShopCar() {
      try {
        const userInfo = uni.getStorageSync("userMsg");
        if (!userInfo)
          return uni.navigateTo({
            url: "/pages/user/relogin",
          });
        // if (
        //   this.count >
        //   this.goodsInfo.skuChannelInfoList[this.activeSize].reserve
        // ) {
        //   uni.showToast({
        //     title: `抱歉，仅剩${
        //       this.goodsInfo.skuChannelInfoList[this.activeSize].reserve
        //     }件`,
        //     icon: "none",
        //   });
        //   this.count =
        //     this.goodsInfo.skuChannelInfoList[this.activeSize].reserve;
        // }
        const param = {
          shopConfigId: this.shopConfigId,
          number: this.count,
          skuCode: this.skuCode,
          channelSkuCode: this.goodsCode,
          spuCode: this.goodsInfo.spuCode,
          isAccumulation: true,
        };
        await api.$post(shopCar.shoppingCartInsert, param);
        this.getShopCountAndMoney();
        this.getShopCarList();
        this.count = 1;
      } catch (e) {}
    },
    openShopCarAction() {
      if (this.shopCount > 0) {
        this.showShopCar = true;
      } else {
        uni.showToast({
          icon: "none",
          title: "还没有商品，赶紧加购吧~",
        });
      }
    },
    closeShopCarAction() {
      this.showShopCar = false;
    },
    refreshData() {
      this.getDetail(this.spuCode, this.shopConfigId);
    },
  },

  onShareAppMessage() {
    console.log("this.shareText", this.shareText);
    return this.shareText;
  },
};
</script>
<style lang="scss" scoped>
.goods-page {
  width: 100%;
  height: 100vh;
}
.swiper-view {
  position: relative;
  .share-icon {
    position: absolute;
    bottom: 24rpx;
    right: 40rpx;
    width: 64rpx !important;
    height: 64rpx !important;
    z-index: 500;
  }
}
.share-png {
  width: 48rpx;
  height: 48rpx;
}

//零购
.retail {
  width: 100%;
  height: 64rpx;
  padding: 0 32rpx;
  margin-top: 16rpx;
  .retail-png {
    width: 100%;
    height: 64rpx;
  }
}
.goods-info {
  width: 100%;
  padding: 0rpx 32rpx;
  margin-top: 16rpx;
  .goods-title {
    font-size: 30rpx;
    font-weight: bold;
    line-height: 35rpx;
    color: #000000;
  }
  .goods-price {
    font-size: 34rpx;
    font-weight: bold;
    line-height: 40rpx;
    color: #f86c4d;
    margin-top: 16rpx;
    padding-bottom: 16rpx;
    border-bottom: 2rpx solid #f4f4f4;
  }
}
.size {
  margin-top: 10rpx;
  color: #f86c4d;
}
//参数
.h-even-border {
  padding-bottom: 24rpx 32rpx;
}
.pro-text-left {
  width: 114rpx;
  font-weight: bold;
  font-size: 24rpx;
}
.fc05-border {
  padding: 24rpx 32rpx;
}
.fc05-size-left {
  font-size: 30rpx;
  margin-right: 14rpx;
}
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
  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  height: 60%;
  overflow-y: auto;
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
  // padding-top:32rpx ;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: 48rpx;
}
//商品详情
.detail-goods--tip {
  margin-bottom: 360rpx;
  padding: 0 32rpx;
}
.detail-goods-title {
  //padding: 0 32rpx;
  font-size: 26rpx;
  margin-bottom: 16rpx;
}
.detail-goods-content {
  padding: 0 8rpx;
  font-size: 26rpx;
  margin-bottom: 16rpx;
}
//适用门店
.suit-shop {
  padding: 24rpx 32rpx;
  .suit-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    .suit-title-text {
      font-size: 24rpx;
      font-weight: bold;
      color: #333333;
      line-height: 28rpx;
    }
    .suit-title-right {
      color: #999;
      display: flex;
      line-height: 28rpx;
      align-items: baseline;
      position: relative;
      padding-right: 32rpx;
      .right-icon {
        position: absolute;
        top: 0rpx;
        right: 0;
      }
    }
  }
  .suit-item {
    width: 686rpx;
    height: 186rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    opacity: 1;
    border: 2rpx solid #f1f1f1;
    padding: 24rpx;
    margin-bottom: 24rpx;
  }
}
.right-icon {
  width: 18rpx;
  height: 30rpx;
}
//已售罄蒙层
.out-lay {
  position: relative;
}
.mask {
  width: 100%;
  height: 722rpx;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  z-index: 100;
  .mask-text {
    width: 200rpx;
    height: 200rpx;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 44rpx;
    font-weight: bold;
    margin: 0 auto;
    margin-top: 275rpx;
  }
}

.back-bg {
  width: 72rpx;
  height: 56rpx;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 104rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0rpx 28rpx 28rpx 0rpx;
  z-index: 500;
  .back-bg-icon {
    width: 24rpx;
    height: 24rpx;
    border-top: 5rpx solid #fff;
    border-left: 5rpx solid #fff;
    border-top-left-radius: 4rpx;
    transform: rotate(-45deg);
  }
}
</style>
