<template>
    <div @click="setEditWindow({'show': true, 'type': type})" class="clickable">

      <span v-if="type === 'intro'">
        <b class="headline">{{content.intro.title}}</b>
        <br>{{content.intro.text}}
      </span>

      <span v-else-if="type === 'other'">
        <b class="headline">{{content.other.title}}</b>
        <br>{{content.other.text}}
      </span>

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
.headline{font-size: 1.2em}
</style>