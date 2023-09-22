<template>
  <view class="cycle-out">
    <view v-for="(el, index) in list" :key="index">
      <img class="imgs" :class="['imgs' + index]" :src="el.url" />
    </view>
    <!-- <image
        :src="list[0].url"
        mode="scaleToFill"
    /> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          url: "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/1.png",
        },
        {
          url: "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/2.png",
        },
        {
          url: "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/3.png",
        },
        {
          url: "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/4.png",
        },
        {
          url: "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/calender/5.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
.cycle-out {
  /* width: 100vw; */
  overflow-y: auto;
}
.imgs {
  width: 100vw;
  height: 100%;
}
.imgs0 {
  height: 1632rpx;
}
.imgs1 {
  height: 1000rpx;
}
.imgs2 {
  height: 952rpx;
}
.imgs3 {
  height: 1204rpx;
}
.imgs4 {
  height: 1248rpx;
}
</style>
