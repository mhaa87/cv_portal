<template>
<div>
  <!-- Edit Window -->
  <EditWindow v-if="editWindow.show" :editInfo="editWindow.info" />
  
  <div class="CV" id="print">
    <div class="cvContent cvPadding" :style="cvStyle">
        <!-- Name -->
        <div @click="openEdit({name: 'name'})" class="clickable midLeftCol name">{{content.name}}</div>

        <!-- Personal Info -->
        <div class="clickable personalInfoArea" @click="openEdit({name: 'info'})"></div>
        <div class="personalInfoTitles leftCol">
            <div :key="'l' + i" v-for="(item, i) in content.personInfo">
            <input v-if="edit==='info'" v-model="content.personInfo[i].title">
            <b v-else>{{item.title}}:</b></div></div>
        <div class="personalInfoData">
            <span :key="'r' + i" v-for="(item, i) in content.personInfo">
              <input v-if="edit==='info'" v-model="content.personInfo[i].text">
              <span class="infoText" v-else>{{item.text}}</span><br />
            </span>
        </div><div></div><div></div>

        <!-- Profile Image -->
        <div @click="openEdit({name: 'image'})" class="profileImg rightCol clickable">
          <img :style="imgStyle" :src="content.style.imgLink">
        </div>
        
        <!-- Intro text -->
        <div @click="openEdit({name: 'intro'})" class="clickable introArea"></div>
        <div class="introTitle"><b class="headline">{{content.intro.title}}</b></div>
        <div class="introData">{{content.intro.text}}</div>
        <div class="fullRow emptyRow"></div>

        <!-- Experience and Education lists -->
        <cvList class="fullRow" />

        <!-- Other information -->
        <div class="clickable fullRow" @click="openEdit({name: 'other'})" :style="{gridRow: otherRowStyle(0, 2)}"></div>
        <div class="fullRow" :style="{gridRow: otherRowStyle(0, 1)}"><b class="headline">{{content.other.title}}</b></div>
        <div class="fullRow" :style="{gridRow: otherRowStyle(1, 1)}">{{content.other.text}}</div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import EditWindow from './CV_Edit_Window.vue'
import cvList from './CV_List.vue'

export default {
  name: 'CV',
  components: {EditWindow, cvList},
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
    ...mapActions(['saveAction', 'cvMenuAction', 'deleteCV', 'deleteAll', 'loadCV', 'profileImgStyle']),

    log(text){console.log(text)},

    openEdit(info){
      if(this.editWindow.show) return;
      this.setEditWindow({'show': true, 'info': info});
    },

    otherRowStyle(rowStart, span){
      var n = 7 + rowStart;
      for(var i = 0; i < this.content.lists.length; i++){ n += this.content.lists[i].show ? this.content.lists[i].items.length*2 + 2 : 0; }
      return n + '/' + (n + span);
    },

    download(){
        var cv = document.getElementById("print");
        var popupWin = window.open('', '_blank', 'width= 1000px,height=900,location=no,left=200px, top=20px');
        popupWin.document.open();
        popupWin.document.write('<html><title>Preview</title><link rel="stylesheet" type="text/css" href="cvStyle.css" /></head><body onload="window.print()">'
        + '<div class="CV">'); 
        popupWin.document.write(cv.innerHTML);
        popupWin.document.write('</div></body></html>');
        popupWin.document.close();
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
  },
  
  mounted() {
    // this.editContent = this.content;
  }

}

</script>

<style scoped>

.personalInfoArea{grid-area: 2 / 1 / 3 / 3;}
.personalInfoTitles{grid-area: 2 / 1 / 3 / 2;}
.personalInfoData{grid-area: 2 / 2 / 3 / 3;}
.introArea{grid-area: 4 / 1 / 6 / 4;}
.introTitle{grid-area: 4 / 1 / 5 / 4;}
.introData{grid-area: 5 / 1 / 6 / 4;}

.leftCol{grid-column: 1 / 2; padding-right: 25px;}
.midCol{grid-column: 2 / 3}
.rightCol{grid-column: 3 / 4}
.midLeftCol{grid-column: 1 / 3}
.midRightCol{grid-column: 2 / 4}
.fullRow{grid-column: 1 / 4}
.emptyRow{padding-top: 1em}

.profileImg{
  grid-area: 1 / 3 / 4 / 4;
  /* display: flex; */
  /* padding: 3px; */
  border: none;
  min-width: 125px;
  min-height: 125px;
}

.profileImg:hover{
  padding: 0px;
  box-shadow: 3px 0px 6px 0px rgba(0, 0, 0, 0.65), -3px 0px 6px 0px rgba(0, 0, 0, 0.65), 0px 3px 6px 0px rgba(0, 0, 0, 0.65), 0px -3px 6px 0px rgba(0, 0, 0, 0.65);
}

.profileImg img{
  height: 150px; 
  margin: auto; 
  display: block;
}
.cvContent h2{margin: 0px 0px 20px 0px}
.name{
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 0.5em;
  }
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

.cvContent{
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto 1fr;
}

.CV{
  box-sizing: border-box;
  color: black;
  width: var(--cv_width);
  min-height: 990px;
  padding: 20px 30px;
  /* margin: 10px; */
  /* overflow: auto; */
  background-color: rgb(255, 255, 255);
  box-shadow: inset 2px 0px 3px 0px rgba(0, 0, 0, 0.45), inset -2px 0px 3px 0px rgba(0, 0, 0, 0.45), inset 0px 2px 3px 0px rgba(0, 0, 0, 0.45);
}

.editBox{
  padding: 15px;
  box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.45), -2px 0px 3px 0px rgba(0, 0, 0, 0.45), 0px 2px 3px 0px rgba(0, 0, 0, 0.45);
}

</style>