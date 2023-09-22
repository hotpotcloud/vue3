<!-- 选择地址-收货地址 -->
<template>
  <view class="address-card">
    <view
      class="card-main"
      v-for="(i, index) in list"
      :key="i.addressNo"
      @tap.stop="onClickAdd(i)"
    >
      <view class="card-main-item" v-if="index < 2 || expandFlag">
        <image
          class="card-main-radio"
          :src="`https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/${
            i.choose ? 'map-choose-icon' : 'map-unchoose-icon'
          }.png`"
        />
        <view class="card-main-content">
          <view class="main-top d-flex-center">
            <view
              :class="[
                i.defaulted === 1 ? 'h-address-tag' : 'h-address-tag-other',
              ]"
              v-if="i.labelName"
              >{{ i.defaulted === 1 ? "默认" : i.labelName }}</view
            >
            <view class="flex-1 h-over-1">{{ i.provinceCityArea }}</view>
          </view>
          <view class="main-info h-over-1">
            {{ i.communityDoorCode }}
          </view>
          <view class="main-user d-flex-center">
            <view class="user-info">{{ i.receiver }}</view>
            <view>{{ i.receiverPhone }}</view>
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="list.length > 2"
      class="expand-retract"
      @click="changeExpandFlag"
      >{{ expandFlag ? "收起" : "展示更多地址" }}
      <image
        class="expand-retract-img"
        :src="`https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/${
          expandFlag ? 'unmore' : 'more'
        }.png`"
      />
    </view>
  </view>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";
export default Vue.extend({
  name: "AddressCrad",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      expandFlag: false, //true 展开状态  false 收起状态
    };
  },
  methods: {
    ...mapMutations("home", ["V_setAddressChoose"]),
    // 选择地址
    onClickAdd(e) {
      this.$emit("onClickAdd", e); //自定义事件
      // 选中的项-choose改为true,否则为false
      let newAddressList = this.list.map((item) => {
        return { ...item, choose: item.addressNo === e.addressNo };
      });
      this.V_setAddressChoose(newAddressList);
    },
    // 点击展开或者收起
    changeExpandFlag() {
      this.expandFlag = !this.expandFlag;
    },
  },
});
</script>

<style scoped lang="scss">
.address-card {
  width: 100%;
  height: 100%;
  padding: 0 32rpx;
  color: #fff;
  // background: rgb(224, 207, 224);
  border-top: 1rpx solid #f4f4f4;
  .expand-retract {
    height: 80rpx;
    line-height: 80rpx;
    padding-left: 64rpx;
    color: #666666;
    font-family: PingFang SC-Regular, PingFang SC;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    .expand-retract-img {
      width: 48rpx;
      height: 48rpx;
      // border: 1px solid #f00;
      margin-left: 16rpx;
    }
  }
}
.card-main {
  // padding: 24rpx 0 18rpx;
  // border-bottom: 1rpx solid #f4f4f4;
  &:last-child {
    border: none;
  }
  .card-main-item {
    padding: 24rpx 0 18rpx;
    border-bottom: 1rpx solid #f4f4f4;
    display: flex;
    align-items: center;
    .card-main-radio {
      width: 48rpx;
      height: 48rpx;
      // border: 1px solid #f00;
      margin-right: 16rpx;
    }
    .card-main-content {
      flex: 1;
    }
  }

  .main-top {
    color: #666666;
    line-height: 30rpx;
  }
  .main-info {
    margin: 10rpx 0;
    color: #333333;
    font-weight: bold;
    font-size: 32rpx;
  }
  .main-user {
    color: #333333;
    .user-info {
      margin-right: 48rpx;
    }
  }
}
</style>
