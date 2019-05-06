<template>
    <div class="navMenu">
        <button :class="{selected: page==='cv'}" @mousedown="setPage('cv')">My CV</button>
        <button :class="{selected: page==='home'}" @mousedown="setPage('home')">Home</button>
        <button :class="{selected: page==='guide'}" @mousedown="setPage('guide')">Help</button>
        <button :class="{selected: page==='tips'}" @mousedown="setPage('tips')">CV Tips</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'NavMenu',
    computed:{
        ...mapState(['page']),
    },
    methods: {
        ...mapMutations(['setPage']),
    }
}
//1: 26426A - button pressed 
//2: 325991 - button selected
//3: 3E70B8 - button hover
//4: 5F8BCA - button background
</script>

<style scoped>

.navMenu{
    display: flex;
    flex-direction: column;
    margin: 0% 40% 50% 0%;
    justify-content: center;
}

.navMenu button{
    font-size: 32px;
    border: none;
    height: 65px;
    padding: 10px 20px;
    margin-bottom: 15px;
    border-radius: 0px 30px 30px 0px ;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.85), inset 1px 1px 1px 0px rgba(255, 255, 255, 0.75);
    background-color: #5F8BCA;
}

button:hover{
  background-color: #3E70B8;
}

.navMenu button.selected{
    background-color: #325991;
    box-shadow: inset 0px 2px 2px 0px rgb(0, 0, 0), inset -1px -1px 1px 0px rgba(255, 255, 255, 0.75);
}

.navMenu button:active {
    background-color: #26426A;
    box-shadow: inset 0px 4px 4px 0px rgb(0, 0, 0), inset -1px -1px 1px 0px rgba(255, 255, 255, 0.75);
}
</style>
