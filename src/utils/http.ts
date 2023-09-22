import {modtext, optionToast, RequestOptions} from "../types/requstApi";
import {getUser} from "./url";
import {Global_Cog} from "@/utils/config";
// 地址
// const miniId = process.env.VUE_APP_ID;
const http = process.env.VUE_APP_BASE;
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
    return uni.showToast({
      title: option?.title,
      icon: option?.icon || "none",
      duration: option?.duration || 3500,
    });
  });
};

const tologin = () => {
  uni.navigateTo({
    url: "/pages/user/relogin",
  });
  // return false
};
// 小优使用request
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

    const companyId = uni.getStorageSync("companyId");
    let httpUrl = http;
    // 判断是否是小优
    if (parmas.isXiaoyou === true) {
      httpUrl = http.replace("/mall", "");
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
      timeout: 6000,
      success: async (res: any) => {
        if (res.statusCode === 200) {
          if (res.data.code == "00000") {
            resolve(res.data);
          } else {
            console.log("res---接口抛错", res, parmas.data, parmas.url);
            // token过期
            if (res.data.code == 401) {
              const res: any = await GET(getUser.refresh, {
                token: uni.getStorageSync("malltoken"),
              });
              console.log("重新登陆", res);
              let oldrequest: any = null;
              if (res.code === "00000") {
                uni.removeStorageSync("malltoken");
                uni.setStorageSync("malltoken", res.data);
                oldrequest = await request(parmas);
              }
              return resolve(oldrequest);
            } else if (res.data.code == 108) {
              uni.removeStorageSync("malltoken");
              uni.removeStorageSync("userMsg");
              tologin();
              // console.log("108重新登陆");
              return resolve(res.data);
            } else {
              reject(res.data);

              return await toast({
                title: res.data.msg,
                // title: "系统错误，请稍后重试",
              });
            }
          }
        } else {
          reject(res.data);
          return await toast({
            // title: `${res.data.status}：${res.data.error}`,
            title: "系统错误，请稍后重试",
            duration: 3000,
          });
        }
      },
      fail(err) {
        // toast({ title: '网络不给力~' });
        console.log("err-api失败", err);
        return reject(err);
      },
      complete() {
        if (show) {
          return wx.hideLoading({noConflict: true});
        }
      },
    });
    // if (show) {
    //   return uni.hideLoading();
    // }
  });
};
// 文件上传
export const UPLOADFILE = (src: string) => {
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
            uni.showToast({
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
        uni.showToast({
          title: "网络不给力",
          duration: 2000,
          icon: "none",
        });
        reject(res);
      },
    });
  });
};

// get
export const GET = (url: string, data = {}, text?: string, show?: boolean) => {
  return request({url, data}, text, show);
};
//post
export const POST = (url: string, data: any, text?: string, show?: boolean) => {
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

//put
export const PUT = (url: string, data: any, text?: string) => {
  return request(
    {
      url,
      data,
      method: "PUT",
    },
    text
  );
};
//del
export const DELETE = (url: string, data: any, text?: string) => {
  // return request(
  //     { url, data },text
  // );
  return request(
    {
      url,
      data,
      method: "DELETE",
    },
    text
  );
};

// export default {
//     $get,
//     $post,
//     uploadFile,
//     modal,
//     toast,
// }
