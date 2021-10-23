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
  publicRuntimeConfig: {
    // location of the schedule.json from Pretalx
    scheduleLocation: process.env.SCHEDULE_LOCATION || '/schedule.json',
    // location of video/voice chat server where discussions and workshops take place
    videoChatBaseURL: 'https://workshops.privacyweek.at/b/',
    // location of chat client that will be embedded
    chatClientURL: process.env.CHAT_CLIENT_URL || 'https://chat.privacyweek.wien/',
    // room name under which talks are listed in schedule.json
    talksRoomNameInPretalx: process.env.TALKS_ROOM_NAME_IN_PRETALX || 'Stream',
    // room name under which workshops are listed in schedule.json
    workshopsRoomNameInPretalx:
      process.env.WORKSHOPS_ROOM_NAME_IN_PRETALX || 'Workshop',
    // are you mocking date and time? set this to true and change the
    // time and date to your needed values in CurrentlyPlaying.vue
    isDateTimeMocked: process.env.IS_DATE_TIME_MOCKED || false,
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
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'de', name: 'Deutsch', iso: 'de-AT' },
      { code: 'en', name: 'English', iso: 'en-US' },
    ],
    defaultLocale: 'de',
    vueI18n: {
      fallbackLocale: 'de',
      messages: {
        en,
        de,
      },
    },
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
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
