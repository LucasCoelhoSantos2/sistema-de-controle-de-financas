<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-toolbar v-if="!usuarioLogado" color="primary" dark >
      <div class="d-flex align-center">
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
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn @click="userLog" flat to="/despesas" text>
          <!--TODO: Trocar para tela /entrar depois de construí-la-->
          <span class="mr-2">Entrar</span>
        </v-btn>
        <v-btn flat to="registrar" text>
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
            <v-btn @click="userLog" flat to="/">Sair</v-btn>
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
