/* * 
* @Date: 2022-07-1 09:28:17
*/
<template>
  <view class="car" v-if="shelf !== productStatusEnum.PRODUCT_DELETE">
    <view
      class="notice-bar"
      v-if="showKill && close && killShelf != skillEnum.FINISH && showtop"
    >
      <uni-icons size="18" color="#fff" type="info" />
      <view class="d-flex d-sb flex-1">
        <text class="notice-text" v-if="killShelf === skillEnum.WAIT_START"
          >秒杀未开始，现在可以原价购买</text
        >
        <view v-else-if="killShelf === skillEnum.PROGRESSING">
          <text class="notice-text" v-if="killStock === 0"
            >商品已抢光，现在可以原价购买</text
          >
          <text class="notice-text" v-else-if="!killLimit"
            >您已达到抢购上限，现在可以原价购买</text
          >
        </view>

        <uni-icons
          @tap="closeBtn"
          type="closeempty"
          color="#ffffff"
          size="18"
        />
      </view>
    </view>
    <!-- <view v-if="shelf == productStatusEnum.PRODUCT_ON">
      <view
        style="border-top: 2rpx solid #e5e5e5"
        class="collapse"
        v-show="reserve"
      >
        <uni-collapse ref="collapse" @change="opentype">
          <uni-collapse-item :open="false" title-border="none" :border="false">
            <template v-slot:title>
              <text
                class="check-text"
                :class="[showText ? 'check-text-on' : 'check-text-off']"
              >
                {{ text }}
              </text>
            </template>
          </uni-collapse-item>
        </uni-collapse>
      </view>
    </view> -->
    <!-- <view v-else  style="border-top: 2rpx solid #e5e5e5"></view> -->
    <view class="car-warper d-flex-center">
      <view class="d-flex-center">
        <button
          id="serveBtn"
          style="display: hidden"
          open-type="contact"
          hover-class="button-hover"
          @contact="toService"
        ></button>
        <view>
          <label for="serveBtn" class="d-flex-colum-center">
            <image
              :src="
                productinfo.commission.minCommission ? xiaoyouUrl : nomalUrl
              "
              mode="scaleToFill"
            />
            <text class="icon-line-h">客服</text>
          </label>
        </view>

        <view>
          <view
            class="d-flex-colum-center icon-right"
            @tap="toHome"
            v-if="isModal || !detail"
          >
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E4%B8%BB%E9%A1%B52x.png"
              mode="scaleToFill"
            />
            <text class="icon-line-h">首页</text>
          </view>
          <button
            @click="onClickShare"
            class="xiaoyou-text bgred d-flex-center"
            v-else-if="detail && !isModal"
          >
            <image
              style="width: 48rxp; height: 48rpx; min-height: 48rpx"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/004share.png"
              mode="scaleToFill"
            />
            <text class="xiaoyou-money"
              >高达{{ productinfo.commission.maxCommission }}元</text
            >
          </button>
        </view>
      </view>
      <view v-if="shelf === productStatusEnum.PRODUCT_ON">
        <view
          @tap="buys"
          class="d-flex-se uptext"
          :class="[detail ? 'xiaoyou-text' : 'car-text']"
          v-if="reserve"
        >
          <view v-if="killShelf === skillEnum.FINISH">立即购买</view>
          <view v-else-if="killShelf === skillEnum.PROGRESSING">
            <text v-if="killStock != 0 && killLimit">立即秒杀</text>
            <text v-else>原价购买</text>
          </view>
          <view v-else-if="killShelf === skillEnum.WAIT_START">原价购买</view>
          <text v-if="!detail">
            {{ price }}
            <text v-show="maxprice && !showKill">起</text>
          </text>
        </view>
        <view @tap="buy" class="car-text downtext" v-else>
          <text class="downtext">商品已售罄</text>
        </view>
      </view>
      <view
        v-else-if="shelf === productStatusEnum.PRODUCT_OFF"
        class="car-text downtext"
        @tap="buy"
      >
        商品已下架
      </view>
    </view>
  </view>
</template>

