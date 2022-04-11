<template>
<div>
    ruta protegida
</div>
<div>
    <button @click="cerrarSesion">cerrar sesion</button>
</div>
<div id="main-container">
    <table>
    <thead>
        <tr>
            <th>nombre</th>
            <th>email</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(User,index) in user" :key="index">
            <td>{{User.name}}</td>
            <td>{{User.email}}</td>
        </tr>

    </tbody>
</table>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { Usuario} from '@/interfaces/usuario'

export default defineComponent({
    data() {
        return {
            user: [] as Usuario[]
        }
    },    
    computed: {
        ...mapState(['token'])
    },
    methods: {
        async datosProtegidos() {
            try {
                const res = await fetch('https://loginleo.herokuapp.com/admin/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Auth-token': this.token
                    }
                })
                const data = await res.json()
                this.user = data
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        ...mapActions(['cerrarSesion'])
    },
    created () {
        this.datosProtegidos()
    }
})
</script>

<style>
#main-container {
    margin: 100px auto;
    width: 600px
}
table {
    background-color: gray;
    width: 100%;
    text-align: left;
    border-collapse: collapse
}
th, td {
    padding: 10px;
}
thead {
    background-color: #246355;
    border-bottom: solid 5px #0f362D;
    color: white;
}
tr:nth-child(even) {
    background-color: #ddd
}
tr:hover td {
    background-color: #369681;
    color: white;
}
button {
    background-color: #1a75b1;
    color: rgb(255, 255, 255);
    margin-top: 1rem;
}
</style>