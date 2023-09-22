<!-- 门店列表item-ui组件 -->
<template>
  <view class="shop-item-container">
    <!-- 订单 -->
    <view class="order" v-if="itemType === 'order'">
      <view class="top-title"
        ><text>提货地址：</text> <text>{{ item.storeName }}</text></view
      >
      <view class="shop-content d-flex-center d-sb">
        <view class="d-flex-center">
          <view class="image-container">
            <image :src="item.storeUrl" mode="aspectFit"></image>
          </view>
          <view>
            <view class="date">
              {{ item.businessStatus }}
              {{ item.businessHoursBegin + "-" + item.businessHoursEnd }}</view
            >
            <view class="location" @tap.stop="clickMap(item)">
              <view>{{ item.distanceFormat }}·{{ item.storeAddress }}</view>
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/location.png"
              ></image>
            </view>
          </view>
        </view>
        <image
          @click="callPhone"
          v-if="showPhone"
          class="phone"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/phone.png"
        ></image
      ></view>
    </view>
    <view
      class="shop-item"
      v-else
      :style="{'background-color': needBg ? '#fff' : 'transparent'}"
    >
      <view class="left-container">
        <view class="image-container">
          <image :src="item.storeUrl" mode="aspectFit"></image>
        </view>
        <image
          v-if="item.workingType === workingType.CHAIN_STORE"
          class="direct-icon"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/direct.png"
        ></image>
      </view>
      <view class="right-container">
        <view class="title"
          ><view>{{ item.storeName }}</view
          ><view v-if="item.shopStoreTag">{{ item.shopStoreTag }}</view></view
        >
        <view class="date"
          >{{ item.businessStatus }}
          {{ item.businessHoursBegin + "-" + item.businessHoursEnd }}</view
        >
        <view class="location" @tap.stop="clickMap(item)"
          ><view>{{ item.distanceFormat }}·{{ item.storeAddress }}</view>
          <image
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/location.png"
          ></image
        ></view>
        <view class="location-tips" v-if="showTips" @tap.stop="closeTips"
          ><view class="solid-arrow"></view>注意距离变更了～</view
        >
      </view>
      <image
        @click.stop="callPhone"
        v-if="showPhone"
        class="phone"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/phone.png"
      ></image> </view
  ></view>
</template>
<script>
import {workingType} from "@/utils/enum";
import {mapMutations} from "vuex";
export default {
  props: {
    needBg: {
      type: Boolean,
      default: true,
    },
    showPhone: {
      type: Boolean,
      default: false,
    },
    itemType: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: {
        latitude: 30.65618,
        longitude: 104.08329,
        storeName: "", //门店名称
        storeAddress: "", //门店地址
        distanceFormat: "",
        storeUrl: "",
        businessHoursBegin: "", //营业开始结束时间
        businessHoursEnd: "",
        businessStatus: "",
        shopStoreTag: "",
        contactPhone: "",
        workingType: "",
      },
    },
    showTips: {
      type: Boolean,
      default: false,
    },
    wrapClass: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      workingType,
    };
  },
  methods: {
    // 打开地图
    clickMap() {
      const {longitude, latitude, storeName, storeAddress} = this.item;
      console.log(this.item, "this.item");
      uni.openLocation({
        longitude: +longitude,
        latitude: +latitude,
        name: storeName,
        address: storeAddress,
      });
    },
    // 拨打电话
    callPhone() {
      uni.makePhoneCall({
        phoneNumber: this.item.contactPhone,
      });
    },
    closeTips() {
      this.$emit("on-cancel");
    },
  },
};
</script>
<style lang="scss" scoped>
.shop-item-container {
  .order {
    .top-title {
      line-height: 36rpx;
      font-size: 26rpx;
      font-weight: 400;
      color: #666666;
      margin-bottom: 18rpx;
      > text:nth-child(2) {
        font-weight: 500;
        color: #333333;
      }
    }
    .phone {
      width: 60rpx;
      height: 60rpx;
    }
    .image-container {
      width: 96rpx;
      height: 96rpx;
      margin-right: 24rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      > image {
        width: 96rpx;
        height: 96rpx;
      }
    }
  }
}
.shop-item {
  display: flex;
  // background: #ffffff;
  min-width: 560rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  position: relative;
  .left-container {
    min-width: 136rpx;
    min-height: 136rpx;
    max-width: 136rpx;
    max-height: 136rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    position: relative;

    .image-container {
      width: 136rpx;
      height: 136rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      overflow: hidden;
      > image {
        width: 136rpx;
        height: 136rpx;
      }
    }
    .direct-icon {
      position: absolute;
      top: -2rpx;
      left: 0rpx;
      width: 54rpx;
      height: 29rpx;
    }
  }
  .right-container {
    margin-left: 24rpx;
    padding: 8rpx 0px;

    > .title {
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      line-height: 40rpx;
      display: flex;
      align-items: center;
      margin-bottom: 6rpx;
      > view:nth-child(1) {
        max-width: 290rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > view:nth-child(2) {
        min-width: 56rpx;
        padding: 0rpx 8rpx;
        height: 32rpx;
        background: rgba(255, 196, 67, 0.3);
        border-radius: 6rpx 6rpx 6rpx 6rpx;
        font-size: 20rpx;
        font-weight: 400;
        color: #eb9f0b;
        line-height: 32rpx;
        text-align: center;
        margin-left: 4rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .phone {
    position: absolute;
    right: 24rpx;
    top: 35rpx;
    bottom: 14rpx;
    width: 60rpx;
    height: 60rpx;
  }
  .location-tips {
    background: rgba(0, 0, 0, 0.75);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    padding: 16rpx 24rpx;
    position: absolute;
    top: 140rpx;
    left: 60rpx;
    // transform: translate(-30%, 0%);
    font-size: 26rpx;
    font-weight: 500;
    color: #f1f1f1;
    line-height: 36rpx;
    .solid-arrow {
      position: absolute;
      width: 0rpx;
      height: 0rpx;
      border-width: 10.5rpx;
      border-style: solid;
      top: -18rpx;
      left: 50%;
      transform: translate(-50%);
      border-color: transparent transparent rgba(0, 0, 0, 0.75) transparent;
    }
  }
}
.date {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
  line-height: 34rpx;
  margin-bottom: 6rpx;
  max-width: 350rpx;
  min-width: 350rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.location {
  display: flex;
  font-size: 24rpx;
  font-weight: 400;
  color: #1d9bdc;
  line-height: 34rpx;
  align-items: center;
  position: relative;
  > view {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 350rpx;
    min-width: 350rpx;
  }
  > image {
    width: 24rpx;
    height: 24rpx;
    max-width: 24rpx;
    min-width: 24rpx;
    max-height: 24rpx;
    min-height: 24rpx;
    margin-left: 10rpx;
  }
}
</style>
