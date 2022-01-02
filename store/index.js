export const state = () => ({
    notification: {
        show: false,
        title: '',
        description: '',
        icon: 'success'
    }
})

export const getters = {}

export const mutations = {
    set_notification(state, payload) {
        state.notification = payload;
	},
}

export const actions = {
    async nuxtClientInit({ dispatch, commit }, { req }) {
        await dispatch('user/checkAuth');
        const settings = await dispatch('api/list', ['settings']);

        if (settings && settings.length)
            commit('settings/set_settings', settings);
    }
}
