<template>
  <view class="history">
    <view v-if="!historyReceiptList.length" class="empty">
      <EmptyData text="暂无历史账单" />
    </view>
    <view
      v-for="(el, index) in historyReceiptList"
      :key="index"
      class="year-card"
    >
      <view>
        <view class="d-flex-center d-sb year-tip">
          <view class="year-value">{{ el.yearValue }}年</view>
          <view class="total-value"
            >账单总额：￥{{ noformatAmount(el.totalAmount) }}</view
          >
        </view>
        <view
          class="year-detail"
          v-for="(item, inx) in el.historyDTOList"
          :key="inx"
        >
          <history-card @toDetail="toDetail(item)" :info="item" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import EmptyData from "@/components/Empty-Data.vue";
import EmptyData from "./components/Empty-Data.vue";
import { mapState } from "vuex";
import HistoryCard from "./components/history-card.vue";
export default {
  components: {
    HistoryCard,
    EmptyData,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["historyReceiptList"]),
  },
  methods: {
    // 跳转到账单详情
    toDetail(el) {
      uni.navigateTo({
        url: "/subPages/user/wallet_detail?receiptNo=" + el.receiptNo,
      });
      console.log("跳转到账单详情", el);
    },
  },
};
</script>

<style scoped lang="scss">
.history {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  padding: 26rpx 32rpx;
  overflow-y: auto;
}
.empty {
  height: 100%;
}
.year-card {
  margin-bottom: 18rpx;
}
.year-detail {
  margin-top: 12rpx;
}
// .year-tip {
//   // margin-bottom: 12rpx;
// }
.year-value {
  font-size: 30rpx;
  color: #333333;
  font-weight: bold;
}
.total-value {
  font-size: 26rpx;
  color: #666666;
}
</style>
