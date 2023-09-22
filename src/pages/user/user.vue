<template>
  <view>
    <hAdv :showAdv="showAdv" @closeAdv="closeAdv" :urldata="advInfoMsg[0]" />

    <view :class="['user-content', user && 'content-logined']">
      <view class="fc09-content" :style="{ paddingTop: wanziH + 'px' }">
        <view class="top-padding-1 top-maring-1">
          <userTop
            :userinfo="userinfo"
            :isLogin="user"
            @clickEdit="clickEdit"
            @toLogin="toLogin"
          />
        </view>
        <view
          class="top-padding-1 user-member-item"
          v-if="loginStatus && BaseApp.isMember"
        >
          <userMember
            :info="memberInfoFc09"
            :show="BaseApp.isMember"
            @toMemberX="toMemberX"
          />
        </view>
        <view
          class=""
          :class="[
            'top-padding-2',
            'user-menu-item-login',
            loginStatus && BaseApp.isMember && 'user-menu-item-logined-member',
            loginStatus && 'user-menu-item-logined',
          ]"
        >
          <view class="top-maring-1">
            <userBalance @clickIcon="clickIcon" />
          </view>
          <view class="user-menu-item">
            <userMenu
              :money="money"
              :loginStatus="loginStatus"
              :calc_PayStatus="calc_PayStatus"
              :hotTel="hotTel"
              @navigateDelivery="navigateDelivery"
              @callHotLine="callHotLine"
              @toAddress="toAddress"
              @toMoney="toMoney"
              @toXiaoyou="toXiaoyou"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from "vue";
