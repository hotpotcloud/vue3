
<template>
  <!-- 调整日记 -->
  <view class="resize-out">
    <view class="date-top">
      <view class="top-one-btn">
        <view class="top-tips">停送/恢复方式</view>
        <view class="top-btns">
          <view
            :class="[
              'btn-one',
              'flex-1',
              clickModal === 'multiple' && 'btn-active',
            ]"
            @tap="clickModeType('multiple')"
            >单点</view
          >
          <view
            :class="[
              'btn-one',
              'flex-1',
              clickModal === 'range' && 'btn-active',
            ]"
            @tap="clickModeType('range')"
            >连续</view
          >
        </view>
      </view>
      <view class="top-two-tips">
        点击日历数字可进行停送，停送后整体配送计划将往后顺延
      </view>
    </view>
    <view class="calendar_cont">
      <view class="date-list">
        <h-app-date
          :title="endDate"
          :mode="clickModal"
          :activeColor="activeColor"
          :rangeBgColor="rangeBgColor"
          :endText="endText"
          :startText="startText"
          :multipleText="multipleText"
          :res="resizeDateList.calenderList"
          :defaultDate="cacheSelectDate"
          :clickAble="clickAble"
          @onClickDay="onClickDay"
          @onChangePage="onChangePage"
        >
        </h-app-date>
      </view>
    </view>
    <!-- 停送/恢复列表 -->
    <view class="list-reszie" v-if="Object.keys(goodsInfoObj).length">
      <view class="goods-list">
        <view class="list-tips">确认{{ multipleText }}商品</view>
        <view v-for="(val, i) in goodsInfoObj" :key="i" class="item-goods">
          <Resize :item="val" :text="multipleText" />
        </view>
      </view>
    </view>
    <view class="fix-btn" @tap="onClickSubmit"> 确认{{ multipleText }} </view>
  </view>
</template>

