<template>
  <div class="flex mt-2">
    <UiButton
      type="primary"
      label="Zmień nazwę"
      @click-button="openChangeNameModal()"
    />
    <UiButton
      classes="ml-2"
      type="secondary"
      label="Zmień hasło"
      @click-button="openChangePasswordModal()"
    />
    <UiButton
      classes="ml-2"
      type="danger"
      label="Usuń konto"
      @click-button="openDeleteProfileModal()"
    />

    <UiModal
      :title="modalTitle"
      :isOpen="isModalOpen"
      @close-modal="closeModal()"
    >
      <template v-if="modalName === 'name'">
        <UiInput
          :value="name"
          label="Nowa nazwa użytkownika"
          placeholder="Wprowadź nazwę użytkownika"
          @value-change="name = $event"
        />
        <UiButton
          classes="mt-2 m-auto"
          label="Zmień nazwę"
          :loading="loading"
          @click-button="chageUserData('name')"
        />
      </template>

      <template v-else-if="modalName === 'password'">
        <UiInput
          type="password"
          :value="password"
          label="Nowe hasło użytkownika"
          placeholder="Wprowadź hasło użytkownika"
          @value-change="password = $event"
        />
        <UiInput
          type="password"
          :value="passwordConfirmation"
          label="Potwierdzenie hasła użytkownika"
          placeholder="Wprowadź hasło użytkownika jeszcze raz"
          @value-change="passwordConfirmation = $event"
        />
        <UiButton
          classes="mt-2 m-auto"
          label="Zmień hasło"
          :loading="loading"
          @click-button="chageUserData('password')"
        />
      </template>

      <template v-else-if="modalName === 'delete'">
        <UiTypography type="title">
          Uwaga - potwierdzasz USUNIĘCIE tego konta!
        </UiTypography>
        <UiTypography type="text">
          Tej akcji nie da się odwrócić! Jeżeli nie chcesz tego robić, po prostu
          zamknij to okno.
        </UiTypography>
        <UiButton
          classes="mt-2 m-auto"
          type="danger"
          label="Usuń konto"
          :loading="loading"
          @click-button="deleteUser()"
        />
      </template>

      <UiErrorMessage :message="error" />
    </UiModal>
  </div>
</template>

<script lang="ts" setup>
import { UpdateUserDto } from "interfaces/UpdateUser.dto";

const { token, setUserState } = useAppState();
const { updateUserApi, deleteUserApi } = useUserApi();

const isModalOpen = ref(false);
const modalName = ref<"name" | "password" | "delete" | "">("");
const name = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const loading = ref(false);
const error = ref<string | string[]>("");

const modalTitle = computed(() => {
  switch (modalName.value) {
    case "name":
      return "Zmień nazwę użytkownika";
    case "password":
      return "Zmień hasło";
    case "delete":
      return "Usuń dane konto";
    default:
      return "";
  }
});

const openChangeNameModal = () => {
  modalName.value = "name";
  isModalOpen.value = true;
};
const openChangePasswordModal = () => {
  modalName.value = "password";
  isModalOpen.value = true;
};
const openDeleteProfileModal = () => {
  modalName.value = "delete";
  isModalOpen.value = true;
};
const closeModal = () => {
  name.value = "";
  password.value = "";
  passwordConfirmation.value = "";
  error.value = "";
  modalName.value = "";
  isModalOpen.value = false;
};

const chageUserData = async (field: "name" | "password"): Promise<void> => {
  if (password.value !== passwordConfirmation.value) {
    error.value = "Hasła się różnią.";
    return;
  }

  const body: UpdateUserDto = {};
  if (field === "name") {
    body.name = name.value;
  }
  if (field === "password") {
    body.password = password.value;
  }

  try {
    loading.value = true;

    if (token.value) {
      await updateUserApi(body, token.value);
    }

    await setUserState();
    closeModal();
  } catch (err: any) {
    error.value =
      err.data?.message || "Nie udało się zmienić danych użytkownika.";
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (): Promise<void> => {
  try {
    loading.value = true;

    if (token.value) {
      await deleteUserApi(token.value);
    }

    await setUserState();
    closeModal();
  } catch (err: any) {
    error.value =
      err.data?.message || "Nie udało się usunąć konto użytkownika.";
  } finally {
    loading.value = false;
  }
};
</script>
