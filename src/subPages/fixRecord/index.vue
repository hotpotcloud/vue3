<template>
  <view class="fix-page">
    <template v-for="(el, index) in histroyList">
      <fixCard
        :val="el"
        :index="index"
        :isEnd="index === histroyList.length - 1"
        :key="index"
      />
    </template>
  </view>
</template>
<script>
import fixCard from "./components/fixCard.vue";
import { mapState } from "vuex";
export default {
  components: {
    fixCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("order", ["histroyList"]),
    histroyLists() {
      const arr = [
        {
          orgStationNo: "LY23041800000029007",
          delyItemNo: "TDE23041800000039007",
          originalDeliveryNo: "D23041800000145011",
          platformOrderNo: "23041817461491607516",
          type: "CHANGE_RULE",
          before: [
            {
              planRuleNo: "JHPR23041800000027007",
              ruleType: "EVERY_DAYS",
              everyNum: 1,
              startDate: "2023-04-19",
              endDate: "2023-04-21",
              deliveryJson: "",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
            {
              planRuleNo: "JHPR23042100000140007",
              ruleType: "WORK_DAYS",
              everyNum: 1,
              startDate: "2023-04-30",
              endDate: "2023-05-26",
              deliveryJson: "1,2,3,4,5",
              intervalDate: 1,
              timeSection: "FORENOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
          ],
          after: [
            {
              planRuleNo: "JHPR23041800000027007",
              ruleType: "EVERY_DAYS",
              everyNum: 1,
              startDate: "2023-04-19",
              endDate: "2023-04-21",
              deliveryJson: "",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: {
                delyItemNo: "TDE23041800000039007",
                channelSkuCode: "XHK864370",
                channelSkuName: " 新希望华西妈妈的早餐鲜牛奶190ml",
                goodsImgUrl:
                  "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/妈妈的早餐2.0单个.jpg",
                count: 2,
                areaPrice: 550,
              },
            },
            {
              planRuleNo: "JHPR23042100000151007",
              ruleType: "WORK_DAYS",
              everyNum: 1,
              startDate: "2023-04-30",
              endDate: "2023-05-26",
              deliveryJson: "1,2,3,4,5",
              intervalDate: 0,
              timeSection: "FORENOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: {
                delyItemNo: "TDE23041800000039007",
                channelSkuCode: "XHK864370",
                channelSkuName: " 新希望华西妈妈的早餐鲜牛奶190ml",
                goodsImgUrl:
                  "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/妈妈的早餐2.0单个.jpg",
                count: 2,
                areaPrice: 550,
              },
            },
          ],
          createdBy: "summer(hml)",
          createdTime: "2023-04-21T16:22:18",
        },
        {
          orgStationNo: "LY23041800000029007",
          delyItemNo: "TDE23042100000056007",
          originalDeliveryNo: "D23041800000145011",
          platformOrderNo: "23041817461491607516",
          type: "CHANGE_RULE",
          before: [
            {
              planRuleNo: "JHPR23041800000027007",
              ruleType: "EVERY_DAYS",
              everyNum: 1,
              startDate: "2023-04-19",
              endDate: "2023-04-21",
              deliveryJson: "",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
            {
              planRuleNo: "JHPR23042100000140007",
              ruleType: "WORK_DAYS",
              everyNum: 1,
              startDate: "2023-04-30",
              endDate: "2023-05-26",
              deliveryJson: "1,2,3,4,5",
              intervalDate: 1,
              timeSection: "FORENOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
          ],
          after: [
            {
              planRuleNo: "JHPR23041800000027007",
              ruleType: "EVERY_DAYS",
              everyNum: 1,
              startDate: "2023-04-19",
              endDate: "2023-04-21",
              deliveryJson: "",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: {
                delyItemNo: "TDE23042100000056007",
                channelSkuCode: "XHK453580",
                channelSkuName: "测试品2",
                goodsImgUrl:
                  "https://freshgo-dev-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/d3123538f8784bd81667291596126.jpg",
                count: 8,
                areaPrice: 2,
              },
            },
            {
              planRuleNo: "JHPR23042100000151007",
              ruleType: "WORK_DAYS",
              everyNum: 1,
              startDate: "2023-04-30",
              endDate: "2023-05-26",
              deliveryJson: "1,2,3,4,5",
              intervalDate: 0,
              timeSection: "FORENOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: {
                delyItemNo: "TDE23042100000056007",
                channelSkuCode: "XHK453580",
                channelSkuName: "测试品2",
                goodsImgUrl:
                  "https://freshgo-dev-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/d3123538f8784bd81667291596126.jpg",
                count: 8,
                areaPrice: 2,
              },
            },
          ],
          createdBy: "summer(hml)",
          createdTime: "2023-04-21T16:22:18",
        },
        {
          orgStationNo: "LY23041800000029007",
          delyItemNo: "TDE23042100000100007",
          originalDeliveryNo: "D23041800000145011",
          platformOrderNo: "23041817461491607516",
          type: "CHANGE_RULE",
          before: [
            {
              planRuleNo: "JHPR23041800000027007",
              ruleType: "EVERY_DAYS",
              everyNum: 1,
              startDate: "2023-04-19",
              endDate: "2023-04-21",
              deliveryJson: "",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
            {
              planRuleNo: "JHPR23042100000140007",
              ruleType: "WORK_DAYS",
              everyNum: 1,
              startDate: "2023-04-30",
              endDate: "2023-05-26",
              deliveryJson: "1,2,3,4,5",
              intervalDate: 1,
              timeSection: "FORENOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
          ],
          after: [
            {
              planRuleNo: "JHPR23041800000027007",
              ruleType: "EVERY_DAYS",
              everyNum: 1,
              startDate: "2023-04-19",
              endDate: "2023-04-21",
              deliveryJson: "",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: {
                delyItemNo: "TDE23042100000100007",
                channelSkuCode: "XHK173986",
                channelSkuName: "测试品",
                goodsImgUrl:
                  "https://freshgo-dev-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/e1c0ebc04821408b509c1324-9936-4d1a-aced-35dd1aeed932.jpeg",
                count: 12,
                areaPrice: 1,
              },
            },
            {
              planRuleNo: "JHPR23042100000151007",
              ruleType: "WORK_DAYS",
              everyNum: 1,
              startDate: "2023-04-30",
              endDate: "2023-05-26",
              deliveryJson: "1,2,3,4,5",
              intervalDate: 0,
              timeSection: "FORENOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: {
                delyItemNo: "TDE23042100000100007",
                channelSkuCode: "XHK173986",
                channelSkuName: "测试品",
                goodsImgUrl:
                  "https://freshgo-dev-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/e1c0ebc04821408b509c1324-9936-4d1a-aced-35dd1aeed932.jpeg",
                count: 12,
                areaPrice: 1,
              },
            },
          ],
          createdBy: "summer(hml)",
          createdTime: "2023-04-21T16:22:18",
        },
        {
          orgStationNo: "LY23041800000029007",
          delyItemNo: "TDE23042100000056007",
          originalDeliveryNo: "D23041800000145011",
          platformOrderNo: "23041817461491607516",
          type: "EXCHANGE_GOODS",
          before: [
            {
              delyItemNo: "TDE23042100000056007",
              channelSkuCode: "XHK453580",
              channelSkuName: "测试品2",
              goodsImgUrl:
                "https://freshgo-dev-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/d3123538f8784bd81667291596126.jpg",
              count: 14,
              areaPrice: 2,
            },
          ],
          after: [
            {
              delyItemNo: "TDE23042100000100007",
              channelSkuCode: "XHK173986",
              channelSkuName: "测试品",
              goodsImgUrl:
                "https://freshgo-dev-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/e1c0ebc04821408b509c1324-9936-4d1a-aced-35dd1aeed932.jpeg",
              count: 12,
              areaPrice: 1,
            },
          ],
          createdBy: "summer(hml)",
          createdTime: "2023-04-21T16:01:20",
        },
        {
          orgStationNo: "LY23041800000029007",
          delyItemNo: "TDE23041800000039007",
          originalDeliveryNo: "D23041800000145011",
          platformOrderNo: "23041817461491607516",
          type: "CHANGE_ADDREDD",
          before: [
            {
              addressNo: "202304210000020011",
              receiver: "德玛西亚",
              receiverPhone: "17325453506",
              address:
                "四川成都金堂县观岭大道1188号(国际观岭社区高尔夫球场旁)蓝光·锦绣香江地址1",
            },
          ],
          after: [
            {
              addressNo: "202304210000021012",
              receiver: "德玛西亚",
              receiverPhone: "17325453506",
              address: "四川成都金堂县观岭大道1188号(国际观岭社区高尔夫球场旁)",
            },
          ],
          createdBy: "summer(hml)",
          createdTime: "2023-04-21T13:44:20",
        },
        {
          orgStationNo: "LY23041800000029007",
          delyItemNo: "TDE23041800000039007",
          originalDeliveryNo: "D23041800000145011",
          platformOrderNo: "23041817461491607516",
          type: "EXCHANGE_GOODS",
          before: [
            {
              delyItemNo: "TDE23041800000039007",
              channelSkuCode: "XHK864370",
              channelSkuName: null,
              goodsImgUrl:
                "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/妈妈的早餐2.0单个.jpg",
              count: 30,
              areaPrice: 550,
            },
          ],
          after: [
            {
              delyItemNo: "TDE23042100000056007",
              channelSkuCode: "XHK453580",
              channelSkuName: null,
              goodsImgUrl:
                "https://freshgo-dev-1302811166.cos.ap-chengdu.myqcloud.com/fhg/product/d3123538f8784bd81667291596126.jpg",
              count: 14,
              areaPrice: 2,
            },
          ],
          createdBy: "秦旋23(qinxuan23)",
          createdTime: "2023-04-21T13:44:09",
        },
        {
          orgStationNo: "LY23041800000029007",
          delyItemNo: "TDE23041800000039007",
          originalDeliveryNo: "D23041800000145011",
          platformOrderNo: "23041817461491607516",
          type: "CHANGE_RULE",
          before: [
            {
              planRuleNo: "JHPR23042100000057005",
              ruleType: "EVERY_DAYS",
              everyNum: 1,
              startDate: "2023-04-23",
              endDate: "2023-05-20",
              deliveryJson: "",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
          ],
          after: [
            {
              planRuleNo: "JHPR23042100000059005",
              ruleType: "WORK_DAYS",
              everyNum: 1,
              startDate: "2023-04-23",
              endDate: "2023-05-19",
              deliveryJson: "1,2,3,4,5",
              intervalDate: 0,
              timeSection: "AFTERNOON",
              onceRuleType: "SAME",
              onceItemList: [],
              changeGoods: null,
            },
          ],
          createdBy: "秦旋23(qinxuan23)",
          createdTime: "2023-04-21T13:32:40",
        },
      ];
      return arr;
    },
  },
};
</script>
<style lang="scss"  scoped>
.fix-page {
  background: #f5f5f5;
  width: 100%;
  min-height: 100vh;
  padding: 24rpx 32rpx 68rpx;
}
</style>