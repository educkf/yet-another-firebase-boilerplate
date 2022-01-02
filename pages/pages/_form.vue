<template>
    <div class="w-full bg-gray-50 pb-20">
        <PageHeader :title="`${editing ? 'Editar' : 'Adicionar'} Página`" :breadcrumb="breadcrumb" :sticky="false" />

        <main class="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">

            <form @submit.prevent="handleForm()" class="">
                <div v-if="page" class="shadow border border-gray-300 bg-white sm:rounded-md sm:overflow-hidden mt-8 space-y-3 divide-y divide-gray-200">
                    <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                        <div>
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Dados da página</h3>
                        </div>

                        <tab-language v-model="currLang" :useLanguages="languages">
                            <div v-if="page.data[currLang]" class="col-span-6 mt-4">
                                <label for="page-data.title" class="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input v-model="page.data[currLang].title" type="text" name="issue-title" id="issue-title" autocomplete="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm">

                                <label for="page-data.title" class="block text-sm font-medium text-gray-700 mt-5">
                                    URL da página
                                </label>
                                <input disabled v-model="page.data[currLang].slug" type="text" name="issue-title" id="issue-title" autocomplete="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-theme-light focus:border-theme-light sm:text-sm bg-gray-100">

                                <div class="mt-5">
                                    <label for="page-data.title" class="block text-sm font-medium text-gray-700 mt-5 mb-3">
                                        Conteúdo
                                    </label>
                                    <tinymce id="d1"
                                        v-model="page.data[currLang].content"
                                        :other_options="other_options"
                                        @editorInit="editorInit"
                                        :toolbar1="'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | image'"
                                        :plugins="['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality','template paste textcolor colorpicker textpattern imagetools toc help emoticons hr codesample']"
                                        class="rounded shadow"
                                        ref="tm"
                                    >
                                    </tinymce>
                                </div>
                            </div>
                        </tab-language>
                    </div>
                </div>

                <div class="pt-5">
                    <div class="flex justify-between">
                        <nuxt-link to="/pages" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light">
                            Voltar sem salvar
                        </nuxt-link>
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
    </div>
</template>

<script>
import { mapState } from 'vuex';

import schema from '../../helpers/schema';
import { slugify } from '../../helpers/index.js'

import TextArea from '../../components/input/text-area.vue';

export default {
    name: "PageForm",

    components: {
        TextArea,
        tinymce: () => process.client
			? import('vue-tinymce-editor')
			: Promise.resolve({ render: h => h('div') }),
    },

    async asyncData({ params, store }) {
        let page;
        const editing = params.form !== 'add';

        const langs = store.state.settings.languages;

        if (params.form !== 'add') {
            const savedPage = await store.dispatch(
                'api/single',
                [ 'contents', params.form ]
            );

            if (savedPage) page = schema.apply('page', langs, savedPage);
            else page = schema.apply('page', langs)

        } else page = schema.apply('page', langs);

        return {
            editing,
            page,
            loading: false,
            currLang: 'pt'
        }
    },

    data() {
        return {
            other_options: {
                menubar: false,
                plugins: 'autoresize',
                autoresize_bottom_margin: 50,
                toolbar_sticky: true
            },
        }
    },

    computed: {
        ...mapState({
            languages: state => state.settings.languages,
        }),

        breadcrumb() {
            return [
                {
                    label: 'Páginas',
                    url: '/pages'
                },
                {
                    label: this.editing ? 'Editar página' : 'Adicionar página',
                    url: '/pages/' + this.$route.params.form
                }
            ]
        }
    },

    watch: {
        'page.data': {
            handler() {
                Object.entries(this.page.data)
                    .forEach(([ key, value ]) => {
                        this.page.data[key].slug = slugify(this.page.data?.[key]?.title ?? '')
                    })
            },
            deep: true
        }
    },

    methods: {
        async handleForm() {
            this.loading = true;

            const action = this.editing ? 'api/update' : 'api/add';
            const success = await this.$store.dispatch(action, [ 'contents', {
                ...this.page,
                slugs: Object.values(this.page.data)
                    .map(item => item.slug)
            }]);

            setTimeout(async () => {
                this.loading = false;

                if (success) {
                    this.$store.commit('set_notification', {
                        show: true,
                        title: 'Sucesso!',
                        description: 'Dados da Página foram salvos!',
                        icon: 'success'
                    });

                    if (!this.editing) {
                        this.$router.replace(`/pages/${success._id}`)
                    }

                } else {
                    this.$store.commit('set_notification', {
                        show: true,
                        title: 'Erro!',
                        description: 'Os dados da Página não foram salvos!',
                        icon: 'error'
                    })
                }
            }, 1000)
        },

        editorInit() {
            this.$refs.tm.editor.setContent(this.page.data?.[this.currLang]?.content ?? '');
        },
    }
}
</script>
