<!--
 * @Date: 2022-09-07 16:00:52
 * @LastEditors: ''
 * @LastEditTime: 2022-09-20 13:59:18
 * @FilePath: \xianhuo-miniprogram\src\pages\order\components\card.vue
-->
<template>
  <view class="info-out" v-if="show">
    <view class="top"> 物流信息</view>
    <view class="info">
      <view class="tab d-flex-nowarp" v-if="goodsMsg.arr.length > 1">
        <view
          v-for="i in goodsMsg.arr.length"
          :key="i"
          @click="changeTab(i)"
          :class="[
            'tab-current',
            currentTab === i && 'active-tab',
            i > 8 && 'maxw',
          ]"
          >包裹{{ i + 1 }}</view
        >
      </view>
      <view class="info-detail">
        <view class="d-flex-row margin16">
          <view>商品名称：</view>
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
              v-show="currnetInfo.expressNo"
              class="copy-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/copy.png"
          /></view>
        </view>
      </view>
    </view>
    <!-- 轨迹步骤 -->
    <view class="physical" v-if="showInfo.length">
      <view class="phy-msg">
        <view v-for="(item, index) in showInfo[0].descList" :key="index">
          <text v-if="item.type === 'text'">{{ item.words }}</text>
          <text
            user-select
            v-else-if="item.type === 'phone'"
            class="active"
            @click="onCalls(item)"
            >{{ item.words }}</text
          >
        </view>
        <view>{{ showInfo[0].times }}</view>
      </view>
      <view class="check-more-btn" @click="checkMore">查看完整物流</view>
    </view>
    <view class="text-btn" v-else>暂无物流信息</view>
    <!-- 弹窗 -->
    <u-overlay :show="showMore" :zIndex="1000">
      <view class="bgtop" @tap.stop="showMore = false"></view>
      <view class="more-info">
        <view class="title-top">
          <view class="topname"> 物流信息</view>
          <view class="closeicon" @tap.stop="showMore = false">
            <u-icon name="close" color="#909399" size="17"></u-icon>
          </view>
        </view>
        <view class="physical content-sendinfo" v-if="showInfo.length">
          <view v-for="(el, index) in showInfo" :key="index">
            <view :class="[index === 0 ? 'phy-msg' : 'phy-msg-else']">
              <view>
                <view
                  v-for="(item, index) in el.descList"
                  :key="index"
                  style="display: inline"
                >
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
          <u-safe-bottom></u-safe-bottom>
        </view>
      </view>
    </u-overlay>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { sendPhone } from "@/utils/utils";
export default {
  name: "Send",
  props: {
    proName: {
      type: String,
      default: "-",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentTab: 0,
      showMore: false,
      pagetab: 0,
    };
  },
  computed: {
    ...mapState("order", ["goodsMsg"]),
    currnetInfo() {
      return this.goodsMsg.arr[this.currentTab];
    },
    //显示一条物流
    showOne() {
      console.log("this.showInfo[0]", this.showInfo[0]);
      return this.showInfo[0];
    },
    // 显示更多物流信息处理
    showInfo() {
      if (!this.show) return [];
      if (!this.goodsMsg.arr[this.currentTab].deliverDetails) return [];
      const noArr = sendPhone(
        this.goodsMsg.arr[this.currentTab].deliverDetails
      );
      const arrs = noArr[0] ? [noArr[0]] : [];
      return this.showMore
        ? this.goodsMsg.arr[this.currentTab].deliverDetails
        : arrs;
    },
  },
  methods: {
    //切换包裹
    changeTab(i) {
      this.currentTab = i;
      this.pagetab = i;
      console.log("i,this.currentTab", i, this.currentTab);
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
      console.log("this.showOne", this.showOne);
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
  padding: 24rpx 32rpx;
  border-radius: 24rpx;
  margin-bottom: 24rpx;
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
      margin: 16rpx 0 32rpx;
      overflow-x: auto;
      .tab-current {
        margin-right: 48rpx;
        padding: 16rpx 0;
        min-width: 68rpx;
        &:last-child {
          margin: 0;
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
      position: relative;
      left: 44rpx;
      z-index: 1;
      padding-bottom: 16rpx;
      color: #999999;
      &::before {
        position: absolute;
        z-index: 3;
        top: 6rpx;
        left: -28rpx;
        left: -40rpx;
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
        left: -30rpx;
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
  .check-more-btn {
    margin: 16rpx auto 0;
    text-align: center;
    background: #fff;

    border: 1rpx solid #1d9bdc;
    width: 164rpx;
    height: 54rpx;
    line-height: 54rpx;
    border-radius: 76rpx;
    color: #1d9bdc;
    font-size: 22rpx;
  }
  .text-btn {
    margin-top: 12rpx;
  }

  .bgtop {
    height: 50vh;
  }

  .more-info {
    .title-top {
      font-size: 34rpx;
      font-weight: bold;
      text-align: center;
      position: relative;
      .closeicon {
        position: absolute;
        right: 0rpx;
        top: 8rpx;
      }
    }
    padding: 40rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50vh;
    background: #fff;
    z-index: 10079;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    .content-sendinfo {
      height: calc(50vh - 160rpx);
      overflow: auto;
      @extend.physical;
      width: 100%;
      .phy-msg {
        left: 64rpx;
        &::before {
          left: -52rpx;
        }
        &::after {
          left: -45rpx;
        }
      }
      .phy-msg-else {
        &::before {
          left: -52rpx;
        }
      }
      .show-btn {
        text-align: center;
        margin-top: 8rpx;
        color: #1d9bdc;
      }
    }
  }
}
</style>
