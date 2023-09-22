<template>
  <view class="modal" v-if="show">
    <view
      class="empty"
      @click.stop="onClosePlan"
      :style="{ height: height.emptyH }"
    ></view>
    <!-- 弹窗内容 -->
    <view class="main" :style="{ height: height.main }">
      <!-- 标题 -->
      <view class="d-flex-center d-sb" style="margin-bottom: 40rpx">
        <view class="flex-1 d-flex d-center mian-size main-font-b">
          {{ topName }}
        </view>
        <u-icon name="close" color="#999999" size="20" @tap="onClosePlan" />
      </view>
      <!-- 内容       -->
      <view class="main-body">
        <!-- <slot name="main"></slot> -->
        <view
          :class="[
            typeName === typeNameEnum.ruleNum ? 'd-flex-center' : 'd-sb',
          ]"
          class="d-se"
        >
          <view
            v-for="(el, index) in currentList"
            :key="el.id"
            class="row-model"
          >
            <view
              class="d-flex-center"
              style="margin-bottom: 20rpx"
              :class="[typeName === typeNameEnum.ruleNum ? 'd-se' : 'd-sb']"
            >
              <view
                @tap.stop="onClickNum(el, index)"
                :class="[
                  typeName === typeNameEnum.ruleNum ? 'num-text' : '',
                  typeName === typeNameEnum.ruleNum && numIndex === index
                    ? 'num-text-active'
                    : '',
                ]"
                >{{ el.label }}</view
              >
              <radio-group
                @change="radioChange(el, index)"
                v-if="typeName !== typeNameEnum.ruleNum"
              >
                <label class="radio">
                  <radio
                    :value="el.value"
                    :checked="checked === el.value"
                    color="#1D9BDC"
                    style="transform: scale(0.77)"
                  />
                </label>
              </radio-group>
            </view>
            <!--隔日送 步进器 -->
            <view
              class="day-step"
              v-if="
                typeName === typeNameEnum.ruleType &&
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
                @tap.stop="onClickWeek(item)"
                >{{ item.label }}</view
              >
            </view>
          </view>
        </view>
        <!--每次配送步进器 -->
        <view
          v-if="
            typeName === typeNameEnum.ruleNum &&
            numIndex === 3 &&
            currentList.length === 4
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
  planListEnum,
  typeNameEnum,
} from "@/utils/enum";
import { mapMutations, mapState } from "vuex";
import { BaseApp } from "@/const/appIdConf";
// import { planListEnum } from "./planConfig";
export default {
  props: {
    show: {
      //显示弹窗
      type: Boolean,
      default: false,
    },
    res: {
      //弹窗内容
      type: Object,
      default: null,
    },
    typeName: {
      // 弹窗类型
      type: String,
      default: typeNameEnum.ruleType,
    },
    mainH: {
      //弹窗高度55-63%
      type: String | Number,
      default: 0,
    },
    goodsInfo: {
      type: Array | Object,
      default: () => {},
    },
  },
  data() {
    return {
      typeNameEnum,
      ruleTypeEnum,
      timeSectionEnum,
      checkedIndex: 0,
      checked: "",
      defaultDay: 1, //隔日送默认天数1-30
      defaultNum: 1, //每次配送默认数量1-999
      numIndex: 0,
      weekVal: [], //选中的星期，复现
      currentWeek: [], //星期选中还未确认
      checkedObj: {}, //选中内容
    };
  },
  created() {},
  onLoad() {
    console.log(this.productinfo, "==============");
  },
  computed: {
    ...mapState("product", ["productinfo"]),
    ...mapState("plan", ["planInfo", "weekList"]),
    // 弹窗高度
    height() {
      const heights = {
        [typeNameEnum.ruleType]: 68,
        [typeNameEnum.ruleAmPm]: 55,
        [typeNameEnum.ruleNum]: 55,
      };
      const main = (this.main > 0 ? this.main : heights[this.typeName]) + "%";
      const emptyH = 100 - parseInt(main) + "%";
      return {
        main,
        emptyH,
      };
    },
    //标题
    topName() {
      const name = {
        [typeNameEnum.ruleType]: "选择您的配送规律",
        [typeNameEnum.ruleAmPm]: "选择每次配送时间",
        [typeNameEnum.ruleNum]: "选择每次配送数量",
      };
      return name[this.typeName];
    },
    //弹窗内容
    currentList() {
      const { typeName, goodsInfo } = this;
      const apm = BaseApp.plan;
      let arr = [];
      if (typeName === typeNameEnum.ruleAmPm) {
        arr = planListEnum[typeName][apm];
      } else {
        //每次配送数量
        if (typeName === typeNameEnum.ruleNum) {
          const len = goodsInfo[0]?.qty;
          const unitName = goodsInfo[0]?.unitName;
          const obj = { label: "自定义", value: 0, type: "num" };
          for (let i = 1; i <= len; i++) {
            arr.push({ label: i + unitName, value: i, type: "num" });
            if (i === 3 && len > 3) break;
          }
          return (arr = len > 3 ? [...arr, obj] : arr);
        }
        arr = planListEnum[typeName];
      }
      console.log(arr, "成都市号贩子");
      return arr;
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.init();
      }
    },
  },
  methods: {
    init() {
      this.numIndex = 0;
      this.defaultNum = 1;
      this.defaultDay = 1;
      this.checked = "";
      this.checkedIndex = 0;
      this.weekVal = [];
      const { typeName, res } = this;
      const copyTypeName = JSON.parse(JSON.stringify(typeName));
      const copyRes = JSON.parse(JSON.stringify(res));
      const { ruleType, timeSection, everyNum } = copyRes;
      const defaultCheck = {
        [typeNameEnum.ruleType]: () =>
          this.defaultRuleType(ruleType || ruleTypeEnum.EVERY_DAYS), //默认天天送
        [typeNameEnum.ruleAmPm]: () => {
          console.log("timeSection", timeSection);
          this.defaultTimeSection(timeSection || this.currentList[0].value);
        }, //默认配置第一个
        [typeNameEnum.ruleNum]: () => this.defaultEveryNum(everyNum || 1),
      };
      return defaultCheck[copyTypeName]();
    },
    // 默认选中-配送规律 type-配送规律类型
    defaultRuleType(type) {
      const ruleTypeFn = {
        // 天天送
        [ruleTypeEnum.EVERY_DAYS]: () =>
          this.checkedCurrentFn(this.currentList[0], 0),
        // 隔日送
        [ruleTypeEnum.TERTIAN_DAYS]: () => {
          this.checkedCurrentFn(this.currentList[1], 1);
          this.defaultDay = this.res?.intervalDate;
        },
        //星期送
        [ruleTypeEnum.WEEK_DAYS]: () => {
          this.checkedCurrentFn(this.currentList[2], 2);
          this.weekVal = this.res?.deliveryDetails?.split(",");
        },
        //法定工作日送
        [ruleTypeEnum.LEGAL_WORKING_DAYS]: () =>
          this.checkedCurrentFn(this.currentList[3], 3),
      };
      return ruleTypeFn[type]();
    },
    // 默认选中-配送时间段
    defaultTimeSection(timeSection) {
      const index = this.currentList.length > 1 ? 1 : 0;
      const timeSectionFn = {
        [timeSectionEnum.FORENOON]: () =>
          this.checkedCurrentFn(
            {
              value: timeSectionEnum.FORENOON,
              label: TimeSectionName.FORENOON,
            },
            0
          ),
        [timeSectionEnum.AFTERNOON]: () =>
          this.checkedCurrentFn(
            {
              value: timeSectionEnum.AFTERNOON,
              label: TimeSectionName.AFTERNOON,
            },
            index
          ),
      };
      return timeSectionFn[timeSection]();
    },
    //默认选中-每次配送数量
    defaultEveryNum(num) {
      const index = num - 1 > 0 ? num - 1 : 0; // 默认选中
      this.numIndex = index >= 3 ? 3 : index;
      this.defaultNum = num;
    },
    //----选中当前----
    checkedCurrentFn(el, index) {
      console.log("el", el);
      if (el.type === "num") {
        this.numIndex = index;
        this.defaultNum = el.value;
      } else {
        this.checked = el.value;
        this.checkedIndex = index;
        this.setPlanReq(el);
      }
    },
    radioChange(el, index) {
      this.checkedCurrentFn(el, index);
    },
    onClickNum(el, index) {
      this.checkedCurrentFn(el, index);
    },
    // -----隔日送------
    changeValue(e) {
      this.defaultDay = e.value;
    },
    // -----星期送------
    onClickWeek(item) {
      const { value } = item;
      this.weekVal = this.weekVal.includes(value)
        ? this.weekVal.filter((el) => el !== value)
        : [...this.weekVal, value].sort();
    },
    // -----每次配送数量------
    changDefaultNum(e) {
      this.defaultNum = e;
    },
    // 设置参数-新建+修改
    setPlanReq(el) {
      const fn = {
        [typeNameEnum.ruleType]: () => {
          console.log("this.defaultDay---设置", this.defaultDay);
          this.checkedObj = {
            ruleType: el.value,
            ruleTypeName: el.label,
            intervalDate:
              el.value === ruleTypeEnum.TERTIAN_DAYS ? this.defaultDay : "",
            deliveryDetails:
              el.value === ruleTypeEnum.WEEK_DAYS ? this.weekVal : "",
          };
        },
        [typeNameEnum.ruleAmPm]: () => {
          this.checkedObj = {
            timeSection: el.value,
            timeSectionName: el.label,
          };
        },
        [typeNameEnum.ruleNum]: () => {},
      };
      fn[this.typeName]();
    },
    // -----关闭+未确定-----
    onClosePlan() {
      this.init();
      this.$emit("onClosePlan", this.show);
    },
    // -----确定-----
    onSureBtn() {
      const { checked, typeName, weekVal, checkedObj, defaultDay, defaultNum } =
        this;
      const sureObj = {
        [typeNameEnum.ruleType]: () => {
          checkedObj.intervalDate =
            checked === ruleTypeEnum.TERTIAN_DAYS ? defaultDay : "";
          if (checked === ruleTypeEnum.WEEK_DAYS) {
            if (!weekVal.length)
              return uni.showToast({ title: "请选择星期", icon: "none" });
            checkedObj.deliveryDetails = weekVal.join(",");
          }

          this.$emit("onSureBtn", {
            checked,
            typeName,
            checkedObj,
          });
        },
        [typeNameEnum.ruleAmPm]: () => {
          checkedObj.timeSection = checked;
          this.$emit("onSureBtn", {
            checked,
            typeName,
            checkedObj,
          });
        },
        [typeNameEnum.ruleNum]: () => {
          checkedObj.everyNum = defaultNum;
          this.$emit("onSureBtn", {
            checked,
            typeName,
            checkedObj,
          });
        },
      };
      return sureObj[typeName]();
    },
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
