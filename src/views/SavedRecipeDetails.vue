<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">{{ recipe?.title || 'Recipe Details' }}</h2>
    <div v-if="loading" class="mt-4">Loading...</div>
    <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
    <div v-if="recipe" class="mt-4">
      <img
          v-if="recipe.imageUrl"
          :src="recipe.imageUrl"
          :alt="recipe.title"
          class="w-full max-w-md h-auto object-cover mb-4 rounded-lg shadow-md"
      />

      <p class="mb-2"><strong>Ingredients:</strong></p>
      <ul class="list-disc list-inside mb-4">
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient }}</li>
      </ul>

      <p class="mb-2"><strong>Instructions:</strong></p>
      <p class="mb-4 whitespace-pre-line">{{ recipe.instructions }}</p>
    </div>
    <div class="mt-8">
      <router-link to="/saved" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Saved Recipes
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { DataStore } from '@aws-amplify/datastore';
import { Recipe } from '../models';

const route = useRoute();
const recipe = ref<Recipe | null>(null);
const loading = ref(true);
const error = ref('');

const fetchRecipe = async (id: string) => {
  try {
    const fetchedRecipe = await DataStore.query(Recipe, id);
    if (fetchedRecipe) {
      recipe.value = fetchedRecipe;
    } else {
      error.value = 'Recipe not found';
    }
  } catch (err) {
    console.error('Error fetching recipe:', err);
    error.value = 'Failed to fetch recipe details. Please try again.';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const recipeId = route.params.id as string;
  await fetchRecipe(recipeId);
});
</script>