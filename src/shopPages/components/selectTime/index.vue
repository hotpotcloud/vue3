<template>
  <u-popup
    :show="show"
    :round="20"
    zindex="900"
    mode="bottom"
    @close="closeModal"
    overlayOpacity="0.45"
    :safeAreaInsetTop="false"
  >
    <view>
      <view class="title"
        >选择提货时间
        <image
          @tap="closeModal"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/close.png"
        />
      </view>
      <view class="select-time d-flex">
        <view class="tab"
          ><view class="tab-content">
            <view
              v-for="(item, index) in getLeftTabList"
              :key="item"
              @tap="changeDate(index)"
              :class="{
                'd-flex-colum-center': true,
                'tab-item': true,
                'd-center': true,
                active: currentTab === index,
                next: currentTab + 1 === index,
                pre: currentTab - 1 === index,
              }"
            >
              <view>{{ item.name }}({{ item.week }})</view
              ><view>{{ item.date }}</view></view
            ><view
              :class="{
                'last-item': true,
                next: currentTab + 1 === dateList.length,
              }"
            ></view> </view
        ></view>
        <view class="right">
          <view
            class="time-item d-flex-center d-sb"
            :key="date.date"
            v-for="(date, index) in timeList"
            @tap="changeTime(index)"
            ><view>{{ date.text }}</view>
            <image
              v-if="isSelect(date.date)"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/checked.png"
            />
            <image
              v-else
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/not-check.png"
            />
          </view>
          <!-- <view class="time-item d-flex-center d-sb"
            ><view>下午（12:00~19:00）</view>
            <image
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/not-check.png"
            />
          </view> -->
        </view>
      </view>
    </view></u-popup
  >
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentSelect: {
      type: String,
      default: "",
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    // businessHoursEnd: {
    //   type: String,
    //   default: "",
    // },
    // businessHoursBegin: {
    //   type: String,
    //   default: "",
    // },
    //时间列表
    getLeftTabList: {
      type: Array,
      default: () => [],
    },
    currenTimeIndex: {
      type: Number,
    },
    confirmTab: {
      type: Number,
    },
  },
  data() {
    return {
      dateList: [],
      currentTab: 0,
    };
  },
  computed: {
    timeList() {
      return this.getLeftTabList[this.currentTab]?.sectionList || [];
    },
  },
  mounted() {
    this.currentTab = this.confirmTab;
  },
  methods: {
    changeDate(index) {
      this.currentTab = index;
    },
    closeModal() {
      this.$emit("on-cancel");
    },
    changeTime(index) {
      this.$emit("on-change", index, this.currentTab);
      this.$emit("on-cancel");
    },
    isSelect(date) {
      return (
        date ===
        this.getLeftTabList[this.confirmTab]?.sectionList[this.currenTimeIndex]
          .date
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  position: relative;
  text-align: center;
  padding: 48rpx 0rpx 32rpx;
  font-size: 34rpx;
  font-weight: 500;
  color: #000000;
  line-height: 48rpx;
  > image {
    position: absolute;
    width: 32rpx;
    height: 32rpx;
    top: 56rpx;
    right: 38rpx;
  }
}
.select-time {
  width: 750rpx;
  height: 640rpx;
  background: #ffffff;
  box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(0, 0, 0, 0.25);
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  .tab {
    background: #f5f5f5;
    .tab-content {
      background-color: #fff;
    }
    .tab-item {
      width: 188rpx;
      height: 124rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      background: #f5f5f5;
      > view {
        color: #666666;
      }
      > view:nth-child(1) {
        height: 36rpx;
        font-size: 26rpx;
        font-weight: 400;
        line-height: 36rpx;
        margin-bottom: 8rpx;
      }
      > view:nth-child(2) {
        height: 30rpx;
        font-size: 22rpx;
        font-weight: 400;
        line-height: 30rpx;
      }
    }

    .tab-item.active {
      background: #ffffff;
      > view {
        color: #1d9bdc;
      }
    }
    .tab-item.next {
      border-top-right-radius: 16rpx;
    }
    .tab-item.pre {
      border-bottom-right-radius: 16rpx;
    }
    .last-item.next {
      background: #f5f5f5;
      border-top-right-radius: 16rpx;
      height: 16rpx;
    }
  }
  .right {
    flex: 1;
    margin-left: 32rpx;
    height: 124rpx;
    .time-item.active {
      color: #1d9bdc;
    }
    .time-item {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 124rpx;
      padding-right: 32rpx;
      color: #666666;
      > image {
        width: 48rpx;
        height: 48rpx;
      }
    }
    .time-item:not(:last-child) {
      border-bottom: 2rpx solid #f4f4f4;
    }
  }
}
</style>
