import {createRouter, createWebHistory} from 'vue-router'
import RecipeSearch from '../components/RecipeSearch.vue'
import SavedRecipes from '../components/SavedRecipes.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'search',
            component: RecipeSearch
        },
        {
            path: '/saved',
            name: 'saved-recipes',
            component: SavedRecipes
        }
    ]
})

export default router