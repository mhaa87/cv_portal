import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Fonts from'./fonts.json'
import CVobj from './cvContent.json'

Vue.use(Vuex)
Axios.defaults.headers.post["Content-Type"] = "application/json";

export default new Vuex.Store({
    state: {
        title: "Funkweb CV Portal",
        uri: "http://localhost:3000",
        loggedIn: false,
        autoLogin: false,
        key: null,
        page: "cv",
        cvList: [],
        showCVmenu: false,
        showNewCV: false,
        content: CVobj,
        fonts: Fonts,
        user: {
            name: "tester",
            email: "test@testmail.com",
            password: "testpassword",
        },
        register: false,
        editMode: false,
        showLogin: false,
        error: false,
        errorMsg: "",
    },

    mutations: {
        setPage: (store, newPage) => store.page = newPage,
        setLoginStatus: (store, status) => {store.loggedIn = status},
        setAutoLogin: (store, value) => {store.autoLogin = value},
        setKey: (store, key) => store.key = key,
        setStyle: (store, style) => store.content.style = style,
        setFont: (store, font) => store.content.style.font = font,
        setFontSize: (store, size) => store.content.style.fontSize = size,
        setImg: (store, link) => store.content.style.imgLink = link,
        setImgSize: (store, size) => store.content.style.imgSize = size,
        setEditMode: (store, value) => store.editMode = value,
        setNewCV: (store, value) => {store.showNewCV = value; store.showCVmenu = false},
        sendCVcontent: (store, func) => store.getCVcontent = func,
        toggleLogin: (store, register) => {
            store.showLogin = register ? (!store.register || !store.showLogin) : (!store.showLogin || store.register);
            store.register = register;
            store.error = false;
        },
        toggleCVmenu: (store) => {store.showCVmenu = !store.showCVmenu},
    },

    actions: {  
        download(context){
            if(context.state.editMode) return;
            var cv = document.getElementById("print");
            var popupWin = window.open('', '_blank', 'width= 1000px,height=900,location=no,left=200px, top=20px');
            popupWin.document.open();
            popupWin.document.write('<html><head><title>Preview</title><link rel="stylesheet" type="text/css" href="printStyle.css" /></head><body onload="window.print()">'
            + '<div class="cvPrint">'); 
            popupWin.document.write(cv.innerHTML);
            popupWin.document.write('</div></body></html>');
            popupWin.document.close();
        },

        login: async (context, autoLogin) => {
            var store = context.state;
            var res = await Axios.post(store.uri + "/login", {"createUser": store.register, "key": store.key, "user": autoLogin ? false : store.user});
            var data = res.data;
            store.error = !data.status;
            if(store.error && (store.user === false)) {store.error = false; return}
            if(store.error){store.errorMsg = data.msg; return;}
            context.state.loggedIn = data.status;
            context.state.key = data.key;
            store.showLogin = false;
            localStorage.setItem("key", data.key);
            localStorage.setItem("autoLogin", store.autoLogin ? 'true' : 'false');
            store.user.name = data.name;
            // this.getLastCV();
        },

        logout: async(context) => {
            context.state.loggedIn = false;
            context.state.openMenu = false;
            context.state.autoLogin = false;
            localStorage.setItem("autoLogin", 'false');
            context.state.user = {name: "", email: "", password: ""};
        },

        saveAction: async (context, name) => {
            context.state.content.cvName = name;
            await Axios.post(context.state.uri + "/saveCV", {"key": context.state.key, "content": context.state.content});
        },

        loadCVlist: async(context, showMenu) => {
            if(!showMenu){context.state.showCVmenu = false; return;}
            context.state.showCVmenu = true;
            var res = await Axios.post(context.state.uri + "/cvMenu", {"key": context.state.key})
            context.state.cvList = res.data.status ? res.data.cvList : [];
        },

        loadCV: async function(context, name){
            var res = await Axios.post(context.state.uri + "/getCV", {"key": context.state.key, "cvName": name});
            context.state.content = res.data.content;
        },

        deleteCV: async(context) => {
            await Axios.post(context.state.uri + "/delete", {"key": context.state.key, "cvName": context.state.content.cvName});
            // await context.state.loadCVlist(true);
        },

        deleteAll: async(context) => {
            await Axios.post(context.state.uri + "/deleteAll", {"key": context.state.key});
        }

    }

})