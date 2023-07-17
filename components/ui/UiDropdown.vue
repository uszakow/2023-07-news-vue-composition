<template>
  <div
    class="dropdown relative"
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <slot name="title"></slot>

    <div :class="[!isOpen ? 'none' : '', 'dropdown-content']">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
</script>

<style lang="scss" scoped>
@import "styles/components/ui/UiDropdown";
</style>
