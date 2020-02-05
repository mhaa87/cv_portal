<template>
  <div>
    <template v-for="(list, i) in content.mainContent">
        <template v-if="list.show">

            <template v-if="list.type === 'text'">
                <div :key="'text_' + i">
                    <b class="cvItemHeadline">{{list.title}}</b>
                    <br>{{list.text}}
                </div>
            </template>

            <template v-if="list.type === 'list'">
                <div :key="'list_' + i"> <b class="cvItemHeadline">{{list.title}} </b> </div>

                <div v-for="(item, j) in list.items" :key="'item:_'+i + '_' + j">
                    <!-- <div><span class="duration">{{getDurationText(item)}}</span><b>{{item.title}}</b></div> -->
                    <div><span class="duration">Test</span><b>{{item.title}}</b></div>
                    <!-- <div><b>{{item.title}}</b></div><div></div> -->
                    <div>{{item.text}}</div>
                </div>
            </template>

            <div :key="'empty_' + i" class="emptyRow"></div>
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

    getDurationText(item){
      console.log(item.fromDate + ' - ' + item.toDate)
      return item.fromDate + ' - ' + item.toDate;
    },

    formatDate (date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return month + '.' + year;
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

.cvItemHeadline{font-size: 1.2em}
.duration{width: 9em;}
.elTitle{white-space: pre}
.listGrid{
    display: grid;
    grid-template-columns: auto 1fr;
}

</style>