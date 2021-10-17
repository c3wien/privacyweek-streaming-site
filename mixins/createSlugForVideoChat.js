export default {
  computed: {
    videoChatURL() {
      if (!this.slug) return '';
      const videoChatSlug = this.slug
        .split('-')
        .filter((part) => part !== '')
        .slice(2)
        .join('-');
      return `${this.$config.videoChatBaseURL}${videoChatSlug}`;
    },
  }
}