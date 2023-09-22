<template>
  <view class="sticky-top">
    <view class="top-show" v-if="show" :style="{ top: topHeight + 'px' }">
      <view class="d-flex modal-info">
        <view class="modal-left-info">
          <image class="img" :src="getAssetImgUrl(productinfo.imageUrl[0])" />
        </view>

        <view class="modal-right-info d-flex-colum">
          <view class="tip-name">
            <text class="seckill-tag" v-show="productinfo.numlist.killSymbal"
              >秒杀</text
            >
            {{ productinfo.spuName }}
          </view>
          <view class="d-flex-center tags-info" v-if="X_mutual.all">
            <view v-if="xticket.length && X_mutual.coupon" class="h-ticket"
              >优惠券</view
            >
            <view v-for="(el, index) in tagArr" :key="index" class="tag-css">
              <view v-if="X_mutual.tag">{{ el }}</view>
            </view>
          </view>
          <view class="d-flex d-sb">
            <view
              class="modal-price-info"
              v-if="!productinfo.numlist.killSymbal || !showKill"
            >
              {{ productinfo.minMoney }}
              <text v-show="productinfo.maxMoney"
                >~{{ productinfo.maxMoney }}</text
              >
            </view>
            <view class="modal-price-info" v-else>
              <text class="spike-price" style="margin-right: 8rpx">{{
                productinfo.killMoney
              }}</text>
              <text class="spike-price-unuse">{{ productinfo.minMoney }}</text>
            </view>

            <!-- 分享icon -->
            <view>
              <button
                id="btnId"
                open-type="share"
                hover-class="button-hover"
                style="display: hidden; outline: none; border: none"
                @tap="shares"
              ></button>
              <label for="btnId">
                <image
                  v-if="xiaoyouShow"
                  class="share-png"
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%88%86%E4%BA%AB%402x.png"
                  mode="aspectFit"
                />
              </label>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    topHeight: {
      type: Number | String,
      default: 0,
    },
    tagArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    showPrice: {
      type: Boolean,
      default: false,
    },
    productinfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    xiaoyouShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {},
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
@import "../index.scss";
.top-show {
  background: #fff;
  position: fixed;
  left: 0;
  padding: 32rpx 40rpx;
  width: 100%;
  z-index: 90;
  .modal-info {
    display: flex;
    justify-content: space-between;
    .modal-left-info {
      width: 132rpx;
      height: 132rpx;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-self: center;
      margin-right: 26rpx;
      border-radius: 16rpx;
      .img {
        width: 132rpx;
        max-height: 132rpx;
        overflow: hidden;
      }
    }
    .modal-right-info {
      flex: 1;
      .tip-name {
        font-size: 30rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
        max-height: 80rpx;
        color: #000000;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .tags-info {
        max-height: 82rpx;
        overflow: hidden;
        .tag-css {
          // margin-bottom: 16rpx;
          color: #f86c4d;
          font-size: 22rpx;
          line-height: 26rpx;
          height: 30rpx;
          padding: 0 8rpx;
          border: 0.5rpx solid #f86c4d;
          border-radius: 8rpx;
          max-width: 220rpx;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 16rpx;
        }
      }
      .modal-price-info {
        font-size: 30rpx;
        font-weight: 600;
        color: #f86c4d;
        .spike-price-unuse {
          color: #999;
          text-decoration: line-through;
          font-size: 22rpx;
        }
      }
    }
  }
}
</style>