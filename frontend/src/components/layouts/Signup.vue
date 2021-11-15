<template>
    <form>
        <label for="mail">E-mail</label>
        <input type="text" name="mail">
        <label for="password">Mot de passe</label>
        <input type="text" name="password">
        <label for="firstname">Prénom</label>
        <input type="text" name="firstname">
        <label for="lastname">Nom</label>
        <input type="text" name="lastname">
        <label for="service">Service</label>
        <select name="service">
            <option value="Compta">Compta</option>
            <option value="RH">Ressource humaine</option>
            <option value="Commercial">Commercial</option>
            <option value="Marketing">Marketing</option>
        </select>
        <input type="submit" value="Créer un compte" class="btnSubmit">
    </form>
</template>

<script>
export default {
    name: 'Signup'
    
}
</script>

<style scoped>

</style>