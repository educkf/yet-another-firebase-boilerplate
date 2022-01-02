import { auth } from "~/config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const state = () => ({
	data: null
})

export const mutations = {
    set_user(state, payload) {
		state.data = payload;
	},
}

export const actions = {

    async login({ dispatch }, data) {
        try {
            const Login = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
			);

			if (Login?.user?.uid) {
				await dispatch(
					'api/single', [ 'users', Login.user.uid ], { root: true }
				)
			}

            return {
                success: true,
                content: Login
            };

        } catch (err) {
            console.log("store/user.js login(): ", err);
            return {
                success: false,
                content: err.message
            };
        }
	},

	async logout({ commit }) {
        return signOut(auth)
			.then(() => {
				commit('set_user', null);
				return true;

			})
			.catch(err => {
				console.log("store/user.js logout(): ", err);
				return false;
			});
	},

    async checkAuth({ commit }) {
		const user  = await new Promise((resolve) => {
			onAuthStateChanged(auth, user => {
				resolve(user);
			});
		});

		if (user) {
			commit('set_user', JSON.parse(JSON.stringify(user)));
		}

		return user;
	}
}
