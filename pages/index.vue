<template>
  <Head>
    <Title>Wiadomości</Title>
  </Head>

  <NewsPreview v-for="item of news" :key="item.id" :news="item" />

  <NewsAdd v-if="user" @news-change="getNewsList()" />
</template>

<script lang="ts" setup>
import { NewsInterface } from "interfaces/News.interface";

const { user, setIsLoading } = useAppState();
const { getNewsListApi } = useNewsApi();

const news = ref<NewsInterface[]>([]);

const getNewsList = async (): Promise<void> => {
  try {
    setIsLoading(true);
    const { data } = await useAsyncData<NewsInterface[]>(() =>
      getNewsListApi()
    );

    if (data.value) {
      news.value = [...data.value];
    }
  } catch (err: any) {
    console.error(`ERROR:${err}`);
  } finally {
    setIsLoading(false);
  }
};
await getNewsList();
</script>
