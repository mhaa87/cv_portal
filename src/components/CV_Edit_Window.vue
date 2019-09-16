<template>
<div class="editWindow">
  
  <div v-if="editInfo.type === 'name'" class="centerTextAlign">
    <div class="name">Name: </div>
    <input class="name" v-model="content.name"> 
  </div>
  
  <div v-else-if="editInfo.type === 'info'" class="centerTextAlign">
    <h2>Personal information:</h2>
    <div :key="i" v-for="(item, i) in content.personInfo">
      <input v-model="content.personInfo[i].title">
      <input v-model="content.personInfo[i].text">
      Show: <input class="checkbox" type="checkbox" v-model="content.personInfo[i].show"> 
      <button class="deleteButton" @click="content.personInfo.splice(i, 1)">Delete</button>
    </div>
  </div>

  <div v-else-if="editInfo.type === 'image'" class="profileImg">
    <h2>Profile image:</h2>
    <img :src="content.style.imgLink"><br>
    Link: <input @change="(e) => setImg(e.target.value)" :value="content.style.imgLink"><br>
  </div>

  <div v-else-if="editInfo.type === 'text'" class="listElementEdit">
    <div><input class="boldText" v-model="editInfo.data.content.title"></div>
    <textarea class="editText" v-model="editInfo.data.content.text"></textarea> 
  </div>

  <div v-else-if="editInfo.type === 'list'" class="listElementEdit">
      <div>Title:<input class="titleInput" v-model="editInfo.data.item.title"></div>
      <div> Duration:
        <input type="number" min="1" max="12" class="monthInput" v-model="editInfo.data.item.duration.from.month">
        <input type="number" min="1000" max="9999" class="yearInput" v-model="editInfo.data.item.duration.from.year">
        -
        <input type="number" min="1" max="12" class="monthInput" v-model="editInfo.data.item.duration.to.month">
        <input type="number" min="1000" max="9999" class="yearInput" v-model="editInfo.data.item.duration.to.year">
      </div>
      <textarea class="editText" v-model="editInfo.data.item.text"></textarea>
  </div>

  <div v-else-if="editInfo.type === 'listTitle'">
    <div class="name">Title: </div>
    <input class="name" v-model="editInfo.data.list.title">
  </div>

  <div v-else-if="editInfo.type === 'newCV'">
    <h2>New CV</h2>
    <div style="text-align: center">
      <div>Name: <input v-model="newCVname"></div>
      <input type="radio" name="temp" value="current" v-model="newCVtemplate" checked>Current CV
            <input type="radio" name="lang" value="english" v-model="newCVtemplate" checked>English
      <input type="radio" name="lang" value="norsk" v-model="newCVtemplate">Norsk<br/>
    </div>
  </div>

  <div class="buttons">
    <button v-if="editInfo.type === 'newCV'" @click="closeWindow()">Cancel</Button>
    <button v-else-if="editInfo.type === 'list'" @click="deleteListElement(editInfo.data.list.items)">Delete</Button>
    <button v-else-if="editInfo.type === 'listTitle' && editInfo.data.list.canDelete" class="deleteButton" @click="deleteListElement(content.mainContent)">Delete</button>
    <button v-else-if="editInfo.type === 'info'" @click="content.personInfo.push({title:'title', text: '...', 'show': true})">Add</button>
    <button @click="okButton()">Ok</Button>
  </div>
  <div class="error" v-if="errorMsg !== false">Error: {{errorMsg}}</div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV',

  data() { return {
    newCVname: '',
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
    newCVtemplate: 'current',
    errorMsg: false,
  }},

  props: {editInfo: Object,},
  computed:{...mapState(['content', 'editWindow']),},
  methods: {
    ...mapMutations(['setEditWindow', 'setImg', 'setImgSize', 'setDefaultCV']),
    ...mapActions(['saveAction']),
    
    deleteListElement(list){
      list.splice(this.editInfo.data.index, 1);
      this.setEditWindow({show: false, type: {}});
    },

    okButton(){
      if(this.validateInput() === false) return;
      if(this.editWindow.type === 'newCV') {
        if(this.newCVtemplate !== 'current') this.setDefaultCV(this.newCVtemplate);
        this.saveAction(this.newCVname);
      }
      this.closeWindow();
    },

    validateInput(){
      this.errorMsg = false;
      if(this.editInfo.type === 'name' && this.content.name.length < 1){this.errorMsg="Name can not be empty";}
      else if(this.editInfo.type === 'newCV' && this.newCVname.length < 1){this.errorMsg="CV name can not be empty";}
      else if(this.editInfo.type === 'text' && this.editInfo.data.content.title.length < 1){this.errorMsg="Title name can not be empty";}
      else if(this.editInfo.type === 'listTitle' && this.editInfo.data.list.title.length < 1){this.errorMsg="List name can not be empty";}
      else if(this.editInfo.type === 'list'){
        if(this.editInfo.data.item.title.length < 1){this.errorMsg="Title can not be empty";}
        else if(this.editInfo.data.item.duration.from.year.length < 4){this.errorMsg="The year in the from date is not valid";}
      }else if(this.editInfo.type === 'info'){
        var i;
        for(i in this.content.personInfo){
          if(this.content.personInfo[i].title.length < 1) {this.errorMsg="Info title can not be empty"; break;}
        }
      }
      
      return this.errorMsg === false;
    },

    closeWindow(){this.setEditWindow({show: false, type: '', data: {}, error: false});}

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
.editText{min-height: 8em; max-width: 600px;}
.listElementEdit{
  display: grid;
  grid-row-gap: 5px;
  grid-template-columns: auto;
}

.error {
  color: red; 
  font-weight: bold; 
  padding-bottom: 5px;
  text-align: center
}

.name{
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
  font-family: inherit;
  width: 18em;
}

h2 {text-align: center}

.buttons {
  height: 55px;
  text-align: center;
}

button {
  width: 120px;
  height: 100%;
  font-size: 18px;
}

.deleteButton:hover {font-size: 18px;}

button:hover{
  font-size: 28px;
  background-color: rgb(0,0,0,0.1);
}
</style>