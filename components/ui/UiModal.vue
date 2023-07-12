<template>
  <div v-if="isOpen" class="modal flex-center">
    <div class="modal-curtain" @click="$emit('closeModal')"></div>
    <div class="modal-overlap">
      <div :class="['modal-wrap', classes, 'relative p-2']">
        <div class="modal-title flex flex-justify-between pb-1 mb-2">
          <h2 class="modal-title-text">{{ title }}</h2>
          <button
            class="modal-title-button relative ml-2"
            @click="$emit('closeModal')"
          ></button>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  classes: {
    type: String,
    default: "",
  },
});

defineEmits(["closeModal"]);
</script>

<style lang="scss" scoped>
@import "styles/components/ui/UiModal";
</style>
