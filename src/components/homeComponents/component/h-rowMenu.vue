<!--
 * @Date: 2022-08-10 17:44:16
 * @LastEditors: ''
 * @LastEditTime: 2022-08-18 15:32:37
 * @FilePath: \xianhuo-miniprogram\src\components\homeComponents\component\h-rowMenu.vue
-->
<template>
  <!-- <view class="row-out">
    <view class="hand">
    
       <u-scroll-list
       indicator
       indicatorWidth="26"
       indicatorBarWidth="16"
       indicatorColor="#8BD0FF"
       indicatorActiveColor="#1D9BDC"
       >
        <view v-for="(item, index) in val" :key="index" class="hand-menu">
            <image :src="item.pictureUrl"></image>
            <view>{{item.name}}</view>
        </view>
    </u-scroll-list>
    </view>
  </view> -->
  <view class="row-out">
    <view
      class="hand-menu"
      :style="[!indicator && { 'padding-bottom': '0px' }]"
    >
      <u-scroll-list
        :indicator="indicator"
        @right="right"
        @left="left"
        indicatorWidth="26"
        indicatorBarWidth="16"
        indicatorColor="#8BD0FF"
        indicatorActiveColor="#1D9BDC"
        indicatorStyle="margin:0"
      >
        <view class="scroll-list" style="flex-direction: row">
          <view
            class="scroll-list__goods-item menu-info"
            v-for="(item, index) in val"
            :key="index"
            :class="[index === 9 && 'scroll-list__goods-item--no-margin-right']"
            @tap="clickMenu(item)"
          >
            <image
              class="scroll-list__goods-item__image"
              :src="item.pictureUrl"
            ></image>
            <text class="scroll-list__goods-item__text">{{ item.name }}</text>
          </view>
        </view>
      </u-scroll-list>
    </view>
  </view>
</template>

<script>
import { clickNav } from "@/utils/utils";
export default {
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      },
    },
    val: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    indicator() {
      return this.val.length > 4;
    },
  },
  methods: {
    left() {
      console.log("left");
    },
    right() {
      console.log("right");
    },
    // 点击菜单
    clickMenu(el) {
      // console.log("el--->", el);
      clickNav(el);
    },
    // 滑动计算
    changeMenuScroll(e) {
      const { scrollWidth, scrollLeft } = e.detail;
      // const offsetL = e.detail.scrollLeft;
      const barAllMove = this.barW - this.bar;
      const x = scrollLeft / (scrollWidth / this.barW);
      console.log(" e", scrollWidth, scrollLeft, x);
      this.translateX = x;
    },
  },
};
</script>

<style scoped lang="scss">
.row-out {
  padding: 0 32rpx;
}
::v-deep .u-scroll-list {
  padding-bottom: 0px !important;
}
.hand-menu {
  padding: 24rpx 32rpx 0;
  // width: 686rpx;
  // height: 180rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding-bottom: 10rpx;
  .menu-info:last-child {
    margin-right: 0;
  }
}

.scroll-list {
  padding-bottom: 0;
  margin-bottom: 24rpx;
  @include flex(column);

  &__goods-item {
    width: 130rpx;
    height: 100rpx;
    margin-right: 34rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__goods-item:last-child {
      margin-right: 0;
    }

    &__image {
      width: 56rpx;
      height: 56rpx;
      border-radius: 4rpx;
    }

    &__text {
      color: #000000;
      text-align: center;
      font-size: 26rpx;
      margin-top: 5rpx;
    }
  }
  // &__indicator {
  //   margin-top: 24rpx;
  // }
}
</style>
