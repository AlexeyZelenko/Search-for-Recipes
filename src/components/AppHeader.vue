<script setup lang="ts">
import { Disclosure, DisclosureButton, Menu, MenuButton, DisclosurePanel, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import NavigationMenu from './NavigationMenu.vue';
import MobileMenu from './MobileMenu.vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { defineProps, watch, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// Получаем функцию выхода через пропсы
const props = defineProps<{
  signOut: () => void;
}>();

const currentLanguage = ref(localStorage.getItem('language') || 'en');

// Функция для изменения языка и сохранения его в localStorage
const changeLanguage = (lang: string) => {
  currentLanguage.value = lang; // Обновляем текущий язык
  locale.value = lang; // Обновляем язык в i18n
  localStorage.setItem('language', lang); // Сохраняем язык в localStorage
};

watch(currentLanguage, (newLang) => {
  locale.value = newLang; // Обновляем язык в i18n
});

onMounted(() => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    locale.value = savedLanguage;
    currentLanguage.value = savedLanguage;
  }
});
</script>

<template>
  <Disclosure as="nav" class="bg-gray-800 w-full">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <NavigationMenu />
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {{ currentLanguage }}
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <button @click="changeLanguage('en')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm']">
                    English
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="changeLanguage('ru')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm']">
                    Русский
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="changeLanguage('uk')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-sm']">
                    Українська
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton @click="props.signOut" class="relative flex bg-gray-800 text-sm text-white px-4 py-2 rounded hover:bg-gray-700">
                {{t('nav.SignOut')}}
              </MenuButton>
            </div>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <MobileMenu />
    </DisclosurePanel>
  </Disclosure>
</template>
