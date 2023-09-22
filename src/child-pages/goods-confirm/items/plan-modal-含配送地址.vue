<template>
  <view class="modal" v-if="show">
    <view
      class="empty"
      @click.stop="onClosePlan"
      :style="{ height: calcEmptyH }"
    ></view>
    <!-- 弹窗内容 -->
    <view class="main" :style="{ height: modelH }">
      <!-- 标题 -->
      <view class="d-flex-center d-sb" style="margin-bottom: 40rpx">
        <view class="flex-1 d-flex d-center mian-size main-font-b">{{
          topName
        }}</view>
        <u-icon name="close" color="#999999" size="20" @tap="onClosePlan" />
      </view>
      <!-- 内容       -->
      <view v-if="typeName === DeliveryPlanEnum.Where">配送地址</view>
      <view class="main-body" v-else>
        <view
          :class="[
            typeName === DeliveryPlanEnum.EveryNum ? 'd-flex-center' : 'd-sb',
          ]"
          class="d-se"
        >
          <view
            v-for="(el, index) in calcList"
            :key="index"
            class="row-model"
            @tap="onClickNum(el, index)"
          >
            <view
              class="d-flex-center"
              style="margin-bottom: 20rpx"
              :class="[
                typeName === DeliveryPlanEnum.EveryNum ? 'd-se' : 'd-sb',
              ]"
            >
              <view
                :class="[
                  typeName === DeliveryPlanEnum.EveryNum ? 'num-text' : '',
                  typeName === DeliveryPlanEnum.EveryNum && numIndex === index
                    ? 'num-text-active'
                    : '',
                ]"
                >{{ el.label }}</view
              >
              <radio-group
                @change="radioChange(el, index)"
                v-if="typeName !== DeliveryPlanEnum.EveryNum"
              >
                <label class="radio">
                  <radio
                    :value="el.value"
                    :checked="checked === el.value"
                    color="#1D9BDC"
                    style="transform: scale(0.77)"
                /></label>
              </radio-group>
            </view>
            <!--隔日送 步进器 -->
            <view
              class="day-step"
              v-if="
                typeName === DeliveryPlanEnum.HowLong &&
                el.value === ruleTypeEnum.TERTIAN_DAYS &&
                checked === ruleTypeEnum.TERTIAN_DAYS
              "
            >
              <h-number-box
                :integer="true"
                buttonSize="64rpx"
                inputWidth="64rpx"
                color="#999999"
                v-model="defaultDay"
                :disabledInput="false"
                :min="1"
                :max="30"
                @change="changeValue"
                @blur="blurNumber"
              >
                <view slot="minus" />
                <view slot="plus" />
              </h-number-box>
            </view>
            <!-- 星期送 -->
            <view
              v-if="el.children && checked === ruleTypeEnum.WEEK_DAYS"
              class="d-flex-warp week-list"
            >
              <view
                v-for="item in el.children"
                :key="item.id"
                :class="[
                  'week',
                  weekVal.includes(item.value) ? 'week-active' : '',
                ]"
                @tap="onClickWeek(item)"
                >{{ item.label }}</view
              >
            </view>
          </view>
        </view>
        <!--每次配送步进器 -->
        <view
          v-if="
            typeName === DeliveryPlanEnum.EveryNum &&
            numIndex === 3 &&
            calcList.length === 4
          "
          class="num-step d-flex-center d-sb"
        >
          <view>自定义数量：</view>
          <h-number-box
            :integer="true"
            buttonSize="64rpx"
            inputWidth="64rpx"
            color="#000"
            v-model="defaultNum"
            :disabledInput="false"
            :min="1"
            :max="goodsInfo[0].qty"
            @change="changDefaultNum"
            @blur="blurDefaultNum"
          >
            <view slot="minus" />
            <view slot="plus" />
          </h-number-box>
        </view>
      </view>

      <!-- 按钮 -->
      <button class="ok-btn" @tap="onSureBtn">确定</button>
    </view>
  </view>
</template>

