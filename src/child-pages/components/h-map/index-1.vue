<template>
  <view class="map-out">
    <view
      class="mp-content"
      :animation="animationData"
      :style="{ height: !moveFlag ? '32%' : '' }"
    >
      <map
        id="map_2023xbf"
        class="map-img"
        show-location="true"
        scale="8"
        min-scale="5"
        :include-points="polygons.points"
        :latitude="position.latitude"
        :longitude="position.longitude"
        :polygons="polygons"
        @regionchange="handleRegionchange"
      ></map>
      <view
        :class="['picker_map_location', animateLocation ? 'animated' : '']"
      ></view>
    </view>
    <view class="action-list">
      <view class="search-input">
        <u-search
          animation
          v-model="searchKey"
          color="#333333"
          searchIconColor="#A9A9A9"
          placeholderColor="#A9A9A9"
          bgColor="#F1F1F1"
          placeholder="搜索地点"
          height="72rpx"
          :showAction="false"
          :clearabled="true"
          @search="searchPosition"
          @custom="searchPosition"
          @clear="onClearSearch"
        ></u-search>
      </view>
      <view class="res-lists">
        <view
          class="item-a d-flex-center d-sb"
          v-for="(el, inx) in searchList"
          :key="inx"
        >
          <view class="item-aa">
            <view class="title">{{ el.title }}</view>
            <view class="address">{{ el.address }}</view>
          </view>
          <view
            class="uncheck-icon"
            :class="[el.select && 'picker-checked']"
          ></view>
        </view>
      </view>
      <view class="ft">
        <button class="choose-btn">确定</button>
      </view>
    </view>
  </view>
</template>

