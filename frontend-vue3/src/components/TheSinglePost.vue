<template>
   <section>
        <article>
            <div class="option" v-if="user.id_user == userId || moderator">
                <router-link v-if="post.User.id_user == userId" :to="`/post/modify/${post.id_post}`" class="btn-modify">Éditer</router-link>
                <button class="btn-delpost" v-if="post.User.id_user == userId" @click="modal=true">Supprimer</button>
                <button v-if="moderator" class="btn-delpost" @click="moderatePost(post.id_post)">Modérer</button>
            </div>
            <div class="author">
                <img v-if="user.avatar" :src="user.avatar" class="author__avatar" alt="avatar de l'utilisateur">
                <img v-else src="../assets/images/avatar.jpg" class="author__avatar" alt="avatar de l'utilisateur">
                <div class="author__text">
                    <p>{{ user.firstname }} {{ user.lastname }} <i>{{ user.service }}</i></p>
                    <p class="author__date">{{ formatDate(post.createdAt, post.updatedAt) }}</p>
                </div>
            </div>
            <h2 class="article__title">{{ post.title }}</h2>
            
            <div class="article__img">
                <img :src="post.image_url" :alt="post.title"> 
            </div>
            
            <Reaction :id_post="id_post" :postcom="true" :moderator="moderator"></Reaction>  
        </article>

        <router-link :to="`/`" class="btn_return">Retour au feed</router-link>
        <ModalDelPost v-if="modal" @delete="deletePost(post.id_post)" @close="modal=false"></ModalDelPost>
    </section>
</template>

<script>
    import axios from 'axios';
    import config from '../config';
    import Reaction from '../components/Reaction.vue';
    import ModalDelPost from '../components/ModalDelPost.vue';

    export default {
        name: "SinglePost",
        components:{
            Reaction,
            ModalDelPost
        },
        props: {
            moderator: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                id_post: this.$route.params.id_post,
                userId: null,
                post: {},
                user: {},
                modal: false
            };
        },
        methods: {
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
            },
            moderatePost(id_post){
                const token = JSON.parse(sessionStorage.userAuth).token;
            
                axios.post(`${config.urlApi}/api/posts/${id_post}/moderate`,
                    JSON.stringify({ moderate: true }),
                    {
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization' : `Bearer ${token}`
                        }                     
                    })
                    .then(()=> document.location.href = `/`)
                    .catch(error=> {
                        if(error.response.status > 400){
                            document.location.href = `/error/${error.response.status}`;
                        }
                    });
            }
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