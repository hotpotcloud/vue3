<template>
  <view class="weekdate-out">
    <view class="scroll-main">
      <view v-if="accountList.length > 1">
        <swiper
          :current="isSelected"
          @change="onChangeSw"
          previous-margin="32rpx"
          next-margin="32rpx"
          class="list-sw"
        >
          <swiper-item v-for="(el, index) in accountList" :key="index">
            <view
              class="scroll-item1"
              :style="{
                paddingRight: index == accountList.length - 1 ? '0' : '32rpx',
              }"
            >
              <RowAccountCard
                :info="el"
                :isSelected="isSelected === index"
                @clickCard="clickCard(el, index)"
              />
            </view>
          </swiper-item>
        </swiper>
      </view>

      <view v-else class="user-address-list">
        <RowAccountCard
          :info="accountList[0]"
          :isSelected="isSelected === 0"
          @clickCard="clickCard(accountList[0], 0)"
        />
      </view>
    </view>
    <!-- 吸顶 -->
    <view v-if="showTopSticky" class="sticky-main d-flex-center">
      <img :src="getAssetImgUrl('map-icon.png')" alt="" class="map-icon" />
      <view class="h-overflow-8-2 flex-1 h-fs-30 sub-color">
        {{ accountList[isSelected].addressConcatDoorCode }}
      </view>
    </view>
    <!-- 送奶员 -->
    <view class="date-top-main">
      <Sender @onCall="onCall" :list="senderList" />
    </view>
    <!-- 配送计划 -->
    <view class="date-top-main">
      <RowCard :info="orderGoodsList"></RowCard>
    </view>

    <view class="date-main">
      <h-base-date
        @change="onChange"
        @changePage="changeDatePage"
        @clickDay="clickDay"
        :mode="'open'"
        :clickMode="clickModal"
        :info="orderCalendarList"
      ></h-base-date>
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
          <PlanCard
            :info="selectDetailGoods.finishedList"
            @onCheckDetail="onCheckDetail"
          >
            <view slot="topname" class="tips"
              >已完成商品({{ selectDetailGoods.finishedList.length }})</view
            >
          </PlanCard>
          <PlanCard
            :info="selectDetailGoods.cancelledList"
            @onCheckDetail="onCheckDetail"
          >
            <view slot="topname" class="tips"
              >已拒收商品({{ selectDetailGoods.cancelledList.length }})</view
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
import { mapActions, mapMutations, mapState } from "vuex";
import { CalendarValueEnum, GoodsStatusEnum } from "@/utils/enum";
import { getMMDD, strYMD } from "@/utils/utils";
// import Hcalendar from "./components/Calendar.vue";
import hBaseDate from "../../components/h-base-date/h-base-date.vue";
import Sender from "./components/Sender.vue";
import planCard from "./components/plancard.vue";
import RowCard from "./components/RowCard.vue";
import RowAccountCard from "./components/RowAccountCard.vue";
export default {
  components: {
    // Hcalendar,
    planCard,
    RowCard,
    RowAccountCard,
    hBaseDate,
    Sender,
  },
  data() {
    return {
      swTopHeight: 0, //履约地址区域高度
      showTopSticky: false, //是否显示吸顶
      isSelected: 0,
      clickModal: "single",
      // defaultSelectedDate: "2021-03-01", //默认选中日期
      modal: false,
      GoodsStatusEnum,
      CalendarValueEnum, //枚举
      showModal: false,
      modalName: "",
      modalList: [],
      selectDetailGoods: {
        deliveringList: [], //配送中
        waitDeliveryList: [], //待配送
        discontinuedList: [], //已停送
        finishedList: [], //已完成
        cancelledList: [], //已拒收
      },
    };
  },
  computed: {
    ...mapState("order", [
      "orderDateParams",
      "orderDateInfo",
      "accountList",
      "orderCalendarList",
      "orderGoodsList",
      "senderList",
    ]),
  },
  onShow() {},
  onLoad(options) {
    console.log("options", options);
    // this.getOrderGoodsList();
    this.init();
  },
  onUnload() {},
  methods: {
    ...mapMutations("order", ["v_setOrderDate", "setDateParams"]),
    ...mapActions("order", [
      "getOrderDate",
      "getOrderGoodsList",
      "getOrderCalendar",
      "getOrderAccount",
      "getSenderDelivery",
    ]),
    // calcText(val) {
    //   if (val !== null) {
    //     return val;
    //   }
    //   return "暂无";
    // },
    async init() {
      try {
        // this.getSwTopHeight();
        await this.getOrderGoodsList();
        // 送奶员信息
        const par = {
          addressNo: this.accountList[0]?.addressNo,
        };
        await this.getSenderDelivery(par);
      } catch (error) {}
    },
    // fc10 履约地址高度
    getSwTopHeight() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".scroll-main")
        .boundingClientRect((data) => {
          // console.log("data-高度", data);
          this.swTopHeight = data.bottom;
        })
        .exec();
    },

    // 当前选中日期
    onChange(e) {
      console.log("e", e);
    },
    //翻页-返回当前显示日历1号日期
    async changeDatePage(e) {
      console.log("e--->翻页--->", e);
      const [year, month] = e.split("-");
      // console.log("year,month", year, month);
      // this.v_setOrderDate({ date: `${year}-${month}` });
      // this.getOrderDate();
      const payload = {
        date: `${year}-${month}`,
      };
      this.setDateParams(payload); //保存参数
      // await this.getOrderAccount(); //履约账户列表
      await this.getOrderGoodsList(); //履约商品
      await this.getOrderCalendar(); //配送日历
    },
    // 筛选状态
    onScreen(val) {
      // GENERATE = "待配送",
      // IN_STOCK = "待配送",
      // FOR_SHIPPING = "待配送",
      // IN_DISTRIBUTION = "配送中",
      // CONFIRM = "已完成",
      // DISCONTINUED = "停送",
      // CANCELLED = "停送",
      // REFUNDED = "停送",
      console.log("val", val);
      const GoodsStatusEnum = this.GoodsStatusEnum;
      this.selectDetailGoods = {
        deliveringList: [], //配送中
        waitDeliveryList: [], //待配送
        discontinuedList: [], //已停送
        finishedList: [], //已完成
        cancelledList: [], //已拒收
      };
      val.forEach((item) => {
        switch (item.status) {
          case GoodsStatusEnum.IN_DISTRIBUTION:
            item.sbNum = item.advanceQty;
            this.selectDetailGoods.deliveringList.push(item);
            break;
          case GoodsStatusEnum.GENERATE:
          case GoodsStatusEnum.IN_STOCK:
          case GoodsStatusEnum.FOR_SHIPPING:
            item.sbNum = item.advanceQty;
            this.selectDetailGoods.waitDeliveryList.push(item);
            break;
          case GoodsStatusEnum.DISCONTINUED:
          case GoodsStatusEnum.REFUNDED:
            item.sbNum = item.advanceQty;
            this.selectDetailGoods.discontinuedList.push(item);
            break;
          case GoodsStatusEnum.CANCELLED: //已拒收
            item.sbNum = item.advanceQty;
            this.selectDetailGoods.cancelledList.push(item);
            break;
          case GoodsStatusEnum.CONFIRM:
            // 已完成拆成完成和停送
            if (item.advanceQty - item.actualQty > 0) {
              const newItem = JSON.parse(JSON.stringify(item));
              newItem.actualQty = item.advanceQty - item.actualQty;
              newItem.sbNum = item.advanceQty - item.actualQty;
              newItem.status = GoodsStatusEnum.DISCONTINUED;
              this.selectDetailGoods.discontinuedList.push(newItem);
            }
            item.sbNum = item.actualQty;
            this.selectDetailGoods.finishedList.push(item);
            break;
          default:
            return;
        }
      });
    },
    //月视图点击显示弹窗
    clickDay(e) {
      console.log("e->点击视图弹出", e);
      if (!e.list) {
        return (this.modal = false);
        // return uni.showToast({
        //   title: "暂无配送商品",
        //   icon: "none",
        //   mask: true,
        // });
      }
      strYMD({ year: e.year, month: e.month, day: e.date });
      this.modalName = getMMDD(
        strYMD({ year: e.year, month: e.month, day: e.date })
      );

      this.onScreen(e.list);
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    // -----fc07
    // 点击履约地址
    async clickCard(item, index) {
      try {
        console.log("item", item);
        if (this.isSelected === index) return;
        this.isSelected = index;
        this.setDateParams({ stationAccountNo: item.stationAccountNo });
        await this.getOrderGoodsList();
        const par = {
          addressNo: item?.addressNo,
        };
        await this.getSenderDelivery(par); //送奶员
        await this.getOrderCalendar(); //配送日历
      } catch (error) {}
    },
    onChangeSw(e) {
      this.clickCard(this.accountList[e.target.current], e.target.current);
      this.isSelected = e.target.current;
    },
    onCall(e) {
      console.log("e", e);
      uni.makePhoneCall({
        phoneNumber: e,
      });
    },
  },
  //滚动吸顶
  onPageScroll() {
    this.getSwTopHeight();
    this.showTopSticky = this.swTopHeight < 0;
    // const observer = uni.createIntersectionObserver(this);
    // observer.relativeTo(".scroll-main", { top: 129 });
    // observer.observe(".weekdate-out", (res) => {
    //   console.log("res", res);
    //   // if (res.intersectionRatio > 0) {
    //   //   this.showTopSticky = false;
    //   // } else {
    //   //   this.showTopSticky = true;
    //   // }
    // });
  },
};
</script>

