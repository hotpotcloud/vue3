<!--
 * @Date: 2022-09-07 16:00:52
 * @LastEditors: ''
 * @LastEditTime: 2022-09-20 08:31:43
 * @FilePath: \xianhuo-miniprogram\src\subPages\order\components\send.vue
-->
<template>
  <view class="info-out">
    <view class="top"> 物流信息</view>
    <view class="info">
      <!-- v-if="goodsMsg.arr.length > 1" -->
      <!-- <scroll-view scroll-x> -->
      <view class="tab d-flex-nowarp" v-if="goodsMsg.arr.length > 1">
        <view
          v-for="i in goodsMsg.arr.length"
          :key="i"
          @tap="changeTab(i)"
          :class="[
            'tab-current',
            currentTab === i && 'active-tab',
            i > 8 && 'maxw',
          ]"
          >包裹{{ i + 1 }}</view
        >
      </view>
      <!-- </scroll-view> -->
      <view class="info-detail">
        <view class="d-flex-row margin16">
          <view>商品名称：</view>
          <!-- currnetInfo.goodsName ? currnetInfo.goodsName : proName -->
          <view>
            <view v-for="(sku, index) in currnetInfo.item" :key="index">{{
              sku.skuName
            }}</view>
          </view>
        </view>
        <view class="d-flex-center margin16">
          <view>物流公司：</view>
          <view>{{
            currnetInfo.trackingCompany ? currnetInfo.trackingCompany : "-"
          }}</view>
        </view>
        <view class="d-flex-center margin16">
          <view>物流单号：</view>
          <view class="d-flex-center" @click="copyData(currnetInfo.expressNo)"
            >{{ currnetInfo.expressNo ? currnetInfo.expressNo : "-" }}
            <image
              class="copy-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/copy.png"
          /></view>
        </view>
      </view>
    </view>
    <!-- 轨迹步骤 -->
    <view class="physical" v-if="showInfo.length">
      <view class="d-flex-row-end" v-for="(el, index) in showInfo" :key="index">
        <view :class="[index === 0 ? 'phy-msg' : 'phy-msg-else']">
          <!-- <view class="topremark">已签收{{ index }}</view> -->
          <view>
            <!-- {{ el.remark }} -->
            <view
              v-for="(item, index) in el.descList"
              :key="index"
              style="display: inline"
            >
              <!-- <text :class="[item.type=='phone'?'active':'']">{{item.words}}</text> -->
              <text v-if="item.type === 'text'">{{ item.words }}</text>
              <text
                user-select
                v-else-if="item.type === 'phone'"
                class="active"
                @click="onCalls(item)"
                >{{ item.words }}</text
              >
            </view>
          </view>
          <view>{{ el.times }}</view>
        </view>
      </view>
      <view @click="checkMore" class="show-btn" v-if="showType">
        <text class="text-btn">
          {{ showMore ? "收起查看" : "查看完整物流" }}</text
        >
        <uni-icons type="bottom" color="#1D9BDC" size="16" v-if="!showMore" />
        <uni-icons type="top" color="#1D9BDC" size="16" v-else />
      </view>
    </view>
    <view class="text-btn" v-else style="margin-top: 16rpx">暂无物流信息</view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { formatTime } from "@/utils/utils";
