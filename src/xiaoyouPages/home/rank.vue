<template>
  <view>
    <More :notLogin="notLogin" />
  </view>
</template>

<script>
import More from "./components/More.vue";
export default {
  data() {
    return {
      notLogin: false,
    };
  },
  onLoad(options) {
    this.notLogin = options?.notLogin === "true";
    console.log(options, "33");
  },
  components: {
    More,
  },
};
</script>

<style scoped lang="scss"></style>