<script>
import XbfCalendar from "@/components/h-date/components/xbf-calendar/xbf-calendar.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { CalendarValueEnum } from "@/utils/enum";
import { formatTime } from "@/utils/utils";
// import { strYMD, getMMDD } from "@/utils/utils";
import { TWORuleEnum, subTypeEnum, StopStatusEnum } from "@/utils/enum";
import Resize from "./components/resize.vue";
import dayjs from "@/components/libs/util/dayjs.js";
import { daySame } from "@/utils/utils";
export default {
  components: {
    XbfCalendar,
    Resize,
  },
  data() {
    return {
      rangeBgColor: "#E4F4FF",
      activeColor: "#1D9BDC",
      clickModal: "multiple", //single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
      endText: "恢复结束",
      startText: "恢复开始",
      multipleText: "停送",
      // defaultDate: [],
      clickAble: false, //允许点击
      prevStatus: "", //上一次选中状态
      //弹窗显示
      show: false,
      //请求参数
      params: {
        calendarValue: CalendarValueEnum.MONTH,
        startDate: formatTime("YYYY-mm-dd"), //默认本月
      },
      //弹窗显示数据
      modInfo: [],
      //弹窗显示停送与否
      topname: "",
      flag: false,
      cacheSelectDate: [], //选中日期缓存
      cacheGoodsInfo: [], //选中日期配送日历缓存
      allResList: [], //所有配送日历
      goodsInfoObj: {}, //选中商品筛选后数据
      stopSubType: "", //停订类型
    };
  },
  computed: {
    ...mapState("newhope", ["selectDetailGoods", "resizeDateList"]),
  },
  // created() {
  //   this.init();
  // },
  onLoad() {
    this.init();
    // this.X_getResizeDate(this.params);
  },
  methods: {
    ...mapMutations("newhope", [
      "V_setCurParams",
      "V_setsendParams",
      "V_setStopPar",
    ]),
    ...mapActions("newhope", [
      "X_getSelectDetailGoods",
      "X_getmonthCalendar",
      "X_getCurrentCalendar",
      "X_getMonthWeek",
      "X_postStopOrStart",
      "X_getResizeDate",
      "getSendQty",
      "postStopLong",
      "postStopPoint",
    ]),
    async init() {
      try {
        await this.X_getResizeDate(this.params);
        this.allResList = this.resizeDateList.calenderList;
      } catch (error) {}
    },

    //停送-起送
    async clickSumit() {
      await this.X_postStopOrStart();
      await this.X_getMonthWeek();
      await this.getSendQty();
      this.show = false;
    },
    // 停送-恢复按钮fc09
    async onClickSubmit() {
      try {
        if (this.clickModal === "range" && this.cacheSelectDate.length === 1) {
          return uni.$u.toast("请选择结束日期");
        }
        const endTime = this.cacheSelectDate.slice(-1)[0];
        const startTime = this.cacheSelectDate[0];
        const stopSubType =
          this.cacheGoodsInfo[0].deliveryStatus === TWORuleEnum.WAIT_DELIVERY
            ? "SUSPEND"
            : this.cacheGoodsInfo[0].deliveryStatus === TWORuleEnum.DISCONTINUED
            ? "RECOVERY"
            : ""; //停or恢复
        uni.showModal({
          content: `确认${this.multipleText}选择的${this.cacheGoodsInfo[0].deliveryStatusName}商品吗？`,
          success: async ({ confirm }) => {
            if (confirm) {
              if (this.clickModal === "range") {
                //连续
                const params = {
                  endTime,
                  startTime,
                  stopSubType,
                };
                console.log("params", params);
                if (this.cacheSelectDate.length === 1)
                  return uni.$u.toast("请选择结束日期");
                await this.postStopLong(params);
              } else if (this.clickModal === "multiple") {
                //单点
                const delyStation = this.cacheSelectDate?.map((item) => {
                  return {
                    delyDate: item,
                    type: stopSubType,
                  };
                });
                console.log("delyStation", delyStation, this.cacheSelectDate);
                await this.postStopPoint({ delyStation });
                // uni.$u.toast("操作成功");
              }
              await this.init();
              this.clearSelect();
            }
          },
        });
      } catch (error) {}
    },

    // fc07
    // 模式切换
    clickModeType(val) {
      this.clickModal = val;
      // this.defaultDate = [];
      // this.cacheSelectDate = []; //清空选中日期缓存
      // this.cacheGoodsInfo = []; //清空选中日期配送日历缓存
      this.clearSelect(); //清空缓存
    },
    // 设置文字,背景色
    setModalText(status) {
      // 1.待配送->停送
      if (status === TWORuleEnum.WAIT_DELIVERY) {
        this.stopSubType = subTypeEnum.SUSPEND;
        this.multipleText = "停送";
        this.endText = "停送结束";
        this.startText = "停送开始";
        this.activeColor = "#F6B64E";
        this.rangeBgColor = "#FFF5E2";
      } else if (status === TWORuleEnum.DISCONTINUED) {
        //2.停送->恢复
        this.stopSubType = subTypeEnum.RECOVERY;
        this.multipleText = "恢复";
        this.endText = "恢复结束";
        this.startText = "恢复开始";
        this.activeColor = "#1D9BDC";
        this.rangeBgColor = "#E4F4FF";
      }
    },
    // 日期排序
    sortDate(arr, isDate = false) {
      const newArr = arr.sort((a, b) => {
        let dateA, dateB;
        if (isDate) {
          //选中日期
          dateA = dayjs(a);
          dateB = dayjs(b);
        } else {
          //选中商品
          dateA = dayjs(a.date);
          dateB = dayjs(b.date);
        }
        if (dateA.isBefore(dateB)) {
          return -1;
        } else if (dateA.isAfter(dateB)) {
          return 1;
        } else {
          0;
        }
      });
      return newArr;
    },
    //选中判断
    clickType(item) {
      const { type, deliveryStatus, date } = item;
      if (type === "cur") {
        // 有状态
        if (
          deliveryStatus === TWORuleEnum.WAIT_DELIVERY ||
          deliveryStatus === TWORuleEnum.DISCONTINUED
        ) {
          // 今天之前不能点击-记得放开
          if (dayjs(date).isBefore(dayjs(), "day")) {
            return uni.$u.toast("过去日期不可选");
          }
          let selected = uni.$u.deepClone(this.cacheSelectDate);
          let selectedGoods = uni.$u.deepClone(this.cacheGoodsInfo);
          // 1.范围选择
          if (this.clickModal === "range") {
            if (selected.length === 1) {
              this.setModalText(selectedGoods[0].deliveryStatus); //设置文字+背景颜色
              const time1 = selected[0];
              //1.1 重新设定开始日期
              if (dayjs(date).isBefore(time1)) {
                selected = [date];
                selectedGoods = [item];
                this.setModalText(selectedGoods[0].deliveryStatus); //设置文字+背景颜色
              } else if (dayjs(date).isAfter(time1)) {
                selected.push(date);
                // selectedGoods.push(item);
                const endDate = selected[1];
                const arr = [];
                const goodsArr = [];
                let i = 0;
                do {
                  arr.push(dayjs(time1).add(i, "day").format("YYYY-MM-DD"));
                  i++;
                } while (dayjs(time1).add(i, "day").isBefore(dayjs(endDate)));
                arr.push(endDate);
                // 添加商品数据-只有当月数据
                this.allResList.forEach((arrTime) => {
                  if (arr.some((ite) => daySame(ite, arrTime.date))) {
                    goodsArr.push(arrTime);
                  }
                });
                selectedGoods = goodsArr;
                selected = [...arr];
              }
            } else if (selected.length >= 2) {
              selected = [date];
              selectedGoods = [item];
              this.setModalText(deliveryStatus); //设置文字+背景颜色
            } else {
              console.log("123", 123);
              this.setModalText(deliveryStatus); //设置文字+背景颜色
              selected.push(date);
              selectedGoods.push(item);
            }
          } else {
            //2.非范围选择
            this.setModalText(deliveryStatus); //设置文字+背景颜色
            if (selected.some((im) => daySame(im, date))) {
              selected = selected.filter((val) => !daySame(val, date));
              selectedGoods = selectedGoods.filter(
                (items) => !daySame(items.date, date)
              );
            } else {
              selected.push(date);
              selectedGoods.push(item);
            }
          }

          this.cacheSelectDate = this.sortDate(selected, true);
          this.cacheGoodsInfo = this.sortDate(selectedGoods, false);
        } else {
          return uni.$u.toast("该日期不可选");
        }
      }
    },
    // 清空选中数据
    clearSelect() {
      this.cacheGoodsInfo = [];
      this.cacheSelectDate = [];
      this.goodsInfoObj = {};
    },
    // fc08-fc09
    async onClickDay(val) {
      const { clickModal, cacheSelectDate, cacheGoodsInfo } = this;
      const len = cacheSelectDate.length;
      console.log(
        "val,cacheSelectDate,cacheGoodsInfo",
        val,
        cacheSelectDate,
        cacheGoodsInfo
      );
      const { type, deliveryStatus, deliveryStatusName, date } = val;
      const curTime = dayjs(date).format("YYYY-MM-DD");
      //当前商品日历数据
      const arr = this.resizeDateList?.calenderList || [];
      // 当前月没商品不能选中
      if (!val.deliveryStatus && type === "cur") {
        return uni.$u.toast("该日期不可选");
      }
      if (dayjs(date).isBefore(dayjs(), "day")) {
        return uni.$u.toast("过去日期不可选");
      }
      //当前月点击第一个为非(待配送+停送)不能点击
      if (!len) {
        console.log("1", 1);
        this.clickType(val);
        this.filterGoodsList();
        return;
      }
      const baseItem = cacheGoodsInfo[0];
      //  选中状态和上一个不一致
      const showText = this.multipleText == "停送" ? "恢复" : "停送";
      // 1.范围
      if (clickModal === "range") {
        console.log("22", 22);
        if (len >= 2) {
          //已有选择
          if (
            baseItem.deliveryStatus !== deliveryStatus &&
            (deliveryStatus === TWORuleEnum.WAIT_DELIVERY ||
              deliveryStatus === TWORuleEnum.DISCONTINUED)
          ) {
            uni.showModal({
              title: "",
              content: `确认是否要做${showText}操作，若做${showText}，当前${this.multipleText}操作将取消？`,
              showCancel: true,
              success: ({ confirm }) => {
                if (confirm) {
                  // this.cacheGoodsInfo = [];
                  // this.cacheSelectDate = [];
                  this.clickType(val);
                }
              },
            });
          } else {
            this.clickType(val);
          }
        } else {
          console.log("val->1", val);
          this.clickType(val);
        }
      } else if (clickModal === "multiple") {
        // 2.单点多选
        if (len >= 1 && deliveryStatus) {
          //2.1 选中状态是否和上一个一致
          if (deliveryStatus === baseItem.deliveryStatus) {
            this.clickType(val);
          } else {
            // 选中状态和上一个不一致
            uni.showModal({
              title: "",
              content: `确认是否要做${showText}操作，若做${showText}，当前${this.multipleText}操作将取消？`,
              showCancel: true,
              success: ({ confirm }) => {
                if (confirm) {
                  this.cacheGoodsInfo = [];
                  this.cacheSelectDate = [];
                  this.clickType(val);
                  this.filterGoodsList();
                }
              },
            });
          }
        }
      } else {
        //3.单点单选
        this.cacheSelectDate = [];
        this.cacheGoodsInfo = [];
        this.clickType(val);
      }
      this.filterGoodsList();
    },
    // 筛选操作选中的商品信息
    filterGoodsList() {
      const status = this.cacheGoodsInfo[0]?.deliveryStatus;
      const flatList = this.cacheGoodsInfo.flatMap((obj) => {
        // console.log("obj", obj);
        if (obj.goodsList.length) {
          obj.goodsList.forEach((item) => {
            item.date = [obj.date];
          });
        }
        return obj.goodsList;
      });
      const sbPeObj = {};
      flatList.forEach((el) => {
        if (
          sbPeObj[el.channelSkuCode] &&
          sbPeObj[el.channelSkuCode].deliveryCalendarStatus ===
            el.deliveryCalendarStatus
        ) {
          sbPeObj[el.channelSkuCode].date.push(el.date[0]);
        } else {
          if (el.deliveryCalendarStatus === status) {
            sbPeObj[el.channelSkuCode] = el;
          }
        }
      });
      this.goodsInfoObj = sbPeObj;
      // console.log("flatList", flatList, sbPeObj);
    },
    // 添加翻页数据-allRes
    addAllResList(list) {
      let allRes = uni.$u.deepClone(this.allResList);
      if (!list.length) return allRes;
      list.forEach((el) => {
        let index = allRes.findIndex((item) => item.date === el.date);
        if (index === -1) {
          allRes.push(el);
        } else {
          allRes.splice(index, 1, el);
        }
      });
      // allRes按时间排序
      return this.sortDate(allRes);
    },

    // 翻页
    async onChangePage(firstDate) {
      try {
        this.params.startDate = firstDate.date;
        //本月第一天
        await this.X_getResizeDate({
          startDate: firstDate.date,
        });
        this.allResList = this.addAllResList(this.resizeDateList.calenderList);
      } catch (error) {
        //
      }
    },
  },
};
</script>

