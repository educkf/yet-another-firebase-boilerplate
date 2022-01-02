<template>
    <div>
        <div class="grid grid-cols-5 gap-3 pb-2">
            <form @submit.prevent="save()" class="col-span-3 bg-white shadow sm:rounded-md ">
                <div class="py-6 px-4 space-y-6 sm:p-6">
                    <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Configurações de idiomas</h3>
                        <p class="mt-1 text-sm text-gray-500">Idiomas que funcionarão no site da revista.</p>
                    </div>

                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6">
                            <label for="label" class="block text-sm font-medium text-gray-700">Idioma</label>
                            <input v-model="language.label" type="text" name="label" id="label" autocomplete="semeiosis-label" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-default sm:text-sm">
                        </div>

                        <div class="col-span-6 sm:col-span-4">
                            <label for="abbr" class="block text-sm font-medium text-gray-700">Abreviação</label>
                            <input v-model="language.abbr" type="text" name="abbr" id="abbr" autocomplete="semeiosis-abbr" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-default sm:text-sm">
                        </div>

                        <div class="col-span-6 sm:col-span-4">
                            <div class="relative flex items-start">
                                <div class="flex items-center h-5">
                                    <input v-model="language.default" id="default" name="default" type="checkbox" class="focus:ring-theme-light h-4 w-4 text-theme-default border-gray-300 rounded">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="comments" class="font-medium text-gray-700">Idioma principal</label>
                                    <p class="text-gray-500">Quando o site for aberto, se não for identificado o idioma do navegador, será utilizado o idioma padrão.</p>
                                </div>
                            </div>
                        </div>
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


            <div class="col-span-2 bg-white shadow sm:rounded-md flow-root py-6 px-4">
                <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li v-for="(language, index) in languages" :key="language.abbr" class="py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">
                                    {{ language.label }}

                                    <span v-if="language.default" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-theme-default ml-4">
                                        Padrão
                                    </span>
                                </p>
                                <p class="text-sm text-gray-500 truncate">
                                    Abreviação: <strong>{{ language.abbr }}</strong>
                                </p>
                            </div>
                            <div class="flex items-center">
                                <button @click.prevent="edit(index)" :disable="loading" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                                    Editar
                                </button>

                                <button @click.prevent="exclude(index)" :disable="loading" type="button" class="inline-flex items-center ml-2 p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    <Icon name="trash" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Icon from '../../components/app/app-icon.vue';

export default {
    name: 'SettingsLanguage',

    components: {
        Icon
    },

    data: function() {
        return {
            editing: false,

            language: {
                label: '',
                abbr: '',
                default: false,
                index: -1
            },

            loading: false
        }
    },

    computed: {
        ...mapState({
            languages: state => state.settings.languages,
        }),
    },

    methods: {
        edit (index) {
            this.editing = true;
            this.language = {
                label: this.languages[index].label,
                abbr: this.languages[index].abbr,
                default: this.languages[index].default,
                index: index
            }
        },

        cancel () {
            this.editing = false;
            this.loading = false;
            this.language = {
                label: '',
                abbr: '',
                default: false,
                index: -1
            }
        },

        async save () {
            this.loading = true;

            const data = {
                _id: 'languages',
                languages: this.languages.planify()
            };

            if (this.language.default) {
                data.languages = data.languages.map(item => ({...item, default: false }));
            }

            if (this.language.index === -1) {
                data.languages.push({
                    label: this.language.label,
                    abbr: this.language.abbr,
                    default: this.language.default,
                })

            } else {
                data.languages[this.language.index] = {
                    label: this.language.label,
                    abbr: this.language.abbr,
                    default: this.language.default,
                }
            }

            await this.$parent.handleSave(data, this.cancel);
        },

        async exclude (index) {
            const data = {
                _id: 'languages',
                languages: this.languages.filter((_, originalIndex) => originalIndex !== index)
            }

            await this.$parent.handleSave(data, this.cancel);
        },


    }
}
</script>
