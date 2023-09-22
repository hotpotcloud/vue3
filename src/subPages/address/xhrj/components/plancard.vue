<template>
  <view>
    <view v-if="info.length" class="goodsout">
      <view class="slot-topname d-flex-center d-sb">
        <slot name="topname"></slot>
        <view
          class="fc08-comment-text"
          @tap="toComment(info)"
          v-if="isFinished(info[0].deliveryCalendarStatus)"
        >
          <view class="d-flex-center fc08-comment-position">
            <img
              v-if="!isEvaluate(info[0].deliveryCalendarStatus)"
              :src="getAssetImgUrl('bianji-icon.svg')"
              alt=""
              class="comment-icon"
            />
            {{ evaluateStr(info[0]) }}
          </view>
        </view>
      </view>
      <view v-for="(el, index) in info" :key="index" class="item-goods">
        <view class="d-flex d-sb">
          <view class="goods-img">
            <image
              class="goods-img-son"
              :src="getAssetImgUrl(el.goodsImgUrl)"
              mode="scaleToFill"
            />
            <view
              class="goods-qty-num"
              v-if="!isFinished(el.deliveryCalendarStatus)"
              >x{{ el.qty }}</view
            >
          </view>

          <view class="flex-1 d-flex-colum d-sb content-right">
            <view class="h-overflow-88-2 spuname">{{ el.spuName }}</view>
            <!-- <view>{{ el.deliveryCalendarStatus }}</view> -->
            <view
              class="d-flex-center d-sb"
              @tap="onCheckDetail(el)"
              v-if="!isFinished(el.deliveryCalendarStatus)"
            >
              <view class="d-flex-center">
                <text class="left-short">近期配送日：</text>
                <view
                  class="send-num flex-1"
                  v-for="(item, index) in el.recentDeliveryDateList"
                  :key="index"
                >
                  {{ item.split("-")[2] }}
                </view>
              </view>
              <uni-icons type="forward" color="#999999" size="13" />
            </view>
            <view
              v-else
              class="d-flex-center d-sb f24 color-99"
              style="flex-direction: row-reverse"
            >
              <!-- <view class="finished d-flex-center">
                <image
                  class="img-rili-icon"
                  src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/rili.png"
                  mode="scaleToFill"
                />
                配送日历
              </view> -->
              <view style="display: none">缺规格</view>
              <view>x{{ el.qty }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { TWORuleEnum } from "@/utils/enum";
export default {
  props: {
    // time: {
    //   type: String,
    //   default: "",
    // },
    info: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      TWORuleEnum,
    };
  },
  computed: {
    /* 已完成或待评价 */
    isFinished() {
      return (status) => {
        return (
          status === TWORuleEnum.FINISHED || status === TWORuleEnum.WAIT_COMMENT
        ); // 是否已完成
      };
    },
    // 查看评价/去评价
    isEvaluate() {
      return (status) => {
        return status === TWORuleEnum.FINISHED; // 是否已完成
      };
    },
    // 评价文字显示
    evaluateStr() {
      return (info) => {
        const str =
          info.deliveryCalendarStatus === TWORuleEnum.WAIT_COMMENT
            ? "去评价"
            : info.deliveryCalendarStatus === TWORuleEnum.FINISHED &&
              info.isEvaluate
            ? "查看评价"
            : "";
        return str;
      };
    },
  },
  methods: {
    onCheckDetail(e) {
      this.$emit("onCheckDetail", e);
    },
    toComment(val) {
      this.$emit("toComment", val);
    },
  },
};
</script>

<style scoped lang="scss">
.goodsout {
  background: #fff;
  margin-bottom: 32rpx;
  padding: 24rpx;
  border-radius: 40rpx;
}
.slot-topname {
  color: #333333;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 18rpx;
  .fc08-comment-text {
    color: #1d9bdc;
    font-size: 24rpx;
    position: relative;
    width: 100rpx;
    height: 34rpx;
    // display: flex;
    // align-items: center;
    .fc08-comment-position {
      position: absolute;
      width: 100%;
      right: 0;
      left: 0;
      top: -20rpx;
      bottom: -10rpx;
      z-index: 101;
      // background: #1d9bdc;
    }
    .comment-icon {
      width: 20rpx;
      height: 24rpx;
    }
  }
}
.spuname {
  font-weight: bold;
  color: #333333;
}
.goods-img {
  border-radius: 24rpx;
  border: 1rpx solid #f1f1f1;
  width: 148rpx;
  height: 148rpx;
  overflow: hidden;
  position: relative;
  .goods-img-son {
    width: 100%;
    height: 100%;
  }
  .goods-qty-num {
    position: absolute;
    bottom: 8rpx;
    right: 8rpx;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 24rpx;
    padding: 0 6rpx 0 10rpx;
    border-radius: 12rpx;
  }
}
.send-num {
  display: inline-block;
  width: 48rpx;
  height: 48rpx;
  font-size: 24rpx;
  border-radius: 24rpx;
  background-color: #e4f4ff;
  color: #1d9bdc;
  border: 2rpx solid #fff;
  text-align: center;
  margin-left: -10rpx;
  &:first-child {
    margin-left: 0;
  }
}

.item-goods {
  // background: #f0f;
  padding-bottom: 24rpx;
  margin-bottom: 24rpx;
  border-bottom: 2rpx solid #f1f1f1;
  &:last-child {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .left-short {
    color: #999;
    margin-right: 22rpx;
  }
  .content-right {
    margin-left: 16rpx;
    line-height: 44rpx;
  }
}
.finished {
  // width: 100%;
  margin-right: 32rpx;
  align-items: center;
  color: #1d9bdc;
  padding: 12rpx 16rpx;
  border: 2rpx solid #1d9bdc;
  width: 172rpx;
  text-align: center;
  border-radius: 76rpx;
  .img-rili-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 4rpx;
  }
}
</style>
