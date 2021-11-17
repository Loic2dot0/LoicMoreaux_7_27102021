<template>
    <form v-on:submit="login">
        <span v-if="error.global">{{ error.global }}</span>
        <label for="email">E-mail : <span v-if="error.email">{{ error.email }}</span></label>
        <input type="email" name="email" id="email" v-model="formData.email">
        <label for="password">Mot de passe : <span v-if="error.password">{{ error.password }}</span></label>
        <input type="password" name="password" id="password" v-model="formData.password"> 
        <input type="submit" value="Se connecter" class="btnSubmit">
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data(){
        return{
            error: {
                email: null,
                password: null,
                global: null
            },
            formData:{
                email: null,
                password: null
            }
        }
    },
    methods:{
        login: function(e){
            e.preventDefault();
            this.error.email = null;
            this.error.password = null;
            this.error.global = null;
            const vm = this;
            
            if(!this.formData.email){
                this.error.email = 'Vous devez entrer votre adresse mail !';
            }

            if(!this.formData.password){
                this.error.password = 'Vous devez entrer votre mot de passe !';
            }           

            if(!this.error.email && !this.error.password){
                axios({
                        url: 'http://localhost:3000/api/auth/login',
                        method: 'POST',
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            email: this.formData.email,
                            password: this.formData.password
                        })                    
                    })
                    .then(function(res){
                        console.log(res.data);
                        sessionStorage.setItem('userAuth', JSON.stringify(res.data));
                        document.location.href = './';
                    })
                    .catch(function(error){
                        let errormessage = error.response.data.error;
                        console.log(errormessage);
                        vm.error.global = errormessage;
                    });
            }
        }
    }
}
</script>

<style scoped>
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

    span{
        color: #fd2d01;
        text-align:center;   
    }
</style>