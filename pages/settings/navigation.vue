<template>
    <form @submit.prevent="save()">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Navegação</h3>
                    <p class="mt-1 text-sm text-gray-500">Controle do que aparece no menu do site, e em qual ordem.</p>
                </div>

                <div class="w-full">
                    <tab-language v-model="currLang" class="w-full">
                        <list-wrapper v-model="localMenu" class="col-span-6">
                            <template v-slot="slotProps">
                                <menu-item v-model="slotProps.data.item" :currLang="currLang" @exclude="exclude" />
                            </template>
                        </list-wrapper>
                    </tab-language>

                    <button @click.prevent="addItem()" type="button"
                        class="bg-theme-default border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-theme-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light "
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 flex flex-row-reverse justify-between sm:px-6">
                <button :disable="loading" type="submit" class="bg-theme-default border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-theme-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light">
                    <span v-if="!loading">Salvar</span>
                    <loading v-else />
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import MenuItem from './-components/menuItem.vue';

export default {
    components: {
        MenuItem
    },

    async asyncData({ store }) {
        await store.dispatch('pages/getPages');
    },

    data() {
        return {
            localMenu: [],
            loading: false,
            currLang: 'pt',
        }
    },

    created() {
        this.localMenu = this.$store.state.settings.menu.planify();
    },

    methods: {
        addItem() {
            this.localMenu = [
                ...this.localMenu,
                {
                    _id: (Math.random() + 1).toString(36).substring(4),
                    icon: '',
                    label: this.$store.state.settings.languages.reduce((total, lang) => (
                        { ...total, [lang]: '' }
                    ), {})
                }
            ]
        },

        async save () {
            this.loading = true;

            const data = {
                _id: 'menu',
                menu: this.localMenu.planify()
            };

            await this.$parent.handleSave(data, this.cancel);
        },

        cancel () {
            this.editing = false;
            this.loading = false;
        },

        async exclude (itemId) {
            this.localMenu = this.localMenu.filter(item => item._id !== itemId)
        },
    }
}
</script>
