<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
            <p>CONTROL DE USUARIO</p>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {mapActions} from 'vuex'

export default defineComponent({
  methods: {
    ...mapActions(['leerToken'])
  },
  created () {
    this.leerToken()
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
