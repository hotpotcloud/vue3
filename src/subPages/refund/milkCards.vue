<template>
  <view>
    <view class="container">
      <view class="content">
        <view class="d-flex">
          <checkbox :value="all" @tap="changeAll()" :checked="all" />
          <view class="select-all">全选</view>
        </view>
        <view class="uni-list">
          <checkbox-group @change="checkboxChange">
            <label
              class="uni-list-cell uni-list-cell-pd option-item"
              v-for="item in options"
              :key="item.milkCardNo"
            >
              <view class="d-flex d-flex-center option-item-box">
                <checkbox
                  class="select-box"
                  :value="item.milkCardNo"
                  :checked="item.checked"
                  :key="item.milkCardNo"
                />
                <view class="option-text">
                  <view class="option-text-word"
                    >{{ item.milkCardNo }}
                    {{ item.claimStatus ? `(${"已领取"})` : "" }}</view
                  >
                  <view class="option-time"
                    >{{
                      item.claimStatus
                        ? `${item.receiveMemberName} ${item.receiveTime}`
                        : "暂未领取"
                    }}
                  </view>
                </view>
              </view>
              <view class></view>
            </label>
          </checkbox-group>
        </view>
      </view>
    </view>
    <view class="radio-btn-wrap">
      <view class="btn-confirm" @tap="sureClick"
        >确认{{ selectedMilkCard ? `(${selectedMilkCard.length})` : "" }}</view
      >
    </view>
  </view>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { milkCard } from "@/utils/url";
import api from "@/utils/api";
import { MILK_CARD_STATUS } from "@/utils/enum";
export default {
  data() {
    return {
      options: [],
      all: null,

      orderNo: "",
      MILK_CARD_STATUS,
    };
  },
  watch: {},
  computed: {
    ...mapState("refund", ["selectedMilkCard"]),
  },
  onLoad(option) {
    this.orderNo = option.orderNo;
  },
  onShow() {
    this.getList();
    // if (
    //   this.selectedMilkCard.length > 0 &&
    //   this.options.length &&
    //   this.selectedMilkCard.length === this.options.length
    // ) {
    //   this.all = true;
    // }
  },

  methods: {
    ...mapMutations("refund", ["X_setSelectedMilkCard"]),
    checkboxChange(e) {
      if (e.target.value.length === this.options.length) {
        this.all = true;
      } else {
        this.all = false;
      }
      let arr = e.target.value;
      const newArr = [];
      const list = this.options.map((item) => {
        if (arr.includes(item.milkCardNo)) {
          item.checked = true;
          newArr.push(item);
        } else {
          item.checked = false;
        }
        return item;
      });
      this.options = [...list];
      this.X_setSelectedMilkCard(newArr);
    },
    changeAll() {
      this.all = !this.all;
      const list = this.options.map((el, index) => {
        if (this.all === el.checked) {
          this.$set(this.options, index, el);
        }
        el.checked = this.all;
        return el;
      });
      this.options = [...list];
      this.X_setSelectedMilkCard(list);
    },
    sureClick() {
      // console.log("选中的奶卡", this.selectedCards);
      // this.X_setSelectedMilkCard(this.selectedCards);
      uni.navigateBack({
        delta: 1,
      });
    },
    // 获取奶卡列表
    async getList() {
      try {
        const { data } = await api.$get(
          `${milkCard.selectMilkCardsList}?orderNo=${this.orderNo}`
        );
        data.forEach((el) => {
          el.checked = false;
        });
        for (let i in data) {
          for (let n in this.selectedMilkCard) {
            if (data[i].milkCardNo === this.selectedMilkCard[n].milkCardNo) {
              data[i].checked = this.selectedMilkCard[n].checked;
            }
          }
        }
        this.options = data;
        console.log(this.options, "奶卡");
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 24rpx 32rpx 0 32rpx;
  width: 100%;
  height: 120vh;
  background: #f5f5f5;
  .content {
    width: 686rpx;
    background: #ffffff;
    border-radius: 24rpx;
    padding: 24rpx;
  }
}

.select-all {
  padding-left: 8rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #a9a9a9;
}
.option-item {
  width: 100%;
  .option-item-box {
    border-bottom: 2rpx solid #f4f4f4;
    padding: 24rpx 0;
    .option-item-box:last-child {
      border: none;
    }
    .option-text {
      padding-left: 48rpx;
      .option-text-word {
        font-size: 28rpx;
        color: #000000;
      }
      .option-time {
        font-size: 26rpx;
        color: #999999;
        padding-top: 16rpx;
      }
    }
  }
}

.uni-list-cell {
  justify-content: flex-start;
}
.radio-btn-wrap {
  border: 2rpx solid #f1f1f1;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 176rpx;
  padding-top: 12rpx;
  padding-bottom: 96rpx;
  background: #fff;
  z-index: 100;
  .btn-confirm {
    text-align: center;
    width: 670rpx;
    height: 84rpx;
    background: #1d9bdc;
    line-height: 84rpx;
    border-radius: 254rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    margin: 0 auto;
  }
}
</style>
