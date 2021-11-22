<template>
    <div v-if="session">
        <profile></profile>
        <section>
            <h2>Modifier mon profil</h2>

            <form v-on:submit="modifyProfile">
                <span class="success" v-if="message">{{ message }}</span>
                <span class="error" v-if="error.global">{{ error.global }}</span>
                <label for="firstname">Prénom : </label>
                <input type="text" name="firstname" v-model="formData.firstname">
                <label for="lastname">Nom : </label>
                <input type="text" name="lastname" v-model="formData.lastname">
                <label for="service">Service : </label>
                <select name="service" v-model="formData.service">
                    <option v-bind:key="index" v-for="(service, index) in serviceList" >{{ service }}</option>
                </select>
                <input type="submit" value="Modifier mon compte" class="btnSubmit">
            </form>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Profile from './layouts/Profile.vue';

export default {
    name: 'ProfileModify',
    data(){
        return{
            session: false,
            message: null,
            formData: {
                firstname: null,
                lastname: null,
                service: null,
                avatar: null,
            },
            serviceList: ['Commercial', 'Marketing', 'Logistique', 'Ressource Humaine', 'Relation Client', ' Financier'],
            error: {
                global: null
            }
        }
    },
    components: {
        'profile': Profile
    },
    methods:{
        modifyProfile(e){
            e.preventDefault();
            const userId = JSON.parse(sessionStorage.userAuth).userId;
            const token = JSON.parse(sessionStorage.userAuth).token;
            const vm = this;
            this.message = null;
            this.error.global = null;

            axios({
                    url: `http://localhost:3000/api/auth/profile/${userId}`,
                    method: 'PUT',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization' : `Bearer ${token}`
                    },
                    data: JSON.stringify({
                        firstname: this.formData.firstname,
                        lastname: this.formData.lastname,
                        service: this.formData.service
                    })                    
                })
                .then(function(res){
                    vm.message = res.data.message;                      
                })
                .catch(function(error){
                    let errormessage = error.response.data.error;
                    vm.error.global = errormessage;
                });
        }
    },
    created(){
        if(!sessionStorage.userAuth){
            document.location.href = '/login';
        }else this.session = true;

        const userId = JSON.parse(sessionStorage.userAuth).userId;
        const token = JSON.parse(sessionStorage.userAuth).token;

        axios.get(`http://localhost:3000/api/auth/profile/${userId}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(res =>{
                this.formData = {...res.data};
            })
            .catch(error=> {
                if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });   
    }    
}
</script>

<style scoped>
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    section{
        width: 95%;
        margin-top: 20px;
        padding: 5px;
        background-color: #333;

    }

    h2{
        margin-top: 10px;
        margin-bottom: 10px;
    }

    form{
        display: flex;
        flex-direction: column;
        line-height: 40px;
        font-size: 1.2rem;
    }

    input, select{
        height: 30px;
        font-size: 1.2rem;
        margin-bottom: 10px;    
    }

    .btnSubmit{
        margin-top: 20px;
        height: 40px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .btnSubmit:hover{
        background-color: #a3cfbb;
        transition: 400ms;
    }
    
    .success{
        color: #a3cfbb;
    }

    .error{
        color: #f1aeb5;
    }

    @media screen and (min-width: 1024px) {
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: start;
        }

        section{
            width: 67%;
            margin-top: 0px
        }
    }
</style>