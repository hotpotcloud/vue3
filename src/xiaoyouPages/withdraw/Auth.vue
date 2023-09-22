<template>
  <view class="page">
    <view class="upload-idCard-wrap">
      <view class="idCard-warn">
        <view class="idCard-label">姓名</view>
        <view class="idCard-warn-text" v-if="!validateResult.realName"
          >请输入正确姓名</view
        >
      </view>
      <input
        placeholder="请输入"
        class="idCard-input"
        @input="inputChange"
        @blur="checkSubmit"
        data-name="realName"
        maxlength="18"
        :value="inputValue.realName"
      />
      <view class="idCard-warn">
        <view class="idCard-label">身份证</view>
        <view class="idCard-warn-text" v-if="!validateResult.identityNumber"
          >请输入正确身份证号</view
        >
      </view>
      <input
        type="idcard"
        placeholder="请输入"
        class="idCard-input"
        @input="inputChange"
        @blur="checkSubmit"
        data-name="identityNumber"
        maxlength="18"
        :value="inputValue.identityNumber"
      />
      <view class="idCard-warn">
        <view class="idCard-label">手机号</view>
        <view class="idCard-warn-text" v-if="!validateResult.phone"
          >请输入正确手机号</view
        >
      </view>
      <input
        type="number"
        placeholder="请输入"
        class="idCard-input"
        @input="inputChange"
        @blur="checkSubmit"
        data-name="phone"
        maxlength="19"
        :value="inputValue.phone"
      />
      <view v-if="isNeedCard">
        <view class="idCard-warn">
          <view class="idCard-label">银行卡号</view>
          <view class="idCard-warn-text" v-if="!validateResult.bankCardNum"
            >请输入正确银行卡号</view
          >
        </view>
        <input
          type="number"
          placeholder="请输入"
          class="idCard-input"
          @input="inputChange"
          @blur="checkSubmit"
          data-name="bankCardNum"
          maxlength="19"
          :value="inputValue.bankCardNum"
        />
      </view>
    </view>
    <view class="footer-tips"
      >请输入与此微信实名认证一致的身份证号及银行卡号，否则将无法正常获得佣金</view
    >
    <view :class="{'submit-btn': true, isPhoneX: isPhoneX}">
      <button
        :class="[canSubmit ? 'submit-btn-active' : 'submit-btn-default']"
        @click="handleSubmit"
      >
        提交认证
      </button>
    </view>
    <view v-if="showWarn">
      <view class="coupon-box">
        <view class="center-box">
          <view class="warn-wrap">
            <view class="warn-titel">
              <view class="warn-icon">!</view>
              <view class="warn-test">提示</view>
            </view>
            <view class="warn-content">{{ errText }}</view>
          </view>
          <!-- 关闭按钮 -->
          <view class="coupon-cancel" @click="closeWarn"></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Vue from "vue";
import {PayMethodEnum} from "@/utils/enum";
import {isPhoneX} from "@/utils/utils";
import {Withdraw} from "@/utils/url";
import {mapState} from "vuex";
import Api from "@/utils/api";

