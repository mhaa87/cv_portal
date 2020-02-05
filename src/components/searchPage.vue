<template>
    <div>
      Entrer keywords: <input></input>
      <button>Go!</button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'searchPage',
  components: {},
  data() { return {
    text: "",
  }},
  computed:{...mapState(['commentList',]),},
    methods: {
    ...mapActions(['newComment',]),

    }

}

</script>

<style scoped>

</style>
