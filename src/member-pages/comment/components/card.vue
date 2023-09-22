/* 单个商品卡片 */
<template>
  <view class="card_out">
    <!-- 已评价 -->
    <view class="mar48_bot" v-if="!itemEvaluate">
      <view class="marked_goods d-flex d-sb">
        <view class="goods_img">
          <img :src="getAssetImgUrl(child.goodsImgUrl)" alt="" />
        </view>
        <view class="d-flex-colum d-sb flex-1">
          <view class="font-28-w color-33 h-overflow-2">{{
            child.spuName
          }}</view>
          <view class="d-flex-center">
            <hRate :margin="10" :value="child.goodsScore" :disabled="true" />
            <text class="f24 color-33">{{
              !!child.goodsScore ? rateTextFn(child.goodsScore) : "未评价"
            }}</text>
          </view>
        </view>
      </view>
      <!-- 评论详情 -->
      <view class="d-flex-warp mar24_top">
        <view
          v-for="(i, index) in child.keywordsList"
          :key="index"
          class="card_mark_item"
        >
          <text> #{{ i.keywords }}</text>
        </view>
      </view>
    </view>
    <!-- 未评价 -->
    <view class="mar48_bot" v-else>
      <view class="mark_goods d-flex d-sb">
        <view class="goods_img">
          <img :src="getAssetImgUrl(child.goodsImgUrl)" alt="" />
        </view>
        <view class="d-flex-colum d-sb flex-1">
          <view class="font-28-w color-33 h-overflow-2">{{
            child.spuName
          }}</view>
          <view class="d-flex-center">
            <hRate
              :margin="10"
              :value="child.goodsScore"
              @change="onChangeRate"
            />
            <text class="f24 color-33">{{ rateTextFn(child.goodsScore) }}</text>
          </view>
        </view>
      </view>
      <view class="d-flex-warp">
        <view
          v-for="item in child.goodsConfig"
          :key="item.id"
          :class="[
            child.keywordsList.some((el) => el.id === item.id) && 'active',
          ]"
          class="mark_item_detail"
          @tap="onSelect(item)"
          >{{ item.keywords }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import hRate from "./h-rate.vue";
export default {
  components: {
    hRate,
  },
  props: {
    // 是否已评价
    itemEvaluate: {
      type: Boolean,
      default: false,
    },
    // 评价详情
    child: {
      type: Object,
      default: () => {},
    },
    //商品评分配置
    rateConfig: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    // 满意度
    rateTextFn() {
      return (socre) => {
        const list = ["很不满", "不满", "一般", "满意", "超满意"];
        return list[socre - 1];
      };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onChangeRate(e) {
      console.log("e", e);
      this.$emit("onChangeRate", e.value, this.child);
    },
    onSelect(item) {
      console.log("e-商品", item);
      const arr = uni.$u.deepClone(this.child);
      const { keywordsList } = arr;
      const index = keywordsList.findIndex((el) => el.id === item.id);
      if (index > -1) {
        keywordsList.splice(index, 1);
      } else {
        keywordsList.push(item);
      }
      console.log("arr", arr);
      this.$emit("onSelect", arr);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.goods_img {
  width: 136rpx;
  height: 136rpx;
  border-radius: 24rpx;
  margin-right: 16rpx;
  border: 1rpx solid #f1f1f1;
  overflow: hidden;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods_start {
  width: 48rpx;
  height: 48rpx;
  margin-right: 20rpx;
}
.font24_33 {
  font-size: 24rpx;
  color: #333333;
}
.mar24_top {
  margin-top: 24rpx;
}
.mar48_bot {
  margin-bottom: 48rpx;
}
.card_mark_item {
  color: #a9a9a9;
  margin-left: 8rpx;
}
.mark_item_detail {
  padding: 12rpx 24rpx;
  border-radius: 34rpx;
  margin-top: 10rpx;
  margin-right: 10rpx;
  color: #999999;
  background: #f1f1f1;
  border: 1rpx solid transparent;
  &.active {
    color: #e3a827;
    background: rgba(255, 205, 95, 0.15);
    border-color: #ffcd5f;
  }
}
</style>