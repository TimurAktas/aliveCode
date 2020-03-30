const state = {
    selectedTabview: 0,
}

const getters = {
    getSelectedTabview: state => state.selectedTabview,
}

const actions = {
    sendRequestToDatabaseWithDate({commit}, data){
        commit('SET_SELECTED_TABVIEW', data)
    }
}

const mutations = {
    SET_SELECTED_TABVIEW: (state, payload) => {
        state.selectedTabview = payload
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}