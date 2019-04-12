<template><span class="mainGridRows" id="cv">

  <div class="topbar middle">
      <button @mousedown="toggleEdit" :class="{selected: editMode}">Edit</button>
      <button v-if="loggedIn" @mousedown="saveAction($data)" >Save</button>
      <button @mousedown="download()" >Download</button>
      <button v-if="loggedIn">Open</button>
  </div>

  <div class="CV" id="print">
    <div class="cvContent cvPadding">
        <!-- Name & personal info -->
        <h2 class="midLeftCol">
            <input v-if="editMode" v-model="name">
            <span v-else>{{name}}</span>
        </h2>
        <span class="leftCol"><span :key="getKey(i)" v-for="(item, i) in personInfo">
            <input v-if="editMode" v-model="item.title">
            <b v-else>{{item.title}}:</b><br>
        </span></span>
        <span class="midCol"><span :key="getKey(i)" v-for="(item, i) in personInfo">
            <input v-if="editMode" v-model="item.text">
            <span  class="infoText" v-else>{{item.text}}</span><br>
        </span></span>
        <span class="profileImg rightCol"><img :src="profileImg"></span>
        
        <!-- Intro text -->
        <span class="leftCol">
            <input v-if="editMode" v-model="intro.title">
            <b v-else class="headline">{{intro.title}}</b>
        </span><br>
        <span class="fullRow">
            <textarea v-if="editMode" v-model="intro.text"></textarea> 
            <span v-else>{{intro.text}}</span>
        </span>

        <!-- Experience and Education lists -->
        <template v-for="(list, i) in lists">
            <span v-if="editMode" :key="getKey(i)" class="fullRow">
                <input class="headline" v-if="editMode" v-model="list.title">
                <button @click="list.items.unshift(defaultListItem)">Add</button>
                <button @click="list.items.sort(sortListElements)">Sort list</button>
            </span>          
            <div v-else :key="getKey(i)" class="title">{{list.title}}</div>
            
            <template v-for="(item, j) in list.items">
                <span v-if="editMode" :key="getKey(j)" class="fullRow boldText">
                    From:<input type="number" class="monthInput" v-model="item.duration.from.month">
                    <input type="number" class="yearInput" v-model="item.duration.from.year">
                    To:<input type="number" class="monthInput" v-model="item.duration.to.month">
                    <input type="number" class="yearInput" v-model="item.duration.to.year">
                    Title:<input v-model="item.title">
                    <button v-if="editMode" @click="list.items.splice(i,1)">Delete</button>
                </span>
                <textarea v-if="editMode" :key="getKey(j)" class="fullRow" v-model="item.text"></textarea>
                <template v-else>
                    <span :key="getKey(j)" class="leftCol">{{getDurationText(item.duration)}}</span>           
                    <div :key="getKey(j)" class="midRightCol title">{{item.title}}</div>
                    <div :key="getKey(j)" class="midRightCol">{{item.text}}</div>
                </template>
            </template>
        </template>

        <!-- Other information -->
        <span class="leftCol">
            <input v-if="editMode" v-model="other.title">
            <b v-else class="headline">{{other.title}}</b>
        </span><br>
        <span class="fullRow">
            <textarea v-if="editMode" v-model="other.text"></textarea> 
            <span v-else>{{other.text}}</span>
        </span><br><br>
    </div>
  </div>
</span></template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// import { mapState } from 'vuex';

export default {
  name: 'CV',

  data() { return {
    name: "Firstname Lastname",
    cvName: "default",
    personInfo: [
        {title: "Mobile", text: "12345678"},
        {title: "Email", text: "email@hotmail.com"},
        {title: "Place", text: "City"},
    ],
    profileImg: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    profileImgHeight: 150,
    intro: {title: "Introduction", text: "..."},
    other: {title: "Other", text: "..."},
    lists: [
        {title: "Experience",
        items: [
          {duration: {from: {year: "2016", month: "01"}, to: {year: "2019", month: "03"}}, title: "Job 3", text: "Info..."},
          {duration: {from: {year: "2015", month: "02"}, to: {year: "2015", month: "11"}}, title: "Job 2", text: "Info..."}, 
          {duration: {from: {year: "2013", month: "09"}, to: {year: "2014", month: "10"}}, title: "Job 1", text: "Info..."}
        ]},
      {title: "Education",
        items: [
          {duration: {from: {year: "2010", month: ""}, to: {year: "2013", month: ""}}, title: "Study 2", text: "Info..."}, 
          {duration: {from: {year: "2009", month: ""}, to: {year: "2010", month: ""}}, title: "Study 1", text: "Info..."}
        ]}
    ],
    font: "'Times New Roman', Times, serif",
    fontSize: 14,
  }},

  computed:{
      ...mapState(['editMode', 'defaultListItem', 'loggedIn']),
      getKey: function(){var i=0; return (j) =>{return i++ + '' + j}},
  },

  methods: {
      ...mapMutations(['toggleEdit']),
      ...mapActions(['saveAction']),

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

      sortListElements: function (a, b) {
          var from = this.dateToNumber(b.duration.from.month, b.duration.from.year) - this.dateToNumber(a.duration.from.month, a.duration.from.year)
          var to = this.dateToNumber(b.duration.to.month, b.duration.to.year) - this.dateToNumber(a.duration.to.month, a.duration.to.year)
          return (to === 0) ?  from : to;
      },

      dateToNumber(month, year){
          if(year.length > 0) return (year * 100 + ((month.length > 0) ? month*1 : 0));
          return 0;
      },
  }

}
</script>

<style scoped>

.leftCol{grid-column: 1 / 2}
.midCol{grid-column: 2 / 3}
.rightCol{grid-column: 3 / 4}
.midLeftCol{grid-column: 1 / 3}
.midRightCol{grid-column: 2 / 4}
.fullRow{grid-column: 1 / 4}

.profileImg{
  grid-row: 1 / 3;
  display: flex;
  flex-direction: row-reverse;
}

.profileImg img{height: 150px;}
.cvContent h2{}

.headline{
    font-weight: bold;
    font-size: 1em;
}

.title{
  font-weight: bold;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

.name input{
    /* font-size: 2em;  */
    font-weight: bold;
}

.yearInput{max-width: 2.5em;}

.monthInput{max-width: 1.5em;}

textarea{
  width: 100%;
  resize:vertical;
}

.cvContent{  
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto auto auto auto auto auto;
}

.CV{
  padding: 25px 25px 0px 30px;
  overflow: auto;
  background-color: rgb(255, 255, 255);
}
</style>