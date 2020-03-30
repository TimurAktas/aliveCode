import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//modules
import topnavigationStore from './modules/topnavigation.store'
import authentificationStore from './modules/authentification.store'
import meetsStore from './modules/meets.store'

const store = new Vuex.Store({
    modules:{
        topnavigationStore,
        authentificationStore,
        meetsStore
    }
})

export default store