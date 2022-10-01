<template>
  <form>
    <v-text-field v-model="user.name" label="Nome" required></v-text-field>
    <v-text-field v-model="user.email" label="E-mail" required></v-text-field>
    <v-text-field
      v-model="user.password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      label="Senha"
      @click:append="show = !show"
    ></v-text-field>
    <!--<v-checkbox v-model="checkbox" label="Concorda com nossos termos?" required></v-checkbox>-->
    <div>
      <v-btn class="mr-4" @click="cadastrar">Cadastrar</v-btn>
      <br />
      <span
        >Já possui uma conta? <br />
        <a href="../entrar">Entre aqui!</a></span
      >
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      user: {
        name: "",
        email: "",
        password: "",
      },
      show: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
      },
    };
  },
  methods: {
    cadastrar() {
      this.$http.post("users.json", this.user).then(() => {
        this.user.name = "";
        this.user.email = "";
        this.user.password = "";
      });
    },
  },
};
</script>

<style></style>
