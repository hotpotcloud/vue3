import bigjs from "big.js";
import dayjs from "../components/libs/util/dayjs.js";
import { isLogin } from "./commonMethod";
import {
  StatisticsTypeEnum,
  unlimitedStock,
  urltypeEnum,
  XiaoyouUrlType,
} from "./enum";
/**
 * @name 获取腾讯云对象储存-商品
 * @param {string} value --文件名.png/.jpg
 * @param {string} folder --文件夹路径名(eg:'page/icon/')
 */
type Folder = string | "";
export const getAssetImgUrl = function (value: string, folder: Folder = "") {
  if (value == null || value == undefined || value == "" || !value) {
    return "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/no-goods.png";
  }
  if (value.indexOf("http") > -1 || value.indexOf("https") > -1) {
    return value;
  }
  const base =
    "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/";
  return folder ? base + `${folder}/` : base + value;
};

/**
 * @name 获取腾讯云图片地址-小程序
 * @param value 图片路径
 * @returns 图片网络地址
 */
export const getTXimgUrl = (value: string) => {
  if (value == null || value == undefined || value == "" || !value) return;
  if (value && (value.indexOf("http") > -1 || value.indexOf("https") > -1)) {
    return value;
  }
  if (value) {
    return (
      "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/" +
      value
    );
  }
};
/* 除法 */
export const divMethod = (num1: number, num2: number) => {
  const num = new bigjs(num1);
  return num.div(num2);
};

/**
 * 金额转换和格式化金额
 * @param {number}  val 金额（单位为：分）
 * @return 格式化后的金额信息eg:100000 -> 1,000.00
 */
export const formatAmount = (val: number, needPrefix = true) => {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  if (!val) {
    return needPrefix ? "¥0.00" : "0.00";
  }
  let str = new bigjs(val).div(100).toFixed(2).toString();
  let int = str
    .substring(0, str.indexOf("."))
    .replace(/\B(?=(?:\d{3})+$)/g, ",");
  //取到整数部分
  let dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
  let res = int + dot;
  return `${needPrefix ? "¥" : ""}${res}`;
};
export const noformatAmount = (val: number, isEnd = false) => {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  if (!val) return "0.00";
  const str = new bigjs(val).div(100).toFixed(2).toString();
  const int = str.substring(0, str.indexOf("."));
  // .replace(/\B(?=(?:\d{3})+$)/g, ",");
  //取到整数部分
  const dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
  // console.log("str--金额", str, int, dot);
  if (dot === ".00" && isEnd) {
    return int;
  }
  // let res = int + dot;
  return `${int}${dot}`;
};
/**
 * 移除金额格式化
 * @param {val} 格式化后的金额
 * @return eg:1,000.00 -> 1000
 */
export const removeFormatAmount = (val: string) => {
  if (!val) return 0;
  return parseFloat(val.replace(/[^\d.-]/g, ""));
};
export const formatAmountFixed = (val: number, needPrefix = true) => {
  //金额转换 元 保留2位小数
  if (!val) {
    if (needPrefix) {
      return "¥0.00";
    }

    return "0.00";
  }
  let str = new bigjs(val).toFixed(2).toString();
  return needPrefix ? `¥${str}` : `${str}`;
};
export const formatAmountFixedTwo = (val: number, needPrefix = true) => {
  //金额转换 元 保留2位小数
  if (!val) {
    if (needPrefix) {
      return "¥0.0";
    }

    return "0.0";
  }
  let str = new bigjs(val).toFixed(2).toString();
  return needPrefix ? `¥${str}` : `${str}`;
};
// 封装的展示消息提示的方法
export const showMsg = (title = "", image = "", icon = "") => {
  uni.showToast({
    title,
    image,
    duration: 1500,
  });
};

/**
 * 数值计算 示例：funCalc([1.02,3.13,4.245])
 * @param {*} arrList 参数数组
 * @param {*} operator 操作符：1加法 2乘法
 * @param {*} precision 精度 默认2位
 */
