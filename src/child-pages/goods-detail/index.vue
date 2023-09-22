<template>
  <view>
    <view class="detail-wrap">
      <view class="swiper-view">
        <u-swiper
          :list="[cardDetail.imageUrl]"
          @change="onChangeBanner"
          :autoplay="false"
          indicatorStyle="left: 20px"
          height="375px"
          circular="fasle"
        >
          <view slot="indicator" class="indicator-num">
            <text class="indicator-num__text">
              {{ current }}/{{ [cardDetail.imageUrl].length }}
            </text>
          </view>
        </u-swiper>
        <!-- 分享icon -->
        <view>
          <button
            id="btnId"
            open-type="share"
            hover-class="button-hover"
            style="display: none"
            @tap="onShare"
          ></button>
          <label for="btnId">
            <image
              class="share-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%88%86%E4%BA%AB%402x.png"
              mode="aspectFit"
            />
          </label>
        </view>
      </view>
      <view class="content">
        <view class="goods-name">
          {{ cardDetail.skuName }}
        </view>
        <template slot="content">
          <SelectItems
            title="规格"
            :value="1"
            :data="[
              {
                value: 1,
                text: cardDetail.skuNickName.trim(),
              },
            ]"
            @onChange="onChangeSpecs"
          />
          <view style="margin-top: 20rpx">
            <SelectItems
              title="数量"
              :value="1"
              :data="[
                {
                  value: 1,
                  text: getAmountValue(),
                },
              ]"
              @onChange="onChangeAmount"
            />
          </view>
        </template>
        <ItemWrap title="参数">
          <template slot="content"
            ><text>{{ cardDetail.companyName }}</text></template
          >
        </ItemWrap>
        <view class="goods-detail">
          <view class="goods-detail-title">商品详情</view>
          <view style="width: 100%">
            <rich-text :nodes="textDetail()"></rich-text>
          </view>
        </view>
      </view>
    </view>
    <BottomMenu @onHome="onHome" @onConfirm="onConfirm" />
    <!-- 赠品弹出 -->
    <hPop :show="showGift && cardGift.length" @close="onCloseGift">
      <view class="gift-slot" :style="{height: modalH}">
        <view class="title-gift"> 是否兑换赠品？ </view>
        <view class="gift-pop-main flex-1">
          <view
            class="gift-main-item d-flex"
            v-for="(i, index) in cardGift"
            :key="index"
          >
            <view class="left-view">
              <img :src="getAssetImgUrl(i.imageUrl)" alt="" class="gift-img" />
              <text class="gift-tag-icon">赠品</text>
            </view>
            <view class="d-flex-colum d-sb">
              <view class="gift-name-goods h-overflow-8-2">{{
                i.giftGoodsName
              }}</view>
              <view class="gift-num-goods">数量：{{ i.giftGoodsItems }}</view>
            </view>
          </view>
        </view>
        <view class="d-flex-center d-sb action-btn">
          <view class="cancel-btn" @tap.stop="onCloseGift">取消</view>
          <view class="sure-btn" @tap.stop="onYesGift">确认</view>
        </view>
      </view>
    </hPop>
    <!-- 参数弹框 start -->
    <!-- <ParamsPopup
      :show="showParams"
      :data="[]"
      @onClose="onCloseParamsPopup"
      @onOpen="onOpenParamsPopup"
    /> -->
    <!-- 参数弹框 end -->
  </view>
</template>

