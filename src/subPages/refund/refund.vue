<!-- 退款申请 -->
<template>
  <view class="refund-container">
    <!-- 中间内容填写 -->
    <view class="refund-fill">
      <view class="refund-choose">
        <view class="font-26-w refund-info">退款信息</view>
        <view class="d-flex-center d-sb refund-type">
          <view class="font-26-desc">退款类型</view>
          <view class="d-flex-center">
            <view class="type-info">
              <!-- {{infoRefund.saleType}} -->
              <!-- <text v-for="i in "></text> -->
              {{ saleTypeText[infoRefund.saleType] }}
            </view>
            <u-icon
              @tap="clickTip"
              name="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/notice_icon.png"
            ></u-icon>
          </view>
        </view>
        <view
          class="d-flex-center d-sb refund-why"
          @click="() => (show = true)"
        >
          <!-- <view class="font-26-desc">退款原因</view> -->
          <view class="font-26-desc">
            <view>退款原因</view>
            <view class="red-star">*</view>
          </view>
          <view class="d-flex-center">
            <view class="h-margin-rig16">
              <text class="u-cell-text-why" v-if="reasonType">{{
                reasonTypeText
              }}</text>
              <text v-else class="u-cell-info">请选择</text>
            </view>
            <u-icon name="arrow-right" size="13" color="#A9A9A9"></u-icon>
          </view>
        </view>

        <view
          class="d-flex-center d-sb refund-why"
          v-if="
            infoRefund.saleType === saleType.REFUND_WITHOUT_REDEEMING_MILK_CARD
          "
        >
          <view class="font-26-desc">
            <view>选择奶卡</view>
            <view class="red-star">*</view>
          </view>
          <view class="d-flex-center" @click="goMilkCards()">
            <view class="h-margin-rig16">
              <text class="u-cell-text-why" v-if="selectedMilkCard"
                >已选择{{ selectedMilkCard.length }}张</text
              >
              <text v-else class="u-cell-info">请选择</text>
            </view>
            <u-icon name="arrow-right" size="13" color="#A9A9A9"></u-icon>
          </view>
        </view>

        <view class="d-flex-center d-sb refund-money">
          <view class="font-26-desc">退款金额</view>
          <view>
            <text class="money-icon">￥</text>
            <text
              slot="value"
              class="slot-price"
              v-if="
                infoRefund.saleType !==
                saleType.REFUND_WITHOUT_REDEEMING_MILK_CARD
              "
              >{{
                infoRefund.ableRefundPayAmount > 0
                  ? infoRefund.ableRefundPayAmount
                  : 0 | noformatAmount
              }}</text
            >
            <text slot="value" class="slot-price" v-else>{{
              getSum() | noformatAmount
            }}</text>

            <!-- <uni-number-box :value="1.1" :step="0.01" /> -->
            <!-- <h-number-box 
            min="0.01"
            inputWidth="120"
            :showMinus="false"
            :showPlus="false"
            bgColor="#fff"
            color="#A9A9A9"
            decimalLength="2"
            ></h-number-box>-->
            <!-- v-model="moneyNum" -->

            <!-- <input
              class="input_money"
              type="digit"
              :placeholder="holdertext"
              placeholder-style="text-align:right"
              auto-blur="true"
              @blur="blurInputMoney"
              @input="inputMoney"
            />-->
            <!-- <u-input :placeholder="holdertext"  input-align="right" border="false" height="36rpx" type="digit"/> -->
          </view>
        </view>
        <view class="warn-notice"
          >说明:该金额为剩余可退总金额,不可修改;如需部分退款,请联系在线客服。</view
        >
      </view>
      <view class="refund-xinxi">
        <!-- 文本框 -->
        <view class="refundname">退款描述和凭证</view>
        <view class="xinxi">
          <textarea
            show-confirm-bar="false"
            v-model="applyDescription"
            placeholder="请描述退款原因..."
            maxlength="50"
            :ignoreCompositionEvent="iflag"
            @input="inputs"
            @compositionstart="compositionstart"
            @compositionend="compositionend"
            @compositionupdate="compositionupdate"
          ></textarea>
          <!-- :maxlength="max" -->
          <text class="currentWordNumber"
            >{{ currentWordNumber }}/{{ max }}</text
          >
        </view>
        <!-- <view class="refundimg">上传凭证</view> -->
        <!-- 图片上传 -->
        <view class="fill-upload">
          <u-upload
            :fileList="imgUrls"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            :multiple="true"
            :maxCount="5"
            :previewFullImage="true"
            uploadText="（最多5张）"
          ></u-upload>
        </view>
      </view>
    </view>
    <view class="select-container">
      <!-- <view class="custom-style-left" @click="cancelApplication">撤销申请</view> -->
      <view class="custom-style-btn" @click="submitApplication">提交申请</view>
    </view>
    <u-popup :show="showWhy" round="12" @close="clickTip">
      <view class="popup-why">
        <view class="top-name">
          <view class="mian-size main-font-b">退款类型</view>
          <uni-icons
            type="closeempty"
            color
            size="24"
            class="close-icon"
            @tap="clickTip"
          />
        </view>

        <view class="why-text">
          <view class="h-font-30 h-subtext">
            {{ saleTypeText[infoRefund.saleType] }}
          </view>
          <view class="sub-color">{{ saleEnumText[infoRefund.saleType] }}</view>
          <view class="action-btn" @tap="clickTip">返回</view>
        </view>
      </view>
    </u-popup>
    <!-- 选择弹出遮罩层 -->
    <u-popup
      :show="show"
      @close="close"
      @open="open"
      mode="bottom"
      :round="12"
      :closeable="true"
      :customStyle="customStyle"
    >
      <view
        class="mask-container"
        :class="
          infoRefund.sourcePlatformCode !== SOURCE_TYPE.XHJMD
            ? 'mask-container-height'
            : 'mask-container-height-shop'
        "
      >
        <view class="mask-title">
          <view>退款原因</view>
          <img
            @click="sureClick"
            class="close-icon"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/shop/close_1.png"
            alt
          />
        </view>
        <view class="option-box">
          <!-- 单选内容 -->
          <u-radio-group
            v-model="radioValue"
            iconPlacement="right"
            placement="column"
            v-if="infoRefund.sourcePlatformCode !== SOURCE_TYPE.XHJMD"
          >
            <u-radio
              v-for="(item, index) in radioList"
              :key="index"
              :name="item.name"
              :label="item.label"
              labelSize="14px"
              icon-size="48rpx"
              size="48rpx"
              activeColor="#1D9BDC"
              @change="radioChange(item)"
              :customStyle="{
                width: '663rpx',
                display: 'flex',
                height: '94rpx',
                alignItems: 'center',
                fontSize: '14px',
                fontFamily: 'PingFang SC-Regular, PingFang SC',
                fontWeight: 400,
                color: '#666666',
                lineHeight: '32rpx',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f4f4f4',
              }"
            ></u-radio>
          </u-radio-group>
          <u-radio-group
            v-model="radioValue"
            iconPlacement="right"
            placement="column"
            v-else
          >
            <u-radio
              v-for="(item, index) in radioListShop"
              :key="index"
              :name="item.name"
              :label="item.label"
              labelSize="14px"
              icon-size="48rpx"
              size="48rpx"
              activeColor="#1D9BDC"
              @change="radioChange(item)"
              :customStyle="{
                width: '663rpx',
                display: 'flex',
                height: '94rpx',
                alignItems: 'center',
                fontSize: '14px',
                fontFamily: 'PingFang SC-Regular, PingFang SC',
                fontWeight: 400,
                color: '#666666',
                lineHeight: '32rpx',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f4f4f4',
              }"
            ></u-radio>
          </u-radio-group>
        </view>
        <!-- 下方确定按钮 -->
        <view class="radio-btn-wrap">
          <view class="btn-confirm" @tap="sureClick">确定</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { refund } from "@/utils/url";
