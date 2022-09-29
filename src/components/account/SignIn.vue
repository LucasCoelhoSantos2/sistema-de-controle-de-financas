<template>
    <!--nome, senha, entrar, ainda não possui uma conta? registre-se aqui-->
    <form>
        <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :counter="10"
        label="Senha"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        ></v-text-field>

        <v-btn class="mr-4" @click="submit">Entrar</v-btn>
        <br>
        <span>Ainda não possui uma conta? <br> <a href="../registrar">Registre-se aqui!</a></span>
  </form>
</template>

<script>
export default {}
</script>

<style>

</style>
