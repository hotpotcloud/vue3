<template>
  <!-- 会员轮播卡 -->
  <view class="swiper-child-out">
    <view :class="['child-main', info.cssName]">
      <view class="level-tip">{{ levelText }}</view>
      <image
        :src="getAssetImgUrl(info.namePNG)"
        mode="widthFix"
        class="name_img"
      />
      <view class="level-load">
        <!-- 过去等级 -->
        <view v-if="res.level > info.level">你已超越该等级</view>
        <!-- 当前等级 -->
        <view v-else-if="res.level === info.level" @tap="clickGrowth">
          <view>
            当前成长值<text>{{ res.growthValue }}</text
            ><text v-if="res.level < 6">,还需{{ cpGrowthValue() }}升级</text
            ><text
              class="trigon-rig"
              :style="{ borderColor: trigonColor }"
            ></text
          ></view>
          <!-- 进度条 -->
          <view class="loading-bar">
            <view
              class="over-bar"
              :style="{
                width: res.levelPercent + '%',
                background: info.barColor,
              }"
            ></view>
          </view>
        </view>
        <view v-else
          >未解锁，成长值需要达到<text>{{
            res.levelAndGrowth[info.level - 1].growthValue
          }}</text></view
        >
      </view>
      <!-- 等级图标 -->
      <view class="level-img">
        <image
          :src="getAssetImgUrl(info.lvPNG)"
          mode="aspectFit"
          class="level_img"
          lazy-load="true"
      /></view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    // 三角形箭头颜色
    trigonColor: {
      default: "#fff",
      type: String,
    },
    // 会员配置
    info: {
      type: Object,
      default: () => {},
    },
    //会员接口
    res: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    // 左上角标签
    levelText() {
      if (this.res?.level === this.info?.level) {
        return "当前等级";
      }
      if (this.res?.level < this.info?.level) {
        return "待升级";
      }
      return ""; //小于不显示
    },
    // 升级进度
    progress() {
      // 各个等级所需要的成长值
      // const {levelAndGrowth}=this.res.levelAndGrowth
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    // 计算成长值
    cpGrowthValue() {
      const obj = this.res.levelAndGrowth.find(
        (item) => item.sort === this.res.level + 1
      );
      const diff = obj.growthValue - this.res.growthValue;
      console.log("obj", obj);
      return diff;
    },
    clickGrowth() {
      this.$emit("clickGrowth");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.child-main {
  height: 312rpx;
  //   width: 646rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #ffffff 0%, #c2d6e9 100%),
    conic-gradient(
      from 202.07deg at 28.02% 45.51%,
      rgba(255, 255, 255, 0) 0deg,
      #ffffff 170.29deg,
      rgba(255, 255, 255, 0) 360deg
    );
  border: 1px solid;
  border-image-source: conic-gradient(
    from 202.07deg at 28.02% 45.51%,
    rgba(255, 255, 255, 0) 0deg,
    #ffffff 170.29deg,
    rgba(255, 255, 255, 0) 360deg
  );
  position: relative;
  padding-top: 72rpx;
  padding-left: 32rpx;
}
.swiper-child-out {
  position: relative;
  margin: 0 12rpx;
  .member-lv1 {
    background: linear-gradient(180deg, #ffffff 0%, #c2d6e9 100%),
      conic-gradient(
        from 202.07deg at 28.02% 45.51%,
        rgba(255, 255, 255, 0) 0deg,
        #ffffff 170.29deg,
        rgba(255, 255, 255, 0) 360deg
      );
    border: 1px solid;
    border-image-source: conic-gradient(
      from 202.07deg at 28.02% 45.51%,
      rgba(255, 255, 255, 0) 0deg,
      #ffffff 170.29deg,
      rgba(255, 255, 255, 0) 360deg
    );
  }
  .member_lv2 {
    background: linear-gradient(180deg, #fcf9ff 0%, #cacfed 100%),
      conic-gradient(
        from 196deg at 28.02% 45.51%,
        rgba(255, 255, 255, 0) 0deg,
        #ffffff 101.86deg,
        rgba(255, 255, 255, 0) 360deg
      );
    border: 1px solid;
    border-image-source: conic-gradient(
      from 196deg at 28.02% 45.51%,
      rgba(255, 255, 255, 0) 0deg,
      #ffffff 101.86deg,
      rgba(255, 255, 255, 0) 360deg
    );
  }
  .member_lv3 {
    background: linear-gradient(180deg, #fffbf3 0%, #e3c699 100%),
      conic-gradient(
        from 197.51deg at 28.02% 45.51%,
        rgba(255, 255, 255, 0) 0deg,
        #ffffff 101.86deg,
        rgba(255, 255, 255, 0) 360deg
      );
    border: 1px solid;
    border-image-source: conic-gradient(
      from 197.51deg at 28.02% 45.51%,
      rgba(255, 255, 255, 0) 0deg,
      #ffffff 101.86deg,
      rgba(255, 255, 255, 0) 360deg
    );
  }
  .member_lv4 {
    background: linear-gradient(180deg, #fff9f1 0%, #e4c0a9 100%),
      conic-gradient(
        from 196.37deg at 28.02% 45.51%,
        rgba(255, 255, 255, 0) 0deg,
        #ffffff 101.86deg,
        rgba(255, 255, 255, 0) 360deg
      );
    border: 1px solid;
    border-image-source: conic-gradient(
      from 196.37deg at 28.02% 45.51%,
      rgba(255, 255, 255, 0) 0deg,
      #ffffff 101.86deg,
      rgba(255, 255, 255, 0) 360deg
    );
  }
  .member_lv5 {
    background: linear-gradient(180deg, #343434 0.01%, #151312 100%),
      conic-gradient(
        from -6.4deg at 44.74% 42.31%,
        rgba(246, 216, 157, 0) -129.47deg,
        #f6d89d 1.03deg,
        rgba(246, 216, 157, 0) 112.72deg,
        rgba(246, 216, 157, 0) 230.53deg,
        #f6d89d 361.03deg
      );
    border: 1px solid;
    border-image-source: conic-gradient(
      from -6.4deg at 44.74% 42.31%,
      rgba(246, 216, 157, 0) -129.47deg,
      #f6d89d 1.03deg,
      rgba(246, 216, 157, 0) 112.72deg,
      rgba(246, 216, 157, 0) 230.53deg,
      #f6d89d 361.03deg
    );
  }
  .member_lv6 {
    background: linear-gradient(180deg, #4a4150 0.01%, #17141d 100%),
      conic-gradient(
        from -7.19deg at 40.71% 53.85%,
        #eddefd 0deg,
        rgba(237, 222, 253, 0) 80.99deg,
        rgba(237, 222, 253, 0) 231.16deg,
        #eddefd 360deg
      );
    border: 1px solid;
    border-image-source: conic-gradient(
      from -7.19deg at 40.71% 53.85%,
      #eddefd 0deg,
      rgba(237, 222, 253, 0) 80.99deg,
      rgba(237, 222, 253, 0) 231.16deg,
      #eddefd 360deg
    );
  }
  .level-tip {
    padding: 4rpx 18rpx;
    position: absolute;
    left: 0;
    top: 0;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    border-top-left-radius: 24rpx;
    border-bottom-right-radius: 24rpx;
  }
  .level-img {
    position: absolute;
    right: 0rpx;
    top: -32rpx;
    width: 258rpx;
    z-index: 1;
  }
  .name_img {
    width: 216rpx;
  }
  .level-load {
    position: relative;
    z-index: 2;
    margin-top: 40rpx;
    .trigon-rig {
      margin-left: 4rpx;
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 10rpx solid transparent !important;
      border-left: 10rpx solid #fff;
      border-bottom: 10rpx solid transparent !important;
    }
    .loading-bar {
      height: 6rpx;
      border-radius: 4rpx;
      width: 550rpx;
      background: rgba(255, 255, 255, 0.3);
      margin-top: 12rpx;
      overflow: hidden;
      .over-bar {
        height: 100%;
      }
    }
  }
}
.level_img {
  // width: 280rpx;
  height: 368rpx;
}
</style>