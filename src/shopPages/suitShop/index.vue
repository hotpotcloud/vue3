<template>
  <scroll-view class="suit-shop" scroll-y="true">
    <view
      v-if="suitShopList.length === 0"
      class="font-22 color-99 text-center"
      style="margin-top: 24rpx"
      >暂无数据</view
    >
    <view
      @tap="() => clickShopItem(item)"
      v-for="item in suitShopList"
      :key="item.id"
      :class="{
        'around-item': true,
        active: item.shopConfigId === currentShopItem.shopConfigId,
      }"
    >
      <ShopItem :item="item" :needBg="false" />
    </view>
  </scroll-view>
</template>
<script>
import ShopItem from "@/components/shop-item";
import {mapMutations, mapState} from "vuex";

export default {
  components: {ShopItem},
  data() {
    return {
      channelSkuCode: "",
      isFromPlaceOrder: false,
    };
  },

  computed: {
    ...mapState("shop", ["suitShopList", "currentShopItem"]),
  },
  onLoad(options) {
    if (options.from === "placeOrder") {
      this.isFromPlaceOrder = true;
    }
  },
  mounted() {},
  methods: {
    ...mapMutations("shop", ["V_setCurrentShopItem"]),

    // async getList() {
    //   try {
    //     console.log(this.addInfoMsg, "地址信息");
    //     const para = {
    //       appId: Global_Cog.APPID,
    //       latitude: this.addInfoMsg.latitude || 31.240688,
    //       longitude: this.addInfoMsg.longitude || 120.422653,
    //       shopConfigId: this.shopConfigId,
    //       channelSku: this.channelSkuCode,
    //     };
    //     const res = await api.$get(shop.getApplyShopListByChannelSku, para);
    //     this.shopCount = res.data.length;
    //     console.log(res.data, "res.data");
    //     this.list = res.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    clickShopItem(item) {
      let pageList = getCurrentPages(); //跳转页面成功之后
      const lastPage = pageList[pageList.length - 2];
      const param = {
        shopConfigId: item.shopConfigId,
        isShopCar: lastPage.data.isShopCar,
        isChange:
          String(item.shopConfigId) !== String(lastPage.data.shopConfigId),
        spuCode: lastPage.data.spuCode,
      };
      const shopConfigId = item.shopConfigId;
      if (!this.isFromPlaceOrder) {
        uni.redirectTo({
          url: "/shopPages/shop/index?shopConfigId=" + shopConfigId,
        });
        return;
      }
      // 下单页面
      this.V_setCurrentShopItem(item);
      uni.navigateBack({
        shopConfigId: shopConfigId,
        success: () => {
          let page = getCurrentPages().pop(); //跳转页面成功之后
          console.log(
            item.shopConfigId,
            lastPage.data.isShopCar,
            lastPage.data.shopConfigId,
            String(item.shopConfigId) !== page.data.shopConfigId,
            "page"
          );
          if (!page) {
            return;
          } else {
            uni.setStorageSync("placeOrderOptions", JSON.stringify(param));
            page.onLoad(param);
          }
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.suit-shop {
  padding: 16rpx 24rpx;
  background: #f5f5f5;
  height: 100vh;
  .around-item {
    background-color: #fff;
    padding: 26rpx;
    margin-bottom: 16rpx;
    background-size: 100% 100%;
  }
  .around-item.active {
    background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/select-shop.png");
  }
}
</style>
