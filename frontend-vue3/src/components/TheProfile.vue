<template>
    <aside>
        <button class="btn-publish" @click="create">Publier</button>
        <img v-if="user.avatar" :src="user.avatar" @click="modify" class="avatar" alt="avatar de l'utilisateur" title="Modifier mon profil">
        <img v-else src="../assets/images/avatar.jpg" @click="modify" class="avatar" alt="avatar de l'utilisateur" title="Modifier mon profil">
        <p>
            {{ user.firstname }}<br>
            {{ user.lastname }}<br>
            <i>{{ user.service }}</i>
        </p>
        <button @click="modify" class="btn-profile">Mon profil</button>
        <button @click="unlog" class="btn-unlog"><img src="../assets/images/power-off-solid.svg" alt=""><span>Se déconnecter</span></button>
    </aside>
</template>

<script>
    import axios from 'axios';
    import config from '../config';

    export default {
        name: 'Profile',
        data() {
            return {
                user: {
                    firstname: null,
                    lastname: null,
                    service: null,
                    avatar: null
                }
            }
        },
        methods: {
            unlog: function(){
                sessionStorage.clear();
                document.location.href = '/login';
            },
            modify: function(){
                document.location.href = '/profile';
            },
            create: function(){
                document.location.href = '/post/create';
            }
        },
        created(){
            const userId = JSON.parse(sessionStorage.userAuth).userId;
            const token = JSON.parse(sessionStorage.userAuth).token;

            axios.get(`${config.urlApi}/api/auth/profile/${userId}`,{
                    headers:{'authorization' : `Bearer ${token}`}
                })
                .then(res =>{
                this.user = {...res.data};
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
     aside{
        width: 95%;
        padding: 5px;
        background-color: #333;
        font-size: 1.4rem;
        display: flex;
        justify-content: space-between;        
    }

    .avatar{
        width: 40px;
        height: 40px;
        object-fit: cover;
        object-position: 50% 50%;
        overflow: hidden;
        order: 1;
        border-radius: 5px;
    }

    p{
        overflow-wrap: break-word;
    }

    p, .btn-profile, .btn-unlog span{
       display: none;
    }

    .btn-publish{
        order: 2;
        padding: 0 20px;
    }

    button{
        font-size: 1.2rem;
        height: 40px;
        border: none;
        border-radius: 5px;
    }

    button:hover{
        background-color: #a3cfbb;
        transition: 400ms;
    }

    .btn-unlog{
        width: 40px;
        height: 40px;
        padding: 0;
        background-color: #f1aeb5;
        order: 3;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-unlog img{
        width: 30px;
        height: 30px;
    }

    .btn-unlog:hover {
        color: #fff;
        background-color: #842029;
        transition: 400ms;
    }

    @media screen and (min-width: 1024px) {
        aside{
            width: 25%;
            padding: 10px;
            flex-direction: column;            
        }

        .avatar{
            width: 100%;
            height: 100%;
            margin-top: 15px;
            order: initial;
        }

        p, .btn-profile, .btn-unlog span{
            display:initial;
        }

        button{
            font-size: 1.4rem;
        }

        .btn-publish{
            order: initial;
        }

        .btn-unlog{
            width: 100%;
            margin-top: 15px;
            background-color: #f1aeb5;
            order: initial;
            display: initial;
        }

        .btn-unlog img{
            display: none;
        }
    }
</style>