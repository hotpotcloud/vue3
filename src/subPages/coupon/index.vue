<!--  扫码优惠券 -->
<template>
  <view class="scan-out" :style="{backgroundImage: `url(${currentUrl})`}">
    <!-- 内容部分 -->
    <view class="scan-main">
      <view class="top-tip">{{
        couponInfo.allProducts === 2 ? "部分商品可用" : "所有商品可用"
      }}</view>
      <!-- 金额 -->
      <view class="contents">
        <view class="contents-money">
          <view class="noway">{{
            couponInfo.couponType === 0 || couponInfo.couponType === 2
              ? "无门槛"
              : `满${noformatAmount(couponInfo.condtionAmount)}可用`
          }}</view>
          <view class="money-scan">
            <span :class="reducedFontSize">{{
              noformatAmount(couponInfo.reduced)
            }}</span>
            <text class="yuan">
              {{ couponInfo.couponType < 2 ? "元" : "折" }}</text
            >
          </view>
        </view>
      </view>
      <view class="action-get" @tap.stop="debounceGetMoney"></view>
      <!-- 已存至 -->
      <view class="action-store" v-if="bgurl === 'nowuses.png'"
        >已存至 我的-我的券包</view
      >
    </view>
    <view class="bottom-tip">*本活动最终解释权归{{ BaseApp.company }}所有</view>
    <!-- 有效期 -->
    <view class="time-around" v-if="bgurl === 'nowuses.png'">
      <text v-if="couponInfo.valid === 1"
        >有效期：{{ couponInfo.effectiveTime }}-{{ couponInfo.deadTime }}</text
      >
      <text v-else>有效期：领券后{{ couponInfo.validDays }}天内有效</text>
    </view>
  </view>
</template>

<script>
import {coupons} from "@/utils/url";
import {BaseApp} from "@/const/appIdConf";
import {validType} from "@/utils/enum";
import {mapState} from "vuex";
import {debounce} from "@/utils/utils";
import {handleUse} from "@/utils/commonMethod";
export default {
  data() {
    return {
      validType,
      BaseApp,
      bgurl: "getmoney.png", //nowuses.png-已领取 getmoney.png-未领取
      moneyCode: "", //优惠券code
      couponInfo: {}, //优惠券信息
    };
  },
  async onLoad(options) {
    uni.showLoading({
      title: "加载中",
    });
    await this.$onLaunched;
    console.log("options活动编码", options);
    if (options.code) {
      this.moneyCode = options.code;
      // 获取优惠券信息
      this.getCouponInfo();
    }
    uni.hideLoading();
  },
  computed: {
    ...mapState("user", ["loginStatus"]),
    // 当前图片地址
    currentUrl() {
      return this.getAssetImgUrl(this.bgurl);
    },
    //
    reducedFontSize() {
      // 优惠金额长度
      switch (this.couponInfo.reduced?.length) {
        case 1:
        case 2:
          return "reduced-one";
        case 3:
        case 4:
          return "reduced-two";
        case 5:
        case 6:
          return "reduced-three";
        default:
          return "reduced-four";
      }
    },
  },
  methods: {
    // 领取优惠券
    async onGetMoney() {
      try {
        if (this.bgurl === "getmoney.png") {
          const para = {
            code: this.moneyCode,
            acquireType: 2, //推广链接
          };
          if (!this.loginStatus) {
            uni.showToast({
              title: "请先登录",
              icon: "none",
              duration: 2000,
              success: () => {
                setTimeout(() => {
                  uni.navigateTo({
                    url: "/pages/user/relogin",
                  });
                }, 1500);
              },
            });
            return;
          }
          uni.showLoading({
            mask: true,
          });
          const {data} = await this.POST(coupons.claimCoupon, para);
          this.bgurl = "nowuses.png"; //已领取
          this.couponInfo = {...this.couponInfo, ...data};
          uni.hideLoading();
          uni.showToast({
            title: "领取成功",
            icon: "none",
            duration: 3000,
          });
        } else {
          // 已领取、去使用
          handleUse(this.couponInfo);
          // uni.navigateTo({
          //   url: "/subPages/coupons/couponGoods?code=" + this.moneyCode, //要活动编码
          // });
        }
      } catch (error) {
        //
      }
      // 未领取
      // if (this.bgurl === "getmoney.png") {
      //   try {
      // const para = {
      //   code: this.moneyCode,
      //   acquireType: 2, //推广链接
      // };
      // const { data } = await this.POST(coupons.claimCoupon, para, "加载中");
      // this.bgurl = "nowuses.png"; //已领取
      // this.couponInfo = { ...this.couponInfo, ...data };
      // uni.showToast({
      //   title: "领取成功",
      //   icon: "none",
      //   duration: 5000,
      // });
      //   } catch (error) {
      //     console.log("eeerrr", error);
      //   }
      // } else {
      //   // 已领取、去使用
      //   uni.navigateTo({
      //     url: "/subPages/coupons/couponGoods?code=" + this.moneyCode, //要活动编码
      //   });
      // }
    },
    //防抖节流
    debounceGetMoney() {
      debounce(this.onGetMoney, 1000);
    },

    // 获取优惠券基本信息
    async getCouponInfo() {
      try {
        const {data} = await this.GET(
          coupons.newCouponInfo + `/${this.moneyCode}`,
          {},
          "加载中"
        );
        this.couponInfo = data;
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.scan-out {
  width: 100%;
  min-height: 100vh;
  height: 1448rpx;
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: auto;
  position: relative;
  .time-around {
    position: absolute;
    top: 630rpx;
    // left: 50%;
    width: 750rpx;
    text-align: center;
    // transform: translate(-50%, 0);
    color: #a9a9a9;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
  }
  .scan-main {
    padding-top: 320rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-tip {
      color: #db9918;
      text-align: center;
    }
  }
  .contents {
    display: inline-block;
    margin-top: 26rpx;
    .contents-money {
      position: relative;
      // width: 500rpx;
      .noway {
        display: inline-block;
        background: #f15030;
        border-radius: 20rpx 20rpx 20rpx 0rpx;
        height: 42rpx;
        line-height: 40rpx;
        color: #fff;
        padding: 2rpx 18rpx;
        position: absolute;
        top: 0;
        left: 0;
      }
      .money-scan {
        text-align: center;
        color: #000;
        font-weight: bold;
        line-height: 300rpx;

        .reduced-one {
          font-size: 230rpx;
        }
        .reduced-two {
          font-size: 180rpx;
        }
        .reduced-three {
          font-size: 130rpx;
        }
        .reduced-four {
          font-size: 100rpx;
        }
        .yuan {
          display: inline-block;
          font-weight: normal;
          font-size: 22rpx;
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 40rpx;
          background: #f15030;
        }
      }
    }
  }
  .action-get {
    background: transparent;
    width: 446rpx;
    height: 112rpx;
    margin-top: 40rpx;
  }
  .action-store {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #f1f1f1;
    margin-top: 80rpx;
  }
  .bottom-tip {
    position: absolute;
    bottom: 272rpx;
    color: #ffffff;
    width: 100%;
    text-align: center;
  }
}
</style>
