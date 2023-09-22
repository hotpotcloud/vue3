<!--
 * @Date: 2022-09-06 13:38:53
-->
<template>
  <!-- <scroll-view
    :scroll-y="true"
    style="height: calc(100vh - 3rpx)"
    @scrolltolower="scrolltolower"
  >-->
  <view class="choose-out">
    <u-sticky offset-top="0">
      <view class="search" @tap="openLocal">
        <view class="search-text">
          <icon type="search" :size="13" color />
          <text class="text">搜索小区/写字楼/学校等</text>
        </view>
      </view>
    </u-sticky>
    <view class="add-content">
      <view class="heard">
        <view class="local-add">
          <view class="top">当前定位</view>
          <view class="add-text d-flex-center d-sb d-flex-nowarp">
            <view class="d-flex-center d-flex-nowarp addname flex-1">
              <image
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/123dinwei.png"
                mode="scaleToFill"
                class="img-icon"
              />
              <view class="h-over-1 name">
                <text>
                  {{
                    loading
                      ? "定位中..."
                      : addInfoMsg.community
                      ? addInfoMsg.community
                      : addInfoMsg.address
                  }}
                </text>
              </view>
            </view>
            <view class="rest-btn d-flex-center" @tap="restLocal">
              <u-icon
                name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/123icon.png"
              />
              <text style="margin-left: 8rpx">重新定位</text>
            </view>
          </view>
        </view>
      </view>
      <view class="main" v-if="addressList.length">
        <view class="top">
          我的收货地址
          <span class="top-add" @tap="addAddress">新增</span>
        </view>
        <AddressCrad :list="addressList" @onClickAdd="onClickAdd" />
      </view>

      <!-- 附近门店 -->
      <view style="margin-bottom: 16rpx">
        <Around @clickMap="clickMap" />
      </view>
    </view>
    <view class="antion border-top">
      <view class="btn-add" @tap="confirmChoices">确定</view>
    </view>
  </view>
  <!-- </scroll-view> -->
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import AddressCrad from "../components/h-AddressCrad.vue";
import Around from "../components/h-Around.vue";
import {
  getSettingAsync,
  gpsToAddress,
  chooseLocationAsync,
  getMapLocation,
} from "@/utils/mapLocation";
import {BaseApp} from "@/const/appIdConf";
export default {
  components: {
    Around,
    AddressCrad,
  },
  data() {
    return {
      list: [],
      loading: false, //定位中
      back: false,
    };
  },
  onLoad(option) {
    this.back = option.back;
  },
  onShow() {
    // 附近门店
    BaseApp.digitalShop && this.X_getStationList();
    // 查历史门店
    BaseApp.digitalShop && this.X_getHistoryStationList();
    this.loginStatus && this.X_getAddressList();
  },
  computed: {
    ...mapState("user", ["loginStatus"]),
    ...mapState("home", [
      "addInfoMsg",
      "addressList",
      "existArr",
      "stationList",
    ]),
  },
  methods: {
    ...mapMutations("home", ["V_setAddInfoMsg", "V_setShowAddBtn"]),
    ...mapActions("home", [
      "X_getExistArr",
      "X_getAddressList",
      "X_getStationList",
      "X_getHistoryStationList",
    ]),
    ...mapMutations("address", ["setAddress"]),
    /**
     * 打开地图选择定位
     */
    async openLocal() {
      try {
        //1.打开地图
        const res = await chooseLocationAsync();
        console.log("res", res);
        const {errMsg, address, name, latitude, longitude} = res;
        res.address = name;
        if (errMsg == "chooseLocation:ok" && address) {
          const par = {
            latitude: latitude,
            longitude: longitude,
            back: this.back,
          };
          this.V_setAddInfoMsg(res);
          this.X_getExistArr(par);
        } else {
          const {data} = await gpsToAddress(latitude, longitude);
          console.log("addressRes", data);
          const {formatted_address} = data;
          const par = {
            address: formatted_address,
            longitude: longitude,
            latitude: latitude,
          };
          this.V_setAddInfoMsg(par);
          this.X_getExistArr({
            latitude,
            longitude,
            back: this.back,
          }); //营销区域
        }
        uni.reLaunch({url: "/pages/homepage/homepage"});
      } catch (error) {
        //
      }
    },
    /**
     * 重新定位
     */
    async restLocal() {
      this.loading = true;
      try {
        const res = await getSettingAsync();
        if (!res.authSetting["scope.userLocation"]) {
          uni.openSetting({
            success: () => {
              uni.getSetting({
                success: (res) => {
                  console.log("res设置结果", res);
                  //允许定位
                  if (res.authSetting["scope.userLocation"]) {
                    this.getNowLocation();
                    this.V_setShowAddBtn(false);
                  }
                },
              });
            },
          });
        } else {
          await this.getNowLocation();
          setTimeout(() => {
            uni.navigateBack(-1);
          }, 1000);
        }
      } catch (error) {
        //
      } finally {
        this.loading = false;
      }
    },
    /**
     * 获取当前定位
     * TODO: 更新定位信息，频繁调用30分钟更新一次
     */
    async getNowLocation() {
      try {
        // 定位获取
        const data = await getMapLocation();
        const {formatted_address, longitude, latitude} = data;
        const serPar = {
          address: formatted_address,
          longitude,
          latitude,
        };
        this.V_setAddInfoMsg(serPar);
        this.X_getExistArr({longitude, latitude, back: this.back}); //营销区域
      } catch (error) {
        //
        console.log("error", error);
      }
    },
    //收货地址选择
    async onClickAdd(val) {
      const payload = {
        address: val.community, //省略地显示community
        latitude: val.latitude,
        longitude: val.longitude,
        addressNo: val.addressNo,
      };
      const par = {
        latitude: val.latitude,
        longitude: val.longitude,
        digitalShop: BaseApp.digitalShop,
      };
      this.setAddress(val);
      this.V_setAddInfoMsg(payload);
      await this.X_getExistArr(par); //营销区域
    },
    addAddress() {
      if (!this.loginStatus) {
        return uni.navigateTo({
          url: "/pages/user/relogin",
        });
      }
      uni.navigateTo({
        url: "/subPages/address/addressAdd?type=local",
      });
    },
    /**打开附近门店导航地图 */
    clickMap(e) {
      const {longitude, latitude, milkStationName, milkStationAddress} = e;
      uni.openLocation({
        longitude: +longitude,
        latitude: +latitude,
        name: milkStationName,
        address: milkStationAddress,
      });
    },
    // 确认
    confirmChoices() {
      uni.navigateBack({delta: 1});
    },
  },
};
</script>

