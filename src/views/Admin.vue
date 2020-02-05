<template>
    <div class="adminPage">
      <div>
        <button :class="{selected: page ==='users'}" @click="page = 'users'">Users</button>
        <button :class="{selected: page ==='feedback'}" @click="page = 'feedback'">Feedback</button>
        <button :class="{selected: page ==='search'}" @click="page = 'search'">Search</button>
      </div>

      <div v-if="page === 'users'" class="userList">
        <b>Name</b><b>Email</b><b>Admin</b>
        <template v-for="user in admin.users">
          <span>{{user.name}}</span><span>{{user.email}}</span><span>{{user.admin}}</span>
        </template>
      </div>

      <feedbackList v-else-if="page === 'feedback'" :admin='true' />

      <searchPage v-else-if="page === 'search'" /> 

      </div>

    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import feedbackList from '@/components/feedbackList.vue'
import searchPage from '@/components/searchPage.vue'

export default {
  name: 'Admin',
  components: {searchPage, feedbackList},
  data() { return {page: 'users'}},
  mounted(){},
  computed:{...mapState(['admin', 'commentList']),},
  methods: {...mapMutations([]),}

}

</script>

<style scoped>
.adminPage {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto auto 1fr;
  background-color: var(--main_content-bg-color);
  margin-top: 60px;
  min-height: 600px;
  min-width: 800px;
  text-align: center;
}

.userList {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  margin: 10px auto;
}

button {
  font-size: 18px;
  padding-bottom: 8px;
  min-width: 150px;
}

button:hover {font-size: 32px}

.selected{
    font-size: 32px;
    font-weight: bold;
    /* text-decoration: underline; */
}
</style>