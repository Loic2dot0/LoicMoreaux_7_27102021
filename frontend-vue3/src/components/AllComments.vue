<template>
    <div class="comments" >
        <h3>Commentaires</h3>

        <p v-if="comments.length == 0">Il n'y a aucun commentaire pour le moment.</p>
        <div v-else :key="index" v-for="(comment, index) in comments" class="comments_div">
            <div class="option">
                <button class="btn-del" title="Supprimer mon commentaire"
                    v-if="comment.id_user == userId"
                    @click="deleteComment(comment.id_comment)"
                ><span class="btn-del--mini">X</span><span class="btn-del--big">Supprimer</span></button>
                <button v-if="moderator" class="btn-del btn-del--ml" @click="moderateComment(comment.id_comment)">Modérer</button>
            </div>
            <div class="author">
                <img v-if="comment.User.avatar" :src="comment.User.avatar" class="author__avatar" alt="avatar de l'utilisateur">
                <img v-else src="../assets/images/avatar.jpg" class="author__avatar" alt="avatar de l'utilisateur">
                <div class="author__text">
                    <p>{{ comment.User.firstname }} {{ comment.User.lastname }} <i>{{ comment.User.service }}</i></p>
                    <p class="author__date">{{ formatDate(comment.createdAt, comment.updatedAt) }}</p>
                </div>
            </div> 
           <p>{{ comment.comment }}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../config';

    export default {
        name: 'AllComments',
        props: {
            id_post: {
                type: String,
                required: true
            },
            moderator: {
                type: Boolean,
                required: true
            }
        },
        data(){
            return {
                comments: [],
                userId: null
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
            deleteComment(id_comment){
                const token = JSON.parse(sessionStorage.userAuth).token;
                const vm = this;
                
                axios.delete(`${config.urlApi}/api/comments/${id_comment}`,{
                    headers:{'authorization' : `Bearer ${token}`}
                })
                .then(()=>vm.$emit('reload'))
                .catch(error=> {
                    if(error.response.status > 400){
                        document.location.href = `/error/${error.response.status}`;
                    }
                });
            },
            moderateComment(id_comment){
                const token = JSON.parse(sessionStorage.userAuth).token;
                const vm = this;

                axios.post(`${config.urlApi}/api/comments/${id_comment}/moderate`,
                    JSON.stringify({ moderate: true }),
                    {
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization' : `Bearer ${token}`
                        }                     
                    })
                    .then(()=> vm.$emit('reload'))
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

            axios.get(`${config.urlApi}/api/comments/post/${this.id_post}`,{
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
        margin: 10px 0;
    }
    
    .comments_div{
        position: relative;
        background-color: #333;
        margin-bottom: 5px;
        padding: 5px;
        border-bottom: solid 1px #fff;
    }

    .comments_div:last-child{
        border: none;
    }

    .comments_div p{
        margin: 0px;
        overflow-wrap: break-word;
    }

    .option{
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .btn-del{
        border:none;
        border-radius: 5px;
        background-color: #f1aeb5;
    }

    .btn-del:hover{
        color: #fff;
        background-color: #842029;
        transition: 400ms;
    }

    .btn-del--big{
        display: none;
    }

    .btn-del--ml{
        margin-left: 5px;
    }

    @media screen and (min-width: 1024px) {
        .btn-del{
            font-size: 1rem;
            padding: 5px 10px;
        }

        .btn-del--mini{
            display: none;
        }

        .btn-del--big{
            display: initial;
        }
    }
</style>