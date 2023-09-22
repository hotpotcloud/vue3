<template>
  <view class="box-picker_position">
    <view class="map_wp">
      <map
        id="map_20230515"
        class="picker-map"
        :latitude="position.latitude"
        :longitude="position.longitude"
        :polygons="polygons"
        @regionchange="handleRegionChange"
        scale="10"
      ></map>
      <view
        :class="['picker_map_location', animateLocation ? 'animated' : '']"
      ></view>
    </view>
    <view class="list-picker_position">
      <view class="hd">
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
      <view class="bd">
        <view
          v-for="(item, index) in searchList"
          @click="changeSelectItem(index)"
          :class="['item', 'd-flex-center', item.useable ? '' : 'disabled']"
          :key="index"
        >
          <view class="item-c">
            <view class="title">{{ item.title }}</view>
            <view class="address">{{ item.address }}</view>
          </view>
          <view class="item-r">
            <img v-if="item.select" class="picker-checked" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {gpsToAddress, getPoiInfo} from "@/utils/mapLocation";

export default {
  props: {
    polygons: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      animateLocation: false,
      searchKey: "",
      position: {latitude: "30.67", longitude: "104.07"},
      searchList: [],
      regionTimer: null,
      changeOriginByUser: false,
    };
  },
  mounted() {
    if (this.polygons.length > 0 && this.polygons[0].points.length > 0) {
      this.position.latitude = this.polygons[0].points[0].latitude;
      this.position.longitude = this.polygons[0].points[0].longitude;
      this.renderList({
        ...this.position,
      });
    }
  },
  methods: {
    debounceRenderList(e) {
      clearTimeout(this.regionTimer);
      this.regionTimer = setTimeout(() => {
        this.renderList(e.detail.centerLocation);
      }, 400);
    },
    renderList(centerLocation) {
      const latitude = centerLocation.latitude;
      const longitude = centerLocation.longitude;
      gpsToAddress(latitude, longitude)
        .then((res) => {
          const {formatted_address} = res;
          this.searchList = [
            {
              title: formatted_address,
              address: formatted_address,
              latitude,
              longitude,
              select: true,
              useable: true,
            },
          ];
        })
        .catch((e) => {
          this.searchList = [];
        });
    },
    // 清空搜索
    onClearSearch() {
      this.searchKey = "";
    },
    //搜索
    async searchPosition() {
      try {
        const searchStr = this.searchKey.replace(/\s+/, "");
        if (!searchStr) {
          return;
        }
        const res = await getPoiInfo(searchStr);
        const data = res.data;
        if (data.pois && data.pois.length > 0) {
          const list = data.pois.map((item) => {
            const location = item.location?.split(",") || [];
            return {
              title: item.name,
              address: item.address,
              latitude: location?.[1],
              longitude: location?.[0],
              select: false,
              useable: true,
            };
          });
          this.searchList = list;
        }
      } catch (e) {}
    },
    changeSelectItem(index) {
      const list = this.searchList.map((item, idx) => {
        if (index === idx) {
          item.select = true;
          this.position = {...item};
          this.changeOriginByUser = false;
        } else {
          item.select = false;
        }
        return item;
      });
      this.searchList = list;
    },
    handleRegionChange(e) {
      // 勾选触发 不查询列表
      if (e?.mp?.causedBy === "drag" && e?.mp?.type === "end") {
        this.debounceRenderList(e);
      }
    },
    isPointInPolygon(aLat, aLon, pointList) {
      /*
			            :param aLon: double 经度
			            :param aLat: double 纬度
			            :param pointList: list [{latitude: 22.22, longitude: 113.113}...] 多边形点的顺序需根据顺时针或逆时针，不能乱
			            */
      var iSum = 0;
      var iCount = pointList.length;

      if (iCount < 3) {
        return false;
      }
      //  待判断的点(x, y) 为已知值
      var y = aLat;
      var x = aLon;
      for (var i = 0; i < iCount; i++) {
        var y1 = pointList[i].latitude;
        var x1 = pointList[i].longitude;
        if (i == iCount - 1) {
          var y2 = pointList[0].latitude;
          var x2 = pointList[0].longitude;
        } else {
          var y2 = pointList[i + 1].latitude;
          var x2 = pointList[i + 1].longitude;
        }
        // 当前边的 2 个端点分别为 已知值(x1, y1), (x2, y2)
        if ((y >= y1 && y < y2) || (y >= y2 && y < y1)) {
          //  y 界于 y1 和 y2 之间
          //  假设过待判断点(x, y)的水平直线和当前边的交点为(x_intersect, y_intersect)，有y_intersect = y
          // 则有（2个相似三角形，公用顶角，宽/宽 = 高/高）：|x1 - x2| / |x1 - x_intersect| = |y1 - y2| / |y1 - y|
          if (Math.abs(y1 - y2) > 0) {
            var x_intersect = x1 - ((x1 - x2) * (y1 - y)) / (y1 - y2);
            if (x_intersect < x) {
              iSum += 1;
            }
          }
        }
      }
      if (iSum % 2 != 0) {
        //true就是在
        return true;
      } else {
        //false就是不在
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
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

.box-picker_position {
  height: 100vh;
  width: 100%;
  background: #fff;
  display: flex;
  flex-flow: column;
  position: relative;
  overflow: auto;
  box-sizing: border-box;
}
.map_wp {
  // background: #007aff;
  position: relative;
  width: 750rpx;
  height: 500rpx;
  height: 70%;
}
.picker_map_location {
  width: 60rpx;
  height: 60rpx;
  background-image: url("data:image/svg+xml,%3Csvg t='1670988557938' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='3498' width='200' height='200'%3E%3Cpath d='M511.968 0c-207.84 0-376.96 169.12-376.96 376.992 0 54.208 11.104 105.984 32.96 153.888 94.24 206.24 274.976 424 328.128 485.824 3.968 4.608 9.792 7.296 15.904 7.296s11.904-2.656 15.904-7.296c53.12-61.824 233.856-279.552 328.128-485.824 21.888-47.904 32.96-99.648 32.96-153.888-0.032-207.872-169.152-376.992-376.992-376.992zM511.968 572.8c-107.968 0-195.808-87.84-195.808-195.808s87.84-195.84 195.808-195.84 195.808 87.84 195.808 195.84c0 107.968-87.84 195.808-195.808 195.808z' fill='%23fa3c23' p-id='3499'%3E%3C/path%3E%3C/svg%3E");
  background-size: cover;
  background-position: center bottom;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -30rpx;
  margin-top: -60rpx;
  z-index: 999;
  transform-origin: center bottom;
}
.picker_map_location.animated {
  animation: bounceInDown 0.6s linear infinite;
}
.picker-map {
  width: 750rpx;
  height: 100%;
  // height: 500rpx;
  // height: 70%;
}
.list-picker_position {
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  .hd {
    padding: 32rpx 40rpx;
    border-bottom: 2rpx solid #f4f4f4;
    display: flex;
  }
  .bd {
    padding: 0 40rpx 175rpx;
    box-sizing: border-box;
    flex: 1;
    overflow-y: scroll;
    .item {
      display: flex;
      padding: 24rpx 0;
      border-bottom: 1rpx solid #f4f4f4;
      // line-height: 1.92;
      // align-items: stretch;
      align-items: center;
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
    .item-l {
      padding: 10rpx 6rpx 0 0;
    }
    .item-c {
      flex: 1;
      margin-right: 32rpx;
    }
    .item-r {
      width: 48rpx;
      height: 48rpx;
      background: #f1f1f1;
      border-radius: 50%;
    }
    .item.disabled {
      opacity: 0.5;
    }
  }
}
.btn-search {
  background: #007aff;
  font-size: 24rpx;
  color: #fff;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  width: 120rpx;
}

.picker-checked {
  background-image: url("https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/map-choose-icon.png");
  background-size: cover;
  width: 48rpx;
  height: 48rpx;
  display: block;
  // margin-left: 32rpx;
}
.ft {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 176rpx;
  padding: 32rpx 40rpx;
  background: #fff;
  border-block: 1rpx solid #f4f4f4;
}
.btn-selected {
  background: #1d9bdc;
  height: 84rpx;
  line-height: 84rpx;
  font-size: 34rpx;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 254rpx;
}
.btn-selected.disabled {
  background: #f2f2f2;
  color: #ccc;
}
</style>