<script>
import { productStatusEnum, skillEnum } from "@/utils/enum";
import { mapState } from "vuex";
export default {
  props: {
    isModal: {
      type: Boolean,
      default: true,
    },
    detail: {
      default: false,
      type: Boolean,
    },
    price: {
      type: String,
      default: "",
    },
    maxprice: {
      type: Boolean,
      default: false,
    },
    shelf: {
      type: String,
      default: "PRODUCT_ON",
    },
    killShelf: {
      //秒杀购买类型
      type: String,
      default: skillEnum.FINISH,
    },
    killLimit: {
      //秒杀限购
      type: Boolean,
      default: true,
    },
    killStock: {
      //秒杀库存
      type: Number,
      default: -1,
    },
    showKill: {
      //秒杀组件同步显示
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: " ",
    },
    reserve: {
      type: Boolean,
      // default:
    },
  },
  data() {
    return {
      nomalUrl:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E5%AE%A2%E6%9C%8D2x.png",
      xiaoyouUrl:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/004icon.png",
      showText: false, //折叠显示
      // nowPrice: formatAmount(this.price),

      // 枚举
      productStatusEnum,
      skillEnum,
      close: true, //关闭
    };
  },
  // onShareAppMessage() {
  //   return {
  //     title: "小优天天赚",
  //     path: "pages/homepage/homepage",
  //   };
  // },

  computed: {
    ...mapState("product", ["productinfo"]),
    showtop() {
      if (this.killStock == 0 || !this.killLimit) {
        return true;
      } else if (this.killStock != 0) {
        if (this.killShelf === skillEnum.WAIT_START) {
          return true;
        } else if (this.killShelf === skillEnum.PROGRESSING) {
          return false;
        } else {
          return true;
        }
      } else if (this.killLimit) {
        if (this.killShelf === skillEnum.WAIT_START) return true;
        else if (this.killShelf === skillEnum.PROGRESSING) return false;
        else return true;
      }
    },
  },
  methods: {
    //分享按钮
    onClickShare() {
      this.$emit("onClickShare");
    },
    // 折叠面板
    opentype(e) {
      // console.log("change", e);
      this.showText = !this.showText;
    },
    buys(e) {
      this.$emit("buygoods", e);
    },
    closeBtn() {
      // console.log(" 关闭", 1234);
      this.close = false;
      this.$emit("closeBtn", this.close);
    },
    // 下单
    buy() {
      // this.$emit('buy',)
      // console.log("下单中！");
      if (this.shelf === productStatusEnum.PRODUCT_OFF) {
        uni.showToast({
          title: "该商品已下架",
          icon: "error",
          duration: 3000,
        });
      }
      if (!this.reserve) {
        uni.showToast({
          title: "商品没库存啦！",
          icon: "error",
          duration: 3000,
        });
      }
      // else {
      //   uni.navigateTo({
      //     url: "/subPages/order/orderConfirm",
      //   });
      // }
    },
    change(e) {
      // console.log(e);
    },
    toHome() {
      this.$emit("toHome");
      // uni.switchTab({
      //   url: "/pages/homepage/homepage",
      //   success:()=>{
      //     uni.showTabBar()
      //   }
      // });
      console.log("跳转首页");
    },

    toService() {
      // console.log("跳转客服");
    },
  },
};
</script>

<style scoped lang="scss">
.car {
  // border-top: 2rpx solid $uni-border-subcolor;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding-bottom: 30rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.collapse {
  padding: 16rpx 0;
  padding-left: 40rpx;
  // padding: 26rpx 40rpx;
}
.check-text {
  // padding-top: 28rpx;
  // padding-bottom: 28rpx;
  padding-right: 32rpx;
  color: $uni-color-primary;
  font-size: 26rpx;
}
.check-text-off {
  height: 48rpx;
  line-height: 48rpx;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.check-text-on {
  max-height: 72rpx;
}

.car-warper {
  border-top: 1rpx solid #e5e5e5;
  padding-top: 32rpx;
  padding-bottom: 14rpx;
  // padding-top: 26rpx;
  display: flex;
  image {
    width: 43rpx;
    height: 43rpx;
    margin-bottom: 12rpx;
  }
}
.icon-line-h {
  line-height: 24rpx;
  font-size: 20rpx;
}
.icon-right {
  margin-left: 90rpx;
  margin-right: 45rpx;
}
.car-text {
  width: 460rpx;
  height: 94rpx;
  line-height: 94rpx;
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 500;
  text-align: center;
  border-radius: 230rpx;
}
.xiaoyou-text {
  width: 280rpx;
  height: 80rpx;
  font-size: 32rpx;
  color: #ffffff;
  text-align: center;
  background: #1d9bdc;
  padding: 16rpx 0 20rpx;
  border-radius: 60rpx;
}
.bgred {
  background: #f86c4d;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-left: 40rpx;
  margin-right: 30rpx;
  image {
    margin-right: 2rpx;
    margin: 0 !important;
  }
}
.xiaoyou-money {
  font-size: 26rpx;
  line-height: 30rpx;
  padding-right: 10rpx;
}
.uptext {
  background-color: $uni-bg-btn-suc;
}
.downtext {
  margin-top: 40rpx;
  background-color: #c7c7c7;
  // margin-bottom: 40rpx;
}
.notice-bar {
  width: 100%;
  height: 64rpx;
  padding: 0 32rpx;
  background-color: #6cc3ff;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .notice-text {
    padding-left: 16rpx;
  }
}
</style>
