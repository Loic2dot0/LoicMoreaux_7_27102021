<template>
    <section>
        <div class="div-btn">
            <div class="btn" v-bind:class="{'btn--select': toggle1 }" v-on:click="toggleLogin">Se connecter</div>
            <div class="btn" v-bind:class="{'btn--select': !toggle1 }" v-on:click="toggleSignup">Créer un compte</div>
        </div>

        <login class="div-account" v-if="toggle1"></login>
        <signup class="div-account" v-if="toggle2"></signup>
    </section>
</template>

<script>
import Login from './layouts/Login.vue';
import Signup from './layouts/Signup.vue';

export default {
    name: 'Account',
    data(){
        return{
            toggle1: true,
            toggle2: false
        }
    },
    methods:{
        toggleLogin(){
            this.toggle1 = true,
            this.toggle2 = false
        },
        toggleSignup(){
            this.toggle1 = false,
            this.toggle2 = true
        }
    },
    components: {
        'login' : Login,
        'signup' : Signup        
    }
}
</script>

<style scoped>
    section{
        width: 95%;
        margin: auto;
        margin-top: 30px;
        background-color: #333;
    }

    .div-btn{
        display: flex;
        justify-content: space-between;
        background-color: #000;
    }

    .btn{
        display: block;
        width: 49.5%;
        line-height: 40px;
        font-size: 1.2rem;
        text-align: center;
        background-color: #202020;
        border-radius: 5px 5px 0 0;
        cursor: pointer;
    }

    .btn--select{
        background-color: #333;
    }

    .div-account{
        width : 90%;
        margin: auto;
        padding-bottom: 20px;
    }

    @media screen and (min-width: 1024px) {
        section{
            width: 70%;
        }
    }
</style>