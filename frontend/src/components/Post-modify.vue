<template>
    <div v-if="session">
        <profile></profile> 
        <section>
            <h2>Éditer une publication</h2>
            
            <p class="success" v-if="message">{{ message }}<br>Vous allez être redirigé automatiquement vers le fil d'actualité.</p>
            <form v-on:submit="modifyPost" v-else>
                
                <span class="error" v-if="error.global">{{ error.global }}</span>
                <label for="title">Titre <i>( {{ count }}/140 )</i> : <span class="error" v-if="error.title">{{ error.title }}</span></label>
                <input type="text" name="title" maxlength="140"
                    v-model="formData.title"
                    v-on:keyup="validText(formData.title)"
                    v-bind:class="{valid: valid.title}"
                >
                <input type="submit" value="Éditer" class="btnSubmit" v-bind:disabled=btnDisabled>
            </form>
        </section>
    </div>
</template>

<script>
import Profile from './layouts/Profile.vue';
import axios from 'axios';
import config from '../utils/config';

export default {
    name: 'PostModify',
    data(){
        return{
            id_post: this.$route.params.id_post,
            session: false,
            message: null,
            formData: {
                title: null
            },
            error: {
                global: null,
                title: null
            },
            valid:{
                title: true
            },
            count: 0
        }
    },
    computed: {
        btnDisabled(){
            if(this.valid.title){
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
            if(text[0] != ' ' && text.length <= 140){
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
        modifyPost(e){
            e.preventDefault();
            const token = JSON.parse(sessionStorage.userAuth).token;
            const vm = this;
            this.message = null;
            this.error.global = null;
            this.error.title = null;
           
            if(!this.formData.title){
                this.error.title = 'Vous devez entrer un titre !';
            }else this.validText(this.formData.title);

            if(!this.error.title){
                axios({
                        url: `${config.urlApi}/api/posts/${this.id_post}`,
                        method: 'PUT',
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization' : `Bearer ${token}`
                        },
                        data: JSON.stringify({
                            title: this.formData.title
                        })                                                              
                    })
                    .then(function(res){
                        vm.message = res.data.message;
                        vm.formData.title = null;
                        vm.valid.title = false;
                        setTimeout(()=>{
                            document.location.href = `/`;
                        }, 2000)
                                       
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
        console.log(this.id_post);
        const token = JSON.parse(sessionStorage.userAuth).token;
        
        axios.get(`${config.urlApi}/api/posts/${this.id_post}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(res =>{
               this.formData.title = res.data.title;
               this.count = res.data.title.length;
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