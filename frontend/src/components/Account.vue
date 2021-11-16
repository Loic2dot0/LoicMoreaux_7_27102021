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
        toggleLogin: function(){
            this.toggle1 = true,
            this.toggle2 = false
        },
        toggleSignup: function(){
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

<style>
    section{
        width: 70%;
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
        font-size: 1.4rem;
        text-align: center;
        background-color: #202020;
        border-radius: 30px 30px 0 0;
        cursor: pointer;
    }

    .btn--select{
        background-color: #333;
    }

    .div-account{
        width : 90%;
        margin: auto;
        padding-bottom: 20px;
        border-radius: 30px;
    }

    form{
        display: flex;
        flex-direction: column;
        line-height: 40px;
        font-size: 1.2rem;
        margin-top: 20px;
    }

    input, select{
        height: 30px;
        font-size: 1.2rem;
        margin-bottom: 10px;    
    }

    .btnSubmit{
        margin-top: 20px;
        height: 40px;
        background-color: #ffd7d7;
        border: solid 1px #000;
        cursor: pointer;
    }
</style>