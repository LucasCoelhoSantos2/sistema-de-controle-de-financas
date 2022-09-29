<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bem vindo ao Sistema de Controle de Finanças
        </h1>

        <p class="subheading font-weight-regular">
          Entre ou faça seu registro para começar!
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Informações
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in importantLinks"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank">
            {{ next.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomePage',
    data: () => ({
      usuarioLogado: false,
      importantLinks: [
        {
          text: 'Documentação',
          href: 'https://github.com/LucasCoelhoSantos2/sistema-de-controle-de-financas',
        },
      ],
    }),
    methods: {
      userLog() {
        this.usuarioLogado = true
      }
    }
  }
</script>
