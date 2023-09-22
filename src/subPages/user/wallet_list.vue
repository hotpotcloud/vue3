<template>
  <view class="bill">
    <view class="top-nav" :style="{ paddingTop: menuButtonInfo.top + 'px' }">
      <!-- 自定义导航标题 -->
      <view class="top-title" :style="{ height: menuButtonInfo.height + 'px' }">
        <text class="back-icon" @tap="onBackBtn"></text>
        <text>我的账单</text>
      </view>

      <!-- 内容部分 -->
      <!-- paddingTop:'36rpx' -->
      <view
        class="main d-flex-colum"
        :style="{
          top: mainHeight + 'px',
          height: heig,
        }"
      >
        <view class="main-top d-flex-colum-center">
          <view class="main-top-title">待还金额</view>
          <view v-if="receiptAll && receiptAll.waitPayAmount">
            <text class="money-icon">￥</text>
            <text class="money-null">{{
              noformatAmount(receiptAll.waitPayAmount)
            }}</text>
          </view>
          <view v-else class="money-null"> 暂无还款 </view>
          <view class="history-bill" @tap="toHistory"
            >历史账单
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/Frame%2050%402x%20%281%29.png"
              mode="widthFix"
              class="arrow-right"
            />
          </view>
        </view>

        <!-- 账单列表 -->
        <view class="flex-1 d-flex-colum">
          <view class="card-tips">待还账单</view>
          <view v-if="receiptList.length" class="card-data">
            <view
              class="main-card"
              v-for="(el, index) in receiptList"
              :key="index"
            >
              <Card
                @toDetail="toDetail(el)"
                @onPayNow="onPayNow(el)"
                :info="el"
              />
            </view>
          </view>
          <view v-else class="flex-1">
            <EmptyData text="暂无还款账单" />
          </view>
        </view>
      </view>
    </view>
    <!-- <view
      class="one-btn-pay"
      @tap="onPayBtn(receiptAll)"
      v-if="receiptList.length"
    >
      <image
        :src="getTXimgUrl('commonSource/wallet-money-icon.png')"
        mode="widthFix"
        class="money-icon"
      />
      一键还款</view
    > -->
  </view>
</template>

<script>
import { getTXimgUrl } from "@/utils/utils";
import Card from "./components/card.vue";
import EmptyData from "./components/Empty-Data.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Card,
    EmptyData,
  },
  data() {
    return {
      menuButtonInfo: {}, //自定义高度信息
      money: 990,
    };
  },
  onLoad(options) {
    // this.getSystemHeight();
    this.get_receiptList();
  },
  computed: {
    ...mapState("user", ["receiptList", "receiptAll"]),
    // 内容区域定位偏移高度
    mainHeight() {
      this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      return (
        this.menuButtonInfo.height + this.menuButtonInfo.top + uni.upx2px(36)
      );
    },
    // 内容区域高度
    heig() {
      return `calc(100vh - ${this.mainHeight}px)`;
    },
  },
  methods: {
    ...mapActions("user", [
      "get_receiptList",
      "get_HistoryReceiptList",
      "get_receiptDetail",
      "post_payWallet",
    ]),
    // 跳转详情
    toDetail(el) {
      console.log("2-跳转详情", el);
      // return;
      uni.navigateTo({
        url: "/subPages/user/wallet_detail?receiptNo=" + el.receiptNo,
        // success: () => {
        //   this.get_receiptDetail(el.receiptNo);
        // },
      });
    },

    // 立即还款
    onPayNow(el) {
      console.log("立即还款", el);
      this.post_payWallet(el.receiptNo);
    },

    // 一键还款
    onPayBtn(val) {
      console.log("一键还款", val);
      this.post_payWallet(val.receiptNo);
    },

    // 历史账单
    toHistory() {
      console.log("历史账单", 1);
      uni.navigateTo({
        url: "/subPages/user/history",
        success: () => {
          this.get_HistoryReceiptList();
        },
      });
    },

    // 返回上一页
    onBackBtn() {
      uni.navigateBack(-1);
    },
    //系统高度获取
    getSystemHeight() {
      //胶囊信息获取
      this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    },
    // 获取图片地址
    getTXimgUrl,
  },
};
</script>

<style lang="scss" scoped>
.bill {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.top-nav {
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/wallet-bg.png");
  background-size: 100% 100%;
  height: 344rpx;
  position: relative;
}
.top-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #ffffff;
  // background: #f00;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .back-icon {
    width: 24rpx;
    height: 24rpx;
    border-top: 5rpx solid #fff;
    border-left: 5rpx solid #fff;
    border-top-left-radius: 4rpx;
    transform: rotate(-45deg);
    position: absolute;
    left: 24rpx;
  }
}
.main {
  position: absolute;
  width: calc(100% - 64rpx);
  transform: translateX(32rpx);
  // background: #f0f;
  overflow: auto;
}
.card-tips {
  font-size: 28rpx;
  color: #000;
  font-weight: bold;
  margin-bottom: 16rpx;
}
.main-top {
  height: 226rpx;
  width: 100%;
  background: #fff;
  margin-bottom: 38rpx;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  position: relative;
  padding: 48rpx 0 68rpx;
  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 30rpx solid transparent; /* half of width */
    border-right: 30rpx solid transparent; /* half of width */
    border-top: 16rpx solid #fff; /* height */
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
  }
}
.main-top-title {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
  margin-bottom: 8rpx;
}
.money-icon {
  font-weight: bold;
  color: #333333;
  font-size: 40rpx;
}
.money-null {
  font-size: 56rpx;
  color: #333333;
  font-weight: bold;
}
.history-bill {
  position: absolute;
  height: 56rpx;
  right: 0;
  top: 48rpx;
  font-size: 28rpx;
  color: #ffffff;
  background: #71c5ff;
  padding: 8rpx 0rpx 8rpx 24rpx;
  border-top-left-radius: 56rpx;
  border-bottom-left-radius: 56rpx;
  display: flex;
  align-items: center;
  .arrow-right {
    width: 48rpx;
    height: 48rpx;
  }
  // &::after {
  //   content: "";
  //   display: inline-block;
  //   width: 14rpx;
  //   height: 14rpx;
  //   border-top: 4rpx solid #fff;
  //   border-top-right-radius: 6rpx;
  //   border-right: 4rpx solid #fff;
  //   transform: rotate(45deg);
  // }
}
.card-data {
  padding-bottom: 168rpx;
}
.main-card {
  margin-bottom: 16rpx;
}
.one-btn-pay {
  // margin: 68rpx 0;
  background: linear-gradient(288deg, #1693ed 0%, #65d7fb 100%);
  height: 80rpx;
  width: 686rpx;
  border-radius: 40rpx 40rpx 40rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  color: #ffffff;
  font-weight: bold;
  position: fixed;
  bottom: 68rpx;
  transform: translateX(32rpx);
  .money-icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 12rpx;
  }
}
</style>
