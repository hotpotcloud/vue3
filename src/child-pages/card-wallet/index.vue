<template>
  <view class="page">
    <u-sticky offset-top="0">
      <Tabs
        :data="tabs"
        :value="searchReq.cardBagType"
        @onChange="onChangeTabs"
      />
    </u-sticky>
    <view class="list" v-if="walletData.list.length > 0">
      <CardItem
        v-for="(item, index) in walletData.list"
        :key="index"
        :data="item"
        @onDetail="onDetail"
        @onCopy="onCopy"
        @onGift="onGift"
        @onRedeem="onRedeem"
      />
    </view>
    <view class="none-data" v-else>
      <view class="no-data">
        <image
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png"
          mode
        />
      </view>
      <view class="no-text">暂无数据</view>
    </view>
  </view>
</template>
<script>
import Tabs from "../components/tabs";
import CardItem from "./card-item.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import api from "@/utils/api";
import { milkCard } from "@/utils/url";

export default {
  components: { Tabs, CardItem },
  data() {
    return {
      tabs: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "可使用",
          count: 0,
        },
        {
          value: 2,
          label: "已赠送",
          count: 0,
        },
        {
          value: 3,
          label: "已兑换",
          count: 0,
        },
      ],
      searchReq: {
        page: 1,
        size: 10,
        cardBagType: 0, // 0-全部；1-可使用；2-已赠送；3-已兑换
      },
      params: null,
    };
  },
  computed: {
    ...mapState("milkcard", ["walletData", "walletStatistics", "cardDetail"]),
  },
  onShow() {
    this.getData();
  },
  onLoad() {},
  onUnload() {
    this.set_CardWalletList({
      list: [],
      total: 0,
    });
  },
  methods: {
    ...mapActions("milkcard", [
      "get_CardWalletList",
      "get_CardWalletStatistics",
      "get_CardExchangeDetail",
      "get_CardDetail",
      "get_CardGift",
    ]),
    ...mapMutations("milkcard", ["set_CardWalletList"]),
    async getData() {
      try {
        uni.showLoading();
        await this.get_CardWalletList(this.searchReq);
        await this.get_CardWalletStatistics();
        this.$set(this.tabs[1], "count", this.walletStatistics.availableCount);
        this.$set(this.tabs[2], "count", this.walletStatistics.givenAwayCount);
        uni.hideLoading({ noConflict: true });
      } catch (err) {
        //
      }
    },
    async onDetail(milkCardNo) {
      // 详情
      try {
        await this.get_CardExchangeDetail(milkCardNo);
        // !!this.cardDetail &&
        uni.navigateTo({
          url: `/child-pages/exchange-detail/index`,
        });
      } catch (error) {
        console.log("error", error);
        //
      }
    },
    async checkStatus(item, flag) {
      try {
        const arr = item.goods.map((el) => {
          return el.milkCardItemNo;
        });
        const para = {
          flag,
          order: item.milkCardNo,
          milkCardItemNo: arr,
        };
        const { msg, success } = await api.$post(
          milkCard.checkMilkCardStatus,
          para
        );
        this.params = para;
        !success &&
          uni.showToast({
            title: msg,
            icon: "none",
          });
        return success;
      } catch (error) {}
    },
    async onGift(item) {
      // 立即赠送
      const isDealing = await this.checkStatus(item, false);
      if (isDealing) {
        uni.navigateTo({
          url: `/child-pages/send-gift-card/index?from=local&id=${item.id}`,
        });
      }
    },
    async onRedeem(item) {
      console.log(1111111);
      try {
        const par = {
          milkCardNo: item.milkCardNo,
          skuChannelCode: item.goods[0].skuChannelCode,
        };
        // return;
        await this.get_CardDetail(par);
        if (this.cardDetail.orderNo) {
          await this.get_CardGift(this.cardDetail.orderNo);
        }
        const isDealing = await this.checkStatus(item, true);
        // 自己兑换
        if (isDealing) {
          uni.navigateTo({
            url:
              "/child-pages/goods-detail/index?status=" +
              item.status +
              `&params=${JSON.stringify(this.params)}`,
          });
        }
      } catch (error) {}
    },
    onChangeTabs(item) {
      this.set_CardWalletList({
        list: [],
        total: 0,
      });
      this.searchReq.cardBagType = item.value;
      this.searchReq.page = 1;
      this.getData();
    },
    onCopy(value) {
      uni.setClipboardData({
        data: value,
        success: () => {
          uni.showToast({
            title: "复制成功",
            icon: "none",
          });
        },
        fail: () => {
          uni.showToast({
            title: "复制失败",
            icon: "none",
          });
        },
      });
    },
  },
  onReachBottom() {
    console.log("更多");
    if (this.walletData.list.length >= this.walletData.total)
      return uni.showToast({
        title: "暂无更多",
        icon: "none",
      });
    this.searchReq.page = this.searchReq.page += 1;
    this.get_CardWalletList(this.searchReq);
  },
};
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  .list {
    padding: 16rpx 32rpx;
  }
}
.none-data {
  padding-top: 350rpx;
  height: calc(100vh - 104rpx);
  .no-data {
    margin: 0 auto;
    width: 294rpx;
    height: 360rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .no-text {
    width: 100%;
    font-weight: 400;
    color: #a9a9a9;
    font-size: 26rpx;
    text-align: center;
    margin-top: 48rpx;
  }
}
</style>
