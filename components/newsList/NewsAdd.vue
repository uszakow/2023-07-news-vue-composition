<template>
  <UiButton
    classes="mt-2"
    type="adding"
    label="Dodaj nową wiadomość"
    @click-button="isModalOpen = true"
  />

  <NewsManageModal
    :is-open="isModalOpen"
    modal-title="Dodanie nowej wiadomości"
    :news-title="newsTitle"
    :news-content="newsContent"
    :loading="loading"
    :error="error"
    @change-news-title="newsTitle = $event"
    @change-news-content="newsContent = $event"
    @manage-news="createNews()"
    @close-modal="closeModal()"
  />
</template>

<script lang="ts" setup>
import { NewsDto } from "interfaces/News.dto";

const emit = defineEmits<{
  newsChange: [];
}>();

const { token } = useAppState();
const { createNewsApi } = useNewsApi();

const isModalOpen = ref(false);
const newsTitle = ref("");
const newsContent = ref("");
const loading = ref(false);
const error = ref<string | string[]>("");

const createNews = async (): Promise<void> => {
  const body: NewsDto = {
    title: newsTitle.value,
    content: newsTitle.value,
  };

  try {
    loading.value = true;

    if (token.value) {
      await createNewsApi(body, token.value);
    }

    emit("newsChange");

    newsTitle.value = "";
    newsContent.value = "";
    isModalOpen.value = false;
  } catch (err: any) {
    error.value = err.data?.message || "Nie udało się stworzyć wiadomość.";
  } finally {
    loading.value = false;
  }
};

const closeModal = (): void => {
  error.value = "";
  isModalOpen.value = false;
};
</script>
