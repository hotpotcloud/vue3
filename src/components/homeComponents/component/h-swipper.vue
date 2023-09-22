<template>
  <!-- 轮播组件 -->
  <view class="swiper-out">
    <view>
      <uni-swiper-dot
        mode="round"
        :info="val"
        :dotsStyles="dotSty"
        :current="currentDot"
      >
        <swiper autoplay circular class="hand-out" @change="changeSw">
          <swiper-item
            v-for="(el, index) in val"
            @tap="handleImg(el)"
            :key="index"
            class="swiper-item"
          >
            <image class="imgs" :src="el.pictureUrl" />
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
  </view>
</template>

<script>
// import { urltypeEnum } from "@/utils/enum";
import {mapState} from "vuex";
import {clickNav} from "@/utils/utils";
export default {
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
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
  },

  methods: {
    // 滑动轮播
    changeSw(e) {
      this.currentDot = e.detail.current;
      // console.log("e", e.detail);
    },

    navTo(path) {
      uni.navigateTo({
        url: path,
      });
    },
    // 点击轮播
    handleImg(val) {
      clickNav(val);
    },
  },
};
</script>

<style scoped lang="scss">
.swiper-out {
  position: relative;
  // margin-bottom: 22rpx;
  .hand-out {
    width: 702rpx;
    height: 294rpx;
    margin-left: 24rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
  }
  .swiper-item {
    width: 100%;
    .imgs {
      width: 100%;
      height: 100%;
      margin: auto;
      object-fit: contain;
      // background: #eee;
    }
  }
}
</style>
