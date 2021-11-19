<template>
    <div v-if="session">
        <profile></profile> 
        <onepost></onepost>
    </div>
</template>

<script>
import Profile from './layouts/Profile.vue';
import OnePost from './layouts/Onepost.vue';

export default {
    name: 'One-view',
    data(){
        return{
            session: false
        }
    },
    methods:{
        
    },
    components: {
        'profile' : Profile,
        'onepost' : OnePost      
    },
    created(){
        if(!sessionStorage.userAuth){
            document.location.href = '/login';
        }else this.session = true;
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