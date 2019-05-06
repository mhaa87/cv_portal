<template>
  <div id="app" class="mainGridRows mainContent">
      <Topbar/>
      <span class="mainGridColumns">
        <NavMenu/>
        <cvEdit v-if="page === 'cv' && editMode"/> 
        <CV v-else-if="page === 'cv'" class="CV" id="print"/>
        <span v-else>
          <div v-if="page === 'home'"> Funkweb CV Portal </div>
          <div v-if="page === 'guide'"> Guide on how to use this site </div>    
          <div v-if="page === 'tips'"> Tips on how to write a good CV </div>
        </span>
        
        <span>
          <Login v-if="showLogin" class="topbar rowReverse"/>
          <Style v-if="page ==='cv'" />
        </span>
      </span>
  </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex';
import { mapState, mapMutations, mapActions } from 'vuex'
import NavMenu from './components/NavMenu.vue'
import CV from './components/CV.vue'
import cvEdit from './components/CV_Edit.vue'
import Login from './components/Login.vue'
import Style from './components/Style.vue'
import Topbar from './components/Topbar.vue'

export default {
  name: 'app',
  components: {
    NavMenu, CV, Login, Style, cvEdit,Topbar,
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
//1: 26426A - button pressed 
//2: 325991 - button selected
//3: 3E70B8 - button hover
//4: 5F8BCA - button background
//5: 84A7D8 - 
//6: c9d6e9 - background
</script>

<style>
body, html{
    margin: 0px;
    height: 100%;
    background-color: #c9d6e9;
}

.mainGridRows{
  display: grid;
  grid-template-rows: 5% auto;
}

.mainGridColumns{
  display: grid;
  grid-template-columns: 27% 46% 27%;
}

.mainContent{
  display:grid;
  grid-area: 2 / 1 / 3 / 4;
}

h1{
    margin: auto 0px;
    padding-left: 25px;
    font-size: calc(100% + 0.9vw);
}

.topbar{
    background-color: #5F8BCA;
    box-shadow: inset 0px -2px 2px -2px rgba(0,0,0,1);
    color: #eaf6ff;
    padding: 0px 0px;
    z-index: 2;
}

.topbar button{
    color: inherit;
    border: none;
    cursor: default;
    font-size: 16px;
    padding: 5px 10px;
    user-select: none;
    border-width: 2px 2px 2px 2px;
}

.dropMenu{
    position: absolute;
    display: flex;
    background-color: #5F8BCA;
    z-index: 3;
    box-shadow: inset -1px -1px 2px 0px rgb(0, 0, 0, 0.75), inset 1px 0px 2px 0px rgba(255, 255, 255, 0.75);
}

.middleTopbar{
    justify-content: center;
    display: flex;
    flex-direction: row;
}

.rowReverse{
  display: flex;
  flex-direction: row-reverse;
}

.centerText{
    margin-top: auto;
    margin-bottom: auto;
}

.boldText{
    font-weight: bold;
}

.fullHeight{
  height: 100%;
}

button{
  border: none;
  height: 100%;
  background-color: transparent;
  color: #eaf6ff;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.85);

}
button.selected{
  box-shadow: inset 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
  background-color: #325991;
}
button:hover{
  background-color: #3E70B8;
}
button:active{
  box-shadow: inset 5px 5px 4px 0px rgba(0, 0, 0, 0.75);
  background-color: #26426A;
}
button:focus {outline:none !important;}

#app {
    height: 100%;
    width: 100%;
}
</style>
