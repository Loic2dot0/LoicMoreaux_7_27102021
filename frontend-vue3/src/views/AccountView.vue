<template>
    <section>
        <div class="div-btn">
            <div class="btn" :class="{'btn--select': toggle }" @click="toggleAccount">Se connecter</div>
            <div class="btn" :class="{'btn--select': !toggle }" @click="toggleAccount">Créer un compte</div>
        </div>

        <Login class="div-account" v-if="toggle"></Login>
        <Signup class="div-account" v-else></Signup>
    </section>
</template>

<script>
    import Login from '../components/TheLogin.vue';
    import Signup from '../components/TheSignup.vue';

    export default {
    name: "AccountView",
    components: {
        Login,
        Signup
    },
    data() {
        return {
            toggle: true,
        };
    },
    methods: {
        toggleAccount($event){
            if($event.target.classList.contains('btn--select')) return;
            this.toggle = !this.toggle;           
        }
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