<template>
    <section>
        <h2>{{ errorStatus }}</h2>
        <p>Oups... Une errreur est survenue</p>
    </section>
</template>

<script>
export default {
    name: 'ErrorPage',
    data(){
        return{
            errorStatus: this.$route.params.status
        }
    },
    created(){
        console.log(this.$route.params.status);
    }
}
</script>

<style scoped>
    section{
        background-color: #333;
        padding: 50px;
        font-size: 1.2rem;
    }
    h2{
        color: #fd2d01;
        font-size: 5rem;
        margin-top: 20px;
    }
</style>