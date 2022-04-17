<template>
    <div class="login">
        <h1 class="title">Por favor rellene el formulario</h1>
        <form class="form" @submit.prevent = 'logueado()'>

            <Form class="form2" :validation-schema="schema">
                <label class="form-label" for="#email">Email:</label>
                <Field name="email" class="form-input" type="email" id="email" 
                    placeholder = 'escribe un email' v-model = 'user.email'/>
                <ErrorMessage name="email" class="error"/>
                <p v-if="error === 1" class="error">El email no esta registrado</p>

                <label class="form-label" for="#password">Password:</label>
                <Field name="password" class="form-input" type="password" id="password"
                    placeholder = 'contraseña' v-model = 'user.password'/>
                <ErrorMessage name="password" class="error"/>
                <p v-if="error === 2" class="error">La contraseña no es válida</p>
            </Form>

            <input class="form-submit" type="submit" value="Login" :disabled="!user.email || !user.password">
        </form>
        <p >¿No tienes cuenta?
            <router-link to="/registro">Registrate</router-link>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Usuario} from '@/interfaces/usuario'
import { mapState,mapActions} from 'vuex'
import { Form, Field, ErrorMessage } from 'vee-validate'
import {schema} from '@/validacion/yup'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            user: {} as Usuario,
            schema,
        }
    },
    computed: {
        ...mapState(['error','token'])
    },
    methods: {
        ...mapActions(['login']),

        async logueado() {
            try {
                await this.login(this.user)
                if (!this.token) {
                    return
                }
                this.$router.push('/protegida')
            } catch (error) {
                console.log(error)
            }
        }
        
    }
})

</script>

<style>
    .login {
        padding: 2rem;
    }
    .title {
        text-align: center;
    }
    .form {
        margin: 3rem auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 20%;
        min-width: 350px;
        max-width: 100%;
        background: rgba(19, 35, 47, 0.9);
        border-radius: 5px;
        padding: 40px;
        box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
    }
    .form2 {

        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 20%;
        min-width: 350px;
        max-width: 100%;

        border-radius: 5px;


    }
    .form-label {
        margin-top: 2rem;
        color: white;
        margin-bottom: 0.5rem;

    }
    .form-label:first-of-type {
        margin-top: 0rem;
    }
    .form-input {
        padding: 10px 15px;
        background: none;
        background-image: none;
        border: 1px solid white;
        color: white;
    }
    .form-input:focus {
        outline: 0;
        border-color: #1ab188;
    }

    .form-submit:enabled {
        background: #1ab188;
        border: none;
        color: white;
        margin-top: 3rem;
        padding: 1rem 0;
        cursor: pointer;
        transition: background 0.2s;
    }
    .form-submit:focus {
        background: #0b9185;
        color: black
    }

    .form-submit:disabled {
        border: none;
        margin-top: 3rem;
        padding: 1rem 0;
    }
    .error {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 12px;
        text-align: left;
        color: rgb(240, 78, 78)
    }
</style>