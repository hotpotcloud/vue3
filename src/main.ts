/*
 * @Author: ''
 * @Date: 2022-07-20 15:48:58
 */
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import uView from "uview-ui";
Vue.use(uView);
import "common/styles/common.scss";
import {
  showMsg,
  formatAmount,
  countTime,
  noformatAmount,
  getAssetImgUrl,
  errorNull,
  formatGoodsCount,
  getTXimgUrl,
} from "./utils/utils";
Vue.prototype.showMsg = showMsg;
Vue.prototype.countTime = countTime;
import { GET, POST, PUT, DELETE, UPLOADFILE } from "./utils/http";
import urlapi from "./utils/url";
import api from "@/utils/api";

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.GET = GET;
Vue.prototype.POST = POST;
Vue.prototype.PUT = PUT;
Vue.prototype.DELETE = DELETE;
Vue.prototype.UPLOADFILE = UPLOADFILE;
Vue.prototype.urlapi = urlapi;
Vue.prototype.noformatAmount = noformatAmount; //格式化金额
Vue.prototype.$onLaunched = new Promise((resolve) => {
  Vue.prototype.$isResolve = resolve;
});
Vue.prototype.getAssetImgUrl = getAssetImgUrl;
Vue.prototype.getImgUrl = getTXimgUrl;
Vue.filter("formatAmount", formatAmount);
Vue.filter("formatGoodsCount", formatGoodsCount);
Vue.filter("noformatAmount", noformatAmount);
Vue.prototype.errorNull = errorNull;
//分享
// let mpShare = require('uview-ui/libs/mixin/mpShare.js');
// Vue.mixin(mpShare)
// if(uni.getSy)

if (process.env.VUE_APP_MODE === "prod") {
  console.log = () => {};
}
const app = new Vue({
  store,
  ...App,
});
app.$mount();
// 时间过滤器
