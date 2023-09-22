<template>
  <view>
    <!-- 溯源页面 -->
    <web-view :src="url" />
  </view>
</template>

<script>
import {mapMutations, mapState} from "vuex";
export default {
  data() {
    return {
      url: "",
      option: {},
    };
  },
  onLoad(option) {
    console.log(option, "option");
    if (option) {
      this.option = option;
      //   this.setUrl(option);
    }
  },
  onnShow() {
    this.setUrl(this.option);
  },
  computed: {
    ...mapState("user", ["loginStatus"]),
  },

  methods: {
    ...mapMutations("user", ["set_channel"]),
    setUrl(options) {
      if (options.channel) {
        if (this.loginStatus) {
          this.set_channel("FSL");
          const url = options.allPath;
          const userInfo = uni.getStorageSync("userMsg");
          //   console.log(userInfo, "------------userinfo");
          //   console.log(
          //     url + `?type=mini&tel=${userInfo.phone}&name=${userInfo.username}`,
          //     "---------------url"
          //   );
          this.url =
            url + `?type=mini&tel=${userInfo.phone}&name=${userInfo.name}`;
        }
      } else {
        uni.navigateTo({
          url: "/pages/user/relogin?channel=" + options.channel, //注册登录
        });
      }
    },
  },
};
</script>

<style scoped></style>
