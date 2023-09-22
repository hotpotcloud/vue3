import dayjs from "../../../../libs/util/dayjs.js";

export const dateSame = (date1, date2) => {
  // const ff = dayjs(date1).isSame(dayjs(date2));
  // console.log("dayjs(date1).isSame(dayjs(date2)", ff);
  return dayjs(date1).isSame(dayjs(date2));
};
/**
 * 时间格式化
 * @param {String} time
 * @param {String} cFormat
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  if (!time) return "";
  /* 修复IOS系统上面的时间不兼容*/
  if (time.toString().indexOf("-") > 0) {
    time = time.replace(/-/g, "/");
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj =
    Object.prototype.toString.call(source) === "[object Array]" ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * 转换年月
 * @returns YY-MM
 * @type CH-中文格式 EN-英文格式---默认中文
 */
export const getFormatMonth = (time, type = "CH") => {
  const now = new Date();
  const nowYY = now.getFullYear();
  const ymd = new Date(time);
  const mm =
    ymd.getMonth() + 1 >= 10 ? ymd.getMonth() + 1 : "0" + (ymd.getMonth() + 1);
  const yy = ymd.getFullYear();
  const flag = nowYY === yy;
  if (type === "CH") {
    return flag ? mm + "月" : yy + "年" + mm + "月";
  }
  return flag ? mm + "月" : yy + "-" + mm;
};
