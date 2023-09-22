// 计算日历
import dayjs from "../../libs/util/dayjs";
export default {
  methods: {
    // 设置月份数据
    setMonth() {
      // 月初是周几
      const day = dayjs(this.date).date(1).day();
      const start = day == 0 ? 6 : day - 1;

      // 本月天数
      const days = dayjs(this.date).endOf("month").format("D");

      // 上个月天数
      const prevDays = dayjs(this.date)
        .endOf("month")
        .subtract(1, "month")
        .format("D");

      // 日期数据
      const arr = [];
      // 清空表格
      this.month = [];

      // 添加上月数据
      arr.push(
        ...new Array(start).fill(1).map((e, i) => {
          const day = prevDays - start + i + 1;

          return {
            value: day,
            disabled: true,
            date: dayjs(this.date)
              .subtract(1, "month")
              .date(day)
              .format("YYYY-MM-DD"),
          };
        })
      );

      // 添加本月数据
      arr.push(
        ...new Array(days - 0).fill(1).map((e, i) => {
          const day = i + 1;

          return {
            value: day,
            date: dayjs(this.date).date(day).format("YYYY-MM-DD"),
          };
        })
      );

      // 添加下个月
      arr.push(
        ...new Array(42 - days - start).fill(1).map((e, i) => {
          const day = i + 1;

          return {
            value: day,
            disabled: true,
            date: dayjs(this.date)
              .add(1, "month")
              .date(day)
              .format("YYYY-MM-DD"),
          };
        })
      );

      // 分割数组
      for (let n = 0; n < arr.length; n += 7) {
        this.month.push(
          arr.slice(n, n + 7).map((e, i) => {
            e.index = i + n;

            // 自定义信息
            const custom = this.customList.find((c) => c.date == e.date);

            // 农历
            if (this.lunar) {
              const { IDayCn, IMonthCn } = this.getLunar(e.date);
              e.lunar = IDayCn == "初一" ? IMonthCn : IDayCn;
            }

            return {
              ...e,
              ...custom,
            };
          })
        );
      }
    },
  },
};
// 判断周几disabled
export const isWeekDisabled = (curWeek, testWeek) => {
  if (!testWeek || testWeek.length == 0) return false;
  if (testWeek.indexOf(curWeek) > -1) {
    return false;
  } else {
    return true;
  }
};
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
/**
 *@name 判断时间是否相同
 * @param {时间1} time1
 * @param {时间2} time2
 * @returns
 */
export const daySame = (time1, time2) => {
  return dayjs(time1).isSame(dayjs(time2), "day");
};
