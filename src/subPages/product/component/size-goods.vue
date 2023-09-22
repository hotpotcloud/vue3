<template>
  <!-- 商品规格 -->
  <view class="size-out">
    <view class="size d-flex d-sb">
      <view class="size-title" :class="[iosFont ? 'font-ios' : 'font-android']"
        >选择</view
      >

      <!-- 右侧内容 -->
      <view class="size-list flex-1">
        <!-- 规格 -->
        <view class="size-list-item">
          <view class="little-tip">规格</view>
          <view class="d-flex-warp">
            <!--  -->
            <template v-for="(el, index) in productinfo.skuChannelInfoList">
              <view
                :key="index"
                class="size-right-item align"
                :class="[productinfo.activeSize === index && 'active']"
                @click="onChoose(index, el)"
                >{{ el.skuNickName }}</view
              >
            </template>
          </view>
          <!-- 组合商品sku信息 -->
          <view v-if="vuexCombo.length" class="fc05-combo">
            <view class="d-flex-center d-sb" @tap="checkMoreGoods">
              <view class="d-flex-center">
                <template v-for="(it, idx) in comboNums">
                  <view class="combo-img" :key="idx">
                    <img :src="getAssetImgUrl(it.imageUrl[0])" alt />
                    <text class="combo-nums"
                      >{{ it.num }}{{ it.specsName }}</text
                    >
                  </view>
                </template>
              </view>
              <view class="d-flex-nowarp">
                <view class="fc05-more" v-if="vuexCombo.length > 2"
                  >共{{ vuexCombo.length }}种</view
                >
                <u-icon name="arrow-right" color="#999999" size="16"></u-icon>
              </view>
            </view>
          </view>
        </view>

        <view class="goods-nums">
          <view class="little-tip">数量</view>
          <view class="d-flex-warp">
            <template v-for="(el, index) in productinfo.numlist.saleNums">
              <view
                :key="index"
                class="size-right-item align"
                :class="[productinfo.activeNum === index && 'active']"
                @click="onChooseNum(index, el)"
                >{{ el }}{{ productinfo.unitName }}</view
              >
            </template>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("css", ["iosFont"]),
    ...mapState("product", ["productinfo"]),
    ...mapGetters("product", ["vuexCombo"]),
    // 组合商品信息
    comboNums() {
      console.log("this.productinfo.activeSize", this.productinfo.activeSize);
      const len = this.vuexCombo.length;
      if (len > 4) {
        return this.vuexCombo.slice(0, 4);
      } else {
        return this.vuexCombo;
      }
    },
  },

  methods: {
    onChoose(index, item) {
      this.$emit("onChoose", index, item);
    },
    onChooseNum(index, item) {
      this.$emit("onChooseNum", index, item);
    },
    checkMoreGoods() {
      this.$emit("checkMoreGoods");
    },
  },
};
</script>

<style lang="scss" scoped>
.size-out {
  background: #fff;
  padding-bottom: 8rpx;
  .active {
    border-color: #1d9bdc;
    color: #1d9bdc;
    background: #e4f4ff;
  }
  .size-title {
    margin-right: 14rpx;
  }
  .size-right-item {
    color: #666;
    width: calc((100% - 48rpx) / 3);
    height: 64rpx;
    line-height: 64rpx;
    padding: 0 20rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    border: 1rpx solid transparent;
    background: #f1f1f1;
    margin-left: 16rpx;
    margin-bottom: 16rpx;
    // white-space: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    // text-align: center;
    &.active {
      border-color: #1d9bdc;
      color: #1d9bdc;
      background: #e4f4ff;
    }
    &.align {
      text-align: center;
    }
  }
  .fc05-combo {
    padding-left: 8rpx;
    color: #999999;
    font-size: 22rpx;
    margin-bottom: 16rpx;
    .combo-img {
      width: 96rpx;
      height: 96rpx;
      border-radius: 16rpx;
      position: relative;
      border: 1rpx solid #f3f3f3;
      margin-top: 8rpx;
      margin-left: 8rpx;
      image {
        width: 100%;
        height: 100%;
      }
      .combo-nums {
        background: rgba(0, 0, 0, 0.45);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 26rpx;
        line-height: 26rpx;
        color: #fff;
        border-bottom-left-radius: 16rpx;
        border-bottom-right-radius: 16rpx;
        font-size: 22rpx;
        text-align: center;
      }
    }
    .fc05-more {
      margin-right: 16rpx;
    }
  }
  .little-tip {
    font-size: 22rpx;
    color: #999;
    margin-bottom: 8rpx;
    margin-left: 16rpx;
  }
}
</style>
