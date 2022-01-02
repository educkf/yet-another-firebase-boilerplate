<template>
    <div>
        <div class="block mt-4">
            <div class="mb-2">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                    <button v-for="lang in languages" :key="lang.abbr"
                        @click.prevent="currLang = lang.abbr"
                        :class="currLang === lang.abbr ? `border-theme-light text-theme-default` : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`"
                        class="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm"
                    >
                        {{ lang.label }}
                    </button>
                    <slot name="customButton"></slot>
                </nav>
            </div>
        </div>

        <div class="grid grid-cols-6 gap-6">
            <slot />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "tab-language",

    props: {
        value: String,
        useLanguages: Array
    },

    data: function() {
        return {
            currLang: 'pt'
        };
    },

    computed: {
        ...mapState({
            globalLanguages: state => state.settings.languages,
            settings: state => state.settings.settings,
        }),

        languages() {
            if (this.useLanguages) return this.useLanguages;
            return this.globalLanguages;
        }
    },

    async created() {
        this.currLang = this.value;
    },

    watch: {
        currLang() {
            this.$emit('input', this.currLang);
        }
    }
};
</script>

<style></style>
