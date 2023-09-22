<template>
  <view class="ticket-out">
    <view class="main-ticket d-flex-center">
      <view class="main-left d-flex-center d-center">
        <view class="left-item">
          <view class="item-money"
            ><text
              class="icon-money"
              v-if="
                couponInfo.couponStrategyVo.couponType === 0 ||
                couponInfo.couponStrategyVo.couponType === 1
              "
              >￥</text
            >
            <text
              class="big-money"
              :class="[ojbk.money.length > 5 && 'big-money-small']"
              >{{ ojbk.money }}</text
            >
            <text
              class="icon-money"
              v-if="
                couponInfo.couponStrategyVo.couponType === 2 ||
                couponInfo.couponStrategyVo.couponType === 3
              "
              >折</text
            ></view
          >
          <view class="full-money">{{ ojbk.fullMoney }} </view>
        </view>
      </view>
      <view class="main-right d-flex-center">
        <view class="right-1 d-flex-colum d-center">
          <view class="tip-name h-over-1">
            {{ ojbk.couponName }}
          </view>
          <view class="tip2">{{ ojbk.useType }}</view>
          <view class="tip-time">
            {{ ojbk.couponLefts }}
            <!-- <text>{{ couponInfo.startTime }}-</text>
            <text>{{ couponInfo.endTime }}</text> -->
          </view>
        </view>
        <view class="right-2 d-flex-colum-center d-center">
          <view>
            需<text class="num_get">{{ ojbk.needScore }}</text
            >积分
          </view>
          <view
            class="btn"
            @tap="getTicket"
            :class="[
              couponInfo.couponStrategyVo.totalAmountLimit === 1 && 'btn-nomal',
            ]"
            >{{ btnText ? btnText : ojbk.overText }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    // 优惠券信息
    couponInfo: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      btnText: "",
    };
  },
  computed: {
    ojbk() {
      const obj = {};
      if (this.couponInfo && this.couponInfo.couponStrategyVo) {
        const info = this.couponInfo;
        const vo = this.couponInfo.couponStrategyVo;
        // 满减-满折
        if (vo.couponType === 0 || vo.couponType === 1) {
          obj.money = this.noformatAmount(vo.reduced, true);
        } else if (vo.couponType === 2 || vo.couponType === 3) {
          obj.money = vo.reduced ? vo.reduced : "暂无";
        }
        // if()
        //满足金额
        obj.fullMoney =
          vo.condtionType === 1
            ? "无门槛"
            : vo.condtionType === 2
            ? "满" + this.noformatAmount(vo.condtionAmount, true) + "可用"
            : "";
        //优惠券名字
        obj.couponName = this.couponInfo.name;
        //全部还是部分商品可用
        obj.useType =
          info.allProducts === 1
            ? "全部商品可用"
            : info.allProducts === 2
            ? "部分商品可用"
            : "";
        //兑换所需积分
        obj.needScore = vo.point;
        //优惠券生命周期
        obj.couponLefts =
          vo.valid === 2
            ? `领取后${vo.validDays}天有效`
            : vo.valid === 1
            ? `${vo.effectiveTime}-${vo.deadTime}`
            : "";
        // 是否领取完
        obj.overText = vo.totalAmountLimit === 0 ? "兑换" : "已兑完";
        return obj;
      }
    },
    // 获取节点信息的对象 nodesRef.fields(object,callback)
    // getDomInfo() {
    //   const nodes = uni.createSelectorQuery().in(this).select(".item-money");
    //   const objNode = nodes
    //     .fields(
    //       {
    //         dataset: true,
    //         rect: true,
    //         scrollOffset: true,
    //         context: true,
    //         size: true,
    //       },
    //       (res) => {
    //         console.log("res1", res);
    //       }
    //     )
    //     .exec();
    //   console.log("nodes", nodes, "objNode", objNode);
    // },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    getTicket() {
      console.log("领取", this.ojbk.needScore);
      // this.btnText = "继续领";
      this.$emit("getTicket", {
        code: this.couponInfo.code,
        num: this.ojbk.needScore,
      });
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.ticket-out {
  .main-ticket {
    height: 162rpx;
    width: 100%;
    // border: 1rpx solid #f0f;
    background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/member/ticket_bg.png")
      no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .main-left {
    width: 208rpx;
    height: 100%;
    // background: #f00;
    color: #b06c1d;
    .left-item {
      width: 100%;
      padding: 0 10rpx 0 18rpx;
      overflow: hidden;
      // overflow-x: auto;
      text-align: center;
    }

    .item-money {
      white-space: nowrap;
      // overflow-x: auto;
    }
    .icon-money {
      color: #b06c1d;
      font-size: 26rpx;
      font-weight: normal;
    }
    .big-money {
      font-size: 60rpx;
      font-weight: bold;
    }
    .big-money-small {
      font-size: 42rpx;
      font-weight: bold;
    }
    .full-money {
      color: #b98f5d;
      font-size: 22rpx;
      text-align: center;
    }
  }
  .main-right {
    flex: 1;
    height: 100%;
    // background: #0f0;
    .right-1 {
      flex: 1;
      height: 100%;
      padding: 0 24rpx;
      overflow: hidden;
      //   background: #ff0;
      .tip-name {
        color: #533417;
        font-size: 30rpx;
        font-weight: bold;
      }
      .tip2 {
        color: #b98f5d;
        margin: 10rpx 0;
      }
      .tip-time {
        font-size: 24rpx;
        color: #cbad8a;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .right-2 {
      width: 186rpx;
      height: 100%;
      //   background: #000;
      color: #b98f5d;
      font-size: 22rpx;
      .num_get {
        color: #533417;
      }
      .btn {
        width: 120rpx;
        height: 48rpx;
        border-radius: 24rpx;
        background: linear-gradient(90deg, #99733d 0%, #533417 100%);
        color: #fff;
        font-size: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 12rpx;
      }
      .btn-nomal {
        background: #c7c7c7;
        color: #333333;
      }
    }
  }
}
</style>