export const funCalc = (arrList, operator = 1, precision = 2) => {
  if (arrList.length === 0) return 0;
  // 计算最大数度值,避免精度丢失，先扩大位数，再缩小
  let mPow = Math.pow(10, precision); // 默认2位小数
  let total = 0;
  if (operator == 2) {
    total = 1;
    mPow = 1;
  }
  for (const item of arrList) {
    let tem = 0;
    if (item) {
      tem = parseFloat(item) ?? 0; // parseFloat处理，转化失败时给0
      tem = !isNaN(tem) ? tem : 0; // 处理 NaN 情况
    }
    switch (operator) {
      case 1:
        total += tem * mPow;
        break;
      case 2:
        total *= tem * mPow;
        break;
      default:
        total += tem * mPow;
    }
  }
  // toFixed部分浏览器有问题，toFixed它是一个四舍六入五成双的诡异的方法(也叫银行家算法)，"四舍六入五成双"含义：对于位数很多的近似数，当有效位数确定后，其后面多余的数字应该舍去，只保留有效数字最末一位，这种修约（舍入）规则是“四舍六入五成双”，也即“4舍6入5凑偶”这里“四”是指≤4 时舍去，"六"是指≥6时进上，"五"指的是根据5后面的数字来定，当5后有数时，舍5入1；当5后无有效数字时，需要分两种情况来讲：①5前为奇数，舍5入1；②5前为偶数，舍5不进。（0是偶数）
  const res = (total / mPow).toFixed(precision);
  // // 修复toFixed
  // const res = parseInt(total + 0.5, 10) / times;
  return res;
};

let timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */

export function debounce(func, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow) typeof func === "function" && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === "function" && func();
    }, wait);
  }
}

export default debounce;
/**
 * 补零
 */
export function addZero(num: string | number) {
  const zero = ~~num;
  return zero < 10 ? "0" + zero : zero;
}
// 跳转路径
export function clickNav(val: any, fn?: Function) {
  const navTo = (path: string) => {
    uni.navigateTo({
      url: path,
    });
  };
  console.log(" 我进来了utils", val);
  // return
  let webUrl;
  if (val.url) {
    webUrl = val.url[0] !== "/" ? "/" + val.url : val.url;
  }
  switch (val.urlType) {
    case urltypeEnum.zero:
      if (!val.spuCode)
        return uni.showToast({ title: "没有spuCode", icon: "none" });
      navTo(`/subPages/product/proDetail?id=${val.spuCode}`);
      return;
    // 内部
    case urltypeEnum.one:
      uni.navigateTo({
        url: webUrl,
        fail: () => {
          uni.switchTab({
            url: webUrl,
            fail: () => {
              return uni.showToast({ title: "跳转失败", icon: "none" });
            },
          });
        },
      });
      return;

    // 外部
    case urltypeEnum.two:
      navTo("/pages/homepage/component/h-webview?url=" + val.url);
      return;

    // 直播间
    case urltypeEnum.three:
      navTo(webUrl);
      return;

    // 企业微信
    case urltypeEnum.four:
      console.log("22--其他", 22);
      fn();
      return;

    case urltypeEnum.five:
      // 在线客服
      return;
    case urltypeEnum.six:
      //静态图片
      navTo(`/pages/member/static?url=${val.url}`);
    default:
      return;
  }
}

