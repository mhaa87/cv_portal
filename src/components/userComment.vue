<template>
    <div class="">
      <textarea v-model="text"></textarea></br>
      <button @click="newComment(text)">Submit</button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'userComment',

  data() { return {
    text: "",
  }},

  mounted(){},
  computed:{...mapState([]),},
  methods: {
    ...mapMutations([]),
    ...mapActions(['newComment',]),
    
    }

}

</script>

<style scoped>

</style>