<template>
  <!-- v-if="startGoods.length"-->
  <view class="start-out" v-if="startGoods.length">
    <!-- 明星商品 -->
    <uni-swiper-dot
      mode="round"
      :info="startGoods"
      :dotsStyles="dotSty"
      :current="currentDot"
    >
      <swiper
        circular
        @change="changeSw"
        class="sw-out"
        previous-margin="-2rpx"
        next-margin="-2rpx"
      >
        <!-- v-for="(el, index) in startGoods" -->

        <swiper-item
          v-for="(el, index) in startGoods"
          :key="index"
          class="sw-item"
        >
          <view class="sw-item-son">
            <view class="d-flex-center sw-img-icon">
              <u-icon name="star-fill" color="#F86C4D" size="16"></u-icon
              >明星商品
            </view>
            <view class="sw-item-img">
              <image
                :src="el.pictureUrl"
                mode="scaleToFill"
                @tap.stop="toNav(el)"
              />
            </view>
            <view
              class="sw-item-text"
              :class="[iosFont ? 'font-ios' : 'font-android']"
            >
              <view
                class="h-over-1 font-26-w"
                :class="[iosFont ? 'font-ios' : 'font-android']"
                >{{ el.spuName }}</view
              >
              <view class="d-flex-center d-sb sw-item-text--two">
                <view
                  class="sw-price"
                  :class="[iosFont ? 'font-ios' : 'font-android']"
                >
                  <text>{{ el.minPrice | formatAmount }}</text>
                  <text v-show="el.maxPrice != el.minPrice"
                    >~{{ el.maxPrice | formatAmount }}</text
                  >
                </view>
                <view
                  :class="['btn-buy', iosFont ? 'font-ios' : 'font-android']"
                  @tap.stop="toDetail(el)"
                  >立即购买</view
                >
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script>
import { clickNav } from "@/utils/utils";
import { urltypeEnum } from "@/utils/enum";
// import api from "@/utils/api";
import { mapState } from "vuex";

export default {
  name: "h-start",
  props: {
    val: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      currentDot: "0",
      dotSty: {
        //指示器样式OBJ
        backgroundColor: "rgba(139, 208, 255, 1)",
        border: "1rpx rgba(139, 208, 255, 1) solid",
        selectedBackgroundColor: "rgba(29, 155, 220, 1)",
        selectedBorder: "1rpx rgba(29, 155, 220, 1) solid",
        bottom: 12,
      },
      infoList: [],
    };
  },
  created() {
    console.log(
      "this.startGoods++++++++++++++++++++++++++++++++",
      this.startGoods
    );
  },

  computed: {
    ...mapState("css", ["iosFont"]),
    ...mapState("home", ["startGoods"]),
  },
  methods: {
    // 滑动轮播
    changeSw(e) {
      this.currentDot = e.detail.current;
    },
    // 购买跳详情
    toDetail(id) {
      console.log("购买跳转详情");
      if (id.urlType === urltypeEnum.zero) {
        uni.navigateTo({
          url: `/subPages/product/proDetail?id=${id.spuCode}`,
        });
      }
    },
    //点击图片跳转
    toNav(val) {
      console.log("val", val);
      clickNav(val);
    },
  },
};
</script>

<style scoped lang="scss">
.start-out {
  padding: 0 32rpx;
  .sw-out {
    min-height: 528rpx;
    width: 100%;
    border-radius: 24rpx;
    overflow: hidden;
  }

  .sw-item {
    .sw-item-son {
      width: 100%;
      height: 100%;
      border-radius: 24rpx;
      background: #fff;

      // overflow: hidden;
      .sw-item-img {
        height: 336rpx;
        width: 100%;
        overflow: hidden;
        position: relative;
        border-top-left-radius: 24rpx;
        border-top-right-radius: 24rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .sw-img-icon {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        width: 184rpx;
        height: 56rpx;
        line-height: 56rpx;
        background: #ffcd5f;
        text-align: center;
        border-bottom-right-radius: 24rpx;
        border-top-left-radius: 24rpx;
        padding-left: 20rpx;
        font-size: 26rpx;
        font-weight: bold;
      }

      .sw-item-text {
        padding: 32rpx 32rpx 0 32rpx;
        // width: 100%;

        .sw-item-text--two {
          margin-top: 16rpx;

          // margin-bottom: 24rpx;
          .sw-price {
            color: #f86c4d;
            font-size: 34rpx;
            font-family: PingFang SC-Medium, PingFang SC;
            // font-weight: 500;
          }

          .btn-buy {
            // margin-top: 28rpx;
            width: 188rpx;
            height: 64rpx;
            line-height: 64rpx;
            text-align: center;
            color: #fff;
            background: #1d9bdc;
            border-radius: 42rpx;
            // font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
