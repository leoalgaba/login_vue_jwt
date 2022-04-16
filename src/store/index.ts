import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    error: null
  },
  mutations: {
    setToken(state, playload) {
      state.token = playload
    },
    setError(state, playload) {
      state.error = playload
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

        console.log('token: ',data.token)
        console.log('error: ',data.msg)

        // para capturar el token
        commit('setToken', data.token)

        // para capturar el error
        commit('setError', data.error)

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
