<template>
  <div>
    <h3 class="title is-4">{{ $t('chat.title') }}</h3>
    <div class="content">
      <p>{{ $t('chat.intro') }}</p>
      <ul class="content">
        <li>{{ $t('chat.public') }}</li>
        <i18n path="chat.privacyPolicyText" tag="li">
          <CommonLink href="https://privacyweek.at/datenschutz/"
            >{{ $t('chat.privacyPolicy') }}
          </CommonLink>
        </i18n>
        <i18n path="chat.rulesText" tag="li">
          <CommonLink
            href="https://projekte.c3w.at/pw21online_public_nutzungsbedingungen"
            >{{ $t('chat.rules') }}
          </CommonLink>
        </i18n>
        <i18n path="chat.faqText" tag="li">
          <CommonLink :href="chatFAQLink">{{
            $t('chat.faq')
          }}</CommonLink>
        </i18n>
      </ul>
    </div>
    <button
      class="button is-dark is-rounded is-blue"
      @click="$emit('consent-to-chat')"
    >
      {{ $t('chat.accept') }}
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    chatFAQLink() {
      const locale = this.$i18n.locale;
      return locale === 'en'
        ? 'https://projekte.c3w.at/pw21online_faq_chat_eng'
        : 'https://projekte.c3w.at/pw21online_faq_chat';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.is-blue {
  background-color: $color-darkblue;
  font-weight: bold;
  transition: background-color 0.3s linear;
}
.is-blue:hover,
.is-blue:focus,
.is-blue:active {
  background-color: $color-blue;
}
</style>
