export default {
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
    timing: true
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'threejs-mongte',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/reset.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://local.flit.to:12909'
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '~/modules/test.module',
    ['~/modules/test.module', { test: '2324'}],
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg'
  ],
  styleResources: {
    scss: []
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    ssr: true, //false -> middleware client 실행, true -> middleware [server, client] 실행,
    transpile: [
      'three'
    ],
  },
  serverMiddleware: [

  ],
  router: {
  }
}
