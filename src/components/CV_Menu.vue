<template>
    <div class="cvMenu">
        <saveStatus v-if="isSaving"/>
        <button v-if="loggedIn && isSaving === false" @click="saveButton()">Save </button>
        <button @mousedown="download">Print/Download</button> 
        <!-- <div class="cvName">"{{content.cvName}}"</div> -->
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
        <button @mousedown="setEditWindow({show: true, info: {name: 'newCV'}})">New CV</button>
        <!-- <div class="newCV dropMenu" v-if="showNewCV">
            <input v-model="newCVname"><button @click="saveAction(newCVname)">Save</button>
        </div> -->
        <div></div>
    <!-- <div class="rowReverse">
        <button v-if="loggedIn"  @click="logout" >Logout</button>
        <button v-if="!loggedIn" :class="{selected: showLogin && register}" @click="toggleLogin(true)">Register</button>  
        <button v-if="!loggedIn" :class="{selected: showLogin && !register}" @click="toggleLogin(false)">Login</button> 
        <span v-if="loggedIn" class="centerText">Logged in: {{user.name}}</span>
    </div> -->

    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import saveStatus from './saveStatus.vue';

export default {
    name: 'CV_Options',
    components: {saveStatus,},
    
    data() { return {
        isSaving: false,
        newCVname: '',
    }},

    computed:{
        ...mapState(['page', 'title', 'loggedIn', 'showCVmenu','content', 'newCV', 'user', 'editMode', 'showLogin', 'register', 'cvList']),
    },

    methods: {
        ...mapMutations(['toggleEdit', 'toggleLogin', 'setEditMode', 'setEditWindow']),
        ...mapActions(['logout', 'loadCV','saveAction', 'loadCVlist', 'deleteCV', 'deleteAll', 'download']),

        saveButton(){
            this.isSaving = false;
            this.saveAction(this.content.cvName);
        }
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
    grid-template-columns: auto auto auto auto 1fr;
    padding: 4px;
    box-sizing: border-box;
    text-align: center;
    font-size: 18px;
    height: 100%;
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
    box-sizing: border-box;
}

.dropMenu{
    position: absolute;
    z-index: 3;
    /* background-color: var(--main_content-bg-color); */
    background-color: black;
    min-width: 250px;
    box-sizing: border-box;
    /* left: -50%; */
    transform: translate(-50%, 0px);
}

.newCV{
    flex-direction: row;
    padding: 10px;
}
</style>