<template>
        <main v-if="person" class="fixed inset-0 z-20 bg-black bg-opacity-60">
            <form @submit.prevent="handleForm()" class="max-w-3xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div class="shadow border border-gray-300 bg-white sm:rounded-md sm:overflow-hidden mt-8 space-y-3 divide-y divide-gray-200">
                    <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                        <div>
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Dados da pessoa</h3>
                        </div>

                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 lg:col-span-3">
                                <label for="person-lastName" class="block text-sm font-medium text-gray-700">Sobrenome</label>
                                <input v-model="person.lastName" type="text" name="person-lastName" id="person-lastName" autocomplete="off" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm">
                            </div>
                            <div class="col-span-4 lg:col-span-3">
                                <label for="person-name" class="block text-sm font-medium text-gray-700">Nome</label>
                                <input v-model="person.name" type="text" name="person-name" id="person-name" autocomplete="off" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm">
                            </div>
                        </div>

                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-2 lg:col-span-3">
                                <label for="person-designation" class="block text-sm font-medium text-gray-700">Designação</label>
                                <input v-model="person.designation" type="text" name="person-designation" id="person-designation" autocomplete="off" placeholder="Prof. Dr. etc" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm">
                            </div>
                            <div class="col-span-4 lg:col-span-3">
                                <label for="person-filiation" class="block text-sm font-medium text-gray-700">Instituição</label>
                                <input v-model="person.filiation" type="text" filiation="person-filiation" id="person-filiation" autocomplete="off" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm">
                            </div>
                        </div>

                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-2 lg:col-span-3">
                                <label for="person-url" class="block text-sm font-medium text-gray-700">URL</label>
                                <input v-model="person.url" type="text" name="person-url" id="person-url" autocomplete="off" placeholder="Lattes, site, orcid..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm">
                            </div>
                            <div class="col-span-4 lg:col-span-3">
                                <label for="person-email" class="block text-sm font-medium text-gray-700">E-mail</label>
                                <input v-model="person.email" type="text" email="person-email" id="person-email" autocomplete="off" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm">
                            </div>
                        </div>

                        <tab-language v-model="currLang" :useLanguages="languages">
                            <div class="col-span-6 mt-4">
                                <label for="person-description" class="block text-sm font-medium text-gray-700">Mini-bio</label>
                                <text-area v-model="person.description[currLang]" name="person-description" id="person-description" />
                            </div>
                        </tab-language>

                        <div v-if="inplace && person._id" class="relative flex items-start">
                            <div class="flex items-center h-5">
                                <input v-model="shouldUpdateMain" id="shouldUpdateMain" aria-describedby="shouldUpdateMain" name="shouldUpdateMain" type="checkbox"
                                    class="focus:ring-theme-dark h-4 w-4 text-theme-default border-gray-300 rounded"
                                >
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="comments" class="font-medium text-gray-700">Atualizar dados principais da pessoa?</label>
                                <p class="my-2 font-bold text-xs text-gray-500">Use essa opção apenas se essa for a publicação mais recente da pessoa.</p>
                                <p id="shouldUpdateMain" class="text-xs text-gray-500">
                                    Cada artigo tem registrado em seus metadados também os dados da autoria, para que ele tenha em sí os dados daquele momento da pessoa, a instituição que atuava, email etc.<br />
                                    Ao selecionar essa opção, atualizaremos os dados da autoria no artigo <strong>e também</strong> na base de dados principal de autores, e passará a ser o dado apresentado no perfil de autor.
                                </p>
                            </div>
                        </div>
                        <div v-else-if="!inplace || (person.id && !person.id.includes('new'))">
                            <p id="shouldUpdateMain" class="text-gray-500 text-xs mt-2">
                                Ao salvar, os dados serão atualizados apenas para este perfil de autoria do site. Os artigos que estão ligados a esse registro permanecerão os mesmos. <br />
                                Fazemos isso para que os artigos registrem também o momento quando foram escritos (se foram escritos enquanto a pessoa ainda era doutorando, ou estavam em determinada instituição etc).
                            </p>
                        </div>
                    </div>
                </div>

                <div class="pt-5">
                    <div class="flex justify-between">
                        <button @click.prevent="close()" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light">
                            Fechar
                        </button>
                        <button type="submit" :disabled="loading" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-theme-default hover:bg-theme-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light">
                            <span v-if="loading" class="flex">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Salvando...</span>
                            </span>
                            <span v-else>Salvar</span>
                        </button>
                    </div>
                </div>
            </form>
        </main>
