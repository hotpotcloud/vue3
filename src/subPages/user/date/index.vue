<!--
 * @Date: 2022-08-02 15:16:37
 * @LastEditors: ''
 * @LastEditTime: 2022-08-12 14:50:19
 * @FilePath: \xianhuo-miniprogram\src\subPages\date\index.vue
-->
<template>
  <skeleton v-if="showSeleton" />
  <view class="date-out" v-else>
    <view class="date-position" v-if="showModal">
      <view class="up-date">
        <view style="text-align: center">
          <image
            style="width: 64rpx; height: 210rpx"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/date/jiantou.png"
          />
        </view>
        <!-- <view class="up-tips">下拉查看历史配送日历</view>
        <button class="iknow-btn" @tap="handleKnow">我知道了</button> -->
      </view>
    </view>
    <!-- <view class="top-today" v-show="showToday" @tap="goToday">
      回到当月
      <image
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/date/today.png"
      />
    </view> -->
    <view class="date-info">
      <info :data="val" />
    </view>
    <!-- <view class="tips" v-show="textPull">
      <text>没有更多了</text>
    </view> -->
    <!-- @scrolltolower触底事件，@scroll滚动事件  @scrolltoupper触底事件 @refresherrefresh-下拉刷新 -->
    <!-- @refresherrefresh="refresherrefresh" -->

    <scroll-view
      scroll-y
      refresher-enabled
      :scroll-into-view="'date' + toMonth"
      class="data-calendar scroll-views"
      :refresher-triggered="triggered"
      @scroll="scroll"
      @scrolltoupper="scrolltoupper"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
      @refresherrefresh="refresherrefresh"
    >
      <view
        class="calendar-list"
        :style="{
          paddingTop: topPadding + 'px',
          paddingBottom: bottomPadding + 'px',
        }"
      >
        <view
          class="text-centers"
          v-for="(item, index) in showList"
          :key="index"
          :id="'date' + item.date.replace('/', '-')"
        >
          <HopeDate :val="item.deliveryList" :ym="item.date" />
        </view>
        <view class="bot"
          >—
          {{ moreText }}
          —</view
        >
      </view>
      <!-- </view> -->
    </scroll-view>
  </view>
</template>

