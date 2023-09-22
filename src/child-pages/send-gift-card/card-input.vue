<template>
  <view class="card-text-input">
    <view class="margin24-bot">
      <view class="f28 color-99 margin16-bot">自定义祝福语</view>
      <u-textarea
        class="textarea-bg"
        count
        maxlength="50"
        placeholder="送上你的祝福"
        showConfirmBar="false"
        :value="value"
        @input="onInput"
      ></u-textarea>
    </view>
    <view class="bless-main">
      <view class="f28 color-99 margin24-bot">快捷祝福</view>
      <view class="d-flex-warp">
        <view
          v-for="(str, index) in getMessage()"
          :key="index"
          class="str-item margin16-bot h-over-1"
          @tap="onChooseStr(str)"
        >
          <!-- :class="[str === value && 'str-item-active']" -->
          {{ str }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    // 这里存放数据
    return {
      list: [],
    };
  },
  // 方法集合
  methods: {
    getMessage() {
      const messageTemplate = this.data.messageTemplate;
      if (!messageTemplate) return [];
      if (messageTemplate.includes(";")) return messageTemplate.split(";");
      if (messageTemplate.includes("；")) return messageTemplate.split("；");

      return [messageTemplate];

      // return [];
    },
    onChooseStr(str) {
      // this.onInput(str);
      this.$emit("onChooseStr", str);
    },
    onInput(val) {
      console.log("val-zujian", val);
      if (val.length >= 50)
        return uni.showToast({
          title: "最多输入50字",
          icon: "none",
          success: () => {
            val = val.slice(0, 50);
          },
        });
      this.$emit("onInput", val);
    },
  },
};
</script>
<style scope lang="scss">
.card-text-input {
  background: #fff;
  padding: 24rpx;
  padding-left: 12rpx;
  border-radius: 20rpx;
  .margin24-bot {
    margin-bottom: 24rpx;
  }
  .margin16-bot {
    margin-bottom: 16rpx;
  }

  .str-item {
    margin-left: 12rpx;
    line-height: 56rpx;
    padding: 0rpx 24rpx;
    word-break: normal;
    color: #a9a9a9;
    background: #fafafa;
    border-radius: 16rpx;
    border: 2rpx solid #f8f8f8;
  }
  .str-item-active {
    background: #e4f4ff;
    border: 2rpx solid #1d9bdc;
    color: #1d9bdc;
  }
}
// .textarea-bg {
//   background-color: #1d9bdc;
// }
</style>

