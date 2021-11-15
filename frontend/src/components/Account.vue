<template>
    <section>
        <div class="div-btn">
            <div class="btn" v-on:click="component='login'">Se connecter</div>
            <div class="btn" v-on:click="component='signup'">Créer un compte</div>
        </div>

        <component v-bind:is="component" class="div-account"></component>
    </section>
</template>

<script>
import Login from './layouts/Login.vue';
import Signup from './layouts/Signup.vue';

export default {
    name: 'Account',
    data(){
        return{
            component: 'login'
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
        margin-top: 50px;
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
        background-color: #333;
        border-radius: 30px 30px 0 0;
        cursor: pointer;
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

    input{
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