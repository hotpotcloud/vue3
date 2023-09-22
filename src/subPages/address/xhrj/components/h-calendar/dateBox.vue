<template>
  <!-- 日期显示 -->
  <view class="date_box">
    <view
      v-for="(dateInfo, dateIndex) in list"
      :key="dateIndex"
      class="calendar_date__box"
    >
      <!-- 周视图 -->
      <view
        class="day-by-week"
        v-if="swiperMode === 'close'"
        :class="{ avtiveday: dateInfo.isSelected }"
        @tap="chooseDate(dateInfo, dateIndex)"
        :style="{ maxHeight: cellHeight, minHeight: '98rpx' }"
      >
        <view :class="['weekday', dateInfo.isToday && 'today-week']">
          {{ dateInfo.isToday ? "今" : dateInfo.date }}
        </view>
        <!-- 状态 -->
        <view
          :class="[
            'status-tag',
            dateInfo.deliveryStatus,
            dateInfo.isSelected && 'active-' + dateInfo.deliveryStatus,
          ]"
          >{{ dateInfo.deliveryStatusName }}</view
        >
        <view style="margin-top: 6rpx">
          <view
            v-for="(el, index) in dateInfo.goodsList"
            :key="index"
            class="el-box d-flex-center d-sb"
          >
            <view>
              <image
                class="el-img"
                :src="getAssetImgUrl(el.goodsImgUrl)"
                mode="aspectFit"
              />
            </view>
            <view :class="['elqty', dateInfo.isSelected && 'el-qty-select']"
              >x{{ el.qty }}</view
            >
          </view>
        </view>
      </view>
      <!-- 月视图 -->
      <view
        @tap="chooseDate(dateInfo, dateIndex)"
        v-if="swiperMode === 'open'"
        :class="[
          'day-by-month',
          dateInfo.isSelected && 'active-month',
          dateInfo.type !== 'cur' && 'sleep-month',
        ]"
      >
        <!-- 日期 -->
        <view :class="['monthday', dateInfo.isToday && 'today-week']">
          {{ dateInfo.isToday ? "今" : dateInfo.date }}
        </view>
        <!-- 状态 -->
        <view
          v-show="dateInfo.deliveryStatusName"
          :class="[
            'status-tag',
            dateInfo.deliveryStatus,
            dateInfo.isSelected && 'active-' + dateInfo.deliveryStatus,
          ]"
        >
          {{ dateInfo.deliveryStatusName }}
        </view>
        <!-- 商品 -->
        <view style="margin-top: 6rpx">
          <view
            v-for="(el, index) in dateInfo.goodsList"
            :key="index"
            class="el-box d-flex-center d-sb"
          >
            <view>
              <image
                class="el-img"
                :src="getAssetImgUrl(el.goodsImgUrl)"
                mode="aspectFit"
              />
            </view>
            <view :class="['elqty', dateInfo.isSelected && 'el-qty-select']"
              >x{{ el.qty }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    dates: {
      type: Array,
      default: [],
    },
    cellHeight: {
      // 一列的高度
      type: Number,
      default: 98,
    },
    dateActiveColor: {
      // 日期选中颜色
      type: String,
      default: "#ff0",
    },
    swiperMode: {
      // 日历显示模式
      type: String,
      default: "close",
    },
  },
  computed: {
    ...mapState("newhope", ["calendarList"]),

    // 计算当前日历商品信息
    list() {
      const curList = this.calendarList.calenderList;
      // console.log("curList", curList);
      // if (curList) {
      //   const dates = this.dates.map((el) => {
      //     const week = `${el.year}-${
      //       el.month > 9 ? el.month : "0" + el.month
      //     }-${el.date > 9 ? el.date : "0" + el.date}`;
      //     for (let i = 0; i < curList.length; i++) {
      //       if (curList[i].date === week) {
      //         el.goodsList = curList[i].goodsList;
      //         el.deliveryStatusName = curList[i].deliveryStatusName;
      //         el.deliveryStatus = curList[i].deliveryStatus;
      //       }
      //     }
      //     return el;
      //   });
      //   // console.log("dates-->周数据", dates);
      //   return dates;
      // } else return this.dates;
      if (curList && curList.length) {
        const newArr = JSON.parse(JSON.stringify(this.dates));
        const dates = newArr.map((el) => {
          const week = `${el.year}-${
            el.month > 9 ? el.month : "0" + el.month
          }-${el.date > 9 ? el.date : "0" + el.date}`;
          for (let i = 0; i < curList.length; i++) {
            if (curList[i].date === week) {
              el.goodsList = curList[i].goodsList;
              el.deliveryStatusName = curList[i].deliveryStatusName;
              el.deliveryStatus = curList[i].deliveryStatus;
            }
          }
          return el;
        });
        // console.log("dates-->周数据----里面数据", dates);
        return dates;
      } else {
        console.log("this.dates--wtf", this.dates);
        return this.dates;
      }
    },
  },
  methods: {
    ...mapMutations("newhope", ["V_setcurChooseDate"]),
    lowcase(val) {
      return val?.toLowerCase();
    },
    chooseDate(dateInfo, dateIndex) {
      this.V_setcurChooseDate(dateInfo);
      // console.log("dateIndex", dateInfo);
      this.$emit("chooseDate", dateInfo, dateIndex);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./css/datebox.scss";
</style>
