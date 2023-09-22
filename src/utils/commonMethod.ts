import api from "@/utils/api";
import {
  COUPON_CHANNEL_TYPE,
  ACQUIRE_TYPE_ENUM,
  COUPON_CATEGORY_ENUM,
  goodsType,
} from "@/utils/enum";

import { coupons, shopCoupons } from "@/utils/url";
// 领取
export const handleUse = async (coupon) => {
  const type = coupon.couponCategoryEnum;
  switch (type) {
    case COUPON_CATEGORY_ENUM.SHOP_STORE: {
      try {
        const addinfo = uni.getStorageSync("addinfo");
        const userMsg = uni.getStorageSync("userMsg");
        const para = {
          spuCode: coupon.productDTOList[0].spuCode,
          appId: userMsg.appId,
          longitude: addinfo.longitude,
          latitude: addinfo.latitude,
        };
        console.log(para, "==");
        const { data } = (await api.$get(
          shopCoupons.getApplyShopBySpuCode,
          para
        )) as any;
        if (data) {
          uni.navigateTo({
            url: `/shopPages/goodsDetail/index?spuCode=${coupon.productDTOList[0].spuCode}&shopConfigId=${data.shopConfigId}`,
          });
        } else {
          uni.showToast({
            title: "未检测到门店信息，不可用券",
          });
        }
      } catch (error) {}
      break;
    }
    case COUPON_CATEGORY_ENUM.MILK_CARD: {
      uni.navigateTo({
        url: "/child-pages/milkcard-home/index",
      });
      break;
    }
    default: {
      if (coupon.isPartProduct === goodsType.ALL) {
        uni.switchTab({
          url: "/pages/product/product",
        });
      } else {
        uni.navigateTo({
          url: "/subPages/coupons/couponGoods?code=" + coupon.activityCode,
        });
      }
    }
  }
};
// 判断是否登录

export const isLogin = () => {
  const userInfo = uni.getStorageSync("userMsg");
  if (!userInfo) {
    uni.navigateTo({
      url: "/pages/user/relogin",
    });
    return false;
  }
  return true;
};
// 获取小程序版本库
export const getVersion = () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: (res) => {
        resolve(res.SDKVersion);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
export const getVersionInfo = async () => {
  try {
    if (wx.getAppBaseInfo) {
      return wx.getAppBaseInfo().SDKVersion;
    } else {
      const ver = await getVersion();
      return ver;
    }
  } catch (error) {
    //
  }
};

//版本号比较
export const compareVersion = (v1, v2) => {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
};
