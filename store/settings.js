export const state = () => ({
    lang: 'pt',
    languages: [],
    menu: [],
    settings: {}
})

export const mutations = {
    set_settings(state, payload) {
        payload.forEach(item => {
            state[item._id] = item[item._id];
        })
	},
}

export const actions = {}
