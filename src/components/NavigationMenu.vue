<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navigation = ref([
  { name: 'Search Recipes', href: '/', current: false },
  { name: 'Saved Recipes', href: '/saved', current: false },
  { name: 'Todos', href: '/todos', current: false },
]);

// Обновляем активный пункт навигации
const updateCurrentNavigation = () => {
  navigation.value.forEach(item => {
    item.current = item.href === route.path;
  });
};

// Следим за изменением маршрута и обновляем состояние
router.afterEach(() => {
  updateCurrentNavigation();
});

updateCurrentNavigation();
</script>

<template>
  <div class="flex space-x-4">
    <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
        :aria-current="item.current ? 'page' : undefined"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>