<script>
var QQMapWX = require("./qqmap-wx-jssdk.js");
var qqmapsdk, handleRegionchangeTimmer;
export default {
  components: {},
  props: {
    polygons: {
      //区域坐标
      type: Array,
      default: [
        {
          points: [
            {
              latitude: "30.592156",
              longitude: "104.090362",
            },
            {
              latitude: "30.530591",
              longitude: "103.802323",
            },
            {
              latitude: "30.694087",
              longitude: "103.869159",
            },
          ],
          strokeWidth: 1, //描边的宽度
          strokeColor: "#ff000066", //描边的颜色
          fillColor: "#ff000016", //填充颜色
        },
      ],
    },
    qqmapsdkKey: {
      //地图key
      type: String,
      default: "",
    },
    base_url: {
      type: String,
      default: "",
    },
    sig: {
      type: String,
      default: "",
    },
  },
  data() {
    // 这里存放数据
    return {
      position: {
        latitude: "30.592156",
        longitude: "104.090362",
      },
      isChangeSelectItem: false,
      animateLocation: false,
      searchKey: "", //搜索关键字
      searchList: [], //搜索结果
    };
  },
  // 计算属性-缓存 类似于data概念
  computed: {
    //随机背景色
  },
  // 监控data中的数据变化
  //watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  onLoad(options) {
    console.log(options);
  },
  // 生命周期 - 页面展示（不可以访问DOM元素）
  onShow() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  onReady() {
    // const mapDom = uni.createMapContext("map_2023xbf", this);
    // console.log("mapDom", mapDom);
    // this.renderList();
  },
  // 方法集合
  methods: {
    // 地图搜索
    searchPosition() {
      console.log("searchPosition");
    },
    // 地图拖动
    handleRegionchange(e) {
      console.log("handleRegionchange", e);
      // if (e.type === "end") {
      //   clearTimeout(handleRegionchangeTimmer);
      //   handleRegionchangeTimmer = setTimeout(() => {
      //     this.getCenterLocation();
      //   }, 500);
      // }
      // this.animateLocation = false;
      // if (e.type == "end") {
      //   if (this.isChangeSelectItem) {
      //     setTimeout(() => {
      //       this.isChangeSelectItem = false;
      //     }, 100);
      //     return;
      //   } else {
      //     this.animateLocation = true;
      //     if (handleRegionchangeTimmer) {
      //       clearTimeout(handleRegionchangeTimmer);
      //     }
      //     handleRegionchangeTimmer = setTimeout(() => {
      //       this.renderList();
      //     }, 400);
      //   }
      // }
    },
    // 生成地图
    renderList() {
      // map上下文对象
      const mapDom = uni.createMapContext("map_2023xbf", this);
      //  获取地图中心点位置
      mapDom.getCenterLocation({
        success: (res) => {
          console.log("getCenterLocation", res);
          this.position = {
            latitude: res.latitude,
            longitude: res.longitude,
          };
          this.animateLocation = false;
        },
      });
      //  地图中心位置为当前定位
      // mapDom.moveToLocation({
      //   longitude: this.position.longitude,
      //   latitude: this.position.latitude,
      //   success: (res) => {
      //     console.log("res--地图中心当前定位", res);
      //   },
      // });
    },

    // 计算滑动角度
    //计算滑动角度 start 起点坐标 end 终点坐标
    // angle(start, end) {
    //   let _X = end.X - start.X,
    //     _Y = end.Y - start.Y;
    //   //返回角度 Math.atan()返回数字的反正切值
    //   return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
    // },
    // touchstart(e) {
    //   console.log("e", e);
    //   // return;
    //   const { clientX, clientY } = e.changedTouches[0];
    //   this.startX = clientX;
    //   this.startY = clientY;
    // },
    // touchMove(e) {},
    // touchEnd(e) {
    //   const slidingRange = 45;
    //   const touchMoveX = e.changedTouches[0].clientX;
    //   const touchMoveY = e.changedTouches[0].clientY;
    //   let angle = this.angle(
    //     {
    //       X: this.startX,
    //       Y: this.startY,
    //     },
    //     {
    //       X: touchMoveX,
    //       Y: touchMoveY,
    //     }
    //   );
    //   //为了方便计算取绝对值判断
    //   if (Math.abs(angle) > slidingRange && touchMoveY < this.startY) {
    //     // 向上滑动
    //     this.moveFlag = true;
    //   }
    //   if (Math.abs(angle) > slidingRange && touchMoveY > this.startY) {
    //     // 向下滑动
    //     this.moveFlag = false;
    //   }
    // },
    // 随即色
    randomColor(index) {
      console.log("Math.random() ", Math.random(), index);
      return "#" + Math.floor(Math.random() * 0xffffff + index).toString(16);
    },
  },
  // 生命周期 - 监听页面隐藏
  onHide() {},
  // 生命周期 - 监听页面卸载
  onUnload() {},
};
</script>
<style scope lang='scss'>
.map-out {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-flow: column;
}
.mp-content {
  height: 65%;
  width: 100%;
  // flex: 1;
  .map-img {
    width: 100%;
    height: 100%;
  }
}
.action-list {
  padding-bottom: env(safe-area-inset-bottom);
  flex: 1;
  overflow-y: hidden;
  display: flex;
  flex-flow: column;
  // position: relative;
  .search-input {
    padding: 32rpx 40rpx;
    border-bottom: 2rpx solid #f4f4f4;
  }
  .res-lists {
    padding: 0 40rpx;
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .item-a {
    // padding: 24rpx;
    display: flex;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f4f4f4;
    .item-aa {
      margin-right: 32rpx;
      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
      }
      .address {
        font-size: 26rpx;
        color: #666666;
        line-height: 1.5;
      }
    }
  }
  .item-a.check-icon {
    background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/map-choose-icon.png");
    background-size: cover;
  }
  .picker-checked {
    background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/map-choose-icon.png");
    background-size: cover;
    width: 48rpx;
    height: 48rpx;
    display: block;
  }
  .uncheck-icon {
    width: 48rpx;
    height: 48rpx;
    background: #f1f1f1;
    border-radius: 50%;
  }
  .ft {
    border-top: 2rpx solid #f4f4f4;
    padding: 32rpx 40rpx 0;
  }
  .choose-btn {
    background: #1d9bdc;
    height: 84rpx;
    line-height: 84rpx;
    font-size: 34rpx;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 254rpx;
  }
}
@keyframes bounceInDown {
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30rpx, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15rpx, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -4rpx, 0) scaleY(1.02);
  }
}
</style>