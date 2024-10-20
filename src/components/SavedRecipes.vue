<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">Saved Recipes</h2>
    <div v-if="loading" class="mt-4">Loading...</div>
    <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
    <div v-if="recipes.length > 0" class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="recipe in recipes" :key="recipe.id" class="border rounded p-4">
        <h3 class="text-xl font-semibold mb-2">{{ recipe.title }}</h3>
        <img v-if="recipe.imageUrl" :src="recipe.imageUrl" :alt="recipe.title" class="w-full h-48 object-cover mb-4" />
        <p class="mb-2"><strong>Ingredients:</strong> {{ recipe.ingredients.join(', ') }}</p>
        <p class="mb-2">
          <strong>Instructions:</strong>
          <span v-html="recipe.instructions"></span>
        </p>
        <!--                <a :href="recipe.source" target="_blank" class="text-blue-500 hover:text-blue-700">View Source</a>-->
        <button
            @click="deleteRecipe(recipe)"
            class="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete Recipe
        </button>
      </div>
    </div>
    <div v-else-if="!loading" class="mt-4">No saved recipes found.</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {DataStore} from '@aws-amplify/datastore';
import {Recipe} from '@/models';

const recipes = ref<Recipe[]>([]);
const loading = ref(true);
const error = ref('');

const fetchSavedRecipes = async () => {
  try {
    recipes.value = await DataStore.query(Recipe);
  } catch (err) {
    console.error('Error fetching saved recipes:', err);
    error.value = 'Failed to fetch saved recipes. Please try again.';
  } finally {
    loading.value = false;
  }
};

const deleteRecipe = async (recipe: Recipe) => {
  try {
    await DataStore.delete(recipe);
    console.log('Recipe deleted successfully');
    // Remove the deleted recipe from the local state
    recipes.value = recipes.value.filter(r => r.id !== recipe.id);
  } catch (err) {
    console.error('Error deleting recipe:', err);
    error.value = 'Failed to delete recipe. Please try again.';
  }
};

onMounted(async () => {
  try {
    await DataStore.start();
    await fetchSavedRecipes();
  } catch (err) {
    console.error('Error initializing DataStore:', err);
    error.value = 'Failed to initialize the application. Please try again.';
    loading.value = false;
  }
});
</script>