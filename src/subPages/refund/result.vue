<template>
  <view>
    <h-none
      :cover="cover"
      :title="title"
      :note="note"
      :backBtn="backBtn"
      :forwardBtn="forwardBtn"
      :backUrl="backUrl"
      :forwardUrl="forwardUrl"
      :order="order"
    ></h-none>
  </view>
</template>
<script>
import hNone from "@/components/h-none/h-none.vue";
import { mapActions } from "vuex";
import {
  orderTypeEnum,
  orderStatus,
  refundStatus,
  deliverTypeEnum,
  OrderTagTypeEnum,
  ordersType,
} from "@/utils/enum";
import { order } from "@/utils/url";

export default {
  components: { hNone },
  data() {
    return {
      cover:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-%E5%88%87%E5%9B%BE/%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F.png",
      title: "提交成功",
      note: "申请提交成功，等待平台审核",
      backBtn: "返回订单详情",
      forwardBtn: "查看退款详情",
      backUrl: "",
      forwardUrl: "",
      afterSaleNo: "",
      orderNo: "",
      order: false,
      infoDetail: {}, //订单详情
      refundName: "",
      par: {}, //options
      OrderTagTypeEnum,
    };
  },
  onLoad(option) {
    console.log(option, "申请结果1111111----");
    // this.par = option;
    console.log(option, "申请结果3333");

    this.afterSaleNo = option.afterSaleNo;
    this.orderNo = option.orderNo;
    this.backUrl =
      option.tagType === OrderTagTypeEnum.VIRTUALLY_MILK_CARD_ORDER
        ? `/child-pages/order-detail/index?orderNo=${option.orderNo}&type=${option.type}`
        : `/subPages/order/orderDetail?orderNo=${this.orderNo}&type=${option.type}`;
    this.forwardUrl =
      "/subPages/refund/refundDetails?afterSaleNo=" + this.afterSaleNo;
  },
  onReady() {
    // this.getDetail();
  },
  computed: {},
  methods: {
    ...mapActions("order", ["X_getGoodsMsg"]),
    // 订单详情路径
    goDetail(val) {
      const { orderNo, type, deliverType } = val;
      if (
        deliverType === deliverTypeEnum.MILK_AND_EXPRESS_DELIVERY ||
        deliverType === deliverTypeEnum.EXPRESS_DELIVERY
      ) {
        //物流
        this.X_getGoodsMsg(orderNo).then(
          (this.backUrl = `/subPages/order/orderDetail?orderNo=${orderNo}&type=${type}&showexpress=true&refundTextName=${this.refundName}`)
        );
      } else {
        this.backUrl = `/subPages/order/orderDetail?orderNo=${orderNo}&type=${type}&showexpress=false&refundTextName=${this.refundName}`;
      }
    },
    // 获取订单详情
    async getDetail() {
      const { orderNo, type } = this.par;
      console.log("options---2222", this.par);
      try {
        const { data } = await this.GET(
          order.orderDetail + `/${orderNo}?type=${type}`
        );
        this.infoDetail = data;
        this.textToDo(data); //处理文字
        this.getDetail(data); //处理url
      } catch (err) {
        console.log(err);
      }
    },
    // 文字处理
    textToDo(el) {
      // const el=this.infoDetail
      let refundTextName = ""; //退款文字
      if (el.type === orderTypeEnum.TWO) {
        //2.0订单
        if (el.status !== orderStatus.WAIT_PAYMENT) {
          //已支付
          if (el.status === orderStatus.WAIT_DELIVERY) {
            //待配送
            if (el.saleStatus === refundStatus.UN_SUBMIT) {
              //未提交申请
              refundTextName = "申请售后";
            } else {
              //提交过申请
              refundTextName = "售后详情";
            }
          } else if (
            (el.status === orderStatus.DELIVERING ||
              el.status === orderStatus.FINISH) &&
            el.orderType === ordersType.RETAIL_PURCHASE
          ) {
            //配送中或者已完成且零购

            if (el.saleStatus === refundStatus.UN_SUBMIT) {
              //未提交申请
              refundTextName = "申请售后";
            } else {
              //提交过申请
              refundTextName = "售后详情";
            }
          } else {
            refundTextName = "";
          }
        } else {
          //未支付
          refundTextName = "";
        }
      } else {
        //1.0订单不显示
        refundTextName = "";
      }
      this.refundName = refundTextName;
    },
  },
};
</script>
<style scoped lang="scss"></style>
