import { firebaseApp } from "~/config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default async function ({ store, redirect }) {
	const stateUser = store.state.user.data;

    if (!stateUser) {
        const auth = getAuth(firebaseApp);

		const user = await new Promise((resolve) => {
			onAuthStateChanged(auth, firebaseUser => {
				resolve(firebaseUser);
			});
		});

		if (user) {
			store.commit('user/set_user', JSON.parse(JSON.stringify(user)));
			return true;

		} else {
			return redirect ('/login')
		};

	};

	return true;
}
