<template>
    <div v-if="menuItem" class="w-full grid grid-cols-12 border-b border-gray-300 py-1">
        <div class="col-span-6">
            <input v-model="menuItem.label[currLang]" type="text" autocomplete="off" class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-theme-light focus:border-theme-default sm:text-sm border-gray-300 border-r-0">
        </div>
        <div class="col-span-5">
            <input v-model="menuItem.path" type="text" autocomplete="off" class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-theme-light focus:border-theme-default sm:text-sm border-gray-300">
        </div>
        <div>
            <button @click.prevent="$emit('exclude', menuItem._id)"
                type="button" class="w-full h-full flex justify-center items-center bg-white hover:bg-red-200"
            >
                <Icon name="trash" type="solid" className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Icon from '../../../components/app/app-icon.vue';

    export default {
        components: {
            Icon
        },

        props: {
            value: Object,
            currLang: String
        },

        computed: {
            ...mapState({
                pages: state => state.pages.list
            }),
        },

        data() {
            return {
                menuItem: null
            }
        },

        created() {
            this.menuItem = this.value;
        },

        watch: {
            menuItem() {
                this.$emit('input', this.menuItem)
            }
        }
    }
</script>
