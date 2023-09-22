<template>
  <Defined
    topName="门店"
    bgName="shop-index-bg.png"
    bgHeight="280rpx"
    :showBgBackBtn="true"
    :fixedTitle="fixedTitle"
  >
    <scroll-view
      scroll-y="true"
      class="shop-content-container"
      @scroll="scroll"
      :style="{ height: mainShopHeight }"
      :scroll-top="scrollTop"
    >
      <!-- 店铺信息 -->
      <view class="shop-content">
        <view class="top top-box">
          <view class="top-container"
            ><view class="shop-container"
              ><ShopItem :showPhone="true" :item="shopDetail" /> </view
            ><view class="tips">
              <view class="view-detail" @tap="goToAgreement"
                ><text>查看</text> <view class="back-icon"></view
              ></view> </view
          ></view>

          <view class="change-shop">
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/change.png"
            ></image
            ><text @tap="changeShop">切换门店</text></view
          >
        </view>
        <!-- 优惠券 -->
        <Discount
          v-if="couponList.length > 0"
          @showMoreModal="getShopCoupons()"
          :list="couponList"
          @handleCollect="handleCollect()"
          @handleUse="handleUse()"
        />

        <!-- 底部分类 -->
        <view
          :class="{ tab: true }"
          :style="{
            'min-height': mainShopHeight,
          }"
        >
          <view class="bottom-container">
            <scroll-view
              class="left"
              scroll-y="true"
              :class="{ fixed: fixedTitle }"
              :style="{
                top: !fixedTitle ? '0rpx' : navHeight + 'px',
                height: mainShopHeight,
              }"
            >
              <view class="inner-container">
                <view
                  :class="{
                    'left-tab-item': true,
                    active: currentTab === index,
                    next: currentTab + 1 === index,
                    pre: currentTab - 1 === index,
                  }"
                  v-for="(item, index) in categoryList"
                  :key="item"
                  @tap="changeCategory(item, index)"
                  ><view class="line" v-if="currentTab === index"></view
                  ><text>{{ item.name }}</text></view
                ><view
                  :class="{
                    'last-item': true,
                    next: currentTab + 1 === categoryList.length,
                  }"
                ></view>
              </view>
            </scroll-view>
            <view class="right">
              <view
                class="right-top-base"
                v-if="fixedTitle && Object.keys(productList).length !== 0"
                :style="{
                  top: navHeight - 1 + 'px',
                }"
                ><view class="title">{{ currentText }}</view></view
              >
              <view
                v-if="Object.keys(productList).length === 0"
                class="font-22 color-99 text-center"
                style="margin-top: 24rpx"
                >暂无数据</view
              >
              <view
                class="cate"
                v-for="(item, parentIndex) in productList"
                :key="item.id"
              >
                <view class="right-top" :data-cate="item.id"
                  ><view class="title">{{ item.name }}</view></view
                >
                <view
                  class="product-item d-flex"
                  v-for="(product, index) in item.product"
                  :key="index"
                  @tap.stop="goToProduct(product.spuCode)"
                  ><image
                    class="goods-img"
                    :src="product.imageUrl"
                    mode="aspectFit"
                  ></image
                  ><view class="d-flex-colum d-sb" style="width: 310rpx">
                    <view class="right-product-title"
                      >{{ product.spuName }}
                    </view>
                    <view
                      class="coupon-tag-bar"
                      v-if="product.couponStrategyList.length > 0"
                    >
                      <view
                        class="coupon-tag"
                        v-for="(itm, idx) in product.couponStrategyList"
                        :key="idx"
                      >
                        <text class="coupon-tag-no">{{
                          itm.reduced / 100
                        }}</text>
                        <text>{{
                          itm.couponType === couponDiscountType.REDUCE
                            ? "元无门槛"
                            : "折"
                        }}</text>
                      </view>
                    </view>
                    <view class="product-bottom d-flex-center d-sb">
                      <text class="price">
                        <text class="price-icon">￥</text>
                        <text>{{ product.momentPrice | noformatAmount }}</text>
                      </text>
                      <view @tap.stop="stopClick">
                        <hCount
                          v-if="product.goodsType === goodsTypeShop.single"
                          @handleAdd="(e) => handleAdd(parentIndex, index, e)"
                          @handleMinus="() => handleMinus(parentIndex, index)"
                          :count="product.number"
                          :maxDisabled="
                            (product.number >= product.reserve &&
                              product.reserve != unlimitedStock) ||
                            product.number === maxShopAddCount
                          "
                          :needShowMaxDisabled="false"
                        />
                        <view
                          class="choose-spec"
                          v-else
                          @tap.stop="() => selectSpec(product)"
                          >选规格
                          <view class="badge" v-if="product.number > 0">{{
                            product.number
                          }}</view></view
                        ></view
                      >

                      <!-- <image
                        class="buy"
                        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/buy.png"
                      ></image
                    > -->
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <ChooseSpec
      :show="showChooseSpec"
      v-on:onCancel="closeChooseSpec"
      :shopConfigId="shopConfigId"
      v-on:refresh="getGoodsList"
      :currentSpuCode="currentSpuCode"
    />
    <ShopCar
      :showShopCar="true"
      from="shopIndex"
      v-on:refresh="getGoodsList"
      v-on:getLocationValue="getLocationValue"
    />
    <cart-animation ref="cartAnimation"></cart-animation>
    <!-- 店铺优惠券弹窗 -->
    <CouponItem
      :couponPop="couponPop"
      :from="ACQUIRE_TYPE_ENUM.SHOP_STORE_INDEX"
      @closeCouponPop="closeCouponPop()"
      :list="couponList"
      @refreshList="getShopCouponList()"
    />
  </Defined>
