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
        <button
            @click="deleteRecipe(recipe)"
            class="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete Recipe
        </button>
        <button
            @click="deleteRecipe2(recipe)"
            class="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete Recipe2
        </button>
      </div>
    </div>
    <div v-else-if="!loading" class="mt-4">No saved recipes found.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
// import { DataStore } from '@aws-amplify/datastore';
import { Recipe } from '@/models';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';


const deleteRecipe2 = async (recipe: Recipe) => {
  try {
    console.log('Checking if recipe exists before deleting:', recipe.id);

    const existingRecipe = recipes.value.find(r => r.id === recipe.id);

    if (!existingRecipe) {
      console.log('Recipe not found, skipping deletion');
      return;
    }

    console.log('Deleting recipe:', recipe.id);

    // Удаление рецепта
    await client.models.Recipe.delete({ id: recipe.id });

    console.log('Recipe deleted successfully');

    // Обновляем локальное состояние
    recipes.value = recipes.value.filter(r => r.id !== recipe.id);
  } catch (err) {
    console.error('Failed to delete recipe:', err);
    error.value = 'Failed to delete recipe. Please try again.';
  } finally {
    loading.value = false;
  }
};


const client = generateClient<Schema>();
const recipes = ref<Recipe[]>([]);
const loading = ref(true);
const error = ref('');

const fetchSavedRecipes = () => {
  try {
    const subscription = client.models.Recipe.observeQuery().subscribe({
      next: ({ items }) => {
        // Используем any, чтобы обойти проверку типов
        const validItems = items.filter((item: any) => !item._deleted);

        recipes.value = validItems.map(item => {
          console.log('Item:', item)
          const { createdAt, updatedAt, ...rest } = item;
          return new Recipe({
            ...rest,
            ingredients: rest.ingredients?.filter((ing): ing is string => ing !== null) ?? []
          });
        }) as Recipe[];

        console.log('Fetched recipes:', recipes.value);
      },
      error: (err) => {
        console.error('Subscription error fetching saved recipes:', err);
        error.value = 'Failed to fetch saved recipes. Please try again.';
      }
    });

    onBeforeUnmount(() => {
      subscription.unsubscribe();
    });
  } catch (err) {
    console.error('Error initializing subscription to fetch recipes:', err);
    error.value = 'Failed to initialize recipe fetching. Please try again.';
  } finally {
    loading.value = false;
  }
};

const deleteRecipe = async (recipe: Recipe) => {
  try {
    console.log('Deleting recipe:', recipe.id);

    // Perform the deletion
    await client.models.Recipe.delete({ id: recipe.id });

    console.log('Recipe deleted successfully');

    // Remove the deleted recipe from the local state immediately
    recipes.value = recipes.value.filter(r => r.id !== recipe.id);

    // Refresh the list from the backend to make sure it's in sync
    fetchSavedRecipes();
  } catch (err) {
    console.error('Failed to delete recipe:', err);
    error.value = 'Failed to delete recipe. Please try again.';
  } finally {
    loading.value = false;
  }
};



onMounted(() => {
  try {
    fetchSavedRecipes();
  } catch (err) {
    console.error('Error initializing DataStore:', err);
    error.value = 'Failed to initialize the application. Please try again.';
    loading.value = false;
  }
});
</script>
