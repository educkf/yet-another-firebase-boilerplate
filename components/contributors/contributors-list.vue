<template>
    <div class="my-2">
        <list-wrapper v-model="localContributors">
            <template v-slot="slotProps">
                <contributor-item
                    :defaultRole="defaultRole"
                    v-model="localContributors[slotProps.data.index]"
                    @remove-contributor="removeContributor(slotProps.data.index)"
                />
            </template>
        </list-wrapper>

        <button @click.prevent="addContributor()" type="button"
            class="bg-theme-default border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-theme-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light "
        >
            Adicionar
        </button>
    </div>

</template>

<script>
import ContributorItem from './contributor-item.vue';

export default {
    name: "Contributors",

    components: {
        ContributorItem
    },

    props: {
        value: Array,
        defaultRole: String
    },

    data: function() {
        return {
            localContributors: []
        }
    },

    created() {
        this.localContributors = this.value;
    },

    watch: {
        localContributors: {
            handler() {
                this.$emit('input', this.localContributors);
            },
            deep: true
        }
    },

    methods: {
        addContributor() {
            this.localContributors.push({
                id: (Math.random() + 1).toString(36).substring(4),
                role: this.defaultRole ?? 'editor'
            })
        },

        removeContributor(itemIndex) {
            this.localContributors = this.localContributors.filter(
                (_, index) => itemIndex !== index
            );
        }
    }
};
</script>

<style></style>
