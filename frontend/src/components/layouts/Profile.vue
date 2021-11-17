<template>
    <aside>
        <button class="profile__btn">Publier</button>
        <img src="../../assets/images/avatar.jpg" class="profile__avatar">
        <p class="profile__text">
            {{ Prénom }}<br>
            {{ Nom }}<br>
            {{ Service }}
        </p>
        <button class="profile__btn">Mon profil</button>
        <button class="profile__btn">Se déconnecter</button>
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
    .profile__avatar{
        margin-top: 15px;
        border-radius: 10px;
    }

    .profile__text{
        font-size: 1.4rem;
    }

    .profile__btn{
        font-size: 1.4rem;
        line-height: 40px;
    }
</style>