<template>
    <div class="modal-wrapper" >
        <div class="overlay" v-on:click="modalClose"></div>
        <div class="modal-bloc" >
            <h2>Confirmer</h2>
            <p>
                Êtes-vous sûr de vouloir supprimer votre compte et toutes ses données?<br>
                Attention! Cette opération est irréversible!
            </p>
            <div>
                <button v-on:click="modalClose">Non, je vais rester!</button>
                <button v-on:click="deleteAccount">Oui, je suis sûr!</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import config from '../../utils/config';

export default {
    name: 'ModalDelete',
    methods:{
        modalClose(){
            this.$emit('close');
        },
        deleteAccount(){
            const userId = JSON.parse(sessionStorage.userAuth).userId;
            const token = JSON.parse(sessionStorage.userAuth).token;

            axios.delete(`${config.urlApi}/api/auth/profile/${userId}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(() =>{
                sessionStorage.clear();
                document.location.href = '/login';
            })
            .catch(error=> {
                if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });
        }
    }
}
</script>

<style scoped>
    .modal-wrapper, .overlay{
        position: fixed;
        width:100%;
        height: 100%;
        top:0;
        left:0;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 1.2rem;
    }

    .modal-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-bloc{
        position: fixed;
        width: 95%;
        background-color: #333;
        padding: 15px 5px 5px 5px;
    }

    h2{
        margin:0;
    }

    button{
        width: 100%;
        height: 40px;
        font-size: 1.2rem;
        margin-bottom: 15px;
        border: none;
        border-radius: 5px;
    }

    button:hover{
        background-color: #000;
        color: #fff;
        transition: 400ms;
    }

    @media screen and (min-width: 1024px) {
        .modal-bloc{
           width : 50%;
        }
    }
</style>