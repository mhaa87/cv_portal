<template>
    <div class="mainPageLayout">
      <div class="title">Welcome to Funkweb's CV Portal!</div>
      <div class="info">Save multiple CVs online so you can access them anywhere.</div>
      <div class="info">
        <div>Create and edit your CV from a template.</div><br/>
        <button @click="setPage('cv')">Click to begin!</button>
      </div>
      <div class="info">Print or download the CV as pdf.</div>
      <div></div>
      <userComment />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import userComment from './userComment.vue'
export default {
  name: 'homePage',
  components: {userComment},
  data() { return {}},
  mounted(){},
  computed:{},
  methods: {...mapMutations(['setPage',]),}


}

</script>

<style scoped>

.title{
  margin: 40px auto;
  padding: 20px 40px;
  text-align: center;
  font-size: 36px;
  background-color: var(--main_content-bg-color);
  grid-column: 1 / 4;
}

.info{
  background-color: var(--main_content-bg-color);
  font-size: 24px;
  padding: 20px;
  margin: 10px 30px;
}

.info button{
  width: 100%;
  font-size: 24px;
  padding: 20px 5px;
}

.info button:hover{
  background-color: rgb(255, 255, 255, 0.25);
}
</style>