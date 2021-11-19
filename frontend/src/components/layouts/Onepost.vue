<template>
    <section>
        <article>
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
            
            <div class="article__footer">
                <button class="btn-rate btn-rate--top">Top</button>
                <button class="btn-rate btn-rate--flop">Flop</button>
                <button class="btn-comment">Commenter</button>
            </div>  
        </article>

        <router-link v-bind:to="`/`">Retour au feed</router-link>

        <allcomments v-bind:id_post="id_post"></allcomments>
    </section>
</template>

<script>
import axios from 'axios';
import Allcomments from './Allcomments.vue';

export default {
    name: 'Onepost',
    data(){
        return{
            id_post: this.$route.params.id_post,
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
        }
    },
    components: {
        'allcomments' : Allcomments      
    },
    created(){
        const token = JSON.parse(sessionStorage.userAuth).token;

        axios.get(`http://localhost:3000/api/posts/${this.id_post}`,{
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
    
</style>