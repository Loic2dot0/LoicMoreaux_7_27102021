<template>
    <div>
        <div class="reaction">
            <button class="btn-rate btn-rate--top"
                v-bind:class="{topactive: userlike}"
                v-bind:disabled=userdislike
                v-on:click="reactLike"
            >
                Top<span v-if="like != 0"> {{ like }}</span>
            </button>
            <button class="btn-rate btn-rate--flop"
                v-bind:class="{flopactive: userdislike}"
                v-bind:disabled=userlike
                v-on:click="reactDislike"
            >
                Flop<span v-if="dislike != 0"> {{ dislike }}</span>
            </button>
            <button class="btn-comment" title="Je veux commenter !"
                v-on:click="toggle = !toggle">
                <span v-if="comment < 1">Commentaire {{ comment }}</span>
                <span v-else>Commentaires {{ comment }}</span>
            </button>
        </div>
        <form v-if="toggle" v-on:submit="sendComment">
            <label for="comment">Publier un commentaire :</label>
            <input name="comment" type="text">
            <input type="submit">
        </form>
    </div> 
</template>

<script>
import axios from 'axios';
import config from '../../utils/config';

export default {
    name: 'Reaction',
    data(){
        return{
            like: 0,
            userlike: false,
            dislike: 0,
            userdislike: false,
            comment: 0,
            userId: null,
            toggle: false,
        }
    },
    props: ['id_post'],
    methods:{
        reactLike(){
            let reaction = 0;
            this.userlike = !this.userlike;
            if(this.userlike){
                this.like ++;
                reaction = 1;
            }else this.like --;
            this.reaction(reaction);
        },
        reactDislike(){
            let reaction = 0;
            this.userdislike = !this.userdislike;
            if(this.userdislike){
                this.dislike ++;
                reaction = -1;
            }else this.dislike --;
            this.reaction(reaction);
        },
        reaction(like){
            const token = JSON.parse(sessionStorage.userAuth).token;

            axios({
                url: `${config.urlApi}/api/posts/${this.id_post}/like`,
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                },
                data: JSON.stringify({
                    id_user: this.userId,
                    like: like
                }) 
            })
            .then()
            .catch(error=> {
                if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });
        },
        sendComment(){
            console.log('sending')
        }
    },
    created(){
        this.userId = JSON.parse(sessionStorage.userAuth).userId;
        const token = JSON.parse(sessionStorage.userAuth).token;
        const vm = this;
        
        //mise à jour compteur like
        axios({
                url: `${config.urlApi}/api/count/like`,
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                },
                data: JSON.stringify({
                    id_post: this.id_post,
                    id_user: this.userId
                }) 
            })
            .then(res =>{
                vm.like = res.data.like;
                vm.userlike = res.data.userlike;
            })
            .catch(error=> {
                if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });

        //mise à jour compteur dislike
        axios({
                url: `${config.urlApi}/api/count/dislike`,
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                },
                data: JSON.stringify({
                    id_post: this.id_post,
                    id_user: this.userId
                }) 
            })
            .then(res =>{
                vm.dislike = res.data.dislike;
                vm.userdislike = res.data.userdislike;
            })
            .catch(error=> {
                if(error.response.status > 400){
                    document.location.href = `/error/${error.response.status}`;
                }
            });

        //Mise a jour compteur commentaire
        axios({
                url: `${config.urlApi}/api/count/comment`,
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${token}`
                },
                data: JSON.stringify({
                    id_post: this.id_post,
                    id_user: this.userId
                }) 
            })
            .then(res =>{
                vm.comment = res.data.comment;
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
    .reaction{
        
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 5px;
    }

    .reaction button{
        line-height: 25px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;   
    }

    .btn-rate{
        width: 45%;
    }
    
    .btn-comment{
        margin-top: 10px;
        width: 100%;
    }
    
    .btn-rate--top{
        background-color: #000;
        color: #a3ebc5;
        outline: solid 1px #a3ebc5;
    }

    .btn-rate--top:hover:not(:disabled){
        background-color: #16d198;
        color: #fff;
        transition: 400ms;
    }

    .btn-rate--flop{
        background-color: #000;
        color: #ef6262;
        outline: solid 1px #ef6262;
    }

    .btn-rate--flop:hover:not(:disabled){
        background-color: #ef4558;
        color: #fff;
        transition: 400ms;
    }

    .topactive{
        background-color: #a3ebc5;
        color: #000;
    }

    .flopactive{
        background-color: #ef6262;
        color: #000;
    }

    button:disabled{
        cursor: not-allowed;
    }

    @media screen and (min-width: 1024px) {
        .reaction{
            height: 30px;
        }

        .btn-rate, .btn-comment{
            width: 30%;
            font-size: 1.2rem;
            margin-top: 0px
        }
    }
</style>