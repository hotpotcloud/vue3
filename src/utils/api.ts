import { modtext, optionToast, RequestOptions } from "../types/requstApi";
import { getUser } from "./url";
import { Global_Cog } from "@/utils/config";
// 地址
const http = process.env.VUE_APP_BASE;
// const miniId = process.env.VUE_APP_ID;
// const http = Global_Cog.BASE_URL;
const miniId = Global_Cog.APPID;

// 提示弹出
const modal = (pramas: modtext) => {
  uni.showModal({
    title: pramas.title || "提示",
    content: pramas.content,
    showCancel: pramas.showCancel || false,
    cancelColor: pramas.cancelColor || "#555",
    confirmColor: pramas.confirmColor || "#e41f19",
    confirmText: pramas.confirmText || "确定",
    cancelText: pramas.cancelText || "取消",
    success(res) {
      if (res.confirm) {
        pramas.callback && pramas.callback(true);
      } else {
        pramas.callback && pramas.callback(false);
      }
    },
  });
};
// 提示
const toast = (option: optionToast) => {
  return new Promise((resolve, reject) => {
    return wx.showToast({
      title: option.title,
      icon: option.icon || "none",
      duration: option.duration || 3500,
      noConflict: true,
    });
  });
};

const tologin = () => {
  // 阻止多次跳转
  if (!uni.getStorageSync("isGotoLogin")) {
    uni.setStorageSync("isGotoLogin", true);
    uni.navigateTo({
      url: "/pages/user/relogin",
    });
  }
  // return false
};
/**
 * request封装
 */
export const request = (
  parmas: RequestOptions,
  text?: string,
  show?: boolean
) => {
  return new Promise((resolve, reject) => {
    if (show) {
      uni.showLoading({
        title: text ? text : "加载中...",
      });
    }
    const token = uni.getStorageSync("malltoken");
    const companyId = uni.getStorageSync("companyId");
    let httpUrl = http;
    // 判断是否是小优
    if (parmas.isXiaoyou === true) {
      httpUrl = http.replace("/mall", "/app-distribution");
    }

    // 请求参数
    const RequestOption: UniApp.RequestOptions = {
      url: httpUrl + parmas.url,
      header: {
        appId: miniId,
        satoken: token,
        companyId,
      },
      method: parmas.method || "GET",
      data: parmas.data || "",
    };
    uni.request({
      ...RequestOption,
      timeout: 12000,
      success: async (res: any) => {
        if (res.statusCode === 200) {
          if (res.data.code == "00000") {
            resolve(res.data);
          } else {
            // token过期
            if (res.data.code == 401) {
              if (!token) return;
              const res: any = await $get(getUser.refresh, { token }); //刷新token
              let oldrequest: any = null;
              if (res.code === "00000") {
                uni.removeStorageSync("malltoken");
                uni.setStorageSync("malltoken", res.data);
                oldrequest = await request(parmas);
                return resolve(oldrequest);
              } else {
                reject(res.msg);
              }
            } else if (res.data.code == 108) {
              uni.removeStorageSync("malltoken");
              uni.removeStorageSync("userMsg");
              console.log(parmas, res.data, "parmas");
              tologin();
              return resolve(res.data);
            } else {
              await toast({
                title: res.data.msg,
                duration: 2000,
              });
              reject(res.data);
              if (parmas.data?.showToast === false) {
                return;
              }
              console.log("res---接口错误", res, parmas.url);
              return;
            }
          }
        } else {
          reject(res.data);
          return toast({
            // title: `${res.data.status}：${res.data.error}`,
            title: "系统错误，请稍后重试",
            duration: 3000,
          });
        }
      },
      fail(err) {
        // toast({ title: '网络不给力~' });
        console.error("err-fail-api接口", err);
        if (err.errMsg == "request:fail timeout") {
          toast({ title: "请求超时,请稍后重试" });
        }
        return reject(err);
      },
      complete() {
        if (show) {
          return wx.hideLoading({ noConflict: true });
        }
      },
    });
  });
};
// 文件上传
const uploadFile = (src: string) => {
  const token = uni.getStorageSync("malltoken")
    ? uni.getStorageSync("malltoken")
    : "";
  uni.showLoading({
    title: "请稍候...",
  });
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: http + "/mall/uploadImage", //固定url
      filePath: src,
      name: "file",
      header: {
        "content-type": "multipart/form-data",
        satoken: token,
      },
      success(result) {
        uni.hideLoading();
        if (result.statusCode === 200) {
          const res = JSON.parse(result.data);
          if (res.code === "00000") {
            resolve(res);
          } else {
            toast({
              title: res.msg,
              icon: "none",
            });
            reject(res);
          }
        } else {
          uni.showToast({
            title: `网络出错: ${result.statusCode}`,
            icon: "none",
          });
          reject(result.data);
          //   console.log(`网络出错： -> ${result.data.status}`)
        }
      },
      fail(res) {
        // toast({
        //     title: "网络不给力",
        //     duration: 2000,
        //     icon: 'none',
        // })
        reject(res);
      },
    });
  });
};

// get
const $get = (url: string, data = {}, text?: string, show?: boolean) => {
  return request({ url, data }, text, show);
};
const $getX = (url: string, data?: any, text?: string, show?: boolean) => {
  return request({ url, data, isXiaoyou: true }, text, show);
};
const $postX = (url: string, data?: any, text?: string, show?: boolean) => {
  return request(
    {
      url,
      data,
      method: "POST",
      isXiaoyou: true,
    },
    text,
    (show = text ? true : false)
  );
};
//post
const $post = (url: string, data: any, text?: string, show?: boolean) => {
  return request(
    {
      url,
      data,
      method: "POST",
    },
    text,
    (show = text ? true : false)
  );
};
const $put = (url: string, data: any, text?: string, show?: boolean) => {
  return request(
    {
      url,
      data,
      method: "PUT",
    },
    text,
    (show = text ? true : false)
  );
};

export default {
  $get,
  $post,
  $put,
  uploadFile,
  modal,
  toast,
  $getX,
  $postX,
};
