<template>
    <div class="fPage">
        <div class="title">User feedback:</div>
          
        <feedbackList :admin='false' />

        <div>
          <span>New comment: </span></br></br>
          <textarea v-model="text"></textarea></br>
          <button @click="newComment(text)">Submit</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import feedbackList from '@/components/feedbackList.vue'

export default {
  name: 'feedback',
  components: {feedbackList,},
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
.fPage{
  width: 500px;
  text-align: center;
  padding: 10px;
  font-size: 20px;
}

.fPage div {
  background-color: var(--main_content-bg-color);
  margin: 15px;
  padding: 15px;
}

.title{
  font-weight: bold;
  font-size: 28px;
}

.fPage textarea{
  min-width: 300px;
  min-height: 100px;
}

</style>