export default Vue.extend({
  data() {
    return {
      isShowInfo: false,
      isPhoneX: isPhoneX(),
      errList: [],
      payMethod: 0,
      validateConf: {
        identityNumber: (value) => {
          return value.length === 18;
        },
        bankCardNum: (value) => {
          return value.length === 19;
        },
        phone: (value) => {
          let reg = /^1[3|4|5|6|7|8｜9][0-9]{9}$/;
          return reg.test(value);
        },
        realName: (value) => {
          return value.length > 0;
        },
      },
      validateResult: {
        identityNumber: true,
        bankCardNum: true,
        phone: true,
        realName: true,
      },
      inputValue: {
        identityNumber: "",
        bankCardNum: "",
        phone: "",
        realName: "",
      },
      canSubmit: false,
      showWarn: false,
      errText: "",
      isNeedCard: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapState("user", ["loginStatus", "userInfo"]),
    ...mapState("xiaoyou", ["xiaoyouInfo"]),
  },
  onLoad(option) {
    this.isEdit = option.type === "edit";
  },
  mounted() {
    if (this.isEdit) {
      this.getDetail();
    }
    this.getWithdrawMethod();
  },
  methods: {
    async getDetail() {
      const {data} = await Api.$getX(
        `${Withdraw.getInfo}/${this.userInfo.appId}`
      );
      this.inputValue = {
        identityNumber: data?.identityNumber,
        bankCardNum: data?.bankCardNum,
        phone: data?.phone,
        realName: data?.realName,
      };
      this.checkSubmit();
    },
    async getWithdrawMethod() {
      const {data} = await Api.$getX(Withdraw.withdrawPayAway, {
        appId: this.userInfo.appId,
      });
      const supportType = data?.supportType;
      const isCard = supportType.findIndex(
        (item) => item.code === PayMethodEnum.card
      );

      this.isNeedCard = isCard >= 0;
    },
    inputChange(e) {
      this.changeInput(e);
    },
    closeWarn() {
      this.showWarn = false;
    },
    changeInput(e) {
      const name = e.currentTarget.dataset.name;
      console.log(e, "e");
      const flag = this.validateConf[name](e.detail.value);
      this.inputValue[name] = e.detail.value;
      console.log(flag);
      this.inputValue = this.inputValue;
      if (flag) {
        const arr = this.errList.filter((item) => item !== name);
        this.validateResult[name] = flag;
        this.errList = arr;
        this.validateResult = this.validateResult;
      } else {
        this.validateResult[name] = flag;
        if (this.errList.indexOf(name) < 0) {
          this.errList.push(name);
        }
        this.errList = this.errList;
        this.validateResult = this.validateResult;
      }
    },
    checkSubmit() {
      if (!this.isNeedCard) {
        const flag =
          this.validateConf.identityNumber(this.inputValue.identityNumber) &&
          this.validateConf.realName(this.inputValue.realName) &&
          this.validateConf.phone(this.inputValue.phone);
        this.canSubmit = flag;
      } else {
        let flag = true;
        Object.keys(this.inputValue).forEach((item) => {
          if (!this.validateConf[item](this.inputValue[item])) {
            flag = false;
          }
        });
        this.canSubmit = flag;
      }
    },
    // 提交认证
    async handleSubmit() {
      if (!this.canSubmit) return;
      let info = this.inputValue;
      const res = await Api.$postX(Withdraw.updateInfo, {
        certificationType: this.isNeedCard
          ? PayMethodEnum.card
          : PayMethodEnum.weixin,
        appId: this.userInfo.appId,
        bankCardNum: info.bankCardNum || undefined,
        phone: info.phone,
        realName: info.realName,
        identityNumber: info.identityNumber,
        id: this.xiaoyouInfo?.id,
      });
      if (res.success) {
        uni.navigateBack();
        console.log(res, "res");
      }
    },
  },
});
</script>
<style scoped lang="scss">
.page {
  background: #f6f6f6;
  height: 90vh;
}
.upload-idCard-wrap,
.upload-idCard-form {
  width: 100%;
  background: #ffffff;
  border-radius: 16rpx;
  margin-top: 32rpx;
  padding: 32rpx;
}
.upload-idCard-wrap {
  margin-top: 24rpx;
  > input {
    padding-left: 24rpx;
  }
}
.upload-idCard-form {
  height: 440rpx;
}

.upload-idCard-title {
  display: block;
  font-family: PingFang SC;
  font-size: 32rpx;
  font-style: normal;
  font-weight: 500;
  line-height: 45rpx;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}

.flex-wrap {
  width: 100%;
  height: 255rpx;
  justify-content: space-between;
  margin-top: 36rpx;
}

.flex-item {
  position: relative;
  display: inline-block;
  width: 300rpx;
  height: 255rpx;
}

.flex-item-right {
  margin-left: 86rpx;
}

.idCard-bg {
  position: absolute;
  width: 300rpx;
  height: 194rpx;
}

.idCard-front,
.idCard-back,
.upload-status {
  position: absolute;
  width: 276rpx;
  height: 170rpx;
  border-radius: 16rpx;
  top: 12rpx;
  left: 12rpx;
}

.idCard-front,
.idCard-back {
  z-index: 1;
}

.upload-status {
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
}

.upload-mask {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.upload-icon {
  width: 32rpx;
  height: 32rpx;
}

.upload-text {
  display: block;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.8;
}

.upload-notice,
.upload-notice-color,
.upload-fail-color,
.upload-success-color {
  font-family: PingFang SC;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 34rpx;
  text-align: center;
}

.upload-notice {
  color: #000;
}

.upload-notice-color {
  color: rgba(90, 198, 155, 1);
  padding-left: 12rpx;
}

.upload-fail-color {
  color: rgba(237, 67, 58, 1);
}

.upload-success-color {
  color: rgba(90, 198, 155, 1);
}

.upload-notice-wrap {
  position: absolute;
  width: 300rpx;
  height: 40rpx;
  bottom: 0;
  text-align: center;
}

.submit-btn {
  width: 100%;
  min-height: 108rpx;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  background: #fff;
}

.submit-btn-default,
.submit-btn-active {
  width: 686rpx;
  height: 80rpx;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 30rpx;
  color: #fff;
  margin: 14rpx auto;
}

.submit-btn-default {
  background: linear-gradient(90.78deg, #86e1ab 0%, #5ac69b 100%);
  opacity: 0.3;
}

.submit-btn-active {
  background: linear-gradient(90.78deg, #86e1ab 0%, #5ac69b 100%);
}

.info-desc {
  display: block;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  line-height: 34rpx;
  font-family: PingFang SC;
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 23rpx;
}

.form-item {
  display: flex;
  padding: 30rpx 0;
}

.item-label {
  flex: 110rpx;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 28rpx;
  line-height: 48rpx;
  color: #999999;
}

.item-input {
  flex: 8;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 28rpx;
  line-height: 39rpx;
  color: #333333;
}

.line {
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}

.notice {
  display: block;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 24rpx;
  line-height: 36rpx;
  color: #ed433a;
  padding-left: 32rpx;
  padding-top: 24rpx;
}

.isPhoneX {
  padding-bottom: 60rpx;
  background: #fff;
}
.upload-warn-wrap {
  width: 100%;
  line-height: 34rpx;
  color: #ed433a;
  font-size: 24rpx;
  padding: 32rpx 32rpx 0 32rpx;
}
.idCard-warn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.idCard-label {
  font-size: 32rpx;
  font-weight: 600;
}
.idCard-warn-text {
  font-size: 24rpx;
  color: #d05850;
}
.idCard-input {
  background-color: #f6f7f8;
  height: 80rpx;
  border-radius: 8rpx;
  margin-top: 32rpx;
  margin-bottom: 48rpx;
  padding-left: 24rpx;
}
.footer-tips {
  padding: 0 32rpx;
  color: #777777;
  font-size: 24rpx;
  margin-top: 32rpx;
  line-height: 28rpx;
}

.idcard-picker {
  border: 1px solid #999999;
  border-radius: 8rpx;
  font-size: 28rpx;
  padding: 20rpx 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.idcard-bottom {
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-top: 16rpx solid #999999;
}
.warn-wrap {
  width: 494rpx;
  border-radius: 12rpx;
  padding: 60rpx 52rpx 80rpx 52rpx;
  position: relative;
  background: white;
}
.warn-titel {
  display: flex;
  align-items: center;
  justify-content: center;
}
.warn-icon {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d05850;
  color: white;
  border-radius: 50%;
  font-size: 24rpx;
}
.warn-test {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-left: 16rpx;
}
.warn-content {
  font-size: 24rpx;
  margin-top: 48rpx;
  line-height: 28rpx;
}
.warn-close-icon {
  width: 80rpx;
  height: 80rpx;
  background: red;
  position: absolute;
  bottom: -80rpx;
  z-index: 99999;
}
.coupon-box {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.center-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.coupon-bg image {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
}
.coupon-bg view {
  font-size: 10px;
  text-align: center;
  line-height: 14px;
  color: #ffffff;
  opacity: 0.6;
  position: absolute;
  bottom: 20px;
  padding-left: 7px;
  text-align: center;
  z-index: 10;
}
.coupon-cancel {
  width: 7.8vw;
  height: 7.6vw;
  margin: 28px;
  background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/xiaoyou/miniprogram-go-icon-closed.png")
    no-repeat center;
  background-size: 100% 100%;
}
</style>
