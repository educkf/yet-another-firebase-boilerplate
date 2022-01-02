<template>
  <div></div>
</template>

<script>
	//import { mapState, mapGetters } from 'vuex';

	export default {
		name: "",
		layout: "default",
		components: {},
		filters: {},
		props: {},
		data: function() {
			return {};
		},
		async fetch () {},
		async asyncData () {},
		computed: {
			// ...mapState({
			//   item: state => state.namespace.item
			// }),
			// ...mapGetters({
			//   item: "namespace/item"
			// })
		},
		watch: {},
		async created() {},
		async mounted() {},
		methods: {},
		head () {
			return {
				title: 'Page title',
				meta: [
					{
						hid: 'description',
						name: 'description',
						content: 'My custom description'
					}
				]
			}
		}
	};
</script>

<style></style>
