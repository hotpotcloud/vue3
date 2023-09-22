<template>
  <view class="container">
    <view class="address-lists" v-if="loading">
      <view class="none-data" v-if="list.length === 0">
        <view class="no-data">
          <image
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E6%97%A0%E5%9C%B0%E5%9D%80.png"
            mode=""
          ></image>
        </view>
        <view class="no-text">暂无地址信息，请添加收货地址</view>
      </view>
      <view class="address-content" v-else>
        <uni-list :border="false">
          <uni-list-item
            v-for="item in list"
            :key="item.addressNo"
            :clickable="true"
          >
            <!-- 自定义 header -->
            <template v-slot:header>
              <view>
                <view class="d-flex-center d-sb" style="width: 100%">
                  <view @click="chooseAddress(item)" class="flex-1">
                    <!-- 区域 -->
                    <view class="d-flex-center add-header">
                      <view
                        v-if="item.labelName"
                        :class="[
                          item.defaulted === 1
                            ? 'h-address-tag'
                            : 'h-address-tag-other',
                        ]"
                        >{{
                          item.defaulted === 1 ? "默认" : item.labelName
                        }}</view
                      >

                      <view class="flex-1 h-over-1">
                        {{ item.provinceCityArea }}</view
                      >
                    </view>
                    <!-- 详情 -->
                    <view class="h-over-1 add-body">
                      {{ item.communityDoorCode }}
                    </view>
                    <!-- 收货人 -->
                    <view class="d-flex-center add-user">
                      <view class="user-name">{{ item.receiver }}</view>
                      <view class="flex-1 h-over-1">{{
                        item.receiverPhone
                      }}</view>
                    </view>
                  </view>
                  <view>
                    <uni-icons
                      @tap="goEdit(item.addressNo)"
                      class="slot-icon"
                      type="compose"
                      size="24"
                      color="#1D9BDC"
                    ></uni-icons
                  ></view>
                </view>
                <view class="d-flex-center">
                  <view class="rounder_check"></view>
                  <view class="rounder_text">设为默认</view>
                </view>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </view>
    <view class="btn-box">
      <view class="btn-submite" @click="addAddress">添加地址</view>
    </view>
  </view>
</template>

