export default {
    namespaced: true,

    state: {
        params: null,

        receipt: {},//账单日历数据
    },
    getters: {

    },

    mutations: {
        X_setReceipt(state: any, payload) {
            console.log('payload', payload)
            state.receipt = payload
        },
        setParams(state: any, payload: any) {
            console.log(payload, "跳转参数");
            state.params = payload;
            // return state.addressInfo = payload;
        },
        clearParams(state) {
            state.Params = null;
        }
    },

    actions: {

    }
}