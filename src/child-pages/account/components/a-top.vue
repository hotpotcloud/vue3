<template>
  <view class="account-top-out">
    <!-- 头像 -->
    <view class="account-top">
      <view class="user-top">
        <view class="d-flex-center user-info-top">
          <image
            :src="
              getAssetImgUrl(
                user.avatarUrl ? user.avatarUrl : BaseApp.avatarUrl
              )
            "
            mode="widthFix"
            class="info-img-top"
          />
          <view class="info-name">{{ user.name }}</view>
        </view>
        <view class="top-empty"></view>
      </view>
      <view class="account-main">
        <view class="d-flex-center d-flex-se main-detail">
          <!-- 待配已配 -->
          <view class="main-item" v-for="i in list" :key="i.id">
            <view class="item-val">{{ sendNum(i.type) }}</view>
            <view class="item-label">{{ i.label }}</view>
          </view>
        </view>
        <view class="main-address">
          <top-address
            @onClick="onClick"
            :address="addressInfo.adressDetail"
            :name="addressInfo.receiver"
            :tel="addressInfo.receiverPhone"
          >
            <view slot="icon-right">
              <u-icon name="arrow-right" :size="15" color="#999999" />
            </view>
          </top-address>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import topAddress from "./top-address.vue";
import { BaseApp } from "@/const/appIdConf";
export default {
  components: {
    topAddress,
  },
  props: {
    user: {
      //用户信息
      type: Object,
      default() {
        return {};
      },
    },
    sendQty: {
      //待配已配停送
      type: Object,
      default: () => {},
    },
    addressInfo: {
      // 地址
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      BaseApp,
      list: [
        {
          label: "待配送",
          id: 0,
          type: "forQty",
        },
        {
          label: "已配送",
          id: 1,
          type: "deliveredQty",
        },
        {
          label: "已停送",
          id: 2,
          type: "stopDeliveredQty",
        },
      ],
    };
  },
  computed: {
    sendNum() {
      return (type) => {
        const obj = uni.$u.deepClone(this.sendQty);
        return obj[type] ? obj[type] : 0;
      };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    onClick() {
      console.log("点击地址", 1);
      this.$emit("onClickAddress");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.account-top-out {
  border-radius: 24rpx;
  background: #fff;
  border: 2rpx solid #fff;
}
.account-top {
  .user-top {
    height: 120rpx;
    background: #f0f;
    border-top-right-radius: 24rpx;
    border-top-left-radius: 24rpx;

    background: linear-gradient(-180deg, #f0faff 0%, #96d7f9 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-empty {
      height: 22rpx;
      background: #fff;
      border-top-right-radius: 24rpx;
      border-top-left-radius: 24rpx;
    }
    .user-info-top {
      padding: 22rpx 32rpx;
      .info-img-top {
        width: 52rpx;
        height: 52rpx;
        border-radius: 50%;
        border: 2rpx solid #fff;
      }
      .info-name {
        font-size: 28rpx;
        color: #333333;
        font-weight: bold;
        margin-left: 8rpx;
      }
    }
  }

  .account-main {
    padding: 10rpx 32rpx 32rpx;
    .main-detail {
      border-bottom: 1rpx solid #f1f1f1;
      padding-bottom: 26rpx;
      .main-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .item-val {
        color: #333333;
        font-size: 44rpx;
        font-weight: bold;
      }
      .item-label {
        font-size: 24rpx;
        color: #999999;
        margin-top: 8rpx;
      }
    }

    .main-address {
      padding: 32rpx 16rpx 8rpx;
    }
  }
}
</style>