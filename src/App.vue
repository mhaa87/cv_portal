<template>
  <div id="app" class="mainGridColumns mainContent">
      <NavMenu/>
      
      <CV v-if="page === 'cv'"/>   
      
      <div v-if="page === 'home'">
      Funkweb CV Portal
      </div>
      
      <div v-if="page === 'guide'">
      Guide on how to use this site
      </div>
      
      <div v-if="page === 'tips'">
      Tips on how to write a good CV
      </div>

      <Login/>
  </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex';
import { mapState, mapActions} from 'vuex';
import NavMenu from './components/NavMenu.vue'
import CV from './components/CV.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    NavMenu, CV, Login
  },
  computed:{
      ...mapState(['page', 'showLogin']),
  },

  methods: {
      ...mapActions(['pageLoad']),
  },

}
</script>

<style>
body, html{
    margin: 0px;
    height: 100%;
    background-color: rgb(213, 226, 241);
}

.mainGridRows{
  display: grid;
  grid-template-rows: 5% auto;
}

.mainGridColumns{
  grid-template-columns: 27% 46% 27%;
}

.mainContent{
  display:grid;
  grid-area: 2 / 1 / 3 / 4;
}

.topbar{
    background-color: #2670d1;
    box-shadow: inset 0px -4px 4px -4px rgba(0,0,0,1);
    color: #eaf6ff;
    display: flex;
    padding: 3px 0px;
}

.topbar button{
    color: inherit;
    border: none;
    cursor: default;
    font-size: 16px;
    padding: 5px 10px;
    margin: 0px 5px;
    user-select: none;
    border-radius: 10px 10px 10px 10px;
    border-width: 2px 2px 2px 2px;
}

.middle{
    justify-content: center;
}

.right{
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
  background-color: #5d96e0;
}
button:hover{
  background-color: #5d96e0;
}
button:active{
  box-shadow: inset 5px 5px 4px 0px rgba(0, 0, 0, 0.75);
  background-color: #2670d1;
}
button:focus {outline:none !important;}

#app {
    height: 100%;
    width: 100%;
}
</style>
