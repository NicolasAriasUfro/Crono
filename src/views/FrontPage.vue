<script setup>
import navBar from "../components/NavBar.vue";
import { useTheme } from "vuetify/lib/framework.mjs";

const theme = useTheme();
</script>

<template>
    <navBar />
    <v-container grid-list-sm fluid class="ma-0 pa-0">
        <v-container grid-list-xs fluid class="px-16 main-container align-content-center">
            <v-row>
                <v-col cols="12" md="6" class="d-flex flex-column align-end">
                    <img src="@/assets/reloj.png" alt="clock-image" class="main-clock">
                </v-col>
                <v-col cols="12" md="6" class="d-flex flex-column align-start justify-center px-16">
                    <h1>El cronoCustion</h1>
                    <p>Programa tus presentaciones como nunca antes &lt;(^o^&lt;)</p>
                    <div class="mt-5">
                        <v-btn color="success">Login</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-container grid-list-sm>
            <v-row>
                <v-col cols="12" md="6">
                    col 1
                </v-col>
                <v-col cols="12" md="6">
                    col 2
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    col 1
                </v-col>
                <v-col cols="12" md="6">
                    col 2
                </v-col>
            </v-row>
        </v-container>
        
    </v-container>
</template>

<style>
.main-container {
    background-color: v-bind("theme.current.value.colors.primary_light_3") !important;
    height: 500px;
}
.main-clock {
    height: 400px;
    width: 450px;
}
</style>