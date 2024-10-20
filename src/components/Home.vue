<script setup lang="ts">
import { ref } from 'vue';
import RecipeDetails from './RecipeDetails.vue';
import Todos from "@/components/Todos.vue";

// Определяем интерфейс для объектов Recipe
interface Recipe {
  id: number;
  title: string;
  image: string;
  missedIngredientCount?: string;
  language?: string;
  originalLanguage?: string;
}

const ingredients = ref<string>('');
const recipes = ref<Recipe[]>([]); // Используем массив объектов типа Recipe
const loading = ref<boolean>(false);
const error = ref<string>('');
const selectedRecipe = ref<Recipe | null>(null);

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const searchRecipes = async () => {
  if (!ingredients.value) {
    error.value = 'Please enter ingredients';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.value}&number=9&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    recipes.value = data; // TypeScript теперь понимает, что data соответствует типу Recipe[]
  } catch (err) {
    console.error('Error fetching recipes:', err);
    error.value = 'Failed to fetch recipes. Please try again.';
  } finally {
    loading.value = false;
  }
};

const showRecipeDetails = (recipe: Recipe) => {
  selectedRecipe.value = recipe;
};

const onRecipeSaved = () => {
  // You can add any additional logic here after a recipe is saved
  console.log('Recipe saved successfully');
};
</script>
