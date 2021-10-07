<template>
  <section class="box wrapper">
    <iframe
      v-if="hasConsentedToChat"
      src="https://web.libera.chat/?nick=Guest#privacyweek21"
      class="iframe"
    ></iframe>
    <div v-else>
      <h3 class="title is-4">{{ $t('chat.title') }}</h3>
      <div class="content">
        <p>{{ $t('chat.intro') }}</p>
        <ul class="content">
          <li>{{ $t('chat.public') }}</li>
          <i18n path="chat.privacyPolicyText" tag="li">
            <a href="">{{ $t('chat.privacyPolicy') }}</a>
          </i18n>
          <i18n path="chat.rulesText" tag="li">
            <a href="">{{ $t('chat.rules') }}</a>
          </i18n>
          <i18n path="chat.faqText" tag="li">
            <a href="">{{ $t('chat.faq') }}</a>
          </i18n>
        </ul>
      </div>
      <button class="button is-dark is-rounded" @click="consentToChat()">
        {{ $t('chat.accept') }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      hasConsentedToChat: false,
    };
  },
  methods: {
    consentToChat() {
      this.hasConsentedToChat = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

@import '~assets/scss/main.scss';

.iframe {
  border: 1px solid $color-lightgrey;
  width: 100%;
  /* Default by libera.chat for the widget */
  height: 450px;
}

@include widescreen {
  .wrapper {
    height: 100%;
  }

  .iframe {
    height: 100%;
  }
}
</style>