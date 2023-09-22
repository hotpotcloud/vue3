<template>
  <view class="address-item-out" @tap="onClickAddress">
    <view class="flex-1 d-flex-center d-sb">
      <view>
        <!-- 地址 -->
        <view class="d-flex-center">
          <view
            v-if="addressInfo.labelName"
            :class="[
              addressInfo.defaulted === 1
                ? 'h-address-tag'
                : 'h-address-tag-other',
            ]"
            >{{ addressInfo.defaulted === 1 ? "默认" : addressInfo.labelName }}
          </view>
          <view class="flex-1 h-over-1 font-26-6">
            {{ addressInfo.provinceCityArea }}</view
          >
        </view>
        <!-- 地址 -->
        <view class="h-over-1 h-size32 h-margin-10rpx">
          {{ addressInfo.communityDoorCode }}
        </view>
        <!-- 收货人 -->
        <view class="d-flex-center font-26-6">
          <view class="user-name h-margin-rig48">{{
            addressInfo.receiver
          }}</view>
          <view class="flex-1 h-over-1">{{ addressInfo.receiverPhone }}</view>
        </view>
      </view>
      <u-icon name="arrow-right" color="#999999" size="16" />
    </view>
  </view>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    addressInfo: {
      type: Object,
      default: () => {
        return {
          addressNo: "101",
        };
      },
    },
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性-缓存 类似于data概念
  computed: {},
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  onLoad(options) {
    console.log(options);
  },
  // 生命周期 - 页面展示（不可以访问DOM元素）
  onShow() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  onReady() {},
  // 方法集合
  methods: {
    // 点击地址
    onClickAddress() {
      this.$emit("onClickAddress", this.addressInfo);
    },
  },
  // 生命周期 - 监听页面隐藏
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
</style>