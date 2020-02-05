<template>
  <div class="home"><div class="darkenBg">
    <v-container fill-height >
      <v-layout justify-center align-center column pa-5>
          <div class="display-1 font-weight-black white--text text-xs-center">WELCOME TO</div>
          <div class="display-4 font-weight-black white--text text-xs-center">FUNKWEB'S</div>
          <div class="display-4 font-weight-black white--text text-xs-center mb-3">CV PORTAL</div>
          <br /><br />
          <div class="display-1 font-weight-bold white--text text-xs-center">Create and edit your CV from a template.</div><br />
          <div class="display-1 font-weight-bold white--text text-xs-center">Save your CVs online so you can access them anywhere.</div><br />
          <div class="display-1 font-weight-bold white--text text-xs-center">Print or download the CV as pdf.</div>
          <br /><br />
          <v-btn to="/mycv" text class="display-2 font-weight-bold white--text">CLICK HERE TO BEGIN</v-btn>
      </v-layout>
    </v-container>
  </div></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {},
  data() { return {}},
  mounted(){},
  computed:{},
  methods: {...mapMutations(['setPage',]),}


}

</script>

<style scoped>

.home{ 
  height: 100%;
  background-image: var(--bg-image);
  background-size: cover;
  /* background-color: rgb(0, 0, 0, 0.6) */
}

.darkenBg{
  height: 100%;
  background-color: rgba(66, 61, 51, 0.5)
}

</style>