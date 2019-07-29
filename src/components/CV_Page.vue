<template>
  <div class="cvPage">
    <!-- CV Menu -->
    <div></div><cvMenu /><div></div>
    <!-- CV Content -->
    <div></div><div class="cvContent"><CV /></div><div></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CV from './CV.vue'
import cvMenu from './CV_Menu.vue'

export default {
  name: 'CV_Page',

  components: {CV, cvMenu,},

  data() { return {
    defaultListItem: { duration: {from: {year: "2000", month: "01"}, to: {year: "2000", month: "01"}}, title: "Tittel", text: "Info..."},
  }},

  mounted(){},
  computed:{},
  methods: {}


}

</script>

<style scoped>
.cvPage{
  display:grid;
  grid-template-columns: 1fr auto 1fr;
  background-color: var(--main_content-bg-color);
  height: 100%;
}

.cvContent{
  margin: 10px;
  overflow: auto;
}
</style>