<script>
import {
  ruleTypeEnum,
  ruleTypeName,
  TimeSectionName,
  timeSectionEnum,
  DeliveryPlanEnum,
} from "@/utils/enum";
import { mapMutations, mapState } from "vuex";
import { BaseApp } from "@/const/appIdConf";
export default {
  props: {
    show: {
      //显示弹窗
      type: Boolean,
      default: false,
    },
    dataInfo: {
      //弹窗内容
      type: Object,
      default: () => {
        return {};
      },
    },
    typeName: {
      // 弹窗类型
      type: String,
      default: "HowLong",
    },
    mainH: {
      //弹窗高度-百分比55-63%
      type: String,
      default: "55%",
    },
    goodsInfo: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      DeliveryPlanEnum,
      ruleTypeEnum,
      ruleTypeName,
      TimeSectionName,
      timeSectionEnum,
      topNameType: "",
      checked: "",
      checkedIndex: 0, //默认。选中
      defaultDay: 1, //间隔天数1-30
      defaultNum: 1, //自定义数量1-999
      numIndex: 0, //配送数量选中下标
      weekVal: [], //选中星期几
      currentWeek: [], //选中还未确认星期
      infos: {
        timeSectionName: "",
        timeSection: "",
        ruleTypeName: "",
        ruleType: "",
        intervalDate: 1, //间隔天数
        deliveryDetails: "", //星期几送
        everyNum: 1, //每次配送
      },
      currenObj: {}, //当前选中未确认
      checkList: {
        [DeliveryPlanEnum.HowLong]: [
          //配送上规律
          {
            label: ruleTypeName.EVERY_DAYS,
            value: ruleTypeEnum.EVERY_DAYS,
            id: 3,
            type: "long",
          },
          {
            label: ruleTypeName.TERTIAN_DAYS,
            value: ruleTypeEnum.TERTIAN_DAYS,
            id: 4,
            type: "long",
          },
          {
            label: ruleTypeName.WEEK_DAYS,
            value: ruleTypeEnum.WEEK_DAYS,
            type: "long",
            children: [
              {
                label: "星期一",
                value: "1",
                id: "week1",
                type: "long",
              },
              {
                label: "星期二",
                value: "2",
                id: "week2",
                type: "long",
              },
              {
                label: "星期三",
                value: "3",
                id: "week3",
                type: "long",
              },
              {
                label: "星期四",
                value: "4",
                id: "week4",
                type: "long",
              },
              {
                label: "星期五",
                value: "5",
                id: "week5",
                type: "long",
              },
              {
                label: "星期六",
                value: "6",
                id: "week6",
                type: "long",
              },
              {
                label: "星期日",
                value: "7",
                id: "week7",
                type: "long",
              },
            ],
            id: 5,
          },
          {
            label: ruleTypeName.LEGAL_WORKING_DAYS,
            value: ruleTypeEnum.LEGAL_WORKING_DAYS,
            id: 5,
            type: "long",
          },
        ],
        [DeliveryPlanEnum.HowTime]: [
          //配送上/下午
          {
            label: TimeSectionName.FORENOON,
            value: timeSectionEnum.FORENOON,
            id: 1,
            type: "time",
          },
          {
            label: TimeSectionName.AFTERNOON,
            value: timeSectionEnum.AFTERNOON,
            id: 2,
            type: "time",
          },
        ],
        [DeliveryPlanEnum.EveryNum]: [],
      },
    };
  },
  created() {
    console.log("this.typeName", this.typeName);
  },
  computed: {
    ...mapState("product", ["productinfo"]),
    ...mapState("plan", ["planInfo", "weekList"]),
    // 弹窗高度
    modelH() {
      const heights = {
        [DeliveryPlanEnum.HowLong]: "65%",
        [DeliveryPlanEnum.HowTime]: "55%",
        [DeliveryPlanEnum.EveryNum]: "55%",
        [DeliveryPlanEnum.Where]: "65%",
      };
      return heights[this.typeName];
    },
    //空白高度
    calcEmptyH() {
      const numDef = parseInt(this.modelH?.slice(0, -1));
      const ll = 100 - (numDef ? numDef : 55) + "%";
      console.log("ll22", ll);
      return ll;
    },
    //标题
    topName() {
      const objFn = {
        [DeliveryPlanEnum.HowLong]: "选择您的配送规律",
        [DeliveryPlanEnum.HowTime]: "选择每次配送时间",
        [DeliveryPlanEnum.EveryNum]: "选择每次配送数量",
        [DeliveryPlanEnum.Where]: "选择配送地址",
      };
      this.topNameType = this.typeName;
      return objFn[this.typeName];
    },
    defaultList() {
      //上午还是下午送
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
      const type = BaseApp.plan;
      switch (type) {
        case "am":
          this.checkList.time = amPM.am;
          return amPM.am;
        case "pm":
          this.checkList.time = amPM.pm;
          return amPM.pm;
        default:
          return this.checkList[DeliveryPlanEnum.HowTime];
      }
    },
    //弹窗内容
    calcList: {
      get: function () {
        return this.checkList[this.typeName];
      },
      set: function (res) {
        this.checkList[this.typeName] = res;
      },
    },

    // 默认选择
    defaultCheck() {
      //配送规律
      if (this.typeName === DeliveryPlanEnum.HowLong) {
        //配送规律
        this.checked = this.dataInfo?.ruleType || this.calcList[0].value;
        this.defaultDay = this.dataInfo?.intervalDate || 1;
        this.weekVal = this.dataInfo?.deliveryDetails?.split(",") || [];
        console.log("this.weekVal初始化", this.weekVal);
      } else if (this.typeName === DeliveryPlanEnum.HowTime) {
        //配送上/下午
        this.checked = this.defaultNoon();
        console.log("this.defaultList[0].value", this.defaultList[0].value);
        // this.checked = this.dataInfo?.timeSection || this.defaultList[0].value;
      } else if (this.typeName === DeliveryPlanEnum.EveryNum) {
        //配送数量
        const x =
          this.dataInfo?.everyNum - 1 <= 0 ? 0 : this.dataInfo?.everyNum - 1;
        this.numIndex = x >= 3 ? 3 : x || 0;
        this.defaultNum = this.dataInfo?.everyNum;
      }
      return;
    },

    // 变化的数量
    calcNum() {
      if (this.typeName === DeliveryPlanEnum.EveryNum) {
        let bigArr = [];
        const len = this.goodsInfo[0].qty;
        if (len > 3) {
          bigArr = [
            //数量
            { label: "1" + this.productinfo.unitName, value: 1, type: "num" },
            { label: "2" + this.productinfo.unitName, value: 2, type: "num" },
            { label: "3" + this.productinfo.unitName, value: 3, type: "num" },
            { label: "自定义", value: 0, type: "num" },
          ];
          this.calcList = bigArr;
          return bigArr;
        } else {
          bigArr = [];
          for (let i = 1; i <= len; i++) {
            bigArr.push({
              label: i + this.productinfo.unitName,
              value: i,
              type: "num",
            });
          }
          this.calcList = bigArr;
          return bigArr;
        }
      }
    },
  },

  methods: {
    ...mapMutations("plan", ["V_setAsyncPlanInfo", "V_setWeekList"]),
    // 默认
    defaultNoon() {
      const noonObj = {
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
        all: [
          {
            label: TimeSectionName.FORENOON,
            value: timeSectionEnum.FORENOON,
            id: 1,
            type: "time",
          },
          {
            label: TimeSectionName.AFTERNOON,
            value: timeSectionEnum.AFTERNOON,
            id: 2,
            type: "time",
          },
        ],
      };
      this.calcList = noonObj[BaseApp.plan];
      const str = this.dataInfo?.timeSection || noonObj[BaseApp.plan][0].value;
      return str;
    },
    // 关闭弹窗
    onClosePlan() {
      // 未确认
      if (this.show) {
        //配送规律
        if (this.typeName === DeliveryPlanEnum.HowLong) {
          console.log("this.currentWeek", this.currentWeek);
          this.checked = this.dataInfo?.ruleType || this.calcList[0].value;
          this.defaultDay = this.dataInfo?.intervalDate || 1;
          this.V_setAsyncPlanInfo({
            deliveryDetails: this.weekList.join(","),
          });
          this.weekVal = this.dataInfo.deliveryDetails?.split(",") || [];
        } else if (this.typeName === DeliveryPlanEnum.HowTime) {
          this.checked = this.dataInfo?.timeSection || this.calcList[0].value;
        } else if (this.typeName === DeliveryPlanEnum.EveryNum) {
          const x =
            this.dataInfo?.everyNum - 1 <= 0 ? 0 : this.dataInfo?.everyNum - 1;
          this.numIndex = x >= 3 ? 3 : x || 0;
          this.defaultNum = this.dataInfo?.everyNum;
        }
      }
      this.$emit("onClosePlan", this.show);
    },
    // 设置参数
    setInfos(el) {
      console.log("el--设置参数", el);
      const fn = {
        long: (el) => {
          this.infos.ruleType = el.value;
          this.infos.ruleTypeName = el.label;
          this.currenObj = {
            ruleType: el.value,
            ruleTypeName: el.label,
          };
        },
        time: (el) => {
          this.infos.timeSectionName = el.label;
          this.infos.timeSection = el.value;
          this.currenObj = {
            timeSection: el.value,
            timeSectionName: el.label,
          };
        },
        num: (el) => {
          console.log("el每次送多少", el);
        },
      };
      fn[this.typeName](el);
    },
    //选择当前radio
    radioChange(el, index) {
      console.log("e当选", el, "-----", index);
      this.checked = el.value;
      this.checkedIndex = index;
      this.setInfos(el);
    },
    // 点击当前文字
    onClickNum(el, index) {
      console.log("el-点击数字num", el);
      if (el.type !== "num") {
        this.checked = el.value;
        this.checkedIndex = index;
        this.setInfos(el);
      } else {
        //每次配送数量
        this.numIndex = index;
        this.infos.everyNum = el.value;
      }
    },
    // 点击当前星期
    onClickWeek(el) {
      this.currentWeek = this.weekVal;
      console.log("this.currentWeek", this.currentWeek);
      if (!this.weekVal.includes(el.value)) {
        this.weekVal = [...this.weekVal, el.value].sort();
        this.V_setAsyncPlanInfo({
          deliveryDetails: this.weekVal.join(","),
        });
      } else {
        this.weekVal = this.weekVal.filter((it) => {
          return it !== el.value;
        });
        this.V_setAsyncPlanInfo({
          deliveryDetails: this.weekVal.join(","),
        });
      }
    },
    // 去空
    filterNull(arr) {
      if (arr.length) {
        const newarr = arr.filter((it) => {
          return it && it.trim();
        });
        return newarr;
      } else return [];
    },
    //确定
    onSureBtn() {
      try {
        let flag = false;
        console.log(
          "this.infos.ruleType",
          this.infos.ruleType,
          this.typeName,
          this.checkedIndex
        );
        const sureFn = {
          long: () => {
            if (!this.checkedIndex) {
              console.log("0", 0);
              //默认选择0-天天送
              this.infos.ruleType = ruleTypeEnum.EVERY_DAYS;
              this.infos.ruleTypeName = ruleTypeName.EVERY_DAYS;
              this.infos.deliveryDetails = "1";
              this.infos.intervalDate = "1";
              this.V_setAsyncPlanInfo({
                ruleType: ruleTypeEnum.EVERY_DAYS,
                ruleTypeName: ruleTypeName.EVERY_DAYS,
              });
            } else {
              console.log("11", 11);
              //隔日送
              if (this.infos.ruleType === ruleTypeEnum.TERTIAN_DAYS) {
                console.log("22", 22);
                this.infos.intervalDate = this.defaultDay;
                this.infos.deliveryDetails = "";
                // 更新
                this.V_setAsyncPlanInfo({
                  intervalDate: this.defaultDay,
                  ...this.currenObj,
                });
                // 星期送
              } else if (this.infos.ruleType === ruleTypeEnum.WEEK_DAYS) {
                console.log("this.weekVal----111", this.weekVal);
                this.infos.intervalDate = "";
                const weeklist = this.filterNull(this.weekVal);
                console.log("weeklist-->", weeklist, "--->", this.weekVal);
                if (!weeklist.length) {
                  flag = true;
                  return uni.showToast({
                    title: "请选择星期几配送",
                    icon: "none",
                  });
                } else {
                  this.infos.deliveryDetails = weeklist.sort().join(",");
                  this.V_setWeekList(weeklist);
                  // 更新
                  this.V_setAsyncPlanInfo({
                    deliveryDetails: weeklist.sort().join(","),
                    ...this.currenObj,
                  });
                }
              } else {
                //法定送
                this.infos.deliveryDetails = "";
                this.infos.intervalDate = "";
                this.infos.ruleType = this.checked;
                this.infos.ruleTypeName = ruleTypeName[this.checked];
                this.infos.deliveryDetails = "1";
                this.infos.intervalDate = "1";
                this.V_setAsyncPlanInfo({
                  ruleType: this.checked,
                  ruleTypeName: ruleTypeName[this.checked],
                });
              }
            }
          },
          time: () => {
            console.log(
              "this.checkedIndex-------------------",
              this.checkedIndex
            );
            this.calcList.find((el, index) => {
              if (el.value == this.checked) {
                this.checkedIndex = index;
              }
            });
            if (!this.checkedIndex) {
              console.log("2--默认选择", 2);
              //默认选择
              this.infos.timeSectionName = TimeSectionName[this.checked];
              this.infos.timeSection = timeSectionEnum[this.checked];
              this.V_setAsyncPlanInfo({
                timeSectionName: TimeSectionName[this.checked],
                timeSection: timeSectionEnum[this.checked],
              });
            } else {
              this.V_setAsyncPlanInfo({
                ...this.currenObj,
              });
            }
          },
          num: () => {
            console.log(
              "this.defaultNum",
              this.defaultNum,
              "this.numIndex",
              this.numIndex,
              "this.infos",
              this.infos
            );
            if (!this.numIndex) {
              //默认
              this.infos.everyNum = 1;
            } else if (this.numIndex > 2) {
              this.infos.everyNum = this.defaultNum;
            }
            if (this.infos.everyNum < 1) {
              this.infos.everyNum = this.defaultNum;
            }
            this.V_setAsyncPlanInfo({
              everyNum:
                this.infos.everyNum < 1 ? this.defaultNum : this.infos.everyNum,
            });
          },
        };
        sureFn[this.typeName]();
        if (flag) return;
        console.log("flag", flag);
        this.$emit("onSureBtn", [this.typeName, this.infos]);
      } catch (error) {}
    },
    // 步进器
    changeValue(e) {
      console.log("e步进器", e);
      console.log("步进器变化", this.defaultDay);
      this.defaultDay = e.value;
    },
    //步进器失焦
    blurNumber() {},
    /**
     * 每次配送步进器
     */
    changDefaultNum(e) {
      console.log("e白莲花", e);
      this.defaultNum = e.value;
    },
    blurDefaultNum() {},
  },
};
</script>

