<template>
  	<div class="[ contributor-item ] w-full grid grid-cols-12 border-b last:border-0 border-gray-300">
        <select v-model="contributorData" class="input border-l"
            :class="contributor._id ? 'col-span-7' : 'col-span-8'"
        >
            <optgroup>
                <option value="">Selecione uma opção</option>
            </optgroup>
            <optgroup>
                <option value="new">Adicionar nova pessoa</option>
            </optgroup>
            <optgroup>
                <option v-for="single in people" :key="single._id" :value="single._id">
                    {{ single.lastName }}, {{ single.name }}
                </option>
            </optgroup>
        </select>

        <select v-model="contributor.role" name="role" class="input col-span-3" placeholder="Papel">
            <option value="">Selecione uma opção</option>
            <option value="editor">Editor/a</option>
            <option value="author">Autoria</option>
            <option value="revisor">Revisão</option>
            <option value="translator">Tradução</option>
            <option value="designer">Design</option>
        </select>

        <div v-if="contributor._id">
            <button @click.prevent="handleEditContributor(true)" type="button" class="w-full h-full flex justify-center items-center bg-white hover:bg-theme-light border-r">
                <Icon name="edit" type="solid" className="w-5 h-5 text-theme-default hover:text-theme-dark" />
            </button>
        </div>

        <div>
            <button @click.prevent="removeContributor()" type="button" class="w-full h-full flex justify-center items-center bg-white hover:bg-red-200">
                <Icon name="trash" type="solid" className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
        </div>

        <contributor-modal
            v-if="editContributor"
            :inplace="true"
            :personData="contributor"
            @person-saved="applyPerson"
            @close-modal="handleEditContributor(false)"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from '../app/app-icon.vue';
import ContributorModal from './contributor-modal.vue';

export default {
    name: "Contributor-Item",

    components: { Icon, ContributorModal },

    props: {
        value: Object
    },

    data: function() {
        return {
            focus: null,
            editContributor: false,

            contributor: {
                _id: null,
                role: null
            }
        }
    },

    created() {
        this.contributor = this.value;
    },

    watch: {
        contributor: {
            handler() {
                const { id, ...contributor } = this.contributor;

                if (id?.includes('new') ?? false) {
                    this.editContributor = true;
                }

                if (contributor._id) {
                    this.$emit('input', contributor);
                }

                else {
                    this.$emit('input', { id, ...contributor });
                }
            },
            deep: true
        }
    },

    computed: {
        ...mapState({
            people: state => [...state.people.list].sort((a, b) => a.lastName.localeCompare(b.lastName)),
        }),

        contributorData: {
            get() {
                return this.contributor._id
            },

            set(value) {
                const contributor = this.people.find(item => item._id === value);

                if (contributor)
                    this.contributor = contributor;

                else
                    this.contributor = {
                        ...this.contributor,
                        id: this.contributor.id + value
                    }
            }
        }
    },

    methods: {
        removeContributor() {
            const sure = confirm("Deseja mesmo esse membro?");
            if (sure) {
                this.$emit('remove-contributor');
            };
        },

        handleEditContributor(value) {
            this.editContributor = value;
        },

        applyPerson({ personId, personData }) {
            if (personId) {
                this.contributor._id = personId;
            }
            if (personData) {
                this.contributor = personData
            }
        }
    }
};
</script>

<style lang="postcss" scoped>

.contributor-item {
    & >>> .input {
        border-color: transparent;
        border-right: 1px solid rgba(229, 231, 235, var(--tw-border-opacity));

        @apply bg-transparent block w-full py-2 px-3  sm:text-sm
            focus:outline-none focus:ring-theme-light focus:border-theme-light;
    }

    & >>> .input:focus {
        @apply z-10 border-r;
    }

    & >>> #autosuggest {
        position: relative;

        .autosuggest__results-container {
            @apply absolute top-8 inset-x-0 z-20 bg-gray-50 shadow-md text-sm;

            li {
                @apply border-2 border-gray-50 p-2 cursor-pointer;
            }

            li:hover {
                @apply text-theme-dark border-theme-light;
            }
        }
    }
}


.input:last-child {
    @apply border-r-0;
}

</style>
