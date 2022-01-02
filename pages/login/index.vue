<template>
    <div class="min-h-screen bg-gray-50 flex">
        <div v-if="loaded" class="relative z-10 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96 bg-white shadow-lg">
                <div class="px-10 pt-10 pb-20">
                    <div class="mt-10">
                        <form @submit.prevent="handleLogin()" class="space-y-6">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">
                                    e-mail
                                </label>
                                <div class="mt-1">
                                    <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
                                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                                            focus:outline-none focus:ring-theme-dark focus:border-theme-dark sm:text-sm
                                        "
                                    />
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label for="password" class="block text-sm font-medium text-gray-700">
                                    senha
                                </label>
                                <div class="mt-1">
                                    <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required=""
                                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                                            focus:outline-none focus:ring-theme-dark focus:border-theme-dark sm:text-sm
                                        "
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    class="w-full h-10 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm
                                        text-sm font-medium text-white bg-theme-default hover:bg-theme-dark
                                        transition-color duration-100
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-semeiosis
                                    "
                                    :disabled="loading"
                                >
                                    <span v-if="!loading">logar</span>
                                    <loading v-else />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <nuxt-img class="absolute inset-0 h-full w-full object-cover"
            provider="static"
            src="/bg-pattern.jpg"
        />
    </div>
</template>

<script>
import { auth } from "~/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
    layout: "clear",

    data: function() {
        return {
            loaded: false,

			email: '',
			password: '',

			loading: false,
			message: null,
		};
	},

    methods: {
		async handleLogin() {
            if (this.loading) return;

			this.loading = true;
			this.message = null;

			if (!this.email || this.email == "") {

                this.$store.commit('set_notification', {
                    show: true,
                    title: 'Ops!',
                    description: 'Preencha o campo de e-mail, por favor.',
                    icon: 'error'
                });

				this.loading = false;
				return false;
			}

			if (!this.password || this.password == "") {
				this.$store.commit('set_notification', {
                    show: true,
                    title: 'Ops!',
                    description: 'Preencha o campo de senha, por favor.',
                    icon: 'error'
                });

				this.loading = false;
				return false;
			}

			const response = await this.$store.dispatch("user/login", {
				email: this.email,
				password: this.password
			});

			if (response.success) {
                const settings = await this.$store.dispatch('api/list', ['settings']);

                if (settings && settings.length)
                    this.$store.commit('settings/set_settings', settings);

				this.$router.push("/dashboard");

			} else {
                this.$store.commit('set_notification', {
                    show: true,
                    title: 'Ops!',
                    description: response.content,
                    icon: 'error'
                });

                this.loading = false;
			}
		}
	},

    head () {
        return {
            title: 'Ecossistemas'
        }
	},

	async mounted() {
        if (this.$store.state.user.data) {
			return this.$router.push('/')
		}

		const user = await new Promise((resolve) => {
			onAuthStateChanged(
                auth,
                user => resolve(user),
                error => reject(error)
            );
		});

		if (user) {
			this.$store.commit('user/set_user', JSON.parse(JSON.stringify(user)));
			return this.$router.push('/')

		} else {
			return this.loaded = true;
		};
	},
};
</script>

<style lang="postcss"></style>
