<script>
import AuthService from '../services/AuthService.js'
import GoogleLogin from '../components/GoogleLogin.vue'

export default {
    components: { GoogleLogin },
    data: () => ({
        tab: 0,
        tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
    ],
        dialog: true,
        valid: true,
        authService: new AuthService(),
        email: '',
        emailRules: [
            value => {
                if (value) return true
                return 'Por favor ingresar correo.'
            },
            value => {
                if (/.+@.+\..+/.test(value)) return true
                return 'El correo debe ser valido.'
            }
        ],
        password: '',
        passwordRules: [
            value => {
                if ( value ) return true
                return 'Por favor ingresar Contraseña.'
            },
            v => (v.length >= 6) || "Min 8 characters"
        ]
    }),
    methods: {
        authUser() {
            var valid = this.authService.checkUserValido(this.email, this.password);
            console.log(valid);
            if (valid) {
                this.$router.replace({ name: "home"})
            } else {
                this.$refs.loginForm.reset()
            }
        },
        validate() {
            if (this.$refs.loginForm.validate()) {
                //TODO: MAGIC HERE (soon*)
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        }
    },
    created() {
    }
}
</script>

<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        min-width="360px"
        transition="dialog-transition"
    >   <v-tabs class="rounded" bg-color="#7464bc" direction="vertical">
                <div class="d-flex justify-space-between">
                    <div class="flex-grow-1">
                    <v-tab class="d-block" value="one" width="300px">
                        Login
                    </v-tab>
                </div>
                <div class="flex-grow-1 justify-center">
                    <v-tab class="d-block" value="dos" width="300px" >
                        Registro
                    </v-tab>
                </div>
                </div>
                <v-tabs-window>
                    <v-tabs-window-item value="one">
                        <v-card rounded="0" class="px-8 py-5">
                            <v-form class="mb-3" ref="loginForm" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field 
                                            bg-color="teal-lighten-5"
                                            color="red-darken-4"
                                            v-model="email"
                                            :rules="emailRules"
                                            label="Correo"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            bg-color="teal-lighten-5"
                                            v-model="password"
                                            :rules="passwordRules"
                                            :type="'password'"
                                            label="Contraseña"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col class="d-flex" align-self="center">
                                        <v-btn class="mt-2" align-center color="pink-lighten-2" type="submit" :disabled="!valid" :class="valid? 'cursor-not-allowed' : 'cursor-auto'" @click="authUser">Ingresar</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                            <hr>
                            <div class="my-5 text-center ">
                                <p>También puedes ingresar con:</p>
                                <GoogleLogin />
                            </div>
                        </v-card>
                    </v-tabs-window-item>
                <v-tabs-window-item value="dos" class="text-center">SOON&#8482;</v-tabs-window-item>
                </v-tabs-window>
        </v-tabs>
        
    </v-dialog>
</template>