</template>
<script>
import ShopItem from "@/components/shop-item";
import Defined from "./Defined.vue";
import { debounce } from "@/utils/utils";
import { mapState, mapMutations, mapActions } from "vuex";
import { shop, shopCar, shopCoupons, coupons } from "./../../utils/url";
import api from "@/utils/api";
import { Global_Cog } from "@/utils/config";
import { formatAmount, checkGoods } from "@/utils/utils";
import ShopCar from "@/shopPages/components/shopCar/index.vue";
import hCount from "@/shopPages/components/h-count/index.vue";
import ChooseSpec from "@/shopPages/components/chooseSpec/index.vue";
import {
  goodsTypeShop,
  unlimitedStock,
  maxShopAddCount,
  ACQUIRE_TYPE_ENUM,
  COUPON_CHANNEL_TYPE,
  couponDiscountType,
} from "@/utils/enum";
import cartAnimation from "@/shopPages/components/f-cartAnimation.vue";
import Discount from "./Discount.vue";
import CouponItem from "./CouponItem.vue";

export default {
  components: {
    ShopItem,
    Defined,
    ShopCar,
    hCount,
    ChooseSpec,
    cartAnimation,
    Discount,
    CouponItem,
  },
  data() {
    return {
      fixedTitle: false,
      menuButtonInfo: {}, //自定义高度信息
      categoryList: [],
      currentText: "",
      shopConfigId: "",
      categorySearchId: [], //商品分类id
      activeSecondId: "", //激活的二级tag
      currentTab: 0,
      shopDetail: {},
      categoryIdsObj: {},
      productList: {},
      topHeight: 0,
      scrollTop: 0,
      isHandleScroll: true,
      devicePixelRatio: 2,
      navHeight: 0,
      goodsTypeShop,
      showChooseSpec: false,
      // 延迟事件
      timeout: null,
      debounceTimeout: null,
      unlimitedStock,
      maxShopAddCount,
      // animationData: {},
      countLocationLeft: 0,
      countLocationTop: 0,
      // 是否正在add
      isAddRef: false,
      couponPop: false,
      couponList: [], //优惠券列表数据
      ACQUIRE_TYPE_ENUM,
      COUPON_CHANNEL_TYPE,
      couponDiscountType,
      currentSpuCode: "",
    };
  },
  computed: {
    // 内容区域定位偏移高度
    barHeight() {
      return this.menuButtonInfo.top + this.menuButtonInfo.height + 6 + 1;
    },
    leftTabHeight() {
      console.log(this.menuButtonInfo, "this.menuButtonInfo");
      return `calc(100vh - ${this.navHeight}px)`;
    },
    // 内容区域高度
    mainShopHeight() {
      return `calc(100vh - ${this.navHeight}px)`;
    },
    ...mapState("user", ["userInfo"]),
    ...mapState("home", ["existArr", "addInfoMsg"]),
    ...mapState("shopCar", ["shopCarListParams", "shopCount"]),
    ...mapState("shop", ["shopIndexShopConfigId"]),
  },
  watch: {
    shopCount(nval) {
      this.getGoodsList();
    },
    addInfoMsg(nval) {
      console.log("地址变化");
      this.getDetail();
    },
  },
  onLoad(data) {
    // // 跳转进入
    if (data?.shopConfigId) {
      this.shopConfigId = data?.shopConfigId; //请求id
    }
    uni.removeStorageSync("shopIndexShopConfigId");
    this.initData();
  },
  onShow() {
    const shopIndexShopConfigId = uni.getStorageSync("shopIndexShopConfigId");
    if (shopIndexShopConfigId) {
      this.shopConfigId = shopIndexShopConfigId;
      // 安卓机返回
      this.initData();
      uni.removeStorageSync("shopIndexShopConfigId");
    }
  },
  mounted() {
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.devicePixelRatio = uni.getSystemInfoSync().devicePixelRatio;
    uni.getSystemInfo({
      success: (res) => {
        let menuButtonInfo = {};
        if (res.platform === "ios") {
          // ios设备的胶囊按钮都是固定的
          menuButtonInfo = {
            width: 87,
            height: 32,
            left: res.screenWidth - 7 - 87,
            right: res.screenWidth - 7,
            top: res.statusBarHeight + 4,
            bottom: res.statusBarHeight + 4 + 32,
          };
        } else {
          // 安卓通过api获取
          menuButtonInfo = uni.getMenuButtonBoundingClientRect();
        }
        console.log("获取胶囊信息：", menuButtonInfo);
        // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上未知-状态栏高度）* 2 + 胶囊高度 + 状态栏高度
        this.navHeight =
          (menuButtonInfo.top - res.statusBarHeight) * 2 +
          menuButtonInfo.height +
          res.statusBarHeight +
          1 * 3;
        console.log(menuButtonInfo, this.navHeight);
        // 按钮上下边距高度
        this.menuBottom = menuButtonInfo.top - res.statusBarHeight;
        // 导航栏右边到屏幕边缘的距离
        this.menuRight = res.screenWidth - menuButtonInfo.right;
        // 导航栏高度
        this.menuHeight = menuButtonInfo.height;
      },
      fail(err) {},
    });
    this.getSystemHeight();
    const query = uni.createSelectorQuery().in(this);
    query
      .selectAll(".right")
      .boundingClientRect((data) => {
        this.topHeight = data[0]?.top;
      })
      .exec();
  },
  methods: {
    ...mapMutations("shopCar", ["V_setShopCarListParams"]),
    ...mapActions("shopCar", [
      "getProductDetail",
      "getShopCountAndMoney",
      "getShopCarList",
    ]),
    ...mapMutations("shop", ["V_setCurrentShopItem"]),
    // 获取优惠券列表
    async getShopCouponList() {
      try {
        const param = {
          appId: Global_Cog.APPID,
          shopConfigId: this.shopConfigId,
        };
        const { data } = await api.$post(shopCoupons.getShopCouponList, param);
        this.couponList = data;
      } catch (error) {}
    },
    //领取
    async handleCollect(code) {
      try {
        const para = {
          acquireType: ACQUIRE_TYPE_ENUM.SHOP_STORE_INDEX,
          channel: COUPON_CHANNEL_TYPE.XHG,
          code,
        };
        await api.$post(coupons.getCoupon, para);
        this.getShopCouponList();
        uni.showToast({
          title: "领券成功",
          icon: "success",
          duration: 1500,
        });
        this.getShopCountAndMoney();
      } catch (error) {}
    },
    // 去使用
    handleUse(goods) {
      this.V_setCurrentShopItem({});
      uni.navigateTo({
        url: `/shopPages/goodsDetail/index?spuCode=${goods.productDTOList[0].spuCode}&shopConfigId=${this.shopConfigId}`,
      });
      console.log("跳转商品详情");
    },
    // 获取更多店铺优惠券
    getShopCoupons() {
      this.getShopCouponList();
      this.couponPop = true;
      console.log("first", this.couponPop);
    },
    // 关闭弹窗
    closeCouponPop() {
      this.couponPop = false;
    },
    initData() {
      this.getDetail();
      this.getTree();
      this.V_setShopCarListParams({
        ...this.shopCarListParams,
        shopConfigId: this.shopConfigId,
      });
      this.getShopCountAndMoney();
      this.getShopCarList();
      this.getShopCouponList();
    },
    //系统高度获取
    getSystemHeight() {
      //胶囊信息获取
      this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    },
    scroll(e) {
      const query = uni.createSelectorQuery().in(this);
      query
        .selectAll(".right")
        .boundingClientRect((data) => {
          if (e.detail.scrollTop >= data[0].top) {
            this.fixedTitle = true;
          } else {
            this.fixedTitle = false;
          }
          this.debounceGetCurrentItem();
        })
        .exec();
    },
    debounceGetCurrentItem() {
      debounce(this.getCurrentItem, 200);
    },
    getCurrentItem() {
      const query = uni.createSelectorQuery().in(this);
      query
        .selectAll(".right-top")
        .boundingClientRect((data) => {
          if (data.length) {
            const index = data.findLastIndex((item) => {
              return item.top < this.navHeight + 64;
            });
            const idx = index >= 0 ? index : 0;
            const cur = data[idx].dataset;
            this.currentText = this.categoryIdsObj[cur?.cate]?.name;
            this.activeSecondId = cur?.cate;
          } else {
            this.currentText = "";
            this.activeSecondId = "";
          }
        })
        .exec();
    },

    changeShop() {
      uni.navigateTo({
        url: `/shopPages/shopList/index?back=true`,
      });
    },
    goToProduct(spuCode) {
      this.V_setCurrentShopItem({});
      uni.navigateTo({
        url: `/shopPages/goodsDetail/index?spuCode=${spuCode}&shopConfigId=${this.shopConfigId}`,
      });
    },
    goToAgreement() {
      uni.navigateTo({
        url: `/shopPages/agreements/Agreement`,
      });
    },
    async changeCategory(item, index) {
      this.currentTab = index;
      const ids = [this.categoryList[this.currentTab].id];
      this.categorySearchId = ids;
      await this.getGoodsList();
      this.scrollTop = -1;
      this.$nextTick(() => {
        this.isHandleScroll = false;
        this.fixedTitle = true;
        this.scrollTop = this.topHeight - this.navHeight;
        // this.scrollTop = (this.navHeight / 2) * this.devicePixelRatio;
        // console.log(this.scrollTop, " this.scrollTop ");
      });
    },
    handleTreeObj(data) {
      data.map((item) => {
        this.categoryIdsObj[item.id] = { ...item, product: [] };
        if (item.children) {
          this.handleTreeObj(item.children);
        }
      });
    },
    async getDetail() {
      const { data } = await api.$get(shop.getShopStoreById, {
        appId: Global_Cog.APPID,
        latitude: this.addInfoMsg.latitude,
        longitude: this.addInfoMsg.longitude,
        shopConfigId: this.shopConfigId,
      });
      this.shopDetail = data;
      // 查询门店信息时候 重置数据
      this.scrollTop = -1;
      this.currentTab = 0;
      this.fixedTitle = false;
    }, // 获取左边
    async getTree() {
      try {
        // 一级树形分类
        const { data } = await api.$get(
          this.urlapi.product.shopStoreTree,
          { appId: Global_Cog.APPID, shopConfigId: this.shopConfigId },
          "",
          false
        );
        this.categoryList = data;
        this.handleTreeObj(data);
        const ids = [data[this.currentTab].id];
        this.categorySearchId = ids;
        this.getGoodsList();
      } catch (error) {
        console.log(error);
      } finally {
      }
    }, // 请求商品信息
    async getGoodsList() {
      try {
        if (this.categorySearchId.length <= 0) {
          return;
        }
        this.goodList = [];
        const { data } = await api.$post(
          this.urlapi.product.spuOfCategory,
          {
            categorySearchId: this.categorySearchId,
            categoryId: this.categorySearchId[0],
            appId: Global_Cog.APPID,
            shopConfigId: this.shopConfigId,
          },
          "加载中"
        );
        const dataObj = {};
        data.map((item) => {
          // item.momentPrice = formatAmount(item.price);
          item.momentPrice = item.price;
          if (!dataObj[item.categoryId]) {
            dataObj[item.categoryId] = {
              ...this.categoryIdsObj[item.categoryId],
              product: [],
            };
          }
          dataObj[item.categoryId].product.push(item);
        });
        this.productList = dataObj;
      } catch (data) {
        this.productList = [];
      }
    },

    async addShopCar(parentIndex, index, e) {
      try {
        const param = {
          shopConfigId: this.shopConfigId,
          number: this.productList[parentIndex].product[index].number,
          skuCode: this.productList[parentIndex].product[index].skuCode,
          channelSkuCode:
            this.productList[parentIndex].product[index]?.channelSkuCode,
          spuCode: this.productList[parentIndex].product[index]?.spuCode,
        };
        await api.$post(shopCar.shoppingCartInsert, param);
        // 加数量时候
        e &&
          this.$refs.cartAnimation.touchOnGoods(e, {
            x: this.countLocationLeft,
            y: this.countLocationTop,
          });
        await this.getShopCountAndMoney();
        // await this.getGoodsList();
        this.isAddRef = false;
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.msg,
        });
        const timeout = setTimeout(() => {
          this.getGoodsList();
          clearTimeout(timeout);
        }, 1500);
      }
    },
    debounceAddShopCar(parentIndex, index, e) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.addShopCar(parentIndex, index, e);
        clearTimeout(this.debounceTimeout);
      }, 300);
    },
    handleAdd(parentIndex, index, e) {
      if (
        this.productList[parentIndex] &&
        this.productList[parentIndex].product &&
        this.productList[parentIndex].product[index]
      ) {
        const value = checkGoods(
          this.productList[parentIndex].product[index].number,
          maxShopAddCount,
          this.productList[parentIndex]?.product[index].reserve
        );
        if (value !== false) {
          this.productList[parentIndex].product[index].number = value;
          this.productList = { ...this.productList };
          this.debounceAddShopCar(parentIndex, index, e);
        }
      }
    },
    handleMinus(parentIndex, index) {
      if (
        this.productList[parentIndex] &&
        this.productList[parentIndex].product &&
        this.productList[parentIndex].product[index]
      ) {
        if (this.productList[parentIndex]?.product[index].number <= 0) {
          this.productList[parentIndex].product[index].number = 0;
        } else {
          this.productList[parentIndex].product[index].number =
            (this.productList[parentIndex]?.product[index].number || 0) - 1;
        }
        // this.productList[parentIndex].product[index].maxDisabled = false;
        this.productList = { ...this.productList };
        this.debounceAddShopCar(parentIndex, index);
      }
    },
    stopClick() {},
    selectSpec(product) {
      this.showChooseSpec = true;
      this.getProductDetail({
        appId: Global_Cog.APPID,
        shopConfigId: this.shopConfigId,
        spuCode: product.spuCode,
      });
      this.currentSpuCode = product.spuCode;
    },
    closeChooseSpec() {
      this.showChooseSpec = false;
    },
    getLocationValue(x, y) {
      this.countLocationLeft = x;
      this.countLocationTop = y;
    },
  },
  // 清楚计时器
  onUnload() {
    clearTimeout(this.timeout);
    clearTimeout(this.debounceTimeout);
  },
};
</script>
<style lang="scss" scoped>
.shop-content-container {
  width: 100vw;
  .shop-content {
    height: 100%;
  }

  .top {
    position: relative;
    width: calc(100vw - 64rpx);
    transform: translateX(32rpx);
    // top: 4rpx;
    padding-top: 4rpx;
    .shop-container {
      margin-top: 4rpx;
      margin-right: 4rpx;
      height: 186rpx;
      background-color: #fff;
      padding: 24rpx 0rpx 24rpx 24rpx;
      border-radius: 24rpx;
      width: 688rpx;
    }
    .top-container {
      height: 250rpx;
      background-repeat: no-repeat;
      background-size: 100% 100rpx;
      background-position: 0rpx 150rpx;
      background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/getMethod.png");
    }
  }
  .change-shop {
    position: absolute;
    width: 164rpx;
    height: 58rpx;
    background: #d0ecff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0rpx 24rpx 0rpx 24rpx;
    top: -4rpx;
    right: -4rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #1d9bdc;
    line-height: 58rpx;
    > image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 4rpx;
    }
  }
  .tips {
    // padding-top: 10rpx;
    padding-right: 22rpx;
    > view {
      font-size: 22rpx;
      font-weight: 400;
      color: #db9918;
      line-height: 64rpx;
      display: flex;
      align-items: center;
      .back-icon {
        width: 16rpx;
        height: 16rpx;
        margin-left: 10rpx;
        border-top: 2rpx solid #db9918;
        border-right: 2rpx solid #db9918;
        transform: rotate(45deg);
      }
    }
    display: flex;
    justify-content: flex-end;
  }
}
.tab {
  background: #ffffff;
  position: sticky;
  .bottom-container {
    margin-top: 14rpx;
    display: flex;
    position: relative;
    height: 100%;
    padding-bottom: 180rpx;
  }
  .left {
    width: 168rpx;
    position: absolute;
    background: #f5f5f5;
    top: 0rpx;
    left: 0rpx;
    height: calc(100vh - 115rpx);
    z-index: 1;
    .inner-container {
      background-color: #fff;
    }
  }
  .right {
    flex: 1;
    padding: 2rpx 0rpx 50rpx 192rpx;
    position: relative;
    .title {
      font-size: 34rpx;
      color: #333333;
      padding: 24rpx 0rpx;
      font-weight: 500;
      line-height: 40rpx;
      background-color: #fff;
    }
    .cate {
      .product-item:not(:last-child) {
        margin-bottom: 16rpx;
      }
    }
  }

  .right-top {
    position: sticky;
    top: 0rpx;
    left: 192rpx;
    z-index: 1;
    .title {
      font-size: 26rpx;
      font-weight: bold;
      color: #333333;
    }
  }
  .right-top-base {
    position: fixed;
    left: 0rpx;
    padding-left: 24rpx;
    left: 168rpx;
    z-index: 2;
    font-size: 34rpx;
    color: #333333;
    font-weight: 500;
    line-height: 40rpx;
    background-color: #fff;
    width: calc(100vw - 192rpx);
  }
  .left-tab-item {
    width: 168rpx;
    height: 104rpx;
    position: relative;
    text-align: center;
    line-height: 104rpx;
    font-size: 26rpx;
    color: #333333;
    font-weight: 500;
    background: #f5f5f5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0rpx 16rpx;
    .line {
      position: absolute;
      left: 0rpx;
      width: 8rpx;
      height: 104rpx;
      background: #1d9bdc;
      border-radius: 0rpx 8rpx 8rpx 0rpx;
    }
  }
  .left-tab-item.active {
    background-color: #fff;
  }
  .left-tab-item.next {
    border-top-right-radius: 16rpx;
  }
  .left-tab-item.pre {
    border-bottom-right-radius: 16rpx;
  }
  .last-item.next {
    background: #f5f5f5;
    border-top-right-radius: 16rpx;
    height: 16rpx;
  }
  .product-item {
    .goods-img {
      width: 176rpx !important;
      height: 176rpx !important;
      overflow: hidden;
      margin-right: 24rpx;
      border-radius: 24rpx;
    }
    .right-product-title {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 26rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 16rpx;
    }
    .price {
      font-size: 34rpx;
      font-weight: bold;
      color: #f86c4d;
      line-height: 40rpx;
      .price-icon {
        font-size: 22rpx;
      }
    }
    .buy {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
.fixed {
  position: fixed !important;
}
.product-bottom {
  .choose-spec {
    width: 104rpx;
    height: 48rpx;
    background: #1d9bdc;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 48rpx;
    text-align: center;
    position: relative;
    .badge {
      position: absolute;
      top: -20%;
      right: -10%;
      padding: 0rpx 10rpx;
      height: 28rpx;
      background: #f86c4d;
      border: 1rpx solid #ffffff;
      font-size: 20rpx;
      font-weight: 500;
      color: #ffffff;
      line-height: 26rpx;
      text-align: center;
      border-radius: 14rpx;
    }
  }
}
</style>
