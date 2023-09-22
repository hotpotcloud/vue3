<template>
  <!-- <view class="shop-car-container">
  <view class="c">3333</view>-->
  <view class="shop-car" v-if="showShopCar">
    <view class="shop-bar" :class="{active: shopCount > 0}">
      <view class="left" id="leftContainer">
        <view class="left-container">
          <image
            @tap="openShopCarList()"
            v-if="shopCount > 0"
            class="image"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/shopCarIcon.png"
          />
          <image
            v-else
            class="image"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/shopCarIconNotActive.png"
          />
          <view class="count" v-if="shopCount > 0">
            {{ shopCount | formatGoodsCount }}
          </view>
          <view class="count-location" id="countLocation"></view>
        </view>
        <view class="price">
          <view class="price-top">
            <view>
              <text class="price-icon">¥</text>
              <text class="price-money">{{ totalMoney | noformatAmount }}</text>
            </view>
            <view class="useless-price" v-if="totalDiscountAmount > 0">
              {{ checkInitialAmount | formatAmount }}
            </view>
            <!-- <text>.00</text> -->
          </view>
          <view class="price-top" v-if="totalDiscountAmount > 0">
            <view class="minus-all"
              >共减{{ totalDiscountAmount | formatAmount }}</view
            >
            <view class="discount-detail" @click="openPop()">
              优惠明细
              <uni-icons type="top" size="12" color="#3076AA"></uni-icons>
            </view>
          </view>
          <view v-if="totalDiscountAmount === 0" class="price-bottom"
            >提货方式：门店自提</view
          >
        </view>
      </view>
      <view class="right" @tap="goToCheck">去结算</view>
    </view>

    <u-popup
      :show="shopListPopup && shopCount > 0"
      :round="20"
      zindex="900"
      mode="bottom"
      @close="closeModal"
      overlayOpacity="0.45"
      :safeAreaInsetTop="false"
    >
      <view class="car-list">
        <view class="top-bar">
          <view class="left-bar">
            <image
              v-if="isCheckAll === isCheckAllCheckType.all"
              @tap="() => checkAll(isCheckAllCheckType.not)"
              class="check-image"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/checked.png"
            />
            <image
              v-else
              @tap="() => checkAll(isCheckAllCheckType.all)"
              class="check-image"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/not-check.png"
            />
            <text>全选</text>
            <text>
              （已选
              <text class="count">{{ checkNumber }}</text
              >件）
            </text>
          </view>
          <view class="right-bar" @tap="clearShopCar">
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/deleteicon.png"
            />
            <text>清空购物车</text>
          </view>
        </view>
        <scroll-view
          scroll-y="true"
          class="product-list"
          @scrolltolower="scrollEnd"
        >
          <view
            class="product-item"
            v-for="(item, index) in newShopCarListWithStock"
            :key="item.skuCode"
            @longtap="() => deleteGoods(item)"
          >
            <image
              class="check-image"
              v-if="item.checkType === shopGoodsCheckType.checked"
              @tap="() => changeCheck(shopGoodsCheckType.notCheck, item)"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/checked.png"
            />
            <image
              class="check-image"
              @tap="() => changeCheck(shopGoodsCheckType.checked, item)"
              v-else
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/not-check.png"
            />
            <view class="product-item-right">
              <view class="image-box">
                <image :src="item.imageUrl" />
                <view class="tips" v-if="item.remainStock > 0"
                  >仅剩{{ item.remainStock }}件</view
                >
              </view>
              <view class="product-item-info">
                <view class="title">{{ item.spuName }}</view>
                <view
                  class="coupon-tag-bar"
                  :style="{'max-width': '200px'}"
                  v-if="item.couponStrategyList.length > 0"
                >
                  <view
                    class="coupon-tag"
                    v-for="(tag, idx) in item.couponStrategyList"
                    :key="idx"
                  >
                    <text class="coupon-tag-no">{{ tag.reduced / 100 }}</text>
                    <text>{{
                      tag.couponType === couponDiscountType.REDUCE
                        ? "元无门槛"
                        : "折"
                    }}</text>
                  </view>
                </view>
                <view class="spec">{{ item.goodsConf }}</view>
                <view class="bottom">
                  <text class="price">
                    <text class="money-icon">¥</text>
                    <text class="large-price">{{
                      item.price | noformatAmount
                    }}</text>
                  </text>
                  <hCount
                    @handleAdd="(e) => handleAdd(item, index, e)"
                    @handleMinus="() => handleMinus(item, index)"
                    :count="item.number"
                    :maxDisabled="
                      (item.number >= item.reserve &&
                        item.reserve != unlimitedStock) ||
                      item.number === maxShopAddCount
                    "
                    :needShowMaxDisabled="false"
                  />
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
    <!-- 优惠明细弹窗 -->
    <u-popup
      :show="open"
      :round="20"
      zindex="1000"
      mode="bottom"
      @close="closePop()"
      overlayOpacity="0.45"
      :safeAreaInsetTop="false"
    >
      <view class="discount-content">
        <view class="d-flex d-sb">
          <view>
            <view class="discount-title">优惠明细</view>
            <view class="discount-desc">具体优惠金额以提交订单信息为准</view>
          </view>
          <uni-icons
            type="closeempty"
            size="18"
            color="#999999"
            @click="closePop()"
          ></uni-icons>
        </view>
        <view class="d-flex d-sb d-flex-center detail-bar">
          <view class="left-lable">商品总额</view>
          <view class="right-value">
            {{ checkInitialAmount | formatAmount }}
          </view>
        </view>
        <view class="d-flex d-sb d-flex-center detail-bar">
          <view class="left-lable">优惠活动共减</view>
          <view class="right-minus">{{
            totalDiscountAmount | formatAmount
          }}</view>
        </view>
        <view
          class="d-flex d-sb d-flex-center detail-bar"
          v-for="(itm, idx) in couponStrategyList"
          :key="idx"
        >
          <view class="d-flex d-flex-center left-lable-coupon">
            <view class="coupon-tag-label">优惠券</view>
            <view class="coupon-tag">
              <text class="coupon-tag-no">{{ itm.reduced / 100 }}</text>
              <text>{{
                itm.couponType === couponDiscountType.REDUCE ? "元无门槛" : "折"
              }}</text>
            </view>
          </view>
          <view class>{{ itm.couponAmount | formatAmount }}</view>
        </view>
        <view class="d-flex d-sb d-flex-center detail-bar">
          <view class="left-lable">合计</view>
          <view class="right-value">{{ totalMoney | formatAmount }}</view>
        </view>
      </view>
    </u-popup>
  </view>
  <!-- </view> -->
