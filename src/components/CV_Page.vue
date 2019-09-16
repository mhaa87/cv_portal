<template>
  <div class="cvPage">
    <div></div><cvMenu class="cvMenu"/><div></div>

    <div class="sidePage">
      <h3>Click an element in the CV to edit it.</h3>
      <div class="mainContent">
        <template v-for="(list, i) in content.mainContent">
          <div class="moveButtons">
            <button @click="mainContentSwap({'i': i, 'j': i-1})"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button @click="mainContentSwap({'i': i, 'j': i+1})"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>         
          </div> 
          <input class="checkbox" type="checkbox" v-model="list.show">        
          <button class="titleButton" @click="setEditWindow({show: true, type: 'listTitle', data: {'list': list, 'index': i}})">{{list.title}}:</button>
          <template v-if="list.type === 'list'">
            <button @click="list.items.sort(sortListElements)">Sort</button>
            <button @click="list.items.unshift(defaultListItem)">Add</button>
          </template>
          <template v-else><span></span><span></span></template>
          <div></div>
        </template>
        <button @click="addList()">Add</button>
      </div>

    </div>
    
    <div class="middlePage"><CV/></div>

    <div class="sidePage">
      <h2>Layout options:</h2>

      <div>Font: 
        <select @change="(e) => setFont(e.target.value)">
          <option v-for="(value, key) in fonts" :key="key" :value="value" :style="{'font-family': value}">{{key}}</option>
        </select>
      </div>
      <div>Font size: <input class="numInput" type="number" @change="(e) => setFontSize(e.target.value)" :value="content.style.fontSize"></div><br/>
      <div>Profile image size: <input class="imgSizeInput" type="number" @change="(e) => setImgSize(e.target.value)" :value="content.style.imgSize"></div>
      <input @input="(e) => setImgSize(e.target.value)" type="range" min="100" max="250" :value="content.style.imgSize"> <br/>
      <div class="title">Layouts:</div>
      <button @click="content.layout = 1">Layout 1</button><br/>
      <button @click="content.layout = 2">Layout 2</button><br/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CV from './CV.vue'
import cvMenu from './CV_Menu.vue'

export default {
  name: 'CV_Page',

  components: {CV, cvMenu,},

  data() { return {
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Title", text: "Info...",},
  }},

  mounted(){},
  computed:{...mapState(['content', 'fonts']),},
  methods: {
    ...mapMutations(['setFont', 'setFontSize','setImg', 'setImgSize', 'setEditWindow', 'mainContentSwap']),

    hideButton(show){ return show ? 'Hide' : 'Show'},

    addList(){
      var i = this.content.mainContent.push({'type': 'text', 'title': 'Title', 'text': '...', 'show': true, 'canDelete': true});
      this.setEditWindow({show: true, type: 'listTitle', data: {'list': this.content.mainContent[i-1], 'index': i-1}})
    },

    sortListElements: function (a, b) {
        var from = this.dateToNumber(b.duration.from.month, b.duration.from.year) - this.dateToNumber(a.duration.from.month, a.duration.from.year)
        var to = this.dateToNumber(b.duration.to.month, b.duration.to.year) - this.dateToNumber(a.duration.to.month, a.duration.to.year)
        return (to === 0) ?  from : to;
    },

    dateToNumber(month, year){
        if(year.length > 0) return (year * 100 + ((month.length > 0) ? month*1 : 0));
        return 0;
    },

  },


}

</script>

<style scoped>
.cvPage{
  display:grid;
  grid-template-columns: 1fr auto 1fr;
  box-sizing: border-box;
  padding-top: 30px;
  height: 100%;
}

.sidePage, .cvMenu, .middlePage{
  background-color: var(--main_content-bg-color);
} 

button{
  height: auto;
  padding: 8px 8px;
  font-size: 0.9em;
  /* width: 200px; */
}

.moveButtons {height: 35px}
.moveButtons button{
  /* margin: auto;  */
  display: inline-block;
  margin-top: 0px;
  padding: 0px; 
  height: 100%; 
  width: 20px;}
.titleButton{text-align: left;}
.checkbox{
  width: 18px; 
  height: 100%;
  margin: auto;
}

button:hover{background-color: rgb(255, 255, 255, 0.25);}

.middlePage {
  overflow: auto;
  padding-bottom: 10px;
}

.sidePage{
  /* text-align: center; */
  font-size: 18px;
  margin: 60px 30px;
  padding: 10px;
  min-height: 450px;
  min-width: 275px;
  max-width: 350px;
}
.mainContent{
  display: grid;
  grid-template-columns: auto auto auto auto auto 1fr;

}
.title{
  font-weight: bold;
  font-size: 1.1em;
}

</style>

