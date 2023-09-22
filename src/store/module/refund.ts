export default {
  namespaced: true,
  state: {
    infoRefund: {},
    selectedMilkCard: [],
  },
  mutations: {
    X_setRefundInfo(state: any, payload: any) {
      state.infoRefund = payload;
    },
    X_setSelectedMilkCard(state: any, payload: any) {
      state.selectedMilkCard = payload;
    },
    clearSelectedMilkCard(state: any, payload: any) {
      state.selectedMilkCard = null;
    },
  },
  actions: {},
};