<script lang="ts">
import info from "./info.vue";
import skeleton from "./datetype/skeleton.vue";
import HopeDate from "@/subPages/user/components/hope-date.vue";
import { getNowMonth } from "@/utils/utils";
import api from "@/utils/api";
import { getImgUrl } from "@/utils/utils";
import { mapActions, mapMutations, mapState } from "vuex";
// let observer = null;
export default {
  components: {
    info,
    skeleton,
    HopeDate,
  },
  data() {
    return {
      toDayId: "", //当前月ID
      toMonth: 0, //id
      showToday: false, //回到今天
      // showModal: this.$store.state.user.showDateModal, //蒙层提示
      hasHistory: false, //是否有历史配送日历
      textPull: false, //下拉提示文字
      upMore: false, //没有更多翻页
      isPull: true, //开启下拉
      triggered: false, //下拉刷新状态
      _freshing: false,

      val: {}, //data
      showSeleton: true, //骨架
      isLoading: false,
      showNum: 0, //最多条数
      windowHeight: 0, //可视区高度
      heightCalendar: 0, //容器高度
      calendarList: [
        // {
        //   date: "2023/04",
        //   deliveryList: [
        //     {
        //       date: "2023-04-03",
        //       deliveryCalendarStatus: "DELIVERING",
        //       deliveryCalendarStatusName: "配送中",
        //       qty: 2,
        //     },
        //     {
        //       date: "2023-04-10",
        //       deliveryCalendarStatus: "DISCONTINUED",
        //       deliveryCalendarStatusName: "已停订",
        //       qty: 22,
        //     },
        //     {
        //       date: "2023-04-29",
        //       deliveryCalendarStatus: "WAIT_DELIVERY",
        //       deliveryCalendarStatusName: "待配送",
        //       qty: 2,
        //     },
        //     {
        //       date: "2023-04-30",
        //       deliveryCalendarStatus: "FINISHED",
        //       deliveryCalendarStatusName: "已完成",
        //       qty: 2,
        //     },
        //   ],
        // },
        // {
        //   date: "2023/05",
        //   deliveryList: [
        //     {
        //       date: "2023-05-29",
        //       deliveryCalendarStatus: "WAIT_DELIVERY",
        //       deliveryCalendarStatusName: "待配送",
        //       qty: 2,
        //     },
        //   ],
        // },
        // {
        //   date: "2023/03",
        //   deliveryList: [
        //     {
        //       date: "2023-03-30",
        //       deliveryCalendarStatus: "DISCONTINUED",
        //       deliveryCalendarStatusName: "待配送",
        //       qty: 2,
        //     },
        //   ],
        // },
      ], //总数据
      total: 0,
      moreText: "",
      oneHeight: uni.upx2px(844), //单个高度px
      startIndex: 0, //第一个渲染元素
      canScroll: true, // 可以监听滚动，用于节流
      scrollTop: 0, //滚动高度
      bottomHeight: 150, //触底刷新距离
      paramBefore: {
        queryHistory: 1,
        page: 1,
        size: 6,
      },

      param: {
        page: 1,
        size: 10,
        queryHistory: 0,
      },
      option: "",
    };
  },
  onShow() {},
  onLoad() {
    // queryHistory:0-当前月，1-历史月
    this.param = { ...this.calenderParams, ...this.param };
    this.paramBefore = { ...this.calenderParams, ...this.paramBefore };
    this.calcH();
    this.postCalendar();
    // console.log("this.$store.state.user.showDateModal", this.paramBefore);
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    this.$nextTick(() => {
      query
        .select(".text-centers")
        .boundingClientRect((data) => {
          // console.log("得到布局位置信息" + JSON.stringify(data));
          // console.log("节点离页面顶部的距离为", data);
        })
        .exec();
    });
  },
  computed: {
    ...mapState("user", ["calenderParams", "calenderList"]),
    //最后一个索引
    endIndex() {
      let end = this.startIndex + this.showNum * 2;
      if (!this.calendarList[end]) {
        end = this.calendarList.length;
      }
      return end;
    },
    showList() {
      return this.total <= 10
        ? this.calendarList
        : this.calendarList.slice(this.startIndex, this.endIndex);
    },
    //  空白占位
    topPadding() {
      return this.total <= 10 ? 0 : this.startIndex * this.oneHeight;
    },
    bottomPadding() {
      return this.total <= 10
        ? 0
        : (this.calendarList.length - 1 - this.endIndex) * this.oneHeight;
    },
  },
  // activated
  methods: {
    ...mapMutations("user", ["X_changeShowDateModal"]),
    ...mapActions("user", ["post_Calendar"]),
    // 容器计算
    calcH() {
      this.toDayId = "date" + getNowMonth();
      const { windowHeight } = uni.getSystemInfoSync();
      this.windowHeight = windowHeight; //可视区总高
      this.heightCalendar = windowHeight - uni.upx2px(200); //容器高度
      this.showNum = ~~(this.heightCalendar / this.oneHeight) + 2; //最多显示
      // console.log("this.toDayId", this.toDayId, this.showNum);
    },
    /**
     * 滚动监听
     */
    scroll(e: any) {
      this.scrollTop = e.target.scrollTop;
      let currentInx = Math.floor(e.target.scrollTop / this.oneHeight);
      const query = uni.createSelectorQuery().in(this);
      query
        .selectAll(".text-centers")
        .boundingClientRect((data) => {
          // console.log(
          //   "节点离页面顶部的距离为",
          //   data,
          //   uni.upx2px(876), //有32rpx上边距
          //   uni.upx2px(200)
          // );
          if (data[0].id === this.toDayId) {
            //没下拉
            // console.log(" 我是没有下拉页面");
            if (currentInx > 1) {
              this.showToday = true;
            } else {
              this.showToday = false;
              this.toMonth = 0;
            }
          } else {
            //上翻
          }
        })
        .exec();

      if (this.startIndex === currentInx) return;
      this.startIndex = currentInx;
      // console.log("当前顶部位置的索引为:" + this.startIndex);
      if (
        this.startIndex + this.showNum >
          this.calendarList.length - this.showNum &&
        !this.isLoading
      ) {
        // console.log("------------------------滚动到了屏幕底部---------------");
        this.scrolltolower();
      }
    },
    //节流加载
    handScroll(e: any) {
      this.scrollTop = e.target.scrollTop;
      if (this.canScroll) {
        this.canScroll = false;
        this.scroll(e);
        let timer = setTimeout(() => {
          this.canScroll = true;
          clearTimeout(timer);
          timer = null;
        }, 33);
      }
    },
    //触底加载
    scrolltolower() {
      // console.log("触底");
      const { total } = this.val;
      const { size } = this.param;
      const p = Math.ceil(total / size);
      if (p === this.param.page) return (this.moreText = "没有更多了");
      if (this.isLoading) return;
      this.param.page++;
      this.postCalendar();
    },
    onRestore() {
      this.triggered = false; // 需要重置
      // console.log("onRestore");
    },
    onAbort() {
      // console.log("onAbort");
    },
    tipsText() {
      this.textPull = true;
      let t = setTimeout(() => {
        this.textPull = false;
        clearTimeout(t);
      }, 2000);
    },
    // 触顶加载
    scrolltoupper() {
      // console.log("2--触顶加载", 2);
    },
    //下拉刷新
    refresherrefresh() {
      // console.log("111111111111111111111111112下拉刷新");
      // this.postCalendar(this.paramBefore);\
      if (this.upMore) return;
      this.postBefore();
      this.triggered = false; //触发onRestore，并关闭刷新图标
    },
    /**
     * @name 请求配送日历数据-FC03支持查询历史月份
     * @param p 请求参数
     */
    async postCalendar(p: any = this.param) {
      this.isLoading = true;
      try {
        //请求日历-当前月之后
        await this.post_Calendar(p);
        const data = this.calenderList;
        data.goodsImgUrl = getImgUrl(data.goodsImgUrl); //获取图片地址
        // console.log("data--日历", data);
        const allPage = Math.ceil(data.total / data.size);
        this.moreText = allPage === data.page ? "没有更多了" : "加载更多";
        this.val = data;
        this.calendarList = !!p.queryHistory
          ? [...data.deliveryCalendarList, ...this.calendarList]
          : [...this.calendarList, ...data.deliveryCalendarList]; //日历数据
        this.showSeleton = false;
        this.isLoading = false;
        this.triggered = false;
        // 触发onRestore，并关闭刷新图标
        // p.queryHistory ? () : "";
      } catch (error) {
        //
      }

      //当前账单
      // let url = this.urlapi.user.calendar;
      // const todayMM = new Date().getMonth() + 1;
      // const todayYY = new Date().getFullYear();
      //请求数据
      // const { data }: any = await api.$post(url, p);
      // const data = this.calenderList;
      // console.log("data--日历", data);
      // return;
      // const dataYYmm = data.deliveryStartDate.slice(0, -3).split("-");
      // console.log("todayYY", todayYY === +dataYYmm[0], dataYYmm);
      // return
      // const allPage = Math.ceil(data.total / data.size);
      // this.moreText = "没有更多了";
      // data.goodsImgUrl = getImgUrl(data.goodsImgUrl); //获取图片地址
      //当前日历
      // this.val = data;
      // this.calendarList = [...this.calendarList, ...data.deliveryCalendarList]; //日历数据
      // // 是否有历史
      // if (todayYY > +dataYYmm[0]) {
      //   console.log("有历史");
      //   this.hasHistory = true;
      // } else if (todayYY === +dataYYmm[0]) {
      //   this.hasHistory = todayMM > +dataYYmm[1];
      //   console.log("有历史or无历史", this.hasHistory);
      // } else {
      //   this.hasHistory = false;
      //   console.log("无历史", this.hasHistory);
      // }
    },
    /**
     * 历史数据
     */
    async postBefore() {
      // if (!this.hasHistory)
      //   return uni.showToast({
      //     title: "没有更多了",
      //     icon: "none",
      //   });
      if (this.upMore) {
        // return this.tipsText();
        return uni.showToast({
          title: "没有更多了",
          icon: "none",
        });
      } else {
        await this.post_Calendar(this.paramBefore);
        const data = this.calenderList;
        // const { data }: any = await api.$post(
        //   this.urlapi.calendar.before,
        //   this.paramBefore
        // );

        const page = Math.ceil(data.total / this.paramBefore.size);
        // tips没有更多了
        // console.log("tips没有更多了", page, this.paramBefore.page);
        if (page === data.page || page === 0) {
          this.upMore = true;
          this.textPull = true;
          uni.showToast({
            title: "没有更多了",
            icon: "none",
          });
          let t = setTimeout(() => {
            this.textPull = false;
            clearTimeout(t);
          }, 2000);
        }
        data.goodsImgUrl = getImgUrl(data.goodsImgUrl); //获取图片地址
        //历史日历

        this.calendarList = [
          ...data.deliveryCalendarList,
          ...this.calendarList,
        ];
        const len = data.deliveryCalendarList.length;
        if (len > 0) {
          this.toMonth = data.deliveryCalendarList[len - 1].date.replace(
            "/",
            "-"
          );
          // this.goToday(monthID);
        }
      }
      this.triggered = false; //触发onRestore，并关闭刷新图标
      this._freshing = false;
      this.showSeleton = false;
      // this.isLoading = false;
    },
    // // 知道了按钮
    // handleKnow() {
    //   this.showModal = !this.showModal;
    //   this.X_changeShowDateModal(false);
    // },
    // 回到当月
    goToday() {
      // console.log('val',val)
      // const yymm = getNowMonth();

      // console.log("this.toMonth", this.toMonth,yymm);
      this.toMonth = getNowMonth();
      // val ? (this.toMonth = val) : (this.toMonth = yy + "-" + mm);
    },
  },
};
</script>