</template>

<script>
import { mapState } from 'vuex';

import schema from '../../helpers/schema';

import TextArea from '../input/text-area.vue';

export default {
    name: "Contributor-Modal",

    components: { TextArea },

    props: {
        inplace: Boolean,
        personId: null,
        personData: null
    },

    data() {
        return {
            editing: false,
            edited: false,
            person: null,
            loading: false,
            currLang: 'pt',
            shouldUpdateMain:  false
        }
    },

    async created() {
        let person;

        const editing = !((this.personData && this.personData.id?.includes('new')) || (this.personId === 'new'));
        const langs = this.$store.state.settings.languages;

        if (editing) {
            let savedPerson;

            if (this.personId) {
                savedPerson = await this.$store.dispatch(
                    'api/single',
                    [ 'people', this.personId ]
                );
            } else {
                savedPerson = this.personData
            }

            if (savedPerson)
                person = {
                    ...schema.contribSchema(),
                    ...savedPerson,
                    description: langs.length > 0
                        ? langs.reduce((total, lang) => ({
                                ...total,
                                [lang.abbr]: savedPerson.description?.[lang.abbr] ?? ''
                            }), {})
                        : (savedPerson.description ?? {})
                };
            else person = schema.contribSchema()

        } else person = schema.contribSchema();

        this.person = person;
        this.editing = editing;
        this.shouldUpdateMain = !this.inplace;
    },

    computed: {
        ...mapState({
            languages: state => state.settings.languages,
        }),
    },

    methods: {
        async handleForm() {
            this.loading = true;

            if (!this.person._id || this.shouldUpdateMain)
                this.saveOnMain();

            else {
                this.$emit('person-saved', { personData: this.person });

                setTimeout(() => {
                    this.$store.commit('set_notification', {
                        show: true,
                        title: 'Sucesso!',
                        description: 'Dados da Pessoa foram salvos no artigo!',
                        icon: 'success'
                    });

                    this.loading = false;
                }, 250)
            }
        },

        async saveOnMain() {
            const action = this.editing ? 'api/update' : 'api/add';
            const { id, ...person } = this.person;

            if (!this.person.name || !this.person.lastName) {
                this.$store.commit('set_notification', {
                    show: true,
                    title: 'Erro!',
                    description: 'Dados de Nome e Sobrenome são obrigatórios, favor preencher e salvar novamente.',
                    icon: 'error'
                });

                this.loading = false;
                return;
            }

            const success = await this.$store.dispatch(action, [ 'people', person ]);

            this.loading = false;

            if (success) {
                this.$store.commit('set_notification', {
                    show: true,
                    title: 'Sucesso!',
                    description: 'Dados da Pessoa foram salvos!',
                    icon: 'success'
                });

                this.edited = true;

                if (!this.editing && !this.inplace) {
                    this.$router.replace(
                        { path: `/people`, query: { person: success._id}}
                    )
                } else {
                    const people = await this.$store.dispatch('api/list', [
                        'people'
                    ]);

                    if (people && people.length)
                        this.$store.commit('people/set_people', people);

                    this.$emit('person-saved', {
                        personData: {
                            ...this.person,
                            _id: success._id
                        }
                    });
                }

            } else {
                this.$store.commit('set_notification', {
                    show: true,
                    title: 'Erro!',
                    description: 'Os dados da Pessoa não foram salvos!',
                    icon: 'error'
                })
            }
        },

        async close() {
            if (this.edited) {
                const people = await this.$store.dispatch('api/list', [
                    'people'
                ]);

                if (people && people.length)
                    this.$store.commit('people/set_people', people);
            }

            if (!this.inplace)
                this.$router.push({ path: '/people', query: {}});

            else
                this.$emit('close-modal');
        }
    },
}
</script>
