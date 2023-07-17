<template>
  <Head>
    <Title>{{ news?.title || "News app" }}</Title>
  </Head>

  <AppError v-if="!news" />
  <template v-else>
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
</template>

<script lang="ts" setup>
import { NewsInterface } from "interfaces/News.interface";

const { setIsLoading } = useAppState();
const { getNewsApi } = useNewsApi();

const { params } = useRoute();
const newsId = params?.id as string;
const news = ref<NewsInterface>();

const content = computed(() => news.value?.content.split("\n"));

try {
  setIsLoading(true);
  const { data } = await useAsyncData<NewsInterface>(() => getNewsApi(newsId));

  if (data.value) {
    news.value = data.value;
  }
} catch (err: any) {
  console.error(`ERROR:${err}`);
} finally {
  setIsLoading(false);
}
</script>

<style lang="scss" scoped>
@import "styles/pages/news/[id]";
</style>
