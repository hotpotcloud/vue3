<!--
 * @Date: 2022-08-09 13:07:16
 * @LastEditors: ''
 * @LastEditTime: 2022-08-09 17:10:42
 * @FilePath: \xianhuo-miniprogram\src\subPages\date\datetype\skeleton.vue
-->
<template name="skeleton">
  <view class="sk-container">
    <view class="date-out data-v-8cda4ec4">
      <view class="date-info data-v-8cda4ec4">
        <view class="data-v-8cda4ec4">
          <view
            class="info-out info--info-out data-v-2adac392 info--data-v-2adac392"
          >
            <view
              class="info-main info--info-main d-flex info--d-flex data-v-2adac392 info--data-v-2adac392"
            >
              <view
                class="main-img info--main-img data-v-2adac392 info--data-v-2adac392"
              >
                <image
                  class="img info--img data-v-2adac392 info--data-v-2adac392 sk-image"
                  mode="aspectFit"
                ></image>
              </view>
              <view
                class="main-text info--main-text flex-1 info--flex-1 d-flex-colum info--d-flex-colum d-sb info--d-sb data-v-2adac392 info--data-v-2adac392"
              >
                <view
                  class="text-name info--text-name data-v-2adac392 info--data-v-2adac392"
                >
                  <text
                    class="data-v-2adac392 info--data-v-2adac392 font-ios info--font-ios sk-transparent sk-text-20-4545-937 sk-text"
                    >华西利乐枕纯牛奶243ml*20</text
                  >
                </view>
                <view
                  class="text-time info--text-time data-v-2adac392 info--data-v-2adac392 sk-transparent"
                  >配送周期：
                  <text
                    class="data-v-2adac392 info--data-v-2adac392 sk-transparent sk-text-13-8889-566 sk-text"
                    >2022/08/06</text
                  >
                  <text
                    class="data-v-2adac392 info--data-v-2adac392 sk-transparent"
                    ><text
                      class="data-v-2adac392 info--data-v-2adac392 sk-transparent sk-opacity"
                      style="margin: 0 2px"
                      >-</text
                    >2025/05/01</text
                  >
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- <scroll-view
        class="data-calendar scroll-views data-v-8cda4ec4"
        data-event-opts="scroll,handScroll,$event,scrolltoupper,scrolltoupper,$event"
        scroll-y="true"
      > -->
        <view
          class="calendar-list data-v-8cda4ec4"
          style="padding-top: 0px; padding-bottom: 0px"
        >
          <view class="data-v-8cda4ec4">
            <view
              class="calendar-out calendar--calendar-out data-v-2d001838 calendar--data-v-2d001838"
            >
              <view
                class="main calendar--main data-v-2d001838 calendar--data-v-2d001838"
              >
                <view
                  class="main-name calendar--main-name data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-7-5000-260 sk-text"
                  >2022/08</view
                >
                <view
                  class="main-date calendar--main-date data-v-2d001838 calendar--data-v-2d001838"
                >
                  <view
                    class="week calendar--week d-flex calendar--d-flex d-sb calendar--d-sb data-v-2d001838 calendar--data-v-2d001838"
                  >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-562 sk-text"
                      style="background-position-x: 50%"
                      >日</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-120 sk-text"
                      style="background-position-x: 50%"
                      >一</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-174 sk-text"
                      style="background-position-x: 50%"
                      >二</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-770 sk-text"
                      style="background-position-x: 50%"
                      >三</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-299 sk-text"
                      style="background-position-x: 50%"
                      >四</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-818 sk-text"
                      style="background-position-x: 50%"
                      >五</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-49 sk-text"
                      style="background-position-x: 50%"
                      >六</view
                    >
                  </view>
                  <view
                    class="month calendar--month d-flex-warp calendar--d-flex-warp data-v-2d001838 calendar--data-v-2d001838"
                  >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-292 sk-text"
                      style="background-position-x: 50%"
                      >31</view
                    >
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838"
                      data-event-opts="tap,clickDay,0,$0,daylist,,0"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-17-8571-150 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-312 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-844 sk-text"
                        style="background-position-x: 50%"
                        >undefined</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838"
                      data-event-opts="tap,clickDay,1,$0,daylist,,1"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-17-8571-575 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-412 sk-text"
                        style="background-position-x: 50%"
                        >2</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-517 sk-text"
                        style="background-position-x: 50%"
                        >undefined</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838"
                      data-event-opts="tap,clickDay,2,$0,daylist,,2"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-17-8571-151 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-982 sk-text"
                        style="background-position-x: 50%"
                        >3</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-989 sk-text"
                        style="background-position-x: 50%"
                        >undefined</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838"
                      data-event-opts="tap,clickDay,3,$0,daylist,,3"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-17-8571-901 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-476 sk-text"
                        style="background-position-x: 50%"
                        >4</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-737 sk-text"
                        style="background-position-x: 50%"
                        >undefined</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838"
                      data-event-opts="tap,clickDay,4,$0,daylist,,4"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-17-8571-316 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-563 sk-text"
                        style="background-position-x: 50%"
                        >5</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-3 sk-text"
                        style="background-position-x: 50%"
                        >undefined</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,5,$0,daylist,,5"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-528 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-786 sk-text"
                        style="background-position-x: 50%"
                        >6</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-331 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,6,$0,daylist,,6"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-324 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-748 sk-text"
                        style="background-position-x: 50%"
                        >7</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-519 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,7,$0,daylist,,7"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-610 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-189 sk-text"
                        style="background-position-x: 50%"
                        >8</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-962 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,8,$0,daylist,,8"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-205 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-591 sk-text"
                        style="background-position-x: 50%"
                        >9</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-499 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,9,$0,daylist,,9"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-74 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-715 sk-text"
                        style="background-position-x: 50%"
                        >10</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-282 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,10,$0,daylist,,10"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-825 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-451 sk-text"
                        style="background-position-x: 50%"
                        >11</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-524 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,11,$0,daylist,,11"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-915 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-26 sk-text"
                        style="background-position-x: 50%"
                        >12</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-10 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,12,$0,daylist,,12"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-859 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-799 sk-text"
                        style="background-position-x: 50%"
                        >13</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-256 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,13,$0,daylist,,13"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-425 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-750 sk-text"
                        style="background-position-x: 50%"
                        >14</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-556 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,14,$0,daylist,,14"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-849 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-424 sk-text"
                        style="background-position-x: 50%"
                        >15</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-389 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,15,$0,daylist,,15"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-910 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-56 sk-text"
                        style="background-position-x: 50%"
                        >16</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-454 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,16,$0,daylist,,16"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-235 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-351 sk-text"
                        style="background-position-x: 50%"
                        >17</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-489 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,17,$0,daylist,,17"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-312 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-959 sk-text"
                        style="background-position-x: 50%"
                        >18</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-373 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,18,$0,daylist,,18"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-69 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-706 sk-text"
                        style="background-position-x: 50%"
                        >19</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-782 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,19,$0,daylist,,19"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-639 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-476 sk-text"
                        style="background-position-x: 50%"
                        >20</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-97 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,20,$0,daylist,,20"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-966 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-365 sk-text"
                        style="background-position-x: 50%"
                        >21</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-521 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,21,$0,daylist,,21"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-964 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-28 sk-text"
                        style="background-position-x: 50%"
                        >22</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-458 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,22,$0,daylist,,22"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-589 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-676 sk-text"
                        style="background-position-x: 50%"
                        >23</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-689 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,23,$0,daylist,,23"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-975 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-982 sk-text"
                        style="background-position-x: 50%"
                        >24</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-194 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,24,$0,daylist,,24"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-414 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-992 sk-text"
                        style="background-position-x: 50%"
                        >25</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-843 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,25,$0,daylist,,25"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-922 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-961 sk-text"
                        style="background-position-x: 50%"
                        >26</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-511 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,26,$0,daylist,,26"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-167 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-982 sk-text"
                        style="background-position-x: 50%"
                        >27</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-910 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,27,$0,daylist,,27"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-711 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-499 sk-text"
                        style="background-position-x: 50%"
                        >28</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-682 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,28,$0,daylist,,28"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-269 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-581 sk-text"
                        style="background-position-x: 50%"
                        >29</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-210 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,29,$0,daylist,,29"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-594 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-1 sk-text"
                        style="background-position-x: 50%"
                        >30</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-816 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,30,$0,daylist,,30"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-74 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-786 sk-text"
                        style="background-position-x: 50%"
                        >31</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-304 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-629 sk-text"
                      style="background-position-x: 50%"
                      >1</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-24 sk-text"
                      style="background-position-x: 50%"
                      >2</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-594 sk-text"
                      style="background-position-x: 50%"
                      >3</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-602 sk-text"
                      style="background-position-x: 50%"
                      >4</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-715 sk-text"
                      style="background-position-x: 50%"
                      >5</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-441 sk-text"
                      style="background-position-x: 50%"
                      >6</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-226 sk-text"
                      style="background-position-x: 50%"
                      >7</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-68 sk-text"
                      style="background-position-x: 50%"
                      >8</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-993 sk-text"
                      style="background-position-x: 50%"
                      >9</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-876 sk-text"
                      style="background-position-x: 50%"
                      >10</view
                    >
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="data-v-8cda4ec4">
            <view
              class="calendar-out calendar--calendar-out data-v-2d001838 calendar--data-v-2d001838"
            >
              <view
                class="main calendar--main data-v-2d001838 calendar--data-v-2d001838"
              >
                <view
                  class="main-name calendar--main-name data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-7-5000-780 sk-text"
                  >2022/09</view
                >
                <view
                  class="main-date calendar--main-date data-v-2d001838 calendar--data-v-2d001838"
                >
                  <view
                    class="week calendar--week d-flex calendar--d-flex d-sb calendar--d-sb data-v-2d001838 calendar--data-v-2d001838"
                  >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-678 sk-text"
                      style="background-position-x: 50%"
                      >日</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-196 sk-text"
                      style="background-position-x: 50%"
                      >一</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-925 sk-text"
                      style="background-position-x: 50%"
                      >二</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-926 sk-text"
                      style="background-position-x: 50%"
                      >三</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-547 sk-text"
                      style="background-position-x: 50%"
                      >四</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-810 sk-text"
                      style="background-position-x: 50%"
                      >五</view
                    >
                    <view
                      class="weekday calendar--weekday data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-14-2857-584 sk-text"
                      style="background-position-x: 50%"
                      >六</view
                    >
                  </view>
                  <view
                    class="month calendar--month d-flex-warp calendar--d-flex-warp data-v-2d001838 calendar--data-v-2d001838"
                  >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-851 sk-text"
                      style="background-position-x: 50%"
                      >28</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-767 sk-text"
                      style="background-position-x: 50%"
                      >29</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-702 sk-text"
                      style="background-position-x: 50%"
                      >30</view
                    >
                    <view
                      class="month-day calendar--month-day month-nomal calendar--month-nomal data-v-2d001838 calendar--data-v-2d001838 sk-transparent sk-text-35-0000-834 sk-text"
                      style="background-position-x: 50%"
                      >31</view
                    >
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,0,$0,daylist,,0"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-581 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-162 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-573 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,1,$0,daylist,,1"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-290 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-117 sk-text"
                        style="background-position-x: 50%"
                        >2</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-982 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,2,$0,daylist,,2"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-344 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-310 sk-text"
                        style="background-position-x: 50%"
                        >3</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-117 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,3,$0,daylist,,3"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-887 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-835 sk-text"
                        style="background-position-x: 50%"
                        >4</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-730 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,4,$0,daylist,,4"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-464 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-704 sk-text"
                        style="background-position-x: 50%"
                        >5</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-692 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,5,$0,daylist,,5"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-912 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-366 sk-text"
                        style="background-position-x: 50%"
                        >6</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-289 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,6,$0,daylist,,6"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-413 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-193 sk-text"
                        style="background-position-x: 50%"
                        >7</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-257 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,7,$0,daylist,,7"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-906 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-599 sk-text"
                        style="background-position-x: 50%"
                        >8</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-144 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,8,$0,daylist,,8"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-683 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-180 sk-text"
                        style="background-position-x: 50%"
                        >9</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-898 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                    <view
                      class="month-day calendar--month-day d-flex-colum calendar--d-flex-colum data-v-2d001838 calendar--data-v-2d001838 month-day-before1 calendar--month-day-before1"
                      data-event-opts="tap,clickDay,9,$0,daylist,,9"
                    >
                      <view
                        class="day-goods calendar--day-goods data-v-2d001838 calendar--data-v-2d001838 day-goods-before1 calendar--day-goods-before1 sk-transparent sk-text-17-8571-710 sk-text"
                        style="background-position-x: 50%"
                        >1</view
                      >
                      <view
                        class="day calendar--day data-v-2d001838 calendar--data-v-2d001838 day-before1 calendar--day-before1 sk-transparent sk-text-14-2857-914 sk-text"
                        style="background-position-x: 50%"
                        >10</view
                      >
                      <view
                        class="day-status calendar--day-status data-v-2d001838 calendar--data-v-2d001838 day-status-before1 calendar--day-status-before1 sk-transparent sk-text-14-2857-893 sk-text"
                        style="background-position-x: 50%"
                        >已完成</view
                      >
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      <!-- </scroll-view> -->
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped>
/*
此文件为开发者工具生成，生成时间: 2022/8/9下午1:03:49

在 E:\code\uniapp\最新dev小程序\xianhuo-miniprogram\dist\dev\mp-weixin\subPages\date\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-13-3333-931 {
  background-image: linear-gradient(
    transparent 13.3333%,
    #eeeeee 0%,
    #eeeeee 86.6667%,
    transparent 0%
  ) !important;
  background-size: 100% 28.8462rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-20-4545-937 {
  background-image: linear-gradient(
    transparent 20.4545%,
    #eeeeee 0%,
    #eeeeee 79.5455%,
    transparent 0%
  ) !important;
  background-size: 100% 42.3077rpx;
  position: relative !important;
}
.sk-text-13-8889-566 {
  background-image: linear-gradient(
    transparent 13.8889%,
    #eeeeee 0%,
    #eeeeee 86.1111%,
    transparent 0%
  ) !important;
  background-size: 100% 34.6154rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-7-5000-260 {
  background-image: linear-gradient(
    transparent 7.5%,
    #eeeeee 0%,
    #eeeeee 92.5%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-text-14-2857-562 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-120 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-174 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-770 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-299 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-818 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-49 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-35-0000-292 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-17-8571-150 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-312 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-844 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-575 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-412 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-517 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-151 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-982 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-989 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-901 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-476 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-737 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-316 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-563 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-3 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-528 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-786 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-331 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-324 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-748 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-519 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-610 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-189 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-962 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-205 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-591 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-499 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-74 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-715 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-282 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-825 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-451 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-524 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-915 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-26 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-10 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-859 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-799 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-256 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-425 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-750 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-556 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-849 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-424 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-389 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-910 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-56 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-454 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-235 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-351 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-489 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-312 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-959 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-373 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-69 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-706 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-782 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-639 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-97 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-966 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-365 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-521 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-964 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-28 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-458 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-589 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-676 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-689 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-975 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-194 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-414 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-992 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-843 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-922 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-961 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-511 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-167 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-910 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-711 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-682 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-269 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-581 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-210 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-594 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-1 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-816 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-14-2857-304 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-35-0000-629 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-24 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-594 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-602 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-715 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-441 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-226 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-68 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-993 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-876 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-7-5000-780 {
  background-image: linear-gradient(
    transparent 7.5%,
    #eeeeee 0%,
    #eeeeee 92.5%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-text-14-2857-678 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-196 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-925 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-926 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-547 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-810 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-584 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-35-0000-851 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-767 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-702 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-35-0000-834 {
  background-image: linear-gradient(
    transparent 35%,
    #eeeeee 0%,
    #eeeeee 65%,
    transparent 0%
  ) !important;
  background-size: 100% 96.1538rpx;
  position: relative !important;
}
.sk-text-17-8571-581 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-162 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-573 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-290 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-117 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-17-8571-344 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-310 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-17-8571-887 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-835 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-730 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-464 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-704 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-692 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-912 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-366 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-289 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-413 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-193 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-257 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-906 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-599 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-144 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-683 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-180 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-898 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-text-17-8571-710 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-14-2857-914 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-893 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 24.2308rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
