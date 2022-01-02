e<template>
    <li class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 flex flex-col justify-between">
        <nuxt-link :to="`/pages/${page._id}`" class="w-full flex items-center justify-between p-6 space-x-6 border border-transparent rounded-t-lg hover:border-gray-200">
            <div class="flex-1  w-full overflow-hidden">
                <div class="flex flex-col space-y-3">
                    <h3 class="text-gray-900 flex justify-between w-full">
                        <span v-html="title" class="[ page-single-title ] text-base"></span>
                    </h3>
                    <p class="text-gray-600 italic">/{{ slug }}</p>
                </div>
            </div>
        </nuxt-link>
        <div>
            <div class="-mt-px flex divide-x divide-gray-200">
                <nuxt-link :to="`/pages/${page._id}`" class="-ml-px w-0 flex-1 flex">
                    <div class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 hover:bg-gray-100">
                        <Icon name="documentText" type="solid" className="w-5 h-5 text-gray-400" />
                        <span class="ml-3">Editar</span>
                    </div>
                </nuxt-link>
                <div class="w-0 flex-1 flex">
                    <button @click.prevent="exclude(page._id)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 hover:bg-red-100">
                        <span v-if="loading" class="flex text-red-400">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Excluíndo...</span>
                        </span>
                        <span v-else class="flex">
                            <Icon name="trash" type="solid" className="w-5 h-5 text-red-400" />
                            <span class="ml-3 text-red-400">Excluir</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { mapState } from 'vuex';

import localeMonth from '../../../helpers/months';

import Icon from '../../../components/app/app-icon.vue';

export default {
    name: "PageSingle",
    components: { Icon },

    props: {
        page: Object
    },

    data: function() {
        return {
            loading: false
        }
    },

    computed: {
        ...mapState({
            lang: state => state.settings.lang,
        }),

        title() {
            return this.page.data[this.page.langs[0]]?.title ?? 'Sem título'
        },

        slug() {
            return this.page.data[this.page.langs[0]]?.slug ?? '-'
        }
    },

    methods: {
        localeMonth(month) {
            return localeMonth(month);
        },

        exclude(pageId) {
            const sure = confirm("Deseja mesmo excluir essa página? Isso não pode ser desfeito.");

            if (sure) {
                const reallySure = confirm("Tem certeza disso? Essa ação não poderá ser desfeita!");

                if (reallySure) {
                    this.loading = true;

                    const success = this.$store.dispatch('api/remove', [ 'contents', pageId ]);

                    setTimeout(async () => {
                        if (success) {
                            await this.$store.dispatch('pages/getPages');

                            this.$store.commit('set_notification', {
                                show: true,
                                title: 'Sucesso!',
                                description: 'Dados apagados com sucesso!',
                                icon: 'success'
                            });

                            this.loading = false;

                        } else {
                            this.$store.commit('set_notification', {
                                show: true,
                                title: 'Erro!',
                                description: 'Os dados do Artigo não foram apagados!',
                                icon: 'error'
                            });

                            this.loading = false;
                        }
                    }, 1000)
                }
            }
        }
    }
};
</script>

<style lang="postcss">
    .page-single-title > * {
        @apply font-bold line-clamp-2;
    }
</style>