// 计算倒计时剩余时间
export const countTime = (create, minute, now) => {
  const gap = now - create;
  // console.log(gap < minute, '000', gap, '99999999', minute)
  if (gap < minute) {
    let restTime = minute - gap;
    // console.log(restTime)
    return restTime;
  } else {
    return null;
  }
};
var imageConf = {
  dev: {
    albumBucketName: "nx-testvpc-dpbpdev",
    bucketRegion: "cn-northwest-1",
    accessKeyId: "AKIAQKEGZ6OO2RX7FJ2S",
    secretAccessKey: "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",
    domain: "amazonaws.com.cn",
  },
  // sit
  sit: {
    albumBucketName: "nx-testvpc-dpbpdev",
    bucketRegion: "cn-northwest-1",
    accessKeyId: "AKIAQKEGZ6OO2RX7FJ2S",
    secretAccessKey: "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",
    domain: "amazonaws.com.cn",
  },
  // uat
  uat: {
    albumBucketName: "nx-testvpc-dpbpdev",
    bucketRegion: "cn-northwest-1",
    accessKeyId: "AKIAQKEGZ6OO2RX7FJ2S",
    secretAccessKey: "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",
    domain: "amazonaws.com.cn",
  },
  // prod
  prod: {
    albumBucketName: "nx-prd-dpbp",
    bucketRegion: "cn-northwest-1",
    accessKeyId: "AKIAQKEGZ6OOUZBAZHMK",
    secretAccessKey: "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",
    domain: "amazonaws.com.cn",
  },
};
// 获取1.0图片地址
export const getImgUrl = (value: string) => {
  console.log("process.env ", process.env);
  const env = process.env.VUE_APP_MODE;
  if (!value) return;
  if (value && (value.indexOf("http") > -1 || value.indexOf("https") > -1)) {
    return value;
  }
  if (value) {
    var curConf = imageConf[env];
    var albumBucketName = curConf.albumBucketName;
    var bucketRegion = curConf.bucketRegion;
    var domain = curConf.domain;
    var name = value.slice(0, value.lastIndexOf("."));
    const a =
      "https://" +
      albumBucketName +
      ".s3." +
      bucketRegion +
      "." +
      domain +
      "/thumbnails-" +
      name +
      ".jpeg";
    console.log("a--->", a);
    return a;
  }
};

/**
 * 获取当前年月
 * @returns YY-MM
 */
export const getNowMonth = () => {
  const ymd = new Date();
  const mm =
    ymd.getMonth() + 1 >= 10 ? ymd.getMonth() + 1 : "0" + (ymd.getMonth() + 1);
  const yy = ymd.getFullYear();
  return yy + "-" + mm;
};
/**
 * 生成x月x日
 * @param value(YYYY-MM-dd)
 */
export const getMMDD = (value: string) => {
  const info = value.split("-");
  return info[1] + "月" + info[2] + "日";
};
// 生成年月日
export const strYMD = ({ year, month, day }, type: boolean = false) => {
  let ymd: string;
  if (!type) {
    ymd = [year, month, day].join("-");
  } else {
    ymd = `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    }`;
  }
  return ymd;
};

/**
 * 时间戳转换
 * @param format (YYYY-mm-dd HH:MM:SS)
 * @param num 时间戳
 * @returns YYYY-mm-dd HH:MM:SS
 */
export const formatTime = (format = "", num = new Date().getTime()) => {
  format = format || "YYYY-mm-dd HH:MM:SS";
  // let ret, date, renum;
  // if (typeof num == 'string') {
  //   num = parseInt(num)
  // }
  const date = new Date(num);

  const par = {
    Y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString(), // 月
    d: date.getDate().toString(), // 日
    H: date.getHours().toString(), // 时
    M: date.getMinutes().toString(), // 分
    S: date.getSeconds().toString(), // 秒
  };
  let ret:
      | RegExpExecArray
      | {
          [Symbol.replace](
            string: string,
            replaceValue: /**
             * 金额转换和格式化金额
             * @param {val} 金额（单位为：分）
             * @return 格式化后的金额信息eg:100000 -> 1,000.00
             */
            string
          ): string;
        }[],
    renum: string;
  for (var k in par) {
    ret = new RegExp("(" + k + "+)").exec(format);
    if (ret) {
      renum = ret[1].length == 1 ? par[k] : par[k].padStart(ret[1].length, "0"); //根据复数前面是否补零,如“mm”补零，单“m”前面不补零
      format = format.replace(ret[1], renum); //替换
    }
  }
  return format;
};

