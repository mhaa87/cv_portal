<template>
  <div id="app" class="mainContent">
      <!-- Top bar -->
      <Topbar/>

      <!-- Main page -->
      <div class="mainPage">
        <cvPage v-if="page === 'cv'" />
        <homePage v-else-if="page === 'home'" />
        <HelpMenu v-else-if="page === 'guide'" />    
        <TipPage v-else-if="page === 'tips'"/>
        <AdminPage v-else-if="page === 'admin'"/>
      </div>

        <!-- Bottom bar -->
        <Bottombar/>

        <!-- <span>
          <Login v-if="showLogin" class="topbar rowReverse"/>
          <Style v-if="page ==='cv'" />
        </span> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import homePage from './components/homePage.vue'
import cvPage from './components/CV_Page.vue'
import Login from './components/Login.vue'
import Style from './components/Style.vue'
import Topbar from './components/Topbar.vue'
import HelpMenu from './components/helpMenu.vue'
import TipPage from './components/TipPage.vue'
import Bottombar from './components/Bottombar.vue'
import AdminPage from './components/adminPage.vue'

export default {
  name: 'app',
  components: {
    homePage, Login, Style, cvPage,Topbar, HelpMenu, TipPage, Bottombar, AdminPage,
  },
  computed:{
      ...mapState(['page', 'showLogin', 'title', 'editMode', 'key', 'autoLogin']),
  },

  methods: {
      ...mapMutations(['setKey', 'setAutoLogin']),
      ...mapActions(['pageLoad', 'login']),
  },

  mounted() {
    this.setAutoLogin(localStorage.getItem("autoLogin") === "true");
    if(this.autoLogin){
        this.setKey(localStorage.getItem("key")); 
        if(this.key != null && this.key.length > 0) this.login(true);
    }
  }
}
</script>

<style>
:root {
  --bg-image: url("./assets/bg_5.jpg");
  --main-bg-color: white;
  --main_content-bg-color: rgb(0, 0, 15, 0.8);
  --topbar-bg-color: rgb(0, 0, 15, 0.8);
  --cv_width: 700px;
  /* var(--main_content-bg-color); */
}

html, body {
  height: 100%;
  padding: 0px;
  margin: 0px;
  color: white;
}
body{
    background-image: var(--bg-image);
    background-size: cover;
}

.mainContent {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr auto;
  padding: 0px;
  margin: 0px;
}

.mainPageTitle{
  text-align: center;
  font-size: 48px;
  padding-top: 48px;
  font-weight: bold;
}
.mainPage{
  margin: 0px auto;
  overflow-y: hidden;
}

.mainPageLayout{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  margin: 0px 60px;
}

.clickable{ z-index: 1; }
.clickable:hover{ cursor: pointer; background-color: rgb(0,0,0, 0.075); }

.rowReverse{
  display: flex;
  flex-direction: row-reverse;
}

.centerText{margin-top: auto;margin-bottom: auto;}
.centerDiv{margin: auto auto;}
.centerSpan{margin: auto auto; display: inline-block; text-align: center}

.boldText{font-weight: bold;}
.fullHeight{height: 100%;}

button{
  border: none;
  height: 100%;
  color: inherit;
  background-color: transparent;
}
button.selected{}
button:hover{}
button:active{}
button:focus {outline:none !important;}

#app {
    height: 100%;
    width: 100%;
}
</style>
