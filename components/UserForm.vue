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
      <UiErrorMessage :message="error" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TabItemInterface } from "interfaces/TabItem.interface";
import { useUserApi } from "@/composables/useUserApi";

const tabs: TabItemInterface[] = [
  { id: "login", label: "Zaloguj się" },
  { id: "registration", label: "Utwórz konto" },
];

const { createUserApi, loginUserApi } = useUserApi();
const { setUserState } = useAppState();

const activeTab = ref<string>(tabs[0].id);
const name = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | string[]>("");

watch(error, () => {
  setTimeout(() => {
    error.value = "";
  }, 5000);
});

const loginUser = async () => {
  const body = {
    name: name.value,
    password: password.value,
  };

  try {
    loading.value = true;
    const token = await loginUserApi(body);

    if (token) {
      localStorage.setItem("token", token);
    }

    await setUserState();
  } catch (err: any) {
    error.value =
      err.data?.message || "Nie udało się zalogować, prosimy spróbować później";
  } finally {
    loading.value = false;
  }
};

const createUser = async () => {
  const body = {
    name: name.value,
    password: password.value,
  };

  try {
    loading.value = true;

    const response = await createUserApi(body);

    if (response.statusCode === 201) {
      loginUser();
    }
  } catch (err: any) {
    error.value =
      err.data?.message || "Nie udało się stworzyć konto użytkownika";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "styles/components/UserForm";
</style>
