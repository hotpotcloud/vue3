<template>
  <view>
    <view class="d-flex card-out">
      <image
        :src="data.imageUrl[0]"
        mode="scaleToFill"
        class="card-out-img"
        @tap="openDetail(data.spuCode)"
      />
      <view class="card-out-text d-flex-colum d-sb">
        <view class="d-flex-colum" @tap="openDetail(data.spuCode)">
          <view
            class="h-overflow-2 font-26-w"
            style="margin-bottom: 16rpx"
            :class="[iosFont ? 'font-ios' : 'font-android']"
          >
            <text v-show="data.kill" class="seckill-tag">秒杀</text>
            {{ data.spuName }}
          </view>
          <view class="d-flex-warp tag-one">
            <view v-if="data.coupon" class="h-ticket">优惠券</view>
            <view v-if="data.fullMinus" class="h-sale-tag">满减</view>
            <view v-if="data.gift" class="h-sale-tag">满赠</view>
          </view>
        </view>
        <view class="d-flex-center d-sb">
          <view :class="[iosFont ? 'font-ios' : 'font-android', 'h-main-color']">
            <text>{{ data.minPrice | formatAmount }}</text>
            <text v-show="data.maxPrice != data.minPrice">~{{ data.maxPrice | formatAmount }}</text>
          </view>
          <u-icon
            name="plus-circle-fill"
            color="#1D9BDC"
            size="24"
            @click="() => openModal(data.spuCode)"
          ></u-icon>
        </view>
      </view>
    </view>
    <h-Modal :isOpen="isOpen" @close="closeMoadal" :shelf="productinfo.status"></h-Modal>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
// import api from '@/utils/api'
export default Vue.extend({
  props: {
    // open: {
    //   //查看详情
    //   type: Function,
    // },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  // computed
  data() {
    return {
      isOpen: false, //控制弹窗
      arr: []
    };
  },
  computed: {
    ...mapState("product", ["productinfo"]),
    ...mapState("css", ["iosFont"])
  },
  methods: {
    ...mapActions("product", [
      "X_modaldetail",
      "X_postStartSendTime",
      "X_sendTimeArr"
    ]),
    // 打开详情
    openDetail(val) {
      // console.log("父组件search", val);
      uni.navigateTo({
        url: `/subPages/product/proDetail?id=${val}`
      });
    },
    //点开弹窗
    openModal(val: any) {
      //spuid
      this.X_modaldetail(val).then(() => {
        this.X_postStartSendTime().then(() => {
          this.X_sendTimeArr();
        });
      });
      // console.log(val, "弹窗");
      this.isOpen = true;
    },
    // 关闭弹窗
    closeMoadal() {
      this.isOpen = false;
    }
  }
});
</script>

<style scoped lang="scss">
.card-out {
  height: 176rpx;
  width: 100%;
  margin-bottom: 40rpx;
  .card-out-img {
    width: 176rpx;
    height: 176rpx;
    overflow: hidden;
    border-radius: 24rpx;
  }
  .card-out-text {
    // flex: 1;
    width: 490rpx;
    overflow: hidden;
    background: #fff;
    margin-left: 24rpx;
    .tag-one {
      // line-height: 32rpx;
      height: 34rpx;
      // overflow: hidden;
    }
  }
}
</style>
