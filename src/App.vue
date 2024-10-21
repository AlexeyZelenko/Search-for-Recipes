<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <main>
    <Authenticator>
      <template v-slot="{ user, signOut }">
        <AppHeader :signOut="signOut" />
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </template>
    </Authenticator>
  </main>
</template>
