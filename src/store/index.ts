/*
 * @Date: 2022-08-10 16:51:27
 * @LastEditors: ''
 * @LastEditTime: 2022-09-07 17:17:45
 * @FilePath: \xianhuo-miniprogram\src\store\index.ts
 */
/*
 * @author: xbf
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 商品product
import product from "./module/product";
//我的
import user from "./module/user";
// 选中地址
import address from "./module/address";
import home from "./module/home";
// 选择优惠券
import coupon from "./module/coupon";
//判断设备
import css from "./module/css";
// 查看配送日历参数
import canlendar from "./module/canlendar";
//物流信息
import order from "./module/order";
import refund from "./module/refund";
//组件共享
import newhope from "./module/newhope";
//配送
import distribution from "./module/distribution";
//配送计划
import plan from "./module/plan";
//小优
import xiaoyou from "./module/xiaoyou";
// 门店
import shop from "./module/shop";
import shopCar from "./module/shopCar";

//奶卡fc06
import milkcard from "./module/milkcard";
// 会员fc09
import member from "./module/member";
// 长停
import orderPlan from "./module/orderPlan";
const store = new Vuex.Store({
  modules: {
    product,
    user,
    address,
    home,
    coupon,
    css,
    canlendar,
    order,
    refund,
    newhope,
    distribution,
    plan,
    xiaoyou,
    shop,
    milkcard,
    shopCar,
    member,
    orderPlan,
  },
});

export default store;
