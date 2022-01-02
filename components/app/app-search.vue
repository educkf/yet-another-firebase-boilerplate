<template>
  	<div class="[ search-box ] flex-1 flex">
        <form class="w-full flex md:ml-0" action="#" method="GET">
            <label for="search-field" class="sr-only">Search all files</label>
            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="pointer-events-none absolute z-10 inset-y-0 left-0 flex items-center">
                    <Icon name="search" type="solid" className="flex-shrink-0 h-5 w-5" />
                </div>

                <auto-suggest
                    v-model="terms"
                    class="h-full"
                    :input-props="{id:'autosuggest__search', class: 'input-search', placeholder:'Busca'}"
                    :suggestions="suggestions"
                    @input="handleSearch"
                    @selected="selectHandler"
                    @blur="clearSuggestions()"
                >
                    <template slot-scope="{suggestion}">
                        <div class="w-full">
                            <div class="font-bold" v-html="suggestion.item.title"></div>
                            <div class="italic mt-1 text-sm">{{suggestion.item.contributors}}</div>
                        </div>
                    </template>
                </auto-suggest>
            </div>
        </form>
    </div>
</template>

<script>
import debounce from 'debounce';
import Icon from './app-icon.vue';
import { VueAutosuggest } from 'vue-autosuggest';

export default {
    name: "AppSearch",

    components: {
        Icon,
        AutoSuggest: VueAutosuggest
    },

    data: function() {
        return {
            show: false,
            terms: '',
            options: [],
        };
    },

    computed: {
        suggestions() {
            return [
                {
                    data: this.options
                        .filter(item => item.data?.primary)
                        .map(item => ({
                            _id: item._id,
                            title: item.data.primary?.title,
                            contributors: item.contributors.reduce(
                                (total, item, index) => {
                                    return index === 0
                                        ? item.name + ' ' + item.lastName
                                        : total + ' ,' + item.name + ' ' + item.lastName
                                }, ''
                            )
                        }))
                }
            ]
        }
    },

    methods: {
        handleSearch: debounce(async function(text) {
            if (text.length > 3) {
                const data = await this.$contents(text);

                if (Array.isArray(data)) {
                    this.options = data;
                }
            }
        }, 300),

        selectHandler(value) {
            this.$router.push('/articles/' + value.item._id);
            this.clearSuggestions();
            this.terms = '';
        },

        clearSuggestions() {
            setTimeout(() => {
                this.options = [];
            }, 200)
        },
    }
};
</script>

<style lang="postcss" scoped>

.search-box {
    & >>> .input-search {

        @apply h-full w-full border-transparent py-2 pl-8 pr-3 text-base
            text-gray-900 placeholder-gray-500
    }

    & >>> .input-search:focus {
        @apply outline-none ring-0 border-transparent placeholder-gray-400
    }

    & >>> #autosuggest {
        position: relative;

        & > div[role=combobox] {
            @apply h-full;
        }

        .autosuggest__results-container {
            @apply absolute top-16 inset-x-0 z-20 bg-gray-50 shadow-md text-sm;

            li {
                @apply border-2 border-gray-50 p-2 cursor-pointer;
            }

            li:hover {
                @apply text-theme-dark border-theme-light;
            }
        }
    }
}

</style>
