<template>
  <view class="gift-card-out">
    <hDefault :topName="topName.title" />
    <view class="gift-main d-flex-colum" :style="{ top: mainTop }">
      <!-- 卡面主题 -->
      <view class="gift-card-them">
        <view class="card-them-img">
          <text class="get-card-no" v-if="options.from == 'scan'"
            >卡号：{{ cardInfo.milkCardNo }}</text
          >
          <img :src="getAssetImgUrl(cardInfo.url)" alt="" />
        </view>
        <view class="them-text">{{ cardInfo.cardTitle }}</view>
      </view>
      <!-- 卡面信息 -->
      <view class="card-info-main flex-1" v-if="options.from == 'scan'">
        <!-- 领取 -->
        <cardInfo :data="cardInfo" :userInfo="userInfo" />
      </view>
      <view
        v-else-if="options.from == 'local' || 'none'"
        class="flex-1 card-input-main"
      >
        <!-- 赠送 -->
        <cardInput
          ref="cardInput"
          :data="cardInfo"
          :value="selectVal"
          @onChooseStr="onChooseStr"
          @onInput="onInput"
        />
      </view>
      <view class="btn-fix">
        <cardBtn
          @onClickSend="onClickSend"
          :btnText="topName.btnText"
          :typeText="options.from"
        />
        <view class="bottom-text" v-if="options.from === 'scan'"
          >1天内未确认，将退还给对方。<text @tap="rejectCard">拒收</text></view
        >
      </view>
    </view>

    <!-- 赠品弹出 -->
    <hPop :show="showGift && cardGift.length" @close="onCloseGift">
      <view class="gift-slot" :style="{ height: modalH }">
        <view class="title-gift"> 是否赠送额外赠品？ </view>
        <view class="gift-pop-main flex-1">
          <view
            class="gift-main-item d-flex"
            v-for="(i, index) in cardGift"
            :key="index"
          >
            <view class="left-view">
              <img :src="getAssetImgUrl(i.imageUrl)" alt="" class="gift-img" />
              <text class="gift-tag-icon">赠品</text>
            </view>
            <view class="d-flex-colum d-sb">
              <view class="gift-name-goods h-overflow-8-2">{{
                i.giftGoodsName
              }}</view>
              <view class="gift-num-goods">数量：{{ i.giftGoodsItems }}</view>
            </view>
          </view>
        </view>
        <view class="d-flex-center d-sb action-btn">
          <view class="cancel-btn" @tap.stop="onCloseGift">取消</view>
          <view class="sure-btn" @tap.stop="onYesGift">确认</view>
        </view>
      </view>
    </hPop>
  </view>
</template>

