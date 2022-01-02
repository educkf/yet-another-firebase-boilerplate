<template>
    <div class="my-2">
        <draggable
            v-if="allowReorder && localList.length > 0"
            v-model="localList"
            handle=".handle"
            class="border border-gray-300 rounded-md shadow-sm mb-2"
        >
            <div v-for="(item, index) in value"
                :key="item.id + item._id"
                class="flex"
            >
                <button class="handle border-b border-gray-300 cursor-move px-1 text-gray-400 hover:text-gray-700">
                    <Icon name="selector" type="solid" className="w-5 h-5" />
                </button>
                <slot v-bind:data="{ item, index }"></slot>
            </div>
        </draggable>

        <template v-else>
            <div v-for="(item, index) in localList"
                :key="item.id + item._id"
            >
                <slot v-bind:data="{ item, index }"></slot>
            </div>
        </template>
    </div>

</template>

<script>
import draggable from 'vuedraggable';
import Icon from '../app/app-icon.vue';

export default {
    name: "ListWrapper",

    components: {
        draggable,
        Icon
    },

    props: {
        value: [Array, String],

        list: [Array, String],

        emptyLabel: {
            type: String,
            default: 'Nenhum item adicionado'
        },

        allowReorder: {
            type: Boolean,
            default: true
        }
    },

    data: function() {
        return {
            localList: []
        }
    },

    created() {
        this.localList = this.value || this.list;
    },

    watch: {
        localList: {
            handler() {
                if (this.value && !this.list)
                    this.$emit('input', this.localList);
            },
            deep: true
        },

        value: {
            handler() {
                if (this.value?.length !== this.localList.length) {
                    this.localList = this.value
                }
            },
            deep: true
        }
    }
};
</script>

<style></style>
