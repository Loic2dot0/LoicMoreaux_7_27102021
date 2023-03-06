<template>
    <form @submit="signup">
        <span v-if="error.global">{{ error.global }}</span>
        <label for="email">E-mail : <span v-if="error.email">{{ error.email }}</span></label>
        <input type="email" name="email"
            v-model="formData.email"
            @keyup="validEmail(formData.email)"
            :class="{valid: valid.email}"
        >
        <label for="password">Mot de passe : <span v-if="error.password">{{ error.password }}</span></label>
        <input type="password" name="password"
            v-model="formData.password"
            @keyup="validPassword(formData.password)"
            :class="{valid: valid.password}"
        >
        <label for="firstname">Prénom : <span v-if="error.firstname">{{ error.firstname }}</span></label>
        <input type="text" name="firstname" maxlength="25"
            v-model="formData.firstname"
            @keyup="validText(formData.firstname, 'firstname')"
            :class="{valid: valid.firstname}"
        >
        <label for="lastname">Nom : <span v-if="error.lastname">{{ error.lastname }}</span></label>
        <input type="text" name="lastname" maxlength="25"
            v-model="formData.lastname"
            @keyup="validText(formData.lastname, 'lastname')"
            :class="{valid: valid.lastname}"
        >
        <label for="service">Service : <span v-if="error.service">{{ error.service }}</span></label>
        <select name="service" v-model="formData.service">
            <option :key="index" v-for="(service, index) in formData.serviceList" >{{ service }}</option>
        </select>
        <input type="submit" value="Créer un compte" class="btnSubmit" :disabled=btnDisabled>
    </form>
</template>

<script>
    import axios from 'axios';
    import config from '../config.js';

    export default {
        name: 'Signup',
        data(){
            return{
                error: {
                    email: null,
                    password: null,
                    firstname: null,
                    lastname: null,
                    service: null,
                    global: null
                },
                formData:{
                    email: null,
                    password: null,
                    firstname: null,
                    lastname: null,
                    service: '',
                    serviceList: ['Commercial', 'Marketing', 'Logistique', 'Ressource Humaine', 'Relation Client', ' Financier']
                },
                valid:{
                    email: false,
                    password: false,
                    firstname: false,
                    lastname: false
                }
            }
        },
        computed: {
            btnDisabled(){
                if(this.valid.email && this.valid.password && this.valid.firstname && this.valid.lastname && this.formData.service != ''){
                    return false;
                }else return true;
            }
        },
        methods:{
            signup(e){
                e.preventDefault();
                this.error.email = null;
                this.error.password = null;
                this.error.firstname = null;
                this.error.lastname = null;
                this.error.service = null;
                this.error.global = null;
                const vm = this;

                if(!this.formData.email){
                    this.error.email = 'Vous devez entrer votre adresse mail !';
                }else this.validEmail(this.formData.email);
                
                if(!this.formData.password){
                    this.error.password = 'Vous devez entrer votre mot de passe !';
                } else this.validPassword(this.formData.password);
                
                if(!this.formData.firstname){
                    this.error.firstname = 'Vous devez entrer votre prénom !';
                }else this.validText(this.formData.firstname, 'firstname');

                if(!this.formData.lastname){
                    this.error.lastname = 'Vous devez entrer votre nom !';
                }else this.validText(this.formData.lastname, 'lastname');

                if(!this.formData.service){
                    this.error.service = 'Vous devez sélectionner un service !';
                }

                if(!this.error.email && !this.error.password && !this.error.firstname && !this.error.lastname && !this.error.service){
                    let email = this.formData.email;
                    let password = this.formData.password;

                    axios({
                            url: `${config.urlApi}/api/auth/signup`,
                            method: 'POST',
                            headers: { 
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                email: this.formData.email,
                                password: this.formData.password,
                                firstname: this.formData.firstname,
                                lastname: this.formData.lastname,
                                service: this.formData.service
                            })                    
                        })
                        .then(function(){
                            //On log directement le nouvel utilisateur
                            axios({
                                    url: `${config.urlApi}/api/auth/login`,
                                    method: 'POST',
                                    headers: { 
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    data: JSON.stringify({
                                        email: email,
                                        password: password
                                    })                    
                                })
                                .then(function(res){
                                    sessionStorage.setItem('userAuth', JSON.stringify(res.data));
                                    document.location.href = './';
                                })
                                .catch(function(error){
                                    console.log(error);
                                });
                            
                        })
                        .catch(function(error){
                            let errormessage = error.response.data.error;
                            if(errormessage.name == 'SequelizeUniqueConstraintError'){errormessage = 'Vous ne pouvez pas utiliser cette adresse email !';}
                            vm.error.global = errormessage;
                        });
                }
            },
            validEmail(email){
                const regexMail = new RegExp(/^[\w_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/g);
                if(email.match(regexMail)){
                    this.valid.email = true;
                    this.error.email = null;
                    return true;
                }else{
                    this.valid.email = false;
                    this.error.email = 'Votre adresse mail est invalide!';
                    return false;
                }
            },
            validPassword(password){
                const regexLowercase = new RegExp(/[a-z]/);
                const regexCapital = new RegExp(/[A-Z]/);
                const regexNumber = new RegExp(/\d+/);
                const regexSpecial = new RegExp(/[^a-zA-Z0-9]/);
                const regexSpace = new RegExp(/[\s\n]/);
                
                if(regexLowercase.test(password) && regexCapital.test(password) && regexNumber.test(password) && regexSpecial.test(password) && !regexSpace.test(password) && this.formData.password.length >= 8){
                    this.valid.password = true;
                    this.error.password = null;
                    return true;
                }else {
                    if(this.formData.password.length < 8){
                        this.error.password = 'Votre mot de passe doit comporter au moins 8 caractères!';
                    }else this.error.password = `Votre mot de passe doit comporter au moins une minuscule, majuscule, chiffre et caractère spécial et ne peut contenir d'espace!`;
                
                    this.valid.password = false;
                    return false;
                }
            },
            validText(text, input){
                const regexText = new RegExp(/^[a-zA-Z\s'\-àáâãäæçèéêëìíîïñòóôõöùúûüýÿœÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÜŒ]+$/g);
                if(text.match(regexText) && text[0] != ' ' && text.length <= 25){
                    this.valid[input] = true;
                    this.error[input] = null;
                    return true;
                }else{
                    this.valid[input] = false;
                    if(text.length > 25){this.error[input] = 'Longueur du champ dépassée !';}
                    else this.error[input] = 'Champ invalide !';
                    return false;
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
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .btnSubmit:hover:not(:disabled){
        background-color: #000;
        color: #ffd7d7 ;
        transition: 400ms;
    }

    .btnSubmit:disabled{
        cursor: not-allowed;
    }

    span{
        color: #f1aeb5;
        text-align:center;   
    }

    .valid{
        background-color: #a3cfbb;
    }
</style>