export default {
  name: "Send",
  props: {
    proName: {
      type: String,
      default: "-",
    },
    showType: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentTab: 0,
      showMore: false,
      // tabNow:0,
      pagetab: 0,
    };
  },
  computed: {
    ...mapState("order", ["goodsMsg"]),
    currnetInfo() {
      console.log("goodsMsg物流信息", this.goodsMsg.arr[this.currentTab]);
      console.log("goodsMsg物流信息--?>11", this.goodsMsg);
      return this.goodsMsg.arr[this.currentTab];
    },
    // 物流信息处理
    showInfo() {
      let noArr = [];
      // if (this.goodsMsg.arr[this.currentTab].context) {
      //   noArr = this.goodsMsg.arr[this.currentTab].context?.map((ite) => {
      //     let list = ite.remark.split(/(1\d{10})/);
      //     let descList = [];
      //     for (let i in list) {
      //       // 判断是否是手机号
      //       let flag = list[i] != "" && /^(1\d{10})$/.test(list[i]);
      //       // 赋值
      //       list[i] != "" &&
      //         descList.push({ type: flag ? "phone" : "text", words: list[i] });
      //     }
      //     ite.descList = descList;
      //     // console.log("list", ite);
      //     return ite;
      //   });
      // }
      if (this.goodsMsg.arr[this.currentTab].deliverDetails) {
        noArr = this.goodsMsg.arr[this.currentTab].deliverDetails?.map(
          (ite) => {
            let list = ite.remark.split(/(1\d{10})/);
            let descList = [];
            for (let i in list) {
              // 判断是否是手机号
              let flag = list[i] != "" && /^(1\d{10})$/.test(list[i]);
              // 赋值
              list[i] != "" &&
                descList.push({
                  type: flag ? "phone" : "text",
                  words: list[i],
                });
            }
            ite.descList = descList;
            // console.log("list", ite);
            return ite;
          }
        );
      }
      console.log("noArr", noArr);
      const arrs = noArr[0] ? [noArr[0]] : [];
      // return this.showMore ? this.goodsMsg.arr[this.currentTab].context : arrs;
      return this.showMore
        ? this.goodsMsg.arr[this.currentTab].deliverDetails
        : arrs;
    },
  },
  methods: {
    //切换包裹
    changeTab(i) {
      this.currentTab = i;
      // this.pagetab = i;
      // console.log("i,this.currentTab", i, this.currentTab);
    },
    //打电话
    onCalls(phone) {
      // console.log("phone", phone);
      uni.makePhoneCall({
        phoneNumber: phone.words,
      });
    },
    //查看更多
    checkMore() {
      this.showMore = !this.showMore;
    },
    // 复制
    copyData(orderNo) {
      uni.setClipboardData({
        data: orderNo,
        showToast: false,
        success: (res) => {
          uni.showToast({
            icon: "none",
            title: "单号复制成功",
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.info-out {
  background: #fff;
  padding: 48rpx 32rpx 32rpx;
  border-radius: 40rpx;
  .top {
    font-size: 30rpx;
    font-weight: bold;
  }
  .info {
    margin-top: 16rpx;
    padding-bottom: 32rpx;
    border-bottom: 2rpx dashed #f1f1f1;
    .margin16 {
      margin-top: 16rpx;
    }
    .tab {
      // background: #1d9bdc;
      // padding: 16rpx 0;
      margin: 16rpx 0 32rpx;
      overflow-x: auto;
      .tab-current {
        margin-right: 48rpx;
        padding: 16rpx 0;
        min-width: 68rpx;
        &:last-child {
          margin: 0;
        }
        &.maxw {
          min-width: 86rpx;
        }
        &.active-tab {
          border-bottom: 4rpx solid #1d9bdc;
          color: #1d9bdc;
          font-weight: bold;
        }
      }
    }
    .copy-icon {
      width: 38rpx;
      height: 38rpx;
      margin-left: 8rpx;
    }
  }
  .physical {
    margin-top: 32rpx;
    background: #fff;

    .phy-msg {
      width: 586rpx;
      //   background: #f00;
      position: relative;
      z-index: 1;
      padding-bottom: 16rpx;
      color: #999999;
      &::before {
        position: absolute;
        z-index: 3;
        top: 6rpx;
        left: -28rpx;
        content: "";
        width: 20rpx;
        height: 20rpx;
        background: #1d9bdc;
        border-radius: 10rpx;
      }
      &::after {
        position: absolute;
        z-index: 2;
        top: 30rpx;
        left: -18rpx;
        content: "";
        height: calc(100% - 30rpx);
        width: 2rpx;
        background: #c7c7c7;
      }
      .topremark {
        color: #1d9bdc;
      }
    }
    .phy-msg-else {
      @extend .phy-msg;
      &::before {
        background: #fff;
        width: 16rpx;
        height: 16rpx;
        border: 2rpx solid #c7c7c7;
        left: -28rpx;
      }
      .topremark {
        color: #999999;
      }
    }
    .show-btn {
      text-align: center;
      margin-top: 8rpx;
      color: #1d9bdc;
    }
  }
  .active {
    color: #1d9bdc;
    display: inline-block;
  }
}
</style>
