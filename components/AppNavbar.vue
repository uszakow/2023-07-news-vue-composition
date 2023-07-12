<template>
  <nav class="navbar flex flex-justify-between px-3">
    <NuxtLink to="/" class="navbar-item">Wiadomości</NuxtLink>

    <NuxtLink to="/login" class="navbar-item">Zaloguj się</NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
import { useAppState } from "@/composables/state";

const { user } = useAppState();
</script>

<style lang="scss" scoped>
@import "styles/components/Navbar";
</style>