// //手机验证
// ValidatePhone: function (val){
//   var isPhone = /^1[3456789]\d{9}$/;//手机号码
//   var isMob= /^0?1[0-9][0-9]\d{8}$/;// 座机格式
//   if(isMob.test(val)||isPhone.test(val)){
//       return true;
//   }else{
//       return false;
//   }
// }
// //使用：
// setSubmit:function(value){
//   if(this.ValidatePhone(value) == false) {
//       console.log('手机号格式错误');
//   }
// }
//物流手机号提取
/**
 * @name 物流手机号提取
 * @param arr 物流数据[]
 * @returns 提取了手机号的数据
 */
export const sendPhone = (arr: any[]) => {
  // let noArr=[]
  if (arr) {
    const noArr = arr.map((ite) => {
      let list = ite.remark.split(/(1\d{10})/);
      let descList = [];
      for (let i in list) {
        // 判断是否是手机号
        let flag = list[i] != "" && /^(1\d{10})$/.test(list[i]);
        // 赋值
        list[i] != "" &&
          descList.push({
            type: flag ? "phone" : "text",
            words: list[i],
          });
      }
      ite.descList = descList;
      return ite;
    });
    return noArr;
  }
};

export const copyText = (e) => {
  wx.setClipboardData({
    data: e.currentTarget.dataset.text,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          uni.showToast({
            title: "复制成功",
          });
        },
      });
    },
  });
};
export const isPhoneX = () => {
  let isIphoneX = false;
  wx.getSystemInfo({
    success: (res) => {
      isIphoneX =
        res.model.indexOf("iPhone X") > -1 ||
        res.model.indexOf("iPhone 12") > -1 ||
        res.model.indexOf("iPhone 11") > -1 ||
        res.model.indexOf("unknown") > -1;
    },
  });
  return isIphoneX;
};

