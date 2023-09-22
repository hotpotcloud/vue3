<!--
 * @Date: 2022-09-06 13:38:53
 * @LastEditors: ''
 * @LastEditTime: 2022-09-20 17:26:04
 * @FilePath: \xianhuo-miniprogram\src\subPages\homeSub\chooseAdd\chooseAdd.vue
-->
<template>
  <view class="choose-out">
    <u-sticky offset-top="0">
      <view class="search" @tap="openLocal">
        <view class="search-text">
          <icon type="search" :size="13" color="" />
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
                <text>{{
                  loading
                    ? "定位中..."
                    : addInfoMsg.community
                    ? addInfoMsg.community
                    : addInfoMsg.address
                }}</text>
              </view>
            </view>
            <view class="rest-btn d-flex-center" @tap="restLocal">
              <!-- <u-icon
                name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/123icon.png"
              /> -->
              <text style="margin-left: 8rpx">重新定位</text>
            </view>
          </view>
        </view>
      </view>
      <view class="main" v-if="addressList.length">
        <view class="top">我的收货地址</view>
        <AddressCrad :list="addressList" @onClickAdd="onClickAdd" />
      </view>

      <!-- 附近门店 -->
      <view style="margin-bottom: 16rpx">
        <Around @clickMap="clickMap" />
      </view>
    </view>
    <view class="antion border-top">
      <view class="btn-add" @tap="addAddress">新增收货地址</view>
    </view>
  </view>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {Global_Cog} from "@/utils/config";
import AddressCrad from "../components/h-AddressCrad.vue";
import Around from "../components/h-Around.vue";
import {
  getSettingAsync,
  getLocationAsync,
  gpsToAddress,
  chooseLocationAsync,
} from "@/utils/mapLocation";
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
    console.log("option---back", !!option.back);
    this.X_getStationList();
    this.back = option.back;
  },
  onShow() {
    if (this.loginStatus) {
      // this.getList();
      this.X_getAddressList();
    }
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
            latitude,
            longitude,
            back: this.back,
          };
          this.V_setAddInfoMsg(res);
          this.X_getExistArr(par);
        } else {
          const {data} = await gpsToAddress(latitude, longitude);
          const {longitude, latitude, formatted_address} = data;
          const par = {
            address: formatted_address,
            longitude,
            latitude,
          };
          this.V_setAddInfoMsg(par);
          this.X_getExistArr({longitude, latitude, back: this.back}); //营销区域
        }
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
                    this.getUtiLocal();
                    this.V_setShowAddBtn(false);
                  }
                },
              });
            },
          });
        } else {
          console.log("res成功了！", res);
          await this.getUtiLocal();
          setTimeout(() => {
            uni.navigateBack(-1);
          }, 1000);
        }
      } catch (error) {
        //
      } finally {
        this.loading = false;
        // setTimeout(() => {
        //   this.loading = false;
        // }, 1000);
      }
    },
    /**
     * @name 获取小程序模糊定位
     * @param {string}  'wgs84'|'gcj02'
     * @return {object} 经纬度(latitude&longitude)
     */
    getFuzzyLocation(type) {
      return new Promise((reslove, reject) => {
        wx.getFuzzyLocation({
          type,
          success: (res) => {
            reslove(res);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    /**
     * @name requset请求
     */
    requestMap(url, params, type = "GET") {
      return new Promise((reslove, reject) => {
        uni.request({
          url,
          method: type,
          data: params,
          success: (res) => {
            console.log("res--腾讯地图解析成功", res);
            reslove(res);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    async getUtiLocal() {
      try {
        // 获取当前坐标
        const local = await this.getFuzzyLocation("gcj02");
        console.log("local--我是当前坐标", local);
        const data = await gpsToAddress(local.latitude, local.longitude);
        const {latitude, longitude, formatted_address} = data;
        const par = {
          address: formatted_address,
          longitude,
          latitude,
        };
        this.V_setAddInfoMsg(par);
        this.X_getExistArr({longitude, latitude, back: this.back}); //营销区域
      } catch (error) {
        console.log("error", error);
      }
    },
    /**
     * @name 获取用户当前设置
     */
    getSetting() {
      return new Promise((reslove, reject) => {
        uni.getSettin({
          success: (res) => {
            reslove(res);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    // 重新定位
    restLocal2() {
      this.loading = true;
      uni.getSetting({
        success: async (res) => {
          const flag = res.authSetting["scope.userLocation"]
            ? res.authSetting["scope.userLocation"]
            : res.authSetting["scope.userFuzzyLocation"];
          if (!flag) {
            uni.openSetting({
              success: (res) => {
                console.log("去开启定位222", res);
                uni.getSetting({
                  success: (res) => {
                    console.log("res设置结果", res);
                    if (res.authSetting["scope.userFuzzyLocation"]) {
                      this.getUtiLocal();
                      this.V_setShowAddBtn(false);
                    }
                  },
                });
              },
            });
          } else {
            console.log("res成功了！", res);
            // this.getUtiLocal().then(() => {
            //   uni.navigateBack(-1);
            // });
            await this.getUtiLocal();
            setTimeout(() => {
              uni.navigateBack(-1);
            }, 1000);
          }
        },
        fail: () => {},
      });
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    //收货地址选择
    // async clickAdd(val) {
    async onClickAdd(val) {
      const payload = {
        address: val.community, //省略地显示community
        latitude: val.latitude,
        longitude: val.longitude,
      };
      const par = {
        latitude: val.latitude,
        longitude: val.longitude,
        back: true,
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
    /**打开地图 */
    clickMap(e) {
      console.log("e", e);
      const {longitude, latitude, milkStationName, milkStationAddress} = e;
      uni.openLocation({
        longitude: +longitude,
        latitude: +latitude,
        name: milkStationName,
        address: milkStationAddress,
      });
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
