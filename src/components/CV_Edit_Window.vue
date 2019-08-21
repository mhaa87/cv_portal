<template>
<div class="editWindow">
  
  <div v-if="editInfo.name === 'name'">
    <span class="name">Name: </span>
    <input class="name" v-model="content.name"> 
  </div>
  
  <div v-else-if="editInfo.name === 'info'">
    <h2>Personal information:</h2>
    <div :key="i" v-for="(item, i) in content.personInfo">
      <input v-model="content.personInfo[i].title">
      <input v-model="content.personInfo[i].text">
    </div>
  </div>

  <div v-else-if="editInfo.name === 'image'" class="profileImg">
    <h2>Profile image:</h2>
    <img :src="content.style.imgLink"><br>
    Link: <input @change="(e) => setImg(e.target.value)" :value="content.style.imgLink"><br>
  </div>

  <div v-else-if="editInfo.name === 'intro'">
    <input class="boldText" v-model="content.intro.title"><br/><br/>
    <textarea v-model="content.intro.text"></textarea> 
  </div>

  <div v-else-if="editInfo.name === 'other'">
    <input class="boldText" v-model="content.other.title"><br/><br/>
    <textarea v-model="content.other.text"></textarea> 
  </div>

  <div v-else-if="editInfo.name === 'list'" class="listElementEdit">
      <div>Title:<input class="titleInput" v-model="editInfo.item.title"></div>
      <div> Duration:
        <input type="number" class="monthInput" v-model="editInfo.item.duration.from.month">
        <input type="number" class="yearInput" v-model="editInfo.item.duration.from.year">
        -
        <input type="number" class="monthInput" v-model="editInfo.item.duration.to.month">
        <input type="number" class="yearInput" v-model="editInfo.item.duration.to.year">
      </div>
      <textarea class="listEditText" v-model="editInfo.item.text"></textarea>
  </div>

  <div v-else-if="editInfo.name === 'newCV'">
    <h2>New CV</h2>
    <div style="text-align: center">Name: <input v-model="newCVname"></div>
  </div>

  <div class="buttons">
    <button v-if="editInfo.name === 'newCV'" @click="setEditWindow({show: false, info: {}})">Cancel</Button>
    <button v-if="editInfo.name === 'list'" @click="deleteListElement()">Delete</Button>
    <button @click="okButton()">Ok</Button>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV',

  data() { return {
    newCVname: '',
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
  }},

  props: {editInfo: Object,},
  computed:{...mapState(['content', 'editWindow']),},
  methods: {
    ...mapMutations(['setEditWindow', 'setImg', 'setImgSize']),
    ...mapActions(['saveAction']),
    
    deleteListElement(){
      this.editInfo.list.items.splice(this.editInfo.index, 1);
      this.setEditWindow({show: false, info: {}});
    },

    okButton(){
      if(this.editWindow.info.name === 'newCV'){this.saveAction(this.newCVname)}
      this.setEditWindow({show: false, info: {}});
    },

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
  .editWindow{
    color: black;
    box-sizing: border-box;
    z-index: 2;
    position: fixed;
    background-color: rgb(255, 255, 255, 1);
    border: solid 1px black;
    padding: 20px;
    width: 650px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 25%;
    min-height: 200px;
    box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.65), -3px 0px 5px 0px rgba(0, 0, 0, 0.65), 0px 3px 5px 0px rgba(0, 0, 0, 0.65), 0px -3px 5px 0px rgba(0, 0, 0, 0.65);
}

.profileImg input{width: 32em}
.profileImg img{width: 120px; display:block; margin:auto}
.monthInput{width: 2.5em}
.yearInput{width: 4em}
.titleInput{width: 25em}
.listEditText{min-height: 8em; max-width: 600px;}
.listElementEdit{
  display: grid;
  grid-row-gap: 5px;
  grid-template-columns: auto;
}

.name{
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
  font-family: inherit;
}

h2 {text-align: center}

.buttons{
  height: 55px;
  text-align: center;
}

button {
  width: 120px;
  height: 100%;
  font-size: 18px;
}

button:hover{
  font-size: 28px;
  background-color: rgb(0,0,0,0.1);
}
</style>