<style scoped lang="scss">
.resize-out {
  // padding: 20rpx 32rpx;
  height: 100vh;
  overflow: auto;
  background: #f5f5f5;
  padding-bottom: 196rpx;
}
.date-top {
  background: #fff;
  padding: 24rpx 32rpx;
  .top-tips {
    font-size: 30rpx;
    color: #333333;
    font-weight: bold;
  }
  .top-btns {
    height: 52rpx;
    width: 176rpx;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 26rpx;
    color: #1d9bdc;
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    background: #e4f4ff;

    text-align: center;
    padding: 4rpx;
  }
  .btn-active {
    border-radius: 44rpx 44rpx 44rpx 44rpx;
    width: 62rpx;
    line-height: 44rpx;
    height: 44rpx;
    color: #fff;
    background: #1d9bdc;
  }
  .top-two-tips {
    font-size: 24rpx;
    color: #999999;
  }
  .top-one-btn {
    display: flex;
    align-items: cneter;
    justify-content: space-between;
    margin-bottom: 16rpx;
  }
}
.date-list {
  padding: 20rpx 32rpx;
}

.tips {
  color: #999999;
  width: 546rpx;
  line-height: 44rpx;
  margin: 0 auto;
  margin-top: 24rpx;
}

//fc08
.list-reszie {
  padding: 0 32rpx;
  margin-top: 24rpx;
}
.list-tips {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 2rpx;
}
.goods-list {
  background: #ffffff;
  padding: 38rpx 24rpx 0;
  border-radius: 40rpx 40rpx 40rpx 40rpx;
  .item-goods {
    border-bottom: 2rpx solid #f1f1f1;
    margin-bottom: 16rpx;
    &:last-child {
      border: none;
      margin-bottom: 0;
    }
  }
}
.fix-btn {
  margin: auto 40rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 254rpx;
  color: #fff;
  background: #1d9bdc;
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  position: fixed;
  bottom: 68rpx;
  left: 0;
  right: 0;
}
</style>
