<template>
<div>
    <v-btn @click="show = !show">
      <v-icon>mdi-circle-edit-outline</v-icon>
      <span class="darkPrimaryColors"> Personal Information </span>
    </v-btn>
    
    <div><input class="boldText" v-model="editData.title"></div>
    <textarea class="editText" v-model="editData.text"></textarea> 
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV',
  components: {},

  data() { return {
    errorMsg: false,
  }},

  props: {editData: {},},
  computed:{...mapState(['content', 'editWindow']),},
  methods: {
    ...mapMutations(['setEditWindow', 'setImg', 'setImgSize', 'setDefaultCV']),
    ...mapActions(['saveAction']),

    validateInput(){
      this.errorMsg = false;
      if(this.editData.content.title.length < 1){this.errorMsg="Title name can not be empty";}
      return this.errorMsg === false;
    },

    closeWindow(){this.setEditWindow({show: false, type: '', data: {}, error: false});}

  },

}

</script>

<style scoped>
  .editWindow{

    margin-left: auto;
    margin-right: auto;
    min-height: 200px;

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