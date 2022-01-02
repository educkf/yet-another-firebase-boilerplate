<template>
    <editor-content :editor="editor" class="input-text-titap" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
    components: {
        EditorContent,
    },

    props: {
        value: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            editor: null,
        }
    },

    watch: {
        value(value) {
            // HTML
            const isSame = this.editor.getHTML() === value

            // JSON
            // const isSame = this.editor.getJSON().toString() === value.toString()

            if (isSame) {
                return
            }

            this.editor.commands.setContent(value, false)
        },
    },

     mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
            ],
            content: this.value,
            onUpdate: () => {
                // HTML
                this.$emit('input', this.editor.getHTML())

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>

<style scoped lang="postcss">

    .input-text-titap >>> .ProseMirror {
        @apply mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm;
    }

    .input-text-titap >>> .ProseMirror.ProseMirror-focused {
        @apply outline-none ring-theme-light border-theme-light;
    }

</style>
