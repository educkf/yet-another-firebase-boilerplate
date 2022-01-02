<template>
    <div class="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
        <!-- Profile dropdown -->
        <div  v-click-outside="hide" class="relative flex-shrink-0">
            <div>
                <button @click.prevent="show = !show" type="button"
                    class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-default" id="user-menu-button"
                    aria-expanded="false" aria-haspopup="true"
                >
                    <span class="sr-only">Open user menu</span>
                    <div class="bg-gray-400 h-8 w-8 rounded-full flex justify-center items-center">
                        <Icon name="user" type="outline" className="h-5 w-5 text-white" />
                    </div>
                </button>
            </div>

            <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div v-if="show" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <button @click.prevent="logout()" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Logout</button>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Icon from './app-icon.vue';

	export default {
        name: "AppAccount",

		data: function() {
			return {
                show: false
            };
		},

        components: {
            Icon
        },

        computed: {
            ...mapState({
                user: state => state.user.data,
                lang: state => state.settings.lang
            }),
        },

        methods: {
			async logout() {
				const logout = await this.$store.dispatch('user/logout');
                if (logout && !this.user) {
                    this.$router.push('/login')
                }
			},

            hide() {
                this.show = false;
            }
		},
	};
</script>

<style></style>