<style scoped lang="scss">
.choose-out {
  //   padding: 0 32rpx;
  height: 100vh;
  width: 100%;
  background: #f5f5f5;
}
.add-content {
  width: 100%;
  height: calc(100% - 322rpx);
  overflow: auto;
}
.heard {
  padding: 0 32rpx;
  background: #ffffff;
  margin-bottom: 16rpx;
}
.search {
  padding: 16rpx 32rpx;
  background: #ffffff;
  width: 100%;
  // height: 68rpx;
  // background: #f00;
  // border-radius: 116rpx;
  // margin: 16rpx 0;

  .search-text {
    display: flex;
    align-items: center;
    height: 64rpx;
    // margin-left: 32rpx;
    border-radius: 116rpx;
    background: #f4f4f4;
    padding-left: 32rpx;
  }
  .text {
    margin-left: 8rpx;
    font-size: 26rpx;
    color: #a9a9a9;
    line-height: 68rpx;
  }
}
.top {
  color: #999999;
  font-size: 26rpx;
  display: flex;
  .top-add {
    margin-left: auto;
    color: #1d9bdc;
  }
}
.local-add {
  padding: 32rpx 0;
  width: 100%;
  .add-text {
    margin-top: 16rpx;
    font-size: 30rpx;
    font-weight: bold;
    .addname {
      overflow: hidden;
      height: 40rpx;
      .img-icon {
        width: 28rpx;
        height: 28rpx;
        margin-right: 12rpx;
      }
      .name {
        width: calc(100% - 28rpx);
      }
    }

    .rest-btn {
      color: #1d9bdc;
      font-size: 26rpx;
      font-weight: normal;
    }
  }
}
.main {
  background: #fff;
  margin-bottom: 16rpx;
  .top {
    border-bottom: 2rpx solid #fff4f4f4;
    padding: 32rpx;
  }
  .add-detail {
    padding: 0 40rpx;
    background: #fff;
    .detail-info {
      border-bottom: 2rpx solid #fff4f4f4;
      padding: 32rpx 0;
    }
    .user-names {
      font-size: 30rpx;
      .u-name {
        margin-right: 32rpx;
      }
    }
    .add-main {
      margin-top: 16rpx;
      font-size: 30rpx;
      font-weight: bold;
    }
  }
}
.antion {
  width: 100%;
  height: 228rpx;
  text-align: center;
  background: #ffffff;
  padding: 32rpx 40rpx;
  position: fixed;
  bottom: 0;

  .btn-add {
    height: 104rpx;
    background-color: #1d9bdc;
    color: #fff;
    border-radius: 254rpx;
    line-height: 104rpx;
    font-size: 34rpx;
    font-weight: bold;
  }
}
</style>
