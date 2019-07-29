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

  <div v-else-if="editInfo.name === 'image'">
    <h2>Profile image:</h2>
    Link:
    <input @change="(e) => setImg(e.target.value)" :value="content.style.imgLink"><br>
    Size:
    <input class="imgSizeInput" type="number" @change="(e) => setImgSize(e.target.value)" :value="content.style.imgSize">
    <input @change="(e) => setImgSize(e.target.value)" type="range" min="100" max="250" :value="content.style.imgSize">
  </div>

  <div v-else-if="editInfo.name === 'intro'">
    <input class="boldText" v-model="content.intro.title"><br/><br/>
    <textarea v-model="content.intro.text"></textarea> 
  </div>

  <div v-else-if="editInfo.name === 'other'">
    <input class="boldText" v-model="content.other.title"><br/><br/>
    <textarea v-model="content.other.text"></textarea> 
  </div>

  <div v-else-if="editInfo.name === 'list'">
      From:<input type="number" class="monthInput" v-model="editInfo.item.duration.from.month">
      <input type="number" class="yearInput" v-model="editInfo.item.duration.from.year">
      To:<input type="number" class="monthInput" v-model="editInfo.item.duration.to.month">
      <input type="number" class="yearInput" v-model="editInfo.item.duration.to.year">
      Title:<input v-model="editInfo.item.title">
      <!-- <button v-if="editMode" @click="list.items.splice(i,1)">Delete</button> -->
      <textarea class="fullRow" v-model="editInfo.item.text"></textarea>
  </div>

  <button @click="setEditWindow(false)">Ok</Button>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV',

  data() { return {
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
  }},

  props: {editInfo: Object,},
  computed:{...mapState(['content',]),},
  methods: {...mapMutations(['setEditWindow', 'setImg', 'setImgSize']),},

}

</script>

<style scoped>
  .editWindow{
    color: black;
    box-sizing: border-box;
    z-index: 2;
    position: fixed;
    background-color: rgb(255, 255, 255, 0.85);
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

.name{
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
  font-family: inherit;
}

h2 {text-align: center}

button {
  display: block;
  width: 120px;
  height: 55px;
  margin: auto;
  font-size: 18px;
}

button:hover{
  font-size: 28px;
  background-color: rgb(0,0,0,0.1);
}
</style>