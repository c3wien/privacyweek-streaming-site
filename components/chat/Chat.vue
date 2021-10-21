<template>
  <section :class="wrapperClasses">
    <div
      :class="
        hasConsentedToChat && !isChatClosed ? 'toggleChat mb-2' : 'toggleChat'
      "
    >
      <button
        v-if="isChatClosed"
        class="button is-rounded is-small"
        @click="showChat"
      >
        {{ $t('chat.openChat')}}
      </button>
      <button v-else class="button is-rounded is-small" @click="hideChat">
        {{ $t('chat.closeChat')}}
      </button>
    </div>

    <div v-if="!isChatClosed" class="chatOrConsent">
      <kiwi-chat v-if="hasConsentedToChat" />
      <ChatConsent v-else @consent-to-chat="consentToChat()" />
    </div>
  </section>
</template>

<script>
import KiwiChat from './KiwiChat.vue';
export default {
  components: { KiwiChat },
  data() {
    return {
      hasConsentedToChat: false,
      isChatClosed: false,
    };
  },
  computed: {
    wrapperClasses() {
      let className = 'chatWrapper box';
      if (this.isChatClosed) {
        className += ' chatIsClosed';
      } else if (this.hasConsentedToChat) {
        className += ' fullHeight';
      }
      return className;
    },
  },
  methods: {
    consentToChat() {
      this.hasConsentedToChat = true;
    },
    showChat() {
      this.isChatClosed = false;
    },
    hideChat() {
      this.isChatClosed = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.chatWrapper:not(.chatIsClosed) {
  display: flex;
  flex-direction: column;
}

.toggleChat {
  display: flex;
  justify-content: flex-end;
}

.chatIsClosed .toggleChat {
  justify-content: flex-start;
}

.chatOrConsent {
  flex-grow: 1;
}

@include widescreen {
  .fullHeight {
    height: 100%;
  }
}
</style>