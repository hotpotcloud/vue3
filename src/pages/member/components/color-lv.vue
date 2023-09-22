//  等级变化组件
<template>
  <view class="color-lv-out">
    <swiper
      :style="{ height: '82rpx' }"
      displayMultipleItems="3"
      :current="uindex"
      @change="changeDot"
    >
      <swiper-item class="sw_item" v-for="(el, dex) in list" :key="dex">
        <view
          class="dot-sw"
          :class="[
            uindex === dex && 'dot-select-ruand-start',
            uindex + 1 === dex && 'dot-select-ruand',
            uindex + 2 === dex && 'dot-select-ruand-end',
            uindex + 3 === dex && 'null-ruand',
          ]"
        >
          <view
            class="ruand-sw"
            :class="[
              uindex + 1 === dex && 'select-ruand',
              el.isNull && 'null-ruand',
            ]"
          ></view>
          <text>{{ el.label }}</text>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    lvArr: {
      type: Array,
      default: () => [],
    },
    uindex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      list: [
        {
          isNull: true,
        },
        {
          label: "Lv1",
        },
        {
          label: "Lv2",
        },
        {
          label: "Lv3",
        },
        {
          label: "Lv4",
        },
        {
          label: "Lv5",
        },
        {
          label: "Lv6",
        },
        {
          isNull: true,
        },
      ],
      //   uindex: 0,
      // 背景图
      lv1: "member/rectangle14.png", //1-4级
      lv5: "member/rectangle5.png", //5
      lv6: "member/rectangle6.png", //6
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    changeDot(e) {
      this.$emit("changeDot", e.detail.current);
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.color-lv-out {
  width: 100%;
  height: 82rpx;
  //   background: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/member/rectangle14.png")
  //     no-repeat;
  //   background-size: 100% auto;
}
.sw_item {
  //   width: 46rpx !important;
  //   background: #f00;
  //   border: 1rpx solid #f0f;

  .dot-sw {
    padding-top: 9rpx;
    font-size: 28rpx;
    font-weight: bold;
  }
  .dot-select-ruand {
    padding-top: 6rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    opacity: 1;
  }
  .dot-select-ruand-start {
    // padding-top: 0rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
    opacity: 0.5;
  }
  .dot-select-ruand-end {
    // padding-top: 0rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    color: #fff;
    opacity: 0.5;
  }

  .ruand-sw {
    // padding-top: 9rpx;
    width: 18rpx;
    height: 18rpx;
    border-radius: 50%;
    background: #fff;
    opacity: 0.5;
    margin-bottom: 18rpx;
  }
  .select-ruand {
    // padding-top: 6rpx;
    // padding-top: -15rpx;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    margin-bottom: 6rpx;
    background: #fff;
    opacity: 1;
  }
  .null-ruand {
    background: transparent;
    display: none;
  }
}
</style>