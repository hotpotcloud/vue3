<template>
  <!-- 系统设置 -->
  <view class="content">
    <u-cell-group>
      <u-cell
        :isLink="true"
        class="first-cell"
        @click="change({ title: '关于我们', type: 'aboutUs' })"
      >
        <view slot="title">
          <text>关于我们</text>
        </view>
      </u-cell>
      <u-cell
        :isLink="true"
        @click="change({ title: '协议说明', type: 'protocol' })"
      >
        <view slot="title">
          <text>协议说明</text>
        </view>
      </u-cell>
    </u-cell-group>
    <view class="logout-btn" @click="logout" v-if="showBtn">退出登录</view>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      uerMsg: {},
    };
  },
  computed: {
    showBtn() {
      return !!uni.getStorageSync("userMsg");
    },
  },
  onLoad() {
    this.userMsg = uni.getStorageSync("userMsg");
  },
  onShow() {
    uni.setNavigationBarTitle({
      title: "关于设置",
    });
  },
  methods: {
    ...mapMutations("user", ["set_loginStatus"]),
    ...mapMutations("newhope", ["V_setCalendarList"]),
    ...mapMutations("home", ["V_setAddressList", "set_xiaoyouMoney"]),
    ...mapMutations("member", ["setMemberCode"]),
    change(title = {}) {
      uni.navigateTo({
        url: `/child-pages/user/set-info?name=${title.title}&type=${title.type}`,
      });
    },
    logout() {
      if (this.showBtn) {
        uni.showModal({
          // title: "提示",
          content: "确认退出登录?",
          success: (res) => {
            if (res.confirm) {
              console.log("用户点击确定");
              // this.userMsg = {};

              // uni.clearStorageSync();
              uni.removeStorageSync("userMsg");
              uni.removeStorageSync("malltoken");
              uni.removeStorageSync("openId");
              uni.removeStorageSync("addinfo");
              uni.removeStorageSync("xiaoyouInfo");
              this.set_xiaoyouMoney(null);
              this.V_setCalendarList({});
              this.V_setAddressList({});
              this.set_loginStatus(false); //清空用户数据，登录状态
              // this.loginAfter({}); //vuex
              this.setMemberCode(null); //会员基础数据
              uni.reLaunch({
                url: "/pages/user/user",
              });
            }
          },
        });
      } else {
        uni.showModal({
          // title: "提示",
          content: "您还未登录！",
          success: (res) => {
            if (res.confirm) {
              console.log("用户未登录");
            }
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .u-line {
  border-bottom-style: none !important;
}
::v-deep .u-cell__body {
  padding: 0 !important;
  height: 112rpx;
  line-height: 112rpx;
  border-bottom: 2rpx solid $h-border-smallcolor;
}
.content {
  position: relative;
  .logout-btn {
    width: 670rpx;
    height: 96rpx;
    background: #ffffff;
    border-radius: 254rpx;
    border: 1rpx solid #c7c7c7;
    position: fixed;
    bottom: 96rpx;
    margin: 0 auto;
    text-align: center;
    line-height: 96rpx;
    font-size: 34rpx;
    color: #666666;
  }
}
</style>
