export default {
    ssr: false,
    target: 'static',

    head: {
        title: 'AdminBoilerplate',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }
        ]
    },

    css: [],

    plugins: [
        { src: "~/plugins/v-click-outside", ssr: "false" },
        { src: "~/plugins/dayjs", ssr: "false" },
        { src: "~/plugins/planify" },
        { src: "~/plugins/debounce" },
        // { src: "~/plugins/algolia" },
        { src: "~/plugins/nuxt-client-init.client.js" },
    ],

    components: true,

    buildModules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
    ],

    env: {
		apiKey: process.env.API_KEY,
		authDomain: process.env.AUTH_DOMAIN,
		projectId: process.env.PROJECT_ID,
		storageBucket: process.env.STORAGE_BUCKET,
		messagingSenderId: process.env.MESSAGING_SENDER_ID,
		appId: process.env.APP_ID
	},

    modules: [
        '@nuxtjs/dotenv',
        '@nuxt/image',
    ],

    image: {
        // Options
    },

    build: {
        extend(config, ctx) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common';
        },
		babel: {
      		plugins: [
				"@babel/plugin-proposal-optional-chaining",
    			"@babel/plugin-proposal-nullish-coalescing-operator",
				[
					'@babel/plugin-proposal-private-methods', { loose: true }
				]
			]
        },

        postcss: {
			plugins: {
				'postcss-nested': {},
			},
		}
	},

	purgeCSS: {
		whitelist: [
            'multiselect',
            /^mceu/,
			/^ps/,
		],
		whitelistPatternsChildren: [/multiselectt$/,]
	}
}
