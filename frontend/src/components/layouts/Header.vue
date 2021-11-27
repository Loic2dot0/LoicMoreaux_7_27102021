<template>
    <header>
        <h1>Groupomania</h1>
        
        <a href="/" class="header_a">
            <img src="../../assets/images/groupomamia_logo.png">
        </a>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
    header{
        background-color: #333;
        margin-bottom: 30px;
    }

    h1{
        display:none;
    }

    a{
        display: block;
        width: 90%;
        margin: auto;
        text-align:  center;
        border-bottom: solid 3px #ffd7d7;
    }

    img{
        width:90%;
        padding: 10px;
    }

    @media screen and (min-width: 780px) {
        a{
            width: 80%;
            max-width: 1200px;
        }

        img{
            width:70%;
            max-width: 800px;
        }
    }
</style>