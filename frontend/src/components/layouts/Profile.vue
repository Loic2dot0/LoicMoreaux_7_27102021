<template>
    <aside>
        <button>Publier</button>
        <img src="../../assets/images/avatar.jpg">
        <p>
            {{ Prénom }}<br>
            {{ Nom }}<br>
            {{ Service }}
        </p>
        <button>Mon profil</button>
        <button>Se déconnecter</button>
    </aside>
</template>

<script>
export default {
    name: 'Profile'    
}
</script>

<style scoped>
    aside{
        width: 25%;
        background-color: #333;
        display: flex;
        flex-direction: column;
        padding: 15px 30px;
    }

    img{
        margin-top: 15px;
        border-radius: 10px;
    }

    p{
        font-size: 1.4rem;
    }

    button{
        font-size: 1.4rem;
        line-height: 40px;
        border: none;
        border-radius: 20px;
    }

    button:hover{
        background-color: #a3cfbb;
        transition: 400ms;
    }

    button:last-child{
        margin-top: 15px;
        background-color: #f1aeb5;
    }

    button:last-child:hover {
        color: #fff;
        background-color: #842029;
        transition: 400ms;
    }
</style>