import {
  refunfReason,
  refunfReasonText,
  combGoods,
  saleTypeText,
  saleType,
  saleEnumText,
  RefundReasonEnum,
  RefundReasonEnumText,
  SOURCE_TYPE,
} from "@/utils/enum";
import { formatAmount, noformatAmount } from "@/utils/utils";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      SOURCE_TYPE,
      iflag: false,
      value2: "",
      submitFlag: false, //是否点击退款
      moneyNum: "", //金额
      saleEnumText,
      saleTypeText,
      saleType,
      max: 50,
      min: 0,
      currentWordNumber: 0,
      combGoods,
      info: {},
      applyAmount: 0,
      applyDescription: "",
      imgUrl: [],
      mainOrderNo: "",
      reasonType: null,
      reasonTypeText: "",
      choseReason: {},
      type: "ONLY_REFUND",
      imgUrls: [], //图片上传
      imgs: [],
      areaVal: "", //文本框输入值
      show: false, //退款原因遮罩层显隐
      titleStyle: {
        //cell 标题样式
        fontSize: "26rpx",
        fontFamily: "PingFang SC-Medium, PingFang SC",
        fontWeight: "bold",
        color: "#000000",
        lineHeight: "32px",
      },
      //   单选项配置
      radioList: [
        {
          name: refunfReason.ONE,
          label: refunfReasonText.ONE,
          disabled: false,
        },
        {
          name: refunfReason.TWO,
          label: refunfReasonText.TWO,
          disabled: false,
        },
        {
          name: refunfReason.THREE,
          label: refunfReasonText.THREE,
          disabled: false,
        },
        {
          name: refunfReason.FOUR,
          label: refunfReasonText.FOUR,
          disabled: false,
        },
      ],
      radioListShop: [
        {
          name: RefundReasonEnum.NOT_WANT,
          label: RefundReasonEnumText.NOT_WANT,
          disabled: false,
        },
        {
          name: RefundReasonEnum.INFO_IS_ERROR,
          label: RefundReasonEnumText.INFO_IS_ERROR,
          disabled: false,
        },
        {
          name: RefundReasonEnum.QUALITY_PROBLEM,
          label: RefundReasonEnumText.QUALITY_PROBLEM,
          disabled: false,
        },
        {
          name: RefundReasonEnum.OUT_OFF_STOCK,
          label: RefundReasonEnumText.OUT_OFF_STOCK,
          disabled: false,
        },
        {
          name: RefundReasonEnum.NOT_SUPPLY_ON_TIME,
          label: RefundReasonEnumText.NOT_SUPPLY_ON_TIME,
          disabled: false,
        },
        {
          name: RefundReasonEnum.OTHER,
          label: RefundReasonEnumText.OTHER,
          disabled: false,
        },
      ],
      // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
      radioValue: "多拍、拍错、不想要",
      showWhy: false,
      loading: false,
      orderNo: "", //订单编号
      refundAmount: null, //奶卡可退金额
    };
  },
  onLoad(option) {
    this.orderNo = option.orderNo;
  },
  onShow() {
    this.getDetail(this.orderNo);
  },
  computed: {
    ...mapState("refund", ["infoRefund", "selectedMilkCard"]),
    // holdertext() {
    //   return `最多可输入${formatAmount(this.infoRefund.payAmount)}`;
    // },
  },
  methods: {
    ...mapMutations("refund", [
      "X_setRefundInfo",
      // "X_setSelectedMilkCard",
      "clearSelectedMilkCard",
    ]),

    //输入中文监听
    compositionend(e) {
      console.log("e-结束", e);
    },
    einput(e) {
      console.log("e输入", e);
    },
    compositionstart() {
      console.log("e-开始", e);
    },
    compositionupdate(e) {
      console.log("e--完成了", e);
    },
    // 计算选取奶卡总金额
    getSum() {
      let sum = 0;

      this.selectedMilkCard &&
        this.selectedMilkCard.forEach(function (item) {
          sum += item.payAmount;
        });
      return sum;
    },
    // 跳转奶卡列表
    goMilkCards() {
      console.log(88);
      uni.navigateTo({
        url: `/subPages/refund/milkCards?orderNo=${this.orderNo}`,
      });
    },
    // 计算输入框字数
    inputs(e) {
      console.log("this.currentWordNumber", this.currentWordNumber);
      // if (this.currentWordNumber == this.max) return;
      console.log("e.detail.value", e.detail);
      let value = e.detail.value;
      this.currentWordNumber = this.applyDescription.length;
      // let len = parseInt(value.length);
      const len = e.detail.cursor;
      // this.currentWordNumber = len;
      if (len >= this.max) {
        const val = value.slice(0, 49);
        console.log("val", val);
        this.applyDescription = val;
        // value.slice(0, 49);

        this.currentWordNumber = this.max;
        uni.showToast({
          title: "您输入的内容字数已达上限",
          icon: "none",
          duration: 1500,
        });
      }
    },
    showMoneyToast() {
      uni.showToast({
        title: "超过最高可退金额",
        icon: "none",
        duration: 2000,
        // success: () => {},
      });
    },
    //金额输入失焦
    blurInputMoney(e) {
      // console.log("this.moneyNum-->", this.moneyNum);
      console.log("e.detail.value---失焦", e.detail.value);
      this.moneyNum = e.detail.value;
      if (+this.moneyNum * 100 > this.infoRefund.payAmount) {
        return noformatAmount(this.infoRefund.payAmount);
      }
    },
    inputMoney(e) {
      console.log("this.moneyNum", e.detail.value);

      let _value = e.detail.value;
      if (_value * 100 > this.infoRefund.payAmount) {
        this.showMoneyToast();

        return noformatAmount(this.infoRefund.payAmount);
      }
      _value = _value.includes(".")
        ? _value.substring(0, _value.indexOf(".") + 3)
        : _value; //保留小数点后2位
      // console.log("onInput _value after: ", _value);
      // this.$set(this.inputPrice, index, _value);
      // this.moneyNum = _value;
      console.log("this.moneyNum", this.moneyNum, "------>", _value);
      return _value;

      // if (+this.moneyNum * 100 > this.infoRefund.payAmount) {
      //   this.moneyNum = noformatAmount(this.infoRefund.payAmount);
      //   return this.showMoneyToast();
      // } else {
      //   let reg = /^([1-9]+[\d]*(.[0-9]{1,2})?)$/;
      //   const price = e.detail.value.match(reg);
      //   console.log(" 小于", price);

      //   return (this.moneyNum = price);
      // }
    },
    //打开售后类型提示
    clickTip() {
      this.showWhy = !this.showWhy;
    },

    // 获取退款类型和退款金额
    async getDetail(orderNo) {
      try {
        console.log("first");
        const { data } = await this.GET(refund.getRefundInfo + `/${orderNo}`);
        this.X_setRefundInfo(data);
        console.log(data);
      } catch (error) {}
    },
    // 删除图片
    deletePic(event) {
      this.imgUrls.splice(event.index, 1);
      this.imgs.splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      console.log("event", event);
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      console.log("lists", lists);
      lists.map((item) => {
        this.imgUrls.push({
          ...item,
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const { data } = await this.UPLOADFILE(lists[i].url);
        this.imgs = [...this.imgs, data];
      }
      console.log(this.imgs, "地址数组");
    },

    // 关闭遮罩层
    open() {
      console.log("打开遮罩层");
    },
    close() {
      this.show = false;
    },

    radioChange(item) {
      console.log(item, "0000");
      this.choseReason = item;
    },
    // 确定退款原因
    sureClick() {
      this.reasonType = this.choseReason.name;
      this.reasonTypeText = this.choseReason.label;
      this.show = false;
      console.log(this.radioValue);
    },
    // 撤销申请
    cancelApplication() {
      console.log("撤销申请");
    },
    // 提交申请
    submitApplication() {
      this.accfn();
    },
    async accfn() {
      try {
        let para = {
          imgUrlList: this.imgs,
          orderNo: this.infoRefund.orderNo || this.orderNo,
          // 根据订单类型不同退款金额不同
          refundAmount: this.infoRefund.ableRefundPayAmount,
          reason: this.reasonTypeText,
          saleType: this.infoRefund.saleType,
          refundDescribe: this.applyDescription,
          orderNode: this.infoRefund.orderNo,
        };
        if (
          this.infoRefund.saleType ===
          saleType.REFUND_WITHOUT_REDEEMING_MILK_CARD
        ) {
          const list = this.selectedMilkCard.map((el) => {
            return el.milkCardNo;
          });
          if (list.length === 0) {
            return uni.showToast({
              icon: "none",
              title: "请选择奶卡",
              duration: 3000,
            });
          } else {
            para.milkCardList = list;
          }
        }
        if (this.reasonTypeText === "") {
          return uni.showToast({
            icon: "none",
            title: "退款原因不能为空",
            duration: 3000,
          });
        }
        console.log("para", para);

        const { data, msg } = await this.POST(
          this.infoRefund.saleType ===
            saleType.REFUND_WITHOUT_REDEEMING_MILK_CARD
            ? refund.applyRefundMilkCard
            : refund.applyAfterSale,
          para
        );
        console.log("data", data, msg);
        this.submitFlag = true;
        this.clearSelectedMilkCard();
        uni.showToast({
          icon: data ? "success" : "none",
          title: msg,
          duration: 1500,
        });
        if (data) {
          console.log(this.infoRefund, "99999");
          setTimeout(() => {
            uni.redirectTo({
              url: `/subPages/refund/result?afterSaleNo=${data.afterSaleNo}&orderNo=${data.orderNo}&type=${data.type}&tagType=${this.infoRefund.tagType}`,
            });
          }, 1500);
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
      } finally {
        uni.hideLoading({ noConflict: true });
      }
    },
  },
  // 初始化
  created() {},
  //   视图改变
  updated() {
    console.log(this.areaVal);
  },
};
</script>

<style lang="scss" scoped>
.refund-container {
  background: #f5f5f5;
  padding: 24rpx 32rpx;
  height: 100vh;
  font-family: PingFang SC-Medium, PingFang SC;
}

//   中间退款填写
.refund-fill {
  margin-bottom: 228rpx;
  .refund-choose {
    border-radius: 24rpx;
    padding: 0 32rpx;
    padding-top: 32rpx;
    background: #fff;
    margin-bottom: 24rpx;
  }
  .refund-type {
    padding-bottom: 24rpx;
    border-bottom: 2rpx solid #f4f4f4;
    .type-info {
      //color: #f86c4d;
      color: #333;
      font-weight: bold;
      margin-right: 16rpx;
    }
  }
  .refund-why {
    padding: 24rpx 0;
    border-bottom: 2rpx solid #f4f4f4;
  }
  .refund-money {
    padding: 24rpx 0;
  }

  .refund-xinxi {
    .refundname {
      font-weight: bold;
      margin-bottom: 16rpx;
    }
    border-radius: 24rpx;
    padding: 32rpx 32rpx 24rpx;
    background: #fff;
    // 输入框
    .xinxi {
      padding: 16rpx;
      width: 100%;
      min-height: 80rpx;
      position: relative;
      z-index: 0;
      border: 2rpx solid #f8f8f8;
      background: #fafafa;
    }
    .xinxi > textarea {
      width: 100%;
      height: 120rpx;
      // padding-left: 32rpx;
      // text-indent: 4;
      background: #fafafa;
    }
    .currentWordNumber {
      position: absolute;
      bottom: 16rpx;
      right: 16rpx;
      color: #888;
    }
    .refundimg {
      @extend.refundname;
      margin-top: 24rpx;
    }
  }
}
// 修改列表
::v-deep .u-cell {
  font-size: 26rpx;
  .u-cell__body {
    padding: 32rpx 0rpx 32rpx 0;
    .u-cell__title-text {
      line-height: 32rpx !important;
    }
  }
}
//   下方选择按钮
.select-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 2rpx solid #e5e5e5;
  height: 228rpx;
  background: #fff;
  padding-top: 32rpx;
  z-index: 9999;
  // .custom-style-left {
  //   width: 310rpx;
  //   height: 94rpx;
  //   font-weight: 500;
  //   font-size: 16px;
  //   color: #1d9bdc;
  //   text-align: center;
  //   line-height: 94rpx;
  //   border: 2rpx solid #1d9bdc;
  //   border-radius: 254rpx;
  // }
  .custom-style-btn {
    width: 670rpx;
    height: 104rpx;
    font-weight: bold;
    font-size: 16px;
    background: #1d9bdc;
    color: #fff;
    text-align: center;
    line-height: 104rpx;
    border: 2rpx solid #1d9bdc;
    border-radius: 254rpx;
    margin: 0 auto;
  }
}

// 遮罩层
.mask-container-height {
  height: 723rpx;
}
.mask-container-height-shop {
  max-height: 80vh;
}
.mask-container {
  //   遮罩层样式
  // height: 723rpx;
  //height: 80vh;
  box-shadow: 0px 7px -7px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: static;
  z-index: 100;

  .mask-title {
    width: 100%;
    height: 43rpx;
    font-size: 34rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: bold;
    color: #000;
    line-height: 36rpx;
    margin-top: 20rpx;
    margin-bottom: 28rpx;
    padding-left: 308rpx;
    padding-right: 38rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close-icon {
      width: 32rpx;
      height: 32rpx;
    }
  }

  .radio-style ::v-deep {
    border-bottom: 2px solid #f4f4f4;
    height: 94rpx;
  }
  .radio-btn-wrap {
    width: 663rpx;
    margin: 100rpx 43rpx 96rpx;
    height: 94rpx;
    background: #fff;
    .btn-confirm {
      // padding: 28rpx 302rpx;
      text-align: center;
      // padding: 28rpx 0;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 254rpx;
      background: #1d9bdc;
      color: #fff;
      font-size: 32rpx;
      font-weight: bold;
    }
    // .radio-btn {
    //   width: 62rpx;
    //   height: 43rpx;
    // }
  }
}
.u-cell-start {
  padding: 0 8rpx;
  color: #f00;
}
.u-cell-info {
  // font-size: 26rpx;
  color: #999;
}
.goods-comb-tag {
  width: 60rpx;
  height: 30rpx;
  background-color: #1d9bdc;
  border-color: #1d9bdc;
  color: #fff;
  font-size: 22rpx;
  line-height: 30rpx;
  border-radius: 16rpx 0rpx 16rpx 0rpx;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.goods-gift-tag {
  width: 60rpx;
  height: 30rpx;
  background-color: #ffcd5f;
  border-color: #ffcd5f;
  color: #333;
  font-size: 22rpx;
  line-height: 30rpx;
  border-radius: 16rpx 0rpx 16rpx 0rpx;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.input_money {
  text-align: right;
  color: #333333;
  font-weight: bold;
}
.u-cell-text {
  font-weight: bold;
  color: #000;
  font-size: 26rpx;
}
.u-cell-text-why {
  color: #666666;
  font-weight: normal;
}
.popup-why {
  // background: #1d9bdc;
  padding: 40rpx;
  .top-name {
    text-align: center;
    position: relative;
    .close-icon {
      position: absolute;
      right: 0;
      top: -2rpx;
    }
  }
  .why-text {
    margin-top: 32rpx;
    .action-btn {
      margin-top: 100rpx;
      text-align: center;
      height: 104rpx;
      color: #fff;
      font-size: 34rpx;
      font-weight: bold;
      background: #1d9bdc;
      border-radius: 254rpx;
      line-height: 104rpx;
    }
  }
}
.warn-notice {
  color: #a9a9a9;
  padding-bottom: 16rpx;
}
.refund-info {
  margin-bottom: 16rpx;
}
.font-26-desc {
  font-size: 26rpx;
  color: #666666;
  display: flex;
  align-items: center;
}
.money-icon {
  font-size: 22rpx;
  color: #f86c4d;
  font-weight: bold;
}
.slot-price {
  font-size: 26rpx;
  color: #f86c4d;
  font-weight: bold;
}
.fill-upload {
  margin-top: 24rpx;
}
.option-box {
  height: 70vh;
  overflow: scroll;
}
.red-star {
  color: rgba(248, 108, 77, 1);
  padding-left: 4rpx;
  line-height: 32rpx;
}
</style>
