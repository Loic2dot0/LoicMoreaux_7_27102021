<template>
    <section>
        <article>
            <div class="option" v-if="user.id_user == userId">
                <router-link v-bind:to="`/post/modify/${post.id_post}`" class="btn-modify">Éditer</router-link>
                <button class="btn-delpost" v-on:click="deletePost(post.id_post)">Supprimer</button>
            </div>
            <div class="author">
                <img v-if="user.avatar" v-bind:src="user.avatar" class="author__avatar" alt="avatar de l'utilisateur">
                <img v-else src="../../assets/images/avatar.jpg" class="author__avatar" alt="avatar de l'utilisateur">
                <div class="author__text">
                    <p>{{ user.firstname }} {{ user.lastname }} <i>{{ user.service }}</i></p>
                    <p class="author__date">{{ formatDate(post.createdAt, post.updatedAt) }}</p>
                </div>
            </div>
            <h2 class="article__title">{{ post.title }}</h2>
            
            <div class="article__img">
                <img v-bind:src="post.image_url" v-bind:alt="post.title"> 
            </div>
            
            <reaction v-bind:id_post="id_post" ></reaction>  
        </article>

        <router-link v-bind:to="`/`" class="btn_return">Retour au feed</router-link>

        <allcomments v-bind:id_post="id_post"></allcomments>
    </section>
</template>

<script>
import axios from 'axios';
import Allcomments from './Allcomments.vue';
import config from '../../utils/config';
import Reaction from '../layouts/Reaction.vue';

export default {
    name: 'Onepost',
    data(){
        return{
            id_post: this.$route.params.id_post,
            userId: null,
            post: {},
            user: {}
        }
    },
    methods:{
        formatDate(createdDate, updatedate){
            const dateISO = new Date(updatedate)
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric' };
            let date = dateISO.toLocaleDateString('fr-FR', options);
            
            if(createdDate == updatedate){
                return `Publié le ${date}`;
            }else return `Modifié le ${date}`;
        },
        deletePost(id_post){
            const token = JSON.parse(sessionStorage.userAuth).token;
            
            axios.delete(`${config.urlApi}/api/posts/${id_post}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(()=>{document.location.href = `/`;})
            .catch(error=> {
                if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });
        }
    },
    components: {
        'allcomments' : Allcomments,
        'reaction' : Reaction      
    },
    created(){
        const token = JSON.parse(sessionStorage.userAuth).token;
        this.userId = JSON.parse(sessionStorage.userAuth).userId;

        axios.get(`${config.urlApi}/api/posts/${this.id_post}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(res =>{
               this.post = res.data;
               this.user = this.post.User;
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
    .btn_return{
        display: block;
        width: 50%;
        margin: auto;
        padding: 5px 10px;
        text-align: center;
        background-color: #fff;
        color: #000;
        font-size: 1.2rem;
        border-radius: 5px;
    }

    .btn_return:hover{
        background-color: #000;
        outline: solid 1px #fff;
        color: #fff;
        text-decoration: none;
        transition: 400ms;
    }

    .article__img img{
        max-height: none;
    }
</style>