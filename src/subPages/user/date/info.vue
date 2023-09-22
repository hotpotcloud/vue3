<!--
 * @Date: 2022-08-02 15:21:44
 * @LastEditors: ''
 * @LastEditTime: 2022-08-05 15:36:18
 * ''\subPages\date\info.vue
-->
<template>
  <view class="info-out">
    <view class="info-main d-flex">
      <view class="main-img">
        <image
          class="img"
          :src="getAssetImgUrl(data.goodsImgUrl)"
          mode="aspectFit"
        />
      </view>
      <view class="main-text flex-1 d-flex-colum d-sb">
        <view class="text-name">
          <!-- <text class="h-send-rule">
            {{ data.ruleName }}
            </text> -->
          <text :class="[iosFont ? 'font-ios' : 'font-android']">{{
            data.spuName
          }}</text>
        </view>
        <view class="text-time"
          >配送周期：
          <text>{{ data.deliveryStartDate }}</text>
          <text>
            <text style="margin: 0 4rpx">-</text>
            {{ data.deliveryEndDate }}</text
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { RuleTextEnum } from "@/utils/enum";
export default Vue.extend({
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      RuleTextEnum,
    };
  },
  computed: {
    ...mapState("css", ["iosFont"]),
  },
  created() {
    console.log("this---->", this.getAssetImgUrl);
  },
});
</script>

<style scoped lang="scss">
.info-out {
  width: 100%;
  height: 200rpx;
  padding: 32rpx 40rpx;
  background: #fff;
  .info-main {
    .main-img {
      width: 136rpx;
      height: 136rpx;
      //   background: #f00;
      margin-right: 24rpx;
      border-radius: 16px 16px 16px 16px;
      border: 1rpx solid #f3f3f3;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .main-text {
      .text-name {
        // background: #f00;
        line-height: 44rpx;
        font-size: 26rpx;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        max-height: 88rpx;
      }
      .text-time {
        color: #333333;
        font-size: 26rpx;
        line-height: 36rpx;
      }
    }
  }
}
</style>
