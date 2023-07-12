<template>
  <button
    :class="['button', type, 'flex-center', classes]"
    :disabled="disabled || loading"
    @click="$emit('clickButton')"
  >
    <div v-if="type === 'adding'" class="plus relative mr-1"></div>

    <NuxtIcon v-if="loading" class="loader" name="loader" />
    <template v-else>
      {{ label }}
    </template>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String as () =>
      | "primary"
      | "secondary"
      | "danger"
      | "inline"
      | "adding",
    default: "primary",
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "",
  },
});

defineEmits(["clickButton"]);
</script>

<style lang="scss" scoped>
@import "styles/components/ui/UiButton";
</style>
