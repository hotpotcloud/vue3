<template>
  <!-- 鲜推官 -->
  <view class="user">
    <view class="content-top">
      <view class="top">
        <view class="left">
          <!-- <view class="pick-date"
            ><text>2022年6月</text>
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/arrow.png"
              class="arrow-image"
            /> </view
          > -->
          <view class="count" v-if="count > 0">共{{ count }}人</view></view
        >
        <view class="right"
          ><text @click="openPopup" :class="{active: isChecked}">筛选</text
          ><image
            v-if="isChecked"
            class="filter-checked"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/arrow-checked.png" />
          <image
            v-else
            class="filter"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/tangle.png" /></view
      ></view>
      <view style="padding-top: 60rpx" v-if="list.length === 0"
        ><None v-on:btn-click="invite" btnText="立即邀请">
          <view> 您暂时还没有收益<br />赶紧去邀请朋友喝奶吧！ </view>
        </None></view
      >

      <scroll-view
        v-else
        class="scroll-view_H"
        @scrolltolower="scrollEnd"
        scroll-y="true"
      >
        <view class="list">
          <view class="list-header">
            <view class="name">用户</view>
            <view class="header-title">注册时间</view>
            <view class="header-title">最近活跃时间</view>
            <view class="header-title">订单数</view>
          </view>
          <view class="list-item" v-for="item in list" :key="item.id">
            <view class="name">
              <view>
                {{ item.nickName }}
              </view>
              <view>
                {{ handlePhone(item.phone) }}
              </view>
            </view>
            <view class="list-itm-content">{{ item.createdTime || "-" }}</view>
            <view class="list-itm-content">{{ item.orderTime || "-" }}</view>
            <view class="count-number list-itm-content">{{
              item.orderNum
            }}</view></view
          >
        </view></scroll-view
      >
      <u-overlay :show="show" @click="closePopup" :opacity="0.45">
        <view class="screen-wrap" @click.stop="stopPropagation($event)">
          <view class="screen-items-wrap">
            手机号：<input
              class="screen-input"
              :value="form.phone"
              @input="change('phone', $event)"
            />
          </view>
          <view class="screen-items-wrap">
            姓名：<input
              class="screen-input"
              :value="form.nickName"
              @input="change('nickName', $event)"
            />
          </view>
          <view class="screen-items-wrap">
            注册时间：
            <picker
              mode="date"
              :value="form.timeStart"
              @change="changeStartDate"
            >
              <view class="picker">
                {{ form.timeStart }}
              </view>
            </picker>
            <view class="date-icon"></view>
            <picker mode="date" :value="form.timeEnd" @change="changeEndDate">
              <view class="picker">
                {{ form.timeEnd }}
              </view>
            </picker>
          </view>
          <view class="btn-wrap">
            <view class="btn-cancel btn-base" @click="resetPopup">重置</view>
            <view class="btn-sure btn-base" @click="sureQuery">确定</view>
          </view>
        </view>
      </u-overlay>
    </view>
  </view>
</template>
<script>
import Vue from "vue";
import None from "../../components/None.vue";
import dayjs from "@/components/libs/util/dayjs";
import {OrdersAndRevenue} from "@/utils/url";
import {mapState} from "vuex";
import Api from "@/utils/api";

