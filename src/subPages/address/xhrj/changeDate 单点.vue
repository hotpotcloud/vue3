<template>
  <!-- 调整日记 -->
  <view class="resize-out">
    <view class="calendar_cont">
      <XbfCalendar
        mode="open"
        resize="true"
        showSlot="false"
        @changePage="changePage"
        @change="changeDay"
        @clickDay="clickDay"
      ></XbfCalendar>
    </view>
    <view class="tips">
      点击日历数字可对待配送日进行停送，再次点击取消停送
    </view>
    <!-- 弹窗 -->
    <view class="modal" v-if="show">
      <view @click="close" class="empty"></view>

      <view class="modal-content">
        <!-- 标题 -->
        <view class="modal-top">
          {{ topname }}
          <uni-icons
            type="closeempty"
            color="#999999"
            size="12"
            class="close-icon"
            @click="close"
        /></view>
        <!-- 内容 -->
        <view class="modal-main">
          <view
            class="goods-item d-flex-center d-sb"
            v-for="(el, index) in modInfo"
            :key="index"
          >
            <img :src="el.goodsImgUrl" alt="" class="el-img" />
            <view class="el-right d-flex-colum d-sb">
              <view>
                {{ el.spuName }}
              </view>
              <view> 数量：{{ el.qty }} </view>
            </view>
          </view>
        </view>
        <!-- 按钮 -->
        <button class="submit-btn" @tap="clickSumit">
          {{ flag ? "取消停送" : "确认停送" }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import XbfCalendar from "@/components/h-date/components/xbf-calendar/xbf-calendar.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { CalendarValueEnum } from "@/utils/enum";
import { formatTime } from "@/utils/utils";
import { strYMD, getMMDD } from "@/utils/utils";
import { TWORuleEnum, StopStatusEnum } from "@/utils/enum";
export default {
  components: {
    XbfCalendar,
  },
  data() {
    return {
      //弹窗显示
      show: false,
      //请求参数
      params: {
        calendarValue: CalendarValueEnum.MONTH,
        startDate: formatTime("YYYY-mm-dd"),
      },
      //弹窗显示数据
      modInfo: [],
      //弹窗显示停送与否
      topname: "",
      flag: false,
    };
  },
  computed: {
    ...mapState("newhope", ["selectDetailGoods"]),
  },
  created() {
    this.init();
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
    ]),
    init() {
      const par = {
        calendarValue: CalendarValueEnum.MONTH,
      };
      // this.X_getMonthWeek(par);
    },
    //翻页
    changePage(e) {
      console.log("e", e);
      this.params.startDate = e;
      // this.X_getMonthWeek(this.params);
      this.X_getResizeDate(this.params);
    },
    //点击
    changeDay(e) {
      console.log("e1", e);
      this.params.startDate = e.selectedDate;
      this.X_getResizeDate(this.params);
      // this.X_getMonthWeek(this.params);
      // this.X_getSelectDetailGoods(this.params);
    },
    clickDay(e) {
      console.log("e-点击-------------", e);
      const time = strYMD({
        year: e.year,
        month: e.month,
        day: e.date,
      });
      const strDate = `${e.year}-${e.month > 9 ? e.month : "0" + e.month}-${
        e.date > 9 ? e.date : "0" + e.date
      }`;
      const mmdd = getMMDD(time);
      const selectTime = Date.parse(time.replace(/\-/g, "/"));
      //0点
      const now = new Date(new Date().toLocaleDateString()).getTime();
      console.log("time", selectTime >= now);
      //去停送
      let par = {
        status: "",
        date: strDate,
      };
      console.log("par--参数", par);
      if (e.deliveryStatus && selectTime >= now) {
        if (
          e.deliveryStatus === TWORuleEnum.WAIT_DELIVERY
          // &&selectTime >= now
        ) {
          this.show = true;
          this.topname = `停送【${mmdd}】的商品？`;
          this.flag = false;
          par.status = StopStatusEnum.DISCONTINUED;
          this.modInfo = e.goodsList;
        } else if (
          e.deliveryStatus === TWORuleEnum.DISCONTINUED
          // &&selectTime >= now
        ) {
          this.show = true;
          this.topname = `取消停送【${mmdd}】的商品？`;
          this.modInfo = e.goodsList;
          this.flag = true;
          par.status = StopStatusEnum.GENERATE;
        }
        this.V_setStopPar(par);
      } else {
        this.show = false;
        // uni.showToast({
        //   title:''
        // })
        this.modInfo = [];
      }
    },

    //关闭
    close() {
      console.log("关闭", "");
      this.show = false;
      this.modInfo = [];
    },
    //停送-起送
    async clickSumit() {
      await this.X_postStopOrStart();
      await this.X_getMonthWeek();
      await this.getSendQty();
      this.show = false;
      // uni.showToast({
      //   title: "操作成功呢！！！！",
      //   icon: "none",
      //   success: () => {
      //     this.init();

      //     this.show = false;
      //   },
      // });
    },
  },
};
</script>

<style scoped lang="scss">
.resize-out {
  padding: 20rpx 32rpx;
  height: 100vh;
  background: #f5f5f5;
}
// .calendar_cont {
//   border-radius: 40rpx;
//   overflow: hidden;
// }
.modal {
  background: rgba(0, 0, 0, 0.45);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .empty {
    height: 40%;
    // background: #ff1;
  }
  .modal-content {
    height: 60%;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    padding: 48rpx 40rpx 0;
    .modal-top {
      margin-bottom: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34rpx;
      font-weight: bold;
      text-align: center;
      position: relative;
      ::v-deep.uniui-closeempty {
        position: absolute;
        right: 0;
        transform: translateY(-50%);
      }
    }
    .modal-main {
      height: calc(100% - 292rpx);
      overflow: scroll;
    }
    .goods-item {
      border-bottom: 2rpx solid #f1f1f1;
      padding-bottom: 18rpx;
      margin-bottom: 18rpx;
      .el-img {
        border: 1rpx solid #f5f5f5;
        width: 148rpx;
        height: 148rpx;
        background: #f1f1f1;
        border-radius: 24rpx;
      }
      &:last-child {
        border: none;
        padding-bottom: 0;
        margin-bottom: 0;
      }
      .el-right {
        height: 148rpx;
        margin-left: 8rpx;
        flex: 1;
      }
    }
    // .goods-item:la
    .submit-btn {
      position: fixed;
      bottom: 68rpx;
      width: calc(100% - 80rpx);
      height: 80rpx;
      color: #fff;
      border-radius: 254rpx;
      font-size: 32rpx;
      font-weight: bold;
      background: linear-gradient(270deg, #1d9bdc 0%, #8bd0ff 100%);
    }
  }
}
.tips {
  color: #999999;
  width: 546rpx;
  line-height: 44rpx;
  margin: 0 auto;
  margin-top: 24rpx;
}
</style>
