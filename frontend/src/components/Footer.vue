<template>
    <footer>
        <p>
            <a href="#">Groupomania.com</a>
            <a href="#">Confidentialitée</a>
            <a href="mailto:admin@groupomania.com">Contacter un administrateur</a>
        </p>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
    
}
</script>

<style scoped>
    footer{
        width: 100%;
        background-color: #333;
        margin-top: 30px;
    }

    p{
        padding: 20px;
        max-width: 1200px;
        margin: auto;
        display: flex;
        justify-content: space-around;    
    }

    a{
        width: 30%;
        text-align: center;    
    }

    a:nth-child(2){
        border-left: solid 3px #ffd7d7;
        border-right: solid 3px #ffd7d7;
    }
</style>