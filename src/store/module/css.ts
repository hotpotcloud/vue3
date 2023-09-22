/*
 * @author: miniApp
 */
export default {
    namespaced: true,

    state: {
        iosFlag: false,//是否苹果机 true是 false否
        iosFont:uni.getSystemInfoSync().model.includes('iPhone')
    },

    getters: {

    },

    mutations: {
        V_getSystemInfo(state:any) {
            const res = uni.getSystemInfoSync()
            console.log('res', res)
            if (res.model.includes('iPhone') || res.system.includes('iOS')) {
                state.iosFlag=true
            } else {
                state.iosFlag=false
            }
        }
       
    },

    actions: {

    }
}