<template>
  <view class="page">
    <block v-for="item in itemList" :key="item.label">
      <view
        :class="{' user-item': true, divider: index != itemList.length - 1}"
        @click="handleLink"
        :data-type="item.type"
        :data-path="item.path"
        v-if="item.show"
      >
        <view class="user-item-label">{{ item.label }}</view>
        <image
          class="user-item-arrow"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/miniprogram-go-user_gray_arrow.png"
        />
      </view> </block
  ></view>
</template>
<script>
import Vue from "vue";
import {Withdraw} from "@/utils/url";
import Api from "@/utils/api";
import {mapState} from "vuex";
export default Vue.extend({
  data() {
    return {
      itemList: [
        {
          label: "自由职业者用户协议",
          type: 2,
          path: "/xiaoyouPages/setting/agreement",
          show: true,
        },
        {
          label: "修改实名认证信息",
          type: "edit",
          path: "/xiaoyouPages/withdraw/Auth",
          show: false,
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("xiaoyou", ["xiaoyouInfo"]),
  },
  mounted() {
    this.getWithdrawMethod();
  },
  methods: {
    handleLink: function (e) {
      let {path, type} = e.currentTarget.dataset;
      uni.navigateTo({
        url: path + "?type=" + type,
      });
    },
    async getAuth(code) {
      const {data} = await Api.$getX(Withdraw.distributorAuth, {
        certificationType: code,
        disId: this.xiaoyouInfo?.id,
        appId: this.userInfo.appId,
      });
      if (data) {
        this.$set(this.itemList[1], "show", true);
      }
    },
    async getWithdrawMethod() {
      const {data} = await Api.$getX(Withdraw.withdrawPayAway, {
        appId: this.userInfo.appId,
      });
      const defaultType = data?.defaultType;
      if (defaultType && defaultType?.code !== null) {
        this.getAuth(defaultType?.code);
      }
    },
  },
});
</script>
<style scoped lang="scss">
.user-wrap {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding-top: 24rpx;
  overflow: hidden;
}

.divider {
  border-bottom: 1rpx solid #f8f8ff;
}

.user-item {
  width: 100%;
  line-height: 98rpx;
  padding-left: 25rpx;
  padding-right: 25rpx;
  background: #ffffff;
  font-size: 0;
  position: relative;
}

.user-item-label,
.user-item-icon,
.user-item-arrow {
  display: inline-block;
  vertical-align: middle;
}

.user-item-label {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 28rpx;
  padding-left: 20rpx;
  color: #555555;
}

.user-item-arrow {
  float: right;
}

.user-item-icon {
  width: 36rpx;
  height: 36rpx;
}

.user-item-arrow {
  width: 20rpx;
  height: 20rpx;
  margin-top: 36rpx;
}
</style>
