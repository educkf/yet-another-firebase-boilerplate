import { where } from 'firebase/firestore/lite';

export const state = () => ({
    list: []
})

export const getters = {
	single: (state) => (id) => {
		return state.list.find(item => item._id === id)
    },

    years: (state) => {
        return [...new Set(state.list
            .filter(item => item?.typeData?.year ?? false)
            .map(item => item.typeData.year)
        )].sort((a, b) => b - a);
    }
}

export const mutations = {
	set_pages(state, payload) {
		state.list = payload;
    }
}

export const actions = {
    async getPages({ dispatch, commit }) {
        const pages = await dispatch('api/list', [
            'contents',
            where("type", "==", 'page'),
            where("status", "!=", 'deleted')
        ], { root: true });

        console.log({ pages })

        if (pages && Array.isArray(pages))
            commit('set_pages', pages);
    }
}
