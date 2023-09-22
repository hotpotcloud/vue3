<template>
  <view class="weekdate-out">
    <!-- 顶部选择 -->
    <view class="d-flex-center d-sb h-margin-bot16">
      <view
        @tap="changeAddress"
        class="user-address flex-1 d-flex-center"
        style="margin-right: 100rpx; color: #666666"
        v-if="calendarList.addressDetail"
      >
        <text class="h-over-1">{{ calendarList.addressDetail }}</text>
        <uni-icons type="forward" color="#666666" size="12"
      /></view>
      <view @tap="editNote" class="d-flex-center newcolor">
        <image
          class="rili"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/rili.png"
          mode="scaleToFill"
        />
        调整日记</view
      >
    </view>
    <!-- 配送数量 -->
    <view class="send-nums">
      <view class="num-item flex-1">
        <view class="item-num">{{ sendQty.forQty ? sendQty.forQty : 0 }}</view>
        <view class="item-text">待配送</view>
      </view>
      <view class="num-item num-border flex-1">
        <view class="item-num">{{
          sendQty.deliveredQty ? sendQty.deliveredQty : 0
        }}</view>
        <view class="item-text">已配送</view>
      </view>
      <view class="num-item flex-1">
        <view class="item-num">{{
          sendQty.stopDeliveredQty ? sendQty.stopDeliveredQty : 0
        }}</view>
        <view class="item-text">已停送</view>
      </view>
    </view>
    <!-- 日历信息 -->
    <!-- :defaultSelectedDate="curParams.startDate" -->
    <Hcalendar
      :defaultSelectedDate="curParams.startDate"
      showOff="true"
      showSlot="true"
      :sundayIndex="0"
      :mode="mode"
      @changes="changes"
      @change="changeDay"
      @changePage="changeDatePage"
      @clickDay="clickDay"
      @chooseDate="chooseDate"
    >
      <!-- cellHeight="194" -->

      <view slot="btn" @tap="chageMode" class="mode-month">
        <text :class="['week_on', mode === 'close' && 'active_on']">周</text>
        <text :class="['month_on', mode === 'open' && 'active_on']">月</text>
      </view>
    </Hcalendar>
    <!-- 周计划时显示 -->
    <view class="send-info-week" v-if="mode === 'close'"
      >-{{ topName }}配送情况-</view
    >
    <view v-if="show">
      <view v-if="showNone">
        <!-- 配送中 -->
        <PlanCard
          :info="selectDetailGoods.deliveringList"
          @onCheckDetail="onCheckDetail"
        >
          <view slot="topname">配送中</view>
        </PlanCard>
        <!-- 待配送 -->
        <PlanCard
          :info="selectDetailGoods.waitDeliveryList"
          @onCheckDetail="onCheckDetail"
        >
          <view slot="topname">待配送</view>
        </PlanCard>
        <!-- 待评价 -->
        <PlanCard
          :info="selectDetailGoods.waitCommentList"
          @onCheckDetail="onCheckDetail"
          @toComment="toComment"
        >
          <view slot="topname">待评价</view>
        </PlanCard>
        <!-- 已拒收 -->
        <PlanCard
          :info="selectDetailGoods.cancelList"
          @onCheckDetail="onCheckDetail"
        >
          <view slot="topname">已拒收</view>
        </PlanCard>
        <!-- 已完成 -->
        <PlanCard
          :info="selectDetailGoods.finishedList"
          @onCheckDetail="onCheckDetail"
          @toComment="toComment"
        >
          <view slot="topname">已完成</view>
        </PlanCard>
        <!-- 已停送 -->
        <PlanCard
          :info="selectDetailGoods.discontinuedList"
          @onCheckDetail="onCheckDetail"
          @toComment="toComment"
        >
          <view slot="topname">已停送</view>
        </PlanCard>
      </view>
      <view v-else class="none-content">
        <img
          class="none-img"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/nopro.png"
          alt=""
        />
        <view class="none-text">当日暂无配送商品</view>
      </view>
    </view>

    <!-- 弹窗 -->
    <view v-if="modal" class="modal">
      <view class="empty" @tap="closeModal"></view>
      <view class="modal-content">
        <view @tap="closeModal" class="modal-name"
          >【{{ modalName }}】配送情况
          <uni-icons
            type="closeempty"
            color="#999999"
            size="12"
            class="close-icon"
            @tap="closeModal"
        /></view>
        <scroll-view scroll-y class="scroll-y">
          <PlanCard
            :info="selectDetailGoods.deliveringList"
            @onCheckDetail="onCheckDetail"
          >
            <view slot="topname" class="tips"
              >配送中商品({{ selectDetailGoods.deliveringList.length }})</view
            >
          </PlanCard>
          <PlanCard
            :info="selectDetailGoods.waitDeliveryList"
            @onCheckDetail="onCheckDetail"
          >
            <view slot="topname" class="tips"
              >待配送商品({{ selectDetailGoods.waitDeliveryList.length }})</view
            >
          </PlanCard>
          <!-- 待评价 -->
          <PlanCard
            :info="selectDetailGoods.waitCommentList"
            @onCheckDetail="onCheckDetail"
            @toComment="toComment"
          >
            <view slot="topname"
              >待评价商品({{ selectDetailGoods.waitCommentList.length }})</view
            >
          </PlanCard>
          <PlanCard
            :info="selectDetailGoods.finishedList"
            @onCheckDetail="onCheckDetail"
            @toComment="toComment"
          >
            <view slot="topname" class="tips"
              >已完成商品({{ selectDetailGoods.finishedList.length }})</view
            >
          </PlanCard>
          <!-- 已拒收 -->
          <PlanCard
            :info="selectDetailGoods.cancelList"
            @onCheckDetail="onCheckDetail"
          >
            <view slot="topname"
              >已拒收商品({{ selectDetailGoods.cancelList.length }})</view
            >
          </PlanCard>
          <PlanCard
            :info="selectDetailGoods.discontinuedList"
            @onCheckDetail="onCheckDetail"
          >
            <view slot="topname" class="tips"
              >已停送商品({{ selectDetailGoods.discontinuedList.length }})</view
            >
          </PlanCard>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
