<template>
    <div v-if="session">
        <profile></profile> 
        <section>
            <h2>Créer une publication</h2>

            <p class="success" v-if="message">{{ message }}<br>Vous allez être redirigé automatiquement vers le fil d'actualité.</p>
            <form v-on:submit="createPost" v-else>
                <span class="success" v-if="message">{{ message }}</span>
                <span class="error" v-if="error.global">{{ error.global }}</span>
                <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp, image/gif" ref="file" v-on:change="upload()">
                <label for="title">Titre <i>( {{ count }}/140 )</i> : <span class="error" v-if="error.title">{{ error.title }}</span></label>
                <input type="text" name="title" maxlength="140"
                    v-model="formData.title"
                    v-on:keyup="validText(formData.title)"
                    v-bind:class="{valid: valid.title}"
                >
                <input type="submit" value="Publier" class="btnSubmit" v-bind:disabled=btnDisabled>
            </form>
        </section>
    </div>
</template>

<script>
import Profile from './layouts/Profile.vue';
import axios from 'axios';
import config from '../utils/config';

export default {
    name: 'PostCreate',
    data(){
        return{
            session: false,
            message: null,
            formData: {
                title: null,
                file: null
            },
            error: {
                global: null,
                title: null
            },
            valid:{
                title: false
            },
            count: 0
        }
    },
    computed: {
        btnDisabled(){
            if(this.valid.title && this.formData.file){
                return false;
            }else return true;
        }
    },
    components: {
        'profile': Profile
    },
    methods:{
        validText(text){
            this.count = text.length;
            if(text != '' && text[0] != ' ' && text.length <= 140){
                this.valid.title = true;
                this.error.title = null;
                return true;
            }else{
                this.valid.title = false;
                if(text.length > 140){this.error.title = 'Longueur du champ dépassée !';}
                else this.error.title = 'Champ invalide !';
                return false;
            }
        },
        upload(){
            this.formData.file = this.$refs.file.files[0];
        },
        createPost(e){
            e.preventDefault();
            const userId = JSON.parse(sessionStorage.userAuth).userId;
            const token = JSON.parse(sessionStorage.userAuth).token;
            const vm = this;
            this.message = null;
            this.error.global = null;
            this.error.title = null;
           
            if(!this.formData.title || this.formData.title == ''){
                this.error.title = 'Vous devez entrer un titre !';
            }else this.validText(this.formData.title);

            if(!this.formData.file){
                this.error.global = 'Vous devez joindre un fichier !';
            }
            
            if(!this.error.firstname && !this.error.lastname){
                let data = new FormData();
                data.append('image', this.formData.file);
                data.append('title', this.formData.title);
                data.append('id_user', userId);
                
                axios.post(`${config.urlApi}/api/posts`, data,
                    {                       
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'authorization' : `Bearer ${token}`
                        }                                     
                    })
                    .then(function(res){
                        vm.message = res.data.message;
                        vm.formData.title = null;
                        vm.formData.file = null;  
                        vm.valid.title = false;
                        setTimeout(()=>{
                            document.location.href = `/`;
                        }, 1000)                
                    })
                    .catch(function(error){
                        let errormessage = error.response.data.error;
                        vm.error.global = errormessage;
                    });
            }
        }
    },
    created(){
        if(!sessionStorage.userAuth){
            document.location.href = '/login';
        }else this.session = true;
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
        background-color: #333;
        padding: 5px;
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

    input{
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

    .btnSubmit:hover:not(:disabled){
        background-color: #a3cfbb;
        transition: 400ms;
    }

    .btnSubmit:disabled{
        cursor: not-allowed;
    }

    .success{
        color: #a3cfbb;
        font-size: 1.2rem;
    }

    .error{
        color: #f1aeb5;
    }

    .valid{
        background-color: #a3cfbb;
    }
    
    @media screen and (min-width: 1024px) {
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: start;
        }
    }
</style>