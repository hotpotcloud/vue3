<!--
 * @Date: 2022-08-03 11:09:54
 * @LastEditors: ''
 * @LastEditTime: 2022-08-15 16:13:24
-->
<template>
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
              i.deliveryCalendarStatus === RuleStatusEnumFC03.WAIT_DELIVERY
                ? 'month-day-active'
                : i.deliveryCalendarStatus === RuleStatusEnumFC03.FINISHED
                ? 'month-day-before'
                : i.deliveryCalendarStatus === RuleStatusEnumFC03.DISCONTINUED
                ? 'month-day-stop'
                : i.deliveryCalendarStatus === RuleStatusEnumFC03.DELIVERING
                ? 'month-day-sending'
                : '',
            ]"
          >
            <!-- 配送数量 -->
            <view
              class="day-goods"
              :class="[
                i.deliveryCalendarStatus === RuleStatusEnumFC03.WAIT_DELIVERY
                  ? 'day-goods-active'
                  : i.deliveryCalendarStatus === RuleStatusEnumFC03.FINISHED ||
                    i.deliveryCalendarStatus === RuleStatusEnumFC03.DELIVERING
                  ? 'day-goods-before'
                  : i.deliveryCalendarStatus === RuleStatusEnumFC03.DISCONTINUED
                  ? 'day-goods-stop'
                  : '',
              ]"
              >{{ i.qty }}</view
            >
            <!-- 当前日子 -->
            <view
              class="day"
              :class="[
                i.deliveryCalendarStatus === RuleStatusEnumFC03.WAIT_DELIVERY
                  ? 'day-active'
                  : i.deliveryCalendarStatus === RuleStatusEnumFC03.FINISHED ||
                    i.deliveryCalendarStatus === RuleStatusEnumFC03.DELIVERING
                  ? 'day-before'
                  : i.deliveryCalendarStatus === RuleStatusEnumFC03.DISCONTINUED
                  ? 'day-stop'
                  : '',
                getToday() === i.date &&
                  i.deliveryCalendarStatus === 'empty' &&
                  'day-today',
              ]"
              >{{ getToday() === i.date ? "今" : i.id }}</view
            >
            <!-- 配送状态 -->
            <view
              class="day-status"
              :class="[
                i.deliveryCalendarStatus === RuleStatusEnumFC03.WAIT_DELIVERY
                  ? 'day-status-active'
                  : i.deliveryCalendarStatus === RuleStatusEnumFC03.FINISHED ||
                    i.deliveryCalendarStatus === RuleStatusEnumFC03.DELIVERING
                  ? 'day-status-before'
                  : i.deliveryCalendarStatus === RuleStatusEnumFC03.DISCONTINUED
                  ? 'day-status-stop'
                  : '',
              ]"
            >
              <!-- {{ RuleStatusTextEnumFC03[i.deliveryCalendarStatus] }} -->
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
import { monthDay, getToday } from "@/components/h-calendar/date";
import {
  RuleStatusEnum,
  RuletextEnum,
  RuleStatusEnumFC03,
  RuleStatusTextEnumFC03,
} from "@/utils/enum";
export default Vue.extend({
  props: {
    //传入年月，默认当前
    ym: {
      type: String,
      default: "",
      // new Date().getFullYear() +
      // "/" +
      // (+new Date().getMonth() + 1 > 10
      //   ? +new Date().getMonth() + 1
      //   : "0" + (+new Date().getMonth() + 1)),
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
      RuleStatusEnum, //配送状态
      RuletextEnum, //状态枚举
      RuleStatusEnumFC03, //配送枚举状态-fc03
      RuleStatusTextEnumFC03, //状态-fc03
      weekList: ["日", "一", "二", "三", "四", "五", "六"],
      days: 0, //天数
      yy: this.ym.split("/")[0], //当前年
      mm: this.ym.split("/")[1], //当前月
      // dayData: {}, //计算各种天数（本月天，本月1号周几，上月天）
      activenum: 0,
      // dayData: {},
    };
  },
  created() {
    // const ar = this.ym.split("/");
    // console.log("ar", ar);
    // this.yy = ar[0];
    // this.mm = ar[1];
    // this.dayData = monthDay(ar[0], ar[1]);
  },
  computed: {
    dayData() {
      const ar = this.ym.split("/");
      this.yy = ar[0];
      this.mm = ar[1];
      return monthDay(ar[0], ar[1]);
    },
    // 上月号数占位
    beforeDay() {
      let i = 0;
      const last = [];
      for (i; i < this.dayData.firstWeek; i++) {
        last.push(this.dayData.lastDay - i);
      }
      return last.reverse();
    },
    // 下月号数占位
    nextDay() {
      // let i=0;
      let add = 42 - (this.dayData.firstWeek + this.dayData.currentDay);
      return add;
    },
    daylist() {
      const howDay = monthDay(this.yy, this.mm); //计算天数
      console.log("this.val---->日历传入数据", this.val);
      if (this.val.length === howDay.currentDay) {
        //天天送
        this.val.map((el: any) => {
          const id = el.date.split("-")[2];
          el.id = +id;
          return el;
        });
        return this.val;
      }
      let i = 0;
      let num = 1;
      let arr = [];
      for (i; i < howDay.currentDay; i++) {
        // arr.push({
        //   deliveryCount: 0, //每次配送
        //   deliveryDate:
        //     this.yy +
        //     "-" +
        //     this.formatNum(this.mm) +
        //     "-" +
        //     this.formatNum(`${num++}`), //配送日期
        //   deliveryCalendarStatus: "empty", //配送状态
        //   id: num - 1,
        // });
        arr.push({
          qty: 0, //每次配送
          date:
            this.yy +
            "-" +
            this.formatNum(this.mm) +
            "-" +
            this.formatNum(`${num++}`), //配送日期
          deliveryCalendarStatus: "empty", //配送状态
          id: num - 1,
        });
      }
      return this.reduceArr(arr, this.val);
    },
  },
  methods: {
    getToday,
    formatNum(num: string | number) {
      let res = Number(num);
      return res < 10 ? "0" + res : res;
    },
    /**
     * 点击当前天
     */
    clickDay(i: any, val: any) {
      this.reduceArr(this.daylist, this.val);
      // console.log("index", i, val);
    },
    /**
     * 融合去重
     * @param a 当前月份总数组
     * @param b 传入有数据的数组
     */
    reduceArr(a: any[], b: any[]) {
      // 获取当前年月日
      const arrToday = getToday();
      // 新增日期递增id
      const arr = b.map((item: any) => {
        // let id = item.deliveryDate.split("-")[2];
        const id = item.date.split("-");
        console.log("id", id);
        item.id = +id[2];
        return item;
      });
      let newArr = [...arr, ...a];
      let i = 0;
      let e = null;
      // 去重
      for (i; i < newArr.length; i++) {
        const timearr = newArr[i].date.split("-");
        for (e = i + 1; e < newArr.length; e++) {
          // && newArr[i].deliveryCount !== 0
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
      // console.log("newArr---", newArr);
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
          height: 102rpx;
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
          &.month-day-sending {
            @extend .month-day-before;
            border: 1rpx solid #8bd0ff;
            // box-sizing: border-box;
            padding: 2rpx;
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
            &.day-today {
              color: #1d9bdc !important;
              // font-weight: bold;
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
