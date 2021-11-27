<template>
    <div v-if="session">
        <profile></profile> 
        <feed v-bind:key="reload" v-on:reload="reload++" v-bind:moderator="moderator"></feed>
    </div>
</template>

<script>
import axios from 'axios';
import config from '../utils/config';
import Profile from './layouts/Profile.vue';
import Feed from './layouts/Feed.vue';

export default {
    name: 'Main-view',
    data(){
        return{
            session: false,
            moderator: false,
            reload: 0
        }
    },
    methods:{
        
    },
    components: {
        'profile' : Profile,
        'feed' : Feed      
    },
    created(){
        if(!sessionStorage.userAuth){
            document.location.href = '/login';
        }else this.session = true;

        const token = JSON.parse(sessionStorage.userAuth).token;
        const userId = JSON.parse(sessionStorage.userAuth).userId;
        const vm = this;

        axios.get(`${config.urlApi}/api/auth/moderator/${userId}`,{
                headers:{'authorization' : `Bearer ${token}`}
            })
            .then(res =>{
              vm.moderator = res.data.moderator;
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
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    @media screen and (min-width: 1024px) {
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: start;
        }
    }
</style>