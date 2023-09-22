<template>
  <scroll-view class="rank" scroll-y="true" @scrolltolower="scrollEnd">
    <view class="top-rank" v-if="info.length">
      <view
        :class="[`rank-${index}`]"
        v-for="(item, index) in info"
        :key="index"
      >
        <view :class="['rank-photo']">
          <view
            class="rank-photo-container"
            :style="{
              ' border-color': getColor[index],
              width: index === 1 ? '136rpx' : '88rpx',
              height: index === 1 ? '136rpx' : '88rpx',
            }"
            ><img
              :class="['user-photo', index === 1 && 'user-photo-one']"
              :src="
                item.photo ||
                'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/default-image.png'
              "
              alt=""
            />
            <img
              v-if="index === 1"
              class="crown"
              :src="'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/crown.png'"
              alt=""
            />
          </view>
        </view>
        <view :class="[index === 1 ? 'rank-name-one' : 'rank-name']">{{
          item.nickname
        }}</view>
        <view :class="['rank-num', index === 1 && 'rank-num-one']">{{
          item.rank
        }}</view>
      </view>
    </view>
    <view class="rank-main" v-if="!notLogin">
      <view class="main-self">
        <text class="self-tip">我的排名</text>
        <view class="d-flex-center d-sb">
          <view class="d-flex-center flex-1">
            <view class="d-flex-center"
              ><img
                class="self-img"
                :src="
                  allTop.photo ||
                  'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/default-image.png'
                "
                alt=""
              />
              <text class="self-name">{{ allTop.nickname || "" }}</text></view
            >
            <view class="content-self"
              ><view class="self-order">{{ allTop.successOrderNum || 0 }}</view>
              <view class="self-money">{{
                formatAmountFixedTwo(allTop.estimatedCommission || 0)
              }}</view
              ><view class="self-top">{{
                allTop.rank > allTop.showRank ? "未上榜" : allTop.rank
              }}</view></view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="list">
      <u-sticky offset-top="0">
        <view class="list-title">
          <view>排名</view>
          <view>鲜推官昵称</view>
          <view>订单数(笔)</view>
          <view>预计佣金(元)</view>
        </view>
      </u-sticky>
      <view
        class="list-item"
        v-for="(item, index) in topListVOS"
        :key="item.id"
      >
        <view>
          <image
            v-if="index < 3"
            :src="`https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/${
              index + 1
            }.png`"
          />
          <text v-else>{{ index + 1 }}</text>
        </view>
        <view>
          <view
            :style="{
              ' border-color':
                index > 2 ? getColor['default'] : getColor[index],
            }"
            :class="['image']"
            ><image
              :src="
                item.photo ||
                'https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/default-image.png'
              "
          /></view>
          <text>{{ item.nickname }}</text>
        </view>
        <view>{{ item.successOrderNum || 0 }}</view>
        <view>{{ formatAmountFixedTwo(item.estimatedCommission || 0) }}</view>
      </view></view
    >
    <button class="btn" @click="goToRank" v-if="!notLogin">去提升排名</button>
  </scroll-view>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {formatAmountFixedTwo} from "@/utils/utils";
export default {
  props: ["notLogin"],
  data() {
    return {
      page: 1,
      size: 10,
      getColor: {
        0: "#feebac",
        1: "#abcbe8",
        2: "#fdcdbe",
        default: "#f1f1f1",
      },
    };
  },
  computed: {
    ...mapState("xiaoyou", ["allTop"]),
    info() {
      const rankTopArr = this.allTop.topListVOS || [];
      const arr = [
        rankTopArr[1] || {},
        rankTopArr[0] || {},
        rankTopArr[2] || {},
      ];
      return arr;
    },
    topListVOS() {
      const rankTopArr = this.allTop.topListVOS;
      return rankTopArr || [];
    },
  },
  methods: {
    ...mapActions("xiaoyou", ["v_getDetailPagesMore"]),
    scrollEnd() {
      console.log("end");
      if (this.allTop.totalNum > this.page * this.size) {
        this.page = this.page + 1;
        this.v_getDetailPagesMore({page: this.page, size: this.size});
      }
    },
    goToRank() {
      uni.navigateTo({url: "/xiaoyouPages/product/ProductList"});
    },
    formatAmountFixedTwo(val) {
      return formatAmountFixedTwo(val, false);
    },
  },
};
</script>

<style scoped lang="scss">
.rank {
  height: 100vh;
  position: relative;
}
.top-rank {
  position: relative;
  background: linear-gradient(
    157deg,
    #1d9bdc 0%,
    #ceeeff 0%,
    rgba(185, 231, 255, 0) 100%
  );
  height: 340rpx;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/007top.png")
    no-repeat;
  background-size: cover;
  text-align: center;
  .rank-1 {
    position: absolute;
    left: 312rpx;
    top: 36rpx;
    // bottom: 28rpx;
  }
  .rank-0 {
    position: absolute;
    left: 18rpx;
    top: 110rpx;
    width: 236rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .rank-2 {
    position: absolute;
    right: 18rpx;
    top: 110rpx;
    width: 236rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .rank-photo {
    margin-bottom: 8rpx;
    .rank-photo-container {
      border: 4rpx solid;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      position: relative;
      margin: auto;
      // overflow: hidden;
    }

    .user-photo {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      // overflow: hidden;
      border: 4rpx solid #fff;
    }
    .user-photo-one {
      width: 128rpx !important;
      height: 128rpx !important;
    }
    .crown {
      position: absolute;
      width: 58rpx;
      height: 58rpx;
      left: 88rpx;
      top: -15rpx;
    }
  }
  .rank-name {
    margin-bottom: 24rpx;
    color: #fff;
    font-size: 24rpx;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .rank-name-one {
    @extend .rank-name;
    margin-bottom: 30rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .rank-num {
    // line-height: 56rpx;
    color: #fff;
    font-weight: bold;
    font-size: 48rpx;
  }
  .rank-num-one {
    font-size: 64rpx;
  }
}
.rank-main {
  padding: 24rpx 32rpx;
  padding-bottom: 0rpx;
  // height: calc(100vh - 324rpx);
  // background: #ff0;
  // position: absolute;
  // top: 324rpx;
  width: 100%;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  .self-img {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
  }
  .self-name {
    width: 164rpx;
    font-weight: bold;
    color: #666666;
    margin-left: 16rpx;
    margin-right: 16rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .content-self {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
  .self-order {
    color: #1d9bdc;
    font-weight: bold;
    // margin-left: 48rpx;
    font-size: 32rpx;
  }
  .self-money {
    font-size: 32rpx;
    font-weight: bold;
    color: #ec4747;
    // margin-left: 64rpx;
  }
  .self-top {
    color: #999;
    font-weight: bold;
    // min-width: 100rpx;
    // margin-left: 64rpx;
  }
  .main-self {
    position: relative;
    border: 2rpx solid #1d9bdc;
    border-radius: 24rpx;
    height: 120rpx;
    padding: 28rpx 32rpx;
    .self-tip {
      position: absolute;
      top: -8rpx;
      left: -1rpx;
      color: #fff;
      font-weight: bold;
      background: #1d9bdc;
      font-size: 24rpx;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
      z-index: 10;
    }
  }
}
.list {
  padding: 0rpx 32rpx 138rpx;
}
.list-title {
  display: flex;
  justify-content: space-between;
  font-size: 26rpx;
  color: #999999;
  line-height: 30rpx;
  background-color: #fff;
  padding: 22rpx 0rpx 18rpx;
  > view:nth-child(1) {
    width: 70rpx;
    text-align: center;
  }
  > view:nth-child(2) {
    width: 220rpx;
  }
  > view:nth-child(3) {
    width: 122rpx;
  }
  > view:nth-child(4) {
    width: 160rpx;
    text-align: right;
  }
}
.list-item {
  height: 120rpx;
  line-height: 120rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > view:nth-child(1) {
    width: 70rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #999999;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    > image {
      width: 48rpx;
      height: 48rpx;
    }
  }
  > view:nth-child(2) {
    width: 220rpx;
    display: flex;
    align-items: center;

    > text {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
      margin-left: 16rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  > view:nth-child(3) {
    width: 122rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #1d9bdc;
    text-align: right;
    // line-height: 38rpx;
  }
  > view:nth-child(4) {
    width: 160rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #ec4747;
    text-align: right;
    // line-height: 47rpx;
  }
  .image {
    display: inline-block;
    width: 78rpx;
    height: 78rpx;
    min-width: 78rpx;
    border-radius: 78rpx;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4rpx solid;
    > image {
      width: 64rpx;
      height: 64rpx;
      min-width: 64rpx;
      border-radius: 64rpx;
    }
  }
  // .default-image {
  //   width: 64rpx;
  //   height: 64rpx;
  //   min-width: 64rpx;
  // }
  // .one {
  //   border: 4rpx solid #feebac;
  // }
  // .two {
  //   border: 4prx solid #abcbe8;
  // }
  // .three {
  //   border: 4prx solid #fdcdbe;
  // }
  // .default {
  //   border: 4prx solid red;
  // }
}
.btn {
  width: 90vw;
  height: 88rpx;
  background: #1d9bdc;
  border-radius: 60rpx;
  font-size: 28rpx;
  color: #ffffff;
  text-align: center;
  line-height: 88rpx;
  position: fixed;
  bottom: 50rpx;
  left: 5vw;
}
</style>
