<template>
  <view class="xiaoyou-out" v-if="xiaoyouMoney.isDist && show">
    <button
      id="btnId"
      open-type="share"
      hover-class="button-hover"
      style="display: hidden"
    ></button>
    <label for="btnId">
      <view class="share-btn d-flex-center">
        <view class="share-icon">
          <image
            :src="getAssetImgUrl('share-xiaoyou.svg')"
            mode="scaleToFill"
          />
        </view>
        <view class="share-num d-flex-colum-center">
          <view class="share-money">{{
            money !== 0 ? money : xiaoyouMoney.maxCommission
          }}</view>
          <view>最高可得</view>
        </view>
      </view>
    </label>
  </view>
</template>

<script>
import { getAssetImgUrl } from "@/utils/utils";
import { mapState } from "vuex";
export default {
  props: {
    money: {
      type: Number | String,
      default: 0,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState("home", ["xiaoyouMoney"]),
  },
  methods: {
    getAssetImgUrl,
  },
};
</script>

<style scoped lang="scss">
.xiaoyou-out {
  width: 100%;
  color: #ffffff;
  .share-btn {
    position: fixed;
    right: 0;
    // top: 53%;
    // top: 866rpx;
    bottom: 302rpx;
    height: 96rpx;
    min-width: 188rpx;
    background: linear-gradient(129deg, #f86c4d 0%, #e0515f 100%);
    border-top-left-radius: 48rpx;
    border-bottom-left-radius: 48rpx;
    padding-right: 6rpx;
  }
  .share-icon {
    width: 64rpx;
    height: 64rpx;
    // border-radius: 50%;
    // border: 2rpx solid #fff;
    margin: 16rpx;
    margin-right: 0;
    // position: relative;
    image {
      width: 100%;
      height: 100%;
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
    }
  }
  .share-num {
    font-size: 20rpx;
    margin-left: 4rpx;
    .share-money {
      font-size: 40rpx;
      font-weight: bold;
    }
  }
}
</style>
