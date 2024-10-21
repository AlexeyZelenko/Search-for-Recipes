<template>
  <div class="container mx-auto px-2 py-8">
    <h1 class="text-3xl font-bold mb-4">{{ $t('search.title') }}</h1>
    <div class="mb-4">
      <input
          v-model="ingredients"
          type="text"
          :placeholder="$t('search.placeholder')"
          class="w-full p-2 border rounded"
      />
    </div>
    <div class="mb-4">
      <select v-model="targetLanguage" class="w-full p-2 border rounded">
        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
    </div>
    <button
        @click="searchRecipes"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        :disabled="loading"
    >
      {{ loading ? $t('search.loading') : $t('search.Search') }}
    </button>

    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>

    <div v-if="recipes.length > 0" class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Search Results</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="recipe in paginatedRecipes" :key="recipe.id" class="border rounded p-4">
          <h3 class="text-xl font-semibold mb-2">{{ recipe.translatedTitle || recipe.title }}</h3>
          <img :src="recipe.image" :alt="recipe.title" class="w-full h-48 object-cover mb-4"/>
          <button
              @click="showRecipeDetails(recipe)"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {{ $t('recipe.viewDetails') }}
          </button>
        </div>
      </div>
      <div class="mt-4 flex justify-center">
        <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="mx-1 px-3 py-1 border rounded"
            :class="{ 'bg-blue-500 text-white': currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <RecipeDetails
        v-if="selectedRecipe"
        :recipe="selectedRecipe"
        :targetLanguage="targetLanguage"
        @close="selectedRecipe = null"
        @saved="onRecipeSaved"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {translateText, getLanguages} from '../utils/translation';
import axios from 'axios';
import RecipeDetails from './RecipeDetails.vue';

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: Array<{ name: string }>;
  missedIngredients: Array<{ name: string }>;
  instructions?: string;
  translatedTitle?: string;
  translatedUsedIngredients?: string;
  translatedMissedIngredients?: string;
  translatedInstructions?: string;
  language?: string;
}

const ingredients = ref('');
const recipes = ref<Recipe[]>([]);
const error = ref('');
const loading = ref(false);
const targetLanguage = ref('EN');
const languages = ref(getLanguages());
const selectedRecipe = ref<Recipe | null>(null);
const currentPage = ref(1);
const itemsPerPage = 3;

const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return recipes.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(recipes.value.length / itemsPerPage));

const searchRecipes = async () => {
  if (!ingredients.value.trim()) {
    error.value = 'Please enter ingredients';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const translatedIngredients = await translateText(ingredients.value, 'EN');

    const response = await axios.get<Recipe[]>(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: translatedIngredients,
        apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
        number: 3
      }
    });

    const recipeDetails = await Promise.all(response.data.map(async (recipe) => {
      const instructionsResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY
        }
      });
      return {...recipe, instructions: instructionsResponse.data.instructions};
    }));

    recipes.value = await Promise.all(
        recipeDetails.map(async (recipe: any) => {
          // Используем значение по умолчанию для языка, если targetLanguage.value равно null или undefined
          const language = targetLanguage.value ?? 'en';

          // Переводим title
          const translatedTitle = await translateText(recipe.title, language);

          // Переводим usedIngredients
          const translatedUsedIngredients = await translateText(
              recipe.usedIngredients
                  ?.filter((ing: any) => ing !== null && ing !== undefined)
                  .map((ing: any) => ing.name)
                  .join(', ') || '',
              language
          );

          // Переводим missedIngredients
          const translatedMissedIngredients = await translateText(
              recipe.missedIngredients
                  ?.filter((ing: any) => ing !== null && ing !== undefined)
                  .map((ing: any) => ing.name)
                  .join(', ') || '',
              language
          );

          // Переводим instructions
          const translatedInstructions = await translateText(
              recipe.instructions || 'No instructions available',
              language
          );

          // Возвращаем новый объект с переведенными полями
          return {
            ...recipe,
            translatedTitle,
            translatedUsedIngredients,
            translatedMissedIngredients,
            translatedInstructions,
          };
        })
    );


    currentPage.value = 1;
  } catch (err) {
    console.error('Error in searchRecipes:', err);
    if (axios.isAxiosError(err) && err.response) {
      error.value = `API Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`;
    } else if (err instanceof Error) {
      error.value = `Failed to fetch recipes: ${err.message}`;
    } else {
      error.value = 'An unexpected error occurred. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};

const showRecipeDetails = (recipe: Recipe) => {
  selectedRecipe.value = recipe;
};

const onRecipeSaved = () => {
  console.log('Recipe saved successfully');
};

onMounted(() => {
  console.log('RecipeSearch component mounted');
});
</script>