<template>
  <view class="member-item-out" @tap="toMemberX" v-if="show">
    <!-- 会员已登录模块 -->
    <view class="load-bar">
      <view
        >当前成长值 <text class="growth-value">{{ info.growthValue }}</text>
        <text v-if="info.level < 6"
          >，还需要<text class="cp-growth-value"
            >{{ cpGrowthValue(info) }}升级{{ lvList[info.level] }}</text
          ></text
        >
      </view>
      <!-- 进度条 -->
      <view class="bar-out">
        <view
          class="bar-loading"
          :style="{ width: info.levelPercent + '%' }"
        ></view>
      </view>
    </view>
    <view class="level-name">{{ lvName(info.level) }}</view>
  </view>
</template>

<script>
export default {
  props: {
    // 会晕信息
    info: {
      type: Object,
      default: () => {},
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      lvList: [
        "优享会员",
        "白银会员",
        "黄金会员",
        "铂金会员",
        "黑金会员",
        "尊享会员",
        "尊享会员2",
      ],
    };
  },
  computed: {
    // 计算还差多少成长值
    cpGrowthValue() {
      return (val) => {
        if (val.level >= 6) return 0;
        const obj = val?.levelAndGrowth?.find(
          (item) => item.sort === val.level + 1
        );
        const diff = obj.growthValue - val.growthValue;
        console.log("obj", obj);
        return diff;
      };
    },
    // 当前会员名称
    lvName() {
      return (level) => {
        return "Lv" + level + "." + this.lvList[level - 1];
      };
    },
  },
  onLoad(options) {
    console.log(options);
  },
  onShow() {},
  onReady() {},
  methods: {
    toMemberX() {
      this.$emit("toMemberX");
    },
  },
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.member-item-out {
  border-radius: 24rpx;
  height: 216rpx;
  width: 100%;
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/huiyuan1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  image {
    width: 100%;
    height: 100%;
  }
}
.level-name {
  width: 176rpx;
  height: 38rpx;
  position: absolute;
  top: 30rpx;
  right: 0;
  padding: 4rpx 0;
  padding-left: 16rpx;
  font-size: 22rpx;
  color: #bc8a28;
  // background: #fff;
}
.load-bar {
  width: calc(100% - 72rpx);
  position: absolute;
  left: 32rpx;
  top: 80rpx;
  color: #df9c28;
  font-size: 22rpx;
  .growth-value {
    padding-left: 8rpx;
    color: #7a5713;
    font-weight: bold;
  }
  .cp-growth-value {
    font-weight: bold;
  }
  .bar-out {
    margin-top: 12rpx;
    height: 6rpx;
    border-radius: 4rpx;
    background: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    .bar-loading {
      height: 100%;
      border-radius: 4rpx;
      background: linear-gradient(90deg, #ffeece 0%, #f8a71b 100%);
      width: 0%;
    }
  }
}
</style>