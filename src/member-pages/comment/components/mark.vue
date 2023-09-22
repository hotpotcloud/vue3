/* 打分 */
<template>
  <view class="mark-out">
    <view class="d-flex-center d-sb top-borders">
      <view class="f30 color-33">您对配送员满意吗？</view>
      <view class="color-99">对配送员匿名</view>
    </view>
    <view class="mark-main">
      <view class="rate-border d-flex-center">
        <hRate
          :value="valueRate"
          @change="changeRate"
          :size="30"
          v-if="isFlag === timeSectionEnum.FORENOON"
        />
        <hRate :value="valueRate" @change="changeRate" :size="30" v-else />
        <text class="f24 color-33">{{ rateText }}</text>
      </view>
      <view class="mark-content d-flex-warp">
        <view
          v-for="(item, index) in messageConfig"
          :key="item.id"
          :class="[selectVal.some((el) => el.id === item.id) && 'active']"
          class="mark_item_detail"
          @tap="onSelect(index, item)"
          >{{ item.keywords }}</view
        >
        <view
          v-if="valueRate > 3"
          class="mark_item_detail d-flex-center"
          :class="[isEdit && 'active']"
          @tap="onInput"
        >
          <!-- <uni-icons type="closeempty" size="13" color="#e3a827"></uni-icons> -->
          <u-icon
            :name="isEdit ? 'close' : getAssetImgUrl('edit-mark.png')"
            :color="isEdit ? '#e3a827' : ''"
            size="13"
            width="10"
            height="10"
          />
          去评价</view
        >
      </view>
      <view v-if="isEdit && valueRate > 3" class="mark-textarea">
        <u-textarea
          count="true"
          height="100"
          maxlength="200"
          :value="remark"
          placeholder="对送奶员态度、服务不满意？可描述问题，帮助商家改善"
          @input="inputRemark"
        ></u-textarea>
      </view>
      <view v-if="valueRate <= 3 && valueRate > 0" class="mark-textarea">
        <u-textarea
          count="true"
          height="100"
          maxlength="200"
          :value="remark"
          placeholder="对送奶员态度、服务不满意？可描述问题，帮助商家改善"
          @input="inputRemark"
        ></u-textarea>
      </view>
    </view>
  </view>
</template>

<script>
import hRate from "./h-rate.vue";
import { timeSectionEnum } from "@/utils/enum";

export default {
  components: {
    hRate,
  },
  props: {
    //评分对应选择
    textList: {
      type: Array,
      default: () => [],
    },
    // 评分
    valueRate: {
      type: Number,
      default: 0,
    },
    // 已选评价
    selectVal: {
      type: Array,
      default: () => [],
    },
    remark: {
      type: String,
      default: "",
    },
    isFlag: {
      type: String,
      default: timeSectionEnum.FORENOON, //当前选中的评价信息
    },
  },
  data() {
    return {
      value: "", //文本框内容
      value2: "",
      list: ["很不满", "不满", "一般", "满意", "超满意"],
      isEdit: false,
      timeSectionEnum,
    };
  },
  computed: {
    // 满意度
    rateText() {
      console.log("this.valueRate", this.valueRate);
      return this.list[this.valueRate - 1];
    },
    // 评价文本list
    messageConfig() {
      return this.textList;
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    /* 评价分数修改 */
    changeRate(e) {
      this.isEdit = false;
      this.$emit("changeRate", e.value);
    },
    /* 评价remark */
    inputRemark(e) {
      // this.value = e.detail.value;
      console.log("e", e);
      this.$emit("inputRemark", e);
    },
    /* 评价选择 */
    onSelect(index, item) {
      this.$emit("onSelect", item, index);
    },
    /* 评价文本框 */
    onInput() {
      this.isEdit = !this.isEdit;
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.mark-out {
  background: #fff;
  border-radius: 24rpx;

  .top-borders {
    padding: 24rpx;
    border-bottom: 1rpx solid #f1f1f1;
  }
  .mark-main {
    padding: 32rpx;
    .rate-border {
      padding-left: 16rpx;
    }
  }
  .mark_item_detail {
    padding: 14rpx 24rpx;
    border-radius: 34rpx;
    margin-top: 10rpx;
    margin-right: 10rpx;
    color: #999999;
    background: #f1f1f1;
    border: 2rpx solid transparent;

    &.active {
      color: #e3a827;
      background: rgba(255, 205, 95, 0.15);
      border-color: #ffcd5f;
    }
  }
  .mark-textarea {
    margin-top: 16rpx;
  }
}
</style>