<script>
import { formatTime } from "@/utils/utils";
import hDefault from "../components/h-default/index.vue";
import cardInfo from "./card-info.vue";
import cardInput from "./card-input.vue";
import cardBtn from "./btn-card.vue";
import { mapState, mapActions } from "vuex";
import { milkCard } from "@/utils/url";
import { BaseApp } from "@/const/appIdConf";
import hPop from "../components/pop/index.vue";
import api from "@/utils/api";
let timer = null;
export default {
  components: {
    hDefault,
    cardInfo,
    cardInput,
    cardBtn,
    hPop,
  },
  data() {
    // 这里存放数据
    return {
      // sihit: [
      //   { imageUrl: null, giftGoodsName: "测试1", giftGoodsItems: 10 },
      //   { imageUrl: null, giftGoodsName: "测试1", giftGoodsItems: 10 }
      // ],
      isGift: false, //是否送赠品
      options: {
        from: "scan",
      }, // scan-扫码进入, local-本地跳转
      blessTextArr: [], // 祝福语选择
      selectVal: "", // 祝福语
      showGift: false,
      modalH: "0px",
    };
  },
  watch: {
    options(val, oldVal) {
      if (!this.selectVal && val.from == "local") {
        this.showGift = true;
        return (val.from = "none");
      } else if (this.selectVal && val.from == "none") {
        return (val.from = "local");
      }
    },
    selectVal(val) {
      if (val) {
        this.options.from = "local";
      }
    },
  },
  // 计算属性-缓存 类似于data概念
  computed: {
    ...mapState("milkcard", ["cardInfo", "cardGift"]),
    ...mapState("user", ["loginStatus", "userInfo"]),
    mainTop() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      const { windowHeight } = uni.getSystemInfoSync();
      const { height, top } = menuButtonInfo;
      this.modalH = windowHeight * 0.62 + "px";
      return height + top + 6 + "px";
    },
    // 导航标题
    topName() {
      switch (this.options.from) {
        case "scan":
          return {
            title: "领取礼品",
            btnText: "立即领取，加入卡包",
          };
        case "local":
          return {
            title: "赠送好友",
            btnText: "立即送出",
          };
        default:
          return {
            title: "赠送好友",
            btnText: "立即送出",
          };
      }
    },
  },
  async onLoad(options) {
    await this.$onLaunched;
    this.options = options;
    console.log(options, "options");
    this.get_CardInfo(this.options.id);
  },
  onShareAppMessage() {
    // return;
    // const url = this.getAssetImgUrl(BaseApp.milkCardShareImg);
    const conf = {
      title: "送您一张奶卡",
      path: `/child-pages/send-gift-card/index?from=scan&id=${this.options.id}`,
      // imageUrl: this.getAssetImgUrl(BaseApp.milkCardShareImg),
      // imageUrl: this.getAssetImgUrl(this.cardInfo.url),
      imageUrl:
        this.cardInfo.shareUrl || this.getAssetImgUrl(this.cardInfo.url),
    };
    console.log("conf", conf);
    return conf;
  },
  // 方法集合
  methods: {
    formatTime,
    ...mapActions("milkcard", ["get_CardInfo", "get_CardDetail"]),
    onCloseGift(e) {
      this.showGift = false;
      this.isGift = false;
    },
    onYesGift() {
      this.showGift = false;
      this.isGift = true;
    },
    onChooseStr(val) {
      // 选中的祝福语
      console.log("获取到的值---》", val);
      if (this.selectVal.length >= 50)
        return uni.showToast({
          title: "最多输入50字",
          icon: "none",
          success: () => {
            this.selectVal = this.selectVal.slice(0, 50);
          },
        });
      this.selectVal += val;
    },
    onInput(val) {
      this.selectVal = val;
      console.log("val", val, "输入", this.selectVal);
    },
    //  立即送出
    async onClickSend() {
      try {
        clearTimeout(timer);
        timer = null;
        console.log("点击领取", this.loginStatus, this.selectVal);
        if (!this.loginStatus)
          return uni.navigateTo({
            url: "/pages/user/relogin",
          });
        if (this.options.from === "scan") {
          // uni.showToast({
          //   title: "领取成功",
          //   icon: "none",
          // });

          try {
            const { data } = await this.POST(
              `${milkCard.getMilkCard}${this.options.id}`
            );
            console.log("data--领取", data);
            uni.showModal({
              title: "",
              content: "领取成功",
              cancelText: "查看卡包",
              confirmText: "去使用",
              success: async (result) => {
                console.log(result);
                const { confirm, cancel } = result;
                if (cancel) {
                  uni.redirectTo({
                    url: "/child-pages/card-wallet/index",
                  });
                }
                if (confirm) {
                  await this.get_CardDetail({ ...data });
                  const params = {
                    flag: true,
                    order: data.milkCardNo,
                    milkCardItemNo: data.milkCardItemNos,
                  };
                  uni.redirectTo({
                    //兑换，商品详情
                    url: `/child-pages/goods-detail/index?milkCardNo=${
                      data.milkCardNo
                    }&params=${JSON.stringify(params)}`,
                  });
                }
              },
            });
          } catch (e) {
            uni.showToast({ title: e.msg, icon: "none" });
            //
          }
          return;
        }
        if (!this.selectVal) {
          // this.options.form = "none";
          return uni.showToast({
            title: "请输入祝福语",
            icon: "none",
          });
        } else {
          const cnm = {
            id: this.options.id,
            message: this.selectVal,
            gift: this.isGift,
          };
          // 确认送出
          await this.POST(milkCard.giveMilkCard, {
            id: this.options.id,
            message: this.selectVal,
            gift: this.isGift,
          });
          timer = setTimeout(() => {
            this.onConfirmSend();
          }, 2000);
        }
        // if (this.options.from === "local") {
        //   if (!this.selectVal) {
        //     return uni.showToast({
        //       title: "请输入祝福语",
        //       icon: "none",
        //     });
        //   }
        //   timer = setTimeout(() => {
        //     this.onConfirmSend();
        //   }, 2000);
        // }
      } catch (err) {
        //
      }
    },
    // 确认送出弹窗
    onConfirmSend() {
      try {
        uni.showModal({
          title: "",
          content: "是否赠送成功？",
          cancelText: "否",
          confirmText: "是",
          success: async (result) => {
            clearTimeout(timer);
            timer = null;
            console.log(result);
            const { confirm } = result;
            if (confirm) {
              uni.navigateTo({
                url: "/child-pages/card-wallet/index",
              });
            } else {
              await this.GET(`${milkCard.milkCardGiveFail}${this.options.id}`);
              uni.showToast({ title: "操作成功", icon: "none" });
            }
          },
        });
      } catch (err) {
        //
      }
    },
    rejectCard() {
      try {
        uni.showModal({
          title: "",
          content: "确定拒收礼品？",
          cancelText: "暂不拒收",
          confirmText: "拒收",
          success: async (result) => {
            console.log(result, "result");
            try {
              const { confirm } = result;
              if (confirm) {
                console.log("开始请求");
                const data = await api.$get(
                  `${milkCard.milkCardReject}${this.options.id}`,
                  {}
                );
                if (data.code == 108) {
                  uni.navigateTo({
                    url: "/pages/user/relogin",
                  });
                  return;
                }
                uni.showToast({ title: "拒收成功", icon: "none" });
                uni.switchTab({
                  url: "/pages/homepage/homepage",
                });
              }
            } catch (e) {
              uni.showToast({ title: e.msg, icon: "none" });
            }
          },
        });
      } catch (err) {
        //
      }
    },
  },
};
</script>
<style scope lang="scss">
.gift-card-out {
  height: 100vh;
  background-color: #f5f5f5;
  //   background-color: #f0a;
  .gift-main {
    overflow: auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    // background: #f0f;
    padding: 80rpx 0 0;
    .gift-card-them {
      width: 100%;
      padding: 0 54rpx;
      text-align: center;
      position: relative;
      .get-card-no {
        position: absolute;
        top: 0;
        // left: 22rpx;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        color: #ffffff;
        padding: 12rpx;
        border-top-left-radius: 24rpx;
        border-bottom-right-radius: 24rpx;
        z-index: 9;
      }
      .card-them-img {
        width: 100%;
        height: 360rpx;
        margin-bottom: 24rpx;
        overflow: hidden;
        border-radius: 24rpx;
        overflow: hidden;
        position: relative;
        > image {
          width: 100%;
          height: 100%;
          border-radius: 24rpx;
        }
      }
      .them-text {
        font-weight: bold;
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 32rpx;
      }
    }

    // 卡面信息
    .card-info-main {
      padding: 24rpx 48rpx;
      background: #ffffff;
    }
    .card-input-main {
      padding: 0 32rpx;
      margin-bottom: 212rpx;
    }
    // 按钮
    .btn-fix {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 80rpx;
      padding: 0 40rpx;
      z-index: 99;
    }
  }
  .bottom-text {
    margin-top: 32rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #a9a9a9;
    line-height: 35rpx;
    text-align: center;
    > text {
      font-weight: 500;
      color: #ec4747;
    }
  }
}
.gift-slot {
  padding: 42rpx 0rpx;
  display: flex;
  flex-direction: column;
  .title-gift {
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    margin-bottom: 24rpx;
  }
  .gift-pop-main {
    overflow: auto;
    padding: 0 48rpx;
    .gift-main-item {
      padding-bottom: 18rpx;
      border-bottom: 2rpx solid #f1f1f1;
      margin-top: 24rpx;
      .gift-img {
        width: 148rpx;
        height: 148rpx;
        border-radius: 0;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .action-btn {
    border-top: 2rpx solid #f1f1f1;
    width: 100%;
    padding: 16rpx 40rpx 0;
    .cancel-btn,
    .sure-btn {
      flex: 1;
      text-align: center;
      height: 80rpx;
      vertical-align: middle;
      font-size: 32rpx;
      font-weight: bold;
      border-radius: 254rpx;
      line-height: 80rpx;
    }
    .cancel-btn {
      border: 2rpx solid #1d9bdc;
      color: #1d9bdc;
      background: #ffffff;
      margin-right: 13rpx;
    }
    .sure-btn {
      color: #ffffff;
      background: #1d9bdc;
      margin-left: 13rpx;
    }
  }
}
.left-view {
  position: relative;
  border: 1rpx solid #f3f3f3;
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  margin-right: 16rpx;
  .gift-tag-icon {
    background: #ffcd5f;
    width: 60rpx;
    height: 30rpx;
    color: #000000;
    font-size: 22rpx;
    border-radius: 16rpx 0rpx 16rpx 0rpx;
    text-align: center;
    line-height: 30rpx;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.gift-name-goods {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}
.gift-num-goods {
  color: #666666;

  font-size: 26rpx;
}
// .gift-main {
// .gift-img {
//   width: 148rpx;
//   height: 148rpx;
//   border: 1rpx solid #f3f3f3;
//   border-radius: 24rpx 24rpx 24rpx 24rpx;
//   margin-right: 16rpx;
// }
// }
</style>
