<template>
  <view class="fix-out">
    <view>
      <TopCard :title="val.type" :time="val.createdTime" :index="index" />
      <view class="list-main" :class="[isEnd && 'list-main-end']">
        <view class="main-right">
          <!-- 更改商品 -->
          <template v-if="val.type === HistroyTypeEnum.EXCHANGE_GOODS">
            <view
              v-for="(i, index) in val.after"
              :key="index"
              :class="[index < val.after.length - 1 && 'border-bottom']"
            >
              <h-GoodsMsg
                :img="i.goodsImgUrl"
                :price="i.areaPrice"
                :desc="i.specification"
                :num="i.count"
                :name="i.channelSkuName"
              />
            </view>
            <view
              class="d-flex-row-end d-flex-center check-btn"
              v-if="!showBefore"
              @tap="clickBefore"
              >查看原记录
              <img
                :src="getAssetImgUrl('bot-arrow.png')"
                alt=""
                class="open-icon"
              />
            </view>
            <template v-else>
              <view class="before-tip">更改前</view>
              <view
                v-for="(hope, inx) in val.before"
                :key="inx"
                :class="[inx < val.before.length - 1 && 'border-bottom']"
              >
                <h-GoodsMsg
                  :img="hope.goodsImgUrl"
                  :price="hope.areaPrice"
                  :desc="hope.specification"
                  :num="hope.count"
                  :name="hope.channelSkuName"
                  :colorFont="'#999999 !important'"
                />
              </view>
            </template>
          </template>
          <!-- 更改地址 -->
          <template v-if="val.type === HistroyTypeEnum.CHANGE_ADDREDD">
            <AddressCard
              v-for="(add, idx) in val.after"
              :key="idx"
              :address="add"
            />
            <view
              class="d-flex-row-end d-flex-center check-btn"
              v-if="!showBefore"
              @tap="clickBefore"
              >查看原记录
              <img
                :src="getAssetImgUrl('bot-arrow.png')"
                alt=""
                class="open-icon"
              />
            </view>
            <template v-else>
              <view class="before-tip">更改前</view>
              <AddressCard
                v-for="(add, idx) in val.before"
                :key="idx"
                :address="add"
                :colorFont="'#999999 !important'"
              />
            </template>
          </template>
          <!-- 更换配送规律 -->
          <template v-if="val.type === HistroyTypeEnum.CHANGE_RULE">
            <view v-for="(el, keys) in val.after" :key="keys">
              <h-GoodsMsg
                :img="el.changeGoods.goodsImgUrl"
                :price="el.changeGoods.areaPrice"
                :desc="el.changeGoods.specification"
                :num="el.changeGoods.count"
                :name="el.changeGoods.channelSkuName"
              />
              <SendRule :val="el" />
            </view>
            <view
              class="d-flex-row-end d-flex-center check-btn"
              v-if="!showBefore"
              @tap="clickBefore"
              >查看原记录
              <img
                :src="getAssetImgUrl('bot-arrow.png')"
                alt=""
                class="open-icon"
              />
            </view>
            <template v-else>
              <view class="before-tip">更改前</view>
              <view v-for="(el, keys) in val.before" :key="keys">
                <SendRule :val="el" :colorFont="'#999999 !important'" />
              </view>
            </template>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import TopCard from "./topCard.vue";
import AddressCard from "./address-card.vue";
import SendRule from "./send-rule.vue";
import { HistroyTypeEnum } from "@/utils/enum";
export default {
  props: {
    // 顶部标题
    val: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: -1,
    },
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TopCard,
    AddressCard,
    SendRule,
  },
  data() {
    return {
      HistroyTypeEnum,
      showBefore: false,
    };
  },
  methods: {
    // 查看原记录
    clickBefore() {
      console.log("2", 2);
      this.showBefore = true;
      this.$emit("clickBefore");
    },
  },
};
</script>
<style lang="scss" scoped>
.fix-out {
  background: #f5f5f5;

  .list-main {
    margin-left: 14rpx;
    padding-left: 30rpx;
    padding-bottom: 24rpx;
    border-left: 2rpx solid #d0ecff;
    .main-right {
      background-color: #fff;
      border-bottom-left-radius: 24rpx;
      border-bottom-right-radius: 24rpx;
      padding: 24rpx;
    }
  }
  .list-main-end {
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: -2rpx;
      width: 4rpx;
      height: 26rpx;
      background-color: #f5f5f5;
    }
  }
  .border-bottom {
    padding-bottom: 16rpx;
    border-bottom: 2rpx dashed #f1f1f1;
    margin-bottom: 16rpx;
  }
  .check-btn {
    margin-top: 24rpx;
    font-weight: 400;
    font-size: 26rpx;
    color: #999999;
    .open-icon {
      padding-top: 6rpx;
      width: 48rpx;
      height: 48rpx;
      border: none;
    }
  }
  .before-tip {
    margin-top: 24rpx;
    margin-bottom: 16rpx;
    font-size: 28rpx;
    color: #a9a9a9;
    font-weight: bold;
  }
}
</style>