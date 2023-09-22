<template>
  <view class="container">
    <hAddress
      :addressForm="addressForm"
      @getAddressInfo="getAddressInfo"
      ref="address"
    />
    <view class="btn-box">
      <button :loading="loading" class="btn-submite" @click="saveAddress">
        保存
      </button>
      <view class="del-btn" @click="delAddress">删除地址</view>
    </view>
    <uni-popup ref="popup" background-color="#999999">
      <view
        class="popup-content-view"
        :class="{ 'popup-height': type === 'left' || type === 'right' }"
      >
        <view class="affirm-text">确认删除该地址？</view>
        <view class="affirm-button-view">
          <view class="cancel-btn" @click="onCancel">取消</view>
          <view class="affirm-btn" @click="onDelete">删除</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import hAddress from "../components/h-address/h-address.vue";
import { address } from "@/utils/url";
export default {
  components: {
    hAddress,
  },
  data() {
    return {
      addressNo: "",
      addressForm: {},
      loading: false,
    };
  },
  onLoad(option) {
    this.addressNo = option.addressNo;
    this.getDetail(option.addressNo);
  },
  methods: {
    getAddressInfo(obj) {
      console.log("obj---ssssxxxx", obj);
      this.addressForm = obj;
    },
    // 根据addressNo获取详情
    async getDetail(str) {
      try {
        const { data } = await this.GET(address.addressDetail + `/${str}`);
        this.addressForm = data;
        this.addressForm.defaulted = this.addressForm.defaulted ? true : false;
      } catch (error) {
        console.log(error);
      }
    },
    async saveAddress() {
      try {
        this.loading = true;
        const para = await this.$refs.address.getAddressInfo();
        console.log(para, "子组件函数返回参数");
        const formInfo = { ...para };
        formInfo.defaulted = para.defaulted ? 1 : 0;
        console.log(para, "请求参数");
        const { msg } = await this.PUT(address.addressEdit, formInfo);
        uni.showToast({
          icon: "none",
          title: "保存成功",
          duration: 1500,
        });
        uni.navigateBack({ delta: -1 });
        // setTimeout(() => {
        //   uni.navigateBack({ delta: -1 });
        //   // uni.reLaunch({ url: "/subPages/address/addressList" });
        // }, 1500);
      } catch (err) {
        //
      } finally {
        this.loading = false;
      }
    },
    onCancel() {
      this.$refs.popup.close();
    },
    async onDelete() {
      try {
        const res = await this.DELETE(
          address.addressDel + `/${this.addressNo}`
        );
        this.$refs.popup.close();
        uni.showToast({
          icon: "none",
          title: res.msg,
          duration: 1000,
        });
        this.$store.commit("address/clearAddress");
        uni.navigateBack({ delta: -1 });
        // setTimeout(() => {
        //   uni.navigateBack({ delta: -1 });
        // }, 1500);
      } catch (err) {
        //
      }
    },
    delAddress() {
      this.$refs.popup.open("center");

      return;
      uni.showModal({
        title: "提示",
        content: "确定删除此地址吗?",
        success: (res) => {
          if (res.confirm) {
            try {
              this.DELETE(address.addressDel + `/${this.addressNo}`).then(
                (res) => {
                  uni.showToast({
                    icon: "success",
                    title: res.msg,
                    duration: 1500,
                  });
                  this.$store.commit("address/clearAddress");
                  setTimeout(() => {
                    uni.navigateBack({ delta: -1 });
                    // ({ url: "/subPages/address/addressList" });
                    // uni.navigateBack({ delta: 1 })
                  }, 1500);
                }
              );
            } catch (err) {}
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  background: #f5f5f5;
  height: calc(100vh - 160rpx);
  overflow-y: auto;
}
// ::v-deep .u-transition {
//   width: 132rpx;
//   height: 65rpx;
//   text-align: center;
// }
::v-deep .u-tag__text--info {
  // width: 132rpx;
  // height: 65rpx;
  text-align: center;
}
.btn-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 282rpx;
  background: #fff;
  font-size: 34rpx;
}
.del-btn {
  color: #ec4747;
  text-align: center;
  margin-top: 40rpx;
}
.btn-submite {
  background: #1d9bdc;
  border-color: #1d9bdc;
  width: 670rpx;
  height: 104rpx;
  line-height: 104rpx;
  margin-top: 32rpx;
  text-align: center;
  color: #fff;
  border-radius: 254rpx;
  margin: 0 auto;
}
//弹窗
.popup-content-view {
  padding: 48rpx;
  width: 606rpx;
  height: 316rpx;
  border-radius: 40rpx !important;
  background: white;
  .affirm-text {
    font-size: 32rpx;
    color: #000000;
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .affirm-button-view {
    width: 100%;
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .cancel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240rpx;
    height: 80rpx;
    border: 1px solid #1d9bdc;
    color: #1d9bdc;
    font-size: 34rpx;
    border-radius: 40rpx;
  }
  .affirm-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240rpx;
    height: 80rpx;
    background-color: #1d9bdc;
    color: white;
    font-size: 34rpx;
    border-radius: 40rpx;
  }
}
</style>
