import {createRouter, createWebHistory} from 'vue-router'
import RecipeSearch from '../components/RecipeSearch.vue'
import SavedRecipes from '../components/SavedRecipes.vue'
import Todos from '../components/Todos.vue'

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
        },
        {
            path: '/todos',
            name: 'todos',
            component: Todos
        }
    ]
})

export default router