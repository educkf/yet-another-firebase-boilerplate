<template>
  	<form
        @drop="handleFileDrop( $event )"
        id="drop-form-instant"
        class="w-full relative flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 hover:border-theme-default border-dashed rounded-md"
    >
        <div class="space-y-1 text-center"
            :class="{'opacity-25': loading}"
        >
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="flex text-sm text-gray-600">
                <span class="relative bg-white rounded-md font-medium text-theme-default hover:text-theme-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-theme-light">
                    <span>Arraste o arquivo</span>
                </span>
                <span class="pl-1">para essa área</span>
            </div>
            <span class="text-xs text-gray-500">
                Apenas arquivos PDF
            </span>
        </div>

        <div v-if="loading"
            class="absolute inset-0 flex justify-center items-center bg-theme-light bg-opacity-40"
        >
            <loading />
        </div>
    </form>
</template>

<script>
	//import { mapState, mapGetters } from 'vuex';
    import { slugify } from '../../helpers/index.js'

	export default {
        props: {
            folder: String,
            filename: String
        },

		data: function() {
            return {
                dragAndDropCapable: false,
                files: [],
                loading: false
            }
        },

        mounted(){
            this.dragAndDropCapable = this.determineDragAndDropCapable();
            if( this.dragAndDropCapable ){
                this.bindEvents();
            }
        },

        watch: {
            async files() {
                if (this.files.length > 0) {
                    for(const file of this.files) {
                        this.loading = true;

                        const refMetadata = await this.$store.dispatch('files/upload', {
                            folder: this.folder,
                            filename: slugify(this.filename),
                            file
                        });

                        if (refMetadata?.fullPath) {
                            const metadata = {
                                name: refMetadata.name,
                                size: refMetadata.size,
                                fullpath: refMetadata.fullPath,
                                bucket: refMetadata.bucket
                            }
                            this.$emit('on-upload', metadata);

                            this.$store.commit('set_notification', {
                                show: true,
                                title: 'Sucesso!',
                                description: 'Arquivo enviado com sucesso!',
                                icon: 'success'
                            });

                        } else {
                            this.$store.commit('set_notification', {
                                show: true,
                                title: 'Erro!',
                                description: 'Houve erro para enviar o arquivo.',
                                icon: 'error'
                            })
                        }

                        this.loading = false;
                        this.files = [];
                    }
                }
            }
        },

        methods: {
            isCurrent   (target) {
                return this.$route.path.endsWith(target);
            },

            bindEvents (){
                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {

                    document.getElementById('drop-form-instant').addEventListener(evt, function(e){
                        e.preventDefault();
                        e.stopPropagation();
                    }.bind(this), false);
                }.bind(this));
            },

            handleFileDrop( event ){
                for (let i = 0; i < event.dataTransfer.files.length; i++ ){
                    this.files.push( event.dataTransfer.files[i] );
                }
            },

            determineDragAndDropCapable(){
                const div = document.createElement('div');
                return ( ( 'draggable' in div )
                    || ( 'ondragstart' in div && 'ondrop' in div ) )
                    && 'FormData' in window
                    && 'FileReader' in window;
            },
        }
	};
</script>

<style></style>
