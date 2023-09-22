<template>
  <view>
    <hAdv :showAdv="showAdv" @closeAdv="closeAdv" :urldata="advInfoMsg[0]" />

    <view class="content">
      <view style="height: 32rpx"></view>

      <view class="login-bg">
        <view class="bg-one">
          <img
            v-if="!user"
            class="user-bg-login"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E6%9C%AA%E7%99%BB%E5%BD%95-%E6%88%91%E7%9A%842x.png"
          />
          <img
            v-else
            class="user-bg-login"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/msc-miniprogram/login/logined.png"
          />
        </view>
        <!-- 用户信息 -->
        <view class="user-info-top">
          <view class="info">
            <view class="info-top d-flex-row d-flex-center">
              <!-- left -->
              <view class="info-left d-flex-row d-flex-center">
                <view class="info-imgs">
                  <img
                    v-if="user"
                    :src="
                      userinfo.wxAvatarUrl ? userinfo.wxAvatarUrl : avatarUrl
                    "
                  />
                  <img v-else :src="conf[BASE_APPID_KEY].nullUser" />
                </view>
                <view class="info-msg">
                  <view v-if="user">
                    <view class="info-name h-font-30">
                      {{ userinfo.name ? userinfo.name : nickName }}
                    </view>
                    <view class="sub-color h-subfont">
                      已坚持饮奶{{ days ? days : "N" }}天
                    </view>
                  </view>
                  <view v-else>
                    <view class="info-name h-font-30">Hi~新鲜的一代！</view>
                    <view class="sub-color h-subfont">登录享受更多服务</view>
                  </view>
                </view>
              </view>

              <!-- right -->
              <view class="info-right">
                <view v-if="!user">
                  <button
                    :loading="false"
                    hover-class="button-hover"
                    @tap="toLogin"
                    class="info-btn"
                  >
                    注册/登录
                  </button>
                </view>
                <u-icon
                  @tap="clickEdit"
                  v-else
                  :size="size"
                  name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E7%BC%96%E8%BE%91%402x.png"
                />
              </view>
            </view>
          </view>
        </view>

        <view class="icon-out">
          <view class="icons">
            <view class="icons-child d-flex-row d-flex-center">
              <view
                class="d-flex-colum-center"
                @tap="clickIcon(3)"
                v-if="BaseApp.isMilkCard"
              >
                <u-icon
                  size="60rpx"
                  :name="getAssetImgUrl('mymilkcard-icon.png')"
                ></u-icon>
                <text>我的卡包</text>
              </view>

              <view class="d-flex-colum-center" @tap="clickIcon(1)">
                <u-icon
                  size="60rpx"
                  name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E4%BC%98%E6%83%A0%E5%88%B8%E5%8C%85.png"
                ></u-icon>
                <text>我的券包</text>
              </view>

              <view class="d-flex-colum-center" @tap="clickIcon(2)">
                <u-icon
                  size="60rpx"
                  name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E9%A2%86%E5%8D%B7%E4%B8%AD%E5%BF%83.png"
                ></u-icon>
                <text>领券中心</text>
              </view>
              <view class="d-flex-colum-center" @tap="clickIcon(4)">
                <u-icon
                  size="60rpx"
                  name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/%E5%94%AE%E5%90%8E%20%282%29%402x.png"
                ></u-icon>
                <text>退款/售后</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 会员服务 -->
      <view class="member-info">
        <view class="member-title mian-size">会员服务</view>
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
              v-if="conf[BASE_APPID_KEY].xiaoyou"
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
              to="/pages/user/component/Setting"
            ></uni-list-item>
          </uni-list>
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
export default Vue.extend({
  components: {
    hAdv,
  },
  data() {
    return {
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
        appId: uni.getAccountInfoSync().miniProgram.appId,
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
    console.log("进入页面");
    await this.$onLaunched;
    this.postAdv();
    const memberId = uni.getStorageSync("userMsg");
    if (memberId.memberNo) {
      this.memberNo = memberId.memberNo;
      await this.getMemberInfo(memberId.memberNo);
      await this.getXiaoyouMoney(); //小优
      BaseApp.payLater && this.get_selectFirstReceipt(); //先饮后付
    }
  },
  onLoad() {
    const top = uni.getMenuButtonBoundingClientRect(); //高度获取
    this.height = top.top;
    // uni.getSystemInfo({
    //   success: (res) => {
    //     // console.log("res抓鬼", res);
    //   },
    // });
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
  },

  methods: {
    ...mapActions("user", ["get_selectFirstReceipt"]), //先饮后付
    ...mapMutations("user", ["updatedInfo"]),
    ...mapActions("home", ["X_putAdvExposure"]),
    ...mapActions("distribution", ["A_getProjectList"]),
    ...mapActions("xiaoyou", ["v_getJionNum", "v_postTopInfo"]),
    ...mapMutations("xiaoyou", ["v_setXiaoyouInfo"]),
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
      // api
      //   .$get(this.urlapi.user.member + memberId, "加载中")
      //   .then((res) => {
      //     this.userinfo = res.data;
      //     this.updatedInfo(res.data);
      //     let upuserMsg = uni.getStorageSync("userMsg");
      //     upuserMsg.avatarUrl = res.data.wxAvatarUrl;
      //     upuserMsg.name = res.data.name;
      //     uni.setStorageSync("userMsg", upuserMsg);
      //     this.user = true;
      //   })
      //   .catch((err) => {
      //     uni.showToast({
      //       title: err.message,
      //       icon: "none",
      //       mask: true,
      //     });
      //   });
    },
    toAddress() {
      const status = this.loginStatus;
      console.log("status", status);
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
        if (!conf[BASE_APPID_KEY].xiaoyou) return;
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
      console.log("消息在线1-1");
    },
    talkServe2() {
      console.log("2-2消息在线", 2);
    },
    talkServes() {
      console.log("消息在线3-1");
    },
    // 跳转编辑
    clickEdit() {
      if (this.memberNo) {
        uni.navigateTo({
          url: `/pages/user/component/Edit?id=${this.memberNo}`,
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
    //花呗牛奶
    toMoney() {
      console.log("当前环境->process.env", process.env);
      // if (process.env.VUE_APP_MODE === "uat") {
      //   return uni.showToast({
      //     title: "当前功能未上线",
      //     icon: "none",
      //     duration: 2500,
      //   });
      // }
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

    // 会员服务分别点击
    // btnType(type) {
    //   const url = type;
    //   if (url === "Setting") {
    //     uni.navigateTo({ url: `/pages/user/component/Setting` });
    //   } else if (url === "addressList") {
    //     uni.navigateTo({ url: "/subPages/address/addressList" });
    //   } else {
    //     return;
    //   }
    // },
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
    callHotLine() {
      try {
        if (this.hotTel) {
          uni.makePhoneCall({
            phoneNumber: this.hotTel,
          });
        }
        // api.$get(this.urlapi.about.customerHotline).then((res) => {
        //   console.log("res", res);
        //   const { content } = res?.data;
        //   console.log("获取客服电话", res, content);
        //   if (content) {
        //     uni.makePhoneCall({
        //       phoneNumber: content,
        //     });
        //   }
        // });
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 100vh;
  background: #f9f9f9;
  box-sizing: border-box;
  padding: 32rpx;
  padding-top: 0;
}
::v-deep .uni-list-item__icon-img,
::v-deep .u-icon__img {
  border: none !important;
}
.login-bg {
  height: 432rpx;
  width: 100%;
  // text-align: center;
  // background: #f0f;
  position: relative;
  z-index: 0;
  .bg-one {
    height: 100%;
    width: 360rpx;
    margin: 0 auto;
    .user-bg-login {
      border: none;
      width: 380rpx;
      height: 432rpx;
      position: absolute;
      top: -24rpx;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .user-info-top {
    width: 100%;
    height: 128rpx;
    // background: #fff;
    position: absolute;
    top: 172rpx;
  }
}
// 用户信息
.info {
  .info-top {
    width: 100%;
    .info-left {
      flex: 1;
      .info-imgs {
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info-msg {
        margin-left: 24rpx;
        .info-name {
          margin-bottom: 22rpx;
        }
      }
    }
    .info-btn {
      width: 194rpx;
      height: 72rpx;
      background: $uni-color-primary;
      font-size: 30rpx;
      color: #ffffff;
      border-radius: 254rpx;
      line-height: 72rpx;
    }
  }
}
// icons
.icon-out {
  .icons {
    position: absolute;
    top: 330rpx;
    border-radius: 40rpx;
    height: 180rpx;
    width: 100%;
    background: #fff;
    box-shadow: 0px 0px 24px 2px rgba(0, 0, 0, 0.08);
    font-size: 26rpx;
    color: #000;
    .icons-child {
      height: 100%;
      justify-content: space-evenly;
      text {
        margin-top: 14rpx;
      }
    }
  }
}

// 会员服务
.member-info {
  margin-top: 104rpx;
  //width: 100%;
  // height: 568rpx;
  background: #fff;
  border-radius: 40rpx;
  padding: 48rpx 32rpx 24rpx;
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

  // .member-list {
  //   // view,
  //   .out-view {
  //     display: flex;
  //     padding: 32rpx 0;
  //     view,
  //     .inside-view {
  //       flex: 1;
  //       text,
  //       .text {
  //         margin-left: 24rpx;
  //         font-size: 26rpx;
  //       }
  //     }
  //   }
  // }
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
.list-slot-text {
  color: #f86c4d;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  // text-align: right;
  justify-content: flex-end;
  font-weight: bold;
}
.hot-line-number {
  @extend .list-slot-text;
  color: #a9a9a9;
}
</style>
