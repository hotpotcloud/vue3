<template>
  <view class="day-root-container">
    <view class="title-view">
      <img
        class="imgStyle"
        src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/rili%201%403x.png"
        alt=""
      />
      <view class="title-text">编辑配送计划</view>
    </view>
    <view class="item-view" @click="choice('disciplinary')">
      <view class="item-title">1.选择配送规律</view>
      <view class="item-icon-view">
        <text>{{ editData.ruleTypeName }}</text>
        <img
          class="imgStyle-item"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/Frame%2065%403x.png"
          alt=""
      /></view>
    </view>
    <view class="item-view" @click="choice('distributionTime')">
      <view class="item-title">2.选择每次配送时间</view>
      <view class="item-icon-view">
        <text>{{ editData.timeSectionName }}</text>
        <img
          class="imgStyle-item"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/Frame%2065%403x.png"
          alt=""
      /></view>
    </view>
    <view class="item-view" @click="choice('distributionNum')">
      <view class="item-title">3.选择每次配送数量</view>
      <view class="item-icon-view">
        <text>{{ editData.everyNum }}瓶</text>
        <img
          class="imgStyle-item"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/Frame%2065%403x.png"
          alt=""
      /></view>
    </view>

    <view class="item-view-site" @click="choice('distributionSite')">
      <view class="item-view-con">
        <view class="item-title">4.选择收货地址</view>
        <view class="item-icon-view">
          <img
            class="imgStyle-item"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/Frame%2065%403x.png"
            alt=""
        /></view>
      </view>
      <view class="site-info-view">
        <view class="site-title"
          ><text>{{ editData.receiverName }}</text>
          <text :style="{ color: '#666666', 'margin-left': '18rpx' }">{{
            editData.receiverPhone
          }}</text></view
        >
        <view class="site-detail">
          {{ editData.addressDetails }}
        </view>
      </view>
    </view>
    <view class="item-view" @click="choice('distributionName')">
      <view class="item-title">5.给计划取个名字</view>
      <view class="item-icon-view">
        <text>{{ editData.planName }}</text>
        <img
          class="imgStyle-item"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/Frame%2065%403x.png"
          alt=""
      /></view>
    </view>
    <view class="btn-view">
      <view
        class="button-style"
        @click="nextStep"
        :style="{ background: btnActive ? '#1D9BDC' : '#C7C7C7' }"
        >完成</view
      >
    </view>

    <uni-popup ref="popup" background-color="#999999">
      <view
        class="popup-content-view"
        :class="{ 'popup-height': type === 'left' || type === 'right' }"
      >
        <view class="affirm-text">是否保存本次修改内容？</view>
        <view class="affirm-button-view">
          <view class="cancel-btn" @click="cancel">不保存</view>
          <view class="affirm-btn" @click="save">保存</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script lang="ts">
import Vue from "vue";
import { distributionUrl } from "@/utils/url";
import { ruleTypeEnum, AlterORCrtate, TimeSectionName } from "@/utils/enum";
import { mapMutations, mapActions, mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      check: "",
      btnActive: false,
      TimeSectionName,
    };
  },
  computed: {
    ...mapState("distribution", ["editData"]),
  },
  methods: {
    nextStep() {
      if (!this.btnActive) return;
      this.save();
      // this.$refs.popup.open("center");
    },

    choice(e) {
      const param = AlterORCrtate.ALTER;
      this.btnActive = true;
      const status = {
        disciplinary: () => {
          uni.navigateTo({
            url: `/subPages/distribution/createdPlan/components/everyDayComp?param=${param}`,
          });
        },
        distributionTime: () => {
          uni.navigateTo({
            url: `/subPages/distribution/createdPlan/components/deliveryDays?param=${param}`,
          });
        },
        distributionNum: () => {
          uni.navigateTo({
            url: `/subPages/distribution/createdPlan/components/selectDeliveryTime?param=${param}`,
          });
        },
        distributionSite: () => {
          uni.navigateTo({
            url: `/subPages/distribution/createdPlan/components/address?param=${param}`,
          });
        },
        distributionName: () => {
          uni.navigateTo({
            url: `/subPages/distribution/createdPlan/components/projectBeNamed?param=${param}`,
          });
        },
      };
      status[e]();
    },
    cancel() {
      uni.navigateBack({
        delta: 1,
      });

      this.$refs.popup.close();
    },
    async save() {
      try {
        this.editData.defaulted = this.editData.defaulted ? 1 : 0;
        await this.PUT(distributionUrl.saveOrUpdate, this.editData);
        uni.showToast({
          title: "保存成功",
          icon: "none",
          duration: 2000,
          success: () => {
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            },2000);
          },
        });
        // .then(() => {
        // uni.navigateBack({
        //   delta: 1,
        // });
        // });
      } catch (error) {}

      // this.$refs.popup.close();
    },
  },
});
</script>

<style scoped>
.day-root-container {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}

.title-view {
  position: relative;
  height: 140rpx;
  padding: 14rpx;
  margin-bottom: 26rpx;
}
.imgStyle {
  width: 111rpx;
  height: 111rpx;
}
.title-text {
  font-size: 36rpx;
  color: #1d9bdc;
  position: absolute;
  top: 48rpx;
  left: 40rpx;
}
.item-view {
  padding: 48rpx 32rpx 48rpx 48rpx;
  background-color: white;
  min-height: 146rpx;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
}
.item-view-site {
  padding: 48rpx 32rpx 48rpx 48rpx;
  background-color: white;
  min-height: 146rpx;
  border-bottom: 1px solid #f5f5f5;
}
.item-view-con {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.item-title {
  color: #333333;
  font-size: 32rpx;
}
.item-icon-view {
  display: flex;
  align-items: center;
  color: #666666;
  font-size: 28rpx;
}
.site-info-view {
  min-height: 128rpx;
  width: 654rpx;
  margin-top: 16rpx;
  border-radius: 8rpx;
  background-color: #f7f8f9;
  padding: 16rpx;
}
.site-title {
  font-size: 30rpx;
  color: #333333;
}
.site-detail {
  width: 582rpx;
  min-height: 40rpx;
  color: #666666;
  margin-top: 16rpx;
}
.imgStyle-item {
  width: 48rpx;
  height: 48rpx;
}
.btn-view {
  width: 100%;
  position: absolute;
  bottom: 68rpx;
  display: flex;
  justify-content: center;
}
.button-style {
  display: flex;
  border-radius: 100rpx;
  background-color: #1d9bdc;
  height: 104rpx;
  width: 670rpx;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 34rpx;
}
.popup-content-view {
  padding: 48rpx;
  width: 606rpx;
  height: 316rpx;
  border-radius: 40rpx !important;
  background: white;
}
.affirm-text {
  font-size: 32rpx;
  color: #000000;
  width: 100%;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.affirm-button-view {
  width: 100%;
  height: 120rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240rpx;
  height: 80rpx;
  border: 1px solid #1d9bdc;
  color: #1d9bdc;
  font-size: 34rpx;
  border-radius: 40rpx;
}
.affirm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240rpx;
  height: 80rpx;
  background-color: #1d9bdc;
  color: white;
  font-size: 34rpx;
  border-radius: 40rpx;
}
</style>
