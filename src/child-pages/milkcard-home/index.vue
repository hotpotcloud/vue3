<template>
  <!-- 奶卡主题 -->
  <view class="milk-out" :style="{ overflow: showGet ? 'hidden' : '' }">
    <!-- 弹窗 -->
    <Modal :show="showModal">
      <view slot="main" class="main-mk">
        <!-- 领取优惠券弹窗 -->
        <view v-if="showGet" class="ticket-get">
          <view class="ticket-main">
            <view class="ticket-main-item">
              <view class="item-top">恭喜获得惊喜福利</view>
              <view class="item-main">
                <Ticket v-for="i in ticketList" :key="i.couponCode" :info="i" />
              </view>
            </view>
            <view class="get-once-btn" @tap.stop="onOnceGet">
              <!-- 一键领取 -->
            </view>
          </view>
          <img
            @tap.stop="closeModal"
            :src="getAssetImgUrl('mk-close-icon.png')"
            alt=""
            class="close-icon"
          />
        </view>
        <!-- 领取成功弹窗 -->
        <view v-if="showRes" class="ticket-succ">
          <view class="succ-main">
            <view class="tip-modal">领取成功</view>
            <view class="tip-text">已存至小程序'我的'-'我的券包'</view>
            <view class="tip-btn" @tap.stop="closeModal">我知道了</view>
            <img
              :src="getAssetImgUrl('mk-light-bg.png')"
              alt=""
              class="light-bg"
            />
            <img
              :src="getAssetImgUrl('mk-start-bg.png')"
              alt=""
              class="light-start-bg"
            />
            <img
              :src="getAssetImgUrl('mk-check-ok-icon.png')"
              alt=""
              class="light-ok-icon"
            />
          </view>
        </view>
      </view>
    </Modal>
    <!-- 奶卡主题 -->
    <view class="card-top-name">挑选一个卡面</view>
    <view class="d-flex-warp d-sb card-main">
      <view
        class="them-card"
        v-for="(item, index) in cardTheme"
        :key="index"
        @tap="onClickCard(item)"
      >
        <img :src="getAssetImgUrl(item.imgUrl)" class="them-img" />
        <view class="them-card-name h-over-1">{{ item.cardTitle }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Modal from "../components/modal/index.vue";
import Ticket from "./ticket.vue";
import api from "@/utils/api";
import { milkCard } from "@/utils/url";
export default {
  components: {
    Modal,
    Ticket,
  },
  data() {
    return {
      // showModal: true, //优惠弹窗
      showGet: false, //领取优惠券
      showRes: false, //优惠券领取成功
      page: 1,
      ticketList: [],
    };
  },
  onShow() {
    this.getMilkCoupon();
  },
  onLoad(options) {
    console.log("options---分享进入", options);
    if (options?.distId) {
      this.v_setDistId(options.distId);
    }
    this.init();
  },
  // onReachBottom() {
  //   console.log("触底了");
  //   const size = Math.ceil(this.total / 10);
  //   console.log("size", size);
  //   if (size > 0) {
  //     console.log("this.page", this.page);
  //     this.page < size && this.post_CardTheme({page:++this.page});
  //   }
  // },
  computed: {
    ...mapState("milkcard", ["cardTheme", "total"]),
    showModal() {
      return this.showGet || this.showRes;
    },
  },
  onShareAppMessage() {
    const xy = uni.getStorageSync("xiaoyouInfo");
    const url = xy?.id
      ? `/child-pages/milkcard-home/index?distId=${xy.id}`
      : `/child-pages/milkcard-home/index?distId=null`;
    return {
      title: this.cardTheme[0].cardTitle,
      path: `/child-pages/milkcard-home/index?distId=${xy.id}`,
      imageUrl:
        this.cardTheme[0].shareImgUrl || this.getAssetImgUrl(this.cardInfo.url),
    };
  },

  methods: {
    ...mapActions("milkcard", ["post_CardTheme"]),
    ...mapMutations("milkcard", ["set_CurrentCardTheme"]),
    ...mapMutations("xiaoyou", ["v_setDistId"]),
    init() {
      this.post_CardTheme({ page: 1 });
    },
    // 优惠券弹窗
    async getMilkCoupon() {
      try {
        const msg = uni.getStorageSync("malltoken");
        if (!msg) return;
        const { data } = await api.$get(milkCard.milkCoupon);
        console.log("data", data);
        if (data.length) {
          this.showGet = true;
        }
        this.ticketList = data;
      } catch (error) {
        //
      }
    },

    // 一键领取
    async onOnceGet() {
      try {
        this.showGet = false;
        this.showRes = true;
        await api.$get(milkCard.grantMilkCoupon);
      } catch (error) {
        //
      }
    },
    // 我知道了
    closeModal() {
      this.showRes = false;
      this.showGet = false;
    },
    onClickCard(val) {
      console.log("val点击", val);
      uni.navigateTo({
        url: "/child-pages/card/index",
        success: () => {
          this.set_CurrentCardTheme(val);
        },
        // url: "/child-pages/goods-confirm/index",
        // url: "/child-pages/card-map/index",
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.milk-out {
  width: 100%;
  min-height: 100vh;
  // overflow: auto;
  background: #f5f5f5;
  padding: 24rpx 32rpx 62rpx;
  // overflow: scroll;
  color: #333333;
}
.card-main {
  padding-bottom: 68rpx;
}
.card-top-name {
  margin-bottom: 16rpx;
}
.them-card {
  width: calc(50% - 8rpx);
  margin-bottom: 16rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  border-radius: 24rpx;
  overflow: hidden;
  .them-img {
    height: 190rpx;
    width: 100%;
    background: #ffffff;
    border-radius: 0;
  }
  .them-card-name {
    line-height: 56rpx;
    text-align: center;
    font-size: 26rpx;
    padding: 0 16rpx;
  }
}
//优惠券领取成功
.ticket-succ {
  width: 100vw;
  padding: 0 108rpx;
  .succ-main {
    height: 356rpx;
    padding: 32rpx 0 64rpx;
    background: #ffffff;
    border-radius: 40rpx;
    text-align: center;
    position: relative;
    .tip-modal {
      font-size: 40rpx;
      font-weight: bold;
      margin: 52rpx auto 32rpx;
    }
    .tip-text {
      font-size: 28rpx;
      color: #999999;
      margin-bottom: 32rpx;
    }
    .tip-btn {
      background: #1d9bdc;
      margin: 0 64rpx;
      color: #ffffff;
      padding: 18rpx 0;
      font-weight: bold;
      font-size: 32rpx;
      border-radius: 254rpx;
    }
    .light-bg {
      // border: 1rpx solid #1d9bdc;
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translate(-50%);
      z-index: -1;
    }
    .light-start-bg {
      @extend .light-bg;
      z-index: 2;
      width: 214rpx;
      height: 108rpx;
      top: -54rpx;
      // top: -50%;
      // transform: translate(-50%, 125%);
    }
    .light-ok-icon {
      @extend .light-bg;
      width: 128rpx;
      height: 128rpx;
      top: -64rpx;
      z-index: 3;
    }
  }
}
//优惠券领取
.ticket-get {
  // border: 1rpx solid #1d9bdc;
  width: 100vw;
  height: 974rpx;
  background-image: url(https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/mk-coupon-bguang.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  // padding: 0 92rpx;
  .ticket-main {
    // background: #1d9bdc;
    height: 812rpx;
    height: 100%;
    background-image: url(https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/mk-coupon-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  .ticket-main-item {
    background: #f0faff;
    position: absolute;
    width: 508rpx;
    height: 500rpx;
    top: 174rpx;
    left: 50%;
    transform: translateX(-50%);
    .item-top {
      font-size: 36rpx;
      font-weight: bold;
      text-align: center;
    }
    .item-main {
      // background: #d9d9d9;
      height: 100%;
      overflow: auto;
      padding: 20rpx 16rpx 40rpx;
    }
  }
  .get-once-btn {
    background-image: url(https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/mk-get-onece-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 240rpx;
    width: 594rpx;
    position: absolute;
    // left: 95rpx;
    left: 50%;
    transform: translateX(-50%);
    bottom: 130rpx;
  }
  .close-icon {
    width: 64rpx;
    height: 64rpx;
    position: absolute;
    left: 50%;
    bottom: 24rpx;
    transform: translateX(-50%);
  }
}
</style>