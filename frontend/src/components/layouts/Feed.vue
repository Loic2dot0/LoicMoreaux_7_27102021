<template>
    <section>
        <article v-bind:key="index" v-for="(post, index) in posts">
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
            <div class="article__footer">
                <button class="btn-rate btn-rate--top">Top</button>
                <button class="btn-rate btn-rate--flop">Flop</button>
                <button class="btn-comment">Commenter</button>
            </div>  
        </article>
    </section>
</template>

<script>
import axios from 'axios';
import config from '../../utils/config';

export default {
    name: 'Feed',
    data(){
        return{
            posts: []
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
        }
    },
    created(){
        const token = JSON.parse(sessionStorage.userAuth).token;

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

    .article__footer{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }

    .article__footer button{
        line-height: 20px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        width: 32%;
    }

    .btn-rate--top{
        background-color: #a3ebc5;
    }

    .btn-rate--top:hover{
        background-color: #16d198;
        color: #fff;
        transition: 400ms;
    }

    .btn-rate--flop{
        background-color: #ef6262;
    }

    .btn-rate--flop:hover{
        background-color: #ef4558;
        color: #fff;
        transition: 400ms;
    }

    .btn-comment:hover{
        background-color: #000;
        color: #fff;
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

        .article__footer button{
            width: 30%;
            line-height: 25px;
            font-size: 1.2rem;
        }
    }
</style>