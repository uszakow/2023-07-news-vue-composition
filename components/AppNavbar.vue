<template>
  <nav class="navbar flex flex-justify-between px-3">
    <NuxtLink to="/" class="navbar-item">Wiadomości</NuxtLink>

    <UiDropdown v-if="user">
      <template v-slot:title>
        <div class="navbar-item user-name">
          {{ user?.name }}
        </div>
      </template>

      <template v-slot:content>
        <NuxtLink to="/profile" class="dropdown-item">
          Strona użytkownika
        </NuxtLink>
        <button class="dropdown-item" @click="logout()">Wyloguj się</button>
      </template>
    </UiDropdown>
    <NuxtLink v-else to="/login" class="navbar-item">Zaloguj się</NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
const { user, setUserState } = useAppState();

const logout = () => {
  localStorage.removeItem("token");
  setUserState();
};
</script>

<style lang="scss" scoped>
@import "styles/components/AppNavbar";
</style>
