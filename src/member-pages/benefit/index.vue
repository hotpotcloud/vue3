/* 会员权益 */
<template>
  <view class="benefit-page">
    <!-- 头部滚动区域 -->
    <view class="top-scroll">
      <scroll-view
        scroll-x
        :scroll-with-animation="true"
        :scroll-into-view="'idx' + index"
        class="sbsw"
      >
        <view class="d-flex-center member-benefit-item">
          <!-- <view class="item-warper_empty"></view> -->
          <view
            v-for="(el, i) in benefit"
            :key="i"
            class="item-warper d-flex"
            :id="'idx' + i"
            @tap="onClickItem(i)"
          >
            <view>
              <view
                :id="'idx' + i"
                :class="['scroll-item', index === i && 'opacity_full']"
              >
                <image
                  :src="getAssetImgUrl('member/' + el.benefitType + '.png')"
                  mode="aspectFit"
                />
              </view>
              <view :class="['text_benefit', index === i && 'opacity_full']">{{
                BenefitTextEnum[el.benefitType]
              }}</view>
            </view>
          </view>
          <view class="item-warper_empty"></view>
        </view>
      </scroll-view>
    </view>
    <!-- 会员权益-轮播区域 -->
    <view>
      <swiper
        :current="selectSwIndex"
        duration="800"
        class="swipers"
        previous-margin="48rpx"
        next-margin="48rpx"
        @change="onChangeSw"
      >
        <swiper-item v-for="(el, i) in benefit" :key="i" class="sw-main">
          <swItem :info="el" @onClick="onClickSw" />
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import swItem from "../components/sw-item.vue";
import { mapMutations, mapState } from "vuex";
import { BenefitTextEnum } from "@/pages/member/components/config/const";

export default {
  components: {
    swItem,
  },
  data() {
    return {
      index: 0, // 轮播图选择的索引
      sbid: "id4",
      BenefitTextEnum,
    };
  },
  computed: {
    ...mapState("member", ["benefit", "memberInterest", "selectSwIndex"]),
  },
  onLoad(options) {
    console.log(options);
    if (options?.index) {
      this.index = +options.index;
    }
  },
  onShow() {},
  onReady() {},
  methods: {
    ...mapMutations("member", ["setSelectSwIndex"]),
    /* tips点击 */
    onClickItem(i) {
      console.log("i", i);
      this.index = i;
      this.setSelectSwIndex(i);
    },
    /* 轮播点击 */
    onClickSw() {
      uni.switchTab({
        url: "/pages/product/product",
      });
    },
    /* 轮播滚动 */
    onChangeSw(e) {
      console.log("e", e);
      const cur = e.detail.current;
      this.index = cur;
      this.setSelectSwIndex(cur);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.benefit-page {
  background: #302d2c;
  // background: #ed4107;
  height: 100vh;
  overflow: auto;
  padding-bottom: 48rpx;
}
.top-scroll {
  margin: 32rpx 0;
  color: #e8c5a4;
  font-weight: bold;
  // background: #fff;
}
// .member-benefit-item {
//   // overflow: auto;
// }
.item-warper_empty {
  width: 1rpx;
  height: 1rpx;
  padding-left: 48rpx;
}
.item-warper {
  text-align: center;
  margin-left: 64rpx;
  text-align: center;
  .scroll-item {
    color: #000;
    width: 108rpx;
    height: 108rpx;
    border-radius: 50%;
    background: transparent;
    overflow: hidden;
    margin-bottom: 8rpx;
    opacity: 0.4;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .opacity_full {
    opacity: 1;
  }
  .empty {
    width: 48rpx;
    color: transparent;
  }
  &:first-child {
    margin-left: 48rpx;
  }
  &:last-child {
    margin-right: 48rpx;
  }
}
.text_benefit {
  opacity: 0.4;
}
//轮播区域
.swipers {
  height: 1184rpx;
  // .sw-main {
  // }
  .sw-item {
    height: 1184rpx;
    background: #fff;
    margin: 0 12rpx;
    box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
    border-radius: 24rpx;
  }
}
</style>