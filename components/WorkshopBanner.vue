<template>
  <div class="wrapper mb-2">
    <article class="message is-link">
      <div v-if="isWorkshopNow" class="message-body">
        <i18n path="workshopBanner.live" tag="div">
          <CommonLink href="#workshops">
            {{ currentWorkshopTitle }}
          </CommonLink>
        </i18n>
      </div>
      <div v-else-if="isAWorkshopUpcoming" class="message-body">
        <i18n path="workshopBanner.upcoming" tag="div">
          <CommonLink href="#workshops">
            {{ upcomingWorkshopTitle }}
          </CommonLink>
        </i18n>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: {
    isWorkshopNow: {
      type: Boolean,
      required: true,
    },
    currentWorkshops: {
      type: Array,
      required: true,
    },
    isAWorkshopUpcoming: {
      type: Boolean,
      required: true,
    },
    workshopsThatStartSoon: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentWorkshopTitle() {
      return this.isWorkshopNow && this.currentWorkshops[0].title;
    },
    upcomingWorkshopTitle() {
      return this.isAWorkshopUpcoming && this.workshopsThatStartSoon[0].title;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~assets/scss/main.scss';

.message {
  background-color: #ffffff;
}
.message-body {
  padding: 0.75em 1.5em;
}

@include mobile {
  .wrapper {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
}
</style>
