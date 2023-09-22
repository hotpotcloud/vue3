<template>
  <view class="modal-popup">
    <!-- <view class="modal-week" v-if="showWeek" @tap.stop="showWeek = false">
      <view class="week-out d-flex-colum">
        <view class="top-name-week">
          星期送设置
          <view class="icon-week-close" @click="showWeek = false">
            <u-icon name="close" color="#999999" size="14"></u-icon>
          </view>
        </view>
        <view class="d-flex-colum d-sb flex-1">
          <view class="d-flex-warp">
            <u-checkbox-group @change="checkboxGroupChange" v-model="listweek">
              <u-checkbox
                shape="circle"
                @change="checkboxChange"
                v-for="(item, index) in weekList"
                :key="index"
                :name="item.value"
                :label="item.label"
              ></u-checkbox>
            </u-checkbox-group>
          </view>
          <view class="btn-week" @click="sureBtn"> 确定 </view>
        </view>
      </view>
    </view> -->
    <!-- <view v-if="showCalendar" class="modal-week">
      <u-calendar
        :show="showCalendar"
        title="起送时间选择"
        round="16"
        mode="single"
        color="#1D9BDC"
        closeOnClickOverlay
        @confirm="confirm"
        @close="closeCalendar"
        :minDate="time"
        :maxDate="productinfo.maxtime"
        :defaultDate="productinfo.time ? productinfo.time : time"
      ></u-calendar>
    </view> -->

    <u-popup
      :show="isOpens"
      :round="20"
      zindex="900"
      mode="bottom"
      @close="closeModal"
      overlayOpacity="0.45"
      :safeAreaInsetTop="false"
    >
      <view class="modal-out">
        <view class="popup-panle">
          <!-- 弹窗顶部 -->
          <view class="popup-item">
            <view class="goods-cover">
              <image
                class="goods-img"
                :src="productinfo.imageUrl[0]"
                mode="aspectFit"
              />
            </view>
            <view class="popup-desc d-flex-colum d-sb">
              <!-- 商品名称 -->
              <view class="d-flex d-sb d-start">
                <view class="goods-title">
                  <text
                    class="seckill-tag"
                    v-show="productinfo.numlist.killSymbal"
                    >秒杀</text
                  >
                  <view
                    :class="[iosFont ? 'font-ios' : 'font-android']"
                    style="display: inline"
                  >
                    {{ productinfo.spuName }}</view
                  >
                  <!-- {{vuexCombo[0].skuName}} -->
                </view>
                <view style="width: 24px; height: 24px">
                  <u-icon
                    name="close"
                    color="#999999"
                    @tap="closeModal"
                    size="16"
                  ></u-icon>
                </view>
              </view>
              <!-- 优惠标签 -->
              <view class="goods-cupon-taggroup d-flex-center">
                <view v-if="xticket.length && X_mutual.coupon" class="h-ticket"
                  >优惠券</view
                >
                <view v-for="(item, index) in xtag" :key="index">
                  <view v-if="X_mutual.tag" class="goods-cupon-tag">{{
                    item
                  }}</view>
                </view>
              </view>

              <!-- 价格 -->
              <view
                class="popup-action"
                v-if="!productinfo.numlist.killSymbal"
                :class="[iosFont ? 'font-ios' : 'font-android']"
              >
                {{ productinfo.minMoney }}
                <text v-show="productinfo.maxMoney">
                  ~{{ productinfo.maxMoney }}
                </text>
              </view>
              <view v-else>
                <text
                  :class="[
                    iosFont ? 'font-ios' : 'font-android',
                    'popup-action',
                  ]"
                  >{{ productinfo.killMoney }}</text
                >
                <text class="spike-price-unuse" style="margin-left: 8rpx">{{
                  productinfo.minMoney
                }}</text>
              </view>
            </view>
          </view>
        </view>

        <view>
          <!-- 弹窗中部 -->
          <scroll-view
            class="info-center"
            scroll-y="true"
            scroll-top
            :show-scrollbar="true"
          >
            <view class="popup-scroll">
              <!-- <view class="popup-standard">
                <view
                  class="popup-standard-title"
                  :class="[iosFont ? 'font-ios' : 'font-android']"
                  >规格</view
                >
                <view class="flex-1">
                  <view class="popup-standard-group">
                    <view
                      class="h-attribute"
                      v-for="(item, index) in productinfo.skuChannelInfoList"
                      :key="index"
                      @click="chooseIt(index, 'volum', item)"
                      :class="productinfo.activeSize === index ? 'active' : ''"
                    >
                      {{ item.skuNickName }}
                    </view>
                  </view>
                  <view class="h-block h-left-m-32">
                    <view class="sub-color sub-color-size">
                      <text v-if="vuexCombo.length">*该规格包含商品：</text>
                      <view>
                        <text v-for="(el, nums) in vuexCombo" :key="nums">
                          {{ el.skuName }} {{ el.num
                          }}{{ el.specsName }}，</text
                        >
                      </view>
                    </view>
                  </view>
                </view>
              </view>

              <view class="popup-standard">
                <view
                  class="popup-standard-title"
                  :class="[iosFont ? 'font-ios' : 'font-android']"
                  >数量</view
                >
                <view class="popup-standard-group">
                  <view
                    class="h-attribute"
                    v-for="(item, index) in productinfo.numlist.saleNums"
                    :key="index"
                    @click="chooseIt(index, 'qlt', item)"
                    :class="productinfo.activeNum === index ? 'active' : ''"
                  >
                    {{ item }}{{ productinfo.unitName }}
                  </view>
                </view>
              </view> -->

              <!-- fc07 -->
              <!-- 商品规格 -->
              <view class="size-out">
                <view class="size d-flex d-sb">
                  <view
                    class="size-title"
                    :class="[iosFont ? 'font-ios' : 'font-android']"
                    >选择</view
                  >

                  <!-- 右侧内容 -->
                  <view class="size-list flex-1">
                    <!-- 规格 -->
                    <view class="size-list-item">
                      <view class="little-tip">规格</view>
                      <view class="d-flex-warp">
                        <!--  -->
                        <template
                          v-for="(el, index) in productinfo.skuChannelInfoList"
                        >
                          <view
                            :key="index"
                            class="size-right-item align"
                            :class="[
                              productinfo.activeSize === index && 'active',
                            ]"
                            @click="onChoose(index, el)"
                          >
                            {{ el.skuNickName }}
                          </view>
                        </template>
                      </view>
                      <!-- 组合商品sku信息 -->
                      <view v-if="vuexCombo.length" class="fc05-combo">
                        <view class="d-flex-center d-sb" @tap="checkMoreGoods">
                          <view class="d-flex-center">
                            <template v-for="(it, idx) in comboNums">
                              <view class="combo-img" :key="idx">
                                <img
                                  :src="getAssetImgUrl(it.imageUrl[0])"
                                  alt=""
                                />
                                <text class="combo-nums"
                                  >{{ it.num }}{{ it.specsName }}</text
                                >
                              </view>
                            </template>
                          </view>
                          <view class="d-flex-nowarp">
                            <view class="fc05-more" v-if="vuexCombo.length > 2"
                              >共{{ vuexCombo.length }}种</view
                            >
                            <u-icon
                              name="arrow-right"
                              color="#999999"
                              size="16"
                            ></u-icon>
                          </view>
                        </view>
                      </view>
                    </view>

                    <view class="goods-nums">
                      <view class="little-tip">数量</view>
                      <view class="d-flex-warp">
                        <template
                          v-for="(el, index) in productinfo.numlist.saleNums"
                        >
                          <view
                            :key="index"
                            class="size-right-item align"
                            :class="[
                              productinfo.activeNum === index && 'active',
                            ]"
                            @click="onChooseNum(index, el)"
                          >
                            {{ el }}{{ productinfo.unitName }}
                          </view>
                        </template>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="h-empty"></view>
          </scroll-view>
        </view>

        <!-- 弹窗底部 -->
        <h-CommonCar
          :detail="false"
          :text="vuexTips"
          :price="vuexPriceToal"
          :maxprice="productinfo.maxMoney"
          :shelf="productinfo.status"
          :reserve="productinfo.reserve"
          :killShelf="
            productinfo.numlist.killSymbal
              ? productinfo.numlist.killDTO.status
              : 'FINISH'
          "
          :killStock="
            productinfo.numlist.killSymbal ? productinfo.numlist.killReserve : 0
          "
          :killLimit="productinfo.numlist.killLimt"
          :showKill="
            productinfo.numlist.killSymbal
              ? productinfo.numlist.killDTO.status !== skillEnum.FINISH
              : productinfo.numlist.killSymbal
          "
          @buygoods="buyCar"
          @toHome="homeTab"
        ></h-CommonCar>
      </view>
    </u-popup>

    <!-- 组合商品弹窗 -->
    <view v-if="spuModal" class="spu-out">
      <view
        @tap.stop="closeSpu"
        :style="{ minHeight: 100 - modalH + '%' }"
      ></view>
      <!-- 内容 -->
      <view class="main" :style="{ minHeight: modalH + '%' }">
        <!-- 标题 -->
        <view class="d-flex-center d-sb">
          <view class="flex-1 top-title">{{ title }}</view>
          <u-icon
            @tap="closeSpu"
            name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/close%E5%85%B3%E9%97%AD.png"
          ></u-icon>
        </view>
        <!-- 内容 -->
        <view class="content-modal">
          <view class="d-flex-warp spu-padding8">
            <view
              v-for="(el, index) in productinfo.skuChannelInfoList"
              :key="index"
              class="el-text h-over-1"
              :class="[productinfo.activeSize === index && 'active-spu']"
              @click="onCurrentSku(el, index)"
            >
              {{ el.skuNickName }}
            </view>
          </view>
          <view class="sku-info" v-if="vuexCombo.length">
            <text class="blod-weight spu-padding8"
              >该组合包含商品({{ vuexCombo.length }})</text
            >
            <!-- <view class="info"> -->
            <scroll-view scroll-y="true" class="scroll-out">
              <view
                v-for="(item, i) in vuexCombo"
                :key="i"
                class="sku-item-info"
              >
                <view class="sku-image">
                  <img
                    :src="getAssetImgUrl(item.imageUrl[0])"
                    mode="aspectFit"
                  />
                  <view class="sku-num"
                    >{{ item.num }}{{ item.specsName }}</view
                  >
                </view>
                <view class="sku-name"> {{ item.skuName }}</view>
              </view>
            </scroll-view>
            <!-- </view> -->
          </view>
        </view>
        <!-- 按钮 -->
        <view class="action">
          <view class="action-btn" @click="closeSpu">确定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from "@/utils/api";
