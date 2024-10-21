<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ recipe.translatedTitle || recipe.title }}</h3>
        <div class="mt-2 px-7 py-3">
          <img :src="recipe.image" :alt="recipe.translatedTitle || recipe.title" class="w-full h-48 object-cover mb-4" />
          <p class="text-sm text-gray-500">
            <strong>Used Ingredients:</strong> {{ recipe.translatedUsedIngredients || recipe.usedIngredients.map(ing => ing.name).join(', ') }}
          </p>
          <p class="text-sm text-gray-500">
            <strong>Missing Ingredients:</strong> {{ recipe.translatedMissedIngredients || recipe.missedIngredients.map(ing => ing.name).join(', ') }}
          </p>
          <p class="text-sm text-gray-500 mt-2">
            <strong>Instructions:</strong> {{ recipe.translatedInstructions || recipe.instructions || 'No instructions available' }}
          </p>
        </div>
        <div class="items-center px-4 py-3">
          <button
              id="ok-btn"
              @click="saveRecipe"
              class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Save Recipe
          </button>
          <button
              @click="$emit('close')"
              class="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DataStore } from '@aws-amplify/datastore';
import { Recipe } from '@/models';

import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
const client = generateClient<Schema>();

interface RecipeProps {
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
}

const props = defineProps<{
  recipe: RecipeProps;
  targetLanguage: string;
}>();

const emit = defineEmits(['close', 'saved']);
const saveError = ref('');

const saveRecipe = async () => {
  try {
    // Преобразуем `id` в строку, если необходимо
    const newRecipeId = String(props.recipe.id);

    // Создаем новый объект Recipe, исключая лишние или несовместимые поля
    const newRecipeData = {
      title: props.recipe.translatedTitle || props.recipe.title,
      ingredients: [...props.recipe.usedIngredients, ...props.recipe.missedIngredients].map(ing => ing.name),
      instructions: props.recipe.translatedInstructions || props.recipe.instructions || 'Instructions not available',
      source: `https://spoonacular.com/recipes/${props.recipe.id}`,
      imageUrl: props.recipe.image,
      id: newRecipeId // Преобразованный в строку идентификатор
    };

    // Используем созданный объект для сохранения
    const newRecipe = new Recipe(newRecipeData);
    await DataStore.save(newRecipe);

    client.models.Recipe.create(newRecipe).then(() => {
      console.log('Recipe created to backend successfully');
    });

    console.log('Recipe saved successfully');
    emit('saved');
    emit('close');
  } catch (err) {
    console.error('Error saving recipe:', err);
    saveError.value = 'Failed to save recipe. Please try again.';
  }
};

</script>
