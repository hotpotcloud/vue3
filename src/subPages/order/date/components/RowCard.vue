<template>
  <view class="rowcard-out">
    <view v-if="info.length">
      <view v-for="(item, index) in list" :key="index">
        <h-GoodsMsg
          :img="item.imageUrl"
          :name="item.skuName"
          :num="item.qty"
          :slotTime="true"
          :sending="item.residueQty"
          :sended="item.deliveryQty"
        >
          <view slot="sendTime">
            <view v-for="(el, inx) in item.ruleList" :key="inx">
              <view
                class="marign-bot-16 d-flex d-sb"
                v-if="el.startDate && el.endDate"
              >
                <view class="color-99">配送时间：</view>
                <view class="sub-color">
                  {{ el.startDate.replaceAll("-", ".") }}-{{
                    el.endDate.replaceAll("-", ".")
                  }}
                </view>
              </view>
              <view class="goods-rule marign-bot-16" v-if="el.ruleType">
                <view class="rule-right">
                  <text>{{ el.originalDeliveryItemRuleName }}</text>
                  <text class="rule-center">{{ el.timeSectionName }}送</text>
                  <text>每次送{{ el.everyNum }}{{ item.specsName }}</text>
                </view>
              </view>
            </view>
          </view>
        </h-GoodsMsg>
      </view>
      <view
        v-if="info.length > 1"
        @tap="clickMore"
        class="more-btn d-flex-center"
      >
        <view class="d-flex-center">
          {{ isMoreInfo ? "收起" : "展开更多" }}
          <uni-icons :type="btnType" size="14" color="#999999"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import HGoodsMsg from "@/components/h-GoodsMsg/h-GoodsMsg.vue";

export default {
  props: {
    info: {
      default: [],
      type: Array,
    },
  },
  // components: { HGoodsMsg },
  data() {
    return {
      // 查看更多
      isMoreInfo: false,
    };
  },
  computed: {
    btnType() {
      return this.isMoreInfo ? "top" : "bottom";
    },
    list() {
      if (this.info.length <= 0) return false;

      return this.isMoreInfo ? this.info : [this.info[0]];
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    clickMore() {
      this.isMoreInfo = !this.isMoreInfo;
    },
  },
};
</script>
<style scope lang='scss'>
.rowcard-out {
  border-radius: 40rpx;
  background: #fff;
  padding: 24rpx 24rpx 32rpx;
}
.marign-bot-16 {
  margin-bottom: 16rpx;
}
.goods-rule {
  color: #666666;
  .rule-right {
    margin-left: 32rpx;
    text-align: right;
  }
  .rule-center {
    padding: 0 8rpx;
    margin: 0 8rpx;
    border-left: 2rpx solid #666666;
    border-right: 2rpx solid #666666;
  }
}
.more-btn {
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #999999;
  justify-content: center;
}
</style>