</template>
<script>
import hCount from "@/shopPages/components/h-count/index.vue";
import {mapActions, mapMutations, mapState} from "vuex";
import api, {request} from "@/utils/api";
import {shopCar, formatAmount, noformatAmount} from "@/utils/url";
import {
  shopGoodsCheckType,
  isCheckAllCheckType,
  unlimitedStock,
  maxShopAddCount,
  couponDiscountType,
} from "@/utils/enum";
import {debounce, checkGoods} from "@/utils/utils";

export default {
  components: {hCount},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showShopCar: {
      type: Boolean,
      default: false,
    },
    from: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      shopListPopup: false,
      shopGoodsCheckType,
      loading: false,
      isCheckAllCheckType,
      // 库存
      reserve: [],
      // 延迟事件
      timeout: null,
      debounceTimeout: null,
      unlimitedStock,
      maxShopAddCount,
      timeoutTips: null,
      countLocationLeft: 0,
      countLocationTop: 0,
      open: false, //优惠明细弹窗
      couponDiscountType,
    };
  },
  computed: {
    ...mapState("shopCar", [
      "shopCount",
      "totalMoney",
      "checkInitialAmount",
      "totalDiscountAmount",
      "couponStrategyList",
      "shopCarList",
      "shopCarListParams",
      "checkNumber",
      "totalElements",
      "isCheckAll",
    ]),
    newShopCarListWithStock() {
      if (this.reserve.length > 0) {
        return this.shopCarList.map((item) => {
          const findItem = this.reserve.find(
            (stock) => stock.goodsCode === item.channelSkuCode
          );
          if (findItem) {
            item.remainStock = findItem.reserve;
          }
          return item;
        });
      }
      return this.shopCarList;
    },
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query
      .selectAll("#countLocation")
      .boundingClientRect((data) => {
        this.countLocationLeft = data[0]?.left;
        this.countLocationTop = data[0]?.top;
        this.$emit("getLocationValue", data[0]?.left, data[0]?.top);
      })
      .exec();
  },
  watch: {
    showShopCar(nVal) {
      if (nVal) {
        this.getShopCarList();
        this.shopListPopup = true;
      }
    },
  },
  onLoad() {},
  methods: {
    ...mapMutations("order", [
      "setShopGoodsInfo",
      "setShopOrderGoodsInfo",
      "v_setPlaceOrderInfo",
    ]),
    ...mapMutations("shopCar", ["V_setShopCarListParams", "V_setShopCarList"]),
    ...mapMutations("order", ["v_setShopCoupon"]),

    ...mapActions("shopCar", ["getShopCountAndMoney", "getShopCarList"]),
    // 优惠详情弹窗
    closePop() {
      if (this.from !== "shopIndex") {
        this.$emit("closeShopCar");
      }
      this.open = false;
    },
    openPop() {
      console.log("000000000");
      this.getShopCountAndMoney();
      this.shopListPopup = false;
      this.open = true;
    },
    async clearShopCar() {
      await api.$get(
        `${shopCar.deleteByMemberNo}/${this.shopCarListParams.shopConfigId}`
      );
      this.closeModal();
      this.getShopCountAndMoney();
      this.getShopCarList();
    },
    closeModal() {
      if (this.from === "shopIndex") {
        this.shopListPopup = false;
      } else {
        this.$emit("closeShopCar");
      }
    },
    openShopCarList() {
      this.open = false;
      this.shopListPopup = !this.shopListPopup;
      if (this.shopListPopup) {
        this.open = false;
      }
      this.getShopCountAndMoney();
      this.getShopCarList();
      //是否从门店首页来
      if (this.from !== "shopIndex" && !this.shopListPopup) {
        this.$emit("closeShopCar");
      }
    },
    async goToCheck() {
      try {
        const res = await api.$get(
          `${shopCar.selectList}/${this.shopCarListParams.shopConfigId}`
        );
        // 清空仓苦中的数据
        this.setShopOrderGoodsInfo([], "shopOrderGoodsInfo");
        const shopOrderGoodsData = (res.data || [])
          .filter((item) => item.checkType === shopGoodsCheckType.checked)
          .map((item) => {
            return {
              goodsCode: item.channelSkuCode, //商品编码*
              goodsQty: item.number, //商品购买数量*
              unitPrice: item.price, //商品单价*
              skuCode: item.skuCode,
              spuCode: item.spuCode,
              reserve: item.reserve,
            };
          });

        if (shopOrderGoodsData.length > 0) {
          const remainStock = shopOrderGoodsData.filter((item) => {
            return (
              item.reserve < item.goodsQty && item.reserve !== unlimitedStock
            );
          });
          console.log(remainStock, "remainStock", this.newShopCarListWithStock);
          const noStock = remainStock.filter((item) => item.reserve === 0);

          if (remainStock.length > 0) {
            for (let i = 0; i < remainStock.length; i++) {
              const goodsItem = remainStock[i];
              const findItem = this.newShopCarListWithStock.find((goods) => {
                console.log(goodsItem, goods);
                return (
                  goodsItem.goodsCode === goods.channelSkuCode &&
                  goodsItem.reserve !== 0
                );
              });
              if (findItem) {
                const param = {
                  shopConfigId: this.shopCarListParams.shopConfigId,
                  number: goodsItem.reserve,
                  skuCode: findItem.skuCode,
                  channelSkuCode: findItem.channelSkuCode,
                  spuCode: findItem.spuCode,
                  checkType: findItem.checkType,
                };
                await api.$put(shopCar.shoppingCart, param);
              }
            }
            if (noStock.length > 0) {
              uni.showToast({
                icon: "none",
                title: "抱歉，商品库存不足，请重新选择商品",
              });
            } else {
              uni.showToast({
                icon: "none",
                title: "抱歉，部分商品库存不足",
              });
            }
            const timeout = setTimeout(() => {
              this.refreshData();
              clearTimeout(timeout);
            }, 1500);
            return (this.reserve = remainStock);
          }
          this.setShopOrderGoodsInfo(shopOrderGoodsData, "shopOrderGoodsInfo"); //保存下单商品信息到vuex里面
          this.v_setShopCoupon([]);
          uni.navigateTo({
            url: `/shopPages/placeOrder/index?shopConfigId=${this.shopCarListParams.shopConfigId}&spuCode=${this.spuCode}&from=shopCar`,
          });
          this.closeModal();
        } else {
          uni.showToast({
            icon: "none",
            title: "请勾选商品",
          });
        }
      } catch (error) {
        console.log(error, "error");
      }
    },
    // 加入购物车
    async addShopCar(index) {
      try {
        const param = {
          shopConfigId: this.shopCarListParams.shopConfigId,
          number: this.newShopCarListWithStock[index].number,
          skuCode: this.newShopCarListWithStock[index].skuCode,
          channelSkuCode: this.newShopCarListWithStock[index].channelSkuCode,
          spuCode: this.newShopCarListWithStock[index].spuCode,
          checkType: this.newShopCarListWithStock[index].checkType,
        };
        await api.$put(shopCar.shoppingCart, param);
        this.getShopCountAndMoney();
        this.getShopCarList();
      } catch (err) {
        uni.showToast({
          icon: "none",
          title: err.msg,
        });
        this.timeoutTips = setTimeout(() => {
          this.refreshData();
          clearTimeout(this.timeoutTips);
        }, 1500);
      }
    },
    // 防抖
    debounceAddShopCar(index, e) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.addShopCar(index);
        clearTimeout(this.debounceTimeout);
      }, 300);
    },
    // 加数量
    handleAdd(item, index, e) {
      const value = checkGoods(
        this.newShopCarListWithStock[index].number,
        maxShopAddCount,
        this.newShopCarListWithStock[index].reserve
      );
      if (value !== false) {
        this.newShopCarListWithStock[index].number = value;
        this.debounceAddShopCar(index, e);
      }
    },
    // 减数量
    handleMinus(item, index) {
      if (
        this.newShopCarListWithStock[index] &&
        this.newShopCarListWithStock[index].number <= 0
      ) {
        this.newShopCarListWithStock[index].number = 0;
      } else {
        this.newShopCarListWithStock[index].number =
          this.newShopCarListWithStock[index].number - 1;
      }
      this.debounceAddShopCar(index);
    },
    // 勾选
    async changeCheck(val, product) {
      const params = {
        channelSkuCode: product.channelSkuCode,
        checkType: val,
        number: product.number,
        shopConfigId: this.shopCarListParams.shopConfigId,
        skuCode: product.skuCode,
        spuCode: product.spuCode,
      };
      await api.$put(shopCar.shoppingCart, params);
      this.getShopCountAndMoney();
      this.getShopCarList();
    },
    async checkAll(val) {
      console.log(this.isCheckAll, "is");
      try {
        await api.$post(shopCar.isCheckAll, {
          isCheckAll: val,
          shopConfigId: this.shopCarListParams.shopConfigId,
        });
      } catch (e) {
        uni.showToast({
          icon: "none",
          title: err.msg,
        });
      } finally {
        this.getShopCountAndMoney();
        this.getShopCarList();
      }
    },
    scrollEnd() {
      if (
        this.shopCarListParams.page <
          Math.ceil(this.totalElements / this.shopCarListParams.size) &&
        this.loading === false
      ) {
        this.shopCarListParams.page = this.shopCarListParams.page + 1;
        this.V_setShopCarListParams({...this.shopCarListParams});
        this.getShopCarList({type: "loadMore"});
      }
    },
    //刷新数据
    refreshData() {
      this.getShopCountAndMoney();
      this.getShopCarList();
      this.$emit("refresh");
    },
    // 删除商品
    async deleteGoods(data) {
      uni.showModal({
        title: "删除商品",
        content: "确认删除该商品？",
        success: async (res) => {
          if (res.confirm) {
            try {
              await request({
                url: `${shopCar.deleteById}/${data.id}`,
                method: "DELETE",
              });
              this.refreshData();
            } catch (e) {
              console.log;
            }
          }
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.shop-car {
  position: fixed;
  bottom: 74rpx;
  left: 0rpx;
  width: 100vw;
  z-index: 10077;
}
.shop-bar {
  position: relative;
  width: 686rpx;
  height: 100rpx;
  z-index: 10077;
  margin: auto;
  background: #c7c7c7;
  box-shadow: 0rpx 4rpx 24rpx 0rpx #c7c7c7;
  border-radius: 104rpx 104rpx 104rpx 104rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    .image {
      width: 100rpx;
      height: 100rpx;
    }
    .price {
      margin-left: 36rpx;
      .price-top {
        margin-bottom: 2rpx;
        display: flex;
        align-items: baseline;
        font-weight: bold;
        .price-icon {
          font-size: 26rpx;
          color: #fff;
        }
        .price-money {
          font-size: 40rpx;
          color: #ffffff;
          line-height: 47rpx;
        }
        .useless-price {
          font-weight: normal;
          color: #d0ecff;
          font-size: 24rpx;
          padding-left: 8rpx;
          text-decoration: line-through;
        }
        .minus-all {
          font-weight: normal;
          color: #d0ecff;
          font-size: 24rpx;
          padding-left: 8rpx;
        }
        .discount-detail {
          font-size: 22rpx;
          font-weight: normal;
          color: #3076aa;
          padding-left: 8rpx;
        }
      }
      .price-bottom {
        font-size: 22rpx;
        font-weight: 500;
        color: #f1f1f1;
        line-height: 26rpx;
      }
    }
  }
  .right {
    width: 220rpx;
    height: 84rpx;
    font-size: 34rpx;
    font-weight: 500;
    line-height: 40rpx;
    text-align: center;
    border-radius: 48rpx;
    line-height: 84rpx;
    margin-right: 8rpx;
    background: #a9a9a9;
    color: #ffffff;
  }
}
.shop-bar.active {
  background: linear-gradient(270deg, #1d9bdc 0%, #8bd0ff 100%);
  box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(29, 155, 220, 0.3);
  .right {
    color: #1d9bdc;
    background: #ffffff;
  }
  .price-bottom {
    color: #e4f4ff;
  }
}
.car-list {
  padding-bottom: 180rpx;
  .top-bar {
    padding: 0rpx 32rpx;
    height: 104rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2rpx solid #f1f1f1;
    .left-bar {
      display: flex;
      align-items: center;
      .check-image {
        width: 48rpx;
        height: 48rpx;
        margin-right: 8rpx;
      }
      > text {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
      }
      > text:nth-child(2) {
        color: #333333;
      }
      .count {
        color: #f86c4d;
      }

      > text:nth-child(3) {
        color: #a9a9a9;
      }
    }
    .right-bar {
      display: flex;
      align-items: center;
      > image {
        width: 36rpx;
        height: 36rpx;
        margin-left: 4rpx;
      }
      > text {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
        line-height: 40rpx;
      }
    }
  }
  .product-list {
    max-height: 700rpx;
    padding-top: 24rpx;
    .product-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0rpx 32rpx;
      margin-bottom: 32rpx;
      .check-image {
        width: 48rpx;
        height: 48rpx;
        margin-right: 24rpx;
      }
      .product-item-right {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .image-box {
          position: relative;
          margin-right: 16rpx;
          > image {
            width: 176rpx;
            height: 176rpx;
          }
          width: 176rpx;
          height: 176rpx;
          background: #f1f1f1;
          border-radius: 24rpx 24rpx 24rpx 24rpx;
          .tips {
            position: absolute;
            bottom: 0rpx;
            left: 0rpx;
            width: 176rpx;
            height: 34rpx;
            background: #ffe7b4;
            text-align: center;
            font-size: 22rpx;
            font-weight: 500;
            color: #db9918;
            line-height: 34rpx;
            border-bottom-left-radius: 24rpx;
            border-bottom-right-radius: 24rpx;
          }
        }
        .product-item-info {
          flex: 1;
          margin-left: 16rpx;
          .title {
            font-size: 26rpx;
            font-weight: 500;
            color: #333333;
            line-height: 30rpx;
            margin-bottom: 16rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            white-space: normal !important;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .spec {
            height: 34rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
            line-height: 34rpx;
          }
          .bottom {
            margin-top: 16rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
              font-size: 22rpx;
              font-weight: 500;
              color: #f86c4d;
              line-height: 26rpx;
              font-weight: bold;
              .money-icon {
                font-size: 22rpx;
              }
              .large-price {
                font-size: 34rpx;
              }
            }
          }
        }
      }
    }
  }
}
.left-container {
  position: relative;
  .count {
    // width: 50rpx;
    padding: 4rpx 8rpx;
    height: 28rpx;
    background: #f86c4d;
    border: 1rpx solid #ffffff;
    font-size: 18rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 18rpx;
    text-align: center;
    border-radius: 28rpx;
    position: absolute;
    right: 0rpx;
    top: 10rpx;
    transform: translateX(50%);
  }
}
.count-location {
  position: fixed;
  left: 120rpx;
  bottom: 140rpx;
  z-index: 10000000;
}
.discount-content {
  height: 622rpx;
  padding: 48rpx;
  .discount-title {
    font-size: 34rpx;
    font-weight: bold;
    color: #000000;
  }
  .discount-desc {
    font-size: 24rpx;
    color: #a9a9a9;
    margin-top: 8rpx;
    margin-bottom: 48rpx;
  }
  .detail-bar {
    margin-bottom: 24rpx;
  }
  .left-lable {
    font-size: 26rpx;
    font-weight: bold;
    color: #333333;
  }
  .right-value {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
  }
  .right-minus {
    font-size: 28rpx;
    font-weight: bold;
    color: #f86c4d;
  }
  .left-lable-coupon {
    font-size: 24rpx;
    color: #666666;
    > view:nth-child(1) {
      margin-left: 8rpx;
    }
  }
}
.coupon-tag-label {
  margin-right: 8rpx;
}
</style>
