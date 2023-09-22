<template>
  <!-- <view class="goods-card">
    <view class="goods-img-wrap">
      <image class="goods-img" :src="getAssetImgUrl(item.imageUrl)" />
      <text class="tag">奶卡</text>
    </view>
    <view class="goods-info">
      <view class="goods-name">{{ item.skuChannelName }}</view>
      <view class="goods-desc">
        <text>{{ item.specification }}</text>
        <text>x{{ item.qty }}份</text>
      </view>
      <view class="goods-rule">
        <text class="label">配送规律：</text>
        <text class="value">{{ getRuleText() }}</text>
      </view>
      <view class="goods-time">
        <text class="label">配送周期：</text>
        <text class="value">{{ data.startDate }}-{{ data.endDate }}</text>
      </view>
    </view>
  </view> -->
  <view>
    <view v-for="(el, index) in item" :key="index">
      <!-- 普通商品 -->
      <view
        class="goods-detail-el"
        :class="index === item.length - 1 && 'noborder'"
      >
        <template v-if="el.comb === combGoods.SPU_PRODUCT">
          <h-GoodsMsg
            :present="el.present"
            :img="el.imageUrl"
            :name="el.skuChannelName"
            :isShowPrice="false"
            :desc="el.specification"
            :num="el.qty"
            :rule="{
              name: el.ruleName,
              deliveryTime: el.deliveryTimeSectionName,
              everyNum: el.everyNum + '份',
            }"
            :startTime="el.startDate.replaceAll('-', '/')"
            :endTime="el.endDate.replaceAll('-', '/')"
          />
        </template>

        <!-- 组合 -->
        <template v-if="el.comb === combGoods.ITEM_PRODUCT">
          <template v-if="el.present">
            <h-GoodsMsg
              :present="el.present"
              :img="el.imageUrl"
              :name="el.skuChannelName"
              :isShowPrice="false"
              :desc="el.specification"
              :num="el.qty"
              :rule="{
                name: el.ruleName,
                deliveryTime: el.deliveryTimeSectionName,
                everyNum: el.everyNum + '份',
              }"
              :startTime="el.startDate.replaceAll('-', '/')"
              :endTime="el.endDate.replaceAll('-', '/')"
            />
          </template>
          <template v-else>
            <h-GoodsMsg
              :img="el.imageUrl"
              :name="el.skuChannelName"
              :isShowPrice="false"
              :desc="el.specification"
              :num="0"
            />
          </template>
          <view class="comb-text" v-if="el.combGoodsInfos.length">
            该组合包含以下商品
          </view>
          <template>
            <view
              v-for="(items, idx) in el.combGoodsInfos"
              :key="idx"
              class="comb-goods-detail"
            >
              <h-GoodsMsg
                :img="items.imageUrl[0]"
                :name="items.name"
                :isShowPrice="false"
                :num="items.totalQty"
                :rule="{
                  name: items.ruleName,
                  deliveryTime: items.deliveryTimeSectionName,
                  everyNum: items.everyNum + items.unitName,
                }"
                :startTime="items.deliveryStartDate"
                :endTime="items.deliveryEndDate"
              />
            </view>
          </template>
        </template>
      </view>
    </view>
  </view>
</template>
<script>
import {
  TimeSectionName,
  timeSectionEnum,
  RuleEnum,
  RuleTextEnum,
  combGoods,
} from "@/utils/enum";
export default {
  data() {
    return {
      combGoods,
      timeSectionEnum,
      TimeSectionName,
      RuleEnum,
      RuleTextEnum,
    };
  },
  props: {
    item: {
      type: Array,
      default: [],
    },
    data: {
      type: Object,
      default: {},
    },
  },
  methods: {
    getRuleText() {
      const timeSectionText =
        this.data.timeSection === timeSectionEnum.FORENOON
          ? TimeSectionName.FORENOON
          : TimeSectionName.AFTERNOON;
      // 天天送｜上午送｜每次送1瓶

      return `${
        this.data.rule ? this.RuleTextEnum[this.data.rule] : "暂无"
      }|${timeSectionText}|每次送${this.data.everyNum}瓶`;
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-detail-el {
  border-bottom: 2rpx dashed #f1f1f1;
  margin-bottom: 16rpx;
}
.noborder {
  border: none;
}
.comb-text {
  font-size: 24rpx;
  color: #db9918;
  padding: 16rpx 0;
}
.comb-goods-detail {
  margin-top: 16rpx;
}
// .goods-card {
//   display: flex;
//   align-items: top;
//   width: 100%;
//   height: auto;
//   background: #fff;
// }
// .goods-img-wrap {
//   position: relative;
//   width: 136rpx;
//   height: 136rpx;
//   border-radius: 24rpx;
//   overflow: hidden;
//   .goods-img {
//     width: 100%;
//     height: 100%;
//   }
//   .tag {
//     position: absolute;
//     width: 60rpx;
//     height: 30rpx;
//     background: #f86c4d;
//     border-radius: 16rpx 0rpx 16rpx 0rpx;
//     font-family: PingFang SC-Medium, PingFang SC;
//     font-size: 24rpx;
//     padding: 0 0 6rpx 16rpx;
//     color: #fff;
//     left: 0;
//     top: 0;
//   }
// }
// .goods-info {
//   margin-left: 16rpx;
//   .goods-name {
//     width: 486rpx;
//     height: 40rpx;
//     font-size: 28rpx;
//     font-family: PingFang SC-Regular, PingFang SC;
//     font-weight: 400;
//     color: #000;
//     line-height: 33rpx;
//     margin-top: 16rpx;
//   }
//   .goods-desc {
//     display: flex;
//     justify-content: space-between;
//     font-size: 26rpx;
//     font-family: PingFang SC-Regular, PingFang SC;
//     font-weight: 400;
//     color: #999999;
//     line-height: 30rpx;
//     margin-top: 16rpx;
//   }
// }
// .goods-rule,
// .goods-time {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 16rpx;
//   .label {
//     font-size: 26rpx;
//     font-family: PingFang SC-Regular, PingFang SC;
//     font-weight: 400;
//     color: #999;
//     line-height: 30rpx;
//   }
//   .value {
//     font-size: 26rpx;
//     font-family: PingFang SC-Regular, PingFang SC;
//     font-weight: 400;
//     color: #666;
//     line-height: 30rpx;
//   }
// }
// .goods-count {
//   width: 502rpx;
//   height: 64rpx;
//   background: #f5f5f5;
//   border-radius: 8rpx;
//   font-size: 24rpx;
//   font-family: PingFang SC-Regular, PingFang SC;
//   font-weight: 400;
//   color: #666;
//   line-height: 64rpx;
//   margin-top: 16rpx;
//   display: flex;
//   justify-content: space-between;
//   padding: 0 16rpx;
// }
</style>
