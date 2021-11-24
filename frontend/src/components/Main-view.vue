<template>
    <div v-if="session">
        <profile></profile> 
        <feed v-bind:key="reload" v-on:reload="reload++"></feed>
    </div>
</template>

<script>
import Profile from './layouts/Profile.vue';
import Feed from './layouts/Feed.vue';

export default {
    name: 'Main-view',
    data(){
        return{
            session: false,
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