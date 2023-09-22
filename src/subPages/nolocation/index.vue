<template>
  <!-- 没有开启定位 -->
  <view>
    <view class="img-box">
      <img
        class="no-img"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E6%97%A0%E5%AE%9A%E4%BD%8D.png"
        alt=""
      />
    </view>
    <view class="text-main">
      <view style="text-align: center" class="top-tip">
        未获取到您的位置，请检查是否开启定位
      </view>
      <view class="tips-text">
        <view class="d-flex padd">
          <uni-icons
            type="location"
            color="#A9A9A9"
            size="16"
            style="margin-right: 16rpx"
          />
          <view>
            <view class="one-text">1.开启手机系统定位</view>
            <view class="tips">确认手机系统是否开启定位功能</view>
          </view>
        </view>

        <view class="d-flex">
          <uni-icons
            type="gear-filled"
            color="#A9A9A9"
            size="16"
            style="margin-right: 16rpx"
          />
          <view>
            <view class="two-text"
              >2.开启小程序定位
              <text class="btn" @tap="openBtn">去开启</text></view
            >
            <view class="tips">确认小程序是否获取位置信息</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
import {getMapLocation} from "@/utils/mapLocation";
export default {
  methods: {
    ...mapMutations("home", ["V_setShowAddBtn", "V_setAddInfoMsg"]),
    ...mapActions("home", ["X_getExistArr"]),
    openBtn() {
      // 开启定位
      uni.openSetting({
        success: () => {
          uni.getSetting({
            success: async (res) => {
              console.log("res设置结果", res);
              if (res.authSetting["scope.userLocation"]) {
                const data = await getMapLocation();
                const {longitude, latitude, getMapLocation} = data;
                const par = {
                  address: getMapLocation,
                  longitude,
                  latitude,
                };
                this.V_setAddInfoMsg(par);
                this.V_setShowAddBtn(false);
                await this.X_getExistArr({longitude, latitude}); //营销区域
              }
            },
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.padd {
  margin-top: 64rpx;
}
.top-tip {
  text-align: center;
  color: #a9a9a9;
}
.img-box {
  margin: 164rpx auto 48rpx;
  text-align: center;
  .no-img {
    border: none;
    width: 440rpx;
    height: 396rpx;
  }
}
.text-main {
  .tips-text {
    width: 412rpx;
    margin: 0 auto;
  }

  .two-text {
    font-size: 30rpx;
    color: #333333;
    margin-bottom: 16rpx;
  }
  .one-text {
    @extend .two-text;
  }
  .tips {
    color: #a9a9a9;
    margin-bottom: 48rpx;
  }
  .btn {
    color: #fff;
    font-size: 24rpx;
    padding: 2rpx 20rpx 4rpx;
    background: #1d9bdc;
    border-radius: 254rpx;
    margin-left: 16rpx;
  }
}
.img-icon {
  border: none;
  width: 32rpx;
  height: 32rpx;
}
</style>
