<template>
    <div class="fList">
      </br>
      <div v-for="comment in commentList" class="comment">
        <div>"{{comment.comment}}"</div>
        <div class="date">{{formatDate(comment.date)}}</div>
        <!-- </br> {{comment._id}} -->
        <button v-if="admin" @click="deleteComment(comment._id)">Delete</button>
        </br>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'feedbackList',
  components: {},
  props: {'admin': Boolean,},
  data() { return {
    text: "",
  }},
  computed:{
    ...mapState(['commentList',]),
  },

  methods: {
    ...mapActions(['deleteComment']),

    formatDate(timeStamp){
      var date = new Date(timeStamp);
      return date.toLocaleString(undefined, {day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})
    },
  }

}

</script>

<style scoped>

.fList{
  text-align: left;
}

.comment{
  font-size: 18px;
}

.date{
  font-size: 12px;
  font-style: italic;
}
button{height: 100%}
button:hover{
  background-color: rgb(255, 255, 255, 0.25);
}
</style>
