<template>
    <div class="w-full relative">
        <PageHeader title="Configurações" />
        <main class="pt-4 lg:pt-10 relative">
            <div class="max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-5 relative">
                <div class="p-6 lg:py-0 lg:px-6 lg:col-span-3">
                    <aside class="relative lg:fixed top-0 lg:top-52">
                        <nav class="space-y-1 w-full max-w-lg flex flex-row lg:flex-col justify-between lg:justify-start">
                            <nuxt-link to="/settings/general" class="bg-gray-50 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium" aria-current="page"
                                :class="isCurrent('general') ? 'text-theme-default hover:text-theme-dark ' : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'"
                            >
                                <Icon name="settings" type="outline"
                                    :className="(isCurrent('general') ? 'text-theme-default group-hover:text-theme-dark' : 'text-gray-400 group-hover:text-gray-500') + ' flex-shrink-0 -ml-1 mr-3 h-6 w-6'"
                                />
                                <span class="truncate">
                                    Geral
                                </span>
                            </nuxt-link>

                            <nuxt-link to="/settings/language" class="bg-gray-50 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium" aria-current="page"
                                :class="isCurrent('language') ? 'text-theme-default hover:text-theme-dark ' : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'"
                            >
                                <Icon name="language" type="outline"
                                    :className="(isCurrent('language') ? 'text-theme-default group-hover:text-theme-dark' : 'text-gray-400 group-hover:text-gray-500') + ' flex-shrink-0 -ml-1 mr-3 h-6 w-6'"
                                />
                                <span class="truncate">
                                    Idiomas
                                </span>
                            </nuxt-link>

                            <nuxt-link to="/settings/navigation" class="bg-gray-50 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium" aria-current="page"
                                :class="isCurrent('navigation') ? 'text-theme-default hover:text-theme-dark ' : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'"
                            >
                                <Icon name="map" type="outline"
                                    :className="(isCurrent('navigation') ? 'text-theme-default group-hover:text-theme-dark' : 'text-gray-400 group-hover:text-gray-500') + ' flex-shrink-0 -ml-1 mr-3 h-6 w-6'"
                                />
                                <span class="truncate">
                                    Navegação
                                </span>
                            </nuxt-link>
                        </nav>
                    </aside>
                </div>
                <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-8 pb-20">
                    <nuxt-child />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Icon from '../components/app/app-icon.vue';

export default {
    name: 'Settings',

    components: {
        Icon
    },

    async asyncData({ store }) {
        // const networks = await store.dispatch('api/list', [ 'networks' ]);

        // if (networks && networks.length)
        //     store.commit('networks/set_networks', networks);
    },

    computed: {
        ...mapState({
            user: state => state.user.data,
        }),
    },

    methods: {
        isCurrent   (target) {
            return this.$route.path.endsWith(target);
        },

        async handleSave (data, finish) {
            const response = await this.$store.dispatch('api/update', [ 'settings', data ]);

            if (response?._status) {
                this.loading = false;

                this.$store.commit('set_notification', {
                    show: true,
                    title: 'Sucesso!',
                    description: 'Lista atualizada.',
                    icon: 'success'
                });

                const settings = await this.$store.dispatch('api/list', [ 'settings' ]);

                if (settings && settings.length)
                    this.$store.commit('settings/set_settings', settings);

                finish();

                return true;

            } else {
                this.$store.commit('set_notification', {
                    show: true,
                    title: 'Ops! Aconteceu um problema!',
                    description: 'Nào conseguimos atualizar a lista, tente novamente.',
                    icon: 'error'
                });

                finish();

                return false;
            }
        }
    }
}
</script>
