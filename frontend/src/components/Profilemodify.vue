<template>
    <div v-if="session" class="div-global">
        <profile v-bind:key="reload"></profile>
        <section>
            <div>
                <h2>Modifier mon profil</h2>

                <form v-on:submit="modifyProfile">
                    <span class="success" v-if="message">{{ message }}</span>
                    <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" ref="file" v-on:change="upload()">
                    <span class="error" v-if="error.global">{{ error.global }}</span>
                    <label for="firstname">Prénom : <span class="error" v-if="error.firstname">{{ error.firstname }}</span></label>
                    <input type="text" name="firstname"
                        v-model="formData.firstname"
                        v-on:keyup="validText(formData.firstname, 'firstname')"
                        v-bind:class="{valid: valid.firstname}"
                    >
                    <label for="lastname">Nom : <span class="error" v-if="error.lastname">{{ error.lastname }}</span></label>
                    <input type="text" name="lastname"
                        v-model="formData.lastname"
                        v-on:keyup="validText(formData.lastname, 'lastname')"
                        v-bind:class="{valid: valid.lastname}"
                    >
                    <label for="service">Service : </label>
                    <select name="service" v-model="formData.service">
                        <option v-bind:key="index" v-for="(service, index) in serviceList" >{{ service }}</option>
                    </select>
                    <input type="submit" value="Modifier mon compte" class="btnSubmit" v-bind:disabled=btnDisabled>
                </form>
            </div>

            <div class="div-delete">
                <button v-on:click="modal=true" class="btn-delete">Supprimer mon compte</button>
            </div>
        </section>
        <modaldelete v-if="modal" v-on:close="modal=false"></modaldelete>
    </div>
</template>

<script>
import axios from 'axios';
import Profile from './layouts/Profile.vue';
import ModalDelete from './layouts/Modaldelete.vue';
import config from '../utils/config';

export default {
    name: 'ProfileModify',
    data(){
        return{
            session: false,
            message: null,
            reload: 0,
            modal: false,
            formData: {
                firstname: null,
                lastname: null,
                service: null,
                file: null
            },
            serviceList: ['Commercial', 'Marketing', 'Logistique', 'Ressource Humaine', 'Relation Client', ' Financier'],
            error: {
                global: null,
                firstname: null,
                lastname: null
            },
            valid:{
                firstname: true,
                lastname: true
            }
        }
    },
    components: {
        'profile': Profile,
        'modaldelete': ModalDelete
    },
    computed: {
        btnDisabled(){
            if(this.valid.firstname && this.valid.lastname && this.formData.service != ''){
                return false;
            }else return true;
        }
    },
    methods:{
        modifyProfile(e){
            e.preventDefault();
            const userId = JSON.parse(sessionStorage.userAuth).userId;
            const token = JSON.parse(sessionStorage.userAuth).token;
            const vm = this;
            this.message = null;
            this.error.global = null;
            this.error.firstname = null;
            this.error.lastname = null;

            if(!this.formData.firstname){
                this.error.firstname = 'Vous devez entrer votre prénom !';
            }else this.validText(this.formData.firstname, 'firstname');

            if(!this.formData.lastname){
                this.error.lastname = 'Vous devez entrer votre nom !';
            }else this.validText(this.formData.lastname, 'lastname');
            
            if(!this.error.firstname && !this.error.lastname){
                let data = new FormData();
                data.append('avatar', this.formData.file);
                data.append('firstname', this.formData.firstname);
                data.append('lastname', this.formData.lastname);
                data.append('service', this.formData.service);

                axios({
                        url: `${config.urlApi}/api/auth/profile/${userId}`,
                        method: 'PUT',
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'authorization' : `Bearer ${token}`
                        },
                        data: data                                          
                    })
                    .then(function(res){
                        vm.message = res.data.message;   
                        vm.reload += 1;                   
                    })
                    .catch(function(error){
                        let errormessage = error.response.data.error;
                        vm.error.global = errormessage;
                    });
            }
        },
        validText(text, input){
            const regexText = new RegExp(/^[a-zA-Z\s'\-àáâãäæçèéêëìíîïñòóôõöùúûüýÿœÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÜŒ]+$/g);
            if(text.match(regexText) && text[0] != ' ' && text[text.length-1] != ' '){
                this.valid[input] = true;
                this.error[input] = null;
                return true;
            }else{
                this.valid[input] = false;
                this.error[input] = 'Champ invalide !';
                return false;
            }
        },
        upload(){
            this.formData.file = this.$refs.file.files[0];
        }
    },
    created(){
        if(!sessionStorage.userAuth){
            document.location.href = '/login';
        }else this.session = true;

        const userId = JSON.parse(sessionStorage.userAuth).userId;
        const token = JSON.parse(sessionStorage.userAuth).token;

        axios.get(`${config.urlApi}/api/auth/profile/${userId}`,{
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
    .div-global{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    section{
        width: 95%;
        margin-top: 20px;   
    }

    section div{
        background-color: #333;
        padding: 5px;
         
    }

    .div-delete{
        margin-top: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
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

    .btnSubmit:hover:not(:disabled){
        background-color: #a3cfbb;
        transition: 400ms;
    }

    .btnSubmit:disabled{
        cursor: not-allowed;
    }

    .btn-delete{
        width: 100%;
        height: 40px;
        background-color: #f1aeb5;
        font-size: 1.2rem;
        border: none;
        border-radius: 5px;
    }

    .btn-delete:hover {
        color: #fff;
        background-color: #842029;
        transition: 400ms;
    }
    
    .success{
        color: #a3cfbb;
    }

    .error{
        color: #f1aeb5;
    }

    .valid{
        background-color: #a3cfbb;
    }

    @media screen and (min-width: 1024px) {
        .div-global{
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