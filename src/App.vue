<template>
  <v-app>
    <v-tabs color="primary" align-tabs="center">
      <v-tab to="cronograma">Cronograma</v-tab>
      <v-tab to="mis-cronogramas">Mis Temporizadores</v-tab>
      <v-tab to="configuracion">Configuración</v-tab>
    </v-tabs>
    <router-view />
    <v-footer>
      <span class="white--text">Made with ❤️ by @Nico</span>
    </v-footer>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
<script setup></script>
