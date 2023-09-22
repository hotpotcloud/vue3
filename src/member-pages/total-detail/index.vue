/* 积分明细 */
<template>
  <view class="total-detail-out">
    <view class="total-top d-flex-center d-sb">
      <view>
        <text class="total-num">{{ memberInfoFc09.usablePoint }}</text>
        <text class="h-fs-30">积分</text>
      </view>
      <view class="total-cold">
        冻结中：<text>{{
          memberInfoFc09.freezePoint ? memberInfoFc09.freezePoint : 0
        }}</text>
      </view>
    </view>

    <!-- 明细列表 -->
    <view class="main_list">
      <view class="list_items" v-if="integralDetail.content">
        <view
          class="item_main"
          v-for="(item, i) in integralDetail.content"
          :key="i"
        >
          <numItem
            :leftText="item.variationDescrible"
            :time="item.variationTime"
            :rightNum="numMath(item.variationType, item.variationNum)"
          />
        </view>
      </view>
      <view v-else class="none-data"> -- 暂无数据 -- </view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapState } from "vuex";
import numItem from "../components/num-item.vue";
export default {
  components: {
    numItem,
  },
  data() {
    return {
      req: {
        page: 1,
        size: 10,
      },
    };
  },
  computed: {
    ...mapState("member", ["integralDetail", "memberInfoFc09"]),
    //积分根据type判断正负
    numMath() {
      // 变更类型 +1：获取积分 -2：消耗积分
      return (type, num) => {
        if (num === 0) return num;
        if (type === 1) {
          return "+" + num;
        } else {
          return num > 0 ? "-" + num : num;
        }
      };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    ...mapActions("member", ["getIntegralDetail"]),
    //触底加载
    async onReachBottom() {
      try {
        const { totalElements } = this.integralDetail;
        const totalPage = Math.ceil(totalElements / this.req.size);
        console.log("触底加载", totalPage);
        if (totalPage <= this.req.page) return;
        this.req.page++;
        await this.getIntegralDetail(this.req);
      } catch (error) {
        //
      }
    },
  },
  onReachBottom() {
    console.log("1=触底", 1);
    this.onReachBottom();
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
page {
  background: #f5f5f5;
}
.total-detail-out {
  width: 100%;
  height: 100%;
  .total-top {
    color: #fff;
    // border: 1rpx solid #f0f;
    background: #302d2c;
    padding: 32rpx 32rpx 100rpx 32rpx;
    .total-num {
      font-size: 64rpx;
      font-weight: bold;
    }
    .total-cold {
      height: 54rpx;
      // min-width: 160rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 24rpx;
    }
  }

  .main_list {
    height: 100%;
    position: relative;
    .none-data {
      padding-top: 120rpx;
      color: #999;
      text-align: center;
    }
    .list_items {
      border-top-left-radius: 24rpx;
      border-top-right-radius: 24rpx;
      padding: 54rpx 32rpx 68rpx;
      position: absolute;
      top: -68rpx;
      left: 32rpx;
      right: 32rpx;
      background: #fff;

      .item_main {
        border-bottom: 1rpx solid #f1f1f1;
        padding-bottom: 24rpx;
        margin-bottom: 24rpx;
        &:last-child {
          border: none;
        }
      }
    }
  }
}
</style>