<script>
import { address } from "@/utils/url";
import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      list: [],
      type: "",
      loading: false,
    };
  },
  onLoad(params) {
    // console.log('------参数-----', params)
    this.type = params.type;
    // this.getList();
  },
  onShow() {
    this.getList();
  },
  computed: {
    ...mapState("plan", ["planInfo", "count"]), //判断是否更新
    ...mapState("milkcard", ["cardExchange", "milkPlanCount"]),
  },
  methods: {
    ...mapMutations("milkcard", [
      "set_CardPlanList",
      "set_MilkPlanCount",
      "set_Prarms",
    ]),
    // 配送计划优化
    ...mapMutations("plan", [
      "V_setPrarmsAddress",
      "V_setAsyncPlanInfo",
      "V_setCount",
    ]),
    ...mapActions("plan", ["V_putAddPlan"]),
    ...mapActions("milkcard", ["put_AddMilkPlan"]),
    // 订单确认中选中地址
    chooseAddress(obj) {
      console.log(obj, "选中的地址", this.type, "pp");
      if (!this.type) {
        this.goEdit(obj.addressNo);
      }
      const planDTO = {
        addressNo: obj.addressNo,
        adressDetail: obj.adressDetail,
        areaName: "",
        cityName: "",
        defaulted: obj.defaulted, //0-否，1-是
        label: obj.label,
        labelName: obj.labelName,
        latitude: obj.latitude,
        longitude: obj.longitude,
        memberNo: obj.memberNo,
        provinceName: "",
        receiver: obj.receiver,
        receiverPhone: obj.receiverPhone,
        communityDoorCode: obj.communityDoorCode, //"小区门牌号拼接",
        provinceCityArea: obj.provinceCityArea, //'省市区拼接'
      };
      if (this.type === "plan") {
        //配送计划
        // this.$store.commit("plan/V_setAddress", planDTO);
        this.V_setCount("ruleAddress");
        this.V_setPrarmsAddress(planDTO);
        this.V_setAsyncPlanInfo({
          addressDTO: planDTO,
        });
        // 更新
        if (this.planInfo.deliveryPlanCode || this.count.length === 4) {
          this.V_putAddPlan(this.planInfo.deliveryPlanCode ? true : false);
        }
        uni.navigateBack({ delta: -1 });
      }
      // 奶卡
      if (this.type === "milkplan") {
        // this.set_MilkPlanCount(e[0]);
        this.set_MilkPlanCount("address");
        this.set_CardPlanList({
          addressDTO: planDTO,
        });
        this.set_Prarms({
          receiverNo: obj.addressNo,
        });

        if (
          this.cardExchange.deliveryPlanCode ||
          this.milkPlanCount.length === 4
        ) {
          console.log("2-", this.cardExchange.deliveryPlanCode);
          this.put_AddMilkPlan(
            this.cardExchange.deliveryPlanCode ? true : false
          );
        }
        uni.navigateBack({ delta: -1 });
      }
    },
    // 获取地址列表
    async getList() {
      try {
        this.loading = false;
        const { data } = await this.GET(address.addressList, "加载中", true);
        this.list = data;
        this.loading = true;
      } catch (err) {}
    },
    // 去编辑地址
    goEdit(addressNo) {
      console.log(addressNo, "选中编辑的地址");
      uni.navigateTo({
        url: `/subPages/address/addressEdit?addressNo=${addressNo}`,
        fail() {
          uni.redirectTo({
            url: `/subPages/address/addressEdit?addressNo=${addressNo}`,
          });
        },
      });
    },
    // 去添加地址
    addAddress() {
      console.log("被点击呢1");
      uni.navigateTo({
        url: "/subPages/address/addressAdd",
        fail() {
          console.log("跳转失败2");
          uni.redirectTo({
            url: "/subPages/address/addressAdd",
          });
        },
      });
      // uni.redirectTo({
      //   url: "/subPages/address/addressAdd",
      // });
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.none-data {
  padding-top: 350rpx;

  .no-data {
    margin: 0 auto;
    width: 518rpx;
    height: 356rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .no-text {
    width: 100%;
    font-weight: 400;
    color: #a9a9a9;
    font-size: 26rpx;
    text-align: center;
    margin-top: 48rpx;
  }
}

.address-lists {
  padding: 8rpx 40rpx 0 40rpx;
  font-size: 54rpx;
  //width: 100vw;
  background: #ffffff;
  line-height: 32rpx;
}

.address-content {
  padding-bottom: 228rpx;
}

::v-deep .uni-list-item {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  .uni-list-item__container {
    padding: 32rpx 0;
  }
}

.slot-title-text {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 30rpx;
  font-weight: 400;
  line-height: 35rpx;

  .slot-title-phone {
    padding: 0 16rpx;
  }
}

.slot-title-address {
  font-size: 30rpx;
  font-weight: bold;
  padding-top: 16rpx;
  line-height: 35rpx;
}

::v-deep .uni-tag {
  min-width: 44rpx;
  padding: 4rpx 12rpx;
  font-size: 26rpx;
  background-color: #999999;
  border-radius: 8rpx;
  margin-right: 8rpx;

  text-align: center;
}

.btn-box {
  position: fixed;
  bottom: 0;
  //width: 100%;
  height: 228rpx;
  background: #fff;
  padding: 0 32rpx;
  padding-top: 32rpx;
  // border: 2rpx solid #9c9c9c;

  .btn-submite {
    background: #1d9bdc;
    border-color: #1d9bdc;
    padding: 28rpx 268rpx;
    font-size: 32rpx;
    text-align: center;
    color: #fff;
    border-radius: 94rpx;
  }
}
//优化
.add-header {
  color: #666666;
  font-size: 26rpx;
}
.add-body {
  color: #333333;
  font-weight: bold;
  font-size: 32rpx;
  margin: 12rpx 0;
  // height: 30rpx;
}
.add-user {
  @extend .add-header;
  .user-name {
    margin-right: 48rpx;
  }
}
.rounder_check {
  border-radius: 50%;
  width: 28rpx;
  height: 28rpx;
  border: 1rpx solid #f99999;
  background: #ffffff;
  margin-right: 16rpx;
  &:active {
    background: #1d9bdc;
    border: none;
  }
}
.rounder_text {
  color: #999999;
  font-size: 26rpx;
}
</style>
