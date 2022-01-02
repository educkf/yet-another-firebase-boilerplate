<template>
	<div>
		<nuxt />

        <alert />
	</div>
</template>

<script>
import Alert from '../components/app/alert.vue';

export default {
	name: 'ClearLayout',

    components: {
        Alert,
    },

	async created() {
		await this.$store.dispatch('user/checkAuth');
	},
}
</script>

<style lang="postcss"></style>