import api from "@/utils/api";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { webShowType } from "@/utils/enum";
import hAdv from "../homepage/component/h-adv";
import { BASE_APPID_KEY } from "@/utils/config";
import { URLDistributor } from "@/utils/url";
import { noformatAmount } from "@/utils/utils";
import { conf, BaseApp } from "@/const/appIdConf";
import userTop from "./component/user-top.vue";
import userMenu from "./component/user-menu.vue";
import userMember from "./component/user-member.vue";
import userBalance from "./component/user-balance.vue";
export default Vue.extend({
  components: {
    hAdv,
    userTop,
    userMenu,
    userMember,
    userBalance,
  },
  data() {
    return {
      mainH: 0, //距离顶部高度
      BaseApp,
      conf,
      BASE_APPID_KEY,
      height: 0, //高度
      user: false,
      avatarUrl:
        BASE_APPID_KEY === "XJ"
          ? "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/info/user1.png"
          : "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/no_avatar%402x.png",
      nickName: "",
      days: "",
      memberNo: "", //会员id
      userinfo: {},
      nnu: "",
      advParams: {
        //广搞
        appId: BaseApp.appid,
        soleLogo: uni.getSystemInfoSync().deviceId, //唯一标识
      },
      advInfoMsg: [],
      showAdv: false,
      size: 32,
      money: "0.00", //小优金额
      hotTel: "",
    };
  },
  onReady() {
    this.size = uni.upx2px(64);
  },

  async onShow() {
    try {
      console.log("进入页面");
      await this.$onLaunched;
      this.postAdv();
      const memberId = uni.getStorageSync("userMsg");
      if (!this.loginStatus) return;
      if (memberId.memberNo && memberId.token) {
        this.memberNo = memberId.memberNo;
        await this.getMemberInfo(memberId.memberNo);
        await this.getMemberCode(); //fc09会员信息
        await this.getXiaoyouMoney(); //小优
        BaseApp.payLater && this.get_selectFirstReceipt(); //先饮后付
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  onLoad() {
    //  获取客服电话
    if (!this.loginStatus) return;
    this.getHotNumber();
    this.getOrderPlanList();
  },

  computed: {
    ...mapState("distribution", ["projectList"]),
    ...mapState("user", [
      "loginStatus",
      "userInfo",
      "udesk_info_str",
      "payAfterRes",
    ]),
    ...mapGetters("user", ["calc_PayStatus"]),
    ...mapState("member", ["memberInfoFc09"]),
    ...mapState("orderPlan", [
      "accountOrderList",
      "defaultAccount",
      "accountByMember",
    ]),
    ...mapGetters("orderPlan", ["orderNum"]),
    // 距离胶囊高度
    wanziH() {
      //获取胶囊位置
      const top = uni.getMenuButtonBoundingClientRect();
      this.mainH = top.bottom + 24 + "px";
      return top.bottom + 24;
    },
    // 会员背景图
    memberBg() {
      return () => {
        return {
          backgroundImage: url(
            "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/huiyuan2.png"
          ),
        };
      };
    },
  },

  methods: {
    ...mapActions("user", ["get_selectFirstReceipt"]), //先饮后付
    ...mapMutations("user", ["updatedInfo"]),
    ...mapActions("home", ["X_putAdvExposure"]),
    ...mapActions("distribution", ["A_getProjectList"]),
    ...mapActions("xiaoyou", ["v_getJionNum", "v_postTopInfo"]),
    ...mapMutations("xiaoyou", ["v_setXiaoyouInfo"]),
    ...mapActions("member", ["getMemberCode"]),
    ...mapActions("orderPlan", [
      "getAccountCode",
      "getAccountOrderList",
      "getAccountByMember",
    ]),
    // 订奶账户
    async toAccountOrder() {
      try {
        // await this.getAccountCode(); //获取默认账户
        uni.navigateTo({
          url: "/child-pages/account/index",
        });
      } catch (error) {}
    },
    // 获取订奶订单数-fc10
    async getOrderPlanList() {
      try {
        if (!BaseApp.account) return;
        await this.getAccountByMember();
      } catch (error) {
        //
      }
    },
    // 获取new会员信息
    async getMemberInfo(memberId) {
      try {
        const { data } = await api.$get(
          this.urlapi.user.member + memberId,
          "加载中"
        );
        await this.getHotNumber();
        this.userinfo = data;
        this.updatedInfo(data);
        let upuserMsg = uni.getStorageSync("userMsg");
        upuserMsg.avatarUrl = data.wxAvatarUrl;
        upuserMsg.name = data.name;
        this.user = true;
        uni.setStorageSync("userMsg", upuserMsg);
      } catch (error) {
        uni.showToast({
          title: error.msg,
          icon: "none",
          mask: true,
        });
      }
    },
    // fc09会员中心
    toMemberX() {
      uni.switchTab({
        url: "/pages/member/index",
      });
    },
    toAddress() {
      const status = this.loginStatus;
      if (!status) {
        return uni.navigateTo({ url: "/pages/user/relogin" });
      }
      uni.navigateTo({
        url: "/subPages/address/addressList",
      });
    },
    // 获取小优金额
    async getXiaoyouMoney() {
      try {
        if (!BaseApp.xiaoyou) return;
        const { data } = await api.$getX(URLDistributor.money, {
          appId: this.advParams.appId,
        });
        this.money = data === 0 ? noformatAmount(data) : data;
      } catch (error) {
        //
      }
    },

    // 关闭广告ee
    closeAdv(flag = false) {
      this.showAdv = flag;
    },
    // 请求广告
    async postAdv() {
      const { data } = await api.$post(this.urlapi.home.adv, this.advParams);
      // console.log("data-->111", data);
      if (data.length && data[0].appWebTypeList) {
        const val = data[0].appWebTypeList;
        //是否首页显示
        val.forEach((el) => {
          console.log("el", el);
          if (el === webShowType.PERSONAL_CENTER) {
            this.showAdv = true;
            this.advInfoMsg = data;
            this.X_putAdvExposure(data[0].id);
          }
        });
      }
    },
    // 在线客服
    talkServe() {
      // console.log("消息在线1-1");
    },
    talkServe2() {
      // console.log("2-2消息在线", 2);
    },
    talkServes() {
      // console.log("消息在线3-1");
    },
    // 跳转编辑
    clickEdit() {
      if (this.memberNo) {
        uni.navigateTo({
          url: `/child-pages/user/edit?id=${this.memberNo}`,
        });
      }
    },
    async navigateDelivery() {
      const status = this.loginStatus;
      if (!status) {
        return uni.navigateTo({ url: "/pages/user/relogin" });
      }
      uni.navigateTo({
        url: `/subPages/distribution/programList/programListPage`,
      });
    },
    // 小优跳转
    async toXiaoyou() {
      try {
        console.log("this.loginStatus", this.loginStatus);
        const status = this.loginStatus;
        if (!status) {
          return uni.navigateTo({ url: "/pages/user/relogin" });
        }
        const { data } = await api.$postX(
          `${URLDistributor.check}?appid=${this.advParams.appId}`
        );
        //ACCOUNT_EXIST(4111, "用户已存在"),NOT_REGIST(4201, "用户未注册"),ACCOUNT_STOP(4202, "用户账号已被停用"),
        const enumtype = {
          ACCOUNT_EXIST: "4111",
          NOT_REGIST: "4201",
          ACCOUNT_STOP: "4202",
        };
        if (data === enumtype.ACCOUNT_STOP) {
          return uni.showToast({
            title: "您的小优天天赚功能已停用，如有疑问请联系客服处理",
            icon: "none",
            duration: 2500,
          });
        }
        if (!data || data === enumtype.NOT_REGIST) {
          uni.removeStorage({
            key: "xiaoyouInfo",
          });
          //注册页
          return uni.navigateTo({
            url: "/child-pages/pages/xiaoyou-register/index",
          });
        }
        uni.navigateTo({
          url: "/xiaoyouPages/home/index",
          success: () => {
            this.v_setXiaoyouInfo(data); //保存小优信息
          },
        });
      } catch (error) {
        //
      }
    },
    //白嫖牛奶
    toMoney() {
      const status = this.loginStatus;
      if (!status) {
        return uni.navigateTo({ url: "/pages/user/relogin" });
      }
      uni.navigateTo({
        url: "/subPages/user/wallet",
      });
    },
    // 点击icons
    clickIcon(i) {
      // 1-卷包 2-中心 3-拼团 4-售后
      if (!this.loginStatus) {
        // uni.showToast({ title: "您还没登录哦" });
        return uni.navigateTo({ url: "/pages/user/relogin" });
      } else {
        console.log(i);
        switch (i) {
          case 1:
            uni.navigateTo({ url: "/subPages/coupons/couponList" });
            break;
          case 2:
            uni.navigateTo({ url: "/subPages/coupons/collectCoupons" });
            break;
          case 3:
            uni.navigateTo({ url: "/child-pages/card-wallet/index" });
            break;
          case 4:
            uni.navigateTo({ url: "/subPages/refund/refundManage" });
            break;
        }
      }
    },

    // 用户登陆/注册
    toLogin() {
      uni.navigateTo({ url: "/pages/user/relogin" });
    },
    // 获取客服电话
    async getHotNumber() {
      try {
        const { data } = await api.$get(this.urlapi.about.customerHotline);
        console.log("data-热线", data);
        if (data?.content) {
          this.hotTel = data.content;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    // 拨打客服电话
    async callHotLine() {
      try {
        this.getHotNumber();
        if (this.hotTel) {
          uni.makePhoneCall({
            phoneNumber: this.hotTel,
          });
        }
      } catch (error) {}
    },
  },
});
</script>

<style scoped lang="scss">
.user-content {
  width: 100%;
  height: 100vh;
  background: #f9f9f9;
  box-sizing: border-box;
  // padding: 32rpx;
  padding-top: 0;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E6%9C%AA%E7%99%BB%E5%BD%95-%E6%88%91%E7%9A%842x.png");
  background-repeat: no-repeat;
  background-size: 360rpx 388rpx;
  background-position-x: center;
}
.content-logined {
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/mine_bg%202.png");
  background-repeat: no-repeat;
  background-size: contain;
}
//fc09
.top-padding-1 {
  padding: 0 48rpx;
}
.top-padding-2 {
  padding: 0 32rpx;
}
.top-maring-1 {
  margin-bottom: 24rpx;
}
.user-member-item {
  height: 152rpx;
  overflow: hidden;
}
.user-menu-item-login {
  padding-top: 36rpx;
  min-height: 508rpx;
  width: 100%;
  position: relative;
}

.user-menu-item-logined {
  // border: 1rpx solid #000;
  padding-top: 36rpx;
  min-height: 508rpx;
  width: 100%;
  // background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/huiyuan2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-x: center;
  background-position-y: -152rpx;
  position: relative;
}
.user-menu-item-logined-member {
  @extend .user-menu-item-logined;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/huiyuan2.png");
}
.user-menu-item {
  width: calc(100% - 64rpx);
  position: absolute;
  top: 240rpx;
}

// 会员服务样式
::v-deep .member-info {
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
</style>
