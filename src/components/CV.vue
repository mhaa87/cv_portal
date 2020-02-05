<template>
<div>
  <!-- Profile Images 
  http://elitebasketballny.com/wp-content/uploads/2018/07/profile-placeholder.png
  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyyMhElczAun9ZRqqxPI5Pb-8Rrl7ZAa1C-PxuVYmt88daITXV
  https://st4.depositphotos.com/9998432/23741/v/450/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg
  https://cdn1.vectorstock.com/i/thumb-large/46/55/person-gray-photo-placeholder-woman-vector-22964655.jpg
  https://cdn1.vectorstock.com/i/thumb-large/13/70/person-gray-photo-placeholder-woman-vector-23511370.jpg
  https://anecca.org/wp-content/uploads/2017/10/profile-blank-female.png
  https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_960_720.png
  https://icon-library.net/images/default-user-icon/default-user-icon-3.jpg
  http://www.myptzone.com/assets/1/18/placeholder_male.png?9
  -->
  
  <div class="CV" id="print">

    <div class="cvContent cvPadding" :style="cvStyle">
      <!-- Name & personal info -->
      <div> <name/> <pInfo :narrow="false"/> <div class="emptyRow"></div> </div>
      <!-- Profile image -->
      <pImg />

      <!-- Main content -->
      <div class="fullRow mainContent">
        <template v-for="(list, i) in content.mainContent">
          <template v-if="list.show">

              <div :key="'text_' + i" v-if="list.type === 'text'"  class="fullRow">
                <b class="cvItemHeadline">{{list.title}}</b>
                <br>{{list.text}}
              </div>

              <template v-if="list.type === 'list'">
                  <div :key="'list_' + i" class="fullRow"> <b class="cvItemHeadline">{{list.title}} </b> </div>

                  <template v-for="(item, j) in list.items">
                      <div :key="'l_h_' + i + '_' + j" class="duration firstRow">{{getDurationText(item)}}</div>
                      <div :key="'l_t_' + i + '_' + j" class="secondRow"><b>{{item.title}}</b></div>
                      <div :key="'l_c_' + i + '_' + j" class="secondRow">{{item.text}}</div>
                  </template>
              </template>

              <div :key="'empty_' + i" class="emptyRow"></div>
          </template>      
      </template>
    </div>

    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import EditWindow from './CV_Edit_Window.vue'
import cvText from './CV_Text.vue'
import pInfo from './CV_PersonalInfo.vue'
import name from './CV_Name.vue'
import pImg from './CV_ProfileImg.vue'
import cvMainContent from './CV_MainContent.vue'

export default {
  name: 'CV',
  components: {EditWindow, cvMainContent, cvText, pInfo, name, pImg},
  data() { return {
    edit: "",
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
  }},

  computed:{
    ...mapState(['loggedIn', 'fonts', 'cvList', 'showCVmenu', 'content', 'editWindow', 'user']),
    getKey() {var i=0; return (j) =>{return i++ + '' + j}},
    cvStyle() {return {'font-family': this.content.style.font, 'font-size': this.content.style.fontSize + 'px'}},
    imgStyle() {return {'height': this.content.style.imgSize + 'px'}},
  },

  methods: {
    ...mapMutations(['setFont', 'setFontSize', 'setEditWindow']),
    ...mapActions(['openEdit', 'saveAction', 'cvMenuAction', 'deleteCV', 'deleteAll', 'loadCV', 'profileImgStyle']),

    getDurationText(item){
      return item.fromDate + ' - ' + item.toDate;
    },

    formatDate (date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return month + '.' + year;
    },
  },
  
  mounted() {}

}

</script>

<style scoped>

.fullRow{grid-column: 1 / 3}
.firstRow{grid-column: 1 / 2}
.secondRow{grid-column: 2 / 3}
.emptyRow{padding-top: 1em}

.mainContent{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
}

.cvContent{
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 3px;
  grid-row-gap: 5px;
}

.cvItemHeadline{font-size: 1.2em}
.duration{margin-right: 10px}

.cvContent h2{margin: 0px 0px 20px 0px}
.headline{font-size: 1.2em}
input {font-family: inherit;}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

.yearInput{max-width: 2.5em;}
.monthInput{max-width: 1.5em;}

textarea{
  width: 100%;
  resize:vertical;
}

.CV{
  box-sizing: border-box;
  color: black;
  min-height: 990px;
  padding: 0.5in;
  background-color: rgb(255, 255, 255);
  box-shadow: inset 2px 0px 3px 0px rgba(0, 0, 0, 0.45), inset -2px 0px 3px 0px rgba(0, 0, 0, 0.45), inset 0px 2px 3px 0px rgba(0, 0, 0, 0.45);
}

.editBox{
  padding: 15px;
  box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.45), -2px 0px 3px 0px rgba(0, 0, 0, 0.45), 0px 2px 3px 0px rgba(0, 0, 0, 0.45);
}

</style>