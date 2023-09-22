// 订奶账户2023-08-18 =>fc10
<template>
  <view v-if="!topListInfo.addressInfo.length" class="no-data">
    提示：暂无订奶账户，请下单后再查看
  </view>
  <view class="order-account" v-else>
    <!-- 账户信息 -->
    <a-top
      @onClickAddress="onClickAddress"
      :user="infoUser"
      :sendQty="topListInfo.sendQty"
      :addressInfo="topListInfo.curInfo"
    />
    <!-- tab切换 -->
    <view class="row-tab">
      <a-row-tab
        @onChange="onChangeTab"
        :list="tabList"
        :current="activeTab"
        :customStyle="customStyles"
      />
    </view>
    <!-- 列表 -->
    <view class="account_goods_main">
      <template v-if="longList.content && longList.content.length">
        <view v-for="(el, index) in longList.content" :key="index" class="mb24">
          <a-goods-item
            :item="el"
            :platform="el.platformSourceName"
            :company="el.companyName"
            :status="el.statusName"
            :obj="el.items[0]"
            :rules="el.rules"
            @onRecover="onRecover"
            @onCalendar="onCalendar"
            @onDetail="onDetail"
            :isBack="activeTabType === LongStopEnum.RESTORABILITY"
          />
        </view>
      </template>
      <view v-else class="empty-none">-暂无数据-</view>
    </view>
    <!-- 日历弹窗 -->
    <uCalendar
      :show="showCalendar"
      :showMark="false"
      title="恢复配送"
      round="20"
      color="#1D9BDC"
      confirmText="确定恢复"
      monthNum="12"
      :minDate="selectSupply"
      :defaultDate="selectDate"
      @close="onCloseCalendar"
      @confirm="onConfirm"
      @onClickDay="onClickDay"
    >
      <view slot="top" class="slot-date-top">
        <view class="d-flex-center d-sb">
          <text>暂停时间：</text>
          <text>{{ suspendTime }}</text>
        </view>
        <view class="d-flex-center d-sb h-margin-top16">
          <text>恢复时间：</text>
          <text>{{ selectDate.replaceAll("-", ".") }}</text>
        </view>
      </view>
    </uCalendar>
  </view>
</template>

