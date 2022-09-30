<template>
  <form>
    <v-text-field v-model="user.email" label="E-mail" required></v-text-field>
    <v-text-field v-model="user.password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" label="Senha" @click:append="show = !show"></v-text-field>
    <div>
      <v-btn class="mr-4" @click="entrar">Entrar</v-btn>
      <br>
      <span>Ainda não possui uma conta? <br> <a href="../registrar">Registre-se aqui!</a></span>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      show: false,
      rules: {
        required: value => !!value || 'Obrigatório.',
        min: v => v.length >= 8 || 'Mínimo 8 caracteres',
      },
    }
  },
  methods: {
    getUsers() {
      this.$http.get('users.json').then(res => {this.users = res.data})
    },
    entrar() {
      // Se o usuário existir no banco de dados, então: logar, se não: erro
      /*if (this.user.email == getUsers() && this.user.password == getUsers()) {
        console.log('sucesso')
      }
      else {
        console.log('erro')
      }*/
    },
  },
}
</script>

<style>

</style>
