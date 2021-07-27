const apiHelper = require('~/helpers/api')
const apiURL = 'http://api.football-data.org/v2/'
export const state = () => ({
    success: false,
    loading: false,
    error: false,
    listArea: [],
    listCompetition: [],
    listTeam: [],
    listDetailTeam: []
})

export const actions = {
    fetchArea ({ commit }) {
        commit('LOADING')
        this.$axios
        .get(`${apiURL}areas`)
          .then((response) => {
            commit('SUCCESS_FETCH_AREA', response.data)
          })
          .catch((error) => {
            const message = apiHelper.handleError(error)
            commit('ERROR', message)
          })
    },
    fetchCompetition ({ commit }, data) {
        commit('LOADING')
        this.$axios
        .get(`${apiURL}competitions?areas=${data}`)
          .then((response) => {
            commit('SUCCESS_FETCH_COMPETITION', response.data)
          })
          .catch((error) => {
            const message = apiHelper.handleError(error)
            commit('ERROR', message)
          })
    },
    fetchTeamById ({ commit }, data) {
        commit('LOADING')
        this.$axios
        .get(`${apiURL}teams/${data}`)
          .then((response) => {
            commit('SUCCESS_FETCH_TEAM_BY_ID', response.data)
          })
          .catch((error) => {
            const message = apiHelper.handleError(error)
            commit('ERROR', message)
          })
    },
    fetchAllTeam ({ commit }, data) {
        commit('LOADING')
        this.$axios
        .get(`${apiURL}competitions/${data}/teams`)
          .then((response) => {
            commit('SUCCESS_FETCH_TEAM', response.data)
          })
          .catch((error) => {
            const message = apiHelper.handleError(error)
            commit('ERROR', message)
          })
    },
}

export const mutations = {
    SUCCESS (state) {
        state.success = true
        state.error = false
        state.loading = false
        state.message = ''
    },
    LOADING (state) {
        state.success = false
        state.error = false
        state.loading = true
        state.message = ''
    },
    ERROR (state, message) {
        state.success = false
        state.error = true
        state.loading = false
        state.message = message
    },
    SUCCESS_FETCH_AREA (state, data) {
        state.success = true
        state.error = false
        state.loading = false
        state.message = ''
        state.listArea = data.areas
    },
    SUCCESS_FETCH_COMPETITION (state, data) {
        state.success = true
        state.error = false
        state.loading = false
        state.message = ''
        state.listCompetition = data.competitions
    },
    SUCCESS_FETCH_TEAM (state, data) {
        state.success = true
        state.error = false
        state.loading = false
        state.message = ''
        state.listTeam = data.teams
    },
    SUCCESS_FETCH_TEAM_BY_ID (state, data) {
        state.success = true
        state.error = false
        state.loading = false
        state.message = ''
        state.listDetailTeam = data
    },
}