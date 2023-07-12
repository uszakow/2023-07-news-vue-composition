<template>
  <Head>
    <Title>News app</Title>
    <Meta
      name="description"
      content="Application for adding and managing news."
    />
  </Head>
  <AppNavbar />
  <main class="content">
    <slot></slot>
    <UiLoader v-if="isLoading" />
  </main>
  <AppFooter />
</template>

<script lang="ts" setup>
const { isLoading, user, setUserState } = useAppState();
const route = useRoute();

// redirect for logged/unlogged users
watch([user, isLoading, route], () => {
  if (!isLoading.value && !user.value && route.path === "/profile") {
    navigateTo("/login");
  }
  if (!isLoading.value && user.value && route.path === "/login") {
    navigateTo("/profile");
  }
});

onMounted(() => {
  setUserState();
});
</script>
