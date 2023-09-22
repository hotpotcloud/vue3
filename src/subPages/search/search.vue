<!--
 * @Date: 2022-07-29 12:03:13
 * @LastEditors: ''
 * @LastEditTime: 2022-09-12 01:20:00
 * @FilePath: \xianhuo-miniprogram\src\subPages\search\search.vue
-->
<template>
  <!-- 搜索 -->
  <view class="search-out" :class="showModal ? 'popupShow' : ''">
    <view class="search">
      <u-search
        v-model="keywords"
        placeholder="请输入关键字"
        height="64rpx"
        bgcolor="#F4F4F4"
        animation
        @search="handSearch"
        @custom="handSearch"
        @change="handSearch"
        @clear="clearSearch"
      />
    </view>
    <!--tab -->
    <view class="tab-btn" v-if="BaseApp.digitalShop && showTab">
      <view class="tab-bar">
        <view
          :class="['tab-5', activeType === el.value && 'active-bar']"
          v-for="(el, index) in pickBars"
          :key="index"
          @tap="changeType(el)"
        >{{ el.text }}</view>
      </view>
    </view>
    <!-- 热门搜索 -->
    <view>
      <u-loading-icon :show="loading" text="加载中" mode="circle" />
    </view>
    <view class="search-hot" v-if="!list.length">
      <!-- 暂无数据 -->
      <view class="hot-no-data" v-if="noData">
        <image
          class="no-img"
          src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/gif/%E6%97%A0%E6%95%B0%E6%8D%AE%E6%97%A0%E5%95%86%E5%93%812.gif"
          mode="scaleToFill"
        />
        <view class="font-26-6">哎呀~暂无数据，看看热搜商品吧~</view>
      </view>

      <view class="font-26-6 hot-top">热门搜索</view>
      <view class="hot-keywords d-flex-warp">
        <view v-for="i in hotWord" :key="i" class="keywords" @tap="clickHot(i)">{{ i }}</view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <scroll-view scroll-y class="scroll-y">
      <view v-for="(el, index) in list" :key="index" class="search-goods">
        <Goods :val="el" @openModal="openModal" :activeType="activeType" />
      </view>
    </scroll-view>
    <view class="goods-bootom-active font-26-6">
      <text v-if="total === list.length && total">—— 没有更多了 ——</text>
      <text v-else-if="moreshow">加载更多</text>
    </view>
    <h-Modal :isOpen="showModal" @close="closeMoadal" :shelf="productinfo.status"></h-Modal>
  </view>
</template>

