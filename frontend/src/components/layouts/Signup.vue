<template>
    <form>
        <label for="mail">E-mail</label>
        <input type="text" name="mail">
        <label for="password">Mot de passe</label>
        <input type="text" name="password">
        <label for="firstname">Prénom</label>
        <input type="text" name="firstname">
        <label for="lastname">Nom</label>
        <input type="text" name="lastname">
        <label for="service">Service</label>
        <select name="service" v-model="formData.service">
            <option v-bind:key="index" v-for="(service, index) in formData.serviceList" >{{ service }}</option>
        </select>
        <input type="submit" value="Créer un compte" class="btnSubmit">
    </form>
</template>

<script>
export default {
    name: 'Signup',
    data(){
        return {
            formData:{
                service: '',
                serviceList: ['Commercial', 'Marketting', 'Logistique', 'Ressource Humaine', 'Relation Client', ' Financier']
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

    .btnSubmit:hover{
        background-color: #000;
        color: #ffd7d7 ;
        transition: 400ms;
    }

    span{
        color: #fd2d01;
        text-align:center;   
    }
</style>