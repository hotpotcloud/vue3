<template>
  <view class="content-container">
    <view class="fc09-box">
      <!-- 鲜活日记 -->
      <view v-if="show" class="xbfcalendar-out">
        <!-- 头部信息 -->
        <view class="slot_top_btn">
          <view
            @tap="onRight"
            class="left-slot d-flex-center"
            v-if="calendarList.addressDetail"
          >
            <img
              class="check-icon"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/check.png"
              alt=""
            />
            <view class="h-over-1 address_detail">
              {{ calendarList.addressDetail }}
            </view>
          </view>
          <view slot="topright" @tap="onLeft" class="right-btn"></view>
        </view>
        <xbf-calendar
          ref="xbf"
          :sundayIndex="0"
          :defaultSelectedDate="checkTime"
          :showRight="!!calendarList.addressDetail"
          @change="change"
          @changePage="changePage"
          @goToDate="goToDate"
        >
        </xbf-calendar>
      </view>
      <view class="goods-sw">
        <swiper
          autoplay
          circular
          vertical="true"
          interval="3000"
          v-if="C_calcDateList.length !== 0"
          class="sw-father"
        >
          <swiper-item
            v-for="(item, index) in C_calcDateList[0].goodsList"
            :key="index"
            class="sw-item-goods"
          >
            <view
              class="d-flex"
              @tap.stop="
                () =>
                  item.deliveryCalendarStatus !== 'WAIT_COMMENT' &&
                  handleGoods(item)
              "
            >
              <image
                class="sw-img"
                :src="getAssetImgUrl(item.goodsImgUrl)"
                mode="widthFix"
                @tap.stop="handleGoods(item)"
              />
              <view class="flex-1 fc08_position">
                <view class="d-flex-center d-sb fc08_position_absoult">
                  <view
                    class="goods-info d-flex-colum d-sb flex-1"
                    @tap.stop="handleGoods(item)"
                  >
                    <view class="sub-color main-font-b h-over-1">
                      {{ item.spuName }}
                    </view>
                    <view class="sub-goods-item-fc08 h-over-1">
                      共<text class="span-qty">{{ item.qty }}</text>
                      {{ item.text }}
                    </view>
                  </view>
                  <view
                    class="fc08_comment"
                    v-if="item.deliveryCalendarStatus === 'WAIT_COMMENT'"
                    @tap.stop="toComment(C_calcDateList[0].goodsList)"
                  >
                    <img
                      :src="getAssetImgUrl('bianji-icon.svg')"
                      alt=""
                      class="comment-icon"
                    />
                    去评价</view
                  >
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view v-else class="sw-father none-father" style="text-align: center">
          <image
            class="none-icon"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/none.png"
            mode="scaleToFill"
          />
          暂无配送商品
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import XbfCalendar from "./components/xbf-calendar/xbf-calendar";
import { parseTime } from "./utils/utils";
export default {
  name: "Calendar",
  components: {
    XbfCalendar,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    checkTime: {
      type: String,
      default: parseTime(new Date().getTime(), "{y}-{m}-{d}"),
    },
  },
  data() {
    return {
      now: parseTime(new Date().getTime(), "{y}-{m}-{d}"),
      flag: false,
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("css", ["iosFont"]),
    ...mapState("newhope", ["calendarList", "currentDay", "curParams", "off"]),
    ...mapGetters("newhope", ["C_calcDateList"]),
  },
  // onShow() {
  //   this.now = parseTime(new Date().getTime(), "{y}-{m}-{d}");
  // },
  created() {
    // parseTime(new Date().getTime());
    this.now = parseTime(new Date().getTime(), "{y}-{m}-{d}");
  },
  watch: {},
  methods: {
    ...mapMutations("newhope", ["V_setCurrentDay", "V_setCurParams"]),
    click() {
      // 回到今天
      this.$refs.xbf.goToDate();
    },
    onRight() {
      // this.$refs.xbf.goToDate()
      this.click();
      this.$emit("onRight");
    },
    onLeft() {
      if (!this.calendarList.stationAccountNo) {
        // uni.showToast({ title: "暂无配送商品", icon: "none" });
        console.log("当前账号没有配送");
        return;
      }
      // this.click();
      this.$emit("onLeft");
    },
    changePage(e) {
      this.$emit("changePage", e);
    },
    // 日历选中日期改变事件回调
    change(e) {
      this.$emit("clickDay", e);
    },
    handleGoods(e) {
      this.$emit("handleGoods", e);
    },
    toComment(e) {
      console.log("e", e);
      this.$emit("toComment", e);
    },

    // 去登陆
    toLogin() {
      uni.navigateTo({ url: "/pages/user/relogin" });
    },
    handleInfo() {
      uni.switchTab({
        url: "/pages/user/user",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.content-container {
  padding: 0 32rpx;
}
.fc09-box {
  position: relative;
  padding-top: 84rpx;
  // background: #1d9bdc;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/home-date-bg.svg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 24rpx;
  overflow: hidden;
}
.margin32 {
  margin-bottom: 32rpx;
}
// 用户信息
.swiper-user {
  //padding: 0 32rpx;
  width: 100%;
  height: 104rpx;
  display: flex;
  justify-content: center;
  .sw-user-info {
    flex: 1;
    height: 100%;
    padding-left: 32rpx;
    padding-right: 32rpx;
    background: #fff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    background: linear-gradient(90deg, #1d9bdc 0%, #8bd0ff 100%);
    .sw-avatar {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16rpx;
      .sw-avatar--user {
        width: 100%;
        height: 100%;
      }
    }
    .user-top-name {
      max-width: 266rpx;
      padding-left: 0;
      line-height: 30rpx;
      color: #fff;
    }
  }
}
.login-btn {
  background: #1d9bdc;
  width: 166rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  color: #fff;
  font-size: 26rpx;
  border-radius: 42rpx;
}

.slot_top_btn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 60rpx;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  overflow: hidden;
  // background: #8bd0ff;
  display: flex;
  justify-content: space-between;
}
.left-slot {
  padding-top: 24rpx;
  padding-left: 24rpx;
  color: #666666;
  line-height: 36rpx;
  // height: 36rpx;
  width: 412rpx;
  .address_detail {
    width: 376rpx;
  }
}
.right-btn {
  width: 234rpx;
  height: 60rpx;
}

//鲜活日记
.goods-sw {
  // background: #1d9bdc;
  background: #fff;
  // border-bottom-left-radius: 40rpx;
  // border-bottom-right-radius: 40rpx;
  padding: 30rpx 24rpx;
  .sw-father {
    height: 108rpx;
    border-radius: 14rpx;
    background: #f5f5f5;
    padding: 14rpx 20rpx 10rpx;
    .sw-item-goods {
      .sw-img {
        background: #f5f5f5;
        width: 74rpx;
        height: 84rpx;
        margin-right: 30rpx;
      }
    }
  }
  //暂无商品配送
  .none-father {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #999999;
    .none-icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 16rpx;
    }
  }
}
.xhrj-icon {
  border: none;
  height: 52rpx;
  width: 196rpx;
}
.check-icon {
  width: 32rpx;
  height: 32rpx;
}
.sub-goods-item-fc08 {
  color: #999999;
  .span-qty {
    color: #1d9bdc;
  }
}
.fc08_position {
  position: relative;
  .fc08_position_absoult {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 211;
  }
}
.fc08_comment {
  // position: relative;
  // z-index: 10;
  border: 2rpx solid #71c5ff;
  // padding: 12rpx 0;
  text-align: center;
  width: 144rpx;
  height: 60rpx;
  font-size: 24rpx;
  color: #71c5ff;
  border-radius: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .comment-icon {
    width: 22rpx;
    height: 24rpx;
  }
}
</style>
