<template>
  <div class="clickable minSize" :class="{pInfo: narrow === false}" @click="setEditWindow({'show': true, type: 'info'})">
      <template v-for="(item, i) in content.personInfo">
        <template v-if="item.show">
          <div class="leftCol"><b>{{item.title}}:</b></div>
          <div>{{item.text}}</div> 
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
  props: {narrow: Boolean},
  computed:{...mapState(['content']),},

  methods: {...mapMutations(['setEditWindow',]),},
  
  mounted() {}

}

</script>

<style scoped>
.leftCol{grid-column: 1 / 2;}
.pInfo{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 25px;
}

</style>