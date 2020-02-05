<template>
  <div class="name minSize">
    {{content.name}}
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
  methods: {...mapMutations(['setEditWindow',]),},
  
  mounted() {}

}

</script>

<style scoped>
.name{
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 0.5em;
  }
</style>