<template>
  <v-container class="cvEditPage">
    
    <EditPersonalInfo />

    <EditContent :key="'mc' + i" v-for="(list, i) in content.mainContent" 
      :data="{'content': list, 'index': i}"/>

  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CV from '@/components/CV.vue'
import cvMenu from '@/components/CV_Menu.vue'
import EditWindow from './CV_Edit_Window.vue'
import EditContent from './CV_Edit_Content.vue'
import EditPersonalInfo from './CV_Edit_pInfo.vue'

export default {
  name: 'MyCV',

  components: {EditContent, EditPersonalInfo, EditWindow, CV, cvMenu},

  data() { return {
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Title", text: "Info...",},
  }},

  mounted(){},
  computed:{...mapState(['content', 'fonts', 'editWindow']),},
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
.cvEditPage{
  /* display:grid; */
  /* grid-template-columns: 1fr auto 1fr; */
  /* box-sizing: border-box; */
  /* padding-top: 30px; */
  /* height: 100%; */
  text-align: middle;
  width: 100%;
}

.sidePage, .cvMenu, .middlePage{
  /* background-color: var(--main_content-bg-color); */
} 

.verticalMenu{
  flex-direction: column;
}

button{
  height: auto;
  padding: 8px 8px;
  font-size: 0.9em;
  /* width: 200px; */
}

/* .moveButtons {height: 35px}
.moveButtons button{
  display: inline-block;
  margin-top: 0px;
  padding: 0px; 
  height: 100%; 
  width: 20px;
} */
.titleButton{text-align: left;}
.checkbox{
  width: 18px; 
  height: 100%;
  margin: auto;
}

button:hover{background-color: rgb(255, 255, 255, 0.25);}

.middlePage {
  /* overflow: auto; */
  /* padding-bottom: 10px; */
  width: var(--cv_width);
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

