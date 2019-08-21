<template>
    <div class="adminPage">
      <h1>Users: </h1>
      <div class="userList">
        <b>Name</b><b>Email</b><b>Admin</b>
        <template v-for="user in admin.users">
          <span>{{user.name}}</span><span>{{user.email}}</span><span>{{user.admin}}</span>
        </template>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'adminPage',

  data() { return {}},
  mounted(){},
  computed:{...mapState(['admin']),},
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
</style>