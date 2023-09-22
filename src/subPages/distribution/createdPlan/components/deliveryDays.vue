<template>
  <view class="day-root-container">
    <view class="title"><text class="num-font">2</text>/5</view>
    <view class="title-text">选择每次配送时间</view>
    <view class="prent-container" v-for="i in defaultList" :key="i.id">
      <view class="container">
        <view class="title-view">
          <view
            class="big-title"
            :style="{ color: check === i.value ? '#1D9BDC' : '#666666' }"
            >{{ i.label }}</view
          >
        </view>
        <view class="radio-view">
          <radio-group @change="radioChange">
            <label class="radio"
              ><radio
                :value="i.value"
                color="blue"
                :checked="check === i.value"
                style="transform: scale(0.77)"
            /></label>
          </radio-group>
        </view>
      </view>
    </view>

    <!-- <view class="prent-container">
      <view class="container">
        <view class="title-view">
          <view
            class="big-title"
            :style="{ color: check === 'AFTERNOON' ? '#1D9BDC' : '#666666' }"
            >下午送</view
          >
        </view>
        <view class="radio-view">
          <radio-group @change="radioChange">
            <label class="radio"
              ><radio
                value="AFTERNOON"
                color="blue"
                :checked="check === 'AFTERNOON'"
                style="transform: scale(0.77)"
            /></label>
          </radio-group>
        </view>
      </view>
    </view> -->

    <view class="btn-view">
      <view
        class="button-style"
        @click="nextStep"
        :style="{ background: btnActive ? '#1D9BDC' : '#C7C7C7' }"
        >{{ btnText }}</view
      >
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { AlterORCrtate, TimeSectionName, timeSectionEnum } from "@/utils/enum";
import { mapMutations, mapState } from "vuex";
import { BASE_APPID_KEY } from "@/utils/config";
import { conf } from "@/const/appIdConf";
export default Vue.extend({
  data() {
    return {
      check: "",
      timeSection: [],
      btnText: "下一步",
      btnActive: false,
    };
  },
  watch: {
    defaultList(newVal, oldVal) {
      console.log("12333333333", newVal, oldVal);
    },
  },
  computed: {
    ...mapState("distribution", ["addProject", "editData"]),
    // 上午还是下午送
    defaultList() {
      const amPM = {
        am: [
          {
            label: TimeSectionName.FORENOON,
            value: timeSectionEnum.FORENOON,
            id: 1,
            type: "time",
          },
        ],
        pm: [
          {
            label: TimeSectionName.AFTERNOON,
            value: timeSectionEnum.AFTERNOON,
            id: 2,
            type: "time",
          },
        ],
      };
      const type = conf[BASE_APPID_KEY].plan;
      switch (type) {
        case "am":
          this.check = timeSectionEnum.FORENOON;
          return amPM.am;
        case "pm":
          this.check = timeSectionEnum.AFTERNOON;
          return amPM.pm;
        default:
          this.check = timeSectionEnum.FORENOON;
          return [...amPM.am, ...amPM.pm];
      }
    },
  },
  onReady() {},

  onLoad(options) {
    let data = options.param;
    this.type = data;
  },
  onShow() {
    if (this.type === AlterORCrtate.CREATE) {
      // this.check = "FORENOON";
      // this.btnActive = true;
      this.changeFn(this.check);
      this.btnText = "下一步";
    } else {
      this.btnActive = true;
      this.btnText = "确定";
      this.check = this.editData.timeSection;
      this.timeSection = [this.editData.timeSection];
    }
    console.log(this.editData);
  },
  methods: {
    ...mapMutations("distribution", ["M_timeFrame", "M_AlterTimeFrame"]),
    nextStep() {
      console.log("被点击了", this.btnActive);

      if (!this.btnActive) return;
      if (this.timeSection.length > 0) {
        this.createOralter();
      } else {
        uni.showToast({
          title: "请选择配送时段",
          icon: "none",
          duration: 3000,
        });
      }
    },
    createOralter() {
      if (this.type === AlterORCrtate.CREATE) {
        this.M_timeFrame(this.timeSection);
        uni.navigateTo({
          url: `/subPages/distribution/createdPlan/components/selectDeliveryTime?param=${this.type}`,
        });
      } else {
        const data = {
          timeSection: this.timeSection,
          timeSectionName: TimeSectionName[this.check],
        };
        this.M_AlterTimeFrame(data);
        console.log(this.editData);
        uni.navigateBack({
          delta: 1,
        });
      }
    },

    radioChange(e: any) {
      console.log("e", e);
      // let arr = [e.detail.value];
      // this.check = e.detail.value;
      // this.btnActive = true;
      // this.timeSection = arr;
      const val = e.detail.value;
      this.changeFn(val);
    },
    changeFn(e: string) {
      this.check = e;
      this.btnActive = true;
      this.timeSection = [e];
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
.prent-container {
  border-bottom: #f5f5f5 1px solid;
  width: 100%;
}
.container {
  width: 100%;
  height: 170rpx;
  background-color: white;
  padding-left: 48rpx;
  padding-right: 48rpx;
  display: flex;
  justify-content: space-between;
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
  font-size: 34rpx;
}
</style>
