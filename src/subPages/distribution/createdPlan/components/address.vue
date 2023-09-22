<template>
  <view class="day-root-container">
    <view class="title"><text class="num-font">4</text>/5</view>
    <view class="title-text">
      <text>选择收货地址</text>
      <text
        v-if="list.length"
        :style="{ 'font-size': '32rpx' }"
        @click="addressManage"
        >管理</text
      ></view
    >
    <view v-if="!loading">
      <view v-if="list.length">
        <view
          class="prent-container"
          v-for="item in list"
          :key="item.addressNo"
        >
          <view class="container">
            <view class="title-view">
              <view class="personage-info-view">
                <view class="d-flex-center">
                  <view class="name-style h-over-1">{{ item.receiver }}</view>
                  <view class="phone-style">{{ item.receiverPhone }}</view>
                </view>
                <view class="company-style" v-if="item.labelName">{{
                  item.labelName
                }}</view>
              </view>
              <view class="phone-style" style="margin: 0px">{{
                item.adressDetail
              }}</view>
            </view>
            <view class="radio-view">
              <radio-group @change="radioChange">
                <label class="radio"
                  ><radio
                    :value="JSON.stringify(item)"
                    color="blue"
                    :checked="addressNo === item.addressNo"
                    style="transform: scale(0.77)"
                /></label>
              </radio-group>
            </view>
          </view>
        </view>

        <view class="empty-view"></view>
        <view class="btn-view border-top">
          <view
            class="button-style"
            @click="nextStep"
            :style="{ background: btnActive ? '#1D9BDC' : '#C7C7C7' }"
            >{{ btnText }}</view
          >
        </view>
      </view>
      <view v-else>
        <emptyAddress />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { AlterORCrtate } from "@/utils/enum";
import { address } from "@/utils/url";
import emptyAddress from "./emptyAddress.vue";
export default Vue.extend({
  components: {
    emptyAddress,
  },
  data() {
    return {
      addressNo: "",
      list: [],
      btnText: "下一步",
      btnActive: false,
      name: "", //收货人名字
      loading: true, //加载
    };
  },
  computed: {
    ...mapState("distribution", ["addProject", "editData"]),
  },
  onShow() {
    console.log(this.editData);
    this.init();
    if (this.type === AlterORCrtate.CREATE) {
      // this.addressNo = this.list[0]?.addressNo;
      this.btnText = "下一步";
      this.btnActive = true;
    } else {
      this.btnText = "确定";
      this.addressNo = this.editData.receiverNo;
    }
  },

  onLoad(options) {
    const param = options.param;
    this.type = param;
    // this.init();
    // const { data } = await this.GET(address.addressList, "加载中", true);
    // this.list = data;
  },

  methods: {
    ...mapMutations("distribution", ["M_receiverNo", "M_AlterReceiverNo"]),
    async init() {
      try {
        // const { data } = await this.GET(address.addressList, "加载中", true);
        this.loading = true;
        const { data } = await this.$api.$get(
          address.addressList,
          {},
          "加载中",
          true
        );
        this.list = data;
        if (this.type === AlterORCrtate.CREATE) {
          // this.addressNo = data[0]?.addressNo;
          this.name = data[0]?.receiver;
          this.addressNo = data[0]?.addressNo;
          this.addressVal = data[0];
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    nextStep() {
      // if (!this.btnactive) return;
      if (this.addressNo !== "") {
        this.caeateRoalter();
      } else {
        uni.showToast({
          title: "请选择配送地址",
          icon: "none",
          duration: 3000,
        });
      }
    },
    caeateRoalter() {
      if (this.type === AlterORCrtate.CREATE) {
        //创建
        this.M_receiverNo(this.addressNo);
        uni.navigateTo({
          url: `/subPages/distribution/createdPlan/components/projectBeNamed?param=${this.type}&name=${this.name}`,
        });
      } else {
        //编辑

        this.addressVal.addressNo = this.addressNo;
        this.M_AlterReceiverNo(this.addressVal);
        uni.navigateBack({
          delta: 1,
        });
      }
    },
    radioChange(e) {
      try {
        const value = JSON.parse(e.detail.value);
        console.log("value", value);
        this.name = value.receiver;
        this.addressNo = value.addressNo;
        this.addressVal = value;
        this.btnActive = true;
      } catch (error) {
        console.log(error);
      }
    },
    addressManage() {
      uni.navigateTo({
        url: "/subPages/address/addressList",
      });
    },
  },
});
</script>

<style scoped>
.day-root-container {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.prent-container {
  border-bottom: #f5f5f5 1px solid;
  width: 100%;
}
.empty-view {
  height: 196rpx;
  width: 100%;
  background: #f5f5f5;
  /* background: #1d9bdc; */
}
.container {
  width: 100%;
  height: 200rpx;
  background-color: white;
  padding-left: 48rpx;
  padding-right: 48rpx;
  display: flex;
  justify-content: space-between;
}
.title {
  width: 100%;
  padding-top: 32rpx;
  padding-left: 32rpx;
  font-size: 32rpx;
  color: #88c7e8;
}
.num-font {
  font-size: 48rpx;
  color: #1d9bdc;
}
.title-text {
  font-size: 36rpx;
  color: #1d9bdc;
  padding-left: 32rpx;
  padding-right: 32rpx;
  padding-top: 16rpx;
  margin-bottom: 64rpx;
  display: flex;
  justify-content: space-between;
}
.title-view {
  height: 100%;
  width: 562rpx;
}

.radio-view {
  height: 100%;
  display: flex;
  align-items: center;
}

.btn-view {
  width: 100%;
  position: fixed;
  /* bottom: 68rpx; */
  bottom: 0;
  display: flex;
  justify-content: center;
  background: #fff;
}
.button-style {
  margin-top: 16rpx;
  margin-bottom: 68rpx;
  display: flex;
  border-radius: 100rpx;
  background-color: #1d9bdc;
  background: #fff;

  height: 104rpx;
  width: 670rpx;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 34rpx;
}
.personage-info-view {
  display: flex;
  align-items: center;
  margin-top: 32rpx;
  margin-bottom: 16rpx;
}
.name-style {
  font-size: 30rpx;
  font-weight: 500;
}
.phone-style {
  color: #999999;
  font-size: 30rpx;
  margin-left: 18rpx;
}
.company-style {
  margin-left: 18rpx;
  width: 80rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e4f4ff;
  color: #1d9bdc;
  border-radius: 8rpx;
}
</style>
