<template>
  <nav class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="{ active: activeTab === tab.id }"
      @click="$emit('tabChange', tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script lang="ts" setup>
import { TabItemInterface } from "@/interfaces/TabItem.interface";

defineProps({
  tabs: {
    type: Array as () => TabItemInterface[],
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});

defineEmits<{
  tabChange: [tabId: string];
}>();
</script>

<style lang="scss" scoped>
@import "styles/components/ui/UiTabs";
</style>
