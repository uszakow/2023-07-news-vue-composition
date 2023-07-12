<template>
  <Head>
    <Title>Strona użytkownika</Title>
  </Head>

  <UiTypography type="title" classes="flex flex-justify-between flex-align-end">
    <span>Nazwa użytkownika: {{ user?.name }}</span>
    <UiButton type="inline" label="Wyloguj się" @click-button="logout()" />
  </UiTypography>
  <UiTypography type="text" classes="block">
    {{ user?.name }} stworzył {{ newsCount }}
  </UiTypography>

  <ProfileDataChange />
</template>

<script lang="ts" setup>
const { user, setUserState } = useAppState();

const newsCount = computed(() => {
  const count = user.value?.news.length ?? 0;
  const text = count === 1 ? "wiadomość" : "wiadomości";
  return `${count} ${text}`;
});

const logout = () => {
  localStorage.removeItem("token");
  setUserState();
};

onMounted(() => {
  setUserState();
});
</script>