import { formatAmount } from "@/utils/utils";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { productStatusEnum, skillEnum, RuleEnum } from "@/utils/enum";
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    infoObj: {
      type: Object,
    },
    shelf: {
      type: String,
      default: "PRODUCT_OFF",
    },
  },
  data() {
    return {
      RuleEnum,
      isOpens: this.isOpen,
      activeVolum: 0,
      activeQlt: 0,
      activeDay: 0,
      numSend: 1,
      showCalendar: false,
      date: "",
      numList: [],
      maxNum: "",
      vuexData: {},
      skillEnum,
      showWeek: false, //周末
      listweek: [], //选择周
      spuModal: false,
      modalH: 76,
      indicator: false, //指示器
      currentSku: {}, //当前选中规格
      title: "选择组合商品",
    };
  },
  watch: {
    isOpen(val, old) {
      this.isOpens = val;
    },
    shelf(val, old) {
      if (val === productStatusEnum.PRODUCT_OFF) {
        this.downGoods();
      }
    },
  },
  computed: {
    ...mapState("product", [
      "xtags",
      "xticket",
      "productinfo",
      "time",
      "arrtime",
      "skillType",
    ]),
    ...mapState("css", ["iosFont"]),
    ...mapGetters("product", [
      "vuexPriceToal",
      "vuexTips",
      "vuexCombo",
      "xtag",
      "X_mutual", //优惠券互斥
      "X_buys", //
    ]),
    // 组合商品信息
    comboNums() {
      console.log("this.productinfo.activeSize", this.productinfo.activeSize);
      const len = this.vuexCombo.length;
      if (len > 4) {
        return this.vuexCombo.slice(0, 4);
      } else {
        return this.vuexCombo;
      }
    },
  },
  methods: {
    ...mapMutations("order", ["V_setorderPar", "V_setShowChange"]),

    ...mapMutations("product", [
      "check",
      "setTime",
      "setTimeArr",
      "topay",
      "setWeekList",
    ]),
    ...mapActions("product", ["X_skill", "X_skillTime", "X_postStartSendTime"]),
    // 关闭
    closeSpu() {
      this.spuModal = false;
      this.$emit("closeSpu", this.spuModal);
    },
    //点击规格
    onCurrentSku(item, index) {
      // const
      console.log("val规格点击", item, this.productinfo);
      this.currentSku = {
        currentSkuName: item.skuNickName,
        activeSize: index,
        numlist: item,
        goodscode: item.channelSkuCode,
        priceNow:
          item.killSymbal && item.killDTO.status != skillEnum.FINISH
            ? item.killPrice
            : item.minPrice,
        max: item.saleNums[0],
        activeNum: 0,
        reserve: item.reserve,
        defaultNum: 1,
        maxMoney:
          item.maxPrice && item.maxPrice != item.minPrice
            ? formatAmount(item.maxPrice)
            : "",
        minMoney: formatAmount(item.minPrice),
      };
      this.check({
        ...this.productinfo,
        ...this.currentSku,
      });
    },

    onChoose(index, item) {
      this.chooseIt(index, "volum", item);
      this.$emit("onChoose", index, item);
    },
    onChooseNum(index, item) {
      this.chooseIt(index, "qlt", item);
      this.$emit("onChooseNum", index, item);
    },
    checkMoreGoods() {
      this.spuModal = true;
      this.$emit("checkMoreGoods");
    },
    // 打开弹窗
    openModal() {
      console.log("打开");
      // this.isOpens = true;
    },
    closeModal() {
      this.isOpens = false;
      this.$emit("close", this.isOpens);
    },

    chooseIt(index, type, item) {
      if (this.productinfo.status === productStatusEnum.PRODUCT_OFF) {
        return false;
      }
      const { numlist } = this.productinfo;
      console.log(item, "999");
      if (type === "volum") {
        this.numList = item;
        this.check({
          ...this.productinfo,
          activeSize: index,
          numlist: item,
          goodscode: item.channelSkuCode,
          priceNow:
            item.killSymbal && item.killDTO.status != skillEnum.FINISH
              ? item.killPrice
              : item.minPrice,
          activeNum: 0,
          max: item.saleNums[0],
          reserve: item.reserve,
          defaultNum: 1,
          maxMoney:
            item.maxPrice && item.maxPrice != item.minPrice
              ? formatAmount(item.maxPrice)
              : "",
          minMoney: formatAmount(item.minPrice),
        });

        this.activeVolum = index;
        this.activeQlt = 0;
        // this.X_postStartSendTime();
        // this.postSendTime().then(() => {
        if (this.productinfo.numlist.killSymbal) {
          this.X_skill().then(() => {
            this.X_skillTime();
          });

          console.log("this.skillType", this.skillType);
        }
        // });
      } else if (type === "qlt") {
        this.activeQlt = index;
        this.check({
          //修改数量
          ...this.productinfo,
          max: item,
          defaultNum: 1,
          activeNum: index,
        });
        // this.numSend = 1;
        // this.postSendTime();
      }
      // else if (type === "day") {
      //   this.activeDay = index;
      //   this.check({
      //     ...this.productinfo,
      //     ruleName: item.name,
      //     ruleEnum: item.deliveryRuleEnums,
      //     activeDay: index,
      //   });
      //   if (item.deliveryRuleEnums === RuleEnum.WEEK_DAYS) {
      //     this.showWeek = true;
      //     if (this.listweek.length !== 0) {
      //       this.X_postStartSendTime().then(() => this.postSendTime());
      //       // this.postSendTime().then(() => this.X_postStartSendTime());
      //     }
      //   } else {
      //     this.X_postStartSendTime().then(() => this.postSendTime());

      //     // this.postSendTime();
      //     // this.X_postStartSendTime();

      //     //
      //   }
      // }

      console.log(index, type, item);
    },
    downGoods() {
      uni.showToast({
        title: "该商品已下架",
        icon: "error",
        duration: 3000,
      });
    },
    // changeVal(value) {
    //   if (this.productinfo.status === productStatusEnum.PRODUCT_OFF)
    //     return this.downGoods();
    //   this.numSend = value.value;
    //   if (this.numSend == this.productinfo.max) {
    //     uni.showToast({
    //       title: "配送数量不能超过购买总数",
    //       icon: "none",
    //       duration: 2500,
    //     });
    //   }
    //   this.check({ ...this.productinfo, defaultNum: value.value });
    //   this.postSendTime();
    // },
    // 打开日历
    // openCalendar() {
    //   this.showCalendar = true;
    // },
    // // 日历确定
    // confirm(e) {
    //   this.date = e[0];
    //   this.showCalendar = false;
    //   this.check({
    //     ...this.productinfo,
    //     time: e[0],
    //   });
    //   this.postSendTime();
    // },
    // 配送时间范围
    // async postSendTime() {
    //   try {
    //     const params = {
    //       channelSkuCode: this.productinfo.goodscode,
    //       deliveryCount: this.productinfo.defaultNum, //每次配送
    //       rule: this.productinfo.ruleEnum,
    //       startTime: this.productinfo.time ? this.productinfo.time : this.time,
    //       totalCount: this.productinfo.max,
    //       deliveryDetails: this.listweek.join(","),
    //     };
    //     const { data } = await api.$post(this.urlapi.product.calendar, params);
    //     this.setTimeArr(data.timeList);
    //     console.log("modal配送时间", data);
    //   } catch (err) {}
    // },
    // // 上限
    // upperNum(str) {
    //   return uni.showToast({
    //     title: str,
    //     icon: "none",
    //     duration: 3000,
    //   });
    // },
    // // 失焦
    // blurNumber(value) {
    //   console.log("value", value);
    //   const num = value.value;
    //   if (!num) {
    //     this.upperNum("配送数量低于最低数量");
    //     this.check({ ...this.productinfo, defaultNum: value.value });
    //   }
    // },
    // // 关闭日历
    // closeCalendar() {
    //   this.showCalendar = false;
    // },
    //去首页
    homeTab() {
      console.log("tab首页--- ");
      uni.switchTab({
        url: "/pages/homepage/homepage",
        success: () => {
          this.closeModal();
          uni.showTabBar();
        },
      });
    },
    // 下单
    buyCar() {
      // 登录验证
      const userInfo = uni.getStorageSync("malltoken");
      if (!userInfo)
        return uni.navigateTo({
          url: "/pages/user/relogin",
        });
      // if (!this.productinfo.defaultNum)
      //   return this.upperNum("请输入每次配送数量");
      //清空
      this.V_setorderPar({
        deliveryPlanCode: "",
        goodsCode: "", //商品编码*
        goodsQty: "", //商品购买数量*
        unitPrice: "", //商品单价*
        secKillCode: "",
      });
      this.X_skill().then(() => {
        const params = {
          flag: this.X_buys === skillEnum.PROGRESSING,
        };
        const orderPar = {
          goodsCode: this.productinfo.goodscode, //商品编码*
          goodsQty: this.productinfo.max, //商品购买数量*
          unitPrice: this.productinfo.price, //商品单价*
          secKillCode: params.flag ? this.productinfo.numlist.activityCode : "", //秒杀编码
        };
        this.check({ ...this.productinfo, ...params });
        this.V_setorderPar(orderPar);

        uni.navigateTo({
          url: "/subPages/order/orderConfirm",
          success: () => {
            this.V_setShowChange(true);
            uni.showTabBar();
          },
        });
      });
      this.$emit("buyCar", this.isOpen);
    },
  },
};
</script>

