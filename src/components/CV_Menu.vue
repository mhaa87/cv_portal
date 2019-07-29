<template>
    <div class="cvMenu">   
        <div class="cvName">"{{content.cvName}}"</div>
        <button v-if="loggedIn" @mousedown="saveAction(content.cvName)" >Save</button>
        <button @mousedown="download">Print/Download</button>
        <button @mousedown="setNewCV(!showNewCV)" :class="{selected: showNewCV}">New CV</button>
        <div class="newCV dropMenu" v-if="showNewCV">
            <input v-model="newCVname"><button @click="saveAction(newCVname)">Save</button>
        </div>
        <button v-if="loggedIn" @mouseover="loadCVlist(true)" @mouseleave="loadCVlist(false)">
            <div>Open</div>
            <div v-if="showCVmenu" class="dropMenu">
                <div class="cvList">
                    <button v-for="(cv, i) in cvList" :key="i" @click="loadCV(cv)" :class="{selected: cv === content.cvName}">{{cv}}</button>
                </div>
                <div v-if="1 > cvList.length">No saved CVs </div>
                <div v-else>
                    <button @click="deleteCV">Delete '{{content.cvName}}'</button><br>
                    <!-- <button @click="deleteAll">Delete All</button> -->
                </div>
            </div>
        </button>

    <!-- <div class="rowReverse">
        <button v-if="loggedIn"  @click="logout" >Logout</button>
        <button v-if="!loggedIn" :class="{selected: showLogin && register}" @click="toggleLogin(true)">Register</button>  
        <button v-if="!loggedIn" :class="{selected: showLogin && !register}" @click="toggleLogin(false)">Login</button> 
        <span v-if="loggedIn" class="centerText">Logged in: {{user.name}}</span>
    </div> -->

    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    name: 'CV_Options',

    data() { return {
        newCVname: '',
    }},
    computed:{
        ...mapState(['page', 'title', 'loggedIn', 'showCVmenu','showNewCV','content', 'newCV', 'user', 'editMode', 'showLogin', 'register', 'cvList']),
    },

    methods: {
        ...mapMutations(['toggleEdit', 'toggleLogin', 'setEditMode', 'setNewCV']),
        ...mapActions(['logout', 'loadCV','saveAction', 'loadCVlist', 'deleteCV', 'deleteAll', 'download']),
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cvName{
    margin: auto;
}

.cvMenu {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr auto;
    padding-top: 4px;
    text-align: center;
    font-size: 18px;
    height: 100%;
    margin: 0px 10px;
}

.cvMenu button{
    font-size: inherit;
    padding: 4px 15px;
}

.cvMenu button:hover{
  background-color: rgb(255, 255, 255, 0.25);
}

.cvList{
    display: grid;
    grid-auto-flow: row;
    overflow: auto;
    padding: 2px;
    margin: 8px;
    max-height: 25vh;
    box-shadow: inset 1px 1px 2px 0px rgb(0, 0, 0, 0.75), inset -1px 0px 2px 0px rgba(255, 255, 255, 0.75);
}

.cvList button{
    border: none;
    height: 100%;
    font-size: 18px;
    margin: 0px;
    box-shadow: none;
    border-radius: 0px;

}

.newCV{
    flex-direction: row;
    padding: 10px;
}
</style>