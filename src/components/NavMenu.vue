<template>
    <div>
        <button :class="{selected: page ==='home'}" @mousedown="setPage('home')">Home</button>
        <button :class="{selected: page ==='cv'}" @mousedown="setPage('cv')">My CV</button>
        <button :class="{selected: page ==='guide'}" @mousedown="setPage('guide')">Guide</button>
        <button :class="{selected: page ==='tips'}" @mousedown="setPage('tips')">CV Tips</button>
        <button v-if="user.isAdmin" :class="{selected: page ==='admin'}" @mousedown="setPage('admin')">Admin</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'NavMenu',
    computed:{...mapState(['page', 'user']),},
    methods: {...mapMutations(['setPage']),}
}

</script>

<style scoped>

button {
    font-size: 18px;
    padding-bottom: 8px;
    min-width: 150px;
}

.selected{
    font-size: 32px;
    font-weight: bold;
    /* text-decoration: underline; */
}

button:hover {font-size: 32px}
</style>
