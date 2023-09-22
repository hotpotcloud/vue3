/* 评价 */
<template>
  <view>
    <view class="comment-out">
      <view>
        <!-- 顶部文字 -->
        <Top :show="isWrite" />
        <!-- 配送员信息 -->
        <view class="d-flex d-sb">
          <view
            v-for="(i, index) in evaluateList"
            :key="index"
            :class="[
              'flex-1',
              'sender-box',
              index === 1 && 'sender-item',
              currentIndex === index && 'active_border',
            ]"
          >
            <Sender :info="i" :current="index" @clickSender="clickSender"
          /></view>
        </view>
      </view>

      <!-- 评价-待评/已评价 -->
      <view class="h-margin-top16">
        <view v-if="isWrite">
          <Mark
            @changeRate="changeRate"
            @onSelect="onSelect"
            @inputRemark="inputRemark"
            :textList="currentInfo.messageConfig"
            :valueRate="currentInfo.deliveryScore || 0"
            :selectVal="currentInfo.keywordsList || []"
            :remark="currentInfo.remark || ''"
            :isFlag="currentTime"
          />
        </view>
        <view v-else class="h-margin-top16">
          <Marked :info="currentInfo" />
        </view>
      </view>
      <view class="h-margin-top16">
        <Goods
          :isEvaluate="isWrite"
          :info="currentInfo"
          :rateConfig="currentInfo.goodsConfig"
          @childChangeRate="childChangeRate"
          @onChildSelect="onChildSelect"
        />
      </view>

      <view class="submit-btn" v-if="isWrite">
        <button
          :loading="loading"
          :class="['btn-success', fck && 'active']"
          @tap="submit"
        >
          提交
        </button>
        <!-- <view :class="['btn-success', fck && 'active']" @tap="submit">
          提交
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import Top from "./components/top.vue";
import Sender from "./components/sender.vue";
import Mark from "./components/mark.vue";
import Marked from "./components/marked.vue";
import Goods from "./components/goods.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { timeSectionEnum, EvaluateEnum, AppraiseTypeEnum } from "@/utils/enum";
import { throttle, debounce } from "@/utils/utils";
export default {
  components: {
    Top,
    Sender,
    Mark,
    Marked,
    Goods,
  },
  data() {
    return {
      showTop: true,
      isActive: false,
      markText: ["很不满", "不满", "一般", "满意", "超棒"], //评价详情
      lvText: ["很不满", "不满", "一般", "满意", "超满意"], //评分等级
      imgArr: [
        //不同星级icon--评价详情显示
        "Group 1925.png", //1♥
        "Group 1924.png", //2♥
        "Group 1923.png", //3♥
        "Group 1922.png", //4♥
        "Group 1921.png", //5♥
      ],
      loading: false,
      currentTime: timeSectionEnum.FORENOON, //当前选中的评价信息
      //选中下标
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState("newhope", [
      "evaluateList",
      "evaluateListCache",
      "messageConfig",
      "goodsConfig",
    ]),
    //是否评价
    isWrite() {
      return (
        this.evaluateListCache[this.currentTime]?.yesOrNoEnum ===
        EvaluateEnum.NO
      );
    },
    fck() {
      return (
        this.evaluateListCache[this.currentTime]?.deliveryScore > 3 ||
        !!this.evaluateListCache[this.currentTime]?.keywordsList?.length ||
        !!this.evaluateListCache[this.currentTime]?.remark
      );
    },
    // 当前评价信息
    currentInfo() {
      return this.evaluateListCache[this.currentTime];
    },
  },
  onLoad(options) {
    console.log(options, 1);
    this.init();
  },
  onShow() {},
  onReady() {},
  methods: {
    ...mapMutations("newhope", [
      "setEvaluateList",
      "setEvaluateListCache",
      "setMessageConfig",
      "setEmptyListCache",
      "setGoodsConfig",
    ]),
    ...mapActions("newhope", [
      "postMessageConfig",
      "postAddMessage",
      "postMessage",
    ]),
    /* 初始化 */
    init() {
      const obj = this.evaluateList;
      console.log("obj-init", obj);
      /* 未评论的下标 */
      const index = obj.findIndex(
        (item) => item.yesOrNoEnum === EvaluateEnum.NO
      );
      console.log("index-init", index);
      this.currentIndex = index > 0 ? index : 0;
      console.log("this.currentIndex", this.currentIndex);
      this.currentTime = obj[this.currentIndex].timeSection;
      console.log("this", this.currentTime);
    },
    /* 点击送奶员 */
    clickSender(info, index) {
      console.log("index", info, index);
      this.currentTime = info.timeSection;
      this.currentIndex = index;
    },
    /* 评价送奶员 */
    async changeRate(e) {
      try {
        console.log("e", e);
        await this.postMessageConfig({
          deliveryScore: e,
          appraiseType: AppraiseTypeEnum.DELIVERY_APPRAISE,
        });
        this.setEvaluateListCache({
          [this.currentTime]: {
            ...this.evaluateListCache[this.currentTime],
            deliveryScore: e,
            keywordsList: [],
            messageConfig: this.messageConfig,
            remark: "",
          },
        });
      } catch (error) {}
    },
    /* remark */
    inputRemark(e) {
      console.log("e", e);
      this.setEvaluateListCache({
        [this.currentTime]: {
          ...this.evaluateListCache[this.currentTime],
          remark: e,
        },
      });
    },
    /* 选择评价 */
    onSelect(val, index) {
      console.log("va", val, index);
      const info = uni.$u.deepClone(this.currentInfo);
      let { keywordsList } = info;
      keywordsList = keywordsList || [];
      if (
        keywordsList?.find(
          (item) => item.keywords === val.keywords && item.id === val.id
        )
      ) {
        keywordsList.splice(keywordsList.indexOf(val), 1);
      } else {
        keywordsList.push(val);
      }
      console.log("keywordsList", keywordsList);
      this.setEvaluateListCache({
        [this.currentTime]: {
          ...this.evaluateListCache[this.currentTime],
          keywordsList,
        },
      });
    },
    /* 评价商品 */
    async childChangeRate(num, obj) {
      console.log("num,val", num, obj);
      try {
        //获取评价配置
        await this.postMessageConfig({
          deliveryScore: num,
          appraiseType: AppraiseTypeEnum.GOODS_APPRAISE,
        });
        const info = uni.$u.deepClone(this.currentInfo);
        let { evaluateItemDTOAddList } = info;
        evaluateItemDTOAddList.map((el) => {
          if (el.skuCode === obj.skuCode) {
            el.goodsScore = num;
            el.keywordsList = [];
            el.goodsConfig = this.goodsConfig;
          }
          return el;
        });
        //设置评分
        this.setEvaluateListCache({
          [this.currentTime]: {
            ...this.evaluateListCache[this.currentTime],
            evaluateItemDTOAddList,
          },
        });
      } catch (error) {
        //
      }
    },
    //商品评价选择
    onChildSelect(item) {
      const info = uni.$u.deepClone(this.currentInfo);
      let { evaluateItemDTOAddList } = info;
      console.log("e2-商品", item, info, evaluateItemDTOAddList);

      evaluateItemDTOAddList = evaluateItemDTOAddList.map((el) => {
        if (el.skuCode === item.skuCode) {
          el.keywordsList = item.keywordsList;
        }
        return el;
      });
      console.log("evaluateItemDTOAddList---idnex", evaluateItemDTOAddList);
      this.setEvaluateListCache({
        [this.currentTime]: {
          ...this.evaluateListCache[this.currentTime],
          evaluateItemDTOAddList,
        },
      });
    },
    submit() {
      debounce(this.submit1, 1000);
    },
    //提交
    async submit1() {
      try {
        // if (this.loading) return;
        // this.loading = true;
        if (!this.currentInfo.deliveryScore)
          return uni.$u.toast("请给配送员评分");
        if (this.currentInfo.deliveryScore <= 3) {
          if (!this.currentInfo.keywordsList.length && !this.currentInfo.remark)
            return uni.$u.toast("请选择或填写不满意理由");
        }
        const save = uni.$u.deepClone(this.evaluateListCache);
        let par = [];
        Object.keys(save).forEach((key) => {
          const item = save[key];
          if (!!item.deliveryScore && item.yesOrNoEnum === EvaluateEnum.NO) {
            item.timeSection = undefined;
            item.yesOrNoEnum = undefined;
            item.deliveryEndTime = undefined;
            item.milkManNoName = undefined;
            delete item.timeSection;
            delete item.yesOrNoEnum;
            delete item.deliveryEndTime;
            delete item.milkManNoName;
            // 低于3分需要评价或关键词
            if (item.deliveryScore <= 3) {
              if (item.keywordsList.length || item.remark) {
                par.push(item);
              }
            } else {
              par.push(item);
            }
            // par.push(item);
          }
        });
        await this.postAddMessage(par);
        uni.$u.toast("提交成功");
        uni.navigateTo({
          url: "/member-pages/comment/success",
          success: async () => {
            await this.postMessage();
            this.loading = false;
          },
        });
      } catch (error) {
        //
      } finally {
        // this.loading = false;
      }
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {
    this.setEmptyListCache(); //清空缓存
    this.setMessageConfig([]); //清空评价配置
    this.setGoodsConfig([]); //清空商品评价配置
    this.setEvaluateList([]);
  },
};
</script>
<style scope lang='scss'>
.comment-out {
  background: #f5f5f5;
  padding: 16rpx 24rpx 200rpx;
  height: 100vh;
  overflow: auto;
}
.sender-box {
  border: 2rpx solid transparent;
}
.sender-item {
  margin-left: 14rpx;
}
.active_border {
  border-radius: 24rpx;
  border: 2rpx solid #1d9bdc;
}
.submit-btn {
  position: fixed;
  bottom: 80rpx;
  left: 0;
  right: 0;
  padding: 0 40rpx;
  // background: #1d9bdc;
  .btn-success {
    height: 84rpx;
    font-size: 34rpx;
    color: #fff;
    font-weight: bold;
    border-radius: 254rpx;
    background: #c7c7c7;
  }
  .active {
    background: #1d9bdc;
  }
}
</style>