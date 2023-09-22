/*
 * @Date: 2022-08-03 10:19:16
 * @LastEditors: ''
 * @LastEditTime: 2022-08-19 10:05:13
 */
// 中国标准时间format yyyy-mm-dd
const format = (time: Date) => {
    let ymd = ''
    let mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))
    let day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate())
    ymd += time.getFullYear() + '-' // 获取年份。
    ymd += mouth + '-' // 获取月份。
    ymd += day // 获取日。
    return ymd // 返回日期。
}
// 中国标准时间format yyyy-mm-dd
export const getAllDate = (start: any, end: any) => {
    // console.log(567);
    let dateArr = []
    let startArr = start.split('-')
    let endArr = end.split('-')
    let db = new Date()
    db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2])
    let de = new Date()
    de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2])
    let unixDb = db.getTime()
    let unixDe = de.getTime()
    let stamp
    const oneDay = 24 * 60 * 60 * 1000;
    for (stamp = unixDb; stamp <= unixDe;) {
        dateArr.push(format(new Date(parseInt(stamp))))
        stamp = stamp + oneDay
    }
    return dateArr
};
const formatNum = (num: string | number) => {
    let res = Number(num);
    return res < 10 ? "0" + res : res;
};
/**
 * 获取当前月份数据
 * @param y 年份
 * @param month 月份
 * @returns 
 */
export const monthDay = (y: number, month: number) => {
    let dates = null;
    let m = Number(month);
    let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 第一天星期几
    let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当前总天数
    let lastDayOfLastMonth = new Date(y, m - 1, 0).getDate(); // 上一月的总天数
    let nextDayOfMonth = new Date(y, m + 1, 0).getDate()//下一月总天数

    return dates = {
        currentDay: lastDateOfMonth,//当前天
        firstWeek: firstDayOfMonth,
        lastDay: lastDayOfLastMonth,
        nextDay: nextDayOfMonth,
    };
};
// 获取今日年月份数组
export const getToday = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year+'-'+(month>9?month:'0'+month)+'-'+(day>9?day:'0'+day);
    return [year, month, day];
};



// const Utils = {
//     /**
//      * 是否为闫年
//      * @return {Boolse} true|false
//      */
//     isLeapYear: function(y: number): boolean {
//       return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
//     },
  
//     /**
//      * 返回星期数
//      * @return {String}
//      */
//     getWhatDay: function(year: number, month: number, day: number): string {
//       const date = new Date(year + '/' + month + '/' + day);
//       const index = date.getDay();
//       const dayNames = [
//         '日',
//         '一',
//         '二',
//         '三',
//         '四',
//         '五',
//         '六'
//       ];
//       return dayNames[index];
//     },
  
//     /**
//      * 返回星期数
//      * @return {Number}
//      */
//     getMonthPreDay: function(year: number, month: number): number {
//       const date = new Date(year + '/' + month + '/01');
//       let day = date.getDay();
//       if (day == 0) {
//         day = 7;
//       }
//       return day;
//     },
  
//     /**
//      * 返回月份天数
//      * @return {Number}
//      */
//     getMonthDays: function(year: string, month: string): number {
//       if (/^0/.test(month)) {
//         month = month.split('')[1];
//       }
//       return ([
//         0,
//         31,
//         this.isLeapYear(Number(year)) ? 29 : 28,
//         31,
//         30,
//         31,
//         30,
//         31,
//         31,
//         30,
//         31,
//         30,
//         31
//       ] as number[])[month as any];
//     },
  
//     /**
//      * 补齐数字位数
//      * @return {string}
//      */
//     getNumTwoBit: function(n: number): string {
//       n = Number(n);
//       return (n > 9 ? '' : '0') + n;
//     },
  
//     /**
//      * 日期对象转成字符串
//      * @return {string}
//      */
//     date2Str: function(date: Date, split?: string): string {
//       split = split || '-';
//       const y = date.getFullYear();
//       const m = this.getNumTwoBit(date.getMonth() + 1);
//       const d = this.getNumTwoBit(date.getDate());
//       return [y, m, d].join(split);
//     },
  
//     /**
//      * 返回日期格式字符串
//      * @param {Number} 0返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
//      * @return {string} '2014-12-31'
//      */
//     getDay: function(i: number): string {
//       i = i || 0;
//       let date = new Date();
//       const diff = i * (1000 * 60 * 60 * 24);
//       date = new Date(date.getTime() + diff);
//       return this.date2Str(date);
//     },
  
//     /**
//      * 时间比较
//      * @return {Boolean}
//      */
//     compareDate: function(date1: string, date2: string): boolean {
//       const startTime = new Date(date1.replace('-', '/').replace('-', '/'));
//       const endTime = new Date(date2.replace('-', '/').replace('-', '/'));
//       if (startTime >= endTime) {
//         return false;
//       }
//       return true;
//     },
  
//     /**
//      * 时间是否相等
//      * @return {Boolean}
//      */
//     isEqual: function(date1: string, date2: string): boolean {
//       const startTime = new Date(date1).getTime();
//       const endTime = new Date(date2).getTime();
//       if (startTime == endTime) {
//         return true;
//       }
//       return false;
//     }
//   };
  
//   export default Utils;
  
