<template>
<div class="topbar mainGridColumns">
    <div class="left"><h1>{{title}}</h1></div>
    <span class="middle topbarButtons">
        <button @mousedown="toggleEdit" :class="{selected: editMode}">Edit</button>
        <button v-if="loggedIn">Save</button>
        <button>Download</button>
        <button v-if="loggedIn">Open</button>
    </span>
    <div class="right topbarButtons">
        <button v-if="loggedIn">Logout</button>
        <button v-if="!loggedIn" :class="{selected: showLogin && register}" @click="toggleLogin(true)">Register</button>  
        <button v-if="!loggedIn" :class="{selected: showLogin && !register}" @click="toggleLogin(false)">Login</button> 
        <!-- <span v-if="loggedIn" class="centerText">Logged in: {{user.name}}</span> -->
    </div>
</div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Topbar',
    computed:{
        ...mapState(['title', 'loggedIn', 'showCVmenu', 'newCV', 'user', 'editMode', 'showLogin', 'register']),
    },

    methods: {
        ...mapMutations(['toggleEdit', 'toggleLogin']),
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topbar{
    display: grid;
    grid-area: 1 / 1 / 2 / 4;
    background-color: #2670d1;
    box-shadow: inset 0px -4px 4px -4px rgba(0,0,0,1);
    color: #eaf6ff;
}

.topbarButtons{
    z-index: 1;
    grid-area: 1 / 2 / 2 / 3;
    height: 85%;
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
}

.topbarButtons button{
    color: inherit;
    border: none;
    height: 100%;
    cursor: default;
    font-size: 16px;
    padding: 5px 10px;
    margin: 0px 5px;
    user-select: none;
    border-radius: 10px 10px 10px 10px;
    border-width: 2px 2px 2px 2px;
}

.topbar .middle{
    justify-content: center;
}

.topbar .left{
    grid-area: 1 / 1 / 2 / 2;
}

.topbar .right{
    grid-area: 1 / 3 / 2 / 4;
    flex-flow: row-reverse;
    padding-right: 5%;
}

.topbar h1{
    margin: 5px 0px;
    padding-left: 25px;
}
</style>