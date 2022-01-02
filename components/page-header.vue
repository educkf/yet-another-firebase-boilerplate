<template>
  	<div class="bg-white shadow top-0 z-10"
        :class="sticky ? 'sticky' : 'relative'"
    >
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between">
                <div class="flex-1 min-w-0">
                    <!-- Profile -->
                    <div class="flex items-center">
                        <div>
                            <div class="flex items-center">
                                <div class="flex-1 min-w-0">
                                    <nav v-if="breadcrumb" class="flex" aria-label="Breadcrumb">
                                        <ol role="list" class="flex items-center space-x-4">
                                            <li v-for="(item, index) in breadcrumb" :key="item.url">
                                                <div class="flex items-center">
                                                    <Icon v-if="index > 0"  name="right" type="solid" className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                    <nuxt-link :to="item.url" class="text-sm font-medium text-theme-default hover:text-theme-dark" :class="index > 0 ? 'ml-4' : ''">
                                                        {{ item.label }}
                                                    </nuxt-link>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>

                                    <h1 class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                        {{ title }}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from './app/app-icon.vue';

	export default {
        name: "PageHeader",

        components: {
            Icon
        },

		props: {
			title: {
                type: String
            },

            breadcrumb: {
                type: Array
            },

            sticky: {
                type: Boolean,
                default: true
            }
		},
	};
</script>

<style></style>