<style scoped lang="scss">
//外层
.weekdate-out {
  background: #f5f5f5;
  // height: 100vh;
  overflow: auto;
  .fuc-num {
    font-size: 36rpx;
    color: #333333;
  }
  .date-top {
    background: #fff;
    padding: 24rpx 48rpx;
  }
  .colo-999 {
    color: #999999;
    font-size: 26rpx;
  }
  .send-left {
    @extend .colo-999;
    padding-right: 30rpx;
    border-right: 2rpx solid #c7c7c7;
  }
  .send-right {
    @extend .colo-999;
    padding-left: 30rpx;
  }
  .margin-top-34 {
    margin-top: 34rpx;
  }
  .date-main {
    height: 100%;
    // background: #f00;
    padding: 0 32rpx 48rpx;
  }
  // fc07
  .scroll-main {
    padding-top: 24rpx;
    // background: #fff;
    // padding: 24rpx 0;
  }
  .sticky-main {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 16rpx 24rpx 16rpx 16rpx;
    .map-icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 12rpx;
    }
  }
  .date-top-main {
    padding: 0 32rpx;
    margin: 24rpx 0;
  }

  .user-address-list {
    padding: 0 32rpx;
    width: 100%;
  }
  .scroll-row {
    padding: 24rpx 0 0 32rpx;
    white-space: nowrap;
    width: 100%;
  }
  .row-main {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding-right: 32rpx;
  }
  .scroll-item {
    border-radius: 40rpx;
    width: 640rpx;
    margin-right: 16rpx;
  }
  .list-sw {
    // height: 158rpx;
    height: 202rpx;
    // background: #333333;
  }
  .scroll-item1 {
    height: 202rpx;

    border-radius: 40rpx;
    // padding-right: 32rpx;
  }
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
</style>
