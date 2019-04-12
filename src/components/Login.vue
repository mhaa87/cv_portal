<template><span class="mainGridRows">
    <div class="right topbar">
        <button v-if="loggedIn"  @click="logout" >Logout</button>
        <button v-if="!loggedIn" :class="{selected: showLogin && register}" @click="toggleLogin(true)">Register</button>  
        <button v-if="!loggedIn" :class="{selected: showLogin && !register}" @click="toggleLogin(false)">Login</button> 
        <span v-if="loggedIn" class="centerText">Logged in: {{user.name}}</span>
    </div>

    <div v-if="showLogin" class="login">
        <form @submit.prevent="login(user)">
            <table>
                <tr v-if="register">
                    <td class="loginLabel"><b>Username: </b></td>
                    <td><input placeholder="..." v-model="user.name"></td>
                </tr><tr>
                    <td class="loginLabel"><b>Email: </b></td>
                    <td><input placeholder="..." v-model="user.email" type="email"></td>
                </tr><tr>
                    <td class="loginLabel"><b>Password: </b></td>
                    <td><input placeholder="..." v-model.lazy="user.password" type="password"></td>
                </tr>
            </table>
            <div style="display: flex; align-content: center; flex-direction: column">
                <div style="margin: 0 auto;"><b>Remember me: </b><input v-model="autoLogin" type="checkbox"></div>
                <div v-if="register" style="margin: 0 auto;"><button type="submit">Register</button></div>
                <div v-else style="margin: 0 auto;"><button type="submit">Login</button></div>
            </div>
        </form>
        <div v-if="error" class="error">Error: {{errorMsg}}</div>
    </div>
</span></template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Login',

    data() { return {
        error: false,
        errorMsg: "",
        showLogin: false,
        register: false,
        autoLogin: false,
        user: {
            name: "tester",
            email: "test@testmail.com",
            password: "testpassword",
        },
    }},
    
    computed:{
        ...mapState(['key', 'loggedIn']),
    },
    
    methods: {
        ...mapMutations(['setLoginStatus', 'setKey']),
        ...mapActions(['loginAction']),

        async toggleLogin(register){
            this.showLogin = register ? (!this.register || !this.showLogin) : (!this.showLogin || this.register);
            this.register = register;
        },

        async login(user){
            let data = (await this.loginAction({"register": this.register, "user": user})).data;
            // console.log(data);
            this.error = !data.status;
            if(this.error && this.autoLogin) {this.error = false; return}
            if(this.error){this.errorMsg = data.msg; return;}

            this.setLoginStatus(data.status);
            this.setKey(data.key);
            this.showLogin = false;
            localStorage.setItem("key", data.key);
            localStorage.setItem("autoLogin", this.autoLogin ? 'true' : 'false');
            this.user.name = data.name;
            // this.getLastCV();
        },

        async logout(){
            this.setLoginStatus(false);
            // this.openMenu = false;
            this.user = {name: "",email: "", password: ""};
        },
    },

    mounted() {
        this.autoLogin = localStorage.getItem("autoLogin") === "true";
        if(this.autoLogin){
            this.setKey(localStorage.getItem("key")); 
            if(this.key != null && this.key.length > 0) this.login(false);
        }
    }
}
</script>

<style scoped>
.login{
    box-sizing: border-box;
    padding: 15px 20px 15px 20px;
    box-shadow: inset 1px 1px 4px -1px rgba(0,0,0,1);
    background-color: #2670d1;
    color: #eaf6ff;
    margin-bottom: auto;
}


.error{
    color: rgb(255, 255, 255);
    font-size: 16px;
    text-align: center;
    margin: 0px auto;
    padding: 4px 4px;
    background-color: #1451a0;
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

.login input{
    /* text-align: center; */
    vertical-align: middle;
}
</style>