<style scoped lang="scss">
// .modal-popup {
//   // position: fixed;
//   // bottom: 0;
//   // left: 0;
//   // right: 0;
//   // z-index: 9999999;
//   // height: 90%; ?.,mn
// }
.spike-price-unuse {
  text-decoration: line-through;
  font-size: 24rpx;
  color: #999;
}
.modal-out {
  // height: 70%;
  position: relative;
  top: 40rpx;
}
.info-center {
  margin-bottom: 50rpx;
  max-height: 738rpx;
}
::v-deep .search-option {
  padding: 0 32rpx;
  .hot-search {
    display: block;
    padding: 32rpx 0;
  }
  .tags-box {
    display: flex;
    justify-content: left;
    .u-tag-wrapper {
      margin-right: 32rpx;
    }
  }
}
.goods-list {
  padding: 32rpx;
}
.goods-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40rpx;
  .goods-desc {
    width: 486rpx;
  }
}
.goods-cover {
  width: 136rpx;
  height: 136rpx;
  border-radius: 24rpx;
  overflow: hidden;
  // margin-right: 32rpx;
  .goods-img {
    width: 100%;
    height: 100%;
  }
}
.popup-action {
  color: #f86c4d;
  font-size: 34rpx;
}
.goods-title {
  width: 434rpx;
  margin-right: 44rpx;
  font-size: 30rpx;
  font-weight: bold;
  line-height: 42rpx;
  max-height: 86rpx;
  color: #000;

  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
// 优惠tag
.goods-cupon-taggroup {
  width: 460rpx;
  flex-wrap: nowrap;
  padding: 16rpx 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .goods-cupon-tag {
    padding: 0rpx 8rpx;
    border-radius: 8rpx;
    border: 0.5rpx solid #f86c4d;
    color: #f86c4d;
    font-size: 22rpx;
    margin-right: 16rpx;
  }
}
.goods-action {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding-top: 32rpx;
  z-index: 100;
}
// 弹窗样式
.popup-panle {
  padding: 0 40rpx 24rpx;
  // height: 216rpx;
  width: 100%;
  border-bottom: 2rpx solid #e5e5e5;
  // position: absolute;
  // top: 0rpx;
  // background: #999999;
  //   z-index: 99999;
}
.popup-item {
  display: flex;
  // justify-content: left;
  // max-width: 570rpx;
  //   border-bottom: 1rpx solid  #E5E5E5;
  .popup-desc {
    // width: 440rpx;
    flex: 1;
    padding-left: 24rpx;
  }
}
.popup-scroll {
  padding: 34rpx 40rpx 0 40rpx;
  .popup-standard {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: baseline;
    margin-bottom: 16rpx;
    .popup-standard-title {
      width: 136rpx;
    }
    .popup-standard-group {
      flex: 1;
      justify-content: flex-start;

      display: flex;
      flex-wrap: wrap;
      .popup-standard-tag {
        min-width: 136rpx;
        height: 68rpx;
        font-weight: bold;
        background-color: #f1f1f1;
        color: #999999;
        line-height: 68rpx;
        text-align: center;
        margin-bottom: 16rpx;
        border-radius: 16rpx;
        margin-left: 32rpx;
        overflow: hidden;
      }
      // .popup-standard-tag:first-child {
      //   margin-left: 0;
      // }
      // .popup-standard-tag:nth-child(3n + 1) {
      //   margin-left: 0;
      // }
      // .popup-standard-tag:nth-child(n + 4) {
      //   margin-top: 32rpx;
      // }
      .popup-num {
        margin-bottom: 32rpx;
      }
    }
  }
  .icon-date {
    margin-left: 22rpx;
    width: 32rpx;
    height: 32rpx;
  }
  .active {
    background: #1d9bdc !important;
    color: #ffffff !important;
  }
  .devided-line {
    border-bottom: 2rpx solid #f4f4f4;
    padding-bottom: 32rpx;
  }
}
// 配送数量
.num-input {
  width: 64rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  color: #999;
  background: #e9e9e9;
  border-radius: 16rpx;
  margin: 0 16rpx;
}
.popup-standard--off {
  background-color: #f1f1f1 !important;
  color: #999999 !important;
  .popup-date {
    color: #999999 !important;
  }
}

.popup-standard-calendar {
  font-weight: bold;
  height: 68rpx;
  padding: 22rpx 32rpx;
  background: #1d9bdc;
  display: flex;
  justify-content: left;
  align-items: center;
  min-width: 270rpx;
  border-radius: 16rpx;
  .popup-date {
    padding-right: 16rpx;
    color: #ffffff;
  }
}
// 赠品
.popup-standard-gift {
  display: flex;
  justify-content: space-between;
  .gift-cover {
    width: 112rpx;
    height: 112rpx;
    border-radius: 16rpx;
    background: #f3f3f3;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .gift-goods {
    width: 358rpx;
    padding-left: 32rpx;
    .gift-goods-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333;
    }
    .gift-goods-detail {
      color: #a9a9a9;
      padding-top: 16rpx;
    }
  }
}
// 周末
::v-deep.deepweek {
  .u-checkbox-group {
    display: flex;
    width: 484rpx !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
    .u-checkbox-label--left {
      margin-top: 12rpx;
    }
  }
}
::v-deep.week-out {
  // overflow: hidden;
  position: absolute;
  width: 556rpx;
  height: 500rpx;
  background: #fff;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40rpx;
  padding: 48rpx 36rpx;
  .u-checkbox-group {
    width: 484rpx;
    flex-wrap: wrap;
    justify-content: space-between;
    .u-checkbox-label--left {
      margin-top: 12rpx;
    }
  }
  .week-day {
    line-height: 48rpx;
    margin: 10rpx;
    background: #999;
    color: #fff;
    padding: 0 8rpx;
  }
  .btn-week {
    width: 450rpx;
    height: 104rpx;
    background: #1d9bdc;
    border-radius: 254rpx;
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    color: #fff;
    line-height: 104rpx;
    margin: 0 auto;
  }
  .top-name-week {
    text-align: center;
    position: relative;
    // background: #ff0;
    font-size: 34rpx;
    font-weight: bold;
    margin-bottom: 48rpx;
    .icon-week-close {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.modal-week {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 100%;
  z-index: 90999;
}

//fc07sb
.size-out {
  background: #fff;
  padding-bottom: 8rpx;
  .active {
    border-color: #1d9bdc;
    color: #1d9bdc;
    background: #e4f4ff;
  }
  .size-title {
    margin-right: 14rpx;
  }
  .size-right-item {
    color: #666;
    width: calc((100% - 48rpx) / 3);
    height: 64rpx;
    line-height: 64rpx;
    padding: 0 20rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    border: 1rpx solid transparent;
    background: #f1f1f1;
    margin-left: 16rpx;
    margin-bottom: 16rpx;
    // white-space: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    // text-align: center;
    &.active {
      border-color: #1d9bdc;
      color: #1d9bdc;
      background: #e4f4ff;
    }
    &.align {
      text-align: center;
    }
  }
  .fc05-combo {
    padding-left: 8rpx;
    color: #999999;
    font-size: 22rpx;
    margin-bottom: 16rpx;
    .combo-img {
      width: 96rpx;
      height: 96rpx;
      border-radius: 16rpx;
      position: relative;
      border: 1rpx solid #f3f3f3;
      margin-top: 8rpx;
      margin-left: 8rpx;
      image {
        width: 100%;
        height: 100%;
      }
      .combo-nums {
        background: rgba(0, 0, 0, 0.45);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 26rpx;
        line-height: 26rpx;
        color: #fff;
        border-bottom-left-radius: 16rpx;
        border-bottom-right-radius: 16rpx;
        font-size: 22rpx;
        text-align: center;
      }
    }
    .fc05-more {
      margin-right: 16rpx;
    }
  }
  .little-tip {
    font-size: 22rpx;
    color: #999;
    margin-bottom: 8rpx;
    margin-left: 16rpx;
  }
}

.spu-padding8 {
  margin: 0 8rpx;
}
.spu-out {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
}
.active-spu {
  background: #e4f4ff !important;
  color: #1d9bdc !important;
  border: 1rpx solid #1d9bdc !important;
}
.main {
  position: relative;
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  border-radius: 40rpx 40rpx 0 0;
  // padding: 50rpx 0 96rpx 48rpx;
  padding: 48rpx 32rpx 168rpx;
  .main-1 {
    background: #1d9bdc;
  }
  .top-title {
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
  }
  .content-modal {
    margin-top: 48rpx;

    .el-text {
      // width: 204rpx;
      width: calc((100% - 32rpx) / 3);
      height: 68rpx;
      background: #f4f4f4;
      color: #666;
      line-height: 68rpx;
      text-align: center;
      border-radius: 16rpx;
      margin-bottom: 16rpx;
      margin-right: 15rpx;
      padding: 0 16rpx;
      border: 1rpx solid transparent;
    }

    .el-text:nth-child(3),
    .el-text:nth-child(6),
    .el-text:nth-child(9),
    .el-text:nth-child(12),
    .el-text:nth-child(15),
    .el-text:nth-child(18) {
      margin-right: 0;
    }
    .sku-info {
      .blod-weight {
        font-weight: bold;
        font-size: 24rpx;
        color: #000000;
      }
      margin-top: 16rpx;
      .info {
        margin-top: 16rpx;
        // display: flex;
      }
      .scroll-out {
        margin-top: 16rpx;
        max-height: 584rpx;
      }
      .sku-item-info {
        display: inline-block;
        margin: 0 7rpx 16rpx;

        width: calc((100% - 48rpx) / 3);
        background: #fff;
        border-radius: 16rpx;
        // overflow: hidden;
      }
      .sku-image {
        overflow: hidden;
        width: 100%;
        height: 214rpx;
        border-radius: 16rpx;
        background: #f3f3f3;
        border: 1px solid rgba(0, 0, 0, 0.05);
        position: relative;
        image {
          width: 100%;
          height: 100%;
        }
        .sku-num {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.45);
          border-radius: 0 0 16rpx 16rpx;
          width: 100%;
          height: 34rpx;
          text-align: center;
          color: #fff;
          font-size: 22rpx;
          line-height: 34rpx;
        }
      }
      .sku-name {
        color: #666666;
        white-space: normal !important;
        text-align: center;
        font-size: 20rpx;
        height: 54rpx;
        font-size: 20rpx;
        width: calc(100% - 28rpx);
        margin: 8rpx auto 0;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
      }
    }
  }
  .action {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14rpx 40rpx 82rpx;
    border-top: 1rpx solid #e5e5e5;
    .action-btn {
      color: #fff;
      height: 80rpx;
      background: #1d9bdc;
      border-radius: 254rpx;
      text-align: center;
      padding: 18rpx 0;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}
</style>
