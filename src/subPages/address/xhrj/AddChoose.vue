<template>
  <view class="address-out">
    <view class="address-list">
      <!-- <view class="top"> 从我的收货地址选择 </view> -->
      <view class="main">
        <view
          v-for="(el, index) in homeList"
          :key="index"
          class="d-flex-center d-sb main-info"
          hover-class="wsui-btn__hover_list"
        >
          <!-- hover-stay-time="1000" -->
          <!-- 地址信息 -->
          <view class="flex-1" @tap="onTap(el)">
            <view class="d-flex-center" style="margin-bottom: 12rpx">
              <text class="h-font-30 marR18">{{ el.receiver }}</text>
              <text class="main-phone marR16">{{ el.receiverPhone }}</text>
              <!--  -->
              <text class="h-add-tag marR8" v-if="el.labelName">{{
                el.labelName
              }}</text>
              <!--  -->
              <text class="h-add-tag marZero" v-if="el.defaulted">默认</text>
            </view>
            <view class="h-overflow-8-2">
              {{ el.adressDetail }}
            </view>
          </view>
          <!-- <view
            :class="['radio', el.checked && 'radio_checked']"
            @tap="changeCheck(el)"
          >
            <text :class="[!el.checked && 'checked']"> ✔ </text>
          </view> -->
          <view>
            <radio-group @change="changeCheck(el)">
              <label class="radio">
                <radio
                  :value="el.checked"
                  :checked="el.checked"
                  color="#1D9BDC"
                  style="transform: scale(0.77)"
              /></label>
            </radio-group>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { formatTime } from "@/utils/utils";

export default {
  data() {
    return {
      //是否选中
      selected: false,
      type: "",
    };
  },
  computed: {
    ...mapState("newhope", ["homeList"]),
  },
  onLoad(option) {
    // console.log("option", option);
    this.type = option.type;
  },
  methods: {
    ...mapMutations("newhope", ["V_setCurCode", "V_setCurParams"]),
    ...mapActions("newhope", [
      "X_getSelectListByAddressNo",
      "X_getMonthWeek",
      "X_getSelectDetailGoods",
      "getSendQty",
    ]),

    onTap(el) {
      console.log("option-点击地址");
      if (el.checked) return;
      this.changeCheck(el);
    },
    // 选择履约地址
    changeCheck(el) {
      console.log("el", el, el.stationAccountNo);
      this.X_getSelectListByAddressNo(el.stationAccountNo);
      this.V_setCurParams({
        stationAccountNo: el.stationAccountNo,
        startDate: formatTime("YYYY-mm-dd"),
      });
      // return;
      if (this.type === "home") {
        uni.switchTab({
          url: "/pages/homepage/homepage",
          success: () => {
            this.X_getMonthWeek();
          },
          fail: () => {
            console.log("跳转失败");
          },
        });
      } else if (this.type === "week") {
        uni.navigateBack({
          delta: -1,
          success: async () => {
            await this.X_getMonthWeek();
            await this.X_getSelectDetailGoods();
            await this.getSendQty();
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wsui-btn__hover_list {
  opacity: 0.9;
  background: #f7f7f7;
}
.address-out {
  padding: 24rpx 0;
  height: 100vh;
  background: #f5f5f5;
}
.address-list {
  background: #fff;
  .top {
    padding: 32rpx;
    color: #666666;
    border-bottom: 2rpx solid #f4f4f4;
  }
  .main {
    padding: 0rpx 32rpx 0rpx 40rpx;
    .main-info {
      padding: 32rpx 0;
      border-bottom: 2rpx solid #f4f4f4;
    }
  }
}
.main-phone {
  color: #999999;
}
.marR18 {
  margin-right: 18rpx;
}
.marR16 {
  margin: 0;
  margin-right: 16rpx;
}
.marR8 {
  margin: 0;
  margin-right: 8rpx;
}
.marZero {
  margin: 0;
}
//当选框
.radio {
  margin-left: 48rpx;
  width: 48rpx;
  height: 48rpx;
  // background: #f1f1f1;
  border-radius: 48rpx;
  color: #fff;
  text-align: center;
  line-height: 48rpx;
}
.radio_checked {
  background: #1d9bdc !important;
}
.checked {
  visibility: hidden;
}
</style>
