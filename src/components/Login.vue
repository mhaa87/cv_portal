<template><div class="loginWindow">

    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-if="register" v-model="user.name" label="Username" :rules="nameRules" required ></v-text-field>
        <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required ></v-text-field>
        <v-text-field v-model="user.password" type="password" :rules="passwordRules" label="Password" required ></v-text-field>

        <v-checkbox @change="setAutoLogin" :value="autoLogin" label="Remember me"></v-checkbox>

        <v-btn v-if="register" @click="validate">Register</v-btn>
        <v-btn v-else @click="validate">Login</v-btn>
        <v-btn @click="reset">Reset</v-btn>
    </v-form>

    <!-- <form @submit.prevent="login(false)">
        <div class="loginMenu">
            <b v-if="register"> Username: </b>
            <input v-if="register" placeholder="..." v-model="user.name">
            <b>Email: </b>
            <input placeholder="..." v-model="user.email" type="email">
            <b>Password: </b>
            <input placeholder="..." v-model.lazy="user.password" type="password">     
            <div v-if="register" style="margin: 0 auto;"><button type="submit">Register</button></div>
            <div v-else style="margin: 0 auto;"><button type="submit">Login</button></div>
            <span class="checkbox">
                <b>Remember me: </b>
                <input @change="setAutoLogin" :value="autoLogin" type="checkbox">
            </span>
            <div v-if="error" class="error">Error: {{errorMsg}}</div>
        </div>
    </form> -->

</div></template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Login',

    data() { return {
        valid: true,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length > 2) || 'Name must be at least 3 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length > 5) || 'Password must be at least 6 characters',
        ],
    }},
    
    computed:{
        ...mapState(['error', 'errorMsg', 'register', 'autoLogin', 'user']),
    },
    
    methods: {
        ...mapMutations(['setLoginStatus', 'showLogin', 'setAutoLogin', 'setUser']),
        ...mapActions(['login']),

        validate () {
            if (this.$refs.form.validate()) this.login(false);
        },

        reset () { this.$refs.form.reset() },
    },

}
</script>

<style scoped>

.loginWindow{
    color: black;
    background-color: white;
    box-sizing: border-box;
    z-index: 2;
    position: absolute;
    border: solid 2px black;
    border-radius: 5px;
    padding: 20px;
    width: 650px;
    left: 0;
    right: 0;
    margin: auto;
    /* margin-left: auto; */
    /* margin-right: auto; */
    top: 25%;
    min-height: 200px;
    /* box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.65), -3px 0px 5px 0px rgba(0, 0, 0, 0.65), 0px 3px 5px 0px rgba(0, 0, 0, 0.65), 0px -3px 5px 0px rgba(0, 0, 0, 0.65); */
}

.login{
    /* padding: 10px 15px 10px 15px;
    justify-content: center;
    align-content: center;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%; */
}

.loginMenu{
  display: grid;
  grid-template-columns: auto auto;
}

.checkbox{
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    justify-content: center;
}

.error{
    color: rgb(255, 255, 255);
    font-size: 16px;
    padding: 4px 4px;
    background-color: #1451a0;
    grid-column-start: 1;
    grid-column-end: 3;
}

.login table{
    align-items: center;
    justify-content: center;
}

.loginLabel{
    width: 30%;
}

.login button{
    border: none;
    height: 100%;
    cursor: default;
    font-size: 20px;
    padding: 2px 20px;
    margin: 4px 0px;
    user-select: none;
    box-shadow: 1px 1px 2px 0px rgba(0,0,0,1), inset 1px 1px 2px 0px rgb(255, 255, 255);
    border-radius: 5px;
}

.login button:active {
    box-shadow: inset 3px 3px 3px 0px rgba(0, 0, 0, 0.75);
    background-color: #1451a0;
}
</style>