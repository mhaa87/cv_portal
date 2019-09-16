<template>
  <div>
    <template v-for="(list, i) in content.mainContent">
        <template v-if="list.show">

            <template v-if="list.type === 'text'">
                <div @click="setEditWindow({'show': true, type: 'text', data: {'content': list, 'index': i}})" class="clickable minSize fullRow">
                    <b class="headline">{{list.title}}</b>
                    <br>{{list.text}}
                </div>
            </template>

            <template v-if="list.type === 'list'">
                <div class="boldText headline clickable minSize" @click="setEditWindow({show: true, type: 'listTitle', data: {'list': list, 'index': i}})">
                    {{list.title}}
                </div> 

                <div v-for="(item, j) in list.items" class="clickable minSize listGrid"
                @click="setEditWindow({show: true, type: 'list', data: {'item': item, 'list': list, 'index': j}})">
                    <div class="duration"><nobr>{{getDurationText(item.duration)}}</nobr></div>
                    <div><b>{{item.title}}</b></div><div></div>
                    <div>{{item.text}}</div>
                </div>
            </template>

            <div class="emptyRow"></div>
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
.emptyRow{padding-top: 1em}

.headline{font-size: 1.2em}
.duration{width: 9em;}
.listGrid{
    display: grid;
    grid-template-columns: auto 1fr;
}

</style>