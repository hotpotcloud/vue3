·/*
 * @Author: xbf-Eason 
 * @Date: 2022-06-30 23:15:08 
 * @Last Modified by: Xiao_Bi_Feng
 * @Last Modified time: 2022-06-30 23:25:39
 */
<template name="skeleton">
  <view class="sk-container">
    <view>
      <view class="top-search">
        <view style="padding-top:48px;">
          <view class="search sk-transparent"  style="height:32px;width:181px;border-radius:32px;">
            <view class="icons">
              <text class="uni-icons icons--uni-icons uniui-search icons--uniui-search sk-pseudo sk-pseudo-circle" style="color:#999999;font-size:18px;"></text>
            </view>请输入关键字</view>
        </view>
        <view>
          <view class="warpper Checkmap--warpper d-flex-row Checkmap--d-flex-row d-flex-center Checkmap--d-flex-center data-v-4a9bd716 Checkmap--data-v-4a9bd716" >
            <view class="u-icon u-icon--u-icon data-v-172979f2 u-icon--data-v-172979f2 u-icon--right u-icon--u-icon--right">
              <text class="u-icon__icon u-icon--u-icon__icon data-v-172979f2 u-icon--data-v-172979f2 uicon-map u-icon--uicon-map sk-transparent sk-text-0-0000-164 sk-text" style="font-size:20px;line-height:20px;font-weight:normal;top:0px;color:#000"></text>
            </view>
            <text class="data-v-4a9bd716 Checkmap--data-v-4a9bd716 sk-transparent sk-text-14-2857-104 sk-text">开启定位...</text>
            <view class="u-icon u-icon--u-icon data-v-172979f2 u-icon--data-v-172979f2 u-icon--right u-icon--u-icon--right" >
              <text class="u-icon__icon u-icon--u-icon__icon data-v-172979f2 u-icon--data-v-172979f2 uicon-arrow-right u-icon--uicon-arrow-right sk-transparent sk-text-0-0000-588 sk-text" style="font-size:20px;line-height:20px;font-weight:normal;top:0px;color:#000"></text>
            </view>
          </view>
        </view>
      </view>
      <view class="goods-modal">
        <view></view>
      </view>
      <view class="goods-check d-flex" style="top:124px;">
        <scroll-view class="left-tab" scroll-y="true" style="height:582px;">
          <view class="left-tab">
            <view class="activeBottom"></view>
            <text class="h-over-1 sk-transparent sk-opacity">牛奶</text>
          </view>
          <view class="left-tab">
            <view></view>
            <text class="h-over-1 sk-transparent sk-text-14-2857-716 sk-text">22222222</text>
          </view>
          <view class="left-tab" >
            <view></view>
            <text class="h-over-1 sk-transparent sk-text-14-2857-211 sk-text">3333333</text>
          </view>
        </scroll-view>
        <scroll-view class="right-tab" scroll-y="true" style="height:582px;">
          <view>
            <view class="topname">
              <view class="topRname sk-transparent sk-text-14-2857-116 sk-text">牛奶</view>
              <scroll-view class="scroll-son-x" scroll-x="true">
                <view class="d-flex">
                  <text class="top-tag sk-transparent sk-text-13-8889-814 sk-text"  style="background-position-x: 50%;">11111</text>
                  <text class="top-tag sk-transparent sk-text-13-8889-528 sk-text"  style="background-position-x: 50%;">酸奶</text>
                  <text class="top-tag sk-transparent sk-text-13-8889-470 sk-text"  style="background-position-x: 50%;">测试号码</text>
                  <text class="top-tag sk-transparent sk-text-13-8889-695 sk-text" style="background-position-x: 50%;">好好喝奶</text>
                </view>
              </scroll-view>
            </view>
            <view style="width:255px;">
              <view class="d-flex right-goods">
                <image class="goods-img sk-image"  data-event-params="[object Object]" mode="aspectFit"></image>
                <view class="d-flex-colum goods-content">
                  <text class="h-overflow-2 sk-transparent sk-text-14-2857-142 sk-text"  data-event-params="[object Object]">波哥验收1</text>
                  <view class="d-flex d-sb">
                    <text class="sk-transparent">¥0.02<text class="sk-transparent sk-text-14-2857-757 sk-text">~¥0.03</text></text>
                    <view class="u-icon u-icon--u-icon data-v-172979f2 u-icon--data-v-172979f2 u-icon--right u-icon--u-icon--right" >
                      <text class="u-icon__icon u-icon--u-icon__icon data-v-172979f2 u-icon--data-v-172979f2 uicon-plus-circle-fill u-icon--uicon-plus-circle-fill sk-transparent sk-text-0-0000-18 sk-text" style="font-size:24px;line-height:24px;font-weight:normal;top:0px;color:#1D9BDC"></text>
                    </view>
                  </view>
                </view>
              </view>
              <view class="d-flex right-goods">
                <image class="goods-img sk-image"  data-event-params="[object Object]" mode="aspectFit"></image>
                <view class="d-flex-colum goods-content">
                  <text class="h-overflow-2 sk-transparent sk-text-14-2857-52 sk-text"  data-event-params="[object Object]">ly测试商品1</text>
                  <view class="d-flex d-sb">
                    <text class="sk-transparent">¥0.01</text>
                    <view class="u-icon u-icon--u-icon data-v-172979f2 u-icon--data-v-172979f2 u-icon--right u-icon--u-icon--right" >
                      <text class="u-icon__icon u-icon--u-icon__icon data-v-172979f2 u-icon--data-v-172979f2 uicon-plus-circle-fill u-icon--uicon-plus-circle-fill sk-transparent sk-text-0-0000-468 sk-text" style="font-size:24px;line-height:24px;font-weight:normal;top:0px;color:#1D9BDC"></text>
                    </view>
                  </view>
                </view>
              </view>
              <view class="d-flex right-goods">
                <image class="goods-img sk-image"  data-event-params="[object Object]" mode="aspectFit"></image>
                <view class="d-flex-colum goods-content">
                  <text class="h-overflow-2 sk-transparent sk-text-14-2857-150 sk-text" data-event-params="[object Object]">跑流程1</text>
                  <view class="d-flex d-sb">
                    <text class="sk-transparent">¥0.10</text>
                    <view class="u-icon u-icon--u-icon data-v-172979f2 u-icon--data-v-172979f2 u-icon--right u-icon--u-icon--right" >
                      <text class="u-icon__icon u-icon--u-icon__icon data-v-172979f2 u-icon--data-v-172979f2 uicon-plus-circle-fill u-icon--uicon-plus-circle-fill sk-transparent sk-text-0-0000-15 sk-text" style="font-size:24px;line-height:24px;font-weight:normal;top:0px;color:#1D9BDC"></text>
                    </view>
                  </view>
                </view>
              </view>
              <view class="d-flex right-goods">
                <image class="goods-img sk-image"  data-event-params="[object Object]" mode="aspectFit"></image>
                <view class="d-flex-colum goods-content">
                  <text class="h-overflow-2 sk-transparent sk-text-14-2857-842 sk-text"  data-event-params="[object Object]">测试商品(别动)1</text>
                  <view class="d-flex d-sb">
                    <text class="sk-transparent">¥0.01</text>
                    <view class="u-icon u-icon--u-icon data-v-172979f2 u-icon--data-v-172979f2 u-icon--right u-icon--u-icon--right" >
                      <text class="u-icon__icon u-icon--u-icon__icon data-v-172979f2 u-icon--data-v-172979f2 uicon-plus-circle-fill u-icon--uicon-plus-circle-fill sk-transparent sk-text-0-0000-281 sk-text" style="font-size:24px;line-height:24px;font-weight:normal;top:0px;color:#1D9BDC"></text>
                    </view>
                  </view>
                </view>
              </view>
           
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<style scoped>
.sk-transparent {
    color: transparent !important;
  }
