<template>
    <v-app-bar dense app>
        <!-- <v-toolbar-title>CV Portal</v-toolbar-title> -->
        <div class="flex-grow-1"></div>
        <v-toolbar-items class="center transBG">
            <v-btn text to="/" exact>Home</v-btn>
            <v-btn text to="/mycv">My CV</v-btn>
            <v-btn text to="/guide">Guide</v-btn>
            <v-btn text to="/cvtips">CV Tips</v-btn>
            <v-btn text to="/feedback">Feedback</v-btn>
            <v-btn v-if="user.isAdmin" text to="/admin">Admin</v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>

        <v-toolbar-items class="mr-n4">
            <!-- <span v-if="loggedIn" class="centerText">Logged in: {{user.name}}</span> -->
            <v-btn text v-if="loggedIn"  @click="logout" >Logout</v-btn>
            <v-btn text v-if="!loggedIn" :class="{selected: showLogin && !register}" @click="toggleLogin(false)">Login</v-btn> 
            <v-btn text v-if="!loggedIn" :class="{selected: showLogin && register}" @click="toggleLogin(true)">Register</v-btn>  
        </v-toolbar-items>

    </v-app-bar>
</template>

<script>
import { mapState, mapMutations,mapActions } from 'vuex';

export default {
    name: 'NavMenu',
    computed:{...mapState(['page', 'user', 'loggedIn', 'showLogin', 'register']),},
    methods: {...mapMutations(['setPage', 'toggleLogin',]),...mapActions(['logout']),}
    
}

</script>

<style scoped>

.center{margin: 0px auto}
.transBG{
   /* background-color: red!important; */
   background-color: rgb(255, 0, 0, 0) !important;;
   /* opacity: 0.1; */
}
</style>
