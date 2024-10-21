<script setup lang="ts">
import { DisclosureButton } from '@headlessui/vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Список навигации
const navigation = [
  { name: 'Search Recipes', href: '/', current: true },
  { name: 'Saved Recipes', href: '/saved', current: false },
  { name: 'Todos', href: '/todos', current: false }
];

// Состояние текущего маршрута для отслеживания активного меню
const currentRoute = ref(router.currentRoute.value);

// Следим за изменением маршрута и обновляем активное меню
watch(() => router.currentRoute.value, (newRoute) => {
  currentRoute.value = newRoute;
});
</script>

<template>
  <div class="space-y-1 px-2 pb-3 pt-2">
    <DisclosureButton
        v-for="item in navigation"
        :key="item.name"
        as="a"
        :class="[currentRoute.path === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
        :aria-current="currentRoute.path === item.href ? 'page' : undefined"
        @click="$emit('close')"
    >
      <router-link :to="item.href">{{ item.name }}</router-link>
    </DisclosureButton>
  </div>
</template>
