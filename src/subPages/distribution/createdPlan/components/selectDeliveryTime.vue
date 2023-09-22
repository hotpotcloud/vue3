<template>
  <view class="day-root-container">
    <view class="title"><text class="num-font">3</text>/5</view>
    <view class="title-text">选择每次配送数量</view>
    <view class="prent-container">
      <view class="container">
        <view
          :class="
            !custom && defaultNum === item.value
              ? 'week-item-active'
              : 'week-item'
          "
          v-for="item in bottleNumList"
          :key="item.value"
          @click="selectBottleClick(item)"
          >{{ item.name }}</view
        >
        <view
          :class="custom ? 'week-item-active' : 'week-item'"
          @click="customNum"
          >自定义</view
        >
      </view>

      <view class="custom-bottleNum-con" v-if="custom">
        <view class="left-text"> 自定义：</view>
        <view class="num-input">
          <h-number-box
            :integer="true"
            buttonSize="72rpx"
            inputWidth="200rpx"
            color="#333333"
            v-model="defaultNum"
            @blur="changeValue"
            @change="changeValue"
            :disabledInput="false"
            :min="1"
            :max="999"
          >
            <view slot="minus" class="minus-btn">
              <image
                class="minus-btn"
                style="{width:48rpx,height:48rpx}"
                src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/jian%2048%402x.png"
                mode="aspectFit"
              />
            </view>
            <!-- <view
              slot="size"
              style="margin: 0 16rpx; color: #999999; font-size: 18px"
            >
              {{ unitName }}
            </view> -->
            <view slot="plus" class="minus-btn">
              <!-- src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/jia%2048.png" -->
              <!-- <image
                class="minus-btn"
                src="../../../../assets/jia.png"
                mode="aspectFit"
              /> -->
            </view>
          </h-number-box>
        </view>
      </view>
    </view>

    <view class="btn-view">
      <view
        class="button-style"
        @click="nextStep"
        :style="{ background: btnactive ? '#1D9BDC' : '#C7C7C7' }"
        >{{ btnText }}</view
      >
    </view>
  </view>
</template>
<script lang="ts">
import Vue from "vue";
import { ruleTypeEnum, AlterORCrtate, ruleTypeName } from "@/utils/enum";
import { mapMutations, mapState } from "vuex";
import { address } from "@/utils/url";
export default Vue.extend({
  data() {
    return {
      defaultNum: 1,
      unitName: "",
      custom: false,
      btnactive: false,
      btnText: "下一步",
      bottleNumList: [
        { name: "1", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
      ],
    };
  },

  computed: {
    ...mapState("distribution", ["projectList", "editData"]),
  },

  onLoad(options) {
    let data = options.param;
    this.type = data;
    console.log(this.type, "type");
  },
  onShow() {
    this.btnactive = true;
    if (this.type === AlterORCrtate.CREATE) {
      this.btnText = "下一步";
    } else {
      this.btnText = "确定";
      this.defaultNum = this.editData.everyNum;
      if (this.defaultNum > 3) {
        this.custom = true;
      }
    }
    console.log(this.editData);
  },
  methods: {
    ...mapMutations("distribution", ["M_everyNum", "M_AlterEveryNum"]),
    customNum() {
      this.btnactive = true;
      this.custom = !this.custom;
      this.defaultNum = 1;
    },
    nextStep() {
      console.log("this.defaultNum", this.defaultNum);
      if (!this.btnactive) return;
      if (this.defaultNum && this.defaultNum > 0) {
        this.caeateRoalter();
      } else {
        return uni.showToast({
          title: "请选择每次配送数量",
          icon: "none",
          duration: 2000,
        });
      }
    },
    async goPage() {
      try {
        this.M_everyNum(this.defaultNum);

        const { data } = await this.GET(address.addressList, "加载中", true);
        uni.navigateTo({
          url: `/subPages/distribution/createdPlan/components/address?param=${this.type}`,
        });
        // if (data.length !== 0) {
        //   uni.navigateTo({
        //     url: `/subPages/distribution/createdPlan/components/address?param=${this.type}`,
        //   });
        // } else {
        //   uni.navigateTo({
        //     url: `/subPages/distribution/createdPlan/components/emptyAddress`,
        //   });
        // }
      } catch (error) {
        console.log(error);
      }
    },
    caeateRoalter() {
      if (this.type === AlterORCrtate.CREATE) {
        //创建
        this.goPage();
      } else {
        //编辑
        this.M_AlterEveryNum(this.defaultNum);
        uni.navigateBack({
          delta: 1,
        });
      }
    },
    changeValue(value) {
      console.log("value", value);
      this.defaultNum = value.value;
      if (this.defaultNum && this.defaultNum > 0) {
        this.btnactive = true;
      } else {
        this.btnactive = false;
      }
      console.log(this.defaultNum);
    },
    selectBottleClick(item) {
      try {
        this.custom = false;
        this.defaultNum = item.value;
        this.btnactive = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.day-root-container {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.prent-container {
  width: 100%;
}
.container {
  width: 100%;
  height: 180rpx;
  background-color: white;
  padding-left: 48rpx;
  padding-right: 48rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: #f5f5f5 1px solid;
  align-items: center;
}
.title {
  width: 100%;
  padding-top: 32rpx;
  padding-left: 32rpx;
  font-size: 32rpx;
  color: #88c7e8;
}
.num-font {
  font-size: 48rpx;
  color: #1d9bdc;
}
.title-text {
  font-size: 36rpx;
  color: #1d9bdc;
  padding-left: 32rpx;
  padding-top: 16rpx;
  margin-bottom: 64rpx;
}
.title-view {
  height: 100%;
  display: flex;
  align-items: center;
}
.title-view-week {
  height: 100%;
  display: flex;
  align-items: center;
}
.big-title {
  font-size: 36rpx;
  color: #666666;
}
.week-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 148rpx;
  height: 72rpx;
  border-radius: 8rpx;
  background: #f1f1f1;
  font-size: 28rpx;
  color: #999999;
}
.week-item-active {
  @extend .week-item;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* width: 148rpx; */
  /* height: 72rpx; */
  border: 1px solid #1d9bdc;
  /* border-radius: 8rpx; */
  /* font-size: 24rpx; */
  background: #e4f4ff;
  color: #1d9bdc;
}

.custom-bottleNum-con {
  width: 100%;
  height: 180rpx;
  background-color: white;
  padding-left: 48rpx;
  padding-right: 48rpx;
  display: flex;
  justify-content: space-between;
  font-size: 32rpx;
  color: #999999;
}
.left-text {
  // height: 170rpx;
  display: flex;
  align-items: center;
  font-size: 32rpx;
  color: #999999;
}
.num-input {
  background: white;
  display: flex;
}
.minus-btn {
  width: 48rpx;
  height: 48rpx;
}
.btn-view {
  width: 100%;
  position: fixed;
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
</style>
