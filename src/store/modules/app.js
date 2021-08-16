const app = {
  state: {
    app: [],
    save_url: {},
	show_var: 0
  },
  mutations: {
    SET_APP: (state, app_data) => {
      state.app =  app_data
    },
    SAVE_URL: (state, url) => {
      state.save_url =  url
    },
	SET_SHOW: (state, value) => {
	  state.show_var =  value
	},
	
  },
  actions: {
    set_app: ({commit}, app_data)  => {
      commit('SET_APP',app_data)
    },
	set_show: ({commit}, value)  => {
	  commit('SET_SHOW',value)
	},
  }
}
export default app