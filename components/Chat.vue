<template>
  <section class="box wrapper">
    <iframe
      v-if="hasConsentedToChat"
      src="https://web.libera.chat/?nick=Guest#privacyweek21"
      class="iframe"
    ></iframe>
    <div v-else-if="isConsentAreaOpen">
      Text about consenting to chat goes here.

      <button class="button is-rounded" @click="consentToChat">
        {{ $t('chat.startChatting') }}
      </button>
    </div>
    <div v-else>
      <button class="button is-rounded" @click="$emit('expand-chat')">
        Chat
      </button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isConsentAreaOpen: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      hasConsentedToChat: false,
    };
  },
  methods: {
    consentToChat() {
      this.hasConsentedToChat = true;
      this.$emit('shrink-chat');
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