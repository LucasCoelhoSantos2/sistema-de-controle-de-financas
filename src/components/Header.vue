<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-toolbar v-if="!usuarioLogado" color="primary" dark >
    <div >
      <v-btn class="d-flex align-center" text to="/">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"/>

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"/>
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text to="/entrar">
        <span class="mr-2">Entrar</span>
      </v-btn>
      <v-btn text to="registrar">
        <span class="mr-2">Registrar</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  
  <v-toolbar v-else>
    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>{{ nome }}</span>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-toolbar-items>
      <v-btn @click="userLog" text to="/">Sair</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      nome: 'Yasmin Lied',
      usuarioLogado: false
    }
  },
  methods: {
    userLog() {
      this.usuarioLogado = !this.usuarioLogado
    }
  },
}
</script>

<style>

</style>
