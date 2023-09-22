/* 成长值 */
<template>
  <view class="growth-value-out">
    <view class="growth-top d-flex-center d-sb">
      <view>
        <text class="h-fs-30">当前成长值</text>
        <text class="total-num">{{ memberInfoFc09.growthValue }}</text>
      </view>
    </view>

    <!-- 明细列表 -->
    <view class="main_list">
      <view class="list_items">
        <view
          class="items_box"
          v-for="(item, n) in growthValue.content"
          :key="n"
        >
          <view
            class="top-month d-flex-center d-sb"
            :class="[item.isOpen && 'top-month_none']"
          >
            <view class="month-name">{{ month(item.yearMonth) }}</view>
            <view class="d-flex-center" @tap="openMore(item, n)">
              <text class="total-getnum"
                >{{ item.totalGrowthValue >= 0 ? "获得" : "消耗" }}
                <text class="num-math">{{
                  Math.abs(item.totalGrowthValue)
                }}</text
                >成长值</text
              >
              <uni-icons
                :type="item.isOpen ? 'bottom' : 'top'"
                color="#666666"
                size="12"
              ></uni-icons>
            </view>
          </view>
          <template v-if="item.isOpen">
            <view
              class="item_main"
              v-for="(el, i) in item.monthDetail"
              :key="i"
            >
              <numItem
                :leftText="el.reason"
                :time="el.recordTime"
                :rightNum="numMath(el.type, el.growthValue)"
              >
                <text slot="text" class="slot-tips">成长值</text>
              </numItem>
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import numItem from "../components/num-item.vue";
export default {
  components: {
    numItem,
  },
  data() {
    return {
      isMore: false, //是否查看更多
      current: -1,
      // list: [],
      req: {
        page: 1,
        size: 100,
      },
    };
  },
  computed: {
    ...mapState("member", ["growthValue", "memberInfoFc09"]),
    // listValue(){},
    //转换年月-本月返回本月
    month() {
      return (num) => {
        // if (!yearMonth) return;
        const yearMonth = num?.toString();
        const year = yearMonth?.slice(0, 4);
        const month = yearMonth?.slice(4);
        const curDate = new Date();
        const curYear = curDate.getFullYear();
        const curMonth = curDate.getMonth() + 1;
        if (year == curYear && month == curMonth) {
          return "本月";
        } else if (year == curYear) {
          return `${month}月`;
        } else {
          return `${year}年${month}月`;
        }
      };
    },
    // 根据type显示加减积分
    numMath() {
      // 变更类型：+1-获取成长值，-2-消耗成长值，-3-成长值过期 +4-初始化成长值 +5-1.0迁移成长值
      return (type, num) => {
        if (num === 0) return num;
        if (type === 1 || type === 4 || type === 5) {
          return `+${num}`;
        } else {
          return num < 0 ? num : `-${num}`;
        }
      };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onReachBottom() {
    console.log("2-触底", 2);
    this.onReachBottom();
  },
  onShow() {
    this.req = {
      page: 1,
      size: 100,
    };
  },
  onReady() {},
  methods: {
    ...mapMutations("member", ["setGrowthOff"]),
    ...mapActions("member", ["getGrowthValue"]),
    openMore(item, n) {
      console.log("item", n, item);
      this.setGrowthOff({ type: !item.isOpen, index: n });
      this.current = n;
      this.isMore = !this.isMore;
    },
    // initData() {
    //   const list = uni.$u.deepClone(this.growthValue);
    //   this.list = list.content.map((el) => {
    //     el.isOpen = false;
    //     return el;
    //   });
    // },
    // 触底加载
    async onReachBottom() {
      try {
        const totalPage = Math.ceil(
          this.growthValue?.totalElements / this.req.size
        );
        console.log("触底-totalPage", totalPage);
        // 判断是否还有下一页
        if (totalPage <= this.req.page) return;
        else {
          this.req.page++;
        }
        await this.getGrowthValue(this.req);
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
  background: #f5f5f5;
}
.growth-value-out {
  width: 100%;
  height: 100%;
  // overflow: auto;
  // background: #f5f5f5;

  .growth-top {
    color: #fff;
    // border: 1rpx solid #f0f;
    background: #302d2c;
    padding: 32rpx 32rpx 100rpx 32rpx;
    .total-num {
      padding-left: 12rpx;
      color: #f1a55d;
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
    // background: #f5f5f5;
    position: relative;
    .list_items {
      // border-top-left-radius: 24rpx;
      // border-top-right-radius: 24rpx;
      padding-bottom: 68rpx;
      position: absolute;
      top: -68rpx;
      left: 32rpx;
      right: 32rpx;
      .items_box {
        background: #fff;
        border-radius: 24rpx;
        padding: 26rpx 32rpx;
        margin-bottom: 32rpx;
      }

      .top-month {
        //

        .month-name {
          font-size: 32rpx;
          font-weight: bold;
          color: #000000;
        }

        .total-getnum {
          font-size: 24rpx;
          color: #999999;
          margin-right: 32rpx;
          .num-math {
            color: #f1a55d;
          }
        }
      }
      .top-month_none {
        padding-bottom: 32rpx;
        border-bottom: 1rpx solid #f1f1f1;
        margin-bottom: 32rpx;
      }
      .item_main {
        margin-bottom: 48rpx;
        .slot-tips {
          color: #999999;
          font-weight: normal;
          font-size: 24rpx;
          margin-left: 14rpx;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>