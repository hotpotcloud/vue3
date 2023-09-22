<template>
  <view>
    <!-- 履约账户列表 -->
    <view
      :class="['account-card', 'd-flex-center', isSelected && 'active']"
      @tap="clickCard"
    >
      <img
        :src="
          getAssetImgUrl(isSelected ? 'map-icon.png' : 'map-icon-false.png')
        "
        alt=""
        class="icon-map"
      />
      <view>
        <view class="d-flex-center user-info">
          <view class="h-over-1 user-names">{{ info.receiver }}</view>
          <view>{{ info.receiverPhone }}</view>
        </view>
        <view class="user-address">
          <text class="h-overflow-88-2">
            {{ info.addressConcatDoorCode }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      default: null,
      type: Object,
    },
    isSelected: {
      default: false,
      type: Boolean,
    },
  },
  // import引入的组件需要注入到对象中才能使用
  //   components: {},
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性-缓存 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    clickCard() {
      this.$emit("clickCard");
    },
  },
};
</script>
<style scope lang='scss'>
.account-card {
  height: 202rpx;
  border-radius: 40rpx;
  background: #fff;
  padding: 32rpx 24rpx;
}
.icon-map {
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
}
.user-info {
  font-size: 30rpx;
  color: #666666;
  .user-names {
    margin-right: 30rpx;
  }
}
.user-address {
  // height: 88rpx;
  // display: flex;
  // align-items: center;
  margin-top: 16rpx;
  font-size: 30rpx;
  color: #000000;
  font-weight: bold;
}
.active {
  border: 2rpx solid #1d9bdc;
}
</style>