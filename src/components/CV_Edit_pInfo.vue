<template>
<div>
  <v-btn outlined class="fullWidth button" @click="show = !show">
    <!-- <v-icon>mdi-circle-edit-outline</v-icon> -->
    <span> Personal Information </span>
  </v-btn>

  <div v-if="show" class="centerTextAlign">
    <v-row dense >
      <v-text-field clearable
        label="Full name"
        v-model="content.name"
      ></v-text-field>
    </v-row>
    <v-row dense :key="i" v-for="(item, i) in content.personInfo">
      <v-col cols="4">
        <v-text-field
          :prepend-icon="content.personInfo[i].show ? showIcon : hideIcon"
          @click:prepend="content.personInfo[i].show = !content.personInfo[i].show"
          label="Title"
          v-model="content.personInfo[i].title"
        ></v-text-field>
      </v-col>
      <v-col cols="8">
        <v-text-field
          :append-outer-icon="deleteIcon"
          @click:append-outer="content.personInfo.splice(i, 1)"
          :label="content.personInfo[i].title"
          v-model="content.personInfo[i].text"
        ></v-text-field>
      </v-col>
      <!-- <input v-model="content.personInfo[i].title"> -->
      <!-- <input v-model="content.personInfo[i].text"> -->
      <!-- Show: <input class="checkbox" type="checkbox" v-model="content.personInfo[i].show">  -->
      <!-- <button class="deleteButton" @click="content.personInfo.splice(i, 1)">Delete</button> -->
    </v-row>
    <v-btn outlined @click="content.personInfo.push({title:'title', text: '...', 'show': true})">Add field</v-btn>
    <!-- <div class="error" v-if="errorMsg !== false">Error: {{errorMsg}}</div> -->
  </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV_Edit_Pinfo',
  components: {},

  data() { return {
    show: false,
    showIcon: "mdi-eye",
    hideIcon: "mdi-eye-off",
    deleteIcon: "mdi-delete-forever",
    errorMsg: false,
  }},

  props: {},
  computed:{...mapState(['content', 'editWindow', 'editData']),},
  methods: {
    ...mapMutations(['setEditWindow', 'setImg', 'setImgSize', 'setDefaultCV']),
    ...mapActions(['saveAction']),

    okButton(){

    },

    validateInput(){
      this.errorMsg = false;
      var i;
      for(i in this.content.personInfo){
        if(this.content.personInfo[i].title.length < 1) {
          this.errorMsg="Info title can not be empty"; break;}
      }
      return this.errorMsg === false;
    },

    closeWindow(){this.setEditWindow({show: false, type: '', data: {}, error: false});}

  },

}

</script>

<style scoped>

.fullWidth{width: 100%}

.button{
  margin: 2px 0px;
}
.error {
  color: red; 
  font-weight: bold; 
  padding-bottom: 5px;
  text-align: center
}

</style>