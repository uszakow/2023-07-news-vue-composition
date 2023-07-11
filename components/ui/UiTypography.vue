<template>
  <h2 v-if="type === 'title'" :class="typographyClasses">
    <slot></slot>
  </h2>
  <span v-else-if="type === 'text'" :class="typographyClasses">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as () => "title" | "text",
    required: true,
  },
  classes: {
    type: String,
    default: "",
  },
});

const typographyClasses = `${props.type} ${props.classes}`;
</script>

<style lang="scss">
@import "styles/components/ui/UiTypography";
</style>