export const getTimeByStatisticsType = (type) => {
  console.log(type, dayjs(), "type");
  switch (type) {
    case StatisticsTypeEnum.TODAY:
      return {
        start: dayjs().format("YYYY-MM-DD"),
        end: dayjs().format("YYYY-MM-DD"),
      };
    case StatisticsTypeEnum.YESTERDAY:
      return {
        start: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
        end: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
      };
    case StatisticsTypeEnum.THIS_WEEK:
      return {
        start: dayjs().startOf("week").format("YYYY-MM-DD"),
        end: dayjs().endOf("week").format("YYYY-MM-DD"),
      };
    case StatisticsTypeEnum.THIS_MONTH:
      return {
        start: dayjs().startOf("month").format("YYYY-MM-DD"),
        end: dayjs().endOf("month").format("YYYY-MM-DD"),
      };
    case StatisticsTypeEnum.CUMULATIVE:
      return {
        start: dayjs("2021/02/27").format("YYYY-MM-DD"),
        end: dayjs().format("YYYY-MM-DD"),
      };
    default:
      return {
        start: dayjs("2021/02/27").format("YYYY-MM-DD"),
        end: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
  }
};

/* 小优跳转banner */
export const xiaoyouRoute = (val: any) => {
  const { urlType, spuId, redirectUrl } = val;
  switch (urlType) {
    case XiaoyouUrlType.ZERO:
      console.log("内部链接", urlType, val);
      uni.navigateTo({
        url: `/${redirectUrl}`,
        fail: () => {
          uni.switchTab({
            url: `/${redirectUrl}`,
            fail: () => {
              uni.showToast({
                title: "暂时无法跳转",
                icon: "error",
                // mask: true
              });
            },
          });
        },
      });
      return;
    case XiaoyouUrlType.ONE:
      console.log("外部链接-没有此功能", urlType);
      // uni.navigateTo({
      //   url:"/pages/homepage/component/h-webview?url=" + webUrl
      // })
      return;
    case XiaoyouUrlType.TWO:
      console.log("商品详情", urlType);
      uni.navigateTo({
        url: `/subPages/product/proDetail?id=${spuId}`,
      });
      return;
    case XiaoyouUrlType.THREE:
      console.log("促销活动-没有此功能", urlType);
      return;
    case XiaoyouUrlType.FOUR:
      console.log("静态图片", urlType);
      uni.navigateTo({
        url: "/xiaoyouPages/home/static",
      });
      return;
    case XiaoyouUrlType.FIVE:
      console.log("微页面-没有此功能", urlType);
      return;
    default:
      console.log("错误", urlType);
      return;
  }
  const objFn = {
    // XiaoyouUrlType.ZERO:
  };
};

/**
 * 将 base64 图片数据转本地图片
 * @param base64Data base64图片数据
 * @returns
 */
export const getBase64ImageInfo = (base64Data: string): Promise<string> => {
  const fs = wx.getFileSystemManager();

  return new Promise((resolve, reject) => {
    const [, format, bodyData] =
      /data:image\/(\w+);base64,(.*)/.exec(base64Data) || [];

    if (!format) {
      reject(new Error("ERROR_BASE64SRC_PARSE"));
    }

    const FILE_BASE_NAME = "tmp_base64src";
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = uni.base64ToArrayBuffer(bodyData);

    fs.writeFile({
      filePath,
      data: buffer,
      encoding: "binary",
      success: () => resolve(filePath),
      fail: () => reject(new Error("ERROR_BASE64SRC_WRITE")),
    });
  });
};

/**
 * 删除本地临时文件
 * @param filePath 临时图片地址
 * @returns
 */
export const removeTmpImage = (filePath: string): Promise<void> =>
  new Promise(() => {
    const fs = wx.getFileSystemManager();

    fs.unlink({
      filePath,
      success: (res) => console.log(res),
      fail: (e) => console.log(e),
    });
  });

// wx登录
export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 3500,
      success: (res) => {
        resolve(res.code);
      },
    });
  });
};
export const calcRule = (item, el) => {
  const { ruleName, deliveryTimeSectionName } = item;
  let obj = {
    name: ruleName,
    deliveryTime: deliveryTimeSectionName,
    everyNum: "",
  };
  if (el) {
    obj.everyNum = `${el.everyNum}${el.unitName}`;
  } else {
    obj.everyNum = `${item.everyNum}${item.unitName}`;
  }
  return obj;
};
//字段为空时，返回字符串
export const errorNull = (val: any) => {
  if (val === null || val === undefined || val === "") {
    return "暂无";
  } else {
    return val;
  }
};

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 使用表时间戳，在时间段开始的时候触发 2 使用表定时器，在时间段结束的时候触发
 */
export const throttle = (func, wait = 1000, type = 1) => {
  let previous = 0;
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
};

let timer, flag;
/**
 *在一定时间内，只能触发一次
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export const oneceFn = (func: () => void, wait = 500, immediate = true) => {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      flag = false;
      typeof func === "function" && func();
    }, wait);
  }
};

export const checkGoods = (count, maxCount, reserve) => {
  if (isLogin()) {
    if (count >= maxCount) {
      wx.showToast({
        title: "加购已达上限",
        icon: "none",
      });
      return false;
    }
    if ((reserve > count && count >= 0) || reserve === unlimitedStock) {
      return ++count;
    } else {
      wx.showToast({
        title: "库存不够啦，不能再加了~",
        icon: "none",
      });
      return false;
    }
  } else {
    return false;
  }
};

export const formatGoodsCount = (val) => {
  if (val <= 99) {
    return val;
  }
  return "99+";
};

/**
 *@name 判断时间是否相同
 * @param {时间1} time1
 * @param {时间2} time2
 * @returns
 */
export const daySame = (time1, time2) => {
  return dayjs(time1).isSame(dayjs(time2), "day");
};
