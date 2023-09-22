/* 推广中心 */
<template>
  <view class="center-out">
    <view class="d-flex-center d-sb">
      <view class="f32">推广中心</view>
      <!-- <view class="f24 color-99 d-flex-center"
        >新手必读
        <img
          style="width: 32rpx; height: 32rpx; margin-left: 4rpx; border: none"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/left2.png"
          alt=""
      /></view> -->
    </view>
    <view class="d-flex-center center-xiao">
      <view @click="onClickShare(enums.FREND)" class="flex-1 img-right">
        <img
          class="img-center"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/1yaoqin.png"
          alt=""
        />
      </view>
      <view @click="onClickShare(enums.GOODS)" class="flex-1">
        <img
          class="img-center"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/1share.png"
          alt=""
        />
      </view>
    </view>
    <view class="banner-xiao" v-if="bannerList.length">
      <uni-swiper-dot
        mode="round"
        :info="bannerList"
        :dotsStyles="dotSty"
        :current="currentDot"
      >
        <swiper autoplay circular class="xiao-swiper" @change="changeSw">
          <swiper-item
            v-for="(item, index) in bannerList"
            :key="index"
            @click="onBanner(item)"
          >
            <image class="banner-img" :src="item.picUrl" mode="scaleToFill" />
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { xiaoyouRoute } from "@/utils/utils";
export default {
  data() {
    return {
      currentDot: "0",
      dotSty: {
        //指示器样式OBJ
        backgroundColor: "#FFFFFF",
        border: "1rpx #FFFFFF solid",
        selectedBackgroundColor: "#FFFFFF",
        selectedBorder: "1rpx #FFFFFF solid",
        bottom: 8,
      },
      enums: {
        FREND: "FREND",
        GOODS: "GOODS",
      },
    };
  },
  computed: {
    ...mapState("xiaoyou", ["bannerList"]),
  },
  methods: {
    ...mapMutations("xiaoyou", ["v_setCurrentBanner"]),
    // 滑动轮播
    changeSw(e) {
      this.currentDot = e.detail.current;
      // console.log("e", e.detail);
    },
    /* 轮播点击 */
    onBanner(val) {
      console.log("val", val);
      this.v_setCurrentBanner(val);
      xiaoyouRoute(val);
    },
    onClickShare(type) {
      console.log("type", type);
      const url =
        type === this.enums.FREND
          ? "/xiaoyouPages/home/share"
          : "/xiaoyouPages/product/ProductList";
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.center-out {
  background: white;
  border-radius: 24rpx;
  padding: 24rpx;
  // padding-bottom: ;
  margin-bottom: 68rpx;
  .center-xiao {
    margin: 16rpx 0;
    margin-bottom: 0;
    .img-right {
      margin-right: 16rpx;
    }
    .img-center {
      // width: 312rpx;
      width: 100%;
      height: 160rpx;
    }
  }
  .banner-xiao {
    margin-top: 16rpx;
    width: 100%;
    height: 160rpx;
    border-radius: 24rpx;
    text-align: center;
    .xiao-swiper {
      height: 160rpx;
      width: 100%;
    }
    .banner-img {
      width: 100%;
      height: 160rpx;
    }
  }
}
</style>
