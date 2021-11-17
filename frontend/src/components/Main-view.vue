<template>
    <div>
        <profile></profile> 
        <feed></feed>
    </div>
</template>

<script>
import Profile from './layouts/Profile.vue';
import Feed from './layouts/Feed.vue';

export default {
    name: 'Main-view',
    data(){
        return{

        }
    },
    methods:{
        
    },
    components: {
        'profile' : Profile,
        'feed' : Feed      
    },
    beforeCreate(){
        if(!sessionStorage.userAuth){
            document.location.href = './login';
        }/*else{
            const userId = JSON.parse(sessionStorage.userId);
            const token = JSON.parse(sessionStorage.token);
            console.log(`${userId} : ${token}`);
        }*/
    }
}

</script>

<style scoped>
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: start;
    }
</style>