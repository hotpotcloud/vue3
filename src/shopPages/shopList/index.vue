<!-- 门店列表页 -->
<template>
  <view class="around-out" v-if="stationTotal || historyStationTotal">
    <!-- 门店tab -->
    <view class="top">
      <view
        :class="stationType ? 'top-current-active' : 'top-current'"
        v-if="stationTotal"
        @tap="changeCurrentType(1)"
        >附近门店 ({{ stationTotal }})
      </view>
      <text
        class="top-border"
        v-if="stationTotal && historyStationTotal"
      ></text>
      <view
        :class="stationType ? 'top-history' : 'top-history-active'"
        v-if="historyStationTotal"
        @tap="changeCurrentType(0)"
        >历史门店 ({{ historyStationTotal }})</view
      >
    </view>
    <scroll-view
      :scroll-y="true"
      style="height: calc(100vh - 206rpx)"
      @scrolltolower="scrolltolower"
    >
      <!-- 门店列表 -->
      <view class="around-main">
        <view
          v-for="i in stationType ? stationList : historyStationList"
          :key="i.milkStationNo"
        >
          <!-- item组件 -->
          <view
            class="around-item"
            @click="() => clickShopItem(i.shopConfigId)"
          >
            <ShopItem showPhone :item="i" wrapClass="shop-list-box" />
          </view>
        </view>
      </view>
      <view class="bot" v-if="moreText">— &nbsp;{{ moreText }}&nbsp; —</view>
    </scroll-view>
  </view>
</template>

<script>
import ShopItem from "@/components/shop-item";
import { mapState, mapActions, mapMutations } from "vuex";
import { BaseApp } from "@/const/appIdConf";
export default {
  components: { ShopItem },
  props: {},
  data() {
    return {
      moreText: "",
      back: false,
    };
  },
  computed: {
    ...mapState("home", [
      "stationList",
      "stationType",
      "historyStationList",
      "totalPage",
      "historyTotalPage",
      "stationTotal",
      "historyStationTotal",
    ]),
  },
  watch: {
    stationType(newVal, oldVal) {
      console.log("watch监听触发了", newVal, oldVal);
    },
  },
  onLoad(data) {
    // 跳转进入
    if (data?.back) {
      console.log(data?.back, "back");
      this.back = data?.back;
    }
  },
  onShow() {
    BaseApp.digitalShop && this.X_getStationList();
    BaseApp.digitalShop && this.X_getHistoryStationList();
  },
  methods: {
    ...mapMutations("home", ["V_setStationType"]),
    ...mapMutations("shop", ["V_setShopIndexShopConfigId"]),

    ...mapActions("home", ["X_getStationList", "X_getHistoryStationList"]),
    // 滚动触底
    scrolltolower(e) {
      this.moreText = "没有更多了";
    },
    // 切换附近、历史门店tab
    changeCurrentType(type) {
      this.V_setStationType(type);
    },
    // 去门店首页
    clickShopItem(shopConfigId) {
      if (this.back) {
        // this.V_setShopIndexShopConfigId(shopConfigId);
        uni.navigateBack({
          shopConfigId: shopConfigId,
          // url: "/shopPages/shop/index?shopConfigId=" + shopConfigId,
          success: () => {
            let page = getCurrentPages().pop(); //跳转页面成功之后
            if (!page) {
              return;
            } else {
              uni.setStorageSync("shopIndexShopConfigId", shopConfigId);
              page.onLoad({ shopConfigId: shopConfigId, isBack: true }); // page自带options对象.
            }
          },
        });
      } else {
        uni.navigateTo({
          url: "/shopPages/shop/index?shopConfigId=" + shopConfigId,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.around-out {
  background: #fff;
  padding-bottom: 24rpx;
  .top {
    height: 84rpx;
    color: #999;
    padding: 24rpx 32rpx;
    border-bottom: 2rpx solid #f4f4f4;
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    display: flex;
    .top-current {
      flex: 1;
      text-align: center;
      height: 36rpx;
    }
    .top-current-active {
      flex: 1;
      text-align: center;
      height: 36rpx;
      color: #333;
    }
    .top-border {
      width: 2rpx;
      height: 84rpx;
      background: #f1f1f1;
      transform: translate(0, -24rpx);
    }
    .top-history {
      flex: 1;
      text-align: center;
      height: 36rpx;
    }
    .top-history-active {
      flex: 1;
      text-align: center;
      height: 36rpx;
      color: #333;
    }
  }
  .around-item {
    padding: 25rpx;
    border-bottom: 2rpx solid #f4f4f4;
  }
  .bot {
    height: 96rpx;
    text-align: center;
    color: #999;
    line-height: 96rpx;
  }
}
</style>
