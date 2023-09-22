import api from '@/utils/api'
import { distributionUrl } from '@/utils/url';
export default {
    namespaced: true,
    state: {
        projectList: [],//配送规律列表
        total: 0,//总数
        addProject: {
            defaulted: 0,
            ruleType: [],//配送规律
            deliveryDetails: '',//星期
            intervalDate: 0,//间隔天数
            timeSection: [],//配送时段
            everyNum: null,//单次配送数量
            planName: '',//计划名字
            planRuleNo: '',//配送规律编码
            receiverNo: '',//收货地址，
        },
        editData: {}//编辑配送
    },
    grtters: {

    },
    mutations: {

        M_setProjectList(state: { projectList: any[] }, payload: any[]) {
            state.projectList = payload
        },
        F_setTotal(state: any, payload: any) {
            state.total = payload
        },
        M_setRuleType(state: { addProject: any }, payload: any) {
            console.log('payload', payload)
            state.addProject.ruleType = payload.ruleType
            state.addProject.deliveryDetails = payload.deliveryDetails.toString()
            state.addProject.intervalDate = payload.intervalDate
        },
        M_timeFrame(state: { addProject: any }, payload: any) {
            state.addProject.timeSection = payload.toString()
        },
        M_everyNum(state: { addProject: any }, payload: any) {
            state.addProject.everyNum = payload
        },
        M_receiverNo(state: { addProject: any }, payload: any) {
            state.addProject.receiverNo = payload
        },
        M_planName(state: { addProject: any }, payload: any) {
            state.addProject.planName = payload
        },

        M_setEditData(state: { editData: any }, payload: any) {
            state.editData = payload
        },
        M_AlterRuleType(state: { editData: any }, payload: any) {
            state.editData.ruleType = payload.ruleType
            state.editData.deliveryDetails = payload.deliveryDetails.toString()
            state.editData.intervalDate = payload.intervalDate
            state.editData.ruleTypeName = payload.ruleTypeName
        },
        M_AlterTimeFrame(state: { editData: any }, payload: any) {
            state.editData.timeSection = payload.timeSection.toString()
            state.editData.timeSectionName = payload.timeSectionName
        },
        M_AlterEveryNum(state: { editData: any }, payload: any) {
            state.editData.everyNum = payload
        },
        M_AlterReceiverNo(state: { editData: any }, payload: any) {

            state.editData.receiverNo = payload.addressNo
            state.editData.receiverName = payload.receiver
            state.editData.receiverPhone = payload.receiverPhone
            state.editData.addressDetails = payload.adressDetail

        },
        M_AlterPlanName(state: { editData: any }, payload: any) {
            state.editData.planName = payload

        },
    },
    actions: {

        async A_getProjectList({ state, commit }, params: any) {

            try {
                console.log('params', params)
                const { data }: any = await api.$post(distributionUrl.selectPlanList, params)
                commit('F_setTotal', data.totalElements)
                console.log('data.totalElements', data.totalElements, state.projectList.length)
                if (params.page <= 1) {
                    commit('M_setProjectList', data.content)
                } else {
                    commit('M_setProjectList', [...state.projectList, ...data.content])
                }

            } catch (error) {

            }

        }
    }
}