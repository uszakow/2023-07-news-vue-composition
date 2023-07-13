<template>
  <div class="news-preview p-1 mb-2">
    <UiTypography
      classes="flex flex-justify-between flex-align-end"
      type="title"
    >
      <NuxtLink :to="`/news/${news.id}`" class="news-preview-title">
        {{ news.title }}
      </NuxtLink>

      <div v-if="user?.id === news.author.id" class="flex">
        <UiButton
          type="inline"
          label="Edytuj"
          @click-button="isEditNewsModalOpen = true"
        />
        <UiButton
          classes="ml-2"
          type="inline"
          label="Usuń"
          @click-button="isDeleteNewsModalOpen = true"
        />
      </div>
    </UiTypography>

    <div class="news-preview-content">
      <p v-for="(item, index) in content" :key="index + item">
        {{ item }}
      </p>
    </div>

    <NewsManageModal
      :is-open="isEditNewsModalOpen"
      modal-title="Edytowanie wiadomości"
      :news-title="updatedNewsTitle"
      :news-content="updatedNewsContent"
      :loading="loading"
      :error="error"
      @change-news-title="updatedNewsTitle = $event"
      @change-news-content="updatedNewsContent = $event"
      @manage-news="updateNews()"
      @close-modal="closeEditNewsModal()"
    />

    <UiModal
      title="Usuń wiadomość"
      :is-open="isDeleteNewsModalOpen"
      @close-modal="closeDeleteNewsModal()"
    >
      <UiTypography type="text">
        Potwierdź usunięcie tej wiadomości.
      </UiTypography>

      <UiButton
        classes="mt-2 m-auto"
        type="danger"
        label="Usuń wiadomość"
        :loading="loading"
        @click-button="deleteNews()"
      />

      <UiErrorMessage v-if="error" :message="error" />
    </UiModal>
  </div>
</template>

<script lang="ts" setup>
import { NewsInterface } from "interfaces/News.interface";
import { UpdateNewsDto } from "interfaces/UpdateNews.dto";

const props = defineProps({
  news: {
    type: Object as () => NewsInterface,
    required: true,
  },
});

const emit = defineEmits<{
  newsChange: [];
}>();

const { user, token } = useAppState();
const { updateNewsApi, deleteNewsApi } = useNewsApi();

const isEditNewsModalOpen = ref(false);
const isDeleteNewsModalOpen = ref(false);
const updatedNewsTitle = ref(props.news.title);
const updatedNewsContent = ref(props.news.content);

const loading = ref(false);
const error = ref<string | string[]>("");

const content = computed(() => props.news.content.split("\n"));

const updateNews = async (): Promise<void> => {
  const body: UpdateNewsDto = {
    title: updatedNewsTitle.value,
    content: updatedNewsContent.value,
  };

  try {
    loading.value = true;

    if (token.value) {
      await updateNewsApi(props.news.id, body, token.value);
    }

    emit("newsChange");

    isEditNewsModalOpen.value = false;
  } catch (err: any) {
    error.value = err.data?.message || "Nie udało się zaktualizować wiadomość.";
  } finally {
    loading.value = false;
  }
};

const deleteNews = async (): Promise<void> => {
  try {
    loading.value = true;

    if (token.value) {
      await deleteNewsApi(props.news.id, token.value);
    }

    emit("newsChange");

    isDeleteNewsModalOpen.value = false;
  } catch (err: any) {
    error.value = err.data?.message || "Nie udałos się usunąć wiadomość.";
  } finally {
    loading.value = false;
  }
};

const closeEditNewsModal = (): void => {
  error.value = "";
  updatedNewsTitle.value = props.news.title;
  updatedNewsContent.value = props.news.content;
  isEditNewsModalOpen.value = false;
};

const closeDeleteNewsModal = (): void => {
  error.value = "";
  isDeleteNewsModalOpen.value = false;
};
</script>

<style lang="scss" scoped>
@import "styles/components/newsList/NewsPreview";
</style>
