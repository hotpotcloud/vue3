<!--
 * @Date: 2022-08-08 12:23:44
 * @LastEditors: ''
 * @LastEditTime: 2022-08-08 22:59:11
 * @FilePath: \xianhuo-miniprogram\src\subPages\nonet\nonet.vue
-->
<!--
 * @author: xbf
-->
<template>
  <view class="nonet-out">
    <!-- <h-network @handleRest="reload" :isloading="loading"></h-network> -->
  </view>
</template>

<script>
export default {
  data(){
    return{
      loading:false
    }
  },
  methods: {
    reload() {
      this.loading=true
      //声明一个pages使用getCurrentPages方法
      const pages = getCurrentPages();
      const curPage = pages[0];
      uni.getNetworkType({
        success: function (res) {
          console.log(res.networkType);
          if (res.networkType !== "none") {
            this.loading=false
            uni.navigateBack({
              delta: 1,
              success: () => {
                // 声明一个当前页面
                curPage.onLoad(curPage.options); // 传入参数
                curPage.onShow();
                curPage.onReady();
              },
            });
          }
        },
      });

      // uni.navigateBack({
      //   delta: 1,
      //   success: () => {
      //     // 声明一个当前页面
      //     curPage.onLoad(curPage.options); // 传入参数
      //     curPage.onShow();
      //     curPage.onReady();
      //   },
      // });
    },
  },
};
</script>

<style scoped lang="scss">
.nonet-out {
  padding-top: 214rpx;
}
</style>
