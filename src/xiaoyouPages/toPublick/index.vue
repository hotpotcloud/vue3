<template>
  <web-view :src="url"></web-view>
</template>
<script>
import {URLDistributor} from "@/utils/url";
import Api from "@/utils/api";
export default {
  data() {
    return {
      url: "",
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    async getData() {
      const {data} = await Api.$getX(`${URLDistributor.config}offiaccount`);
      this.url = data;
    },
  },
};
</script>
