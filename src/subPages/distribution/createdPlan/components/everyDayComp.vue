<template>
  <view class="root-view">
    <view class="title"><text class="num-font">1</text>/5</view>
    <view class="title-text">请选择配送规律</view>
    <view class="prent-container" @tap="check('EVERY_DAYS')">
      <view class="container">
        <view class="title-view">
          <view
            class="big-title"
            :style="{
              color: ruleType === 'EVERY_DAYS' ? '#1D9BDC' : '#666666',
            }"
            >天天送</view
          >
          <view class="min-title">90%用户适用此选项</view>
        </view>
        <view class="radio-view">
          <radio-group @change="radioChange">
            <label class="radio"
              ><radio
                color="#1D9BDC"
                value="EVERY_DAYS"
                :checked="ruleType === 'EVERY_DAYS'"
                style="transform: scale(0.77)"
            /></label>
          </radio-group>
        </view>
      </view>
    </view>

    <view class="prent-container" @tap="check('WEEK_DAYS')">
      <view class="container">
        <view class="title-view-week">
          <view
            class="big-title"
            style="margin: 0"
            :style="{
              color: ruleType === 'WEEK_DAYS' ? '#1D9BDC' : '#666666',
            }"
            >星期送</view
          >
        </view>
        <view class="radio-view">
          <radio-group @change="radioChange">
            <label class="radio"
              ><radio
                value="WEEK_DAYS"
                :checked="ruleType === 'WEEK_DAYS'"
                style="transform: scale(0.77)"
            /></label>
          </radio-group>
        </view>
      </view>
      <view v-if="ruleType === 'WEEK_DAYS'" class="week-list">
        <view class="week-list-container">
          <view
            :class="
              selectWeek.includes(item.value) ? 'week-item-active' : 'week-item'
            "
            v-for="item in weekList"
            :key="item.value"
            @click="selectWeekClick(item.value)"
            >{{ item.name }}</view
          >
        </view>
      </view>
    </view>

    <view class="prent-container" @tap="check('TERTIAN_DAYS')">
      <view class="container">
        <view class="title-view-week">
          <view
            class="big-title"
            style="margin: 0"
            :style="{
              color: ruleType === 'TERTIAN_DAYS' ? '#1D9BDC' : '#666666',
            }"
            >隔日送</view
          >
        </view>
        <view class="radio-view">
          <radio-group @change="radioChange">
            <label class="radio"
              ><radio
                value="TERTIAN_DAYS"
                color="blue"
                :checked="ruleType === 'TERTIAN_DAYS'"
                style="transform: scale(0.77)"
            /></label>
          </radio-group>
        </view>
      </view>
      <view class="num-input" v-if="ruleType === 'TERTIAN_DAYS'">
        <h-number-box
          :integer="true"
          buttonSize="72rpx"
          inputWidth="160rpx"
          color="#333333"
          v-model="intervalDate"
          @blur="changeValue"
          :disabledInput="false"
          :min="1"
          :max="30"
        >
          <view slot="minus" class="minus-btn">
            <!-- <image
              class="minus-btn"
              style="{width:48rpx,height:48rpx}"
              src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/jian%2048%402x.png"
              mode="aspectFit"
            /> -->
          </view>
          <view
            slot="size"
            style="margin-left: 16rpx; color: #999999; font-size: 18px"
          >
            {{ unitName }}
          </view>
          <view slot="plus" class="minus-btn">
            <!-- <image class="minus-btn" :src="jia" mode="aspectFit" /> -->
          </view>
        </h-number-box>
      </view>
    </view>

    <view class="prent-container" @tap="check('LEGAL_WORKING_DAYS')">
      <view class="container">
        <view class="title-view">
          <view
            class="big-title"
            :style="{
              color: ruleType === 'LEGAL_WORKING_DAYS' ? '#1D9BDC' : '#666666',
            }"
            >法定工作日送</view
          >
        </view>
        <view class="radio-view">
          <radio-group @change="radioChange">
            <label class="radio"
              ><radio
                color="#1D9BDC"
                value="LEGAL_WORKING_DAYS"
                :checked="ruleType === 'LEGAL_WORKING_DAYS'"
                style="transform: scale(0.77)"
            /></label>
          </radio-group>
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
export default Vue.extend({
  data() {
    return {
      jia: require("@/assets/jia.png"),
      ruleType: "", //配送规律
      intervalDate: 1, //间隔天数
      deliveryDetails: "", //星期
      defaultNum: 1,
      selectWeek: [],
      unitName: "日",
      btnText: "下一步",
      btnactive: false,
      weekList: [
        { name: "星期一", value: "1" },
        { name: "星期二", value: "2" },
        { name: "星期三", value: "3" },
        { name: "星期四", value: "4" },
        { name: "星期五", value: "5" },
        { name: "星期六", value: "6" },
        { name: "星期日", value: "7" },
      ],
    };
  },

  computed: {
    ...mapState("distribution", ["projectList", "editData"]),
  },

  onLoad(options) {
    let data = options.param;
    this.type = data;
  },
  onShow() {
    if (this.type === AlterORCrtate.CREATE) {
      this.check(ruleTypeEnum.EVERY_DAYS);
      this.btnText = "下一步";
    } else {
      this.btnactive = true;
      let arr = this.editData.deliveryDetails.split(",");
      this.btnText = "确定";
      this.ruleType = this.editData.ruleType;
      this.selectWeek = arr.filter((item) => item && item.trim());
      this.intervalDate = this.editData.intervalDate
        ? this.editData.intervalDate
        : 1;
    }
    console.log(this.editData, "数据配送");
  },
  methods: {
    ...mapMutations("distribution", ["M_setRuleType", "M_AlterRuleType"]),
    nextStep() {
      console.log("被点击了", this.btnactive);
      if (!this.btnactive) return;
      if (this.ruleType !== "") {
        //选择配送规律
        this.goPage();
      } else {
        this.showToa("请选择配送规律");
      }
    },
    showToa(text) {
      uni.showToast({
        title: text,
        icon: "none",
        duration: 3000,
      });
    },
    goPage() {
      const status = {
        EVERY_DAYS: () => {
          this.caeateRoalter();
        },
        WEEK_DAYS: () => {
          this.weekDays();
        },
        TERTIAN_DAYS: () => {
          this.tertianDays();
        },
        LEGAL_WORKING_DAYS:()=>{
          this.caeateRoalter();
        }
      };
      status[this.ruleType]();
    },

    weekDays() {
      //星期送
      if (this.selectWeek.length !== 0) {
        //选择星期不为空

        this.caeateRoalter();
      } else {
        this.showToa("请选择周几送");
      }
    },
    tertianDays() {
      //隔日送
      console.log("this.intervalDate", this.intervalDate);
      if (this.intervalDate > 0) {
        //间隔天数不为空
        this.caeateRoalter();
      } else {
        this.showToa("请输入隔几日送");
      }
    },
    caeateRoalter() {
      if (this.type === AlterORCrtate.CREATE) {
        //创建
        const data = {
          ruleType: this.ruleType,
          deliveryDetails: this.selectWeek,
          intervalDate: this.intervalDate,
        };
        this.M_setRuleType(data);
        console.log(this.editData);
        uni.navigateTo({
          url: `/subPages/distribution/createdPlan/components/deliveryDays?param=${this.type}`,
        });
      } else {
        //编辑
        const data = {
          ruleType: this.ruleType,
          deliveryDetails: this.selectWeek,
          intervalDate: this.intervalDate,
          ruleTypeName: ruleTypeName[this.ruleType],
        };
        this.M_AlterRuleType(data);
        console.log(this.editData);
        uni.navigateBack({
          delta: 1,
        });
      }
    },
    //选中
    check(type: string) {
      console.log("type", type);
      this.ruleType = type;
      this.radioChange();
    },

    radioChange(e) {
      console.log("e---------?", e);
      this.btnactive = true;
      // this.ruleType = ruleTypeEnum[e.detail.value];
      switch (this.ruleType) {
        case ruleTypeEnum.EVERY_DAYS:
          this.intervalDate = 1; //间隔天数
          this.selectWeek = []; //星期
          return;
        case ruleTypeEnum.TERTIAN_DAYS:
          this.selectWeek = [];
          return;
        case ruleTypeEnum.WEEK_DAYS:
          this.intervalDate = 1;
          return;
        case ruleTypeEnum.LEGAL_WORKING_DAYS:
          this.intervalDate = 1; //间隔天数
          this.selectWeek = []; //星期
          return
        default:
          return;
      }
    },

    selectWeekClick(val) {
      this.btnactive = true;
      try {
        if (this.selectWeek.includes(val)) {
          this.selectWeek.forEach((item, index) => {
            if (item === val) {
              this.selectWeek.splice(index, 1);
            }
          });
        } else {
          this.selectWeek.push(val);
        }
        this.selectWeek = this.selectWeek.sort();
      } catch (error) {
        console.log(error);
      }
    },

    changeValue(value) {
      this.btnactive = true;
      this.intervalDate = value.value;
    },
  },
});
</script>