<script>
import uCalendar from "@/components/u-calendar/u-calendar.vue";
import aTop from "./components/a-top.vue";
import aRowTab from "./components/a-rowTab.vue";
import aGoodsItem from "./components/a-goodsItem.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import { LongStopEnum } from "@/store/types";
import { getNowMonth } from "@/utils/utils";
export default {
  components: {
    aTop,
    aRowTab,
    aGoodsItem,
    uCalendar,
  },
  data() {
    return {
      showCalendar: false, //日历显示
      tabList: [
        {
          label: "在喝",
          val: 0,
          type: LongStopEnum.DRINKING,
        },
        {
          label: "可恢复",
          val: 1,
          type: LongStopEnum.RESTORABILITY,
        },
      ],
      activeTab: 0,
      activeTabType: LongStopEnum.DRINKING, //当前tab类型
      customStyles: {
        background: `linear-gradient(288deg, rgba(22,147,237,0.72) 0%, #65D7FB 100%)`,
      },
      infoUser: {},
      LongStopEnum,
      suspendTime: "", //暂停时间
      selectDate: "", //选中时间
      recoverObj: {}, //恢复对象
      page: 1,
      loadingBtn: false,
    };
  },
  computed: {
    ...mapState("orderPlan", [
      "longList",
      "orderListParams",
      "topListInfo",
      "selectSupply",
    ]),
    ...mapState("newhope", ["sendQty"]), //待配已配停送
    minDay() {
      console.log("this.selectSupply", this.selectSupply);
      return 1;
    },
  },
  async onLoad(options) {
    console.log(options);
    await this.init();
  },
  onShow() {},
  onReady() {},
  onReachBottom() {
    console.log("this.longList-触底", this.longList);
    const total = this.longList?.totalElements;
    const allPage = Math.ceil(total / 10);
    if (this.page < allPage) {
      this.page++;
      const par = {
        type: this.tabList[this.activeTab].type,
        page: this.page,
      };
      this.postLongList(par);
    }
  },
  methods: {
    ...mapMutations("order", ["setDateParams", "setLongList"]),
    ...mapActions("orderPlan", [
      "postLongList",
      "getNumWithAddress",
      "getSelectSupply",
      "postRecovery",
    ]),
    ...mapActions("order", [
      "getOrderAccount",
      "getOrderCalendar",
      "getAccountOrderList",
    ]),
    async init() {
      try {
        //用户信息
        this.infoUser = uni.getStorageSync("userMsg");
        const par = { type: this.tabList[this.activeTab].type };
        // 带配已配查询
        await this.getNumWithAddress();
        // 当前账户列表
        await this.postLongList(par);
      } catch (error) {
        console.log("error", error);
      }
    },
    async onChangeTab(e) {
      try {
        console.log(e);
        this.activeTab = e.val;
        this.activeTabType = e.type;
        this.page = 1;
        this.setLongList(null);
        await this.postLongList({ type: e.type });
      } catch (error) {
        console.log("error", error);
      }
    },
    /* 地址点击 */
    onClickAddress() {
      uni.navigateTo({
        url:
          "/child-pages/account/address/index?type=" +
          this.tabList[this.activeTab].type,
      });
    },
    /* 去恢复-打开日历 */
    async onRecover(obj) {
      try {
        console.log("obj--外部", obj);
        const { planCode, suspendTime, milkStationNo, stationAccountNo } = obj;
        this.recoverObj = obj;
        this.suspendTime = suspendTime.replaceAll("-", ".");
        // 获取供应链提前期
        await this.getSelectSupply({
          milkStationNo,
          planCode,
        });
        this.selectDate = this.selectSupply;
        console.log("this.selectSupply", this.selectSupply);
        this.showCalendar = !this.showCalendar;
      } catch (error) {
        console.log("error", error);
      }
    },
    /* 关闭日历 */
    onCloseCalendar() {
      this.showCalendar = false;
      this.selectDate = "";
      this.suspendTime = "";
    },
    onDetail(e) {
      console.log("e", e);
      const { orderNo, platformSourceCode, pause } = e;
      uni.navigateTo({
        url: `/subPages/order/orderDetail?orderNo=${orderNo}&type=2&showexpress=false&platformSourceCode=${platformSourceCode}&pause=${pause}`,
      });
    },

    /* 确认恢复 */
    async onConfirm(e) {
      try {
        if (this.loadingBtn) return;
        this.loadingBtn = true;
        const { milkStationNo, stationAccountNo, planCode } = this.recoverObj;
        await this.postRecovery({
          milkStationNo,
          stationAccountNo,
          planCode,
          recoveryTime: e[0],
        });
        await this.getAccountOrderList();
        // 刷新
        await this.init();
        uni.$u.toast("恢复成功");
        this.onCloseCalendar();
      } catch (error) {
        console.warn("error", error);
      } finally {
        setTimeout(() => {
          this.loadingBtn = false;
        }, 1500);
      }
    },
    onClickDay(e) {
      console.log("e-点击", e);
      this.selectDate = e[0];
    },
    /* 查看配送日历 */
    async onCalendar(item) {
      try {
        console.log("e", item);
        const { items } = item;
        const val = items.find((el) => el.orderNo === item.orderNo);
        const { orderNo } = val;
        const payload = {
          orderNo,
          date: getNowMonth(),
        };
        this.setDateParams(payload); //保存参数
        await this.getOrderAccount(); //履约账户列表
        await this.getOrderCalendar(); //配送日历
        // this.v_setOrderDate(payload);
        uni.navigateTo({
          url: "/subPages/order/date/index",
        });
      } catch (error) {
        //
      }
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
page {
  background-color: #f5f5f5;
}
.no-data {
  padding-top: 66rpx;
  color: #999999;
  text-align: center;
}
.order-account {
  padding: 24rpx 32rpx 68rpx;
  width: 100%;
  height: 100%;
}
.mb24 {
  margin-bottom: 24rpx;
}
.row-tab {
  margin: 24rpx 0;
}
.empty-none {
  text-align: center;
  color: #666666;
}
.slot-date-top {
  color: #666666;
  font-size: 28rpx;
  padding: 48rpx 48rpx 0;
}
</style>