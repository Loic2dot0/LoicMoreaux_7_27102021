<template v-bind:key="reload">
    <section >
        <article v-bind:key="index" v-for="(post, index) in posts">
            <div class="option" v-if="post.User.id_user == userId">
                <router-link v-bind:to="`/post/modify/${post.id_post}`" class="btn-modify">Éditer</router-link>
                <button class="btn-delpost" v-on:click="modalDelete(post.id_post)">Supprimer</button>
            </div>
            <div class="author">
                <img v-if="post.User.avatar" v-bind:src="post.User.avatar" class="author__avatar" alt="avatar de l'utilisateur">
                <img v-else src="../../assets/images/avatar.jpg" class="author__avatar" alt="avatar de l'utilisateur">
                <div class="author__text">
                    <p>{{ post.User.firstname }} {{ post.User.lastname }} <i>{{ post.User.service }}</i></p>
                    <p class="author__date">{{ formatDate(post.createdAt, post.updatedAt) }}</p>
                </div>
            </div>
            <h2 class="article__title">{{ post.title }}</h2>
            
            <router-link v-bind:to="`/post/view/${post.id_post}`">
                <div class="article__img">
                    <img v-bind:src="post.image_url" v-bind:alt="post.title"> 
                </div>
            </router-link>
            <reaction v-bind:id_post="post.id_post" ></reaction>           
        </article>
        <modaldelpost v-if="modal" v-on:delete="deletePost(deleteidpost)" v-on:close="modal=false"></modaldelpost>   
    </section>
</template>

<script>
import axios from 'axios';
import config from '../../utils/config';
import Reaction from '../layouts/Reaction.vue';
import ModalDelPost from '../layouts/Modaldelpost.vue';

export default {
    name: 'Feed',
    data(){
        return{
            posts: [],
            userId: null,
            modal:false,
            deleteidpost: null
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
        modalDelete(id_post){
            this.deleteidpost = id_post;
            this.modal = true;
        },
        deletePost(id_post){
            const token = JSON.parse(sessionStorage.userAuth).token;
            const vm = this;

            axios.delete(`${config.urlApi}/api/posts/${id_post}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(()=> vm.$emit('reload'))
            .catch(error=> {
                if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });
        }
    },
    components: {
        'reaction' : Reaction,
        'modaldelpost' : ModalDelPost      
    },
    created(){
        const token = JSON.parse(sessionStorage.userAuth).token;
        this.userId = JSON.parse(sessionStorage.userAuth).userId;

        axios.get(`${config.urlApi}/api/posts`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(res =>{
               this.posts = res.data;
            })
            .catch(error=> {
               if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });    
    }
}
</script>

<style>
    section{
        width: 95%;
        margin-top: 20px;
    }

    article{
        width: 100%;
        background-color: #333;
        margin-bottom: 15px;
        padding: 5px;
    }

    .option{
        display: flex;
        justify-content: flex-end;
    }

    .author{
        display: flex;
    }

    .author__avatar{
        width: 40px;
        height: 40px;
        object-fit: cover;
        object-position: 50% 50%;
        overflow: hidden;
        border-radius: 5px;
    }

    .author__text{
        margin-left: 5px;
        flex: 1;
        font-size: 1.2rem;
        overflow-wrap: break-word;
    }

    .author__text p{
        margin: 0;
    }
    
    .author__date{
        font-size: 1rem
    }

    .article__title{
        margin: 0;
        font-weight: normal;
        overflow-wrap: break-word; 
    }

    .article__img{
        text-align: center;
        margin-top: 5px;
    }

    .article__img img{
        max-width: 100%;
        max-height: 350px;
        margin: auto;
    }
    
    .btn-modify, .btn-delpost{
        padding: 5px;
        border-radius: 5px;
        background-color: #fff;
        color: #000;
        font-style: italic;   
    }

    .btn-modify:hover{
        background-color: #000;
        color: #fff;
        transition: 400ms;
        text-decoration: none;
    }

    .btn-delpost{
        border: none;
        margin-left: 5px;
        font-size: 1rem;
        background-color: #f1aeb5;
    }
    
    .btn-delpost:hover{
        color: #fff;
        background-color: #842029;
        transition: 400ms;
    }

    @media screen and (min-width: 1024px) {
        section{
            width: 67%;
            margin-top: 0px
        }
        
        .author__text{
            font-size: 1.4rem;
        }

        .btn-modify, .btn-delpost{
            width: 15%;
            text-align: center;
        }
    }
</style>