<style lang="scss" scoped>
.root-view {
  background-color: #f5f5f5;
  height: 100vh;
  overflow: scroll;
}
.prent-container {
  border-bottom: #f5f5f5 1px solid;
  width: 100%;
}
.container {
  width: 100%;
  height: 85px;
  background-color: white;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  justify-content: space-between;
}
.title {
  width: 100%;
  padding-top: 16px;
  padding-left: 16px;
  font-size: 16px;
  color: #88c7e8;
}
.num-font {
  font-size: 24px;
  color: #1d9bdc;
}
.title-text {
  font-size: 18px;
  color: #1d9bdc;
  padding-left: 16px;
  padding-top: 8px;
  margin-bottom: 32px;
}
.title-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.title-view-week {
  height: 100%;
  display: flex;
  align-items: center;
}
.big-title {
  margin-top: 16px;
  font-size: 18px;
  color: #666666;
  margin-bottom: 8px;
}
.mix-title {
  font-size: 14px;
  color: #999999;
}
.radio-view {
  height: 100%;
  display: flex;
  align-items: center;
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
  font-size: 17px;
}
.week-list {
  background: white;
  margin-top: -50rpx;
  padding-left: 48rpx;
  padding-right: 48rpx;
}
.week-list-container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: 250rpx;
}
.week-item {
  margin-right: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 149rpx;
  height: 72rpx;
  border-radius: 8rpx;
  background: #f1f1f1;
  font-size: 28rpx;
  color: #999999;
}
.week-item-active {
  margin-right: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 149rpx;
  height: 72rpx;
  border: 1px solid #1d9bdc;
  border-radius: 8rpx;
  background: #e4f4ff;
  font-size: 28rpx;
  color: #1d9bdc;
}
.num-input {
  height: 120rpx;
  margin-top: -20rpx;
  padding-left: 48rpx;
  padding-right: 48rpx;
  width: 100%;
  background: white;
}

.minus-btn {
  width: 48rpx;
  height: 48rpx;
}
</style>
