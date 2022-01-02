<template>
  	<div class="w-full flex flex-col items-center pt-20">
        <Icon name="empty" className="text-theme-default opacity-50" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import Icon from '../app/app-icon.vue';

	export default {
        components: {
            Icon
        },

        props: {
            message: String
        }
	};
</script>

<style></style>
