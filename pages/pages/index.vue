<template>
    <div class="w-full">
        <PageHeader title="Páginas">
            <nuxt-link to="/pages/add" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-theme-default hover:bg-theme-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-dark">
                Adicionar página
            </nuxt-link>
        </PageHeader>
        <main>
            <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                    <static-single v-for="page in pages" :key="page._id" :page="page" />
                </ul>

                <list-empty v-if="!pages || (pages && pages.length === 0)" message="Nenhuma página encontrado." />
            </div>
        </main>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import listEmpty from '../../components/list/list-empty.vue';
import ListWrapper from '../../components/list/list-wrapper.vue';
import Icon from '../../components/app/app-icon.vue';
import StaticSingle from './-components/pages-single.vue';

export default {
    components: {
    listEmpty,
    ListWrapper,
    Icon,
    StaticSingle
},

    async asyncData({ store }) {
        await store.dispatch('pages/getPages');
    },

    computed: {
        ...mapState({
            pages: state => state.pages.list
        }),
    }
}
</script>
