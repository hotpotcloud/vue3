/* *  
* @Date: 2022-07-11 10:10:32 
*/
<template>
  <view class="classify-out">
    <!-- 商品分类 -->
    <view class="ify" :class="[!showFlag ? 'write' : '']">
      <view class="ify-sb d-flex-se" :class="[val.length === 4 && 'sb']">
        <view
          class="ify-header"
          :class="[classType.index === index ? 'active-menu' : '']"
          v-for="(el, index) in classInfo"
          :key="index"
          @tap.stop="checkMenu(el, index)"
        >
          <view
            class="d-flex-center d-center d-flex-colum"
            style="height: 88rpx"
            :class="[classType.index === index ? 'active-text' : '']"
          >
            <view
              class="nomal-name"
              :class="[iosFont ? 'font-ios' : 'font-android']"
              >{{ el.name }}</view
            >
            <text class="nomal-sub">{{ el.describeInfo }}</text>
          </view>
        </view>
      </view>

      <!-- 内容部分 -->
      <view class="ify-body d-flex-warp d-sb" v-if="showFlag">
        <view class="ify-body-son">
          <hColcard
            :list="item"
            v-for="item in C_classData.left"
            :key="item.id"
            @shareXY="shareXY"
          />
        </view>

        <view class="ify-body-son">
          <hColcard
            :list="item"
            v-for="item in C_classData.right"
            :key="item.id"
            @shareXY="shareXY"
          />
        </view>
      </view>
      <!-- 内容部分new -->
      <!-- <view class="ify-body d-flex-warp d-sb">
        <hColcard :list="item" v-for="item in goodsArr" :key="item.id" />
      </view> -->
    </view>
  </view>
</template>

<script>
import hColcard from "./h-colCard.vue";

import api from "@/utils/api";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: {
    hColcard,
  },
  props: {
    val: {
      type: Array,
      default: [],
    },
    showFlag: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeClass: 0, //当前选择
      goodsArr: [],
      leftList: [],
      rightList: [],
    };
  },
  computed: {
    ...mapState("home", ["classData", "classType", "classInfo"]),
    ...mapState("css", ["iosFont"]),
    ...mapGetters("home", ["C_classData"]),
  },
  methods: {
    ...mapActions("home", ["X_getClass"]),
    ...mapMutations("home", ["V_selcetClass"]),
    // tab分类切换
    checkMenu(val, index) {
      const init = {
        val,
        index,
      };
      this.V_selcetClass(init);
      this.X_getClass(val);
    },
    // 分享
    shareXY(val) {
      console.log("val", val);
      this.$emit("shareXY", val);
    },
  },
};
</script>

<style scoped lang="scss">
.write {
  background: #fff;
  margin-top: 32rpx;
}
.sb {
  justify-content: space-between;
}
.sb {
  justify-content: space-between !important;
}
.classify-out {
  padding: 0 32rpx;
  //width: 100%;
  .ify {
    width: 100%;
    .ify-sb {
      padding: 0 24rpx;
      margin: 32rpx 0;
      // margin-bottom: 32rpx;
    }
    .ify-header {
      min-width: 120rpx;
      height: 88rpx;
      align-items: center;
      color: #999999;
      .nomal-name {
        font-size: 30rpx !important;
      }
      .nomal-sub {
        font-size: 20rpx;
        color: #c7c7c7;
      }
    }

    .active-menu {
      background: #bbb;
      padding: 0 14rpx;
      min-width: 140rpx;
      background: url(https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/classify/Vector%402x.png)
        no-repeat;
      background-size: 44rpx 88rpx;
      background-position: right 0;
    }
    .active-text {
      color: #1d9bdc !important;
      .nomal-sub {
        color: #1d9bdc !important;
      }
    }
  }
}
.ify-body {
  display: flex;
  .ify-body-son {
    display: flex;
    flex-direction: column;
  }
}
</style>