<style scoped lang="scss">
.date-out {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;

  .date-position {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.65);
    .up-date {
      width: 340rpx;
      text-align: center;
      margin: 0 auto;
      margin-top: 39%;
      .up-tips {
        color: #ffffff;
        font-size: 34rpx;
        margin-bottom: 152rpx;
        margin-top: 42rpx;
      }
      .iknow-btn {
        outline: none;
        border: 2rpx solid #ffffff;
        border-radius: 254rpx;
        background: transparent;
        color: #fff;
        font-size: 34rpx;
        width: 240rpx;
        height: 104rpx;
        line-height: 104rpx;
      }
    }
  }
  .top-today {
    font-weight: bold;
    position: fixed;
    right: 32rpx;
    // top: 1064rpx;
    bottom: 120rpx;
    width: 96rpx;
    height: 96rpx;
    z-index: 101;
    opacity: 0.85;
    filter: drop-shadow(0px 0px 8px rgba(29, 155, 220, 0.12));
    image {
      width: 100%;
      height: 100%;
    }
  }
  .tips {
    width: 100%;
    background: #999;
    text-align: center;
    background-color: #6cc3ff;
    line-height: 48rpx;
    font-size: 24rpx;
    color: #fff;
  }
  .calendar-history {
    position: fixed;
    background: #999;
    color: #f1f1f1;
    height: 36rpx;
    width: 120rpx;
    text-align: center;
    right: 0;
    z-index: 999;
    top: 232rpx;
  }
  // position: relative;
  .data-calendar {
    height: calc(100% - 200rpx);
    overflow-y: auto;
    position: relative;

    .calendar-list {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .bot {
      height: 96rpx;
      text-align: center;
      color: #999;
    }
  }
}
</style>
