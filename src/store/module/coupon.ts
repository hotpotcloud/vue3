export default {
  namespaced: true,

  state: {
    couponCode: null,
  },

  getters: {},

  mutations: {
    setCoupon(state: any, payload: any) {
      console.log(payload, "保存优惠券编码到仓库");
      state.couponCode = payload;
      // return state.addressInfo = payload;
    },
    clearCoupon(state) {
      state.couponCode = null;
    },
  },

  actions: {},
};
