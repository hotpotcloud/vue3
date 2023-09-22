/**
 * 时间格式化
 * @param {String} time
 * @param {String} cFormat
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) return ''
  /* 修复IOS系统上面的时间不兼容*/
  if (time.toString().indexOf('-') > 0) {
    time = time.replace(/-/g, '/')
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = Object.prototype.toString.call(source) === "[object Array]" ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
/**
  * 补零
  */
function addZero(num) {
  const zero = ~~num;
  return zero < 10 ? ('0' + zero) : zero;
};
//计算当前月份前后半年
export function aroundTime(num = 6, val = new Date().getMonth() + 1) {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const mon = val;
  let array = [];
  let nextArr = [];
  let before = mon;
  let beforeY = year;
  let next = mon;
  let nextY = year;
  for (let i = 0; i < num; i++) {
    before = before - 1;
    next = next + 1;
    if (before <= 0) {
      before = 12;
      beforeY = beforeY - 1;
    }
    if (next > 12) {
      next = 1;
      nextY = nextY + 1;
    }

    array.push({
      month: before,
      year: beforeY,
      date: beforeY + '-' + addZero(before) + '-' + '01'
    });
    nextArr.push({
      month: next,
      year: nextY,
      date: nextY + '-' + addZero(next) + '-' + '01'

    });
  }
  nextArr.unshift({
    month: mon,
    year: year,
    date: year + '-' + addZero(mon) + '-' + '01'
  });
  array = array.reverse().concat(nextArr);
  console.log('array', array)
  return array;
};