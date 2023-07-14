<template>
  <div class="input" :title="required ? 'To pole jest obowiązkowe' : ''">
    <label v-if="label" :for="label">
      {{ label }}{{ required ? " *" : "" }}
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="label"
      :value="value"
      :placeholder="placeholder"
      :required="required"
      :rows="rowsCount"
      @change="(event: Event) => $emit('valueChange', (event.target as HTMLInputElement).value)"
    ></textarea>

    <input
      v-else
      :id="label"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :required="required"
      @input="(event: Event) => $emit('valueChange', (event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String as () => "text" | "password" | "textarea",
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  rowsCount: {
    type: Number,
    default: 10,
  },
});

defineEmits<{
  valueChange: [value: string];
}>();
</script>

<style lang="scss" scoped>
@import "styles/components/ui/UiInput";
</style>
