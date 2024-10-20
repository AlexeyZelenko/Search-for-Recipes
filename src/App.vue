<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import Todos from './components/Todos.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Используем `ref` для хранения информации о текущем маршруте
const currentRoute = ref(router.currentRoute.value);

onMounted(() => {
  console.log('App mounted');
  console.log('Current route:', currentRoute.value);
});
</script>

<template>
  <main>
    <!-- Компонент для аутентификации -->
    <Authenticator>
      <!-- Использование `v-slot` для доступа к объекту пользователя и функции выхода -->
      <template v-slot="{ user, signOut }">
        <div class="my-6">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900">Hello {{ user?.username }}'s todos</h1>
            <!-- Вывод списка задач -->
            <Todos />
            <!-- Кнопка для выхода из системы -->
            <button @click="signOut" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sign Out
            </button>
          </div>
        </div>
      </template>
    </Authenticator>

    <!-- Навигация по страницам -->
    <div class="my-6">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Recipe Finder</h1>
        <nav class="mt-4">
          <router-link to="/" class="mr-4 text-gray-900 hover:text-blue-700">Search Recipes</router-link>
          <router-link to="/saved" class="text-gray-900 hover:text-blue-700">Saved Recipes</router-link>
        </nav>
      </div>
    </div>

    <!-- Router View для отображения соответствующего компонента в зависимости от маршрута -->
    <div>
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
/* Стили для лучшего отображения */
.main-container {
  padding: 1rem;
}
button {
  cursor: pointer;
}
</style>
