/*
 * @Date: 2022-08-10 16:51:27
 * @LastEditors: ''
 * @LastEditTime: 2022-09-09 17:19:31
 * @FilePath: \xianhuo-miniprogram\src\store\module\address.ts
 */
interface addType {
    lng: string;
    lat: string;
}
export default {
    namespaced: true,

    state: {
        addressInfo: {},
        addressType: false,
        //经纬度
        addNum: {
            lng: '',//精度
            lat: '',//纬度
        }
    },

    getters: {

    },

    mutations: {
        setAddress(state: any, payload: any) {
            // console.log(payload, "保存数据到仓库");
            return state.addressInfo = payload;
        },
        setAddressType(state: any, payload: any) {
            state.addressType = payload
        },
        clearAddress(state) {
            state = {}
        },
        clearAddressType(state) {
            state.addressType = null
        }
    },

    actions: {

    }
}