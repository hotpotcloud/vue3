import { modtext, optionToast, RequestOptions } from "../types/requstApi";
import { getUser } from "./url";
// 地址
const http = process.env.VUE_APP_BASE;
const miniId = process.env.VUE_APP_ID;
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
    uni.showToast({
      title: option.title,
      icon: option.icon || "none",
      duration: option.duration || 2000,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
  // uni.showToast({
  //   title: option.title,
  //   icon: option.icon || "none",
  //   duration: option.duration || 3500,
  // });
};

const tologin = () => {
  uni.navigateTo({
    url: "/pages/user/relogin",
  });
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
        title: text,
      });
    }

    const token = uni.getStorageSync("malltoken");
    // ? uni.getStorageSync('token') :
    // (tologin());

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
        // appId: uni.getAccountInfoSync().miniProgram.appId,
        appId: miniId,
        satoken: token,
        companyId,
      },
      method: parmas.method || "GET",
      data: parmas.data || "",
    };
    uni.request({
      ...RequestOption,
      timeout: 60000,
      success: async (res: any) => {
        if (res.statusCode === 200) {
          if (res.data.code == "00000") {
            resolve(res.data);
          } else {
            // toast({
            //     title: res.data.msg,
            //     duration: 2500,
            // })
            // token过期
            if (res.data.code == 401) {
              // 静默TOKEN
              const res: any = await $get(
                getUser.refresh,
                // { token: uni.getStorageSync("malltoken") },
                { token: token },
                "",
                false
              );
              console.log("重新登陆", res);
              let oldrequest: any = null;
              if (res.code === "00000") {
                uni.removeStorageSync("malltoken");
                uni.setStorageSync("malltoken", res.data);
                oldrequest = await request(parmas);

                console.log("重新请求", oldrequest);
              }
              resolve(oldrequest);
              return;
            }
            if (res.data.code == 108) {
              tologin();
              // const lastrequest = await request(parmas);
              resolve(res.data);
              console.log("108重新登陆");
            }
            toast({
              title: res.data.msg,
              duration: 3500,
            });
            reject(res.data);
            return;
          }
        } else {
          toast({
            title: `${res.data.status}：${res.data.error}`,
            duration: 3000,
          });
          reject(res.data);
          return;
        }
      },
      fail(err) {
        // toast({ title: '网络不给力~' });
        reject(err);
      },
      complete() {
        if (show) {
          uni.hideLoading();
        }
        return;
      },
    });
  });
};
// 文件上传
const uploadFile = (src: string) => {
  const token = uni.getStorageSync("malltoken") ? uni.getStorageSync("malltoken") : "";
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
