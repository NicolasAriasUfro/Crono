<script>
    import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
    import { useSessionStore } from '@/stores/session';
    import router from '@/router';
    export default {
        data: () => ({
            store: useSessionStore(),
            googleProvider: new GoogleAuthProvider(),
            auth: getAuth(),
        }),
        methods: {
            loginGoogle() {
                signInWithPopup(this.auth, this.googleProvider)
                    .then( (result) => {
                        console.log("success!");
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        this.store.token = credential?.accessToken; 
                        setTimeout(() => {
                            router.push({ name: 'home' }), 500
                        })
                        
                    })
                    .catch( (why) => {
                        console.log("failed");
                    })
            },
            test: () => {
                var test = process.env.VUE_APP_SOME_TEST;
                console.log(test);
            }
        },
        mounted() {
        }   
    }
</script>


<template>
    <div class="my-3">
        <v-btn @click="loginGoogle" id="google-btn" rounded border="md">
            <font-awesome-icon id="google-icon" icon="fa-brands fa-google" />
        </v-btn>
        
    </div>
</template>

<style>

</style>