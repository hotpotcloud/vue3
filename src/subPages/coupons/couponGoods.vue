<template>
  <view class="container">
    <view v-if="list.length > 0">
      <view class="goods-cell">
        <view
          class="goods-cell-box"
          v-for="(goodsInfo, index) in list"
          :key="index"
        >
          <!-- <view>{{ index }}</view> -->
          <h-goodsCell
            :goodsInfo="goodsInfo"
            @goGoodsDetail="goDetail"
          ></h-goodsCell>
        </view>
      </view>
    </view>
    <view class="none-data" v-else>
      <view class="no-data">
        <image
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png"
          mode=""
        ></image>
      </view>
      <view class="no-text">暂无数据</view>
    </view>
    <view>
      <!-- https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E6%97%A0%E5%95%86%E5%93%81%EF%BC%8F%E6%95%B0%E6%8D%AE%402x.png -->
    </view>
  </view>
</template>
<script>
import { coupons } from "@/utils/url";
import { couponActivityType } from "@/utils/enum";
export default {
  data() {
    return {
      couponActivityType,
      code: null,
      list: [],
      page: 1,
      total: 0,
    };
  },
  onLoad(option) {
    console.log(option.code, "优惠券编号");
    this.code = option.code;
    this.getList(option.code);
  },
  // 下拉触底
  onReachBottom() {
    console.log("触底了");
    if (this.list.length < this.total) {
      this.page = this.page + 1;
      this.getList(this.code);
    }
  },
  methods: {
    // 获取列表
    async getList(code) {
      try {
        const para = {
          activitycode: code,
          page: this.page,
          size: 10,
        };
        const { data } = await this.POST(
          coupons.couponsGoods,
          para,
          "加载中",
          true
        );
        this.total = data.totalElements;
        this.list = [...this.list, ...data.content];
        console.log(this.list, "商品列表");
      } catch (err) {
        console.log(err);
      }
    },
    goDetail(spuCode) {
      console.log(spuCode, "父组件调用子组件");
      uni.navigateTo({
        // url: `/subPages/product/proDetail?id=${spuCode}&&couponCode=${this.code}`,
        url: `/subPages/product/proDetail?id=${spuCode}`,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  background: #f5f5f5;
  padding: 32rpx;
  width: 100%;
  min-height: 100vh;
}
.goods-cell {
  column-count: 2;
  column-gap: 30rpx;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
}
.goods-cell-box {
  // width: calc(50% - 15rpx);
  box-sizing: border-box;
  border-radius: 24rpx;
  overflow: hidden;
  background-color: #fff;
  break-inside: avoid;
  /*避免在元素内部插入分页符*/
  box-sizing: border-box;
  margin-bottom: 30rpx;
}
.none-data {
  padding-top: 350rpx;
  // background: #fff;

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