// import Hcalendar from "@/components/h-date/components/h-calendar/Calendar.vue";
import Hcalendar from "./components/h-calendar/Calendar.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import PlanCard from "@/subPages/address/xhrj/components/plancard.vue";
import { CalendarValueEnum, TWORuleEnum } from "@/utils/enum";
import { getMMDD, strYMD } from "@/utils/utils";
export default {
  components: {
    Hcalendar,
    PlanCard,
  },
  data() {
    return {
      mode: "close",
      showGoods: true,
      CalendarValueEnum, //枚举
      showModal: false,
      modalName: "",
      // showNone: false, //暂无数据显示
    };
  },
  computed: {
    ...mapState("newhope", [
      "curParams",
      "curChooseDate",
      "calendarList",
      "selectDetailGoods",
      "showNone",
      "sendQty",
    ]),
    show() {
      console.log("this.showNone", this.showNone);
      return this.mode === "close";
    },
    modal() {
      return this.mode === "open" && this.showModal;
    },
    // 计算日期标题
    topName() {
      const time = this.curParams.startDate.split("-");
      const str = time[1] + "月" + time[2] + "日";
      return str;
    },
  },
  watch: {
    mode(newv, oldv) {
      console.log("newv,oldv", newv, oldv);
      this.V_setCurParams({
        calendarValue:
          newv === "open" ? CalendarValueEnum.MONTH : CalendarValueEnum.WEEK,
      });
      this.X_getMonthWeek();
    },
  },
  methods: {
    ...mapMutations("newhope", [
      "V_setCurParams",
      "V_setsendParams",
      "V_setShowNone",
      "setEvaluateParams",
    ]),
    ...mapActions("newhope", [
      "X_getSelectListByAddressNo",
      "X_getSelectDetailGoods",
      "X_getmonthCalendar",
      "X_getCurrentCalendar",
      "X_getMonthWeek",
      "X_getResizeDate",
      "postMessage",
    ]),
    //修改履约地址
    changeAddress() {
      uni.navigateTo({
        url: "/subPages/address/xhrj/AddChoose?type=week",
        success: () => {
          this.X_getSelectListByAddressNo();
        },
      });
    },
    //调整日记
    editNote() {
      uni.navigateTo({
        url: "/subPages/address/xhrj/changeDate",
        success: () => {
          this.X_getResizeDate();
        },
      });
    },
    // 切换周月
    chageMode() {
      this.mode = this.mode === "close" ? "open" : "close";
    },
    changeDatePage(e) {
      console.log("e--->翻页--->", e);
      this.V_setCurParams({
        startDate: e,
      });
      this.X_getMonthWeek();
    },
    //点击天数-请求日计划
    changeDay(e) {
      console.log("e我了", e, this.curChooseDate);
      // if (this.curChooseDate.goodsList?.length) {
      this.V_setCurParams({
        startDate: e.selectedDate,
      });
      this.X_getMonthWeek();
      this.X_getSelectDetailGoods();
      // this.V_setShowNone(true);
      // this.showNone = false;
      // } else {
      // this.V_setShowNone(false);
      // this.showNone = true;
      // }
    },
    //点击查看配送日历
    onCheckDetail(el) {
      console.log("el--点击查看配送计划", el);
      const val = {
        channelSkuCode: el.channelSkuCode,
        page: 1,
        size: 10,
      };
      this.V_setsendParams(val);
      this.X_getCurrentCalendar();

      uni.navigateTo({
        url: "/subPages/address/xhrj/date/index",
      });
    },
    changes(e) {
      this.mode = e;
      console.log("1e", e);
    },
    //月视图点击显示弹窗
    clickDay(e) {
      if (!e.goodsList) return (this.showModal = false);
      strYMD({ year: e.year, month: e.month, day: e.date });
      this.modalName = getMMDD(
        strYMD({ year: e.year, month: e.month, day: e.date })
      );
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    /* fc08-评价 */
    async toComment(info) {
      try {
        const { deliveryCalendarStatus } = info[0];
        const deliveryOrderNos = info.map((item) => item.deliveryOrderNo);
        console.log("info", info, deliveryOrderNos);
        this.setEvaluateParams({ deliveryOrderNos });
        await this.postMessage({ deliveryOrderNos });

        // 待评价;
        if (deliveryCalendarStatus === TWORuleEnum.WAIT_COMMENT) {
          uni.redirectTo({
            url: "/member-pages/comment/index",
          });
        } else if (deliveryCalendarStatus === TWORuleEnum.FINISHED) {
          // 已评价
          uni.navigateTo({
            url: "/member-pages/comment/index",
          });
        }
      } catch (error) {
        console.log("error33", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
//外层
.weekdate-out {
  height: 100vh;
  background: #f5f5f5;
  padding: 24rpx 32rpx;
  overflow: auto;
  .rili {
    height: 32rpx;
    width: 32rpx;
    margin-right: 4rpx;
  }
}
//周月切换
.mode-month {
  width: 132rpx;
  height: 52rpx;
  background: #e4f4ff;
  border-radius: 44rpx;
  padding: 4rpx;
  .week_on,
  .month_on {
    display: inline-block;
    width: 62rpx;
    height: 44rpx;
    line-height: 44rpx;
    text-align: center;
    color: #1d9bdc;
  }
  .active_on {
    background: #1d9bdc;
    border-radius: 44rpx;
    color: #fff;
  }
}

.send-info-week {
  text-align: center;
  margin: 24rpx 0;
  color: #999999;
  // display: none;
}
.none-content {
  text-align: center;
  color: #a9a9a9;
  margin-top: 104rpx;
}
.none-img {
  width: 196rpx;
  height: 240rpx;
  margin: 0 auto;
  margin-bottom: 34rpx;
}

//弹窗
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: 99;
  background: rgba($color: #000, $alpha: 0.4);
  .empty {
    height: 32%;
  }
  .modal-content {
    border-radius: 40rpx 40rpx 0rpx 0rpx;

    padding: 48rpx 24rpx;
    padding-bottom: 36rpx;
    height: 68%;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    // overflow-y: auto;

    .modal-name {
      font-size: 34rpx;
      font-weight: bold;
      text-align: center;
      position: relative;
      margin-bottom: 48rpx;
      ::v-deep.uniui-closeempty {
        position: absolute;
        right: 0;
        transform: translateY(40%);
      }
    }
    .tips {
      font-weight: bold;
      font-size: 30rpx;
      margin-bottom: 18rpx;
    }
    .scroll-y {
      height: calc(100% - 144rpx);
    }
  }
}
.send-nums {
  height: 170rpx;
  padding: 32rpx 0;
  background: #fff;
  border-radius: 40rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .num-border {
    border-left: 2rpx solid #f1f1f1;
    border-right: 2rpx solid #f1f1f1;
  }
  .num-item {
    text-align: center;
    .item-num {
      color: #333333;
      font-weight: bold;
      font-size: 44rpx;
      margin-bottom: 8rpx;
    }
    .item-text {
      color: #999999;
      font-size: 26rpx;
    }
  }
}
</style>
