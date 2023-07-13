<template>
  <UiModal
    classes="news-modal"
    :title="modalTitle"
    :is-open="isOpen"
    @close-modal="$emit('closeModal')"
  >
    <UiInput
      :value="newsTitle"
      label="Tytuł wiadomości"
      placeholder="Wpisz tytuł wiadomości"
      :required="true"
      @value-change="$emit('changeNewsTitle', $event)"
    />

    <UiInput
      type="textarea"
      :value="newsContent"
      label="Treść wiadomości"
      placeholder="Wpisz treść wiadomości"
      :required="true"
      @value-change="$emit('changeNewsContent', $event)"
    />

    <UiButton
      classes="mt-2 m-auto"
      label="Opublikuj"
      :loading="loading"
      @click-button="$emit('manageNews')"
    />

    <UiErrorMessage v-if="error" :message="error" />
  </UiModal>
</template>

<script lang="ts" setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  modalTitle: {
    type: String,
    required: true,
  },
  newsTitle: {
    type: String,
    required: true,
  },
  newsContent: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: [String, Array],
    required: true,
  },
});

defineEmits<{
  changeNewsTitle: [newsTitle: string];
  changeNewsContent: [newsContent: string];
  manageNews: [];
  closeModal: [];
}>();
</script>

<style lang="scss" scoped>
@import "styles/components/newsList/NewsManageModal";
</style>
