<template>
  <!-- 11.01鲜活日记配送日历 -->
  <view class="calendar-out">
    <view class="main">
      <view class="main-name">{{ ym }}</view>
      <view class="main-date">
        <!-- 周一至周日 -->
        <view class="week d-flex d-sb">
          <view
            class="weekday"
            v-for="(item, index) in weekList"
            :key="index"
            >{{ item }}</view
          >
        </view>
        <!-- 小日子 -->
        <view class="month d-flex-warp">
          <!-- 上月占位 -->
          <view v-for="i in beforeDay" :key="i" class="month-day month-nomal">{{
            i
          }}</view>
          <view
            @tap="clickDay(index, i)"
            v-for="(i, index) in daylist"
            :key="index"
            class="month-day d-flex-colum"
            :class="[
              i.deliveryCalendarStatus === TWORuleEnum.WAIT_DELIVERY
                ? 'month-day-active'
                : i.deliveryCalendarStatus === TWORuleEnum.DELIVERING
                ? 'month-day-active'
                : i.deliveryCalendarStatus === TWORuleEnum.FINISHED
                ? 'month-day-before'
                : i.deliveryCalendarStatus === TWORuleEnum.DISCONTINUED
                ? 'month-day-stop'
                : '',
            ]"
          >
            <!-- 配送数量 -->
            <view
              class="day-goods"
              :class="[
                i.deliveryCalendarStatus === TWORuleEnum.WAIT_DELIVERY
                  ? 'day-goods-active'
                  : i.deliveryCalendarStatus === TWORuleEnum.DELIVERING
                  ? 'day-goods-active'
                  : i.deliveryCalendarStatus === TWORuleEnum.FINISHED
                  ? 'day-goods-before'
                  : i.deliveryCalendarStatus === TWORuleEnum.DISCONTINUED
                  ? 'day-goods-stop'
                  : '',
              ]"
              >{{ i.qty }}</view
            >
            <!-- 当前日子 -->
            <view
              class="day"
              :class="[
                i.deliveryCalendarStatus === TWORuleEnum.WAIT_DELIVERY
                  ? 'day-active'
                  : i.deliveryCalendarStatus === TWORuleEnum.DELIVERING
                  ? 'day-active'
                  : i.deliveryCalendarStatus === TWORuleEnum.FINISHED
                  ? 'day-before'
                  : i.deliveryCalendarStatus === TWORuleEnum.DISCONTINUED
                  ? 'day-stop'
                  : '',
              ]"
              >{{ i.id }}</view
            >
            <!-- 配送状态 -->
            <view
              class="day-status"
              :class="[
                i.deliveryCalendarStatus === TWORuleEnum.WAIT_DELIVERY
                  ? 'day-status-active'
                  : i.deliveryCalendarStatus === TWORuleEnum.DELIVERING
                  ? 'day-status-active'
                  : i.deliveryCalendarStatus === TWORuleEnum.FINISHED
                  ? 'day-status-before'
                  : i.deliveryCalendarStatus === TWORuleEnum.DISCONTINUED
                  ? 'day-status-stop'
                  : '',
              ]"
            >
              {{ i.deliveryCalendarStatusName }}
            </view>
          </view>
          <view
            v-for="next in nextDay"
            :key="next"
            class="month-day month-nomal"
            >{{ next + 1 }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { monthDay } from "../../../../components/h-calendar/date";
import { TWORuleEnum, TWORuleEnumText } from "@/utils/enum";
export default Vue.extend({
  name: "Hmonth",
  props: {
    //传入年月，默认当前
    ym: {
      type: String,
      default: "",
    },
    // 配送数据
    val: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      TWORuleEnum,
      TWORuleEnumText,
      weekList: ["日", "一", "二", "三", "四", "五", "六"],
      // 当前年月
      yy: this.ym.split("/")[0],
      mm: this.ym.split("/")[1],
      //天数数据
      dayData: {},
    };
  },
  created() {
    // console.log("this.ym2", this.ym.split("/"));
    const ar = this.ym.split("/");
    this.yy = ar[0];
    this.mm = ar[1];
    this.dayData = monthDay(ar[0], ar[1]);
  },
  computed: {
    // 上月号数占位
    beforeDay() {
      let i = 0;
      const last = [];
      for (i; i < this.dayData.firstWeek; i++) {
        last.push(this.dayData.lastDay - i);
      }
      return last.reverse();
    },
    // 下月天数
    nextDay() {
      let add = 42 - (this.dayData.firstWeek + this.dayData.currentDay);
      return add;
    },
    //当前月天数
    daylist() {
      const howDay = monthDay(this.yy, this.mm); //计算天数
      //天天送
      if (this.val.length === howDay.currentDay) {
        this.val.map((el: any, index: number) => {
          // const id = el.date.split("-")[2];
          el.id = index;
          return el;
        });
        return this.val;
      }
      //非天天送
      let i = 0;
      let num = 1;
      let arr = [];
      for (i; i < howDay.currentDay; i++) {
        arr.push({
          deliveryCount: 0, //每次配送
          deliveryDate:
            this.yy +
            "-" +
            this.formatNum(this.mm) +
            "-" +
            this.formatNum(`${num++}`), //配送日期
          id: num - 1,
        });
      }
      return this.reduceArr(arr, this.val);
    },
  },
  methods: {
    /**
     * 点击当前天
     */
    clickDay(i: any, val: any) {
      this.reduceArr(this.daylist, this.val);
      // console.log("index", i, val);
    },
    //补零
    formatNum(num: string | number) {
      let res = Number(num);
      return res < 10 ? "0" + res : res;
    },
    /**
     * 融合去重
     * @param a 当前月份总数组
     * @param b 传入有数据的数组
     */
    reduceArr(a: any[], b: any[]) {
      // 新增日期递增id
      const arr = b.map((item: any) => {
        let id = item.date.split("-")[2];
        item.id = +id;
        return item;
      });
      let newArr = [...arr, ...a];
      let i = 0;
      let e = null;
      // 去重
      for (i; i < newArr.length; i++) {
        for (e = i + 1; e < newArr.length; e++) {
          if (newArr[i].id === newArr[e].id) {
            newArr.splice(e, 1);
            e--;
          }
        }
      }
      // 排序
      newArr.sort((c, d) => {
        return c.id - d.id;
      });
      return newArr;
    },
  },
});
</script>