<script>
import SelectItems from "../components/select-items/index.vue";
import ItemWrap from "../components/item-wrap/index.vue";
import BottomMenu from "./bottom-menu.vue";
// import ParamsPopup from "./params-popup.vue";
import {mapActions, mapMutations, mapState} from "vuex";
import hPop from "../components/pop/index.vue";
import {MilkCardStatusEnum, CalculateTypeEnum} from "@/utils/enum";
import api from "@/utils/api";
import {milkCard} from "@/utils/url";
export default {
  components: {SelectItems, ItemWrap, BottomMenu, hPop},
  data() {
    return {
      current: 1,
      showGift: false,
      isGift: false, //是否兑换赠品
      params: null,
    };
  },
  computed: {
    ...mapState("milkcard", ["cardDetail", "cardGift", "curMilkNo"]),
    modalH() {
      const {windowHeight} = uni.getSystemInfoSync();
      return windowHeight * 0.62 + "px";
    },
  },
  onLoad(options) {
    console.log("详情参数---》", options);
    this.params = options?.params && JSON.parse(options.params);
    if (options.skuChannelCode) {
      this.get_CardDetail(options.skuChannelCode);
    }
    if (options.milkCardNo) {
      this.set_curMilkNo(options.milkCardNo); //设置当前奶卡号
    }
    if (options.status) {
      console.log("this.cardGift", this.cardGift);
      if (
        options.status == MilkCardStatusEnum.INITIALIZED ||
        options.status == MilkCardStatusEnum.SHARED
      ) {
        this.showGift = true;
      } else {
        this.showGift = false;
      }
    }
    // this.get_CardDetail(options.skuChannelCode);
  },
  methods: {
    ...mapActions("milkcard", ["get_CardDetail", "post_CardExchange"]),
    ...mapMutations("milkcard", [
      "set_CardPlanList",
      "set_ExchangeParams",
      "set_curMilkNo",
      "set_isExchangeGift",
    ]),
    onCloseGift() {
      this.showGift = false;
      this.isGift = false;
      this.set_isExchangeGift(false);
    },
    onYesGift() {
      this.showGift = false;
      this.isGift = true;
      this.set_isExchangeGift(true);
      this.onConfirm();
    },
    getAmountValue() {
      // return `${this.cardDetail.milkAmount}${this.cardDetail.specs}`;
      return `${this.cardDetail.milkAmount}份`;
    },
    textDetail() {
      return this.richText(this.cardDetail.detailContent);
    },
    richText(richTextData) {
      if (richTextData) {
        var richtext = richTextData;
        const regex = new RegExp("<img", "gi");
        const regex2 = new RegExp('src="/api', "gi");
        const regex3 = new RegExp("style=", "gi");
        richtext = richtext.replace(regex3, "");
        richtext = richtext.replace(regex2, `src="${this.$ServerBaseUrl}/api`);
        richtext = richtext.replace(
          regex,
          `<img style="width:100vw;display:block;height:auto;"`
        );
        return richtext;
        // 解析富文本
        // if (richTextData) {
        //   var richtext = richTextData;
        //   // const regex = new RegExp("<img", "gi");
        //   // const regex2 = new RegExp('src="/api', "gi");
        //   // const regex3 = new RegExp('style=""', "gi");
        //   // richtext = richtext.replace(regex2, `src="${this.$ServerBaseUrl}/api`);
        //   // richtext = richtext.replace(
        //   //   regex,
        //   //   `<img style="width:100%;display:block;height:auto;"`
        //   // );
        //   // richtext = richtext.replace(regex3, "");
        //   // return richtext;
      } else {
        return "";
      }
    },
    // onCloseParamsPopup() {
    //   console.log("关闭");
    //   this.showParams = false;
    // },
    // onOpenParamsPopup() {
    //   console.log("关闭");
    //   this.showParams = false;
    // },
    onChangeBanner() {
      // banner 改变时
    },
    onChangeSpecs(item) {
      console.log(item);
      // this.specs = item.value;
    },
    onChangeAmount(item) {
      console.log(item);
      // this.amount = item.value;
    },
    // getMoreParams() {
    //   this.showParams = true;
    // },
    onShare() {
      console.log("分享");
    },
    onHome() {
      uni.switchTab({url: "/pages/homepage/homepage"});
    },
    async checkStatus() {
      try {
        const {msg, success} = await api.$post(
          milkCard.checkMilkCardStatus,
          this.params
        );
        !success &&
          uni.showToast({
            title: msg,
            icon: "none",
          });
        return success;
      } catch (error) {
        //
        console.log("error2222", error);
        return false;
      }
    },
    async onConfirm() {
      console.log("1", this.params);

      try {
        // 配送计划
        const checked = await this.checkStatus();
        if (!checked) return;
        // 判断是否可以配送
        this.set_CardPlanList({
          qty: this.cardDetail.milkAmount,
          // unit: this.cardDetail.specs,
          unit: "份",
        });
        // 请求参数缓存
        this.set_ExchangeParams({
          goodsCode: this.cardDetail.channelSkuCode,
          goodsQty: this.cardDetail.milkAmount,
          unitPrice: this.cardDetail.milkPrice,
          calculateType: CalculateTypeEnum.MILK_CARD_EXCHANGE,
        });
        // const par = this.params;
        uni.navigateTo({
          url: `/child-pages/goods-confirm/index?params=${JSON.stringify(
            this.params
          )}`,
          success: async () => {
            //配送计划接口
            await this.post_CardExchange({
              milkCardNo: this.curMilkNo,
              gift: this.isGift,
            });
          },
          fail: (err) => {
            console.log("err", err);
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.detail-wrap {
  height: calc(100vh - 170rpx);
  width: 100%;
  overflow-y: auto;
}
.swiper-view {
  position: relative;
  .share-icon {
    position: absolute;
    bottom: 24rpx;
    right: 40rpx;
    width: 64rpx;
    height: 64rpx;
  }
}
.indicator-num {
  padding: 2px 0;
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;
  &__text {
    color: #666666;
    font-size: 12px;
  }
}
.content {
  width: 100%;
  height: auto;
  padding: 0 32rpx 0 32rpx;
}
.goods-name {
  font-size: 30rpx;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: #000;
  line-height: 35rpx;
  padding: 16rpx 0 24rpx 0;
  border-bottom: 2rpx solid #f4f4f4;
  margin-bottom: 16rpx;
}
.goods-detail {
  margin: 24rpx 0 16rpx 0;
  .goods-detail-title {
    font-size: 24rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 28rpx;
    margin-bottom: 16rpx;
  }
}

.popup-tag-title {
  text-align: center;
  margin-top: 24rpx;
  font-size: 34rpx;
  font-weight: 500;
  color: #000;
  padding-bottom: 26rpx;
}
.property-css:last-child {
  margin-bottom: 96rpx;
}
.property-css {
  padding: 0 40rpx;
  margin-bottom: 16rpx;
  .property-val {
    margin-left: 22rpx;
    flex: 1;
  }
}

.btnback {
  border-radius: 254rpx;
  width: 670rpx;
  height: 104rpx;
  line-height: 104rpx;
  color: #ffffff;
  font-size: 34rpx;
  font-weight: bold;
  background: #1d9bdc;
  margin-top: 32rpx;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  margin-bottom: 48rpx;
}
.gift-slot {
  padding: 42rpx 0rpx;
  display: flex;
  flex-direction: column;
  .title-gift {
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    margin-bottom: 24rpx;
  }
  .gift-pop-main {
    overflow: auto;
    padding: 0 48rpx;
    .gift-main-item {
      padding-bottom: 18rpx;
      border-bottom: 2rpx solid #f1f1f1;
      margin-top: 24rpx;
      .gift-img {
        width: 148rpx;
        height: 148rpx;
        // border: 1rpx solid #f3f3f3;
        // border-radius: 24rpx 24rpx 24rpx 24rpx;
        // margin-right: 16rpx;
      }
      &:last-child {
        border: none;
      }
    }
    .left-view {
      position: relative;
      border: 1rpx solid #f3f3f3;
      border-radius: 24rpx 24rpx 24rpx 24rpx;
      margin-right: 16rpx;
      .gift-tag-icon {
        background: #ffcd5f;
        width: 60rpx;
        height: 30rpx;
        color: #000000;
        font-size: 22rpx;
        border-radius: 16rpx 0rpx 16rpx 0rpx;
        text-align: center;
        line-height: 30rpx;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .gift-name-goods {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
    }
    .gift-num-goods {
      color: #666666;

      font-size: 26rpx;
    }
  }
  .action-btn {
    border-top: 2rpx solid #f1f1f1;
    width: 100%;
    padding: 16rpx 40rpx 0;
    .cancel-btn,
    .sure-btn {
      flex: 1;
      text-align: center;
      height: 80rpx;
      vertical-align: middle;
      font-size: 32rpx;
      font-weight: bold;
      border-radius: 254rpx;
      line-height: 80rpx;
    }
    .cancel-btn {
      border: 2rpx solid #1d9bdc;
      color: #1d9bdc;
      background: #ffffff;
      margin-right: 13rpx;
    }
    .sure-btn {
      color: #ffffff;
      background: #1d9bdc;
      margin-left: 13rpx;
    }
  }
}
</style>
