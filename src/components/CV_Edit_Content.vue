<template>
<div>

    <v-btn class="button fullWidth" outlined @click="show = !show">
      <span> {{data.content.title}} </span>
    </v-btn>

  <template v-if="show">
    <v-text-field class="boldText" v-model="data.content.title"></v-text-field>

    <v-row dense v-if="data.content.type === 'text'">
      <v-textarea class="fullWidth" outlined v-model="data.content.text"> </v-textarea > 
    </v-row >
    
    <template v-else>
      <template v-for="(item, i) in data.content.items">
        <v-row :key="'item.title ' + '_1_' + i" dense>
          <v-col cols="1"></v-col>
          <v-col cols="2">
            <v-text-field label="From" v-model="item.fromDate"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="To" v-model="item.toDate"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field class="boldText" label="Title" v-model="item.title"></v-text-field>
          </v-col>
          <v-col style="text-align: center" cols="1" >
              <v-row align="end" justify="center"><v-btn small fab><v-icon style="font-size: 28px">mdi-delete-forever</v-icon></v-btn></v-row>
          </v-col>
        </v-row>
        <v-row  :key="'item.title ' + '_2_' + i" dense>
                    <v-col style="align: center;" cols="1">
            <v-btn fab small><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
            <v-btn fab small><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
          </v-col>
          <v-col cols="11">
            <v-textarea dense class="editText" outlined v-model="item.text"></v-textarea>
          </v-col>
        </v-row>
      </template>
    </template>
  </template>

</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import login from './Login.vue'

export default {
  name: 'CV',
  components: {login},

  data() { return {
    show: '',
    defaultListItem: {"fromDate": "2000", "toDate": "2000", "title": "Job 1", "text": "Info..."},
    errorMsg: false,

  }},

  props: {data: Object},
  computed:{...mapState([]),},
  methods: {
    ...mapMutations([]),
    ...mapActions(['saveAction']),
    
    deleteListElement(list){
      list.splice(this.editData.index, 1);
      this.setEditWindow({show: false, type: {}});
    },

    okButton(){
      if(this.validateInput() === false) return;
      if(this.editWindow === 'newCV') {
        if(this.newCVtemplate !== 'current') this.setDefaultCV(this.newCVtemplate);
        this.saveAction(this.newCVname);
      }
      this.closeWindow();
    },

    validateInput(){
      this.errorMsg = false;
      if(this.editWindow === 'name' && this.content.name.length < 1){this.errorMsg="Name can not be empty";}
      else if(this.editWindow === 'newCV' && this.newCVname.length < 1){this.errorMsg="CV name can not be empty";}
      else if(this.editWindow === 'text' && this.editData.content.title.length < 1){this.errorMsg="Title name can not be empty";}
      else if(this.editWindow === 'listTitle' && this.editData.list.title.length < 1){this.errorMsg="List name can not be empty";}
      else if(this.editWindow === 'list'){
        if(this.editData.item.title.length < 1){this.errorMsg="Title can not be empty";}
        else if(this.editData.item.duration.from.year.length < 4){this.errorMsg="The year in the from date is not valid";}
      }else if(this.editWindow === 'info'){
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

/* .monthInput{width: 2.5em} */
/* .yearInput{width: 4em} */
.editText{
  min-height: 1em; 
  /* max-width: 1200px; */
}

.titleField{
  min-width: 200px;
}

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