<template>
<div>
  <!-- Edit Window -->
  <EditWindow v-if="showEditWindow" :editInfo="editInfo" />
  
  <div class="CV" id="print">
    <div class="cvContent cvPadding" :style="cvStyle">
        <!-- Name -->
        <div @click="openEdit({name: 'name'})" class="clickable midLeftCol name">{{content.name}}</div>

        <!-- Personal Info -->
        <div class="leftCol clickable" @click="openEdit({name: 'info'})">
            <div :key="'l' + i" v-for="(item, i) in content.personInfo">
            <input v-if="edit==='info'" v-model="content.personInfo[i].title">
            <b v-else>{{item.title}}:</b></div></div>
        <div class="secCol clickable" @click="openEdit({name: 'info'})">
            <span :key="'r' + i" v-for="(item, i) in content.personInfo">
              <input v-if="edit==='info'" v-model="content.personInfo[i].text">
              <span class="infoText" v-else>{{item.text}}</span><br />
            </span>
        </div><div></div><div></div>

        <!-- Profile Image -->
        <span @click="openEdit({name: 'image'})" class="profileImg rightCol clickable">
          <img :style="imgStyle" :src="content.style.imgLink">
        </span>
        
        <!-- Intro text -->
        <span @click="openEdit({name: 'intro'})"class="leftCol clickable"><b class="headline">{{content.intro.title}}</b></span><br>
        <div @click="openEdit({name: 'intro'})" class="fullRow clickable">{{content.intro.text}}</div>
        <div class="fullRow emptyRow"></div>

        <!-- Experience and Education lists -->
        <template v-for="(list, i) in content.lists">         
            <div :key="'h' + i" class="boldText headline  clickable">{{list.title}}</div>            
            <template v-for="(item, j) in list.items">
                <span :key="'d'+i+j" @click="openEdit({name: 'list', 'item': item})" class="leftCol clickable"><nobr>{{getDurationText(item.duration)}}</nobr></span>           
                <div :key="'t'+i+j" @click="openEdit({name: 'list', 'item': item})" class="midRightCol boldText clickable">{{item.title}}</div>
                <div :key="'c'+i+j" @click="openEdit({name: 'list', 'item': item})" class="midRightCol clickable">{{item.text}}</div>
            </template>
            <div :key="'e' + i" class="fullRow emptyRow"></div>
        </template>

        <!-- Other information -->
        <span @click="openEdit({name: 'other'})" class="leftCol clickable"><b class="headline">{{content.other.title}}</b></span><br>
        <span @click="openEdit({name: 'other'})" class="fullRow clickable">{{content.other.text}}</span><br><br>

    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import EditWindow from './CV_Edit_Window.vue'

export default {
  name: 'CV',
  components: {EditWindow,},
  data() { return {
    edit: "",
    editInfo: {},
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
  }},

  computed:{
    ...mapState(['loggedIn', 'fonts', 'cvList', 'showCVmenu', 'content', 'showEditWindow']),
    getKey() {var i=0; return (j) =>{return i++ + '' + j}},
    cvStyle() {return {'font-family': this.content.style.font, 'font-size': this.content.style.fontSize + 'px'}},
    imgStyle() {return {'height': this.content.style.imgSize + 'px'}},
  },

  methods: {
    ...mapMutations(['setFont', 'setFontSize', 'setEditWindow']),
    ...mapActions(['saveAction', 'cvMenuAction', 'deleteCV', 'deleteAll', 'loadCV', 'profileImgStyle']),

    log(text){console.log(text)},
    save(){},
    openEdit(info){
      this.editInfo = info;
      this.setEditWindow(true);
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

.leftCol{grid-column: 1 / 2; padding-right: 25px;}
.midCol{grid-column: 2 / 4}
.rightCol{grid-column: 4 / 5}
.secCol{grid-column: 2 / 3}
.midLeftCol{grid-column: 1 / 4}
.midRightCol{grid-column: 2 / 5}
.fullRow{grid-column: 1 / 5}
.emptyRow{padding-top: 1em}

.profileImg{
  grid-row: 1 / 4;
  display: flex;
  /* padding: 3px; */
  border: none;
}

.profileImg:hover{
  padding: 0px;
  /* border: solid 3px black; */
  box-shadow: 3px 0px 6px 0px rgba(0, 0, 0, 0.65), -3px 0px 6px 0px rgba(0, 0, 0, 0.65), 0px 3px 6px 0px rgba(0, 0, 0, 0.65), 0px -3px 6px 0px rgba(0, 0, 0, 0.65);
}

.profileImg img{height: 150px;}
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
  grid-template-columns: auto auto 1fr auto;
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

.clickable:hover{
  cursor: pointer;
  /* padding: 5px; */
  background-color: rgb(0,0,0, 0.075);
  /* box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.45), -2px 0px 3px 0px rgba(0, 0, 0, 0.45), 0px 2px 3px 0px rgba(0, 0, 0, 0.45); */
}

</style>