<style scoped lang="scss">
.modal {
  z-index: 10001;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.45);
  // text-align: center;
  .empty {
    background: transparent;
  }
  .main {
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    height: 55%;
    background: #fff;
    position: absolute;
    z-index: 10008;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 48rpx 40rpx 68rpx;
    .main-body {
      height: calc(100% - 130rpx);
      overflow-y: auto;
    }
  }

  .row-model {
    font-size: 30rpx;
    color: #666666;
    padding: 48rpx 0 44rpx;
    border-bottom: 2rpx solid #f4f4f4;
  }
  .week-list {
    justify-content: flex-start;
    .week {
      margin-top: 12rpx;
      width: 120rpx;
      height: 58rpx;
      // padding: 24rpx 12rpx;
      text-align: center;
      line-height: 58rpx;
      border-radius: 8rpx;
      color: #999999;
      font-size: 24rpx;
      background-color: #f1f1f1;
      margin-right: 16rpx;
    }
    .week-active {
      border: 2rpx solid #1d9bdc;
      color: #1d9bdc;
      background: #e4f4ff;
    }
  }
  .num-text {
    // justify-content: space-between;
    color: #999999;
    font-size: 28rpx;
    background-color: #f1f1f1;
    width: 148rpx;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    border-radius: 8rpx;
  }
  .num-text-active {
    border: 2rpx solid #1d9bdc;
    color: #1d9bdc;
    background: #e4f4ff;
  }
  .num-step {
    color: #999999;
    font-size: 32rpx;
    padding: 50rpx 0;
    border-bottom: 2rpx solid #f1f1f1;
  }
  .day-step {
    margin-top: 32rpx;
  }

  .ok-btn {
    border-radius: 254rpx;
    height: 80rpx;
    width: calc(100% - 80rpx);
    line-height: 80rpx;
    border: none;
    background: #1d9bdc;
    color: #fff;
    position: absolute;
    bottom: 68rpx;
  }
}
</style>
