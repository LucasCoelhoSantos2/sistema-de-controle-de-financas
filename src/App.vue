<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header'

export default {
  components: { Header },
}
</script>
