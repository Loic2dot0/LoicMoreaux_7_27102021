<template>
    <div v-if="session">
        <Profile></Profile>
        <Feed :key="reload" @reload="reload++" :moderator="moderator" ></Feed>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../config.js'
    import Profile from '../components/TheProfile.vue';
    import Feed from '../components/TheFeed.vue';

    export default {
        name: 'MainView',
        components: {
            Profile,
            Feed
        },
        data() {
            return {
                session: false,
                moderator: false,
                reload: 0
            }
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
        },
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