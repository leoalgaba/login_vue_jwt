<template>
    <div class="login">
        <h1 class="title">Pagina de registro</h1>

        <Form class="form" @submit="saveUser()" :validation-schema="schema">

            <label class="form-label" for="#name">Nombre:</label>
            <Field name="name" class="form-input" type="string" id="name" 
                placeholder = 'escribe tu nombre' v-model="user.name"/>
            <ErrorMessage name="name" class="error"/>

            <label class="form-label" for="#email">Email:</label>
            <Field name="email" class="form-input" type="email" id="email"
                placeholder = 'escribe un email' v-model="user.email"/>
            <ErrorMessage name="email" class="error"/>
            <p v-if="error" class="error">El email ya existe como usuario</p>

            <label class="form-label" for="#password">Password:</label>
            <Field name="password"  class="form-input" type="password" id="password" 
                placeholder = 'contraseña' v-model="user.password"/>
            <ErrorMessage name="password" class="error"/>

            <label class="form-label" for="#password-repeat">Repite la contraseña</label>
            <Field name="repeatPassword" class="form-input" type="password" id="password-repeat" 
                placeholder="Repite contraseña" v-model="passwordRepeat"/>
            <ErrorMessage name="repeatPassword" class="error"/>

            <input class="form-submit" type="submit" value="Login" 
                :disabled=" !user.name || !user.email || !user.password || !passwordRepeat">
            
        </Form>
        
    </div>
</template>

<script lang="ts">

import { defineComponent} from 'vue'
import { Usuario} from '@/interfaces/usuario'
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
            passwordRepeat:'',
            error: false,
            schema,
        }
    },

    methods: {
        async saveUser () {
            try {
            const res = await fetch('https://loginleo.herokuapp.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.user)
            })
                const data = await res.json()
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                    return this.error = true
                }
                alert('Usuario registrado correctamente')
                this.$router.push('/')

            } catch (error) {
                console.log(error)

            }
        }
    },
})
</script>

<style>
    .login {
        padding: 10px;
    }
    .title {
        text-align: center;
    }
    .form {
        margin: 1rem auto;
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
    .form-label {
        margin-top: 1rem;
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