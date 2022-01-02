import api from "../helpers/api";
import dayjs from "dayjs";

// p/ v9: https://firebase.google.cn/docs/firestore/manage-data/add-data?hl=en

export const state = () => ({});

export const mutations = {};

export const actions = {
	async list(_, [ collection, ...query ]) {
		try {
			const response = await api.list(collection, ...query);
			return response;

		} catch (err) {
			console.log(err);
		}
    },

    async getLatest(_, [ collection ]) {
		try {
			return await api.getLatest(collection);

		} catch (err) {
			console.log(err);
		}
    },

    async single(_, [collection, docId]) {
		try {
			const response = await api.get(collection, docId);

			return response;

		} catch (err) {
			console.log(err);
		}
    },

    async add(_, [ collection, itemData ]) {
		try {
			const response =
				await api.add(collection, itemData);

			return response;

		} catch (err) {
			console.log(err);
		}
    },

	async update(_, [collection, itemData]) {
		try {
			const response =
				await api.update(collection, itemData);

			return response;

		} catch (err) {
			console.log(err);
		}
    },

    async remove(_, [ collection, apiId ]) {
		try {
			const response =
				await api.remove(collection, apiId);

			return response;

		} catch (err) {
			console.log(err);
		}
	},

	async get_id(_, collection) {
		return await api.getId(collection);
	}
};
