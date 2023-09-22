<template>
  <view class="goods-infos-out">
    <view class="d-flex-center">
      <img
        class="icon"
        :src="getAssetImgUrl('%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/store.png')"
        alt=""
      />
      <view class="company">{{ company }}</view>
    </view>

    <!-- 商品信息 -->
    <view class="goods-card">
      <view v-for="(item, index) in goodsList" :key="index">
        <!-- 普通商品 -->
        <view
          class="goods-card-cover"
          v-if="item.comb === combGoods.SPU_PRODUCT && !item.present"
        >
          <h-GoodsMsg
            :img="item.goodsImgUrl"
            :present="item.present"
            :name="item.goodsSkuName"
            :desc="item.goodsConf"
            :startTime="item.deliveryStartDate"
            :endTime="item.deliveryEndDate"
            :num="`${item.totalQty}份`"
            :isShowPrice="false"
          />
        </view>
        <!-- 组合商品 -->
        <view
          class="goods-card-cover"
          v-else-if="!item.present && item.comb === combGoods.ITEM_PRODUCT"
        >
          <h-GoodsMsg
            :img="item.goodsImgUrl"
            :present="item.present"
            :comb="item.comb"
            :name="item.goodsSkuName"
            :num="`${item.totalQty}份`"
            :desc="item.goodsConf"
            :isShowPrice="false"
          >
            <view class="combo-tips">该组合包含以下商品</view>
          </h-GoodsMsg>
          <template v-for="(el, idx) in item.combGoodsInfos">
            <h-GoodsMsg
              :key="idx"
              :img="el.imageUrl"
              :name="el.name"
              :desc="el.goodsConf"
              :startTime="el.deliveryStartDate"
              :endTime="el.deliveryEndDate"
              :num="el.totalQty"
              :isShowPrice="false"
            />
          </template>
        </view>
        <!-- 赠品 -->
        <view class="gift-cover-box" v-else-if="item.present">
          <h-GoodsMsg
            :img="item.goodsImgUrl"
            :present="item.present"
            :name="item.goodsName"
            :price="item.unitPrice"
            :desc="item.goodsConf"
            :startTime="item.deliveryStartDate"
            :endTime="item.deliveryEndDate"
            :num="item.qty"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { combGoods, orderStatus } from "@/utils/enum";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    company: {
      type: String,
      default: "新希望华西公司",
    },
    goodsList: {
      type: Array,
      default: [],
    },
  },
  data() {
    // 这里存放数据
    return {
      combGoods,
      orderStatus,
    };
  },
  // 计算属性-缓存 类似于data概念
  computed: {},
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  onLoad(options) {
    console.log(options);
  },
  // 生命周期 - 页面展示（不可以访问DOM元素）
  onShow() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  onReady() {},
  // 方法集合
  methods: {
    goCanlendar(item, combItem) {
      let obj = {};
      obj.channelSkuCode = item.goodsCode;
      obj.itemNo = item.itemNo;
      obj.orderNo = item.orderNo;
      // console.log(item.comb === combGoods.ITEM_PRODUCT, "====>");
      item.comb === combGoods.ITEM_PRODUCT
        ? (obj.skuCode = combItem.skuCode)
        : (obj.skuCode = item.skuCode);
      // console.log(obj, "组件传递参数");
      this.$emit("checkCanlendar", obj);
    },
  },
  // 生命周期 - 监听页面隐藏
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.goods-infos-out {
  width: 100%;
  background: #fff;
  padding: 24rpx 32rpx;
  margin-bottom: 16rpx;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  .icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 4rpx;
    border: none;
  }
  .company {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
  }
  .goods-card {
    margin-top: 24rpx;
  }
}

//goods-card
.combo-tips {
  margin: 16rpx 0;
  border-bottom: 2rpx dashed #f1f1f1;
  font-size: 24rpx;
  color: #db9918;
  padding-bottom: 16rpx;
}
::v-deep.goods-card {
  .goods-card-desc {
    width: 462rpx;
    margin-left: 24rpx;
    .goods-card-price {
      font-size: 30rpx;
      font-weight: bold;
      padding-top: 16rpx;
      display: flex;
      justify-content: space-between;
    }
  }
}
.uni-list-item__container {
  padding: 0;
}
.goods-card-amount {
  color: #f86c4d;
}
.slot-header-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #000;
}
.slot-footer {
  font-size: 26rpx;
  color: #666666;
}
.slot-conf {
  display: inline-block;
  width: 350rpx;
  text-align: left;
}

.goods-card-title,
.comb-info-title {
  font-weight: bold;
  color: #000;
  line-height: 30rpx;
}
.goods-card-cover {
  position: relative;
}

.gift-cover-box {
  position: relative;
}
.goods-card-img {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  border: 1rpx solid #f3f3f3;
}
.goods-comb-tag {
  width: 60rpx;
  height: 30rpx;
  background-color: #1d9bdc;
  border-color: #1d9bdc;
  color: #fff;
  font-size: 22rpx;
  line-height: 30rpx;
  border-radius: 16rpx 0rpx 16rpx 0rpx;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.goods-gift-tag {
  width: 60rpx;
  height: 30rpx;
  background-color: #ffcd5f;
  border-color: #ffcd5f;
  color: #333;
  font-size: 22rpx;
  line-height: 30rpx;
  border-radius: 16rpx 0rpx 16rpx 0rpx;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.pay-btn-detail {
  width: 136rpx;
  height: 60rpx;
  text-align: center;
  line-height: 58rpx;
  background: #fff;
  border-radius: 76rpx;
  border: 2rpx solid #1d9bdc;
  color: #1d9bdc;
  font-size: 26rpx;
}
//右靠
.right {
  text-align: right;
}
</style>