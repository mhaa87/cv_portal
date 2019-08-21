<template>
  <div class="cvPage">
    <div></div><cvMenu class="cvMenu" /><div></div>
    <div class="sidePage">
      <h3>Click an element in the CV to edit it.</h3>
      <div class="lists">
        <template v-for="(list, i) in content.lists">
          <b class="centerText">{{list.title}}:</b>
          <button @click="list.items.unshift(defaultListItem)">Add</button>
          <button @click="list.items.sort(sortListElements)">Sort</button>
          <button @click="list.show = !list.show">{{hideButton(list.show)}}</button>
        </template><br/>
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
      <!-- <div>Font: <input type="select" @change="(e) => setFont(e.target.value)" :value="content.style.font"></div><br/> -->
      <div>Font size: <input class="numInput" type="number" @change="(e) => setFontSize(e.target.value)" :value="content.style.fontSize"></div><br/>
      <div>Profile image size: <input class="imgSizeInput" type="number" @change="(e) => setImgSize(e.target.value)" :value="content.style.imgSize"></div>
      <input @change="(e) => setImgSize(e.target.value)" type="range" min="100" max="250" :value="content.style.imgSize"> <br/><br/>
      Layout:<br/>
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
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Title", text: "Info..."},
  }},

  mounted(){},
  computed:{...mapState(['content', 'fonts']),},
  methods: {
    ...mapMutations(['setFont', 'setFontSize','setImg', 'setImgSize', 'setEditWindow']),

    hideButton(show){ return show ? 'Hide' : 'Show'},

    getDurationText(duration){
        var text = "";
        if(duration.from.month.length > 0) text += duration.from.month + ".";
        text += duration.from.year;
        if(duration.to.year.length > 0) text += " - ";
        if(duration.to.month.length > 0) text += duration.to.month + ".";
        if(duration.to.year.length > 0) text += duration.to.year;
        return text;
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
  padding: 8px 15px;
  font-size: inherit;
  /* width: 200px; */
}

button:hover{background-color: rgb(255, 255, 255, 0.25);}

.middlePage {
  overflow: auto;
  padding-bottom: 10px;
}

.sidePage{
  text-align: center;
  font-size: 18px;
  margin: 60px 40px;
  padding: 10px;
  min-height: 450px;
  min-width: 250px;
  max-width: 350px;
}

.lists{
  display: grid;
  grid-template-columns: 1fr auto auto auto;
}

</style>

