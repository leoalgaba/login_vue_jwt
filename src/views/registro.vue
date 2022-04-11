<template>
    <div class="login">
        <h1 class="title">Pagina de registro</h1>
        <form class="form"  @submit.prevent = 'saveUser()'>
            <label class="form-label" for="#name">Nombre:</label>
            <input class="form-input" type="string" id="name" placeholder = 'escribe tu nombre' v-model="user.name"/>
            <label class="form-label" for="#email">Email:</label>
            <input class="form-input" type="email" id="email" placeholder = 'escribe un email' v-model="user.email"/>
            <label class="form-label" for="#password">Password:</label>
            <input class="form-input" type="password" id="password" placeholder = 'contraseña' v-model="user.password"/>
            <label class="form-label" for="#password-repeat">Repite la contraseña</label>
            <input class="form-input" type="password" id="password-repeat" placeholder="Repite contraseña" v-model="passwordRepeat"/>
            <p v-if="error" class="error">Has introducido mal algun dato.</p>            
            <input class="form-submit" type="submit" value="Login" :disabled=" !user.name || !user.email || !user.password || !passwordRepeat">
        </form>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { Usuario} from '@/interfaces/usuario'
export default defineComponent ({
    data() {
        return {
            user: {} as Usuario,
            passwordRepeat:'',
            error: false
        }
    },
    methods: {
        async saveUser () {
            try {
            if(this.passwordRepeat != this.user.password)
            return alert('las contraseñas no coinciden')
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
                    console.log(data.err.errors)
                    return this.error = true
                }
                alert('Usuario registrado correctamente')
                this.$router.push('/')

            } catch (error) {
                console.log(error)

            }
        }
    }
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
        color: rgb(97, 4, 4)
    }
</style>