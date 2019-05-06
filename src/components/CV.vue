<template>
  <div class="CV" id="print">
    <div class="cvContent cvPadding" :style="cvStyle">
        <!-- Name & personal info -->
        <h2 class="midLeftCol name">{{content.name}}</h2>
        <span class="leftCol"><span :key="getKey(i)" v-for="(item, i) in content.personInfo">
            <b>{{item.title}}:</b><br>
        </span></span>
        <span class="midCol"><span :key="getKey(i)" v-for="(item, i) in content.personInfo">
            <span  class="infoText">{{item.text}}</span><br>
        </span></span>
        <span class="profileImg rightCol"><img :style="imgStyle" :src="content.style.imgLink"></span>
        
        <!-- Intro text -->
        <span class="leftCol"><b class="headline">{{content.intro.title}}</b></span><br>
        <div class="fullRow">{{content.intro.text}}</div>
        <div class="fullRow emptyRow"></div>

        <!-- Experience and Education lists -->
        <template v-for="(list, i) in content.lists">         
            <div :key="getKey(i)" class="boldText headline">{{list.title}}</div>            
            <template v-for="(item, j) in list.items">
                <span :key="getKey(j)" class="leftCol"><nobr>{{getDurationText(item.duration)}}</nobr></span>           
                <div :key="getKey(j)" class="midRightCol boldText">{{item.title}}</div>
                <div :key="getKey(j)" class="midRightCol">{{item.text}}</div>
            </template>
            <div :key="getKey(i)" class="fullRow emptyRow"></div>
        </template>

        <!-- Other information -->
        <span class="leftCol"><b class="headline">{{content.other.title}}</b></span><br>
        <span class="fullRow">{{content.other.text}}</span><br><br>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV',

  data() { return {
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
  }},

  computed:{
    ...mapState(['loggedIn', 'content', 'fonts', 'editMode', 'cvList', 'showCVmenu']),
    getKey() {var i=0; return (j) =>{return i++ + '' + j}},
    cvStyle() {return {'font-family': this.content.style.font, 'font-size': this.content.style.fontSize + 'px'}},
    imgStyle() {return {'height': this.content.style.imgSize + 'px'}},
  },

  methods: {
    ...mapMutations(['setFont', 'setFontSize', 'setEditMode']),
    ...mapActions(['saveAction', 'cvMenuAction', 'deleteCV', 'deleteAll', 'loadCV', 'profileImgStyle']),

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
        if(duration.to.year.length > 0) text += "-";
        if(duration.to.month.length > 0) text += duration.to.month + ".";
        if(duration.to.year.length > 0) text += duration.to.year;
        return text;
    },
  }

}
//1: 26426A - button pressed 
//2: 325991 - button selected
//3: 3E70B8 - button hover
//4: 5F8BCA - button background
</script>

<style scoped>

.leftCol{grid-column: 1 / 2; padding-right: 25px;}
.midCol{grid-column: 2 / 3}
.rightCol{grid-column: 3 / 4}
.midLeftCol{grid-column: 1 / 3}
.midRightCol{grid-column: 2 / 4}
.fullRow{grid-column: 1 / 4}
.emptyRow{padding-top: 1em}

.profileImg{
  grid-row: 1 / 3;
  display: flex;
  flex-direction: row-reverse;
}

.profileImg img{height: 150px;}
.cvContent h2{margin: 0px 0px 20px 0px}
.name{font-size: 2em}
.headline{font-size: 1.2em}

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
  grid-template-rows: auto 1fr;
}

.CV{
  padding: 25px 25px 0px 30px;
  overflow: auto;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.45), -1px 0px 3px 0px rgba(0, 0, 0, 0.45);
}

</style>