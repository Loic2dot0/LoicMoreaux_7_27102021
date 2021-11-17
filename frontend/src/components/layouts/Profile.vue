<template>
    <aside>
        <button>Publier</button>
        <img v-if="user.avatar" v-bind:src="user.avatar">
        <img v-else src="../../assets/images/avatar.jpg">
        <p>
            {{ user.firstname }}<br>
            {{ user.lastname }}<br>
            {{ user.service }}
        </p>
        <button>Mon profil</button>
        <button>Se déconnecter</button>
    </aside>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Profile',
    data(){
        return{
            user: {
                firstname: null,
                lastname: null,
                service: null,
                avatar: null
            }
        }
    },
    created(){
        const userId = JSON.parse(sessionStorage.userAuth).userId;
        //const token = JSON.parse(sessionStorage.token);

        axios.get(`http://localhost:3000/api/auth/profile/${userId}`)
            .then(res =>{
               console.log(res.data);
               this.user = {...res.data};
            })
            .catch(error=> console.log(error));
    }    
}
</script>

<style scoped>
    aside{
        width: 25%;
        background-color: #333;
        display: flex;
        flex-direction: column;
        padding: 15px 30px;
    }

    img{
        margin-top: 15px;
        border-radius: 10px;
    }

    p{
        font-size: 1.4rem;
    }

    button{
        font-size: 1.4rem;
        line-height: 40px;
        border: none;
        border-radius: 20px;
    }

    button:hover{
        background-color: #a3cfbb;
        transition: 400ms;
    }

    button:last-child{
        margin-top: 15px;
        background-color: #f1aeb5;
    }

    button:last-child:hover {
        color: #fff;
        background-color: #842029;
        transition: 400ms;
    }
</style>