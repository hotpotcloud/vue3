<template>
  <view class="user-menu-out">
    <view class="member-info">
      <!-- <view class="member-title mian-size">会员服务</view> -->
      <button
        style="display: none"
        id="serveBtn"
        open-type="contact"
        hover-class="button-hover"
        @contact="talkServe"
        :session-from="`udesk|${userInfo.name}|${userInfo.avatarUrl}|customer^${udesk_info_str}`"
      >
        登录客服
      </button>
      <button
        style="display: none"
        id="noserveBtn"
        open-type="contact"
        hover-class="button-hover"
        @contact="talkServe2"
      >
        未登录客服
      </button>
      <view class="member-list">
        <uni-list :border="false">
          <uni-list-item
            v-if="BaseApp.account"
            title="订奶账户"
            showArrow
            :show-extra-icon="true"
            :thumb="getAssetImgUrl('account-order.png')"
            thumb-size="sm"
            clickable
            @click="toAccountOrder"
          >
            <template v-slot:footer>
              <view style="padding: 0" class="list-slot-text">{{
                accountNo ? "您有订单待恢复" : ""
              }}</view>
            </template>
          </uni-list-item>
          <uni-list-item
            v-if="BaseApp.xiaoyou"
            title="小优天天赚"
            showArrow
            :show-extra-icon="true"
            thumb="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/fenxiao.png"
            thumb-size="sm"
            clickable
            @click="toXiaoyou"
          >
            <template v-slot:footer>
              <view style="padding: 0" class="list-slot-text"
                >￥{{ money }}</view
              >
            </template>
          </uni-list-item>
          <!-- 先饮后付 -->
          <uni-list-item
            v-if="BaseApp.payLater"
            title="先饮后付"
            showArrow
            :show-extra-icon="true"
            thumb="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/user/drinkbefore.png"
            thumb-size="sm"
            clickable
            @click="toMoney"
          >
            <template v-slot:footer>
              <view style="padding: 0" class="list-slot-text">{{
                calc_PayStatus
              }}</view>
            </template>
          </uni-list-item>

          <uni-list-item
            title="收货地址"
            showArrow
            :show-extra-icon="true"
            thumb="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E6%94%B6%E8%B4%A7%E5%9C%B0%E5%9D%80.png"
            thumb-size="sm"
            link="navigateTo"
            @click="toAddress"
          ></uni-list-item>
          <uni-list-item
            title="配送计划"
            showArrow
            :show-extra-icon="true"
            thumb="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/distributionIcon.png"
            thumb-size="sm"
            clickable
            @click="navigateDelivery"
          ></uni-list-item>
          <uni-list-item
            title="客服热线"
            showArrow
            :show-extra-icon="true"
            thumb="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E5%AE%A2%E6%9C%8D%E7%83%AD%E7%BA%BF.png"
            thumb-size="sm"
            clickable
            @click="callHotLine"
          >
            <template v-slot:footer>
              <view style="padding: 0" class="hot-line-number">{{
                hotTel
              }}</view>
            </template>
          </uni-list-item>
          <label :for="loginStatus ? 'serveBtn' : 'noserveBtn'">
            <uni-list-item
              @click="talkServes"
              title="在线咨询"
              thumb-size="sm"
              :show-extra-icon="true"
              showArrow
              clickable
              thumb="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/3.0-%E5%9C%A8%E7%BA%BF%E5%92%A8%E8%AF%A2%201%402x.png"
            >
            </uni-list-item>
          </label>
          <uni-list-item
            title="系统设置"
            showArrow
            :show-extra-icon="true"
            thumb="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E7%B3%BB%E7%BB%9F%E8%AE%BE%E7%BD%AE.png"
            thumb-size="sm"
            link="navigateTo"
            to="/child-pages/user/setting"
          ></uni-list-item>
        </uni-list>
      </view>
    </view>
  </view>
</template>

<script>
import { BaseApp } from "@/const/appIdConf";
export default {
  components: {},
  props: {
    //小优金额
    money: {
      type: String,
      default: "0.00",
    },
    //登录状态
    loginStatus: {
      type: Boolean,
      default: false,
    },
    //先饮后付
    calc_PayStatus: {
      type: String,
      default: "",
    },
    // 客服热线
    hotTel: {
      type: String,
      default: "",
    },
    accountNo: {
      //待恢复订单笔数
      type: String,
      default: "",
    },
  },
  data() {
    return {
      BaseApp,
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    //订奶账户
    toAccountOrder() {
      this.$emit("toAccountOrder");
    },
    // 在线客服
    talkServe() {
      console.log("消息在线1-1");
    },
    talkServe2() {
      console.log("2-2消息在线", 2);
    },
    talkServes() {
      console.log("消息在线3-1");
    },
    // 小优
    toXiaoyou() {
      this.$emit("toXiaoyou");
    },
    // 先饮后付
    toMoney() {
      this.$emit("toMoney");
    },
    // 配送计划
    navigateDelivery() {
      this.$emit("navigateDelivery");
    },
    // 收货地址
    toAddress() {
      this.$emit("toAddress");
    },
    // 客服热线
    callHotLine() {
      this.$emit("callHotLine");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
// 会员服务
.member-info {
  background: #fff;
  border-radius: 40rpx;
  padding: 0rpx 32rpx 24rpx;
  .member-title {
    margin-bottom: 16rpx;
  }
  .server-button {
    background: transparent;
    border: none;
    font-size: 26rpx;
    margin: 0;
    padding: 0;
    display: inline;
    line-height: initial;
    width: 100%;
    height: 100%;
    outline: none;
    text-align: left;
    &::after {
      border: none;
    }
  }
}
// 会员服务样式
::v-deep .member-info > .member-list {
  .uni-list-item {
    padding: 32rpx 0;
    .uni-list-item__container {
      padding: 0;
      .uni-list--sm {
        height: 48rpx;
        width: 48rpx;
      }
      .uni-list-item__content-title {
        font-size: 26rpx;
        color: #000;
      }
    }
    .uni-icon-wrapper {
      padding: 0 18rpx;
      .uni-icons {
        font-size: 24rpx !important;
        color: #999 !important;
      }
    }
  }
}
.list-slot-text {
  color: #f86c4d;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
}
.hot-line-number {
  @extend .list-slot-text;
  color: #a9a9a9;
}
</style>