<style scoped lang="scss">
.calendar-out {
  padding: 0 32rpx;
  height: 844rpx; //日历总高
  margin: 32rpx 0;
  .main {
    .main-name {
      font-size: 34rpx;
      height: 48rpx;
      text-indent: 16rpx;
      margin-bottom: 16rpx;
      color: #333;
      line-height: 40rpx;
      font-weight: bold;
    }

    .main-date {
      background: #fff;
      padding: 32rpx 0rpx;
      border-radius: 40rpx;
      margin: 0 auto;
      width: 100%;
      // min-height: 670rpx;
      height: 780rpx;
      .week {
        padding: 0 20rpx;
        .weekday {
          text-align: center;
          flex: 1;
          color: #333;
          font-weight: bold;
          font-size: 26rpx;
        }
      }

      .month {
        padding: 0 9rpx;
        margin-top: 32rpx;
        padding-left: 12rpx;

        .month-day {
          width: 82rpx;
          height: 98rpx;
          border-radius: 16rpx;
          margin: 0 6rpx 12rpx;
          text-align: center;
          font-weight: normal;

          &.month-nomal {
            line-height: 98rpx;
            color: #c7c7c7;
            font-size: 30rpx;
          }
          &.month-day-active {
            //配送中
            background: #1d9bdc;
          }
          &.month-day-stop {
            background: #ffcd5f;
          }
          &.month-day-before {
            background: #e4f4ff;
          }
          .day-goods {
            color: #fff;
            font-size: 18rpx;
            width: 30rpx;
            height: 30rpx;
            border-radius: 40rpx;
            background: #fff;
            line-height: 28rpx;
            margin-left: 48rpx;
            margin-right: 8rpx;
            margin-top: 5rpx;
            &.day-goods-stop {
              //退订
              color: #ffcd5f;
            }
            &.day-goods-active {
              color: #1d9bdc;
            }
            &.day-goods-before {
              color: #1d9bdc;
            }
          }
          .day {
            //正常
            color: #999;
            font-size: 30rpx;
            &.day-before {
              //已完成
              color: #1d9bdc;
              font-weight: bold;
            }
            &.day-active {
              //待配送
              color: #fff;
              font-weight: bold;
            }
            &.day-stop {
              //退订
              color: #fff;
              font-weight: bold;
            }
          }
          .day-status {
            //配送中
            color: transparent;
            font-size: 18rpx;
            padding-bottom: 4rpx;
            font-weight: bold;
            &.day-status-before {
              //已完成
              color: #1d9bdc;
            }
            &.day-status-stop {
              //退订
              color: #fff;
            }
            &.day-status-active {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
