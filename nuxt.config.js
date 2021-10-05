import de from './locales/de';
import en from './locales/en';

export default {
  privateRuntimeConfig: {
    EventName: 'PrivacyWeek 2020 TestEvent',
    EventLiveStreamTitle: 'Live Stream',
    EventShort: 'pw20',
    EventHashtag: '#pw20',
    StreamHlsURL: '/demo/stream/demo-2018.m3u8',
    //    StreamHlsURL: '/hls/stream1.m3u8'
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['bulma'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
    ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'de', name: 'Deutsch' },
    ],
    defaultLocale: 'de',
    vueI18n: {
      fallbackLocale: 'de',
      messages: {
        en: en,
        de: de,
      },
    },
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: false
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
};
