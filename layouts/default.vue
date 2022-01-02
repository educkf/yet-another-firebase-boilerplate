<template>
    <div class="h-screen bg-gray-50 flex overflow-hidden">
        <app-sidemenu />

        <!-- Content area -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <app-header />

            <!-- Main content -->
            <div id="main-view" class="flex-1 flex items-stretch overflow-hidden">
                <main class="flex-1 overflow-y-auto">
                    <section aria-labelledby="primary-heading" class="min-w-0  lg:order-last">
                        <nuxt />
                    </section>
                </main>
            </div>
        </div>

        <alert />
    </div>
</template>

<script>
import Alert from '../components/app/alert.vue';

export default {
	name: 'DefaultLayout',

    components: {
        Alert,
    },

	middleware: 'auth'
}
</script>

<style lang="postcss">
</style>
