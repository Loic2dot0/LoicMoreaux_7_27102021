<template>
    <section>
        {{ comments }}
    </section>
</template>

<script>
export default {
    name: 'Allcomments',
    data(){
        return{
        
        }
    },
    props: ['comments'],
    methods:{
        formatDate(createdDate, updatedate){
            const dateISO = new Date(updatedate)
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric' };
            let date = dateISO.toLocaleDateString('fr-FR', options);
            
            if(createdDate == updatedate){
                return `Publié le ${date}`;
            }else return `Modifié le ${date}`;
        }
    }
}
</script>

<style scoped>
    @media screen and (min-width: 1024px) {
        
    }
</style>