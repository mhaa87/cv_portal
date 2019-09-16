<template>
  <div class="listGrid">
    <template v-for="(list, i) in content.lists">
        <template v-if="list.show">
          <!-- List title -->
          <div :key="'h' + i" class="boldText headline clickable fullRow"
          @click="setEditWindow({show: true, type: 'listTitle', data: {'list': list}})">
          {{list.title}}</div> 

          <template v-for="(item, j) in list.items">
              <!-- Clickable area -->
              <div :key="'a'+i+j" class="clickable fullRow" :style="{gridRow: elementRowStyle(i, j)}"
                @click="setEditWindow({show: true, type: 'list', data: {'item': item, 'list': list, 'index': j}})"></div>
              <!-- Duration -->
              <span :key="'d'+i+j" class="leftCol" :style="{gridRow: elementRowStyle(i, j)}"><nobr>{{getDurationText(item.duration)}}</nobr></span> 
              <!-- Title & Text-->
              <div :key="'t'+i+j" class="rightCol" :style="{gridRow: elementRowStyle(i, j)}"><b>{{item.title}}</b> <br> {{item.text}} </div>
          </template>

          <div :key="'e' + i" class="fullRow emptyRow"></div>
        </template>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV',
  components: {},
  data() { return {}},
  computed:{
    ...mapState(['content', 'editWindow']),
  },

  methods: {
    ...mapMutations(['setEditWindow']),

    listNumItems(list){ 
        return this.content.lists[list].items.length;
    },

    listStartRow(list){
        var n = 1;
        for(var i = 0; i < list; i++){
           n += this.content.lists[i].show ? this.content.lists[i].items.length + 2 : 0;
        }
        return n;
    },

    elementStartRow(list, index){
        return this.listStartRow(list) + 1 + index;
    },

    elementRowStyle(list, index, start, end){
        var r = this.elementStartRow(list, index); 
        return (r) + '/' + ( r+ 1);
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

    openEdit(info){
      if(this.editWindow.show) return;
      this.setEditWindow({'show': true, 'info': info});
    },
  },
  
  mounted() {}

}

</script>

<style scoped>
.leftCol{grid-column: 1 / 2; padding-right: 25px;}
.rightCol{grid-column: 2 / 3}
.fullRow{grid-column: 1 / 3}
.emptyRow{padding-top: 1em}

.headline{font-size: 1.2em}
.listGrid{
    display: grid;
    grid-template-columns: auto 1fr;
}

.profileImg{
  grid-area: 1 / 3 / 4 / 4;
  display: flex;
  /* padding: 3px; */
  border: none;
}

.profileImg:hover{
  padding: 0px;
  box-shadow: 3px 0px 6px 0px rgba(0, 0, 0, 0.65), -3px 0px 6px 0px rgba(0, 0, 0, 0.65), 0px 3px 6px 0px rgba(0, 0, 0, 0.65), 0px -3px 6px 0px rgba(0, 0, 0, 0.65);
}

</style>