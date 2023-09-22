import {BaseApp} from "@/const/appIdConf.js";
const {qmapKey} = BaseApp;
/**
 * 获取当前地理位置
 */
export const getLocationAsync = (type = "gcj02") => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type, // 默认gcj02 , wgs84 返回 gps 坐标，
      //   isHighAccuracy: true, //高精度
      highAccuracyExpireTime: 3000, //超时时间
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        console.log("err", err);
        reject(err);
      },
      complete: {
        //
      },
    });
  });
};

/**
 * 坐标逆解析
 */
export const gpsToAddress = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${qmapKey}`,
      success: (res) => {
        console.log("res--mapLocation.JS-坐标解析-success", res);
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * 小程序获取当前定位
 * @returns {Promise<{result:any{}}>}返回用户定位逆地理信息
 */
export const getMapLocation = async () => {
  try {
    const res = await getLocationAsync();
    const {latitude, longitude} = res;
    const addressRes = await gpsToAddress(latitude, longitude);
    const {result} = addressRes.data;
    return result;
  } catch (error) {
    console.log("error--定位获取失败", error);
    return uni.showToast({
      title: "获取定位失败",
      icon: "none",
    });
  }
  // const { address, formatted_addresses } = result;
  // const { recommend } = formatted_addresses;
  // return {
  //   address,
  //   recommend,
  // };
};
/**
 * 获取小程序用户当前系统设置
 */
export const getSettingAsync = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

/**
 *打开微信内置地图选择位置
 */
export const chooseLocationAsync = () => {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
