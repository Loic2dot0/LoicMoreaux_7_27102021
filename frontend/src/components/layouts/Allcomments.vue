<template>
    <div class="comments">
        
        <h3>Commentaires</h3>

        <p v-if="comments.length == 0">Il n'y a aucun commentaire pour le moment.</p>
        <div v-else v-bind:key="index" v-for="(comment, index) in comments" class="comments_div">
            <div class="author">
                <img v-if="comment.User.avatar" v-bind:src="comment.User.avatar" class="author__avatar" alt="avatar de l'utilisateur">
                <img v-else src="../../assets/images/avatar.jpg" class="author__avatar" alt="avatar de l'utilisateur">
                <div class="author__text">
                    <p>{{ comment.User.firstname }} {{ comment.User.lastname }} <i>{{ comment.User.service }}</i></p>
                    <p class="author__date">{{ formatDate(comment.createdAt, comment.updatedAt) }}</p>
                </div>
            </div> 
           {{ comment.comment }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Allcomments',
    data(){
        return{
            comments: [],
        }
    },
    props: ['id_post'],
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

        axios.get(`http://localhost:3000/api/comments/post/${this.id_post}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(res =>{
               this.comments = res.data;
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
    h3{
        background-color: #333;
        font-size: 1.4rem;
        padding: 5px;
    }
    
    .comments_div{
        background-color: #333;
        margin-bottom: 5px;
        padding: 5px;
    }
</style>