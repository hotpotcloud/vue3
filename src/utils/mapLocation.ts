import {BaseApp} from "@/const/appIdConf.js";
const {mapKey} = BaseApp;

export interface MapAddress {
  status: string;
  regeocode: Regeocode;
  info: string;
  infocode: string;
}

export interface Regeocode {
  addressComponent: AddressComponent;
  formatted_address: string;
}

export interface AddressComponent {
  city: string;
  province: string;
  adcode: string;
  district: string;
  towncode: string;
  streetNumber: StreetNumber;
  country: string;
  township: string;
  businessAreas: BusinessArea[];
  building: Building;
  neighborhood: Neighborhood;
  citycode: string;
}

export interface StreetNumber {
  number: string;
  location: string;
  direction: string;
  distance: string;
  street: string;
}

export interface BusinessArea {
  location: string;
  name: string;
  id: string;
}

export interface Building {
  name: any[];
  type: any[];
}

export interface Neighborhood {
  name: any[];
  type: any[];
}

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
      // complete: {
      //   //
      // },
    });
  });
};

export interface AddressInfo {
  formatted_address: string;
  city: string;
  province: string;
  adcode: string;
  district: string;
  towncode: string;
  streetNumber: StreetNumber;
  country: string;
  township: string;
  businessAreas: BusinessArea[];
  building: Building;
  neighborhood: Neighborhood;
  citycode: string;
  location: string;
  latitude: number;
  longitude: number;
  provinceName: string;
  areaName: string;
  cityName: string;
}
/**
 * 坐标逆解析
 */
export const gpsToAddress = (latitude, longitude): Promise<AddressInfo> => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${longitude},${latitude}&key=${mapKey}`,
      success: (res) => {
        console.log("res--mapLocation.JS-坐标解析-success", res);
        const {regeocode} = res.data as MapAddress;
        const {province, district, city} = regeocode.addressComponent;
        const newAddress = {
          ...regeocode.addressComponent,
          formatted_address: regeocode.formatted_address,
          location: `${longitude},${latitude}`,
          longitude: longitude,
          latitude: latitude,
          provinceName: Array.isArray(province) ? "" : province,
          areaName: Array.isArray(district) ? "" : district,
          cityName: Array.isArray(city) ? "" : city,
        };
        resolve(newAddress);
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
export const getMapLocation = async (): Promise<AddressInfo> => {
  try {
    const res: any = await getLocationAsync();
    const {latitude, longitude} = res;
    const addressRes = await gpsToAddress(latitude, longitude);
    return addressRes;
  } catch (error) {
    console.log("error--定位获取失败", error);
    uni.showToast({
      title: "获取定位失败",
      icon: "none",
    });
  }
};
/**
 * 获取小程序用户当前系统设置
 */
export const getSettingAsync = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
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
/**
 * 高德getPOI
 */
export const getPoiInfo = (str: string) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://restapi.amap.com/v3/place/text?keywords=${str}&key=${mapKey}`,
      success: (res) => {
        console.log("获取poi", res);
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
