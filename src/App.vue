<!--
 * @Date: 2022-08-10 17:44:16
-->
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import api from "@/utils/api";
import { BaseApp } from "@/const/appIdConf";
import {
  getSettingAsync,
  getLocationAsync,
  gpsToAddress,
  // getMapLocation,
} from "@/utils/mapLocation";
import { compareVersion, getVersionInfo } from "./utils/commonMethod";
import { baseVersion } from "./utils/enum";
export default {
  data() {
    return {
      BaseApp,
    };
  },
  computed: {
    ...mapState("home", ["showAddBtn", "addressList", "existArr"]),
    ...mapState("user", ["loginStatus"]),
  },
  async onShow() {
    console.log("当前环境->", process.env);
    // 版本更新
    this.programUpLoad();
  },
  async onLaunch() {
    try {
      // uni.getPrivacySetting();
      // wx.requirePrivacyAuthorize({
      //   success: (res) => {
      //     console.log("res=隐私调用", res);
      //   },
      // });
      //注册用户初始化用户信息
      await this.getMembers();
      this.initUser();
      // 已登录
      if (this.loginStatus) {
        //收货地址列表
        this.X_getAddressList();
        //检查小优
        BaseApp.xiaoyou && this.get_xiaoyouMoney();
      }
      // 定位判断
      this.lunchLocationInit();
      //版本更新
      this.programUpLoad();
      const timeout = setTimeout(() => {
        this.$isResolve();
        clearTimeout(timeout);
      }, 500);
      // 版本比较
      this.compareVersionWithBase();
    } catch (error) {
      //
    }
  },

  methods: {
    ...mapActions("user", ["getMembers"]),
    ...mapMutations("user", ["initUser"]),
    ...mapMutations("home", [
      "V_setShowAddBtn",
      "V_setAddInfoMsg",
      "V_setExistFlag",
    ]),
    ...mapActions("home", [
      "X_getLanuchExistArr",
      "X_getAddressList",
      "get_xiaoyouMoney",
      "get_XYinfo",
      "getDefaultAppAddress",
    ]),
    // 冷启动初始化
    async lunchLocationInit() {
      try {
        // 获取用户设置
        const res = await getSettingAsync();
        console.log("res-init-用户设置信息", res);
        // return;
        // 用户已授权
        this.authedMap();
      } catch (error) {}
    },
    // 定位已授权
    async authedMap() {
      try {
        // 1.获取坐标
        const res = await getLocationAsync("gcj02");
        console.log(res, "定位是");
        this.V_setShowAddBtn(false);
        this.V_setExistFlag(true); //营销区域是否变化
        const infoTX = {
          longitude: res.longitude,
          latitude: res.latitude,
        };
        this.X_getLanuchExistArr(infoTX); //营销区域
      } catch (e) {
        this.V_setShowAddBtn(true);
        this.X_getLanuchExistArr({}); //营销区域
        //
      }
    },
    async compareVersionWithBase() {
      const version = await getVersionInfo();
      console.log(version, "version");
      console.log(version, compareVersion(version, baseVersion));
      if (compareVersion(version, baseVersion) < 0) {
        uni.showToast({
          title: "当前微信版本过低可能会影响使用，请升级版本",
          icon: "none",
          duration: 3000,
          noConflict: true,
        });
      }
    },
    /**
     * 版本更新-后台设置对应可打开最低版本号
     */
    programUpLoad() {
      const updateManger = wx.getUpdateManager();
      updateManger.onCheckForUpdate((res) => {
        console.log("updateManger--更新", res);
        if (res.hasUpdate) {
          updateManger.onUpdateReady(() => {
            uni.showModal({
              title: "有新版本",
              content: "新版本已经准备好，即将重启",
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  uni.clearStorageSync();
                  updateManger.applyUpdate();
                }
              },
            });
          });
          updateManger.onUpdateFailed(() => {
            uni.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线，请您删除当前小程序，重新搜索打开哟~",
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "uni.scss";
//@import 'uview-ui/index.scss';
@import "node_modules/uview-ui/index.scss";
// @import 'uview-ui/index.scss';
// color-ui
@import "colorui/main.css";
@import "colorui/icon.css";
::v-deep.u-checkbox-group {
  width: 484rpx;
  flex-wrap: wrap;
  justify-content: space-between;
  .u-checkbox-label--left {
    margin-top: 12rpx;
  }
}
::v-deep .uni-list-item__icon-img,
::v-deep .u-icon__img {
  border: none !important;
}
/* 未选中的背景样式 */
checkbox .wx-checkbox-input {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
}

/* 选中后的背景样式 */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  border: none;
  width: 48rpx;
  height: 48rpx;
  background: #1d9bdc;
}

/* 选中后的勾子样式 */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 48rpx;
  height: 48rpx;
  line-height: 40rpx;
  border-radius: 50%;
  text-align: center;
  font-size: 32rpx;
  font-weight: bolder;
  color: #fff;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
</style>
