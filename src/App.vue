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
  text-align: center;
}
</style>
<script setup></script>
