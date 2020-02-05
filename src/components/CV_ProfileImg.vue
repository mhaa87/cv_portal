<template>
  <div class="profileImg">
    <img :style="imgStyle()" :src="content.style.imgLink">
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CV',
  components: {},

  data() { return {}},
  computed:{...mapState(['content']),},

  props: {type: String},
  methods: {
    ...mapMutations(['setEditWindow',]),
      imgStyle() {return {'height': this.content.style.imgSize + 'px'}},
    },
  
  mounted() {}

}

</script>

<style scoped>

.profileImg{
  border: none;
  margin: 5px auto;
  min-width: 50px;
  min-height: 100px;
}

.profileImg img{
  height: 150px; 
  margin: auto; 
  display: block;
}

</style>