<template>
  <v-app>

    <NavMenu/>
    <Login v-if="showLogin" />
    <v-content transition="slide-x-transition" class="mainContent">
        <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavMenu from './components/NavMenu.vue'
import Login from './components/Login.vue'
 
export default {
  name: "App",
  components: {NavMenu, Login},

  data: () => ({}),

  computed:{
    ...mapState(['page', 'showLogin', 'title', 'editMode', 'key', 'autoLogin', 'commentList']),
  },

  methods: {
    ...mapMutations(['setKey', 'setAutoLogin']),
    ...mapActions(['pageLoad', 'login', 'getComments']),
    showLoginWindow() {return true}
  },

  mounted() {
  this.setAutoLogin(localStorage.getItem("autoLogin") === "true");
  if(this.autoLogin){
      this.setKey(localStorage.getItem("key")); 
      if(this.key != null && this.key.length > 0) this.login(true);
  }
  this.getComments();
  }

};
</script>

<style>
:root {
  /* --bg-image: url("./assets/bg_13.jpg"); */
  --bg-image: url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
  --main-bg-color: white;
  --main_content-bg-color: rgb(0, 0, 15, 0.85);
  --topbar-bg-color: rgb(0, 0, 15, 0.85);
  --cv_width: 700px;
  /* var(--main_content-bg-color); */
}

.lightPrimaryColors {
  color: var(--v-darkText-base) !important;
  background-color: var(--v-primary-lighten1) !important;
}

.darkPrimaryColors {
  color: var(--v-darkText-base) !important;
  background-color: var(--v-primary-darken1) !important;
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
  margin-bottom: 20px;
}

.mainPageLayout{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  margin: 0px 60px;
}

.fullWidth{width: 100%}

.clickable{ z-index: 1; }
.clickable:hover{ 
  cursor: pointer; 
  padding: 3px;
  /* color: red; */
  box-shadow: 2px 0px 2px 0px rgba(0, 0, 0, 0.65), -2px 0px 2px 0px rgba(0, 0, 0, 0.65), 0px 2px 2px 0px rgba(0, 0, 0, 0.65), 0px -2px 2px 0px rgba(0, 0, 0, 0.65);
}
.minSize{ min-height: 1em;}

.rowReverse{
  display: flex;
  flex-direction: row-reverse;
}

.centerTextAlign{text-align: center}
.centerText{margin-top: auto;margin-bottom: auto;}
.centerDiv{margin: auto auto;}
.centerSpan{margin: auto auto; display: inline-block; text-align: center}

.boldText{font-weight: bold;}
.fullHeight{height: 100%;}

/* button{
  border: none;
  height: 100%;
  color: inherit;
  background-color: transparent;
}
button.selected{}
button:hover{}
button:active{}
button:focus {outline:none !important;} */

#app {
    height: 100%;
    width: 100%;
}
</style>
