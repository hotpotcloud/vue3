<template>
  <view v-if="spuModal" class="spu-out">
    <view
      @tap.stop="closeSpu"
      :style="{ minHeight: 100 - modalH + '%' }"
    ></view>
    <!-- 内容 -->
    <view class="main" :style="{ minHeight: modalH + '%' }">
      <!-- 标题 -->
      <view class="d-flex-center d-sb">
        <view class="flex-1 top-title">{{ title }}</view>
        <u-icon
          @tap="closeSpu"
          name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/close%E5%85%B3%E9%97%AD.png"
        ></u-icon>
      </view>
      <!-- 内容 -->
      <view class="content-modal">
        <view class="d-flex-warp spu-padding8">
          <view
            v-for="(el, index) in productinfo.skuChannelInfoList"
            :key="index"
            class="el-text h-over-1"
            :class="[productinfo.activeSize === index && 'active-spu']"
            @click="onCurrentSku(el, index)"
          >
            {{ el.skuNickName }}
          </view>
        </view>
        <view class="sku-info" v-if="vuexCombo.length">
          <text class="blod-weight spu-padding8"
            >该组合包含商品({{ vuexCombo.length }})</text
          >
          <!-- <view class="info"> -->
          <scroll-view scroll-y="true" class="scroll-out">
            <view v-for="(item, i) in vuexCombo" :key="i" class="sku-item-info">
              <view class="sku-image">
                <img :src="getAssetImgUrl(item.imageUrl[0])" mode="aspectFit" />
                <view class="sku-num">{{ item.num }}{{ item.specsName }}</view>
              </view>
              <view class="sku-name"> {{ item.skuName }}</view>
            </view>
          </scroll-view>
          <!-- </view> -->
        </view>
      </view>
      <!-- 按钮 -->
      <view class="action">
        <view class="action-btn" @click="closeSpu">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { formatAmount } from "@/utils/utils";
import { skillEnum } from "@/utils/enum";
export default {
  props: {
    // 弹窗显示
    spuModal: {
      default: false,
      type: Boolean,
    },
    // 标题
    title: {
      type: String,
      default: "选择组合商品",
    },
    modalH: {
      type: Number,
      default: 70,
    },
  },
  data() {
    return {
      indicator: false, //指示器
      currentSku: {}, //当前选中规格
    };
  },
  computed: {
    ...mapState("product", ["productinfo"]),
    ...mapGetters("product", ["vuexCombo"]),
  },
  created() {
    console.log("this.productinfo000---新版本", this.productinfo);
  },
  methods: {
    ...mapMutations("product", ["check"]),
    // 确定
    onOk() {
      this.$emit("onOkSpu", this.currentSku);
    },
    //点击规格
    onCurrentSku(item, index) {
      // const
      console.log("val规格点击", item, this.productinfo);
      this.currentSku = {
        currentSkuName: item.skuNickName,
        activeSize: index,
        numlist: item,
        goodscode: item.channelSkuCode,
        priceNow:
          item.killSymbal && item.killDTO.status != skillEnum.FINISH
            ? item.killPrice
            : item.minPrice,
        max: item.saleNums[0],
        activeNum: 0,
        reserve: item.reserve,
        defaultNum: 1,
        maxMoney:
          item.maxPrice && item.maxPrice != item.minPrice
            ? formatAmount(item.maxPrice)
            : "",
        minMoney: formatAmount(item.minPrice),
      };
      this.check({
        ...this.productinfo,
        // activeSize: index,
        // numlist: item,
        ...this.currentSku,
      });
    },
    open() {
      // console.log('open');
    },
    // 关闭
    closeSpu() {
      this.$emit("closeSpu", this.spuModal);
    },
  },
};
</script>

<style scoped lang="scss">
.spu-padding8 {
  margin: 0 8rpx;
}
.spu-out {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
}
.active-spu {
  background: #e4f4ff !important;
  color: #1d9bdc !important;
  border: 1rpx solid #1d9bdc !important;
}
.main {
  position: relative;
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  border-radius: 40rpx 40rpx 0 0;
  // padding: 50rpx 0 96rpx 48rpx;
  padding: 48rpx 32rpx 168rpx;
  .main-1 {
    background: #1d9bdc;
  }
  .top-title {
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
  }
  .content-modal {
    margin-top: 48rpx;

    .el-text {
      // width: 204rpx;
      width: calc((100% - 32rpx) / 3);
      height: 68rpx;
      background: #f4f4f4;
      color: #666;
      line-height: 68rpx;
      text-align: center;
      border-radius: 16rpx;
      margin-bottom: 16rpx;
      margin-right: 15rpx;
      padding: 0 16rpx;
      border: 1rpx solid transparent;
    }

    .el-text:nth-child(3),
    .el-text:nth-child(6),
    .el-text:nth-child(9),
    .el-text:nth-child(12),
    .el-text:nth-child(15),
    .el-text:nth-child(18) {
      margin-right: 0;
    }
    .sku-info {
      .blod-weight {
        font-weight: bold;
        font-size: 24rpx;
        color: #000000;
      }
      margin-top: 16rpx;
      .info {
        margin-top: 16rpx;
        // display: flex;
      }
      .scroll-out {
        margin-top: 16rpx;
        max-height: 584rpx;
      }
      .sku-item-info {
        display: inline-block;
        margin: 0 7rpx 16rpx;

        width: calc((100% - 48rpx) / 3);
        background: #fff;
        border-radius: 16rpx;
        // overflow: hidden;
      }
      .sku-image {
        overflow: hidden;
        width: 100%;
        height: 214rpx;
        border-radius: 16rpx;
        background: #f3f3f3;
        border: 1px solid rgba(0, 0, 0, 0.05);
        position: relative;
        image {
          width: 100%;
          height: 100%;
        }
        .sku-num {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.45);
          border-radius: 0 0 16rpx 16rpx;
          width: 100%;
          height: 34rpx;
          text-align: center;
          color: #fff;
          font-size: 22rpx;
          line-height: 34rpx;
        }
      }
      .sku-name {
        color: #666666;
        white-space: normal !important;
        text-align: center;
        font-size: 20rpx;
        height: 54rpx;
        font-size: 20rpx;
        width: calc(100% - 28rpx);
        margin: 8rpx auto 0;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
      }
    }
  }
  .action {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14rpx 40rpx 82rpx;
    border-top: 1rpx solid #e5e5e5;
    .action-btn {
      color: #fff;
      height: 80rpx;
      background: #1d9bdc;
      border-radius: 254rpx;
      text-align: center;
      padding: 18rpx 0;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}
</style>
