/* 商品信息 */
<template>
  <view class="goods_item_out">
    <view class="d-flex-center d-sb">
      <view class="d-flex-center flex-1">
        <text class="font-26-33">{{ platform }}</text>
        <text class="top-border">|</text>
        <text class="sub-color">{{ company }}</text>
      </view>
      <view :class="['other-color', item.pause ? 'pause' : item.status]">{{
        status
      }}</view>
    </view>
    <view class="item_goods">
      <view class="mb32" @tap="onDetail">
        <h-GoodsMsg
          :img="obj.goodsImgUrl"
          :name="obj.goodsName || '缺名字'"
          :price="obj.unitPrice"
          :desc="obj.goodsConf ? obj.goodsConf : ''"
          :num="obj.qty"
        />
        <view class="tips-item" v-if="isBack">该订单存在以下配送计划</view>
      </view>
      <view v-for="i in rules" :key="i.planCode" class="goods-item-plan">
        <goodsItemPlan
          @onRecover="onRecover"
          :isBack="isBack"
          :planDay="i.deliveryTimeSectionName"
          :planOnce="i.everyNum"
          :planName="i.ruleName"
          :detail="i"
        />
      </view>
      <!-- 查看更多区域 -->
      <view
        class="bottom-bar d-flex-center d-sb"
        :class="[(isMore || rules.length < 4) && 'justify-end']"
      >
        <view @tap.stop="onMore" v-if="!isMore && rules.length > 3">
          <text class="text-more">更多计划</text>
          <uni-icons type="bottom" />
        </view>
        <button class="date-btn" @tap.stop="onCalendar">配送日历</button>
      </view>
    </view>
  </view>
</template>

<script>
import goodsItemPlan from "./goodsItem-plan.vue";
export default {
  props: {
    // tab选中状态
    // 是否显示去恢复
    isBack: {
      type: Boolean,
      default: false,
    },
    // 平台名
    platform: {
      type: String,
      default: "平台名",
    },
    // 公司名
    company: {
      type: String,
      default: "公司名",
    },
    // 状态
    status: {
      type: String,
      default: "状态",
    },
    imgUrl: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "商品名",
    },
    price: {
      //商品价
      type: String | Number,
      default: 10,
    },
    size: {
      //规格
      type: String,
      default: "规格",
    },
    num: {
      //数量
      type: String | Number,
      default: 10,
    },
    // 主数据
    obj: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Array,
      default: () => [],
    },
    item: {
      //item数据
      default: () => {},
      type: Object,
    },
  },
  components: { goodsItemPlan },
  data() {
    return {
      isMore: false,
      list: [1, 2, 3, 4],
    };
  },
  computed: {
    goodsList() {
      if (this.isMore) {
        return this.list;
      } else {
        return this.list.slice(0, 3);
      }
    },
    // // 计算配送详情
    // calcDetail() {
    //   return (detail) => {
    //     return {
    //       totalQty: detail.totalQty, //应配
    //       residueQty: detail.residueQty, //待配
    //       deliveryQty: detail.deliveryQty, //已配
    //       suspendQty: detail.suspendQty, //暂停
    //     };
    //   };
    // },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    /* 查看更多 */
    onMore() {
      this.isMore = true;
    },
    /* 去恢复 */
    onRecover(obj) {
      this.$emit("onRecover", obj);
    },
    /* 配送日历 */
    onCalendar() {
      this.$emit("onCalendar", this.item);
    },
    onDetail(e) {
      this.$emit("onDetail", this.item);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
button {
  padding: 0;
  margin: 0;
}
.goods_item_out {
  background: #fff;
  padding: 24rpx;
  border-radius: 24rpx;
}
.other-color {
  color: #999999;
}
.pause {
  color: #f86c4d;
}
.WAIT_DELIVERY,
.DELIVERING {
  color: #1d9bdc;
}
.WAIT_PAYMENT,
.REFUNDED {
  color: #f86c4d;
}
.margin-rl {
  margin: 0 16rpx;
}
.mb32 {
  margin-bottom: 32rpx;
}
.top-border {
  color: #c7c7c7;
  margin: 0 16rpx;
}
.item_goods {
  margin-top: 24rpx;
  .tips-item {
    margin: 16rpx 0;
    font-size: 24rpx;
    color: #db9918;
  }
  .goods-item-plan {
    margin-bottom: 16rpx;
  }
  .bottom-bar {
    padding-top: 8rpx;
    .text-more {
      color: #666666;
      margin-right: 16rpx;
    }
    .date-btn {
      font-size: 26rpx;
      background: #ffffff;
      color: #1d9bdc;
      height: 60rpx;
      line-height: 60rpx;
      padding: 0 24rpx;
      border-radius: 76rpx 76rpx 76rpx 76rpx;
      border: 1rpx solid #1d9bdc;
    }
  }
  .justify-end {
    justify-content: flex-end;
  }
}
</style>


