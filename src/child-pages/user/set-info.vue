<template>
  <!-- <view> {{text}} </view> -->
  <view>
    <view v-if="res.type === 'protocol'" style="padding: 0 24rpx">
      <rich-text :nodes="text"></rich-text>
    </view>
    <view v-if="res.type === 'aboutUs'" class="about">
      <image
        class="imgus"
        src="https://nx-prd-dpbp.s3.cn-northwest-1.amazonaws.com.cn/miniprogram-go-about-us.png"
        mode="aspectFit"
      />
    </view>
  </view>
</template>

<script>
import api from "@/utils/api";
export default {
  data() {
    return {
      res: {
        name: "",
        type: "", //protocol-协议说明,aboutUs-关于我们
      },
      text: "",
    };
  },
  onLoad(option) {
    this.res = { ...option };
    console.log(this.res);
    this.changeTitle(this.res.name);
    this.getMsg(this.res.type);
  },
  onShow() {
    console.log("首次加载", this.res);
  },
  methods: {
    // 改变导航文字
    changeTitle(tip) {
      if (tip) {
        uni.setNavigationBarTitle({
          title: this.res.name,
        });
      }
    },
    // 请求
    getMsg(type) {
      if (type === "aboutUs") return;
      const url = this.urlapi.about[`${type}`];
      console.log(url, "------", type);
      api.$get(url, {}).then((res) => {
        console.log(res);
        this.text = res.data?.content;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.about {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.imgus {
  height: 100%;
  width: 100%;
}
</style>
