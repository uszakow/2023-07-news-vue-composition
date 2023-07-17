<template>
  <div :class="['error-message', classes, 'text-center']">
    {{ formattedMessage }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  message: {
    type: [String, Array],
    required: true,
  },
  classes: {
    type: String,
    default: "",
  },
});

const formattedMessage = computed(() => {
  if (Array.isArray(props.message)) {
    return props.message.join(" ");
  }
  return props.message;
});
</script>

<style lang="scss" scoped>
@import "styles/components/ui/UiErrorMessage";
</style>
