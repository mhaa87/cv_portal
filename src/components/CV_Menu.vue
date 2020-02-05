<template>
    <v-toolbar flat dense max-height="32">
        <v-toolbar-items max-height="32" class="ml-n4">
            <v-btn small max-height="32" v-if="loggedIn" @click="saveAction(content.cvName)" :loading='isSaving' :disabled='isSaving'>Save</v-btn>
            <v-btn small max-height="32" @mousedown="download">Print/Download</v-btn> 
            <!-- <div class="cvName">"{{content.cvName}}"</div> -->

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn max-height="32" small v-on="on">Your CVs</v-btn>
                </template>
                <div v-if="1 > cvList.length">No saved CVs</div>
                <v-list v-else>
                    <v-list-item v-for="(cv, i) in cvList" :key="i" @click="setCV(cv.content)">
                        <v-list-item-title>{{ cv.cvName }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteCV">Delete '{{content.cvName}}'</v-list-item>
                </v-list>
            </v-menu>

            <v-btn small max-height="32" @mousedown="setEditWindow({show: true, type: 'newCV'})">New CV</v-btn>
        </v-toolbar-items>

        <div class="flex-grow-1"></div>

        <!-- <v-toolbar-items class="mr-n4">
            <span v-if="loggedIn" class="centerText">Logged in: {{user.name}}</span>
            <v-btn max-height="32" small v-if="loggedIn"  @click="logout" >Logout</v-btn>
            <v-btn max-height="32" small v-if="!loggedIn" :class="{selected: showLogin && !register}" @click="toggleLogin(false)">Login</v-btn> 
            <v-btn max-height="32" small v-if="!loggedIn" :class="{selected: showLogin && register}" @click="toggleLogin(true)">Register</v-btn>  
        </v-toolbar-items> -->

    </v-toolbar>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import saveStatus from './saveStatus.vue';

export default {
    name: 'CV_Options',
    components: {saveStatus,},
    
    data() { return {
        newCVname: '',
    }},

    computed:{
        ...mapState(['isSaving', 'loggedIn', 'showCVmenu','content', 'user', 'showLogin', 'register', 'cvList']),
    },

    methods: {
        ...mapMutations(['toggleEdit', 'toggleLogin', 'setEditMode', 'setEditWindow','setCV', 'setCVmenu']),
        ...mapActions(['logout', 'loadCV','saveAction', 'loadCVlist', 'deleteCV', 'deleteAll', 'download']),

        saveButton(){
            this.isSaving = true;
            this.saveAction({'name': this.content.cvName, 'saveDone': () => setTimeout(this.saveDone, 600)});
        },

        saveDone(){ this.isSaving = false }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.v-toolbar__content{padding: 0px}
.cvName{
    margin: auto;
}

.noPadding {padding: 0px;}

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