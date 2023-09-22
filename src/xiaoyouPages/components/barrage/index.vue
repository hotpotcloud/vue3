<template>
  <view
    :style="{
      width: width,
      height: `${height}rpx`,
      position: 'relative',
    }"
  >
    <view
      v-for="(item, index) in danmuList"
      :key="item"
      class="danmu-item"
      :style="{
        top: `${(index % 3) * 58 + (index % 3 === 0 ? 1 : index % 3) * 10}rpx`,
      }"
      >{{ item }}</view
    >
  </view>
</template>
<script>
export default {
  props: {
    width: {
      type: Number | String,
      default: "100vw",
    },
    height: {
      type: Number,
      default: 200,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
      // observer(newV) {
      //   const textList = newV.map(
      //     (danmu) =>
      //       `用户${danmu.nickName.slice(0, 1) + "**"}已获得${
      //         danmu.money
      //       }元鲜推官佣金`
      //   );
      //   console.log(textList, "textList");
      //   this.setData({
      //     dataList: textList,
      //   });
      // },
    },
  },
  computed: {
    dataList() {
      const textList = this.list.map(
        (danmu) =>
          `用户${danmu.nickName.slice(0, 1) + "**"}已获得${
            danmu.money
          }元鲜推官佣金`
      );
      console.log(textList, "textList");
      return textList;
    },
  },
  data() {
    return {
      danmuList: [],
      interval: "",
    };
  },
  mounted() {
    let index = 0;
    console.log(this.dataList, "dataList");
    this.interval = setInterval(() => {
      if (this.dataList.length > 0) {
        const danmu = this.dataList[index];
        // const text = `用户${danmu.nickName}已获得${danmu.money}元鲜推官佣金`
        if (index >= this.dataList.length) {
          clearInterval(this.interval);
        } else {
          this.danmuList.push(danmu);
          index++;
        }
      }
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.danmu-item {
  background: rgba(51, 51, 51, 0.45);
  height: 58rpx;
  font-size: 24rpx;
  border-radius: 66rpx;
  line-height: 58rpx;
  position: absolute;
  color: white;
  white-space: normal;
  width: 450rpx;
  text-align: center;
  animation: danmu 15s linear forwards;
}
@keyframes danmu {
  from {
    left: 100%;
  }
  to {
    left: -400%;
    display: none;
  }
}
</style>
