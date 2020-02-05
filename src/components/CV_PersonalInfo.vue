<template>
  <div class="minSize" :class="{pInfo: narrow === false}">
      <template v-for="(item, i) in content.personInfo">
        <template v-if="item.show">
          <div :key="'l' + i" class="leftCol"><b>{{item.title}}:</b></div>
          <div :key="'r' + i">{{item.text}}</div> 
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