<script lang="ts">
import { mapActions, mapMutations, mapState } from "vuex";
import api from "@/utils/api";
import apiurl from "@/utils/url";
import Goods from "./item.vue";
import HModal from "../../components/h-Modal/h-Modal.vue";
import { pickType, PICK_WAY, deliverTypeEnum } from "@/utils/enum";
import { BaseApp } from "@/const/appIdConf";
let observer = null;
export default {
  components: {
    Goods,
    HModal
  },
  data() {
    return {
      pickType,
      PICK_WAY,
      BaseApp,
      pickBars: [
        {
          text: `${pickType.SEND.text}(周期购)`,
          value: pickType.SEND.value
        },
        {
          text: `${pickType.PICK.text}(零购)`,
          value: pickType.PICK.value
        }
      ],
      activeType: pickType.SEND.value, //默认选中的tab
      showTab: false,
      showModal: false, //弹窗
      moreshow: false, //加载更多
      keywords: "", //搜索词
      noData: false, //无数据显示
      loading: false, //加载动画icon
      showLoading: false,
      params: {
        page: 1,
        size: 10,
        name: "",
        appId: uni.getAccountInfoSync().miniProgram.appId,
        areaCodes: []
      },
      list: [],
      total: 0
    };
  },
  onShow() {
    this.X_getHot();
  },
  watch: {
    keywords(newVal: string, oldVal: string) {
      console.log("newVal", newVal);

      if (newVal && newVal != oldVal) {
        // this.handSearch(newVal);
        this.params = {
          ...this.params,
          name: newVal,
          areaCodes: this.existArr
        };
        this.postSearch();
      }
    }
  },
  computed: {
    ...mapState("home", ["hotWord", "searchList", "existArr"])
  },
  onReachBottom() {
    // this.upMore();
  },
  onReady() {
    // 建立观察者 加载更多
    observer = uni.createIntersectionObserver(this);
    observer
      .relativeToViewport({ bottom: 10 })
      .observe(".goods-bootom-active", (res: any) => {
        if (
          res.intersectionRatio > 0 &&
          res.intersectionRatio < 1 &&
          !this.moreshow
        ) {
          // 加载更多
          this.moreshow = true;
          if (this.list.length < this.total) {
            const pages = Math.ceil(this.total / 10);
            this.params.page++;
            if (this.params.page <= pages) this.postSearch();
          }
        } else if (res.intersectionRatio <= 0 && this.moreshow) {
          this.moreshow = false;
        }
      });
  },
  onUnload() {
    if (observer) {
      observer.disconnect();
    }
  },
  methods: {
    ...mapMutations("home", ["V_postSearch"]),
    ...mapActions("home", ["X_postSearch", "X_getHot"]),
    ...mapActions("product", [
      "X_modaldetail",
      "X_postStartSendTime",
      "X_sendTimeArr",
      "X_ticket"
    ]),
    // tab 切换
    // 切换自提方式
    changeType(el) {
      console.log(el.value, "==>");
      this.activeType = el.value;
      this.params.deliveryType =
        el.value === pickType.PICK.value ? PICK_WAY.STORE_PICKUP : null;
      this.postSearch();
    },
    /**
     * 搜索
     * @parma val:string-关键词
     */
    handSearch(val: string) {
      this.showTab = true;
      if (!val) return;
      this.params = {
        page: 1,
        ...this.params,
        name: val,
        areaCodes: this.existArr,
        deliveryType:
          this.activeType === pickType.PICK.value ? PICK_WAY.STORE_PICKUP : null
      };

      this.postSearch();
    },
    /**
     * 热词搜
     * @parma val：string-热词
     */
    clickHot(val: string) {
      console.log("val", val);
      this.keywords = val;
      this.showTab = true;
    },
    /**
     * 清空搜索
     */
    clearSearch() {
      this.showTab = false;
      this.list = [];
      this.params = {
        appId: uni.getAccountInfoSync().miniProgram.appId,
        name: "",
        page: 1,
        size: 10
      };
      this.total = 0;
      this.noData = false;
    },
    // 搜索请求
    async postSearch() {
      if (!this.params.name) return;
      this.loading = true;
      const res: any = await api.$post(apiurl.home.search, this.params);
      const { data } = res;
      this.loading = false;
      if (!data.totalElements) return (this.noData = true), (this.list = []);
      this.noData = false;
      this.total = data.totalElements;
      if (data.totalElements > 10) {
        this.list = [...this.list, ...data.content];
      } else {
        this.list = data.content;
      }
      console.log("data", data);
    },
    /**
     * 打开弹窗
     */
    openModal(spucode: string) {
      console.log("e", spucode);

      this.X_modaldetail(spucode).then(() => {
        this.X_ticket();
        // .then(() => {
        //   this.X_postStartSendTime().then(() => {
        //     this.X_sendTimeArr();
        //   });
        // });
      });
      this.showModal = true;
    },
    // 关闭弹窗
    closeMoadal() {
      this.showModal = false;
    }
    // 加载更多
    // upMore() {
    //   // let doms = uni.createSelectorQuery();
    //   // let more = doms.select("goods-bootom-active");
    //   // console.log('more',more)
    //   // 建立观察者
    //   observer = uni.createIntersectionObserver(this, {
    //     observeAll: false,
    //     initialRatio: 0.1,
    //   });
    //   observer
    //     .relativeToViewport({ bottom: 10 })
    //     .observe(".goods-bootom-active", (res: any) => {
    //       console.log("res出校", res);
    //       if (res.intersectionRatio > 0 && !this.moreshow) {
    //         this.moreshow = true;
    //       } else if (!res.intersectionRatio > 0 && this.moreshow) {
    //         this.moreshow = false;
    //       }
    //     });
    // },
  }
};
</script>

<style scoped lang="scss">
.popupShow {
  overflow-y: hidden;
  position: fixed;
  // z-index: 999999;
  height: 100vh;
  width: 100%;
  // background: #000;
}
.search-out {
  width: 100vw;
  height: 100vh;
  background: #fff;
  padding: 16rpx 16rpx 0 16rpx;
  .search {
    padding: 0 16rpx;
  }
  .search-hot {
    margin-top: 64rpx;
    .hot-no-data {
      // width: 100%;
      // height: 50%rpx;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 48rpx;
      .no-img {
        border: none;
        // width: 310rpx;
        // height: 366rpx;
        // margin-bottom: 32rpx;
      }
    }
    .hot-top {
      color: #000;
      font-weight: bold;
      padding: 0 16rpx;
      margin-bottom: 32rpx;
    }
  }
  .hot-keywords {
    .keywords {
      font-size: 26rpx;
      color: #1d9bdc;
      padding: 12rpx 20rpx;
      background: #fff;
      border-radius: 104rpx;
      border: 0.5rpx solid #1d9bdc;
      margin: 0 15rpx 16rpx 15rpx;
    }
  }
  .search-goods {
    margin-top: 48rpx;
  }
  .goods-bootom {
    display: none;
  }
  .goods-bootom-active {
    display: block;
    height: 100rpx;
    text-align: center;
    // background-color: #1d9bdc;
  }
}
//顶部提货方式
.tab-btn {
  width: 100%;
  padding: 4rpx 16rpx;
  margin-top: 36rpx;
  //background: #E4F4FF;
  //border-radius: 25%;
}
.tab-bar {
  width: 100%;
  height: 76rpx;
  background: #1d9bdc;
  border-radius: 38rpx;
  padding: 6rpx 0;
}
.tab-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  color: #ffffff;
  padding: 0 6rpx;
  .tab-5 {
    width: 50%;
    text-align: center;
  }
  .active-bar {
    width: 336rpx;
    height: 60rpx;
    background: #ffffff;
    border-radius: 32rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    line-height: 60rpx;
  }
}
</style>
