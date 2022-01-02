<template>
    <form @submit.prevent="save()" class="col-span-3 max-w-3xl bg-white shadow sm:rounded-md ">
        <div class="py-6 px-4 space-y-6 sm:p-6">
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Configurações Gerais</h3>
                <p class="mt-1 text-sm text-gray-500">Dados gerais da aplicação.</p>
            </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 flex flex-row-reverse justify-between sm:px-6">
            <button :disable="loading" type="submit" class="bg-theme-default border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-theme-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light">
                <span v-if="!loading">Salvar</span>
                <loading v-else />
            </button>

            <button v-if="editing" :disable="loading" @click.prevent="cancel()" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light">
                Cancelar
            </button>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex';

import Icon from '../../components/app/app-icon.vue';

export default {
    name: 'SettingsGeneral',

    components: {
        Icon
    },

    data: function() {
        return {
            editing: false,
            loading: false,

            currLang: 'pt',

            localSettings: {
                issn: '',
                doiPrefix: ''
            }
        }
    },

    computed: {
        ...mapState({
            languages: state => state.settings.languages,
            settings: state => state.settings.settings,
        }),
    },

    watch: {
        settings: {
            handler() {
                this.setupLocal();
            },
            deep: true
        }
    },

    created() {
        this.setupLocal();
    },

    methods: {
        cancel () {
            this.editing = false;
            this.loading = false;
            this.setupLocal()
        },

        async save () {
            this.loading = true;

            const data = {
                _id: 'settings',
                settings: this.localSettings.planify()
            };

            await this.$parent.handleSave(data, this.setupLocal);
        },

        setupLocal() {
            this.editing = false;
            this.loading = false;

            const plainSettings = this.settings.planify();

            this.localSettings = {
                ...this.localSettings,
                ...plainSettings,

                title: this.languages.reduce((total, item) => ({
                    ...total,
                    [item.abbr]: plainSettings?.title?.[item.abbr] ?? ''
                }), {}),

                subtitle: this.languages.reduce((total, item) => ({
                    ...total,
                    [item.abbr]: plainSettings?.subtitle?.[item.abbr] ?? ''
                }), {})
            }.planify();
        }
    }
}
</script>
