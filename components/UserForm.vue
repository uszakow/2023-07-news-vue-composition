<template>
  <div class="user-form relative m-auto mt-3">
    <UiTabs
      :tabs="tabs"
      :activeTab="activeTab"
      @tabChange="activeTab = $event"
    />
    <div class="user-form-wrap px-2 py-3">
      <UiTypography type="title">
        {{ activeTab === "login" ? "Dane użytkownika:" : "Nowy użytkownik:" }}
      </UiTypography>
      <UiInput
        :value="name"
        label="Nazwa użytkownika"
        placeholder="Wprowadź nazwę użytkownika"
        required
        @value-change="name = $event"
      />
      <UiInput
        type="password"
        :value="password"
        label="Hasło"
        :placeholder="
          activeTab === 'login'
            ? 'Wprowadź hasło'
            : 'Hasło ma zawierać co najmniej 4 znaki'
        "
        required
        @value-change="password = $event"
      />
      <UiButton
        classes="mt-2 mb-1 m-auto"
        :label="activeTab === 'login' ? 'Zaloguj się' : 'Utwórz konto'"
        :loading="loading"
        @click-button="activeTab === 'login' ? loginUser() : createUser()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TabItemInterface } from "interfaces/TabItem.interface";

const tabs: TabItemInterface[] = [
  { id: "login", label: "Zaloguj się" },
  { id: "registration", label: "Utwórz konto" },
];

const activeTab = ref<string>(tabs[0].id);
const name = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | string[]>("");

const loginUser = async () => {
  console.log("loginUser");
};

const createUser = async () => {
  console.log("createUser");
};
</script>

<style lang="scss">
@import "styles/components/UserForm";
</style>
