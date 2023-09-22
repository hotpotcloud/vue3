<template>
  <view class="level-out">
    <view class="d-flex-center d-sb name-tip">
      <view :class="['change-left', cssName.leftCss]"></view>
      <view :class="[cssName.fontCss]">{{ info.name }}权益</view>
      <view :class="['change-right', cssName.rightCss]"></view>
    </view>
    <view class="d-flex-warp warp-main">
      <view
        v-for="(el, index) in list"
        :key="index"
        class="lv-item"
        @tap="clickItem(el, index)"
      >
        <view class="opacity1">
          <img
            :src="getAssetImgUrl(`member/${el.img}`)"
            alt=""
            :class="['lv_img_item', el.isOn && 'opacity5']"
          />
          <img
            :src="getAssetImgUrl(el.lock)"
            alt=""
            :class="[el.isOn ? 'lock-icon-show' : 'lock-icon']"
          />
        </view>

        <view>{{ el.label }}</view>
        <!-- <view class="desc_item_font">{{ el.desc }}</view> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    info: {
      default: () => {},
      type: Object,
    },
    //是否折叠-
    isUp: {
      default: true,
      type: Boolean,
    },
    // 后台配置
    memberInterest: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {
    // 卧龙凤雏 includes

    //折叠展开会员权益列表
    list() {
      const wolong = this.memberInterest[this.info.sort - 1];
      const fengchu = this.filterAB(this.info.interest, wolong);
      //折叠则显示前4个
      if (this.isUp) {
        return fengchu.slice(0, 4);
      }
      //展开则显示全部
      else {
        return fengchu;
      }
    },
    // 根据等级名称颜色样式
    cssName() {
      const level = this.info?.level;
      let cssName = {
        leftCss: "change-left",
        fontCss: "fontlv",
        rightCss: "change-right",
      };
      if (level === 5) {
        cssName = {
          leftCss: "change-left5",
          fontCss: "fontlv5",
          rightCss: "change-right5",
        };
      }
      if (level === 6) {
        cssName = {
          leftCss: "change-left6",
          fontCss: "fontlv6",
          rightCss: "change-right6",
        };
      }
      return cssName;
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    // 点击当前
    clickItem(e, index) {
      this.$emit("clickItem", e, index);
    },
    // 筛选arrA-arrB
    filterAB(arrA, arrB) {
      const newCurArr = arrA.map((el) => {
        if (arrB?.exclude?.some((sx) => sx === el.value)) {
          el.isOn = true;
        }
        if (arrB?.include?.some((sp) => sp === el.value)) {
          el.isOn = false;
        }
        return el;
      });
      return newCurArr;
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.level-out {
  .name-tip {
    font-size: 34rpx;
    font-weight: bold;
    padding: 0 40rpx;
  }
  .fontlv {
    color: #fff;
  }
  .fontlv5 {
    background-image: linear-gradient(
      91.2deg,
      #f7b640 0.48%,
      #b79558 0.49%,
      #b0aea8 107.48%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .fontlv6 {
    background-image: linear-gradient(91.2deg, #a871df 0.48%, #decaee 107.48%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .change-left,
  .change-right {
    height: 4rpx;
    width: 128rpx;
  }
  .change-left {
    background: linear-gradient(
      -90.03deg,
      #e7e7ff -6.97%,
      rgba(236, 236, 255, 0) 100%
    );
  }
  .change-left5 {
    background: linear-gradient(
      -90.01deg,
      #9d8860 -7.02%,
      rgba(255, 213, 133, 0) 99.99%,
      rgba(94, 84, 67, 0) 99.99%
    );
  }
  .change-left6 {
    background: linear-gradient(
      -90.01deg,
      #8467a7 -7.02%,
      rgba(85, 72, 98, 0) 99.99%
    );
  }
  .change-right {
    background: linear-gradient(
      90.03deg,
      #e7e7ff -6.97%,
      rgba(236, 236, 255, 0) 100%
    );
  }
  .change-right5 {
    background: linear-gradient(
      90.01deg,
      #9d8860 -7.02%,
      rgba(255, 213, 133, 0) 99.99%,
      rgba(94, 84, 67, 0) 99.99%
    );
  }
  .change-right6 {
    background: linear-gradient(
      90.01deg,
      #8467a7 -7.02%,
      rgba(85, 72, 98, 0) 99.99%
    );
  }
  .warp-main {
    width: 100%;
    margin-top: 48rpx;
    //    overflow: hidden;
    // transition: max-height 0.5s ease-in-out;
  }
  .lv-item {
    width: 25%;
    text-align: center;
    color: #fff;
    margin-bottom: 24rpx;
    .opacity1 {
      margin: 0 auto;
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      margin-bottom: 8rpx;
      position: relative;
    }
    .lv_img_item {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    .lock-icon {
      display: none;
    }
    .lock-icon-show {
      border-radius: 50%;
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      top: -2rpx;
      right: -10rpx;
      z-index: 2;
    }
    .opacity5 {
      opacity: 0.5;
    }

    .desc_item_font {
      font-size: 20rpx;
      opacity: 0.5;
    }
  }
}
</style>