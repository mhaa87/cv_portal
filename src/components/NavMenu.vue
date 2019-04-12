<template>
    <div class="mainGridRows">
        <div class="topbar title"><h1>{{title}}</h1></div>
        <div class="navMenu">
                <button :class="{selected: page==='cv'}" @mousedown="setPage('cv')">My CV</button>
                <button :class="{selected: page==='home'}" @mousedown="setPage('home')">Home</button>
                <button :class="{selected: page==='guide'}" @mousedown="setPage('guide')">Help</button>
                <button :class="{selected: page==='tips'}" @mousedown="setPage('tips')">CV Tips</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'NavMenu',
    computed:{
        ...mapState(['title', 'page']),
    },
    methods: {
        ...mapMutations(['setPage']),
    }
}
</script>

<style scoped>
h1{
    margin: auto 0px;
    padding-left: 25px;
    font-size: calc(100% + 0.9vw);
}

.navMenu{
    display: flex;
    flex-direction: column;
    margin: 30% 10% 0% 30%;
}
.navMenu button{
    font-size: 28px;
    border: none;
    height: 50px;
    padding: 10px 20px;
    margin-bottom: 15px;
    border-radius: 15px;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.85), inset 1px 1px 1px 0px rgba(255, 255, 255, 0.75);
    background-color: #2670d1;
}

button:hover{
  background-color: #5d96e0;
}

.navMenu button.selected{
    background-color: #5d96e0;
    box-shadow: inset 4px 4px 4px 0px rgb(0, 0, 0), inset -1px -1px 1px 0px rgba(255, 255, 255, 0.75);
}

.navMenu button:active {
    background-color: #2670d1;
    box-shadow: inset 6px 6px 6px 0px rgb(0, 0, 0), inset -1px -1px 1px 0px rgba(255, 255, 255, 0.75);
}
</style>
