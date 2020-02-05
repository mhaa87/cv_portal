import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Fonts from "./fonts.json";
import cvContentEng from "./cvContent.json";
import cvContentNor from "./cvContentNorsk.json";

Vue.use(Vuex);
Axios.defaults.headers.post["Content-Type"] = "application/json";

export default new Vuex.Store({
  state: {
    title: "Funkweb CV Portal",
    uri: "http://localhost:3000",
    loggedIn: false,
    autoLogin: false,
    key: null,
    page: "home",
    cvList: [],
    showCVmenu: false,
    isSaving: false,
    showEditWindow: false,
    editWindow: "none",
    editData: {},
    content: cvContentEng,
    cvSize: { width: 700, height: 900 },
    fonts: Fonts,
    user: {
      name: "tester",
      email: "tester@mail.com",
      password: "testpassword",
      isAdmin: false
    },
    admin: {
      users: []
    },
    commentList: [],
    register: false,
    editMode: false,
    showLogin: false,
    error: false,
    errorMsg: ""
  },

  mutations: {
    setPage: (store, newPage) => (store.page = newPage),
    setLoginStatus: (store, status) => (store.loggedIn = status),
    setAutoLogin: (store, value) => (store.autoLogin = value),
    setKey: (store, key) => (store.key = key),
    setStyle: (store, style) => (store.content.style = style),
    setFont: (store, font) => (store.content.style.font = font),
    setFontSize: (store, size) => (store.content.style.fontSize = size),
    setImg: (store, link) => (store.content.style.imgLink = link),
    setImgSize: (store, size) => (store.content.style.imgSize = size),
    setEditMode: (store, value) => (store.editMode = value),
    setEditWindow: (store, info) => {
      store.editWindow = info.type;
      store.editData = info.data;
    },
    setCV(store, cv) {
      store.content = cv;
    },
    sendCVcontent: (store, func) => (store.getCVcontent = func),
    setDefaultCV: (store, lang) => {
      if (lang === "norsk") store.content = cvContentNor;
      else store.content = cvContentEng;
    },
    toggleLogin: (store, register) => {
      store.showLogin = register
        ? !store.register || !store.showLogin
        : !store.showLogin || store.register;
      store.register = register;
      store.error = false;
    },
    setCVmenu: (store, show) => {
      store.showCVmenu = show;
    },
    mainContentSwap: (store, index) => {
      var list = store.content.mainContent;
      if (index.j < 0 || index.j - 1 > list.length) return;
      var temp = list[index.i];
      Vue.set(store.content.mainContent, index.i, list[index.j]);
      Vue.set(store.content.mainContent, index.j, temp);
    }
  },

  actions: {
    download(context) {
      if (context.state.editMode) return;
      var cv = document.getElementById("print");
      var popupWin = window.open(
        "",
        "_blank",
        "width= " +
          context.state.cvSize.width +
          "px,height=" +
          context.state.cvSize.height +
          ",location=no,left=200px, top=20px"
      );
      popupWin.document.open();
      popupWin.document.write(
        '<html><head><title>Preview</title><link rel="stylesheet" type="text/css" href="printStyle.css" /></head>' +
          '<body onload="window.print()"> <div class="cvPrint">'
      );
      popupWin.document.write(cv.innerHTML);
      popupWin.document.write("</div></body></html>");
      popupWin.document.close();
    },

    getComments: async context => {
      var store = context.state;
      var res = await Axios.post(store.uri + "/getComments", {});
      store.commentList = res.data;
    },

    login: async (context, autoLogin) => {
      var store = context.state;
      var res = await Axios.post(store.uri + "/login", {
        createUser: store.register,
        key: store.key,
        user: autoLogin ? false : store.user
      });
      var data = res.data;
      store.error = !data.status;
      if (store.error && store.user === false) {
        store.error = false;
        return;
      }
      if (store.error) {
        store.errorMsg = data.msg;
        return;
      }
      context.state.loggedIn = data.status;
      context.state.key = data.key;
      context.state.user.isAdmin = data.isAdmin;
      if (data.isAdmin) {
        context.state.admin.users = (await Axios.post(
          store.uri + "/admin/getUsers",
          { key: data.key }
        )).data;
      }
      store.showLogin = false;
      localStorage.setItem("key", data.key);
      localStorage.setItem("autoLogin", store.autoLogin ? "true" : "false");
      store.user.name = data.name;
      context.state.cvList = data.cvList;
      // this.getLastCV();
    },

    logout: async context => {
      context.state.loggedIn = false;
      context.state.openMenu = false;
      context.state.autoLogin = false;
      localStorage.setItem("autoLogin", "false");
      context.state.user = { name: "", email: "", password: "" };
    },

    newComment: async (context, comment) => {
      await Axios.post(context.state.uri + "/addComment", { comment: comment });
      await context.dispatch("getComments");
    },

    deleteComment: async (context, commentID) => {
      var res = (await Axios.post(context.state.uri + "/admin/deleteComment", {
        key: context.state.key,
        id: commentID
      })).data;
      await context.dispatch("getComments");
    },

    saveAction: async (context, name) => {
      context.state.content.cvName = name;
      context.state.isSaving = true;
      var res = await Axios.post(context.state.uri + "/saveCV", {
        key: context.state.key,
        content: context.state.content
      });
      context.state.cvList = res.data;
      setTimeout(() => (context.state.isSaving = false), 600);
    },

    loadCVlist: async context => {
      var res = await Axios.post(context.state.uri + "/cvMenu", {
        key: context.state.key
      });
      context.state.cvList = res.data.status ? res.data.cvList : [];
    },

    loadCV: async function(context, name) {
      var res = await Axios.post(context.state.uri + "/getCV", {
        key: context.state.key,
        cvName: name
      });
      context.state.content = res.data.content;
    },

    deleteCV: async context => {
      var res = await Axios.post(context.state.uri + "/delete", {
        key: context.state.key,
        cvName: context.state.content.cvName
      });
      context.state.cvList = res.data;
    },

    deleteAll: async context => {
      await Axios.post(context.state.uri + "/deleteAll", {
        key: context.state.key
      });
    },

    adminGetUserList: async context => {
      // await Axios.post(context.state.uri + "/deleteAll", {"key": context.state.key});
    }
  }
});
