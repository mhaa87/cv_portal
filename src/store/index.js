import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
Axios.defaults.headers.post["Content-Type"] = "application/json";

export default new Vuex.Store({
    state: {
        title: "Funkweb CV Portal",
        uri: "http://localhost:3000",
        loggedIn: false,
        key: null,
        page: "cv",
        editMode: false,
        // showCVmenu: false,
        // newCV: false,
        // newCVname: "default",
        // cvList: [],
        // cvName: "default",
        // fonts: [
        //     {name: "Times New Roman",  value: "'Times New Roman', Times, serif", style:{'font-family': "'Times New Roman', Times, serif"}},
        //     {name: "Arial",  value: "Arial, Helvetica, sans-serif", style:{'font-family': "Arial, Helvetica, sans-serif"}},
        //     {name: "Arial Black",  value: "'Arial Black', Gadget, sans-serif", style:{'font-family': "'Arial Black', Gadget, sans-serif"}}
        // ],
        defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
    },

    mutations: {
        toggleEdit: store => store.editMode = !store.editMode,
        setPage: (store, newPage) => store.page = newPage,
        setLoginStatus: (store, status) => {store.loggedIn = status},
        setKey: (store, key) => store.key = key,
    },

    actions: {
        loginAction: async (context, playload) => {
            return await Axios.post(context.state.uri + "/login", {"createUser": playload.register, "key": context.state.key, "user": playload.user});
        },

        saveAction: async (context, content) => {
            return await Axios.post(context.state.uri + "/saveCV", {"key": context.state.key, "content": content});
        }

    }

})