export default Vue.extend({
  props: ["time"],
  data() {
    return {
      list: [],
      show: false,
      date: 0,
      totalElements: 0,
      page: 1,
      size: 10,
      params: {},
      loading: false,
      count: 0,
      form: {
        nickName: "",
        timeEnd: "",
        timeStart: "",
        phone: "",
      },
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("xiaoyou", ["xiaoyouInfo"]),
    isChecked() {
      return (
        this.params?.timeEnd ||
        this.params?.timeStart ||
        this.params?.phone ||
        this.params?.nickName ||
        false
      );
    },
  },
  components: {None},
  mounted() {
    this.form.timeStart = this.time?.start;
    this.form.timeEnd = this.time?.end;
    this.params = {
      timeEnd: this.time?.end,
      timeStart: this.time?.start,
    };
    this.getList();
    this.getCount();
  },
  methods: {
    handlePhone(phone) {
      return phone?.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    invite() {
      uni.navigateTo({
        url: "/xiaoyouPages/home/share",
      });
    },
    async getCount() {
      const param = {
        pid: this.xiaoyouInfo.id,
        status: this.status,
        appId: this.userInfo.appId,
        page: this.page,
        size: this.size,
        ...this.params,
      };
      this.loading = true;
      const {data} = await Api.$postX(OrdersAndRevenue.distributorNum, param);
      this.count = data;
    },
    async getList(isReset = false) {
      const param = {
        pid: this.xiaoyouInfo.id,
        status: this.status,
        appId: this.userInfo.appId,
        page: this.page,
        size: this.size,
        ...this.params,
      };
      this.loading = true;
      const {data} = await Api.$postX(
        OrdersAndRevenue.subDistributorPage,
        param,
        "加载中",
        true
      );
      this.totalElements = data?.totalElements;
      if (isReset) {
        this.list = data?.content || [];
      } else {
        this.list = this.list.concat(data?.content || []);
      }
      this.loading = false;
    },
    changeStartDate(e) {
      console.log(e);
      if (dayjs(e.detail.value).isAfter(this.form.timeEnd)) {
        return uni.showToast({
          title: "不能选择截止日期之后的日期哦～",
          icon: "none",
        });
      }
      this.form.timeStart = e.detail.value;
    },
    changeEndDate(e) {
      if (dayjs(e.detail.value).isBefore(this.form.timeStart)) {
        return uni.showToast({
          title: "不能选择开始日期之前的日期哦～",
          icon: "none",
        });
      }
      this.form.timeEnd = e.detail.value;
    },
    change(key, e) {
      this.form[key] = e.detail.value;
    },
    closePopup() {
      this.show = false;
    },
    resetPopup() {
      this.show = false;
      this.form = {
        nickName: "",
        timeEnd: "",
        timeStart: "",
        phone: "",
      };
      this.params = {
        ...this.form,
      };
      this.$emit(
        "change-time",
        {
          end: "",
          start: "",
        },
        "timeUser"
      );
      this.page = 1;
      this.getList(true);
      this.getCount();
    },
    openPopup() {
      this.show = true;
      this.form.timeStart = this.params.timeStart;
      this.form.timeEnd = this.params.timeEnd;
    },
    stopPropagation(ev) {
      ev.stopPropagation();
    },
    sureQuery() {
      this.params = {
        ...this.form,
      };
      this.$emit(
        "change-time",
        {
          end: this.form.timeEnd,
          start: this.form.timeStart,
        },
        "timeUser"
      );
      this.show = false;
      this.getList(true);
      this.getCount();
    },
    scrollEnd() {
      if (
        this.page < Math.ceil(this.totalElements / this.size) &&
        this.loading === false
      ) {
        this.page = this.page + 1;
        this.getList();
      }
    },
  },
});
</script>
<style scoped lang="scss">
.user {
  flex: 1;
  display: flex;
  flex-direction: column;
  .list {
    flex: 1;
  }
}

.content-top {
  background: #f6f6f6;
  .top {
    padding: 0px 32rpx;
    display: flex;
    justify-content: space-between;
    height: 86rpx;
    line-height: 86rpx;
  }
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .pick-date {
    font-size: 30rpx;
    color: #333333;
    line-height: 35rpx;
    align-items: center;
    display: flex;
  }
  .arrow-image {
    width: 48rpx;
    height: 48rpx;
    align-items: center;
  }
  .count {
    min-width: 100rpx;
    line-height: 40rpx;
    text-align: center;
    color: #666666;
    font-size: 26rpx;
    padding: 0rpx 16rpx;
    // margin-left: 34rpx;
    background: #eaeaea;
    border-radius: 20px 20px 20px 20px;
  }

  .right {
    font-size: 24rpx;
    color: #999999;
    display: flex;
    align-items: center;
    .filter {
      width: 15rpx;
      height: 12rpx;
      margin-left: 12rpx;
    }
    .filter-checked {
      width: 32rpx;
      height: 32rpx;
    }
    .active {
      color: #1d9bdc;
    }
  }
}
.scroll-view_H {
  height: calc(100vh - 450rpx);
}
.list {
  background: #ffffff;
  border-radius: 0rpx 0rx 24rpx 24rpx;
  padding: 0rpx 32rpx;
  display: flex;
  flex-direction: column;
  .list-content {
    flex: 1;
  }

  .name {
    width: 35%;
    text-align: left;
  }
  .list-header {
    margin-top: 24rpx;
    display: flex;
    height: 36rpx;
    font-size: 26rpx;
    color: #999999;
    line-height: 30rpx;

    .header-title:nth-child(2) {
      width: 25%;
      text-align: right;
    }
    .header-title:nth-child(3) {
      width: 25%;
      text-align: right;
    }
    .header-title:nth-child(4) {
      width: 15%;
      text-align: right;
    }
  }
  .list-item {
    display: flex;
    height: 100rpx;
    font-size: 24rpx;
    color: #666666;
    line-height: 100rpx;
    border-bottom: 2rpx solid #f6f6f6;
    .name {
      line-height: 30rpx;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      > view {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .list-itm-content:nth-child(2) {
      width: 25%;
      text-align: right;
    }
    .list-itm-content:nth-child(3) {
      width: 25%;
      text-align: right;
    }
    .list-itm-content:nth-child(4) {
      width: 15%;
      text-align: right;
    }
    .count-number {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
    }
  }
}
.screen-wrap {
  width: 100vw;
  background: white;
  .screen-items-wrap {
    width: 100%;
    height: 127rpx;
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    border-bottom: 1rpx solid #eeeeee;
    font-size: 28rpx;
    color: #333333;
  }

  .screen-input {
    width: 300rpx;
    height: 68rpx;
    border-radius: 8rpx;
    background: #f5f5f5;
    font-weight: 500;
    font-size: 24rpx;
    color: #777777;
    margin-left: 28rpx;
    padding-left: 10rpx;
  }

  .picker {
    width: 240rpx;
    height: 68rpx;
    border-radius: 8rpx;
    background: #f5f5f5;
    font-weight: 500;
    font-size: 24rpx;
    color: #777777;
    line-height: 68rpx;
    position: relative;
    padding-left: 38rpx;
  }

  .picker::after {
    content: "";
    width: 16rpx;
    height: 10rpx;
    display: inline-block;
    background: url("https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-downpull-icon.png")
      no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    right: 38rpx;
    transform: translateY(-50%);
  }

  .date-icon {
    width: 32rpx;
    height: 2rpx;
    background: #999999;
    border-radius: 1rpx;
    margin: 0 17rpx;
  }

  .btn-wrap {
    width: 100%;
    height: 128rpx;
    display: flex;
  }

  .btn-base {
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 128rpx;
    font-size: 34rpx;
    text-align: center;
    letter-spacing: 2rpx;
    color: #999999;
  }

  .btn-cancel {
    border-right: 1rpx solid #eeeeee;
  }

  .btn-sure {
    color: #5ac69b;
  }
}
</style>
