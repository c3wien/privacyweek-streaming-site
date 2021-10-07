<template>
  <section :class="wrapperClasses">
    <kiwi-chat v-if="hasConsentedToChat" />
    <ChatConsent v-else @consent-to-chat="consentToChat()" />
  </section>
</template>

<script>
import KiwiChat from './KiwiChat.vue';
export default {
  components: { KiwiChat },
  data() {
    return {
      hasConsentedToChat: false,
    };
  },
  computed: {
    wrapperClasses() {
      const className = this.hasConsentedToChat
        ? 'box fullHeight'
        : 'box';
      return className;
    }
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

@include widescreen {
  .fullHeight {
    height: 100%;
  }
}
</style>