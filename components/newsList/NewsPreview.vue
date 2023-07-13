<template>
  <div class="news-preview p-1 mb-2">
    {{ news.title }}
  </div>
</template>

<script lang="ts" setup>
import { NewsInterface } from "interfaces/News.interface";

defineProps({
  news: {
    type: Object as () => NewsInterface,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "styles/components/newsList/NewsPreview";
</style>
