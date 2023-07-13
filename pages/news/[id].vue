<template>
  <Head>
    <Title>{{ news?.title || "News app" }}</Title>
  </Head>

  <UiTypography type="title">
    {{ news?.title }}
  </UiTypography>

  <p v-for="(item, index) in content" :key="index + item" class="news-p">
    {{ item }}
  </p>

  <div className="mt-2">
    Autor: <span class="author">{{ news?.author.name }}</span>
  </div>
</template>

<script lang="ts" setup>
import { NewsInterface } from "interfaces/News.interface";

const { getNewsApi } = useNewsApi();

const { params } = useRoute();
const newsId = params?.id as string;
const { data: news } = await useAsyncData<NewsInterface>(() =>
  getNewsApi(newsId)
);

if (!news.value) {
  throw createError({ statusCode: 404 });
}

const content = computed(() => news.value?.content.split("\n"));
</script>

<style lang="scss" scoped>
@import "styles/pages/news/[id]";
</style>
