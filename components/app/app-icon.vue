<template>
    <component
        v-bind:is="iconsRef[name]"
        :attr="attr"
    />
</template>

<script>
    import Icons, { iconsRef } from "./icons";

    export default {
        name: "Icon",

        components: {
            ...Icons
        },

        props: {
            name: {
                type: String,
                required: true,
                default: 'home'
            },
            type: {
                type: String,
                default: 'outline'
            },
            className: {
                type: String,
                default: 'outline'
            },
        },

        computed: {
            iconsRef() {
                return iconsRef;
            },

            attr() {
                return {
                    name: this.name,
                    type: this.type,
                    className: this.className
                }
            }
        }
    };
</script>

<style></style>
