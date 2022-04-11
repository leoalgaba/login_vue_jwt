import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, playload) {
      state.token = playload
    }
  },
  actions: {
    async login({commit}, usuario) {
      console.log(usuario)
      try {
        const res = await fetch('https://loginleo.herokuapp.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
        })
        const data = await res.json()
        console.log(data.token)

        // para capturar el token
        commit('setToken', data.token)
        // para no tener que loguearse cada vez que se cargue la pagina
        localStorage.setItem('token', data.token)
      } catch (error) {
        console.log(error)
      }
    },
    leerToken({commit}) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      }else {
        commit('setToken', null)
      }
    },
    cerrarSesion({commit}) {
      localStorage.removeItem('token')
      commit('setToken', null)
    }
  },
  modules: {
  }
})