.sk-text-0-0000-164 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 40.0000rpx;
    position: relative !important;
  }
.sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
  }
.sk-text-14-2857-104 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-0-0000-588 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 40.0000rpx;
    position: relative !important;
  }
.sk-opacity {
    opacity: 0 !important;
  }
.sk-text-14-2857-716 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-14-2857-211 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-14-2857-116 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 47.6000rpx;
    position: relative !important;
  }
.sk-text-13-8889-814 {
    background-image: linear-gradient(transparent 13.8889%, #EEEEEE 0%, #EEEEEE 86.1111%, transparent 0%) !important;
    background-size: 100% 36.0000rpx;
    position: relative !important;
  }
.sk-text-13-8889-528 {
    background-image: linear-gradient(transparent 13.8889%, #EEEEEE 0%, #EEEEEE 86.1111%, transparent 0%) !important;
    background-size: 100% 36.0000rpx;
    position: relative !important;
  }
.sk-text-13-8889-470 {
    background-image: linear-gradient(transparent 13.8889%, #EEEEEE 0%, #EEEEEE 86.1111%, transparent 0%) !important;
    background-size: 100% 36.0000rpx;
    position: relative !important;
  }
.sk-text-13-8889-695 {
    background-image: linear-gradient(transparent 13.8889%, #EEEEEE 0%, #EEEEEE 86.1111%, transparent 0%) !important;
    background-size: 100% 36.0000rpx;
    position: relative !important;
  }
.sk-text-14-2857-142 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-14-2857-757 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-0-0000-18 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 48.0000rpx;
    position: relative !important;
  }
.sk-text-14-2857-52 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-0-0000-468 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 48.0000rpx;
    position: relative !important;
  }
.sk-text-14-2857-150 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-0-0000-15 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 48.0000rpx;
    position: relative !important;
  }
.sk-text-14-2857-842 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-0-0000-281 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 48.0000rpx;
    position: relative !important;
  }
.sk-text-14-2857-577 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }
.sk-text-0-0000-438 {
    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
    background-size: 100% 48.0000rpx;
    position: relative !important;
  }
.sk-image {
    background: #EFEFEF !important;
  }
.sk-pseudo::before, .sk-pseudo::after {
      background: #EFEFEF !important;
      background-image: none !important;
      color: transparent !important;
      border-color: transparent !important;
    }
.sk-pseudo-rect::before, .sk-pseudo-rect::after {
      border-radius: 0 !important;
    }
.sk-pseudo-circle::before, .sk-pseudo-circle::after {
      border-radius: 50% !important;
    }
.sk-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
  }

</style>