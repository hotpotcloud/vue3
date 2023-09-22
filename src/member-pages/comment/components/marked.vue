/* 已评价 */
<template>
  <view class="marked-out">
    <view class="d-flex-center d-sb top-borders">
      <view class="f30 color-33">您对配送员满意吗？</view>
    </view>
    <view class="mark-main">
      <view class="main_icon">
        <view class="icon_detail">
          {{ list[info.deliveryScore - 1] }}
          <img
            :src="getAssetImgUrl(imgArr[info.deliveryScore - 1])"
            alt=""
            class="img_lev"
          />
        </view>
      </view>
      <view class="d-flex-warp d-center">
        <view
          v-for="(item, index) in info.keywordsList"
          :key="index"
          class="item_detail"
          >#{{ item.keywords }}</view
        >
      </view>
      <view class="mark_detail" v-if="info.remark">
        {{ info.remark }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    //评价信息
    info: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      list: ["很不满！", "不满！", "一般！", "满意！", "超满意！"],
      imgArr: [
        "Group 1925.png", //1
        "Group 1924.png", //2
        "Group 1923.png", //3
        "Group 1922.png", //4
        "Group 1921.png", //5
      ],
    };
  },
  computed: {},
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {},
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.marked-out {
  background: #fff;
  border-radius: 24rpx;
  .top-borders {
    padding: 24rpx;
    border-bottom: 1rpx solid #f1f1f1;
  }
  .mark-main {
    padding: 32rpx;
    .main_icon {
      display: flex;
      justify-content: center;
      margin-bottom: 22rpx;
    }
    .icon_detail {
      position: relative;
      display: inline-block;
      padding: 14rpx 0;
      padding-left: 90rpx;
      padding-right: 8rpx;
      color: #e3a827;
      background: rgba(255, 205, 95, 0.15);
      border: 2rpx solid #ffcd5f;
      border-radius: 32rpx;

      //   transform: translateX(50%);
      .img_lev {
        position: absolute;
        width: 72rpx;
        height: 72rpx;
        left: 8rpx;
        top: -6rpx;
      }
    }

    .item_detail {
      color: #a9a9a9;
      margin-right: 8rpx;
    }
    .mark_detail {
      // display: ;
      margin-top: 16rpx;
      word-wrap: break-word;
      background: #f1f1f1;
      color: #333333;
      border-radius: 16rpx;
      padding: 12rpx 16rpx;
    }
  }
}
</style>